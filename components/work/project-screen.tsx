import { PauseOffscreen } from "@/components/pause-offscreen";
import { FlowpilotScreen } from "@/components/work/screens/flowpilot-screen";
import { LedgerlensScreen } from "@/components/work/screens/ledgerlens-screen";
import { PulseScreen } from "@/components/work/screens/pulse-screen";
import { RelayScreen } from "@/components/work/screens/relay-screen";
import { ScoutScreen } from "@/components/work/screens/scout-screen";
import { cn } from "@/lib/utils";
import type { CaseStudySlug } from "@/lib/work";

type ProjectScreenProps = {
  kind: CaseStudySlug;
  /**
   * Accessible name when the screen stands alone (case-study hero). Omit it inside a
   * link or card that already names the project: the screen is then hidden from
   * assistive tech so its mock text doesn't leak into the link name.
   */
  label?: string;
  className?: string;
};

const screens = {
  relay: { name: "Relay", meta: "Inbox · 128 open", Body: RelayScreen },
  ledgerlens: { name: "Ledgerlens", meta: "40,214 docs", Body: LedgerlensScreen },
  flowpilot: { name: "Flowpilot", meta: "Run #8812", Body: FlowpilotScreen },
  scout: { name: "Scout", meta: "Gameweek 8", Body: ScoutScreen },
  pulse: { name: "Pulse", meta: "Last 7 days", Body: PulseScreen },
} satisfies Record<CaseStudySlug, { name: string; meta: string; Body: () => React.ReactNode }>;

/**
 * A 16:9 mock product window drawn in HTML/CSS, playing a 7s CSS loop (paused off-screen,
 * final frame under reduced motion). Everything inside is sized in `em` against an
 * inline-size container (font-size 84cqw / 70 = 1.2cqw), so the UI scales with the frame.
 */
export function ProjectScreen({ kind, label, className }: ProjectScreenProps) {
  const { name, meta, Body } = screens[kind];
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  return (
    <PauseOffscreen
      {...a11y}
      className={cn("@container relative aspect-video w-full overflow-hidden bg-tile", className)}
    >
      <div className="absolute inset-x-[8%] top-[9%] overflow-hidden rounded-[.9em] border border-border bg-bg font-sans text-[1.2cqw] leading-[1.45] text-body shadow-[0_.6em_2.4em_rgba(0,0,0,.06)]">
        <div className="flex items-center justify-between border-b border-border px-[1.4em] py-[1em]">
          <div className="flex items-center gap-[.7em]">
            <span className="size-[1.1em] rounded-[.3em] bg-ink" />
            <span className="text-[1.15em] font-medium text-ink">{name}</span>
          </div>
          <span className="font-mono text-[.95em] text-sub">{meta}</span>
        </div>
        <Body />
      </div>
    </PauseOffscreen>
  );
}
