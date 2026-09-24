import { getPartners } from "@/sanity/lib/content";
import { Hero } from "@/components/home/hero";
import { Stats, SocialProof } from "@/components/home/proof";
import {
  Differentiators,
  PartnershipSteps,
} from "@/components/home/partnership";
import {
  PartnerVoice,
  HomeFaqs,
  LocationsPreview,
  Pathways,
} from "@/components/home/community";
import { EndCta } from "@/components/cta";
import { routeMetadata } from "@/lib/seo";

// The approved 1H layout. Below the fold: results preview, proof, then objections.
export const metadata = routeMetadata("/");

export default async function HomePage() {
  const partners = await getPartners();
  return (
    <>
      <Hero />
      <Stats />
      <SocialProof partners={partners} />
      <Differentiators />
      <PartnershipSteps />
      <PartnerVoice />
      <HomeFaqs />
      <LocationsPreview />
      <Pathways />
      <EndCta audience="hospital" />
    </>
  );
}
