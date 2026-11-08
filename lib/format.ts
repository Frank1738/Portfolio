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
