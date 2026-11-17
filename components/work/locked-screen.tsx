import { LockIcon } from "@/components/icons";
import { getWorkIndex } from "@/lib/work";

/**
 * A planned project's screen, locked: its own UI frozen on the final frame (no loop), blurred
 * and greyed behind frosted glass, with a padlock plate on top. The project reads as real but
 * not open yet. Hovering the card (or home tile) tugs the shackle. `children` is the screen.
 */
export function LockedScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="opacity-60 blur-[.35em] saturate-0 select-none [&_*]:animate-none!">{children}</div>

      <div className="absolute inset-0 grid place-items-center bg-bg/30">
        <div className="flex flex-col items-center gap-[.9em]">
          <span className="grid size-[4.4em] place-items-center rounded-full border border-border bg-bg text-ink shadow-[0_.5em_1.6em_rgba(0,0,0,.08)]">
            <LockIcon
              className="size-[2em] group-hover/card:[&_[data-shackle]]:lock-tug group-hover/tile:[&_[data-shackle]]:lock-tug"
              strokeWidth={1.75}
            />
          </span>
          <span className="rounded-full border border-border bg-bg px-[.9em] py-[.25em] font-mono text-[1.05em] tracking-label text-sub uppercase">
            {getWorkIndex().lockedLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
