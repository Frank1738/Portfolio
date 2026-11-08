import { themeInitScript } from "@/lib/theme";

/** Render inside <head>: sets <html data-theme> before first paint to avoid a theme flash. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
