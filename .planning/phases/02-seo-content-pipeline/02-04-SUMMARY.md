---
phase: 02-seo-content-pipeline
plan: 04
subsystem: interlinks-integration
tags: [interlinks, keyword-map, seo, page-refactor]
dependency_graph:
  requires: [resolveCluster, ClusterContext, generateSchema, buildPageMetadata, JsonLd, Breadcrumbs]
  provides: [computeInterlinks, InterlinkResult, getKeywordMap, checkKeywordConflict, RelatedContent]
  affects: [rutas-page, blog-page, experiencias-page]
tech_stack:
  added: []
  patterns: [cluster-topology-interlinks, keyword-uniqueness]
key_files:
  created:
    - src/lib/seo/interlink-engine.ts
    - src/lib/seo/keyword-map.ts
    - src/components/seo/RelatedContent.tsx
  modified:
    - src/app/rutas/[slug]/page.tsx
    - src/app/blog/[slug]/page.tsx
    - src/app/experiencias/[slug]/page.tsx
    - src/lib/wagtail/fetchers.ts
    - src/lib/seo/index.ts
decisions:
  - "Existing generateMetadata and JSON-LD logic kept (uses transformed data types), JsonLd component replaces inline script"
  - "Added getRawPageBySlug fetcher for cluster resolution since data layer transforms Wagtail data"
  - "RelatedContent renders nothing when no cluster data exists (graceful empty state)"
metrics:
  duration: "3 min"
  completed: "2026-03-06"
---

# Phase 2 Plan 04: Interlink Engine + Keyword Map + Page Integration Summary

Cluster-driven interlink computation, keyword-to-URL map for cannibalization detection, RelatedContent component, and refactoring of rutas/blog/experiencias pages to consume shared SEO utilities.

## What Was Built

1. **computeInterlinks** computing related pages from ClusterContext:
   - relatedPages: cluster siblings sorted by role (pillar first), max 6
   - pillarLink: link to pillar if current page is satellite
   - contextualLinks: up to 3 siblings for inline anchor suggestions

2. **getKeywordMap** fetching all pages with primary_keyword from Wagtail API
3. **checkKeywordConflict** for case-insensitive duplicate keyword detection

4. **RelatedContent component** rendering:
   - Prominent pillar link for satellite pages
   - Responsive grid of related page cards (2-3 columns)
   - Empty state (returns null) when no cluster data

5. **Page refactoring** for rutas, blog, experiencias:
   - Replaced inline `<script type="application/ld+json">` with XSS-safe `<JsonLd>` component
   - Added `<Breadcrumbs>` with BreadcrumbList schema to all 3 pages
   - Added `<RelatedContent>` driven by cluster resolver
   - Added FAQPage schema for rutas pages with FAQ sections
   - Added `getRawPageBySlug` fetcher for cluster resolution

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | `74f1da6` | Interlink engine + keyword map + RelatedContent |
| 2 | `2ac1e1f` | Page refactoring to consume shared SEO utilities |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Data layer type mismatch for buildPageMetadata**
- **Found during:** Task 2
- **Issue:** Existing pages use transformed data types (RutaData, BlogPost, ExperienciaData) from the data layer, not raw WagtailPageWithSEO. Replacing generateMetadata with buildPageMetadata would require architectural changes to the data layer.
- **Fix:** Kept existing generateMetadata logic (already working correctly with transformed types). Replaced only the inline JSON-LD `<script>` with the `<JsonLd>` component. Added `getRawPageBySlug` fetcher specifically for cluster resolution which needs raw Wagtail data.
- **Impact:** buildPageMetadata is available for new pages that consume raw Wagtail data directly. Existing pages retain their working metadata logic.

## Verification

- TypeScript compilation: PASSED
- `npm run build`: PASSED (all pages render correctly)
- Inline JSON-LD removed from all 3 pages (replaced with JsonLd component)
- All 3 pages render Breadcrumbs and RelatedContent
