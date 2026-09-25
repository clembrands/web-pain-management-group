// Figures PMG has stated in writing, shown as plain figures. Unlike sample figures they are
// PMG's own numbers, so they do not fail the launch check; they are still listed on PMG's
// confirmation list for final sign-off of the wording and period.
// Source: PMG Website Onboarding Homework, 7.1.26 (deliverables/), section 2.
export type PmgFigure = {
  value: string;
  // What PMG wrote, word for word where it matters.
  stated: string;
  period: string;
};

export const pmgSource = "PMG onboarding homework, July 2026";

export const pmgFigures = {
  partnerships: {
    value: "40",
    stated: "40 hospital partnerships",
    period: "Current",
  },
  patientEncounters: {
    value: "187,000",
    stated: "187,000 patient encounters in 2025",
    period: "Calendar 2025",
  },
  reportingYear: {
    value: "2025",
    stated: "187,000 patient encounters in 2025",
    period: "Calendar 2025",
  },
  partnerRetention: {
    value: "95%",
    stated: "95% partner retention over the past two years",
    period: "Past two years",
  },
  careLocations: {
    value: "68",
    stated: "Approximately 68 care locations",
    period: "Current",
  },
  yearsOperating: {
    value: "20 years",
    stated: "20 years of operation",
    period: "Current",
  },
} satisfies Record<string, PmgFigure>;

export type PmgKey = keyof typeof pmgFigures;

export const isPmgKey = (key: string): key is PmgKey =>
  Object.hasOwn(pmgFigures, key);
