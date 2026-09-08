export type ReviewMedia = {
  src?: string;
  alt: string;
  caption: string;
  brief: string;
  treatment?: "portrait" | "building";
};
const team: ReviewMedia = {
  src: "/assets/1ahero.png",
  alt: "Concept image of a physician and hospital administrator",
  caption: "Concept photography · final team photo to follow",
  brief:
    "Photograph PMG clinicians and hospital leaders together in a real partner hospital.",
};
const care: ReviewMedia = {
  src: "/assets/1chero.png",
  alt: "Concept image of a clinician listening during a consultation",
  caption: "Concept photography · not an actual patient encounter",
  brief:
    "Use a consented care-team photograph with warm natural light and a human focus.",
};
export function reviewMedia(
  slug: string,
  kind?: string,
): ReviewMedia | undefined {
  if (kind === "legal") return;
  if (kind === "person" || slug === "about-us/leadership")
    return {
      treatment: "portrait",
      alt: "Reserved space for approved PMG leadership photography",
      caption: "Photo placeholder · approved leadership portrait",
      brief:
        "A natural-light portrait in the hospital environment. Individual profiles will use the real leader’s photograph.",
    };
  if (kind === "location")
    return {
      treatment: "building",
      alt: "Reserved space for a verified clinic photograph",
      caption: "Photo placeholder · hospital exterior or clinic entrance",
      brief:
        "Show the actual entrance patients should use, with recognizable signage and accessible arrival information.",
    };
  if (slug === "locations")
    return {
      src: "/assets/1amap.png",
      alt: "Concept map of the PMG network, awaiting location verification",
      caption: "Concept map · locations to be verified",
      brief:
        "Replace with the verified care network and local hospital photography.",
    };
  if (
    kind === "education" ||
    slug === "pain-education" ||
    slug.includes("quality") ||
    kind === "job" ||
    slug === "careers" ||
    slug.startsWith("for-providers")
  )
    return care;
  if (kind === "story" || slug === "our-partners")
    return {
      ...team,
      src: "/assets/hero-1e.png",
      caption: "Concept photography · partner story imagery to follow",
    };
  return team;
}
