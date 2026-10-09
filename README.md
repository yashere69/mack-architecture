# MACK & Co Architects — website

Next.js 16 (App Router, static), React 19 View Transitions, no UI or animation libraries.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run media      # rebuild image masters, manifest and share images from media-src/sources.json
```

## Where things live
- `context/` — project memory: canonical facts (`SOURCE.md`), media notes, research, design system, decisions. Read first.
- `src/content/` — all copy and data (projects, objects, studio facts). Edit here; pages follow.
- `src/content/media.generated.json` — generated; do not edit by hand.
- `public/media/` — graded WebP masters (next/image serves responsive AVIF/WebP from these).

## Adding a project
1. Add image URLs to `media-src/sources.json` (`key: "<slug>/<nn>"`, `drawing: true` for plans/sketches) and run `npm run media`.
2. Add an entry to `src/content/projects.ts` (facts only — leave unknown fields out) and a cover to `scripts/build-og.mjs`.

## Environment
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (default `https://mack-architecture.vercel.app`). Set to the real domain at launch. |
| `INQUIRY_WEBHOOK_URL` | Where contact-form JSON is POSTed (studio inbox / automation). Unset → the form opens a prefilled email instead. |
| `NOINDEX=1` | Force `robots: disallow` (Vercel preview deployments are excluded automatically). |
