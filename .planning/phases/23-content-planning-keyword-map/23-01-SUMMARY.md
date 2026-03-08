---
phase: 23-content-planning-keyword-map
plan: 01
subsystem: content-seo
tags: [seo, content-map, keyword-research, internal-linking, clusters]

requires:
  - phase: 22
    provides: Clean content and config baseline for content production
provides:
  - 30-page content map with keyword targets and cluster assignments
  - Internal linking strategy with ~287 proposed links and anchor text
  - Anti-cannibalization validation against 25 existing blog posts and 5 routes
affects: [phase-24-wreck-spot, phase-25-route-comparisons, phase-26-friction-logistics, phase-27-cluster-wiring]

tech-stack:
  added: []
  patterns: [content-map-before-production, anti-cannibalization-validation, hub-spoke-cluster-architecture]

key-files:
  created:
    - .planning/content/CONTENT-MAP.md
    - .planning/content/INTERNAL-LINKING-MAP.md
  modified: []

key-decisions:
  - "5 clusters: pecios (6 pages), destinos (7), rutas (4), logistica (6), vida-a-bordo (7)"
  - "5 pillar pages (one per cluster) deferred to Phase 27 for cluster wiring"
  - "Phase 26 expanded to include vida-a-bordo satellites (11 pages total) alongside friction content"
  - "#28 Corrientes assigned to vida-a-bordo cluster (practical diving content) instead of destinos"

patterns-established:
  - "Anti-cannibalization: every new keyword validated against closest existing keyword with justification"
  - "Internal linking: minimum 2 inbound + 3 outbound per new page"
  - "Hub-spoke: pillars link to all satellites, satellites breadcrumb back to pillar"

requirements-completed: [PLAN-01, PLAN-02]

duration: 12min
completed: 2026-03-08
---

# Phase 23: Content Planning & Keyword Map Summary

**30-page content map across 5 clusters with unique keyword targets and ~287-link internal linking strategy validated against 30 existing pages**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-08
- **Completed:** 2026-03-08
- **Tasks:** 2
- **Files created:** 2

## Accomplishments
- Created CONTENT-MAP.md with 30 pages: titles, keyword targets, cluster assignments, page types, and production phases
- Validated all 30 keywords against 25 existing blog posts and 5 routes with anti-cannibalization justifications
- Created INTERNAL-LINKING-MAP.md with ~287 proposed internal links including anchor text and placement
- All 5 clusters have >= 3 pages (pecios: 6, destinos: 7, rutas: 4, logistica: 6, vida-a-bordo: 7)

## Task Commits

1. **Task 1: Content map with 30 pages** - `53b2f10` (docs)
2. **Task 2: Internal linking map** - `fa8750d` (docs)

## Files Created/Modified
- `.planning/content/CONTENT-MAP.md` - 30-page content map with keyword targets, clusters, types, and phases
- `.planning/content/INTERNAL-LINKING-MAP.md` - Bidirectional internal linking strategy with anchor text

## Decisions Made
- Expanded Phase 26 from 4 friction pages to 11 (added vida-a-bordo satellites that don't require spot research)
- Assigned #28 (corrientes) to vida-a-bordo instead of destinos (practical diving content angle)
- 5 pillar pages placed in Phase 27 to be created after all satellite content exists

## Deviations from Plan
None - plan executed as specified.

## Issues Encountered
None.

## User Setup Required
None - documentation-only phase, no external service configuration required.

## Next Phase Readiness
- Content map ready to guide Phases 24-27
- Phase 24 (Wreck & Spot Content): 11 pages identified with clear keyword targets
- Phase 25 (Route Comparisons): 3 comparativa pages ready
- Phase 26 (Friction & Vida a bordo): 11 pages mapped
- Phase 27 (Cluster Wiring): 5 pillar pages + linking infrastructure planned
- Internal linking map provides exact anchor text for implementation during content production

---
*Phase: 23-content-planning-keyword-map*
*Completed: 2026-03-08*
