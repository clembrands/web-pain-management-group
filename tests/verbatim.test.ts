// Migrated text must match the live site exactly, apart from repaired encoding errors.
// The source HTML of each body is kept in inventory/source/ (from the Phase 1 crawl).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  plainTextOfBlocks,
  plainTextOfHtml,
} from "../scripts/inventory/portable-text.mjs";
import { legacyArticleBodies } from "../src/content/legacy/articles.ts";
import { educationArticles } from "../src/content/legacy/education.ts";
import { legacyNewsBodies } from "../src/content/legacy/news-posts.ts";

const source = (dir: string, slug: string) =>
  readFileSync(
    new URL(`../inventory/source/${dir}/${slug}.html`, import.meta.url),
    "utf8",
  );

type Block = { _type: string; [key: string]: unknown };

test("all 36 articles are migrated, one per live slug", () => {
  assert.deepEqual(
    legacyArticleBodies.map((a) => a.slug),
    educationArticles.map((a) => a.slug),
  );
});

test("no article body differs from the live text beyond encoding fixes", () => {
  for (const a of legacyArticleBodies)
    assert.equal(
      plainTextOfBlocks(a.body as Block[]),
      plainTextOfHtml(source("pain-education", a.slug)),
      a.slug,
    );
});

test("no news post differs from the live text beyond encoding fixes", () => {
  for (const p of legacyNewsBodies)
    assert.equal(
      plainTextOfBlocks(p.body),
      plainTextOfHtml(source("news", p.slug)),
      p.slug,
    );
});

test("every ViewMedica embed is kept exactly as on the live article", () => {
  let embeds = 0;
  for (const a of legacyArticleBodies) {
    const html = source("pain-education", a.slug);
    const blocks = a.body as Block[];
    const frames = [...html.matchAll(/<iframe\b[^>]*>/g)].map((m) => m[0]);
    const migratedFrames = blocks.filter((b) => b._type === "viewmedica");
    assert.equal(migratedFrames.length, frames.length, a.slug);
    frames.forEach((tag, i) => {
      const b = migratedFrames[i];
      const attr = (name: string) =>
        tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
      assert.equal(b.src, attr("src")?.trim(), a.slug);
      assert.equal(b.style, attr("style"), a.slug);
      assert.equal(b.allow, attr("allow"), a.slug);
      assert.equal(b.loading, attr("loading"), a.slug);
    });
    const scripts = [...html.matchAll(/openthis="([^"]+)"/g)].map((m) => m[1]);
    const migratedScripts = blocks.filter(
      (b) => b._type === "viewmedicaScript",
    );
    assert.deepEqual(
      migratedScripts.map((b) => b.code),
      scripts,
      a.slug,
    );
    for (const b of migratedScripts) {
      assert.equal(b.client, html.match(/client="([^"]+)"/)?.[1]);
      assert.equal(
        b.scriptSrc,
        html.match(/<script[^>]*src="([^"]+vm\.js)"/)?.[1],
      );
    }
    embeds += frames.length + scripts.length;
  }
  assert.equal(embeds, 36);
});

test("migrated news posts reference no image missing from the repo", () => {
  const text = JSON.stringify(legacyNewsBodies);
  assert.doesNotMatch(text, /wp-content\/uploads/);
});
