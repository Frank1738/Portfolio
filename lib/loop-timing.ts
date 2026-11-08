import type { CSSProperties } from "react";

/**
 * Timing for the 7s product-screen loops (README → "Project images").
 *
 * Each animated element enters at its own fraction of the cycle, holds, and fades out
 * with everything else from 93%. CSS keyframe offsets can't vary per element, so the
 * keyframes in globals.css run 0 → 1 and each element's timing is a `linear()` easing,
 * passed in through CSS variables. The curves sample the prototype's easings.
 */

const LOOP_END = 0.93;
const ENTRY_SAMPLES = 8;
const EXIT_SAMPLES = 6;

/** Solves a CSS `cubic-bezier()` for y at a given x. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const axis = (p1: number, p2: number) => (t: number) => 3 * p1 * t * (1 - t) ** 2 + 3 * p2 * t ** 2 * (1 - t) + t ** 3;
  const x = axis(x1, x2);
  const y = axis(y1, y2);

  return (target: number) => {
    // Bisection: x(t) is monotonic for valid CSS beziers, and 20 steps is well below a pixel.
    let low = 0;
    let high = 1;
    for (let step = 0; step < 20; step++) {
      const mid = (low + high) / 2;
      if (x(mid) < target) low = mid;
      else high = mid;
    }
    return y((low + high) / 2);
  };
}

const easeEnter = cubicBezier(0.2, 0.7, 0.2, 1);
const easeIn = cubicBezier(0.42, 0, 1, 1);

type Stop = [value: number, at: number];

function sample(ease: (x: number) => number, from: number, to: number, start: number, end: number, count: number) {
  return Array.from({ length: count }, (_, index): Stop => {
    const x = (index + 1) / count;
    return [from + (to - from) * ease(x), start + (end - start) * x];
  });
}

function toLinear(stops: Stop[]) {
  const round = (value: number, digits: number) => Number(value.toFixed(digits));
  return `linear(${stops.map(([value, at]) => `${round(value, 3)} ${round(at * 100, 2)}%`).join(",")})`;
}

/** The entry window, clamped like the prototype so late entries still finish before the fade. */
function entryWindow(at: number, length: number) {
  const start = Math.min(at, 0.85);
  return { start, end: Math.min(start + length, 0.9) };
}

export type LoopStyle = CSSProperties & Record<`--loop-${string}`, string>;

/**
 * Per-element loop timing: `at` is the entry point as a fraction of the 7s cycle and
 * `length` the entry duration (0.06 for fades, 0.1 for bar growth).
 * Sets `--loop-enter` (enter, then hold) and `--loop-fade` (enter, hold, fade out at 93%).
 */
export function loopAt(at: number, length = 0.06): LoopStyle {
  const { start, end } = entryWindow(at, length);
  const entry: Stop[] = [[0, 0], [0, start], ...sample(easeEnter, 0, 1, start, end, ENTRY_SAMPLES)];

  return {
    "--loop-enter": toLinear([...entry, [1, 1]]),
    "--loop-fade": toLinear([...entry, [1, LOOP_END], ...sample(easeIn, 1, 0, LOOP_END, 1, EXIT_SAMPLES)]),
  };
}
