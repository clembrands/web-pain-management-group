import Link from "next/link";
import { getPage } from "@/sanity/lib/content";
import { submissionsReady } from "@/sanity/lib/submissions";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Breadcrumbs } from "@/components/page-shell";
import { routeMetadata } from "@/lib/seo";
import { organization } from "@/lib/site";

// Interim contact page. Rebuilt as the Hospital Inquiry conversion page in Phase 8.
export const dynamic = "force-dynamic";
export const metadata = routeMetadata("/contact/");

export default async function ContactPage() {
  const [page, enabled] = await Promise.all([
    getPage("contact"),
    submissionsReady().catch(() => false),
  ]);
  return (
    <>
      <Breadcrumbs path="/contact/" />
      <PageHero page={page!} />
      <section
        id="schedule-a-call"
        className="container-shell section-space grid scroll-mt-8 items-start gap-12 md:grid-cols-2"
      >
        <div>
          <p className="eyebrow">Pain Management Group</p>
          <h2>A conversation starts here.</h2>
          <p className="mt-5 text-muted">
            Tell us about your hospital, your community, or your interest in
            joining a physician-led team.
          </p>
          <div className="mt-8 space-y-5">
            <p>
              <span className="block text-xs text-muted">Phone</span>
              <a
                className="text-lg text-brand underline"
                href={`tel:${organization.phone.replace(/[^\d]/g, "")}`}
              >
                {organization.phone}
              </a>
            </p>
            <p>
              <span className="block text-xs text-muted">Email</span>
              <a
                className="text-lg break-all text-brand underline"
                href={`mailto:${organization.email}`}
              >
                {organization.email}
              </a>
            </p>
          </div>
        </div>
        <ContactForm enabled={enabled} />
      </section>
      <section className="container-shell pb-16">
        <div className="rounded-2xl bg-mist p-8">
          <h2 className="text-2xl">Looking for patient care?</h2>
          <p className="mt-4 text-muted">
            Appointments are made directly with the hospital pain center. Find a
            PMG partner clinic in your state.
          </p>
          <Link href="/our-partners/" className="button button-outline mt-6">
            Find a Clinic
          </Link>
        </div>
      </section>
    </>
  );
}
