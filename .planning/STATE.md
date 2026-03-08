# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** v4.0 Content SEO -- Phase 27 (Cluster Wiring & Monitoring)

## Current Position

Phase: 27 of 27 (Cluster Wiring & Monitoring)
Plan: pending
Status: Phase 26 complete, advancing to 27
Last activity: 2026-03-08 -- 11 content pages published in Wagtail CMS (5 logistica + 6 vida-a-bordo)

Progress: [================    ] 80% (v4.0)

## Accumulated Context

### Decisions

- [v3.1]: SEO audit score 74/100 -- content quality (62) es el area mas debil
- [v3.2]: All blog/rutas JSON-LD via centralized schema builders; author = Karlos Simon
- [v4.0]: 5 phases: planning first, then 3 parallel content phases, then cluster wiring last
- [v4.0]: Phases 24-26 are parallelizable (wreck content, comparisons, friction content)
- [v4.0]: Existing infra (cluster resolver, interlink engine, keyword-to-URL map, SEO template) reused -- no new technical work needed for content
- [v4.0-P23]: 5 clusters: pecios (6), destinos (7), rutas (4), logistica (6), vida-a-bordo (7) = 30 pages
- [v4.0-P23]: Phase 26 expanded to 11 pages (friction + vida-a-bordo satellites)
- [v4.0-P23]: 5 pillar pages deferred to Phase 27 (after satellite content exists)
- [v4.0-P25]: 3 comparison pages published: ruta-norte-vs-brothers, hurghada-vs-sharm (logistics), mejor-ruta-por-nivel
- [v4.0-P25]: Content published via populate_comparisons.py management command (same pattern as populate_blog.py)
- [v4.0-P26]: 11 pages published: 5 logistica (IDs 123-127) + 6 vida-a-bordo (IDs 131-136) via populate scripts
- [v4.0-P26]: SSH stdin pipe to docker exec manage.py shell confirmed as reliable content deployment pattern

### Pending Todos

- [ ] Enviar lista de contenido a Karlos: 31-50 fotos + 6 videos
- [ ] Preguntar a Karlos: wifi en M/Y Dolce Vita? canal YouTube? fotos de clientes?
- [ ] Organization schema: anadir telephone cuando Karlos proporcione numero

### Blockers/Concerns

- Phase 13 (Content Media) bloqueado: Karlos debe entregar fotos y videos
- v4.0 content needs factual accuracy review -- Karlos may need to validate dive site details

## Session Continuity

Last session: 2026-03-08
Stopped at: Phase 26 complete -- 11 content pages live in Wagtail (5 logistica + 6 vida-a-bordo), ready for Phase 27 (Cluster Wiring)
