import { loopAt } from "@/lib/loop-timing";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Quality", value: "0.87", change: "+0.03", at: 0.04 },
  { label: "Cost", value: "£1,240/d", change: "−8%", at: 0.09 },
  { label: "p95 latency", value: "1.8s", change: "−0.2s", at: 0.14 },
];

const features = [
  { name: "Relay drafts", volume: "1.4M", score: "0.91", at: 0.5 },
  { name: "Ledgerlens answers", volume: "620k", score: "0.88", at: 0.55 },
  { name: "Doc summaries", volume: "410k", score: "0.79 ↓", at: 0.6, regressed: true },
];

const baseline = "0,40 50,44 100,41 150,47 200,50 250,48 300,56 350,58 400,61 450,60 500,66 550,68 600,70";
const quality = "0,62 50,58 100,64 150,55 200,57 250,49 300,52 350,44 400,47 450,38 500,40 550,33 600,30";

/** Pulse: metric tiles, a trend chart that draws in, and a per-feature table. */
export function PulseScreen() {
  const draw = loopAt(0.18, 0.28);

  return (
    <div className="box-content flex min-h-[28em] flex-col gap-[1.1em] px-[1.8em] pt-[1.4em] pb-[2.4em]">
      <div className="grid grid-cols-3 gap-[.8em]">
        {metrics.map((metric) => (
          <div key={metric.label} className="loop-in rounded-[.6em] border border-border px-[1em] py-[.8em]" style={loopAt(metric.at)}>
            <div className="font-mono text-[.8em] text-sub">{metric.label}</div>
            <div className="text-[1.6em] font-medium text-ink">{metric.value}</div>
            <div className="font-mono text-[.8em] text-accent">{metric.change}</div>
          </div>
        ))}
      </div>
      <div className="relative h-[7em]">
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <path
            d="M0 25H600M0 50H600M0 75H600"
            stroke="var(--border)"
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="loop-wipe absolute inset-0" style={draw}>
          <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="loop-unwipe block size-full" style={draw}>
            <polyline
              points={baseline}
              fill="none"
              stroke="var(--sub)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={quality}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col text-[.95em]">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="loop-in grid grid-cols-[1fr_6em_4em] border-t border-border py-[.5em]"
            style={loopAt(feature.at)}
          >
            <span className="text-ink">{feature.name}</span>
            <span className="font-mono text-sub">{feature.volume}</span>
            <span className={cn("text-right font-mono", feature.regressed ? "text-accent" : "text-ink")}>
              {feature.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
