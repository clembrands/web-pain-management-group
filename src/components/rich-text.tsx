import Link from "next/link";
import { Fragment } from "react";
import { isSampleKey, sampleFigures } from "@/content/sample-figures";

// Page copy is written as plain strings with three inline forms:
//   {{TBD: what is missing}}  a fact PMG has not confirmed yet. Rendered highlighted so it
//                             cannot be mistaken for real copy; the launch check fails on it.
//   {{SAMPLE: key}}           a sample figure from src/content/sample-figures.ts, shown as a
//                             plain number for review. Marked data-sample in the HTML, so the
//                             launch check fails on it too.
//   [link text](/path/)       an internal or external link.
const TOKEN =
  /\{\{TBD: ([^}]+)\}\}|\{\{SAMPLE: ([a-zA-Z]+)\}\}|\[([^\]]+)\]\(([^)]+)\)/g;

export function Tbd({ children }: { children: React.ReactNode }) {
  return (
    <mark
      data-tbd
      className="rounded bg-[#fbf0cf] px-1 py-0.5 font-medium text-[#6b4f10] [box-decoration-break:clone]"
    >
      {"{{"}TBD: {children}
      {"}}"}
    </mark>
  );
}

export function Sample({ figure }: { figure: string }) {
  if (!isSampleKey(figure)) return <Tbd>unknown sample figure {figure}</Tbd>;
  return (
    <span data-sample={figure} title="Sample figure, to be confirmed by PMG">
      {sampleFigures[figure].value}
    </span>
  );
}

export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<Tbd key={m.index}>{m[1]}</Tbd>);
    else if (m[2]) parts.push(<Sample key={m.index} figure={m[2]} />);
    else {
      const className =
        "font-medium text-brand underline underline-offset-4 hover:text-[#2d5d84]";
      parts.push(
        /^(https?:|mailto:|tel:)/.test(m[4]) ? (
          <a key={m.index} href={m[4]} className={className}>
            {m[3]}
          </a>
        ) : (
          <Link key={m.index} href={m[4]} className={className}>
            {m[3]}
          </Link>
        ),
      );
    }
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}

// The sample-figure key in a string, if it holds one, for components that render a value
// themselves and must keep the data-sample marker the launch checks look for.
export const sampleKeyOf = (text: string) =>
  text.match(/\{\{SAMPLE: ([a-zA-Z]+)\}\}/)?.[1];

// Plain text for metadata and JSON-LD: links keep their text, samples show their value,
// TBDs stay visible.
export const plainText = (text: string) =>
  text.replace(TOKEN, (_, tbd, sample, label) =>
    tbd
      ? `{{TBD: ${tbd}}}`
      : sample
        ? isSampleKey(sample)
          ? sampleFigures[sample].value
          : sample
        : label,
  );
