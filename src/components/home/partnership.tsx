import Link from "next/link";
import { RichText } from "@/components/rich-text";
import { phases, pillars } from "@/content/pages/partnership";

export function Differentiators() {
  // The Balanced card on the left covers the balanced treatment approach.
  const others = pillars.filter(
    (p) => p.title !== "Balanced treatment approach",
  );
  return (
    <section className="container-shell">
      <div className="rounded-[26px] bg-mist bg-[radial-gradient(ellipse_at_top_left,#f5efe0,transparent_55%),radial-gradient(ellipse_at_bottom_right,#dfedf6,transparent_55%)] px-6 py-14 md:px-10">
        <h2 className="mb-10 text-center">What Sets PMG Apart?</h2>
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <article className="card flex flex-col">
            <h3 className="text-2xl">
              <span className="text-brand">Balanced</span> Pain Treatment
              Centers
            </h3>
            <p className="my-5 text-sm text-muted">
              Pain care that is responsible to everyone it touches.{" "}
              <Link
                href="/partnership/balanced-pain-treatment/"
                className="font-medium text-brand underline underline-offset-4"
              >
                How the model works
              </Link>
            </p>
            <ul className="mt-auto divide-y divide-line">
              {[
                "Medically responsible for patients",
                "Socially responsible for communities",
                "Financially responsible for hospitals",
              ].map((line, i) => (
                <li key={line} className="flex items-center gap-3 py-5 text-sm">
                  <span className="rounded-md bg-brand px-2 py-1 text-xs font-bold text-white">
                    0{i + 1}
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </article>
          <div className="space-y-4">
            {others.map((item, i) => (
              <article
                key={item.title}
                className="flex gap-5 rounded-[18px] border border-line bg-white/75 p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#e3eff7] text-xl font-bold text-brand"
                >
                  {["✓", "+", "⇄"][i % 3]}
                </span>
                <div>
                  <h3 className="text-base">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    <RichText text={item.body} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnershipSteps() {
  return (
    <section className="container-shell section-space">
      <h2 className="text-center">
        How the <span className="text-brand">partnership</span> works
      </h2>
      <p className="mt-3 text-center text-sm text-muted">
        Four phases · one accountable partner
      </p>
      {/* Four short phases read left to right on desktop, stacked on mobile. The line behind
          the numbers joins them on wide screens. */}
      <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:before:absolute lg:before:top-5 lg:before:right-[12.5%] lg:before:left-[12.5%] lg:before:h-px lg:before:bg-[#bfdcec]">
        {phases.map((step, i) => (
          <li key={step.title} className="relative flex flex-col">
            <span
              className={`z-10 flex size-10 items-center justify-center rounded-full font-bold text-white ring-6 ring-white lg:mx-auto ${i % 2 ? "bg-[#16437a]" : "bg-brand"}`}
            >
              {i + 1}
            </span>
            <article className="mt-5 flex-1 rounded-2xl bg-white p-6 shadow-[0_10px_26px_rgba(30,42,50,.08)]">
              <h3 className="text-lg">{step.title}</h3>
              <p className="mt-3 text-sm text-muted">{step.body}</p>
            </article>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-center">
        <Link
          href="/partnership/how-it-works/"
          className="button button-outline"
        >
          See how the partnership works
        </Link>
      </p>
    </section>
  );
}
