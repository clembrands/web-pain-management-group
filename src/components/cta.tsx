import Link from "next/link";
import type { Audience } from "@/lib/routes";
import { scheduleCallHref } from "@/lib/site";

const ctas = {
  hospital: {
    title: "Talk with PMG about a pain management program for your hospital.",
    body: "A short call covers the partnership model, what it takes to launch, and whether it fits your community.",
    label: "Schedule a Call",
    href: scheduleCallHref,
    secondary: [
      { label: "What hospital leaders ask", href: "/partnership/questions/" },
      { label: "See results", href: "/results/" },
    ],
  },
  provider: {
    title: "Practice pain medicine with a team built around you.",
    body: "See current physician and APP openings at PMG partner hospitals.",
    label: "View Opportunities",
    href: "/providers/opportunities/",
    secondary: [
      { label: "Why practice with PMG", href: "/providers/why-pmg/" },
    ],
  },
  patient: {
    title: "Looking for pain care near you?",
    body: "Appointments are made directly with the hospital pain center. Find a PMG partner clinic in your state.",
    label: "Find a Clinic",
    href: "/our-partners/",
    secondary: [{ label: "Browse pain education", href: "/pain-education/" }],
  },
} as const;

// Hospital-leader pages end with Schedule a Call, provider pages with View Opportunities,
// and patient pages route to Find a Clinic. Every hospital-leader page links to the
// objections library and Results. Utility pages have no closing CTA.
export function EndCta({ audience }: { audience: Audience }) {
  if (audience === "utility") return null;
  const cta = ctas[audience];
  return (
    <section className="bg-navy text-white">
      <div className="container-shell section-space flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <h2 className="md:text-[36px]">{cta.title}</h2>
          <p className="mt-4 text-[#b9c8d4]">{cta.body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={cta.href}
            className="button bg-white text-navy hover:bg-[#dce6ee]"
          >
            {cta.label}
          </Link>
          {cta.secondary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="button button-dark-outline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
