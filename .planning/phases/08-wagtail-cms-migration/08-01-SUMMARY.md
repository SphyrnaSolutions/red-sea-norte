---
phase: 08-wagtail-cms-migration
plan: 01
subsystem: api, ui
tags: [wagtail, django, streamfield, mock-data, product-data, next.js]

# Dependency graph
requires:
  - phase: 07-real-images
    provides: Real photos uploaded to Wagtail CMS and local images directory
provides:
  - Expanded RutaPage Wagtail model with all frontend sections (FAQ, spots, summary, audience, practicalInfo, resources, inline lead, flat CTA)
  - Migration 0004 ready for deploy
  - Homepage mock-data with real product prices, boat specs, training data
  - Ruta Norte mock-data with verified itinerary, depths, FAQs, includes
affects: [08-02-PLAN (populate routes in CMS), 08-03-PLAN (frontend mappers/types)]

# Tech tracking
tech-stack:
  added: []
  patterns: [flat CTA fields alongside legacy StreamField for backward compat, StreamField StructBlocks for repeatable sections]

key-files:
  created:
    - /home/mandycs/Proyectos/Clientes/Karlos/wagtail-headless-cms/apps/rutas/migrations/0004_rutapage_audience_fit_profiles_and_more.py
  modified:
    - /home/mandycs/Proyectos/Clientes/Karlos/wagtail-headless-cms/apps/rutas/models.py
    - /home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/lib/mock-data/homepage.ts
    - /home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/lib/mock-data/rutas.ts
    - /home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/lib/mock-data/types.ts

key-decisions:
  - "Flat CTA fields added alongside legacy cta_section StreamField for backward compatibility"
  - "All new sections use StreamField StructBlocks for flexible repeatable content"
  - "Mock-data values updated but structure/keys preserved for frontend compatibility"

patterns-established:
  - "RutaPage sections pattern: flat title/subtitle fields + StreamField for repeatable items"
  - "Real data sourced from PRODUCT-DATA.md and route files as single source of truth"

requirements-completed: [DATA-01, DATA-03]

# Metrics
duration: 133min
completed: 2026-03-07
---

# Phase 8 Plan 1: RutaPage Model Expansion + Real Product Data Summary

**Expanded RutaPage Wagtail model with 9 new sections (FAQ, spots, summary, audience fit, practical info, resources, inline lead, flat CTA) and replaced all placeholder mock-data with verified product data from viajeskarlossimon.com**

## Performance

- **Duration:** ~2h 13min (includes checkpoint wait for deploy verification)
- **Started:** 2026-03-07T15:56:38Z
- **Completed:** 2026-03-07T18:09:48Z
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files modified:** 5 (across 2 repos)

## Accomplishments
- RutaPage Django model expanded with all fields matching the frontend RutaData TypeScript type
- Migration 0004 generated and deployed to Dokploy production
- Homepage shows real prices (desde 1.190 EUR), M/Y Dolce Vita specs, Advanced SSI + 4 especialidades + Nitrox
- Ruta Norte has correct 8-day itinerary, 16-18 dives, 6 real spots with verified depths, 9 real FAQs, 12 real includes, real practical info with no-includes

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand RutaPage Django model** - `7e83a9b` (feat) -- wagtail-headless-cms repo
2. **Task 2: Update mock-data with real product data** - `4a0db1a` (feat) -- red-sea-norte repo
3. **Task 3: Verify deployment and data correctness** - checkpoint approved, TypeScript alt fix in `cc90c18`

## Files Created/Modified
- `wagtail-headless-cms/apps/rutas/models.py` - Expanded RutaPage with 30+ new fields across 9 sections
- `wagtail-headless-cms/apps/rutas/migrations/0004_*.py` - Migration for all new fields
- `red-sea-norte/src/lib/mock-data/homepage.ts` - Real prices, boat specs, training data, correct depths
- `red-sea-norte/src/lib/mock-data/rutas.ts` - Real itinerary, spots, FAQs, includes, practical info, CTA
- `red-sea-norte/src/lib/mock-data/types.ts` - Added alt property to RouteSpotData, ItineraryDay, and homepage types (fix in cc90c18)

## Decisions Made
- Flat CTA fields added alongside legacy `cta_section` StreamField -- frontend mapper expects flat fields, StreamField kept for backward compat
- All new sections follow the pattern: flat CharField for title/subtitle + StreamField with StructBlock for repeatable items
- Mock-data structure/keys preserved exactly, only values changed to real data from PRODUCT-DATA.md

## Deviations from Plan

None - plan executed exactly as written. The TypeScript `alt` property errors were pre-existing (25 errors before changes) and were fixed separately in commit `cc90c18` by the user.

## Issues Encountered
- Pre-existing TypeScript type errors: `alt` property existed in mock-data objects but was missing from type definitions. This affected RouteSpotData, ItineraryDay, and several homepage types. Fixed separately in cc90c18.

## User Setup Required
None - Wagtail backend deployed via Dokploy with migration applied.

## Next Phase Readiness
- RutaPage model has all fields needed for 08-02 (populate 5 routes via management command)
- Mock-data serves as reference data for CMS population
- Frontend types updated, ready for 08-03 (mapper/type alignment with Wagtail API)

## Self-Check: PASSED

- All 5 files exist (models.py, migration 0004, homepage.ts, rutas.ts, types.ts)
- Commit 7e83a9b found in wagtail-headless-cms repo
- Commits 4a0db1a, cc90c18 found in red-sea-norte repo

---
*Phase: 08-wagtail-cms-migration*
*Completed: 2026-03-07*
