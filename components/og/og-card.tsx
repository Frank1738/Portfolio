import { OgAvatar } from "@/components/og/og-avatar";
import { ogColors, ogFont, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

const PADDING_X = 80;

/** Title styles, from the page each card stands for (README type scale, scaled up). */
const titleStyles = {
  /** Home: the role, in ink. */
  home: { fontSize: 72, lineHeight: 1.1, letterSpacing: "-1.8px", color: ogColors.ink },
  /** Case study: the 40px accent title. */
  case: { fontSize: 88, lineHeight: 1.1, letterSpacing: "-2.2px", color: ogColors.accent },
  /** Post: the 28px ink title. */
  post: { fontSize: 60, lineHeight: 1.2, letterSpacing: "-1.2px", color: ogColors.ink },
} as const;

type OgCardProps = {
  kind: keyof typeof titleStyles;
  /** After the name in the top row: "Frankline Osoro / Case study". */
  section?: string;
  /** The mono meta line above the title; items are spaced like the post meta row. */
  meta: React.ReactNode;
  title: string;
  description: string;
};

/**
 * The 1200×630 Open Graph card, in the light theme: the avatar and "Name / Section" like
 * the page header, the page's meta line, title and statement, and the halfway-line divider.
 * Inline styles, because `next/og` renders outside the page CSS (flexbox only).
 */
export function OgCard({ kind, section, meta, title, description }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: `64px ${PADDING_X}px 60px`,
        background: ogColors.bg,
        color: ogColors.body,
        fontFamily: ogFont.sans,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 28, color: ogColors.sub }}>
          <OgAvatar size={72} />
          <div style={{ display: "flex", whiteSpace: "pre" }}>
            <span style={{ color: ogColors.ink }}>{site.name}</span>
            {section && <span>{` / ${section}`}</span>}
          </div>
        </div>
        <span style={{ fontFamily: ogFont.mono, fontSize: 24, color: ogColors.sub }}>{new URL(site.url).host}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 28, fontFamily: ogFont.mono, fontSize: 26, color: ogColors.sub }}>
          {meta}
        </div>
        <div style={{ display: "block", marginTop: 20, fontWeight: 600, lineClamp: 2, ...titleStyles[kind] }}>
          {title}
        </div>
        <div style={{ display: "block", marginTop: 24, fontSize: 32, lineHeight: 1.45, lineClamp: kind === "home" ? 3 : 2 }}>{description}</div>
      </div>

      <OgDivider />
    </div>
  );
}

/** The halfway-line divider at 2×: 3px dashes with 6px gaps, and the centre circle. */
function OgDivider() {
  const width = ogSize.width - 2 * PADDING_X;
  return (
    <svg width={width} height={28} viewBox={`0 0 ${width} 28`}>
      <line x1={0} y1={14} x2={width} y2={14} stroke={ogColors.line} strokeWidth={2} strokeDasharray="6 12" />
      <circle cx={width / 2} cy={14} r={13} fill={ogColors.bg} stroke={ogColors.line} strokeWidth={2} />
    </svg>
  );
}
