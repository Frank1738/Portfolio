import { ImageResponse } from "next/og";

import { OgMonogram } from "@/components/og/og-monogram";
import { ogFonts, ogContentType } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = ogContentType;

/** Home-screen icon: the home avatar, full bleed (iOS rounds the corners itself). */
export default async function AppleIcon() {
  return new ImageResponse(<OgMonogram size={size.width} framed={false} />, {
    ...size,
    fonts: ogFonts,
  });
}
