import { cacheLife } from "next/cache";

import { fallbackReads, feeds, readsTile } from "@/content/reads";
import { parseFeed } from "@/lib/feed-parser";
import { formatRelativeTime } from "@/lib/format";

/** Read thumbnails: football (football news) or terminal (tech and AI). */
export type ReadThumbKind = "ball" | "terminal";

/** A feed the home tile pulls its latest post from. */
export type Feed = {
  id: string;
  /** Publication name, shown as the mono meta line. */
  source: string;
  url: string;
  thumb: ReadThumbKind;
  /** Feeds sharing a slot compete for one card; the newest post wins. */
  slot: number;
};

/** One post on the tile. */
export type Read = {
  source: string;
  title: string;
  /** The post itself, never the site's home page. */
  href: string;
  /** ISO timestamp. */
  publishedAt: string;
  thumb: ReadThumbKind;
};

/** A read with its age label ("2d ago"), worked out when the list was fetched. */
export type DatedRead = Read & { age: string };

/** Home tile header. */
export type ReadsTile = {
  title: string;
  meta: string;
};

const READ_COUNT = 3;
const FEED_TIMEOUT_MS = 5000;

export function getReadsTile(): ReadsTile {
  return readsTile;
}

/**
 * The newest post per slot (newest first), fetched on the server and cached for an hour, so
 * the cards are in the prerendered HTML. A failed feed's slot is filled with the next newest
 * post from the others; if every feed fails, the fallback posts show instead.
 */
export async function getLatestReads(): Promise<DatedRead[]> {
  "use cache";
  cacheLife("hours");

  const fetched = await Promise.all(feeds.map(fetchFeed));
  const now = Date.now();
  return pickReads(fetched.flat()).map((read) => ({ ...read, age: formatRelativeTime(read.publishedAt, now) }));
}

type SlottedRead = Read & { slot: number };

async function fetchFeed(feed: Feed): Promise<SlottedRead[]> {
  try {
    const response = await fetch(feed.url, {
      signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-reading-list)" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseFeed(await response.text()).map((entry) => ({
      ...entry,
      source: feed.source,
      thumb: feed.thumb,
      slot: feed.slot,
    }));
  } catch (error) {
    console.warn(`Reading list: skipped ${feed.url}:`, error instanceof Error ? error.message : error);
    return [];
  }
}

function pickReads(posts: SlottedRead[]): Read[] {
  const newestFirst = [...posts].sort(byNewest);
  const slots = [...new Set(feeds.map((feed) => feed.slot))];
  const picked: Read[] = [];
  const add = (read: Read | undefined) => {
    if (read && picked.length < READ_COUNT && !picked.some((p) => p.href === read.href)) picked.push(read);
  };

  for (const slot of slots) add(newestFirst.find((post) => post.slot === slot));
  for (const post of newestFirst) add(post);
  for (const read of fallbackReads) add(read);

  return picked.sort(byNewest).map(({ source, title, href, publishedAt, thumb }) => ({
    source,
    title,
    href,
    publishedAt,
    thumb,
  }));
}

function byNewest(a: Read, b: Read) {
  return b.publishedAt.localeCompare(a.publishedAt);
}
