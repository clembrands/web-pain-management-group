#!/usr/bin/env node
// Phase 1 inventory crawler for the live PMG site.
//
//   NODE_USE_ENV_PROXY=1 node scripts/inventory/crawl.mjs [origin]
//
// Reads robots.txt and every XML sitemap, then follows internal links.
// Each URL is requested once without following redirects, so status and
// Location are exactly what the live server returns. Writes to inventory/:
//
//   urls.csv          url,title,status,proposed_destination,action + audit columns
//   education.csv     Pain Education hub links, bucketed by the hub's headings
//   integrations.csv  third-party embeds and scripts per page (jobs tool, forms, maps)
//   raw.json          everything above plus canonical, robots meta, and outlinks
//   html/             raw HTML of every 200 page, for manual extraction (not committed)
//
// No dependencies. HTML is scanned with regular expressions, which is enough
// for a WordPress site's anchors, titles, and meta tags.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ORIGIN = new URL(process.argv[2] ?? "https://painmgmtgroup.com").origin;
const HOST = new URL(ORIGIN).host.replace(/^www\./, "");
const OUT = join(process.cwd(), "inventory");
const MAX_PAGES = 3000;
const CONCURRENCY = 4;
const UA = "PMG-Inventory/1.0 (+site migration audit by Clembrands)";

const SKIP_EXT =
  /\.(jpe?g|png|gif|webp|svg|ico|pdf|docx?|xlsx?|pptx?|zip|mp4|mov|mp3|css|js|json|xml|txt|woff2?|ttf|eot)$/i;
const SKIP_PATH = /^\/(wp-admin|wp-json|wp-includes|xmlrpc\.php|cdn-cgi)(\/|$)|^\/wp-login\.php/;

// Brief §4/§5. Keys are live paths; values are rebuild destinations.
const KNOWN_301 = {
  "/why-choose-us/": "/partnership/how-it-works/",
  "/provider-opportunities/": "/providers/",
  "/service/": "/providers/",
  "/blog/": "/news/",
};
const KEEP_EXACT = new Set(["/", "/our-partners/", "/about-us/", "/contact/", "/pain-education/"]);

// Common WordPress theme demo slugs. A match is a flag for review, not a decision.
const DEMO_HINT =
  /(^|\/)(home-?\d+|homepage-?\d+|blog-(left|right|full|grid|list|masonry)[\w-]*|sample-page|hello-world|elements?|shortcodes?|typography|portfolio[\w-]*|shop|cart|checkout|my-account|pricing[\w-]*|coming-soon|landing[\w-]*|team-?\d*|services?-\d+|gallery[\w-]*|demo[\w-]*|style-guide|about-(us-)?\d+|contact-(us-)?\d+)(\/|$)/i;

const INTEGRATIONS = {
  careermd: /careermd\.com/i,
  workable: /workable\.com/i,
  lever: /lever\.co/i,
  greenhouse: /greenhouse\.io/i,
  bamboohr: /bamboohr\.com/i,
  jazzhr: /(jazzhr|applytojob)\.com/i,
  indeed: /indeed\.com/i,
  linkedin_jobs: /linkedin\.com\/(jobs|company)/i,
  icims: /icims\.com/i,
  jobvite: /jobvite\.com/i,
  paylocity: /paylocity\.com/i,
  adp: /adp\.com/i,
  ukg_ultipro: /(ultipro|ukg)\.com/i,
  paycom: /paycomonline\.net/i,
  ziprecruiter: /ziprecruiter\.com/i,
  practicematch: /practicematch\.com/i,
  wp_job_manager: /wp-job-manager|job_listing/i,
  gohighlevel: /(leadconnectorhq|msgsndr|gohighlevel)\.com/i,
  gravity_forms: /gform_|gravityforms/i,
  contact_form_7: /wpcf7/i,
  wpforms: /wpforms/i,
  hubspot: /hs-scripts|hsforms|hubspot/i,
  mailchimp: /list-manage\.com|mailchimp/i,
  google_maps: /maps\.google|google\.com\/maps|maps\.googleapis/i,
  gtm: /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/,
  ga4: /gtag\/js\?id=G-|G-[A-Z0-9]{6,}/,
  clarity: /clarity\.ms/i,
  meta_pixel: /connect\.facebook\.net|fbq\(/i,
  youtube: /youtube(-nocookie)?\.com\/embed/i,
  vimeo: /player\.vimeo\.com/i,
};

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const text = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];
const csvCell = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const toCsv = (rows, cols) =>
  [cols.join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\n") + "\n";

function normalize(href, base) {
  let u;
  try {
    u = new URL(decode(href.trim()), base);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol)) return null;
  if (u.host.replace(/^www\./, "") !== HOST) return null;
  u.hash = "";
  // Query strings on WordPress are usually filters, share links, or replytocom.
  // Keep ?p= and ?page_id= since those resolve to real posts.
  const keep = [...u.searchParams.keys()].filter((k) => k === "p" || k === "page_id");
  u.search = keep.length ? `?${keep.map((k) => `${k}=${u.searchParams.get(k)}`).join("&")}` : "";
  if (SKIP_EXT.test(u.pathname) || SKIP_PATH.test(u.pathname)) return null;
  if (/\/(feed|embed|trackback|amp)\/?$/.test(u.pathname)) return null;
  return `${ORIGIN}${u.pathname}${u.search}`;
}

async function get(url, accept = "text/html") {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: "manual",
        headers: { "user-agent": UA, accept },
        signal: AbortSignal.timeout(30_000),
      });
      const body = res.status === 200 ? await res.text() : "";
      return { status: res.status, location: res.headers.get("location"), type: res.headers.get("content-type") ?? "", body };
    } catch (err) {
      if (attempt === 2) return { status: 0, location: null, type: "", body: "", error: String(err.cause ?? err) };
      await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    }
  }
}

async function readSitemaps() {
  const seeds = new Set([`${ORIGIN}/sitemap_index.xml`, `${ORIGIN}/sitemap.xml`, `${ORIGIN}/wp-sitemap.xml`]);
  const robots = await get(`${ORIGIN}/robots.txt`, "text/plain");
  for (const m of robots.body.matchAll(/^sitemap:\s*(\S+)/gim)) seeds.add(m[1]);
  const queue = [...seeds];
  const seen = new Set();
  const pages = new Map(); // url -> sitemap it came from
  while (queue.length) {
    const sm = queue.shift();
    if (seen.has(sm)) continue;
    seen.add(sm);
    const res = await get(sm, "application/xml");
    if (res.status === 301 || res.status === 302 || res.status === 308) {
      if (res.location) queue.push(new URL(res.location, sm).href);
      continue;
    }
    if (res.status !== 200 || !/<(urlset|sitemapindex)/.test(res.body)) continue;
    const isIndex = /<sitemapindex/.test(res.body);
    for (const m of res.body.matchAll(/<loc>\s*(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?\s*<\/loc>/g)) {
      const loc = decode(m[1]);
      if (isIndex) queue.push(loc);
      else {
        const n = normalize(loc, ORIGIN);
        if (n && !pages.has(n)) pages.set(n, sm);
      }
    }
  }
  return { robotsTxt: robots.status === 200 ? robots.body : null, sitemaps: [...seen], pages };
}

function proposed(path, row) {
  if (KNOWN_301[path]) return [KNOWN_301[path], "301"];
  if (path.startsWith("/blog/")) return [path.replace(/^\/blog\//, "/news/"), "301"];
  if (KEEP_EXACT.has(path)) return [path, "keep"];
  if (/^\/pain-education\/[^/]+\/$/.test(path)) return [path, "keep"];
  if (row.demo_suspect) return ["", "retire"];
  return ["", "TBD"];
}

async function main() {
  await mkdir(join(OUT, "html"), { recursive: true });
  console.log(`Inventory of ${ORIGIN}`);
  const { robotsTxt, sitemaps, pages: fromSitemap } = await readSitemaps();
  console.log(`  sitemaps read: ${sitemaps.length}, URLs listed: ${fromSitemap.size}`);

  const found = new Map(); // url -> first referrer
  const queue = [...new Set([`${ORIGIN}/`, ...fromSitemap.keys()])];
  for (const u of queue) found.set(u, fromSitemap.has(u) ? "sitemap" : "seed");
  const rows = new Map();
  const integrations = [];

  async function visit(url) {
    const res = await get(url);
    const path = new URL(url).pathname + new URL(url).search;
    const row = {
      url,
      path,
      status: res.status,
      redirect_to: res.location ? new URL(res.location, url).href : "",
      in_sitemap: fromSitemap.has(url) ? "yes" : "no",
      found_from: found.get(url),
      title: "",
      h1: "",
      canonical: "",
      meta_robots: "",
      x_robots: "",
      indexable: "no",
      demo_suspect: DEMO_HINT.test(path) ? "slug" : "",
      error: res.error ?? "",
      outlinks: [],
    };
    rows.set(url, row);
    if (row.redirect_to) {
      const n = normalize(row.redirect_to, url);
      if (n && !found.has(n)) (found.set(n, url), queue.push(n));
    }
    if (res.status !== 200 || !/html/i.test(res.type)) return;

    const html = res.body;
    row.title = text(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    row.h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
    for (const tag of html.match(/<(link|meta)\b[^>]*>/gi) ?? []) {
      if (/^<link/i.test(tag) && attr(tag, "rel")?.toLowerCase() === "canonical") row.canonical = attr(tag, "href") ?? "";
      if (/^<meta/i.test(tag) && /^(robots|googlebot)$/i.test(attr(tag, "name") ?? ""))
        row.meta_robots = [row.meta_robots, attr(tag, "content")].filter(Boolean).join("; ");
    }
    const canonicalOk = !row.canonical || normalize(row.canonical, url) === url;
    row.indexable = !/noindex/i.test(row.meta_robots) && canonicalOk ? "yes" : "no";
    if (/lorem ipsum/i.test(html)) row.demo_suspect = [row.demo_suspect, "lorem"].filter(Boolean).join("+");

    const file = path.replace(/^\/|\/$/g, "").replace(/[^\w.-]+/g, "__") || "index";
    await writeFile(join(OUT, "html", `${file}.html`), html);

    const embeds = [...(html.match(/<(iframe|script)\b[^>]*\bsrc\s*=\s*["'][^"']+["']/gi) ?? [])].map((t) => attr(t, "src"));
    for (const [name, re] of Object.entries(INTEGRATIONS)) {
      if (!re.test(html)) continue;
      const evidence = embeds.find((s) => re.test(s)) ?? html.match(re)?.[0] ?? "";
      integrations.push({ url, integration: name, evidence });
    }

    for (const m of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
      const n = normalize(m[1], url);
      if (!n) continue;
      row.outlinks.push(n);
      if (!found.has(n) && found.size < MAX_PAGES) (found.set(n, url), queue.push(n));
    }
  }

  let i = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (i < queue.length) {
      const url = queue[i++];
      await visit(url);
      if (rows.size % 25 === 0) console.log(`  crawled ${rows.size} / ${queue.length}`);
    }
  });
  await Promise.all(workers);

  const all = [...rows.values()].sort((a, b) => a.path.localeCompare(b.path));
  for (const r of all) {
    [r.proposed_destination, r.action] = r.status === 200 ? proposed(r.path, r) : ["", r.status >= 300 && r.status < 400 ? "already-redirects" : "n/a"];
  }
  const live = all.filter((r) => r.status === 200 && r.indexable === "yes");

  const cols = ["url", "title", "status", "proposed_destination", "action"];
  const audit = [...cols, "redirect_to", "in_sitemap", "found_from", "indexable", "canonical", "meta_robots", "h1", "demo_suspect", "error"];
  await writeFile(join(OUT, "urls.csv"), toCsv(live, cols));
  await writeFile(join(OUT, "urls-audit.csv"), toCsv(all, audit));
  await writeFile(join(OUT, "integrations.csv"), toCsv(integrations, ["url", "integration", "evidence"]));
  await writeFile(join(OUT, "education.csv"), toCsv(await educationBuckets(), ["category", "title", "slug", "url"]));
  await writeFile(
    join(OUT, "raw.json"),
    JSON.stringify({ origin: ORIGIN, crawledAt: new Date().toISOString(), robotsTxt, sitemaps, pages: all }, null, 2),
  );

  const by = (k) => Object.entries(all.reduce((a, r) => ((a[r[k]] = (a[r[k]] ?? 0) + 1), a), {}));
  console.log(`\nDone. ${all.length} URLs requested, ${live.length} live and indexable.`);
  console.log("  status:", Object.fromEntries(by("status")));
  console.log("  action:", Object.fromEntries(by("action")));
  console.log(`  output: ${OUT}`);
}

// Walk the hub in document order. Each /pain-education/<slug>/ link is assigned
// to the most recent heading, so the buckets mirror the live hub's own grouping.
async function educationBuckets() {
  const res = await get(`${ORIGIN}/pain-education/`);
  if (res.status !== 200) return [];
  const out = [];
  const seen = new Set();
  let heading = "(no heading)";
  for (const m of res.body.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>|<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    if (m[1] !== undefined) {
      heading = text(m[1]) || heading;
      continue;
    }
    const href = attr(`<a ${m[2]}>`, "href");
    const n = href && normalize(href, `${ORIGIN}/pain-education/`);
    const slug = n && new URL(n).pathname.match(/^\/pain-education\/([^/]+)\/$/)?.[1];
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const category = /condition/i.test(heading) ? "Conditions" : /procedure|treatment/i.test(heading) ? "Procedures" : /medication|opioid/i.test(heading) ? "Medications" : heading;
    out.push({ category, title: text(m[3]), slug, url: n });
  }
  return out;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
