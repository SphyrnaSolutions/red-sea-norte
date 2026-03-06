---
phase: 02-seo-content-pipeline
plan: 01
subsystem: wagtail-models
tags: [wagtail, django, cluster, seo, typescript]
dependency_graph:
  requires: []
  provides: [ClusterMixin, WagtailClusterFields, WagtailSEOFields, WagtailPageWithSEO]
  affects: [rutas-models, blog-models, experiencias-models, cursos-models, ofertas-models, home-models]
tech_stack:
  added: []
  patterns: [abstract-mixin, api-field-exposure]
key_files:
  created:
    - ../wagtail-headless-cms/apps/core/models.py (ClusterMixin)
    - ../wagtail-headless-cms/apps/*/migrations/*.py (6 migration files)
  modified:
    - ../wagtail-headless-cms/apps/rutas/models.py
    - ../wagtail-headless-cms/apps/blog/models.py
    - ../wagtail-headless-cms/apps/experiencias/models.py
    - ../wagtail-headless-cms/apps/cursos/models.py
    - ../wagtail-headless-cms/apps/ofertas/models.py
    - ../wagtail-headless-cms/apps/home/models.py
    - src/lib/wagtail/types.ts
decisions:
  - "primary_keyword uses unique=True, null=True, blank=True for database-level cannibalization prevention"
  - "ClusterMixin added after SEOMixin in MRO for consistent inheritance order"
metrics:
  duration: "3 min"
  completed: "2026-03-06"
---

# Phase 2 Plan 01: Wagtail ClusterMixin + TypeScript Types Summary

ClusterMixin abstract model with cluster_id, cluster_role, pillar_slug, schema_type, primary_keyword (unique+nullable) added to all 6 Wagtail page models with Django migrations generated.

## What Was Built

1. **ClusterMixin abstract model** in `apps/core/models.py` with:
   - `cluster_id` (CharField, blank) - cluster identifier
   - `cluster_role` (CharField, choices: pillar/satellite)
   - `pillar_slug` (CharField, blank) - slug reference for satellites
   - `schema_type` (CharField, choices: TouristTrip/Article/FAQPage)
   - `primary_keyword` (CharField, unique=True, null=True, blank=True) - cannibalization guard
   - `cluster_panels` and `cluster_api_fields` for easy panel/API integration

2. **All 6 page models extended**: HomePage, RutaPage, BlogPostPage, ExperienciaPage, CursoPage, OfertaPage

3. **TypeScript types updated**: WagtailSEOFields, WagtailClusterFields, WagtailPageWithSEO interfaces added and all page interfaces extended

4. **Django migrations generated** (not applied) for all 6 apps

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | `2a757e4` (wagtail repo) | ClusterMixin + model extensions + migrations |
| 2 | `70fd33a` | TypeScript type updates |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- Django system check: PASSED (0 issues)
- TypeScript compilation: PASSED (no errors)
- Migration files: Generated for all 6 apps
