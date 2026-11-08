/**
 * First-visit "blueprint" intro, ported from design_handoff_portfolio/blueprint-intro.js.
 * The home column starts hidden; dashed construction lines grow across a full-screen canvas
 * and trace each block's outline, each block fades in (blur 8→0, rise 6px), then the lines
 * retract and the last one hands off to the halfway divider.
 *
 * Client only, and framework-agnostic: `BlueprintIntro` loads this module with `import()`
 * only when the intro will play. Blocks are the elements under the root marked
 * `data-skel="<corner radius>"`.
 *
 * Differences from the prototype file:
 * - The column is already hidden before first paint (globals.css → [data-intro]), so it
 *   never flashes before the intro starts. This delays home-page LCP on first visits, a
 *   trade-off accepted for the design (see BUILD_PLAN.md → Decisions).
 * - It doesn't cancel the root's running animations: the product-screen loops are CSS
 *   animations that a cancel would stop for good. The route enter is switched off in CSS
 *   instead (globals.css → [data-intro]).
 * - State is per run; the returned function skips to the end.
 */

const K = 4.2;
const T = {
  guide: 240 * K,
  rowGuide: 200 * K,
  trace: 180 * K,
  stagger: 12 * K,
  spread: 120 * K,
  revealAt: 150 * K,
  reveal: 220 * K,
  hold: 10 * K,
  retract: 150 * K,
  arrive: 300,
  crossfade: 150,
  emphasis: 900,
  emphasisHold: 250,
  giveUp: 7000,
} as const;

const DASH = [4, 4];
const DASH_STRONG = [3, 6];
const SKIP_EVENTS = ["keydown", "pointerdown", "popstate"] as const;

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

type Rect = { x: number; y: number; w: number; h: number; r: number };
type Point = [x: number, y: number];
type Outline = { pts: Point[]; len: number[]; total: number };

/** Everything measured once the layout has settled (T.arrive). Page coordinates. */
type Layout = {
  paths: Outline[];
  column: [left: number, right: number];
  rows: number[];
  ruleRow: { y: number; left: number; right: number };
  /** Per-block stagger, and half of it for the retract. */
  step: number;
  half: number;
  startAt: number;
  span: number;
  endAt: number;
};

export type BlueprintIntroOptions = {
  /** Construction-line colour. */
  ink: string;
  /** Colour of the emphasised line that hands off to the divider. */
  inkStrong: string;
};

function guideSegments(c: number, end: number, grow: number, retract: number): Point[] {
  if (grow <= 0 || retract >= grow) return [];
  const segments: Point[] = [
    [c - c * grow, c - c * retract],
    [c + (end - c) * retract, c + (end - c) * grow],
  ];
  return segments.filter(([a, b]) => Math.abs(b - a) >= 0.5);
}

function drawGuide(
  ctx: CanvasRenderingContext2D,
  axis: "x" | "y",
  pos: number,
  c: number,
  len: number,
  grow: number,
  retract: number,
) {
  const p = Math.round(pos) + 0.5;
  for (const [a, b] of guideSegments(c, len, grow, retract)) {
    ctx.beginPath();
    if (axis === "x") {
      ctx.moveTo(p, a);
      ctx.lineTo(p, b);
    } else {
      ctx.moveTo(a, p);
      ctx.lineTo(b, p);
    }
    ctx.stroke();
  }
}

/** A rounded rectangle as a polyline with cumulative lengths, so it can be traced partially. */
function perimeter(r: Rect): Outline {
  const x = Math.round(r.x) + 0.5;
  const y = Math.round(r.y) + 0.5;
  const w = Math.round(r.x + r.w) - 0.5 - x;
  const h = Math.round(r.y + r.h) - 0.5 - y;
  const rad = Math.max(0, Math.min(r.r, w / 2, h / 2));
  const pts: Point[] = [];
  const arc = (cx: number, cy: number, start: number) => {
    for (let i = 0; i <= 5; i++) {
      const a = start + (i / 5) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]);
    }
  };
  pts.push([x + rad, y], [x + w - rad, y]);
  arc(x + w - rad, y + rad, -Math.PI / 2);
  pts.push([x + w, y + h - rad]);
  arc(x + w - rad, y + h - rad, 0);
  pts.push([x + rad, y + h]);
  arc(x + rad, y + h - rad, Math.PI / 2);
  pts.push([x, y + rad]);
  arc(x + rad, y + rad, Math.PI);

  const len = [0];
  for (let i = 1; i < pts.length; i++) {
    len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  return { pts, len, total: len[len.length - 1] };
}

/** Strokes the outline between fractions `from` and `to` of its length. */
function tracePart(ctx: CanvasRenderingContext2D, P: Outline, from: number, to: number, dy: number) {
  if (to <= from) return;
  const A = from * P.total;
  const B = to * P.total;
  ctx.lineDashOffset = A % 8;
  ctx.beginPath();
  let started = false;
  for (let i = 1; i < P.pts.length; i++) {
    const l0 = P.len[i - 1];
    const l1 = P.len[i];
    if (l1 <= A || l0 >= B || l1 === l0) continue;
    const s = (Math.max(A, l0) - l0) / (l1 - l0);
    const e = (Math.min(B, l1) - l0) / (l1 - l0);
    const [px, py] = P.pts[i - 1];
    const [qx, qy] = P.pts[i];
    if (!started) {
      ctx.moveTo(px + (qx - px) * s, py + (qy - py) * s - dy);
      started = true;
    }
    ctx.lineTo(px + (qx - px) * e, py + (qy - py) * e - dy);
  }
  ctx.stroke();
  ctx.lineDashOffset = 0;
}

/**
 * Plays the intro over `root`, handing off to `rule` (the divider's dashed line).
 * Returns a function that skips to the end; any key press, pointer-down or popstate does
 * the same, and it gives up after 7s.
 */
export function runBlueprintIntro(root: HTMLElement, rule: HTMLElement, { ink, inkStrong }: BlueprintIntroOptions) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx || matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  let raf = 0;
  let start = 0;
  let done = false;
  let crossfading = false;
  let layout: Layout | undefined;

  function measure(): Layout {
    const sy = window.scrollY;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-skel]"), (el) => {
      const b = el.getBoundingClientRect();
      const rect: Rect = { x: b.left, y: b.top + sy, w: b.width, h: b.height, r: Number(el.dataset.skel) || 0 };
      return { el, rect };
    });

    const cb = root.getBoundingClientRect();
    const cs = getComputedStyle(root);
    const column: Layout["column"] = [cb.left + parseFloat(cs.paddingLeft), cb.right - parseFloat(cs.paddingRight) - 1];

    // Row guides along block edges, skipping edges that would cut through another block.
    const inside = (y: number) => blocks.some((b) => y > b.rect.y + 1 && y < b.rect.y + b.rect.h - 1);
    const rows: number[] = [];
    for (const b of blocks) {
      for (const y of [b.rect.y, b.rect.y + b.rect.h]) {
        if (y <= 4 || inside(y)) continue;
        if (rows.every((r) => Math.abs(r - y) > 10)) rows.push(y);
      }
    }

    const rr = rule.getBoundingClientRect();
    const n = blocks.length;
    const step = n > 1 ? Math.min(T.stagger, T.spread / (n - 1)) : 0;
    const half = step / 2;
    // The lines hold until the content reveal has ended.
    const revealEnd = T.arrive + T.revealAt + (n - 1) * step + T.reveal;
    const startAt = Math.max(T.arrive + (n - 1) * step + T.trace, revealEnd) + T.hold;
    const span = (n - 1) * half + T.retract;

    // Each block fades in on its own stagger; `backwards` holds it hidden until then, so the column can show.
    blocks.forEach(({ el }, i) =>
      el.animate(
        [
          { opacity: 0, filter: "blur(8px)", translate: "0 6px" },
          { opacity: 1, filter: "blur(0px)", translate: "0 0" },
        ],
        {
          duration: T.reveal,
          delay: T.arrive + T.revealAt + i * step,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fill: "backwards",
        },
      ),
    );
    root.style.opacity = "";

    return {
      paths: blocks.map((b) => perimeter(b.rect)),
      column,
      rows: rows.slice(0, 9),
      ruleRow: { y: rr.top + sy, left: rr.left, right: rr.right - 1 },
      step,
      half,
      startAt,
      span,
      endAt: startAt + span,
    };
  }

  function frame(now: number) {
    // `ctx` is non-null here: the function returned early otherwise.
    if (done || !ctx) return;
    if (!start) start = now;
    const t = now - start;
    if (t > T.giveUp || !root.isConnected) return finish();

    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = innerWidth;
    const H = innerHeight;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    ctx.setLineDash(DASH);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = ink;

    if (!layout && t >= T.arrive) layout = measure();
    const dy = window.scrollY;
    const grow = easeOut(clamp(t / T.guide));
    const retract = layout ? easeInOut(clamp((t - layout.startAt) / layout.span)) : 0;
    const rb = root.getBoundingClientRect();
    const col = layout ? layout.column : [rb.left, rb.right - 1];
    for (const x of col) drawGuide(ctx, "x", x, H / 2, H, grow, retract);

    if (layout) {
      const L = layout;
      const rowGrow = easeOut(clamp((t - T.arrive) / T.rowGuide));
      for (const y of L.rows) drawGuide(ctx, "y", y - dy, W / 2, W, rowGrow, retract);
      L.paths.forEach((P, i) => {
        const drawn = easeOut(clamp((t - T.arrive - i * L.step) / T.trace));
        const erased = easeInOut(clamp((t - L.startAt - i * L.half) / T.retract));
        tracePart(ctx, P, erased, drawn, dy);
      });

      // The divider's guide: shrinks to the column, turns ink, then fades as the real divider fades in.
      const R = L.ruleRow;
      const ry = Math.round(R.y - dy) + 0.5;
      if (t < L.startAt) {
        drawGuide(ctx, "y", R.y - dy, W / 2, W, rowGrow, 0);
      } else {
        const p = easeInOut(clamp((t - L.startAt) / L.span));
        const x0 = lerp(0, R.left, p);
        const x1 = lerp(W, R.right, p);
        if (p < 1) {
          ctx.globalAlpha = 1 - p;
          ctx.setLineDash(DASH);
          ctx.beginPath();
          ctx.moveTo(x0, ry);
          ctx.lineTo(x1, ry);
          ctx.stroke();
        }
        const a =
          0.85 * p * (1 - easeInOut(clamp((t - L.endAt - T.emphasisHold) / (T.emphasis - T.emphasisHold))));
        if (a > 0.01) {
          ctx.globalAlpha = a;
          ctx.setLineDash(DASH_STRONG);
          ctx.strokeStyle = inkStrong;
          ctx.beginPath();
          ctx.moveTo(x0, ry);
          ctx.lineTo(x1, ry);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        if (t >= L.endAt && !crossfading) {
          crossfading = true;
          rule.style.opacity = "";
          rule.animate([{ opacity: 0 }, { opacity: 1 }], { duration: T.crossfade, easing: "linear", fill: "backwards" });
        }
      }
      if (t >= L.endAt + T.emphasis) return finish();
    }
    raf = requestAnimationFrame(frame);
  }

  function finish() {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    canvas.remove();
    root.style.opacity = "";
    rule.style.opacity = "";
    for (const type of SKIP_EVENTS) removeEventListener(type, finish);
  }

  window.scrollTo(0, 0);
  // Keeps the column hidden once <html data-intro> (which hid it in CSS) is removed.
  root.style.opacity = "0";
  rule.style.opacity = "0";
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", zIndex: "80", pointerEvents: "none" });
  document.body.appendChild(canvas);
  for (const type of SKIP_EVENTS) addEventListener(type, finish, { passive: true, once: true });
  document.fonts.ready.then(() => {
    if (!done) raf = requestAnimationFrame(frame);
  });

  return finish;
}
