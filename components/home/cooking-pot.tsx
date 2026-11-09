import { cn } from "@/lib/utils";

type CookingPotProps = {
  /** Changes on each tap: remounts the lid so its rattle replays. 0 = no rattle. */
  rattle: number;
  className?: string;
};

/** Line-drawn pot with rising steam (`steam` utility; runs while an ancestor sets --steam-state). */
export function CookingPot({ rattle, className }: CookingPotProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("overflow-visible", className)}
    >
      <path className="steam [--i:0]" d="M17 13c-2-2 2-3.5 0-6" />
      <path className="steam [--i:1]" d="M24 12c-2-2 2-3.5 0-6" />
      <path className="steam [--i:2]" d="M31 13c-2-2 2-3.5 0-6" />
      <g key={rattle} className={rattle > 0 ? "lid-rattle" : undefined}>
        <path d="M8 21h32" />
        <path d="M21 17.5h6" />
        <path d="M24 17.5V21" />
      </g>
      <path d="M10 24h28v10a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6z" />
      <path d="M10 27H6M38 27h4" />
    </svg>
  );
}
