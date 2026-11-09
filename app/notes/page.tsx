import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { INDEX_LIST_ENTER, IndexLayout } from "@/components/index-layout";
import { NoteRow } from "@/components/notes/note-row";
import { pageMetadata } from "@/lib/metadata";
import { enterClass } from "@/lib/motion";
import { getNotes, getNotesIndex, isNotesPublished } from "@/lib/notes";

const { title, description } = getNotesIndex();

export const metadata: Metadata = pageMetadata({ title, description, path: "/notes" });

export default function NotesPage() {
  if (!isNotesPublished()) notFound();

  return (
    <IndexLayout title={title} description={description}>
      <ul className="border-t border-border">
        {getNotes().map((note, index) => (
          <li key={note.number} className={enterClass(INDEX_LIST_ENTER + index)}>
            <NoteRow note={note} series={title} />
          </li>
        ))}
      </ul>
    </IndexLayout>
  );
}
