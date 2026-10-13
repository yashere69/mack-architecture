# 01 — Research & findings

What MACK & Co Architects realistically needs, and why.

Prepared 13 October 2026. Every statement below is labelled as one of:

- **FACT (checked)**: verified in this repository, on the live web, or in official documentation on the date above. A source is given.
- **RECOMMENDATION**: my judgement based on the facts.
- **ASSUMPTION**: something I could not verify. It has to be confirmed with the studio before any work depends on it.

---

## 1. Where MACK stands today

### 1.1 Facts about the studio's current digital presence

| # | Fact (checked 13 Oct 2026) | Source | Why it matters |
|---|---|---|---|
| F1 | The live site `mack-architecture.vercel.app` serves `<meta name="robots" content="noindex, nofollow">` on every page. | Live HTTP fetch; `context/SOURCE.md` | **MACK currently has no presence in Google's organic results.** Nothing can rank until this changes. It also means there is no search history to lose: launch is a clean start, with no migration risk. |
| F2 | The studio's public email is a Gmail address (`macka@gmail.com`). | Live site; `src/content/site.ts` | No domain identity. It also blocks proper SPF/DKIM/DMARC email authentication for a studio domain. |
| F3 | **The "map" link on MACK's site resolves to a Google Maps place named "KARAN DESAI, Architecture + Design"** at the Andheri West coordinates. | `curl` of `maps.app.goo.gl/LDt3TN9yLwB5n6yg7` → 302 to `google.com/maps/place/KARAN+DESAI,+Architecture+%2B+Design/…` | A Google listing already exists at this address under a different name. Google allows **one profile per location**, and a duplicate risks suspension. This must be resolved *before* any Business Profile work starts. |
| F4 | The Instagram profile linked from the site is `@karandesai_a.d`. | `src/content/site.ts` | Same naming question as F3. Name, address and phone ("NAP") consistency across Google, the website and social profiles depends on resolving it. |
| F5 | The name varies: "MACK & CO ARCHITECTS" (title tag), "ARCHITECHTS" (old H1 typo). In conversation the studio is called "MACK Architecture Studio". | `context/SOURCE.md` | Google Business Profile requires the **real-world name** used on signage and stationery. One canonical name must be chosen. |
| F6 | No custom domain is known. Sites run on `*.vercel.app` (old) and Netlify (new). | Repo README, `next.config.ts` | Email, Search Console (domain property), canonical URLs and brand trust all depend on a domain **registered in MACK's name**. |
| F7 | The new website (this repo) is built and ready: static Next.js export, 10 projects plus 1 object, a unique title, description and canonical URL on every page, JSON-LD (`ProfessionalService`, `CreativeWork`, `BreadcrumbList`), an image sitemap, 301s from old URLs, and indexing that is opt-in so demos stay hidden. | Build of this repo + HTML audit (`out/`) | Most technical SEO groundwork is **already done**. Remaining technical work is a short fix list, not a rebuild. |
| F8 | Lighthouse 13.5 lab test (simulated mobile, local server): SEO score 100 on home, project and index pages. Performance: home 71 (LCP 4.7 s, TBT 440 ms), Udaipur project 89 (LCP 3.8 s), index 94 (LCP 3.1 s). CLS 0 everywhere. The home LCP element is the header wordmark, delayed ~1.6 s by its intro animation. | Lighthouse JSON reports | The foundations are healthy, but mobile LCP is above Google's 2.5 s "good" threshold. **Lab data only.** Real-user (field) data will not exist until the site has traffic, and may never appear for a low-traffic site. |
| F9 | Project pages are thin. 6 of 10 projects state no location, only 2 have a written description, and none has year, status, area, client or credits. Most imagery is visualisation (renders). Real photography exists only for Agra Fort, Red Fort (professional) and The Earthen Room (phone). | `src/content/projects.ts`, `context/MEDIA.md` | **This is the biggest SEO gap and it cannot be filled without the studio's input.** Search engines and publications need real project facts. |
| F10 | Project H1s concatenate title and descriptor without a space ("Udaipur ResortArchitecture, Rajasthan"). | Built HTML | Small fix. Search engines read the heading text as written. |
| F11 | The ORA object is marked up as `Product` without `offers`, `review` or `aggregateRating`. | Built HTML | Google requires one of these for product snippets ([docs](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)), so Search Console would flag it as invalid. Fix it, or don't use `Product`. |
| F12 | The sitemap sends `changefreq` and `priority` but no `lastmod`. | `src/app/sitemap.ts` | Google **ignores** `priority` and `changefreq`. It uses `lastmod` only when it is consistently accurate ([docs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)). |
| F13 | The privacy policy states the site uses no analytics cookies. | `src/app/privacy-policy` | It **must be updated** before Google Analytics is added. |
| F14 | The contact form uses Netlify Forms with a `mailto:` fallback. Nothing is measured. | `src/components/contact/ContactForm.tsx` | Enquiries are the most important conversion, and none are tracked today. |
| F15 | The image pipeline (`sharp`, default settings) re-encodes to WebP and drops embedded metadata. | `scripts/build-media.mjs` | Embedded IPTC credit/copyright would not survive. Use structured data for image credits, or change the pipeline. |

### 1.2 Facts about the hosting plan (operational risk)

- **FACT:** Netlify credit-based plans give the Free plan **300 credits/month as a hard limit**. When credits run out, "all of your web projects are paused" and visitors see "Site not available". A production deploy costs 15 credits and bandwidth costs 20 credits/GB. Form submissions are free on credit plans (since April 2026). ([Netlify: How credits work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/))
- **RECOMMENDATION:** an image-led portfolio on the Free plan could run out of credits after roughly 10–12 GB of monthly transfer, fewer if there are several deploys. A paused site means lost enquiries. Size the plan deliberately (Personal tier or above, or a host without a hard cap) and monitor usage monthly.

---

## 2. How clients find an architecture studio (and what that means for MACK)

### 2.1 What the evidence says

- **FACT (older and indirect):** Hinge Research Institute surveyed 1,028 professional-services buyers in 2014 (*Beyond Referrals*). Over 80% of potential clients visited a firm's website while checking it out, 63% ran an online search, and 62% asked friends or colleagues. This is a cross-industry study and it is dated, so it is not proof for Indian residential clients. ([Hinge summary](https://hingemarketing.com/blog/story/new-research-study-how-professional-services-buyers-check-you-out))
- **FACT (anecdotal):** practitioner sources consistently report that most architecture work arrives through referral. Their prospects then search the firm's name and judge the website and portfolio before contacting.
- **I could not find** a rigorous, current survey of how Indian clients choose an architect. **ASSUMPTION:** MACK's work is mostly referral-led (family, friends, past clients, collaborators, Instagram). The studio should confirm this from its own records.

### 2.2 What this means (RECOMMENDATION)

The website's **first job is validation, not discovery.** The realistic journey for a studio like MACK:

```
Referral / Instagram / publication / Maps
        ↓
Search for the studio's NAME  ← the most valuable query MACK has
        ↓
Google result page: website + Business Profile (map, photos, reviews) + Instagram
        ↓
Website: projects → studio → contact
        ↓
Enquiry · call · directions · appointment
```

So the priority order is:

1. **Own the branded result page.** When someone types the studio's name, they should see the website, a correct Business Profile and consistent details. This is the fastest win, the most controllable, and supports the referrals MACK already gets.
2. **Be present in local, commercial search and in Maps** ("architect / interior designer near Andheri West", "architects in Mumbai"). This is competitive and built over months.
3. **Make every project a discoverable entry point** (project, typology, place and image searches). This is long-tail and compounding, and it depends on the studio supplying real project information.

Non-branded discovery is a real but slower second layer, not the headline promise.

---

## 3. What Google says (official sources), and what it means for MACK

### 3.1 Search fundamentals

| Fact | Source | Implication for MACK |
|---|---|---|
| There are "no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary". Standard SEO applies, and **no special AI text files or schema are needed**. That traffic appears in Search Console under "Web". | [AI features](https://developers.google.com/search/docs/appearance/ai-features) | No "AI SEO" product to sell. Indexable pages with real text cover it. `llms.txt` is **unnecessary**. |
| Core Web Vitals "good" thresholds: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Google "highly recommend[s]" good CWV and they align with what ranking systems reward. Weight is not stated. | [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) | Fix the home LCP, but don't oversell speed as a ranking lever. Relevance matters more. |
| Google ignores sitemap `priority` and `changefreq`. `lastmod` is used if consistently accurate. Submitting a sitemap is "merely a hint". | [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | Add accurate `lastmod`. Never promise indexing just because a sitemap was submitted. |
| Images: use `<img>`, not CSS backgrounds. Alt text is the most important image metadata. Use short descriptive filenames, place images near relevant text, use image sitemaps and `srcset`. | [Image SEO](https://developers.google.com/search/docs/appearance/google-images) | The site already uses `<img>`, alt text and an image sitemap. Filenames (`01.webp`) and surrounding text are the gaps. |
| Google Images can show **Creator, Credit line, Copyright** and a Licensable badge, from structured data or IPTC metadata. Structured data takes precedence. | [Image license metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) | Credit photographers and label visualisations on page and in metadata. This is honest and fits the architecture field. |
| Site name in results is set by `WebSite` structured data (`name`, `alternateName`) on the home page. | [Site names](https://developers.google.com/search/docs/appearance/site-names) | Add it, so results read "MACK & Co Architects" rather than a domain. |
| Organization markup belongs on the home page. Use the most specific type, and `LocalBusiness` subtypes for local businesses. Each location should be marked up separately. | [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business) | Keep `ProfessionalService`. Give each future studio its own entity and page. |
| Spam policies: **doorway pages** (city pages that funnel to one page), **link schemes** (buying links, low-quality directories, paid guest posts), **scaled content abuse** (mass AI pages), keyword stuffing, expired-domain abuse. | [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | No "architect in <every city>" pages, no bought links, no AI blog farms. |
| Helpful content: show first-hand expertise. Trust is the most important part of E-E-A-T. Explain Who/How/Why, disclose AI use where readers would expect it. | [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Project pages should say what MACK actually did. Label renders. If any image was AI-generated (one source file is named "ChatGPT Image…"), say so or don't use it. |
| FAQ rich results were fully removed from Google results in 2026. HowTo was removed earlier. | Industry coverage of Google's deprecation notice (May 2026) | FAQ/HowTo schema is **unnecessary**. |
| Search Console: Domain properties are verified **only by DNS record**, and the record must stay in place. A **branded-queries filter** was introduced in Nov 2025. | [Verification](https://support.google.com/webmasters/answer/9008080), [branded filter](https://developers.google.com/search/blog/2025/11/search-console-branded-filter) | Domain access is a prerequisite. Branded vs non-branded reporting is possible (where the filter is available for the property; otherwise use a regex filter). |

### 3.2 Google Business Profile

| Fact | Source | Implication for MACK |
|---|---|---|
| Use the **real-world name** (signage, website, stationery). No keywords, locations or taglines in the name. | [GBP guidelines](https://support.google.com/business/answer/3038177) | "MACK & Co Architects – Best Architect Andheri" is not allowed. |
| "Do not create more than one page for each location." Virtual offices are ineligible. A co-working office needs signage, staff and customer reception. Keep permanent signage at the address. | Same | The existing "Karan Desai" listing (F3) must be resolved first. New studios qualify only once real, staffed and signed. |
| Categories: "as few as possible", completing "This business IS a…". Not to be used as keywords. | Same | Choose the primary category that is true: "Architect" or "Interior designer" (see §5 on the title "architect"). |
| Businesses "that operate only by appointment" **shouldn't provide hours**. | Same | MACK's site says "By appointment only", so no opening hours. The appointment route goes on the profile and site. |
| Local ranking is "mainly based on relevance, distance, and popularity [prominence]". "There's no way to request or pay for a better local ranking." More reviews and complete info help. | [Local ranking](https://support.google.com/business/answer/7091) | Distance can't be changed. **Never promise a Maps position.** |
| Pre-opening: an opening date can be set **up to one year ahead**, and the profile appears **90 days before** opening. Set it before verifying. Posts, photos and description are allowed pre-opening. Customers can't review until open. | [Opening date](https://support.google.com/business/answer/9174409) | This is directly useful for MACK's planned new studios. |
| Verification: Google chooses the method (video recording, live video call, phone/text, email, postcard). Reviews take up to 5 business days. Video should show location (signage), business (tools, branded items) and proof of management. | [Verification](https://support.google.com/business/answer/7107242) | Timeline risk. Plan for 1–3 weeks per profile, more if re-verification is triggered. |
| Reviews: no incentives, no "review gating" (asking only happy clients), no conflict-of-interest reviews (staff, family, competitors). | [Prohibited content](https://support.google.com/business/answer/2622994) | A review process that asks *every* completed client, with no incentive and no screening. |

### 3.3 Analytics and email

- **FACT:** GA4 data retention for user-level data in standard properties defaults to 2 months and can be raised to **14 months**. It affects explorations and funnels, not standard reports. ([GA4 retention](https://support.google.com/analytics/answer/7667196)) → Set 14 months on day one.
- **FACT:** `generate_lead` is GA4's recommended event for form and information requests. Conversions were renamed **key events** in 2024. → Track a successful enquiry as `generate_lead` and mark it as a key event.
- **FACT:** Next.js (the version in this repo) ships `@next/third-parties/google` with a `GoogleAnalytics` component and `sendGAEvent` (`node_modules/next/dist/docs/01-app/02-guides/third-party-libraries.md`).
- **FACT:** Gmail's sender requirements ask **all** senders for SPF *or* DKIM, and bulk senders (>5,000/day) for SPF, DKIM and DMARC. ([Gmail sender guidelines](https://support.google.com/a/answer/81126)) → Set all three for MACK's domain. It is quick and protects the studio's name from spoofing.
- **FACT:** India's DPDP Rules were notified in November 2025, with phased commencement. Notice and consent obligations apply about 18 months after notification, around May 2027 per legal commentary. ([BDO summary](https://www.bdo.in/en-gb/news/2025/digital-personal-data-protection-rules-2025-%E2%80%94-check-provisions,-implementation-plan,-penalties)) → **RECOMMENDATION:** update the privacy notice now (analytics, enquiry data). Review consent handling with a qualified adviser before mid-2027. I am not giving legal advice.

### 3.4 Storage and collaboration

- **FACT:** Google Workspace pooled storage per user: Business Starter 30 GB, Business Standard **2 TB**, Business Plus 5 TB ([pricing page](https://workspace.google.com/pricing)). Prices in INR vary by reseller and promotion, so check them at purchase.
- **FACT:** Drive upload limit is 750 GB per user per 24 h and files can be up to 5 TB. A shared drive holds up to 400,000 items ([Workspace limits](https://support.google.com/a/answer/7338880)).
- **FACT:** Drive keeps previous versions of uploaded files for **30 days or 100 versions**, whichever comes first, unless a version is marked "Keep forever". Admins can restore items for **25 days** after trash is emptied.
- **FACT:** Microsoft 365 Business Standard includes 1 TB OneDrive per user. Dropbox changed its Standard plan in mid-2026: new plans give 3 TB for the first member plus 1 TB per additional active licence, and existing customers stay on 5 TB "Standard Classic" ([Dropbox help](https://help.dropbox.com/plans/standard-plan)).
- **FACT:** Autodesk says **file-based Revit worksharing is not supported on cloud-sync services** (Dropbox/OneDrive/Google Drive). Central models can corrupt. ([Autodesk](https://autodesk.com/support/technical/article/Revit-Using-Revit-files-on-Dropbox-Box-or-OneDrive))
- **RECOMMENDATION:** treat **sync/collaboration** and **backup** as two different things. Version history and trash recovery are time-limited. If a file is deleted, overwritten or encrypted and nobody notices for a month, it is gone. An independent backup copy is required (see §4).

### 3.5 Authority sources specific to architecture

- **FACT:** ArchDaily's built-project guide asks for **at least 15 professional architectural photographs at ≥ 2880 px width** plus screen-readable drawings, and focuses on the last five years. Publication isn't guaranteed. ([ArchDaily guide](https://www.archdaily.com/content/contributors-policy/guide-to-publication))
- **FACT:** Archello and Architizer offer free firm profiles where firms upload projects. Architizer's editors review uploads and feature some. ([Archello](https://archello.com/archello-for-architects), [Architizer](https://architizer.com/blog/inside-architizer/pro-tips/upload-your-projects-to-architizer/))
- **RECOMMENDATION:** MACK's publishable candidates today are the projects with **professional photography** (Red Fort, Agra Fort). Render-only projects are poor candidates for editorial platforms. **Commissioning professional photography of completed work is the most valuable authority investment the studio can make.** That is the studio's decision and cost, not something I produce.

### 3.6 Brand-name collision

- **FACT:** a search for "MACK & Co Architects Mumbai" returned no listing for MACK. The closest match was **Mark Mack / MACK Architects (USA)**.
- **RECOMMENDATION:** "MACK" alone is ambiguous. Use the full name "MACK & Co Architects" consistently, pair it with "Mumbai" in the home title, Business Profile and social bios, and use `WebSite` / `Organization` markup with `alternateName`. The exact-name query has little competition, which makes the branded win realistic.

---

## 4. Recommendations: what MACK actually needs

| Need | What MACK realistically needs | What MACK does **not** need |
|---|---|---|
| Identity | One canonical studio name, a domain owned by MACK, consistent NAP everywhere | Multiple domains, keyword domains ("bestarchitectmumbai.com") |
| Website | Launch the existing site on the domain, fix the short technical list, then add real project information | A rebuild, a CMS migration, a chatbot, pop-ups |
| Search | Branded result page first, then local and services, then projects and images | Paid SEO tools on day one, mass blog content, link buying |
| Local | One correct, verified Business Profile per real studio, plus a matching page on the site | Listings for cities without a staffed studio, review campaigns with incentives |
| Measurement | GA4 with 3–5 meaningful key events, Search Console, Business Profile performance, an enquiry log with source | Heat-mapping suites, rank-tracking for hundreds of keywords, vanity dashboards |
| Email | Google Workspace mail on the domain with SPF/DKIM/DMARC | A separate email product alongside the storage product |
| Storage | One collaboration platform sized for 2–3 TB with a disciplined folder and permission structure | Several overlapping cloud services |
| Backup | An independent, automated, versioned copy, with restores tested | "We're on Google Drive, so we're backed up" |
| Authority | Professional photography of built work, a few well-chosen publications and profiles, collaborator links | Directory blasts, press-release wires, paid guest posts |

### 4.1 Storage & backup options compared (internal; not for the deck)

What an architecture studio stores: CAD drawings (DWG), 3D/BIM models (SKP, RVT), renders and visualisation sources, project photography, presentations, PDFs and issued sets, contracts and fee documents (restricted), client deliverables, and a growing archive of completed projects. These are large, binary, often re-saved files that several people touch.

| Criterion | Google Workspace shared drives | Microsoft 365 (OneDrive + SharePoint) | Dropbox (Standard/Advanced) | NAS only (in studio) | **Workspace + NAS backup (recommended)** |
|---|---|---|---|---|---|
| Capacity for 2–3 TB | 2 TB pooled per Business Standard licence (2 licences = 4 TB) | 1 TB OneDrive per user; SharePoint pool is smaller and per-tenant | New Standard: 3 TB + 1 TB per extra licence; Advanced from 15 TB | As large as the disks | Workspace pool + NAS sized ≥ 2× data |
| Sharing with clients/consultants | Good: per-folder, named people, link controls | Good | Very good | Weak without extra setup/VPN | Workspace handles sharing |
| Permissions | Shared-drive roles (Manager → Viewer) | SharePoint groups (more complex) | Team folders, roles | Local accounts | Workspace roles |
| Version history | 30 days / 100 versions (unless "keep forever") | Version history configurable | 180 days (Standard) | Only with snapshots | NAS snapshots add long retention |
| **Real backup** | **No.** Sync/versions are time-limited | **No.** Same principle | Partial (longer history), still one provider | Yes, if snapshots + off-site copy | **Yes**: independent, versioned, plus off-site |
| Large-file handling | Up to 5 TB/file; 750 GB/day upload; streaming client | Good; sync client | Strong (block-level sync) | Fast on LAN | Cloud for work, LAN copy for speed |
| Team collaboration | Strong (and the studio already knows Gmail) | Strong if the team lives in Office | Strong for files; no email | Office-only | Strong |
| Revit central models | Not supported on sync (Autodesk) | Not supported on sync | Not supported on sync | Supported on a local server | Use NAS/local server or Autodesk cloud for central models |
| Admin effort | Low (same console as email) | Medium–high | Low–medium, but a second vendor | Medium (updates, disks) | Low–medium |
| Email included | **Yes** | Yes | No | No | Yes |
| Scalability | Add licences/storage | Add licences/storage add-ons | Add licences | Add disks/units | Both scale |
| Ease of use for the team | High | Medium | High | Medium | High (team uses Drive; NAS runs in the background) |

**Conclusion:** one platform for email and work files (Workspace, because the studio already uses Gmail), plus an independent backup the team never has to think about. Dropbox is a reasonable alternative for file-heavy studios, but it adds a second vendor and doesn't include email. Microsoft 365 makes sense only if the team already works in Office/Outlook.

### 4.2 Recommended stack (and why)

- **Google Workspace (Business Standard for the people who need pooled storage)** for email, calendar, Drive and shared drives. MACK already uses Gmail, so there is little retraining. One admin console covers email and storage, and 2 TB pooled per Standard licence covers 2–3 TB with two licences. *Check at purchase:* current INR price, and whether the studio's account can mix Starter and Standard licences. Google's documentation is unclear for small accounts; ask the reseller or Google sales.
- **Backup:** a small NAS (for example a 2-bay unit with mirrored drives) that pulls a one-way copy of the shared drives and keeps versioned snapshots, plus a periodic offline or offsite copy (the "3-2-1" principle: 3 copies, 2 media, 1 off-site). The alternative is a Workspace backup SaaS. The NAS doubles as fast local access to large CAD/render files.
- **If the studio uses Revit worksharing:** central models must not live on Drive sync. Use Autodesk's cloud collaboration or a local server. *(ASSUMPTION: software unknown; ask.)*
- **Hosting:** keep Netlify (already configured), on a plan that cannot pause the site, or move to a host without a hard credit cap. Monitor usage monthly.

---

## 5. Open questions that block or shape the work

These are the first things to settle with Ayushi. They are not presented as problems in the deck, only as "inputs we need".

1. **Studio identity.** What is the exact real-world name on signage and stationery? How do "MACK & Co Architects" and the "KARAN DESAI, Architecture + Design" listing at the same address relate (a rename of the same practice, two practices sharing a studio, or something else)? Who controls that Google listing today? *(Do not speculate about this in the meeting. Ask.)*
2. **Use of the title "Architect".** India's Architects Act 1972 (s.37) restricts the title "architect" to persons registered with the Council of Architecture, and to firms whose partners are all registered. The Supreme Court has held that the Act restricts the *title*, not the practice. This affects the business name, the GBP primary category and website copy. **Confirm the registration status of the principal(s)**, sensitively and without legal advice from me. ([India Code](https://www.indiacode.nic.in/bitstream/123456789/1690/1/A1972-20.pdf))
3. **Domain.** Does MACK own one? Who registered it, and in whose name?
4. **New studios.** Where, when, staffed by whom, and with signage?
5. **Services.** Which services should MACK be found for (architecture, interiors, furniture/objects, turnkey execution, specific typologies)? Only target what the studio actually wants to sell.
6. **Project facts.** For each project: location (city/area), typology, scope, year, status (built / in progress / concept), size, the brief, MACK's role, collaborators, photographer, and whether the client allows publication.
7. **Team and storage.** How many people need email? Where do project files live now and how big are they? Which design software is used (AutoCAD, SketchUp, Revit, rendering tools)?
8. **Enquiry handling.** Who answers enquiries and calls? Can they record "how did you hear about us?" in a simple log?

---

## 6. Assumptions used in the plan (to confirm)

| ID | Assumption | Effect if wrong |
|---|---|---|
| A1 | Team of roughly 2–6 people needing email | Changes Workspace licence count and cost |
| A2 | Work is mostly referral-led | If search already drives enquiries, local SEO moves up in priority |
| A3 | Ayushi or a named principal will act as owner of all accounts | Without an owner on MACK's side, accounts end up tied to me, which is not acceptable |
| A4 | The new site (this repo) is the site going live | If not, the technical baseline must be redone on whatever site launches |
| A5 | The studio can supply project information within the first month | Portfolio milestone (M4) slips. Nothing else does. |
| A6 | At least one more studio location will open within 12 months | If not, the location-page and multi-profile work is deferred, not deleted |

---

## 7. Sources consulted (primary first)

**Google (official):** [AI features & your website](https://developers.google.com/search/docs/appearance/ai-features) · [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) · [Build a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Image SEO](https://developers.google.com/search/docs/appearance/google-images) · [Image license metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) · [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) · [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Site names](https://developers.google.com/search/docs/appearance/site-names) · [Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization) · [LocalBusiness markup](https://developers.google.com/search/docs/appearance/structured-data/local-business) · [Product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) · [Title links](https://developers.google.com/search/docs/appearance/title-link) · [Search Console verification](https://support.google.com/webmasters/answer/9008080) · [Branded queries filter](https://developers.google.com/search/blog/2025/11/search-console-branded-filter) · [GBP guidelines](https://support.google.com/business/answer/3038177) · [Local ranking](https://support.google.com/business/answer/7091) · [GBP opening date](https://support.google.com/business/answer/9174409) · [GBP verification](https://support.google.com/business/answer/7107242) · [GBP prohibited content](https://support.google.com/business/answer/2622994) · [GA4 data retention](https://support.google.com/analytics/answer/7667196) · [Gmail sender guidelines](https://support.google.com/a/answer/81126) · [Workspace pricing](https://workspace.google.com/pricing) · [Workspace storage limits](https://support.google.com/a/answer/7338880)

**Other primary:** [Netlify credits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/) · [Dropbox Standard](https://help.dropbox.com/plans/standard-plan) · [Autodesk: Revit on cloud sync](https://autodesk.com/support/technical/article/Revit-Using-Revit-files-on-Dropbox-Box-or-OneDrive) · [ArchDaily guide to publication](https://www.archdaily.com/content/contributors-policy/guide-to-publication) · [Archello for architects](https://archello.com/archello-for-architects) · [Architizer uploads](https://architizer.com/blog/inside-architizer/pro-tips/upload-your-projects-to-architizer/) · [Architects Act 1972](https://www.indiacode.nic.in/bitstream/123456789/1690/1/A1972-20.pdf)

**Secondary (weighted lightly):** [Hinge: how buyers check you out (2014)](https://hingemarketing.com/blog/story/new-research-study-how-professional-services-buyers-check-you-out) · [BDO on DPDP Rules 2025](https://www.bdo.in/en-gb/news/2025/digital-personal-data-protection-rules-2025-%E2%80%94-check-provisions,-implementation-plan,-penalties) · reseller pages for indicative Workspace INR pricing.

**First-hand checks in this repo:** `npm run build` output audit (titles, descriptions, H1, canonicals, alt text, JSON-LD), Lighthouse 13.5 JSON reports, live fetch of the old site's robots meta, resolution of the site's Maps short link.
