export type Media = { url: string; alt: string };
export type Partner = {
  _id: string;
  name: string;
  logo: Media;
  description?: string;
  website?: string;
};
