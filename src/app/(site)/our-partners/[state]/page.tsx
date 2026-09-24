import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PartnerMap } from "@/components/partner-map";
import { PartnerCard } from "@/components/partner-list";
import { partnerStates } from "@/content/legacy/states";
import { stateIntros } from "@/content/pages/partner-states";
import { getPartnerHospitals } from "@/sanity/lib/content";
import { absoluteUrl, routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ state: string }> };

// One statically generated page per state in the live /our-partners/ filter.
export const dynamicParams = false;
export const generateStaticParams = () =>
  partnerStates.map((s) => ({ state: s.slug }));

export async function generateMetadata({ params }: Props) {
  return routeMetadata(`/our-partners/${(await params).state}/`);
}

export default async function StatePage({ params }: Props) {
  const slug = (await params).state;
  const state = partnerStates.find((s) => s.slug === slug);
  if (!state) notFound();
  const path = `/our-partners/${slug}/`;
  const partners = (await getPartnerHospitals()).filter(
    (p) => p.state === slug,
  );

  // ItemList of the partner hospitals. Address fields appear only where the live site had them.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${state.name} Hospital Pain Management Partners`,
    url: absoluteUrl(path),
    numberOfItems: partners.length,
    itemListElement: partners.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "MedicalClinic",
        name: p.name,
        ...(p.website ? { url: p.website } : {}),
        ...(p.phone ? { telephone: p.phone } : {}),
        address: {
          "@type": "PostalAddress",
          ...(p.city ? { addressLocality: p.city } : {}),
          addressRegion: state.abbr,
          addressCountry: "US",
        },
      },
    })),
  };

  return (
    <PageShell
      path={path}
      eyebrow="Our Partners"
      lede={`Every PMG partner hospital in ${state.name}, with contact details for each pain program.`}
      secondary={{ label: "All Partner States", href: "/our-partners/" }}
      related={["/partnership/", "/results/", "/partnership/questions/"]}
    >
      <JsonLd data={itemList} />
      <section
        id="partner-hospitals"
        className="container-shell section-space grid scroll-mt-4 items-start gap-10 lg:grid-cols-[1.3fr_1fr]"
      >
        {/* The clinic list comes first: it is what patients arrive for. */}
        <div>
          <h2>Partner hospitals in {state.name}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {partners.map((p) => (
              <PartnerCard key={p.name} partner={p} />
            ))}
          </ul>
          <h2 className="mt-14 text-2xl">PMG in {state.name}</h2>
          <div className="mt-5 max-w-2xl space-y-4 text-muted">
            {stateIntros[slug].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="space-y-8 lg:sticky lg:top-6">
          <div className="rounded-[22px] border border-line bg-mist p-4">
            <PartnerMap focus={slug} />
          </div>
          <nav aria-label="Other partner states">
            <h2 className="text-xl">Partners in other states</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {partnerStates
                .filter((s) => s.slug !== slug)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/our-partners/${s.slug}/`}
                      className="block rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-brand hover:text-brand"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link
              href="/our-partners/"
              className="mt-5 inline-block text-sm font-semibold text-brand underline underline-offset-4"
            >
              All partner hospitals and map
            </Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
