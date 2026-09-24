import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { PortableBody } from "@/components/portable-body";
import { getCaseStudy, type CaseStudy } from "@/sanity/lib/content";
import type { SiteRoute } from "@/lib/routes";
import { routeMetadata } from "@/lib/seo";
import { partnerStates } from "@/content/legacy/states";

type Props = { params: Promise<{ slug: string }> };

// One indexable page per published case study. Pages render on first request and are
// refreshed by the Sanity publishing webhook.
const toRoute = (study: CaseStudy): SiteRoute => ({
  path: `/results/case-studies/${study.slug}/`,
  title: study.title,
  seoTitle: study.seoTitle ?? undefined,
  description: study.seoDescription ?? study.summary,
  audience: "hospital",
  phase: 4,
  status: "live",
});

export async function generateMetadata({ params }: Props) {
  const study = await getCaseStudy((await params).slug);
  return study ? routeMetadata(toRoute(study)) : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const study = await getCaseStudy((await params).slug);
  if (!study) notFound();
  const route = toRoute(study);
  const state = partnerStates.find((s) => s.slug === study.partner?.state);
  return (
    <PageShell
      path={route.path}
      route={route}
      eyebrow={
        study.partner
          ? `${study.partner.name}${state ? `, ${state.name}` : ""}`
          : "Case study"
      }
      lede={study.summary}
      related={[
        "/results/case-studies/",
        "/results/dashboard/",
        "/partnership/questions/",
      ]}
    >
      <article className="container-shell section-space max-w-3xl">
        {study.figures.length > 0 && (
          <dl className="mb-12 grid gap-4 sm:grid-cols-2">
            {study.figures.map((f) => (
              <div
                key={f.label}
                className="flex flex-col-reverse rounded-[18px] border border-line p-6"
              >
                <dt className="mt-3 text-sm text-muted">
                  {f.label}
                  <span className="mt-1 block text-xs">Source: {f.source}</span>
                </dt>
                <dd className="text-[34px] leading-none font-bold text-navy">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {study.body && <PortableBody value={study.body} />}
      </article>
    </PageShell>
  );
}
