// Figures PMG has stated in writing, shown as plain figures. Unlike sample figures they are
// PMG's own numbers, so they do not fail the launch check; they are still listed on PMG's
// confirmation list for final sign-off of the wording and period.
// Sources: PMG Website Onboarding Homework, 7.1.26 (deliverables/), section 2; and Cole
// McMath's written answers to the website questions, September 25, 2026 (marked below).
export type PmgFigure = {
  value: string;
  // What PMG wrote, word for word where it matters.
  stated: string;
  period: string;
};

export const pmgSource = "PMG onboarding homework, July 2026";
export const pmgAnswersSource =
  "Cole McMath, PMG, answers to website questions, September 25, 2026";

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
    value: "20+ years",
    stated:
      "20 years of operation (homework); first hospital partnership in 2004 (Cole McMath)",
    period: "Current",
  },
  // From Cole McMath's answers (pmgAnswersSource).
  firstPartnership: {
    value: "2004",
    stated: "First hospital partnership was in 2004.",
    period: "Current",
  },
  established: {
    value: "2009",
    stated: "Next hospitals didn't come online and PMG established in 2009.",
    period: "Current",
  },
  hospitalEquity: {
    value: "51%",
    stated: "Hospital owns 51% equity",
    period: "Current",
  },
  pmgEquity: {
    value: "49%",
    stated: "PMG owns 49% equity",
    period: "Current",
  },
  timeToFirstPatient: {
    value: "six months or less",
    stated:
      "From signed agreement to first patient is typically 6 months or less.",
    period: "Current",
  },
  enrollmentDays: {
    value: "about 120 days",
    stated: "a 120 day full insurance enrollment process",
    period: "Current",
  },
  locationAddDays: {
    value: "about 90 days",
    stated:
      "or 90 days for a location add for existing providers already practicing on the PMG tax Id",
    period: "Current",
  },
} satisfies Record<string, PmgFigure>;

export type PmgKey = keyof typeof pmgFigures;

export const isPmgKey = (key: string): key is PmgKey =>
  Object.hasOwn(pmgFigures, key);
