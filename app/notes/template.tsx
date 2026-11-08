/**
 * Remounts the page below this segment on every navigation, so its CSS enter animations
 * (`enter-N`, the stack and the shimmer) replay. See globals.css → "Page motion".
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
