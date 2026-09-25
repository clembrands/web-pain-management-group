// The 10 states in the live /our-partners/ filter. Slugs follow Rev 2.0 (/our-partners/ohio/).
export const partnerStates = [
  { slug: "illinois", name: "Illinois", abbr: "IL" },
  { slug: "indiana", name: "Indiana", abbr: "IN" },
  { slug: "kentucky", name: "Kentucky", abbr: "KY" },
  { slug: "maine", name: "Maine", abbr: "ME" },
  { slug: "michigan", name: "Michigan", abbr: "MI" },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC" },
  { slug: "ohio", name: "Ohio", abbr: "OH" },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA" },
  { slug: "tennessee", name: "Tennessee", abbr: "TN" },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI" },
] as const;

export type PartnerStateSlug = (typeof partnerStates)[number]["slug"];
