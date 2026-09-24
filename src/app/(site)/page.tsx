import { getHome, getPartners } from "@/sanity/lib/content";
import { Hero } from "@/components/home/hero";
import { Stats, SocialProof } from "@/components/home/proof";
import {
  Differentiators,
  PartnershipSteps,
} from "@/components/home/partnership";
import {
  PartnerStory,
  HomeFaqs,
  LocationsPreview,
  Pathways,
} from "@/components/home/community";
import { CtaBand } from "@/components/ui";
import { routeMetadata } from "@/lib/seo";

// The approved 1H concept home page. Rebuilt around Rev 2.0 in Phase 3.
export const metadata = routeMetadata("/");

export default async function HomePage() {
  const [home, partners] = await Promise.all([getHome(), getPartners()]);
  return (
    <>
      <Hero home={home} />
      <Stats home={home} />
      <SocialProof partners={partners} />
      <Differentiators home={home} />
      <PartnershipSteps home={home} />
      <PartnerStory home={home} />
      <HomeFaqs home={home} />
      <LocationsPreview home={home} />
      <Pathways />
      <CtaBand />
    </>
  );
}
