import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/rich-text";
import { homeContent } from "@/content/pages/home";
import type { Partner } from "@/content/types";

export function Stats() {
  const stats = homeContent.stats;
  return (
    <section className="container-shell pt-14">
      <div className="overflow-hidden rounded-[22px] border border-line shadow-[0_12px_34px_rgba(30,42,50,.05)]">
        <div className="grid items-center gap-7 bg-linear-to-b from-[#f5f9fb] to-white p-7 md:grid-cols-[.85fr_1.15fr] md:gap-10 md:p-11">
          <div>
            <p className="eyebrow">PMG by the numbers</p>
            <h2 className="text-2xl md:text-[26px]">{stats.title}</h2>
          </div>
          <p className="text-sm text-muted">{stats.description}</p>
        </div>
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.items.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse border-r border-line px-6 py-8 last:border-r-0"
            >
              <dt className="mt-3 text-sm text-muted">
                <RichText text={stat.label} />
              </dt>
              {/* Placeholders render smaller than a confirmed figure would. */}
              <dd
                className={
                  stat.value.startsWith("{{TBD")
                    ? "text-base leading-tight font-bold text-navy"
                    : "text-[38px] leading-none font-bold text-navy md:text-[44px]"
                }
              >
                <RichText text={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function PartnerLogos({ partners }: { partners: Partner[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
      {partners
        .filter((p) => p.logo?.url)
        .map((partner) => (
          <div key={partner._id} className="relative h-16 w-48">
            <Image
              src={partner.logo.url}
              alt={partner.logo.alt || partner.name}
              fill
              sizes="192px"
              className="object-contain"
            />
          </div>
        ))}
    </div>
  );
}

export function SocialProof({ partners }: { partners: Partner[] }) {
  return (
    <section className="container-shell py-14 text-center">
      <h2>Hospitals that partner with PMG</h2>
      <Link
        href="/our-partners/"
        className="mt-4 inline-block text-sm font-semibold text-[#2d5d84] underline-offset-4 hover:underline"
      >
        Find a partner center by state →
      </Link>
      <div className="mt-10">
        <PartnerLogos partners={partners} />
      </div>
    </section>
  );
}
