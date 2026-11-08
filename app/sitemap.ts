import type { MetadataRoute } from "next";

import { getNotes } from "@/lib/notes";
import { absoluteUrl } from "@/lib/site";
import { getCaseStudies } from "@/lib/work";

/** Every page. Only posts carry a date (`lastModified`); the rest have none in the content. */
export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getNotes();

  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/work") },
    ...getCaseStudies().map((study) => ({ url: absoluteUrl(`/work/${study.slug}`) })),
    { url: absoluteUrl("/notes"), lastModified: notes[0]?.publishedAt },
    ...notes.map((note) => ({ url: absoluteUrl(`/notes/${note.number}`), lastModified: note.publishedAt })),
  ];
}
