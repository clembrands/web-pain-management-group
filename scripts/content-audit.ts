// Content depth audit of a running build, for the SEO/GEO content plan. For every page in
// sitemap.xml: words of page content (the hero and body, without the shared related-links
// and closing-CTA sections), H2 count, internal links, TBD placeholders, sample figures,
// FAQPage schema, and structured-data types. Writes deliverables/seo-content-audit.csv.
//
//   npm run audit:content -- http://localhost:3100

import { writeFileSync } from "node:fs";
import { allRoutes } from "../src/lib/routes.ts";
import { educationArticles } from "../src/content/legacy/education.ts";
import { partnerStates } from "../src/content/legacy/states.ts";
import { partnerHospitals } from "../src/content/legacy/partners.ts";

// The intent map: what each page must answer, the searches it should own, its priority
// (P1 first), the template additions it needs, and what only PMG can supply. Phrases are
// editorial judgment for validation in Search Console after launch, not volume data.
type Intent = {
  question: string;
  phrases: string[];
  priority: "P1" | "P2" | "P3";
  actions: string;
  pmgInput: string;
};
const template =
  "direct answer in the first 50 words; H2s as questions; key facts block; 3 to 5 page FAQs with FAQPage schema; plain-language definitions; related links both ways";
const sectionIntents: Record<string, Intent> = {
  "/": {
    question: "What does Pain Management Group do for hospitals?",
    phrases: [
      "hospital pain management partnership",
      "pain management service line",
      "outsourced pain management program",
      "Pain Management Group Findlay Ohio",
    ],
    priority: "P1",
    actions:
      "FAQPage schema on the four home questions; confirmed figures replace samples",
    pmgInput: "Figures in sections 1 and 5 of the confirmation list",
  },
  "/partnership/": {
    question:
      "Why should a hospital add a pain management service line, and how does PMG partner?",
    phrases: [
      "hospital pain management program",
      "pain management service line",
      "hospital pain clinic partnership",
      "joint venture pain management",
    ],
    priority: "P1",
    actions: template + "; grow to 900 to 1,200 words from the interview",
    pmgInput: "Partnership structure, partner count, four-element model detail",
  },
  "/partnership/how-it-works/": {
    question: "How is a PMG hospital partnership launched, phase by phase?",
    phrases: [
      "how to start a hospital pain management program",
      "opening a hospital pain management center",
      "pain clinic implementation timeline",
      "pain management program launch",
    ],
    priority: "P1",
    actions:
      template +
      "; HowTo schema on the four phases once the phase content is confirmed",
    pmgInput: "What each phase includes, who does what, typical timeline",
  },
  "/partnership/balanced-pain-treatment/": {
    question:
      "What is Balanced Pain Treatment and how does it keep pain care responsible?",
    phrases: [
      "balanced pain treatment",
      "multimodal pain management program hospital",
      "responsible opioid prescribing hospital program",
      "interventional pain management program",
    ],
    priority: "P1",
    actions:
      template +
      "; definitions of the three responsibilities; link each Pain Education procedure",
    pmgInput:
      "Treatment plan components and prescribing protocols (clinical sign-off)",
  },
  "/partnership/financial-model/": {
    question:
      "How is a PMG partnership structured and how does it pay for itself?",
    phrases: [
      "hospital pain management joint venture",
      "pain management program ROI hospital",
      "pain clinic revenue for hospitals",
      "hospital service line financial model",
    ],
    priority: "P1",
    actions: template + "; worked example only with PMG-confirmed figures",
    pmgInput:
      "Structure, startup investment, billing and revenue share, break-even",
  },
  "/partnership/questions/": {
    question:
      "What do hospital leaders ask before partnering, and what are the answers?",
    phrases: [
      "questions to ask a pain management partner",
      "outsourcing pain management hospital",
      "pain management partnership contract",
      "hospital pain program risks",
    ],
    priority: "P1",
    actions:
      "fill the 10 placeholders; keep answer-first format; add 3 to 5 questions PMG hears most",
    pmgInput:
      "Answers to the 10 open questions; sign-off on opioid and exit answers",
  },
  "/results/": {
    question: "What results do PMG partnerships produce for hospitals?",
    phrases: [
      "hospital pain management program outcomes",
      "pain management partnership results",
      "pain clinic patient volume hospital",
      "pain program retention",
    ],
    priority: "P1",
    actions: template + "; each figure with definition, source, period",
    pmgInput: "Every figure on Results and the dashboard",
  },
  "/results/dashboard/": {
    question:
      "Which measures does PMG track, and what are the current numbers?",
    phrases: [
      "pain management program KPIs",
      "pain clinic metrics hospital",
      "pain management outcomes dashboard",
    ],
    priority: "P2",
    actions:
      "method note per measure; last-updated date; Dataset schema once real",
    pmgInput: "Confirmed measures, values, sources, periods",
  },
  "/results/testimonials/": {
    question: "What do partner hospital leaders say about PMG?",
    phrases: [
      "Pain Management Group reviews",
      "PMG partner hospital testimonials",
    ],
    priority: "P3",
    actions:
      "context line per quote (hospital, role, year) once confirmed; no Review schema without consent",
    pmgInput: "Confirm titles and years; permission for any new quotes",
  },
  "/results/case-studies/": {
    question: "How did a specific partnership go, start to finish?",
    phrases: [
      "hospital pain management case study",
      "pain clinic partnership case study",
    ],
    priority: "P2",
    actions:
      "first two case studies unlock the index; Article schema per study",
    pmgInput: "Partner, approved figures, permission",
  },
  "/our-partners/": {
    question:
      "Where are PMG partner hospitals, and how do patients make an appointment?",
    phrases: [
      "Pain Management Group partner hospitals",
      "pain management clinic near me",
      "hospital pain clinic locations",
      "PMG pain clinics",
    ],
    priority: "P1",
    actions:
      "one-line summary per state; how appointments work; patient FAQs with schema",
    pmgInput: "Directory confirmation (section 7); appointment guidance",
  },
  "/providers/": {
    question: "Why practice pain medicine with PMG?",
    phrases: [
      "pain management physician jobs",
      "interventional pain physician jobs Ohio",
      "hospital-based pain management physician",
      "pain management APP jobs",
    ],
    priority: "P2",
    actions:
      template +
      "; where PMG hires (states); what the practice model means day to day",
    pmgInput: "Autonomy, support, schedules, compensation approach",
  },
  "/providers/why-pmg/": {
    question: "What is it like to practice at a PMG partner center?",
    phrases: [
      "pain management physician practice model",
      "pain physician autonomy hospital employment",
      "pain management practice support",
    ],
    priority: "P2",
    actions: template + "; fill the 4 placeholders",
    pmgInput:
      "Clinical decision-making, procedure support, schedules, compensation",
  },
  "/providers/opportunities/": {
    question: "What openings does PMG have now, and where?",
    phrases: [
      "pain management physician jobs Ohio",
      "pain management nurse practitioner jobs",
      "interventional pain jobs Kentucky Indiana",
    ],
    priority: "P2",
    actions:
      "states where PMG hires; what the recruiting process looks like; JobPosting schema only if openings are listed on the page",
    pmgInput: "Recruiting process; whether openings can be listed here",
  },
  "/about-us/": {
    question: "Who is Pain Management Group?",
    phrases: [
      "Pain Management Group Findlay Ohio",
      "Pain Management Group company",
      "pain management management company hospitals",
    ],
    priority: "P2",
    actions:
      template +
      "; founding, leadership, footprint; Organization schema detail (founder, foundingDate) once confirmed",
    pmgInput: "Founding story, year, leadership",
  },
  "/about-us/mission/": {
    question: "What does PMG believe, and where did it start?",
    phrases: ["Pain Management Group mission", "PMG history"],
    priority: "P3",
    actions: "story from the interview; timeline",
    pmgInput: "Founding story",
  },
  "/about-us/careers/": {
    question: "What non-clinical roles does PMG hire for?",
    phrases: [
      "Pain Management Group careers",
      "healthcare management jobs Findlay Ohio",
    ],
    priority: "P3",
    actions: "team functions; how to apply",
    pmgInput: "Roles and functions",
  },
  "/news/": {
    question: "What is new at PMG?",
    phrases: ["Pain Management Group news"],
    priority: "P3",
    actions: "regular cadence: one post per new partner, award, or milestone",
    pmgInput: "News items",
  },
  "/contact/": {
    question: "How do I reach PMG, and what happens after I do?",
    phrases: ["Pain Management Group contact", "Pain Management Group phone"],
    priority: "P2",
    actions:
      "what happens after the form; office hours; LocalBusiness schema for the office",
    pmgInput: "Hours; response commitment",
  },
  "/pain-education/": {
    question:
      "Which pain conditions, procedures and medications does PMG explain for patients?",
    phrases: [
      "pain conditions explained",
      "interventional pain procedures list",
      "pain education for patients",
      "pain management treatments",
    ],
    priority: "P2",
    actions:
      "longer category introductions; when to see a pain specialist; link to state pages; glossary (needs approval as a new page)",
    pmgInput: "Clinician review",
  },
  "/sitemap/": {
    question: "Where is everything on the site?",
    phrases: [],
    priority: "P3",
    actions: "none",
    pmgInput: "none",
  },
};
function intent(path: string): Intent {
  if (sectionIntents[path]) return sectionIntents[path];
  const state = partnerStates.find((s) => path === `/our-partners/${s.slug}/`);
  if (state) {
    const here = partnerHospitals.filter((p) => p.state === state.slug);
    const cities = [...new Set(here.map((p) => p.city).filter(Boolean))].slice(
      0,
      4,
    );
    return {
      question: `Which hospitals in ${state.name} have a PMG pain management center, and how do I reach them?`,
      phrases: [
        `pain management clinic in ${state.name}`,
        `hospital pain clinic ${state.name}`,
        ...cities.map((c) => `pain management ${c} ${state.abbr}`),
        ...here.slice(0, 2).map((p) => `${p.name}`),
      ],
      priority: here.length >= 4 ? "P1" : "P2",
      actions:
        "one paragraph per hospital (services, since when, who refers); MedicalClinic schema with address and phone; patient FAQs (appointments, referrals) with schema",
      pmgInput:
        "Per-hospital details from PMG or the partner; directory confirmation",
    };
  }
  const article = educationArticles.find(
    (a) => path === `/pain-education/${a.slug}/`,
  );
  if (article) {
    const t = article.title
      .replace(/[®]/g, "")
      .replace(/\s*\(.*?\)\s*/g, " ")
      .trim();
    const byCategory = {
      Conditions: {
        q: `What is ${t}, what causes it, what are the symptoms, and how is it treated?`,
        ph: [
          `${t} symptoms`,
          `${t} causes`,
          `${t} treatment`,
          `what is ${t.toLowerCase()}`,
        ],
        pr: "P1" as const,
      },
      Procedures: {
        q: `What is ${t}, who is it for, and what should a patient expect?`,
        ph: [
          `${t} procedure`,
          `${t} what to expect`,
          `${t} recovery`,
          `${t} side effects`,
        ],
        pr: "P2" as const,
      },
      Medications: {
        q: `What should patients know about ${t.toLowerCase()}?`,
        ph: [
          t.toLowerCase(),
          `${t.toLowerCase()} risks`,
          `${t.toLowerCase()} pain management`,
        ],
        pr: "P2" as const,
      },
    }[article.category] ?? { q: t, ph: [t], pr: "P2" as const };
    return {
      question: byCategory.q,
      phrases: byCategory.ph,
      priority: byCategory.pr,
      actions:
        "plain-language summary at top; 'when to see a pain specialist'; 'where this is offered' linking to state pages; 3 FAQs with schema; MedicalCondition or MedicalProcedure schema; condition-to-procedure links; medical text itself unchanged",
      pmgInput: "Clinician review of the added sections and the disclaimer",
    };
  }
  return {
    question: "",
    phrases: [],
    priority: "P3",
    actions: "",
    pmgInput: "",
  };
}

const base = new URL(process.argv[2] ?? "http://localhost:3100").origin;
const text = (html: string) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type Row = Record<string, string | number>;
const rows: Row[] = [];
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
for (const path of paths) {
  const html = await (await fetch(`${base}${path}`)).text();
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  // Page content ends where the shared sections begin.
  const cut = main.search(
    /Continue exploring|More conditions|More procedures|More medications|>Next step</,
  );
  const content = cut > 0 ? main.slice(0, cut) : main;
  const words = text(content).split(" ").filter(Boolean).length;
  const route = allRoutes.find((r) => r.path === path);
  const section = path.split("/")[1] || "home";
  const plan = intent(path);
  rows.push({
    path,
    section,
    audience: route?.audience ?? "",
    title: route?.title ?? "",
    words,
    h2s: (content.match(/<h2\b/g) ?? []).length,
    internal_links: new Set(
      [...content.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]),
    ).size,
    tbd: (content.match(/data-tbd/g) ?? []).length,
    sample_figures: (content.match(/data-sample=/g) ?? []).length,
    faq_schema: /"@type":"FAQPage"/.test(html) ? "yes" : "no",
    schema: [...html.matchAll(/"@type":"([A-Za-z]+)"/g)]
      .map((m) => m[1])
      .filter(
        (t, i, a) =>
          a.indexOf(t) === i &&
          ![
            "ListItem",
            "PostalAddress",
            "Question",
            "Answer",
            "Organization",
            "BreadcrumbList",
            "PeopleAudience",
          ].includes(t),
      )
      .join(" "),
    depth: words < 300 ? "thin" : words < 600 ? "moderate" : "substantial",
    priority: plan.priority,
    question_answered: plan.question,
    target_phrases: plan.phrases.join("; "),
    actions: plan.actions,
    pmg_input: plan.pmgInput,
  });
}
const cell = (v: string | number) =>
  /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
const cols = Object.keys(rows[0]);
writeFileSync(
  new URL("../deliverables/seo-content-audit.csv", import.meta.url),
  [
    cols.join(","),
    ...rows.map((r) => cols.map((c) => cell(r[c])).join(",")),
  ].join("\n") + "\n",
);
const by = (f: (r: Row) => boolean) => rows.filter(f).length;
console.log(
  `${rows.length} pages. Under 300 words: ${by((r) => Number(r.words) < 300)}. 300 to 600: ${by((r) => Number(r.words) >= 300 && Number(r.words) < 600)}. 600+: ${by((r) => Number(r.words) >= 600)}.`,
);
for (const r of rows.filter((r) => r.section !== "pain-education"))
  console.log(
    String(r.words).padStart(5),
    String(r.tbd).padStart(3),
    String(r.sample_figures).padStart(3),
    r.faq_schema.toString().padEnd(3),
    r.path,
  );
const edu = rows
  .filter(
    (r) => r.section === "pain-education" && r.path !== "/pain-education/",
  )
  .map((r) => Number(r.words));
console.log(
  `articles: ${edu.length}, min ${Math.min(...edu)}, median ${edu.sort((a, b) => a - b)[Math.floor(edu.length / 2)]}, max ${Math.max(...edu)}`,
);
