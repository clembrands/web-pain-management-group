// Home page copy (Phase 3). The layout is the approved 1H concept; the copy is rewritten
// from the live site. The partner hospital count is counted from the partner directory
// ("directory"); every other figure is a {{SAMPLE: key}} from src/content/sample-figures.ts
// until PMG confirms it.
export const homeContent = {
  hero: {
    title: "You run the hospital.",
    accent: "We make pain management work.",
    description:
      "Pain Management Group partners with health systems and independent hospitals to build and manage hospital-based pain management centers that are medically, socially, and financially responsible.",
    image: {
      src: "/assets/hero-1e.png",
      alt: "A physician and a hospital leader in a bright hospital lobby",
    },
    facts: [
      "Partnering with hospitals since {{SAMPLE: firstYear}}",
      "directory:hospitals partner hospitals",
      "{{SAMPLE: careLocations}} care locations",
    ],
  },
  stats: {
    title: "Hospital-based pain programs, measured, not estimated.",
    description:
      "Quantifiable outcomes and results are part of every PMG partnership. The partner hospital count comes from PMG's partner directory; the other figures are illustrative until PMG confirms them.",
    items: [
      { value: "directory:hospitals", label: "partner hospitals" },
      {
        value: "{{SAMPLE: patientEncounters}}",
        label: "patient encounters in {{SAMPLE: reportingYear}}",
      },
      { value: "{{SAMPLE: partnerRetention}}", label: "partner retention" },
      {
        value: "{{SAMPLE: yearsOperating}}",
        label: "of hospital-based pain management",
      },
    ],
  },
  locations: {
    title: "Hospital-based pain care, close to home.",
    description:
      "PMG partner centers are part of community hospitals and health systems in Ohio, Indiana, Kentucky, Michigan, Illinois, Tennessee, Wisconsin, Pennsylvania, North Carolina, and Maine. Patients make appointments directly with the hospital's pain center.",
    image: {
      src: "/assets/1amap.png",
      alt: "Concept map of PMG partner locations, to be replaced with the verified partner map",
    },
  },
};
