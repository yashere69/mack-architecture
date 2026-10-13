# 03 — SEO strategy for MACK & Co Architects

An architecture-specific search strategy, not a generic small-business checklist.

Read with: `01-research-findings.md` for facts and sources, and `07-execution-guide.md` for how each step is done.

---

## 1. The premise

A studio like MACK is chosen on **trust and taste**, rarely on a single search. Search does three jobs, in order of value:

| Job | Query example | What the searcher already knows | What wins | Speed & control |
|---|---|---|---|---|
| **1. Confirm** | "MACK & Co Architects", "mack architects mumbai" | They've heard of MACK through a referral, Instagram or a publication | Website as first result, correct Business Profile panel, consistent details, strong project pages | **Fast and highly controllable.** Weeks after launch. |
| **2. Shortlist locally** | "architect in Andheri West", "interior designer Mumbai", "residential architect Mumbai" | They need a studio. They don't know MACK. | Business Profile prominence (relevance, distance, prominence), service pages, reviews, being cited in local roundups | **Competitive. Months.** Distance can't be changed. |
| **3. Discover through work** | "sandstone resort Rajasthan architecture", "second home interiors Dharampur", "jaali screen courtyard", "fluted console table" | They're browsing ideas, typologies or places | Rich project pages, well-described images, credits, internal links | **Long-tail, compounding.** Needs real project information. |

**Strategic order:** 1 → 2 → 3 in setup, then all three in parallel. Job 3 is where MACK's portfolio becomes a growing asset, and it depends on the studio supplying project facts.

> Note for the meeting: never present Job 2 or 3 as guaranteed. Present them as **built and measured**.

---

## 2. Intent & keyword model

### 2.1 Territories

| Territory | Intent type | Target page | Primary signal to measure |
|---|---|---|---|
| Branded | Navigational | Home, Studio, Contact, Business Profile | Branded clicks & CTR (Search Console branded filter) |
| Local commercial | Commercial/transactional | Studio location page(s), service pages, Business Profile | Business Profile calls, directions and website clicks. Non-branded impressions for local queries. |
| Service | Commercial investigation | Service pages (Architecture / Interiors / Objects) | Non-branded impressions and clicks to service pages |
| Project & typology | Informational → commercial | Project pages | Organic landings per project page |
| Image & inspiration | Informational (visual) | Project pages via Google Images | Search Console "Image" search type clicks |
| Careers | Navigational | Contact (careers reason) or a future Careers page | Form submissions with "career" reason (kept separate from client enquiries) |

### 2.2 Seed list (to validate, not to promise)

These are **hypotheses**. Each must be checked with Google autocomplete, a live results-page review, Keyword Planner ranges and, after launch, Search Console's real queries. Only keep queries for services MACK actually wants (Research §5.5).

- **Branded:** mack & co architects · mack and co architects · mack architects mumbai · mack architecture studio · (plus whatever the confirmed real-world name is) · principal's name + architect *(only if the studio wants personal-name search)*
- **Local commercial (Mumbai studio):** architect in andheri west · architects in andheri · interior designer andheri west · architecture firm mumbai · residential architect mumbai · home interior designer mumbai · luxury interior designer mumbai · architect near me *(no page targets "near me"; it is served by the Business Profile and proximity)*
- **Service and typology** *(confirm each)*: resort architect · hospitality architecture india · bungalow / villa architect · weekend home / second home interiors · bedroom interior design · kids room interior design · furniture design studio mumbai
- **Project and place:** udaipur resort architecture · rajasthan resort design · ahmedabad apartment interiors · gandhinagar house interior · dharampur second home · shrimad rajchandra ashram residence *(sensitive: confirm the client is comfortable being identifiable)*
- **Image and inspiration:** sandstone chhatri resort · cusped arch pool hall · perforated brick screen house · spiral staircase interior · fluted wooden console table

### 2.3 How to read a results page (decides where effort goes)

- **Top 10 dominated by directories and listicles** (Justdial, Houzz, "Top 20 architects in Mumbai"): page-level ranking is hard. The opportunity is the **Maps pack** and **getting included in those lists** (PR, profiles).
- **Top 10 are studio project pages and publications:** a strong project page can compete. Invest here.
- **Image pack or mostly Pinterest:** image SEO and descriptive project pages matter.
- **Local pack shown:** Business Profile quality plus proximity decide it. The website supports, but does not override, distance.

---

## 3. Information architecture & URL plan

### 3.1 Current (keep, it is sound)

```
/                         Home — studio, tagline, selected work
/projects                 Index (list/grid, filters: Architecture · Interiors · Objects)
/projects/<slug>          10 project pages
/objects                  Objects index
/objects/<slug>           ORA
/studio                   Studio (statement, address, visits by appointment)
/contact                  Enquiry form + contact details
/privacy-policy, /terms-and-conditions
```

### 3.2 Additions, in priority order

| Priority | Page | Why | Condition |
|---|---|---|---|
| Essential | **Studio location content on /studio** (address, map, "by appointment", how to visit, studio photos) | Location relevance for the Mumbai studio. The Business Profile's website link lands here or on the home page. | Real photos of the studio |
| Useful | **Service hubs: `/architecture`, `/interiors`** (and the existing `/objects`) | One strong page per real service, each with 300–600 words of what MACK does, how, for whom, and linked projects. Matches "service" intent without thin doorway pages. | Studio confirms services and approves copy |
| Useful (when 2nd studio opens) | **`/studio/mumbai` + `/studio/<city>`** with `/studio` as the hub | One page per *real* studio: address, appointment route, team there, projects nearby, its own structured data and Business Profile | Studio is open (or opening within 90 days), staffed, with signage |
| Optional | **`/journal`** | Only for real stories: project process, material notes, site visits, publication news | Someone at the studio wants to contribute 4–6 pieces a year |
| Unnecessary | City pages for places without a studio ("architect in Pune", "architect in Delhi") | **Doorway pages**, against Google's spam policies | — |

**URL rules:** lowercase, hyphenated, stable. Never change a live URL without a 301 in `public/_redirects`. No dates in project URLs.

---

## 4. Page standards

### 4.1 Titles & descriptions

| Page type | Title pattern | Example |
|---|---|---|
| Home | `<Studio name> — Architecture, Interiors & Objects, Mumbai` | MACK & Co Architects — Architecture, Interiors & Objects, Mumbai |
| Project | `<Project>, <Place> — <Typology> by <Studio>` (trim if > ~60 chars) | Udaipur Resort, Rajasthan — Resort architecture by MACK & Co |
| Service | `<Service> — <Studio>, Mumbai` | Interior design — MACK & Co Architects, Mumbai |
| Location | `<Studio> <City> — Studio, visits by appointment` | MACK & Co Architects Mumbai — Studio, Andheri West |

Descriptions: one factual sentence about what the page shows plus one about MACK's role, about 120–155 characters. No claims that can't be backed ("best", "award-winning") unless true and sourced.

### 4.2 Project page standard (the core asset)

Every project page should carry:

1. **Title block:** name, place (city/area, region), typology, scope (architecture/interiors/objects).
2. **Facts table:** location · typology · scope · status (built / in progress / concept) · year(s) · size (optional) · client type (e.g. "private residence", never a private client's name without permission) · collaborators · photography credit / "Visualisation".
3. **Narrative (150–400 words):** the brief, the site, the constraints, what MACK did and why, materials, outcome. First-hand detail is what Google's helpful-content guidance asks for, and what editors want.
4. **Images:** descriptive filenames, specific alt text, captions where useful, drawings shown as drawings, renders labelled as visualisation, photographers credited.
5. **Links:** to the service hub, related projects (same typology or place), and the contact page ("Discuss a similar project").
6. **Structured data:** `CreativeWork` (already present), with `locationCreated`, `dateCreated` (if known), `creator`, `image` as `ImageObject` with `creditText` / `creator` / `copyrightNotice`. Plus `BreadcrumbList` (present).

The **project information form** (Execution Guide §12) is the tool that gets these facts from the studio in about 10 minutes per project.

### 4.3 Image standard

- **Filename:** `<project>-<subject>-<detail>.webp`, e.g. `udaipur-resort-sandstone-facade-dusk.webp`. Rename at source in `media-src/sources.json` keys or in the pipeline output.
- **Alt:** describe what is visible, specifically. The repo already does this well. Don't stuff keywords.
- **Credit:** photographer name or "Visualisation: MACK & Co Architects". If any image was AI-generated or AI-composited, disclose it.
- **Size:** the pipeline already serves AVIF/WebP via `srcset`. Keep masters ≥ 2400 px where the source allows. Never upscale.

### 4.4 Accessibility where it overlaps with SEO

The new site already does much of this: a skip link, specific alt text, `prefers-reduced-motion` support, semantic headings and a `lang` attribute. Lighthouse accessibility scored 93–96 in the baseline. Keep it that way:

- One `<h1>` per page that reads correctly as text (fix the title/descriptor spacing, F10).
- Descriptive link text ("Udaipur Resort", not "click here"). Each project link names the project.
- Text contrast. The baseline flagged low contrast on the home statement lines while they animate. Check the final state meets WCAG AA.
- Captions and labels for drawings. Form fields with visible labels.
- These help screen-reader users **and** help search engines understand the page. Nothing is added "for SEO" that a person wouldn't benefit from.

### 4.5 Duplicate content & canonicalisation

- One primary host (`www` or apex) with 301s from the other, HTTP → HTTPS, and the old `vercel.app` host redirected after launch.
- Self-referencing canonical tags (already present). UTM-tagged URLs canonicalise to the clean URL.
- Don't publish the same project text on Archello/Architizer word for word before it's on MACK's site. Publish on the site first, then adapt the description for platforms.
- Project descriptions are written per project. No templated paragraphs with names swapped.

### 4.6 Structured data plan

| Entity | Type | Where | Status |
|---|---|---|---|
| Site name | `WebSite` (`name`, `alternateName`, `url`) | Home | **Add** |
| Studio | `ProfessionalService` (an `Organization` / `LocalBusiness` subtype) with name, address, telephone, email, url, logo, image, `sameAs` | Home (currently every page; fine) | Present. Update email, `sameAs`, `geo` |
| Each future studio | Own `ProfessionalService` node with its own `@id`, address, `geo`, `parentOrganization` | Its location page | Later |
| Project | `CreativeWork` + `BreadcrumbList` | Project pages | Present. Enrich (dates, place, image credits) |
| Object (ORA) | `Product` **only if** it has an offer (price/availability) or reviews. Otherwise `CreativeWork` | `/objects/ora` | **Fix** |
| FAQ / HowTo | — | — | **Don't.** No longer shown by Google. |
| Reviews of itself | — | — | **Don't.** Self-serving review markup isn't eligible. |

---

## 5. Local SEO

1. **Identity first.** One real-world name, one address format, one phone number, used identically on the website, Business Profile, Bing Places, Instagram bio and any directory.
2. **One profile per real studio.** Resolve the existing "KARAN DESAI, Architecture + Design" listing at the same address *before* creating anything (Execution Guide §9.1 decision tree).
3. **Profile quality:** the true primary category, a few accurate secondary categories at most, a factual description, services, real photos (studio exterior with signage, interior, team at work, completed projects), website link tagged with UTM, appointment/contact link. **No hours, because the studio works by appointment only** (per Google's guidelines).
4. **Reviews:** ask every client at natural milestones (handover, first visit back) with the profile's review link. Never incentivise, filter or write reviews. Reply to all reviews, briefly and professionally.
5. **Location page** on the website for each studio, matching the profile exactly.
6. **Other places that matter in India:** Bing Places (imports from Google), Apple Business (verify availability in India; optional). Professional bodies' directories if MACK's principals are members (Council of Architecture register, Indian Institute of Architects). **Skip mass directories.** Generic lead portals tend to attract low-intent calls. Claim the Justdial listing only if one already exists with wrong details.
7. **New studios:** set an opening date (up to a year ahead; the profile shows 90 days before opening) **only when the studio is real**. Lease signed, staff planned, signage coming.

---

## 6. Authority (off-site)

Authority for an architecture studio comes from **the work being published and cited**, not from link-building.

| Source | Value | How |
|---|---|---|
| Architecture publications (ArchDaily, Dezeen, Indian titles such as AD India, Elle Decor India, IndiaArtNDesign, The Architects Diary, Surfaces Reporter; verify each one's current submission route) | High: brand searches, credible links, and the referral-validation effect | A submission kit per built, professionally photographed project |
| Free platform profiles (Archello, Architizer) | Medium: project pages that rank for project names, plus a profile link | Upload 3–5 strongest projects with full credits |
| Collaborators & suppliers (furniture brands such as the Vondom pieces in Agra Fort, makers, consultants, photographers) | Medium: relevant, natural links | Ask them to credit MACK on their project pages |
| Professional bodies, alumni, institutions | Medium | Member directories, talks, juries |
| Local press / community (studio opening, events) | Low–medium | Only when there's real news |
| Paid links, link exchanges, PBNs, "guest post" packages, press-release wires for links | **Negative risk** | **Never** |

**The biggest lever is outside my control:** professional photography of completed projects. Make the case to the studio once, clearly, and let them decide.

---

## 7. Content plan (realistic cadence)

| Content | Cadence | Owner |
|---|---|---|
| Existing 10 projects rewritten to the standard | First 6–10 weeks, as info arrives | Me (draft) → studio (facts, approval) |
| New project published | Whenever a project has publishable images | Studio supplies, I publish |
| Service hubs (2–3 pages) | Once, then reviewed yearly | Me (draft) → studio (approve) |
| Business Profile updates (photos, news posts) | Monthly, only with real updates | Me |
| Journal (optional) | 4–6 genuine stories a year | Studio voice, I edit and publish |

**Don't:** generic "10 interior design tips" posts, AI-written blogs, or keyword pages without substance. They attract the wrong visitors and carry spam-policy risk.

---

## 8. Measurement (summary; full framework in `08-reporting-framework.md`)

- Search Console: branded vs non-branded clicks/impressions, top queries, top pages, Image search clicks, indexing status, Core Web Vitals.
- Business Profile: calls, direction requests, website clicks, the search terms people used.
- GA4: organic sessions to project pages, key events (`generate_lead`, `phone_click`, `email_click`, `directions_click`), source of enquiries.
- Enquiry log: qualified enquiries by source (the only link to real business outcomes).

---

## 9. What matters, and what doesn't

### Essential

- A domain owned by MACK. Site launched on it with indexing **on**.
- Search Console (domain property) + sitemap + indexing checks.
- Correct, verified Business Profile per real studio. Identity conflict resolved.
- Consistent NAP across site, profile and Instagram.
- Unique titles and descriptions (present), correct headings, canonical URLs (present).
- Project pages with real facts and narrative (the main gap).
- Image alt text (present), descriptive filenames, credits.
- `WebSite` + `ProfessionalService` structured data. `CreativeWork` on projects.
- GA4 with enquiry and contact key events. Enquiry log with source.
- Mobile performance: home LCP fix.
- Monthly monitoring and a report.

### Useful

- Service hub pages (Architecture, Interiors).
- Image licence metadata (credit, creator, copyright).
- Internal linking between related projects and services.
- Archello and Architizer profiles. Collaborator credits.
- Bing Places.
- Looker Studio dashboard.
- Review process.
- A "how did you hear about us?" field on the form.

### Optional

- Journal / editorial content.
- Apple Business listing.
- A paid SEO tool (Ahrefs/Semrush) for a month during research. Free tools are enough to start.
- Third-party Business Profile connector for automatic reporting.
- Business Profile posts (only with real news).
- Video (site walkthroughs).

### Unnecessary for MACK (or harmful)

- `llms.txt` or other "AI SEO" files. FAQ/HowTo schema. Meta keywords tag.
- City/area pages for places without a staffed studio (doorway pages).
- Buying links, link exchanges, guest-post packages, PBNs, mass directory submissions.
- Keyword-stuffed Business Profile name or description. Fake or incentivised reviews.
- AI-generated bulk blog content.
- Chasing third-party "Domain Authority" scores.
- Rank-tracking hundreds of keywords. Daily ranking reports.
- Changing URLs or titles every month "for freshness".
- Paid "SEO packages" from directories or lead portals.

---

## 10. Honest expectations

| What | Typical timing | Certainty |
|---|---|---|
| Site discovered and key pages indexed after launch + sitemap | Days to a few weeks | High, but Google never guarantees indexing |
| Brand-name searches show MACK's site first | Weeks after indexing, faster with a verified Business Profile | High for the exact full name. "MACK" alone is ambiguous (e.g. Mark Mack, USA). |
| Business Profile verified and visible | 1–3 weeks per profile, depending on Google's method | Medium. Depends on resolving the existing listing. |
| Non-branded impressions start appearing | 1–3 months | Medium |
| Steady non-branded clicks and Maps actions | 3–12 months, compounding with content and authority | **Not guaranteed.** Depends on competition, distance, reviews, publications and project information. |
| Publication features | Unpredictable | Editors decide |

What I **commit to**: the work in the roadmap, its quality, the timeline (given inputs), honest measurement and a clear monthly account of what changed. What I **don't promise**: positions, traffic numbers, leads or footfall.
