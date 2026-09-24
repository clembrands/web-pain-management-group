import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/content/types";
import { scheduleCallHref } from "@/lib/site";
export function Hero({ home }: { home: HomeContent }) {
  return (
    <section className="bg-navy text-white">
      <div className="container-shell grid items-center gap-10 pb-16 pt-9 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div>
          <h1 className="text-[38px] leading-[1.18] font-bold tracking-tight sm:text-5xl">
            <span>{home.heroTitle}</span>
            <br />
            <span className="text-sky">{home.heroAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-[#c4d3df] md:text-[17px]">
            {home.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={scheduleCallHref} className="button button-primary">
              Schedule a Call
            </Link>
            <Link href="/results/" className="button button-dark-outline">
              See Our Results
            </Link>
          </div>
          <p className="mt-6 text-xs font-medium text-[#b9c8d4]">
            20 years · 40 hospital partnerships · 68 care locations
          </p>
        </div>
        <div className="relative aspect-[1.2] overflow-hidden rounded-[22px] border border-[#2c465c]">
          <Image
            src={home.heroImage.url}
            alt={home.heroImage.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <span
            aria-hidden="true"
            className="absolute top-6 right-6 flex size-13 items-center justify-center rounded-full bg-[#f4c860] text-xl font-bold text-ink"
          >
            ✓
          </span>
        </div>
      </div>
    </section>
  );
}
