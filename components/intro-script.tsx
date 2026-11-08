import { introInitScript } from "@/lib/intro";

/** Render inside <head>: decides before first paint whether the home intro plays (see lib/intro.ts). */
export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: introInitScript }} />;
}
