import { useId } from "react";

import type { ReadThumbKind } from "@/lib/note-types";
import { cn } from "@/lib/utils";

type ReadThumbProps = {
  kind: ReadThumbKind;
  className?: string;
};

/**
 * Tiny drawing for an outside read, in the note thumbnails' style: a football (scores),
 * a newspaper with a tactics board (match reports) or a terminal (tech news). Decorative.
 */
export function ReadThumb({ kind, className }: ReadThumbProps) {
  // Unique per render: a fixed id would clash if the ball ever showed twice on a page.
  const ballClip = useId();

  return (
    <svg
      viewBox="0 0 52 52"
      aria-hidden="true"
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("block size-full", className)}
    >
      {kind === "ball" && (
        <>
          {/* Motion lines: the ball is on its way. */}
          <path d="M4 22H10M6 27H11M4 32H10" className="stroke-accent" strokeWidth={1.6} />
          <clipPath id={ballClip}>
            <circle cx="29" cy="26" r="14" />
          </clipPath>
          <g clipPath={`url(#${ballClip})`}>
            {/* Edge patches, cut off by the ball's outline. */}
            <path
              d="M34.5 18.5L32.6 12.9L37.4 9.4L42.1 12.9L40.3 18.5Z M37.8 28.9L42.6 25.4L47.3 28.9L45.5 34.5L39.6 34.5Z M29 35.3L33.8 38.7L31.9 44.3L26.1 44.3L24.2 38.7Z M20.2 28.9L18.4 34.5L12.5 34.5L10.7 28.9L15.4 25.4Z M23.5 18.5L17.7 18.5L15.9 12.9L20.6 9.4L25.4 12.9Z"
              className="fill-ink"
            />
            <path
              d="M29 21L29 15.5M33.8 24.5L39 22.8M31.9 30L35.2 34.5M26.1 30L22.8 34.5M24.2 24.5L19 22.8"
              className="stroke-sub"
              strokeWidth={1.2}
            />
          </g>
          <path d="M29 21L33.8 24.5L31.9 30H26.1L24.2 24.5Z" className="fill-ink" />
          <circle cx="29" cy="26" r="14" className="stroke-sub" strokeWidth={1.5} />
        </>
      )}
      {kind === "paper" && (
        <>
          <rect x="8.5" y="9.5" width="35" height="33" rx="3" className="stroke-border-hover" />
          <path d="M13 15H39" className="stroke-ink" strokeWidth={2} />
          <path d="M13 20.5H25M13 24.5H25M13 28.5H22M13 34.5H25M13 38H21" className="stroke-sub" strokeWidth={1.2} />
          {/* Tactics board: a half pitch with a passing move. */}
          <rect x="28.5" y="20.5" width="11" height="17" rx="1" className="stroke-sub" strokeWidth={1} />
          <path d="M28.5 29H39.5" className="stroke-border-hover" strokeWidth={1} />
          <circle cx="31.5" cy="34" r="1.3" className="fill-accent" />
          <circle cx="36.5" cy="25" r="1.3" className="fill-accent" />
          <path d="M32.3 32.5L35.7 26.5" className="stroke-accent" strokeWidth={1} strokeDasharray="1.5 1.5" />
        </>
      )}
      {kind === "terminal" && (
        <>
          <rect x="7.5" y="11.5" width="37" height="29" rx="3" className="stroke-border-hover" />
          <path d="M7.5 17.5H44.5" className="stroke-border-hover" />
          <circle cx="11.5" cy="14.5" r="1" className="fill-sub" />
          <circle cx="15" cy="14.5" r="1" className="fill-sub" />
          <circle cx="18.5" cy="14.5" r="1" className="fill-sub" />
          <path d="M13 24L17 27.5L13 31" className="stroke-accent" strokeWidth={1.6} />
          <path d="M20 31H26" className="stroke-ink" strokeWidth={1.6} />
          <path d="M13 35.5H34" className="stroke-sub" strokeWidth={1.2} />
        </>
      )}
    </svg>
  );
}
