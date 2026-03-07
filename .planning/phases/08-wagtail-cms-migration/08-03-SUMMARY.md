---
phase: 08-wagtail-cms-migration
plan: 03
subsystem: api
tags: [wagtail, typescript, cms, mapper, fallback]

# Dependency graph
requires:
  - phase: 08-wagtail-cms-migration (plan 01)
    provides: "Expanded RutaPage Django model with flat hero, FAQ, spots, audience, practical info sections"
  - phase: 08-wagtail-cms-migration (plan 02)
    provides: "5 real routes populated in Wagtail CMS via management command"
provides:
  - "WagtailRutaPage TypeScript type matching actual Django model fields"
  - "mapRutaPage mapper reading flat hero fields and all new sections"
  - "CMS-first data loading for ruta pages with mock-data fallback"
  - "Production resilience via critical fallback for rutas content type"
affects: [09-blog-audit, frontend-rutas]

# Tech tracking
tech-stack:
  added: []
  patterns: ["flat-field mapping (not StreamField) for hero/CTA sections", "optional section pattern with array length guard"]

key-files:
  created: []
  modified:
    - src/lib/wagtail/types.ts
    - src/lib/wagtail/mappers.ts
    - src/lib/data/config.ts

key-decisions:
  - "Flat hero fields in TypeScript type (not StreamField array) to match actual Django model"
  - "Map story_intro_content to description field for frontend compatibility"
  - "All content types (rutas, cursos, experiencias, ofertas) added to critical fallback list"
  - "InfoCards use flatMap with nested cards array to handle InfoCardsBlock StreamField structure"

patterns-established:
  - "Optional section pattern: check array length > 0 before building section object, return undefined otherwise"
  - "Image URL prefixing: getImageUrl prepends NEXT_PUBLIC_WAGTAIL_URL for relative paths from CMS"

requirements-completed: [CMS-01, DATA-01, DATA-02]

# Metrics
duration: 12min
completed: 2026-03-07
---

# Phase 8 Plan 3: Frontend CMS Integration Summary

**WagtailRutaPage type and mapRutaPage mapper rewritten to match actual Django model with flat hero fields, enabling CMS-first ruta page loading with production fallback**

## Performance

- **Duration:** 12 min (verification of pre-existing implementation)
- **Started:** 2026-03-07T22:26:03Z
- **Completed:** 2026-03-07T22:38:00Z
- **Tasks:** 3 (2 auto + 1 checkpoint, all pre-implemented)
- **Files modified:** 3

## Accomplishments
- WagtailRutaPage type rewritten with flat hero fields (hero_background_image, hero_title, hero_subtitle, hero_badge) matching actual Django model
- mapRutaPage mapper reads flat fields and maps all 9 new sections: FAQ, spots, audience fit, practical info, resources, summary, inline lead, plus existing itinerary/incluye
- Production fallback config includes rutas (plus cursos, experiencias, ofertas) as critical content types
- TypeScript compiles clean with zero errors
- Site live at buceoenelmarrojo.com with rutas loading from Wagtail CMS

## Task Commits

Each task was committed atomically (pre-existing commits verified):

1. **Task 1: Fix WagtailRutaPage type and mapRutaPage mapper** - `44303f6` (feat)
2. **Task 2: Update fallback config to include rutas** - `b4c68fc` (feat)
3. **Task 3: Verify frontend loads CMS data** - verified via live site (checkpoint)

Related fixes applied in previous sessions:
- `ccb2cca` - fix: prefix CMS image URLs with Wagtail backend base URL
- `03daf71` - fix: add cursos, experiencias, ofertas to critical fallback list

## Files Created/Modified
- `src/lib/wagtail/types.ts` - WagtailRutaPage interface with flat hero, story_intro_content, and 9 new optional sections (FAQ, spots, audience, practical info, resources, summary, inline lead, CTA legacy)
- `src/lib/wagtail/mappers.ts` - mapRutaPage function reading flat hero fields, mapping all sections with optional guards
- `src/lib/data/config.ts` - shouldUseFallback includes rutas, cursos, experiencias, ofertas in critical mode

## Decisions Made
- Used flat hero field access (wagtailPage.hero_background_image) instead of StreamField block access (wagtailPage.hero[0]?.value) to match actual Django model
- Mapped story_intro_content (Django field name) to description (frontend field name) for backward compatibility
- Extended critical fallback list beyond just rutas to include all content types for production resilience
- InfoCards mapper uses flatMap to handle nested InfoCardsBlock structure from Wagtail API

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Extended fallback list to all content types**
- **Found during:** Task 2
- **Issue:** Plan only added 'rutas' to critical fallback, but cursos/experiencias/ofertas also need production fallback
- **Fix:** Added all content types to critical fallback list
- **Files modified:** src/lib/data/config.ts
- **Committed in:** `03daf71`

**2. [Rule 1 - Bug] CMS image URLs missing backend prefix**
- **Found during:** Task 1
- **Issue:** getImageUrl returned relative paths from Wagtail API without the backend domain
- **Fix:** Added NEXT_PUBLIC_WAGTAIL_URL prefix for relative URLs starting with /
- **Files modified:** src/lib/wagtail/mappers.ts
- **Committed in:** `ccb2cca`

---

**Total deviations:** 2 auto-fixed (1 missing critical, 1 bug)
**Impact on plan:** Both fixes essential for production correctness. No scope creep.

## Issues Encountered
None - implementation was completed in previous sessions and verified clean.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 8 complete: all 3 plans executed, Wagtail CMS migration for rutas fully operational
- Phase 9 (Blog Audit) can proceed: real product data established as source of truth in Wagtail CMS
- Mock-data files preserved as development fallback

## Self-Check: PASSED

All files verified present. All commit hashes found in git log.

---
*Phase: 08-wagtail-cms-migration*
*Completed: 2026-03-07*
