import { plainText, pmgKeyOf, sampleKeyOf } from "@/components/rich-text";

// A figure that counts up to its value as it scrolls into view, with CSS only (see .count in
// globals.css). The full value stays in the HTML for assistive technology and search; the
// animated digits are drawn by a CSS counter. Browsers without scroll-driven animations, and
// readers who prefer reduced motion, see the final value at once. Sample figures keep their
// data-sample marker.
export function CountUp({
  text,
  className = "",
}: {
  // Copy string, possibly holding a {{SAMPLE: key}} token.
  text: string;
  className?: string;
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
  return (
    <span className={className} data-sample={sample} data-pmg={pmg}>
      <span className="sr-only">{value}</span>
      <span
        aria-hidden="true"
        className="count"
        style={{ "--start": start, "--target": target } as React.CSSProperties}
      />
      <span aria-hidden="true">{rest}</span>
    </span>
  );
}
