import { ogColors, ogFont } from "@/lib/og";
import { site } from "@/lib/site";

type OgMonogramProps = {
  /** Edge length in px. Radius, border and type scale from the 60px home avatar. */
  size: number;
  /** Draw the 1px border and rounded corners. Off for the Apple icon, which iOS masks itself. */
  framed?: boolean;
  /** Overrides the scaled monogram size, for icons too small to read it. */
  textSize?: number;
};

/**
 * The home avatar ("AR" on a tile square) for `next/og` images: the Open Graph card and
 * the app icons. Inline styles, because `next/og` renders outside the page CSS.
 */
export function OgMonogram({ size, framed = true, textSize }: OgMonogramProps) {
  const scale = size / 60;
  const fontSize = textSize ?? Math.round(17 * scale);
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ogColors.tile,
        color: ogColors.ink,
        fontFamily: ogFont.sans,
        fontWeight: 500,
        fontSize,
        letterSpacing: `${-0.01 * fontSize}px`,
        ...(framed && {
          border: `${Math.max(1, Math.round(scale))}px solid ${ogColors.border}`,
          borderRadius: Math.round(15 * scale),
        }),
      }}
    >
      {site.initials}
    </div>
  );
}
