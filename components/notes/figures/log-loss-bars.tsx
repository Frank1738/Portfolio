import { cn } from "@/lib/utils";

type Bar = {
  label: string;
  value: number;
};

// Bar widths map log loss .24 → 0% and .32 → 100%, as in the prototype.
const domain = { min: 0.24, max: 0.32 };

function widthFor(value: number) {
  return `${(((value - domain.min) / (domain.max - domain.min)) * 100).toFixed(1)}%`;
}

/** Post 0002's figure: one horizontal bar per model. The last (best) bar is accent. */
export function LogLossBars({ bars }: { bars: readonly Bar[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {bars.map((bar, index) => (
        <li key={bar.label} className="flex flex-col gap-1">
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-ink">{bar.label}</span>
            <span className="font-mono text-2xs text-sub">{bar.value.toFixed(3)}</span>
          </div>
          <div aria-hidden="true" className="h-2 rounded-[2px] bg-border">
            <div
              className={cn("h-full rounded-[2px]", index === bars.length - 1 ? "bg-accent" : "bg-sub")}
              style={{ width: widthFor(bar.value) }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
