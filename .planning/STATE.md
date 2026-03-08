# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** v3.2 SEO Audit Fixes II -- All phases complete

## Current Position

Phase: 22 of 22 (Content & Config Cleanup)
Plan: 01 of 01 -- complete
Status: Phase 22 complete -- v3.2 milestone done
Last activity: 2026-03-08 -- Phase 22 Plan 01 executed (marketing notes cleanup, sitemaps lastmod, robots.txt)

Progress: [====================] 100% (milestones v1.0-v3.2 complete)

## Accumulated Context

### Decisions

- [v3.1]: SEO audit score 74/100 -- content quality (62) es el area mas debil
- [v3.2]: Second audit score 57/100 -- blog SSR empty es el issue #1
- [v3.2]: Blog body content no aparece en HTML server-rendered (solo headings)
- [v3.2]: /contacto devuelve 404 -- pagina de conversion principal rota
- [v3.2]: Blog listing carga 451KB (89% payload no usado)
- [v3.2]: Schema builders existen en src/lib/seo/schema/ pero paginas construyen inline
- [Phase 21]: Used static Metadata export for /blog listing (no dynamic params)
- [Phase 19]: Contacto page as static server component; accented slug redirects with both encoded and raw UTF-8 variants
- [Phase 18]: Wagtail rich_text block values normalized in mapStreamField (string -> {content: string})
- [Phase 18]: Removed isomorphic-dompurify from RichTextBlock -- trusted CMS content, SSR-safe
- [Phase 18]: Blog listing uses selective fields param to avoid 451KB body payload
- [Phase 22]: lastPublishedAt added to RutaData and wired through mappers for sitemap dates
- [Phase 22]: robots.txt duplication is Cloudflare config issue, documented in code comment
- [Phase 22]: Static pages lastmod uses fixed date 2026-03-08
- [Phase 20]: All blog/rutas JSON-LD via centralized schema builders; author standardized to Karlos Simon

### Pending Todos

- [ ] Enviar lista de contenido a Karlos: 31-50 fotos + 6 videos
- [ ] Preguntar a Karlos: wifi en M/Y Dolce Vita? canal YouTube? fotos de clientes?
- [ ] Organization schema: anadir telephone cuando Karlos proporcione numero

### Blockers/Concerns

- Phase 13 (Content Media) bloqueado: Karlos debe entregar fotos y videos

## Session Continuity

Last session: 2026-03-08
Stopped at: Completed 20-01-PLAN.md (Schema Consolidation) -- all blog/rutas pages use centralized schema builders
