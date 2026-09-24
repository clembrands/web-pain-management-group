// Organization facts shown site-wide and in Organization JSON-LD. Each value is taken
// from the live painmgmtgroup.com footer and contact page (crawl of 2026-09-24).
export const organization = {
  name: "Pain Management Group",
  legalName: "Pain Management Group",
  tagline: "Balanced Pain Treatment Centers",
  email: "contact@painmgmtgroup.com",
  careersEmail: "careers@painmgmtgroup.com",
  phone: "(419) 721-6358",
  address: {
    street: "229 West Main Cross St. Suite 58",
    city: "Findlay",
    region: "OH",
    postalCode: "45840",
    country: "US",
  },
  logo: "/assets/pmg-logo.png",
  sameAs: ["https://www.linkedin.com/company/pain-management-group"],
} as const;

// Provider job boards linked from the live /service/ page.
export const jobBoards = {
  indeed: "https://www.indeed.com/cmp/Pain-Management-Group-3/jobs",
  careerMd:
    "https://app.careermd.com/physicians/careerfairs/employersnapshot.aspx?pid=244675225",
} as const;

// Every Schedule a Call CTA lands on the inquiry form.
export const scheduleCallHref = "/contact/#schedule-a-call";
