# Coding standards

Read this before building anything in this repo. It applies to people and to coding agents. The phase checklist and the code map are in [BUILD_PLAN.md](BUILD_PLAN.md).

The rules serve three goals, in this order:
1. Match the design exactly.
2. Keep the site fast: static HTML, minimal JavaScript, good Core Web Vitals.
3. Keep the code small, reusable and easy to change.

## 1. Before you write code

- [ ] Read the phase you're building in [BUILD_PLAN.md](BUILD_PLAN.md), plus its code map and conventions.
- [ ] Read the matching section of `design_handoff_portfolio/README.md`, and open the prototype (`Portfolio.dc.html`) to see the real behaviour. The prototype markup is a reference: rebuild it, don't copy its inline styles.
- [ ] Read the relevant guide in `node_modules/next/dist/docs/` for any Next.js API you use. This is Next 16.4, and APIs differ from older versions.
- [ ] Check whether a component, helper or token already exists (`components/`, `lib/`, `app/globals.css`) before writing a new one.

## 2. Design fidelity

- Colours, type sizes, spacing, radii, motion timings and copy come from the README. Don't approximate, and don't "improve" the design.
- The only approved deviation is the darker light-mode grey (`--sub: #6b6b6b`). Raise any other change before making it.
- Check every screen against the prototype in light and dark mode, at about 375px and about 1280px wide.

## 3. Server and client components

- **Server components are the default.** Add `"use client"` only when a component needs state, effects, event handlers or browser APIs.
- **Keep client components small and at the leaves.** Put interactivity in a small component (`CopyEmailButton`) and render it inside a server component. Never mark a whole page or layout as client.
- **Pass only serialisable props to client components:** strings, numbers, plain objects and React elements. No class instances or functions defined on the server.
- **Export only components (and their types) from `"use client"` files.** A constant or helper exported from a client file becomes a client reference when a server component imports it. Shared values go in `lib/`.
- **Never let markup depend on browser-only state.** The theme, `localStorage`, `matchMedia` and window size are unknown on the server. Style those cases with CSS (`light:`/`dark:` variants, media queries), or read them through `useSyncExternalStore` with a server snapshot.

## 4. Components and reuse

- **Extract on the second use**, or sooner when a block has its own clear meaning (for example `SectionLabel` or `HalfwayDivider`). Don't build abstractions for one-off markup.
- **One component per file, with named exports.** Default exports only where Next.js requires them (`page.tsx`, `layout.tsx` and other route files).
- **Small, typed props.** Model alternatives with a union prop (`surface: "tile" | "paper"`, `size: "md" | "sm"`), not several booleans. Accept `className` for layout tweaks from the parent, merged last with `cn()`.
- **Compose with `children`.** Don't pass many content props when `children` works.
- **Variants belong in `cva`** (see `components/ui/button.tsx`). Don't scatter conditional class strings for a component's visual variants.
- **shadcn/ui is the only component library.** Add components with `npx shadcn@latest add <name>`, then:
  - fix their imports to `@/lib/utils`
  - restyle them to the design tokens
  - delete variants and files the design doesn't use
  - check `package.json` afterwards: the CLI has installed an unrelated package here before
- **Links stay links.** For a link that looks like a button, use `buttonVariants()` on `<Link>`/`<a>`. Use `<Button>` only for actions.

## 5. Styling

- **Tailwind classes only.** No inline `style` except for values computed at runtime (for example a CSS variable such as `style={{ "--delay": "0.22" }}`). No CSS modules or CSS-in-JS. The exception is `next/og` image routes (`opengraph-image`, `icon`), which render outside the page CSS and need inline styles.
- **Design tokens only.** Tailwind's default palette, type scale and radii are removed:
  - colours: `bg-tile`, `text-ink`, `text-sub`, `border-border`, `text-accent`…
  - text sizes: `text-2xs` (11) through `text-4xl` (40)
  - radii: `rounded-sm` (6) through `rounded-2xl` (16)

  A one-off value from the README may use an arbitrary class (`max-w-[880px]`). If it repeats, make it a token in `app/globals.css`.
- **Prefer canonical classes** when the editor suggests them (`h-5.5`, not `h-[22px]`).
- **Merge classes with `cn()`**, never string concatenation.
- **Reusable CSS patterns become `@utility` rules** in `globals.css` (see `dashed-x`), not copy-pasted arbitrary values.
- **Put the accent only where the README allows it:** link hover, project titles on hover, small labels, the case-study title, section numbers and one box per diagram.

## 6. React practices

- **Derive, don't store.** If a value can be computed from props or other state, compute it during render. No `useState` mirrors of props.
- **Effects only synchronise with external systems:** DOM APIs, timers, subscriptions, animations. Not for data flow or derived state.
  - Every effect that subscribes, sets a timer or starts an animation returns a cleanup.
- **External stores use `useSyncExternalStore`** (see `hooks/use-theme.ts`), not `useEffect` plus `useState`.
- **Keys are stable IDs** (`slug`, `number`), never array indexes for data lists.
- **Event handlers do the work.** Respond to clicks in the handler, not in an effect that watches state.
- **No premature memoisation.** Add `useMemo`, `useCallback` or `memo` only for a measured problem.
- **Custom hooks** start with `use`, live in `hooks/`, and do one thing.
- **Refs are for imperative DOM work** (animations, measuring), not for storing render data.

## 7. TypeScript

- `strict` stays on. No `any`, no `@ts-ignore`, no non-null `!` without a comment explaining why it's safe.
- Content types live next to their accessors (`lib/work.ts`, `lib/note-types.ts`). Data files are typed against them.
- Prefer union types over enums, and `as const` / `satisfies` for literal config.
- Accessors that can miss return `T | undefined`. Routes turn `undefined` into `notFound()`.
- Use `import type` for type-only imports.

## 8. Content and data

- **No copy hard-coded in components.**
  - Identity and contact details: `lib/site.ts`
  - Case studies: `content/work.ts`
  - Notes: `content/notes/*.mdx`
- **Components read content through accessors** (`getCaseStudies`, `getNote`…), never by importing data files directly.
- **Dates are stored as ISO strings** and formatted with `lib/format.ts`. Render them in `<time dateTime="…">`.
- **To add a note,** create `content/notes/000N.mdx` exporting `meta`, then register it in `lib/notes.ts`.

## 9. Performance

- **Every route is static.** Use `generateStaticParams` for dynamic segments. Never read `cookies()`, `headers()` or `searchParams` on these pages.
- **Ask before adding any dependency.** The approved list is in [BUILD_PLAN.md](BUILD_PLAN.md#dependencies). Prefer platform APIs: CSS, the Web Animations API, View Transitions, `IntersectionObserver`, `navigator.clipboard`.
- **Ship as little client JavaScript as possible.** Check the output of `next build`. Code only some visitors need (the blueprint intro) is loaded with a dynamic `import()` when it will run.
- **Animations:**
  - Prefer CSS. Animate only `opacity` and `transform` where possible.
  - Pause looping animations when they're off-screen.
  - Under `prefers-reduced-motion`, everything shows its final state.
  - Content must be visible in the server HTML, never hidden waiting for JavaScript.
- **No layout shift:**
  - Give media fixed aspect ratios (`aspect-video`).
  - Load fonts through `next/font` only.
  - Reserve space for anything that changes text (for example "Copy email" → "Copied ✓").
- **Images:** the design has none. If real images are added later, use `next/image` with explicit sizes.

## 10. Accessibility

- **Semantic HTML first:** `main`, `header`, `nav`, `article`, `section`, `aside`, `footer`, `figure`/`figcaption`, `time`, and buttons for actions. Use ARIA only where HTML can't express it.
- **One `h1` per page, with headings in order.** Visual style and heading level are separate: use the right element, then style it.
- **Decorative elements get `aria-hidden="true"`:** dividers, icons, mock product screens. A screen inside a link must not leak its text into the link's name; give the link a clear label instead.
- **Every interactive element:**
  - works with the keyboard
  - shows the `:focus-visible` outline
  - has an accessible name (`aria-label` on icon-only buttons)
- **Changing feedback is announced:** "Copied ✓" sits in an `aria-live="polite"` region.
- **New colour pairs must meet WCAG AA contrast** (4.5:1 for small text).

## 11. SEO

- **Every route exports `metadata` or `generateMetadata`** with a unique title and description, a canonical URL and Open Graph data.
- **Links between pages use `<Link>`** with real URLs. Never use hash routing or `onClick` navigation.
- **Structured data (JSON-LD) is built from content data,** never written by hand per page.

## 12. Files, naming and imports

- **Files:**
  - `kebab-case.tsx`; components are `PascalCase` inside
  - hooks: `use-*.ts`
  - route-only components live next to their route; shared ones go in `components/`
- **Folders:**
  - `app/`: routes only
  - `components/ui/`: shadcn
  - `components/`: site components, grouped into subfolders (`home/`, `work/`, `notes/`) as they grow
  - `hooks/`, `lib/`, `content/`, `types/`
- **Imports:** always through the `@/` alias, never `../../`. Order them as external packages, then `@/` modules, then relative and styles, with a blank line between groups.
- **Comments explain why, not what.** Add a one-line doc comment on each exported component or helper whose purpose isn't obvious from its name.

## 13. Definition of done

Run these before marking any checklist item complete:

- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes, and every route is listed as static (○ or ●).
- [ ] Screens match the prototype in light and dark mode, on mobile and desktop.
- [ ] Keyboard-only pass: everything is reachable and the focus is visible.
- [ ] Reduced motion: no animation plays, and final states show.
- [ ] No hydration warnings or console errors in the browser.
- [ ] No new dependency unless it was approved.
- [ ] [BUILD_PLAN.md](BUILD_PLAN.md) checkboxes and code map are updated.

## 14. Git

- `design_handoff_portfolio/` is never committed: it's git-ignored and lint-ignored.
- Commit only when asked. Use one logical change per commit, with a message that says what changed and why.
