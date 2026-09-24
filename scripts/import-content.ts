// Imports the content migrated from the live site into Sanity: the 36 Pain Education
// articles, the 40 partner hospitals, and the 4 news posts (with their images).
//
//   npm run import:content
//
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local. Existing
// documents are never overwritten, so editor changes in Studio are kept. Open questions
// from deliverables/partners-to-confirm.csv are copied into each partner's "toConfirm" note.
import { readFileSync } from "node:fs";
import { createClient } from "next-sanity";
import { partnerHospitals } from "../src/content/legacy/partners.ts";
import { legacyNewsBodies } from "../src/content/legacy/news-posts.ts";
import { legacyArticleBodies } from "../src/content/legacy/articles.ts";
import { educationArticles } from "../src/content/legacy/education.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN first.",
  );
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-01",
  token,
  useCdn: false,
});

// Partner name -> open questions, from the confirmation list (last column).
const issues = new Map(
  readFileSync(
    new URL("../deliverables/partners-to-confirm.csv", import.meta.url),
    "utf8",
  )
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const cells = [...line.matchAll(/("(?:[^"]|"")*"|[^,]*)(?:,|$)/g)].map(
        (m) => m[1].replace(/^"|"$/g, "").replace(/""/g, '"'),
      );
      return [cells[1], cells[5]] as const;
    }),
);

const counts = { articles: 0, partners: 0, news: 0, kept: 0 };

// Articles keep their exact live slugs, verbatim text, and ViewMedica embeds. The medical
// reviewer stays empty until PMG names one.
for (const meta of educationArticles) {
  const id = `article-${meta.slug}`;
  if (await client.getDocument(id)) {
    counts.kept++;
    continue;
  }
  const body = legacyArticleBodies.find((a) => a.slug === meta.slug)?.body;
  if (!body) throw new Error(`No migrated body for ${meta.slug}`);
  await client.create({
    _id: id,
    _type: "article",
    title: meta.title,
    slug: meta.slug,
    category: meta.category,
    body,
    legacyUrl: `/pain-education/${meta.slug}/`,
  });
  counts.articles++;
}

for (const p of partnerHospitals) {
  const id = `partner-${p.legacyUrl?.split("/")[2] ?? p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  if (await client.getDocument(id)) {
    counts.kept++;
    continue;
  }
  await client.create({
    _id: id,
    _type: "partner",
    ...p,
    ...(issues.get(p.name) ? { toConfirm: issues.get(p.name) } : {}),
  });
  counts.partners++;
}

for (const post of legacyNewsBodies) {
  const id = `news-${post.slug}`;
  if (await client.getDocument(id)) {
    counts.kept++;
    continue;
  }
  // Upload migrated images from public/ and reference them as Sanity image assets.
  const body = [];
  for (const block of post.body) {
    if (block._type !== "image") {
      body.push(block);
      continue;
    }
    const file = readFileSync(
      new URL(`../public${block.src}`, import.meta.url),
    );
    const asset = await client.assets.upload("image", file, {
      filename: block.src.split("/").pop(),
    });
    body.push({
      _type: "image",
      _key: block._key,
      alt: block.alt,
      asset: { _type: "reference", _ref: asset._id },
    });
  }
  await client.create({
    _id: id,
    _type: "newsPost",
    title: post.title,
    slug: post.slug,
    publishedAt: post.date,
    kind: /award/i.test(post.title) ? "Award" : "Company news",
    body,
    legacyUrl: `/${post.slug}/`,
  });
  counts.news++;
}

console.log(
  `Created ${counts.articles} articles, ${counts.partners} partners, ${counts.news} news posts. ` +
    `${counts.kept} already existed and were left unchanged.`,
);
