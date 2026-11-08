import { cn } from "@/lib/utils";

type NoteFigureProps = {
  caption: string;
  /** The chart or card inside the tile box. */
  children: React.ReactNode;
  className?: string;
};

/** A post's mid-article figure: tile box plus mono caption. Used from MDX. */
export function NoteFigure({ caption, children, className }: NoteFigureProps) {
  return (
    <figure className={cn("my-4 flex flex-col gap-2.5", className)}>
      <div className="rounded-2xl border border-border bg-tile p-4">{children}</div>
      <figcaption className="font-mono text-2xs text-sub">{caption}</figcaption>
    </figure>
  );
}
