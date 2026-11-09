# Portfolio build plan

This plan turns the design handoff in `design_handoff_portfolio/` (local only, git-ignored) into a fast, SEO-ready Next.js site. The design is high fidelity: colours, type, spacing, motion timings and copy must match the prototype. The only intentional change is the light-mode grey (see Decisions).

Before building any phase, read [CODING_STANDARDS.md](CODING_STANDARDS.md).

Read `design_handoff_portfolio/README.md` for the full spec. `Portfolio.dc.html` holds the markup and the `CASES` / `NOTES` data, `ProjectScreen.dc.html` the five product screens, and `blueprint-intro.js` the first-load intro.

## Stack

- Next.js 16.4 (App Router, `cacheComponents`, `partialPrefetching`), React 19.3, TypeScript
- Tailwind v4 through `@tailwindcss/turbopack` (no PostCSS config)
- shadcn/ui as the only component library
- Before writing Next.js code, check the matching guide in `node_modules/next/dist/docs/`. This Next version differs from older ones.

## Decisions

| Topic | Decision |
|---|---|
| Case-study background | Case studies use the normal theme background (`bg`), not the README's paper. Their borders use `border` and the diagram boxes and next card use the `tile` fill. The paper/paper-border/ticket tokens are removed. |
| Index page header | /work and /notes use the same top header as detail pages: "← Back" on the left and the theme toggle on the right, 980px wide. The sticky aside keeps only the heading and description. The README puts the pill and toggle inside the aside. |
| Case-study hero width | The hero screen sits in the 560px text column, not the README's 880px, so the page keeps one content width. The header stays 880px. |
| Light-mode grey (`--sub`) | `#737373` → `#6b6b6b`. The old value fails WCAG AA on tiles (4.35:1). The new one passes on white (5.3:1), tile (4.9:1) and paper (4.6:1). Dark mode is unchanged. |
| First-visit intro | As in the prototype: the home column starts hidden, the lines draw, then each block fades in (blur 8→0, rise 6px) and the lines retract. "The stack" starts 1500ms into the intro. Home page only, once per session, never with reduced motion. If the intro never starts, the column shows after 7s. **Trade-off accepted (phase 6):** this delays home-page LCP on first visits (about 3–4s on throttled mobile, budget < 2.0s), and Lighthouse always tests a first visit, so the home page's mobile Performance score will miss the ≥ 95 target. Phase 5 had drawn the lines over visible content instead; the owner preferred the designed order. |
| Content | Case studies are typed TypeScript data (`content/work.ts`). Notes are MDX (`content/notes/*.mdx`). |
| Routing | Real routes replace the prototype's hash routes. |
| Copy | Keep the mock content (Northwind, metrics, links) until real details arrive. Keep it in data/MDX only, never in components. |

## Dependencies

Runtime packages to add:

| Package | Use |
|---|---|
| `clsx`, `tailwind-merge` | shadcn `cn()` helper |
| `class-variance-authority` | Button and Badge variants |
| `radix-ui` | `Slot` (button-styled links) and Toggle Group (theme switch) |
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` | MDX notes (compiled at build time) |

shadcn/ui components: **Button**, **Toggle Group**, **Badge**. Add them with `npx shadcn@latest add`. Don't install the CLI as a dependency.

Do not add: framer-motion / motion, GSAP, next-themes, next-seo, next-sitemap, schema-dts, @vercel/og, tw-animate-css, sonner, lucide-react (the two icons stay inline SVG), any chart library, gray-matter, contentlayer. Each one has a native or built-in replacement.

## Performance budget

- Every route is built ahead of time. Nothing renders per request.
- Client JavaScript only for: theme toggle, Copy email, shimmer replay, first-visit intro (loaded only when it will play).
- Product screens: CSS keyframes only, animating opacity and transform only, paused off-screen.
- No layout shift from fonts or theme.
- Lighthouse targets on mobile: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100. LCP < 2.0s, CLS < 0.05, INP < 200ms.

## Phases

Every phase ends with these checks:
- `npm run build` passes.
- `npm run lint` passes.
- The new screens match the prototype side by side, in light and dark mode, at mobile and desktop widths.

### Phase 1: Foundation

- [x] `app/globals.css`:
  - [x] `@import "tailwindcss"`
  - [x] design tokens on `:root` and `[data-theme=dark]`, mapped into Tailwind `@theme`
  - [x] base styles: link hover, `:focus-visible`
  - [x] reduced-motion rule
- [x] Geist Mono (400/500) through `next/font/google`, exposed as `--mono`. The system font stack is the body font.
- [x] Inline `<head>` script reads `localStorage['pf-theme']`, falling back to `prefers-color-scheme`, and sets `data-theme` before first paint. Add `suppressHydrationWarning` on `<html>`.
- [x] Initialise shadcn/ui (`components.json`, `lib/utils.ts`) and restyle Button, Toggle Group and Badge to the design tokens. Remove shadcn's default theme variables.
- [x] Shared components:
  - [x] `ThemeToggle`: pressed state comes from CSS, so the server HTML is always correct
  - [x] `BackPill`
  - [x] `HalfwayDivider`
  - [x] `SectionLabel`
- [x] Content layer:
  - [x] `content/work.ts`: typed `CASES`, ported from the prototype
  - [x] MDX configured in `next.config.ts`, plus `mdx-components.tsx`
  - [x] `content/notes/0001–0003.mdx` with frontmatter-style exports: number, date, read time, title, excerpt, figure, caption
- [x] Root layout with `lang`, `metadataBase` and default metadata.

#### Code map and conventions (from phase 1)

| Path | Holds |
|---|---|
| `app/globals.css` | Tokens (`--bg`, `--ink`, `--sub`…), Tailwind `@theme` mapping, `light:`/`dark:` variants, `dashed-x`/`dashed-y` utilities |
| `components/ui/` | shadcn/ui: `button` (variants `pill`, `surface`, `outline`), `badge` (`outline`), `toggle-group` |
| `components/` | Site primitives: `theme-toggle`, `theme-script`, `intro-script` (phase 5), `shimmer-replay` (phase 5), `back-pill`, `halfway-divider`, `section-label`, `icons` |
| `hooks/use-theme.ts` | Reads `<html data-theme>`; returns `null` during SSR |
| `lib/` | `site.ts` (identity, `mailto()`), `theme.ts`, `format.ts`, `work.ts` (types + accessors), `notes.ts` (MDX registry + accessors), `note-types.ts`, `utils.ts` (`cn`) |
| `content/` | `work.ts` (case-study data), `notes/*.mdx` (each exports `meta`) |
| `types/mdx.d.ts` | Types `meta` on `*.mdx` imports |

- Only design colours exist in Tailwind (`bg-tile`, `text-ink`, `border-border`…). Default palette, type scale and radii are cleared. Sizes are `text-2xs` (11) `xs` (12) `sm` (13) `base` (15) `lg` (17) `2xl` (28) `3xl` (36) `4xl` (40). Radii are `rounded-sm` (6) `md` (8) `lg` (10) `xl` (15) `2xl` (16).
- Theme-dependent styling uses `light:`/`dark:` variants, never React state, so server HTML is correct before hydration.
- Links that look like buttons use `buttonVariants()` on `<Link>`/`<a>`. `<Button>` is only for actions.
- Components are server components unless they need state or browser APIs. Never export non-component values from `"use client"` files.
- To add a note: create `content/notes/000N.mdx` exporting `meta`, then register it in `lib/notes.ts`.
### Phase 2: Home (`/`)

- [x] Avatar, name and role.
- [x] Intro paragraphs with the highlighter marks.
- [x] "The stack" block: 4 rows with per-row label colours and hairlines; each skill is its own list item, set apart by a 16px gap (no separators) so keywords scan individually.
- [x] Halfway-line divider: static now, animated in Phase 5.
- [x] Tile grid:
  - [x] Selected work: full-width tile with the Relay screen (static final frame; the 7s loop is Phase 3)
  - [x] Matchday notes: 3 post rows with thumbnail SVGs and a "New" tag
  - [x] Work with me: mailto service rows, Book a call, Copy email ("Copied ✓" for 1.6s)
- [x] Footer links.
- [x] All hover states: tile border, media zoom, accent label, press scale, title accent, arrow nudge, thumbnail scale, avatar scale.

#### Code map and conventions (from phase 2)

| Path | Holds |
|---|---|
| `app/page.tsx` | Home: composes the blocks below. The footer sits outside `<main>` so it is the page's `contentinfo` landmark |
| `components/tile.tsx` | `Tile` + `tileVariants({ pressable })`: tile surface, `group/tile` hover border, `.99` press on linked tiles |
| `components/home/` | `intro`, `highlight` (cva tones blue/orange/pink), `stack-list`, `tile-header`, `selected-work-tile`, `notes-tile`, `work-with-me-tile`, `copy-email-button` (client), `home-footer`, `cooking-tile` (client) + `cooking-pot`: the "Something's cooking" Selected work tile shown while `workPublished` (content/work.ts) is false; /work routes 404 and leave the sitemap until it's true. `notes-tile` likewise lists outside reads (`readsTile`, content/notes-index.ts) while `notesPublished` is false, and /notes 404s |
| `components/notes/note-figure-icon.tsx` | Tiny figure SVG per `NoteFigureKind`. Phase 4 reuses it for the /notes thumbnails |
| `components/work/project-screen.tsx` | `ProjectScreen`: container-query `em` frame, `aria-hidden`. Phase 3 added the other kinds and the loop (see below) |
| `lib/home.ts`, `content/home.ts` | Home types and accessors (`getIntro`, `getStack`, `getServices`), and the home copy |
| `app/globals.css` | New token `--tracking-label` (.04em) → `tracking-label` |

- **Column widths are content widths.** The prototype has no `box-sizing` reset, so its `max-width` excludes padding. With Tailwind's border-box, add the gutters: the home column is `max-w-148` (560 + 2×16). The 980px index pages in Phases 3 and 4 need `max-w-[1012px]`.
- **Tailwind v4 uses the `scale`/`translate` properties**, not `transform`. Hand-written transitions must name them (`[transition:border-color_.24s_ease,scale_.12s_ease-out]`). `transition-transform` already covers them.
- **Hover groups are named** after what they wrap: `group/tile`, `group/post`, `group/svc`.
- **Stack hairlines are `::before`/`::after`** on each `<dl>` row, because a `dl` row may only hold `dt`/`dd`. They are `origin-left`, ready for the Phase 5 scaleX draw-in.
- ~~Until Phase 4 adds `/notes` and `/notes/*`, prefetching those links logs 404s in the console.~~ Resolved in Phase 4: every home link now has a route.

### Phase 3: Work (`/work`, `/work/[slug]`)

- [x] `ProjectScreen` with kinds relay, ledgerlens, flowpilot, scout and pulse:
  - [x] container-query `em` sizing
  - [x] 7s CSS loop with per-element entry times from the README
  - [x] hidden from assistive tech, with a text label
  - [x] final static frame with reduced motion
  - [x] paused when off-screen
- [x] `/work`:
  - [x] page header with back pill and toggle; sticky aside with heading and description
  - [x] card grid: screen, title, year, blurb, stat line
- [x] `/work/[slug]` template:
  - [x] page background: the normal theme background (see Decisions; replaced the paper background)
  - [x] header, meta line, accent title, statement and hero screen
  - [x] sections 01–07: architecture flow with dashed connectors and outcome split, decisions, results, stack badges
  - [x] next-project card, looping Pulse → Relay
- [x] `generateStaticParams` for all five slugs, plus a 404 for unknown slugs.

#### Code map and conventions (from phase 3)

| Path | Holds |
|---|---|
| `app/work/page.tsx` | /work: `IndexLayout` + `WorkCard` grid |
| `app/work/[slug]/page.tsx` | Case-study template, `generateStaticParams`, `generateMetadata`; unknown slugs call `notFound()` |
| `components/index-layout.tsx` | `IndexLayout`: `PageHeader width="index"`, then the 980px page with a sticky aside (h1, description) beside the list. Phase 4 reuses it for /notes |
| `components/page-header.tsx` | `PageHeader`: back pill (+ optional "Name / Section") left, toggle right. `width: "article"` (880px) or `"index"` (980px) |
| `components/next-card.tsx` | `NextCard`: "Next project" / "Next note" tile card, optional blurb as children. Phase 4 reuses it for posts |
| `components/pause-offscreen.tsx` | `PauseOffscreen` (client): `<div>` that sets `data-loop-paused` while off-screen (IntersectionObserver) |
| `components/work/project-screen.tsx` | `ProjectScreen`: frame + window chrome for all five kinds; `label` gives it `role="img"`, otherwise `aria-hidden` |
| `components/work/screens/*-screen.tsx` | One mock product UI per case study (relay, ledgerlens, flowpilot, scout, pulse) |
| `components/work/` | `work-card`, `case-section` (numbered section + `SectionLabel`), `architecture-flow` |
| `lib/loop-timing.ts` | `loopAt(at, length?)`: per-element `linear()` easings for the loops, as `--loop-enter` / `--loop-fade` |
| `lib/work.ts`, `content/work.ts` | Added `CaseStudySlug`, `WorkIndex` + `getWorkIndex()`, `caseStudyScreenLabel()` |
| `app/globals.css` | Tokens `--spacing-page-top` (home padding, sticky offset) and `--spacing-below-header` (content gap under `PageHeader`); `loop-*` keyframes and utilities |

- **Screen loops:** add `loop-in` (fade + rise), `loop-grow-x`/`loop-grow-y` (bars; pair with `origin-left`/`origin-bottom`) or `loop-wipe` + child `loop-unwipe` (left-to-right reveal) to an element, with `style={loopAt(at)}`. Keyframes all run 0 → 1; the per-element `linear()` easing places the entry in the 7s cycle, so timings stay exact without per-element keyframes. Only `opacity`, `translate` and `scale` animate: the prototype's clip-path typing and stroke-dashoffset line draw are transform wipes. Under reduced motion the global rule removes the animations, leaving the final frame. The loops run in the server HTML; JavaScript only pauses them off-screen.
- **Content-box heights:** the prototype's `min-height` + padding is content-box. Use `box-content` where a prototype block has both, as the screens do.
- The `[slug]` fallback shell for unknown slugs shows as ◐ in `next build`. All five real slugs are fully prerendered (no postponed state). `dynamicParams = false` isn't available with Cache Components, and `ensureStatic = "navigation"` doesn't change it.

### Phase 4: Notes (`/notes`, `/notes/[num]`)

- [x] `/notes`:
  - [x] sticky aside
  - [x] Medium-style list: label, title, 2-line excerpt, date and read time, 112×80 thumbnail
  - [x] hover states
- [x] `/notes/[num]` template:
  - [x] header and meta row
  - [x] 28px title
  - [x] MDX body (paragraphs and h2 subheads)
  - [x] figure with caption
  - [x] divider and next-note card, looping 0001 → 0003
- [x] Figures as server-rendered SVG components:
  - [x] Brier line chart (0003)
  - [x] log-loss bars (0002)
  - [x] Matchday bot chat card (0001)
- [x] Dates rendered with `<time dateTime>`.
- [x] `generateStaticParams` for all three posts, plus a 404 for unknown numbers.

#### Code map and conventions (from phase 4)

| Path | Holds |
|---|---|
| `app/notes/page.tsx` | /notes: `IndexLayout` + `NoteRow` list |
| `app/notes/[num]/page.tsx` | Post template, `generateStaticParams`, `generateMetadata`; unknown numbers call `notFound()` |
| `components/notes/note-row.tsx` | `NoteRow`: /notes list row (label, title, excerpt, date + read time, 112×80 `NoteFigureIcon` thumbnail), `group/post` hover |
| `components/notes/note-figure.tsx` | `NoteFigure`: tile box + mono caption around a post's figure |
| `components/notes/figures/` | `brier-chart` (0003), `log-loss-bars` (0002), `bot-message` (0001): server-rendered, data and copy come in as props |
| `mdx-components.tsx` | Also registers `NoteFigure`, `BrierChart`, `LogLossBars`, `BotMessage`, so notes use them without imports |
| `lib/notes.ts`, `content/notes-index.ts` | Added `NotesIndex` + `getNotesIndex()` (the /notes heading and description) |

- **Figures live in the MDX body** where they appear: `<NoteFigure caption={meta.caption}><LogLossBars bars={logLoss} /></NoteFigure>`. A figure's data and copy are exported from (or written in) the note's own MDX file, never in the component. `meta.figure` still picks the thumbnail.
- **Post body spacing** comes from the template: the MDX renders `p`, `h2` and `figure` as siblings inside a `flex flex-col gap-4` wrapper; `h2` adds `mt-4` and the figure `my-4`, matching the prototype's flex (non-collapsing) margins.
- The Brier series in `0003.mdx` are the prototype's generated curves, precomputed to 6 decimals (paths match the prototype to within 0.1 viewBox units). Replace with real data.
- `/notes/[num]` shows the same ◐ fallback shell as `/work/[slug]`; all three posts are fully prerendered (○). The first request to an unknown slug or number streams the not-found page with a 200 status (with `noindex`), and repeat requests return 404.

### Phase 5: Motion

- [x] Route enter on every navigation and on non-intro loads:
  - [x] opacity, blur 8→0 and rise 6px over 600ms
  - [x] staggered 70ms, capped at 8 blocks
  - [x] CSS driven, replayed with `template.tsx`
- [x] Skills animation: hairlines scale in, then labels and items slide in (README timings).
- [x] Divider shimmer: plays twice after the enter, or at 3.6s into the intro; mouse-enter replays it once; ball pulse.
- [x] Theme switch: circular reveal with `document.startViewTransition`, falling back to an instant switch.
- [x] Blueprint intro:
  - [x] ported from `blueprint-intro.js` into a client component
  - [x] dynamically imported only when it will play
  - [x] skipped on key press, pointer-down or popstate; gives up after 7s
  - [x] skills animation starts at 1500ms into the intro (restored in phase 6, with the hidden-column reveal; see Decisions)
- [x] Reduced motion: every animation and transition off, final frames shown.

#### Code map and conventions (from phase 5)

| Path | Holds |
|---|---|
| `app/template.tsx`, `app/work/template.tsx`, `app/notes/template.tsx` | Route templates: return `children`, so the page remounts on every navigation and its CSS animations replay. One per segment level, because a template only remounts when its own child segment changes (`/work/relay` → `/work/pulse` needs `app/work/template.tsx`) |
| `app/globals.css` → "Page motion" | `enter-N` (route enter, N × 70ms), `stack-reveal`, `shimmer-sweep`/`shimmer-ball`, the `[data-intro]` rules, the view-transition reset; tokens `--ease-shimmer` and `--font-mono-system` (`font-mono-system`: glyphs Geist Mono lacks, e.g. the → in mono labels, which would otherwise come from next/font's Arial fallback) |
| `lib/motion.ts` | `enterClass(index)`: `enter-N` for list items, capped at 8 |
| `components/index-layout.tsx` | Also exports `INDEX_LIST_ENTER` (2): the enter index of an index page's first list item |
| `lib/intro.ts`, `components/intro-script.tsx` | `introInitScript`: `<head>` script that decides whether the intro plays and sets `<html data-intro>`; `INTRO_STORAGE_KEY`, `introGuideColor` |
| `lib/blueprint-intro.ts` | `runBlueprintIntro(root, rule, colours)`: the canvas intro, ported from `blueprint-intro.js`. Returns a skip function |
| `components/home/blueprint-intro.tsx` | `BlueprintIntro` (client): loads `lib/blueprint-intro.ts` with `import()` only when `<html data-intro>` is set, then moves the marker to `[data-intro-played]` |
| `components/shimmer-replay.tsx` | `ShimmerReplay` (client): the home divider's wrapper; mouse-enter remounts the shimmer layers with `data-shimmer-replay` (one sweep, no delay) unless one is running |
| `lib/theme.ts` | Added `switchTheme(theme, origin)`: circular reveal with `document.startViewTransition`, instant without it or with reduced motion. `ThemeToggle` calls it on click (Enter/Space included) |

- **Route enter:** give each top-level block `enter-0` … `enter-8` in page order (`enterClass()` for list items). Order per page: home: top row, h1, intro, stack, divider, tiles, footer. Index pages: `PageHeader` 0, aside 1, list items from 2. Case studies: header, meta, title, statement, hero, sections 01–07 (04–07 share the cap). Posts: header, meta, title, body. The next-project / next-note card doesn't animate, as in the prototype.
- **Intro states:** `<html data-intro>` (decided in `<head>`, before paint): the route enter is off; the home column (`[data-intro-root]`) and its divider line are hidden, the stack and shimmer paused, and both show after 7s if the intro never starts. `[data-intro-played]` on the column: the intro has started; it keeps the column hidden with an inline style until it measures, then reveals each `data-skel` block with the Web Animations API. The route enter stays off, and the stack (1500ms) and shimmer (3600ms) time from the intro's start. Intro blocks are marked `data-skel="<corner radius>"`; the divider line is `[data-divider-rule]`.
- **Stack timing** uses `--stack-start` and each row's `--row` index (inline CSS variable). **Shimmer** uses `--shimmer-start` and `--shimmer-count`.
- The shimmer animates `mask-position` (on a 1px line), and the route enter animates `filter: blur()`, because the design requires both. Everything else animates only opacity, translate and scale. The ball's border-colour pulse is an ink ring fading in over the border.

### Phase 6: SEO and performance

- [x] Per-route metadata with `generateMetadata`:
  - [x] title template and description
  - [x] canonical URL
  - [x] Open Graph and Twitter cards
- [x] Generated `opengraph-image.tsx` (`next/og`) for home, each case study and each post, in the design's style.
- [x] `app/sitemap.ts`, `app/robots.ts`, icons and manifest.
- [x] JSON-LD:
  - [x] Person and WebSite (home)
  - [x] CreativeWork (case studies)
  - [x] BlogPosting (posts)
  - [x] BreadcrumbList (case studies and posts)
- [x] Semantic pass: heading order, landmarks, link names, alt text and labels.
- [x] Try `experimental.inlineCss` and keep it only if it helps first-visit LCP.
  - Not kept. Mobile LCP (median of 5, throttled like Lighthouse's mobile defaults) changed by about ±150ms with no clear direction: / 4696→4340ms, /work 1816→1952, /work/relay 2644→2764, /notes 1288→1108, /notes/0003 1420→1252. Desktop was unchanged. It also stops the CSS (8.7KB gzipped) being cached across pages.
- [x] `ensureStatic` where it guards static output.
- [x] Review the client JavaScript for each route.
- [ ] Lighthouse on every route type, mobile and desktop: fix anything below the budget above.
  - **Lighthouse itself not run yet** (it couldn't be installed in the build environment). Instead, measured with local Chrome over the DevTools protocol under Lighthouse's default throttling. Mobile LCP: /notes 1.3s, /notes/0003 1.4s, /work 1.8s (all within budget); /work/relay 2.0–2.6s; / 4.3–4.7s (the accepted first-visit intro, see Decisions). Desktop LCP ≤ 1.8s except / (2.9s, intro). CLS 0 on every route.
  - /work/relay: the LCP element is the "01 The problem" paragraph, which the design's route enter staggers in as block 5 (350ms delay + 600ms fade). Bringing it under 2.0s means changing the enter timing: an open design question, not changed.
  - Also checked: no console errors or hydration warnings; one h1 per page and no skipped heading levels; every link and button has an accessible name; a visible focus outline on every tab stop; no running animations under reduced motion.

#### Code map and conventions (from phase 6)

| Path | Holds |
|---|---|
| `lib/metadata.ts` | `pageMetadata({ title, description, path, type?, publishedTime?, absoluteTitle? })`: title, description, canonical, Open Graph and Twitter card for a route |
| `lib/structured-data.ts` | JSON-LD builders from content: `personJsonLd`, `websiteJsonLd`, `caseStudyJsonLd`, `blogPostingJsonLd`, `breadcrumbJsonLd`; `JsonLdNode` type |
| `components/json-ld.tsx` | `JsonLd`: renders nodes as one escaped `@graph` script |
| `lib/site.ts` | Added `description` (default meta description), `locale` (`en_GB`) and `absoluteUrl(path)` |
| `lib/og.ts` | `ogSize`, `ogContentType`, `ogColors` (light tokens as plain values: keep in sync with `globals.css`), `ogFont`, `ogFonts` (TTFs read at module scope) |
| `components/og/` | `og-card` (1200×630 card: avatar + "Name / Section", meta line, title, statement, halfway divider) |
| `assets/fonts/` | Geist 400/500/600 and Geist Mono 400 TTFs (SIL OFL), read at build time by the image routes only |
| `app/opengraph-image.tsx`, `app/work/[slug]/opengraph-image.tsx`, `app/notes/[num]/opengraph-image.tsx` | Share cards. /work and /notes inherit the home card |
| `app/icon.tsx`, `app/apple-icon.tsx`, `lib/icon-mark.ts` | The site mark: a ball on the halfway line inside code brackets, "( ● )", on a mown accent-green pitch. `icon` serves it as SVG (sharp at any tab size); `apple-icon` renders it full bleed at 180px. Replaces Next's default `favicon.ico` (removed) |
| `app/manifest.ts`, `app/sitemap.ts`, `app/robots.ts` | Built from `lib/site.ts` and the content accessors |
| `app/layout.tsx` | Metadata defaults only (no canonical, so not-found doesn't inherit `/`); `ensureStatic = "navigation"` |

- **New route checklist:** export `metadata` / `generateMetadata` built with `pageMetadata()`, render its JSON-LD with `<JsonLd>`, add it to `app/sitemap.ts`, and give dynamic segments `generateStaticParams` (the build fails otherwise, because of `ensureStatic`).
- **`ensureStatic = "navigation"`** on the root layout makes the build fail if any route reads `cookies()`, `headers()`, `connection()` or uncached data (checked by adding `connection()` to /work).
- **Image routes** (`opengraph-image`, `icon`) are the one place inline `style` is used throughout: `next/og` renders outside the page CSS and supports only flexbox. Read assets at module scope: a handler that awaits file I/O while prerendering counts as dynamic under Cache Components. Don't use `generateImageMetadata` in dynamic segments: its `[__metadata_id__]` routes aren't prerendered for the parent params, so `alt` is static per route type.
- **Twitter cards** take their title, description and image from Open Graph (Next fills them in), so `pageMetadata` sets only `twitter.card`.
- **Client JavaScript** (modern browsers, gzipped): about 158KB on every route, almost all React and the Next runtime. App code: theme toggle (Radix Toggle Group, ~21KB, the largest app piece), Copy email, shimmer replay, `PauseOffscreen`, intro loader. The intro's canvas code is a separate chunk loaded only when it plays; the ~40KB core-js chunk is `noModule`, so modern browsers skip it.

#### Review fixes (after phase 6)

| Path | Change |
|---|---|
| `app/layout.tsx` | "Skip to content" link, visible on focus; every page's `<main>` has `id="main"` |
| `app/not-found.tsx` | Site 404 (page header, links to /work and /notes); also shown for unknown slugs |
| `components/external-link.tsx` | `ExternalLink`: new-tab link with `rel="noopener noreferrer"` and a screen-reader "(opens in new tab)". Use it for every off-site link |
| `components/ui/toggle-group.tsx` | Segments keep their 28×22 look; an `::after` extends the tap target to 30px tall |
| Footer, notes-tile and page-header links | Padding cancelled by negative margin (`-my-1 py-1`): 24px+ tap targets, no layout change |
| `next.config.ts` | Baseline security headers (nosniff, frame DENY, referrer, permissions). No CSP until the inline `<head>` scripts are hashed |
| `assets/images/avatar.jpg` | Profile photo (288px square crop). Home avatar via `next/image`; the Open Graph card via `OgAvatar` (`components/og/og-avatar.tsx`, data URL from `lib/og.ts`) |
| `components/page-header.tsx` | Below 480px only the name shows: "/ Section" repeats the back pill and ran under the toggle at 375px. Truncation stays as a fallback for very narrow screens |

- **New route checklist** (addition): give the page's `<main>` `id="main"` for the skip link.

## Later

- Swap in the real content: name, roles, companies, metrics, email, social links, cal.com link.
- Real-user Core Web Vitals reporting (`useReportWebVitals`, or Vercel Speed Insights if hosted on Vercel).
