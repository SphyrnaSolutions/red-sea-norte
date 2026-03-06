---
phase: 01-technical-foundation
plan: 01
subsystem: api
tags: [fetch, wagtail, isr, pagination, next16]

requires:
  - phase: none
    provides: none
provides:
  - Native fetch Wagtail client with ISR caching (next.revalidate + next.tags)
  - Offset-based pagination for getPages (handles >20 items)
  - FetchConfig interface for revalidate/tags passthrough
  - Production-safe fallback config (no mock data in production)
affects: [01-02, data-layer, sitemap, seo-pipeline]

tech-stack:
  added: []
  patterns: [fetch-level ISR caching, FetchConfig passthrough, offset pagination loop]

key-files:
  created: []
  modified:
    - src/lib/wagtail/client.ts
    - src/lib/wagtail/types.ts
    - src/lib/wagtail/fetchers.ts
    - src/lib/wagtail/index.ts
    - src/lib/data/config.ts

key-decisions:
  - "Use native fetch with next.revalidate instead of axios for ISR compatibility"
  - "Errors propagate from fetchers to data layer (no error swallowing in fetchers)"
  - "Production defaults to fallback mode 'none' -- explicit FALLBACK_MODE env var required to override"

patterns-established:
  - "FetchConfig passthrough: all fetcher and data layer functions accept optional { revalidate, tags }"
  - "Pagination loop: getPages accumulates items with offset until total_count reached"
  - "Preview requests use revalidate:0 (never cached)"

requirements-completed: [TECH-01, TECH-03, TECH-04]

duration: 4min
completed: 2026-03-06
---

# Phase 1 Plan 01: Wagtail Client Rewrite Summary

**Native fetch client with ISR caching, offset pagination for >20 items, and production-safe fallback config**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-06T19:18:30Z
- **Completed:** 2026-03-06T19:22:30Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- Replaced axios with native fetch + next.revalidate on every Wagtail API call
- Added offset-based pagination loop in getPages (BATCH_SIZE=20, accumulates until total_count)
- All fetcher functions accept FetchConfig and let errors propagate to data layer
- Production mode defaults to no-fallback (mock data never served unless explicitly overridden)

## Task Commits

1. **Task 1: Rewrite Wagtail client from axios to native fetch with pagination** - `1547a50` (feat)
2. **Task 2: Update fetchers to accept cache config and fix error propagation** - `4a4f990` (feat)
3. **Task 3: Make fallback config production-safe** - `40c58d3` (fix)

## Files Created/Modified
- `src/lib/wagtail/client.ts` - Complete rewrite: native fetch, ISR caching, pagination, timeout
- `src/lib/wagtail/types.ts` - Added first_published_at and last_published_at to WagtailPageMeta
- `src/lib/wagtail/fetchers.ts` - All functions accept FetchConfig, no try/catch (errors propagate)
- `src/lib/wagtail/index.ts` - Exports FetchConfig and WagtailAPIResponse types
- `src/lib/data/config.ts` - Production defaults to fallback mode 'none', dev log on startup

## Decisions Made
- Used AbortSignal.timeout(10000) for request timeout instead of axios timeout option
- WagtailPageMeta includes both first_published_at (always present) and last_published_at (optional) for future Wagtail model extension
- FetchConfig uses revalidate default of 3600s (1h) when no config provided -- conservative but safe

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Client layer ready for Plan 02 (data layer simplification)
- FetchConfig interface established for all downstream consumers
- Pagination ensures all content types work regardless of item count

---
*Phase: 01-technical-foundation*
*Completed: 2026-03-06*
