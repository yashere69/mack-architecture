# Decisions

Format: **Decision** → reason → consequence in code.

## Content & honesty
- **Only facts from the client's own site/material** (context/SOURCE.md) → no fabricated prestige → unknown fields are simply absent (no years, status, clients, team, awards).
- **Label imagery as Photography or Visualisation** per project → renders must never read as built work → `imagery` field in `src/content/projects.ts`, shown in metadata, index preview, home features.
- **Agra/Red Fort text slides become real HTML**; slides themselves dropped from galleries → burnt-in text is unreadable/unindexable → `description`/`quote` fields; "designed by Gurudevshri" omitted pending client clarification.
- **Quote attributed to "Karan Desai" only** → source names his firm "Karan Desai Architecture and Design"; relation to MACK & Co unconfirmed → no founder named anywhere else.
- **Studio statement = client's own words, grammar tidied** → no invented manifesto → `site.statement`.
- **3 unattributed home-slideshow images** used only on /studio, uncaptioned → can't be assigned to a project.
- **Scope taxonomy = the studio's tagline** (Architecture · Interiors · Objects), assigned from what imagery shows → filters, home hero, catalogue.

## Direction
- **Exhibition hang, not full-bleed cinema** → most files are 1,600–1,920px, soft at full-bleed on retina; also "projects as artworks" → images sized by native resolution, varied widths/offsets (DCA model), `src/lib/sequence.ts`.
- **Home first viewport = tagline as live index + one aperture image, no autoplay** → research: one great image, no sliders; the words give exploration on demand → `HomeHero` (hover/focus swaps image with a "blind" reveal).
- **Lead image: Udaipur Resort** → the client's own chosen flagship (old home slide 1); Interiors → Agra Fort photo (circular skylight echoes the monogram's C).
- **Newsreader (opsz) + Jost** → serene/established serif distinct from Cotton Studio's Cormorant; Jost's circle/triangle/square construction echoes the MACK monogram.
- **Warm lime-plaster paper, warm ink, one night tone, no accent colour** → architecture supplies colour; restraint.
- **House grade in the pipeline** (sat 0.88, matte lift, warm whites; drawings untouched) → renders + photos cohere as one body of work.
- **ORA in the same index as an "Object"** → Norm/VVD model; filters map 1:1 to the tagline.

## Motion
- **One curve (expo-out), reveals ~1s, hovers 0.25–0.45s, page crossfade 0.3/0.7s** → research consensus.
- **Aperture reveal = ground-coloured cover lifting (transform only)** → clip-path on the frame broke IntersectionObserver (zero-area target) and is costlier.
- **Shared-element cover morph via React `<ViewTransition>` + click-time naming** → continuity index/home/threshold → project hero; names assigned on click so a project can appear twice per page; hero releases its name on outbound click (duplicate names abort transitions).
- **Cinematic pass (client request, coquelicots.nl as motion reference): GSAP ScrollTrigger + SplitText + Lenis** → scroll-scrubbed choreography needs one timeline engine; Lenis is driven by the GSAP ticker so both share a frame. Still no custom cursor, no loader.
- **Choreography is declared in markup (`data-m`, `data-bg`) and run by `MotionDirector` per route** → server components stay server components; one place to tune; `gsap.matchMedia` reverts everything on navigation and on breakpoint/reduced-motion change.
- **Three tiers: cinema (≥64rem), light (<64rem: no pinning, clip reveals play once, ~55% amplitudes), reduced (no GSAP motion, no Lenis)** → mobile stays light; nothing is hidden without JS.
- **Pinning = CSS `position: sticky` inside a tall track, scrubbed by ScrollTrigger** (home hero 260svh, Udaipur walkthrough 100svh + 60svh/view) → no pin-spacer reflow, survives refresh mid-page.
- **Statement + Selected work are one opaque curtain** that rises over the held hero → the reference's "next section slides over the pinned hero", without a gap.
- **Above-the-fold heroes use `cover` (starts at rest, clamp() start)** → no jump on load.
- **CSS reveal (`data-reveal`) kept for everything not choreographed**; a Picture with `motion` opts out of it to avoid two systems on one transform. The earlier CSS scroll-timeline "drift" was retired in favour of `data-m="parallax"`.

## UX
- **Mobile menu bottom-right (thumb zone), rises from bottom**; button/panel live outside the header (a translated header would re-anchor `position: fixed`).
- **Fixed "Index" control on project pages appears only inside the gallery**, hides at the next-project threshold.
- **Contact form → Netlify Forms** (`public/__forms.html` definition); success only when Netlify accepts it, otherwise prefilled mailto → no silent loss, no fake success.

## Technical
- **Static export (`output: 'export'`) for Netlify drag-and-drop** (user's host choice) → no server: `scripts/build-variants.mjs` pre-generates image widths 96–1920 (2400 = master) used by `src/lib/image-loader.ts`; redirects/headers in `public/_redirects` + `_headers`.
- Next 16.4 App Router, React 19.3 ViewTransition.
- Fonts self-hosted & subset; italic not preloaded (same family via an extra @font-face) → 140KB fonts on most pages.
- Indexing is opt-in (`ALLOW_INDEXING=1`, never on Vercel previews) → a demo must not be indexed with client details before approval → `src/lib/indexing.ts` drives meta robots + robots.txt. Old site was `noindex` everywhere.
- Legacy URLs 301 → new (`/about`, `/products/*`, `udaipurresort`, `the31st`, `gandhnagar-house`).
