// Plain-text excerpt from Portable Text for news listings and meta descriptions; the post
// text itself is never changed. Ends at a full sentence when one ends between 120 and `max`
// characters, otherwise cuts at a word boundary.
type Block = { _type: string; children?: { text: string }[] };

export function excerpt(body: Block[], max = 160): string {
  const text = body
    .filter((b) => b._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text).join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const sentence = text.slice(0, max).match(/^.{120,}[.!?](?=\s)/)?.[0];
  if (sentence) return sentence;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:.]$/, "")}…`;
}
