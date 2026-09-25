import Image from "next/image";
import Link from "next/link";
import { BalancedMark, balancedLines } from "@/components/design/balanced-mark";
import { CountUp } from "@/components/design/count-up";
import { HeroVideo } from "@/components/design/hero-video";
import { EndCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/faq-schema";
import {
  LogoMarquee,
  RuleFaqs,
  Statement,
  Timeline,
} from "@/components/design/sections";
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

// Home as a narrative for hospital leaders (the chosen "Monument" direction): ultra-light
// display type at large scale, dark-first, panels that break the grid, duotone concept
// photographs. Eight parts: hero, the problem (sourced copy), the Balanced model, the four
// phases as a timeline, proof (map and directory count), the Martin testimonial, questions,
// closing CTA. Copy comes from src/content; motion is CSS only (globals.css).
export async function HomeNarrative() {
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
  const figures = hero.figures.map((f) => ({
    ...f,
    value: f.value.replace("directory:hospitals", String(counts.hospitals)),
  }));

  return (
    <>
      {/* 1. Photographic hero: duotone concept image, headline on the dark left */}
      <section className="relative overflow-hidden bg-deep text-white">
        {/* Concept footage in navy duotone (a still first, the video on wider screens),
            dissolving into the background. Replaced by PMG's own before launch. */}
        <HeroVideo
          poster="/video/hero-corridor-poster.jpg"
          sources={[
            { src: "/video/hero-corridor.webm", type: "video/webm" },
            { src: "/video/hero-corridor.mp4", type: "video/mp4" },
          ]}
        />
        <div className="container-shell relative pt-16 pb-32 md:pt-24 md:pb-40">
          <h1 className="display-md display-sans max-w-3xl">
            {hero.title}
            <br />
            <span className="text-sky">{hero.accent}</span>
          </h1>
          <p className="mt-10 max-w-sm text-[15px] text-[#c4d3df]">
            {hero.description}
          </p>
        </div>
      </section>

      {/* 2. The problem; a white figures panel breaks the hero's bottom edge */}
      <section className="bg-white">
        <div className="container-shell relative -mt-20 pb-24 md:-mt-28 md:pb-32">
          <dl className="grid divide-y divide-line bg-white shadow-[0_40px_80px_-40px_rgba(15,30,44,.55)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:-mx-12">
            {figures.map((f) => (
              <div key={f.label} className="px-6 py-8 md:px-10 md:py-12">
                <dt className="label text-muted">{f.label}</dt>
                <dd className="display-sans mt-4 text-5xl text-navy tabular-nums md:text-7xl">
                  <CountUp text={f.value} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <div>
              <p className="label text-brand">The problem</p>
              <p className="numeral display-sans mt-8 text-navy">
                <CountUp text="100 million" />
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

      {/* 3. The Balanced model: a tall duotone photograph beside the three responsibilities */}
      <section className="relative overflow-hidden bg-navy text-white">
        <BalancedMark
          variant="outline"
          className="pointer-events-none absolute -top-10 right-0 hidden w-[30vw] max-w-lg text-sky/25 lg:block"
        />
        <div className="container-shell relative grid gap-12 py-24 md:py-32 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          {/* Concept photograph, replaced by PMG's own before launch (launch checklist). */}
          <figure className="duotone-wrap relative aspect-[3/4] max-h-[720px] w-full lg:aspect-auto lg:h-auto lg:min-h-[640px]">
            <Image
              src="/assets/concept-exam-room.jpg"
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="duotone object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent"
            />
          </figure>
          <div className="lg:pt-6">
            <p className="label text-sky">The Balanced model</p>
            <h2 className="display-md display-sans mt-6">
              Balanced Pain Treatment Centers
            </h2>
            <p className="mt-8 max-w-lg text-[#c4d3df] [&_a]:text-sky [&_a]:hover:text-white">
              <RichText text={balanced.body} />
            </p>
            <ol className="mt-14 border-t border-white/20">
              {balancedLines.map((line, i) => (
                <li
                  key={line}
                  className="reveal-x grid grid-cols-[5rem_1fr] items-center gap-6 border-b border-white/20 py-8"
                >
                  <span className="display-sans text-5xl leading-none text-sky tabular-nums md:text-6xl">
                    0{i + 1}
                  </span>
                  <span className="text-xl font-light md:text-2xl">{line}</span>
                </li>
              ))}
            </ol>
          </div>
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
        <div className="mt-10 bg-white">
          <div className="container-shell grid divide-y divide-line md:grid-cols-[1.2fr_1fr_1fr_1fr] md:divide-x md:divide-y-0">
            <div className="py-10 text-navy md:pr-10 md:pl-0">
              <p className="numeral display-sans text-navy">
                <CountUp text={String(counts.hospitals)} />
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
              <div key={s.label} className="py-10 text-navy md:px-10">
                <p className="display-sans text-4xl whitespace-nowrap md:text-5xl">
                  <CountUp text={s.value} />
                </p>
                <p className="label mt-3 text-muted">
                  <RichText text={s.label} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LogoMarquee partners={partners} title="Our partners" />

      {/* 6. Testimonial as a statement */}
      <Statement name="Patrick J. Martin" face="sans" tone="deep" />

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
        <JsonLd data={faqJsonLd(questions)} />
      </section>

      {/* 8. Closing CTA */}
      <EndCta audience="hospital" />
    </>
  );
}
