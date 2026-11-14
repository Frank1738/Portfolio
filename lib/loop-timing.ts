import type { CSSProperties } from "react";

/**
 * Timing for the 7s product-screen loops (README → "Project images").
 *
 * Each animated element enters at its own fraction of the cycle, holds, and fades out
 * with everything else from 93%. CSS keyframe offsets can't vary per element, so the
 * keyframes in globals.css run 0 → 1 and each element's timing is a `linear()` easing,
 * passed in through CSS variables. The curves sample the prototype's easings.
 */

const LOOP_SECONDS = 7;
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
/** A hand dragging something: eases in and out (--ease-shimmer). */
const easeDrag = cubicBezier(0.45, 0, 0.25, 1);

/** A `linear()` stop: the value at `at`, or held from `at` to `until`. */
type Stop = [value: number, at: number, until?: number];

function sample(ease: (x: number) => number, from: number, to: number, start: number, end: number, count: number) {
  return Array.from({ length: count }, (_, index): Stop => {
    const x = (index + 1) / count;
    return [from + (to - from) * ease(x), start + (end - start) * x];
  });
}

function toLinear(stops: Stop[]) {
  const round = (value: number, digits: number) => Number(value.toFixed(digits));
  const percent = (at: number) => `${round(at * 100, 2)}%`;
  const stop = ([value, at, until]: Stop) =>
    `${round(value, 3)} ${percent(at)}${until === undefined ? "" : ` ${percent(until)}`}`;
  return `linear(${stops.map(stop).join(",")})`;
}

const exit = sample(easeIn, 1, 0, LOOP_END, 1, EXIT_SAMPLES);

/** The entry window, clamped like the prototype so late entries still finish before the fade. */
function entryWindow(at: number, length: number) {
  const start = Math.min(at, 0.85);
  return { start, end: Math.min(start + length, 0.9) };
}

export type LoopStyle = CSSProperties & Record<`--loop-${string}`, string>;

/** `--loop-enter` (enter, then hold) and `--loop-fade` (enter, hold, fade out at 93%) for an entry that ends at 1. */
function toLoopStyle(entry: Stop[]): LoopStyle {
  return {
    "--loop-enter": toLinear([...entry, [1, 1]]),
    "--loop-fade": toLinear([...entry, [1, LOOP_END], ...exit]),
  };
}

/**
 * Per-element loop timing: `at` is the entry point as a fraction of the 7s cycle and
 * `length` the entry duration (0.06 for fades, 0.1 for bar growth).
 */
export function loopAt(at: number, length = 0.06): LoopStyle {
  const { start, end } = entryWindow(at, length);
  return toLoopStyle([[0, 0], [0, start], ...sample(easeEnter, 0, 1, start, end, ENTRY_SAMPLES)]);
}

/**
 * Stepped loop timing, for terminal output: instead of easing, the entry jumps from 0 to 1 in
 * `steps` equal steps across `length`, like CSS `steps(n, jump-end)`. With the defaults the
 * element pops in at `at`, like a printed line; typing takes one step per character.
 */
export function loopSteps(at: number, length = 0, steps = 1): LoopStyle {
  const { start, end } = entryWindow(at, length);
  const step = (end - start) / steps;
  const held = Array.from({ length: steps }, (_, index): Stop => [
    index / steps,
    index === 0 ? 0 : start + index * step,
    start + (index + 1) * step,
  ]);
  return toLoopStyle([...held, [1, end]]);
}

/** One move of a progress loop: the value travels to `to` between `at` and `until` (fractions of the cycle). */
export type LoopMove = { at: number; until: number; to: number };

/** How long a press lands before a move starts and lifts after it ends. */
const PRESS = 0.012;

/**
 * Progress timing, for something that advances in fits and starts. The value starts at 0 and
 * makes each move in turn (in cycle order, which may go back down), holding in between, until
 * the shared fade at 93%. Keyframes run 0 → 1, so for `loop-wipe`, `loop-slide` and
 * `loop-grow-x` the value is how far along they are. Sets:
 * - `--loop-enter`: the progress
 * - `--loop-fade`: a quick fade in at the start of the cycle, for `loop-slide`
 * - `--loop-press`: 1 while a move is under way, for `loop-press`
 * - `--loop-final`: where the progress ends, for the final frame under reduced motion
 */
export function loopProgress(moves: readonly LoopMove[]): LoopStyle {
  let value = 0;
  const progress: Stop[] = [[0, 0]];
  const press: Stop[] = [[0, 0]];

  for (const move of moves) {
    progress.push([value, move.at], ...sample(easeDrag, value, move.to, move.at, move.until, ENTRY_SAMPLES));
    press.push([0, move.at - PRESS], [1, move.at], [1, move.until], [0, move.until + PRESS]);
    value = move.to;
  }

  return {
    "--loop-enter": toLinear([...progress, [value, 1]]),
    "--loop-fade": toLinear([[0, 0], ...sample(easeEnter, 0, 1, 0, 0.03, 4), [1, LOOP_END], ...exit]),
    "--loop-press": toLinear([...press, [0, 1]]),
    "--loop-final": String(value),
  };
}

/** Starts the loops inside an element `phase` (0–1) of the way into the cycle, via `--loop-delay`. */
export function loopPhase(phase: number): LoopStyle {
  return { "--loop-delay": `${Number((-phase * LOOP_SECONDS).toFixed(3))}s` };
}
