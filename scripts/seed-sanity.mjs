import { createReadStream } from "node:fs";
import { readFile as read } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token)
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.",
  );
const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-09-01",
  useCdn: false,
});
const seed = JSON.parse(
  await read(new URL("../src/content/site.json", import.meta.url), "utf8"),
);
const imageCache = new Map();
async function image(media) {
  if (!imageCache.has(media.url)) {
    const asset = await client.assets.upload(
      "image",
      createReadStream(resolve("public", media.url.slice(1))),
      { filename: media.url.split("/").pop() },
    );
    imageCache.set(media.url, asset._id);
  }
  return {
    _type: "image",
    alt: media.alt,
    asset: { _type: "reference", _ref: imageCache.get(media.url) },
  };
}
function withKeys(value) {
  if (Array.isArray(value))
    return value.map((item, i) =>
      typeof item === "object" && item !== null
        ? { _type: "object", _key: `item-${i}`, ...withKeys(item) }
        : item,
    );
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, withKeys(item)]),
    );
  return value;
}
async function create(id, type, data, images = []) {
  if ((await client.getDocuments([id, `drafts.${id}`])).some(Boolean)) {
    console.log(`Kept existing ${id}`);
    return;
  }
  const prepared = withKeys(data);
  for (const field of images) prepared[field] = await image(data[field]);
  await client.createIfNotExists({ ...prepared, _id: id, _type: type });
  console.log(`Created ${id}`);
}
console.log(
  `Seeding PMG concept content into ${projectId}/${dataset}. Existing documents are preserved.`,
);
await create("siteSettings", "siteSettings", seed.settings);
// Only the contact page still reads a "page" document. Partner hospitals, articles, and
// news are imported from inventory/ in their own build phases, not from concept content.
for (const page of seed.pages.filter((p) => p.slug === "contact"))
  await create(`page-${page.slug}`, "page", page);
