// Converts a WordPress post or page body (HTML) into Portable Text, the format Sanity stores.
// Shared by the article and news migrations. Text is kept verbatim: the only changes are
// decoding HTML entities, repairing characters WordPress stored double-encoded, and
// collapsing whitespace the way a browser renders it.

// UTF-8 text that WordPress stored as Windows-1252, and the character it should be.
const MOJIBAKE = {
  "â€œ": "“",
  "â€\u009d": "”",
  "â€¦": "…",
  "â€™": "’",
  "â€˜": "‘",
  "â€“": "–",
  "â€”": "—",
  "Â ": " ",
};

export function decode(s) {
  return Object.entries(MOJIBAKE)
    .reduce((t, [bad, good]) => t.split(bad).join(good), s)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/ /g, " ");
}

// The part of a saved WordPress page that holds the post or article body.
export function extractBody(html) {
  const start = html.indexOf('<div class="single-blog-content">');
  const end = html.indexOf('<div class="page-list-single">', start);
  if (start < 0 || end < 0) throw new Error("Body markers not found");
  return html.slice(start, end);
}

// Plain text of an HTML body, normalized, for the verbatim tests. Embeds, scripts, styles,
// and comments carry no reading text.
export function plainTextOfHtml(html) {
  return decode(
    html
      .replace(
        /<!-- ViewMedica Embed Start -->[\s\S]*?<!-- ViewMedica Embed End -->/g,
        " ",
      )
      .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      // Inline tags join text ("impor<span>tant</span>" reads "important"); others separate it.
      .replace(/<\/?(span|strong|b|em|i|u|a|font|sup|sub)\b[^>]*>/gi, "")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function plainTextOfBlocks(blocks) {
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => b.children.map((c) => c.text).join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const attr = (tag, name) =>
  tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, "i"))?.[1];
const hasAttr = (tag, name) =>
  new RegExp(`\\s${name}(\\s|=|>|/)`, "i").test(tag);

// onImage(tag) returns an image block or null (for images that no longer exist).
export async function htmlToPortableText(html, { onImage } = {}) {
  let n = 0;
  const key = () => `k${(n++).toString(36)}`;

  // The older ViewMedica embed is a div, a loader script, and an inline call to vm_open().
  // Keep it as one unit so it can be rendered exactly as before.
  const prepared = html
    .replace(
      /<!-- ViewMedica Embed Start -->([\s\S]*?)<!-- ViewMedica Embed End -->/g,
      (_, inner) => {
        const code = inner.match(/openthis\s*=\s*"([^"]+)"/)[1];
        const client = inner.match(/client\s*=\s*"([^"]+)"/)[1];
        const width = inner.match(/width\s*=\s*(\d+)/)?.[1] ?? "";
        const src = inner.match(/<script[^>]*src="([^"]+)"/)[1];
        return `<vmscript code="${code}" client="${client}" width="${width}" src="${src}">`;
      },
    )
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const blocks = [];
  let block = null;
  const marks = [];
  const lists = [];

  const flush = () => {
    if (!block) return;
    const spans = block.children;
    // Trim only the whitespace a browser would not display at the edges of a block.
    if (spans.length) {
      spans[0].text = spans[0].text.replace(/^ +/, "");
      spans[spans.length - 1].text = spans[spans.length - 1].text.replace(
        / +$/,
        "",
      );
    }
    block.children = spans.filter((s) => s.text !== "");
    if (block.children.some((s) => s.text.trim())) {
      const used = new Set(block.children.flatMap((s) => s.marks));
      block.markDefs = block.markDefs.filter((d) => used.has(d._key));
      blocks.push(block);
    }
    block = null;
  };
  const open = (style) => {
    flush();
    block = { _type: "block", _key: key(), style, markDefs: [], children: [] };
  };
  const text = (t) => {
    if (!block) {
      if (!t.trim()) return;
      open("normal");
    }
    const last = block.children.at(-1);
    // Collapse whitespace as HTML does, including across tag boundaries.
    let value = t.replace(/\s+/g, " ");
    if (last && /[ \n]$/.test(last.text)) value = value.replace(/^ /, "");
    if (!block.children.length) value = value.replace(/^ /, "");
    if (!value) return;
    if (last && last.marks.join() === marks.join()) last.text += value;
    else
      block.children.push({
        _type: "span",
        _key: key(),
        text: value,
        marks: [...marks],
      });
  };

  for (const part of prepared.split(/(<[^>]+>)/)) {
    if (!part) continue;
    const tag = part.match(/^<(\/?)([a-zA-Z0-9]+)([^>]*)>$/);
    if (!tag) {
      text(decode(part));
      continue;
    }
    const [, closing, rawName] = tag;
    const name = rawName.toLowerCase();
    if (/^h[1-6]$/.test(name)) {
      if (closing) flush();
      else open(name === "h1" ? "h2" : name);
    } else if (name === "p" || name === "blockquote") {
      if (closing) flush();
      else open(name === "p" ? "normal" : "blockquote");
    } else if (name === "ul" || name === "ol") {
      flush();
      if (closing) lists.pop();
      else lists.push(name === "ul" ? "bullet" : "number");
    } else if (name === "li") {
      if (closing) flush();
      else {
        open("normal");
        block.listItem = lists.at(-1) ?? "bullet";
        block.level = Math.max(lists.length, 1);
      }
    } else if (name === "br") {
      if (block) {
        const last = block.children.at(-1);
        if (last) last.text = last.text.replace(/ $/, "") + "\n";
      }
    } else if (["strong", "b", "em", "i"].includes(name)) {
      const mark = name === "strong" || name === "b" ? "strong" : "em";
      if (closing) marks.splice(marks.lastIndexOf(mark), 1);
      else marks.push(mark);
    } else if (name === "a") {
      if (closing) {
        const idx = marks.findLastIndex((m) => m.startsWith("link-"));
        if (idx >= 0) marks.splice(idx, 1);
      } else {
        const href = decode(attr(part, "href") ?? "");
        if (!block) open("normal");
        const def = { _type: "link", _key: `link-${key()}`, href };
        block.markDefs.push(def);
        marks.push(def._key);
      }
    } else if (name === "iframe" && !closing) {
      flush();
      blocks.push({
        _type: "viewmedica",
        _key: key(),
        src: attr(part, "src").trim(),
        ...(attr(part, "style") ? { style: attr(part, "style") } : {}),
        ...(attr(part, "allow") ? { allow: attr(part, "allow") } : {}),
        ...(attr(part, "loading") ? { loading: attr(part, "loading") } : {}),
        allowFullScreen: hasAttr(part, "allowfullscreen"),
      });
    } else if (name === "vmscript") {
      flush();
      blocks.push({
        _type: "viewmedicaScript",
        _key: key(),
        code: attr(part, "code"),
        client: attr(part, "client"),
        width: Number(attr(part, "width")) || undefined,
        scriptSrc: attr(part, "src"),
      });
    } else if (name === "img" && !closing) {
      flush();
      const image = onImage ? await onImage(part, key()) : null;
      if (image) blocks.push(image);
    }
    // div, span, section, figure, and other wrappers carry no structure of their own.
  }
  flush();
  return blocks;
}
