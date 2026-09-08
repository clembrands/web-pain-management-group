import { getPage, getSettings } from "@/sanity/lib/content";
import { submissionsReady } from "@/sanity/lib/submissions";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/seo";
import { reviewMode } from "@/content/review/pages";
import { DemoInquiry } from "@/components/demo-inquiry";
import Link from "next/link";
import { ReviewMediaFigure } from "@/components/review-media";
import { reviewMedia } from "@/content/review/media";
export const dynamic = "force-dynamic";
export async function generateMetadata() {
  const page = (await getPage("contact"))!;
  return pageMetadata(
    page.seoTitle || page.title,
    page.seoDescription || page.description,
    "/contact",
  );
}
export default async function ContactPage() {
  const [page, settings, enabled] = await Promise.all([
    getPage("contact"),
    getSettings(),
    reviewMode ? Promise.resolve(false) : submissionsReady().catch(() => false),
  ]);
  return (
    <>
      <PageHero page={page!} />
      <section className="container-shell section-space grid items-start gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">Pain Management Group</p>
          <h2>A conversation starts here.</h2>
          <p className="mt-5 text-muted">
            Tell us about your hospital, your community, or your interest in
            joining a physician-led team.
          </p>
          {reviewMode && (
            <div className="mt-8">
              <ReviewMediaFigure media={reviewMedia("contact")!} />
            </div>
          )}
          <div className="mt-8 space-y-5">
            {settings.phone && (
              <p>
                <span className="block text-xs text-muted">Phone</span>
                <a
                  className="text-lg text-brand underline"
                  href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
                >
                  {settings.phone}
                </a>
              </p>
            )}
            {settings.email && (
              <p>
                <span className="block text-xs text-muted">Email</span>
                <a
                  className="break-all text-lg text-brand underline"
                  href={`mailto:${settings.email}`}
                >
                  {settings.email}
                </a>
              </p>
            )}
            {settings.schedulingUrl && (
              <a
                className="button button-primary"
                href={settings.schedulingUrl}
              >
                Schedule a Call
              </a>
            )}
          </div>
        </div>
        {reviewMode ? <DemoInquiry /> : <ContactForm enabled={enabled} />}
      </section>
      <section className="container-shell pb-16">
        <div className="rounded-2xl bg-mist p-8">
          <h2 className="text-2xl">Looking for patient care?</h2>
          <p className="mt-4 text-muted">
            Appointments are handled by the local hospital or clinic. Find the
            right contact through our location directory.
          </p>
          <Link href="/locations" className="button button-outline mt-6">
            Find a care location →
          </Link>
        </div>
      </section>
    </>
  );
}
