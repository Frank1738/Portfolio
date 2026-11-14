import {
  ActivityIcon,
  BinocularsIcon,
  BroomIcon,
  FileSearchIcon,
  SendIcon,
  WorkflowIcon,
  type IconProps,
} from "@/components/icons";
import { PauseOffscreen } from "@/components/pause-offscreen";
import { InDevScreen, inDevBuild, inDevPhase } from "@/components/work/in-dev-screen";
import { DevsweepScreen } from "@/components/work/screens/devsweep-screen";
import { FlowpilotScreen } from "@/components/work/screens/flowpilot-screen";
import { LedgerlensScreen } from "@/components/work/screens/ledgerlens-screen";
import { PulseScreen } from "@/components/work/screens/pulse-screen";
import { RelayScreen } from "@/components/work/screens/relay-screen";
import { ScoutScreen } from "@/components/work/screens/scout-screen";
import { cn } from "@/lib/utils";
import type { CaseStudySlug, CaseStudyStatus } from "@/lib/work";

type ProjectScreenProps = {
  kind: CaseStudySlug;
  /** `planned`: the screen is still being built (InDevScreen), with a progress bar in the title bar. */
  status?: CaseStudyStatus;
  /**
   * Accessible name when the screen stands alone (case-study hero). Omit it inside a
   * link or card that already names the project: the screen is then hidden from
   * assistive tech so its mock text doesn't leak into the link name.
   */
  label?: string;
  className?: string;
};

const screens = {
  devsweep: { name: "devsweep", meta: "Terminal", Icon: BroomIcon, Body: DevsweepScreen },
  relay: { name: "Relay", meta: "Inbox · 128 open", Icon: SendIcon, Body: RelayScreen },
  ledgerlens: { name: "Ledgerlens", meta: "40,214 docs", Icon: FileSearchIcon, Body: LedgerlensScreen },
  flowpilot: { name: "Flowpilot", meta: "Run #8812", Icon: WorkflowIcon, Body: FlowpilotScreen },
  scout: { name: "Scout", meta: "Gameweek 8", Icon: BinocularsIcon, Body: ScoutScreen },
  pulse: { name: "Pulse", meta: "Last 7 days", Icon: ActivityIcon, Body: PulseScreen },
} satisfies Record<
  CaseStudySlug,
  { name: string; meta: string; Icon: (props: IconProps) => React.ReactNode; Body: () => React.ReactNode }
>;

/**
 * A 16:9 mock product window drawn in HTML/CSS, playing a 7s CSS loop (paused off-screen,
 * final frame under reduced motion). Everything inside is sized in `em` against an
 * inline-size container (font-size 84cqw / 70 = 1.2cqw), so the UI scales with the frame.
 */
export function ProjectScreen({ kind, status = "live", label, className }: ProjectScreenProps) {
  const { name, meta, Icon, Body } = screens[kind];
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  const building = status === "planned";

  return (
    <PauseOffscreen
      {...a11y}
      style={building ? inDevPhase(kind) : undefined}
      className={cn("@container relative aspect-video w-full overflow-hidden bg-tile", className)}
    >
      <div className="absolute inset-x-[8%] top-[9%] overflow-hidden rounded-[.9em] border border-border bg-bg font-sans text-[1.2cqw] leading-[1.45] text-body shadow-[0_.6em_2.4em_rgba(0,0,0,.06)]">
        <div className="flex items-center justify-between border-b border-border px-[1.4em] py-[1em]">
          <div className="flex items-center gap-[.7em]">
            {/* The project's app icon: its glyph on an ink tile. */}
            <span className="grid size-[1.4em] place-items-center rounded-[.35em] bg-ink text-bg">
              <Icon className="size-[1em]" strokeWidth={2.25} />
            </span>
            <span className="text-[1.15em] font-medium text-ink">{name}</span>
          </div>
          {building ? (
            // Build progress: follows the edge in the screen below.
            <span className="relative h-[.45em] w-[7em] overflow-hidden rounded-full bg-border">
              <span
                className="loop-grow-x absolute inset-0 origin-left scale-x-[var(--loop-final)] bg-accent"
                style={inDevBuild}
              />
            </span>
          ) : (
            <span className="font-mono text-[.95em] text-sub">{meta}</span>
          )}
        </div>
        {building ? (
          <InDevScreen>
            <Body />
          </InDevScreen>
        ) : (
          <Body />
        )}
      </div>
    </PauseOffscreen>
  );
}
