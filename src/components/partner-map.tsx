import { stateShapes, usMapViewBox } from "@/content/us-map";
import { partnerStates } from "@/content/legacy/states";

const partnerSlugs = new Set<string>(partnerStates.map((s) => s.slug));

// Map of PMG partner states. Each partner state is a link to its state page, so the map
// works with a keyboard and without JavaScript. Pages always pair it with a text list.
// With `focus`, the map zooms to that state and marks it as the current page.
export function PartnerMap({ focus }: { focus?: string }) {
  const focused = stateShapes.find((s) => s.slug === focus);
  const viewBox = focused ? zoom(focused.box) : usMapViewBox;
  const label = focused
    ? `Map of ${focused.name} and neighboring PMG partner states`
    : "Map of the United States with PMG partner states highlighted";
  return (
    <svg
      viewBox={viewBox}
      role="group"
      aria-label={label}
      className="h-auto w-full"
    >
      {stateShapes.map((s) => {
        const isPartner = partnerSlugs.has(s.slug);
        if (!isPartner)
          return (
            <path
              key={s.slug}
              d={s.d}
              className="fill-[#e1e9ef] stroke-white"
              strokeWidth={focused ? 0.6 : 1}
            />
          );
        const current = s.slug === focus;
        return (
          <a
            key={s.slug}
            href={`/our-partners/${s.slug}/`}
            aria-label={`${s.name} partner hospitals`}
            aria-current={current ? "page" : undefined}
            className="group outline-none"
          >
            <title>{`${s.name} partner hospitals`}</title>
            <path
              d={s.d}
              strokeWidth={focused ? 0.8 : 1.2}
              className={`stroke-white transition-colors group-hover:fill-[#16437a] group-focus-visible:fill-[#16437a] group-focus-visible:stroke-[#f4c860] ${current ? "fill-navy" : "fill-brand"}`}
            />
          </a>
        );
      })}
    </svg>
  );
}

// A viewBox around one state with room to show its neighbors, kept at the map's aspect.
function zoom([x, y, w, h]: number[]) {
  const aspect = 975 / 610;
  let width = Math.max(w, h * aspect) * 1.6;
  let height = width / aspect;
  if (height < h * 1.6) {
    height = h * 1.6;
    width = height * aspect;
  }
  const cx = x + w / 2;
  const cy = y + h / 2;
  return [cx - width / 2, cy - height / 2, width, height]
    .map((n) => Math.round(n))
    .join(" ");
}
