# EvaraTech — Website

Marketing site for **EvaraTech**, a smart-water IoT and AI platform: non-intrusive
retrofit devices that make existing tanks, borewells, meters and pumps report on
themselves, tied together by the EvaraOne cloud platform.

## Stack

- **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4**
- **Framer Motion** for the motion system · **Lenis** smooth scroll
- Static generation (SSG) — every route is pre-rendered

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Environment

| Variable               | Required | Purpose                                                        |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical origin for SEO metadata, sitemap, robots, JSON-LD. Falls back to `https://evaratech.com`. |

See `.env.example`.

## Deployment (Vercel)

The repository is wired for CI/CD: pushing to `main` triggers a Vercel build and
deploy. No `vercel.json` is needed — Vercel auto-detects Next.js.

On first setup, in the Vercel project:

1. Import this GitHub repository.
2. (Optional) set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Add the custom domain `evaratech.com`.

## SEO

- Per-page metadata, canonical URLs, OpenGraph + Twitter cards (`src/app/layout.tsx`,
  product pages).
- `sitemap.xml`, `robots.txt`, and a web app manifest generated from
  `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`.
- Organization, WebSite and Product JSON-LD structured data.

## Project layout

```
src/
  app/            routes, metadata, sitemap/robots/manifest
  components/
    sections/     homepage sections
    site/         nav, footer, cards, scrubber, shared UI
    illustrations/ per-device SVG mechanism diagrams
    seo/          JSON-LD helper
  lib/            site config, product/company data, motion presets
public/
  images/         product photography, brand, OG card
  frames/         scroll-scrubbed image sequences
  icons/          PWA icons
```
