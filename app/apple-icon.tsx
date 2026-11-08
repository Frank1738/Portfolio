import { ImageResponse } from "next/og";

import { iconMarkSvg } from "@/lib/icon-mark";
import { ogContentType } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = ogContentType;

const src = `data:image/svg+xml;base64,${Buffer.from(iconMarkSvg({ rounded: false })).toString("base64")}`;

/** Home-screen icon: the site mark, full bleed (iOS rounds the corners itself). */
export default function AppleIcon() {
  return new ImageResponse(
    // next/og renders a plain <img>; next/image doesn't apply here.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size.width} height={size.height} />,
    size,
  );
}
