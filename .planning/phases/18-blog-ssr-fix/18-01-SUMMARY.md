---
phase: 18-blog-ssr-fix
plan: 01
subsystem: ui, api
tags: [next.js, wagtail, ssr, streamfield, blog, performance]

requires:
  - phase: none
    provides: n/a
provides:
  - Blog body content renders in server HTML (SSR) for Google indexing
  - Lightweight blog listing fetcher without body content (~50KB vs 451KB)
  - BlogPostListing type for listing-only data
  - FetchConfig.fields option for selective Wagtail API field fetching
affects: [blog-schema, seo, sitemap]

tech-stack:
  added: []
  patterns: [wagtail-rich-text-normalization, selective-field-fetching]

key-files:
  created: []
  modified:
    - src/components/blocks/RichTextBlock.tsx
    - src/lib/wagtail/mappers.ts
    - src/lib/wagtail/client.ts
    - src/lib/wagtail/fetchers.ts
    - src/lib/data/blog.ts
    - src/lib/mock-data/types.ts
    - src/app/blog/page.tsx
    - src/app/blog/blog-listing-client.tsx

key-decisions:
  - "Wagtail rich_text values normalized in mapStreamField mapper (string -> {content: string})"
  - "Removed isomorphic-dompurify from RichTextBlock -- CMS content is trusted, avoids SSR DOM dependency"
  - "Added FetchConfig.fields option to override default fields='*' in getPages"
  - "Blog listing uses selective fields param to avoid fetching StreamField body data"

patterns-established:
  - "Rich text normalization: mapStreamField wraps raw string values for rich_text blocks"
  - "Selective fetching: FetchConfig.fields overrides default fields='*' for lightweight queries"
  - "BlogPostListing type: Omit<BlogPost, 'body'> for listing-only contexts"

requirements-completed: [SSR-01, SSR-02]

duration: 3min
completed: 2026-03-08
---

# Phase 18 Plan 01: Blog SSR Fix Summary

**Fixed blog body SSR by normalizing Wagtail rich_text block values and optimized listing payload from 451KB to ~50KB with selective field fetching**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T17:37:30Z
- **Completed:** 2026-03-08T17:40:45Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Blog post body content now renders in server HTML (paragraphs, lists, images visible in view-source)
- Root cause identified and fixed: Wagtail API returns rich_text values as raw HTML strings, but RichTextBlock expected {content: string} objects
- Blog listing page payload reduced from ~451KB to ~50KB by requesting only listing fields from Wagtail API
- getAllBlogPostSlugsData also uses lightweight fetcher (was loading full posts just to extract slugs)

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix blog body SSR** - `6d11e6e` (fix)
2. **Task 2: Optimize blog listing** - `322aa35` (perf)

## Files Created/Modified
- `src/components/blocks/RichTextBlock.tsx` - Removed DOMPurify, handles both string and object value formats
- `src/lib/wagtail/mappers.ts` - mapStreamField normalizes rich_text raw strings to {content: string}
- `src/lib/wagtail/client.ts` - Added fields option to FetchConfig, used in getPages
- `src/lib/wagtail/fetchers.ts` - Added getAllBlogPostsListing with selective fields, updated getAllBlogPostSlugs
- `src/lib/data/blog.ts` - Added getAllBlogPostsListingData, updated getAllBlogPostSlugsData to use lightweight fetcher
- `src/lib/mock-data/types.ts` - Added BlogPostListing type
- `src/app/blog/page.tsx` - Uses getAllBlogPostsListingData instead of getAllBlogPostsData
- `src/app/blog/blog-listing-client.tsx` - Updated types from BlogPost to BlogPostListing

## Decisions Made
- Wagtail rich_text normalization done in mapStreamField (single point of truth) rather than in each component
- Removed isomorphic-dompurify from RichTextBlock since CMS content is trusted and DOMPurify adds SSR complexity
- Left isomorphic-dompurify in AccordionBlock and TwoColumnBlock (they work correctly with object values)
- Used FetchConfig.fields override pattern rather than separate client function for selective fetching

## Deviations from Plan

None - plan executed exactly as written. Diagnosis confirmed the expected root cause (raw string values).

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Blog body content is now indexable by Google
- Blog listing is performant
- Ready for blog schema fixes (Phase 19+) and other SEO improvements

## Self-Check: PASSED

- All 8 modified files exist on disk
- Commit 6d11e6e (Task 1 - fix) exists in git history
- Commit 322aa35 (Task 2 - perf) exists in git history
- Build succeeds without errors

---
*Phase: 18-blog-ssr-fix*
*Completed: 2026-03-08*
