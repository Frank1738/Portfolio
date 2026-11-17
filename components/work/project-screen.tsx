import {
  ActivityIcon,
  BinocularsIcon,
  FileSearchIcon,
  LockIcon,
  SendIcon,
  WorkflowIcon,
} from "@/components/icons";
import { PauseOffscreen } from "@/components/pause-offscreen";
import { DevsweepMark, glyphMark, SentoffMark } from "@/components/work/app-marks";
import { LockedScreen } from "@/components/work/locked-screen";
import { DevsweepScreen } from "@/components/work/screens/devsweep-screen";
import { FlowpilotScreen } from "@/components/work/screens/flowpilot-screen";
import { LedgerlensScreen } from "@/components/work/screens/ledgerlens-screen";
import { PulseScreen } from "@/components/work/screens/pulse-screen";
import { RelayScreen } from "@/components/work/screens/relay-screen";
import { ScoutScreen } from "@/components/work/screens/scout-screen";
import { SentoffScreen } from "@/components/work/screens/sentoff-screen";
import { cn } from "@/lib/utils";
import type { CaseStudySlug, CaseStudyStatus } from "@/lib/work";

type ProjectScreenProps = {
  kind: CaseStudySlug;
  /** `planned`: the screen is locked (LockedScreen), with a padlock in place of the title bar's meta. */
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
  // A 16:10 screenshot: a narrower, vertically centred window shows it whole inside the 16:9 frame.
  sentoff: {
    name: "Sent Off",
    meta: "League 1500 · GW10",
    Mark: SentoffMark,
    Body: SentoffScreen,
    frame: "inset-x-[17%] top-1/2 -translate-y-1/2",
  },
  devsweep: { name: "devsweep", meta: "Terminal", Mark: DevsweepMark, Body: DevsweepScreen },
  relay: { name: "Relay", meta: "Inbox · 128 open", Mark: glyphMark(SendIcon), Body: RelayScreen },
  ledgerlens: { name: "Ledgerlens", meta: "40,214 docs", Mark: glyphMark(FileSearchIcon), Body: LedgerlensScreen },
  flowpilot: { name: "Flowpilot", meta: "Run #8812", Mark: glyphMark(WorkflowIcon), Body: FlowpilotScreen },
  scout: { name: "Scout", meta: "Gameweek 8", Mark: glyphMark(BinocularsIcon), Body: ScoutScreen },
  pulse: { name: "Pulse", meta: "Last 7 days", Mark: glyphMark(ActivityIcon), Body: PulseScreen },
} satisfies Record<
  CaseStudySlug,
  {
    name: string;
    meta: string;
    Mark: () => React.ReactNode;
    Body: () => React.ReactNode;
    /** Window position override; defaults to `inset-x-[8%] top-[9%]`. */
    frame?: string;
  }
>;

/**
 * A 16:9 mock product window drawn in HTML/CSS, playing a 7s CSS loop (paused off-screen,
 * final frame under reduced motion), or holding a real screenshot (Sent Off). Everything inside is sized in `em` against an
 * inline-size container (font-size 84cqw / 70 = 1.2cqw), so the UI scales with the frame.
 */
export function ProjectScreen({ kind, status = "live", label, className }: ProjectScreenProps) {
  const screen = screens[kind];
  const { name, meta, Mark, Body } = screen;
  const frame = "frame" in screen ? screen.frame : "inset-x-[8%] top-[9%]";
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  const locked = status === "planned";

  return (
    <PauseOffscreen
      {...a11y}
      className={cn("@container relative aspect-video w-full overflow-hidden bg-tile", className)}
    >
      <div
        className={cn(
          "absolute overflow-hidden rounded-[.9em] border border-border bg-bg font-sans text-[1.2cqw] leading-[1.45] text-body shadow-[0_.6em_2.4em_rgba(0,0,0,.06)]",
          frame,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-[1.4em] py-[1em]">
          <div className="flex items-center gap-[.7em]">
            <Mark />
            <span className="text-[1.15em] font-medium text-ink">{name}</span>
          </div>
          {locked ? (
            <LockIcon className="size-[1.2em] text-sub" strokeWidth={2} />
          ) : (
            <span className="font-mono text-[.95em] text-sub">{meta}</span>
          )}
        </div>
        {locked ? (
          <LockedScreen>
            <Body />
          </LockedScreen>
        ) : (
          <Body />
        )}
      </div>
    </PauseOffscreen>
  );
}
