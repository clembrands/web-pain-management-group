// Draft copy for Home and the Partnership Model section (Phase 3). Written from the live
// site (Home, Why Choose Us, About Us), the Rev 2.0 site map notes, and the build brief.
//
// Rules: no invented numbers, outcomes, or claims. Any fact PMG has not confirmed is a
// {{TBD: ...}} placeholder, which renders highlighted and fails the launch check.
// [text](/path/) is a link. No em dashes.

export type Step = { title: string; body: string };

export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  points?: string[];
  steps?: Step[];
  // Name of a testimonial in src/content/testimonials.ts.
  quote?: string;
};

export type Media = { src: string; alt: string; caption: string };

export type EditorialContent = {
  eyebrow: string;
  lede: string;
  media?: Media;
  sections: Section[];
  related: string[];
};

const concept = "Concept photography · final PMG imagery to follow";
const leadershipPhoto: Media = {
  src: "/assets/concept-corridor.jpg",
  alt: "A physician walking through the corridor of a community hospital outpatient clinic",
  caption: concept,
};

// The four phases appear on Home and on How the Partnership Works.
// Phase names are a draft for PMG to confirm.
export const phases: Step[] = [
  {
    title: "Assess the opportunity",
    body: "PMG and your leadership team look at community need, primary care referral patterns, the pain services you offer today, and where pain patients go now.",
  },
  {
    title: "Design the program",
    body: "Using PMG's blueprint, the partners define the center: scope of services, space, staffing, and the referral pathway from your primary care physicians.",
  },
  {
    title: "Build and launch",
    body: "The hospital-based center opens and primary care physicians begin referring patients to it.",
  },
  {
    title: "Manage and grow",
    body: "PMG provides ongoing program management after launch and tracks quantifiable outcomes and results with your team.",
  },
];

// The four elements the live site says PMG provides every partner.
export const pillars: Step[] = [
  {
    title: "Hospital-based model",
    body: "The center is part of your hospital. Your primary care physicians refer into it, and patients stay in the system that already serves them.",
  },
  {
    title: "Balanced treatment approach",
    body: "Pain care that is medically, socially, and financially responsible. [How the model works](/partnership/balanced-pain-treatment/).",
  },
  {
    title: "Program sustainability",
    body: "PMG provides the blueprint and ongoing program management, so the service line keeps running after launch.",
  },
  {
    title: "Quantifiable outcomes and results",
    body: "Every program is measured. [See Results and Outcomes](/results/).",
  },
];

export const patientPath: string[] = [
  "A primary care physician refers the patient to the hospital-based pain management center.",
  "A board-certified, fellowship-trained pain specialist examines and diagnoses the patient.",
  "The patient follows a balanced treatment program.",
  "The PMG model moves the patient through a coordinated care path and to the appropriate resources in your hospital.",
];

export const partnershipPages: Record<string, EditorialContent> = {
  "/partnership/": {
    eyebrow: "For hospital leaders",
    lede: "Pain Management Group partners with health systems and independent hospitals to build and manage hospital-based outpatient pain management centers. Your hospital gets PMG's blueprint and ongoing program management. Your community gets safe, responsible pain care close to home.",
    media: {
      src: "/assets/concept-corridor.jpg",
      alt: "A physician walking through the corridor of a community hospital outpatient clinic",
      caption: concept,
    },
    sections: [
      {
        id: "why-pain",
        title: "Why pain management deserves its own service line",
        paragraphs: [
          "An estimated 100 million U.S. adults live with chronic pain, more than heart disease, cancer, and diabetes combined, according to the Institute of Medicine's 2011 report [Relieving Pain in America](https://www.nationalacademies.org/publications/13172). Despite the need, many hospitals lack an efficient system for pain management.",
          "Without an organized program, the cost shows up across the hospital:",
        ],
        points: [
          "Primary care physicians have nowhere dependable to send pain patients",
          "Medication management is inappropriate or inconsistent",
          "Pain patients seek care in the emergency department",
          "Patients are unsure which specialist to see",
          "Patients are lost from the hospital system",
          "Care is not coordinated across services",
        ],
      },
      {
        id: "what-pmg-does",
        title: "What PMG brings to your hospital",
        paragraphs: [
          "PMG gives each partner the blueprint and ongoing program management to grow a high-quality outpatient pain management service line. Every partnership is built on four elements:",
        ],
        steps: pillars,
      },
      {
        id: "patient-path",
        title: "How patients move through the program",
        paragraphs: [
          "The model starts with the physicians your community already trusts and keeps patients in your hospital from referral through treatment. [See the full partnership process](/partnership/how-it-works/).",
        ],
        points: patientPath,
      },
      {
        id: "track-record",
        title: "Hospitals that partner with PMG",
        paragraphs: [
          "Hospitals have partnered with PMG since {{SAMPLE: firstYear}}. PMG manages {{SAMPLE: partnerships}} partnerships today. [Find partner centers by state](/our-partners/).",
        ],
        quote: "Patrick J. Martin",
      },
    ],
    related: [
      "/partnership/how-it-works/",
      "/partnership/balanced-pain-treatment/",
      "/partnership/financial-model/",
      "/partnership/questions/",
    ],
  },

  "/partnership/how-it-works/": {
    eyebrow: "Partnership Model",
    lede: "A PMG partnership moves through four phases, from the first conversation about your community's needs to a hospital-based pain center that PMG helps manage for the long term.",
    media: leadershipPhoto,
    sections: [
      {
        id: "phases",
        title: "The four phases of a partnership",
        paragraphs: [
          "Typical time from signed agreement to first patient: {{SAMPLE: timeToFirstPatient}}.",
        ],
        steps: [
          {
            title: phases[0].title,
            body: `${phases[0].body} The goal is a clear answer on whether a hospital-based pain center makes sense for your hospital. {{TBD: what the assessment includes and what the hospital provides for it}}`,
          },
          {
            title: phases[1].title,
            body: `${phases[1].body} {{TBD: agreement and joint-venture setup steps}}`,
          },
          {
            title: phases[2].title,
            body: `${phases[2].body} {{TBD: who recruits and credentials the pain specialists and APPs, and how the care team is trained}}`,
          },
          {
            title: phases[3].title,
            body: `${phases[3].body} {{TBD: reporting cadence, measures, and review meetings}}`,
          },
        ],
      },
      {
        id: "patient-path",
        title: "What happens for patients",
        paragraphs: [
          "Once the center is open, patients follow the same coordinated path at every PMG partner hospital:",
        ],
        points: patientPath,
      },
      {
        id: "responsibilities",
        title: "Who does what",
        paragraphs: [
          "PMG brings the blueprint and ongoing program management. The hospital brings the facility, its standing in the community, and the primary care physicians who refer patients.",
          "{{TBD: full responsibility split between the hospital and PMG, including space and equipment, physician recruiting, staffing, credentialing, billing, marketing, and compliance}}",
        ],
      },
      {
        id: "built-to-last",
        title: "Built to last beyond launch",
        paragraphs: [
          "Program sustainability is one of the four elements of every PMG partnership. {{SAMPLE: partnerRetention}} of partner hospitals renew at the end of their contract term, and the average partnership has run {{SAMPLE: avgPartnershipYears}}. Ask the rest of your questions on [What Hospital Leaders Ask](/partnership/questions/).",
        ],
        quote: "Patrick J. Martin",
      },
    ],
    related: [
      "/partnership/financial-model/",
      "/partnership/balanced-pain-treatment/",
      "/partnership/questions/",
    ],
  },

  "/partnership/balanced-pain-treatment/": {
    eyebrow: "Partnership Model",
    lede: "Balanced Pain Treatment is PMG's model for pain care that is medically responsible for patients, socially responsible for communities, and financially responsible for the hospitals that provide it. PMG's partner centers are Balanced Pain Treatment Centers.",
    media: {
      src: "/assets/concept-exam-room.jpg",
      alt: "An empty consultation room in a community hospital clinic, lit by a window",
      caption: concept,
    },
    sections: [
      {
        id: "medically",
        title: "Medically responsible",
        paragraphs: [
          "Before treatment begins, a board-certified, fellowship-trained pain specialist examines and diagnoses each patient. The patient then follows a balanced treatment program.",
          "{{TBD: what a balanced treatment plan includes and how medication, including opioids, is managed. To be written with PMG's clinical team.}}",
          "Patients and families can read about the conditions, procedures, and medications involved in the [Pain Education library](/pain-education/).",
        ],
      },
      {
        id: "socially",
        title: "Socially responsible",
        paragraphs: [
          "PMG exists to help hospitals better serve their communities by providing safe and responsible pain treatment. An organized program is designed to answer the problems hospitals see without one:",
        ],
        points: [
          "Frustrated primary care physicians",
          "Inappropriate medication management",
          "Pain patients seeking care in the emergency department",
          "Patients confused about which specialist to see",
          "Patients lost from the hospital system",
          "A lack of care coordination",
        ],
      },
      {
        id: "financially",
        title: "Financially responsible",
        paragraphs: [
          "A pain program has to sustain itself to keep serving the community. The PMG model moves patients through a coordinated care path and directs them to the appropriate resources in your hospital, which drives downstream revenue back to the hospital.",
          "See how the economics are structured on [Partnership and Financial Model](/partnership/financial-model/).",
        ],
      },
      {
        id: "measured",
        title: "Measured, not assumed",
        paragraphs: [
          "Quantifiable outcomes and results are part of the model. {{TBD: the clinical, patient-experience, and financial measures PMG tracks for each program}}. Program results are published on [Results and Outcomes](/results/).",
        ],
      },
    ],
    related: [
      "/partnership/how-it-works/",
      "/partnership/financial-model/",
      "/partnership/questions/",
    ],
  },

  "/partnership/financial-model/": {
    eyebrow: "Partnership Model",
    lede: "PMG partnerships are structured as joint ventures between the hospital and PMG. This page explains the structure in plain terms. Numbers for your hospital come from a conversation with your team.",
    media: leadershipPhoto,
    sections: [
      {
        id: "structure",
        title: "How the joint venture is structured",
        paragraphs: [
          "{{TBD: legal structure of the joint venture, ownership split between the hospital and PMG, and who holds which decision rights}}",
          "The pain management center itself is hospital-based, and your primary care physicians refer patients into it.",
        ],
      },
      {
        id: "investment",
        title: "What the hospital invests",
        paragraphs: [
          "{{TBD: typical startup investment by the hospital, what it covers (space, equipment, staffing, working capital), and what PMG contributes}}",
        ],
      },
      {
        id: "revenue",
        title: "Where the revenue comes from",
        paragraphs: [
          "The center earns revenue from outpatient pain management services. {{TBD: how professional and facility services are billed, and by whom}}",
          "The PMG model also moves patients through a coordinated care path and directs them to the appropriate resources in your hospital, which drives downstream revenue back to the hospital.",
        ],
      },
      {
        id: "shared-results",
        title: "How results are shared",
        paragraphs: [
          "{{TBD: how operating income is distributed, and how PMG is compensated (management fee, share of income, or both)}}",
        ],
      },
      {
        id: "break-even",
        title: "When the program breaks even",
        paragraphs: [
          "Across PMG partnerships, a new program typically breaks even {{SAMPLE: breakEven}} of opening. For any one hospital, the answer depends on primary care referral volume, payer mix, and staffing.",
        ],
      },
      {
        id: "first-conversation",
        title: "What to bring to the first conversation",
        paragraphs: [
          "These inputs make a hospital-specific evaluation possible:",
        ],
        points: [
          "Primary care referral volume and patterns",
          "The pain services you offer today, and where pain patients go now, including the emergency department",
          "Available clinic space and procedure capacity",
          "Payer mix",
        ],
      },
    ],
    related: [
      "/partnership/questions/",
      "/partnership/how-it-works/",
      "/results/",
    ],
  },
};

// /partnership/questions/. Each question is worded the way a hospital CEO or CFO asks it,
// and the first sentence of the answer answers it directly. Draft for review with PMG.
export type Question = { id: string; question: string; answer: string[] };

export const hospitalLeaderQuestions: Question[] = [
  {
    id: "why-not-recruit",
    question:
      "Why partner with PMG instead of recruiting a pain physician ourselves?",
    answer: [
      "Because a physician is only one part of a pain program: PMG brings the blueprint and ongoing program management that turn a specialist into a sustainable service line.",
      "That means a hospital-based model, a balanced treatment approach, a referral path from your primary care physicians, and quantifiable outcomes. {{TBD: what PMG handles that a hospital recruiting on its own would have to build, such as recruiting, credentialing, billing, and compliance}}",
    ],
  },
  {
    id: "structure",
    question: "How is a PMG partnership structured?",
    answer: [
      "As a joint venture between your hospital and PMG. {{TBD: legal entity, ownership split, and decision rights}}",
      "[Partnership and Financial Model](/partnership/financial-model/) explains the structure in plain terms.",
    ],
  },
  {
    id: "investment",
    question: "What does the hospital have to invest to launch the program?",
    answer: [
      "{{TBD: typical hospital startup investment and what it covers, confirmed by PMG}}.",
      "The amount depends on the space, equipment, and staffing your center needs, which are defined when the program is designed. [See the four phases](/partnership/how-it-works/).",
    ],
  },
  {
    id: "launch-time",
    question: "How long does it take to launch a program?",
    answer: [
      "A new program typically takes {{SAMPLE: timeToFirstPatient}} to launch.",
      "That time covers the first three phases of a partnership: assessing the opportunity, designing the program, and building and launching the center. [See the four phases](/partnership/how-it-works/).",
    ],
  },
  {
    id: "break-even",
    question: "How long until the program breaks even?",
    answer: [
      "A new program typically breaks even {{SAMPLE: breakEven}} of opening.",
      "The main drivers are primary care referral volume, payer mix, and how quickly clinic schedules fill.",
    ],
  },
  {
    id: "revenue",
    question: "How does the program make money for the hospital?",
    answer: [
      "Through outpatient pain management services at the hospital-based center, and the downstream services those patients receive in your hospital.",
      "The PMG model moves patients through a coordinated care path and directs them to the appropriate resources in your hospital, instead of losing them to other systems. {{TBD: how revenue is billed and shared between the hospital and PMG}}",
    ],
  },
  {
    id: "control",
    question: "Will the center carry our name, and who makes the decisions?",
    answer: [
      "Partner centers carry their hospital's name, like the Fisher-Titus Pain Management Centers and the Knox Center for Pain Management. {{TBD: governance structure and which decisions the hospital controls}}",
      "See every partner center on [Our Partners](/our-partners/).",
    ],
  },
  {
    id: "staffing",
    question: "Who recruits and employs the physicians and APPs?",
    answer: [
      "{{TBD: who recruits, employs, and credentials the pain physicians and APPs}}.",
      "Every patient is examined and diagnosed by a board-certified, fellowship-trained pain specialist. [For Providers](/providers/) describes the roles.",
    ],
  },
  {
    id: "responsible-care",
    question:
      "How do you keep pain care, including opioid prescribing, responsible?",
    answer: [
      "Every PMG partner center follows the Balanced Pain Treatment model, which is built to be medically, socially, and financially responsible.",
      "{{TBD: prescribing and monitoring protocols, confirmed by PMG's clinical team}}. [The Balanced Pain Treatment Model](/partnership/balanced-pain-treatment/) explains the approach.",
    ],
  },
  {
    id: "measurement",
    question: "How will we know whether the program is working?",
    answer: [
      "By its numbers: quantifiable outcomes and results are one of the four elements PMG provides every partner.",
      "{{TBD: which measures are reported, how often, and to whom}}. See what PMG reports on [Results and Outcomes](/results/).",
    ],
  },
  {
    id: "community-hospitals",
    question: "Will this work at a community hospital our size?",
    answer: [
      "Many of PMG's partners are community hospitals, such as Adams County Regional Medical Center in Seaman, Ohio, Twin Lakes Regional Medical Center in Leitchfield, Kentucky, and Decatur County Memorial Hospital in Greensburg, Indiana.",
      "{{TBD: how PMG sizes a program for a smaller referral base}}. Browse partners by state on [Our Partners](/our-partners/).",
    ],
  },
  {
    id: "track-record",
    question: "How long has PMG been doing this, and do hospitals stay?",
    answer: [
      "PMG has partnered with hospitals since {{SAMPLE: firstYear}}. {{SAMPLE: partnerRetention}} of partner hospitals renew at the end of their contract term, and the average partnership has run {{SAMPLE: avgPartnershipYears}}.",
      "Patrick J. Martin of Fisher-Titus Medical Center says the hospital started its program with PMG in 2009. [Read what partner leaders say](/results/testimonials/).",
    ],
  },
  {
    id: "exit",
    question: "What happens if the partnership isn't working?",
    answer: [
      "{{TBD: contract term, performance review process, and exit or unwind provisions}}.",
      "Ask about these terms on your first call with PMG.",
    ],
  },
];

// The four questions previewed on Home.
export const homeQuestionIds = [
  "why-not-recruit",
  "structure",
  "control",
  "community-hospitals",
];
