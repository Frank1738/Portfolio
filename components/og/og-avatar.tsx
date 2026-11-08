import { ogAvatarSrc, ogColors } from "@/lib/og";

/**
 * The home profile photo for the Open Graph card: same radius and 1px border as the 60px
 * home avatar, scaled. Inline styles, because `next/og` renders outside the page CSS.
 */
export function OgAvatar({ size }: { size: number }) {
  const scale = size / 60;
  return (
    // next/og renders a plain <img>; next/image doesn't apply here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ogAvatarSrc}
      alt=""
      width={size}
      height={size}
      style={{
        border: `${Math.max(1, Math.round(scale))}px solid ${ogColors.border}`,
        borderRadius: Math.round(15 * scale),
        objectFit: "cover",
      }}
    />
  );
}
