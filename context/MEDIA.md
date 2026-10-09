# Media inventory & art direction

Pipeline: `media-src/sources.json` (URL list from the client CMS) → `npm run media` → `public/media/<project>/<nn>.webp`
(q90 masters, native size, never upscaled) + `src/content/media.generated.json` (w, h, blur, dominant colour).
Raw downloads live in `media-src/raw/` (gitignored; the script re-downloads them if missing).

Nature of the material: mostly CGI renders (Enscape-style, golden-hour). Real photography: **Agra Fort**, **Red Fort**
(professional, many portrait 720px-tall → small/medium display only), **Earthen Room** (phone photos).
Drawings: Udaipur axonometric, Earthen Room rendered plan, ORA sketches → shown on paper ground with caption.

| Project | Count | Best hero | Notes |
|---|---|---|---|
| Udaipur Resort | 6 | 01 driveway at dusk (1600w) | Strongest architecture set. 06 = axonometric drawing. |
| Red Fort Project | 10 | 11 living (1920w) | Real photos. Dropped 01/02 (burnt-in title & text slides). 8 portrait/small → pairs & triptychs. |
| RC House | 6 | 01 street elevation (1360×1156, near-square) | Exterior architecture; 02 file named "ChatGPT Image…" (client asset — used as provided). |
| The 31st | 15 | 01 living | Three evident rooms: living/dining (01–05), guest bed (06–11), bath (12–15). 02≈04 near-duplicate angle. |
| Agra Fort Project | 13 | 14 skylight living (1920w) | Real photos. Dropped 01/02 text slides. 11 spiral stair = most sculptural detail. |
| Gandhinagar House | 3 | 01 (1024w) | Low-res: never full-bleed above ~1024 CSS px. |
| The Earthen Room | 4 | 01 photo w/ figure | Phone photos (1280w). 04 plan drawing 2400w. |
| Figuring Out | 4 | 01 | 1623w renders. |
| House 2 | 5 | 01 | Dropped 03 (exact duplicate of 01). |
| Kids Room | 5 | 02 triangle shelf | 1280w; 01≈03 variant views. |
| ORA (object) | 4 | 01 | 03/04 sketches (small). |
| studio/* | 3 | — | From old home slideshow, NOT attached to any project → never caption as a project. |

Resolution rule: display width (CSS px × DPR) should not exceed ~1.15× native width. Sub-1300px images are never full-bleed.
