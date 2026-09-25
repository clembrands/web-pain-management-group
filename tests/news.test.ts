import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { legacyNewsPosts } from "../src/content/legacy/news.ts";
import { legacyNewsBodies } from "../src/content/legacy/news-posts.ts";

test("all 4 WordPress posts are migrated, with the crawl's slugs, titles, and dates", () => {
  assert.deepEqual(
    legacyNewsBodies.map((p) => [p.slug, p.title, p.date]),
    legacyNewsPosts.map((p) => [p.slug, p.title, p.date]),
  );
  for (const p of legacyNewsBodies) assert.ok(p.body.length > 0, p.slug);
});

test("every migrated image is served from the repo, not the old WordPress server", () => {
  for (const p of legacyNewsBodies)
    for (const b of p.body)
      if (b._type === "image") {
        assert.match(b.src, /^\/news\//, b.src);
        assert.ok(
          existsSync(new URL(`../public${b.src}`, import.meta.url)),
          b.src,
        );
      }
});

test("no double-encoded characters survived the migration", () => {
  assert.doesNotMatch(JSON.stringify(legacyNewsBodies), /â€/);
});
