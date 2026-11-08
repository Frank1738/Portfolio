import Link from "next/link";

import { NoteFigureIcon } from "@/components/notes/note-figure-icon";
import { formatShortDate } from "@/lib/format";
import { formatReadingTime, type NoteMeta } from "@/lib/notes";

type NoteRowProps = {
  note: NoteMeta;
  /** Series name shown before the number: "Matchday notes · 0003". */
  series: string;
};

/** /notes list row: label, title, 2-line excerpt, date and read time, figure thumbnail. Links to the post. */
export function NoteRow({ note, series }: NoteRowProps) {
  return (
    <Link
      href={`/notes/${note.number}`}
      className="group/post grid grid-cols-[minmax(0,1fr)_112px] items-center gap-6 border-b border-border py-6 text-body"
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="font-mono text-2xs text-sub">
          {series} · {note.number}
        </p>
        <h2 className="text-lg leading-[1.3] font-semibold tracking-[-0.01em] text-pretty text-ink transition-colors duration-150 ease-[ease] group-hover/post:text-accent">
          {note.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-[1.55]">{note.excerpt}</p>
        <p className="mt-1 flex gap-3 font-mono text-2xs text-sub">
          <time dateTime={note.publishedAt}>{formatShortDate(note.publishedAt)}</time>
          <span>{formatReadingTime(note.readingMinutes)}</span>
        </p>
      </div>
      <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-md border border-border bg-tile">
        <div className="size-16 transition-transform duration-240 ease-zoom group-hover/post:scale-106">
          <NoteFigureIcon kind={note.figure} />
        </div>
      </div>
    </Link>
  );
}
