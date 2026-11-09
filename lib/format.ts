/** "2026-10-12" → "12.10.26", the design's short date format. Parsed manually to avoid timezone shifts. */
export function formatShortDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year.slice(2)}`;
}

/** 2026 → "'26" */
export function formatShortYear(year: number) {
  return `'${String(year).slice(2)}`;
}

/** 5 → "05" */
export function padCount(count: number) {
  return String(count).padStart(2, "0");
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Age of a timestamp at `now`: "just now", "40m ago", "5h ago", "2d ago", "3w ago", "4mo ago", "1y ago". */
export function formatRelativeTime(isoDate: string, now: number) {
  const elapsed = Math.max(0, now - Date.parse(isoDate));
  if (elapsed < MINUTE) return "just now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)}m ago`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)}h ago`;
  const days = Math.floor(elapsed / DAY);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
