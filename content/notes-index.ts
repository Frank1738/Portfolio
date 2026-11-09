import type { NotesIndex, ReadsTile } from "@/lib/note-types";

export const notesIndex: NotesIndex = {
  title: "Matchday notes",
  description:
    "Where football and AI overlap: prediction models, xG and the occasional weekend project. A new note every few weeks during the season.",
};

/**
 * Off while the notes in content/notes/ are still mock data: /notes and /notes/[num] return 404,
 * they drop out of the sitemap, and the home tile lists the free outside reads below instead.
 * Set to true once real notes are in.
 */
export const notesPublished = false;

/** Free-to-read sites the home tile links to until there are notes of my own. Links only. */
export const readsTile: ReadsTile = {
  title: "Good reads",
  meta: "My notes soon",
  reads: [
    {
      id: "bbc-football",
      source: "BBC Sport",
      title: "Latest football news, scores and live match coverage",
      href: "https://www.bbc.com/sport/football",
      thumb: "ball",
    },
    {
      id: "guardian-football",
      source: "The Guardian",
      title: "Match reports, tactics and long reads, free to read",
      href: "https://www.theguardian.com/football",
      thumb: "paper",
    },
    {
      id: "hacker-news",
      source: "Hacker News",
      title: "What engineers are reading today: AI, startups and code",
      href: "https://news.ycombinator.com/",
      thumb: "terminal",
    },
  ],
};
