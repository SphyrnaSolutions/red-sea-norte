---
phase: 12-technical-seo
plan: 02
subsystem: api
tags: [isr, revalidation, next-cache, webhook, wagtail]

requires:
  - phase: 10-seo-tooling
    provides: "Data layer with ISR tags on all content fetchers"
provides:
  - "POST /api/revalidate endpoint for on-demand ISR cache invalidation"
  - "Wagtail webhook integration point for push-based content updates"
affects: [13-content-media]

tech-stack:
  added: []
  patterns: [on-demand-isr-revalidation, webhook-secret-auth]

key-files:
  created:
    - src/app/api/revalidate/route.ts
  modified:
    - .env.example

key-decisions:
  - "Used revalidateTag with { expire: 0 } for Next.js 16 compatibility (2-arg API)"
  - "No rate limiting on revalidation endpoint (server-to-server with secret auth)"

patterns-established:
  - "Webhook secret validation pattern: REVALIDATION_SECRET env var shared between Wagtail and Next.js"
  - "Content type tag mapping centralized in CONTENT_TAG_MAP constant"

requirements-completed: [TECH-01]

duration: 2min
completed: 2026-03-08
---

# Phase 12 Plan 02: On-Demand ISR Revalidation Summary

**POST /api/revalidate endpoint with secret auth and content-type-aware tag invalidation for Wagtail webhook integration**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-08T01:11:19Z
- **Completed:** 2026-03-08T01:12:57Z
- **Tasks:** 1 of 2 (Task 2 is checkpoint:human-verify)
- **Files modified:** 2

## Accomplishments
- Created /api/revalidate POST endpoint secured with REVALIDATION_SECRET
- Tag mapping covers all 6 content types (blog, rutas, experiencias, ofertas, cursos, homepage)
- Tags exactly match data layer fetcher tags for correct cache invalidation
- Added REVALIDATION_SECRET to .env.example with generation instructions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /api/revalidate POST endpoint** - `94c87aa` (feat)
2. **Task 2: Configure Wagtail webhook** - CHECKPOINT (human-verify, pending)

## Files Created/Modified
- `src/app/api/revalidate/route.ts` - POST handler with secret validation, content type mapping, revalidateTag calls
- `.env.example` - Added REVALIDATION_SECRET env var documentation

## Decisions Made
- Used `revalidateTag(tag, { expire: 0 })` two-argument form required by Next.js 16 (single-arg deprecated)
- No rate limiting per plan specification (server-to-server endpoint)
- Content type validation returns 400 with list of valid types for developer ergonomics

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Next.js 16 revalidateTag requires 2 arguments**
- **Found during:** Task 1 (build verification)
- **Issue:** Next.js 16 changed revalidateTag signature to require a second `profile` argument; single-arg call fails TypeScript
- **Fix:** Added `{ expire: 0 }` as second argument to force immediate expiration
- **Files modified:** src/app/api/revalidate/route.ts
- **Verification:** Build succeeds after fix
- **Committed in:** 94c87aa (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** API compatibility fix, no scope creep.

## Issues Encountered
None beyond the deviation above.

## User Setup Required
- Set REVALIDATION_SECRET env var in Next.js production environment (Dokploy)
- Configure Wagtail webhook to POST to /api/revalidate on page publish (Task 2 checkpoint)

## Next Phase Readiness
- Revalidation endpoint ready for deployment
- Wagtail webhook configuration pending human verification (Task 2)

---
*Phase: 12-technical-seo*
*Completed: 2026-03-08*
