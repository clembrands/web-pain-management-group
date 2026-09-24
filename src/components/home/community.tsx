import Image from "next/image";
import Link from "next/link";
import { Faqs } from "@/components/ui";
import { TestimonialQuote } from "@/components/testimonial";
import { homeContent } from "@/content/pages/home";
import {
  homeQuestionIds,
  hospitalLeaderQuestions,
} from "@/content/pages/partnership";

// Proof: a named hospital leader, quoted verbatim from the live site.
export function PartnerVoice() {
  return (
    <section className="bg-navy text-white">
      <div className="container-shell section-space grid items-center gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16">
        <div>
          <p className="eyebrow text-sky">From our partners</p>
          <h2>In the words of hospital leaders.</h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/results/testimonials/"
              className="button button-primary"
            >
              Read the testimonials
            </Link>
            <Link href="/results/" className="button button-dark-outline">
              See Results
            </Link>
          </div>
        </div>
        <TestimonialQuote name="Patrick J. Martin" tone="dark" />
      </div>
    </section>
  );
}

export function HomeFaqs() {
  const items = homeQuestionIds.map((id) =>
    hospitalLeaderQuestions.find((q) => q.id === id)!,
  );
  return (
    <section className="container-shell section-space grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
      <div>
        <p className="eyebrow">Straight answers</p>
        <h2>
          What hospital leaders <span className="text-brand">actually ask</span>{" "}
          us
        </h2>
        <p className="mt-5 text-muted">
          The questions CEOs and CFOs raise before a partnership, answered
          directly.
        </p>
        <Link
          href="/partnership/questions/"
          className="button button-outline mt-7"
        >
          See every question
        </Link>
      </div>
      <Faqs items={items} />
    </section>
  );
}

export function LocationsPreview() {
  const locations = homeContent.locations;
  return (
    <section className="border-y border-line bg-mist">
      <div className="container-shell section-space grid items-center gap-10 md:grid-cols-[.9fr_1.1fr]">
        <div>
          <h2>{locations.title}</h2>
          <p className="mt-5 text-muted">{locations.description}</p>
          <Link href="/our-partners/" className="button button-outline mt-7">
            Find a Clinic →
          </Link>
        </div>
        <div className="relative aspect-[1.5] overflow-hidden rounded-[20px]">
          <Image
            src={locations.image.src}
            alt={locations.image.alt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function Pathways() {
  return (
    <section className="container-shell section-space grid gap-6 md:grid-cols-2">
      {[
        {
          eyebrow: "Hospital leaders",
          title: "Add a pain management service line",
          body: "An outpatient, hospital-based pain center, with PMG's blueprint and ongoing program management behind it.",
          href: "/partnership/",
          label: "Explore the Partnership Model →",
        },
        {
          eyebrow: "Physicians & APPs",
          title: "Practice pain medicine at a hospital-based center",
          body: "Learn about practice autonomy, procedure support, and schedules at PMG partner hospitals.",
          href: "/providers/opportunities/",
          label: "View Opportunities →",
        },
      ].map((path, i) => (
        <article key={path.href} className="card flex flex-col items-start">
          <p className="eyebrow">{path.eyebrow}</p>
          <h3 className="text-2xl">{path.title}</h3>
          <p className="mt-4 mb-6 text-sm text-muted">{path.body}</p>
          <Link
            href={path.href}
            className={`button mt-auto ${i ? "button-outline" : "button-primary"}`}
          >
            {path.label}
          </Link>
        </article>
      ))}
    </section>
  );
}
