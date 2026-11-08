import { cn } from "@/lib/utils";

/** Tile header row: title on the left, mono meta on the right, baseline-aligned. */
export function TileHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-baseline justify-between gap-3", className)}>{children}</div>;
}
