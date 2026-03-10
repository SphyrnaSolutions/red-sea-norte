---
phase: 27-cluster-wiring-monitoring
plan: 02
subsystem: seo
tags: [python, wagtail, keyword-cannibalization, seo-monitoring, stdlib]

# Dependency graph
requires:
  - phase: 27-cluster-wiring-monitoring
    provides: Wagtail CMS with primary_keyword field on all content pages
provides:
  - Standalone keyword cannibalization detection script (no dependencies)
  - Detects exact/substring/token-overlap keyword conflicts across all pages
  - Actionable report with CRITICAL/WARNING/INFO severity levels
affects: [ongoing-seo-monitoring, content-strategy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Wagtail API custom fields require ?type= filter — global /pages/ endpoint rejects them"
    - "Per-type API fetching: loop CONTENT_TYPES dict, skip 400s for unregistered types"

key-files:
  created:
    - scripts/keyword_cannibalization_check.py
  modified: []

key-decisions:
  - "Wagtail API returns 400 for custom fields on global /pages/ endpoint; must use ?type=BlogPostPage&fields=... per content type"
  - "Pages for pecios/destinos/logistica/vida_a_bordo were published as blog.BlogPostPage in this install — 400 on those types is expected behavior, skipped gracefully"
  - "Token overlap uses Jaccard (intersection/union) with 60% threshold for INFO-level flagging"
  - "stdlib only (urllib.request, json, argparse) — zero dependencies, fully portable"

patterns-established:
  - "Type-filtered Wagtail API fetch: always use ?type=ContentType&fields=custom_field to access non-default fields"

requirements-completed: [MON-01]

# Metrics
duration: 3min
completed: 2026-03-10
---

# Phase 27 Plan 02: Keyword Cannibalization Check Summary

**Standalone Python script (stdlib-only) that detects exact/substring/token-overlap keyword conflicts across all Wagtail CMS pages, with severity-level report and exit code signaling**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-10T10:36:18Z
- **Completed:** 2026-03-10T10:39:32Z
- **Tasks:** 1/1
- **Files modified:** 1

## Accomplishments
- Script fetches all pages with `primary_keyword` via type-filtered Wagtail API requests
- Detects exact duplicates (CRITICAL), substring conflicts (WARNING), high token overlap >60% (INFO)
- Produces structured actionable report with per-conflict recommendations
- Verified against production: 55 pages analyzed, 0 critical issues, 3 warnings (vida-a-bordo substring chain), 10 info items
- Exit code 0 (no exact duplicates found) — site is in healthy keyword state

## Task Commits

Each task was committed atomically:

1. **Task 1: Create keyword cannibalization detection script** - `c99289b` (feat)

## Files Created/Modified
- `scripts/keyword_cannibalization_check.py` - Keyword cannibalization detector: type-filtered Wagtail API fetcher, exact/substring/token-overlap conflict detection, structured severity report, --wagtail-url CLI flag

## Decisions Made
- Wagtail's `/api/v2/pages/` endpoint rejects requests for custom fields (primary_keyword, cluster_id, cluster_role) without a `?type=` filter — returns HTTP 400. Fixed by iterating over known CONTENT_TYPES dict and fetching each separately, gracefully skipping types that return 400 (not registered in this install).
- All content pages (pecios, destinos, logistica, vida-a-bordo) were published as `blog.BlogPostPage` in this Wagtail install, so their custom fields are captured via the BlogPostPage query. The other type queries return 400 silently.
- Jaccard similarity (intersection/union) chosen for token overlap ratio — more stable than raw overlap percentage when comparing keywords of different lengths.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Wagtail API rejects custom fields on global /pages/ endpoint**
- **Found during:** Task 1 (during verification run)
- **Issue:** Plan specified `?fields=title,primary_keyword,cluster_id,cluster_role` on the global `/api/v2/pages/` endpoint, but Wagtail returns HTTP 400 for custom (non-standard) fields unless filtered by `?type=`. The keyword-map.ts in the frontend uses `wagtailFetch` which works around this internally.
- **Fix:** Changed fetch strategy from single global request to per-content-type requests (`?type=blog.BlogPostPage&fields=...`), matching the pattern that actually works. Types returning 400 are skipped with a stderr note.
- **Files modified:** `scripts/keyword_cannibalization_check.py`
- **Verification:** Script ran successfully against production, fetched 55 pages, produced full report
- **Committed in:** c99289b (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - API behavioral difference from plan assumption)
**Impact on plan:** Fix was required for the script to work at all. Final behavior matches plan spec exactly. No scope creep.

## Issues Encountered
- Wagtail API returns 400 for custom fields on the global pages list — this is a Wagtail API design constraint (fields must match the specific page type). Resolved by type-filtering.

## User Setup Required
None - no external service configuration required. Script uses only the production Wagtail API (public read endpoint, no auth needed).

## Next Phase Readiness
- Script ready for on-demand execution: `python3 scripts/keyword_cannibalization_check.py`
- Current site state: 3 substring warnings (vida-a-bordo cluster), 10 info items (ruta-norte token overlaps) — all expected for related-topic clusters, no action required
- Script can be added to CI or run periodically to catch regressions as new content is added

## Self-Check: PASSED

- `scripts/keyword_cannibalization_check.py` — FOUND
- `27-02-SUMMARY.md` — FOUND
- commit `c99289b` — FOUND

---
*Phase: 27-cluster-wiring-monitoring*
*Completed: 2026-03-10*
