---
phase: 03-page-templates-and-homepage
plan: 03
subsystem: ui
tags: [seo, homepage, h1, cta, server-rendering]

requires:
  - phase: 01-technical-foundation
    provides: "Data layer with ISR caching for homepage data"
provides:
  - "Server-rendered H1 with target keywords on homepage"
  - "Lead capture CTA positioned above the fold"
  - "Route-first content positioning for SEO"
  - "HeroSection visual title separated from SEO H1"
affects: [homepage, seo, lead-capture]

tech-stack:
  added: []
  patterns: [sr-only-h1, aria-hidden-visual-title, route-first-positioning]

key-files:
  created: []
  modified:
    - src/app/page.tsx
    - src/components/organisms/HeroSection.tsx

key-decisions:
  - "Option B chosen: sr-only H1 in page.tsx + aria-hidden visual title in HeroSection"
  - "H1 text: 'Vida a Bordo en el Mar Rojo: Buceo y Rutas desde Hurghada'"
  - "Section order: Hero > Lead CTA > Routes > RouteValue > DiveSites > Journey > AudienceFit"

patterns-established:
  - "sr-only H1 pattern: server-rendered hidden H1 for SEO, decorative visual title with aria-hidden"
  - "Route-first positioning: core product sections before supporting content"

requirements-completed: [CONT-04]

duration: 1min
completed: 2026-03-06
---

# Phase 3 Plan 03: Homepage SEO Redesign Summary

**Server-rendered H1 with 'Vida a Bordo en el Mar Rojo' keywords, lead CTA above fold, route-first section order**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-06T19:52:50Z
- **Completed:** 2026-03-06T19:53:50Z
- **Tasks:** 2 (1 auto + 1 checkpoint auto-approved)
- **Files modified:** 2

## Accomplishments
- H1 with target keywords server-rendered in page.tsx (visible in page source)
- HeroSection visual title changed from h1 to aria-hidden p element
- InlineLeadSection moved from position 6 to position 2 (after hero, above fold)
- RouteTeaserSection moved up to position 3 (route-first content)
- Existing JSON-LD (Organization + WebSite) preserved as-is

## Task Commits

Each task was committed atomically:

1. **Task 1: Refactor HeroSection and redesign homepage layout** - `ca422bc` (feat)
2. **Task 2: Verify homepage SEO redesign** - Auto-approved (checkpoint)

## Files Created/Modified
- `src/app/page.tsx` - Added sr-only H1, reordered sections for SEO
- `src/components/organisms/HeroSection.tsx` - Changed h1 to aria-hidden p

## Decisions Made
- Option B (sr-only H1) chosen over Option A (server component split) because HeroSection has deep client dependencies (useModalStore, animations, DOM event handlers)
- H1 text hardcoded with keywords -- can be updated via CMS when Wagtail hero_title field is keyword-optimized
- InlineLeadSection promoted to position 2 for above-the-fold lead capture

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Homepage SEO structure complete
- H1 with target keywords is server-rendered
- Lead capture CTA visible above the fold
- Route-first positioning serves both users and search engines

---
*Phase: 03-page-templates-and-homepage*
*Completed: 2026-03-06*
