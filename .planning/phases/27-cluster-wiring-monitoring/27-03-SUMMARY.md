---
phase: 27-cluster-wiring-monitoring
plan: "03"
subsystem: content-seo
tags: [internal-linking, bidirectional-links, cluster-architecture, wagtail, blog, rutas]
dependency_graph:
  requires: [27-01]
  provides: [CLUST-02]
  affects: [seo-cluster-authority, pagerank-distribution, topical-relevance]
tech_stack:
  added: []
  patterns: [ssh-stdin-pipe-deployment, streamfield-raw-data-manipulation, resources_items-struct-block]
key_files:
  created:
    - scripts/update_existing_posts_interlinks.py
  modified: []
decisions:
  - "RutaPage uses resources_items StreamField (StructBlock: title, description, href, label) — not a body StreamField like BlogPostPage"
  - "Actual ruta slugs (norte-pecios, norte-tiran, tiran-blue-hole, norte-brothers, sur-bde) differ from plan's assumed slugs — resolved dynamically"
  - "Production blog slugs have longer suffixes than plan assumed (e.g. tile-wreck-abu-nuhas-guia-buceo) — all resolved via pre-deployment API audit"
  - "Pillar slugs resolved dynamically at runtime via cluster_role query — script resilient to slug variations"
metrics:
  duration: "~20min"
  completed: "2026-03-10"
  tasks_completed: 2
  files_created: 1
  files_modified: 0
  pages_updated: 30
  blog_posts_updated: 25
  rutas_updated: 5
---

# Phase 27 Plan 03: Bidirectional Interlink Injection Summary

**One-liner:** Injected bidirectional internal links into all 25 existing blog posts and 5 rutas via rl27- rich_text blocks and resources_items resource blocks, completing CLUST-02.

## What Was Built

A Python script (`scripts/update_existing_posts_interlinks.py`, 393 lines) that:

1. Resolves pillar page slugs dynamically at runtime via `cluster_role='pillar'` query
2. Uses a pre-verified slug map for all 20 satellite pages (actual production slugs differ from plan assumptions)
3. Appends `rl27-{slug}` rich_text blocks to existing blog post body StreamFields
4. Appends `rl27-{slug}-{i}` resource StructBlocks to RutaPage resources_items StreamFields
5. Includes idempotency guard — skips pages already containing an `rl27-` prefixed block ID
6. Prints `UPDATED: {slug} (+N links)` or `SKIP: {slug}` per page for observability

Deployed to production via SSH stdin pipe: all 30 pages updated, 0 errors.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create update_existing_posts_interlinks.py | 305e803 | scripts/update_existing_posts_interlinks.py |
| 2 | Deploy bidirectional link updates to production | (deployment) | Wagtail CMS (30 pages) |

## Deployment Results

```
Total updated:   30
Total skipped:   0
Total not found: 0
CLUST-02 requirement: bidirectional links COMPLETE
```

Blog posts updated per cluster:
- Pecios: abu-nuhas-cementerio-de-barcos (+4), giannis-d-abu-nuhas (+2), carnatic-abu-nuhas (+2), ss-thistlegorm-guía-completa (+2), dunraven-mar-rojo (+2), rosalie-moller-mar-rojo (+2), pecios-vs-tiburones-mar-rojo (+2)
- Destinos: ras-mohammed-guía-completa (+2), shark-yolanda-reef-mar-rojo (+2)
- Rutas: ruta-norte-vs-ruta-sur-mar-rojo (+3), hurghada-vs-sharm-liveaboard (+2), temporada-ruta-norte-mar-rojo (+2)
- Logistica: requisitos-ruta-norte-mar-rojo (+2), advanced-a-bordo-mar-rojo (+2), visado-egipto-hurghada (+2), como-llegar-a-hurghada-liveaboard (+2), seguro-buceo-dan-egipto (+2), seguridad-buceo-mar-rojo (+2), checklist-vida-a-bordo-mar-rojo (+2)
- Vida a bordo: como-es-un-vida-a-bordo-mar-rojo (+2), camarotes-comida-wifi-liveaboard (+2), que-incluye-vida-a-bordo-mar-rojo (+2), precio-vida-a-bordo-mar-rojo (+2), nitrox-a-bordo-mar-rojo (+2), primer-liveaboard-open-water-mar-rojo (+3)

Rutas updated:
- norte-pecios (+5 resource links)
- norte-tiran (+3 resource links)
- tiran-blue-hole (+2 resource links)
- norte-brothers (+3 resource links)
- sur-bde (+3 resource links)

## Verification

- API spot-check confirmed `rl27-abu-nuhas-cementerio` block present in abu-nuhas post
- Links render: `<a href="/blog/tile-wreck-abu-nuhas-guia-buceo/">guia del Tile Wreck en Abu Nuhas</a>` etc.
- ISR revalidation triggered: `{"revalidated":true,"type":"blog"}`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] RutaPage has no body StreamField**
- **Found during:** Task 1 (pre-script design)
- **Issue:** Plan assumed rutas have a `body` StreamField like BlogPostPage. RutaPage uses `resources_items` (StructBlock with title/description/href/label) instead.
- **Fix:** Script uses `resources_items` for rutas, appending resource StructBlocks with link title, description, href, and label.
- **Files modified:** scripts/update_existing_posts_interlinks.py

**2. [Rule 1 - Bug] Ruta slugs completely different from plan assumptions**
- **Found during:** Task 1 (API audit pre-deployment)
- **Issue:** Plan referenced `norte-7-dias`, `brothers-daedalus`, `sur-saint-johns`, `safari-norte-sur`, `descubre-mar-rojo`. Actual production slugs are `norte-pecios`, `norte-tiran`, `tiran-blue-hole`, `norte-brothers`, `sur-bde`.
- **Fix:** Queried all ruta slugs via Wagtail API before writing the script. RUTA_LINKS dict uses actual slugs.
- **Files modified:** scripts/update_existing_posts_interlinks.py

**3. [Rule 1 - Bug] Satellite page slugs have longer suffixes than plan assumed**
- **Found during:** Task 1 (API audit)
- **Issue:** Plan references like `tile-wreck-abu-nuhas`, `bucear-ss-thistlegorm-interior`, `anemone-city-ras-mohammed` don't match production slugs which have additional suffixes (e.g., `tile-wreck-abu-nuhas-guia-buceo`).
- **Fix:** Pre-deployment API audit catalogued all 55 blog posts. NEW_SLUGS dict maps logical names to actual production slugs.
- **Files modified:** scripts/update_existing_posts_interlinks.py

## Self-Check: PASSED

- scripts/update_existing_posts_interlinks.py: FOUND
- .planning/phases/27-cluster-wiring-monitoring/27-03-SUMMARY.md: FOUND
- commit 305e803: FOUND
- Production API verification: rl27-abu-nuhas-cementerio block confirmed in abu-nuhas post
