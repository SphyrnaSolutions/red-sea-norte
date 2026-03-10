---
phase: 27-cluster-wiring-monitoring
plan: "04"
subsystem: ui
tags: [breadcrumbs, seo, json-ld, cluster, schema, next.js, react]

requires:
  - phase: 27-01
    provides: Cluster resolver (resolveCluster) with ClusterContext including role and pillar fields

provides:
  - Cluster-aware breadcrumb hierarchy: Inicio > [Pillar Title] > [Page Title] for satellite pages
  - BreadcrumbList JSON-LD schema that reflects cluster hierarchy automatically
  - Backward-compatible buildBreadcrumbItems with optional clusterPillar param

affects:
  - any future page type that uses buildBreadcrumbItems and belongs to a cluster

tech-stack:
  added: []
  patterns:
    - "Cluster context passed from page to component via derived variable (clusterPillar)"
    - "Guard pattern: cluster.role !== 'pillar' prevents pillar pages injecting themselves as middle crumb"

key-files:
  created: []
  modified:
    - src/components/seo/Breadcrumbs.tsx
    - src/app/blog/[slug]/page.tsx

key-decisions:
  - "clusterPillar param is optional and nullable — backward compatible, no existing call sites changed"
  - "Pillar pages guard (cluster.role !== 'pillar') prevents self-referential breadcrumb: Inicio > [Itself] > [Itself]"
  - "BreadcrumbList JSON-LD update is automatic via existing Breadcrumbs component — no schema code changes needed"

patterns-established:
  - "Cluster pillar breadcrumb: derive clusterPillar after computeInterlinks, pass as 4th arg to buildBreadcrumbItems"

requirements-completed: [CLUST-03]

duration: 5min
completed: 2026-03-10
---

# Phase 27 Plan 04: Cluster Breadcrumb Hierarchy Summary

**Breadcrumb system updated so satellite pages show Inicio > [Pillar Title] > [Page Title] in both visual nav and BreadcrumbList JSON-LD, while pillar pages and non-cluster posts retain the standard Blog breadcrumb**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-10T11:22:50Z
- **Completed:** 2026-03-10T11:23:45Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- `buildBreadcrumbItems` now accepts an optional 4th `clusterPillar` param — fully backward compatible
- Satellite blog pages pass `cluster.pillar` to `Breadcrumbs`, yielding a 3-level cluster hierarchy
- Pillar pages excluded from self-referential injection via `cluster.role !== 'pillar'` guard
- BreadcrumbList JSON-LD hierarchy updated automatically — no schema builder changes required

## Task Commits

Each task was committed atomically:

1. **Task 1: Update buildBreadcrumbItems to support cluster hierarchy** - `1442589` (feat)
2. **Task 2: Pass cluster pillar to Breadcrumbs in blog post page** - `3895eca` (feat)

## Files Created/Modified
- `src/components/seo/Breadcrumbs.tsx` - Added optional `clusterPillar` param; middle breadcrumb switches to pillar when provided
- `src/app/blog/[slug]/page.tsx` - Derives `clusterPillar` from resolved cluster context, passes it to `buildBreadcrumbItems`

## Decisions Made
- Keep `buildBreadcrumbItems` backward compatible by making `clusterPillar` the 4th optional param — all existing call sites continue to work without modification
- Guard `cluster.role !== 'pillar'` prevents pillar pages from creating the redundant breadcrumb `Inicio > [Itself] > [Itself]`; pillar pages show the standard `Inicio > Blog > [Pillar Title]` instead

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Cluster breadcrumb wiring complete for blog posts (CLUST-03 satisfied)
- Visual verification requires deploy: visit a satellite page (e.g. /blog/tile-wreck-abu-nuhas) and confirm breadcrumb shows Inicio / [Guia de Pecios del Mar Rojo] / Tile Wreck en Abu Nuhas
- Phase 27 monitoring/analytics tasks can proceed

---
*Phase: 27-cluster-wiring-monitoring*
*Completed: 2026-03-10*
