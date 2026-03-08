# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** Phase 12 - Technical SEO

## Current Position

Phase: 12 of 13 (Technical SEO)
Plan: 2 of 3 in current phase (checkpoint pending)
Status: Plan 02 Task 1 complete, Task 2 checkpoint:human-verify pending
Last activity: 2026-03-08 -- Phase 12 Plan 02 Task 1 complete (ISR revalidation endpoint)

Progress: [########..] 85% (12 plans complete, 1 pending, 1 blocked)

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [v3.0]: MEDIA requirements bloqueados por Karlos -- fase 13 separada al final
- [v3.0]: TOOL-04 (envio sitemaps) agrupado con fase 11 (sitemaps deben existir primero)
- [v3.0]: Phase 12 parallelizable con phase 11 (solo depende de phase 10 para GA4 metrics)
- [v2.1]: Frontend CMS-first loading verified live at buceoenelmarrojo.com
- [v3.0-P10]: Used Next.js metadata.verification API for GSC/Bing meta tags
- [v3.0-P10]: Consent Mode v2 defaults all 4 storage types to denied
- [v3.0-P10]: Cookie consent persisted in localStorage (not cookies)
- [v2.1]: 25 blog posts audited: 4 factual errors fixed, 20/25 flagged thin content
- [v3.0-P11]: Used raw XML route handlers for sitemaps (MetadataRoute only generates urlset, not sitemapindex)
- [v3.0-P11]: MERGED_POST_SLUGS constant used to exclude 5 merged posts from all sitemaps
- [v3.0-P12]: Self-hosted Satoshi/Clash Display variable fonts via next/font/local (no external CDN)
- [v3.0-P12]: draftMode removed from all data fetchers; fixed revalidate TTLs enable real ISR caching
- [v3.0-P12]: Used revalidateTag(tag, { expire: 0 }) for Next.js 16 two-arg API compatibility
- [v3.0-P12]: No rate limiting on /api/revalidate (server-to-server with secret auth)

### Pending Todos

- [ ] Enviar lista de contenido a Karlos: 31-50 fotos + 6 videos (ver .planning/KARLOS-CONTENT-REQUEST.md)
- [ ] Preguntar a Karlos: wifi en M/Y Dolce Vita? canal YouTube? fotos de clientes?
- [ ] Actualizar populate_blog.py con hero_image_id mapping

### Blockers/Concerns

- Phase 13 (Content Media) bloqueado: Karlos debe entregar 31-50 fotos y 6 videos

## Session Continuity

Last session: 2026-03-08
Stopped at: Completed 12-01-PLAN.md (fonts + ISR); 12-02-PLAN.md Task 2 checkpoint:human-verify pending
Resume file: .planning/phases/12-technical-seo/12-02-PLAN.md
