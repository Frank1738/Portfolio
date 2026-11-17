/**
 * Faint map of Nairobi County behind the "Selected work" tile: its 17 sub-county outlines
 * (geoBoundaries gbOpen KEN ADM2, simplified) over a 0.05° lat/long graticule. Decorative only.
 */
export function NairobiMap({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="30 20 940 605"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1" strokeDasharray="1 7" strokeOpacity="0.5" vectorEffect="non-scaling-stroke">
        {graticuleX.map((x) => (
          <line key={x} x1={x} x2={x} y1="0" y2="645" vectorEffect="non-scaling-stroke" />
        ))}
        {graticuleY.map((y) => (
          <line key={y} x1="0" x2="1000" y1={y} y2={y} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <path
        d={subCounties}
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** 0.05° meridians and parallels, projected into the map's 1000-unit-wide space. */
const graticuleX = [-30.6, 83, 196.6, 310.1, 423.7, 537.3, 650.9, 764.5, 878.1, 991.7, 1105.2];
const graticuleY = [-18.7, 95, 208.6, 322.2, 435.8, 549.4, 663];

/** Nairobi's sub-counties (equirectangular, x scaled by cos 1.28°S), whole units with relative steps to keep the HTML small. */
const subCounties =
  "M125 233l-6-5l-30-6l-4 9l-10-5l-6 1l3 3l-4 5l7 10l-7 1l2 4l-9 3l2 9l-8-2l4 15l-7 7l-13 32l-5 4l14 0l6-10l23 7l21 13l4-17l34 13l8-15l13-2l9 3l1 8l-15 3l2 15l37-11l29-11l-9-3l-8-9l-13-4l-23-16l-8-21l-34-28zM620 226l-6-16l-46 13l-12 5l-24 25l10 23l9-5l14 25l6 0l0-8l7-9l0-10l6-4l0-11l9-5l2-6l29-5l-4-12zM542 276l-23 21l-14 8l7 27l24 39l-41 28l59 59l60-53l61 22l12 13l40-89l-22-58l37-14l-23-33l-28-18l-71-2l4 12l-29 5l-2 6l-9 5l0 11l-6 4l0 10l-7 9l0 8l-6 0l-14-25l-9 5zM537 218l5-3l5-9l29-19l19 0l11-7l-10 4l-7-4l-9 2l-17-7l-18 2l-4 7l-13 5l-8 14l1 6l-8 4l-10-13l-17 1l2 30l23-4l26-9zM512 332l-37 15l-12-2l-15 10l-11-1l-8 0l-11 6l-16 4l95 66l23 25l6-4l28 31l14 1l-18-20l4-5l-59-59l41-28l-24-39zM568 223l-10-4l-16 1l-5-2l-26 9l-23 4l0 7l-3 6l-6 3l-7 21l-8 8l-7 3l5 9l16-14l4 6l5-4l6 0l-4-9l7-2l9 40l14-8l23-21l-10-23l24-25l12-5zM488 231l-21-2l-24 10l-35 4l6 29l-4 0l-1 6l-12 5l2 3l-17-1l18 7l1 7l24 5l2-10l30-15l7-3l8-8l7-21l6-3l3-6l0-7zM620 226l71 2l28 18l23 33l11-4l16 43l55-20l113 27l-1-7l-7-2l0-10l8-9l3-16l12 1l3-10l6-6l23-10l10 4l2-9l4-13l-4-9l-36-29l20-9l-15-25l-18 8l-40-73l-12 9l-8-6l-37 15l-10 7l-7 11l-16 7l-2 7l-12 1l-8 6l-2 11l-4 3l-16 0l-20-9l-8-17l-11-3l-20 3l-19 10l-19-4l-9 4l-9-6l-9 1l-26-12l-15 1l-24-13l-11-9l-7-12l-38 16l-54 46l-7 9l12 5l4-4l11 1l11-6l18 2l8-7l11 1l6-3l15 9l17 7l9-2l7 4l10-4l-11 7l-19 0l-29 19l-5 9l-5 3l5 2l16-1l10 4l46-13l6 16zM191 325l0 11l12-3l6 10l25-3l4 8l6-3l4 9l10 0l3 3l23-7l13 12l11-3l2-3l-11-5l-2-11l21 11l6-14l20-8l14 0l4-4l-1-8l2-1l-8-15l-62 15l-49 1l-24-3l-29 11zM220 314l24 3l49-1l62-15l-18-42l-10-7l-20-23l-45-6l-26 4l-8 5l-24 3l19 14l-8 2l-2 6l-27 2l-15 8l-12-6l8 21l23 16l13 4l8 9l9 3zM34 318l-9 15l-10-3l-9 20l-6 12l21 10l-8 4l13 10l9-5l8 21l6-1l10 28l8 8l21-2l54 48l35 20l6-2l11 8l26 0l9 3l7 6l12 1l17-6l6 6l9-4l7 1l9-5l4 1l0 5l11-1l6 2l4-4l2 6l6-3l2-5l6 1l7-9l10-2l2 4l20 10l17 2l1-3l6 2l9-3l3 10l11 12l17 6l15 11l13-1l1 6l4 3l23-3l30 12l-1 4l-10-1l-1 4l95 42l25 0l17 11l13-1l4 11l7 5l3-13l-5-3l-11-20l-16-11l-6-32l-6-12l-14-12l-12-1l-8-10l-11 0l-4-17l-17-31l-14-1l-28-31l-6 4l-23-25l-95-66l-23-15l-16-33l-2 1l1 8l-4 4l-14 0l-20 8l-6 14l-21-11l2 11l11 5l-2 3l-11 3l-13-12l-23 7l-3-3l-10 0l-4-9l-6 3l-4-8l-25 3l-6-10l-12 3l0-11l-37 11l-2-15l15-3l-1-8l-9-3l-13 2l-8 15l-34-13l-4 17l-21-13l-23-7l-6 10l-14 0zM505 305l-9-40l-7 2l4 9l-6 0l-5 4l-4-6l-16 14l-5-9l-30 15l-2 10l-24-5l-5-1l16 22l25-2l11 23l-11 13l11 1l15-10l12 2l37-15l-7-27zM486 201l-4 7l-27 12l-11 12l-7 1l-12-10l-20 4l-11 9l11 0l3 7l35-4l24-10l21 2l-2-30zM532 0l-9 20l-13 10l14 21l4 8l-2 3l8 11l-18 1l-11 6l-28 1l-23-13l-9 28l-8-3l-11 3l-4 25l-23-10l-4 3l-7-1l-9-9l9 19l1 13l17 26l3 27l6 9l-10 29l20-4l16-11l19-22l7-13l7-9l54-46l38-16l66-72l-6-7l-13-6l-14-2l-18-15l-49-4zM563 175l-15-9l-6 3l-11-1l-8 7l-18-2l-11 6l-11-1l-4 4l-12-5l-7 13l-19 22l-16 11l12 10l7-1l11-12l27-12l4-7l17-1l10 13l8-4l-1-6l8-14l13-5l4-7l18-2zM437 354l11-13l-11-23l-25 2l-16-22l5 1l-1-7l-18-7l17 1l-2-3l12-5l1-6l4 0l-6-29l-3-7l-11 0l-12 6l-37 5l-8 12l18 42l8 15l16 33l23 15l16-4l11-6l8 0zM159 261l12 6l15-8l27-2l2-6l8-2l-19-14l24-3l8-5l26-4l45 6l20 23l10 7l8-12l37-5l12-6l11-9l10-29l-6-9l-3-27l-17-26l-1-13l-81-44l-17-9l-16 30l13 10l-14 14l-12 26l-15-7l-4 6l-31-16l-2 4l-20 37l-41-5l-3 24l-4 2l0 10l-16 28l34 28z";
