# 02 — Scope matrix

What I would be responsible for, what MACK provides, and how each area's progress is measured.

Two rules sit across the whole matrix:

1. **MACK owns every account** (domain, Google Workspace, Business Profile, Search Console, Analytics, hosting). I get admin/manager access. Nothing is registered in my name.
2. **"Measurable outcome" means something that can be checked**, not a promised ranking or lead count.

| Area | Client need | What I handle | Initial setup | Ongoing work | Client input required | Measurable outcome |
|---|---|---|---|---|---|---|
| **Accounts & ownership** | One place where the studio controls its digital assets | Access map: every account, owner, admin and recovery method. Two-factor authentication. Credentials handover. | Create or confirm accounts under MACK's ownership. Add myself as admin/manager. | Quarterly access review. Remove people who leave. | A principal to act as owner. Approval for each account. | Every asset listed with a MACK owner. Zero accounts owned only by me. |
| **Domain & DNS** | A domain that carries the studio's name, website and email | Register (in MACK's name) or take over DNS management. Records for website, email and verification. | Domain registration/transfer if needed. DNS records for site, Workspace, Search Console, SPF/DKIM/DMARC. | Renewal reminders. DNS changes when services change. | Decide the domain. Pay registrar directly. | Domain resolves over HTTPS. All verification records pass. Renewal date logged. |
| **Website (launch & hosting)** | The new site live on the domain, reliably | Pre-launch fixes, production build with indexing enabled, domain connection, redirects, form notifications. Hosting plan sized to traffic. | Launch checklist (see Execution Guide §6). | Deploys for content changes. Usage monitoring. Dependency updates. | Approve launch. Confirm copy and contact details. | Site live on domain. All pages return 200. Form tested end-to-end. No hosting pauses. |
| **Technical SEO** | Search engines can crawl, index and understand every page | Indexing, sitemap, canonical URLs, structured data, headings, metadata, Core Web Vitals fixes. | Fix list from the audit (H1 spacing, sitemap `lastmod`, ORA markup, `WebSite` name markup, home LCP). | Monthly health check in Search Console. Fix new errors. | None beyond approvals | Pages indexed vs submitted. Zero critical Search Console errors. Lab LCP < 2.5 s on key templates. |
| **On-page & portfolio SEO** | Projects and services discoverable beyond the studio's name | Intent map, page titles and descriptions, project page standard, image naming, alt text and credits, internal linking, service pages. | Keyword/intent map v1. Rewrite all 10 project pages to the standard (as information arrives). | New projects published to the standard. Quarterly refresh of titles based on Search Console queries. | **Project facts and photos** (the critical input). Approve copy. | Number of projects meeting the standard. Non-branded impressions and clicks per project page (Search Console). |
| **Local SEO** | Be found in Maps and local searches near each studio | NAP consistency, location page per studio, local structured data, Bing Places, other useful citations. | NAP audit (site, Instagram, Google, Bing). Location page for Mumbai. | New location page and profile per new studio. Citation fixes. | Confirm canonical name, address, phone. New-studio details. | NAP identical across listed sources. One location page per real studio. |
| **Google Business Profile** | A correct, verified profile per studio that drives calls, directions and site visits | Resolve the existing listing question, claim or create, verify, categories, description, photos, services, website link with tracking, review process. | Profile live and verified for the Mumbai studio. | Monthly: respond to reviews, update photos and posts when there is real news, check for unwanted edits. New studios: opening-date setup. | Ownership decision on the existing listing. Verification (someone at the studio for the video or call). Real photos. | Verified status. Monthly calls, direction requests and website clicks from Business Profile Performance. |
| **Google Search Console** | Visibility into how Google sees and shows the site | Domain property (DNS), sitemap submission, indexing checks, user access, GA4 link. | Property verified. Sitemap submitted. Key URLs inspected. | Monthly review: queries, pages, indexing, experience, enhancements. | DNS access. | Property verified with MACK as owner. Monthly branded vs non-branded clicks and impressions. |
| **Analytics (GA4) & conversion tracking** | Know which channels and projects lead to enquiries | GA4 property, consent-aware implementation, key events (enquiry, call tap, email tap, directions tap), UTM tagging of Business Profile and Instagram links, Search Console link. | Property, events and a privacy-policy update. Verification in DebugView/Realtime. | Monthly data quality check. Adjust events when the site changes. | Approve privacy-policy wording. | Key events recorded and verified. Enquiries by source, monthly. |
| **Enquiry log** | Connect online activity to real projects | Simple shared sheet: date, name, source ("how did you hear?"), project type, qualified Y/N, outcome. Add a "how did you hear" field to the form. | Sheet plus form field. | Monthly reconciliation with GA4. | Studio fills in qualification and outcome (2 min per enquiry). | Qualified enquiries by source, per quarter. |
| **Professional email** | A domain identity, not a Gmail address | Google Workspace mailboxes, aliases (studio@, projects@), SPF/DKIM/DMARC, migration or forwarding of the old Gmail, signatures. | Mailboxes live. Authentication passing. Old address forwarded. Website, Business Profile and Instagram updated. | Add/remove users. DMARC report check. | Who needs a mailbox. Approve the address format. | SPF, DKIM and DMARC all "PASS" in a test message. Old contact details replaced everywhere. |
| **Cloud storage & collaboration** | 2–3 TB of project files, shared safely with the team and clients | Plan sizing, shared-drive structure, permission model, naming convention, migration plan, Drive for desktop setup on studio machines. | Shared drives created. Permissions applied. First migration batch moved and checked. | New project folders from a template. Quarterly permission audit. Storage monitoring. | Inventory of current files (where, how big). Team list and roles. | Storage usage vs capacity. 100% of active projects in the structure. No "anyone with the link" shares on sensitive folders. |
| **Backup** | Recover from deletion, overwrite, ransomware or account loss | Design and set up an independent, versioned backup (NAS pull plus off-site/offline copy, or a backup service). Restore testing. | Backup running. First full copy verified. | Monthly backup check. **Quarterly test restore.** | Budget decision for hardware/service. Physical location for a NAS. | Last successful backup date. Last successful test restore date. |
| **Website maintenance** | The site stays fast, secure, correct and current | Content updates, dependency updates, broken-link checks, form checks, uptime watch. | Uptime monitor. Maintenance checklist. | Monthly maintenance window. Fixes as needed. | Content changes and approvals. | Uptime %. Monthly form test passed. Zero broken internal links. |
| **Performance monitoring** | Pages stay fast on mobile | Lighthouse/PageSpeed checks on key templates. Search Console Core Web Vitals report (when field data exists). | Baseline recorded (see Research §1). | Monthly check. Investigate regressions. | None | LCP, INP and CLS against Google thresholds. Trend vs baseline. |
| **Content & project publishing** | New work appears on the site properly, without friction | Project information form, image preparation, publishing workflow, indexing request, cross-posting checklist. | Workflow and form ready. First project published through it. | Each new project (and selected updates). | Project facts, images, permissions. | Time from "photos received" to "published & submitted". Number of projects published. |
| **Authority & PR support** | Credible mentions from architecture publications and relevant sites | Publication-readiness checklist, submission kits, target list, profile setup (Archello, Architizer), outreach log, collaborator link requests. | Profiles created. First submission kit (Red Fort or Agra Fort). | Submissions when a project qualifies. Track responses. | Professional photography of built work. Permission from clients. Approval of submissions. | Submissions sent. Features or mentions obtained. Referring domains (Search Console Links report). **Publication is never guaranteed.** |
| **Reporting** | Understand what changed and what to do next, quickly | Monthly one-page report and a live dashboard (GA4 + Search Console in Looker Studio, Business Profile figures added monthly). | Dashboard. Baseline report. | Monthly report. Quarterly review meeting. | 20 minutes a month to read and discuss. | Report delivered on schedule, with decisions recorded. |

## Added value: practical extras, not gimmicks

These go beyond basic setup. Each is something I can actually build and maintain, and each saves the studio time or makes progress visible.

| Addition | What it is | Why it's useful to MACK |
|---|---|---|
| **Project page standard** | A fixed anatomy for every project page (facts, narrative, credits, links, structured data) | Every project ends up equally discoverable and publication-ready |
| **Project information form + publishing routine** | A 10-minute form for the studio, plus a step-by-step publishing checklist | New work goes live properly without design or SEO effort from the team |
| **Enquiry log with source** | A shared sheet + "How did you hear about us?" on the form | The only honest link between digital work and real enquiries |
| **Studio dashboard** | Looker Studio on GA4 + Search Console (Business Profile figures added monthly) | One place to see visibility, discovery and actions, owned by MACK |
| **Monthly search-opportunity note** | 3–5 rising queries from Search Console, each with a suggested page action | Turns data into the next concrete improvement |
| **New-studio playbook** | Profile with opening date, location page, structured data, NAP update | Each future studio launches on Google correctly, the same way every time |
| **Image credit pipeline** | Descriptive filenames + creator/credit data flowing into structured data | Correct credit for photographers, better image discovery |
| **Digital health check** | Audit script (`tools/seo-audit.py`) + monthly checklist (indexing, forms, uptime, backup) | Silent failures are caught within a month |
| **UTM conventions** | Tagged links for Business Profile, Instagram bio, publications | Shows which outside channels actually bring visitors and enquiries |
| **Access map** | Every account, owner, admin and recovery method | The studio is never locked out of its own assets |

Deliberately **not** offered: "AI-powered" content generation, chatbots, automated review requests, or rank-tracking dashboards. They add cost or risk without helping MACK's actual clients.

## Out of scope (unless agreed separately)

- **Paid advertising** (Google Ads, Meta ads). SEO is not advertising. If ads are wanted later, that is a separate decision with its own budget.
- **Social media management** (posting, content creation for Instagram). I only keep profile details and links consistent.
- **Professional photography and rendering.** I can brief and coordinate, but the studio commissions it.
- **Legal advice** (privacy law, Architects Act, contracts).
- **IT support** for studio hardware beyond Drive for desktop setup and backup.
- **Third-party costs** (domain, Workspace, hosting plan, NAS hardware, any paid tool) are paid directly by MACK.

## Effort profile (for my own planning, not for the deck)

| Phase | Nature of work | Rough effort |
|---|---|---|
| Months 1–3 (implementation) | Setup-heavy: accounts, launch, Business Profile, analytics, storage, first project rewrites | Front-loaded. Roughly 40–60 hours across the three months, depending on how quickly inputs arrive. |
| Month 4 onward (operations) | Monitoring, reporting, publishing, profile upkeep, authority work | Roughly 6–10 hours/month, more in months with new projects or a new studio. |

These are planning estimates for a solo implementer, not quotes. Adjust after the first month using a time log.
