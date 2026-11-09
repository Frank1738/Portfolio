import type { Feed, Read, ReadsTile } from "@/lib/reads";

/** "Reading lately" tile header, shown while there are no notes of my own. */
export const readsTile: ReadsTile = {
  title: "Reading lately",
  meta: "Auto-updated",
};

/**
 * Feeds for the tile, refreshed hourly. One card per slot: Simon Willison, then whichever of
 * Latent Space and The Pragmatic Engineer posted last, then Guardian Football.
 */
export const feeds: Feed[] = [
  { id: "simon-willison", source: "Simon Willison", url: "https://simonwillison.net/atom/everything/", thumb: "terminal", slot: 0 },
  { id: "latent-space", source: "Latent Space", url: "https://www.latent.space/feed", thumb: "terminal", slot: 1 },
  {
    id: "pragmatic-engineer",
    source: "Pragmatic Engineer",
    url: "https://newsletter.pragmaticengineer.com/feed",
    thumb: "terminal",
    slot: 1,
  },
  { id: "guardian-football", source: "The Guardian", url: "https://www.theguardian.com/football/rss", thumb: "ball", slot: 2 },
];

/** Real posts (latest in each feed on 9 Nov 2026), shown only if every feed fails. */
export const fallbackReads: Read[] = [
  {
    source: "The Guardian",
    title: "Premier League: 10 talking points from the weekend’s action",
    href: "https://www.theguardian.com/football/2026/nov/09/premier-league-10-talking-points-weekend-action",
    publishedAt: "2026-11-09T08:00:04.000Z",
    thumb: "ball",
  },
  {
    source: "Simon Willison",
    title: "The Web Is More Than Enough, by Paul Ford",
    href: "https://simonwillison.net/2026/Nov/9/hn-50421091/",
    publishedAt: "2026-11-09T04:32:33.000Z",
    thumb: "terminal",
  },
  {
    source: "Latent Space",
    title: "How Stanford Teaches AI-Native Engineering — Mihail Eric, Monaco",
    href: "https://latent.space/p/cs146s/",
    publishedAt: "2026-11-08T21:41:44.000Z",
    thumb: "terminal",
  },
];
