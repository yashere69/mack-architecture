# MACK & Co Architects — website

Next.js 16 (App Router, **static export**), React 19 View Transitions, GSAP (ScrollTrigger, SplitText) + Lenis for scroll choreography — declared with `data-m` attributes, run by `src/components/motion/MotionDirector.tsx`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # → out/ (static site + responsive image variants)
npm run preview    # serve out/ locally
npm run media      # rebuild image masters, manifest and share images from media-src/sources.json
```

## Deploying to Netlify
- **Drag and drop:** run `npm run build`, then drop the `out/` folder (or its zip) onto https://app.netlify.com/drop.
- **From Git:** connect the repo; `netlify.toml` sets `npm run build` / publish `out`.
- `_redirects` (old URLs → new) and `_headers` (caching, security) are applied automatically.
- **Contact form:** in Netlify → Site configuration → Forms, *enable form detection*, then redeploy.
  Submissions appear under Forms (set email notifications there). Until then the form opens the
  visitor's email app with the message prefilled.

## Where things live
- `context/` — project memory: canonical facts (`SOURCE.md`), media notes, research, design system, decisions. Read first.
- `src/content/` — all copy and data (projects, objects, studio facts). Edit here; pages follow.
- `src/content/media.generated.json` — generated; do not edit by hand.
- `public/media/` — graded WebP masters (next/image serves responsive AVIF/WebP from these).

## Adding a project
1. Add image URLs to `media-src/sources.json` (`key: "<slug>/<nn>"`, `drawing: true` for plans/sketches) and run `npm run media`.
2. Add an entry to `src/content/projects.ts` (facts only — leave unknown fields out) and a cover to `scripts/build-og.mjs`.

## Build-time environment
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for canonical/OG URLs (default `https://mack-architecture.vercel.app`). Set to the real domain before the launch build. |
| `ALLOW_INDEXING=1` | **Set only on the real production launch.** Without it every deployment sends `noindex` and `robots.txt` disallows all, so demos/previews never appear in search. |
