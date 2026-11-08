import { ImageResponse } from "next/og";

import { OgMonogram } from "@/components/og/og-monogram";
import { ogFonts, ogContentType } from "@/lib/og";

export const size = { width: 32, height: 32 };
export const contentType = ogContentType;

/** Favicon: the home avatar. Its 17px monogram would be unreadable at 32px, so it's set larger. */
export default async function Icon() {
  return new ImageResponse(<OgMonogram size={size.width} textSize={14} />, {
    ...size,
    fonts: ogFonts,
  });
}
