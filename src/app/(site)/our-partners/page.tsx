import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PartnerMap } from "@/components/partner-map";
import { partnerLocation } from "@/components/partner-list";
import { partnerStates } from "@/content/legacy/states";
import { getPartnerHospitals } from "@/sanity/lib/content";
import { routeMetadata } from "@/lib/seo";
import { directoryCounts } from "@/lib/partner-stats";

const path = "/our-partners/";
export const metadata = routeMetadata(path);

export default async function OurPartnersPage() {
  const partners = await getPartnerHospitals();
  const counts = directoryCounts(partners);
  return (
    <PageShell
      path={path}
      eyebrow="Find a Clinic"
      lede={`PMG has ${counts.hospitals} partner hospitals in ${counts.states} states. Each partner pain management center is part of a community hospital or health system. Choose a state to see every partner hospital there. Patients make appointments directly with the hospital's pain center.`}
      secondary={{ label: "Find a Clinic by State", href: "#partner-map" }}
      related={["/partnership/", "/results/", "/partnership/questions/"]}
    >
      <section
        id="partner-map"
        className="container-shell section-space grid scroll-mt-4 items-center gap-10 lg:grid-cols-[1.4fr_1fr]"
      >
        <div>
          <PartnerMap />
        </div>
        <nav aria-label="Partner states">
          <h2 className="text-2xl">Partners by state</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 border-t border-line">
            {partnerStates.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/our-partners/${s.slug}/`}
                  className="block border-b border-line py-3 text-sm font-medium text-navy hover:text-brand"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="border-t border-line bg-mist">
        <div className="container-shell section-space">
          <h2>Every partner hospital</h2>
          <div className="mt-10 columns-1 gap-10 sm:columns-2 lg:columns-3">
            {partnerStates.map((s) => (
              <div key={s.slug} className="mb-8 break-inside-avoid">
                <h3 className="text-lg">
                  <Link
                    href={`/our-partners/${s.slug}/`}
                    className="hover:text-brand"
                  >
                    {s.name}
                  </Link>
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {partners
                    .filter((p) => p.state === s.slug)
                    .map((p) => (
                      <li key={p.name}>
                        <span className="text-ink">{p.name}</span>
                        {partnerLocation(p) && (
                          <span className="block text-xs text-muted">
                            {partnerLocation(p)}
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
