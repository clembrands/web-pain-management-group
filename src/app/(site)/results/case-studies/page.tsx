import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getCaseStudies } from "@/sanity/lib/content";
import { routeMetadata } from "@/lib/seo";
import { scheduleCallHref } from "@/lib/site";

const path = "/results/case-studies/";

// The index stays out of search until at least one case study is published.
export async function generateMetadata() {
  const studies = await getCaseStudies();
  const metadata = routeMetadata(path);
  return studies.length
    ? metadata
    : { ...metadata, robots: { index: false, follow: true } };
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  return (
    <PageShell
      path={path}
      eyebrow="Results and Outcomes"
      lede="Partner stories from PMG hospital partnerships, each with figures confirmed by PMG and the partner hospital."
      related={[
        "/results/dashboard/",
        "/results/testimonials/",
        "/partnership/how-it-works/",
      ]}
    >
      <section className="container-shell section-space">
        {studies.length ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/results/case-studies/${s.slug}/`}
                  className="card group block h-full"
                >
                  {s.partner && <p className="eyebrow">{s.partner.name}</p>}
                  <h2 className="text-xl group-hover:text-brand">{s.title}</h2>
                  <p className="mt-4 text-sm text-muted">{s.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[22px] border border-line bg-mist p-10 text-center">
            <h2 className="text-2xl">Partner stories coming soon.</h2>
            <p className="mt-4 text-muted">
              Case studies from partner hospitals are being prepared. In the
              meantime, PMG can walk you through how a partnership works for a
              hospital like yours.
            </p>
            <Link
              href={scheduleCallHref}
              className="button button-primary mt-7"
            >
              Schedule a Call
            </Link>
          </div>
        )}
      </section>
    </PageShell>
  );
}
