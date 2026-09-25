// Draft copy for Results and Outcomes (Phase 4). The partner and state counts are counted
// from the published partner directory. Every other figure is a {{SAMPLE: key}} from
// src/content/sample-figures.ts, with its definition, source, and period, until PMG
// confirms it.
import type { EditorialContent } from "./partnership.ts";
import type { DirectoryCounts } from "../../lib/partner-stats.ts";
import type { SampleKey } from "../sample-figures.ts";
import { pmgFigures, pmgSource, type PmgKey } from "../pmg-figures.ts";

export type Metric = {
  label: string;
  value: string;
  // What the number counts. Draft wording for PMG to confirm.
  definition: string;
  source: string;
  period: string;
};

export type MetricGroup = {
  id: string;
  title: string;
  intro: string;
  metrics: Metric[];
};

const sample = (
  key: SampleKey,
): Pick<Metric, "value" | "source" | "period"> => ({
  value: `{{SAMPLE: ${key}}}`,
  source: "{{SAMPLE: source}}",
  period: "{{SAMPLE: reportingPeriod}}",
});

// A figure PMG stated in writing, with its source and period.
const pmg = (key: PmgKey): Pick<Metric, "value" | "source" | "period"> => ({
  value: `{{PMG: ${key}}}`,
  source: pmgSource,
  period: pmgFigures[key].period,
});

// The draft set of measures. PMG confirms which it reports and how each is defined.
export const dashboardGroups: MetricGroup[] = [
  {
    id: "network",
    title: "Partnership network",
    intro: "How many hospitals partner with PMG, and where.",
    metrics: [
      {
        label: "Care locations",
        definition:
          "Hospital-based pain management locations operating under a PMG partnership.",
        ...pmg("careLocations"),
      },
    ],
  },
  {
    id: "volume",
    title: "Patient volume",
    intro: "How many patients partner centers see.",
    metrics: [
      {
        label: "Patient encounters",
        definition:
          "Visits and procedures across all partner centers in the reporting year.",
        ...pmg("patientEncounters"),
      },
      {
        label: "New patients",
        definition:
          "Patients seen at a partner center for the first time in the reporting year.",
        ...sample("newPatients"),
      },
      {
        label: "Primary care referrals",
        definition:
          "Referrals from primary care physicians into partner centers.",
        ...sample("pcpReferrals"),
      },
    ],
  },
  {
    id: "durability",
    title: "Partnership durability",
    intro: "Whether hospitals stay with PMG.",
    metrics: [
      {
        label: "Partner retention",
        definition:
          "Share of partnerships renewed at the end of their contract term.",
        ...pmg("partnerRetention"),
      },
      {
        label: "Average partnership length",
        definition: "Mean years since launch across active partnerships.",
        ...sample("avgPartnershipYears"),
      },
      {
        label: "Longest-running partnership",
        definition: "Years since the earliest active partnership launched.",
        ...sample("longestPartnershipYears"),
      },
    ],
  },
  {
    id: "outcomes",
    title: "Patient outcomes and experience",
    intro: "How patients do, and how they rate their care.",
    metrics: [
      {
        label: "Patient satisfaction",
        definition: "Patient experience score from PMG's survey.",
        ...sample("patientSatisfaction"),
      },
      {
        label: "Patient-reported pain improvement",
        definition: "Share of patients reporting less pain after treatment.",
        ...sample("painImprovement"),
      },
      {
        label: "Emergency department visits for pain",
        definition:
          "Change in pain-related emergency visits among center patients.",
        ...sample("edVisitChange"),
      },
    ],
  },
];

// Counted from the partner directory at build time. Factual counts of what the site
// publishes, not metrics awaiting confirmation.
export const directoryMetrics = (c: DirectoryCounts): Metric[] => [
  {
    label: "Partner hospitals",
    value: String(c.hospitals),
    definition: "Hospitals listed in PMG's partner directory on this site.",
    source: "[PMG partner directory](/our-partners/)",
    period: "Current",
  },
  {
    label: "States",
    value: String(c.states),
    definition: "States with at least one hospital in the partner directory.",
    source: "[PMG partner directory](/our-partners/)",
    period: "Current",
  },
];

// The four headline figures on the Results hub.
export const headlineMetrics = (c: DirectoryCounts): Metric[] => [
  directoryMetrics(c)[0],
  dashboardGroups[1].metrics[0],
  dashboardGroups[2].metrics[0],
  dashboardGroups[2].metrics[1],
];

export const resultsHub: EditorialContent = {
  eyebrow: "For hospital leaders",
  lede: "Results from PMG's hospital partnerships: how many hospitals partner with PMG, how many patients their centers see, and whether partnerships last. Every figure is sourced and on the record.",
  faqs: ["measurement", "track-record"],
  terms: ["encounter", "retention"],
  sections: [
    {
      id: "how-we-report",
      title: "How PMG reports results",
      paragraphs: [
        "Quantifiable outcomes and results are one of the four elements of every PMG partnership. Each figure on these pages shows what it counts, where it comes from, and the period it covers.",
        "{{TBD: how PMG collects program data, who reviews it, and how often the figures are updated}}",
      ],
    },
    {
      id: "in-their-words",
      title: "In the words of hospital leaders",
      paragraphs: [
        "Hospital leaders describe what the partnership has meant for their hospitals. [Read all testimonials](/results/testimonials/).",
      ],
      quote: "Bill Watkins",
    },
  ],
  related: [
    "/results/dashboard/",
    "/results/case-studies/",
    "/results/testimonials/",
  ],
};
