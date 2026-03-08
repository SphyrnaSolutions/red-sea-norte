---
phase: 12-technical-seo
plan: 01
subsystem: infra
tags: [next-font, self-hosted-fonts, isr, caching, performance]

requires:
  - phase: none
    provides: n/a
provides:
  - Self-hosted Satoshi + Clash Display fonts via next/font/local (no external CDN)
  - ISR-enabled data fetchers with fixed revalidate TTLs
  - Homepage and blog listing statically rendered with 10-min ISR
affects: [12-technical-seo]

tech-stack:
  added: [next/font/local]
  patterns: [self-hosted-variable-fonts, fixed-revalidate-isr]

key-files:
  created:
    - src/lib/fonts.ts
    - public/fonts/satoshi-variable.woff2
    - public/fonts/satoshi-variable-italic.woff2
    - public/fonts/clash-display-variable.woff2
  modified:
    - src/app/layout.tsx
    - src/lib/data/blog.ts
    - src/lib/data/rutas.ts
    - src/lib/data/experiencias.ts
    - src/lib/data/ofertas.ts
    - src/lib/data/cursos.ts
    - src/app/page.tsx
    - src/app/blog/page.tsx

key-decisions:
  - "Used Fontshare variable font endpoint (@1/@2) for single-file weight coverage instead of per-weight files"
  - "Kept font-family names in globals.css @theme inline as fallback; next/font CSS variables override on html element"

patterns-established:
  - "Self-hosted fonts: all fonts in public/fonts/, declared in src/lib/fonts.ts, imported in layout.tsx"
  - "ISR pattern: data fetchers use fixed revalidate values, pages export revalidate constant"

requirements-completed: [TECH-02, TECH-03]

duration: 3min
completed: 2026-03-08
---

# Phase 12 Plan 01: Fonts & ISR Summary

**Self-hosted Satoshi/Clash Display variable fonts via next/font/local, draftMode removed from all data fetchers enabling ISR caching**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T01:11:27Z
- **Completed:** 2026-03-08T01:14:50Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- Satoshi (normal + italic) and Clash Display variable fonts self-hosted from public/fonts/
- Eliminated all external requests to api.fontshare.com (preconnect, dns-prefetch, stylesheet links removed)
- Removed draftMode() from all 5 data layer fetchers (blog, rutas, experiencias, ofertas, cursos)
- Homepage and blog listing now use ISR (revalidate=600) instead of force-dynamic

## Task Commits

Each task was committed atomically:

1. **Task 1: Self-host Satoshi and Clash Display fonts** - `3dc131a` (feat)
2. **Task 2: Remove draftMode from data fetchers and enable ISR** - `5661dce` (feat)

## Files Created/Modified
- `src/lib/fonts.ts` - next/font/local declarations for Satoshi, Clash Display, JetBrains Mono
- `public/fonts/satoshi-variable.woff2` - Satoshi variable font (300-900 weight range)
- `public/fonts/satoshi-variable-italic.woff2` - Satoshi variable italic font
- `public/fonts/clash-display-variable.woff2` - Clash Display variable font (200-700 weight range)
- `src/app/layout.tsx` - Removed external font links, imports from fonts.ts, applies CSS variables
- `src/lib/data/blog.ts` - Removed draftMode, fixed revalidate=600
- `src/lib/data/rutas.ts` - Removed draftMode, fixed revalidate=1800
- `src/lib/data/experiencias.ts` - Removed draftMode, fixed revalidate=1800
- `src/lib/data/ofertas.ts` - Removed draftMode, fixed revalidate=900
- `src/lib/data/cursos.ts` - Removed draftMode, fixed revalidate=3600
- `src/app/page.tsx` - Replaced force-dynamic with revalidate=600
- `src/app/blog/page.tsx` - Replaced force-dynamic with revalidate=600

## Decisions Made
- Used Fontshare variable font endpoint (@1/@2 syntax) to get single woff2 files covering all weights instead of downloading per-weight files
- Kept font-family name strings in globals.css @theme inline block as cascading fallback; next/font CSS variables on html element override them at runtime

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Fonts self-hosted and build-verified, ready for production
- ISR enabled on homepage and blog listing; on-demand revalidation (plan 02) can now trigger cache refresh
- draftMode still available in page-level components for preview rendering

## Self-Check: PASSED

All created files verified present. All commit hashes verified in git log.

---
*Phase: 12-technical-seo*
*Completed: 2026-03-08*
