import { ImageResponse } from "next/og";

import { OgCard } from "@/components/og/og-card";
import { ogFonts, ogColors, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

/** Home card; /work and /notes inherit it. */
export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        kind="home"
        meta={
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: ogColors.accent }} />
            {site.availability}
          </div>
        }
        title={site.role}
        description={site.description}
      />
    ),
    { ...size, fonts: ogFonts },
  );
}
