import type { PartnerHospital } from "../content/legacy/partners.ts";

export type DirectoryCounts = { hospitals: number; states: number };

// Counts of the published partner directory: every listed hospital, and every state with
// at least one. Computed from the data, never typed in.
export const directoryCounts = (
  partners: PartnerHospital[],
): DirectoryCounts => ({
  hospitals: partners.length,
  states: new Set(partners.map((p) => p.state)).size,
});
