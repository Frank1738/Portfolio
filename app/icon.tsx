import { iconMarkSvg } from "@/lib/icon-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/svg+xml";

/** Favicon: the site mark as SVG, sharp at any tab size and pixel density. */
export default function Icon() {
  return new Response(iconMarkSvg(), { headers: { "Content-Type": contentType } });
}
