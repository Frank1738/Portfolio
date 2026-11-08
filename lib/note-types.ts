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

/** Heading and description of the /notes index page. */
export type NotesIndex = {
  title: string;
  description: string;
};
