import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/content/types";
import { Faqs } from "@/components/ui";
export function PartnerStory({ home }: { home: HomeContent }) {
  return (
    <section className="bg-navy text-white">
      <div className="container-shell section-space grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[1.5] overflow-hidden rounded-[20px]">
          <Image
            src={home.storyImage.url}
            alt={home.storyImage.alt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow text-sky">Partner story</p>
          <h2>{home.storyTitle}</h2>
          <p className="mt-5 text-[#b9c8d4]">{home.storyDescription}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {home.storyUrl && (
              <a href={home.storyUrl} className="button button-primary">
                Watch the Story
              </a>
            )}
            <Link
              href="/results/case-studies/"
              className="button button-dark-outline"
            >
              Explore Our Partnerships
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export function HomeFaqs({ home }: { home: HomeContent }) {
  return (
    <section className="container-shell section-space grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
      <div>
        <p className="eyebrow">Straight answers</p>
        <h2>
          What hospital leaders <span className="text-brand">actually ask</span>{" "}
          us
        </h2>
        <p className="mt-5 text-muted">
          The four objections we hear most, and how the partnership answers
          them.
        </p>
        <Link
          href="/partnership/questions/"
          className="button button-outline mt-7"
        >
          Talk it through with us
        </Link>
      </div>
      <Faqs items={home.faqs} />
    </section>
  );
}
export function LocationsPreview({ home }: { home: HomeContent }) {
  return (
    <section className="border-y border-line bg-mist">
      <div className="container-shell section-space grid items-center gap-10 md:grid-cols-[.9fr_1.1fr]">
        <div>
          <h2>{home.locationsTitle}</h2>
          <p className="mt-5 text-muted">{home.locationsDescription}</p>
          <Link href="/our-partners/" className="button button-outline mt-7">
            Find a location →
          </Link>
        </div>
        <div className="relative aspect-[1.5] overflow-hidden rounded-[20px]">
          <Image
            src={home.mapImage.url}
            alt={home.mapImage.alt}
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
          title: "Add a pain service line without the startup risk",
          body: "Physician recruiting, operations, compliance, and quality tracking, handled by a partner whose incentives match yours.",
          href: "/partnership/",
          label: "Explore the partnership →",
        },
        {
          eyebrow: "Physicians & APPs",
          title: "A practice model built around the clinician",
          body: "Clinical autonomy, real procedure support, predictable schedules, and a team built around responsible pain care.",
          href: "/providers/",
          label: "See opportunities →",
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
