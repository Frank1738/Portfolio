import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared settings for the generated images (`opengraph-image.tsx`, `icon.tsx`,
 * `apple-icon.tsx`). They render with `next/og` at build time, outside the page CSS.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * The light theme's tokens from `app/globals.css`, as plain values: `next/og` can't read
 * CSS variables. Keep in sync with `:root` there.
 */
export const ogColors = {
  bg: "#ffffff",
  ink: "#171717",
  sub: "#6b6b6b",
  body: "#4b5563",
  tile: "#f5f5f5",
  border: "#e5e5e5",
  line: "#d4d4d4",
  accent: "#15803d",
} as const;

/** Font family names used in the images' inline styles. */
export const ogFont = { sans: "Geist", mono: "Geist Mono" } as const;

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 600;
  style: "normal";
};

const fontFiles = [
  { name: ogFont.sans, file: "Geist-Regular.ttf", weight: 400 },
  { name: ogFont.sans, file: "Geist-Medium.ttf", weight: 500 },
  { name: ogFont.sans, file: "Geist-SemiBold.ttf", weight: 600 },
  { name: ogFont.mono, file: "GeistMono-Regular.ttf", weight: 400 },
] as const;

/**
 * Geist and Geist Mono as TTF (`next/og` can't use the site's next/font WOFF2 files);
 * Geist stands in for the site's system sans, which an image can't use. Read at module
 * scope, before any render: a handler that waits on file I/O while prerendering counts as
 * dynamic under Cache Components.
 */
export const ogFonts: OgFont[] = await Promise.all(
  fontFiles.map(async ({ name, file, weight }) => ({
    name,
    weight,
    style: "normal" as const,
    data: await readFile(join(process.cwd(), "assets/fonts", file)),
  })),
);
