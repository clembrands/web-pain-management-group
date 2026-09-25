import { SectionsWithNav } from "@/components/editorial";
import { DeckFigure } from "@/components/design/deck-figures";
import { RichText } from "@/components/rich-text";
import { scorecardIntro } from "@/content/pmg-deck";
import { MetricTiles } from "@/components/metrics";
import { PageShell } from "@/components/page-shell";
import { dashboardGroups, directoryMetrics } from "@/content/pages/results";
import { directoryCounts } from "@/lib/partner-stats";
import { getPartnerHospitals } from "@/sanity/lib/content";
import { routeMetadata } from "@/lib/seo";

const path = "/results/dashboard/";
export const metadata = routeMetadata(path);

// Outcomes tracked in the open. Every tile shows its definition, source, and period.
export default async function DashboardPage() {
  const counts = directoryCounts(await getPartnerHospitals());
  return (
    <PageShell
      path={path}
      eyebrow="Results and Outcomes"
      lede="The measures PMG tracks across its hospital partnerships, each with its definition, source, and reporting period."
      related={[
        "/results/case-studies/",
        "/results/testimonials/",
        "/partnership/questions/",
      ]}
    >
      <SectionsWithNav
        items={[
          { id: "scorecard", title: "The quarterly partner scorecard" },
          ...dashboardGroups,
        ]}
      >
        <section
          id="scorecard"
          className="scroll-mt-8 border-b border-line pb-10"
        >
          <h2 className="text-2xl md:text-[30px]">
            The quarterly partner scorecard
          </h2>
          <p className="mt-3 mb-6 text-muted">
            <RichText text={scorecardIntro} />
          </p>
          <DeckFigure id="scorecard" />
        </section>
        <p className="border-l-2 border-[#e7d6ac] bg-[#fbf6ea] p-5 text-sm text-[#6b4f10]">
          Partner and state counts come from the partner directory. Figures
          sourced to the PMG onboarding homework are PMG&apos;s own; the rest
          are illustrative until PMG confirms them. The set of measures is a
          draft.
        </p>
        {dashboardGroups.map((g) => (
          <section
            key={g.id}
            id={g.id}
            className="scroll-mt-8 border-b border-line pb-10 last:border-0 last:pb-0"
          >
            <h2 className="text-2xl md:text-[30px]">{g.title}</h2>
            <p className="mt-3 mb-6 text-muted">{g.intro}</p>
            <MetricTiles
              metrics={
                g.id === "network"
                  ? [...directoryMetrics(counts), ...g.metrics]
                  : g.metrics
              }
              detailed
            />
          </section>
        ))}
      </SectionsWithNav>
    </PageShell>
  );
}
