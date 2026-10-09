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
- **No GSAP, no Lenis, no custom cursor, no loader** → not needed; CSS + IO + View Transitions cover it; native scroll.
- **Drift = CSS scroll-driven animation** (`animation-timeline: view()`), progressive enhancement.

## UX
- **Mobile menu bottom-right (thumb zone), rises from bottom**; button/panel live outside the header (a translated header would re-anchor `position: fixed`).
- **Fixed "Index" control on project pages appears only inside the gallery**, hides at the next-project threshold.
- **Contact form posts to `/api/inquiry` → `INQUIRY_WEBHOOK_URL`**; without it, 503 → prefilled mailto → no silent loss, no fake success.

## Technical
- Next 16.4 App Router, all pages static (SSG) except `/api/inquiry`; React 19.3 ViewTransition.
- next/image from q90 WebP masters (`public/media`), AVIF/WebP variants, qualities [70, 82].
- Fonts self-hosted & subset; italic not preloaded (same family via an extra @font-face) → 140KB fonts on most pages.
- Robots: production indexable; Vercel preview/`NOINDEX=1` → disallow. Old site was `noindex` everywhere.
- Legacy URLs 301 → new (`/about`, `/products/*`, `udaipurresort`, `the31st`, `gandhnagar-house`).
