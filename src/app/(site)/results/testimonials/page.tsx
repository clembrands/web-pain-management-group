import { PageShell } from "@/components/page-shell";
import { TestimonialQuote } from "@/components/testimonial";
import { testimonials } from "@/content/testimonials";
import { routeMetadata } from "@/lib/seo";

const path = "/results/testimonials/";
export const metadata = routeMetadata(path);

// The three named testimonials from the live site, verbatim. No photos.
export default function TestimonialsPage() {
  return (
    <PageShell
      path={path}
      eyebrow="Results and Outcomes"
      lede="Hospital leaders on partnering with Pain Management Group, in their own words."
      related={["/results/", "/partnership/", "/partnership/questions/"]}
    >
      <section className="container-shell section-space">
        <div className="mx-auto grid max-w-4xl gap-6">
          {testimonials.map((t) => (
            <TestimonialQuote key={t.name} name={t.name} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
