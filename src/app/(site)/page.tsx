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
import { directoryCounts } from "@/lib/partner-stats";
import { getPartnerHospitals } from "@/sanity/lib/content";

// The approved 1H layout. Below the fold: results preview, proof, then objections.
export const metadata = routeMetadata("/");

export default async function HomePage() {
  const [partners, hospitals] = await Promise.all([
    getPartners(),
    getPartnerHospitals(),
  ]);
  const counts = directoryCounts(hospitals);
  return (
    <>
      <Hero partnerHospitals={counts.hospitals} />
      <Stats partnerHospitals={counts.hospitals} />
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
