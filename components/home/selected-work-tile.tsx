import Link from "next/link";

import { CookingTile } from "@/components/home/cooking-tile";
import { TileHeader } from "@/components/home/tile-header";
import { tileVariants } from "@/components/tile";
import { ProjectScreen } from "@/components/work/project-screen";
import { padCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getCaseStudies, getFeaturedCaseStudy, getWorkTeaser, isWorkPublished } from "@/lib/work";

/** Full-width tile with the featured project's screen; leads to /work, or teases it (Relay screen) while unpublished. */
export function SelectedWorkTile({ className }: { className?: string }) {
  if (!isWorkPublished()) {
    const teaser = getWorkTeaser();
    return (
      <CookingTile
        teaser={teaser}
        className={className}
        header={
          <TileHeader>
            <h2 className="text-sm font-medium text-ink transition-colors duration-200 ease-[ease] group-hover/tile:text-accent">
              Selected work
            </h2>
            <span className="flex items-center gap-1.5 font-mono text-2xs text-sub">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {teaser.meta}
            </span>
          </TileHeader>
        }
      >
        <ProjectScreen kind="relay" />
      </CookingTile>
    );
  }

  const featured = getFeaturedCaseStudy();

  return (
    <Link href="/work" data-skel="16" className={cn(tileVariants({ pressable: true }), "col-span-full gap-3.5", className)}>
      <TileHeader>
        <h2 className="text-sm font-medium text-ink transition-colors duration-200 ease-[ease] group-hover/tile:text-accent">
          Selected work
        </h2>
        <span className="font-mono text-2xs text-sub">
          {padCount(getCaseStudies().length)} projects <span aria-hidden="true" className="font-mono-system">→</span>
        </span>
      </TileHeader>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-bg">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-2 -translate-1/2 rounded-sm bg-bg px-2 py-1 font-mono text-2xs tracking-label whitespace-nowrap text-accent opacity-0 transition-opacity duration-150 ease-out group-hover/tile:opacity-100"
        >
          SELECTED WORK
        </span>
        <div className="size-full transition-transform duration-240 ease-zoom group-hover/tile:scale-[1.015]">
          <ProjectScreen kind={featured.slug} status={featured.status} />
        </div>
      </div>
    </Link>
  );
}
