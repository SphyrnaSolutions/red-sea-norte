---
phase: 07-real-images
plan: 02
subsystem: ui
tags: [next-image, seo, alt-text, responsive-images, webp]

requires:
  - phase: 07-01
    provides: "33 real photos in public/images/ and images.ts constant with local paths"
provides:
  - "Zero Unsplash references in codebase — all images are local"
  - "SEO-optimized alt text in Spanish on all image data objects"
  - "Responsive sizes prop on all next/image components"
affects: [seo, performance, content]

tech-stack:
  added: []
  patterns: ["responsive sizes breakpoints: 100vw / 50vw / 33vw", "SEO alt text pattern: [que se ve] en [contexto M/Y Dolce Vita / Mar Rojo]"]

key-files:
  created: []
  modified:
    - src/lib/mock-data/homepage.ts
    - src/lib/mock-data/rutas.ts
    - src/lib/mock-data/experiencias.ts
    - src/lib/mock-data/ofertas.ts
    - src/app/rutas/page.tsx
    - src/components/organisms/WhySection.tsx
    - src/components/organisms/CountdownAsym.tsx
    - src/components/organisms/HeroSection.tsx
    - src/components/organisms/HeroOffer.tsx
    - src/components/organisms/DiveSitesSection.tsx
    - src/components/organisms/SpecSection.tsx
    - src/components/organisms/RouteValueSection.tsx
    - src/components/templates/ArticleHero.tsx
    - src/components/templates/InterlinksSection.tsx
    - src/components/blocks/GalleryBlock.tsx
    - src/components/blocks/ImageBlock.tsx
    - src/components/blocks/TwoColumnBlock.tsx
    - src/app/experiencias/[slug]/page.tsx
    - src/app/rutas/[slug]/page.tsx
    - src/app/blog/[slug]/page.tsx
    - src/app/blog/blog-listing-client.tsx

key-decisions:
  - "Swarm team approach: url-replacer and image-optimizer agents worked in parallel"
  - "image-optimizer also replaced 3 hardcoded Unsplash URLs in components (CountdownAsym, WhySection, rutas/page.tsx)"

patterns-established:
  - "Hero/full-width images: sizes='100vw'"
  - "Card grids (3-col): sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'"
  - "Two-column layouts: sizes='(max-width: 768px) 100vw, 50vw'"
  - "SEO alt text in Spanish: '[Que se ve] en [contexto del M/Y Dolce Vita / Mar Rojo]'"

requirements-completed: [IMG-01, IMG-03, IMG-04]

duration: 4min
completed: 2026-03-07
---

# Plan 07-02: Unsplash Replacement Summary

**Replaced all 58 Unsplash URLs with local /images/ paths, added SEO alt text in Spanish, and configured responsive sizes on all Image components**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-06T23:44:00Z
- **Completed:** 2026-03-06T23:48:20Z
- **Tasks:** 2/3 (Task 3 is human-verify checkpoint — pending)
- **Files modified:** 24

## Accomplishments
- Zero Unsplash references remain in source code (verified via grep)
- All image data objects have SEO-optimized alt text in Spanish with keywords
- Responsive sizes prop configured on all 17+ Image component usages
- Hero images use priority loading, below-fold images use default lazy loading

## Task Commits

1. **Task 1: Replace Unsplash URLs + SEO alt text** — `291676f` (feat)
2. **Task 2: Responsive sizes + lazy loading** — `291676f` (feat)
3. **Task 3: Visual verification** — PENDING (human-verify checkpoint)

## Files Created/Modified
- `src/lib/mock-data/homepage.ts` — 19 Unsplash URLs replaced, SEO alt text added
- `src/lib/mock-data/rutas.ts` — 13 URLs replaced, alt text on spots/itinerary
- `src/lib/mock-data/experiencias.ts` — 8 URLs replaced, alt text on sections
- `src/lib/mock-data/ofertas.ts` — 1 URL replaced
- `src/app/rutas/page.tsx` — Hero image + CTA replaced, sizes="100vw"
- `src/components/organisms/*.tsx` — Responsive sizes on HeroSection, HeroOffer, DiveSites, SpecSection, RouteValue, WhySection, CountdownAsym
- `src/components/templates/*.tsx` — Sizes on ArticleHero, InterlinksSection
- `src/components/blocks/*.tsx` — Sizes on Gallery, Image, TwoColumn blocks
- `src/app/experiencias/[slug]/page.tsx` — Sizes on detail page images
- `src/app/rutas/[slug]/page.tsx` — Sizes on route detail images
- `src/app/blog/[slug]/page.tsx` — Sizes on blog detail images

## Decisions Made
- Used swarm team with 2 parallel agents (url-replacer + image-optimizer) for faster execution
- image-optimizer proactively replaced 3 hardcoded Unsplash URLs found in components while adding sizes

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Auto-fix] image-optimizer replaced 3 component-level Unsplash URLs**
- **Found during:** Task 2 (responsive sizes audit)
- **Issue:** CountdownAsym.tsx, WhySection.tsx CertificationCard, rutas/page.tsx had hardcoded Unsplash URLs
- **Fix:** Replaced with appropriate local /images/ paths
- **Files modified:** src/components/organisms/CountdownAsym.tsx, WhySection.tsx, src/app/rutas/page.tsx
- **Verification:** grep confirms 0 Unsplash references
- **Committed in:** 291676f

---

**Total deviations:** 1 auto-fixed (overlap between agents, no issues)
**Impact on plan:** Positive — both tasks contributed to zero-Unsplash goal.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- **Pending:** Task 3 human visual verification checkpoint
- All code changes complete, ready for visual review at http://localhost:3000

---
*Phase: 07-real-images*
*Completed: 2026-03-07*
