---
phase: 27-cluster-wiring-monitoring
plan: 01
subsystem: cms
tags: [wagtail, pillar-pages, cluster-seo, content-management, ssh-deployment]

# Dependency graph
requires:
  - phase: 24-wreck-spot-content
    provides: "11 satellite pages (pecios + destinos) published in Wagtail"
  - phase: 25-route-comparisons
    provides: "3 comparison pages (rutas cluster) published in Wagtail"
  - phase: 26-friction-vida-a-bordo
    provides: "11 satellite pages (logistica + vida-a-bordo) published in Wagtail"
provides:
  - "5 pillar pages published: pecios, destinos, vida-a-bordo, logistica, rutas (IDs 148-152)"
  - "scripts/populate_pillar_pages.py for repeatable deployment"
  - "Cluster hub architecture complete: each cluster now has 1 pillar + N satellites"
  - "ISR blog cache revalidated"
affects:
  - "27-02 (internal linking audit)"
  - "any future cluster monitoring or sitemap updates"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SSH via direct IP (213.239.201.108:22222) bypasses Cloudflare proxy for port 22222"
    - "cat file | docker exec -i container python manage.py shell (stdin pipe for large scripts)"
    - "Pillar pages use cluster_role=pillar, satellites use cluster_role=satellite"

key-files:
  created:
    - scripts/populate_pillar_pages.py
    - .planning/phases/27-cluster-wiring-monitoring/27-01-SUMMARY.md
  modified: []

key-decisions:
  - "[27-01] SSH deployment must use direct server IP (213.239.201.108) not hostname (buceoenelmarrojo.com) -- Cloudflare proxies HTTP/HTTPS only, port 22222 is blocked via hostname"
  - "[27-01] Use 'cat file | docker exec -i container manage.py shell' pattern not 'docker exec ... shell < file' -- the latter loses stdin through SSH"
  - "[27-01] Pillar cluster_ids: pecios/destinos/vida-a-bordo/logistica/rutas (matching existing satellite cluster naming, NOT the old wrecks/spots/life-aboard names)"
  - "[27-01] ISR revalidation API uses type=blog parameter, not paths parameter"

requirements-completed: [CLUST-01]

# Metrics
duration: 75min
completed: 2026-03-10
---

# Phase 27 Plan 01: Cluster Pillar Pages Summary

**5 pillar pages deployed to Wagtail CMS (IDs 148-152) creating hub-and-spoke cluster SEO architecture across all 5 content clusters via SSH pipe with cat | docker exec -i pattern**

## Performance

- **Duration:** 75 min
- **Started:** 2026-03-10T10:42:00Z
- **Completed:** 2026-03-10T12:00:00Z
- **Tasks:** 2
- **Files modified:** 1 (scripts/populate_pillar_pages.py created)

## Accomplishments

- Created 1441-line populate_pillar_pages.py script with 5 pillar page definitions (1500-2500 words each)
- Deployed all 5 pillar pages to production Wagtail CMS (IDs 148-152) in under 5 seconds of execution time
- Each pillar page links to all satellites in its cluster via rich_text body content
- Each pillar has correct cluster_id, cluster_role=pillar, primary_keyword matching CONTENT-MAP.md
- ISR cache revalidated for all new pages (blog type)
- Total Wagtail pages now: 55 (was 50)

## Task Commits

1. **Task 1: Create populate_pillar_pages.py script** - `909e2bf` (feat)
2. **Task 2: Deploy pillar pages to production Wagtail** - deployment via SSH, no local commit needed

**Plan metadata:** (docs commit - this summary)

## Files Created/Modified

- `scripts/populate_pillar_pages.py` - 1441-line script creating 5 pillar pages with cluster_role=pillar, internal links to all satellites, 2-3 external references per pillar (PADI, SSI, DAN, UNESCO)

## Decisions Made

- SSH deployment requires direct IP (213.239.201.108:22222) not domain name -- Cloudflare blocks port 22222 on the domain
- Large scripts (1441 lines) must be deployed via `cat file | docker exec -i` pattern rather than stdin redirection through SSH
- Pillar cluster_ids use the new naming scheme (pecios/destinos/vida-a-bordo/logistica/rutas) not the older naming (wrecks/spots/life-aboard) used in some existing pages

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] SSH hostname blocked by Cloudflare proxy**
- **Found during:** Task 2 (Deploy pillar pages)
- **Issue:** `buceoenelmarrojo.com:22222` connection times out because Cloudflare only proxies HTTP/HTTPS ports. SSH on port 22222 cannot reach the server via the Cloudflare hostname.
- **Fix:** Used direct server IP `213.239.201.108` with user `mandycs` (as documented in `.secrets/dokploy.env`)
- **Files modified:** None (operational fix)
- **Verification:** `nc -zv -w 10 213.239.201.108 22222` succeeded; `ssh -p 22222 mandycs@213.239.201.108 "echo OK"` returned SSH OK
- **Committed in:** N/A (operational fix, no code change)

**2. [Rule 3 - Blocking] `docker exec ... shell < file` via SSH doesn't forward stdin**
- **Found during:** Task 2 (Deploy pillar pages)
- **Issue:** `ssh host "docker exec ... shell < /tmp/file"` runs the shell but the script isn't executed (only Django auto-imports shown). File redirection via SSH doesn't pass through to docker exec's stdin.
- **Fix:** Used `cat /tmp/file | docker exec -i container python manage.py shell` pattern which pipes correctly
- **Files modified:** None (operational fix)
- **Verification:** All 5 pages created with full output visible in terminal
- **Committed in:** N/A (operational fix, no code change)

---

**Total deviations:** 2 auto-fixed (both Rule 3 - Blocking)
**Impact on plan:** Both fixes were SSH/Docker operational issues unrelated to content. No scope creep. Script and content are exactly as planned.

## Issues Encountered

- Initial deployment attempts failed due to Cloudflare proxying the SSH hostname and SSH stdin not forwarding through Docker exec. Diagnosed and resolved using direct IP and cat pipe pattern. Total additional time: ~25 minutes.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 5 pillar pages are live and published (IDs 148-152)
- Each pillar links to its satellite pages via body content
- Cluster architecture is complete: pecios (6), destinos (7), rutas (4), logistica (6), vida-a-bordo (7)
- Ready for Phase 27 Plan 02: Internal linking audit and bidirectional link verification

---
*Phase: 27-cluster-wiring-monitoring*
*Completed: 2026-03-10*
