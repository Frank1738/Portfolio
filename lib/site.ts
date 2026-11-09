/**
 * Production origin, used for canonical URLs, the sitemap, structured data and share images.
 * Set SITE_URL once there's a custom domain; on Vercel the project's production URL is used until then.
 */
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Site-wide identity and contact details. */
export const site = {
  name: "Frankline Osoro",
  role: "AI fullstack engineer",
  /** Default meta description; the home page's description. */
  description:
    "AI fullstack engineer at Duelbits, one of the leading names in iGaming. Before that, a few years shipping for startups across the US, UK and Europe with React, Next.js, Node.js and TypeScript.",
  /** Open Graph locale; the page language is `en`. */
  locale: "en_GB",
  url: siteUrl,
  email: "franklineosoro08@gmail.com",
  availability: "Open to chat",
  social: [
    { label: "GitHub", href: "https://github.com/Frank1738" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/franklineosoro/" },
  ],
} as const;

/** Builds a mailto link with an optional pre-filled subject. */
export function mailto(subject?: string) {
  return subject
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.email}`;
}

/** Absolute URL for a site path ("/work" → "https://example.com/work"). */
export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
