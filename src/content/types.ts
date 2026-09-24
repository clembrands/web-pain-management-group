export type Card = { title: string; body: string };
export type Faq = { question: string; answer: string };
export type Media = { url: string; alt: string };
export type HomeContent = {
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  heroImage: Media;
  stats: { value: string; label: string }[];
  statsTitle: string;
  statsDescription: string;
  differentiators: Card[];
  steps: Card[];
  faqs: Faq[];
  storyTitle: string;
  storyDescription: string;
  storyImage: Media;
  storyUrl?: string;
  locationsTitle: string;
  locationsDescription: string;
  mapImage: Media;
};
export type PageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: Card[];
  seoTitle?: string;
  seoDescription?: string;
};
export type Settings = {
  title: string;
  description: string;
  email?: string;
  phone?: string;
  schedulingUrl?: string;
};
export type Partner = {
  _id: string;
  name: string;
  logo: Media;
  description?: string;
  website?: string;
};
