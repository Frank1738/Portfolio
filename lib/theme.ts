export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "pf-theme";

/**
 * Runs in <head> before first paint: applies the stored theme, or the OS
 * preference, to <html data-theme>. Keep it tiny and dependency-free.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t})()`;

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/** Reads the theme currently applied to the document (client only). */
export function getDocumentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Switches theme with a circular reveal growing from `origin` (the clicked toggle), using the
 * View Transitions API. Instant when the API is missing or with reduced motion (client only).
 */
export function switchTheme(theme: Theme, origin: Element) {
  if (theme === getDocumentTheme()) return;
  // Older browsers lack startViewTransition despite the DOM typings.
  if (typeof document.startViewTransition !== "function" || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(theme);
    return;
  }

  const box = origin.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(theme));
  transition.ready
    .then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      ),
    )
    .catch(() => {
      // The transition was skipped: the theme has still been applied.
    });
}

/** Applies and persists a theme (client only). */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies): the theme still applies.
  }
}
