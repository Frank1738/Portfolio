"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/** Segmented pill: 2px padding, 1px border, tile background. */
function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(
        "flex w-fit items-center gap-0.5 rounded-full border border-border bg-tile p-0.5",
        className,
      )}
      {...props}
    />
  );
}

/**
 * 28×22 segment; an invisible `::after` extends the tap target to 28×30 (WCAG 2.5.8 asks for 24px).
 * The active segment gets the page background, ink text and a 1px ring.
 */
function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "relative flex h-5.5 w-7 cursor-pointer items-center justify-center rounded-full text-sub transition-colors duration-150 ease-out hover:text-ink",
        "after:absolute after:inset-x-0 after:-inset-y-1",
        "data-[state=on]:bg-bg data-[state=on]:text-ink data-[state=on]:shadow-[0_0_0_1px_var(--border)]",
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
