// Home page copy (Phase 3). The layout is the approved 1H concept; the copy is rewritten
// from the live site. The partner hospital count is counted from the partner directory
// ("directory"); other figures are PMG's own ({{PMG: key}}, src/content/pmg-figures.ts) or,
// where PMG has not given one, a {{SAMPLE: key}} from src/content/sample-figures.ts.
export const homeContent = {
  hero: {
    title: "You run the hospital.",
    accent: "We make pain management work.",
    description:
      "Pain Management Group partners with health systems and independent hospitals to build and manage hospital-based pain management centers that are medically, socially, and financially responsible.",
    facts: [
      "Partnering with hospitals since {{SAMPLE: firstYear}}",
      "directory:hospitals partner hospitals",
      "{{PMG: careLocations}} care locations",
    ],
    // The same three facts as label and figure pairs, for number-led layouts.
    figures: [
      {
        label: "Partnering with hospitals since",
        value: "{{SAMPLE: firstYear}}",
      },
      { label: "Partner hospitals", value: "directory:hospitals" },
      { label: "Care locations", value: "{{PMG: careLocations}}" },
    ],
  },
  stats: {
    title: "Hospital-based pain programs, measured, not estimated.",
    description:
      "Quantifiable outcomes and results are part of every PMG partnership. The partner hospital count comes from PMG's partner directory; the other figures are as PMG reports them.",
    items: [
      { value: "directory:hospitals", label: "partner hospitals" },
      {
        value: "{{PMG: patientEncounters}}",
        label: "patient encounters in {{PMG: reportingYear}}",
      },
      {
        value: "{{PMG: partnerRetention}}",
        label: "partner retention, past two years",
      },
      {
        value: "{{PMG: yearsOperating}}",
        label: "in operation",
      },
    ],
  },
  locations: {
    title: "Hospital-based pain care, close to home.",
    description:
      "PMG partner centers are part of community hospitals and health systems in Ohio, Indiana, Kentucky, Michigan, Illinois, Tennessee, Wisconsin, Pennsylvania, North Carolina, and Maine. Patients make appointments directly with the hospital's pain center.",
  },
};
