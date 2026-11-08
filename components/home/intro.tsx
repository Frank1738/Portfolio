import { Fragment } from "react";

import { Highlight } from "@/components/home/highlight";
import { getIntro } from "@/lib/home";
import { cn } from "@/lib/utils";

/** The two intro paragraphs with highlighter marks. */
export function Intro({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3.5 text-pretty", className)}>
      {getIntro().map((paragraph) => (
        <p key={paragraph.id} data-skel="6">
          {/* Index keys: the parts are fixed content that never reorders, and the same text may repeat. */}
          {paragraph.parts.map((part, index) =>
            typeof part === "string" ? (
              <Fragment key={index}>{part}</Fragment>
            ) : (
              <Highlight key={index} tone={part.highlight}>
                {part.text}
              </Highlight>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
