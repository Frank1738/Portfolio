import type { MDXContent } from "mdx/types";

import Note0001, { meta as meta0001 } from "@/content/notes/0001.mdx";
import Note0002, { meta as meta0002 } from "@/content/notes/0002.mdx";
import Note0003, { meta as meta0003 } from "@/content/notes/0003.mdx";
import { notesIndex, notesPublished } from "@/content/notes-index";
import type { NoteMeta, NotesIndex } from "@/lib/note-types";

export type { NoteFigureKind, NoteMeta, NotesIndex } from "@/lib/note-types";

export type Note = NoteMeta & {
  /** The compiled MDX body. */
  Content: MDXContent;
};

/** Register new notes here. Display order (newest first) is derived from the note number. */
const notes: readonly Note[] = [
  { ...meta0001, Content: Note0001 },
  { ...meta0002, Content: Note0002 },
  { ...meta0003, Content: Note0003 },
].sort((a, b) => b.number.localeCompare(a.number));

/** Whether /notes and the notes are live. While false, the routes 404. */
export function isNotesPublished(): boolean {
  return notesPublished;
}

export function getNotesIndex(): NotesIndex {
  return notesIndex;
}

/** All notes, newest first. */
export function getNotes(): readonly Note[] {
  return notes;
}

export function getNote(number: string): Note | undefined {
  return notes.find((note) => note.number === number);
}

/** The next older note; the oldest loops back to the newest. */
export function getNextNote(number: string): Note {
  const index = notes.findIndex((note) => note.number === number);
  return notes[(index + 1) % notes.length];
}

export function isLatestNote(note: NoteMeta) {
  return notes[0]?.number === note.number;
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}
