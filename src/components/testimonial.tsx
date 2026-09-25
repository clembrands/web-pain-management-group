import { testimonials } from "@/content/testimonials";

// A named hospital-leader quote, verbatim from the live site, set light and italic behind
// a hairline.
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
      className={`border-l pl-6 md:pl-8 ${dark ? "border-sky/60" : "border-brand/50"}`}
    >
      <blockquote
        className={`display-sans text-xl leading-relaxed font-light italic md:text-2xl ${dark ? "text-white" : "text-navy"}`}
      >
        {"“"}
        {t.quote}
        {"”"}
      </blockquote>
      <figcaption
        className={`label mt-6 ${dark ? "text-[#c4d3df]" : "text-muted"}`}
      >
        {byline}
      </figcaption>
    </figure>
  );
}
