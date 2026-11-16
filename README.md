# Portfolio

A personal portfolio: a home page, case studies (`/work`) and Matchday notes (`/notes`). Built with Next.js 16.4 (App Router, Cache Components), React 19, Tailwind v4 and shadcn/ui. Every page is prerendered at build time.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; every route must prerender
npm run lint
npx tsc --noEmit
```

## Where things live

| What | Where |
|---|---|
| Name, role, email, links, domain | `lib/site.ts` |
| Home intro, stack, services | `content/home.ts` |
| Case studies | `content/work.ts` |
| Project screenshots | `assets/images/<slug>/`, static-imported from `content/work.ts` |
| Notes | `content/notes/000N.mdx`, registered in `lib/notes.ts` |
| Colours, type scale, motion | `app/globals.css` |

`lib/site.ts` also sets the canonical URLs, sitemap, structured data and share images from the site URL: set `SITE_URL` (e.g. `https://franklineosoro.dev`) when deploying to a custom domain. On Vercel, the project's production URL is used until then. Case studies and notes are still mock data and switched off (`workPublished`, `notesPublished`).

## Working on it

Read [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md) and [docs/BUILD_PLAN.md](docs/BUILD_PLAN.md) first. The design handoff (`design_handoff_portfolio/`) is local only and git-ignored.
