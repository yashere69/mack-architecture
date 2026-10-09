# Reference research: architecture-practice websites, distilled for MACK & CO

Method: headless Chromium at 1440×900 / 390×844: screenshots, computed styles, library detection, CSS motion scans,
first-load weight (taken via a proxy, so compare relatively). Not captured: Foster (Cloudflare serves a 404 to
headless), SANAA and sP+a (no response), SPASM (no official site found).

## 1. Per-site notes

**David Chipperfield Architects** (the strongest overall match for "established, restrained, precise")
- Arrival: no hero. A non-sticky text header (name, grey nav with the active item in black, Search), then one 914px
  centred news image, then 562px images staggered left/right with ~140px vertical drift.
- Type: a custom grotesk at 17.7px for nav, body and captions; 22px intros. The project title block is name / city /
  years stacked in Monument Grotesk 800 at 42px (−0.02em), so the metadata *is* the headline.
- Index: 4-up, 290px images on a ~365px pitch, 28px margins. Images keep native ratios (models on black, line
  sections, renders) and share one horizontal centre line per row (y=326). A floating "Grid | List | Filter +"
  pill sits bottom-centre, plus Newest/Oldest sort.
- Project page: portrait hero (1031×1307, left-aligned, not full-bleed), a 22px intro in a ~670px column, then a
  site-plan drawing used as an image. Widths vary through the page (1031 / 797 / 1383 / 914 offset right).
  A fixed "Data and credits" pill opens a right sheet (~65% wide): a two-column key/value table grouped as
  dates + GFA / client + team / consultants / photography. Related content as 327px cards.
- Motion: images reveal with `transform 1s cubic-bezier(.1,.6,.4,1)` plus a 1s fade; hovers 0.25s. Nothing else moves.
- Mobile keeps the staggered offsets and varied widths; a "Menu ≡" pill is fixed bottom-right (thumb zone).
- Perf: 1.3MB, 18 requests, LCP ≈1.1s (best measured).
- **Steal:** metadata as typography, and rhythm from image *width and offset*, not from effects.

**Snøhetta**
- One typeface, one weight (Dovre 300) at 18 / 22 / 32 / 48 / 60 / 96px. Hierarchy comes from size and grey
  (#949494) vs black, never from bold.
- Home: a 60px light manifesto line, then a filmstrip where the focused project is largest
  (231 → 346 → 519px, a 1 : 1.5 : 2.25 scale), captioned name (black) + descriptor (grey).
- Grid: 3 columns of 427px, 40px gutters and margins; text often starts at column 2 (x=507).
- Project page: 96/96px two-tone title (name black, descriptor grey), then years + disciplines on the column line,
  then a full-bleed 1440×1080 hero, breadcrumb, a 32/45px intro in the right two-thirds, and 4-column metadata
  (grey label over black value: Typologies, Status, Location, Client) with "+ View more".
- Gallery: 2/3 + 1/3 pairs (893 + 427px); 16px grey captions with photographer credit; a "Gallery" toggle switches
  to an image-only view.
- Motion: opacity 0.6s + transform 0.8s ease-out (sine/quint). Filters behind a 48px icon button bottom-left.
- **Steal:** the two-tone title (name + what it is) and a single typeface at a single weight.

**Herzog & de Meuron**
- Identity from a monospaced-looking grotesk ("Geometric", 16/27px) plus a heavy 23px "H&dM" wordmark. The menu
  overlay is pills (outlined = sections, filled grey = topics) plus a search line.
- Home: a feed of 1300px media (17 videos), each with a centred two-line mono caption (type, then name).
- Index: 13-column micro-thumbnail grid (natural ratios in square cells), a −/+ zoom control bottom-centre that
  changes density, and Grid / List / Map. List rows: 230px thumb, "708 Palace of Congresses", location, underline on hover.
- Project page: catalogue number + name, location, phase list (Competition / Project / Opening years), language
  toggle, ~930px mono text with a "+" expander. A right-side table of contents (Description, Visuals, Drawings,
  Team); the sticky centre header switches to the current section name. Full-width 1376px images, then a 3-up
  437px grid at native ratios, captioned with archive file codes. A fixed "Index" pill bottom-right.
- Swup page transitions; almost all motion is `opacity .25s ease-out`.
- **Steal:** catalogue numbering, a persistent "Index" return button, drawings as a first-class section.

**OMA**
- Nav is the logo: "OMA OFFICE WORK SEARCH" at ~96px Arial bold (SEARCH outlined), fixed over the hero,
  flipping black/white. Red-outlined news boxes with a dot-screen texture. Loud by design.
- Index: grouped by year (38px bold year in the left column), 364×205 thumbnails **all `grayscale(1)`**, so renders,
  models and photos read as one set. Filters: + STATUS / + TYPOLOGY / + PROGRAM; "View as" LIST / MAP (Mapbox).
- Project page: full-bleed 1440×974 hero with a 12px photo credit right-aligned under it, a 38px bold title, a
  19/25px intro in a centred 788px column with "Read more", then a **ruled metadata table** (1px rules; LOCATION,
  CLIENT, YEAR▼, STATUS, PROGRAM▼, PARTNERS (linked), TEAM▼, COLLABORATORS▼), then a 950px gallery column
  (one large image, then 626 + 302 pairs).
- LQIP blur-up via lazySizes. 1.2MB, LCP ≈2.1s.
- **Steal:** the ruled, expandable metadata table, and normalising mixed imagery at index level.

**BIG**
- A 9–12s black loader with a pixel logo, then one ~119,000px list with Lenis smooth scroll and a custom cursor.
  326 requests; LCP 12.3s in our test.
- Row: right-aligned title (18px) + uppercase grey location (15px) + a **black square pictogram per project**, next
  to a 433px native-ratio image.
- The top nav doubles as the discipline filter (ARCHITECTURE / INTERIORS / … / PRODUCTS), 50% → 100% opacity on
  hover. The search placeholder rotates suggestions. Items carry 0.78s sine in-out height/width transitions
  (inferred: the list reflows smoothly when filtered).
- **Steal:** a per-project glyph as an identity system. **Avoid:** the loader and the request count.

**Heatherwick Studio**
- A dimmed full-bleed video hero with a bouncing chevron, then an off-white #F4F3EF ground with Plantin Light 37/45px
  in desaturated green #48594A; the key phrase is underlined *as* the link.
- Nav is just "PROJECTS STUDIO … SEARCH" at 14px caps, 0.14em, 25px margins. Image/text blocks offset asymmetrically.
- GSAP fade-up and parallax plus AOS; 7.9MB first load.
- **Steal:** a coloured ink (not black) on a warm ground; a serif statement where the link is part of the sentence.

**Norm Architects** (architecture + interiors + furniture, the closest *portfolio* match)
- Warm ground #F5F1E5. Titles in Adobe Caslon caps at 13px with **0.6em tracking**; nav in Euclid 11px caps, 0.18em;
  vertical letter-stacked side labels ("RECENT").
- Rows run 2 : 1 : 1 (634 / 307 / 307px). Cards: spaced-caps title, 11px description, meta "ARCHITECTURE | RESIDENTIAL | 2026".
- **A joinery bench sits in the same grid as buildings** ("DESIGN | FURNITURE | 2026"): objects treated as projects.
- Weak points: hero slideshow with 30+ dots (two rows on mobile); **33MB** first load (32MB of images).
- **Steal:** objects as projects; wide-tracked serif caps for names only.

**John Pawson / Vincent Van Duysen**
- The homepage is one full-bleed photograph plus the name (Pawson: Univers Light 27px; VVD: Custodia serif 24px),
  with nav withheld until interaction. Pawson's is a horizontal slideshow. VVD's nav: Interior ► / Architecture ► /
  Products (incl. manufacturer collaborations) / News / Info.
- **Steal:** confidence through emptiness. The name plus one perfect image is enough.

**MVRDV**: slideshow hero with a 12-square pager, 173px condensed caps slogan, award-count headlines, desktop
hamburger. Corporate, not serene: mostly a list of things to avoid.

**Studio Mumbai**: the whole site is a satellite image of Mumbai, a red crosshair on the studio, and contacts in red.
No portfolio; withholding reads as status. Borrow the *posture* (a precise location plate, few words), not the withholding.

**Indian peers** (Studio Lotus, Architecture BRIO, RMA, Malik, Abin)
- Studio Lotus (Webflow): dimmed hero with a centred Roboto 100 tagline, boxed mega-menu, orange awards tile.
  Strong heritage/adaptive-reuse work, generic frame.
- BRIO: a 72px rounded-geometric title over the photo, shadowed bold-italic subtitle, lowercase spaced nav.
- RMA: a 2010s slider + thumbnail strip with pink/blue links, but excellent heritage subject matter.
- Malik: a dark Elementor template (slogan carousel with progress bars, "Scroll to discover", floating call button,
  Montserrat 100). Abin: a full-screen gradient manifesto gate with a mouse icon; the work sits behind it.
- **Implication:** the Indian peer set mostly reads as templates, so a Chipperfield/Snøhetta-grade site would put
  MACK in a category of its own locally.

## 2. The Cotton Studio: why it lands, and what to translate

Why it works (measured):
- **One warm ground, warm ink, one accent.** Paper #FAF6F1, ink #2A2024 (plum-black, never #000), terracotta
  #8C4224 only for italic words, prices and the primary CTA. Grounds change in chapters: cream → blush with a fine
  diagonal pinstripe → terracotta with a lattice pattern.
- **Three type voices, one job each:** Cormorant Garamond 500 display (66px hero / 52px sections / 46px product
  title, −0.01em); Hanken Grotesk UI (nav 12.5px caps, 0.13em, 600); ui-monospace eyebrows and breadcrumbs (10px caps, 0.34em).
- **Signature move:** a serif heading with one italic word in the accent colour ("Shop by *Category*").
- **Craft details:** a 1px hairline frame inset ~8px inside each category image (like a passe-partout), square
  buttons (radius 0), hairline dividers, underlined text links with arrows, mono breadcrumbs.
- **Unified art direction:** every image has the same warm walls, plants, golden side light and low contrast, so
  dozens of shots read as one body of work. This matters more than any layout choice.
- **One motion vocabulary everywhere:** rise `0.9s cubic-bezier(.16,1,.3,1)` (expo-out), staggered across tiles
  (mid-scroll: tiles 1–2 in, 3–4 pending); hero heading 0.7s; card hover a `.5s` lift on the same curve with an
  "Add to bag" bar sliding up; drawers 0.3s. The header overlays the hero, then turns solid cream on scroll and compacts (0.25s).
- **Pacing:** 80px gutter, 1280px container, left-aligned section heads with "View all →" right, big vertical gaps.
- **Mobile:** an app-like bottom tab bar, centred logo, 3-column category tiles, single-column cards, hero text bottom-left.

Translate to MACK: the warm ground + warm ink + single accent discipline; the serif / grotesk / mono role split;
one easing curve sitewide; hairline framing as a "drawing-sheet" detail (plate frames, ruled metadata); grading
every render and photo to one look; chaptered grounds, used sparingly (at most 2 ground colours).

Do NOT transfer: the scratch-card popup, floating "Swipe" stack and "SAVE ₹599" pill, promo bar, trust-icon row,
script logo, "SALE" repeated as type, ambient drifting particles (21–36s loops), 7s logo "breathing", three competing
CTAs, reviews/stars, pink grounds, rounded promo banners, and the colour-italic on *every* heading (once per page at most).

## 3. Distilled principles for MACK

Arrival
1. The first viewport is one image, the practice name, 3–4 nav words and a plate caption ("Project — Place, Year",
   12–13px). No slogan, stats, CTA buttons, loader or intro gate.
2. Make the hero 85–90vh so a caption line or a sliver of the next section shows. That signals scroll without
   chevrons or "scroll to discover".
3. Lead with the most photographic image (a real photo, or the most restrained render). One great image beats a slideshow.

Index and discovery
4. One Projects page is the main navigation, with a quiet Grid ⇄ List pill (bottom-centre on desktop, sticky bottom
   on mobile). List rows: number, name, place, year, typology, on 1px rules. Grid: native aspect ratios on a
   shared centre line (Chipperfield), never uniform 16:9 crops.
5. Filters are plain text toggles from real data (e.g. Architecture / Interiors / Object), with counts. Not dropdowns
   or chips. With ~10 projects, skip the map, or use a single plate of India with dots.
6. Normalise mixed CGI and photos through *treatment* (same grade, same ground, same mount margins), not gimmicks.
   OMA's grayscale index shows how strongly one treatment unifies a set.
7. Give projects catalogue numbers in MACK's own chronology (H&dM). It reads as archival and established.

Project page anatomy
8. Order: title block (name / place / year stacked at one size, or two-tone name + descriptor) → hero at the image's
   own ratio → 2–4 sentence intro at 20–24px in a ≤65ch column → metadata → image sequence → drawings and plans → next project.
9. Metadata: a ruled two-column key/value table (Location, Typology, Status, Year, Area, Client, Team, Collaborators,
   Photography / Visualisation). Expandable, or a right sheet behind a "Data and credits" pill.
10. Image rhythm: rotate full-bleed / 8-column centred / 2/3 + 1/3 pairs / offset single, never the same layout twice
    in a row, with at least one material or detail close-up per project. Sparse grey captions, 12–13px.
11. Credit honestly: label renders as visualisation and photos with the photographer. Established practices do this,
    and it defuses "is this CGI?" doubts.
12. "Next project" is one full-width link (name + small image). No related-projects carousel.

Image treatment
13. Grade all renders to one look: warm white balance, lower contrast and saturation, corrected verticals, eye-level
    crops, no dramatic sky replacements or lens flares. No text over images except the plate caption.

Typography
14. Two families plus an optional mono for metadata. Display 56–96px in light or regular (never black or heavy
    bold); body 17–18px/1.5; captions 12–13px. Caps only for short labels at +0.08–0.14em (0.3–0.6em only for
    1–3 words). Warm near-black ink, grey (~#8a8a85) as the second tone.

Grid and whitespace
15. A 12-column grid with margins equal to gutters: 28–40px desktop, 16–20px mobile (DCA 28, H&dM 32, Snøhetta 40).
    Section gaps of 120–200px.
16. Use asymmetry on purpose: centred 8-column images alternating with 5-column images pushed left/right and offset
    vertically (DCA 914 / 562px). No centred boxed containers.

Motion vocabulary
17. One curve, one duration family: reveals 0.8–1.0s expo-out (`cubic-bezier(.16,1,.3,1)` or DCA's `(.1,.6,.4,1)`),
    opacity plus ≤24px translate or an image clip/mask reveal; hovers 0.2–0.3s; page transitions as a 0.3–0.5s
    crossfade (the H&dM Swup approach).
18. Use: image reveal on enter, crossfade page transitions, header hides on scroll down and returns on scroll up,
    underline hovers, list-row hover preview, metadata sheet slide. Ban: custom cursors, loaders, scroll-jacking,
    text parallax, split-letter animations, marquees, autoplay dot sliders, ambient particles, bouncing chevrons.
    Honour `prefers-reduced-motion`.

Navigation
19. Name on the left; on the right a few quiet items (Projects, Practice, Contact) at 13–15px, active black,
    inactive grey. No desktop hamburger. On project pages a fixed "Index" pill returns to the list.

Objects (ORA)
20. Put the ORA console in the same index, typed "Object" (Norm's bench, VVD's Products). Its page leads with detail
    and joinery shots and a dimensions/materials table: the same anatomy at a smaller scale.

Mobile
21. Recompose rather than shrink: keep the offsets (DCA does), default to list view, put the menu pill bottom-right
    in thumb reach, fold metadata into an accordion, alternate full-bleed with inset images.

Performance
22. Budget: ≤1.5MB first load, ≤25 requests, LCP <1.5s (DCA: 1.3MB / 18 req / 1.1s). AVIF/WebP with `srcset`;
    LQIP or dominant-colour placeholders (OMA blur-up) so CLS is 0; lazy-load below the fold. Never a 30MB homepage
    (Norm) or 300+ requests (BIG).

Context
23. Heritage-adjacent work (Udaipur, Agra Fort, Red Fort) deserves drawings, site plans and a location plate (the DCA
    site plan; Studio Mumbai's crosshair map). Precision of place reads as seriousness.

## 4. Anti-patterns observed (cheap or templated, even on big names)
- **Loaders and gates:** BIG's 9–12s pixel loader, Abin's gradient manifesto gate, Cotton's scratch-card popup.
- **Dimmed hero with a centred slogan in a thin font:** Studio Lotus (Roboto 100), Malik, BRIO (72px rounded type,
  shadowed italics), MVRDV (giant condensed caps).
- **Stats and awards as headlines:** MVRDV's award count; Studio Lotus's orange "100 best firms" tile.
- **Pagers everywhere** (Norm's 30+ dots wrapping on mobile, MVRDV's 12-square rail); **desktop hamburgers** hiding 4–6 links.
- **Floating widgets** (call/WhatsApp buttons, Snøhetta's data-settings toast over content), and **"scroll to discover"**
  text, bouncing chevrons and mouse icons (Heatherwick, Malik, Abin).
- **SaaS-template tells to avoid entirely:** centred H1 + subhead + two buttons; rounded-2xl cards with shadows,
  glassmorphism, gradient blobs; bento grids, icon trust rows, testimonial carousels, logo walls; chips/pills as
  decoration; Inter or Montserrat at default tracking; uniform 16:9 thumbnails with zoom-on-hover.
- **Loud identity devices** that only work for their owner (OMA's 96px wordmark nav and red news boxes, BIG's
  pictogram list, H&dM's pill menu). Borrow the logic, not the look.
- **Unoptimised media:** Norm's 33MB homepage, Heatherwick's 7.9MB, BIG's 326 requests.
