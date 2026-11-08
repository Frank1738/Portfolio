type Series = {
  name: string;
  values: readonly number[];
};

type BrierChartProps = {
  /** The model's rolling Brier score: solid accent line. */
  model: Series;
  /** The benchmark's: grey dashed line. */
  benchmark: Series;
  /** Start, middle and end of the x axis. */
  xLabels: readonly [string, string, string];
  /** Accessible description of what the chart shows. */
  label: string;
};

// Plot geometry in viewBox units (520×200), from the prototype.
const domain = { min: 0.185, max: 0.225 };
const plot = { left: 36, right: 510, top: 12, bottom: 170 };
const yTicks = [0.19, 0.2, 0.21, 0.22];
const xLabelPositions = [36, 248, 482];

function yFor(value: number) {
  return plot.bottom - ((value - domain.min) / (domain.max - domain.min)) * (plot.bottom - plot.top);
}

/** Gridline y, rounded so float noise (110.74999…) stays out of the markup. */
function tickY(tick: number) {
  return Math.round(yFor(tick) * 100) / 100;
}

function linePath(values: readonly number[]) {
  const step = (plot.right - plot.left) / (values.length - 1);
  return values
    .map((value, index) => `${index ? "L" : "M"}${(plot.left + index * step).toFixed(1)} ${yFor(value).toFixed(1)}`)
    .join(" ");
}

/** Post 0003's figure: rolling Brier score, model against benchmark, y range .185–.225. */
export function BrierChart({ model, benchmark, xLabels, label }: BrierChartProps) {
  return (
    <div role="img" aria-label={label}>
      <div className="mb-2 flex gap-4 font-mono text-2xs text-sub">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-3.5 bg-accent" />
          {model.name}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 border-t-[1.5px] border-dashed border-sub" />
          {benchmark.name}
        </span>
      </div>
      <svg viewBox="0 0 520 200" focusable="false" className="block h-auto w-full font-mono">
        <path
          d={yTicks.map((tick) => `M${plot.left} ${tickY(tick)}H${plot.right}`).join("")}
          className="stroke-border"
          strokeWidth={1}
          fill="none"
        />
        {yTicks.map((tick) => (
          <text key={tick} x={0} y={tickY(tick) + 3.75} fontSize={10} className="fill-sub">
            {tick.toFixed(3).slice(1)}
          </text>
        ))}
        {xLabels.map((text, index) => (
          <text key={text} x={xLabelPositions[index]} y={190} fontSize={10} className="fill-sub">
            {text}
          </text>
        ))}
        <path
          d={linePath(benchmark.values)}
          className="stroke-sub"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="none"
        />
        <path
          d={linePath(model.values)}
          className="stroke-accent"
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
