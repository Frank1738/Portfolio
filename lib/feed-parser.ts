import { XMLParser } from "fast-xml-parser";

/** One post from an RSS or Atom feed, cleaned up for display. */
export type FeedEntry = {
  title: string;
  /** The post itself, never the site's home page. */
  href: string;
  /** ISO timestamp. */
  publishedAt: string;
};

/** Only the newest few entries matter; feeds can carry hundreds. */
const MAX_ENTRIES = 10;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  htmlEntities: true,
  // Single-item feeds and single-link entries would otherwise come back as plain objects.
  isArray: (name) => name === "item" || name === "entry" || name === "link",
});

/** Parses an RSS 2.0 or Atom feed. Entries without a title, post URL or valid date are dropped. */
export function parseFeed(xml: string): FeedEntry[] {
  const doc: unknown = parser.parse(xml);
  const entries = asArray(get(get(get(doc, "rss"), "channel"), "item") ?? get(get(doc, "feed"), "entry"));

  return entries.slice(0, MAX_ENTRIES).flatMap((entry) => {
    const rawTitle = get(entry, "title");
    const title = cleanText(text(rawTitle), isMarkup(get(rawTitle, "@_type")));
    const href = postLink(get(entry, "link"));
    const date = new Date(
      text(get(entry, "pubDate") ?? get(entry, "published") ?? get(entry, "updated") ?? get(entry, "dc:date")),
    );
    if (!title || !href || Number.isNaN(date.getTime())) return [];
    return [{ title, href, publishedAt: date.toISOString() }];
  });
}

function get(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>)[key] : undefined;
}

function asArray(value: unknown): unknown[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/** Element text, whether the parser gave a string, a number or an object with attributes. */
function text(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  const inner = get(value, "#text");
  return typeof inner === "string" || typeof inner === "number" ? String(inner) : "";
}

/** RSS `<link>url</link>`, or Atom's `rel="alternate"` (or rel-less) `<link href>`. Must be a post path. */
function postLink(links: unknown): string | undefined {
  for (const link of asArray(links)) {
    const rel = get(link, "@_rel");
    const candidate = typeof link === "string" ? link : rel === undefined || rel === "alternate" ? get(link, "@_href") : undefined;
    if (typeof candidate === "string" && isPostUrl(candidate.trim())) return candidate.trim();
  }
  return undefined;
}

function isPostUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && url.pathname.replace(/\/+$/, "") !== "";
  } catch {
    return false;
  }
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  ndash: "–",
  mdash: "—",
  hellip: "…",
};

function decodeEntities(value: string) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const point = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(point) && point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** Atom `type="html"` / `"xhtml"` titles hold markup; plain titles may mention a tag as text. */
function isMarkup(type: unknown) {
  return type === "html" || type === "xhtml";
}

/** Formatting tags some RSS feeds put in plain titles. Anything else ("<details>") is kept as text. */
const INLINE_TAG = /<\/?(?:a|b|i|em|strong|span|u|mark|small|sup|sub|br|font)\b[^>]*>/gi;

/**
 * Plain text from a feed title. Markup titles: strip every tag, then decode the entities that
 * were inside the markup. Plain titles: strip only stray formatting tags.
 */
function cleanText(value: string, markup: boolean) {
  const stripped = markup ? decodeEntities(value.replace(/<[^>]*>/g, "")) : value.replace(INLINE_TAG, "");
  return decodeEntities(stripped).replace(/\s+/g, " ").trim();
}
