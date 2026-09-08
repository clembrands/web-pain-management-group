export type Section = { title: string; body: string; points?: string[] };
export type ReviewPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  kind:
    | "page"
    | "resource"
    | "education"
    | "story"
    | "location"
    | "person"
    | "job"
    | "legal";
  sections: Section[];
  links: string[];
  image?: string;
  sample?: boolean;
  category?: string;
};
const pages: ReviewPage[] = [];
function add(
  slug: string,
  title: string,
  eyebrow: string,
  description: string,
  sections: Section[],
  links: string[] = [],
  extras: Partial<ReviewPage> = {},
) {
  pages.push({
    slug,
    title,
    eyebrow,
    description,
    sections,
    links,
    kind: "page",
    ...extras,
  });
}
const section = (title: string, body: string, points?: string[]): Section => ({
  title,
  body,
  points,
});
add(
  "partnership",
  "A pain program built around your hospital.",
  "Hospital partnerships",
  "Bring clinical leadership, program operations, and a sustainable approach to pain care together with one accountable partner.",
  [
    section(
      "A service line takes more than a physician.",
      "A lasting program needs a care team, clear referral pathways, reliable operations, and a way to understand what is working. Our proposed partnership brings those pieces into one conversation.",
    ),
    section(
      "Start with the community you serve.",
      "The first question is what patients and referring clinicians need. From there, we consider the hospital’s existing services, available capacity, and goals for a pain program.",
      [
        "Understand demand and referral patterns",
        "Evaluate the clinical and operational starting point",
        "Define a shared approach to measuring progress",
      ],
    ),
    section(
      "Explore the partnership from every angle.",
      "Understand how the program operates, how its economics are evaluated, and how responsible care stays at the center of the discussion.",
    ),
  ],
  [
    "partnership/operating-model",
    "partnership/financial-model",
    "partnership/quality-and-compliance",
    "our-partners",
  ],
  { image: "/assets/hero-1e.png" },
);
add(
  "partnership/operating-model",
  "Your hospital. A shared plan for making it work.",
  "The operating model",
  "A clear view of the people, responsibilities, and day-to-day work behind a hospital-based pain program.",
  [
    section(
      "Listen before designing the program.",
      "Begin with the hospital’s goals, community needs, existing capabilities, and concerns. This discovery shapes the proposed clinical model and the work required to launch it.",
    ),
    section(
      "Build the team and the operating foundation.",
      "The working model brings physician recruiting, care team preparation, scheduling, and referral processes into a coordinated launch plan. Exact responsibilities are established with each hospital.",
      [
        "Clinical leadership and team onboarding",
        "Space, equipment, and procedure support",
        "Referral coordination and scheduling workflows",
        "Launch milestones and accountable owners",
      ],
    ),
    section(
      "Keep responsibilities visible.",
      "A useful partnership makes it clear who makes decisions, who performs the work, and how disagreements are resolved. The final page will include a PMG-approved responsibility matrix.",
    ),
    section(
      "Manage beyond the launch.",
      "Regular review should connect the daily operation to the goals of the program. The final operating cadence and escalation process will be confirmed with PMG.",
    ),
  ],
  [
    "partnership/financial-model",
    "partnership/quality-and-compliance",
    "contact",
  ],
);
add(
  "partnership/financial-model",
  "Understand the opportunity before making the commitment.",
  "The financial model",
  "A practical conversation about program economics, investment, and the responsibilities of a hospital partnership.",
  [
    section(
      "Evaluate the hospital’s actual starting point.",
      "A financial discussion begins with local inputs: patient demand, referral patterns, staffing, available facilities, and the proposed scope of care. A useful assessment makes its assumptions visible.",
    ),
    section(
      "Discuss how responsibilities are shared.",
      "PMG’s homework describes a joint-venture model with aligned incentives. The final content will explain the approved structure and how investment, operating responsibilities, and financial performance are addressed.",
    ),
    section(
      "Ask the questions that matter.",
      "There is no one-size-fits-all projection on this page. The conversation should explain what drives the opportunity and where uncertainty remains.",
      [
        "What inputs determine the forecast?",
        "Who funds the resources needed to launch?",
        "How are changes in volume and staffing considered?",
        "How are performance and shared responsibilities reviewed?",
      ],
    ),
    section(
      "Make an informed next decision.",
      "A discussion with PMG can establish what information is needed for a hospital-specific evaluation. Financial outcomes and timelines are not promised in this review copy.",
    ),
  ],
  ["partnership/operating-model", "our-partners", "contact"],
);
add(
  "partnership/quality-and-compliance",
  "Responsible care belongs at the center.",
  "Quality and oversight",
  "Clinical leadership, useful measurement, and clear oversight are part of the program—not an afterthought.",
  [
    section(
      "Start with clinical leadership.",
      "The proposed page will explain PMG’s physician qualifications, APP preparation, and clinical oversight model using approved descriptions from the clinical team.",
    ),
    section(
      "Measure what the program is meant to achieve.",
      "Procedure counts tell only part of the story. PMG’s stated focus includes patient outcomes and visibility into program performance. Final measures will be accompanied by definitions and reporting periods.",
      [
        "Patient-centered outcomes",
        "Access and care coordination",
        "Program performance and continuity",
        "Review of operational and clinical concerns",
      ],
    ),
    section(
      "Make oversight understandable.",
      "Hospitals need clear information about documentation, billing support, governance, and how issues are escalated. This content will describe the actual process after review; it does not assert legal compliance or replace legal advice.",
    ),
    section(
      "Explain the balanced care approach.",
      "Balanced Pain Treatment Centers is PMG’s existing language. The final clinical explanation will be reviewed by PMG, including all medication-related statements.",
    ),
  ],
  ["partnership/operating-model", "about-us/leadership", "contact"],
);
add(
  "our-partners",
  "Partnerships are built on work you can see.",
  "Our partners",
  "Explore the hospital relationships and program stories behind PMG’s approach to responsible pain management.",
  [
    section(
      "A shared commitment to the community.",
      "Hospitals bring local knowledge and a trusted place in the community. PMG brings a focus on building and managing hospital-based pain programs.",
    ),
    section(
      "Look beyond a logo.",
      "A useful partner story explains the starting point, the work undertaken, and what changed. The example below demonstrates that format; it is not a report of an actual hospital’s results.",
    ),
  ],
  ["our-partners/stories/sample-community-program", "partnership", "locations"],
);
add(
  "our-partners/stories/sample-community-program",
  "Building a coordinated pain program.",
  "Illustrative partner story",
  "A sample case study layout showing how we will tell a hospital’s story once its facts, results, and permissions are approved.",
  [
    section(
      "The starting point",
      "Illustrative scenario: a community hospital wants a more coordinated path for patients who need pain care. Replace this scenario with a named partner’s verified experience.",
    ),
    section(
      "The work",
      "The story will describe the agreed program scope, clinical team, referral coordination, and launch process. Include the actual hospital and PMG contributors.",
    ),
    section(
      "The evidence",
      "Results have not been supplied for this example. This area is reserved for approved measures, baseline and follow-up periods, and the hospital’s interpretation.",
      [
        "Approved baseline",
        "Defined measurement period",
        "Verified results with context",
      ],
    ),
    section(
      "The hospital’s perspective",
      "An attributed quote or interview can appear here once supplied and approved. No testimonial has been invented for this example.",
    ),
  ],
  ["partnership/operating-model", "contact"],
  { kind: "story", sample: true, image: "/assets/hero-1e.png" },
);
add(
  "locations",
  "Find the right place to start your care.",
  "Care locations",
  "Explore hospital-based care locations and connect directly with a clinic for appointments and local information.",
  [
    section(
      "Care starts with a local conversation.",
      "Clinic contact details, appointment instructions, and available services will be verified against PMG’s location records before launch. The directory below demonstrates the search and location-page experience.",
    ),
  ],
  [],
  { image: "/assets/1amap.png" },
);
for (const [state, name] of [
  ["ohio", "Ohio"],
  ["indiana", "Indiana"],
  ["michigan", "Michigan"],
])
  add(
    `locations/${state}/sample-community-clinic`,
    `${name} community clinic example`,
    "Sample location",
    "A demonstration of the clinic detail page. This is not an operating clinic listing.",
    [
      section(
        "Plan your visit",
        "The approved clinic address, hours, accessibility details, and directions will appear here. No fictional address or telephone number is provided.",
      ),
      section(
        "Appointments and referrals",
        "Patients will contact the hospital or clinic directly. The verified appointment link and referral instructions will be added to each location record.",
      ),
      section(
        "Meet your local care team",
        "Approved provider names and credentials will be linked here once PMG has confirmed the clinic roster.",
      ),
      section(
        "Services at this location",
        "Only services verified for this specific clinic will be listed. The education library does not imply that every treatment is available here.",
      ),
    ],
    ["locations", "pain-education"],
    { kind: "location", sample: true, category: name },
  );
add(
  "for-providers",
  "Build your practice around responsible care.",
  "Physicians and APPs",
  "Explore a hospital-based practice model with clinical leadership, operational support, and a connection to the community.",
  [
    section(
      "For pain physicians",
      "This section introduces the clinical model and the support surrounding a physician’s practice. Final details on autonomy, procedures, schedules, and call will come from PMG’s recruiting team.",
    ),
    section(
      "For advanced practice providers",
      "Learn how APPs contribute to the care team and how onboarding and professional support are structured. Exact training requirements and responsibilities will be confirmed.",
    ),
    section(
      "Know what you are joining.",
      "A career decision deserves more than a list of benefits. Explore the practice model and ask about the realities of the particular role and location.",
    ),
  ],
  ["for-providers/practice-model", "careers", "about-us/leadership"],
  { image: "/assets/hero-1e.png" },
);
add(
  "for-providers/practice-model",
  "A clearer picture of your working day.",
  "The provider experience",
  "The questions clinicians ask about support, autonomy, schedules, and the team around them.",
  [
    section(
      "Clinical work and procedure support",
      "The final page will describe patient mix, procedure blocks, equipment access, and team support using details approved for PMG’s actual programs.",
    ),
    section(
      "Schedules and responsibilities",
      "Schedule, travel, call, and administrative expectations can vary by role. The recruiting conversation should make these details clear before a provider commits.",
    ),
    section(
      "Onboarding and continued support",
      "Explain how providers join a program, get to know the hospital and referral network, and receive ongoing clinical and operational support.",
    ),
    section(
      "Questions to bring to a conversation",
      "Use these topics to learn about a specific opportunity.",
      [
        "How is the clinical week structured?",
        "What team and procedure support is available?",
        "What are the call and travel expectations?",
        "How are compensation and time off structured?",
      ],
    ),
  ],
  ["careers", "contact"],
);
add(
  "careers",
  "Find your next opportunity with PMG.",
  "Careers",
  "Explore physician, advanced practice, and corporate roles supporting hospital-based pain care.",
  [
    section(
      "A role with a clear purpose.",
      "The listings below are sample cards for review. Live roles will connect to the approved recruiting destination and display current location and application information.",
    ),
  ],
  ["for-providers/practice-model"],
);
for (const [slug, title, category] of [
  ["pain-physician", "Pain management physician", "Physicians"],
  ["advanced-practice-provider", "Advanced practice provider", "APPs"],
  ["program-operations", "Program operations professional", "Corporate"],
])
  add(
    `careers/sample-${slug}`,
    title,
    "Sample opportunity",
    "An example job detail layout. This is not an advertised vacancy and does not accept applications.",
    [
      section(
        "The opportunity",
        "A real posting will explain the team, location, clinical or operational responsibilities, and the work this role supports.",
      ),
      section(
        "What the role involves",
        "The approved job description will list responsibilities, qualifications, employment details, and any location-specific expectations.",
      ),
      section(
        "What to expect next",
        "Active postings will link to CareerMD, LinkedIn, or the recruiting destination selected by PMG. Compensation and benefits will only appear when provided and approved.",
      ),
    ],
    ["careers", "for-providers/practice-model"],
    { kind: "job", sample: true, category },
  );
add(
  "resources",
  "Useful perspectives for better decisions.",
  "Insights and resources",
  "Explore the questions behind a hospital pain program, from evaluating community need to understanding ongoing performance.",
  [],
  [],
);
add(
  "resources/evaluating-community-need",
  "What should a hospital assess before starting a pain program?",
  "Hospital leadership resource",
  "A working discussion guide for the first conversation about hospital-based pain services.",
  [
    section(
      "Understand the current path to care.",
      "Start by asking how patients reach pain care today. Talk with referring clinicians about access, coordination, and where the current process is difficult to navigate.",
    ),
    section(
      "Consider the hospital’s existing resources.",
      "A discovery conversation can consider clinical capacity, space, available teams, and how a program would relate to existing services. The goal is to identify questions that need local evidence.",
    ),
    section(
      "Agree on what success would mean.",
      "Hospitals may have different priorities for access, quality, continuity, or program sustainability. State those priorities before discussing a proposed operating model.",
    ),
    section(
      "Bring evidence into the next conversation.",
      "A PMG expert will review and expand this draft with practical examples and approved evaluation inputs.",
    ),
  ],
  ["partnership", "partnership/financial-model", "contact"],
  { kind: "resource", category: "Hospital leadership" },
);
add(
  "resources/recruiting-versus-program-management",
  "A physician and a program solve different problems.",
  "Operating perspective",
  "A draft exploration of the work surrounding physician recruitment in a hospital pain service.",
  [
    section(
      "Recruitment is one part of the work.",
      "A physician is central to clinical care. A program also involves preparation, coordination, scheduling, referral relationships, and operational follow-through.",
    ),
    section(
      "Make the surrounding responsibilities explicit.",
      "Before deciding whether to recruit independently or explore a partnership, identify who will own the work beyond hiring.",
    ),
    section(
      "Compare the actual alternatives.",
      "The comparison should reflect the hospital’s capacity and goals. This article will be developed with PMG’s operations team using approved examples, rather than assuming one model fits every hospital.",
    ),
  ],
  ["partnership/operating-model", "contact"],
  { kind: "resource", category: "Program operations" },
);
add(
  "resources/measuring-program-performance",
  "What does a useful program review include?",
  "Quality perspective",
  "A draft framework for discussing visibility into a hospital-based pain program.",
  [
    section(
      "Begin with clearly defined questions.",
      "A useful review connects information to the questions the hospital and program team need to answer.",
    ),
    section(
      "Provide context alongside numbers.",
      "Explain the measure, the reporting period, and the population represented. A change in a number needs context before anyone can interpret it.",
    ),
    section(
      "Connect the review to action.",
      "The final article will explain PMG’s approved reporting approach and how findings inform the next conversation with a hospital partner.",
    ),
  ],
  ["partnership/quality-and-compliance", "our-partners"],
  { kind: "resource", category: "Quality and outcomes" },
);
add(
  "pain-education",
  "Understand the conversation about your care.",
  "Patient education",
  "Browse conditions and treatment topics, then speak with your local clinical team about your individual care.",
  [
    section(
      "Information to support your questions.",
      "This review library demonstrates the education experience. Clinical copy, video sources, and reviewer details are awaiting approval before publication.",
    ),
  ],
  ["locations"],
);
add(
  "about-us",
  "Focused on hospitals. Connected to communities.",
  "About PMG",
  "Pain Management Group’s website will explain the people, experience, and purpose behind its hospital partnerships.",
  [
    section(
      "Our purpose",
      "PMG’s existing mission centers on socially and medically responsible pain management programs. This page connects that purpose to the work of supporting hospital-based care.",
    ),
    section(
      "Balanced Pain Treatment Centers",
      "The final brand explanation will describe what “balanced” means in practice, using language approved by PMG’s clinical and leadership teams.",
    ),
    section(
      "Our story",
      "A verified company timeline will appear here. The founding date and years-of-operation claim are being reconciled before they are presented as a historical record.",
    ),
    section(
      "Meet the people behind the work.",
      "Explore the proposed leadership section and the expertise that will support PMG’s authored and reviewed content.",
    ),
  ],
  ["about-us/leadership", "our-partners", "contact"],
  { image: "/assets/hero-1e.png" },
);
add(
  "about-us/leadership",
  "The people behind the partnership.",
  "Leadership and clinical expertise",
  "Meet the leadership and clinical experts who will help tell PMG’s story.",
  [
    section(
      "Experience with a name behind it.",
      "Approved biographies will explain each person’s role and relevant experience. The example below demonstrates the profile layout without inventing a person or credentials.",
    ),
  ],
  ["about-us/leadership/sample-clinical-leader"],
);
add(
  "about-us/leadership/sample-clinical-leader",
  "Clinical leadership profile",
  "Sample biography",
  "A profile layout awaiting an approved name, portrait, and professional biography.",
  [
    section(
      "Role and experience",
      "This area will describe the person’s responsibilities and relevant experience in their own approved biography.",
    ),
    section(
      "Credentials and professional background",
      "Only verified qualifications, appointments, and professional affiliations will appear here.",
    ),
    section(
      "A perspective on responsible care",
      "An approved interview or authored introduction will add a direct perspective. Related articles and clinical reviews can link back to this profile.",
    ),
  ],
  ["about-us/leadership", "partnership/quality-and-compliance"],
  { kind: "person", sample: true },
);
add(
  "privacy",
  "Privacy information",
  "Policy review",
  "This page is a layout for client and legal review, not an adopted privacy policy.",
  [
    section(
      "Information collected",
      "The final policy must explain the actual inquiry forms, analytics, hosting, and integrations used by the launched site.",
    ),
    section(
      "How information is used and shared",
      "Approved language will describe the purposes of collection, service providers, retention, and applicable rights.",
    ),
    section(
      "Questions and contact details",
      "The responsible contact and process for privacy questions will be provided before launch.",
    ),
  ],
  ["contact"],
  { kind: "legal", sample: true },
);
add(
  "accessibility",
  "An accessible path to information",
  "Accessibility review",
  "This page is a draft statement for review and does not certify accessibility conformance.",
  [
    section(
      "Using the website",
      "The design supports keyboard navigation, visible focus indicators, responsive layouts, and readable page structure.",
    ),
    section(
      "Report a barrier",
      "The final statement will provide a verified contact and process for reporting a problem accessing information.",
    ),
    section(
      "Review and improvement",
      "Any published accessibility commitment will reflect the completed audit and PMG’s approved support process.",
    ),
  ],
  ["contact"],
  { kind: "legal", sample: true },
);
const topics: Record<string, string[]> = {
  Conditions: [
    "Bursitis of the hip",
    "Cervical radiculopathy",
    "Complex regional pain syndrome",
    "Post-laminectomy syndrome",
    "Spinal stenosis",
    "Spondylosis",
    "Lumbar radiculopathy",
  ],
  Treatments: [
    "Basivertebral nerve ablation",
    "Botox injections for chronic migraine",
    "Caudal epidural steroid injection",
    "Cervical epidural steroid injection",
    "Cervical facet radiofrequency neurotomy",
    "Cervical transforaminal epidural steroid injection",
    "Genicular nerve ablation",
    "Hip joint injection",
    "Lumbar epidural steroid injection",
    "Lumbar sympathetic block",
    "Lumbar transforaminal epidural steroid injection",
    "Medial branch block",
    "Mild procedure",
    "Radiofrequency ablation RFA for pain",
    "Radiofrequency neurotomy of the lumbar facets",
    "Radiofrequency neurotomy of the thoracic facets",
    "Sacroiliac joint steroid injection",
    "Steroid injection for shoulder bursitis",
    "Spinal cord stimulator implant",
    "Spinal cord stimulator trial",
    "Stellate ganglion block",
    "Thoracic epidural steroid injection",
    "Thoracic transforaminal epidural steroid injection",
    "Trigger point injections",
  ],
  Medications: [
    "Opioid misuse",
    "Opioids and chronic pain management",
    "Side effects of long-term opioid use",
    "Tapering opioid use safely",
  ],
};
for (const [category, titles] of Object.entries(topics))
  for (const title of titles) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    add(
      `pain-education/${slug}`,
      title,
      "Patient education",
      `A review layout for patient information about ${title.toLowerCase()}. Medical content is awaiting clinical review.`,
      [
        section(
          "Understanding this topic",
          "The approved article will provide a plain-language explanation, relevant context, and links to reliable sources. This placeholder does not provide medical guidance.",
        ),
        section(
          "Questions for your clinical team",
          "The final page will help visitors prepare for an individual conversation with their treating clinician.",
          [
            "What does this topic mean for my circumstances?",
            "What alternatives should we discuss?",
            "What should I ask at my next appointment?",
          ],
        ),
        section(
          "Video and clinical review",
          "An approved educational video, accessible transcript, named clinical reviewer, and review date will appear here after the source material and permissions are confirmed.",
        ),
      ],
      ["pain-education", "locations"],
      { kind: "education", category, sample: true },
    );
  }
export const reviewPages = pages;
export const reviewMode = process.env.NEXT_PUBLIC_CONTENT_MODE !== "published";
export const findReviewPage = (slug: string) =>
  pages.find((page) => page.slug === slug);
