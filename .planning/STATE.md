# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** Posicionar la web como referencia SEO en espanol para buceo en el Mar Rojo y convertir trafico en leads via Odoo CRM
**Current focus:** v3.2 SEO Audit Fixes II

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-03-08 — Milestone v3.2 started after second SEO audit (score 57/100)

## Accumulated Context

### Decisions

- [v3.0]: MEDIA requirements bloqueados por Karlos — fase 13 separada al final
- [v3.0]: Cloudflare Origin Certificate (15 anos) reemplaza Let's Encrypt
- [v3.0]: SSL Full (strict) configurado via API
- [v3.0]: Cache Rules creadas en Cloudflare para assets + HTML en edge
- [v3.0]: REVALIDATION_SECRET configurado en Next.js y Wagtail
- [v3.1]: SEO audit score 74/100 — content quality (62) es el area mas debil
- [v3.1]: FAQPage schema eliminado de rutas (restriccion Google agosto 2023)
- [v3.1]: HeroSection convertido a server component, CTAs extraidos a HeroCTAButtons client component
- [v3.1]: AVIF habilitado como formato preferido de imagen
- [v3.2]: Second audit score 57/100 — blog SSR empty es el issue #1 (no detectado antes)
- [v3.2]: Blog body content no aparece en HTML server-rendered (solo headings)
- [v3.2]: /contacto devuelve 404
- [v3.2]: Schema mainEntityOfPage.@id usa slug CMS en vez de slug URL
- [v3.2]: Blog listing carga 451KB (89% payload no usado)

### Pending Todos

- [ ] Enviar lista de contenido a Karlos: 31-50 fotos + 6 videos
- [ ] Preguntar a Karlos: wifi en M/Y Dolce Vita? canal YouTube? fotos de clientes?
- [ ] Organization schema: anadir telephone cuando Karlos proporcione numero

### Blockers/Concerns

- Phase 13 (Content Media) bloqueado: Karlos debe entregar fotos y videos
- Contenido que necesita Karlos: telefono real, bios autor, testimonios, pagina "Sobre nosotros"

## Session Continuity

Last session: 2026-03-08
Stopped at: v3.2 milestone initialization
