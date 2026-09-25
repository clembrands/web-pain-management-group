// Links and framing around the Pain Education articles. The article text is never changed.
// Every mapping below comes from the article's own text: a condition links only to the
// procedures its article names (reviewed by hand from the migrated bodies).

// Procedure slugs each condition article mentions.
export const proceduresMentioned: Record<string, string[]> = {
  "bursitis-of-the-hip-trochanteric-bursitis": ["soft-tissue-injection"],
  "cervical-radiculopathy": ["cervical-epidural-steroid-injection"],
  "complex-regional-pain-syndrome-crps": ["spinal-cord-stimulator-implant"],
  "post-laminectomy-syndrome": [
    "lumbar-epidural-steroid-injection",
    "spinal-cord-stimulator-implant",
  ],
  "spinal-stenosis": ["lumbar-epidural-steroid-injection"],
  "lumbar-radiculopathy-sciatica": ["lumbar-epidural-steroid-injection"],
};

// Shown after every article. Restates the referral model already on the site; it gives no
// medical advice. Pending PMG clinician review with the disclaimer.
export const specialistNote = {
  title: "Talking to your physician",
  body: "PMG partner centers are part of community hospitals, and most patients arrive by referral from their primary care physician. If you are living with ongoing pain, ask your physician whether a hospital-based pain management center is a fit for your care.",
};

export const whereOffered = {
  title: "Where this care is offered",
  body: "PMG partner hospitals run pain management centers in ten states. Each center is part of its hospital, and appointments are made directly with the center.",
  link: { label: "Find a partner center by state", href: "/our-partners/" },
};

// Category introductions for the Pain Education hub.
export const categoryIntros: Record<string, string> = {
  Conditions:
    "Pain conditions explained for patients and families. Each article covers what the condition is, what causes it, the symptoms it produces, and how it is usually treated.",
  Procedures:
    "Interventional pain procedures explained for patients and families. Each article covers what the procedure is, who it may help, how it is performed, and what to expect afterward.",
  Medications:
    "Opioids and chronic pain, explained for patients and families: how these medications are used, their risks and side effects, and how they are tapered safely.",
};
