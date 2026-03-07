# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-07)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** Phase 8 - Wagtail CMS Migration (v2.1 Real Content)

## Current Position

Phase: 8 of 9 (Wagtail CMS Migration)
Plan: Planning
Status: Planning phase 8
Last activity: 2026-03-07 -- Phase 7 complete, 33 images uploaded to Wagtail, planning phase 8

Progress: [###########.] 83% (phases 1-7 complete, phase 8 planning)

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

### Pending Todos

None yet.

### Blockers/Concerns

- Wagtail API /pages/ devuelve 500 en rutas/[slug] — investigar en fase 8

## Session Continuity

Last session: 2026-03-07
Stopped at: Planning phase 8 (Wagtail CMS Migration)
Resume file: .planning/ROADMAP.md
