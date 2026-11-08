import { ShimmerReplay } from "@/components/shimmer-replay";
import { cn } from "@/lib/utils";

type HalfwayDividerProps = {
  /** "md" is the 24px home divider, with the shimmer (replayed on hover); "sm" is the static 14px post footer divider. */
  size?: "md" | "sm";
  className?: string;
};

/** The "halfway line": a dashed rule with a centre circle. Decorative. */
export function HalfwayDivider({ size = "md", className }: HalfwayDividerProps) {
  const shimmer = size === "md";
  const props = {
    "aria-hidden": true,
    "data-slot": "halfway-divider",
    className: cn("relative", shimmer ? "h-6" : "h-3.5", className),
  };
  const rule = (
    <div data-divider-rule="" className="dashed-x absolute inset-x-0 top-1/2 h-px">
      {shimmer && <span className="shimmer-sweep absolute inset-0" />}
      <div
        data-divider-ball=""
        className={cn(
          "absolute top-1/2 left-1/2 size-3.5 -translate-1/2 rounded-full border border-line bg-bg",
          shimmer && "shimmer-ball",
        )}
      />
    </div>
  );

  return shimmer ? <ShimmerReplay {...props}>{rule}</ShimmerReplay> : <div {...props}>{rule}</div>;
}
