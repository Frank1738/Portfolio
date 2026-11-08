import type { JsonLdNode } from "@/lib/structured-data";

/**
 * Renders schema.org nodes as one JSON-LD `@graph`. `<` is escaped so content can never
 * close the script tag early.
 */
export function JsonLd({ graph }: { graph: readonly JsonLdNode[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }} />;
}
