import type { IconProps } from "@/components/icons";

/**
 * App icons for the mock window's title bar, sized in `em` against the window's font size.
 * Live projects use their real mark; planned ones a plain glyph on an ink tile.
 */

const tile = "grid size-[1.4em] shrink-0 place-items-center rounded-[.35em]";

/** Sent Off's own app icon (sentoff/components/red-card-icon.tsx): a tilted red card on its dark green. */
export function SentoffMark() {
  return (
    <span className={tile} style={{ background: "#0f1612" }}>
      <span
        className="block h-[.86em] w-[.6em] -rotate-12 rounded-[.09em]"
        style={{ background: "#ff4b3e" }}
      />
    </span>
  );
}

/** devsweep is a CLI, so its mark is a shell prompt. */
export function DevsweepMark() {
  return (
    <span className={`${tile} bg-ink font-mono text-[1em] leading-none font-medium text-bg`}>
      <span className="text-[.62em] tracking-[-.04em]">&gt;_</span>
    </span>
  );
}

/** A planned project's placeholder: its glyph on an ink tile. */
export function glyphMark(Icon: (props: IconProps) => React.ReactNode) {
  return function GlyphMark() {
    return (
      <span className={`${tile} bg-ink text-bg`}>
        <Icon className="size-[1em]" strokeWidth={2.25} />
      </span>
    );
  };
}
