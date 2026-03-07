# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-07)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** Phase 9 - Blog Audit (v2.1 Real Content)

## Current Position

Phase: 9 of 9 (Blog Audit)
Plan: 1 of 1
Status: Ready for phase 9
Last activity: 2026-03-07 -- Plan 08-03 complete (frontend CMS integration for rutas verified)

Progress: [##############] 94% (phases 1-8 complete, phase 9 pending)

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [v2.1]: Fotos reales antes de escalar contenido (credibilidad y E-E-A-T)
- [v2.1]: Datos reales del producto scrapeados de viajeskarlossimon.com como source of truth
- [v2.0]: Odoo CRM via XML-RPC, in-memory rate limiter, vitest for testing
- [v2.0]: Privacy page as server component, runtime env vars only
- [v2.1]: Mapped existing hero/feature keys to most semantically appropriate real photos
- [v2.1]: Added 33 new semantic keys in images.ts for complete photo coverage
- [v2.1]: 33 imagenes subidas a Wagtail CMS via API con titulos SEO y collections
- [v2.1]: Fase 8 replanificada: migrar mock-data a Wagtail CMS con datos reales (evita hacer trabajo doble)
- [v2.1]: Endpoint de images upload creado en Wagtail content API (/api/v2/content/images/)
- [v2.1]: /cursos sera informativa (certificaciones incluidas en viaje), no transaccional
- [v2.1]: Flat CTA fields added alongside legacy StreamField for backward compat in RutaPage
- [v2.1]: All new RutaPage sections use StreamField StructBlocks for repeatable content
- [v2.1]: Mock-data values replaced with real data from PRODUCT-DATA.md, structure preserved
- [v2.1]: Use Site.root_page for multisite-aware page creation in Wagtail management commands
- [v2.1]: 5 rutas reales publicadas en Wagtail CMS via populate_rutas management command
- [v2.1]: Delete-and-recreate strategy for re-runnable CMS population commands
- [v2.1]: Flat hero fields in TypeScript type (not StreamField) to match actual Django model
- [v2.1]: All content types added to critical fallback list for production resilience
- [v2.1]: Frontend CMS-first loading for rutas verified live at buceoenelmarrojo.com

### Pending Todos

None yet.

### Blockers/Concerns

- ~~Wagtail API /pages/ devuelve 500 en rutas/[slug]~~ RESOLVED: 5 routes now return correctly via API

## Session Continuity

Last session: 2026-03-07
Stopped at: Completed 08-03-PLAN.md (Phase 8 complete)
Resume file: .planning/phases/09-blog-audit/09-01-PLAN.md
