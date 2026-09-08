import { getHome, getPartners, getSettings } from "@/sanity/lib/content";
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
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Hospital-based pain programs",
  "We build and run hospital-based pain programs with you — turning pain services into a quality win and a sustainable service line.",
  "/",
);
export default async function HomePage() {
  const [home, partners, settings] = await Promise.all([
    getHome(),
    getPartners(),
    getSettings(),
  ]);
  return (
    <>
      <Hero home={home} schedulingUrl={settings.schedulingUrl} />
      <Stats home={home} />
      <SocialProof partners={partners} />
      <Differentiators home={home} />
      <PartnershipSteps home={home} />
      <PartnerStory home={home} />
      <HomeFaqs home={home} />
      <LocationsPreview home={home} />
      <Pathways />
      <CtaBand schedulingUrl={settings.schedulingUrl} />
    </>
  );
}
