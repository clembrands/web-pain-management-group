// Draft copy for About PMG (Phase 8). The mission language is taken from the live About
// page; unconfirmed facts are {{TBD: ...}} placeholders.
import type { EditorialContent } from "./partnership.ts";
import { leaders, mission, values, vision } from "../pmg-deck.ts";

// Verbatim from the live About page. PMG's deck now states the mission as `mission`
// (src/content/pmg-deck.ts); this line stays as the "how we work" sentence.
// "To provide ..." as it reads mid-sentence.
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const missionStatement =
  "Together we manage socially and medically responsible pain management programs.";

export const aboutPages: Record<string, EditorialContent> = {
  "/about-us/": {
    eyebrow: "About PMG",
    lede: "Pain Management Group is a healthcare management organization based in Findlay, Ohio. PMG partners with health systems and independent hospitals to build and manage hospital-based pain management centers.",
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        paragraphs: [
          "PMG is a mission-driven organization. It exists to help hospitals better serve their communities by providing safe and responsible pain treatment, and has been partnering with hospitals since {{SAMPLE: firstYear}}.",
          "Each partner receives the blueprint and ongoing program management to grow a high-quality, outpatient pain management service line.",
        ],
      },
      {
        id: "mission",
        title: "Our mission and vision",
        paragraphs: [
          `Our mission is ${lower(mission)} Our vision is ${lower(vision)} [Read our mission, vision, and values](/about-us/mission/).`,
        ],
      },
      {
        id: "people",
        title: "The people behind PMG",
        paragraphs: [
          `PMG is led by ${leaders.map((l) => `${l.name}, ${l.title}`).join(", and ")}. Meet the [Leadership Team](/about-us/leadership/). For non-clinical roles on PMG's internal team, see [Internal Team Opportunities](/about-us/careers/).`,
        ],
      },
      {
        id: "where",
        title: "Where we work",
        paragraphs: [
          "PMG's partner hospitals are listed by state on [Our Partners](/our-partners/). Recognition for PMG's work, including awards from The Partnership for Excellence, is on [News](/news/).",
        ],
      },
    ],
    related: ["/about-us/mission/", "/about-us/leadership/", "/partnership/"],
  },

  "/about-us/mission/": {
    eyebrow: "About PMG",
    lede: mission,
    sections: [
      {
        id: "mission-vision",
        title: "Our mission and vision",
        paragraphs: [
          `Our mission is ${lower(mission)}`,
          `Our vision is ${lower(vision)}`,
          `${missionStatement} PMG's partner centers carry that mission into their communities as Balanced Pain Treatment Centers.`,
        ],
      },
      {
        id: "values",
        title: "Our values",
        cards: values,
        cardColumns: 3,
      },
      {
        id: "why-pmg-exists",
        title: "Why PMG exists",
        paragraphs: [
          "PMG exists to help hospitals better serve their communities by providing safe and responsible pain treatment.",
          "Since {{SAMPLE: firstYear}}, PMG has been partnering with hospitals to manage socially and medically responsible pain management centers.",
        ],
      },
      {
        id: "what-we-provide",
        title: "What we provide every partner",
        paragraphs: [
          "We provide each of our partners with the blueprint and ongoing program management to grow a high-quality, outpatient pain management service line through:",
        ],
        points: [
          "Hospital-based model",
          "Balanced treatment approach",
          "Program sustainability",
          "Quantifiable outcomes and results",
        ],
      },
      {
        id: "balanced",
        title: "Balanced Pain Treatment",
        paragraphs: [
          "PMG's partner centers are Balanced Pain Treatment Centers: pain care that is medically responsible for patients, socially responsible for communities, and financially responsible for hospitals. [How the model works](/partnership/balanced-pain-treatment/).",
        ],
      },
      {
        id: "our-story",
        title: "Our story",
        paragraphs: ["{{TBD: PMG's founding story and history, from PMG}}"],
      },
    ],
    related: [
      "/about-us/leadership/",
      "/partnership/balanced-pain-treatment/",
      "/news/",
    ],
  },

  "/about-us/careers/": {
    eyebrow: "About PMG",
    lede: "Non-clinical roles on Pain Management Group's internal team.",
    sections: [
      {
        id: "the-team",
        title: "Join the internal team",
        paragraphs: [
          "We are looking for humble, hungry, and smart professionals to grow with us and become leaders of influence. Pain Management Group is a healthcare management organization that values team culture and professional growth.",
        ],
      },
      {
        id: "openings",
        title: "Current openings",
        paragraphs: [
          "To ask about current internal openings, or if you are interested in PMG but don't see a position listed for you, contact [careers@painmgmtgroup.com](mailto:careers@painmgmtgroup.com).",
          "Physicians and APPs: see [Open Opportunities](/providers/opportunities/) for clinical roles.",
        ],
      },
    ],
    related: ["/about-us/", "/providers/opportunities/", "/about-us/mission/"],
  },
};

// Leadership: names and titles from PMG's partnership deck. Credentials, biographies, and
// headshots wait on PMG; the page stays noindex until they arrive, and Person schema is
// added then. Raise the slot count to add placeholder profiles for more leaders.
export { leaders };
export const leadershipSlots = 0;
