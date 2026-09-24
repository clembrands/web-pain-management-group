import Image from "next/image";
import Link from "next/link";
import { ctas } from "@/components/cta";
import { RichText } from "@/components/rich-text";
import type { Question, Step } from "@/content/pages/partnership";
import type { Partner } from "@/content/types";
import { testimonials } from "@/content/testimonials";

// Section building blocks shared by the design-lab directions. Every word comes from the
// existing content files; these components only lay it out.

// Questions as a hairline list instead of cards.
export function RuleFaqs({
  items,
  tone = "light",
}: {
  items: Question[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={dark ? "divide-y divide-white/15" : "divide-y divide-line"}>
      {items.map((item, i) => (
        <details key={item.id} className="group py-6" open={i === 0}>
          <summary className="flex list-none items-start justify-between gap-6 text-lg leading-snug font-medium md:text-xl [&::-webkit-details-marker]:hidden">
            <span className="flex gap-5">
              <span
                className={`label mt-2 shrink-0 tabular-nums ${dark ? "text-sky" : "text-brand"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className={`mt-1 shrink-0 text-2xl leading-none transition-transform group-open:rotate-45 ${dark ? "text-sky" : "text-brand"}`}
            >
              +
            </span>
          </summary>
          <div
            className={`mt-4 max-w-2xl space-y-3 pl-11 text-[15px] ${dark ? "text-[#c4d3df]" : "text-muted"}`}
          >
            {item.answer.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

// The four phases as a vertical timeline whose line and markers fill as the reader scrolls.
export function Timeline({
  steps,
  markers = "dots",
  tone = "light",
}: {
  steps: Step[];
  markers?: "dots" | "numerals";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ol
      className={`reveal-line relative before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px ${dark ? "before:bg-sky/60" : "before:bg-brand/50"}`}
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="relative grid grid-cols-[24px_1fr] gap-x-8 pb-14 last:pb-0 md:gap-x-12"
        >
          <span
            aria-hidden="true"
            className={`reveal-dot mt-1.5 flex size-6 items-center justify-center rounded-full border text-[10px] font-bold ${dark ? "border-sky bg-navy" : "border-brand bg-white"}`}
          />
          <div className="reveal">
            {markers === "numerals" && (
              <p
                className={`display-sans text-6xl leading-none tabular-nums md:text-7xl ${dark ? "text-sky" : "text-brand"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
            )}
            <h3
              className={`mt-3 text-2xl font-medium md:text-[28px] ${dark ? "text-white" : "text-navy"}`}
            >
              {step.title}
            </h3>
            <p
              className={`mt-3 max-w-md text-[15px] ${dark ? "text-[#c4d3df]" : "text-muted"}`}
            >
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// Partner logos in a quiet strip, one hairline above and below.
export function LogoBand({
  partners,
  title,
}: {
  partners: Partner[];
  title: string;
}) {
  return (
    <section className="container-shell hairline py-10">
      <div className="flex flex-wrap items-center justify-between gap-8">
        <p className="label text-muted">{title}</p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {partners
            .filter((p) => p.logo?.url)
            .map((partner) => (
              <div key={partner._id} className="relative h-10 w-36">
                <Image
                  src={partner.logo.url}
                  alt={partner.logo.alt || partner.name}
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
            ))}
        </div>
        <Link
          href="/our-partners/"
          className="label text-brand underline-offset-4 hover:underline"
        >
          Find a partner center by state →
        </Link>
      </div>
    </section>
  );
}

// The Martin testimonial as a large-type statement across a full dark section.
export function Statement({
  name,
  face,
  tone = "navy",
}: {
  name: string;
  face: "serif" | "sans";
  tone?: "navy" | "deep";
}) {
  const t = testimonials.find((x) => x.name === name);
  if (!t) throw new Error(`No testimonial for ${name}`);
  const byline = [
    [t.name, t.credentials].filter(Boolean).join(", "),
    t.title,
    t.organization,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <section
      className={tone === "deep" ? "bg-deep text-white" : "bg-navy text-white"}
    >
      <figure className="container-shell py-24 md:py-36">
        <p className="label text-sky">From our partners</p>
        <blockquote
          className={`reveal mt-10 max-w-5xl text-[clamp(1.6rem,1rem+1.9vw,2.9rem)] leading-[1.25] ${face === "serif" ? "display-serif italic" : "font-light"}`}
        >
          {t.quote}
        </blockquote>
        <figcaption className="label mt-12 text-[#c4d3df]">{byline}</figcaption>
      </figure>
    </section>
  );
}

// Closing call to action for hospital leaders, in display type.
export function LabCta({ face }: { face: "serif" | "sans" }) {
  const cta = ctas.hospital;
  return (
    <section className="bg-deep text-white">
      <div className="container-shell grid gap-10 py-24 md:grid-cols-[1.4fr_1fr] md:items-end md:py-32">
        <div>
          <p className="label text-sky">Next step</p>
          <h2
            className={`mt-6 ${face === "serif" ? "display-md display-serif" : "display-md display-sans"}`}
          >
            {cta.title}
          </h2>
        </div>
        <div>
          <p className="text-[#b9c8d4]">{cta.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cta.href}
              className="button bg-white text-navy hover:bg-[#dce6ee]"
            >
              {cta.label}
            </Link>
            {cta.secondary.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="button button-dark-outline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
