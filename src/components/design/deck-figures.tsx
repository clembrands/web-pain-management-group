import { RichText } from "@/components/rich-text";
import {
  careNetwork,
  framework,
  referralPathway,
  scorecard,
  type Card,
  type FigureId,
} from "@/content/pmg-deck";

// Diagrams rebuilt from PMG's partnership deck as native, accessible markup: real text
// (readable by search and AI engines), crisp at any size, and in the site's type and
// colors. Every word comes from src/content/pmg-deck.ts.

export function DeckFigure({ id }: { id: FigureId }) {
  if (id === "referral-pathway") return <ReferralPathway />;
  if (id === "care-network") return <CareNetwork />;
  if (id === "framework") return <Framework />;
  return <Scorecard />;
}

// A hairline grid of cards: title, optional body, optional list.
export function CardGrid({
  cards,
  columns = 3,
  numbered = false,
}: {
  cards: Card[];
  columns?: 2 | 3;
  numbered?: boolean;
}) {
  return (
    <ul
      className={`grid border-t border-l border-line sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {cards.map((card, i) => (
        <li key={card.title} className="border-r border-b border-line p-6">
          {numbered && (
            <span className="label text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <h3
            className={`text-lg leading-snug text-navy ${numbered ? "mt-3" : ""}`}
          >
            {card.title}
          </h3>
          {card.body && (
            <p className="mt-2 text-[15px] text-muted">
              <RichText text={card.body} />
            </p>
          )}
          {card.items && (
            <ul className="mt-3 space-y-2 text-[15px] text-muted">
              {card.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[.6em] size-1.5 shrink-0 rounded-full bg-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function Stage({
  n,
  label,
  title,
  body,
  items,
  strong = false,
}: {
  n: string;
  label: string;
  title: string;
  body?: string;
  items?: string[];
  strong?: boolean;
}) {
  return (
    <div
      className={`border p-6 ${strong ? "border-navy bg-navy text-white" : "border-line bg-white"}`}
    >
      <p className={`label ${strong ? "text-sky" : "text-brand"}`}>
        {n} · {label}
      </p>
      <h3
        className={`mt-3 text-xl leading-snug ${strong ? "text-white" : "text-navy"}`}
      >
        {title}
      </h3>
      {body && (
        <p
          className={`mt-2 text-[15px] ${strong ? "text-[#c4d3df]" : "text-muted"}`}
        >
          {body}
        </p>
      )}
      {items && (
        <ul
          className={`mt-4 flex flex-wrap gap-2 text-sm ${strong ? "text-white" : "text-ink"}`}
        >
          {items.map((item) => (
            <li
              key={item}
              className={`border px-3 py-1 ${strong ? "border-white/30" : "border-line bg-mist"}`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1">
      <span className="h-8 w-px bg-brand/60" />
    </div>
  );
}

// Slides 8 to 11: community need, primary care, the pain center, then two branches.
function ReferralPathway() {
  const { stages, branches, summary } = referralPathway;
  return (
    <figure className="reveal">
      <ol className="list-none">
        {stages.map((s, i) => (
          <li key={s.title}>
            {i > 0 && <Connector />}
            <Stage
              n={String(i + 1).padStart(2, "0")}
              label={s.label}
              title={s.title}
              body={"body" in s ? s.body : undefined}
              items={s.items}
              strong={i === stages.length - 1}
            />
          </li>
        ))}
        <li>
          <div aria-hidden="true" className="relative h-10">
            <span className="absolute top-0 left-1/2 h-5 w-px bg-brand/60" />
            <span className="absolute top-5 right-1/4 left-1/4 h-px bg-brand/60" />
            <span className="absolute top-5 left-1/4 h-5 w-px bg-brand/60" />
            <span className="absolute top-5 right-1/4 h-5 w-px bg-brand/60" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {branches.map((b, i) => (
              <Stage
                key={b.title}
                n={String(stages.length + 1 + i).padStart(2, "0")}
                label={b.label}
                title={b.title}
                items={b.items}
              />
            ))}
          </div>
        </li>
      </ol>
      <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5 text-sm font-medium text-navy">
        {summary.map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="text-brand">
                →
              </span>
            )}
            {s}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function MiniList({ title, cards }: { title: string; cards: Card[] }) {
  return (
    <div className="border-t border-line pt-5">
      <h3 className="label text-brand">{title}</h3>
      <ul className="mt-4 space-y-3">
        {cards.map((c) => (
          <li key={c.title} className="text-[15px]">
            <span className="font-medium text-navy">{c.title}</span>
            {c.body && <span className="text-muted">. {c.body}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Slide 12: how patients reach the pain center, and where it sends them.
function CareNetwork() {
  const n = careNetwork;
  return (
    <figure className="reveal space-y-8">
      <MiniList title="How patients arrive" cards={n.waysIn} />
      <div className="bg-navy p-8 text-white md:p-10">
        <p className="label text-sky">Pain management center</p>
        <p className="display-sans mt-4 text-3xl leading-tight md:text-4xl">
          {n.tagline}
        </p>
        <ul className="mt-8 grid gap-6 border-t border-white/20 pt-6 sm:grid-cols-2">
          {n.center.map((c) => (
            <li key={c.title}>
              <p className="font-medium">{c.title}</p>
              <p className="mt-1 text-[15px] text-[#c4d3df]">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <MiniList
          title="Two-way referrals and shared care plans"
          cards={n.twoWay}
        />
        <MiniList
          title="Referrals from pain management"
          cards={n.referralsOut}
        />
      </div>
      <MiniList
        title="Care coordination and ongoing support"
        cards={n.support}
      />
    </figure>
  );
}

// Slides 6 and 7: three pillars carrying care from fragmented to better outcomes.
function Framework() {
  const { from, to, pillars } = framework;
  return (
    <figure className="reveal">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="border border-line p-5">
          <p className="label text-muted">From</p>
          <p className="mt-2 font-medium text-navy">{from.title}</p>
          <p className="mt-1 text-sm text-muted">{from.body}</p>
        </div>
        <span
          aria-hidden="true"
          className="hidden self-center text-2xl text-brand sm:block"
        >
          →
        </span>
        <div className="border border-navy bg-navy p-5 text-white">
          <p className="label text-sky">To</p>
          <p className="mt-2 font-medium">{to.title}</p>
          <p className="mt-1 text-sm text-[#c4d3df]">{to.body}</p>
        </div>
      </div>
      <div aria-hidden="true" className="mt-6 h-2 bg-navy" />
      <ol className="grid sm:grid-cols-3">
        {pillars.map((p, i) => (
          <li
            key={p.title}
            className="border-x-[6px] border-b border-x-brand/25 border-b-line bg-mist/60 px-5 pt-8 pb-6 sm:mx-2 first:sm:ml-0 last:sm:mr-0"
          >
            <span className="label text-brand">
              Pillar {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg text-navy">{p.title}</h3>
            <p className="mt-2 text-[15px] text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

// Slide 17: the quarterly scorecard's four quadrants, measure names only.
function Scorecard() {
  return (
    <figure className="reveal">
      <div className="grid gap-4 sm:grid-cols-2">
        {scorecard.map((q) => (
          <div key={q.title} className="border border-line bg-white">
            <h3 className="bg-navy px-5 py-3 text-base font-medium text-white">
              {q.title}
            </h3>
            <ul className="divide-y divide-line px-5">
              {q.items?.map((m) => (
                <li key={m} className="py-3 text-[15px] text-ink">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm text-muted">
        The measures on each program&apos;s scorecard, each reviewed every
        quarter against its target. Program values are shared with the partner
        hospital, not published.
      </figcaption>
    </figure>
  );
}
