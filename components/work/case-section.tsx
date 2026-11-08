import { SectionLabel } from "@/components/section-label";
import { cn } from "@/lib/utils";

type CaseSectionProps = {
  /** Two-digit section number, e.g. "01". */
  index: string;
  title: string;
  children: React.ReactNode;
  /** Gap under the label and between blocks; sections differ (12px by default). */
  className?: string;
};

/** A numbered case-study section: "01 THE PROBLEM" label, then its content. */
export function CaseSection({ index, title, children, className }: CaseSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <SectionLabel index={index}>{title}</SectionLabel>
      {children}
    </section>
  );
}
