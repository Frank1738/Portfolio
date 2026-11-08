/** Literal class names, so Tailwind generates each `enter-*` step. */
const enterClasses = [
  "enter-0",
  "enter-1",
  "enter-2",
  "enter-3",
  "enter-4",
  "enter-5",
  "enter-6",
  "enter-7",
  "enter-8",
] as const;

/**
 * Route-enter class for the block at `index` in page order: each block starts 70ms after
 * the previous one, capped at 8 blocks (README → "Route change and non-intro loads").
 * Use it for list items; fixed blocks can write `enter-N` directly.
 */
export function enterClass(index: number) {
  return enterClasses[Math.min(Math.max(index, 0), enterClasses.length - 1)];
}
