---
phase: 02-seo-content-pipeline
plan: 03
subsystem: cluster-nav
tags: [cluster, breadcrumbs, seo, navigation]
dependency_graph:
  requires: [WagtailPageWithSEO, buildBreadcrumbSchema, JsonLd, BASE_URL]
  provides: [resolveCluster, ClusterContext, Breadcrumbs, buildBreadcrumbItems]
  affects: [rutas-page, blog-page, experiencias-page]
tech_stack:
  added: []
  patterns: [cluster-resolver, visual-plus-schema]
key_files:
  created:
    - src/lib/seo/cluster-resolver.ts
    - src/components/seo/Breadcrumbs.tsx
  modified:
    - src/lib/seo/index.ts
decisions:
  - "Cluster resolver fetches all pages and filters client-side (site has <100 pages, ISR-cached)"
  - "Breadcrumbs always render visual nav + BreadcrumbList JSON-LD together (Google requirement)"
metrics:
  duration: "2 min"
  completed: "2026-03-06"
---

# Phase 2 Plan 03: Cluster Resolver + Breadcrumbs Summary

Cluster resolver mapping pages to pillar-satellite relationships plus Breadcrumbs component rendering accessible visual nav with paired BreadcrumbList JSON-LD schema.

## What Was Built

1. **resolveCluster function** that:
   - Fetches all pages from Wagtail API with cluster fields
   - Filters by matching cluster_id
   - Returns ClusterContext with pillar, siblings, and page role
   - Returns null for pages without cluster_id or invalid clusters
   - Handles API errors gracefully

2. **Breadcrumbs component** that:
   - Renders `<nav aria-label="Breadcrumb">` with semantic `<ol>/<li>` structure
   - Last item rendered as `<span>` (not clickable, aria-current="page")
   - Other items rendered as `<Link>` with site color scheme
   - Pairs visual breadcrumbs with BreadcrumbList JSON-LD automatically

3. **buildBreadcrumbItems helper** producing Inicio > ContentType > PageTitle hierarchy

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | `c3b99e1` | Cluster resolver |
| 2 | `35f9e13` | Breadcrumbs component |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compilation: PASSED
- resolveCluster handles all edge cases: no cluster, no pillar, API errors
