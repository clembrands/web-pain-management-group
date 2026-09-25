// Draft copy for Home and the Partnership Model section (Phase 3). Written from the live
// site (Home, Why Choose Us, About Us), the Rev 2.0 site map notes, and the build brief.
//
// Rules: no invented numbers, outcomes, or claims. Any fact PMG has not confirmed is a
// {{TBD: ...}} placeholder, which renders highlighted and fails the launch check.
// [text](/path/) is a link. No em dashes.

import {
  growthFocus,
  hospitalChallenges,
  painBurden,
  programNeeds,
  programNeedsIntro,
  type Card,
  type FigureId,
} from "../pmg-deck.ts";

export type Step = { title: string; body: string };

export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  points?: string[];
  steps?: Step[];
  // Name of a testimonial in src/content/testimonials.ts.
  quote?: string;
  // A diagram from PMG's deck, shown after the paragraphs and points.
  figure?: FigureId;
  // Cards in a hairline grid, shown after the figure.
  cards?: Card[];
  cardColumns?: 2 | 3;
  numberedCards?: boolean;
  // Paragraphs after the figure and cards.
  after?: string[];
};

export type Media = { src: string; alt: string; caption: string };

export type EditorialContent = {
  eyebrow: string;
  lede: string;
  media?: Media;
  sections: Section[];
  related: string[];
  // Questions from the objections library answered on this page (ids), shown with FAQPage schema.
  faqs?: string[];
  // Glossary term ids used on this page (src/content/glossary.ts).
  terms?: string[];
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
    faqs: [
      "why-not-recruit",
      "other-service-lines",
      "community-hospitals",
      "track-record",
    ],
    terms: [
      "service-line",
      "hospital-based",
      "referral-pathway",
      "program-management",
    ],
    sections: [
      {
        id: "why-pain",
        title: "Why pain management deserves its own service line",
        paragraphs: [
          `About ${painBurden.chronic} U.S. adults live with chronic pain, and for ${painBurden.highImpact} of them it limits life or work on most days or every day (${painBurden.source}). Despite the need, many hospitals lack an organized system for pain management.`,
          "A fragmented approach, without the right clinical model, shows up across the hospital as five problems:",
        ],
        cards: hospitalChallenges,
      },
      {
        id: "framework",
        title: "The three pillars of a strong partnership",
        paragraphs: [
          "PMG builds every partnership on three pillars that carry a hospital from fragmented pain management to better patient outcomes.",
        ],
        figure: "framework",
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
        id: "what-makes-pmg-different",
        title: "What makes PMG different",
        paragraphs: [
          "PMG describes five things that set its partnerships apart from other pain management companies and from programs hospitals build on their own:",
        ],
        points: [
          "Programs are managed through data, with close visibility into how each one performs.",
          "PMG tracks quality outcomes, not just procedure volume. The goal is better results for patients.",
          "PMG works only with hospitals, providing pain services to rural communities, and speaks the language of hospital finance and compliance.",
          "Every partner program is led by a board-certified, fellowship-trained pain physician, and advanced practice providers go through a structured education, training, and onboarding process.",
          "The joint venture aligns incentives: what is good for patients is good for the hospital, its providers, the community, and PMG.",
        ],
      },
      {
        id: "patient-path",
        title: "How patients move through the program",
        paragraphs: [
          "The model starts with the physicians your community already trusts and keeps patients in your hospital from referral through treatment. PMG calls it the preferred state for managing pain:",
        ],
        figure: "referral-pathway",
        after: [
          "[See the full partnership process](/partnership/how-it-works/).",
        ],
      },
      {
        id: "track-record",
        title: "Hospitals that partner with PMG",
        paragraphs: [
          "Hospitals have partnered with PMG since {{SAMPLE: firstYear}}. PMG has {{PMG: partnerships}} hospital partnerships today. [Find partner centers by state](/our-partners/).",
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
    faqs: ["launch-time", "timing", "staffing", "measurement"],
    terms: [
      "program-management",
      "credentialing",
      "referral-pathway",
      "primary-care",
    ],
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
            body: `${phases[0].body} The goal is a clear answer on whether a hospital-based pain center makes sense for your hospital. {{TBD: what the assessment includes and what the hospital's team provides for it}}`,
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
            body: `${phases[3].body} Each program has a quarterly KPI scorecard in iStats, PMG's program data system, covering market capture, quality, provider effectiveness, and net operating income. [See what PMG reports](/results/). {{TBD: who attends the review meetings with the hospital, and how often}}`,
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
        id: "program-needs",
        title: "What the hospital provides to launch",
        paragraphs: [programNeedsIntro],
        cards: programNeeds,
      },
      {
        id: "responsibilities",
        title: "Who does what",
        paragraphs: [
          "PMG brings the blueprint and ongoing program management. The hospital brings the facility, its standing in the community, and the primary care physicians who refer patients.",
          "Behind every program, PMG runs the systems that keep it on track: referral management and reporting, quality and exception metrics, financial benchmarking, chart audits, and the training videos and operations manual that standardize how centers work.",
          "{{TBD: the rest of the responsibility split, including physician recruiting, employment, credentialing, professional billing, and marketing}}",
        ],
      },
      {
        id: "built-to-last",
        title: "Built to last beyond launch",
        paragraphs: [
          "Program sustainability is one of the four elements of every PMG partnership. PMG reports {{PMG: partnerRetention}} partner retention over the past two years, and the average partnership has run {{SAMPLE: avgPartnershipYears}}. Ask the rest of your questions on [What Hospital Leaders Ask](/partnership/questions/).",
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
    faqs: [
      "responsible-care",
      "other-service-lines",
      "compliance",
      "measurement",
    ],
    terms: ["multimodal", "interventional-pain", "fellowship-trained", "app"],
    sections: [
      {
        id: "medically",
        title: "Medically responsible",
        paragraphs: [
          "Before treatment begins, a board-certified, fellowship-trained pain specialist examines and diagnoses each patient. The patient then follows a balanced treatment program from a physician-led team.",
          "A balanced plan combines interventional procedures, performed with the hospital's procedure staff, and medication management when appropriate, safe, and evidence-based, with the rest of the hospital's services: physical and occupational therapy, behavioral health, lab work, and imaging.",
          "Patients and families can read about the conditions, procedures, and medications involved in the [Pain Education library](/pain-education/).",
        ],
      },
      {
        id: "care-network",
        title: "Pain management's role in the hospital",
        paragraphs: [
          "The pain center sits at the middle of the hospital's care, not beside it. Patients arrive from primary care and other physicians, and the center sends them on to the services that help them recover, with two-way referrals to the surgical and specialty services that share their care.",
        ],
        figure: "care-network",
      },
      {
        id: "monitored",
        title: "Safety checked every quarter",
        paragraphs: [
          "PMG audits a fixed number of patient charts at every partner center each quarter to confirm patient safety and compliance standards are met. A chart audit checks that:",
        ],
        points: [
          "State prescription monitoring program checks are complete",
          "Risk screening tools are complete",
          "Urine drug screens are complete",
          "Naloxone is offered alongside opioid prescriptions",
          "Prescribing levels are measured against PMG targets",
        ],
        after: [
          "PMG also audits a fixed number of procedure time-outs each quarter, from the provider's verification of consent and site before the procedure, to the time-out itself, to the team's confirmation of site and level against the schedule.",
        ],
      },
      {
        id: "socially",
        title: "Socially responsible",
        paragraphs: [
          "PMG exists to help hospitals better serve their communities by providing safe and responsible pain treatment. An organized program is designed to answer the problems hospitals see without one:",
        ],
        cards: hospitalChallenges,
      },
      {
        id: "financially",
        title: "Financially responsible",
        paragraphs: [
          "A pain program has to sustain itself to keep serving the community. The PMG model moves patients through a coordinated care path and directs them to the appropriate resources in your hospital, which drives downstream revenue back to the hospital. PMG focuses on three things to grow outpatient volume:",
        ],
        cards: growthFocus,
        after: [
          "See how the economics are structured on [Partnership and Financial Model](/partnership/financial-model/).",
        ],
      },
      {
        id: "measured",
        title: "Measured, not assumed",
        paragraphs: [
          "Quantifiable outcomes and results are part of the model. Each program's quality report covers never events, inappropriate emergency department use, compliance measures, patient experience, and patient-reported pain improvement by procedure, benchmarked against the PMG average. [See what PMG reports](/results/).",
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
    faqs: ["structure", "investment", "revenue", "break-even", "exit"],
    terms: ["joint-venture", "break-even", "payer-mix", "encounter"],
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
          "Limited capital. A PMG program is designed to launch with a small footprint using mostly existing hospital resources: underused space, one procedure room, and four exam rooms, with the procedure equipment and hospital services the program needs. [See the full list](/partnership/how-it-works/#program-needs).",
          "{{TBD: typical startup investment by the hospital, what it covers (equipment, staffing, working capital), and what PMG contributes}}",
        ],
      },
      {
        id: "revenue",
        title: "Where the revenue comes from",
        paragraphs: [
          "The center earns revenue from outpatient pain management services. {{TBD: how professional and facility services are billed, and by whom}}",
          "The PMG model also moves patients through a coordinated care path and directs them to the appropriate resources in your hospital, which drives downstream revenue back to the hospital: physical and occupational therapy, lab services, radiology, behavioral health, and specialty referrals to orthopedics, neurology, and neurosurgery.",
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
        id: "financial-reporting",
        title: "How the finances are reported",
        paragraphs: [
          "Each quarter, PMG reports the program's financial benchmarks to the partner hospital: encounters, charges and revenue per encounter, expenses, and net operating margin, alongside net operating income against budget on the program's KPI scorecard.",
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
      "That means a hospital-based model, a balanced treatment approach, a referral path from your primary care physicians, and quantifiable outcomes. PMG also runs the systems a single physician can't: referral management, market capture and referral source reporting, quarterly chart and procedure audits, financial benchmarking across its network, and the clinical protocols, training videos, and operations manual behind every center.",
      "{{TBD: PMG's role in physician recruiting, credentialing, and billing}}",
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
      "Limited capital: a PMG program launches with a small footprint using mostly existing hospital resources, such as underused space, one procedure room, four exam rooms, a C-arm, and radiofrequency ablation equipment.",
      "{{TBD: typical hospital startup investment and what it covers, confirmed by PMG}}. [See what a program needs](/partnership/how-it-works/#program-needs).",
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
      "The PMG model moves patients through a coordinated care path and directs them to the appropriate resources in your hospital, such as physical therapy, imaging, lab services, and specialty care, instead of losing them to other systems. {{TBD: how revenue is billed and shared between the hospital and PMG}}",
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
      "Medication is managed when appropriate, safe, and evidence-based, as one part of a plan that includes procedures and other hospital services. Each quarter PMG audits a fixed number of charts at every center, checking prescription monitoring, risk screening, drug screens, whether naloxone is offered alongside opioid prescriptions, and prescribing levels against PMG targets. [The Balanced Pain Treatment Model](/partnership/balanced-pain-treatment/) explains the approach.",
    ],
  },
  {
    id: "measurement",
    question: "How will we know whether the program is working?",
    answer: [
      "By its numbers: every program has a quarterly KPI scorecard covering market capture, quality, provider effectiveness, and net operating income, each against a target.",
      "The scorecard is built from iStats, PMG's program data system, with consistent definitions and benchmarking against PMG's other sites. Behind it sit referral, quality, pain improvement, audit, productivity, and financial reports. See them on [Results and Outcomes](/results/).",
    ],
  },
  {
    id: "community-hospitals",
    question: "Will this work at a community hospital our size?",
    answer: [
      "Many of PMG's partners are community hospitals, such as Adams County Regional Medical Center in Seaman, Ohio, Twin Lakes Regional Medical Center in Leitchfield, Kentucky, and Decatur County Memorial Hospital in Greensburg, Indiana.",
      "PMG partners with health systems and independent hospitals, large and small, and a program launches with a small footprint using mostly existing hospital resources. Browse partners by state on [Our Partners](/our-partners/).",
    ],
  },
  {
    id: "track-record",
    question: "How long has PMG been doing this, and do hospitals stay?",
    answer: [
      "PMG has partnered with hospitals since {{SAMPLE: firstYear}} and reports {{PMG: partnerRetention}} partner retention over the past two years. The average partnership has run {{SAMPLE: avgPartnershipYears}}.",
      "Patrick J. Martin of Fisher-Titus Medical Center says the hospital started its program with PMG in 2009. [Read what partner leaders say](/results/testimonials/).",
    ],
  },
  {
    id: "other-service-lines",
    question:
      "Will a pain program take business from our orthopedics or primary care physicians?",
    answer: [
      "It is built to do the opposite: the pain center refers patients on to your other services, and works with orthopedics, neurology, and neurosurgery through two-way referrals and shared care plans.",
      "Primary care physicians refer patients into the hospital's own pain center, which sends them on to physical and occupational therapy, lab services, radiology, behavioral health, and specialty care as needed. Patients stay within your hospital from referral through treatment. [See pain management's role in the hospital](/partnership/balanced-pain-treatment/#care-network).",
    ],
  },
  {
    id: "compliance",
    question:
      "How does the partnership handle compliance, including Stark law, opioid scrutiny, and billing?",
    answer: [
      "Regulatory compliance is one of the three pillars of every PMG partnership: safe, high-quality care that keeps pace as federal and state requirements change. Each quarter PMG audits a fixed number of charts and procedure time-outs at every center, and iStats supports MIPS reporting.",
      "{{TBD: how the joint venture is structured for Stark and anti-kickback compliance, and how documentation and billing are reviewed}}. PMG works only with hospitals and knows the compliance questions hospital leaders ask. [Read how PMG keeps pain care responsible](/partnership/balanced-pain-treatment/#monitored).",
    ],
  },
  {
    id: "timing",
    question:
      "We have other priorities right now. When does it make sense to start?",
    answer: [
      "{{TBD: how PMG fits the first phase around a hospital's other priorities, and what a first assessment asks of the hospital's team}}.",
      "A partnership starts with an assessment of your community's need and where pain patients go today, which tells you whether a program makes sense before anything is committed. When you do launch, the program starts small, using mostly existing hospital resources. [See the four phases](/partnership/how-it-works/).",
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
