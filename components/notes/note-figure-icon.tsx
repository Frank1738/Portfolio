import type { NoteFigureKind } from "@/lib/note-types";
import { cn } from "@/lib/utils";

type NoteFigureIconProps = {
  kind: NoteFigureKind;
  className?: string;
};

/** Tiny SVG of a note's figure (line chart, bars or chat card), used as its thumbnail. Decorative. */
export function NoteFigureIcon({ kind, className }: NoteFigureIconProps) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true" focusable="false" className={cn("block size-full", className)}>
      {kind === "line" && (
        <>
          <path d="M6 44H46" className="stroke-border" strokeWidth={1} />
          <path
            d="M6 33 L14 31 L20 30 L28 28 L34 27 L46 25"
            className="stroke-sub"
            strokeWidth={1}
            strokeDasharray="2 2"
            fill="none"
          />
          <path
            d="M6 40 L13 31 L19 34 L27 23 L33 26 L46 15"
            className="stroke-accent"
            strokeWidth={1.6}
            fill="none"
            strokeLinejoin="round"
          />
        </>
      )}
      {kind === "bars" && (
        <>
          <rect x="8" y="12" width="36" height="4" rx="1" className="fill-sub" />
          <rect x="8" y="20" width="29" height="4" rx="1" className="fill-sub" />
          <rect x="8" y="28" width="23" height="4" rx="1" className="fill-sub" />
          <rect x="8" y="36" width="18" height="4" rx="1" className="fill-accent" />
        </>
      )}
      {kind === "bot" && (
        <>
          <rect x="7" y="10" width="8" height="8" rx="2" className="fill-ink" />
          <rect x="18.5" y="10.5" width="27" height="17" rx="3" fill="none" className="stroke-border-hover" />
          <path d="M22 15H40M22 19H36M22 23H33" className="stroke-sub" strokeWidth={1.5} strokeLinecap="round" />
          <rect x="18.5" y="31.5" width="20" height="9" rx="3" fill="none" className="stroke-accent" />
          <path d="M22 36H34" className="stroke-accent" strokeWidth={1.5} strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
