# 08 — Reporting framework

The report has one purpose: answer **What changed? Why does it matter? What are we doing next?** in a few minutes. It is not a data dump.

## 1. Principles

1. **Decisions over vanity.** Every number shown must connect to something the studio cares about (being found, being trusted, being contacted) or to a decision.
2. **Branded and non-branded are always separated.** Branded growth reflects reputation and referrals. Non-branded growth is the SEO work reaching new people. Mixing them hides both.
3. **Trends over snapshots.** Show this month vs last month, and vs the same month last year once a year of data exists. Small sites have noisy data, so comment on direction, not decimals.
4. **Honest attribution.** Online data can't see a referral conversation or a studio visit. The enquiry log fills part of that gap. Say what can't be measured.
5. **Work done and next actions are part of the report**, not an appendix.

## 2. Metrics and sources

| Question | Metric | Source | Notes |
|---|---|---|---|
| Can Google see the site? | Indexed pages vs submitted · critical errors | Search Console → Pages | A health check, not a growth metric |
| Are we visible? | Impressions, branded vs non-branded | Search Console → Performance (branded filter, or regex on brand terms) | Non-branded impressions are the earliest sign SEO is working |
| Are people choosing us in results? | Clicks and CTR, branded vs non-branded | Search Console | Branded CTR should be high. If it isn't, the results page is confusing (e.g. name collision). |
| Which searches find us? | Top non-branded queries (new and rising) | Search Console | Feeds the intent map and content decisions |
| Which work gets discovered? | **Most-discovered projects:** organic landings per project page · Image search clicks | GA4 (landing page × session default channel group = Organic Search) · Search Console (Image) | The portfolio as a search asset |
| Are we found locally? | Business Profile: calls, direction requests, website clicks, search terms | Business Profile → Performance (entered monthly) | "Calls" counts taps on the profile's call button, not every call |
| Do visitors engage? | Engaged sessions by channel · project pages per session | GA4 | Context only. Not a headline. |
| Do visitors act? | **Key events:** `generate_lead` (enquiry submitted), `phone_click`, `email_click`, `directions_click` | GA4 | The headline online outcome |
| Are those real opportunities? | Enquiries logged · % qualified · by source | Enquiry log (studio-maintained) | The only link to business results |
| Is the site healthy? | Core Web Vitals status (or lab LCP/INP/CLS) · uptime · form test · backup status | Search Console / PageSpeed / uptime monitor / backup log | Problems caught monthly |

**Footfall and directions:** studio visits are by appointment. "Direction requests" from the Business Profile and the site's directions-click event are **proxies of intent to visit**, not actual visits. Report them as such.

## 3. What is deliberately left out

- Total page views and "hits". Bounce rate on its own. Time-on-site as a headline.
- Third-party "Domain Authority / Domain Rating" scores.
- Ranking positions for long keyword lists. (Average position for a handful of key queries can appear in the commentary when it helps a decision.)
- Instagram follower counts (out of scope; not an SEO outcome).

## 4. The monthly report (one page)

```
MACK & Co Architects — Digital report — <Month YYYY>

1. SUMMARY (3 lines)
   What changed:   …
   Why it matters: …
   Next:           …

2. SCORECARD                         This month   Last month   Trend
   Non-branded impressions           …            …            ↑ / → / ↓
   Non-branded clicks                …            …
   Branded clicks                    …            …
   Business Profile actions          calls … · directions … · website …
   Enquiries (form)                  …            …
   Calls / email taps (site)         …            …
   Qualified enquiries (log)         …            …

3. DISCOVERY
   Top rising non-branded queries (5)
   Most-discovered projects (top 5 by organic landings) + image clicks

4. LOCAL
   Profile search terms (top 5) · new reviews and replies

5. HEALTH
   Indexing ✓/✗ · errors fixed · CWV status · form test ✓ · uptime % · last backup / last test restore

6. WORK COMPLETED (bullets, with links)

7. NEXT ACTIONS (3–5, each with owner: me / studio)
```

## 5. Dashboard (live)

- **Tool:** Looker Studio (free). Native connectors for GA4 and Search Console.
- **Pages:** (1) Overview scorecard · (2) Search: branded vs non-branded, queries, pages, images · (3) Projects: organic landings and key events by project page · (4) Actions: key events by channel.
- **Business Profile:** Looker Studio has no Google-built Business Profile connector. Enter the monthly figures in a Google Sheet that the dashboard reads, or use a third-party connector (optional).
- **Access:** studio owners get view access. The dashboard is owned by MACK's Google account.

## 6. Cadence

| Rhythm | What | Time |
|---|---|---|
| Monthly (first week) | Report + dashboard refresh + health checks | ~2–3 h for me · 20 min to read |
| Quarterly | Review meeting: what worked, what to stop, next quarter's focus. Intent map refresh. | 45 min |
| Event-driven | Immediate note if something breaks (site down, form failing, profile suspended, manual action) | As needed |

## 7. Baseline (month 0)

Before launch, record: Search Console (no data: the old site was `noindex`), Business Profile status (the listing question), Lighthouse lab scores (`01-research-findings.md` F8), the number of projects meeting the standard (0 of 10), and the enquiry volume and sources the studio can recall for the last 3–6 months (rough is fine). Everything after is compared to this.
