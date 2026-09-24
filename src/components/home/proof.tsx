import Image from "next/image";
import Link from "next/link";
import type { HomeContent, Partner } from "@/content/types";
export function Stats({ home }: { home: HomeContent }) {
  return (
    <section className="container-shell pt-14">
      <div className="overflow-hidden rounded-[22px] border border-line shadow-[0_12px_34px_rgba(30,42,50,.05)]">
        <div className="grid items-center gap-7 bg-linear-to-b from-[#f5f9fb] to-white p-7 md:grid-cols-[.85fr_1.15fr] md:gap-10 md:p-11">
          <div>
            <p className="eyebrow">PMG by the numbers</p>
            <h2 className="text-2xl md:text-[26px]">{home.statsTitle}</h2>
          </div>
          <p className="text-sm text-muted">{home.statsDescription}</p>
        </div>
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {home.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-line px-6 py-8 last:border-r-0"
            >
              <dt className="text-[38px] leading-none font-bold text-navy md:text-[44px]">
                {stat.value}
              </dt>
              <dd className="mt-3 text-sm text-muted">{stat.label}</dd>
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
      <h2>Real results. Nothing to hide.</h2>
      <Link
        href="/results/"
        className="mt-4 inline-block text-sm font-semibold text-[#2d5d84] underline-offset-4 hover:underline"
      >
        See the outcomes behind our hospital partnerships →
      </Link>
      <div className="mt-10">
        <PartnerLogos partners={partners} />
      </div>
    </section>
  );
}
