# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** v3.2 Content Quality — 2/3 done (tildes + posts expandidos, dateModified pendiente)

## Current Position

Phase: 14-17 (v3.1 SEO Audit Fixes)
Plan: All executed
Status: v3.2 in progress (CONT-01 + CONT-02 done)
Last activity: 2026-03-08 — Blog posts expandidos a 1500+ palabras y desplegados

## Accumulated Context

### Decisions

- [v3.0]: MEDIA requirements bloqueados por Karlos — fase 13 separada al final
- [v3.0]: Cloudflare Origin Certificate (15 anos) reemplaza Let's Encrypt
- [v3.0]: SSL Full (strict) configurado via API
- [v3.0]: Cache Rules creadas en Cloudflare para assets + HTML en edge
- [v3.0]: REVALIDATION_SECRET configurado en Next.js y Wagtail
- [v3.1]: SEO audit score 74/100 — content quality (62) es el area mas debil
- [v3.1]: Content fixes (tildes, thin content) dependen de Karlos — fuera de scope tecnico
- [v3.1]: FAQPage schema eliminado de rutas (restriccion Google agosto 2023)
- [v3.1]: HeroSection convertido a server component, CTAs extraidos a HeroCTAButtons client component
- [v3.1]: AVIF habilitado como formato preferido de imagen

### Pending Todos

- [x] INFRA-01: www → apex 301 redirect via Cloudflare API (completed 2026-03-08)
- [ ] Enviar lista de contenido a Karlos: 31-50 fotos + 6 videos
- [ ] Preguntar a Karlos: wifi en M/Y Dolce Vita? canal YouTube? fotos de clientes?
- [ ] Tildes en todo el sitio (requiere revision de Karlos en CMS)
- [ ] Blog posts ampliados a 1500+ palabras (requiere contenido de Karlos)
- [ ] Organization schema: añadir telephone cuando Karlos proporcione numero

### Blockers/Concerns

- INFRA-01 (www redirect) bloqueado: Cloudflare MCP OAuth expirado, necesita accion manual en dashboard
- Phase 13 (Content Media) bloqueado: Karlos debe entregar fotos y videos
- Content quality issues (tildes, thin content) requieren intervencion de Karlos en CMS

## Session Continuity

Last session: 2026-03-08
Stopped at: v3.1 milestone near-complete (15/16 requirements done)
