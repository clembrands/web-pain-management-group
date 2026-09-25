// Plain-language definitions of terms the site uses, for the "Terms used on this page"
// blocks (DefinedTerm schema) and, once approved, a glossary page. General definitions,
// not PMG claims: nothing here states a PMG figure, outcome, or contract term.
export type GlossaryTerm = { id: string; term: string; definition: string };

export const glossary: GlossaryTerm[] = [
  {
    id: "service-line",
    term: "Service line",
    definition:
      "A hospital's organized set of services around one clinical area, such as cardiology, orthopedics, or pain management, with its own staff, referral pathways, and results.",
  },
  {
    id: "hospital-based",
    term: "Hospital-based pain management center",
    definition:
      "A pain management clinic that is part of a hospital rather than a separate private practice. Patients stay within the hospital's records, referrals, and follow-up care.",
  },
  {
    id: "joint-venture",
    term: "Joint venture",
    definition:
      "A business arrangement in which two organizations share ownership, responsibilities, and results for a defined activity, here a hospital and PMG for a pain management program.",
  },
  {
    id: "interventional-pain",
    term: "Interventional pain management",
    definition:
      "Pain treatment that uses targeted procedures, such as injections, nerve blocks, and nerve ablation, alongside or instead of medication.",
  },
  {
    id: "multimodal",
    term: "Balanced, or multimodal, treatment",
    definition:
      "Combining several kinds of treatment for pain, for example procedures, medication, physical therapy, and behavioral support, rather than relying on one.",
  },
  {
    id: "app",
    term: "Advanced practice provider (APP)",
    definition:
      "A nurse practitioner or physician assistant who evaluates and treats patients alongside physicians. Also called an advanced practice clinician (APC).",
  },
  {
    id: "referral-pathway",
    term: "Referral pathway",
    definition:
      "The route a patient follows from a primary care physician to a specialist, including how the referral is made and how results return to the referring physician.",
  },
  {
    id: "primary-care",
    term: "Primary care physician",
    definition:
      "A patient's regular physician, usually in family medicine or internal medicine, who coordinates care and refers to specialists.",
  },
  {
    id: "program-management",
    term: "Program management",
    definition:
      "Running a clinical program day to day after it opens: staffing, scheduling, protocols, reporting, and improvement, as distinct from setting it up.",
  },
  {
    id: "fellowship-trained",
    term: "Fellowship-trained pain specialist",
    definition:
      "A physician who completed an additional year of specialized training in pain medicine after residency, and is typically board certified in the specialty.",
  },
  {
    id: "encounter",
    term: "Patient encounter",
    definition:
      "One visit or procedure for one patient. Encounter counts measure how much care a center delivers over a period.",
  },
  {
    id: "break-even",
    term: "Break-even",
    definition:
      "The point at which a program's income covers its operating costs. Time to break-even is how long that takes after opening.",
  },
  {
    id: "payer-mix",
    term: "Payer mix",
    definition:
      "The share of a center's patients covered by each type of insurance, such as Medicare, Medicaid, and commercial plans, which affects revenue per visit.",
  },
  {
    id: "credentialing",
    term: "Credentialing",
    definition:
      "A hospital's process of verifying a clinician's training, licenses, and history before granting permission to practice there.",
  },
  {
    id: "retention",
    term: "Partner retention",
    definition:
      "The share of partner hospitals that continue a partnership when its term ends.",
  },
];

export const glossaryTerm = (id: string) => {
  const t = glossary.find((g) => g.id === id);
  if (!t) throw new Error(`No glossary term ${id}`);
  return t;
};
