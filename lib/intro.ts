import type { Theme } from "@/lib/theme";

/** sessionStorage flag: the intro plays once per session. */
export const INTRO_STORAGE_KEY = "pf-booted";

/**
 * Runs in <head> before first paint and decides whether the blueprint intro plays:
 * home page only, once per session, never with reduced motion. If it will, it marks
 * <html data-intro>, which turns off the route enter and hides the home column until the
 * intro starts and reveals it (globals.css). If the intro never starts, the column shows
 * after 7s. Without JavaScript in the browser at all, or when storage is blocked, nothing plays.
 */
export const introInitScript = `(function(){try{if(location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="1")return;sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");document.documentElement.setAttribute("data-intro","")}catch(e){}})()`;

/** Colour of the dashed construction lines, per theme (README → "First load intro"). */
export const introGuideColor = {
  light: "rgb(213, 213, 213)",
  dark: "rgb(70, 70, 70)",
} as const satisfies Record<Theme, string>;
