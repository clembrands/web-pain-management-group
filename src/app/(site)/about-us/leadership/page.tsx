import { PageShell } from "@/components/page-shell";
import { Tbd } from "@/components/rich-text";
import { leadershipSlots } from "@/content/pages/about";
import { routeMetadata } from "@/lib/seo";

const path = "/about-us/leadership/";
// Noindex (route status "pending") until PMG supplies names, titles, credentials, and
// headshots. Person JSON-LD is added with the real profiles.
export const metadata = routeMetadata(path);

export default function LeadershipPage() {
  return (
    <PageShell
      path={path}
      eyebrow="About PMG"
      lede="The people who lead Pain Management Group."
      related={["/about-us/mission/", "/about-us/", "/news/"]}
    >
      <section className="container-shell section-space">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: leadershipSlots }, (_, i) => (
            <li
              key={i}
              className="overflow-hidden rounded-[22px] border border-line bg-white"
            >
              <div
                role="img"
                aria-label="Headshot to come"
                className="flex aspect-[1.1] items-center justify-center bg-[#dce9f1] text-sm font-medium text-[#415b70]"
              >
                Headshot pending
              </div>
              <div className="space-y-2 p-6 text-sm">
                <h2 className="text-xl">
                  <Tbd>name and credentials</Tbd>
                </h2>
                <p className="text-muted">
                  <Tbd>title</Tbd>
                </p>
                <p className="text-muted">
                  <Tbd>short biography</Tbd>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
