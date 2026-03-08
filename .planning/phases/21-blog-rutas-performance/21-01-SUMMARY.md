---
phase: 21-blog-rutas-performance
plan: 01
subsystem: seo
tags: [next.js, isr, metadata, canonical, caching, performance]

requires:
  - phase: none
    provides: none
provides:
  - "/rutas ISR caching with 30min revalidation (no more force-dynamic)"
  - "/blog listing with blog-specific title, description, and canonical tag"
affects: [seo-audit, performance, blog, rutas]

tech-stack:
  added: []
  patterns: [page-level revalidate aligned with fetch-level TTL]

key-files:
  created: []
  modified:
    - src/app/rutas/page.tsx
    - src/app/blog/page.tsx

key-decisions:
  - "Used static Metadata export (not generateMetadata) for /blog since listing has no dynamic params"
  - "Aligned page revalidate=1800 with rutas data layer TTL for consistent ISR"

patterns-established:
  - "Page-level revalidate should match fetch-level revalidate for consistent ISR behavior"

requirements-completed: [PERF-03, PERF-04, PERF-05]

duration: 2min
completed: 2026-03-08
---

# Phase 21 Plan 01: Blog & Rutas Performance Summary

**/rutas ISR caching enabled (force-dynamic removed, revalidate=1800) and /blog listing with blog-specific SEO metadata and canonical tag**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-08T17:37:30Z
- **Completed:** 2026-03-08T17:39:09Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Removed `force-dynamic` from /rutas, enabling ISR caching with 30-minute revalidation
- Added blog-specific Metadata export to /blog with title, description, OpenGraph, Twitter, and canonical
- Build confirms /rutas renders as static ISR route (30m) instead of dynamic

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove force-dynamic from /rutas and add ISR revalidation** - `42dbd4b` (perf)
2. **Task 2: Add blog-specific metadata with canonical, title, and description to /blog** - `259adbe` (feat)

## Files Created/Modified
- `src/app/rutas/page.tsx` - Replaced force-dynamic with revalidate=1800 for ISR caching
- `src/app/blog/page.tsx` - Added Metadata export with blog title, description, OG, Twitter, canonical

## Decisions Made
- Used static `Metadata` export (not `generateMetadata`) for /blog since listing page has no dynamic params
- Aligned page-level `revalidate = 1800` with the existing fetch-level revalidate in rutas data layer for consistent ISR

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Removed internal marketing language from /rutas public copy**
- **Found during:** Task 1 (rutas page modification)
- **Issue:** Description meta tag contained "intencion comercial clara" and page body had "siguiente paso comercial claro" -- internal strategy notes visible to public
- **Fix:** Replaced with user-facing copy: "itinerarios detallados dia a dia" and "toda la informacion para elegir tu proxima aventura"
- **Files modified:** src/app/rutas/page.tsx
- **Verification:** Build passes, no internal language in meta or body copy
- **Committed in:** `b062428`

---

**Total deviations:** 1 auto-fixed (1 missing critical -- public-facing internal language)
**Impact on plan:** Essential fix for content quality. No scope creep.

## Issues Encountered
- Build lock file from previous build required cleanup (stale .next directory)
- Pre-existing blog/[slug] ChunkLoadError during build (known issue, Phase 18 scope) -- does not affect /blog listing or /rutas

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- /rutas and /blog listing pages optimized for caching and SEO
- Build passes successfully

---
*Phase: 21-blog-rutas-performance*
*Completed: 2026-03-08*
