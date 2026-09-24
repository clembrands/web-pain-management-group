import { testimonials } from "@/content/testimonials";

// A named hospital-leader quote, verbatim from the live site.
export function TestimonialQuote({
  name,
  tone = "light",
}: {
  name: string;
  tone?: "light" | "dark";
}) {
  const t = testimonials.find((x) => x.name === name);
  if (!t) throw new Error(`No testimonial for ${name}`);
  const dark = tone === "dark";
  const byline = [
    [t.name, t.credentials].filter(Boolean).join(", "),
    t.title,
    t.organization,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <figure
      className={`rounded-[22px] p-7 md:p-9 ${dark ? "bg-[#1f3a50]" : "border border-line bg-mist"}`}
    >
      <span
        aria-hidden="true"
        className={`block text-5xl leading-none font-bold ${dark ? "text-sky" : "text-brand"}`}
      >
        “
      </span>
      <blockquote
        className={`mt-2 text-lg leading-relaxed ${dark ? "text-white" : "text-ink"}`}
      >
        {t.quote}
      </blockquote>
      <figcaption
        className={`mt-6 text-sm font-semibold ${dark ? "text-[#c4d3df]" : "text-navy"}`}
      >
        {byline}
      </figcaption>
    </figure>
  );
}
