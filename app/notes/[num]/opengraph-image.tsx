import { ImageResponse } from "next/og";

import { OgCard } from "@/components/og/og-card";
import { formatShortDate } from "@/lib/format";
import { ogFonts, ogColors, ogContentType, ogSize } from "@/lib/og";
import { formatReadingTime, getNote, getNotes, getNotesIndex } from "@/lib/notes";
import { site } from "@/lib/site";

// Static per route type: `generateImageMetadata` would give per-page alt text, but its
// image routes are then not prerendered for the note numbers.
export const alt = `Matchday note by ${site.name}: number, date, title and summary`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getNotes().map((note) => ({ num: note.number }));
}

export default async function Image({ params }: { params: Promise<{ num: string }> }) {
  const note = getNote((await params).num);
  if (!note) return new Response(null, { status: 404 });

  // The post's meta row: number in accent, date, read time.
  return new ImageResponse(
    (
      <OgCard
        kind="post"
        section={getNotesIndex().title}
        meta={
          <>
            <span style={{ color: ogColors.accent }}>{note.number}</span>
            <span>{formatShortDate(note.publishedAt)}</span>
            <span>{formatReadingTime(note.readingMinutes)}</span>
          </>
        }
        title={note.title}
        description={note.excerpt}
      />
    ),
    { ...size, fonts: ogFonts },
  );
}
