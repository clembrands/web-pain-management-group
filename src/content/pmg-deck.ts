// Content from PMG's partnership proposal deck (Canva, "Pain Management Partnership
// Proposal", presented by John Bookmyer and Brad Hecker, received September 2026). Wording
// is PMG's, lightly edited for the web. The deck's program scorecards, audits, and financial
// tables show real partner data: only the names of the measures are used here, never the
// figures. The deck's closing template slides (illustrative data) are not used.
// Rules as elsewhere: no em dashes, no numbers outside the allowed list in the tests.

export const deckSource = "PMG partnership proposal deck";

export type Card = { title: string; body?: string; items?: string[] };

// Diagrams from the deck, rebuilt as components (src/components/design/deck-figures.tsx).
export type FigureId =
  "referral-pathway" | "care-network" | "framework" | "scorecard";

// Slide 2.
export const mission =
  "To provide our partner hospitals with a sustainable model for pain management.";
export const vision =
  "To continuously expand access to safe, high-quality, hospital-based pain care.";
export const values: Card[] = [
  { title: "Integrity", body: "Do the right thing." },
  { title: "Credibility", body: "Do what you say you will do." },
  { title: "Humility", body: "Continually listen, learn, and grow." },
  { title: "Accountability", body: "Run it like we own it." },
  {
    title: "Tenacity",
    body: "Act with grit, perseverance, and commitment, even when things get tough.",
  },
];

// Slide 3. CDC, Morbidity and Mortality Weekly Report, September 2018 (2016 data).
export const painBurden = {
  chronic: "50 million",
  chronicLabel: "U.S. adults living with chronic pain",
  highImpact: "19.6 million",
  highImpactLabel: "whose pain limits life or work on most days or every day",
  source:
    "[CDC, Morbidity and Mortality Weekly Report, 2018](https://www.cdc.gov/mmwr/volumes/67/wr/mm6736a2.htm), 2016 data",
};

// Slide 4.
export const hospitalChallenges: Card[] = [
  {
    title: "Emergency department overuse",
    body: "Pain patients use the emergency department for non-emergent care.",
  },
  {
    title: "Patient confusion",
    body: "Patients lack a clear path to pain relief.",
  },
  {
    title: "Patient leakage",
    body: "Patients leave the community to find care.",
  },
  {
    title: "Provider frustration",
    body: "Unresolved pain frustrates primary care physicians.",
  },
  {
    title: "Medication burden",
    body: "Managing controlled substances is complex and time-consuming.",
  },
];

// Slides 6 and 7.
export const framework = {
  from: {
    title: "Fragmented pain management",
    body: "Inconsistent care and a poor patient experience.",
  },
  to: {
    title: "Better patient outcomes",
    body: "Comprehensive, safe, and tailored care.",
  },
  pillars: [
    {
      title: "Coordinated care",
      body: "Pain providers, staff, patients, and families aligned to guide each patient through a clear care pathway.",
    },
    {
      title: "Regulatory compliance",
      body: "Safe, high-quality care that keeps pace as federal and state requirements change.",
    },
    {
      title: "Data-driven decisions",
      body: "Financial, operational, and market data used to set goals and spot opportunities.",
    },
  ] satisfies Card[],
};

// Slides 8 to 11: the preferred state for managing pain.
export const referralPathway = {
  stages: [
    {
      label: "Community need",
      title: "People with acute and chronic pain",
      items: [
        "Back pain",
        "Neck pain",
        "Cancer pain",
        "Knee pain",
        "Headaches",
        "Arthritis-related pain",
      ],
    },
    {
      label: "First contact",
      title: "Primary care provider",
      body: "The typical entry point, and the physician who refers the patient to the pain center.",
    },
    {
      label: "Evaluation and treatment",
      title: "Hospital-based pain center",
      body: "A physician-led team, fellowship-trained and board-certified.",
      items: [
        "Interventional procedures",
        "Medication management when appropriate",
      ],
    },
  ],
  branches: [
    {
      label: "Coordinated care",
      title: "Connected services",
      items: [
        "Behavioral health",
        "Physical therapy",
        "Lab services",
        "Radiology, including X-ray and advanced imaging",
      ],
    },
    {
      label: "Specialty referrals",
      title: "More hospital expertise",
      items: [
        "Physical medicine and rehabilitation",
        "Orthopedics",
        "Neurology",
        "Neurosurgery",
        "Other specialties as needed",
      ],
    },
  ],
  summary: [
    "One referral",
    "A personalized treatment plan",
    "Care connected across the hospital",
  ],
};

// Slide 12: pain management's role in the hospital system.
export const careNetwork = {
  tagline: "Relief. Function. A brighter tomorrow.",
  center: [
    {
      title: "Interventional procedures",
      body: "Performed in collaboration with the hospital's procedure staff.",
    },
    {
      title: "Medication management",
      body: "When appropriate, safe, and evidence-based.",
    },
  ] satisfies Card[],
  waysIn: [
    { title: "Primary care", body: "The most common referral source." },
    {
      title: "Self-referral",
      body: "Patients can contact the center directly.",
    },
    { title: "Other hospital specialists" },
    { title: "Community providers" },
  ] satisfies Card[],
  twoWay: [
    {
      title: "Orthopedics",
      body: "Joint, spine, and surgical considerations.",
    },
    {
      title: "Neurology",
      body: "Headache, neuropathic pain, and movement disorders.",
    },
    {
      title: "Neurosurgery",
      body: "Spine and neurosurgical considerations.",
    },
    {
      title: "Other musculoskeletal services",
      body: "Rheumatology, sports medicine, and physiatry.",
    },
  ] satisfies Card[],
  referralsOut: [
    {
      title: "Physical therapy",
      body: "Improve function, mobility, and strength.",
    },
    {
      title: "Occupational therapy",
      body: "Build skills for daily living and work.",
    },
    {
      title: "Laboratory services",
      body: "Relevant testing, such as medication monitoring.",
    },
    { title: "Radiology", body: "X-ray, MRI, CT, and ultrasound." },
  ] satisfies Card[],
  support: [
    {
      title: "Behavioral health",
      body: "Pain coping and mental health support.",
    },
    { title: "Social work", body: "Resources and support services." },
    {
      title: "Community resources",
      body: "Home health and return to work.",
    },
    { title: "Other specialty services", body: "As needed." },
  ] satisfies Card[],
};

// Slide 14.
export const growthFocus: Card[] = [
  {
    title: "Cost and risk management",
    items: [
      "Limited capital investment required",
      "Closely monitored risk management indicators",
    ],
  },
  {
    title: "High-quality care",
    items: [
      "Highly skilled, fellowship-trained physicians",
      "Robust quality metrics and best practices",
    ],
  },
  {
    title: "Excellent patient experience",
    items: [
      "Good patient outcomes drive word-of-mouth referrals",
      "Loyal patients drive consistent volume",
    ],
  },
];

// Slide 15.
export const programNeedsIntro =
  "A PMG program launches with a small footprint, using mostly existing hospital resources.";
export const programNeeds: Card[] = [
  {
    title: "Space",
    items: [
      "Existing, underused hospital space is preferred",
      "One procedure room for interventional procedures",
      "Four exam rooms preferred for clinic visits",
    ],
  },
  {
    title: "Equipment",
    items: [
      "C-arm and a fluoroscopy-compatible procedure table",
      "Radiofrequency ablation equipment",
      "Other equipment based on the procedures offered",
    ],
  },
  {
    title: "Services",
    items: [
      "Anesthesia support for select procedures",
      "Access to existing sterile processing and clinical supplies",
      "Standard hospital registration, EHR, and facility billing support",
    ],
  },
];

// Slide 16.
export const istatsIntro =
  "Every PMG program is managed in iStats, PMG's program data system, across five core areas, with consistent definitions and site-level benchmarking.";
export const istatsAreas: Card[] = [
  { title: "Referral management and reporting" },
  { title: "Quality and exception metrics" },
  { title: "Financial indicators and benchmarking" },
  { title: "Chart audit reporting" },
  { title: "Training videos and operations manual" },
];

// Slides 17 to 20: the quarterly KPI scorecard. Measure names only; the deck's values
// and targets are partner data and are not published.
export const scorecardIntro =
  "Each partner program has a quarterly KPI scorecard, fed by iStats and financial data, that tracks the program's growth and health against its targets.";
export const scorecard: Card[] = [
  {
    title: "Market capture",
    items: [
      "Primary market capture",
      "Encounters",
      "Referral conversion ratio",
      "Days to first call",
      "New patient wait time",
      "New patient no-shows and cancellations",
      "Referrals",
    ],
  },
  {
    title: "Quality",
    items: [
      "Wrong-site procedures",
      "Effective procedure time-outs",
      "Medication monitoring, including drug screens",
      "Procedures ordered ratio",
      "Procedure ratio",
    ],
  },
  {
    title: "Provider effectiveness",
    items: [
      "Encounters per provider day",
      "Follow-up no-shows and cancellations",
      "New patient ratio",
      "Procedure no-shows and cancellations",
    ],
  },
  {
    title: "Net operating income",
    items: [
      "Net operating income against budget",
      "Procedures",
      "Compensation per encounter",
      "Encounters per full-time provider",
      "Net operating margin",
    ],
  },
];

// Slides 21 to 29: the reports behind the scorecard.
export const reports: Card[] = [
  {
    title: "Referral management",
    body: "Turns referrals into timely treatment so patients don't get lost between the referral and the appointment: conversion rates, referrals not yet converted and why, and days to first call.",
  },
  {
    title: "Market capture",
    body: "Capture rates by ZIP code across the primary service area, and quarter-over-quarter referral trends.",
  },
  {
    title: "Referral sources",
    body: "Top referring physicians, physicians whose referrals are declining, and first-time referrers, showing which relationships are working and where to focus outreach.",
  },
  {
    title: "Quality of care",
    body: "Standard reporting of never events, inappropriate emergency department use, compliance measures, patient experience, and pain improvement.",
  },
  {
    title: "Pain improvement benchmarks",
    body: "Patient-reported improvement by procedure, compared with the PMG average: full transparency for leadership and providers about what is working and what is not.",
  },
  {
    title: "Chart audits",
    body: "A fixed number of patient charts audited each quarter to confirm patient safety and compliance standards are met.",
  },
  {
    title: "Procedure time-out audits",
    body: "A fixed number of procedure time-outs audited each quarter, from pre-procedure verification to the team's confirmation of site and level.",
  },
  {
    title: "Volume and productivity",
    body: "Volume trends, scheduling practices, provider efficiency, and procedure ratio, so the program develops as planned.",
  },
  {
    title: "Financial benchmarks",
    body: "Quarterly trends in encounters, charges and revenue, expenses, and profitability.",
  },
];

// Slide 26: what a chart audit checks. For clinical review before launch.
export const chartAuditChecks: string[] = [
  "State prescription monitoring program checks are complete",
  "Risk screening tools are complete",
  "Urine drug screens are complete",
  "Naloxone is offered alongside opioid prescriptions",
  "Prescribing levels, measured against PMG targets",
];

// Slides 30 and 31: iStats resources for providers and staff.
export const providerResources: Card[] = [
  {
    title: "Physician and APP resources",
    body: "Clinical protocols, templates, billing, and benchmarking.",
  },
  {
    title: "Clinical training videos",
    body: "For nurses and medical assistants, including coverage-policy education and diagnostic strategies.",
  },
  {
    title: "Operations planning",
    body: "Provider schedules and budgeting tools.",
  },
  {
    title: "Operational resources",
    body: "Forms, policies, and shared resources across PMG's network.",
  },
  {
    title: "MIPS reporting",
    body: "Reporting tools for Medicare's Merit-based Incentive Payment System.",
  },
  {
    title: "Staff evaluations",
    body: "Annual team competency assessments.",
  },
  {
    title: "Data queries",
    body: "Custom data queries for advanced operational insight.",
  },
];

// Slides 1 and 34.
export const leaders = [
  { name: "John Bookmyer", title: "Chairman" },
  { name: "Brad Hecker", title: "Executive Vice President" },
];
