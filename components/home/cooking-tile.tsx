"use client";

import { useState } from "react";

import { CookingPot } from "@/components/home/cooking-pot";
import { tileVariants } from "@/components/tile";
import type { WorkTeaser } from "@/lib/work";
import { cn } from "@/lib/utils";

type CookingTileProps = {
  teaser: WorkTeaser;
  /** Tile header row (server-rendered). */
  header: React.ReactNode;
  /** The product screen the overlay covers. */
  children: React.ReactNode;
  className?: string;
};

/**
 * Selected-work tile while there are no case studies yet: it doesn't navigate. Hover or focus
 * blurs the screen and shows a steaming pot; each tap rattles the lid and shows the next line.
 * After a tap the overlay stays up (touch has no hover) until a mouse leaves the tile.
 */
export function CookingTile({ teaser, header, children, className }: CookingTileProps) {
  const [stirs, setStirs] = useState(0);
  const line = teaser.lines[stirs % teaser.lines.length];

  return (
    <div
      data-skel="16"
      data-cooking={stirs > 0 ? "" : undefined}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setStirs(0);
      }}
      className={cn(tileVariants(), "col-span-full gap-3.5", className)}
    >
      {header}
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-bg">
        <div
          aria-hidden="true"
          className="size-full transition-[scale,filter] duration-240 ease-zoom group-focus-within/tile:scale-[1.015] group-focus-within/tile:blur-[3px] group-hover/tile:scale-[1.015] group-hover/tile:blur-[3px] group-data-[cooking]/tile:scale-[1.015] group-data-[cooking]/tile:blur-[3px]"
        >
          {children}
        </div>
        <button
          type="button"
          onClick={() => setStirs((count) => count + 1)}
          className="absolute inset-0 z-2 flex cursor-pointer flex-col items-center justify-center gap-2.5 bg-bg/75 px-4 text-center opacity-0 transition-opacity duration-150 ease-out group-hover/tile:opacity-100 group-hover/tile:[--steam-state:running] group-data-[cooking]/tile:opacity-100 group-data-[cooking]/tile:[--steam-state:running] focus-visible:opacity-100 focus-visible:-outline-offset-2 focus-visible:[--steam-state:running] active:scale-99"
        >
          <CookingPot rattle={stirs} className="size-12 text-sub" />
          <span className="rounded-sm bg-bg px-2 py-1 font-mono text-2xs tracking-label text-accent uppercase">
            {teaser.label}
          </span>
          {/* Fixed height: the lines differ in length and must not shift the pot. */}
          <span aria-live="polite" className="min-h-[2lh] max-w-64 text-sm leading-snug text-pretty text-ink">
            {line}
          </span>
        </button>
      </div>
    </div>
  );
}
