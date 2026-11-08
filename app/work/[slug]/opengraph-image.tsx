import { ImageResponse } from "next/og";

import { OgCard } from "@/components/og/og-card";
import { ogFonts, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";
import { caseStudyMeta, getCaseStudies, getCaseStudy } from "@/lib/work";

// Static per route type: `generateImageMetadata` would give per-page alt text, but its
// image routes are then not prerendered for the slugs.
export const alt = `Case study by ${site.name}: title, statement and role`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) return new Response(null, { status: 404 });

  return new ImageResponse(
    <OgCard kind="case" section="Case study" meta={caseStudyMeta(study)} title={study.title} description={study.statement} />,
    { ...size, fonts: ogFonts },
  );
}
