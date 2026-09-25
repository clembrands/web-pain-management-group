import { RichText } from "@/components/rich-text";
import type { Metric } from "@/content/pages/results";

// Results figures as a hairline grid: light display numerals over small tracked labels.
// A value that is still a placeholder renders at text size, so it can never pass for a
// real figure.
export function MetricTiles({
  metrics,
  detailed = false,
}: {
  metrics: Metric[];
  detailed?: boolean;
}) {
  return (
    <dl className="grid divide-y divide-line border-t border-line sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex flex-col-reverse py-8 sm:px-8 sm:nth-[2n+1]:pl-0 lg:nth-[2n+1]:pl-8 lg:nth-[3n+1]:pl-0"
        >
          <dt className="mt-4">
            <span className="label block text-muted">{m.label}</span>
            {detailed && (
              <span className="mt-3 block space-y-1 text-sm text-muted">
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
                ? "text-base leading-tight font-medium text-navy"
                : "display-sans text-5xl leading-none text-navy tabular-nums"
            }
          >
            <RichText text={m.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
