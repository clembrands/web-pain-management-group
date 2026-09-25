import type { Media } from "./pages/partnership.ts";

// Hero photographs by page. All are concept images (AI-generated, no identifiable people,
// no signage) standing in for PMG photography; the caption names them for the launch
// check and each is on the launch checklist. PageShell shows them in navy duotone.
const concept = "Concept photography · final PMG imagery to follow";
const image = (file: string, alt: string): Media => ({
  src: `/assets/hero/${file}.jpg`,
  alt,
  caption: concept,
});

export const heroImages: Record<string, Media> = {
  "/partnership/": image(
    "partnership",
    "The lit main entrance of a community hospital at dusk",
  ),
  "/partnership/how-it-works/": image(
    "how-it-works",
    "Hospital and PMG leaders reviewing printed program plans at a conference table",
  ),
  "/partnership/balanced-pain-treatment/": image(
    "balanced-pain-treatment",
    "An empty consultation room in a community hospital clinic, lit by a window",
  ),
  "/partnership/financial-model/": image(
    "financial-model",
    "An empty glass-walled boardroom in a hospital administration wing at sunrise",
  ),
  "/partnership/questions/": image(
    "questions",
    "Two executives talking across a small table over coffee",
  ),
  "/results/": image(
    "results",
    "A bright hospital atrium seen from an upper walkway",
  ),
  "/our-partners/": image(
    "our-partners",
    "A quiet tree-lined street leading to a modern community hospital at sunrise",
  ),
  "/providers/": image(
    "providers",
    "An interventional pain procedure suite with imaging equipment, ready for the day",
  ),
  "/providers/why-pmg/": image(
    "why-pmg",
    "A physician in a white coat looking out a hospital window at morning light",
  ),
  "/providers/opportunities/": image(
    "opportunities",
    "A physician's white coat and stethoscope hanging by an office door",
  ),
  "/pain-education/": image(
    "pain-education",
    "A person walking along a tree-lined path by a lake in early morning mist",
  ),
  "/about-us/": image(
    "about",
    "A modern open-plan office in morning light before the day begins",
  ),
  "/about-us/mission/": image(
    "mission",
    "Midwestern farmland at sunrise with a small town on the horizon",
  ),
  "/about-us/careers/": image(
    "careers",
    "A shared work table with laptops and notebooks after a team meeting",
  ),
  "/contact/": image(
    "contact",
    "A welcoming reception desk in a hospital outpatient clinic",
  ),
};

// The hero image for a page: its own, or its section's (state pages use Our Partners, the
// dashboard uses Results). Articles, news, legal and utility pages stay typographic.
export function heroImageFor(path: string): Media | undefined {
  if (heroImages[path]) return heroImages[path];
  if (path.startsWith("/our-partners/")) return heroImages["/our-partners/"];
  if (path === "/results/dashboard/") return heroImages["/results/"];
  return undefined;
}
