// Plain-text excerpt from Portable Text, cut at a word boundary. Used for news listings and
// meta descriptions; the post text itself is never changed.
type Block = { _type: string; children?: { text: string }[] };

export function excerpt(body: Block[], max = 160): string {
  const text = body
    .filter((b) => b._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text).join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:.]$/, "")}…`;
}
