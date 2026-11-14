import type { Note } from "@/lib/notes";
import { absoluteUrl, site } from "@/lib/site";
import type { CaseStudy } from "@/lib/work";

/**
 * schema.org JSON-LD, built from content data. Each page renders one `@graph`
 * through `<JsonLd>`; nodes refer to the Person and WebSite by `@id`.
 */

/** A schema.org node. Kept loose on purpose: no schema-dts dependency. */
export type JsonLdNode = { "@type": string; "@id"?: string } & Record<string, unknown>;

const personId = absoluteUrl("/#person");
const websiteId = absoluteUrl("/#website");

const personRef = { "@id": personId };

/** The person behind the site, with their social profiles. */
export function personJsonLd(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    jobTitle: site.role,
    url: absoluteUrl("/"),
    email: `mailto:${site.email}`,
    sameAs: site.social.map((link) => link.href),
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    inLanguage: "en",
    author: personRef,
    publisher: personRef,
  };
}

/** The route's generated Open Graph card (`opengraph-image.tsx`), as the page's image. */
function cardImage(path: string) {
  return absoluteUrl(`${path}/opengraph-image`);
}

export function caseStudyJsonLd(study: CaseStudy): JsonLdNode {
  const path = `/work/${study.slug}`;
  return {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(path)}#work`,
    name: study.title,
    headline: study.title,
    description: study.statement,
    abstract: study.blurb,
    url: absoluteUrl(path),
    image: cardImage(path),
    dateCreated: String(study.year),
    keywords: study.stack.join(", "),
    ...(study.links && { sameAs: study.links.map((link) => link.href) }),
    inLanguage: "en",
    creator: personRef,
    author: personRef,
    isPartOf: { "@id": websiteId },
  };
}

export function blogPostingJsonLd(note: Note): JsonLdNode {
  const path = `/notes/${note.number}`;
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#post`,
    headline: note.title,
    description: note.excerpt,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: cardImage(path),
    datePublished: note.publishedAt,
    timeRequired: `PT${note.readingMinutes}M`,
    inLanguage: "en",
    author: personRef,
    publisher: personRef,
    isPartOf: { "@id": websiteId },
  };
}

/** A breadcrumb trail, home first: `[{ name: "Selected work", path: "/work" }, …]`. */
export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: site.name, path: "/" }, ...trail].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
