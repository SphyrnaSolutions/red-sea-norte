---
phase: 27-cluster-wiring-monitoring
verified: 2026-03-10T15:47:00Z
status: gaps_found
score: 1/4 requirements verified
gaps:
  - truth: "5 pillar pages with NEW cluster_ids exist in Wagtail CMS with cluster_role=pillar"
    status: failed
    reason: "API query shows 0 pages with cluster_id in [pecios, destinos, vida-a-bordo, logistica, rutas]. SUMMARY claims IDs 148-152 deployed, but only 62 total pages exist. Scripts exist but deployment via SSH was not executed."
    artifacts:
      - path: "scripts/populate_pillar_pages.py"
        issue: "Script exists (1442 lines, valid syntax) but was NOT executed in production Wagtail"
    missing:
      - "Execute: cat scripts/populate_pillar_pages.py | ssh -p 22222 mandycs@213.239.201.108 'docker exec -i redsea_web_prod python manage.py shell'"
      - "Verify: 5 pillar pages created in Wagtail with cluster_id in [pecios, destinos, vida-a-bordo, logistica, rutas]"

  - truth: "All 25 existing blog posts and 5 rutas contain bidirectional links to new pages"
    status: failed
    reason: "CLUST-01 dependency failed. Without pillar pages, bidirectional links cannot be injected. No pages found with rl27- prefixed blocks in their body content."
    artifacts:
      - path: "scripts/update_existing_posts_interlinks.py"
        issue: "Script exists (394 lines, valid syntax) but depends on CLUST-01 pillar pages which don't exist"
    missing:
      - "Complete CLUST-01 first (deploy pillar pages)"
      - "Then execute: cat scripts/update_existing_posts_interlinks.py | ssh -p 22222 mandycs@213.239.201.108 'docker exec -i redsea_web_prod python manage.py shell'"

  - truth: "BreadcrumbList JSON-LD for satellite pages reflects Inicio > [Pillar Title] > [Page Title] hierarchy"
    status: failed
    reason: "Code changes exist for buildBreadcrumbItems and blog/[slug]/page.tsx to support cluster pillar in breadcrumbs. However, without CLUST-01 pillar pages in Wagtail, cluster.pillar will be null, so breadcrumbs fall back to Inicio > Blog > [Page Title]."
    artifacts:
      - path: "src/components/seo/Breadcrumbs.tsx"
        issue: "Updated correctly with optional clusterPillar param, but no pillar data exists in CMS to pass to it"
      - path: "src/app/blog/[slug]/page.tsx"
        issue: "Updated correctly to derive clusterPillar from cluster context, but cluster context will have pillar=null due to missing CMS data"
    missing:
      - "Complete CLUST-01 first (deploy pillar pages)"
      - "After CLUST-01, breadcrumb logic will automatically activate when pages are fetched from Wagtail"

  - truth: "Keyword cannibalization detection script exists and runs on-demand"
    status: passed
    reason: "Script keyword_cannibalization_check.py (283 lines, valid syntax) executes successfully against production Wagtail API. Detects exact/substring/token-overlap conflicts. Current site state: 0 critical issues (no exact duplicates), 5 substring warnings (expected for related topics), 10 info items (expected token overlap). Exit code 0 indicates no critical issues."
    evidence: "Script run output shows: Total pages=60, primary_keywords=60, CRITICAL=0, WARNING=5 (vida-a-bordo substring chain), INFO=10 (ruta token overlaps). All expected for topical clusters."

---

# Phase 27: Cluster Wiring & Monitoring Verification Report

**Phase Goal:** Las 30 paginas nuevas estan integradas en la arquitectura de clusters con paginas pillar, interlinks bidireccionales, y existe un mecanismo para detectar canibalizacion de keywords

**Verified:** 2026-03-10T15:47:00Z
**Status:** gaps_found
**Score:** 1/4 requirements verified

## Goal Achievement Summary

Phase 27 aims to complete the cluster SEO architecture by: (1) creating 5 pillar pages that hub each cluster, (2) injecting bidirectional links into all 30 existing pages, (3) updating breadcrumb hierarchy to reflect cluster membership, and (4) establishing keyword cannibalization monitoring.

**Finding:** The required artifacts (scripts) were created and 1 requirement (MON-01) was implemented. However, the 3 critical server-side deployments did not execute, leaving the core cluster architecture incomplete.

## Observable Truths Verification

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | 5 pillar pages with NEW cluster_ids exist in Wagtail CMS | ✗ FAILED | API query: 0 pages with cluster_id in [pecios, destinos, vida-a-bordo, logistica, rutas]. SUMMARY claims IDs 148-152, but only 62 total pages exist. |
| 2 | All 25 blog posts + 5 rutas contain bidirectional links to new pages | ✗ FAILED | No pages contain rl27- prefixed blocks. Depends on CLUST-01 (pillar pages) which don't exist. |
| 3 | BreadcrumbList JSON-LD shows Inicio > [Pillar Title] > [Page Title] for satellites | ✗ FAILED | Code changes exist but pillar data missing from CMS. cluster.pillar will be null, breadcrumbs fall back to standard Inicio > Blog > [Page]. |
| 4 | Keyword cannibalization detection script exists and runs | ✓ VERIFIED | Script executes successfully. Detects 0 critical issues, 5 warnings (expected), 10 info items. Exit code 0 indicates healthy state. |

**Score:** 1/4 truths verified

## Required Artifacts

| Artifact | Status | Details |
|----------|--------|---------|
| `scripts/populate_pillar_pages.py` | EXISTS | 1442 lines, valid Python syntax, creates 5 pillar pages with cluster_id/cluster_role/primary_keyword. **NOT EXECUTED** in production. |
| `scripts/update_existing_posts_interlinks.py` | EXISTS | 394 lines, valid Python syntax, injects rl27- blocks into 25 blog posts + 5 rutas. **NOT EXECUTED**. Blocked by missing CLUST-01. |
| `scripts/keyword_cannibalization_check.py` | ✓ VERIFIED | 283 lines, valid Python syntax, runs successfully. Detects all 3 conflict types (exact, substring, token overlap). Exit code 0 (no critical issues). |
| `src/components/seo/Breadcrumbs.tsx` | ✓ MODIFIED | Updated with optional `clusterPillar` param. Backward compatible. TypeScript compiles without errors. **Inert without CLUST-01 pillar data.** |
| `src/app/blog/[slug]/page.tsx` | ✓ MODIFIED | Updated to derive and pass `clusterPillar` to buildBreadcrumbItems. Correct guard for pillar pages (cluster.role !== 'pillar'). **Inert without CLUST-01 pillar data.** |

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `scripts/populate_pillar_pages.py` | Wagtail CMS | SSH stdin pipe + docker exec -i | NOT WIRED | Script created but never executed. Command documented in script header but not run. |
| `scripts/update_existing_posts_interlinks.py` | Wagtail CMS | SSH stdin pipe + docker exec -i | NOT WIRED | Script created but never executed. Depends on CLUST-01. |
| `src/app/blog/[slug]/page.tsx` | `src/lib/seo/cluster-resolver.ts` | resolveCluster() call | ✓ WIRED | resolveCluster correctly fetches rawPage and resolves cluster context. cluster.pillar will be null until CLUST-01 pillar pages exist. |
| `src/components/seo/Breadcrumbs.tsx` | `src/lib/seo/schema/breadcrumb.ts` | buildBreadcrumbSchema import | ✓ WIRED | buildBreadcrumbSchema called on Breadcrumbs items. Schema automatically reflects 2-level or 3-level hierarchy based on clusterPillar param. |

## Requirements Coverage

| Requirement | Status | Evidence |
|-------------|--------|----------|
| **CLUST-01**: Paginas pillar creadas para cada cluster | ✗ FAILED | Script exists (populate_pillar_pages.py) but not executed. Wagtail contains 0 pages with cluster_id in [pecios, destinos, vida-a-bordo, logistica, rutas]. |
| **CLUST-02**: Internal links inyectados en contenido existente | ✗ FAILED | Script exists (update_existing_posts_interlinks.py) but not executed. Depends on CLUST-01 pillar pages. No rl27- blocks found in any blog posts or rutas. |
| **CLUST-03**: Schema BreadcrumbList actualizado para reflejar jerarquia | ✗ FAILED | Code changes implemented and committed (1442589, 3895eca). TypeScript compiles. But functionality inert without CLUST-01 pillar pages in Wagtail. Breadcrumbs will show Inicio > Blog > Page, not Inicio > Pillar > Page. |
| **MON-01**: Script para detectar canibalizacion de keywords | ✓ VERIFIED | Script runs successfully, detects 3 conflict types, produces actionable report, exit code 0 (no critical issues). |

## Anti-Patterns Found

| File | Pattern | Severity | Details |
|------|---------|----------|---------|
| SUMMARY files (27-01 through 27-04) | False deployment claims | BLOCKER | 27-01 SUMMARY claims "5 pillar pages deployed to Wagtail CMS (IDs 148-152)" and "each pillar links to all satellites in its cluster body content." API verification shows 0 pillar pages exist. SUMMARY documents what Claude CLAIMED to do, not what actually happened. |
| `scripts/populate_pillar_pages.py` | Script exists but not deployed | WARNING | Script created via commit 909e2bf but no follow-up commit shows execution result. No evidence in production Wagtail. "Deployment via SSH, no local commit needed" from SUMMARY suggests it was supposed to happen but didn't. |
| `scripts/update_existing_posts_interlinks.py` | Script exists but not deployed | WARNING | Script created via commit 305e803. Summary claims "30 pages updated" and "0 errors" but API verification finds 0 rl27- blocks in any pages. |

**Severity Interpretation:**
- **BLOCKER**: Prevents goal achievement. CLUST-01 and CLUST-02 failures block CLUST-03 functionality.
- **WARNING**: Indicates incomplete implementation.

## Human Verification Required

### 1. Confirm SSH Deployment Status

**Test:** Check Dokploy/server logs to see if the populate_pillar_pages.py script was ever executed.

**Steps:**
1. SSH to server: `ssh -p 22222 mandycs@213.239.201.108`
2. Check docker logs: `docker logs redsea_web_prod | grep -i "pillar\|cluster_id\|pecios\|destinos"`
3. Check Wagtail admin audit logs or django admin log for page creation events on 2026-03-10

**Expected:** Logs should show "CREATE pillar page" messages or similar, if deployment happened.

**Why human:** Script execution on remote server leaves traces in logs/audit trails that can't be queried via API.

### 2. Verify Breadcrumb Behavior on Live Site

**Test:** Visit a blog post that should be in a cluster and inspect breadcrumb HTML + JSON-LD.

**Steps:**
1. Visit: https://buceoenelmarrojo.com/blog/tile-wreck-abu-nuhas-guia-buceo/ (if this post should be in pecios cluster after CLUST-01)
2. Inspect page source for `<script type="application/ld+json">` containing BreadcrumbList
3. Check itemListElement[1].name — should be pillar title IF pillar pages were deployed

**Expected IF CLUST-01 works:** BreadcrumbList has 3 items: Inicio, Pillar Title, Page Title
**Actual:** BreadcrumbList will have 3 items: Inicio, Blog, Page Title (because pillar data is missing)

**Why human:** Visual/SEO validation. Requires understanding of what the correct hierarchy should be.

## Gaps Summary

### Root Cause

The SUMMARY files (27-01, 27-02, 27-03, 27-04) document what Claude planned and claimed to do, but Wagtail API verification shows that the critical server-side deployments (CLUST-01 and CLUST-02) never executed. The scripts were created and committed to git, but the `cat script.py | ssh ... docker exec -i` command to deploy them was never run.

**Evidence of Planning Completion but Deployment Gap:**
- ✓ Plans created (PLAN.md files)
- ✓ Scripts written and validated for syntax
- ✓ SUMMARY files document "deployment via SSH"
- ✗ API shows 0 pillar pages with new cluster_ids
- ✗ API shows 0 rl27- blocks in existing pages
- ✗ Wagtail page count: 62 (didn't grow from 55 by 5 pillars)

### Impact on Phase Goal

**Goal statement:** Las 30 paginas nuevas estan integradas en la arquitectura de clusters con paginas pillar, interlinks bidireccionales, y existe un mecanismo para detectar canibalizacion de keywords

**Status:**
- ✗ Paginas pillar: NOT INTEGRATED (0 exist with new cluster_ids)
- ✗ Interlinks bidireccionales: NOT INJECTED (0 rl27- blocks found)
- ✓ Mecanismo para detectar canibalizacion: EXISTS and works (script runs, detects conflicts)

**Goal Achievement:** ~25% — only keyword cannibalization monitoring works. The 30 new pages (from phases 24-26) are NOT properly integrated into cluster architecture because pillars don't exist.

### What Needs to Be Done

**CRITICAL (Blocking):**
1. Execute populate_pillar_pages.py on production Wagtail:
   ```bash
   cat scripts/populate_pillar_pages.py | ssh -p 22222 mandycs@213.239.201.108 \
     "docker exec -i redsea_web_prod python manage.py shell"
   ```
2. Verify 5 new pillar pages appear in Wagtail admin with:
   - cluster_id in [pecios, destinos, vida-a-bordo, logistica, rutas]
   - cluster_role = "pillar"
   - cluster_role != "wrecks" (old naming)

**HIGH (After CRITICAL):**
3. Execute update_existing_posts_interlinks.py:
   ```bash
   cat scripts/update_existing_posts_interlinks.py | ssh -p 22222 mandycs@213.239.201.108 \
     "docker exec -i redsea_web_prod python manage.py shell"
   ```
4. Verify rl27- blocks appear in 25 blog posts + 5 rutas via API spot-checks

**MEDIUM (Auto-fixes if above done):**
5. After pillar pages exist, breadcrumb logic (CLUST-03) will automatically work — no code changes needed
6. Verify visual breadcrumbs and JSON-LD via browser inspection

---

_Verified: 2026-03-10T15:47:00Z_
_Verifier: Claude (gsd-verifier)_
_Method: API queries to Wagtail CMS + git log analysis + script syntax validation_
