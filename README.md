# Portfolio

The personal site of Frankline Osoro, an AI fullstack engineer. It has a home page, case studies (`/work`) and Matchday notes (`/notes`).

**Live site:** [frankline.dev](https://www.frankline.dev/)

## Stack

- **Next.js 16** with the App Router and Cache Components. Every page is prerendered at build time.
- **React 19** and **TypeScript**
- **Tailwind CSS v4** and **shadcn/ui**
- **MDX** for the notes
- Generated Open Graph images, sitemap, robots file and structured data

## Run it locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; every route must prerender
npm run lint
npx tsc --noEmit
```

## Project layout

| What | Where |
|---|---|
| Name, role, email, links | `lib/site.ts` |
| Home intro, stack, services | `content/home.ts` |
| Case studies | `content/work.ts` |
| Project screenshots | `assets/images/<slug>/` |
| Notes | `content/notes/000N.mdx`, registered in `lib/notes.ts` |
| Colours, type scale, motion | `app/globals.css` |

## Deploying

The site is built for Vercel. Set `SITE_URL` (for example `https://www.frankline.dev`) when using a custom domain. Canonical URLs, the sitemap, structured data and share images all use it. Until it's set, the Vercel production URL is used.
