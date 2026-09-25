// The three named hospital-leader testimonials from the live site (inventory/testimonials.csv).
// Quotes are verbatim. Titles are exactly as the live site shows them; Patrick J. Martin has
// no title there, so his stays blank.

export type Testimonial = {
  name: string;
  credentials?: string;
  title?: string;
  organization: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Bill Watkins",
    title: "CAO",
    organization: "Blanchard Valley Medical Practices",
    quote:
      "I’m convinced that in addition to increasing revenue, Pain Management Group has also increased patient satisfaction at Bluffton Hospital. The pain specialists stay with the patients until they are able to return to work and a normal life. The patients have a better quality of life, and our hospital gets much of the credit.",
  },
  {
    name: "William Kose",
    credentials: "MD",
    title: "Chief Quality Officer",
    organization: "BVHS",
    quote:
      "As an internal medicine physician with a large practice, I learned just how complex pain issues could be. Now, as a hospital administrator, I am also learning the value of a good pain management program in increasing patient satisfaction and driving revenues.",
  },
  {
    name: "Patrick J. Martin",
    credentials: "FACHE",
    organization: "Fisher-Titus Medical Center",
    quote:
      "We started our pain program with Pain Management Group back in 2009 as a way to provide our patients the highest quality pain management care without leaving the community. After checking references and results, we chose to work with PMG to develop the Fisher-Titus Pain Management Center. The efficiency of Pain Management Group’s operational model delivers strong top- and bottom-line results, while consistently delivering high patient satisfaction scores.",
  },
];
