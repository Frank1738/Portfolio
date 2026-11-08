import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackPillProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** "← Back" pill link used in page headers and asides. */
export function BackPill({ href, children, className }: BackPillProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "pill", size: "sm" }), className)}
    >
      {/* One flex item, so the arrow is followed by a real space as in the design, not the button gap. */}
      <span>
        <span aria-hidden="true">←</span> {children}
      </span>
    </Link>
  );
}
