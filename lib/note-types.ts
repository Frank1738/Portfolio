/** Which figure a note shows: also drives its thumbnail. */
export type NoteFigureKind = "line" | "bars" | "bot";

/** Exported as `meta` from every `content/notes/*.mdx` file. */
export type NoteMeta = {
  /** Four-digit note number, also the URL segment: "0003". */
  number: string;
  /** ISO date, "2026-10-12". */
  publishedAt: string;
  readingMinutes: number;
  title: string;
  excerpt: string;
  figure: NoteFigureKind;
  caption: string;
};

/** Read thumbnails: football (scores), newspaper (reports), terminal (tech). */
export type ReadThumbKind = "ball" | "paper" | "terminal";

/** An outside page the home tile links to while there are no notes of my own. */
export type Read = {
  /** Stable key. */
  id: string;
  /** Publication name, shown as the mono meta line. */
  source: string;
  /** Our own one-line description: never copied from the source. */
  title: string;
  href: string;
  /** Thumbnail drawing (ReadThumb). */
  thumb: ReadThumbKind;
};

/** Home tile header while notes are unpublished. */
export type ReadsTile = {
  title: string;
  meta: string;
  reads: Read[];
};

/** Heading and description of the /notes index page. */
export type NotesIndex = {
  title: string;
  description: string;
};
