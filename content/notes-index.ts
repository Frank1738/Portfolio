import type { NotesIndex } from "@/lib/note-types";

export const notesIndex: NotesIndex = {
  title: "Matchday notes",
  description:
    "Where football and AI overlap: prediction models, xG and the occasional weekend project. A new note every few weeks during the season.",
};

/**
 * Off while the notes in content/notes/ are still mock data: /notes and /notes/[num] return 404,
 * they drop out of the sitemap, and the home tile shows the reading list (content/reads.ts) instead.
 * Set to true once real notes are in.
 */
export const notesPublished = false;

