"use client";

import { useEffect, useRef } from "react";

/**
 * A `<div>` that pauses the CSS loops inside it (`loop-*` utilities) while it is off-screen.
 * Loops run by default, so the server HTML animates even before hydration.
 */
export function PauseOffscreen(props: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      element.toggleAttribute("data-loop-paused", !entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} {...props} />;
}
