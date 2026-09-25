import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { formServedAt, inquiryDeliveryAvailable } from "@/lib/inquiry-delivery";
import { routeMetadata } from "@/lib/seo";
import { organization } from "@/lib/site";

// Rendered per request: the form is offered only when a delivery destination is
// configured, and each render stamps the time for the spam check.
export const dynamic = "force-dynamic";
export const metadata = routeMetadata("/contact/");

export default async function ContactPage() {
  const enabled = await inquiryDeliveryAvailable();
  const startedAt = formServedAt();
  const a = organization.address;
  return (
    <PageShell
      path="/contact/"
      eyebrow="Contact"
      lede="Schedule a call with Pain Management Group about a pain management program for your hospital. Looking for pain care? Find a partner clinic in your state."
      secondary={{ label: "Find a Clinic", href: "/our-partners/" }}
    >
      <section
        id="schedule-a-call"
        className="container-shell section-space grid scroll-mt-4 items-start gap-12 md:grid-cols-[1fr_1.2fr]"
      >
        <div>
          <p className="eyebrow">For hospital leaders</p>
          <h2>Start with a conversation.</h2>
          <p className="mt-5 text-muted">
            A call covers the partnership model, what it takes to launch, and
            whether it fits your community.{" "}
            <Link
              href="/partnership/questions/"
              className="text-brand underline"
            >
              See what hospital leaders ask
            </Link>
            .
          </p>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="text-xs text-muted">Phone</dt>
              <dd>
                <a
                  className="text-lg text-brand underline"
                  href={`tel:${organization.phone.replace(/[^\d]/g, "")}`}
                >
                  {organization.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Email</dt>
              <dd>
                <a
                  className="text-lg break-all text-brand underline"
                  href={`mailto:${organization.email}`}
                >
                  {organization.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Office</dt>
              <dd className="not-italic">
                {a.street}
                <br />
                {a.city}, {a.region} {a.postalCode}
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm
          enabled={enabled}
          startedAt={startedAt}
          fallbackEmail={organization.email}
        />
      </section>
      <section id="find-a-clinic" className="container-shell pb-16">
        <div className="border-t border-line pt-8">
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
    </PageShell>
  );
}
