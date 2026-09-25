// Sample figures shown on the review site so pages read realistically before PMG confirms
// the real numbers. NONE of these is a PMG fact. Each one renders as a plain figure through
// the {{SAMPLE: key}} token (see src/components/rich-text.tsx), carries a data-sample
// attribute in the HTML, and fails `verify:urls --launch` and `audit:site --launch` until
// it is replaced. The list is published for review in docs/sample-figures.md
// (`npm run sample-figures` regenerates it) and each item is on PMG's confirmation list.
export type SampleFigure = {
  value: string;
  // What PMG must supply, and where the sample came from.
  note: string;
};

export const sampleFigures = {
  firstYear: {
    value: "2009",
    note: "First partnership year. The live site says 2009; PMG's onboarding homework says 20 years of operation (about 2006). PMG confirms which is right.",
  },
  newPatients: {
    value: "12,500",
    note: "New patients in the reporting year. Illustrative; PMG supplies the real figure.",
  },
  pcpReferrals: {
    value: "9,800",
    note: "Primary care referrals in the reporting year. Illustrative; PMG supplies the real figure.",
  },
  avgPartnershipYears: {
    value: "8 years",
    note: "Average partnership length. Illustrative; PMG supplies the real figure.",
  },
  longestPartnershipYears: {
    value: "17 years",
    note: "Longest-running partnership, counted from the 2009 first year on the live site. PMG confirms.",
  },
  patientSatisfaction: {
    value: "4.7 / 5",
    note: "Patient satisfaction score. Illustrative; PMG supplies the survey result and scale.",
  },
  painImprovement: {
    value: "68%",
    note: "Patients reporting less pain after treatment. Illustrative; PMG supplies the real share.",
  },
  edVisitChange: {
    value: "-22%",
    note: "Change in pain-related emergency visits. Illustrative; PMG supplies the real change and method.",
  },
  timeToFirstPatient: {
    value: "6 to 9 months",
    note: "Time from signed agreement to first patient. Illustrative; PMG confirms the typical range.",
  },
  breakEven: {
    value: "within 18 months",
    note: "Typical time to break-even. Illustrative; PMG confirms.",
  },
  reportingPeriod: {
    value: "Calendar 2025",
    note: "Reporting period shown on dashboard tiles. PMG confirms.",
  },
  source: {
    value: "PMG program data",
    note: "Source shown on dashboard tiles. PMG names the real system or report.",
  },
} satisfies Record<string, SampleFigure>;

export type SampleKey = keyof typeof sampleFigures;

export const isSampleKey = (key: string): key is SampleKey =>
  Object.hasOwn(sampleFigures, key);
