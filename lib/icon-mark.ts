/** Mid grey: white marks on it keep strong contrast (7.8:1) at 16px. */
const ICON_BG = "#525252";

/**
 * The site mark, as SVG markup: the home page's halfway line and centre circle on a mown
 * pitch, the circle split into code brackets around the ball, "( ● )". Drawn on a 32-unit
 * grid so it stays legible as a 16px tab icon.
 *
 * `rounded: false` gives a full-bleed square for the Apple icon, which iOS masks itself.
 */
export function iconMarkSvg({ rounded = true }: { rounded?: boolean } = {}) {
  const radius = rounded ? 8 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <clipPath id="tile"><rect width="32" height="32" rx="${radius}"/></clipPath>
  <g clip-path="url(#tile)">
    <rect width="32" height="32" fill="${ICON_BG}"/>
    <path d="M0 0h6.4v32H0zM12.8 0h6.4v32h-6.4zM25.6 0H32v32h-6.4z" fill="#fff" fill-opacity=".07"/>
    <path d="M0 16h32" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 2" stroke-dashoffset="1" stroke-opacity=".55"/>
    <path d="M11.2 8.6A11.5 11.5 0 0 0 11.2 23.4M20.8 8.6A11.5 11.5 0 0 1 20.8 23.4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="16" cy="16" r="3" fill="#fff"/>
  </g>
</svg>`;
}
