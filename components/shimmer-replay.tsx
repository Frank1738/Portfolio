"use client";

import { Fragment, useState } from "react";

/**
 * A `<div>` that replays the halfway-line shimmer once on mouse-enter, unless it is already
 * playing. It remounts its children, so their CSS animations restart, and sets
 * `data-shimmer-replay`, which switches them to one sweep with no delay (globals.css).
 */
export function ShimmerReplay({ children, ...props }: React.ComponentProps<"div">) {
  const [replays, setReplays] = useState(0);

  function handleMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
    // Waiting animations (in their delay) count as running, as in the prototype.
    const playing = event.currentTarget
      .getAnimations({ subtree: true })
      .some((animation) => animation.playState === "running");
    if (!playing) setReplays((count) => count + 1);
  }

  return (
    <div {...props} data-shimmer-replay={replays > 0 ? "" : undefined} onMouseEnter={handleMouseEnter}>
      <Fragment key={replays}>{children}</Fragment>
    </div>
  );
}
