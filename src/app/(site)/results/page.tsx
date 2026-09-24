import Link from "next/link";
import { EditorialSection, SectionsWithNav } from "@/components/editorial";
import { MetricTiles } from "@/components/metrics";
import { PageShell } from "@/components/page-shell";
import { headlineMetrics, resultsHub } from "@/content/pages/results";
import { routeMetadata } from "@/lib/seo";
import { directoryCounts } from "@/lib/partner-stats";
import { getPartnerHospitals } from "@/sanity/lib/content";

const path = "/results/";
export const metadata = routeMetadata(path);

export default async function ResultsPage() {
  const counts = directoryCounts(await getPartnerHospitals());
  return (
    <PageShell
      path={path}
      eyebrow={resultsHub.eyebrow}
      lede={resultsHub.lede}
      related={resultsHub.related}
    >
      <section
        id="headline-figures"
        className="container-shell scroll-mt-4 pt-14 md:pt-20"
      >
        <p className="eyebrow">PMG by the numbers</p>
        <h2>Headline figures</h2>
        <div className="mt-8">
          <MetricTiles metrics={headlineMetrics(counts)} />
        </div>
        <Link href="/results/dashboard/" className="button button-outline mt-8">
          See every measure on the Program Dashboard
        </Link>
      </section>
      <SectionsWithNav items={resultsHub.sections}>
        {resultsHub.sections.map((s) => (
          <EditorialSection key={s.id} section={s} />
        ))}
      </SectionsWithNav>
    </PageShell>
  );
}
