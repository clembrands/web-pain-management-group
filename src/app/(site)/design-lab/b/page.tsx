import Image from "next/image";
import Link from "next/link";
import { BalancedMark, balancedLines } from "@/components/lab/balanced-mark";
import {
  LabCta,
  LogoBand,
  RuleFaqs,
  Statement,
  Timeline,
} from "@/components/lab/sections";
import { PartnerMap } from "@/components/partner-map";
import { RichText } from "@/components/rich-text";
import { homeContent } from "@/content/pages/home";
import {
  homeQuestionIds,
  hospitalLeaderQuestions,
  partnershipPages,
  phases,
  pillars,
} from "@/content/pages/partnership";
import { directoryCounts } from "@/lib/partner-stats";
import { getPartnerHospitals, getPartners } from "@/sanity/lib/content";
import { scheduleCallHref } from "@/lib/site";

// Direction B, "Monument": ultra-light sans display type at large scale, dark-first, panels
// offset from the grid and overlapping section edges, the partner map as the hero graphic.
// Copy is the existing Home and Partnership copy, unchanged.
export default async function DirectionB() {
  const [partners, hospitals] = await Promise.all([
    getPartners(),
    getPartnerHospitals(),
  ]);
  const counts = directoryCounts(hospitals);
  const hero = homeContent.hero;
  const problem = partnershipPages["/partnership/"].sections[0];
  const balanced = pillars[1];
  const questions = homeQuestionIds.map((id) =>
    hospitalLeaderQuestions.find((q) => q.id === id)!,
  );
  const facts = hero.facts.map((f) =>
    f.replace("directory:hospitals", String(counts.hospitals)),
  );

  return (
    <>
      {/* 1. Map-led hero */}
      <section className="relative overflow-hidden bg-deep text-white">
        {/* Decorative: the same map as a static image, so the page inlines the SVG once. */}
        <Image
          src="/partner-map-dark.svg"
          alt=""
          width={975}
          height={610}
          unoptimized
          priority
          className="pointer-events-none absolute top-1/2 -right-[10%] w-[90%] -translate-y-1/2 opacity-70 md:w-[66%]"
        />
        <div className="container-shell relative pt-20 pb-40 md:pt-28 md:pb-56">
          <p className="label text-sky">
            Hospital pain management partnerships
          </p>
          <h1 className="display display-sans mt-10 max-w-5xl">
            {hero.title}
            <br />
            <span className="text-sky">{hero.accent}</span>
          </h1>
          <div className="mt-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-md text-[17px] text-[#c4d3df]">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>

      {/* 2. The problem; a navy panel pulls up into the hero */}
      <section className="bg-white">
        <div className="container-shell relative -mt-24 pb-24 md:-mt-32 md:pb-32">
          <div className="grid gap-px bg-white md:grid-cols-3">
            {facts.map((f) => (
              <div key={f} className="bg-navy p-8 text-sm text-white">
                <RichText text={f} />
              </div>
            ))}
          </div>
          <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <div>
              <p className="label text-brand">The problem</p>
              <p className="numeral display-sans reveal mt-8 text-navy">
                100 million
              </p>
              <p className="label mt-4 text-muted">
                U.S. adults living with chronic pain
              </p>
              <h2 className="display-md display-sans mt-14 text-navy">
                {problem.title}
              </h2>
            </div>
            <div className="reveal lg:pt-28">
              <div className="max-w-lg space-y-5 text-muted">
                {problem.paragraphs?.map((p) => (
                  <p key={p}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
              <ol className="mt-10 lg:-mr-24">
                {problem.points?.map((point, i) => (
                  <li
                    key={point}
                    className="grid grid-cols-[3rem_1fr] items-baseline border-t border-line py-4 text-[15px] text-ink"
                  >
                    <span className="label text-brand">0{i + 1}</span>
                    {point}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Balanced model as three staggered panels */}
      <section className="relative overflow-hidden bg-navy text-white">
        <BalancedMark
          variant="outline"
          className="pointer-events-none absolute top-10 right-0 hidden w-[36vw] max-w-xl text-sky/30 lg:block"
        />
        <div className="container-shell relative py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="label text-sky">The Balanced model</p>
            <h2 className="display-md display-sans mt-6">
              Balanced Pain Treatment Centers
            </h2>
            <p className="mt-8 max-w-lg text-[#c4d3df] [&_a]:text-sky [&_a]:hover:text-white">
              <RichText text={balanced.body} />
            </p>
          </div>
          <ol className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8">
            {balancedLines.map((line, i) => (
              <li
                key={line}
                className={`reveal border-t border-white/25 pt-8 ${["", "md:mt-16", "md:mt-32"][i]}`}
              >
                <p className="display-sans text-7xl leading-none text-sky tabular-nums md:text-8xl">
                  0{i + 1}
                </p>
                <p className="mt-8 text-2xl font-light md:text-3xl">{line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Four phases */}
      <section className="bg-white">
        <div className="container-shell grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-brand">Four phases</p>
            <h2 className="display-md display-sans mt-6 text-navy">
              How the partnership works
            </h2>
            <Link
              href="/partnership/how-it-works/"
              className="button button-outline mt-10"
            >
              See how the partnership works
            </Link>
          </div>
          <Timeline steps={phases} markers="numerals" />
        </div>
      </section>

      {/* 5. Proof: the map full-bleed and dark, with a light panel breaking its edge */}
      <section className="relative bg-deep text-white">
        <div className="container-shell pt-24 md:pt-32">
          <p className="label text-sky">Proof</p>
          <h2 className="display-md display-sans mt-6 max-w-2xl">
            {homeContent.locations.title}
          </h2>
        </div>
        <div className="relative mx-auto mt-10 max-w-7xl px-6 md:px-12">
          <PartnerMap tone="dark" />
        </div>
        <div className="container-shell relative -mb-20 md:-mb-28">
          <div className="grid gap-px bg-line md:grid-cols-[1.2fr_1fr_1fr_1fr] md:-ml-12">
            <div className="bg-white p-8 text-navy md:p-10">
              <p className="numeral display-sans text-navy">
                {counts.hospitals}
              </p>
              <p className="label mt-3 text-muted">
                partner hospitals in {counts.states} states
              </p>
              <Link
                href="/our-partners/"
                className="label mt-6 inline-block text-brand underline-offset-4 hover:underline"
              >
                Find a partner center by state →
              </Link>
            </div>
            {homeContent.stats.items.slice(1).map((s) => (
              <div key={s.label} className="bg-white p-8 text-navy md:p-10">
                <p className="display-sans text-4xl whitespace-nowrap md:text-5xl">
                  <RichText text={s.value} />
                </p>
                <p className="label mt-3 text-muted">
                  <RichText text={s.label} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-white pt-20 md:pt-28">
        <LogoBand partners={partners} title="Hospitals that partner with PMG" />
      </div>

      {/* 6. Testimonial as a statement */}
      <Statement name="Patrick J. Martin" face="sans" tone="navy" />

      {/* 7. Questions */}
      <section className="bg-mist">
        <div className="container-shell grid gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-brand">Straight answers</p>
            <h2 className="display-md display-sans mt-6 text-navy">
              What hospital leaders actually ask us
            </h2>
            <Link
              href="/partnership/questions/"
              className="button button-outline mt-10"
            >
              See every question
            </Link>
          </div>
          <RuleFaqs items={questions} />
        </div>
      </section>

      {/* 8. Closing CTA */}
      <LabCta face="sans" />
    </>
  );
}
