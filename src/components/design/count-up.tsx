import { CountReveal } from "@/components/design/count-reveal";
import { plainText, pmgKeyOf, sampleKeyOf } from "@/components/rich-text";

// A figure that counts up to its value as it scrolls into view, with CSS only (see .count in
// globals.css). The full value stays in the HTML for assistive technology and search; the
// animated digits are drawn by a CSS counter. Browsers without scroll-driven animations, and
// readers who prefer reduced motion, see the final value at once. Sample figures keep their
// data-sample marker.
export function CountUp({
  text,
  className = "",
  reveal = false,
}: {
  // Copy string, possibly holding a {{SAMPLE: key}} token.
  text: string;
  className?: string;
  // Stay hidden until the figure is fully in view, then count once, for figures near the
  // top of a page (a scroll-linked count would sit at a partial number there).
  reveal?: boolean;
}) {
  const value = plainText(text);
  const sample = sampleKeyOf(text);
  const pmg = pmgKeyOf(text);
  const m = value.match(/^(\d+)([\s\S]*)$/);
  if (!m)
    return (
      <span className={className} data-sample={sample} data-pmg={pmg}>
        {value}
      </span>
    );
  const target = Number(m[1]);
  const rest = m[2];
  // A year counts through its last two decades rather than up from zero.
  const start =
    target >= 1900 && target <= 2100 && rest === "" ? target - 19 : 0;
  const figure = (
    <>
      <span
        aria-hidden="true"
        className="count"
        style={{ "--start": start, "--target": target } as React.CSSProperties}
      />
      <span aria-hidden="true">{rest}</span>
    </>
  );
  return (
    <span className={className} data-sample={sample} data-pmg={pmg}>
      <span className="sr-only">{value}</span>
      {reveal ? <CountReveal>{figure}</CountReveal> : figure}
    </span>
  );
}
