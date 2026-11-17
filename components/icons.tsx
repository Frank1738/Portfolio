import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 13, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Lucide "sun", inlined. */
export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Icon>
  );
}

/** Lucide "moon", inlined. */
export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
  );
}

/** Lucide "lock-keyhole", inlined: a planned project's lock. The shackle is tagged `data-shackle` so it can move on its own. */
export function LockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path data-shackle d="M7 10V7a5 5 0 0 1 10 0v3" />
      <rect x="3" y="10" width="18" height="12" rx="2" />
      <circle cx="12" cy="16" r="1" />
    </Icon>
  );
}

/*
 * Project icons, one per case study (ProjectScreen's title bar).
 */

/** Lucide "brush-cleaning", inlined: devsweep's broom. */
export function BroomIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m16 22-1-4" />
      <path d="M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1" />
      <path d="M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z" />
      <path d="m8 22 1-4" />
    </Icon>
  );
}

/** Lucide "send", inlined: Relay sends the reply. */
export function SendIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </Icon>
  );
}

/** Lucide "file-search", inlined: Ledgerlens searches documents. */
export function FileSearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
      <path d="m9 18-1.5-1.5" />
      <circle cx="5" cy="14" r="3" />
    </Icon>
  );
}

/** Lucide "workflow", inlined: Flowpilot runs workflows. */
export function WorkflowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </Icon>
  );
}

/** Lucide "binoculars", inlined: Scout. */
export function BinocularsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 10h4" />
      <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
      <path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z" />
      <path d="M22 16H2" />
      <path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z" />
      <path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" />
    </Icon>
  );
}

/** Lucide "activity", inlined: Pulse's quality line. */
export function ActivityIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </Icon>
  );
}

/** Sent Off's red card, in Lucide's stroke style: tilted like one just shown. */
export function RedCardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect width="12" height="18" x="6" y="3" rx="2" transform="rotate(-12 12 12)" />
    </Icon>
  );
}
