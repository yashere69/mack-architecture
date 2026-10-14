# MACK & Co Architects — engagement plan

Planning documents for the digital engagement: search, Google Business Profile, analytics, email, storage, backup, maintenance and reporting. Prepared October 2026. None of this is part of the website build (`out/` never includes this folder).

**Start here:** [`private/00-start-here.html`](private/00-start-here.html) shows the whole engagement on one structured page (private: it includes the money notes).

| # | Deliverable | File | Audience |
|---|---|---|---|
| 1 | Research & findings (facts vs recommendations vs assumptions, with sources) | [`01-research-findings.md`](01-research-findings.md) | Internal |
| 2 | Scope matrix: what I handle, what MACK provides, how it's measured | [`02-scope-matrix.md`](02-scope-matrix.md) | Internal (shareable once condensed) |
| 3 | Architecture-specific SEO strategy | [`03-seo-strategy.md`](03-seo-strategy.md) | Internal |
| 4 | Milestone roadmap: objectives, deliverables, dependencies, completion criteria | [`04-milestone-roadmap.md`](04-milestone-roadmap.md) | Internal (basis for the written proposal) |
| 5 | Digital ecosystem diagram: discovery → website → conversion | [`05-digital-ecosystem.md`](05-digital-ecosystem.md) | Internal |
| 6 | **Client report** (9 pages, PPTX + PDF, speaker notes included, no pricing; 20-slide version archived) | [`06-client-deck/`](06-client-deck/) | **Client** |
| 7 | Execution manual: "How I Actually Execute This" | [`07-execution-guide.md`](07-execution-guide.md) | Internal |
| 8 | Reporting framework: metrics, sources, one-page monthly template | [`08-reporting-framework.md`](08-reporting-framework.md) | Internal |
| 9 | Compensation strategy (**private**) | [`private/09-compensation-strategy.md`](private/09-compensation-strategy.md) | You only |
| 10 | Hindi/Hinglish conversation script (**private**) | [`private/10-conversation-script-hinglish.md`](private/10-conversation-script-hinglish.md) | You only |

Tools: [`tools/seo-audit.py`](tools/seo-audit.py) checks every built page for title, description, robots, canonical, H1, alt coverage and JSON-LD types. Run `npm run build`, then `python3 -I engagement/tools/seo-audit.py out`.

> **Before sharing this repository with anyone:** remove `engagement/private/`.

## The three things to settle first (they block everything else)

1. **Studio identity.** The exact real-world name, and how the existing Google Maps listing at the studio address ("KARAN DESAI, Architecture + Design") should represent MACK.
2. **Domain.** Which one, registered in MACK's name.
3. **Account ownership.** A principal who owns every account. You get access.
