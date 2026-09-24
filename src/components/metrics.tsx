import { RichText } from "@/components/rich-text";
import type { Metric } from "@/content/pages/results";

// Results tiles, styled after the Home stats band. A value that is still a placeholder
// renders at text size, so it can never pass for a real figure.
export function MetricTiles({
  metrics,
  detailed = false,
}: {
  metrics: Metric[];
  detailed?: boolean;
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex flex-col-reverse rounded-[18px] border border-line bg-white p-6 shadow-[0_10px_30px_rgba(30,42,50,.05)]"
        >
          <dt className="mt-3">
            <span className="block text-base font-semibold text-navy">
              {m.label}
            </span>
            {detailed && (
              <span className="mt-2 block space-y-1 text-sm text-muted">
                <span className="block">{m.definition}</span>
                <span className="block">
                  Source: <RichText text={m.source} />
                </span>
                <span className="block">
                  Period: <RichText text={m.period} />
                </span>
              </span>
            )}
          </dt>
          <dd
            className={
              m.value.startsWith("{{TBD")
                ? "text-base leading-tight font-bold text-navy"
                : "text-[38px] leading-none font-bold text-navy"
            }
          >
            <RichText text={m.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
