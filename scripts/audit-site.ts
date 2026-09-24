// SEO/GEO audit of a running build (Phase 9). Start a production build with indexing on,
// pointing the site URL at the server, then run the audit against it:
//
//   NEXT_PUBLIC_INDEXABLE=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm run build
//   NEXT_PUBLIC_INDEXABLE=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 npx next start -p 3100
//   npm run audit:site -- http://localhost:3100 [--validate] [--launch] [--site=<url>]
//
// --site is the site URL the build was made for (NEXT_PUBLIC_SITE_URL), when it differs from
// the address being audited: a production build checked on its vercel.app URL before DNS
// moves uses --site=https://painmgmtgroup.com. Canonical URLs are checked against it.
//
// Checks every page in sitemap.xml: title (60 characters or less) and meta description
// (120 to 160) unique across the site, exactly one H1, canonical and Open Graph tags; every
// page reachable within two clicks of Home; every hospital-leader page links to
// /partnership/questions/ and /results/; sitemap.xml lists no noindex page; robots.txt
// allows the named crawlers. --validate also sends each page's structured data to
// validator.schema.org. Pages still showing a {{TBD: ...}} placeholder (in the text or the
// structured data) are listed; --launch makes them failures. Writes deliverables/seo-audit.csv.
// Exits non-zero on any failure.

import { writeFileSync } from "node:fs";
import { allRoutes } from "../src/lib/routes.ts";
import { allowedCrawlers } from "../src/lib/crawlers.ts";

const args = process.argv.slice(2);
const base = new URL(
  args.find((a) => !a.startsWith("--")) ?? "http://localhost:3100",
).origin;
const validate = args.includes("--validate");
const launch = args.includes("--launch");
const site = new URL(
  args.find((a) => a.startsWith("--site="))?.slice(7) ?? base,
).origin;

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const meta = (html: string, attr: string, name: string) =>
  decode(
    html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1] ??
      "",
  );
const text = (s: string) =>
  decode(s.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();

type Page = {
  path: string;
  title: string;
  description: string;
  h1s: string[];
  canonical: string;
  ogTitle: string;
  ogImage: string;
  twitterCard: string;
  robots: string;
  jsonLd: { "@type": string }[];
  links: Set<string>;
  tbd: boolean;
};

async function load(path: string): Promise<Page> {
  const res = await fetch(`${base}${path}`);
  if (res.status !== 200) throw new Error(`${path} answered ${res.status}`);
  const html = await res.text();
  const links = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*href="([^"#?]+)[^"]*"/g)) {
    const href = m[1];
    if (href.startsWith("/") && !href.startsWith("//")) links.add(href);
    else if (href.startsWith(site)) links.add(href.slice(site.length) || "/");
  }
  return {
    path,
    title: decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""),
    description: meta(html, "name", "description"),
    h1s: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
      text(m[1]),
    ),
    canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "",
    ogTitle: meta(html, "property", "og:title"),
    ogImage: meta(html, "property", "og:image"),
    twitterCard: meta(html, "name", "twitter:card"),
    robots: meta(html, "name", "robots"),
    jsonLd: [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].map((m) => JSON.parse(m[1])),
    links,
    tbd: html.includes("{{TBD"),
  };
}

const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);

// Crawl rules.
const robots = await (await fetch(`${base}/robots.txt`)).text();
for (const bot of allowedCrawlers)
  if (!new RegExp(`User-Agent: ${bot}\\nAllow: /`).test(robots))
    fail(`robots.txt does not allow ${bot}`);
if (/Disallow: \/\n/.test(robots.replace(/Disallow: \/(studio|api)\/\n/g, "")))
  fail("robots.txt disallows the whole site");
const sitemapXml = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
if (!paths.length)
  fail("sitemap.xml is empty (is NEXT_PUBLIC_INDEXABLE=true?)");

const pages = new Map<string, Page>();
for (const path of paths) pages.set(path, await load(path));

// Metadata.
const seen = {
  title: new Map<string, string>(),
  description: new Map<string, string>(),
};
for (const p of pages.values()) {
  if (/noindex/.test(p.robots)) fail(`${p.path}: in sitemap.xml but noindex`);
  if (!p.title) fail(`${p.path}: no title`);
  if (p.title.length > 60)
    fail(`${p.path}: title is ${p.title.length} characters`);
  if (p.description.length < 120 || p.description.length > 160)
    fail(`${p.path}: description is ${p.description.length} characters`);
  if (p.h1s.length !== 1) fail(`${p.path}: ${p.h1s.length} H1s`);
  if (p.canonical !== `${site}${p.path}`)
    fail(`${p.path}: canonical is ${p.canonical}`);
  if (!p.ogTitle || !p.ogImage || !p.twitterCard)
    fail(`${p.path}: missing Open Graph or Twitter tags`);
  for (const key of ["title", "description"] as const) {
    const other = seen[key].get(p[key]);
    if (other) fail(`${p.path}: same ${key} as ${other}`);
    seen[key].set(p[key], p.path);
  }
  const types = p.jsonLd.map((d) => d["@type"]);
  if (!types.includes("Organization"))
    fail(`${p.path}: no Organization JSON-LD`);
  if (p.path !== "/" && !types.includes("BreadcrumbList"))
    fail(`${p.path}: no BreadcrumbList`);
}

const withTbd = [...pages.values()].filter((p) => p.tbd).map((p) => p.path);
if (launch)
  for (const path of withTbd) fail(`${path}: still shows a TBD placeholder`);

// Internal linking: breadth-first from Home over the indexable pages.
const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const current = queue.shift()!;
  if ((depth.get(current) ?? 0) >= 2) continue;
  for (const link of pages.get(current)?.links ?? [])
    if (pages.has(link) && !depth.has(link)) {
      depth.set(link, depth.get(current)! + 1);
      queue.push(link);
    }
}
for (const path of pages.keys())
  if (!depth.has(path)) fail(`${path}: more than two clicks from Home`);
const linkedTo = new Set([...pages.values()].flatMap((p) => [...p.links]));
for (const path of pages.keys())
  if (path !== "/" && !linkedTo.has(path)) fail(`${path}: orphan`);
for (const route of allRoutes.filter((r) => r.audience === "hospital")) {
  const page = pages.get(route.path);
  if (!page) continue;
  for (const must of ["/partnership/questions/", "/results/"])
    if (route.path !== must && !page.links.has(must))
      fail(`${route.path}: no link to ${must}`);
}

// Structured data against schema.org's validator.
const validation = new Map<string, string>();
if (validate) {
  for (const p of pages.values()) {
    const html = `<html><head>${p.jsonLd
      .map(
        (d) =>
          `<script type="application/ld+json">${JSON.stringify(d)}</script>`,
      )
      .join("")}</head><body></body></html>`;
    const res = await fetch("https://validator.schema.org/validate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ html }),
    });
    const body = JSON.parse((await res.text()).replace(/^\)\]\}'\n?/, ""));
    const errors = body.totalNumErrors ?? 0;
    const warnings = body.totalNumWarnings ?? 0;
    validation.set(p.path, `${errors} errors, ${warnings} warnings`);
    if (errors) fail(`${p.path}: ${errors} schema.org errors`);
  }
}

const cell = (v: string | number) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const rows = [...pages.values()].map((p) =>
  [
    p.path,
    p.title,
    p.title.length,
    p.description,
    p.description.length,
    p.h1s.join(" | "),
    depth.get(p.path) ?? "",
    p.jsonLd.map((d) => d["@type"]).join(" "),
    validation.get(p.path) ?? "",
  ]
    .map(cell)
    .join(","),
);
writeFileSync(
  new URL("../deliverables/seo-audit.csv", import.meta.url),
  [
    "path,title,title_length,description,description_length,h1,clicks_from_home,structured_data,schema_org_validator",
    ...rows,
  ].join("\n") + "\n",
);

console.log(
  `Audited ${pages.size} indexable pages at ${base}. CSV: deliverables/seo-audit.csv`,
);
if (withTbd.length && !launch)
  console.log(
    `\n${withTbd.length} pages still show TBD placeholders (failures with --launch):\n  ${withTbd.join("\n  ")}`,
  );
if (failures.length) {
  console.log(`\n${failures.length} problems:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("No problems found.");
