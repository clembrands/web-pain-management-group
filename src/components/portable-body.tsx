import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { ViewMedicaFrame, ViewMedicaScript } from "@/components/viewmedica";

type BodyImage = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

const makeComponents = (title: string): PortableTextComponents => ({
  types: {
    viewmedica: ({ value }) => (
      <ViewMedicaFrame {...value} title={`${title}: ViewMedica video`} />
    ),
    viewmedicaScript: ({ value }) => <ViewMedicaScript {...value} />,
    // Migrated images carry a local src; Sanity images get theirs from the query.
    image: ({ value }: { value: BodyImage }) =>
      value.src ? (
        <figure className="my-8 overflow-hidden rounded-[18px]">
          <Image
            src={value.src}
            alt={value.alt ?? ""}
            width={value.width ?? 1024}
            height={value.height ?? 683}
            sizes="(max-width: 768px) 100vw, 720px"
            className="h-auto w-full"
          />
        </figure>
      ) : null,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      const className = "font-medium text-brand underline underline-offset-4";
      return href.startsWith("/") ? (
        <Link href={href} className={className}>
          {children}
        </Link>
      ) : (
        <a href={href} className={className}>
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl text-navy">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl text-navy">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-lg font-semibold text-navy">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-5 border-l-4 border-line pl-5 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  listItem: {
    // Many migrated articles type their own "– " before each item; show no second marker.
    bullet: ({ children, value }) => {
      const first =
        (value as { children?: { text?: string }[] }).children?.[0]?.text ?? "";
      return (
        <li className={/^[–-] /.test(first) ? "-ml-6 list-none" : undefined}>
          {children}
        </li>
      );
    },
    number: ({ children }) => <li>{children}</li>,
  },
});

// Rich text bodies for articles, news posts, and case studies. `title` labels embedded video.
export function PortableBody({
  value,
  title = "",
}: {
  value: unknown[];
  title?: string;
}) {
  return (
    <div className="text-[17px] leading-relaxed text-ink">
      <PortableText
        value={value as PortableTextBlock[]}
        components={makeComponents(title)}
      />
    </div>
  );
}
