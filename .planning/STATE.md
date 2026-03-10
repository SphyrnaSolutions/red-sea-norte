# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** v4.0 Content SEO -- Phase 27 (Cluster Wiring & Monitoring)

## Current Position

Phase: 27 of 27 (Cluster Wiring & Monitoring)
Plan: 02 complete (03 next)
Status: Phase 27 in progress — plan 02 done (keyword cannibalization script)
Last activity: 2026-03-10 -- keyword cannibalization detection script created and verified

Progress: [==================  ] 90% (v4.0)

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
- [v4.0-P24]: 11 wreck/spot pages published: 5 pecios (IDs 137-141) + 6 destinos (IDs 142-147) via populate_phase24 commands
- [Phase 27]: Wagtail API requires ?type= filter for custom fields; type-filtered fetch pattern established for scripts
- [v4.0-P27-01]: 5 pillar pages deployed (IDs 148-152): pecios, destinos, vida-a-bordo, logistica, rutas -- cluster hub-and-spoke architecture complete
- [v4.0-P27-01]: SSH must use direct IP (213.239.201.108:22222) not hostname -- Cloudflare blocks port 22222 on domain
- [v4.0-P27-01]: Large scripts deployed via 'cat file | docker exec -i container manage.py shell' -- stdin redirection through SSH+docker doesn't work
- [v4.0-P27-01]: ISR revalidation API uses type=blog parameter, not paths parameter

### Pending Todos

- [ ] Enviar lista de contenido a Karlos: 31-50 fotos + 6 videos
- [ ] Preguntar a Karlos: wifi en M/Y Dolce Vita? canal YouTube? fotos de clientes?
- [ ] Organization schema: anadir telephone cuando Karlos proporcione numero

### Blockers/Concerns

- Phase 13 (Content Media) bloqueado: Karlos debe entregar fotos y videos
- v4.0 content needs factual accuracy review -- Karlos may need to validate dive site details

## Session Continuity

Last session: 2026-03-10
Stopped at: Completed 27-01-PLAN.md -- 5 pillar pages deployed to Wagtail CMS (IDs 148-152), cluster architecture complete
