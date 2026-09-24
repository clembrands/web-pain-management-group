import { educationArticles } from "../content/legacy/education.ts";

const GENERIC = new Set([
  "pain",
  "procedure",
  "trial",
  "with",
  "the",
  "and",
  "for",
  "long",
  "term",
]);
const words = (title: string) =>
  new Set(
    title
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 2 && !GENERIC.has(w)),
  );

// Three or four articles from the same category: those sharing the most title words
// first (cervical with cervical, radiofrequency with radiofrequency), then hub order.
export function relatedArticles(slug: string) {
  const current = educationArticles.find((a) => a.slug === slug);
  if (!current) return [];
  const mine = words(current.title);
  const peers = educationArticles.filter(
    (a) => a.category === current.category && a.slug !== slug,
  );
  const order = educationArticles.indexOf(current);
  return peers
    .map((a) => ({
      a,
      shared: [...words(a.title)].filter((w) => mine.has(w)).length,
      // Distance forward in hub order, wrapping, so ties favor the next articles.
      distance:
        (educationArticles.indexOf(a) - order + educationArticles.length) %
        educationArticles.length,
    }))
    .sort((x, y) => y.shared - x.shared || x.distance - y.distance)
    .slice(0, Math.min(4, peers.length))
    .map(({ a }) => a);
}
