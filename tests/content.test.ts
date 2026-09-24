// Guards on draft page copy: no unconfirmed numbers, no broken links, and a well-formed
// objections library.
import assert from "node:assert/strict";
import { test } from "node:test";
import { homeContent } from "../src/content/pages/home.ts";
import {
  homeQuestionIds,
  hospitalLeaderQuestions,
  partnershipPages,
  patientPath,
  phases,
  pillars,
} from "../src/content/pages/partnership.ts";
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
});

const TBD = /\{\{TBD: [^{}]+\}\}/g;
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Numbers that come from a named source rather than from PMG's own claims.
const allowedNumbers = [
  // Patrick J. Martin's verbatim testimonial on the live site.
  "started its program with PMG in 2009",
];

test("copy states no figure outside a TBD placeholder", () => {
  for (const text of copy) {
    let rest = text.replace(TBD, "").replace(LINK, "$1");
    for (const ok of allowedNumbers) rest = rest.replace(ok, "");
    assert.doesNotMatch(rest, /\d/, `unconfirmed number in: ${text}`);
  }
});

test("TBD placeholders are well formed", () => {
  for (const text of copy) {
    const stray = text.replace(TBD, "");
    assert.ok(!stray.includes("{{") && !stray.includes("}}"), text);
  }
});

test("every internal link in the copy resolves to a route", () => {
  const paths = new Set(allRoutes.map((r) => r.path));
  for (const text of copy)
    for (const [, , href] of text.matchAll(LINK))
      assert.ok(paths.has(href), `${href} in: ${text}`);
  for (const [path, page] of Object.entries(partnershipPages)) {
    assert.ok(paths.has(path), path);
    for (const r of page.related) assert.ok(paths.has(r), r);
  }
});

test("the objections library has 8 to 12 direct questions", () => {
  const qs = hospitalLeaderQuestions;
  assert.ok(qs.length >= 8 && qs.length <= 12, `${qs.length} questions`);
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
