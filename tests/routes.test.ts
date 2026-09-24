import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import {
  allRoutes,
  breadcrumbTrail,
  home,
  sections,
  sitemapPaths,
} from "../src/lib/routes.ts";

test("every route is unique and uses a trailing slash", () => {
  const paths = allRoutes.map((r) => r.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const p of paths) assert.match(p, /^\/(?:[a-z0-9-]+\/)*$/, p);
});

test("titles and meta descriptions are unique", () => {
  for (const key of ["title", "description"] as const) {
    const values = allRoutes.map((r) => r[key]);
    const dupes = values.filter((v, i) => values.indexOf(v) !== i);
    assert.deepEqual(dupes, [], `duplicate ${key}`);
  }
});

test("Rev 2.0 structure: seven primary sections, 10 state pages, nothing deeper than two clicks", () => {
  assert.deepEqual(
    sections.map((s) => s.path),
    [
      "/partnership/",
      "/results/",
      "/our-partners/",
      "/providers/",
      "/pain-education/",
      "/about-us/",
      "/news/",
    ],
  );
  assert.equal(
    allRoutes.filter((r) => /^\/our-partners\/[^/]+\/$/.test(r.path)).length,
    10,
  );
  // Sections are in the header on every page; their children are one click further.
  for (const s of sections)
    for (const c of s.children ?? [])
      assert.equal(c.children, undefined, c.path);
});

test("breadcrumbs run from Home through each ancestor", () => {
  assert.deepEqual(
    breadcrumbTrail("/partnership/questions/").map((r) => r.path),
    ["/", "/partnership/", "/partnership/questions/"],
  );
  assert.deepEqual(
    breadcrumbTrail("/").map((r) => r.path),
    [home.path],
  );
});

test("sitemap.xml lists only pages with content", () => {
  const listed = new Set(sitemapPaths());
  for (const r of allRoutes)
    assert.equal(listed.has(r.path), r.status !== "placeholder", r.path);
});

test("site copy contains no em dashes", () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(tsx?|json)$/.test(name)) files.push(full);
    }
  };
  walk(new URL("../src", import.meta.url).pathname);
  // Studio labels are internal, not site copy.
  const offenders = files.filter(
    (f) => !f.includes("/sanity/") && readFileSync(f, "utf8").includes("—"),
  );
  assert.deepEqual(offenders, []);
});
