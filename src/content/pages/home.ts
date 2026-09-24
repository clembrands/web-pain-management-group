// Home page copy (Phase 3). The layout is the approved 1H concept; the copy is rewritten
// from the live site, and every figure is a {{TBD: ...}} placeholder until PMG confirms it.
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
    facts:
      "Partnering with hospitals since {{TBD: year}} · {{TBD: number}} hospital partnerships · {{TBD: number}} care locations",
  },
  stats: {
    title: "Hospital-based pain programs, measured, not estimated.",
    description:
      "Quantifiable outcomes and results are part of every PMG partnership. Each figure here will be confirmed by PMG before launch.",
    items: [
      { value: "{{TBD: number}}", label: "hospital partnerships" },
      {
        value: "{{TBD: number}}",
        label: "patient encounters in {{TBD: year}}",
      },
      { value: "{{TBD: percent}}", label: "partner retention" },
      { value: "{{TBD: years}}", label: "of hospital-based pain management" },
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
