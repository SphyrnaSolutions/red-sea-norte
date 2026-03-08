---
phase: 19-routing-dead-links
plan: 01
subsystem: routing
tags: [next.js, redirects, seo, lead-capture, footer]

# Dependency graph
requires: []
provides:
  - "/contacto page with inline lead form and JSON-LD schema"
  - "301 redirects for accented blog slugs (thistlegorm, ras-mohammed)"
  - "Clean footer with no dead links"
affects: [sitemap, seo-audit]

# Tech tracking
tech-stack:
  added: []
  patterns: [ContactPage JSON-LD schema, BreadcrumbList JSON-LD]

key-files:
  created:
    - src/app/contacto/page.tsx
  modified:
    - next.config.ts
    - src/components/organisms/Footer.tsx

key-decisions:
  - "Contacto page as static server component (no data fetching) for optimal performance"
  - "Both URL-encoded and raw UTF-8 redirect variants for maximum browser coverage"

patterns-established:
  - "ContactPage JSON-LD with BreadcrumbList for standalone pages"

requirements-completed: [ROUTE-01, ROUTE-02, ROUTE-03]

# Metrics
duration: 2min
completed: 2026-03-08
---

# Phase 19: Routing & Dead Links Summary

**/contacto page with inline lead form, 301 redirects for accented blog slugs, and footer dead link cleanup**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-08T17:37:26Z
- **Completed:** 2026-03-08T17:39:41Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created /contacto page with InlineLeadSection (name, email, phone, certification, month, WhatsApp consent)
- Added 301 redirects for accented blog slugs (both URL-encoded and raw UTF-8 variants)
- Removed dead /ofertas and /terminos links from footer, added /contacto link

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /contacto page with inline lead form** - `8fda19c` (feat)
2. **Task 2: Add 301 redirects for accented blog slugs and clean footer dead links** - `0f3db31` (fix)

## Files Created/Modified
- `src/app/contacto/page.tsx` - Contact page with InlineLeadSection, LeadFormModal, ContactPage + BreadcrumbList JSON-LD
- `next.config.ts` - 4 new 301 redirects for accented blog slugs (encoded + raw UTF-8)
- `src/components/organisms/Footer.tsx` - Removed /ofertas from Explora, removed /terminos from bottom bar, added /contacto to Compania

## Decisions Made
- Contacto page is a static server component (no `force-dynamic`, no data fetching) for optimal build performance
- Both URL-encoded (%C3%AD) and raw UTF-8 redirect sources added for maximum browser compatibility
- LeadFormModal included on contacto page with extended textarea field for consistency with other pages

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Stale `.next/lock` file from previous build required cache cleanup before build verification

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- /contacto page live and functional
- All accented blog slug URLs will redirect correctly after deployment
- Footer clean of dead links
- Build passes without errors

## Self-Check: PASSED

- [x] src/app/contacto/page.tsx exists (190 lines, min 40 required)
- [x] Commit 8fda19c found (Task 1)
- [x] Commit 0f3db31 found (Task 2)
- [x] Footer contains 0 references to /ofertas or /terminos
- [x] Build passes without errors

---
*Phase: 19-routing-dead-links*
*Completed: 2026-03-08*
