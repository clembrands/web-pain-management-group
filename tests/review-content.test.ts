import { test } from "node:test";
import assert from "node:assert/strict";
import { reviewPages } from "../src/content/review/pages.ts";
test("all review routes are unique and their related links resolve", () => {
  const slugs = new Set(reviewPages.map((p) => p.slug));
  assert.equal(slugs.size, reviewPages.length);
  for (const page of reviewPages) {
    assert.match(page.slug, /^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/);
    for (const link of page.links)
      assert.ok(
        link === "contact" || slugs.has(link),
        `${page.slug} has invalid link ${link}`,
      );
  }
});
test("invented evidence and clinical templates are visibly designated as samples", () => {
  for (const p of reviewPages.filter((p) =>
    ["location", "person", "job", "story", "education", "legal"].includes(
      p.kind,
    ),
  ))
    assert.equal(p.sample, true, p.slug);
  assert.equal(reviewPages.filter((p) => p.kind === "education").length, 35);
});
