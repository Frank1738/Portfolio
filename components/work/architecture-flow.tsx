import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/work";

const box = "rounded-lg border px-3.5 py-3 text-sm";

/**
 * Section 03: a vertical flow of steps joined by dashed connectors, ending in two
 * outcomes. The first outcome is the diagram's one accent box.
 */
export function ArchitectureFlow({ steps, outcomes }: CaseStudy["architecture"]) {
  const [primary, secondary] = outcomes;

  return (
    <div>
      <ol>
        {steps.map((step) => (
          <li key={step.name}>
            <div className={cn(box, "flex justify-between gap-3 border-border bg-tile")}>
              <span className="text-ink">{step.name}</span>
              <span className="text-right font-mono text-2xs text-sub">{step.detail}</span>
            </div>
            <div aria-hidden="true" className="dashed-y ml-6 h-4.5 w-px" />
          </li>
        ))}
      </ol>
      <ul className="grid grid-cols-2 gap-3">
        {[
          { node: primary, tone: "border-accent" },
          { node: secondary, tone: "border-border bg-tile" },
        ].map(({ node, tone }) => (
          <li key={node.name} className={cn(box, "flex flex-col gap-0.5", tone)}>
            <span className="text-ink">{node.name}</span>
            <span className="font-mono text-2xs text-sub">{node.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
