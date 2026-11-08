# Phase prompt

Copy the prompt below into a new session, replacing `<N>` with the phase number.

---

Build phase <N> of the portfolio.

**Read first, in this order, before writing any code:**
1. `docs/CODING_STANDARDS.md`: the rules for all work in this repo.
2. `docs/BUILD_PLAN.md`: the phase <N> checklist, the code map and the decisions. Don't re-open settled decisions.
3. `design_handoff_portfolio/README.md`: the sections that cover this phase. Also open `Portfolio.dc.html` / `ProjectScreen.dc.html` / `blueprint-intro.js` where relevant to see exact markup, values and timings.
4. The `node_modules/next/dist/docs/` guide for every Next.js API you use. This is Next 16.4.
5. The existing code you will build on: `app/globals.css`, `components/`, `lib/`, `content/`.

**Build:**
- Do everything in the phase <N> checklist, and nothing from later phases. If something from a later phase seems necessary, say so instead of building it.
- Match the design exactly: colours, sizes, spacing, copy and timings. Ask before any visual change.
- Reuse existing components, tokens and helpers. Make new shared pieces only where the standards say to, and add them to the code map.
- Server components by default. Use small client components only where interaction needs them.
- No new dependencies unless I approve them.

**Verify (the "Definition of done" in the standards):**
- `npx tsc --noEmit`, `npm run lint` and `npm run build` all pass. Every route shows as static.
- Compare each new screen with the prototype in light and dark mode, at about 375px and about 1280px. Check keyboard navigation and reduced motion.
- If you can't do a check (for example, no browser available), say so clearly. Don't claim it passed.

**Finish:**
- Tick off the phase <N> items in `docs/BUILD_PLAN.md` and update the code map with any new files or conventions.
- Don't commit unless I ask.
- Reply with a short summary in plain language:
  - what you built
  - anything that differs from the plan or the design, and why
  - any check you couldn't run
  - open questions before the next phase
