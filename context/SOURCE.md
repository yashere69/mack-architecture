# MACK — Canonical Source Facts

Extracted 2026-10-09 from the client's current site https://mack-architecture.vercel.app/
(Next.js; content served from a CMS; images on Vercel Blob `hseiltzr3u804ti3.public.blob.vercel-storage.com/media/`).
This file is the single source of truth. **Anything not listed here is UNKNOWN — do not invent it.**

## Identity
| Field | Value | Provenance |
|---|---|---|
| Name | MACK & CO ARCHITECTS (site `<title>`); H1 misspelt "ARCHITECHTS" on old home | title tag |
| Tagline | "Architecture. Interiors. Objects." | meta description |
| Logo | Geometric 2×2 monogram: M (square w/ V-notch), A (triangle), C (circle w/ 90° wedge), K (square w/ notch). Traced to SVG → `src/components/Logo.tsx` | logo PNG |
| Language | en | html lang |

## Contact (verbatim)
- Email: `macka@gmail.com`
- Phone: `+91 9998000393`
- Address: Shah Industrial Estate, 1001 PARINEE I, 7-A, Andheri West, Mumbai, Maharashtra 400053
- Map link: https://maps.app.goo.gl/LDt3TN9yLwB5n6yg7
- Instagram: https://www.instagram.com/karandesai_a.d/
- Visits: "By appointment only*"
- Contact form fields: Reason [Connect with designers | Apply for a career], Name, Email, Message, Website (optional portfolio link), consent checkbox ("I agree to the Privacy Policy and Terms & Conditions and consent to the studio responding to my inquiry.")

## Studio statement (only "about" copy that exists; on old contact page)
> We are not a normal team of architects and interior designers, but a unified movement of innovators and creators of unique design experiences. We offer extraordinary design solutions which contribute to the well-being of our customers and bring real value to their life and work. By entering the space we created, you will feel as if you were in your imagination.

The old /about page is EMPTY (heading only). No team, founding year, awards, press, clients or stats exist.

## People (ambiguous — needs client confirmation)
- The Red Fort text slide quotes **"Karan Desai, Founder and Principal Designer at Karan Desai Architecture and Design"**; the site's Instagram is `karandesai_a.d`.
- Relationship between "MACK & CO" and "Karan Desai Architecture and Design" is NOT stated. Do not name a founder for MACK on the site until confirmed.

## Projects (order = old /projects index order)
Old project pages contain ONLY a title + image gallery. Metadata below comes from image alt text or text slides inside galleries.

| # | Title | Old slug | Location (source) | Description (source) | Imgs |
|---|---|---|---|---|---|
| 1 | Udaipur Resort | udaipurresort | "Rajasthan, India" (index alt) | — | 6 (5 renders + 1 axonometric) |
| 2 | Figuring Out | figuring-out | — | — | 4 renders (interior) |
| 3 | The 31st | the31st | "Ahmedabad" (index alt) | — | 15 renders (living, guest bed, bath) |
| 4 | House 2 | house-2 | — | — | 6 renders (01 & 03 are duplicates) |
| 5 | The Earthen Room | the-earthen-room | "Ahmedabad" (index alt) | — | 3 photographs + 1 rendered plan |
| 6 | Gandhinagar House | gandhnagar-house (sic) | — (name only) | — | 3 renders |
| 7 | Kids Room | kids-room | — | — | 5 renders |
| 8 | RC House | rc-house | — | — | 6 renders (exterior; one file named "ChatGPT Image…") |
| 9 | Agra Fort Project | agra-fort-project | Shrimad Rajchandra Ashram, Dharampur (title slide) | see below | 15 (2 are text/title slides) |
| 10 | Red Fort Project | red-fort-project | Shrimad Rajchandra Ashram, Dharampur (title slide) | see below | 12 (2 are text/title slides) |

**Agra Fort — text slide (verbatim):** "The AGRA Fort Project is a playful, personalized bedroom designed by Gurudevshri. It features an automated Murphy bed, a sliding partition for a TV, an adjustable study table, a spiritual valley view, and backlit Vondom furniture. The project combines functionality, tech, and aesthetics, creating a stronghold of individuality and comfort. The design is a blend of contemporary and timeless elegance, showcasing creativity in every corner."
⚠ "designed by Gurudevshri" may mean "for" — ambiguous; flagged to user.

**Red Fort — text slide (verbatim):** "This second home, located on the Ashram premises of the Shirmad [sic] Rajchandra Mission, Dharampur, of a family from Mumbai reflects the serene environment of it's surroundings, while also catering to all the modern comforts and aesthetic requirements of it's owners. The family coprises [sic] of a young couple, their elderly parents and twin daughters. “We were not allowed to do much structurally, no plumbing work was possible in the bathroom too. But we changed the flooring to SPC, and redid some electric wiring too” says Karan Desai, Founder and Principal Designer at Karan Desai Architecture and Design"

Unknown for ALL projects: year, status, area, client, collaborators, photographers, typology labels (we infer only broad, visually evident scope: e.g. "Interior", "Residence", "Hospitality" — see DECISIONS.md).

## Objects / Products
| Name | Type | Material | Images |
|---|---|---|---|
| ORA | Console Table | Wood | 4 (2 renders, 2 sketch drawings) |
Enquiry = mailto `macka@gmail.com?subject=Product inquiry: ORA`.

## Legal copy (verbatim, old site)
- Privacy: inquiry data (name, email, reason, message, optional portfolio link) stored in the studio's inquiry inbox; authorised studio editors can access; site uses no advertising/analytics cookies; contact via email.
- Terms: images/design work belong to respective rights holders; contact before reproducing; images & descriptions are a portfolio, not specifications; an inquiry doesn't establish a client relationship or confirm an appointment; external sites operate independently.

## Old site technical state (for the "before" comparison)
- `<meta name="robots" content="noindex, nofollow">` on every page → site is invisible to search.
- No OG tags, no canonical, no structured data, no sitemap verified.
- Fonts: Geist + Montserrat. Dark scrimmed fullscreen slideshow home with no copy; rounded image cards with text overlaid; black-box lightbox gallery per project.
- Home slideshow also used 3 images NOT attached to any project (gazebo pavilion, arched courtyard pool, TV-wall interior) — treat as UNATTRIBUTED.
