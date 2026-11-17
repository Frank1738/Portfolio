import { StackIcon } from "@/components/home/stack-icon";
import { Badge } from "@/components/ui/badge";
import { getStack } from "@/lib/home";
import { cn } from "@/lib/utils";

/**
 * "The stack": one wrapping cloud of dotted-border chips (`Badge`), each skill with its logo and
 * its own list item, so keywords scan individually.
 */
export function StackList({ className }: { className?: string }) {
  return (
    <section data-skel="0" aria-labelledby="stack-title" className={cn("flex flex-col", className)}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 id="stack-title" className="text-sm font-medium text-ink">
          The stack
        </h2>
        <span className="font-mono text-2xs text-sub">Skills &amp; tools</span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {getStack().map((item) => (
          <li key={item.name}>
            <Badge className="gap-1.5 rounded-md border-dotted border-border-strong bg-tile text-ink">
              <StackIcon icon={item.icon} />
              {item.name}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
