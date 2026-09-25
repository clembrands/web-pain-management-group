import type { PartnerHospital } from "@/content/legacy/partners";
import { partnerStates } from "@/content/legacy/states";

export const stateBySlug = (slug: string) =>
  partnerStates.find((s) => s.slug === slug);

// City appears only where the live site gave one. Lists are already grouped by state, so a
// partner without a city shows no location line rather than repeating the state.
export const partnerLocation = (p: PartnerHospital) =>
  p.city ? `${p.city}, ${stateBySlug(p.state)?.abbr}` : undefined;

// One partner hospital as a hairline row.
export function PartnerCard({ partner }: { partner: PartnerHospital }) {
  return (
    <li className="border-t border-line py-6">
      <h3 className="text-lg font-medium text-navy">{partner.name}</h3>
      {partnerLocation(partner) && (
        <p className="mt-1 text-sm text-muted">{partnerLocation(partner)}</p>
      )}
      {(partner.phone || partner.website) && (
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {partner.phone && (
            <a
              href={`tel:${partner.phone.replace(/[^\d]/g, "")}`}
              className="inline-flex min-h-6 items-center font-medium text-brand underline underline-offset-4"
            >
              {partner.phone}
            </a>
          )}
          {partner.website && (
            <a
              href={partner.website}
              className="inline-flex min-h-6 items-center font-medium text-brand underline underline-offset-4"
            >
              Hospital website
              <span className="sr-only"> for {partner.name}</span>
            </a>
          )}
        </p>
      )}
    </li>
  );
}
