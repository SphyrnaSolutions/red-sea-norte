---
phase: 04-odoo-api-integration
plan: 02
subsystem: api
tags: [nextjs, rate-limiting, odoo, crm, rest-api, vitest]

requires:
  - phase: 04-odoo-api-integration plan 01
    provides: Odoo XML-RPC client (createLead, searchOrCreateUtmSource), lead validation schema
provides:
  - POST /api/lead endpoint with rate limiting, validation, and Odoo CRM integration
  - In-memory sliding window rate limiter
  - Full test suite for API route and rate limiter
affects: [05-lead-form-ui, 06-deployment]

tech-stack:
  added: [vitest, "@vitejs/plugin-react"]
  patterns: [sliding-window-rate-limit, api-response-envelope, force-dynamic-route]

key-files:
  created:
    - src/app/api/lead/route.ts
    - src/lib/rate-limit.ts
    - src/__tests__/api/lead.test.ts
    - src/__tests__/lib/rate-limit.test.ts
    - vitest.config.ts
  modified:
    - package.json

key-decisions:
  - "In-memory rate limiter with Map store -- no Redis needed at this scale"
  - "vitest over jest for ESM-native support and faster execution"
  - "_resetStore export for test isolation between test cases"

patterns-established:
  - "API response envelope: { success, message } or { error, fields } for consistency"
  - "Server-side error logging with [API Lead] prefix, generic client error messages"
  - "force-dynamic export for mutation endpoints"

requirements-completed: [API-01, API-02, API-03, CRM-02, CRM-03]

duration: 2min
completed: 2026-03-06
---

# Phase 04 Plan 02: POST /api/lead Route Summary

**POST /api/lead with sliding-window rate limiting (5/min per IP), Zod validation, Odoo CRM lead creation with utm.source tracking and WhatsApp consent recording**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-06T21:44:37Z
- **Completed:** 2026-03-06T21:46:31Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- POST /api/lead route with full request lifecycle: rate limit -> validate -> create lead in Odoo
- In-memory sliding window rate limiter with automatic cleanup and configurable window/threshold
- 15 tests covering all success and error paths (201, 400, 429, 500)
- vitest configured with path aliases for the project

## Task Commits

Each task was committed atomically:

1. **Task 1: Rate limiter and POST /api/lead route** - `e6b1cf9` (feat)
2. **Task 2: Integration tests for API route** - `b610f5e` (test)

## Files Created/Modified
- `src/app/api/lead/route.ts` - POST handler with rate limiting, validation, Odoo integration
- `src/lib/rate-limit.ts` - In-memory sliding window rate limiter with cleanup
- `src/__tests__/api/lead.test.ts` - 10 integration tests for API route
- `src/__tests__/lib/rate-limit.test.ts` - 5 unit tests for rate limiter
- `vitest.config.ts` - Vitest configuration with @ path alias
- `package.json` - Added vitest and @vitejs/plugin-react devDependencies

## Decisions Made
- Used in-memory Map for rate limiting -- no Redis needed at current scale (single instance)
- Chose vitest over jest for ESM-native support and faster execution with Next.js
- Exported `_resetStore` helper for test isolation between rate limiter tests
- Used `force-dynamic` export to prevent Next.js from caching the mutation endpoint

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

External services require manual configuration. See [04-USER-SETUP.md](./04-USER-SETUP.md) or STATE.md for:
- ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY environment variables
- Dedicated API user with CRM-only permissions in Odoo

## Next Phase Readiness
- API route ready for frontend form integration (phase 05)
- Odoo credentials needed before end-to-end testing with real CRM instance
- Rate limiter ready for production (cleanup timer uses unref to not block process exit)

---
*Phase: 04-odoo-api-integration*
*Completed: 2026-03-06*
