import type { Metadata } from "next";

import { site } from "@/lib/site";

type PageMetadataOptions = {
  /** Page title; the root layout's template adds " · Frankline Osoro". */
  title: string;
  description: string;
  /** Site path, also the canonical URL: "/work/relay". */
  path: string;
  /** Open Graph type: "article" for case studies and posts. */
  type?: "website" | "article";
  /** ISO date, for posts. */
  publishedTime?: string;
  /** Use the title as is, without the layout's template (the home page). */
  absoluteTitle?: boolean;
};

/**
 * A route's metadata: title, description, canonical URL, Open Graph and Twitter card.
 * Next merges `openGraph` and `twitter` shallowly, so each route sets them in full here.
 * The card image comes from the nearest `opengraph-image.tsx`, which Next also copies
 * into the Twitter card, along with the title and description.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      url: path,
      ...(type === "article" && { authors: [site.url], publishedTime }),
    },
    twitter: { card: "summary_large_image" },
  };
}
