import { cn } from "@/lib/utils";

type SectionLabelProps = {
  /** Two-digit section number shown in the accent colour, e.g. "01". */
  index: string;
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

/** Mono uppercase section heading: "01 THE PROBLEM". */
export function SectionLabel({ index, children, as: Heading = "h2", className }: SectionLabelProps) {
  return (
    <Heading className={cn("font-mono text-2xs tracking-label text-sub uppercase", className)}>
      <span className="text-accent">{index}</span> {children}
    </Heading>
  );
}
