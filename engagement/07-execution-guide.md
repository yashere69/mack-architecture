# How I Actually Execute This

An execution manual for every deliverable in the MACK engagement. It is written so you can follow it step by step even if parts are new to you. For each deliverable:

> **What it is · Why MACK needs it · Access I need · Tools · Procedure · How I verify it works · Mistakes to avoid · One-time or recurring · What to report**

Screens and menu names in Google products change often. When a menu path here doesn't match what you see, search the product's own help centre for the task name. The *principles* stay valid.

---

## 0. Before you start

### 0.1 Ground rules

1. **MACK owns everything.** Every account is created under, or transferred to, an account controlled by the studio (ideally the Workspace admin account on MACK's domain once it exists). You are added as admin/manager. If you ever disappear, the studio loses nothing.
2. **One change log.** Keep a Google Sheet in MACK's Drive: date · what changed · why · where · how to undo. It is your memory and your proof of work.
3. **Never guess identity data.** Name, address, phone and services come from the studio, in writing (email or WhatsApp is fine).
4. **Verify everything twice:** once right after the change, once a week later.
5. **No pricing, rankings or traffic promises in writing.** Commit to work and measurement, not outcomes.

### 0.2 Tools (all free unless stated)

| Purpose | Tool |
|---|---|
| Search data | Google Search Console |
| Analytics | Google Analytics 4 (GA4), Google Tag Assistant (debug) |
| Local | Google Business Profile, Bing Places (bing.com/forbusiness) |
| Reporting | Looker Studio + Google Sheets |
| Structured data | Rich Results Test, Schema Markup Validator (validator.schema.org) |
| Speed | PageSpeed Insights, Lighthouse (Chrome DevTools) |
| Keyword research | Google autocomplete, results-page review, Google Keyword Planner (Google Ads account, no spend), Google Trends, Search Console (after launch) |
| Links/health | `npx linkinator`, an uptime monitor (e.g. UptimeRobot free tier) |
| Email checks | Google Admin Toolbox (CheckMX / Messageheader), "Show original" in Gmail |
| Image metadata | `exiftool` (if you keep metadata in files) |
| Paid, **optional** | Ahrefs/Semrush (one month during research, only if needed), Workspace backup SaaS |

### 0.3 Learning path (do this in week 0, about 8–10 hours)

1. Google's **SEO Starter Guide** (developers.google.com/search/docs/fundamentals/seo-starter-guide). Read it fully.
2. **Search Console training** videos on the Google Search Central YouTube channel: the Performance, Page indexing and URL Inspection episodes.
3. **Google Business Profile** guidelines (support.google.com/business/answer/3038177). Read it fully. It is the rulebook you will be judged by.
4. **GA4:** the free Google Analytics course on Skillshop. Focus on events, key events and reports.
5. **Spam policies** (developers.google.com/search/docs/essentials/spam-policies), so you know what never to do.
6. web.dev articles on **LCP, INP, CLS**.

---

## 1. Accounts & ownership

**What it is:** a map of every digital asset, who owns it, who administers it, and how it is recovered.
**Why MACK needs it:** today the studio uses a personal Gmail, an Instagram tied to a person's handle, and a Maps listing under another name. Ownership is unclear, which is how studios lose access to their own profiles.
**Access I need:** a principal's time (30 min) and their phone for 2-step verification during setup.
**Tools:** Google Sheet ("Access map"), each platform's user-management screen.

**Procedure**
1. List assets: domain/registrar, DNS host, Google Workspace, website hosting (Netlify), the old site's host (Vercel), GitHub repo, Search Console, GA4, Business Profile(s), Bing Places, Instagram, Looker Studio dashboard, NAS/backup.
2. For each, record: owner (MACK account), admins, your role, 2-step verification status, recovery email/phone (MACK's, not yours), renewal date if any.
3. Make a principal the **owner** everywhere and give yourself the lowest role that lets you do the work (Search Console: Full user or Owner; GA4: Administrator; Business Profile: Manager; Workspace: delegated admin or super admin by agreement).
4. Turn on 2-step verification for all MACK accounts.
5. Store credentials in a password manager the studio controls, or hand them over in person. Never in WhatsApp or email.

**Verify:** for every row, the principal can log in without you.
**Mistakes to avoid:** creating accounts with your own Gmail "for now" · recovery phone set to your number · a single admin with no backup.
**Recurring:** quarterly access review, and at once when someone leaves.
**Report:** "Access map complete: X assets, all owned by MACK" (one line in the first report).

---

## 2. Domain & DNS

**What it is:** the studio's address on the internet (e.g. `mackandco.in` or whatever is available and decided) plus the DNS records that point it at the website, email and verification services.
**Why:** email, Search Console's domain property, canonical URLs and brand trust all depend on it.
**Access:** registrar account (owned by MACK). If a domain exists, its login or a DNS-only delegate.
**Tools:** the registrar (any reputable one), Netlify domain settings, Google Admin Toolbox Dig.

**Procedure**
1. **Choose** with the studio: short, matches the real-world name, `.com` or `.in` (consider buying both and redirecting one). Avoid hyphens and keywords.
2. **Register in MACK's name** with MACK's email as the registrant contact. Turn on auto-renew and a registrar lock.
3. **Decide where DNS lives:** at the registrar (simplest) or Netlify DNS. Pick one and write it in the access map.
4. **Records to add** (only the ones each service shows you, copied exactly):
   - Website: the A/ALIAS and CNAME records Netlify shows under *Domain management* (apex and `www`).
   - Email: Google Workspace MX record(s) shown in the setup wizard. Currently a single `smtp.google.com` MX for new setups; use whatever the wizard shows.
   - SPF: `TXT @ "v=spf1 include:_spf.google.com ~all"` (**one** SPF record only).
   - DKIM: `TXT google._domainkey "v=DKIM1; k=rsa; p=…"` generated in the Workspace Admin console.
   - DMARC: `TXT _dmarc "v=DMARC1; p=none; rua=mailto:dmarc@<domain>"`.
   - Search Console: `TXT @ "google-site-verification=…"`.
5. Wait for propagation (minutes to 48 h). Check each with Admin Toolbox Dig.

**Verify:** `https://<domain>` loads the site with a valid certificate. Dig shows each TXT/MX record. Workspace and Search Console both show "verified".
**Mistakes:** deleting existing records you don't understand (ask first, and screenshot the zone before any change) · two SPF records · domain registered to you or an agency · letting it expire.
**Recurring:** check renewal dates quarterly. Keep the verification TXT records forever.
**Report:** domain live; renewal date; records in place.

---

## 3. Professional email (Google Workspace)

**What it is:** mailboxes such as `ayushi@<domain>` and shared aliases like `studio@<domain>` (for the website and Business Profile), on Google Workspace.
**Why:** professional identity, and the same domain as the website, which builds trust. Email authentication protects the studio's name from spoofing. MACK already uses Gmail, so the interface is familiar.
**Access:** registrar/DNS. A principal's card for billing (MACK pays Google or a reseller directly).
**Tools:** Google Workspace Admin console (admin.google.com).

**Procedure**
1. **Plan users.** Who needs a mailbox (paid licence) vs an alias or group (free)? Typical: one mailbox per person, plus `studio@` and `careers@` as groups or aliases that deliver to the right people.
2. **Choose the edition per need.** People who need large pooled storage get Business Standard (2 TB pooled each). See §4. Confirm with Google or the reseller whether the account can mix editions before buying.
3. **Sign up** with the studio's domain. Make a principal the super admin. You get an admin role (or a second super admin by explicit agreement).
4. **Verify the domain** (TXT record the wizard shows).
5. **Activate Gmail:** add the MX record(s) the wizard shows. Remove old MX records only if the wizard says so.
6. **SPF:** add or edit the single SPF TXT record.
7. **DKIM:** Admin console → Apps → Google Workspace → Gmail → *Authenticate email* → generate a 2048-bit key → add the TXT at `google._domainkey` → wait → click **Start authentication**.
8. **DMARC:** add `_dmarc` with `p=none` and a reporting address. After 2–4 weeks of clean reports (only Google and legitimate senders passing), move to `p=quarantine`.
9. **Old Gmail (`macka@gmail.com`):**
   - Keep the account alive. It may be the login for Instagram, the old site or other services. Check before changing anything.
   - Set it to **forward** to `studio@<domain>`, or import old mail with Workspace's data migration tool if the studio wants history inside the new mailbox.
   - Over the next month, update the email everywhere it appears: website (`src/content/site.ts` → `email`), Business Profile, Instagram bio, Bing, letterheads.
10. **Signatures:** name, role, studio name, address line, website. Plain text plus one small logo at most.
11. **Website contact form notifications:** in Netlify → Forms → notifications, send to `studio@<domain>`.

**Verify:** send from the new address to a personal Gmail → *Show original* → **SPF: PASS, DKIM: PASS, DMARC: PASS**. Send *to* the new address from outside and confirm delivery. Run Admin Toolbox CheckMX.
**Mistakes:** setting `p=reject` on day one · forgetting that services like the contact form send "as" the domain · deleting the old Gmail · creating paid mailboxes for addresses that should be free aliases.
**One-time** setup. **Recurring:** add/remove users; glance at DMARC reports monthly for the first quarter, then quarterly.
**Report:** "Email live for N users; authentication passing; old address forwarding." Keep this small. It is expected infrastructure, not a highlight.

---

## 4. Cloud workspace & storage (≈2–3 TB)

**What it is:** shared, permissioned project storage on Google Drive **shared drives**, synced to studio machines with Drive for desktop.
**Why:** project files (CAD, renders, photos, presentations, contracts) need one home that survives laptops, staff changes and email attachments, with controlled sharing to clients and consultants.
**Access:** Workspace admin. Each studio computer, briefly, to install Drive for desktop.
**Tools:** Google Drive, Drive for desktop, Admin console (storage reports).

### 4.1 First, find out (week 0–1)

- Where do files live now (laptops, external drives, personal Drive, WhatsApp)? Total size? Largest files?
- Software: AutoCAD / SketchUp / Revit / rendering tools? **If Revit worksharing (central models) is used, those files must not sit in a Drive-synced folder.** Autodesk documents corruption risk. Use Autodesk's cloud collaboration or a local server for central models.
- Who needs what access (principal, designers, interns, accountant, clients, consultants)?

### 4.2 Sizing

- Pooled storage = the sum of all licences' allowances. Example: 2 × Business Standard (2 TB each) = **4 TB pool**, which covers 2–3 TB with headroom. Starter licences add only 30 GB each.
- Drive limits worth knowing: 750 GB upload per user per 24 h (plan the initial migration over several days). 5 TB max file size. 400,000 items per shared drive.

### 4.3 Structure

```
Shared drive: MACK — Projects
  2026-001 Udaipur Resort/
    01 Brief & Admin        (contracts, fees → restricted)
    02 Site & Survey
    03 Concept
    04 Drawings (CAD)
    05 3D & Visualisation
    06 Presentations
    07 Consultants
    08 Site Photos
    09 Issued (what was sent to client/contractor, dated)
    10 Photography (final, for publication)
  _Template (copy for each new project)

Shared drive: MACK — Studio Admin   (principals only: accounts, HR, finance)
Shared drive: MACK — Library        (materials, details, standards, CAD blocks)
Shared drive: MACK — Marketing      (website images, press kits, publication submissions, brand files)
Shared drive: MACK — Archive        (completed projects, read-only for most)
```

**Naming:** `YYYY-NNN Project Name` for folders. Files: `YYYYMMDD_project_drawing-type_rev.ext`, e.g. `20261013_udaipur_ground-floor-plan_R02.dwg`.

### 4.4 Permissions

| Role | Projects | Studio Admin | Library | Marketing | Archive |
|---|---|---|---|---|---|
| Principal | Manager | Manager | Manager | Manager | Manager |
| Senior designer | Content manager | — | Content manager | Contributor | Viewer |
| Designer / intern | Contributor | — | Viewer | — | Viewer |
| You (implementer) | Manager (setup), then as agreed | — | Manager | Manager | Viewer |

- **Clients and consultants:** share only a specific `09 Issued` subfolder, by named email, with an expiry date where possible. Never "anyone with the link" for contracts or drawings.
- In Admin console → Drive settings: decide whether external sharing is allowed and warn users when sharing outside the domain.

### 4.5 Migration

1. Migrate one finished project first as a pilot. Check that files open in the right apps, links work and sizes match.
2. Then active projects, then the archive. Respect the 750 GB/day limit.
3. Install Drive for desktop on each machine in **Stream** mode, and mark active project folders "available offline".

**Verify:** each team member can open, edit and save in their project folders. External sharing behaves as configured (test with a non-domain account). Storage report matches the expected size.
**Mistakes:** dumping everything into one drive without structure · giving everyone Manager · syncing Revit central models · treating Drive as the backup (§5) · mixing personal files into shared drives.
**One-time** structure and migration. **Recurring:** a new project folder from the template each time; quarterly permission audit (Admin console → Reports → Drive / Security); storage check monthly.
**Report:** storage used / available, active projects in structure, permission audit done.

---

## 5. Backup (separate from Drive)

**What it is:** an independent copy of the studio's files that Drive problems can't reach: deletion, overwrite, ransomware sync, a compromised account, a former employee wiping a folder.
**Why:** Drive keeps previous versions for **30 days or 100 versions**, and admins can restore deleted items for **25 days** after trash is emptied. Anything noticed later is gone. Sync copies mistakes instantly. **Sync ≠ backup.**
**Access:** Workspace admin, physical access to the studio (for a NAS), studio budget approval.
**Tools (choose one approach):**
- **A — NAS (recommended for 2–3 TB of large design files):** a 2-bay NAS with two mirrored drives sized ≥ 2× current data (e.g. 2 × 8 TB). The NAS vendor's cloud-sync app pulls a **one-way** copy of the shared drives, and its backup app keeps versioned snapshots. Plus a monthly copy to an external drive kept **off-site** (a principal's home), or the vendor's cloud backup. This gives 3 copies, 2 media, 1 off-site.
- **B — Workspace backup SaaS:** a third-party service backs up Drive and Gmail daily with long retention. Less hardware, recurring cost, slower to restore terabytes.

**Procedure (A)**
1. Set up the NAS with a strong admin password, auto-updates and no public internet exposure (no port-forwarding).
2. Create a dedicated Google account role or service sign-in for sync, using read access to the shared drives.
3. Configure the cloud-sync task as **download only** (one-way) for each shared drive.
4. Configure snapshot/versioned backup with retention (e.g. daily × 30, weekly × 12, monthly × 12).
5. Set up the off-site copy routine (monthly rotation of two external drives, or the vendor cloud).
6. Turn on email alerts for failed jobs to `studio@` and you.

**Verify:** **restore test.** Delete a test file in Drive, wait, then restore it from the NAS. Restore a whole folder from 2 weeks ago. Log date and result.
**Mistakes:** two-way sync (deletions propagate to the "backup") · never testing a restore · keeping the only backup in the same room · forgetting Gmail (if email history matters, approach B covers it).
**One-time** setup. **Recurring:** monthly check of last successful job; **quarterly test restore**; off-site rotation monthly.
**Report:** "Last backup: date ✓ · Last test restore: date ✓". That is two lines, every month.

---

## 6. Website launch & hosting

**What it is:** putting this repo's site live on MACK's domain, indexable, measured and on a hosting plan that won't pause.
**Why:** the current live site is `noindex`, so MACK is invisible in Google today.
**Access:** this GitHub repo, Netlify (team owned by MACK, you as member), DNS, the old Vercel project (to redirect or retire it).
**Tools:** Netlify, Node 22, `npm`, Lighthouse, Search Console.

### 6.1 Pre-launch fixes (from the audit, with file locations)

| # | Fix | Where | How to check |
|---|---|---|---|
| 1 | Add a space or separator between project title and descriptor inside `<h1>` (currently "Udaipur ResortArchitecture, Rajasthan") | `src/app/projects/[slug]/page.tsx` (H1 block), similarly `/objects/[slug]`, `/studio`, `/contact` headings | View source / run the audit script: H1 text reads "Udaipur Resort — Architecture, Rajasthan" or similar |
| 2 | Add accurate `lastmod` to sitemap entries. Optionally drop `changeFrequency`/`priority` (Google ignores them). | `src/app/sitemap.ts` (add a `updated` date per project in `src/content/projects.ts`) | `/sitemap.xml` shows `<lastmod>` |
| 3 | ORA markup: `Product` without `offers`/`review`/`aggregateRating` is invalid for product snippets. Switch to `CreativeWork`, or add a real `offers` if it's sold at a stated price. | `src/app/objects/[slug]/page.tsx` | Rich Results Test shows no Product errors |
| 4 | Add `WebSite` structured data (`name`, `alternateName`, `url`) on the home page | `src/app/layout.tsx` or `src/app/page.tsx` | Schema validator shows WebSite |
| 5 | Update studio email/NAP to the confirmed values | `src/content/site.ts` (also used by JSON-LD) | Contact page + JSON-LD show new values |
| 6 | Home page LCP: the LCP element is the header wordmark, delayed ~1.6 s by its entry animation. Make it render immediately (animate the monogram, not the wordmark's visibility) and check main-thread JS on mobile. | `src/components/Header.tsx`, `src/components/motion/*` | Lighthouse mobile on `/`: LCP < 2.5 s, TBT down from 440 ms |
| 7 | Privacy policy: replace "no analytics cookies" with an accurate description of GA4 use | `src/app/privacy-policy/page.tsx` | Text matches what's installed |
| 8 | `robots.txt` `Host:` line is ignored by Google (harmless; remove for tidiness) | `src/app/robots.ts` | — |
| 9 | Add "How did you hear about us?" (optional select: Referral / Instagram / Google search / Google Maps / Publication / Other) to the enquiry form and the Netlify form definition | `src/components/contact/ContactForm.tsx`, `public/__forms.html` | Test submission shows the field in Netlify Forms |
| 10 | Archive the original image files: raw sources are fetched from the old site's Vercel Blob storage. Copy them into MACK's Drive (Marketing) **before** the old site is retired. | `media-src/sources.json` (URLs), `npm run media` downloads to `media-src/raw/` | Raw files present in Drive |

The repo's `AGENTS.md` warns that this Next.js version differs from older docs. Read `node_modules/next/dist/docs/` before changing code. After each change: `npm run typecheck && npm run build`.

### 6.2 Launch procedure

1. **Hosting plan:** on Netlify credit plans the Free tier has a hard 300-credit monthly limit, and when it runs out **the site is paused** (bandwidth 20 credits/GB, production deploy 15 credits). Put MACK on a plan that can't pause, or set up usage alerts and check them monthly. Agree this with the studio before launch.
2. **Git-connected deploys** (preferred over drag-and-drop, so every build is reproducible): connect the repo in Netlify. `netlify.toml` already sets `npm run build` and `out`.
3. **Environment variables (production context only):**
   - `NEXT_PUBLIC_SITE_URL=https://www.<domain>` (exactly the primary domain you choose, with or without `www`)
   - `ALLOW_INDEXING=1` (**production only**; deploy previews must not get it)
   - `NEXT_PUBLIC_GA_ID=G-XXXXXXX` (after §8)
   In Netlify, scope variables to the Production context, or use `[context.production.environment]` in `netlify.toml`.
4. **Domain:** Netlify → Domain management → add the domain, choose the primary (`www` or apex), add the DNS records Netlify shows, and wait for the HTTPS certificate.
5. **Forms:** Netlify → Forms → enable form detection → redeploy → set notifications to `studio@<domain>`.
6. **Old site:** redirect `mack-architecture.vercel.app` to the new domain (Vercel project settings → Domains/redirects), or replace it with a single redirect. Do this after step 10 of §6.1.
7. **Deploy**, then run the checks below.

**Verify (launch checklist)**
- [ ] `https://<domain>/robots.txt` allows crawling and lists the sitemap; no `Disallow: /`.
- [ ] View source on 3 pages: `<meta name="robots" content="index, follow">`, canonical uses the real domain.
- [ ] `/sitemap.xml` URLs all use the real domain and return 200 (`npx linkinator https://<domain> --recurse`).
- [ ] The non-primary host (`www` vs apex) 301s to the primary. HTTP 301s to HTTPS.
- [ ] Legacy URLs (`/about`, `/projects/udaipurresort` …) 301 correctly.
- [ ] A real test enquiry (marked TEST) arrives in the inbox and appears in Netlify Forms.
- [ ] GA4 Realtime shows the visit and the `generate_lead` event (§8).
- [ ] Lighthouse mobile on home and one project page; scores recorded in the change log.

**Mistakes:** launching with `ALLOW_INDEXING` unset (site stays invisible) or set on previews (demo URLs get indexed) · wrong `NEXT_PUBLIC_SITE_URL` (canonicals point to the old domain) · forgetting form notifications · Free plan pausing the site.
**One-time** launch; recurring deploys for content.
**Report:** launch date, checklist passed, any open items.

---

## 7. Google Search Console

**What it is:** Google's free tool showing how the site appears in Search: queries, clicks, indexing, errors.
**Why:** it's the only first-party source for search queries and indexing status.
**Access:** DNS (for the TXT record). MACK's Google account as owner.
**Tools:** search.google.com/search-console.

**Procedure**
1. Signed in as MACK's Workspace admin: **Add property → Domain** → enter `<domain>` → copy the TXT record → add it at DNS → Verify. Keep the record forever.
2. Settings → Users and permissions: add yourself (Full or Owner as agreed).
3. Sitemaps → submit `https://<primary-domain>/sitemap.xml`.
4. URL Inspection: inspect home, `/projects`, `/studio`, `/contact` and 2–3 project pages → **Request indexing** for each (limited daily quota; use it for important pages only).
5. GA4 → Admin → Product links → **Search Console links** → link the property.
6. Note the launch date in the change log. Data appears with a ~2–3 day delay.

**Monthly routine (30 min)**
- **Performance** (last 28 days vs previous): clicks, impressions, CTR, position. Use the **branded queries** filter if it is offered for the property; otherwise add a query filter with regex such as `mack|mack & co|mackandco` for branded and its negation for non-branded. Search type **Image** separately.
- **Pages report:** new "not indexed" reasons? Common: *Crawled – currently not indexed* (often thin pages, which project rewrites fix), *Duplicate without user-selected canonical*, *Alternate page with proper canonical* (normal for UTM URLs), *Excluded by noindex* (**should be zero** in production).
- **Experience:** Core Web Vitals. Expect "Not enough data" for a long time on a small site. That's normal; rely on Lighthouse/PageSpeed lab tests.
- **Enhancements:** breadcrumbs (and product snippets, if any). Fix errors.
- **Security & Manual actions:** should be "No issues". If not, treat it as urgent.
- **Links:** top linking sites (tracks authority work).

**Verify:** "Ownership verified" in settings. Sitemap status "Success". Pages report shows indexed pages climbing toward the sitemap count within a few weeks.
**Mistakes:** URL-prefix property only (misses www/apex variants) · removing the TXT record · requesting indexing for every URL daily · panicking over "Discovered – currently not indexed" in week one.
**Recurring:** monthly.
**Report:** branded vs non-branded clicks and impressions, top queries, indexing health.

---

## 8. Google Analytics 4 & conversion tracking

**What it is:** measurement of visits and actions on the site: which channels, pages and projects lead to enquiries.
**Why:** without it, every decision is a guess.
**Access:** MACK's Google account (property owner), this repo, Netlify environment variables.
**Tools:** GA4, Tag Assistant (tagassistant.google.com), `@next/third-parties`.

### 8.1 Property setup

1. analytics.google.com, as MACK's admin: create **Account** "MACK & Co Architects" → **Property** "MACK website" → time zone **India**, currency **INR** → Web data stream for `https://<primary-domain>`. Copy the **Measurement ID** (`G-…`).
2. Data stream → **Enhanced measurement:** keep page views (incl. browser history changes, needed for this app's client-side navigation), scrolls, outbound clicks. **Turn off form interactions.** We send our own reliable `generate_lead`, and the automatic one double-counts.
3. Admin → Data collection → **Data retention → 14 months.**
4. Admin → Data filters: optionally define internal traffic (studio IP) and activate the filter once confirmed. If the studio's IP changes often, skip it and just note test visits.
5. Admin → Property access management: add yourself as Administrator (or Editor).

### 8.2 Implementation in this repo (Next.js App Router)

Read `node_modules/next/dist/docs/01-app/02-guides/third-party-libraries.md` first (this Next.js version's own docs).

1. `npm install @next/third-parties@<version matching next>`.
2. In `src/app/layout.tsx`, render the tag only when the ID is set (production):
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google';
   // inside <html>, after <body>…</body>
   {process.env.NEXT_PUBLIC_GA_ID ? <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} /> : null}
   ```
3. **Enquiry event:** in `src/components/contact/ContactForm.tsx`, at the point where Netlify accepted the submission (`setState({ kind: 'sent' })`):
   ```tsx
   import { sendGAEvent } from '@next/third-parties/google';
   sendGAEvent('event', 'generate_lead', { form_name: 'inquiry', enquiry_reason: data.reason === 'Apply for a career' ? 'career' : 'client' });
   ```
   **Never send name, email or message text to GA4** (personal data; also against Google's policies).
4. **Contact-intent events:** a small client component in the layout with one delegated click listener:
   - `a[href^="tel:"]` → `phone_click`
   - `a[href^="mailto:"]` → `email_click`
   - links to the map URL → `directions_click`
   Each sends `{ link_location: <page path> }`.
5. Add `NEXT_PUBLIC_GA_ID` to Netlify (production context) → deploy.
6. GA4 Admin → Events (after they first fire) → mark **`generate_lead`** as a **key event**. Optionally also `phone_click` (decide with the studio what counts as a real contact). Keep career enquiries separable via the `enquiry_reason` parameter. Register it as a custom dimension (Admin → Custom definitions) so you can filter by it.
7. **UTM tagging** for links you control:
   - Business Profile website link: `https://<domain>/?utm_source=google&utm_medium=organic&utm_campaign=gbp_mumbai`
   - Instagram bio: `https://<domain>/?utm_source=instagram&utm_medium=social&utm_campaign=bio`
   Canonical tags keep the clean URL in Google's index.
8. **Privacy:** update the privacy policy (what GA4 collects, why, retention, how to opt out). India's DPDP Rules phase in notice/consent obligations around mid-2027. Flag that the studio should review consent handling with an adviser before then. Don't present yourself as the legal authority.

**Verify:** Tag Assistant → connect to the live site → see `page_view`, then submit a TEST enquiry → `generate_lead` appears in Tag Assistant and in GA4 **Realtime** / **DebugView**. Tap the phone and email links on mobile → events appear. 24–48 h later, events appear in Reports → Engagement → Events.
**Mistakes:** two GA tags (duplicate page views) · leaving enhanced form tracking on (double leads) · marking `page_view` or `scroll` as key events · PII in parameters · forgetting to exclude test enquiries in reporting (note their timestamps).
**One-time** setup. **Recurring:** monthly data sanity check (do numbers roughly match Netlify Forms submissions?); re-test events after any site change touching links or the form.
**Report:** enquiries and contact actions by channel; landing pages that led to enquiries.

### 8.3 Enquiry log (closing the loop)

A Google Sheet in MACK's Drive with: date · name (internal only) · reason (client/career) · how they heard (form field or asked on the call) · project type · location · qualified (Y/N) · next step · outcome (later). The studio fills two columns per enquiry, which takes about 2 minutes. You reconcile it monthly with GA4 key events. This is the only honest way to say "digital contributed X qualified enquiries".

---

## 9. Google Business Profile

**What it is:** the studio's card on Google Search and Maps: name, location, photos, reviews, call/directions/website buttons.
**Why:** it's what appears when someone searches the studio's name or looks for an architect or interior designer nearby, and it's where calls and direction requests are measured.
**Access:** **Manager** on the profile, with a MACK principal as owner. Someone physically at the studio for verification.
**Tools:** business.google.com (or editing directly from Google Search/Maps while signed in), Google Maps app (video verification).

### 9.1 Step 0: resolve the existing listing (do this before anything else)

The site's map link opens a place called **"KARAN DESAI, Architecture + Design"** at the same address. Google allows **one profile per business per location**. Duplicates get merged or suspended.

```
Is MACK & Co Architects the same practice as that listing (renamed / rebranded)?
├─ YES → Does the real-world signage and stationery now say the new name?
│        ├─ YES → The listing's OWNER edits the business name to the real-world name.
│        │        Keeps reviews and history. Google may ask for re-verification. Don't change
│        │        name, address and category at the same time; change the name first.
│        └─ NO  → Change signage/stationery first, or keep the current name until it changes.
│                 (The profile must match the real-world name.)
├─ NO, two distinct practices operate from the studio →
│        Each may have its own profile only if it is a genuinely separate business with
│        its own signage and customer presence at that address. Decide with the principals.
│        Don't create a MACK profile that duplicates the existing one.
└─ UNSURE who controls the listing →
         On the listing: "Own this business?" / "Claim this business" → request access.
         Google notifies the current owner. If there's no response within Google's window,
         you may be offered verification. Keep screenshots.
```

**Use of the word "Architect":** the Architects Act 1972 restricts the *title* to persons registered with the Council of Architecture (and firms whose partners are all registered). Confirm the principal's registration before choosing the business name wording and the "Architect" category. If in doubt, use the category that is unquestionably true (e.g. "Interior designer") until confirmed. Ask politely; don't lecture.

### 9.2 Setup / optimisation

1. **Name:** exactly the real-world name. No keywords or city.
2. **Category:** one primary that completes "This business IS a…": Architect, or Interior designer if that's the core and the title question is open. Add 1–2 secondary only if true. Check the exact category names offered in the dashboard.
3. **Address:** exact, matching the website and signage. Show the address (it is a studio clients visit by appointment).
4. **Hours:** **leave regular hours unset.** Google's guidelines say businesses that operate only by appointment shouldn't provide hours. Make the appointment route clear instead (website link to `/contact`, the phone number, and the description).
5. **Phone:** the studio number (same as the site). **Website:** UTM-tagged link (§8.1 step 7).
6. **Description** (up to 750 characters): what the studio does, the disciplines (architecture, interiors, objects), where it works, how to visit (by appointment). No URLs, prices or superlatives.
7. **Services:** list the real ones.
8. **Photos:** exterior with signage (helps verification and visitors), studio interior, the team at work (with consent), completed projects (**real photography preferred**). Avoid stock images and text overlays. If renders are used, label them as visualisation in the caption.
9. **Logo and cover** consistent with the website.
10. **Verification:** do it when the studio is staffed and signage is visible. If video is offered, use the Google Maps app on a phone at the studio. One continuous take: street/signage → entrance → interior → something only staff can access (e.g. unlocking a door, work materials). Don't edit core details while verification is pending.

### 9.3 Reviews (by Google's rules)

- Get the review link from the profile ("Ask for reviews").
- Ask **every** client at a natural point (handover, or a month after moving in) with a short, neutral message.
- Never: incentives, discounts, asking only happy clients, staff/family/friends reviewing, writing reviews, or asking for specific wording.
- Reply to every review within a week: thank them by first name, reference the project type without private details. Negative review: acknowledge, offer to talk offline, no arguments.

### 9.4 New studio locations (playbook)

1. Only when the location is real: lease signed, staff assigned, signage planned.
2. Create the profile with the new address. **Before verifying, add the opening date** (up to a year ahead). The profile appears on Google **90 days before** opening, and you can post photos and updates before then.
3. Verify when Google allows. Expect it to require the location to be operational.
4. Add `/studio/<city>` to the website with matching NAP, its own `ProfessionalService` structured data (own `@id`, `parentOrganization` → main studio), map and appointment route.
5. Add the location to the NAP sheet and the monthly report.

### 9.5 Monthly routine (20 min)

- Performance: calls, direction requests, website clicks, top search terms. Copy them into the reporting sheet.
- Check for **"Google updates"** or user-suggested edits that changed details. Accept or reject them.
- New reviews → reply.
- Add photos when there's new real material. A post only for real news (project completed, publication, studio event).

**Verify:** profile shows Verified. Search the exact studio name on mobile and desktop and check the panel. GA4 shows sessions with `utm_campaign=gbp_mumbai`.
**Mistakes:** creating a duplicate · keywords in the name · listing hours for an appointment-only studio · a virtual-office address for a "new studio" · fake or incentivised reviews · changing several core fields at once (triggers re-verification) · the owner being you.
**Recurring:** monthly; per new studio.
**Report:** calls, directions, website clicks (with the caveat that "calls" = taps on the call button), top search terms, reviews.

---

## 10. Technical SEO: ongoing health

**What it is:** keeping the site crawlable, indexable, canonical, fast and error-free after launch.
**Access:** repo, Netlify, Search Console.
**Tools:** Search Console, Lighthouse/PageSpeed Insights, `npx linkinator`, the audit script below.

**Audit script (run after each build):** `engagement/tools/seo-audit.py` checks every built page's title, description, robots, canonical, H1 text, image alt coverage and JSON-LD types: `npm run build && python3 -I engagement/tools/seo-audit.py out`. Build with the production environment variables set (`NEXT_PUBLIC_SITE_URL`, `ALLOW_INDEXING=1`) to see what Google will see. Without them, every page correctly reports `noindex`.

**Monthly checklist**
- [ ] Search Console Pages report: no new error types; indexed count stable or rising.
- [ ] No production page with `noindex` (except intentional ones).
- [ ] `npx linkinator https://<domain> --recurse`: zero broken internal links.
- [ ] Rich Results Test on one project page: valid Breadcrumb; no errors.
- [ ] Lighthouse mobile on home + one project: compare with baseline (F8).
- [ ] Sitemap includes any new pages; `lastmod` correct for changed pages.

**Diagnosing common issues**
| Symptom | Likely cause | Fix |
|---|---|---|
| Page "Crawled – currently not indexed" | Thin page (little unique text) | Add real project narrative and facts (M4) |
| "Duplicate, Google chose different canonical" | Two URLs with same content (e.g. trailing slash, www) | Ensure redirects and canonical are consistent |
| Brand search shows the wrong "MACK" | Name ambiguity | Full name in titles; WebSite/Organization markup; Business Profile; publications citing the full name |
| Sudden traffic drop | Deindexing, robots change, site paused, Google update | Check site is up → robots.txt → Pages report → Manual actions → Google Search Status Dashboard |

**Recurring:** monthly. **Report:** "Health: ✓" plus any issue and fix.

---

## 11. Keyword research & search-intent mapping

**What it is:** a living spreadsheet that maps real searches to the page that should answer them.
**Why:** it stops guessing and keeps each page focused on one intent.
**Access:** none special. A Google Ads account (yours or MACK's, no campaign needed) for Keyword Planner.
**Tools:** Google (incognito, location set to Mumbai/India), Keyword Planner, Google Trends, Search Console (after launch).

**Procedure**
1. Create the sheet: `query · territory (branded/local/service/project/image/careers) · intent · evidence (autocomplete / PAA / KP range / GSC) · results-page type (directories / studios / publications / images / local pack) · target page · priority (1–3) · notes`.
2. Start from the seed list in `03-seo-strategy.md` §2.2. **Remove anything MACK doesn't actually offer.**
3. For each seed: type it into Google and note autocomplete suggestions and "People also ask". Look at the top 10 and classify the results-page type.
4. Keyword Planner: Tools → Keyword Planner → *Discover new keywords* → location Mumbai (and India) → note the **range**. Without ad spend you get broad ranges. That's fine; you need relative size, not precision. Expect low numbers for very local queries. That doesn't mean they're worthless.
5. Google Trends: compare 2–3 phrasings (e.g. "interior designer" vs "interior design firm") for India/Maharashtra.
6. Prioritise: **(relevance to MACK's real services) × (feasibility given the results-page type) × (commercial intent).**
7. Map each priority query to **one** page. If no page fits and the intent is real, propose a page. If the only fitting page would be a thin doorway, don't.
8. From month 2: export Search Console queries monthly. Add new real queries, and mark which page Google actually shows.

**Verify:** each important page has 1 primary + a few secondary queries; no two pages target the same primary query.
**Mistakes:** treating Keyword Planner numbers as precise · targeting "near me" on-page · city pages without a studio · chasing high-volume generic queries dominated by directories.
**Recurring:** v1 in M2, refresh quarterly.
**Report:** in quarterly reviews: which queries are emerging and what page work follows.

---

## 12. Project page publishing workflow (SOP)

**What it is:** a repeatable path from "the studio has a project" to "the project is live, correct and submitted to Google".
**Why:** projects are MACK's main search asset. A consistent process means each one meets the standard without reinventing it.
**Access:** repo, Netlify, Search Console, studio's Marketing drive.

### 12.1 Project information form (Google Form in MACK's Drive)

Required: project name · city/area · state · typology · scope (architecture / interiors / objects / landscape / turnkey) · status (concept / in progress / built + year) · client type (no names unless permitted) · **publication permission** (yes / yes without location detail / no) · the brief (2–3 sentences) · what MACK did (3 key design moves) · materials · photographer and usage rights / "visualisation by" · any AI-generated or AI-edited imagery (Y/N, which).
Optional: size · site context · constraints · collaborators (structure, services, lighting, landscape, contractor, makers) · press coverage · a quote from the principal or client (with permission).

### 12.2 Steps

1. **Collect** the form and images (originals, full resolution) into `Marketing/Website/<project>/`.
2. **Select** 6–15 images: one hero, wide views, details/materials, at least one drawing if available. Remove near-duplicates. Label renders vs photographs.
3. **Write** (or edit the studio's text): 150–400 words, first-hand and specific; facts table; title and description per `03-seo-strategy.md` §4.1. Get studio approval.
4. **Add to the site** (per the repo README):
   - add image URLs/keys to `media-src/sources.json` (`drawing: true` for plans/sketches) → `npm run media`;
   - add the project entry in `src/content/projects.ts` (facts only; leave unknown fields out; `imagery` = Photography / Visualisation);
   - add a cover to `scripts/build-og.mjs` for the share image;
   - write specific alt text per image.
   *M4 improvement task:* extend the media pipeline so each image can carry a descriptive filename (e.g. `udaipur-resort-sandstone-facade-dusk.webp`) and credit fields that feed `ImageObject` structured data.
5. **Build & check:** `npm run typecheck && npm run build` → run the audit script → open the page locally (`npm run preview`).
6. **Deploy** (push to the production branch).
7. **Submit:** Search Console → URL Inspection → the new URL → Request indexing. The sitemap updates automatically.
8. **Distribute:** Instagram post linking to the page (UTM), Business Profile photo/post if it's real photography of completed work, and add the project to the publication shortlist if it qualifies (§16).
9. **Log** in the change log, and note it in the monthly report.

**Verify:** the page appears in `/sitemap.xml`; URL Inspection shows "URL is on Google" within days to weeks; the Rich Results Test is valid.
**Mistakes:** publishing a client's name, address or interiors without permission · renders presented as built work · reusing the same description pattern across projects (thin/duplicate feel) · uploading 30 near-identical images.
**Recurring:** per project.
**Report:** projects published this month, with links.

---

## 13. Image SEO

**What it is:** making images understandable and creditable to search engines: filenames, alt text, context, credits.
**Why:** architecture is visual. Google Images is a real discovery channel for typologies and details, and correct credits build trust.

**Procedure**
1. **Filenames:** descriptive, lowercase, hyphenated (`red-fort-project-living-room-valley-view.webp`). Requires the pipeline change in §12.2 step 4.
2. **Alt text:** describe what's visible ("Arcaded indoor pool hall with cusped arches and loungers"). Don't stuff in "best architect Mumbai". The repo's current alt text is a good model.
3. **Context:** keep images on pages with relevant text (the narrative). Captions for drawings ("Axonometric", "Plan").
4. **Credits & licence metadata:** the media pipeline currently strips embedded metadata. Two options:
   - **Structured data (recommended here):** on project pages, express images as `ImageObject` with `contentUrl`, `creator` (Person/Organization), `creditText`, `copyrightNotice`. Optionally `license` + `acquireLicensePage` (needed for Google's "Licensable" badge).
   - **Embedded IPTC:** keep metadata through the pipeline (sharp has options to retain metadata; verify output with `exiftool -a -G1 file.webp`), and set fields with e.g. `exiftool -IPTC:By-line="Photographer" -IPTC:CopyrightNotice="© 2026 Photographer" -XMP-photoshop:Credit="Photo: Photographer for MACK & Co Architects" file.jpg`.
5. **AI imagery:** if any image is AI-generated or composited, disclose it (caption, and IPTC Digital Source Type if using embedded metadata), or don't publish it as project imagery.

**Verify:** Rich Results Test / Schema validator shows ImageObject fields; Search Console → Performance → Search type: Image shows impressions over time.
**Recurring:** per project. **Report:** image search clicks (quarterly is enough).

---

## 14. Structured data

**What it is:** JSON-LD describing the studio, site, projects and breadcrumbs.
**Present today:** `ProfessionalService` (every page), `CreativeWork` + `BreadcrumbList` (projects), `CollectionPage` (index), `Product` (ORA, needs a fix).
**To add/change:** `WebSite` (site name), ORA type fix, `ImageObject` credits on projects, `geo` coordinates on the studio entity, updated email/`sameAs`, one entity per future studio.

Example `WebSite` node (home only):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MACK & Co Architects",
  "alternateName": ["MACK & Co", "MACK & Co Architects Mumbai"],
  "url": "https://www.<domain>/"
}
```

**Verify:** Rich Results Test (eligible features) and validator.schema.org (all types) on home, a project and ORA. **Mistakes:** markup that doesn't match visible content · fake review/rating markup · FAQ markup "for SEO". **Recurring:** whenever templates change. **Report:** only if errors appear or are fixed.

---

## 15. Local citations & NAP consistency

**What it is:** the studio's Name, Address, Phone written identically wherever it appears.
**Procedure:**
1. Create a NAP sheet with the canonical values (exact punctuation, e.g. "Shah Industrial Estate, 1001 Parinee I, 7-A, Andheri West, Mumbai, Maharashtra 400053").
2. Audit: website (all pages + JSON-LD), Business Profile, Bing Places, Instagram bio, Apple Business (if used), any existing Justdial/Sulekha/IndiaMART listing (search the studio name), Archello/Architizer once created, email signatures.
3. Fix mismatches. Create **Bing Places** by importing from the Business Profile (bing.com/forbusiness). Apple Business is optional (check India availability).
4. Don't mass-submit to directories.

**Verify:** sheet shows ✓ for every source. **Recurring:** quarterly, and on any change of address/phone. **Report:** "NAP consistent across N sources."

---

## 16. Authority & PR support

**What it is:** getting MACK's work into credible architecture publications, platforms and collaborator sites.
**Why:** independent recognition helps referred clients trust the studio, and helps Google judge prominence.
**Access:** studio approvals, photographer permissions, the Marketing drive.

**Procedure**
1. **Readiness check per project:** built? professional photography (ArchDaily asks ≥ 15 images at ≥ 2880 px wide)? drawings available? client permission? MACK's role clear? Only Red Fort and Agra Fort are close today.
2. **Submission kit** (folder in Marketing): selected images (full-res, credited), 3–6 drawings (clean, unlabeled), 300–500-word description, data sheet (location, year, area, client type, team, collaborators, photographer), studio bio, principal headshot (optional), contact.
3. **Shortlist** (verify each one's current submission route and requirements before sending): ArchDaily (submit form) · Archello (free profile) · Architizer (free profile) · Indian titles such as AD India, Elle Decor India, IndiaArtNDesign, The Architects Diary, Surfaces Reporter, Design Pataki. Match project to publication (an interior to interiors titles; a resort to architecture titles).
4. **Send one tailored email per publication** (not a mass blast): 3 lines on why this project fits, 3 images inline or a link, the kit link. Log it.
5. **Platform profiles:** create Archello and Architizer profiles; upload 3–5 projects with full credits and a link to the site.
6. **Collaborators:** ask makers/brands/consultants who worked on a project to credit MACK and link to the project page.
7. Follow up once after 2–3 weeks. Then let it go.

**Verify:** outreach log updated; profile pages live and linking to the site.
**Mistakes:** paid "features" that are really link sales · sending renders as if they were built work · submitting without client permission · claiming publication before it happens.
**Recurring:** when a project qualifies; review the log monthly.
**Report:** submissions sent, responses, features obtained, new referring sites.

---

## 17. Performance monitoring

**Baseline (lab, simulated mobile, 13 Oct 2026):** home 71 (LCP 4.7 s, TBT 440 ms), project 89 (LCP 3.8 s), index 94 (LCP 3.1 s), CLS 0. See Research F8.
**Monthly:** PageSpeed Insights on home + one project page (record LCP, TBT/INP proxy, CLS). Search Console Core Web Vitals once there is field data.
**Thresholds:** LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
**If a regression appears:** check what changed (new images? new script?), run Lighthouse locally, look at the LCP element and long tasks, fix, re-test.
**Report:** one line: status vs thresholds and trend.

---

## 18. Website maintenance

**Monthly (≈1 h):**
- [ ] Submit a TEST enquiry; confirm email notification and Netlify Forms entry; confirm the GA4 event.
- [ ] Uptime monitor: any downtime alerts?
- [ ] Netlify usage/credits: within plan.
- [ ] Broken links check.
- [ ] Content: any outdated info (team, address, services)?
**Quarterly:**
- [ ] `npm outdated`. Update Next.js/React/GSAP for security releases (read the Next docs in `node_modules/next/dist/docs/` for breaking changes) → `npm run typecheck && npm run build` → preview → deploy.
- [ ] Domain renewal date; access review; backup test restore.
**Incident playbook:** site down → check Netlify status/plan pause → DNS → last deploy (roll back in Netlify; rollbacks are free) → tell the studio within the day.

---

## 19. Producing the monthly report (≈2–3 h)

1. Day 1–3 of the month: open the dashboard (GA4 + Search Console auto-update).
2. Enter Business Profile figures (calls, directions, website clicks, top search terms) into the reporting sheet.
3. Reconcile the enquiry log with GA4 `generate_lead` (exclude TEST entries).
4. Fill the one-page template (`08-reporting-framework.md` §4). **Write the 3-line summary last.**
5. Send as a PDF or short doc with the dashboard link. Offer a 15-minute call if anything needs a decision.

**Rule:** if a number moved, say why (or say you don't know yet). If nothing moved, say so and explain what's in progress.

---

## 20. Never do (summary)

- Promise rankings, traffic, leads or footfall.
- Buy links, swap links, use PBNs, guest-post packages, or mass directory submissions.
- Create city pages for places without a studio.
- Put keywords in the Business Profile name, or list hours for an appointment-only studio.
- Create a second profile at an address that already has one for the same business.
- Write, buy or incentivise reviews, or ask only happy clients.
- Publish client details or interiors without permission; present renders as built work.
- Own MACK's accounts yourself.
- Launch with indexing off, or enable indexing on previews.
- Treat Drive as a backup.
- Add AI-generated bulk content.
