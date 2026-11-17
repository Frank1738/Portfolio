import { intro, services, stack } from "@/content/home";

/** Highlighter-mark colours used in the intro (README → Home, step 3). */
export type HighlightTone = "blue" | "orange" | "pink";

/** Plain text, or a run of text with a highlighter mark. */
export type IntroPart = string | { text: string; highlight: HighlightTone };

export type IntroParagraph = {
  id: string;
  parts: IntroPart[];
};

/** Logos drawn by `StackIcon` (components/home/stack-icon.tsx). */
export type StackIconKey =
  | "openai"
  | "anthropic"
  | "mcp"
  | "typescript"
  | "react"
  | "nextjs"
  | "redux"
  | "tailwind"
  | "nodejs"
  | "express"
  | "postgresql"
  | "prisma"
  | "mongodb"
  | "rest"
  | "oauth"
  | "jwt"
  | "docker"
  | "githubActions"
  | "cicd"
  | "jest"
  | "cypress";

/** One chip in "The stack", so recruiters can scan single keywords. */
export type StackItem = {
  name: string;
  icon: StackIconKey;
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

export function getStack(): readonly StackItem[] {
  return stack;
}

export function getServices(): readonly Service[] {
  return services;
}
