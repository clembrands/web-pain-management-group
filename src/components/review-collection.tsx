"use client";
import { useState } from "react";
import Link from "next/link";
import { reviewMedia } from "@/content/review/media";
import { ReviewMediaFigure } from "./review-media";
export type CollectionItem = {
  slug: string;
  title: string;
  description: string;
  category?: string;
  kind?: string;
  sample?: boolean;
};
export function ReviewCollection({
  items,
  label,
}: {
  items: CollectionItem[];
  label: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(
      items.map((i) => i.category).filter((c): c is string => Boolean(c)),
    ),
  ];
  const filtered = items.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      `${i.title} ${i.description} ${i.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section className="container-shell pb-20">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Explore</p>
          <h2>{label}</h2>
        </div>
        <div className="w-full md:max-w-sm">
          <label htmlFor="collection-search" className="text-sm font-medium">
            Search {label.toLowerCase()}
          </label>
          <input
            id="collection-search"
            type="search"
            className="field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or topic"
          />
        </div>
      </div>
      {categories.length > 1 && (
        <div
          className="mb-7 flex flex-wrap gap-2"
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-5 py-2 text-sm ${category === c ? "border-navy bg-navy text-white" : "border-line bg-white text-muted hover:border-brand"}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <p role="status" className="mb-5 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            href={`/${item.slug}`}
            key={item.slug}
            className="card group flex flex-col transition-shadow hover:shadow-lg"
          >
            <div className="mb-6">
              <ReviewMediaFigure
                media={reviewMedia(item.slug, item.kind)!}
                compact
              />
            </div>
            <p className="eyebrow">
              {item.category || "Explore PMG"}
              {item.sample ? " · Sample" : ""}
            </p>
            <h3 className="group-hover:text-brand">{item.title}</h3>
            <p className="mt-4 mb-7 text-sm text-muted">{item.description}</p>
            <span className="mt-auto text-sm font-semibold text-brand">
              View page <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl bg-mist p-8">
          <p>No matches. Try another topic or reset the filters.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="button button-outline mt-4"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
