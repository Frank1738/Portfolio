"use client";

import { useSyncExternalStore } from "react";

import { getDocumentTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/** The theme is unknown on the server; it is set on <html> before paint by ThemeScript. */
function getServerSnapshot(): Theme | null {
  return null;
}

/**
 * The active theme, read from <html data-theme>. Returns null during SSR and hydration,
 * so markup never depends on it; styling relies on the `light:`/`dark:` variants instead.
 */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, getDocumentTheme, getServerSnapshot);
}
