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
          <div className="reveal-x">
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

// Partner logos as a slow, continuous scroll on white, in their own colours. The list is
// repeated so the loop has no gap at any viewport width; the second track is a copy hidden
// from assistive technology. Under prefers-reduced-motion the copy is hidden and the row
// stands still.
export function LogoMarquee({
  partners,
  title,
}: {
  partners: Partner[];
  title: string;
}) {
  const logos = partners.filter((p) => p.logo?.url);
  const repeated = [0, 1, 2].flatMap((n) =>
    logos.map((p) => ({ ...p, key: `${p._id}-${n}` })),
  );
  const track = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="marquee-track flex shrink-0 items-center gap-20 pr-20 md:gap-28 md:pr-28"
    >
      {repeated.map((partner) => (
        <li
          key={partner.key}
          className="relative h-10 w-40 shrink-0 md:h-12 md:w-48"
        >
          <Image
            src={partner.logo.url}
            alt={hidden ? "" : partner.logo.alt || partner.name}
            fill
            sizes="192px"
            className="object-contain"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="hairline overflow-hidden bg-white py-12 md:py-14">
      <div className="container-shell text-center">
        <h2 className="label text-brand">{title}</h2>
      </div>
      <div className="marquee mt-10 flex">
        {track(false)}
        {track(true)}
      </div>
    </section>
  );
}

// The Martin testimonial, centered and in quotation marks, on a compact dark section.
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
      <figure className="container-shell flex flex-col items-center py-16 text-center md:py-20">
        <p className="label text-sky">From our partners</p>
        <blockquote
          className={`reveal mt-8 max-w-3xl text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-relaxed ${face === "serif" ? "display-serif italic text-[clamp(1.35rem,1rem+0.9vw,1.9rem)]" : "font-light italic [font-family:var(--font-poppins-light,var(--font-poppins))]"}`}
        >
          {"\u201c"}
          {t.quote}
          {"\u201d"}
        </blockquote>
        <figcaption className="label mt-8 text-[#c4d3df]">{byline}</figcaption>
      </figure>
    </section>
  );
}

// Closing call to action for hospital leaders, centered, in display type.
export function LabCta({ face }: { face: "serif" | "sans" }) {
  const cta = ctas.hospital;
  return (
    <section className="bg-deep text-white">
      <div className="container-shell flex flex-col items-center py-20 text-center md:py-28">
        <p className="label text-sky">Next step</p>
        <h2
          className={`mt-6 max-w-4xl ${face === "serif" ? "display-md display-serif" : "display-md display-sans"}`}
        >
          {cta.title}
        </h2>
        <p className="mt-6 max-w-xl text-[#b9c8d4]">{cta.body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
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
    </section>
  );
}
