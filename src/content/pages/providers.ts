// Draft copy for For Providers and APPs (Phase 6). Written from the live Careers page
// (/service/), the Rev 2.0 notes (autonomy, procedure support, schedules), and facts already
// on the site. Anything PMG has not confirmed is a {{TBD: ...}} placeholder.
import type { EditorialContent } from "./partnership.ts";
import { providerResources } from "../pmg-deck.ts";

export const providerPages: Record<string, EditorialContent> = {
  "/providers/": {
    eyebrow: "For physicians and APPs",
    lede: "Pain Management Group is looking for pain management physicians and qualified advanced practice clinicians to join its partner programs: hospital-based pain centers in community hospitals and health systems.",
    sections: [
      {
        id: "where-you-practice",
        title: "Where you would practice",
        paragraphs: [
          "PMG's partner centers are part of their hospitals. Patients are referred by their primary care physicians, examined and diagnosed by a board-certified, fellowship-trained pain specialist, and then follow a balanced treatment program.",
          "See every partner hospital, by state, on [Our Partners](/our-partners/).",
        ],
      },
      {
        id: "why-pmg",
        title: "Why practice with PMG",
        paragraphs: [
          "[Why Practice With PMG](/providers/why-pmg/) covers practice autonomy, procedure support, and schedules at partner centers.",
        ],
      },
      {
        id: "opportunities",
        title: "Open opportunities",
        paragraphs: [
          "Current openings for physicians and APPs are posted on Indeed and CareerMD. [View Opportunities](/providers/opportunities/) links to both.",
          "Interested in PMG but don't see a position listed for you? Contact [careers@painmgmtgroup.com](mailto:careers@painmgmtgroup.com).",
        ],
      },
    ],
    related: [
      "/providers/why-pmg/",
      "/providers/opportunities/",
      "/providers/life-at-pmg/",
    ],
  },

  "/providers/why-pmg/": {
    eyebrow: "For Providers and APPs",
    lede: "What practicing at a PMG partner center looks like: how much clinical autonomy you have, what support comes with procedures, and how schedules work.",
    sections: [
      {
        id: "autonomy",
        title: "Practice autonomy",
        paragraphs: [
          "Each patient is examined and diagnosed by a board-certified, fellowship-trained pain specialist before a balanced treatment program begins.",
          "{{TBD: how clinical decisions are made at partner centers, and what physicians and APPs decide for their own patients}}",
        ],
      },
      {
        id: "procedure-support",
        title: "Procedure support",
        paragraphs: [
          "Every partner center has a procedure room for interventional procedures, with a C-arm and a fluoroscopy-compatible procedure table, radiofrequency ablation equipment, and other equipment based on the procedures offered. The hospital provides anesthesia support for select procedures, sterile processing, and clinical supplies.",
          "PMG's [Pain Education library](/pain-education/) covers interventional procedures including epidural steroid injections, radiofrequency ablation, and spinal cord stimulation.",
        ],
      },
      {
        id: "resources",
        title: "Resources behind every provider",
        paragraphs: [
          "Providers at partner centers work with iStats, PMG's program data system, and the resources PMG shares across its network:",
        ],
        cards: providerResources,
      },
      {
        id: "schedules",
        title: "Schedules",
        paragraphs: [
          "{{TBD: typical clinic and procedure schedules, call expectations, and time off}}",
        ],
      },
      {
        id: "the-model",
        title: "A model built for responsible pain care",
        paragraphs: [
          "Partner centers follow PMG's Balanced Pain Treatment model: pain care that is medically, socially, and financially responsible. [How the model works](/partnership/balanced-pain-treatment/).",
          "{{TBD: compensation approach, onboarding, and APP training, confirmed by PMG}}",
        ],
      },
    ],
    related: [
      "/providers/opportunities/",
      "/providers/life-at-pmg/",
      "/our-partners/",
    ],
  },
};

// Life at PMG waits on real provider testimonials. The page is built, and noindex, until
// PMG supplies them.
export const lifeAtPmg = {
  lede: "Culture and provider perspectives from Pain Management Group partner programs.",
  culture:
    "Pain Management Group is a healthcare management organization that values team culture and professional growth.",
  testimonialSlots: 3,
};
