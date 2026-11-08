import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Home tile surface. Descendants react to hover with `group-hover/tile:`.
 * Use `tileVariants({ pressable: true })` directly on a `<Link>` for a linked tile.
 */
const tileVariants = cva(
  "group/tile flex flex-col rounded-2xl border border-border bg-tile p-4 [transition:border-color_.24s_ease,scale_.12s_ease-out] hover:border-border-strong",
  {
    variants: {
      /** Linked tiles press to scale .99. */
      pressable: {
        true: "text-body active:scale-99",
        false: "",
      },
    },
    defaultVariants: {
      pressable: false,
    },
  },
);

type TileProps = React.ComponentProps<"div"> & VariantProps<typeof tileVariants>;

function Tile({ className, pressable, ...props }: TileProps) {
  return <div data-slot="tile" className={cn(tileVariants({ pressable }), className)} {...props} />;
}

export { Tile, tileVariants };
