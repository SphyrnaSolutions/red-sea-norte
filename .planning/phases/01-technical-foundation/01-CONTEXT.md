# Phase 1: Technical Foundation - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix the Wagtail data layer so it is production-reliable: migrate API calls to native fetch with ISR caching, generate accurate sitemaps with real lastmod dates, handle pagination for >20 items, and fail explicitly instead of serving mock data. This is pure infrastructure -- no new features, no UI changes beyond error pages.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All implementation areas are delegated to Claude's judgment:

**Error handling behavior:**
- What visitors see when Wagtail is unavailable (error page design, messaging, HTTP status codes)
- Whether to show a generic 500 or a styled error page with retry guidance
- How to handle partial failures (some API calls succeed, others fail)

**Cache freshness (ISR):**
- Revalidation intervals per content type (homepage vs detail pages vs listings)
- Whether to use time-based revalidation, on-demand revalidation, or both
- Cache tag strategy for targeted invalidation

**Sitemap scope and structure:**
- Whether to use a single sitemap or split by content type (sitemap index)
- Which page types to include/exclude
- How to handle pages without lastmod data

</decisions>

<specifics>
## Specific Ideas

No specific requirements -- open to standard approaches. The requirements (TECH-01 through TECH-04) are clear and prescriptive enough to guide implementation directly.

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 01-technical-foundation*
*Context gathered: 2026-03-06*
