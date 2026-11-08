import { cva } from "class-variance-authority";

import type { HighlightTone } from "@/lib/home";

/** Highlighter stroke: the colour starts 10% down, so it sits behind the lower part of the text. */
const highlightVariants = cva("bg-transparent px-0.5 text-ink", {
  variants: {
    tone: {
      blue: "bg-[linear-gradient(transparent_10%,var(--hl-blue)_10%)]",
      orange: "bg-[linear-gradient(transparent_10%,var(--hl-orange)_10%)]",
      pink: "bg-[linear-gradient(transparent_10%,var(--hl-pink)_10%)]",
    },
  },
});

/** Highlighter mark in the home intro. */
export function Highlight({ tone, children }: { tone: HighlightTone; children: React.ReactNode }) {
  return <mark className={highlightVariants({ tone })}>{children}</mark>;
}
