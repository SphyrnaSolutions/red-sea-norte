---
phase: 08-wagtail-cms-migration
plan: 02
subsystem: api, database
tags: [wagtail, django, management-command, product-data, cms-population]

# Dependency graph
requires:
  - phase: 08-wagtail-cms-migration
    provides: Expanded RutaPage model with all fields (plan 08-01)
provides:
  - 5 published RutaPage instances in Wagtail CMS with verified product data
  - Re-runnable management command for route population
  - Multisite-aware command with --site flag
affects: [08-03-PLAN (frontend mappers consume API data from these pages)]

# Tech tracking
tech-stack:
  added: []
  patterns: [Site.objects.filter(is_default_site=True).root_page for multisite-aware page creation, StreamValue with is_lazy=True for StreamField population]

key-files:
  created:
    - /home/mandycs/Proyectos/Clientes/Karlos/wagtail-headless-cms/apps/rutas/management/commands/populate_rutas.py
  modified: []

key-decisions:
  - "Use Site.root_page instead of Page.objects.filter(slug='home') to support Wagtail multisite configurations"
  - "Hardcode all route data in the command for portability (no dependency on .planning/ files at runtime)"
  - "Delete-and-recreate strategy for re-runnability instead of update-in-place"

patterns-established:
  - "Multisite-aware commands: always resolve parent page via Site model, not direct Page queries"
  - "Management command data population pattern: define route data as module-level dicts, iterate and create"

requirements-completed: [DATA-02, DATA-04]

# Metrics
duration: 15min
completed: 2026-03-07
---

# Phase 8 Plan 2: Populate 5 Real Routes in Wagtail CMS Summary

**Django management command populates 5 published RutaPage instances with verified product data (itineraries, FAQs, spots, includes, audience fit) from viajeskarlossimon.com**

## Performance

- **Duration:** ~15 min (excludes checkpoint wait for human verification)
- **Started:** 2026-03-07T18:12:29Z
- **Completed:** 2026-03-07T18:27:29Z
- **Tasks:** 2 (1 auto + 1 human-verify checkpoint)
- **Files modified:** 1

## Accomplishments
- Management command `populate_rutas` creates all 5 diving routes with real product data
- Each route has: 8 itinerary days, 8-11 FAQs, 5-6 spots with depths, 12 includes, 3 audience fit profiles, practical info (included/extras/logistics), CTA, inline lead, SEO fields
- Command supports `--dry-run` (no DB needed) and `--site=<hostname>` for multisite targeting
- All 5 routes published and accessible via Wagtail API at /api/v2/pages/?type=rutas.RutaPage
- Routes: norte-pecios (1.190 EUR), norte-tiran (1.190 EUR), tiran-blue-hole (1.230 EUR), norte-brothers (1.230 EUR), sur-bde (1.290 EUR)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create management command** - `cec5a01` (feat) -- wagtail-headless-cms repo
2. **Task 2: Verify routes in Wagtail** - checkpoint approved, multisite fix in `ab7e3cb` (by user) and `bce9dcc` (cleanup)

## Files Created/Modified
- `wagtail-headless-cms/apps/rutas/management/commands/populate_rutas.py` - Management command with all 5 routes' data hardcoded, multisite-aware parent page resolution

## Decisions Made
- Use `Site.objects.filter(is_default_site=True).root_page` instead of `Page.objects.filter(slug='home')` to correctly resolve the active site's root page in multisite Wagtail deployments
- Hardcode all route data in the command (not read from files at runtime) for portability across environments
- Delete-and-recreate approach for re-runnability rather than update-in-place

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Wrong parent page resolved in multisite Wagtail**
- **Found during:** Task 2 (human verification checkpoint)
- **Issue:** `Page.objects.filter(slug="home").first()` returned HomePage id=3 (old/inactive) instead of id=4 (active site root for redsea.sphyrnasolutions.com). Routes were created under the wrong parent.
- **Fix:** Changed to `Site.objects.filter(is_default_site=True).first().root_page` with optional `--site=<hostname>` flag. Pages moved manually to correct parent by user.
- **Files modified:** `apps/rutas/management/commands/populate_rutas.py`
- **Verification:** Command now resolves correct site root page; API returns all 5 routes
- **Committed in:** `ab7e3cb` (user fix), `bce9dcc` (cleanup)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential fix for multisite correctness. No scope creep.

## Issues Encountered
- Local PostgreSQL not available (port 54321 refused) -- dry-run mode was updated to skip DB queries entirely, enabling testing without a database connection
- Wagtail multisite: the project has multiple HomePage instances (id=3 and id=4). The active Site (redsea.sphyrnasolutions.com) uses id=4 as root. The original command picked id=3 from a naive Page query.

## User Setup Required
None - routes are already populated in production Wagtail CMS.

## Next Phase Readiness
- 5 RutaPage instances published in Wagtail CMS with complete data
- API returns all routes at /api/v2/pages/?type=rutas.RutaPage (resolves the 500 error blocker)
- Ready for 08-03: frontend mappers/types can now consume real CMS data instead of mock-data

## Self-Check: PASSED

- File exists: `wagtail-headless-cms/apps/rutas/management/commands/populate_rutas.py`
- Commit `cec5a01` found in wagtail-headless-cms repo
- Commit `bce9dcc` found in wagtail-headless-cms repo
- 5 routes confirmed accessible via Wagtail API

---
*Phase: 08-wagtail-cms-migration*
*Completed: 2026-03-07*
