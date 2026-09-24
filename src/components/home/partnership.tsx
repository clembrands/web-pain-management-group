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
      <ol className="relative mx-auto mt-12 max-w-5xl before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-[#bfdcec] md:before:left-1/2">
        {phases.map((step, i) => (
          <li
            key={step.title}
            className="relative mb-8 grid grid-cols-[40px_1fr] items-center gap-5 last:mb-0 md:grid-cols-[1fr_72px_1fr]"
          >
            <span
              className={`z-10 flex size-10 items-center justify-center rounded-full bg-brand font-bold text-white ring-6 ring-white md:col-start-2 md:row-start-1 md:mx-auto ${i % 2 ? "bg-[#16437a]" : ""}`}
            >
              {i + 1}
            </span>
            <article
              className={`rounded-2xl bg-white p-6 shadow-[0_10px_26px_rgba(30,42,50,.08)] md:row-start-1 md:p-8 ${i % 2 ? "md:col-start-3" : "md:col-start-1"}`}
            >
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
