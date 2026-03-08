---
phase: 22-content-config-cleanup
plan: 01
subsystem: seo
tags: [seo, sitemap, robots, content-cleanup, meta-description]

# Dependency graph
requires: []
provides:
  - Clean public-facing content without internal marketing notes
  - Pages sitemap with lastmod dates for all 6 static pages
  - Rutas sitemap with lastmod dates from CMS last_published_at
  - Documented robots.txt Cloudflare dedup requirement
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "lastPublishedAt flows from Wagtail API through mappers to sitemap generation"

key-files:
  created: []
  modified:
    - src/app/page.tsx
    - src/app/rutas/[slug]/page.tsx
    - src/app/rutas/page.tsx
    - src/lib/wagtail/mappers.ts
    - src/lib/mock-data/homepage.ts
    - src/app/robots.ts
    - src/app/sitemap/pages/route.ts
    - src/lib/data/rutas.ts
    - src/lib/mock-data/types.ts

key-decisions:
  - "lastPublishedAt added to RutaData interface and wired through mapRutaPage for sitemap dates"
  - "robots.txt duplication is a Cloudflare config issue, not code -- documented with comment"
  - "Fixed date 2026-03-08 used for static pages lastmod and mock data fallback"

patterns-established:
  - "CMS date fields flow through mappers to data layer for sitemap consumption"

requirements-completed: [CLEAN-01, CLEAN-02, CLEAN-03]

# Metrics
duration: 4min
completed: 2026-03-08
---

# Phase 22 Plan 01: Content & Config Cleanup Summary

**Removed internal marketing notes from 5 public-facing files, added lastmod dates to pages and rutas sitemaps via CMS last_published_at, documented robots.txt Cloudflare dedup**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-08T17:37:30Z
- **Completed:** 2026-03-08T17:41:24Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Zero internal marketing/strategy notes remain in public-facing source code (verified via grep)
- All 6 static pages in pages sitemap now include lastmod dates
- Rutas sitemap now receives lastPublishedAt from CMS via the mapper layer
- robots.ts documented as single source of truth (Cloudflare must not inject its own)

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove internal marketing notes from public content** - `3e62dd5` (fix)
2. **Task 2: Deduplicate robots.txt and add lastmod to sitemaps** - `bdf15fd` (feat)

## Files Created/Modified
- `src/app/page.tsx` - Homepage meta description cleaned of "enfoque comercial"
- `src/app/rutas/[slug]/page.tsx` - Fallback bullets and subtitles rewritten to user-facing language
- `src/app/rutas/page.tsx` - Meta description and hero subtitle cleaned of marketing jargon
- `src/lib/wagtail/mappers.ts` - Audience fit and journey note cleaned; lastPublishedAt added to mapRutaPage
- `src/lib/mock-data/homepage.ts` - 4 internal marketing strings replaced with user-facing text
- `src/app/robots.ts` - Added Cloudflare dedup documentation comment
- `src/app/sitemap/pages/route.ts` - Added lastmod dates for all 6 static pages
- `src/lib/data/rutas.ts` - getAllRutasSlugsData now uses lastPublishedAt for lastModified
- `src/lib/mock-data/types.ts` - Added lastPublishedAt field to RutaData interface

## Decisions Made
- robots.txt duplication is a Cloudflare config issue, not a code bug. Added documentation comment rather than code change.
- Used fixed date 2026-03-08 for static pages lastmod (date of last meaningful update).
- Used fallback date 2026-03-08 in mock data path since mock rutas have no CMS dates.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed "convertir interes en consulta" in rutas hero**
- **Found during:** Task 1 (content cleanup)
- **Issue:** Hero subtitle in src/app/rutas/page.tsx contained "Itinerarios pensados para convertir interes en consulta" which is internal marketing language not caught by the plan's explicit list
- **Fix:** Replaced with "Itinerarios detallados dia a dia"
- **Files modified:** src/app/rutas/page.tsx
- **Verification:** Included in grep verification, zero matches
- **Committed in:** 3e62dd5 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Additional marketing note found during sweep. Consistent with plan's intent.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All content cleanup complete
- Sitemaps now have proper lastmod dates
- robots.txt documented for Cloudflare config

---
*Phase: 22-content-config-cleanup*
*Completed: 2026-03-08*
