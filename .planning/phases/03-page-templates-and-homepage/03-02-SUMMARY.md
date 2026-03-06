---
phase: 03-page-templates-and-homepage
plan: 02
subsystem: ui
tags: [react, seo, template, streamfield, json-ld, breadcrumbs]

requires:
  - phase: 03-page-templates-and-homepage
    provides: "Shared block components from Plan 01"
  - phase: 02-seo-content-pipeline
    provides: "JsonLd, Breadcrumbs, cluster resolver, interlink engine, metadata helpers"
provides:
  - "SEOArticleTemplate component rendering any Wagtail page with zero custom frontend code"
  - "ArticleHero with server-rendered H1"
  - "ArticleBody with heading hierarchy enforcement"
  - "InterlinksSection for related content"
  - "ClusterNavigation placeholder for cluster sibling nav"
  - "TableOfContents auto-generated from heading blocks"
  - "SEOArticlePageData type definition"
affects: [content-pages, routes, wrecks, dive-spots, guides]

tech-stack:
  added: []
  patterns: [template-composition, heading-hierarchy-enforcement, toc-generation]

key-files:
  created:
    - src/components/templates/SEOArticleTemplate.tsx
    - src/components/templates/ArticleHero.tsx
    - src/components/templates/ArticleBody.tsx
    - src/components/templates/InterlinksSection.tsx
    - src/components/templates/ClusterNavigation.tsx
    - src/components/templates/TableOfContents.tsx
    - src/lib/templates/types.ts
  modified: []

key-decisions:
  - "ClusterNavigation renders placeholder shell with TODO for Phase 2 integration"
  - "JSON-LD built inline with basic Article schema; Phase 2 schema-dts generator can replace later"
  - "TableOfContents is a client component (collapsible on mobile) with sticky sidebar on desktop"
  - "Default lead capture config embedded in template for article pages"

patterns-established:
  - "Template composition: Hero > ToC+Body > Interlinks > ClusterNav > CTA"
  - "H1 enforcement: only ArticleHero renders H1, body blocks clamped to H2-H4"
  - "SEOArticlePageData as universal page data contract"

requirements-completed: [CONT-03]

duration: 3min
completed: 2026-03-06
---

# Phase 3 Plan 02: SEO Article Template Summary

**Reusable SEOArticleTemplate with server-rendered H1, heading enforcement, ToC sidebar, interlinks grid, cluster nav, and lead capture CTA**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-06T19:53:00Z
- **Completed:** 2026-03-06T19:56:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- SEOArticleTemplate renders complete articles from SEOArticlePageData with zero custom code
- H1 is server-rendered in ArticleHero (no "use client" directive)
- ArticleBody enforces H2-H4 heading hierarchy with double safety (body + HeadingBlock)
- TableOfContents auto-generates from heading blocks with sticky sidebar on desktop
- InterlinksSection renders related content grid from cluster topology
- ClusterNavigation provides placeholder for cluster sibling navigation
- Default lead capture CTA included at bottom of every article

## Task Commits

Each task was committed atomically:

1. **Task 1: Define SEOArticlePageData type** - `1a2fd8b` (feat)
2. **Task 2: Build SEOArticleTemplate and supporting components** - `0ce2e79` (feat)

## Files Created/Modified
- `src/lib/templates/types.ts` - SEOArticlePageData, RelatedPage, FAQItem, AuthorData types
- `src/components/templates/SEOArticleTemplate.tsx` - Main template composition
- `src/components/templates/ArticleHero.tsx` - Server-rendered hero with H1
- `src/components/templates/ArticleBody.tsx` - StreamField body renderer
- `src/components/templates/InterlinksSection.tsx` - Related content grid
- `src/components/templates/ClusterNavigation.tsx` - Cluster nav placeholder
- `src/components/templates/TableOfContents.tsx` - Auto-generated ToC

## Decisions Made
- ClusterNavigation renders a placeholder shell -- real data comes when cluster resolver API is connected
- JSON-LD schema built inline using page data, not Phase 2's schema-dts generator (can be swapped later)
- TableOfContents is a client component (needs useState for mobile toggle)
- Default lead capture config is embedded in the template rather than requiring it as a prop

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Template ready for any Wagtail content type (routes, wrecks, dive spots, guides)
- Content pages only need to provide SEOArticlePageData to render fully
- ClusterNavigation needs connection to cluster resolver when API routes are built

---
*Phase: 03-page-templates-and-homepage*
*Completed: 2026-03-06*
