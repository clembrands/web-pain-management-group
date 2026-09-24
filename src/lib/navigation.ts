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

// Patients arrive looking for care, so Find a Clinic sits beside the header CTA; both links
// appear in the mobile menu.
export const utilityNav = [
  { href: "/our-partners/", label: "Find a Clinic" },
  { href: contact.path, label: "Contact" },
];
