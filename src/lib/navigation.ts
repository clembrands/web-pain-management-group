import { contact, sections } from "@/lib/routes";

export type NavItem = {
  href: string;
  label: string;
  children: { href: string; label: string }[];
};

// Primary nav: the seven Rev 2.0 sections, each with its in-menu children.
export const primaryNav: NavItem[] = sections.map((s) => ({
  href: s.path,
  label: s.navLabel ?? s.title,
  children: (s.children ?? [])
    .filter((c) => c.inMenu)
    .map((c) => ({ href: c.path, label: c.navLabel ?? c.title })),
}));

// The header shows six items so the row fits a laptop: News folds into the About dropdown
// (its page and URL are unchanged; the footer still lists it as a section), and Find a
// Clinic leads the Pain Education dropdown instead of taking a slot of its own.
export const headerNav: NavItem[] = primaryNav
  .filter((item) => item.href !== "/news/")
  .map((item) => {
    if (item.href === "/about-us/")
      return {
        ...item,
        children: [...item.children, { href: "/news/", label: "News" }],
      };
    if (item.href === "/pain-education/")
      return {
        ...item,
        children: [
          { href: "/our-partners/", label: "Find a Clinic" },
          ...item.children,
        ],
      };
    return item;
  });

// Patients arrive looking for care, so Find a Clinic and Contact close the mobile menu.
export const utilityNav = [
  { href: "/our-partners/", label: "Find a Clinic" },
  { href: contact.path, label: "Contact" },
];
