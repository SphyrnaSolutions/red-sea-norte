---
phase: 11-sitemaps-redirects
plan: 01
subsystem: seo
tags: [sitemap, xml, redirects, 301, google-images, next-config]

requires:
  - phase: 09-content-audit
    provides: merged blog posts list (5 slugs redirected)
provides:
  - Sitemap index at /sitemap.xml with 7 category sitemaps
  - Per-category sitemaps (blog, rutas, ofertas, cursos, experiencias, pages, images)
  - Image sitemap with Google image extension namespace
  - 301 redirects for 5 merged blog post slugs
affects: [12-structured-data, 11-02-submit-sitemaps]

tech-stack:
  added: []
  patterns: [route-handler-xml-sitemaps, sitemapindex-pattern]

key-files:
  created:
    - src/app/sitemap.xml/route.ts
    - src/app/sitemap/blog/route.ts
    - src/app/sitemap/rutas/route.ts
    - src/app/sitemap/ofertas/route.ts
    - src/app/sitemap/cursos/route.ts
    - src/app/sitemap/experiencias/route.ts
    - src/app/sitemap/pages/route.ts
    - src/app/sitemap/images/route.ts
  modified:
    - next.config.ts

key-decisions:
  - "Used raw XML route handlers instead of Next.js MetadataRoute.Sitemap -- MetadataRoute generates urlset, not sitemapindex"
  - "Replaced sitemap.ts metadata file with sitemap.xml/route.ts for proper sitemapindex XML"

patterns-established:
  - "XML sitemap route handlers: export GET() returning new Response(xml, {headers: {'Content-Type': 'application/xml'}})"
  - "MERGED_POST_SLUGS constant for filtering deleted/merged content from sitemaps"

requirements-completed: [SITE-01, SITE-02, SITE-03, SITE-04]

duration: 3min
completed: 2026-03-08
---

# Phase 11 Plan 01: Sitemaps & Redirects Summary

**Sitemap index with 7 per-category XML sitemaps, image sitemap for Google Images, and 301 redirects for 5 merged blog posts**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T00:58:25Z
- **Completed:** 2026-03-08T01:01:46Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Sitemap index at /sitemap.xml linking to 7 per-category sitemaps (blog, rutas, ofertas, cursos, experiencias, pages, images)
- Blog sitemap excludes 5 merged post slugs to prevent index pollution
- Image sitemap with Google image extension namespace for hero images across all content types
- 5 merged blog posts return 301 permanent redirects to their consolidated destinations

## Task Commits

Each task was committed atomically:

1. **Task 1: Sitemap index + per-category sitemaps + image sitemap** - `55fee31` (feat)
2. **Task 2: 301 redirects for merged blog posts** - `42d3712` (feat)

## Files Created/Modified
- `src/app/sitemap.xml/route.ts` - Sitemap index returning sitemapindex XML with 7 category links
- `src/app/sitemap/blog/route.ts` - Blog sitemap excluding merged posts
- `src/app/sitemap/rutas/route.ts` - Rutas sitemap from Wagtail data
- `src/app/sitemap/ofertas/route.ts` - Ofertas sitemap from Wagtail data
- `src/app/sitemap/cursos/route.ts` - Cursos sitemap from Wagtail data
- `src/app/sitemap/experiencias/route.ts` - Experiencias sitemap from Wagtail data
- `src/app/sitemap/pages/route.ts` - Static pages sitemap (homepage, blog listing, privacy)
- `src/app/sitemap/images/route.ts` - Image sitemap with Google image extension namespace
- `next.config.ts` - Added redirects() with 5 permanent 301 redirects
- `src/app/sitemap.ts` - DELETED (replaced by route handler approach)

## Decisions Made
- Used raw XML route handlers instead of Next.js MetadataRoute.Sitemap because MetadataRoute generates `<urlset>` XML, not `<sitemapindex>` XML which is the correct format for a sitemap index
- Replaced the `sitemap.ts` metadata file with `sitemap.xml/route.ts` route handler to generate proper sitemapindex format

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Changed sitemap index from MetadataRoute to route handler**
- **Found during:** Task 1 (Sitemap index creation)
- **Issue:** Next.js MetadataRoute.Sitemap only generates `<urlset>` XML, not the required `<sitemapindex>` format
- **Fix:** Deleted `src/app/sitemap.ts`, created `src/app/sitemap.xml/route.ts` with raw XML sitemapindex response
- **Files modified:** src/app/sitemap.ts (deleted), src/app/sitemap.xml/route.ts (created)
- **Verification:** Build succeeds, /sitemap.xml route registered as static
- **Committed in:** 55fee31 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary for correct sitemapindex XML format. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Sitemaps ready for submission to Google Search Console and Bing Webmaster Tools (Plan 11-02)
- Redirects active on next deploy -- merged posts will 301 to consolidated content
- robots.txt already points to /sitemap.xml (unchanged, still correct)

---
*Phase: 11-sitemaps-redirects*
*Completed: 2026-03-08*
