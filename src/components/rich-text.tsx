import Link from "next/link";
import { Fragment } from "react";

// Page copy is written as plain strings with two inline forms:
//   {{TBD: what is missing}}  a fact PMG has not confirmed yet. Rendered highlighted so it
//                             cannot be mistaken for real copy; the launch check fails on it.
//   [link text](/path/)       an internal or external link.
const TOKEN = /\{\{TBD: ([^}]+)\}\}|\[([^\]]+)\]\(([^)]+)\)/g;

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

export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<Tbd key={m.index}>{m[1]}</Tbd>);
    else {
      const className =
        "font-medium text-brand underline underline-offset-4 hover:text-[#2d5d84]";
      parts.push(
        m[3].startsWith("https://") ? (
          <a key={m.index} href={m[3]} className={className}>
            {m[2]}
          </a>
        ) : (
          <Link key={m.index} href={m[3]} className={className}>
            {m[2]}
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

// Plain text for metadata and JSON-LD: links keep their text, TBDs stay visible.
export const plainText = (text: string) =>
  text.replace(TOKEN, (_, tbd, label) => (tbd ? `{{TBD: ${tbd}}}` : label));
