import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Pill buttons from the design. Use `buttonVariants` directly on a `<Link>` or `<a>`
 * when the element navigates, so links stay links and ship no extra JavaScript.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-sm whitespace-nowrap [transition:color_.15s_ease-out,border-color_.2s_ease] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Back links: quiet grey text, darkens on hover. */
        pill: "border-border text-sub hover:border-border-hover hover:text-ink",
        /** Primary action on a tile ("Book a call"). */
        surface: "border-border bg-bg text-ink hover:border-border-hover hover:text-accent",
        /** Secondary action on a tile ("Copy email"). */
        outline: "border-border bg-transparent text-body hover:border-border-hover hover:text-ink",
      },
      size: {
        sm: "py-0.75 pr-3 pl-2.5",
        md: "h-7.5 px-3",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
