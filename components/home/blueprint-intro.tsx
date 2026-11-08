"use client";

import { useEffect } from "react";

import { introGuideColor } from "@/lib/intro";
import { getDocumentTheme } from "@/lib/theme";

/**
 * Plays the first-visit intro over the home column (`[data-intro-root]`) when the <head>
 * script has marked <html data-intro> (see lib/intro.ts). Renders nothing. The intro code is
 * loaded with `import()` only then, so other visits never download it.
 */
export function BlueprintIntro() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-intro")) return;

    let cancelled = false;
    let skip: (() => void) | undefined;

    import("@/lib/blueprint-intro")
      .then(({ runBlueprintIntro }) => {
        if (cancelled) return;
        const root = document.querySelector<HTMLElement>("[data-intro-root]");
        const rule = root?.querySelector<HTMLElement>("[data-divider-rule]");
        if (root && rule) {
          skip = runBlueprintIntro(root, rule, {
            ink: introGuideColor[getDocumentTheme()],
            inkStrong: getComputedStyle(html).getPropertyValue("--ink").trim(),
          });
          // Same task as the intro's inline column hide, so nothing paints in between: the column
          // stays hidden and the route enter stays off.
          root.setAttribute("data-intro-played", "");
        }
        html.removeAttribute("data-intro");
      })
      .catch(() => {
        // The chunk failed to load: show the page with the normal enter.
        html.removeAttribute("data-intro");
      });

    return () => {
      cancelled = true;
      skip?.();
    };
  }, []);

  return null;
}
