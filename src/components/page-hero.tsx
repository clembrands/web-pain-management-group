import type { PageContent } from "@/content/types";
export function PageHero({ page }: { page: PageContent }) {
  return (
    <section className="bg-navy text-white">
      <div className="container-shell pb-16 pt-6 md:pb-20">
        <p className="eyebrow mt-10 text-sky">{page.eyebrow}</p>
        <h1 className="max-w-4xl text-4xl leading-[1.15] font-bold tracking-tight md:text-5xl">
          {page.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#c4d3df]">
          {page.description}
        </p>
      </div>
    </section>
  );
}
