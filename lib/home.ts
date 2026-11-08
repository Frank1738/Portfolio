import { intro, services, stack } from "@/content/home";

/** Highlighter-mark colours used in the intro (README → Home, step 3). */
export type HighlightTone = "blue" | "orange" | "pink";

/** Plain text, or a run of text with a highlighter mark. */
export type IntroPart = string | { text: string; highlight: HighlightTone };

export type IntroParagraph = {
  id: string;
  parts: IntroPart[];
};

/** Row colours in "The stack"; each maps to a `--sk-*` token. */
export type StackTone = "ai" | "backend" | "frontend" | "infra";

export type StackRow = {
  label: string;
  tone: StackTone;
  items: string;
};

/** A "Work with me" row: a mailto link with the subject pre-filled. */
export type Service = {
  name: string;
  description: string;
  subject: string;
};

export function getIntro(): readonly IntroParagraph[] {
  return intro;
}

export function getStack(): readonly StackRow[] {
  return stack;
}

export function getServices(): readonly Service[] {
  return services;
}
