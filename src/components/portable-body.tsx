import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

type BodyImage = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

const components: PortableTextComponents = {
  types: {
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
  },
};

// Rich text bodies for news posts and case studies.
export function PortableBody({ value }: { value: unknown[] }) {
  return (
    <div className="text-[17px] leading-relaxed text-ink">
      <PortableText
        value={value as PortableTextBlock[]}
        components={components}
      />
    </div>
  );
}
