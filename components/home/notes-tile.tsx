import Link from "next/link";

import { ReadThumb } from "@/components/home/read-thumb";
import { TileHeader } from "@/components/home/tile-header";
import { NoteFigureIcon } from "@/components/notes/note-figure-icon";
import { Tile } from "@/components/tile";
import { formatShortDate, padCount } from "@/lib/format";
import { getNotes, getReadsTile, isLatestNote, isNotesPublished } from "@/lib/notes";
import { cn } from "@/lib/utils";

/** "Matchday notes" tile: a compact, Medium-style list of every post, or outside reads until there are posts. */
export function NotesTile({ className }: { className?: string }) {
  if (!isNotesPublished()) return <ReadsList className={className} />;

  const notes = getNotes();

  return (
    <Tile data-skel="16" className={cn("gap-4", className)}>
      <TileHeader>
        <h2 className="text-sm font-medium">
          {/* Padding cancelled by margin: 24px+ tap targets without moving the text. */}
          <Link href="/notes" className="-my-1 inline-block py-1 text-ink hover:text-accent">
            Matchday notes
          </Link>
        </h2>
        <Link href="/notes" className="-my-1.5 py-1.5 font-mono text-2xs text-sub hover:text-accent">
          {padCount(notes.length)} posts <span aria-hidden="true" className="font-mono-system">→</span>
        </Link>
      </TileHeader>
      <ul className="flex flex-1 flex-col justify-center">
        {notes.map((note) => (
          <li key={note.number}>
            <Link
              href={`/notes/${note.number}`}
              className="group/post grid grid-cols-[minmax(0,1fr)_48px] items-center gap-3 border-t border-border py-2.5 text-body"
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="flex gap-2 font-mono text-2xs text-sub">
                  <span>
                    {note.number} · <time dateTime={note.publishedAt}>{formatShortDate(note.publishedAt)}</time>
                  </span>
                  {isLatestNote(note) && <span className="text-accent">New</span>}
                </span>
                <span className="line-clamp-2 text-sm leading-[1.35] font-medium text-pretty text-ink transition-colors duration-150 ease-[ease] group-hover/post:text-accent">
                  {note.title}
                </span>
              </span>
              <span className="size-12 overflow-hidden rounded-sm border border-border bg-bg">
                <span className="block size-full transition-transform duration-240 ease-zoom group-hover/post:scale-106">
                  <NoteFigureIcon kind={note.figure} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Tile>
  );
}

/** Same layout as the notes list, linking out (new tab) to free sites. */
function ReadsList({ className }: { className?: string }) {
  const { title, meta, reads } = getReadsTile();

  return (
    <Tile data-skel="16" className={cn("gap-4", className)}>
      <TileHeader>
        <h2 className="text-sm font-medium text-ink">{title}</h2>
        <span className="font-mono text-2xs text-sub">{meta}</span>
      </TileHeader>
      <ul className="flex flex-1 flex-col justify-center">
        {reads.map((read) => (
          <li key={read.id}>
            <a
              href={read.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/post grid grid-cols-[minmax(0,1fr)_48px] items-center gap-3 border-t border-border py-2.5 text-body"
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-mono text-2xs text-sub">
                  {read.source} <span aria-hidden="true" className="font-mono-system">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <span className="line-clamp-2 text-sm leading-[1.35] font-medium text-pretty text-ink transition-colors duration-150 ease-[ease] group-hover/post:text-accent">
                  {read.title}
                </span>
              </span>
              <span className="size-12 overflow-hidden rounded-sm border border-border bg-bg">
                <span className="block size-full transition-transform duration-240 ease-zoom group-hover/post:scale-106">
                  <ReadThumb kind={read.thumb} />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Tile>
  );
}
