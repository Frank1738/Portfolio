import Link from "next/link";

import { tileVariants } from "@/components/tile";
import { cn } from "@/lib/utils";

type NextCardProps = {
  href: string;
  /** Mono label above the title, e.g. "Next project". */
  label: string;
  title: string;
  /** Optional line under the title (the case-study blurb). */
  children?: React.ReactNode;
  className?: string;
};

/** "Next project" / "Next note" card at the end of a case study or post. */
export function NextCard({ href, label, title, children, className }: NextCardProps) {
  return (
    <Link
      href={href}
      className={cn(tileVariants({ pressable: true }), "flex-row items-center justify-between gap-4 px-4.5", className)}
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="font-mono text-2xs text-sub">{label}</span>
        <span className="font-medium text-ink transition-colors duration-200 ease-[ease] group-hover/tile:text-accent">
          {title}
        </span>
        {children && <span className="text-sm">{children}</span>}
      </span>
      <span aria-hidden="true" className="text-sub">
        →
      </span>
    </Link>
  );
}
