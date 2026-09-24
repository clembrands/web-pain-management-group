import { PageShell } from "@/components/page-shell";
import { Tbd } from "@/components/rich-text";
import { lifeAtPmg } from "@/content/pages/providers";
import { routeMetadata } from "@/lib/seo";

const path = "/providers/life-at-pmg/";
// Noindex (route status "pending") until PMG supplies provider testimonials.
export const metadata = routeMetadata(path);

export default function LifeAtPmgPage() {
  return (
    <PageShell
      path={path}
      eyebrow="For Providers and APPs"
      lede={lifeAtPmg.lede}
      related={[
        "/providers/why-pmg/",
        "/providers/opportunities/",
        "/about-us/",
      ]}
    >
      <section className="container-shell section-space">
        <h2>Our culture</h2>
        <p className="mt-5 max-w-3xl text-muted">{lifeAtPmg.culture}</p>
        <h2 className="mt-14">In their words</h2>
        <p className="mt-3 text-muted">
          Physicians and APPs at PMG partner centers on their work.
        </p>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {Array.from({ length: lifeAtPmg.testimonialSlots }, (_, i) => (
            <li
              key={i}
              className="rounded-[18px] border border-dashed border-[#aabcc9] bg-mist p-6 text-sm"
            >
              <p>
                <Tbd>provider testimonial, quoted with permission</Tbd>
              </p>
              <p className="mt-4 font-semibold text-navy">
                <Tbd>name, credentials, and partner center</Tbd>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
