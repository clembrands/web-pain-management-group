// Guards on draft page copy: no unconfirmed numbers, no broken links, and a well-formed
// objections library.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { isSampleKey, sampleFigures } from "../src/content/sample-figures.ts";
import { isPmgKey, pmgFigures, pmgSource } from "../src/content/pmg-figures.ts";
import { homeContent } from "../src/content/pages/home.ts";
import {
  homeQuestionIds,
  hospitalLeaderQuestions,
  partnershipPages,
  patientPath,
  phases,
  pillars,
} from "../src/content/pages/partnership.ts";
import { dashboardGroups, resultsHub } from "../src/content/pages/results.ts";
import { aboutPages } from "../src/content/pages/about.ts";
import { providerPages, lifeAtPmg } from "../src/content/pages/providers.ts";
import { allRoutes } from "../src/lib/routes.ts";

// Every copy string, skipping image paths.
function strings(value: unknown, key = ""): string[] {
  if (typeof value === "string") return key === "src" ? [] : [value];
  if (Array.isArray(value)) return value.flatMap((v) => strings(v));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => strings(v, k));
  return [];
}

const copy = strings({
  homeContent,
  partnershipPages,
  hospitalLeaderQuestions,
  phases,
  pillars,
  patientPath,
  resultsHub,
  dashboardGroups,
  providerPages,
  lifeAtPmg,
  aboutPages,
});

const TBD = /\{\{TBD: [^{}]+\}\}/g;
const SAMPLE = /\{\{SAMPLE: ([a-zA-Z]+)\}\}/g;
const PMG = /\{\{PMG: ([a-zA-Z]+)\}\}/g;
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Numbers that come from a named source rather than from PMG's own claims.
const allowedNumbers = [
  // Patrick J. Martin's verbatim testimonial on the live site.
  "started its program with PMG in 2009",
  // Cited source: Institute of Medicine, Relieving Pain in America (2011).
  "An estimated 100 million U.S. adults",
  "Institute of Medicine's 2011 report",
  // Source line and periods of the figures PMG stated in writing.
  pmgSource,
  ...Object.values(pmgFigures).map((f) => f.period),
];

test("copy states no figure outside a TBD placeholder or sample figure", () => {
  for (const text of copy) {
    let rest = text
      .replace(TBD, "")
      .replace(SAMPLE, "")
      .replace(PMG, "")
      .replace(LINK, "$1");
    for (const ok of allowedNumbers) rest = rest.replace(ok, "");
    assert.doesNotMatch(rest, /\d/, `unconfirmed number in: ${text}`);
  }
});

test("TBD placeholders are well formed", () => {
  for (const text of copy) {
    const stray = text.replace(TBD, "").replace(SAMPLE, "").replace(PMG, "");
    assert.ok(!stray.includes("{{") && !stray.includes("}}"), text);
  }
});

test("every sample figure in the copy is registered, and every one registered is used", () => {
  const used = new Set<string>();
  for (const text of copy)
    for (const [, key] of text.matchAll(SAMPLE)) {
      assert.ok(isSampleKey(key), `unregistered sample figure: ${key}`);
      used.add(key);
    }
  for (const key of Object.keys(sampleFigures))
    assert.ok(used.has(key), `sample figure never shown: ${key}`);
});

test("every PMG figure in the copy is registered", () => {
  for (const text of copy)
    for (const [, key] of text.matchAll(PMG))
      assert.ok(isPmgKey(key), `unregistered PMG figure: ${key}`);
});

test("docs/sample-figures.md lists every sample figure", () => {
  const doc = readFileSync(
    new URL("../docs/sample-figures.md", import.meta.url),
    "utf8",
  );
  for (const [key, f] of Object.entries(sampleFigures))
    assert.ok(doc.includes(`\`${key}\``) && doc.includes(f.value), key);
});

test("every internal link in the copy resolves to a route", () => {
  const paths = new Set(allRoutes.map((r) => r.path));
  for (const text of copy)
    for (const [, , href] of text.matchAll(LINK))
      if (!/^(https?:|mailto:|tel:)/.test(href))
        assert.ok(paths.has(href), `${href} in: ${text}`);
  for (const [path, page] of Object.entries({
    ...partnershipPages,
    "/results/": resultsHub,
    ...providerPages,
    ...aboutPages,
  })) {
    assert.ok(paths.has(path), path);
    for (const r of page.related) assert.ok(paths.has(r), r);
  }
});

test("the objections library has 8 to 16 direct questions", () => {
  const qs = hospitalLeaderQuestions;
  assert.ok(qs.length >= 8 && qs.length <= 16, `${qs.length} questions`);
  assert.equal(new Set(qs.map((q) => q.id)).size, qs.length);
  for (const q of qs) {
    assert.match(q.question, /\?$/, q.question);
    assert.ok(q.answer.length > 0 && q.answer[0].length > 0, q.id);
  }
  for (const id of homeQuestionIds)
    assert.ok(
      qs.some((q) => q.id === id),
      id,
    );
});

test("every Results metric is a TBD, a sample, or a PMG figure with its source", () => {
  for (const g of dashboardGroups)
    for (const m of g.metrics) {
      const pmg = m.value.match(/^\{\{PMG: ([a-zA-Z]+)\}\}$/)?.[1];
      if (pmg) {
        assert.ok(isPmgKey(pmg), m.label);
        assert.equal(m.source, pmgSource, m.label);
        assert.equal(
          m.period,
          pmgFigures[pmg as keyof typeof pmgFigures].period,
          m.label,
        );
        continue;
      }
      for (const field of [m.value, m.source, m.period])
        assert.match(
          field,
          /^\{\{(TBD|SAMPLE): [^}]+\}\}$/,
          `${m.label}: ${field}`,
        );
    }
});
