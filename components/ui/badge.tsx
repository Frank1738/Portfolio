import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Mono pill tags (case-study stack list). */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center rounded-full border px-2.5 py-1 font-mono text-2xs whitespace-nowrap",
  {
    variants: {
      variant: {
        outline: "border-border text-body",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
