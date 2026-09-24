#!/usr/bin/env node
// Phase 1 report: turns a crawl (inventory/raw.json + inventory/html/) into the
// migration inputs. Run after crawl.mjs:
//
//   node scripts/inventory/report.mjs
//
// Writes to inventory/:
//   urls.csv          every live indexable URL: url,title,status,proposed_destination,action
//   redirects.csv     from,to,reason for every 301 the rebuild must serve
//   retire.csv        theme-demo URLs proposed for 410, pending approval
//   education.csv     every Pain Education article, canonical slug, hub category, video
//   partners.csv      partner hospitals behind the /our-partners/ state filter
//   testimonials.csv  named hospital-leader quotes
//   news.csv          blog posts to migrate to /news/

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "inventory");
const raw = JSON.parse(await readFile(join(OUT, "raw.json"), "utf8"));
const ORIGIN = raw.origin;
const html = (path) => {
  const file =
    path.replace(/^\/|\/$/g, "").replace(/[^\w.-]+/g, "__") || "index";
  return readFile(join(OUT, "html", `${file}.html`), "utf8");
};

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    // UTF-8 read as Windows-1252 in the WordPress database.
    .replace(/â€™/g, "’")
    .replace(/â€œ/g, "“")
    .replace(/â€\u009d|â€"/g, "”");
const text = (s) =>
  decode(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
const bodyText = (page) =>
  text(
    page
      .slice(page.search(/<body/i))
      .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " "),
  )
    // Strip the duplicated desktop/mobile nav and the shared footer.
    .replace(/^.*?Blog Contact (?:Our Approach.*?Blog Contact )?/, "")
    .split(/ Pain Management Group 229 West| Archives August 2022/)[0]
    .trim();
const csvCell = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const write = (name, rows, cols = Object.keys(rows[0] ?? {})) =>
  writeFile(
    join(OUT, name),
    [
      cols.join(","),
      ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(",")),
    ].join("\n") + "\n",
  );

const pages = raw.pages;
const byPath = new Map(pages.map((p) => [p.path, p]));
const live = pages.filter((p) => p.status === 200);

// ---------------------------------------------------------------- partners
// The hub grid carries state (CSS class), logo, and an outbound link only.
// Names and addresses live on the matching /em_portfolios/ page, matched by logo file.

const STATE_NAMES = {
  illinois: "Illinois",
  indiana: "Indiana",
  kentucky: "Kentucky",
  maine: "Maine",
  michigan: "Michigan",
  "north-carolina": "North Carolina",
  ohio: "Ohio",
  pennsylvania: "Pennsylvania",
  tennessee: "Tennessee",
  wisconsin: "Wisconsin",
};
// Cities the address parser can't isolate from the street line.
const CITY_FIX = {
  "harrison-memorial-pain-management": "Cynthiana",
  "avita-pain-management-center-galion": "Galion",
  "new-day-pain-management-center": "St. Marys",
  "edgewood-pain-management-center": "Transfer",
  "crystal-clinic-pain-management-center": "Akron",
  "magruder-pain-management-center": "Port Clinton",
};
// These portfolio pages have no address on the live site. Suggested from each
// hospital's public location; PMG must confirm before publishing.
const CITY_SUGGEST = {
  "ferrell-pain-management-center": ["Eldorado", "IL"],
  "marshall-browning": ["Du Quoin", "IL"],
  "massac-hospital": ["Metropolis", "IL"],
  "perry-county-memorial-hosplital": ["Tell City", "IN"],
  "breckinridge-health-pain-management-center": ["Hardinsburg", "KY"],
  "houlton-regional-hospital": ["Houlton", "ME"],
  "northern-maine-medical-center": ["Fort Kent", "ME"],
  "columbus-regional": ["Whiteville", "NC"],
  "southeastern-pain-management": ["Cambridge", "OH"],
  "hardin-medical-center": ["Savannah", "TN"],
};

const hub = await html("/our-partners/");
const filters = [...hub.matchAll(/data-filter="\.([a-z-]+)"/g)].map(
  (m) => m[1],
);
const grid = [
  ...hub.matchAll(
    /grid-item ([^"]*?) witr_all_mb_30"[\s\S]*?src="([^"]+)"[\s\S]*?<a href="([^"]*)"/g,
  ),
].map(([, cls, logo, link]) => ({
  state: cls.split(/\s+/).find((c) => c in STATE_NAMES),
  logo,
  link: decode(link),
}));

const portfolios = [];
for (const p of live.filter((p) => p.path.startsWith("/em_portfolios/"))) {
  const page = await html(p.path);
  const slug = p.path.split("/")[2];
  const block = bodyText(page)
    .replace(/^Home /, "")
    .replace(/^.*?\bLINK \S+ /i, "")
    .replace(/^.*?\bLink \S+ /, "")
    .replace(/ More Info$/, "")
    .trim();
  const images = new Set(
    page.match(/wp-content\/uploads\/[^"\s,]+?\.(?:png|jpe?g|webp|gif)/gi) ??
      [],
  );
  portfolios.push({
    slug,
    name: p.title.replace(/ – Pain Management Group$/, ""),
    block,
    images,
  });
}

const partners = grid.map((g) => {
  const file = g.logo
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  const match = portfolios.find((p) =>
    [...p.images].some((i) => i.includes(file)),
  );
  if (!match) throw new Error(`No /em_portfolios/ page uses logo ${g.logo}`);
  const addr = match.block.match(/([A-Za-z .'-]+?),? ([A-Z]{2})\.? (\d{5})/);
  const phone =
    match.block.match(/P: ?([\d().\- ]{10,14}\d)/)?.[1].trim() ?? "";
  let city =
    addr?.[1]
      .split(
        /\b(?:Dr|Drive|St|Street|Ave|Avenue|Rd|Road|Blvd|Hwy|Way|Ste|Suite \w+)\.?\s/,
      )
      .pop()
      .trim() ?? "";
  if (CITY_FIX[match.slug]) city = CITY_FIX[match.slug];
  // Never publish a guessed city: suggestions go in their own column for PMG to confirm.
  const [suggestedCity, suggestedAbbr] = addr
    ? ["", ""]
    : (CITY_SUGGEST[match.slug] ?? ["", ""]);
  return {
    state: STATE_NAMES[g.state],
    state_slug: g.state,
    name: match.name,
    city,
    state_abbr: addr?.[2] ?? "",
    suggested_city: suggestedCity ? `${suggestedCity}, ${suggestedAbbr}` : "",
    zip: addr?.[3] ?? "",
    phone,
    external_link: g.link,
    logo: g.logo,
    legacy_url: `/em_portfolios/${match.slug}/`,
    address_block: match.block,
  };
});
partners.sort(
  (a, b) =>
    a.state.localeCompare(b.state) ||
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
);
// Everything PMG must confirm before a partner's name or city is published.
const partnersToConfirm = partners.flatMap((p) => {
  const issues = [];
  if (!p.city)
    issues.push(
      `No address on the live site. Shown as name and state only until confirmed. Suggested city: ${p.suggested_city || "none"}.`,
    );
  if (/Hosplital/.test(p.name))
    issues.push(
      'Live name is misspelled ("Hosplital"). Published as-is until PMG approves a correction.',
    );
  const GENERIC = new Set([
    "pain",
    "management",
    "center",
    "centers",
    "clinic",
    "hospital",
    "health",
    "medical",
    "program",
    "care",
  ]);
  const slugWords = p.legacy_url
    .split("/")[2]
    .split("-")
    .filter((w) => w.length > 3 && !GENERIC.has(w));
  if (!slugWords.some((w) => p.name.toLowerCase().includes(w)))
    issues.push(
      `Live name does not match its old URL (${p.legacy_url}). Confirm the current program name.`,
    );
  if (p.name === p.name.toUpperCase())
    issues.push(
      "Live name is in all capitals. Confirm the preferred display name.",
    );
  return issues.length
    ? [
        {
          state: p.state,
          name: p.name,
          phone: p.phone,
          external_link: p.external_link,
          suggested_city: p.suggested_city,
          issues: issues.join(" "),
        },
      ]
    : [];
});

const partnerBySlug = new Map(partners.map((p) => [p.legacy_url, p]));

// ------------------------------------------------------------ education
// The hub's own headings bucket the articles. A hub link that 301s is resolved to
// its target, and live articles missing from the hub are added and flagged.

const eduHub = await html("/pain-education/");
const education = [];
let heading = "";
for (const m of eduHub.matchAll(
  /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>|<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
)) {
  if (m[1] !== undefined) {
    heading = text(m[1]);
    continue;
  }
  const path = new URL(decode(m[2]), ORIGIN).pathname;
  if (!/^\/pain-education\/[^/]+\/$/.test(path)) continue;
  const hop = byPath.get(path);
  const canonical =
    hop?.status === 301 ? new URL(hop.redirect_to).pathname : path;
  if (education.some((e) => e.path === canonical)) continue;
  const category = /condition/i.test(heading)
    ? "Conditions"
    : /procedure|treatment/i.test(heading)
      ? "Procedures"
      : /medication|opioid/i.test(heading)
        ? "Medications"
        : heading;
  education.push({
    category,
    path: canonical,
    hub_link: path,
    hub_title: text(m[3]),
    note: path !== canonical ? `hub links ${path}, which 301s here` : "",
  });
}
for (const p of live.filter((p) =>
  /^\/pain-education\/[^/]+\/$/.test(p.path),
)) {
  if (!education.some((e) => e.path === p.path))
    education.push({
      category: "Procedures",
      path: p.path,
      hub_link: "",
      hub_title: "",
      note: "live and in sitemap, but not linked from the hub; category assigned by topic",
    });
}
for (const e of education) {
  const page = await html(e.path);
  const p = byPath.get(e.path);
  e.slug = e.path.split("/")[2];
  e.title = p.title.replace(/ – Pain Management Group$/, "");
  e.url = `${ORIGIN}${e.path}`;
  e.viewmedica = [
    ...new Set(
      page.match(/ondemand\.viewmedica\.com\/\d+\/open\/[\w]+/g) ?? [],
    ),
  ].join(" ");
  e.status = p.status;
}
const catOrder = ["Conditions", "Procedures", "Medications"];
education.sort(
  (a, b) => catOrder.indexOf(a.category) - catOrder.indexOf(b.category),
);

// -------------------------------------------------------- testimonials

const clients = bodyText(await html("/our-clients/"));
const testimonials = [];
for (const p of live.filter((p) => p.path.startsWith("/em_testimonial/"))) {
  const name = p.title.replace(/ – Pain Management Group$/, "");
  const quote = bodyText(await html(p.path))
    .replace(/^Home /, "")
    .replace(name, "")
    .trim();
  // /our-clients/ shows "Name Title, Organization First words of quote".
  const lead = quote.split(" ").slice(0, 4).join(" ").replace(/’/g, "'");
  const credit = clients.split(name)[1]?.split(lead)[0].trim() ?? "";
  const [title, ...org] = credit.split(", ");
  testimonials.push({
    name,
    title,
    organization: org.join(", "),
    quote,
    legacy_url: p.path,
  });
}

// ----------------------------------------------------------------- news

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const news = [];
for (const p of live) {
  const page = await html(p.path);
  if (!/<body[^>]*class="[^"]*\bsingle-post\b/.test(page)) continue;
  // The first date on a post page is its own byline; later ones are sidebar widgets.
  const [, month, day, year] = page.match(
    new RegExp(`(${MONTHS.join("|")}) (\\d{1,2}), (\\d{4})`),
  );
  const date = `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
  news.push({
    date,
    title: p.title.replace(/ – Pain Management Group$/, ""),
    path: p.path,
    proposed: `/news${p.path}`,
  });
}
news.sort((a, b) => a.date.localeCompare(b.date));

// ------------------------------------------------------------ URL plan

const KEEP = new Set([
  "/",
  "/our-partners/",
  "/about-us/",
  "/contact/",
  "/pain-education/",
]);
const RULES = [
  [/^\/why-choose-us\/$/, "/partnership/how-it-works/", "Rev 2.0"],
  [/^\/(service|provider-opportunities)\/$/, "/providers/", "Rev 2.0"],
  [
    /^\/internal-team-opportunities\/$/,
    "/about-us/careers/",
    "Rev 2.0 page for non-clinical roles; live page is lorem ipsum",
  ],
  [
    /^\/(blog|blog-left-sidebar)\/$/,
    "/news/",
    "news hub; /blog-left-sidebar/ is the live nav's Blog link",
  ],
  [
    /^\/category\/[^/]+\/$/,
    "/news/",
    "blog category archive, linked from every post sidebar",
  ],
  [/^\/author\/[^/]+\/$/, "/news/", "blog author archive, in sitemap"],
  [
    /^\/\d{4}\/\d{2}\/(\d{2}\/)?$/,
    "/news/",
    "blog date archive, linked from every post sidebar",
  ],
  [
    /^\/(our-clients|em_testimonial\/[^/]+)\/$/,
    "/results/testimonials/",
    "carries the 3 named testimonials",
  ],
];
const DEMO =
  /^\/(blog-(left|right)-2column|blog-right-sidebar|home-one-page|home-video-page-2|portfolio(-3column|-full-3column)?|pricing-plan|sample-page|type\/gallery|slider\/[^/]+|em_team\/[^/]+)\/(page\/\d+\/)?$/;

const plan = [];
for (const p of pages) {
  const row = {
    url: p.url,
    path: p.path,
    title: p.title,
    status: p.status,
    indexable: p.indexable,
    in_sitemap: p.in_sitemap,
    proposed_destination: "",
    action: "",
    reason: "",
  };
  const post = news.find((n) => n.path === p.path);
  const rule = RULES.find(([re]) => re.test(p.path));
  if (p.status === 301) {
    const to = new URL(p.redirect_to).pathname;
    const trailing = to === `${p.path}/`;
    Object.assign(row, {
      proposed_destination: to,
      action: trailing ? "handled by trailingSlash" : "301",
      reason: trailing ? "" : "existing live redirect; preserve",
    });
  } else if (KEEP.has(p.path) || education.some((e) => e.path === p.path)) {
    Object.assign(row, { proposed_destination: p.path, action: "keep" });
  } else if (post) {
    Object.assign(row, {
      proposed_destination: post.proposed,
      action: "301",
      reason: `news post ${post.date}`,
    });
  } else if (partnerBySlug.has(p.path)) {
    const partner = partnerBySlug.get(p.path);
    Object.assign(row, {
      proposed_destination: `/our-partners/${partner.state_slug}/`,
      action: "301",
      reason: `partner page for ${partner.name}`,
    });
  } else if (rule) {
    Object.assign(row, {
      proposed_destination: rule[1],
      action: "301",
      reason: rule[2],
    });
  } else if (DEMO.test(p.path)) {
    Object.assign(row, {
      action: "retire",
      reason: "theme demo content; no internal links from real pages",
    });
  } else {
    Object.assign(row, { action: "UNCLASSIFIED" });
  }
  plan.push(row);
}
const unclassified = plan.filter((r) => r.action === "UNCLASSIFIED");
if (unclassified.length)
  throw new Error(
    `Unclassified URLs:\n${unclassified.map((r) => r.path).join("\n")}`,
  );

const indexable = plan.filter((r) => r.status === 200 && r.indexable === "yes");
await write("urls.csv", indexable, [
  "url",
  "title",
  "status",
  "proposed_destination",
  "action",
]);
await write("urls-plan.csv", plan, [
  "url",
  "title",
  "status",
  "indexable",
  "in_sitemap",
  "proposed_destination",
  "action",
  "reason",
]);
await write(
  "redirects.csv",
  plan
    .filter((r) => r.action === "301")
    .map((r) => ({
      from: r.path,
      to: r.proposed_destination,
      reason: r.reason,
    })),
);
await write(
  "retire.csv",
  plan
    .filter((r) => r.action === "retire")
    .map((r) => ({
      path: r.path,
      title: r.title,
      indexable: r.indexable,
      in_sitemap: r.in_sitemap,
    })),
);
await write("education.csv", education, [
  "category",
  "title",
  "slug",
  "url",
  "status",
  "viewmedica",
  "hub_title",
  "note",
]);
await write("partners.csv", partners);
await writeFile(
  join(process.cwd(), "deliverables", "partners-to-confirm.csv"),
  [
    [
      "state",
      "name",
      "phone",
      "external_link",
      "suggested_city",
      "issues",
    ].join(","),
    ...partnersToConfirm.map((r) => Object.values(r).map(csvCell).join(",")),
  ].join("\n") + "\n",
);
await write("testimonials.csv", testimonials);
await write("news.csv", news);

const count = (rows, k) =>
  rows.reduce((a, r) => ((a[r[k]] = (a[r[k]] ?? 0) + 1), a), {});
console.log("indexable URLs:", indexable.length, count(indexable, "action"));
console.log("all URLs:", plan.length, count(plan, "action"));
console.log("education:", education.length, count(education, "category"));
console.log(
  "partners:",
  partners.length,
  "in",
  new Set(partners.map((p) => p.state)).size,
  "states; hub filters:",
  filters.length,
  count(partners, "state"),
);
console.log("partners to confirm:", partnersToConfirm.length);
console.log("testimonials:", testimonials.length, "news posts:", news.length);
