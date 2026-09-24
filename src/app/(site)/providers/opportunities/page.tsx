import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { routeMetadata } from "@/lib/seo";
import { jobBoards, organization } from "@/lib/site";

const path = "/providers/opportunities/";
export const metadata = routeMetadata(path);

// PMG posts clinical openings on two job boards, as the live Careers page did.
const boards = [
  {
    href: jobBoards.careerMd,
    board: "CareerMD",
    title: "Physicians and APCs",
    body: "Pain management physician and advanced practice clinician openings with PMG, on CareerMD.",
  },
  {
    href: jobBoards.indeed,
    board: "Indeed",
    title: "APCs",
    body: "Advanced practice clinician openings with PMG, on Indeed.",
  },
];

export default function OpportunitiesPage() {
  return (
    <PageShell
      path={path}
      eyebrow="For Providers and APPs"
      lede="Current openings for pain management physicians and advanced practice clinicians at PMG partner programs are posted on CareerMD and Indeed."
      related={[
        "/providers/why-pmg/",
        "/our-partners/",
        "/providers/life-at-pmg/",
      ]}
    >
      <section className="container-shell section-space">
        <h2>Open positions</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {boards.map((b) => (
            <li key={b.board}>
              <a
                href={b.href}
                className="card group flex h-full flex-col hover:border-brand"
              >
                <span className="eyebrow">On {b.board}</span>
                <span className="text-2xl font-semibold text-navy group-hover:text-brand">
                  {b.title}
                </span>
                <span className="mt-3 text-sm text-muted">{b.body}</span>
                <span className="mt-6 font-semibold text-brand">
                  View openings on {b.board} →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-2xl bg-mist p-7">
          <h2 className="text-xl">Don&apos;t see a position for you?</h2>
          <p className="mt-3 text-muted">
            Interested in PMG but don&apos;t see a position listed for you?
            Contact{" "}
            <a
              href={`mailto:${organization.careersEmail}`}
              className="font-medium text-brand underline underline-offset-4"
            >
              {organization.careersEmail}
            </a>
            . For non-clinical roles, see{" "}
            <Link
              href="/about-us/careers/"
              className="font-medium text-brand underline underline-offset-4"
            >
              Internal Team Opportunities
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
