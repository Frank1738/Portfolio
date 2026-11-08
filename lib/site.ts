/**
 * Site-wide identity and contact details.
 * Everything here is mock data from the design handoff: replace with real details.
 */
export const site = {
  name: "Alex Rivera",
  initials: "AR",
  role: "AI fullstack engineer",
  /** Default meta description; the home page's description. */
  description:
    "AI fullstack engineer building LLM products end to end: retrieval, evals, APIs and the interface people actually click. Case studies and Matchday notes.",
  /** Open Graph locale; the page language is `en`. */
  locale: "en_GB",
  url: "https://alexrivera.dev",
  email: "hello@alexrivera.dev",
  bookingUrl: "https://cal.com/alexrivera/intro",
  availability: "Open from Jan '27",
  social: [
    { label: "GitHub", href: "https://github.com/alexrivera" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alexrivera" },
    { label: "X", href: "https://x.com/alexrivera" },
  ],
} as const;

/** Builds a mailto link with an optional pre-filled subject. */
export function mailto(subject?: string) {
  return subject
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.email}`;
}

/** Absolute URL for a site path ("/work" → "https://alexrivera.dev/work"). */
export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
