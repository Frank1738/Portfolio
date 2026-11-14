import { useId } from "react";

import { loopSteps } from "@/lib/loop-timing";

/*
 * devsweep's start-up banner, ported from its src/ui/banner.ts: "DEVSWEEP" in ANSI Shadow block
 * letters over a seeded starfield. Geist Mono has no block or box-drawing glyphs, so the letters
 * are drawn as shapes on the character grid, the way devsweep's own README pictures are.
 */

/** Block letters. The box-drawing strokes form the shadow. */
const LETTERS = {
  D: ["██████╗ ", "██╔══██╗", "██║  ██║", "██║  ██║", "██████╔╝", "╚═════╝ "],
  E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
  V: ["██╗   ██╗", "██║   ██║", "██║   ██║", "╚██╗ ██╔╝", " ╚████╔╝ ", "  ╚═══╝  "],
  S: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
  W: ["██╗    ██╗", "██║    ██║", "██║ █╗ ██║", "██║███╗██║", "╚███╔███╔╝", " ╚══╝╚══╝ "],
  P: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔═══╝ ", "██║     ", "╚═╝     "],
} as const;

const WORD = ["D", "E", "V", "S", "W", "E", "E", "P"] as const;
const ART = [0, 1, 2, 3, 4, 5].map((row) => WORD.map((letter) => LETTERS[letter][row]).join(""));
const ART_WIDTH = ART[0].length;

/** The canvas: the word indented, with open sky above, below and to its right. */
const INDENT = 2;
const SKY_ABOVE = 2;
const SKY_BELOW = 1;
const ROWS = SKY_ABOVE + ART.length + SKY_BELOW;
const COLUMNS = INDENT + ART_WIDTH + 16;

/**
 * One character cell in SVG units. Geist Mono's advance is 0.6em and the terminal's line
 * height 1.2em, so at a width of COLUMNS `ch` the cells sit exactly on the text grid.
 */
const CW = 6;
const CH = 12;
/** Half the gap between the two strokes of a double box-drawing line. */
const GAP = 1.2;
/** Columns of glow riding behind the sweep's edge, like the bright last columns in the terminal. */
const GLOW = 3;

/** Sweep length as a fraction of the 7s cycle (devsweep's is 320ms), drawn in terminal frames. */
const SWEEP = 0.05;
const SWEEP_FRAMES = 20;

const round = (value: number) => Math.round(value * 100) / 100;
const polyline = (points: number[]) =>
  points.map((value, index) => `${index === 0 ? "M" : index % 2 === 0 ? "L" : " "}${round(value)}`).join("");

/** Each double-line corner and upright as polylines through its cell, so neighbours join exactly. */
function boxStrokes(char: string, x: number, y: number): number[][] {
  const [l, r, t, b, cx, cy] = [x, x + CW, y, y + CH, x + CW / 2, y + CH / 2];
  switch (char) {
    case "║":
      return [
        [cx - GAP, t, cx - GAP, b],
        [cx + GAP, t, cx + GAP, b],
      ];
    case "╔":
      return [
        [r, cy - GAP, cx - GAP, cy - GAP, cx - GAP, b],
        [r, cy + GAP, cx + GAP, cy + GAP, cx + GAP, b],
      ];
    case "╗":
      return [
        [l, cy - GAP, cx + GAP, cy - GAP, cx + GAP, b],
        [l, cy + GAP, cx - GAP, cy + GAP, cx - GAP, b],
      ];
    case "╚":
      return [
        [cx - GAP, t, cx - GAP, cy + GAP, r, cy + GAP],
        [cx + GAP, t, cx + GAP, cy - GAP, r, cy - GAP],
      ];
    case "╝":
      return [
        [cx + GAP, t, cx + GAP, cy + GAP, l, cy + GAP],
        [cx - GAP, t, cx - GAP, cy - GAP, l, cy - GAP],
      ];
    default:
      return [];
  }
}

/** The letters as two paths: solid blocks (runs of █ per row) and shadow strokes (runs of ═ joined). */
const word = (() => {
  let blocks = "";
  let strokes = "";
  ART.forEach((line, artRow) => {
    const chars = [...line];
    const y = (SKY_ABOVE + artRow) * CH;
    for (let col = 0; col < chars.length; ) {
      const char = chars[col];
      const x = (INDENT + col) * CW;
      let end = col + 1;
      while (end < chars.length && chars[end] === char && (char === "█" || char === "═")) end++;
      const width = (end - col) * CW;
      if (char === "█") blocks += `M${x} ${y}h${width}v${CH}h${-width}z`;
      else if (char === "═") strokes += polyline([x, y + CH / 2 - GAP, x + width, y + CH / 2 - GAP]) + polyline([x, y + CH / 2 + GAP, x + width, y + CH / 2 + GAP]);
      else strokes += boxStrokes(char, x, y).map(polyline).join("");
      col = end;
    }
  });
  return { blocks, strokes };
})();

/**
 * Lit from the top left, as in the terminal: brightness falls 55% down the rows and 45% across
 * the columns. The gradient runs along that direction, from full ink to the dim end.
 */
const light = (() => {
  const x = INDENT * CW;
  const y = SKY_ABOVE * CH;
  const dx = 0.45 / ((ART_WIDTH - 1) * CW);
  const dy = 0.55 / ((ART.length - 1) * CH);
  const length = dx * dx + dy * dy;
  return { x1: x, y1: y, x2: round(x + dx / length), y2: round(y + dy / length) };
})();

type StarTone = "faint" | "mid" | "bright" | "blue" | "lavender";

/** devsweep's star shades (dim, mid and bright grays, a few pale blue and lavender) in tokens. */
const starTones: Record<StarTone, string> = {
  faint: "fill-sub/40",
  mid: "fill-sub/80",
  bright: "fill-ink/85",
  blue: "fill-sk-be/60",
  lavender: "fill-sk-ai/45",
};

/** devsweep's seeded random number generator, so the sky matches its own. */
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The starfield, placed exactly as devsweep places it: denser along a diagonal band, never next
 * to a letter or another star. Grouped by tone, as circles: `·` centred, `.` on the baseline.
 */
const stars = (() => {
  const random = mulberry32(0x5eed);
  const placed = new Set<string>();
  const byTone = new Map<StarTone, { cx: number; cy: number; r: number }[]>();
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      // Four draws for every cell, kept or not, so the layout matches devsweep's.
      const [place, kind, look] = [random(), random(), random(), random()];
      const artRow = row - SKY_ABOVE;
      const inWord = artRow >= 0 && artRow < ART.length && col >= INDENT - 1 && col <= INDENT + ART_WIDTH;
      if (inWord || placed.has(`${row}:${col - 1}`)) continue;

      const armRow = (ROWS - 1) * (1 - col / (COLUMNS - 1));
      const distance = row - armRow;
      if (place >= 0.06 + 0.2 * Math.exp(-(distance * distance) / 2)) continue;

      placed.add(`${row}:${col}`);
      const tone: StarTone =
        kind < 0.62 ? "faint" : kind < 0.88 ? "mid" : kind < 0.95 ? "bright" : look < 0.5 ? "blue" : "lavender";
      const big = kind >= 0.88 || look >= 0.5;
      const star = {
        cx: col * CW + CW / 2,
        cy: round(row * CH + (big ? CH / 2 : 8.1)),
        r: big ? 0.78 : 0.57,
      };
      byTone.set(tone, [...(byTone.get(tone) ?? []), star]);
    }
  }
  return [...byTone];
})();

/**
 * The banner as devsweep plays it once the command runs (`at`): the stars appear, then the word
 * sweeps in from the left, frame by frame, behind a glow. Sized in `ch`/`lh` of the terminal text;
 * the class sizes are the constants above (Tailwind needs them literal): COLUMNS 85, INDENT 2,
 * SKY_ABOVE 2, six art rows, ART_WIDTH 67, GLOW 3.
 */
export function DevsweepBanner({ at }: { at: number }) {
  const gradient = useId();
  const sweep = loopSteps(at, SWEEP, SWEEP_FRAMES);

  return (
    // Hidden until the command runs: before the sweep, rounding can leave a hairline of the word showing.
    <div className="loop-in relative w-[85ch]" style={loopSteps(at)}>
      <svg viewBox={`0 0 ${COLUMNS * CW} ${ROWS * CH}`} className="block w-full">
        {stars.map(([tone, list]) => (
          <g key={tone} className={starTones[tone]}>
            {list.map((star) => (
              <circle key={`${star.cx}:${star.cy}`} {...star} />
            ))}
          </g>
        ))}
      </svg>

      {/*
       * The word's box clips the sweep. The sweep box (loop-wipe) is GLOW columns wider than the
       * word, so its glow, on its leading edge, starts and ends outside the box.
       */}
      <div className="absolute top-[2lh] left-[2ch] h-[6lh] w-[67ch] overflow-hidden">
        <div className="loop-wipe relative w-[70ch]" style={sweep}>
          <svg
            viewBox={`${INDENT * CW} ${SKY_ABOVE * CH} ${(ART_WIDTH + GLOW) * CW} ${ART.length * CH}`}
            className="loop-unwipe block w-full"
          >
            <defs>
              <linearGradient id={gradient} gradientUnits="userSpaceOnUse" {...light}>
                <stop offset="0" className="[stop-color:var(--ink)]" />
                <stop offset="1" className="[stop-color:var(--sub)]" />
              </linearGradient>
            </defs>
            <path d={word.blocks} fill={`url(#${gradient})`} />
            <path d={word.strokes} className="fill-none stroke-sub/55" strokeWidth={0.8} />
          </svg>
          <span className="absolute inset-y-0 right-0 w-[3ch] bg-linear-to-r from-transparent to-ink/25" />
        </div>
      </div>
    </div>
  );
}
