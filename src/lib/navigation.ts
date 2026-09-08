export const navigation = [
  { href: "/partnership", label: "Hospital Partnerships" },
  { href: "/our-partners", label: "Our Partners" },
  { href: "/for-providers", label: "For Providers" },
  { href: "/resources", label: "Resources" },
  { href: "/about-us", label: "About PMG" },
];
export const utilityNavigation = [
  { href: "/locations", label: "Find a Location" },
  { href: "/pain-education", label: "Patient Education" },
  { href: "/contact", label: "Contact" },
];
export const navigationChildren: Record<
  string,
  { href: string; label: string }[]
> = {
  "/partnership": [
    { href: "/partnership/operating-model", label: "Operating model" },
    { href: "/partnership/financial-model", label: "Financial model" },
    {
      href: "/partnership/quality-and-compliance",
      label: "Quality and oversight",
    },
  ],
  "/for-providers": [
    { href: "/for-providers/practice-model", label: "Practice model" },
    { href: "/careers", label: "Current opportunities" },
  ],
  "/about-us": [{ href: "/about-us/leadership", label: "Leadership" }],
};
