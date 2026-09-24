import Link from "next/link";

const directions = [
  {
    href: "/design-lab/a/",
    name: "Direction A: Editorial",
    body: "Serif display type from the wordmark, light pages with dark full-bleed interludes, hairline rules, the Balanced mark as a watermark.",
  },
  {
    href: "/design-lab/b/",
    name: "Direction B: Monument",
    body: "Ultra-light sans display type at large scale, dark-first, offset panels that break the grid, the map as the hero graphic.",
  },
];

export default function DesignLabPage() {
  return (
    <section className="container-shell section-space">
      <p className="label text-brand">Design lab</p>
      <h1 className="display-md display-serif mt-4 text-navy">
        Two directions for Home.
      </h1>
      <ul className="mt-12 grid gap-px bg-line md:grid-cols-2">
        {directions.map((d) => (
          <li key={d.href} className="bg-white p-8">
            <Link href={d.href} className="group block">
              <h2 className="text-2xl group-hover:text-brand">{d.name}</h2>
              <p className="mt-3 text-muted">{d.body}</p>
              <span className="mt-6 inline-block text-brand">Open →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
