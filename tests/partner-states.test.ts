// State page intros: unique, the right length, and built only from the partner data.
import assert from "node:assert/strict";
import { test } from "node:test";
import { partnerHospitals } from "../src/content/legacy/partners.ts";
import { partnerStates } from "../src/content/legacy/states.ts";
import { stateIntros } from "../src/content/pages/partner-states.ts";

const text = (slug: string) => stateIntros[slug].join(" ");
const sentences = (slug: string) =>
  text(slug)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

// Cities suggested for partners the live site gives no address for. They must never be
// published (inventory/partners-to-confirm.csv).
const suggestedCities = [
  "Eldorado",
  "Du Quoin",
  "Metropolis",
  "Tell City",
  "Hardinsburg",
  "Fort Kent",
  "Whiteville",
  "Cambridge",
  "Savannah",
];

test("every state has an intro of 100 to 200 words", () => {
  for (const s of partnerStates) {
    assert.ok(stateIntros[s.slug], s.slug);
    const words = text(s.slug).split(/\s+/).length;
    assert.ok(words >= 100 && words <= 200, `${s.slug}: ${words} words`);
  }
});

test("no two intros share more than one sentence", () => {
  const slugs = Object.keys(stateIntros);
  for (const a of slugs)
    for (const b of slugs.filter((x) => x > a)) {
      const shared = sentences(a).filter((s) => sentences(b).includes(s));
      assert.ok(
        shared.length <= 1,
        `${a} and ${b} share: ${shared.join(" | ")}`,
      );
    }
});

test("intros state no digits and no suggested cities", () => {
  for (const slug of Object.keys(stateIntros)) {
    assert.doesNotMatch(text(slug), /\d/, slug);
    for (const city of suggestedCities)
      assert.ok(!text(slug).includes(city), `${slug} mentions ${city}`);
  }
});

test("each intro names every partner hospital in its state", () => {
  const generic = new Set([
    "pain",
    "management",
    "center",
    "centers",
    "clinic",
    "program",
    "hospital",
    "health",
    "and",
    "the",
    "at",
    "for",
    "spine",
    "care",
    "medical",
    "memorial",
  ]);
  for (const p of partnerHospitals) {
    const words = p.name
      .toLowerCase()
      .split(/[^a-z-]+/)
      .filter((w) => w && !generic.has(w));
    const intro = text(p.state).toLowerCase();
    // Names made only of generic words ("Memorial Pain Clinic") must appear in full.
    const named = words.length
      ? words.some((w) => intro.includes(w))
      : intro.includes(p.name.toLowerCase());
    assert.ok(named, `${p.state} intro omits ${p.name}`);
  }
});
