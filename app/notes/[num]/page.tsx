import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HalfwayDivider } from "@/components/halfway-divider";
import { JsonLd } from "@/components/json-ld";
import { NextCard } from "@/components/next-card";
import { PageHeader } from "@/components/page-header";
import { formatShortDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { formatReadingTime, getNextNote, getNote, getNotes, getNotesIndex } from "@/lib/notes";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return getNotes().map((note) => ({ num: note.number }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[num]">): Promise<Metadata> {
  const note = getNote((await params).num);
  if (!note) return {};

  return pageMetadata({
    title: note.title,
    description: note.excerpt,
    path: `/notes/${note.number}`,
    type: "article",
    publishedTime: note.publishedAt,
  });
}

export default async function NotePage({ params }: PageProps<"/notes/[num]">) {
  const note = getNote((await params).num);
  if (!note) notFound();

  const next = getNextNote(note.number);
  const { Content } = note;
  const series = getNotesIndex().title;

  return (
    <>
      <JsonLd
        graph={[
          blogPostingJsonLd(note),
          breadcrumbJsonLd([
            { name: series, path: "/notes" },
            { name: note.title, path: `/notes/${note.number}` },
          ]),
        ]}
      />
      <PageHeader backHref="/notes" backLabel="Notes" section={series} className="enter-0" />

      <main id="main">
        <article className="mx-auto max-w-148 px-4 pt-below-header text-pretty">
          <header>
            <p className="enter-1 flex gap-3 font-mono text-2xs text-sub">
              <span className="text-accent">{note.number}</span>
              <time dateTime={note.publishedAt}>{formatShortDate(note.publishedAt)}</time>
              <span>{formatReadingTime(note.readingMinutes)}</span>
            </p>
            <h1 className="enter-2 mt-3 mb-8 text-2xl leading-[1.2] font-semibold tracking-[-0.02em] text-ink">{note.title}</h1>
          </header>

          {/* MDX renders paragraphs, h2s and the figure as siblings: the gap spaces them. */}
          <div className="enter-3 flex flex-col gap-4">
            <Content />
          </div>
        </article>

        <nav aria-label="Next note" className="mx-auto max-w-148 px-4 pt-16 pb-24">
          <HalfwayDivider size="sm" className="mb-10" />
          <NextCard href={`/notes/${next.number}`} label={`Next note · ${next.number}`} title={next.title} />
        </nav>
      </main>
    </>
  );
}
