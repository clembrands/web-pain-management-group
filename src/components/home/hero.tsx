import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/rich-text";
import { homeContent } from "@/content/pages/home";
import { scheduleCallHref } from "@/lib/site";

// Two-audience hero: hospital leaders to the Partnership Model, providers to opportunities.
export function Hero({ partnerHospitals }: { partnerHospitals: number }) {
  const hero = homeContent.hero;
  return (
    <section className="bg-navy text-white">
      <div className="container-shell grid items-center gap-10 pt-9 pb-16 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div>
          <h1 className="text-[38px] leading-[1.18] font-bold tracking-tight sm:text-5xl">
            <span>{hero.title}</span>
            <br />
            <span className="text-sky">{hero.accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-[#c4d3df] md:text-[17px]">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/partnership/" className="button button-primary">
              Explore the Partnership Model
            </Link>
            <Link
              href={scheduleCallHref}
              className="button button-dark-outline"
            >
              Schedule a Call
            </Link>
          </div>
          <p className="mt-5 text-sm text-[#c4d3df]">
            Physician or APP?{" "}
            <Link
              href="/providers/"
              className="font-semibold text-white underline underline-offset-4"
            >
              Practice with PMG
            </Link>
          </p>
          <p className="mt-6 text-xs font-medium text-[#b9c8d4]">
            <RichText
              text={hero.facts
                .map((f) =>
                  f.replace("directory:hospitals", String(partnerHospitals)),
                )
                .join(" · ")}
            />
          </p>
        </div>
        <div className="relative aspect-[1.2] overflow-hidden rounded-[22px] border border-[#2c465c]">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
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
