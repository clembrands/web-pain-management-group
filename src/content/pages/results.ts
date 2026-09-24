// Draft copy for Results and Outcomes (Phase 4). No figure appears until PMG confirms it:
// every value is a {{TBD: ...}} placeholder with its definition, source, and period.
import type { EditorialContent } from "./partnership.ts";

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

const tbd = (label: string): Pick<Metric, "value" | "source" | "period"> => ({
  value: `{{TBD: ${label}}}`,
  source: "{{TBD: source}}",
  period: "{{TBD: reporting period}}",
});

// The draft set of measures. PMG confirms which it reports and how each is defined.
export const dashboardGroups: MetricGroup[] = [
  {
    id: "network",
    title: "Partnership network",
    intro: "How many hospitals partner with PMG, and where.",
    metrics: [
      {
        label: "Hospital partnerships",
        definition:
          "Hospitals and health systems with an active PMG partnership.",
        ...tbd("number"),
      },
      {
        label: "Care locations",
        definition:
          "Hospital-based pain management locations operating under a PMG partnership.",
        ...tbd("number"),
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
        ...tbd("number"),
      },
      {
        label: "New patients",
        definition:
          "Patients seen at a partner center for the first time in the reporting year.",
        ...tbd("number"),
      },
      {
        label: "Primary care referrals",
        definition:
          "Referrals from primary care physicians into partner centers.",
        ...tbd("number"),
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
        ...tbd("percent"),
      },
      {
        label: "Average partnership length",
        definition: "Mean years since launch across active partnerships.",
        ...tbd("years"),
      },
      {
        label: "Longest-running partnership",
        definition: "Years since the earliest active partnership launched.",
        ...tbd("years"),
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
        ...tbd("score"),
      },
      {
        label: "Patient-reported pain improvement",
        definition: "Share of patients reporting less pain after treatment.",
        ...tbd("percent"),
      },
      {
        label: "Emergency department visits for pain",
        definition:
          "Change in pain-related emergency visits among center patients.",
        ...tbd("change"),
      },
    ],
  },
];

// The four headline figures on the Results hub.
export const headlineMetrics: Metric[] = [
  dashboardGroups[0].metrics[0],
  dashboardGroups[1].metrics[0],
  dashboardGroups[2].metrics[0],
  dashboardGroups[2].metrics[1],
];

export const resultsHub: EditorialContent = {
  eyebrow: "For hospital leaders",
  lede: "Results from PMG's hospital partnerships: how many hospitals partner with PMG, how many patients their centers see, and whether partnerships last. Every figure is sourced and on the record.",
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
