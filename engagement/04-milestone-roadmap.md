# 04 — Milestone roadmap

Six milestones, each with a tangible output and a checkable completion state. Timings assume decisions and inputs arrive on time. **The usual cause of delay is waiting for inputs** (access, verification, project facts), so each milestone lists its dependencies explicitly.

```
Week      0    1    2    3    4    5    6    7    8    9   10   11   12  → ongoing
Align     ■
M1 Foundation   ■■■■■■■■■■
M2 Launch & Search        ■■■■■■■■■■■
M3 Local Presence              ■■■■■■■■■■■■■■■■  (verification time varies)
M4 Portfolio                        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■ (as project info arrives)
M5 Authority                                               ■■■■■■■■■■ → ongoing
M6 Measurement                                 ■ dashboard  ■ report 1 ... monthly → ongoing
```

---

## Week 0 — Align & access (before M1)

- **Objective:** agree scope, settle identity questions, get access.
- **Work:** kickoff (60–90 min). Identity decisions (studio name, domain, the existing Maps listing). Account ownership plan. Collect access.
- **Deliverables:** decision log (one page), access map (who owns what), list of project information needed.
- **Client input:** a principal present; answers to Research §5 questions 1–8.
- **Done when:** studio name, domain and owner of each account are decided, and access is granted or scheduled.

---

## M1 — Digital Foundation (weeks 1–2)

| | |
|---|---|
| **Objective** | Give MACK a professional identity and an owned, measurable base: domain, email, workspace, analytics and Search Console. |
| **Work performed** | Domain registration or DNS takeover (in MACK's name). Google Workspace setup: mailboxes, aliases, SPF/DKIM/DMARC, migration or forwarding from the Gmail address. Shared-drive structure and permissions. GA4 property (14-month retention, India timezone/INR). Search Console domain property via DNS. Two-factor authentication on all accounts. Baseline snapshot of today's state. |
| **Deliverables** | Working `name@<domain>` mailboxes · email authentication passing · shared drives with permission model · GA4 property · Search Console property (MACK as owner) · access map · baseline record |
| **Client input** | Domain decision and payment · list of mailbox users · approval of the folder structure · file inventory (where files live, approximate size) |
| **Dependencies** | Week 0 decisions. Registrar access if a domain already exists. |
| **Completion criteria** | Test email from the new address shows SPF, DKIM and DMARC = PASS · Search Console shows "Ownership verified" · GA4 property exists with the right settings · every account has a MACK owner |
| **Expected impact** | Professional identity from day one. No data or accounts tied to an individual. The measurement baseline starts. |
| **Measurable** | Authentication results · verified status · account ownership checklist 100% |

---

## M2 — Launch & Search Foundation (weeks 2–4)

| | |
|---|---|
| **Objective** | Put the new site live on the domain, indexable, technically clean and measured. |
| **Work performed** | Pre-launch fixes (H1 spacing, sitemap `lastmod`, ORA markup, `WebSite` site-name markup, email/NAP update, home LCP improvement). Privacy policy update for analytics. Production build with indexing enabled and canonical domain set. Domain connected over HTTPS. Redirects (old URLs, old host). Hosting plan sized so the site cannot be paused. GA4 tag plus key events (`generate_lead`, `phone_click`, `email_click`, `directions_click`). Sitemap submitted. Key URLs inspected and submitted. Keyword/intent map v1. Metadata review against the map. |
| **Deliverables** | Live site on the domain · technical fix log · verified analytics events · sitemap submitted · intent map v1 (spreadsheet) · launch report (what was checked) |
| **Client input** | Launch approval · confirmation of contact details · privacy-policy wording approval |
| **Dependencies** | M1 (domain, GA4, Search Console). Identity decision for NAP. |
| **Completion criteria** | All sitemap URLs return 200 with correct canonical URLs · no blocking `noindex` or robots.txt rules in production · key events visible in GA4 Realtime/DebugView from a real test enquiry · no critical errors in Search Console's Pages report after the first crawl · lab LCP on home < 2.5 s (mobile, Lighthouse) or a documented reason why not |
| **Expected impact** | MACK becomes **eligible** to appear in Google (it currently is not). Branded searches can start resolving to the site. |
| **Measurable** | Indexed pages vs submitted (Search Console) · first impressions and clicks · events recorded |

---

## M3 — Local Presence (weeks 3–6; verification time varies)

| | |
|---|---|
| **Objective** | One correct, verified Google Business Profile for the Mumbai studio, consistent with the website, plus a repeatable process for each future studio. |
| **Work performed** | Resolve the existing listing (claim / request ownership / rename / create, per the decision tree in Execution Guide §9.1). Verification. Primary and secondary categories. Description. Services. Photos (studio with signage, interior, team, completed work). Website link with UTM. No opening hours (appointment-only, per Google's guidelines). Review process and reply templates. Bing Places import. NAP audit across site, Instagram and any directories. New-studio playbook (opening date, location page, structured data). |
| **Deliverables** | Verified Business Profile · NAP consistency sheet · review-request kit (link, message template, reply guidelines) · Bing Places listing · new-studio playbook |
| **Client input** | Ownership decision on the existing listing · someone at the studio for video verification or a live call · real photos of the studio · list of services |
| **Dependencies** | Identity decision (Week 0). Website live (M2) so the profile links to the right domain. |
| **Completion criteria** | Profile shows "Verified" · all key fields complete · UTM-tagged visits from the profile appear in GA4 · NAP identical across the audited sources |
| **Expected impact** | MACK can appear in Maps and in the knowledge panel for its name. Calls, directions and site visits from Google become **measurable**. |
| **Measurable** | Business Profile Performance: calls, direction requests, website clicks, search terms used · GA4 sessions from the tagged profile link |

---

## M4 — Portfolio Discoverability (weeks 4–10, paced by project information)

| | |
|---|---|
| **Objective** | Turn each project into a discoverable entry point beyond the studio's name. |
| **Work performed** | Project information form sent and followed up. Project pages rewritten to the standard (facts, narrative, credits). Titles and descriptions per the intent map. Descriptive image filenames. Image credit/licence metadata. Internal links (project ↔ related projects ↔ service hub ↔ contact). Service hub pages (Architecture, Interiors) drafted and approved. `CreativeWork` markup enriched. Each updated page re-submitted for indexing. Publishing workflow documented so new projects follow the same path. |
| **Deliverables** | 10 project pages at the standard (or as many as the studio supplies facts for) · 2 service hub pages · project information form · publishing workflow (one page) |
| **Client input** | **Project facts per project (≈10 min each via the form)** · photo credits and publication permissions · copy approval |
| **Dependencies** | M2 (site live). Studio input; this milestone can't be completed from my side alone. |
| **Completion criteria** | Each published project has location, typology, scope, status, year (if known), 150+ words of narrative, credits and descriptive image names · service hubs live · structured data validates without errors |
| **Expected impact** | The portfolio can surface for project, typology, place and image searches, and pages give editors and clients the facts they need. |
| **Measurable** | Non-branded impressions and clicks per project page · Image search clicks · organic landings on project pages · enquiries that started on a project page |

---

## M5 — Authority & Growth (from month 3, ongoing)

| | |
|---|---|
| **Objective** | Build credible recognition through publication of the work and relevant citations. No link schemes. |
| **Work performed** | Publication-readiness review of each project. Submission kit for the strongest built and photographed project (Red Fort or Agra Fort): images ≥ 2880 px, drawings, description, data sheet, credits. Shortlist of publications with verified submission routes. Archello and Architizer profiles. Collaborator and supplier credit requests. Professional-body directory listings (if applicable). Outreach log. |
| **Deliverables** | Publication shortlist · 1 submission kit (more as projects qualify) · platform profiles live · outreach log |
| **Client input** | Approval of what is submitted · client permissions · ideally, professional photography of completed projects (studio's decision and cost) |
| **Dependencies** | M4 (strong project pages to link to). Suitable photography. |
| **Completion criteria** | Profiles live with 3–5 projects · first submission sent · log maintained. *(Publication itself is not a completion criterion. Editors decide.)* |
| **Expected impact** | More brand searches, credible referring sites, stronger validation for referred clients. |
| **Measurable** | Submissions sent / features obtained · referring domains (Search Console Links) · branded search trend · referral traffic from platforms (GA4) |

---

## M6 — Measurement & Continuous Improvement (dashboard by week 6; monthly thereafter)

| | |
|---|---|
| **Objective** | Make progress visible every month and turn data into the next actions. |
| **Work performed** | Looker Studio dashboard (GA4 + Search Console). Business Profile figures added monthly. Enquiry log reconciled. Monthly one-page report. Monthly health checks: indexing, errors, Core Web Vitals, forms, uptime, backups. Quarterly review: what worked, what to stop, next quarter's focus. |
| **Deliverables** | Dashboard link · baseline report · monthly reports · quarterly review notes |
| **Client input** | 20 minutes a month to read the report. Enquiry log kept up to date (qualification and outcome). |
| **Dependencies** | M1–M3 data sources live. |
| **Completion criteria** | Dashboard live · first report delivered · monthly cadence held |
| **Expected impact** | Decisions based on evidence. Problems (a broken form, a deindexed page, a suspended profile) caught within a month instead of never. |
| **Measurable** | Report delivered on schedule · decisions recorded · issues found and fixed |

---

## Dependency summary

```
Identity decision ──► Domain ──► Email, Search Console, canonical URL ──► Launch ──► Indexing
       │                                                                  │
       └──► Business Profile (resolve existing listing) ◄─────────────────┘ (links to live domain)

Project facts from studio ──► Project pages ──► Publication kits ──► Authority
Analytics + Search Console + Profile + Enquiry log ──► Monthly report
```

**Critical path:** identity decision → domain → launch. Everything else hangs off these three.
