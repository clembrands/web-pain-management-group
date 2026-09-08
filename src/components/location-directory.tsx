"use client";
import { useState } from "react";
import type { Location } from "@/content/types";
export function LocationDirectory({ locations }: { locations: Location[] }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const states = [
    ...new Set(locations.map((location) => location.state)),
  ].sort();
  const filtered = locations.filter(
    (location) =>
      (!state || location.state === state) &&
      `${location.name} ${location.city} ${location.state}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  if (!locations.length)
    return (
      <div className="rounded-2xl border border-line bg-mist p-8">
        <h2 className="text-2xl">Find care in your community</h2>
        <p className="mt-4 text-muted">
          Our location directory is being updated. Contact PMG for information
          about care locations near you.
        </p>
      </div>
    );
  return (
    <div>
      <div className="mb-8 grid gap-4 sm:grid-cols-[1fr_220px]">
        <div>
          <label htmlFor="location-search" className="text-sm font-medium">
            Search by hospital or city
          </label>
          <input
            id="location-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="location-state" className="text-sm font-medium">
            State
          </label>
          <select
            id="location-state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="field"
          >
            <option value="">All states</option>
            {states.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <p role="status" className="mb-5 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? "location" : "locations"}{" "}
        found
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((location) => (
          <article key={location._id} className="card">
            <p className="eyebrow">
              {location.city}, {location.state}
            </p>
            <h3>{location.name}</h3>
            <p className="mt-4 text-sm text-muted">{location.address}</p>
            {location.phone && (
              <a
                className="mt-4 block text-brand underline"
                href={`tel:${location.phone.replace(/[^+\d]/g, "")}`}
              >
                {location.phone}
              </a>
            )}
            {location.website && (
              <a
                href={location.website}
                className="mt-4 inline-block text-sm font-semibold text-brand underline"
              >
                Visit hospital website →
              </a>
            )}
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p className="rounded-xl bg-mist p-6">
          No locations match your search. Try another city or state.
        </p>
      )}
    </div>
  );
}
