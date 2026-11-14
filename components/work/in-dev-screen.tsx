import { PointerIcon } from "@/components/icons";
import { loopPhase, loopProgress, type LoopMove, type LoopStyle } from "@/lib/loop-timing";
import { cn } from "@/lib/utils";
import { getCaseStudies, getWorkIndex, isCaseStudyLive, type CaseStudySlug } from "@/lib/work";

/*
 * The build, as fractions of the 7s cycle: the cursor drags the edge across in fits and starts,
 * pulls it back once (a revert), and lets go short of the end. It never finishes.
 */
const moves: LoopMove[] = [
  { at: 0.05, until: 0.17, to: 0.3 },
  { at: 0.24, until: 0.34, to: 0.52 },
  { at: 0.42, until: 0.5, to: 0.6 },
  { at: 0.56, until: 0.67, to: 0.8 },
  { at: 0.74, until: 0.8, to: 0.67 },
];

/** Timing of the build edge, for everything that follows it: the reveal, the cursor, the title bar's progress bar. */
export const inDevBuild: LoopStyle = loopProgress(moves);

/** Where in the cycle a planned project's screen starts, spread evenly so planned cards side by side aren't in step. */
export function inDevPhase(kind: CaseStudySlug): LoopStyle {
  const planned = getCaseStudies().filter((study) => !isCaseStudyLive(study));
  const index = planned.findIndex((study) => study.slug === kind);
  return loopPhase(Math.max(index, 0) / Math.max(planned.length, 1));
}

/** Static frame of the build edge (reduced motion): the box sits where the progress ends. */
const atFinal = "translate-x-[calc(var(--loop-final)*100%_-_100%)]";

/**
 * A planned project's screen, half built: its UI up to the build edge, and past it the same
 * screen as a blueprint (`wireframe`). A cursor tagged "in dev" drags the edge across, so the
 * project reads as unfinished at a glance. `children` is the project's screen, drawn twice.
 */
export function InDevScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="wireframe">{children}</div>

      {/* The built part: the same screen, uncovered from the left up to the edge. */}
      <div className={cn("loop-wipe absolute inset-0 bg-bg", atFinal)} style={inDevBuild}>
        <div
          className="loop-unwipe translate-x-[calc(100%_-_var(--loop-final)*100%)]"
          style={inDevBuild}
        >
          {children}
        </div>
      </div>

      {/* The edge, a glow on its built side, and the cursor dragging it. */}
      <div className={cn("loop-slide pointer-events-none absolute inset-0", atFinal)} style={inDevBuild}>
        <span className="absolute inset-y-0 right-0 w-[6em] bg-linear-to-l from-accent/12 to-transparent" />
        <span className="absolute inset-y-0 right-0 w-[.15em] bg-accent" />
        <span className="absolute top-[38%] left-full">
          {/* Lucide's tip is at (4, 4.2) of 24: shift it onto the edge. */}
          <PointerIcon
            className="loop-press -mt-[.4em] -ml-[.37em] size-[2.3em] origin-[17%_18%] fill-ink stroke-bg"
            strokeWidth={1.75}
            style={inDevBuild}
          />
          <span className="absolute top-[1.9em] left-[1.5em] rounded-[.35em] bg-accent px-[.5em] py-[.1em] font-mono text-[1.4em] whitespace-nowrap text-bg">
            {getWorkIndex().buildLabel}
          </span>
        </span>
      </div>
    </div>
  );
}
