import type { PartnerHospital } from "@/content/legacy/partners";
import { partnerStates } from "@/content/legacy/states";

export const stateBySlug = (slug: string) =>
  partnerStates.find((s) => s.slug === slug);

// City appears only where the live site gave one; otherwise the state alone.
export const partnerLocation = (p: PartnerHospital) => {
  const state = stateBySlug(p.state);
  return p.city ? `${p.city}, ${state?.abbr}` : state?.name;
};

export function PartnerCard({ partner }: { partner: PartnerHospital }) {
  return (
    <li className="rounded-[18px] border border-line bg-white p-6 shadow-[0_10px_30px_rgba(30,42,50,.05)]">
      <h3 className="text-lg">{partner.name}</h3>
      <p className="mt-1 text-sm text-muted">{partnerLocation(partner)}</p>
      {(partner.phone || partner.website) && (
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
