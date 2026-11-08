import type { MDXComponents } from "mdx/types";

import { BotMessage } from "@/components/notes/figures/bot-message";
import { BrierChart } from "@/components/notes/figures/brier-chart";
import { LogLossBars } from "@/components/notes/figures/log-loss-bars";
import { NoteFigure } from "@/components/notes/note-figure";

/**
 * Global element styles for Matchday notes (README → "Post"), plus the figure components
 * notes use without importing. Block spacing comes from the post template.
 */
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-4 text-base font-medium text-ink" {...props} />,
  NoteFigure,
  BrierChart,
  LogLossBars,
  BotMessage,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
