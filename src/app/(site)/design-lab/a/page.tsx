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

// Direction A, "Editorial": serif display type drawn from the wordmark, light pages with
// dark full-bleed interludes, hairline rules instead of cards, the Balanced mark as a
// watermark. Copy is the existing Home and Partnership copy, unchanged.
export default async function DirectionA() {
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
      {/* 1. Typographic hero */}
      <section className="relative overflow-hidden bg-white">
        <BalancedMark
          variant="outline"
          className="pointer-events-none absolute -top-16 -right-24 hidden w-[52vw] max-w-3xl text-brand/15 lg:block"
        />
        <div className="container-shell relative pt-20 pb-16 md:pt-28 md:pb-24">
          <p className="label text-brand">
            Hospital pain management partnerships
          </p>
          <h1 className="display display-serif mt-8 max-w-5xl text-navy">
            {hero.title}{" "}
            <span className="text-brand italic">{hero.accent}</span>
          </h1>
          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.2fr_1fr]">
            <p className="max-w-md text-[17px] leading-relaxed text-muted">
              {hero.description}
            </p>
            <div className="flex flex-wrap items-start gap-3 md:justify-end">
              <Link href="/partnership/" className="button button-primary">
                Explore the Partnership Model
              </Link>
              <Link href={scheduleCallHref} className="button button-outline">
                Schedule a Call
              </Link>
            </div>
          </div>
          <ul className="hairline mt-16 grid gap-6 pt-8 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f} className="text-sm text-navy">
                <RichText text={f} />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">
            Physician or APP?{" "}
            <Link
              href="/providers/"
              className="font-medium text-brand underline underline-offset-4"
            >
              Practice with PMG
            </Link>
          </p>
        </div>
      </section>

      {/* 2. The problem, in PMG's sourced words */}
      <section className="bg-navy text-white">
        <div className="container-shell grid gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="label text-sky">The problem</p>
            <p className="numeral display-serif reveal mt-8 text-white">
              100 million
            </p>
            <p className="label mt-4 text-[#c4d3df]">
              U.S. adults living with chronic pain
            </p>
          </div>
          <div className="reveal">
            <h2 className="display-md display-serif text-white">
              {problem.title}
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-[#c4d3df] [&_a]:text-sky [&_a]:hover:text-white">
              {problem.paragraphs?.map((p) => (
                <p key={p}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
            <ul className="hairline-dark mt-10 grid gap-x-10 pt-2 text-[15px] sm:grid-cols-2">
              {problem.points?.map((point) => (
                <li
                  key={point}
                  className="border-b border-white/15 py-4 text-white/90"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. The Balanced model */}
      <section className="relative overflow-hidden bg-white">
        <BalancedMark
          variant="outline"
          className="pointer-events-none absolute -bottom-24 -left-32 hidden w-[44vw] max-w-2xl text-brand/20 lg:block"
        />
        <div className="container-shell relative py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <BalancedMark className="w-20" />
              <p className="label mt-10 text-brand">The Balanced model</p>
              <h2 className="display-md display-serif mt-6 text-navy">
                Balanced Pain Treatment Centers
              </h2>
            </div>
            <div className="reveal lg:pt-32">
              <p className="max-w-lg text-[17px] leading-relaxed text-muted">
                <RichText text={balanced.body} />
              </p>
              <ol className="hairline mt-12">
                {balancedLines.map((line, i) => (
                  <li
                    key={line}
                    className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-6"
                  >
                    <span className="label text-brand">0{i + 1}</span>
                    <span className="text-2xl text-navy md:text-3xl display-serif">
                      {line}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Four phases as a scroll timeline */}
      <section className="bg-mist">
        <div className="container-shell grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-brand">Four phases</p>
            <h2 className="display-md display-serif mt-6 text-navy">
              How the partnership works
            </h2>
            <Link
              href="/partnership/how-it-works/"
              className="button button-outline mt-10"
            >
              See how the partnership works
            </Link>
          </div>
          <Timeline steps={phases} />
        </div>
      </section>

      {/* 5. Proof: the partner map, full-bleed and dark */}
      <section className="relative overflow-hidden bg-deep text-white">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-90 lg:w-[62%]">
          <PartnerMap tone="dark" />
        </div>
        <div className="container-shell relative py-24 md:py-36">
          <p className="label text-sky">Proof</p>
          <p className="numeral display-serif reveal mt-8">
            {counts.hospitals}
          </p>
          <p className="display-md display-serif mt-2 max-w-md text-white">
            partner hospitals in {counts.states} states
          </p>
          <p className="mt-8 max-w-sm text-[#c4d3df]">
            {homeContent.locations.title}
          </p>
          <Link
            href="/our-partners/"
            className="button mt-10 bg-white text-navy hover:bg-[#dce6ee]"
          >
            Find a partner center by state
          </Link>
          <dl className="hairline-dark mt-20 grid gap-8 pt-8 sm:grid-cols-3">
            {homeContent.stats.items.slice(1).map((s) => (
              <div key={s.label}>
                <dd className="display-serif text-4xl md:text-5xl">
                  <RichText text={s.value} />
                </dd>
                <dt className="label mt-3 text-[#c4d3df]">
                  <RichText text={s.label} />
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <LogoBand partners={partners} title="Hospitals that partner with PMG" />

      {/* 6. Testimonial as a statement */}
      <Statement name="Patrick J. Martin" face="serif" />

      {/* 7. Questions */}
      <section className="bg-white">
        <div className="container-shell grid gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-brand">Straight answers</p>
            <h2 className="display-md display-serif mt-6 text-navy">
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
      <LabCta face="serif" />
    </>
  );
}
