import Link from "next/link";
import type { Audience } from "@/lib/routes";
import { scheduleCallHref } from "@/lib/site";

export const ctas = {
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
// objections library and Results. Utility pages have no closing CTA. Centered, in light
// display type, on the deepest navy.
export function EndCta({ audience }: { audience: Audience }) {
  if (audience === "utility") return null;
  const cta = ctas[audience];
  return (
    <section className="bg-deep text-white">
      <div className="container-shell flex flex-col items-center py-20 text-center md:py-28">
        <p className="label text-sky">Next step</p>
        <h2 className="display-md display-sans mt-6 max-w-4xl">{cta.title}</h2>
        <p className="mt-6 max-w-xl text-[#b9c8d4]">{cta.body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
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
