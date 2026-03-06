# Red Sea Norte

## What This Is

Web nicho en Next.js sobre buceo y vida a bordo en el Mar Rojo, centrada en rutas que salen desde Hurghada (especialmente la Ruta Norte y Pecios). Consume contenido de un Wagtail headless CMS y su objetivo principal es posicionarse en SEO para keywords de buceo en el Mar Rojo en espanol y capturar leads para safaris de buceo. Incluye infraestructura SEO completa (schema markup, cluster resolver, interlinks, breadcrumbs) y plantilla reutilizable para produccion de contenido a escala.

## Core Value

Posicionar la web como referencia SEO en espanol para "vida a bordo mar rojo" / "buceo mar rojo" y convertir ese trafico en leads cualificados para safaris de buceo desde Hurghada via Odoo CRM.

## Requirements

### Validated

- v1.0: Migracion de axios a native fetch con ISR caching y paginacion
- v1.0: Sitemap XML con fechas reales de Wagtail
- v1.0: Error handling explicito en produccion (sin mock data)
- v1.0: Schema markup JSON-LD (TouristTrip, Article, BreadcrumbList) via schema-dts
- v1.0: Cluster resolver para relaciones pillar-satellite
- v1.0: Interlink engine y keyword-to-URL map anti-canibalizacion
- v1.0: Meta tags dinamicos via generateMetadata() + breadcrumbs
- v1.0: Modelos Wagtail extendidos con ClusterMixin
- v1.0: Plantilla SEO article reutilizable con H1/H2/H3, ToC, interlinks
- v1.0: Homepage optimizada: H1 con keywords, CTA above fold, route-first

### Active

- [ ] Captacion de leads conectada a Odoo CRM (formularios de contacto/reserva)
- [ ] 30 primeras paginas de contenido SEO (clusters: vida a bordo, rutas, pecios, destinos, logistica)
- [ ] Contenido por pecio/spot con profundidad experta (Thistlegorm, Abu Nuhas, Ras Mohammed)
- [ ] Comparativas de rutas (Norte vs Brothers, Hurghada vs Sharm)
- [ ] Contenido de "friccion" (que llevar, requisitos, seguridad, certificaciones)
- [ ] Webhook Wagtail para ISR on-demand al publicar contenido
- [ ] Monitorizacion de canibalizacion de keywords
- [ ] Core Web Vitals optimization pass

### Out of Scope

- Otras webs nicho o destinos fuera del Mar Rojo
- Pasarela de pago / e-commerce -- modelo de captacion de leads
- App movil -- web responsive suficiente
- Contenido en idiomas distintos al espanol -- primera fase solo ES
- Blog generico -- todo el contenido sigue estrategia SEO por clusters

## Context

**Current state (post-v1.0):**
- 59 files, ~2600 LOC en src/ modificados
- Stack: Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript + Wagtail headless
- SEO infrastructure completa y funcional
- 10 shared block components, SEO article template listo para produccion de contenido
- Wagtail models extended con ClusterMixin (cluster_id, role, pillar_slug, primary_keyword)
- Odoo project: Karlos-Redsea (ID 18) -- 4 tareas completadas, 3 en backlog (v2)

**Competencia analizada**: Karlos Simon (buena landing sin profundidad SEO), SunyTravel (floja en contenido experto), Liveaboard.com (marketplace). Huecos claros en contenido experto por pecio, comparativas, contenido de friccion.

**Keywords objetivo**: "vida a bordo mar rojo", "buceo mar rojo", "ruta norte mar rojo", "ss thistlegorm", "precio vida a bordo"

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + Wagtail headless | Stack ya implementado, separacion frontend/CMS | v1.0 Good |
| Clusters SEO como arquitectura de contenido | Demostrar autoridad tematica en Google | v1.0 Good |
| Native fetch con ISR (no axios) | Compatibilidad con Next.js cache/revalidation | v1.0 Good |
| schema-dts para JSON-LD | Type-safe schema.org en compile time | v1.0 Good |
| ClusterMixin en Wagtail | DB-level unique constraint en primary_keyword | v1.0 Good |
| force-dynamic + fetch-level ISR | Simplifica caching, evita conflictos con unstable_cache | v1.0 Good |
| Odoo CRM para leads | Ya disponible en infraestructura del cliente | -- Pending (v2) |
| 30 paginas como primer lanzamiento | Cubrir nicho base sin canibalizacion | -- Pending (v2) |

## Constraints

- **CMS**: Wagtail headless -- todo el contenido gestionable desde CMS
- **Stack**: Next.js (ya implementado) -- no cambiar framework
- **SEO-first**: Cada pagina sigue plantilla SEO estandar
- **Leads**: Formularios deben conectar con Odoo CRM via API

---
*Last updated: 2026-03-06 after v1.0 milestone*
