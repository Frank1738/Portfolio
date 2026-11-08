import type { Metadata } from "next";

import { HalfwayDivider } from "@/components/halfway-divider";
import { BlueprintIntro } from "@/components/home/blueprint-intro";
import { HomeFooter } from "@/components/home/home-footer";
import { Intro } from "@/components/home/intro";
import { NotesTile } from "@/components/home/notes-tile";
import { SelectedWorkTile } from "@/components/home/selected-work-tile";
import { StackList } from "@/components/home/stack-list";
import { WorkWithMeTile } from "@/components/home/work-with-me-tile";
import { JsonLd } from "@/components/json-ld";
import { ThemeToggle } from "@/components/theme-toggle";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} · ${site.role}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function Home() {
  // 560px content column + 16px gutters (the prototype's max-width is content-box).
  // `data-intro-root` is the column the first-visit intro draws over; `data-skel` marks its blocks.
  return (
    <div data-intro-root="" className="mx-auto max-w-148 px-4 pt-page-top pb-16">
      <JsonLd graph={[personJsonLd(), websiteJsonLd()]} />
      <BlueprintIntro />
      <main id="main">
        <div className="enter-0 flex items-start justify-between">
          <div
            aria-hidden="true"
            data-skel="15"
            className="flex size-15 items-center justify-center rounded-xl border border-border bg-tile text-lg font-medium tracking-[-0.01em] text-ink transition-transform duration-200 ease-soft hover:scale-106"
          >
            {site.initials}
          </div>
          <div data-skel="999">
            <ThemeToggle />
          </div>
        </div>

        <h1 data-skel="6" className="enter-1 mt-5 text-base leading-normal font-medium text-ink">
          {site.name}
          <span className="block font-normal text-sub">{site.role}</span>
        </h1>

        <Intro className="enter-2 mt-5" />

        <StackList className="enter-3 mt-7" />

        <HalfwayDivider className="enter-4 my-8.75" />

        <div className="enter-5 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
          <SelectedWorkTile />
          <NotesTile />
          <WorkWithMeTile />
        </div>
      </main>

      <HomeFooter className="enter-6 mt-12" />
    </div>
  );
}
