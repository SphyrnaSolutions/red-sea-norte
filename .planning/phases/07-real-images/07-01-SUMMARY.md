---
phase: 07-real-images
plan: 01
subsystem: ui
tags: [images, next-image, webp, avif, local-assets]

# Dependency graph
requires: []
provides:
  - 33 real photos in public/images/ organized by 9 categories
  - Central images.ts constant with local paths for all photos
  - Clean next.config.ts without Unsplash remote pattern
affects: [07-real-images plan 02]

# Tech tracking
tech-stack:
  added: []
  patterns: [local-image-serving, category-based-image-organization]

key-files:
  created:
    - public/images/boat/
    - public/images/deck/
    - public/images/dining/
    - public/images/cabins/
    - public/images/underwater/
    - public/images/wrecks/
    - public/images/landmarks/
    - public/images/salon/
    - public/images/equipment/
  modified:
    - src/lib/constants/images.ts
    - next.config.ts

key-decisions:
  - "Mapped existing hero/feature/blog keys to most semantically appropriate real photos"
  - "Added 33 new semantic keys covering all real photos for Plan 02 component integration"

patterns-established:
  - "Image organization: public/images/{category}/{descriptive-name}.jpg"
  - "Image constants: semantic keys pointing to local /images/ paths"

requirements-completed: [IMG-02]

# Metrics
duration: 1min
completed: 2026-03-07
---

# Phase 7 Plan 01: Real Images Setup Summary

**33 real photos organized in 9 categories with centralized images.ts constant replacing all Unsplash URLs, served locally via next/image with automatic WebP/AVIF optimization**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-06T23:38:33Z
- **Completed:** 2026-03-06T23:39:39Z
- **Tasks:** 2
- **Files modified:** 35

## Accomplishments
- Copied 33 real M/Y Dolce Vita photos into public/images/ across 9 category directories
- Rewrote images.ts with local paths for all existing keys plus 33 new semantic keys
- Removed Unsplash remote pattern from next.config.ts (kept pravatar and Wagtail CMS)

## Task Commits

Each task was committed atomically:

1. **Task 1: Copy and organize 33 real photos** - `40123c5` (feat)
2. **Task 2: Update images.ts and clean next.config.ts** - `d79115e` (feat)

## Files Created/Modified
- `public/images/{boat,deck,dining,cabins,underwater,wrecks,landmarks,salon,equipment}/` - 33 real photos in 9 category directories
- `src/lib/constants/images.ts` - Central image map with 47 keys (14 existing + 33 new category keys)
- `next.config.ts` - Removed Unsplash remote pattern, kept pravatar and Wagtail CMS

## Decisions Made
- Mapped heroSSI to diver-pink-soft-coral (best hero candidate), heroRutaNorte to coral-reef-anthias (reef scene), heroPecios to wreck-bow-shipwreck
- Added all 33 photos as new keys even when some duplicate existing hero mappings, enabling Plan 02 to reference any photo directly

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 33 real photos available as local assets for Plan 02 component integration
- images.ts provides comprehensive semantic keys for every photo
- next/image will serve WebP/AVIF automatically without additional configuration

---
*Phase: 07-real-images*
*Completed: 2026-03-07*
