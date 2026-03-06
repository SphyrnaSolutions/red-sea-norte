---
phase: 01-technical-foundation
plan: 02
subsystem: api
tags: [data-layer, sitemap, isr, caching, next16]

requires:
  - phase: 01-01
    provides: Native fetch client with FetchConfig passthrough
provides:
  - Simplified data layer using fetch-level caching only (no unstable_cache)
  - Sitemap with real Wagtail dates (first_published_at)
  - Axios fully removed from project
  - Build succeeds without Wagtail running
affects: [seo-pipeline, content-templates, homepage]

tech-stack:
  added: []
  patterns: [fetch-level ISR only, force-dynamic pages, build-safe slug functions]

key-files:
  created: []
  modified:
    - src/lib/data/homepage.ts
    - src/lib/data/blog.ts
    - src/lib/data/rutas.ts
    - src/lib/data/experiencias.ts
    - src/lib/data/ofertas.ts
    - src/lib/data/cursos.ts
    - src/app/sitemap.ts
    - src/app/page.tsx
    - src/app/blog/page.tsx
    - src/app/blog/[slug]/page.tsx
    - src/app/rutas/page.tsx
    - src/app/rutas/[slug]/page.tsx
    - src/app/ofertas/[slug]/page.tsx
    - src/app/cursos/page.tsx
    - src/app/cursos/[slug]/page.tsx
    - src/app/experiencias/page.tsx
    - src/app/experiencias/[slug]/page.tsx

key-decisions:
  - "Removed unstable_cache -- fetch-level caching is sufficient and avoids double-caching"
  - "Slug functions return [] on error instead of throwing -- builds succeed without Wagtail"
  - "Switched all pages from revalidate export to force-dynamic -- ISR handled at fetch level"
  - "Sitemap omits lastModified when date unavailable (better than faking with new Date())"

patterns-established:
  - "Data layer pattern: draftMode check -> try fetcher with FetchConfig -> catch with shouldUseFallback -> throw in prod"
  - "Slug functions never throw (return [] on error) since they're used by generateStaticParams at build time"
  - "Pages use force-dynamic, all caching handled by fetch-level next.revalidate"

requirements-completed: [TECH-01, TECH-02, TECH-03, TECH-04]

duration: 4min
completed: 2026-03-06
---

# Phase 1 Plan 02: Data Layer Simplification Summary

**Removed unstable_cache double-caching, sitemap uses real Wagtail dates, axios uninstalled, build passes without Wagtail**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-06T19:22:30Z
- **Completed:** 2026-03-06T19:26:30Z
- **Tasks:** 3
- **Files modified:** 18

## Accomplishments
- Removed unstable_cache from all 6 data layer files -- fetch-level caching replaces it
- Sitemap uses real publishedAt/first_published_at dates from Wagtail for dynamic content
- Completely uninstalled axios from the project (0 references in src/ or package.json)
- Production build succeeds without Wagtail running (pages render on demand)

## Task Commits

1. **Task 1: Simplify all data layer files** - `3ee13f7` (feat)
2. **Task 2: Update sitemap and uninstall axios** - `96af2d7` (feat)
3. **Task 3: Build verification and fixes** - `e5da04f` (fix)

## Files Created/Modified
- `src/lib/data/*.ts` (6 files) - Removed unstable_cache, pass FetchConfig to fetchers, slug functions return {slug, lastModified?}
- `src/app/sitemap.ts` - Uses real dates from Wagtail, try/catch for resilience, only static pages use new Date()
- `src/app/**/page.tsx` (10 files) - Replaced revalidate exports with dynamic='force-dynamic'
- `package.json` - axios removed from dependencies

## Decisions Made
- Slug functions return empty arrays on API error regardless of fallback mode -- generateStaticParams must not fail builds
- Switched pages to force-dynamic since fetch-level caching now handles ISR (page-level revalidate was redundant)
- Sitemap wraps dynamic fetches in try/catch -- returns only static pages if Wagtail is down (sitemap.xml always resolves)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Slug functions throw during build without Wagtail**
- **Found during:** Task 3 (Build verification)
- **Issue:** generateStaticParams calls slug functions which throw in production mode when Wagtail is unreachable
- **Fix:** Slug functions now return [] on error instead of throwing
- **Files modified:** src/lib/data/blog.ts, rutas.ts, experiencias.ts, ofertas.ts, cursos.ts
- **Verification:** npm run build succeeds
- **Committed in:** e5da04f (Task 3 commit)

**2. [Rule 3 - Blocking] Page-level revalidate causes prerender failures without Wagtail**
- **Found during:** Task 3 (Build verification)
- **Issue:** Pages with revalidate export try to prerender at build time, which fails without Wagtail API
- **Fix:** Replaced revalidate exports with dynamic='force-dynamic' -- pages render on demand, ISR at fetch level
- **Files modified:** 10 page files across app directory
- **Verification:** npm run build succeeds, all pages marked as dynamic or SSG
- **Committed in:** e5da04f (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary for build to succeed. Aligns with plan's intent -- fetch-level caching replaces page-level caching.

## Issues Encountered
- Build fails without Wagtail running due to prerender attempts. Resolved by switching to force-dynamic rendering.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Entire data layer is production-ready with proper ISR caching
- No axios, no unstable_cache, no double-caching
- Sitemap uses real dates, ready for SEO pipeline
- All Phase 1 requirements (TECH-01 through TECH-04) are complete

---
*Phase: 01-technical-foundation*
*Completed: 2026-03-06*
