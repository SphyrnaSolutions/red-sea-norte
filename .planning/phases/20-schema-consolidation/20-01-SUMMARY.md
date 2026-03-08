---
phase: 20-schema-consolidation
plan: 01
subsystem: seo
tags: [json-ld, schema-org, blogposting, collectionpage, breadcrumblist, tourist-trip]

# Dependency graph
requires:
  - phase: 18-blog-ssr-fix
    provides: Server-rendered blog body content and BlockRenderer
provides:
  - buildCollectionPageSchema builder for listing pages (CollectionPage + BreadcrumbList)
  - Updated buildArticleSchema with urlSlug param and standardized author
  - All blog/rutas pages use centralized schema builders
affects: [seo-audit, content-pages, schema-markup]

# Tech tracking
tech-stack:
  added: []
  patterns: [centralized-schema-builders, url-slug-over-cms-slug]

key-files:
  created:
    - src/lib/seo/schema/collection-page.ts
  modified:
    - src/lib/seo/schema/article.ts
    - src/lib/seo/schema/index.ts
    - src/app/blog/[slug]/page.tsx
    - src/app/blog/page.tsx
    - src/app/rutas/page.tsx
    - src/app/rutas/[slug]/page.tsx
    - src/components/templates/SEOArticleTemplate.tsx

key-decisions:
  - "urlSlug param is optional with fallback to page.meta.slug for backward compat"
  - "Author standardized to 'Karlos Simon' as hardcoded constant, not CMS-driven"
  - "rawPage cast to WagtailBlogPostPage since getRawPageBySlug returns generic type"

patterns-established:
  - "Schema builders: all JSON-LD must use src/lib/seo/schema/ builders, never inline construction"
  - "URL slug: always use route param slug for mainEntityOfPage @id, never CMS meta.slug"

requirements-completed: [SCHEMA-05, SCHEMA-06, SCHEMA-07, SCHEMA-08, SCHEMA-09]

# Metrics
duration: 4min
completed: 2026-03-08
---

# Phase 20 Plan 01: Schema Consolidation Summary

**Centralized JSON-LD builders for blog/rutas pages with CollectionPage schema on listings, URL-slug-based mainEntityOfPage, and standardized 'Karlos Simon' author**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-08T17:43:40Z
- **Completed:** 2026-03-08T17:47:14Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- BlogPosting mainEntityOfPage.@id now uses URL route param slug instead of CMS meta.slug (SCHEMA-05)
- /blog/ and /rutas/ listing pages emit CollectionPage + BreadcrumbList JSON-LD (SCHEMA-06)
- BlogPosting image property present via builder when hero_image exists (SCHEMA-07)
- All blog and rutas pages use centralized schema builders, zero inline JSON-LD (SCHEMA-08)
- Author standardized to 'Karlos Simon' in article builder and SEOArticleTemplate (SCHEMA-09)

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix article schema builder and create collection-page builder** - `43d677d` (feat)
2. **Task 2: Migrate all pages to use schema builders** - `c9e2e25` (feat)

## Files Created/Modified
- `src/lib/seo/schema/article.ts` - Added urlSlug param, mainEntityOfPage, standardized author
- `src/lib/seo/schema/collection-page.ts` - New CollectionPage + BreadcrumbList builder
- `src/lib/seo/schema/index.ts` - Re-exports buildCollectionPageSchema
- `src/app/blog/[slug]/page.tsx` - Uses buildArticleSchema with URL slug param
- `src/app/blog/page.tsx` - Adds CollectionPage + BreadcrumbList JSON-LD
- `src/app/rutas/page.tsx` - Adds CollectionPage + BreadcrumbList JSON-LD
- `src/app/rutas/[slug]/page.tsx` - Uses buildTouristTripSchema instead of inline generateJsonLd
- `src/components/templates/SEOArticleTemplate.tsx` - Author hardcoded to 'Karlos Simon'

## Decisions Made
- urlSlug param is optional in buildArticleSchema with fallback to page.meta.slug for backward compatibility with the generic generateSchema function
- Author standardized to 'Karlos Simon' as a hardcoded constant rather than relying on inconsistent CMS data
- rawPage from getRawPageBySlug cast to WagtailBlogPostPage since the generic return type is WagtailPageWithSEO but runtime data is the full blog post page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All blog and rutas pages have complete, centralized JSON-LD schema
- Remaining inline JSON-LD in experiencias, cursos, and ofertas pages is out of scope for this plan
- Build passes cleanly, TypeScript compiles without errors

---
*Phase: 20-schema-consolidation*
*Completed: 2026-03-08*
