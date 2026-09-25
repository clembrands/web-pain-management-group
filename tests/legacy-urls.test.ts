// Checks the redirect map, retired URLs, and route tree against the Phase 1 crawl in
// inventory/. If the crawl is re-run, these tests show what changed.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createRequire } from "node:module";
import { educationArticles } from "../src/content/legacy/education.ts";
import { gonePaths, isGone, redirects } from "../src/lib/redirects.ts";
import { allRoutes } from "../src/lib/routes.ts";

// The same path matcher Next.js uses for redirects.
const { match, compile } = createRequire(import.meta.url)(
  "next/dist/compiled/path-to-regexp",
);

function readCsv(file: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const text = readFileSync(
    new URL(`../inventory/${file}`, import.meta.url),
    "utf8",
  );
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted && c === '"' && text[i + 1] === '"') {
      cell += '"';
      i++;
    } else if (c === '"') {
      quoted = !quoted;
    } else if (!quoted && c === ",") {
      row.push(cell);
      cell = "";
    } else if (!quoted && c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += c;
    }
  }
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

const plan = readCsv("urls-plan.csv").map((r): Record<string, string> => ({
  ...r,
  path: new URL(r.url).pathname,
}));
const routePaths = new Set(allRoutes.map((r) => r.path));

// First matching redirect wins, as in Next.js.
function resolve(path: string): string | undefined {
  for (const r of redirects) {
    const m = match(r.source, { decode: decodeURIComponent })(path);
    if (m) return compile(r.destination)(m.params);
  }
}

test("every Pain Education slug matches the live site byte for byte", () => {
  const live = readCsv("education.csv");
  assert.deepEqual(
    educationArticles.map((a) => [a.slug, a.category]),
    live.map((a) => [a.slug, a.category]),
  );
  const count = (c: string) =>
    educationArticles.filter((a) => a.category === c).length;
  assert.deepEqual(
    [
      educationArticles.length,
      count("Conditions"),
      count("Procedures"),
      count("Medications"),
    ],
    [36, 7, 25, 4],
  );
  // Superion was live but missing from the hub. It is listed under Procedures now.
  assert.equal(
    educationArticles.find(
      (a) => a.slug === "superion-interspinous-spacer-vertiflex",
    )?.category,
    "Procedures",
  );
});

test("URLs the crawl marked keep are routes at the same address", () => {
  for (const r of plan.filter((r) => r.action === "keep"))
    assert.ok(routePaths.has(r.path), `${r.path} is not a route`);
});

test("URLs the crawl marked 301 redirect once, to the planned destination", () => {
  for (const r of plan.filter((r) => r.action === "301")) {
    const to = resolve(r.path);
    assert.equal(to, r.proposed_destination, `${r.path} redirects to ${to}`);
  }
});

test("URLs the crawl marked retire answer 410, and nothing else does", () => {
  const retire = plan.filter((r) => r.action === "retire").map((r) => r.path);
  for (const path of retire) assert.ok(isGone(path), `${path} is not retired`);
  assert.equal(gonePaths.length, 18);
  for (const path of routePaths)
    assert.ok(!isGone(path), `${path} is a live route but marked gone`);
});

test("every redirect lands on a route in a single hop", () => {
  for (const r of redirects) {
    // Fill each pattern with a concrete path so its destination can be resolved.
    const sample = r.source
      .replace(":year(\\d{4})", "2017")
      .replace(":month(\\d{2})", "12")
      .replace(":day(\\d{2})", "07")
      .replace(/:\w+[*+]?/g, "sample");
    const to = resolve(sample);
    assert.ok(to, `${r.source} does not match ${sample}`);
    // /blog/<anything>/ maps to the same slug under /news/, whatever that slug is.
    if (!r.source.startsWith("/blog/:"))
      assert.ok(routePaths.has(to), `${r.source} lands on ${to}, not a route`);
    assert.equal(
      resolve(to),
      undefined,
      `${r.source} chains: ${to} redirects again`,
    );
    assert.ok(
      !routePaths.has(sample),
      `${r.source} would shadow the route ${sample}`,
    );
  }
});
