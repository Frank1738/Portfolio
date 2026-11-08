import { loopAt } from "@/lib/loop-timing";
import { cn } from "@/lib/utils";

/** Win / draw / loss segments; widths are the probabilities. */
const outcomes = [
  { key: "home", width: "w-[54%]", tone: "bg-accent", at: 0.12 },
  { key: "draw", width: "w-[24%]", tone: "bg-border-hover", at: 0.2 },
  { key: "away", width: "w-[22%]", tone: "bg-sub", at: 0.26 },
];

const form = [
  { team: "ARS xG, last 6", bars: ["h-[62%]", "h-[88%]", "h-[45%]", "h-[70%]", "h-[96%]", "h-[58%]"], tone: "bg-ink", at: 0.36 },
  { team: "TOT xG, last 6", bars: ["h-[50%]", "h-[34%]", "h-[72%]", "h-[40%]", "h-[55%]", "h-[30%]"], tone: "bg-sub", at: 0.42 },
];

/** Scout: a match preview whose probability bar and xG form bars grow in. */
export function ScoutScreen() {
  return (
    <div className="box-content flex min-h-[28em] flex-col gap-[1.4em] px-[2.6em] pt-[1.8em] pb-[2.4em]">
      <div className="flex flex-col items-center gap-[.2em]">
        <span className="font-mono text-[.85em] text-sub">Sat 15:00 · Emirates Stadium</span>
        <span className="text-[1.8em] font-medium tracking-[-.02em] text-ink">Arsenal v Tottenham</span>
      </div>
      <div className="flex flex-col gap-[.5em]">
        <div className="flex h-[1em] gap-0.5 overflow-hidden rounded-[.3em]">
          {outcomes.map((outcome) => (
            <span
              key={outcome.key}
              className={cn("loop-grow-x origin-left", outcome.width, outcome.tone)}
              style={loopAt(outcome.at, 0.1)}
            />
          ))}
        </div>
        <div className="loop-in flex justify-between font-mono text-[.9em] text-sub" style={loopAt(0.32)}>
          <span>Home 54%</span>
          <span>Draw 24%</span>
          <span>Away 22%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[2em]">
        {form.map((team) => (
          <div key={team.team} className="flex flex-col gap-[.5em]">
            <span className="font-mono text-[.85em] text-sub">{team.team}</span>
            <div className="loop-grow-y flex h-[4.5em] origin-bottom items-end gap-[.4em]" style={loopAt(team.at, 0.1)}>
              {team.bars.map((height) => (
                <span key={height} className={cn("flex-1 rounded-[.2em]", height, team.tone)} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="loop-in font-mono text-[.85em] text-sub" style={loopAt(0.55)}>
        Line-ups confirmed 14:00 · Saka starts · home +3%
      </div>
    </div>
  );
}
