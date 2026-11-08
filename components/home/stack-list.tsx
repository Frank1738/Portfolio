import type { CSSProperties } from "react";

import { getStack, type StackTone } from "@/lib/home";
import { cn } from "@/lib/utils";

const toneClassName = {
  ai: "text-sk-ai",
  backend: "text-sk-be",
  frontend: "text-sk-fe",
  infra: "text-sk-in",
} satisfies Record<StackTone, string>;

/**
 * "The stack": label/skills rows separated by 0.5px hairlines. Each skill is its own list item,
 * set apart by a 16px gap (wider than a word space, so "LLM apps" still reads as one skill).
 * The hairlines are pseudo-elements (a `<dl>` row may only hold `<dt>`/`<dd>`). `stack-reveal`
 * draws them in from the left and slides each row in, staggered by the row's `--row` index.
 */
export function StackList({ className }: { className?: string }) {
  return (
    <section data-skel="0" aria-labelledby="stack-title" className={cn("flex flex-col", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h2 id="stack-title" className="text-sm font-medium text-ink">
          The stack
        </h2>
        <span className="font-mono text-2xs text-sub">Skills &amp; tools</span>
      </div>
      <dl className="stack-reveal">
        {getStack().map((row, index) => (
          <div
            key={row.label}
            style={{ "--row": index } as CSSProperties}
            className={cn(
              "relative grid grid-cols-[92px_minmax(0,1fr)] gap-3 py-1.75 text-sm",
              "before:absolute before:inset-x-0 before:top-0 before:h-[0.5px] before:origin-left before:bg-border/65",
              "last:after:absolute last:after:inset-x-0 last:after:bottom-0 last:after:h-[0.5px] last:after:origin-left last:after:bg-border/65",
            )}
          >
            <dt className={cn("font-mono text-2xs leading-5", toneClassName[row.tone])}>{row.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-4 font-mono text-xs leading-5 text-ink">
                {row.items.map((item) => (
                  <li key={item} className="whitespace-nowrap">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
