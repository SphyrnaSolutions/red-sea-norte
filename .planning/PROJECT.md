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

### Validated — v2.0 Lead Capture

- v2.0: Formulario de contacto con campos: nombre, email, telefono, certificacion, mes
- v2.0: Consentimiento WhatsApp marketing (Meta + GDPR compliant)
- v2.0: API route POST /api/lead con validacion y rate limiting
- v2.0: Integracion Odoo CRM: crear crm.lead con source tracking
- v2.0: Pagina de politica de privacidad

### Validated — v2.1 Real Content

- v2.1: 33 fotos reales subidas a Wagtail CMS y asignadas a imagenes del frontend
- v2.1: 5 rutas reales con precios, itinerarios y spots migradas a Wagtail CMS
- v2.1: 25 blog posts auditados, 4 errores factuales corregidos, 13 posts reescritos con contenido real
- v2.1: Frontend CMS-first con fallback a mock-data para desarrollo local

### Validated — v3.0 SEO Operations

- v3.0: Alta y verificacion en GSC, Bing Webmaster Tools y GA4 con cookie consent GDPR
- v3.0: Sitemaps divididos por categoria (blog, rutas, ofertas, cursos, experiencias, pages, images)
- v3.0: 301 redirects para 5 posts merged y excluidos del sitemap
- v3.0: Sitemaps enviados a GSC y Bing via MCP
- v3.0: Webhook Wagtail para ISR on-demand al publicar contenido
- v3.0: draftMode() eliminado de fetchers, ISR real habilitado
- v3.0: Self-hosted fonts (Satoshi, Clash Display) via next/font/local
- v3.0: Core Web Vitals: cache headers, Cloudflare proxy, Brotli, HTTP/3
- v3.0: Cloudflare Origin Certificate (15 anos) + SSL Full (strict)
- v3.0: Cache Rules en Cloudflare para assets y HTML en edge

### Validated — v3.1 SEO Audit Fixes

- v3.1: www redirect 301 a non-www via Cloudflare
- v3.1: Content-Security-Policy header (report-only)
- v3.1: FAQPage schema eliminado de rutas
- v3.1: Organization schema completo (sameAs, geo, contacto)
- v3.1: Course duration en ISO 8601
- v3.1: Sitemaps: paginas faltantes, lastmod reales, excluir vacios
- v3.1: og:image y twitter:image en homepage
- v3.1: Texto interno de estrategia eliminado
- v3.1: AVIF habilitado, HeroSection server component
- v3.1: Cache /_next/image en Cloudflare edge

### Validated — v3.2 SEO Audit Fixes II

- v3.2: Blog body content renderiza server-side (SSR completo)
- v3.2: /contacto funcional con formulario de contacto
- v3.2: Blog schema URL usa slug de URL, no slug de CMS
- v3.2: URLs con tildes en slugs corregidas (301 redirects)
- v3.2: Blog listing optimizado (451KB → 122KB)
- v3.2: /rutas cacheable con ISR (sin force-dynamic)
- v3.2: Schema JSON-LD en listing pages (/blog/, /rutas/)
- v3.2: /blog canonical, title y description correctos
- v3.2: BlogPosting schema con image y datePublished/dateModified
- v3.2: Footer links rotos eliminados, cookie management button agregado
- v3.2: Schema builders centralizados en todas las paginas
- v3.2: Autor estandarizado (Karlos Simon) en todos los posts
- v3.2: Lastmod en sitemaps de rutas y pages
- v3.2: Notas internas de marketing eliminadas
- v3.2: GA4 measurement ID como build ARG en Dockerfile

### Active — v4.0 Content SEO

- [ ] 30 primeras paginas de contenido SEO (clusters: vida a bordo, rutas, pecios, destinos, logistica)
- [ ] Contenido por pecio/spot con profundidad experta (Thistlegorm, Abu Nuhas, Ras Mohammed)
- [ ] Comparativas de rutas (Norte vs Brothers, Hurghada vs Sharm)
- [ ] Contenido de "friccion" (que llevar, requisitos, seguridad, certificaciones)
- [ ] Monitorizacion de canibalizacion de keywords

### Out of Scope

- Otras webs nicho o destinos fuera del Mar Rojo
- Pasarela de pago / e-commerce -- modelo de captacion de leads
- App movil -- web responsive suficiente
- Contenido en idiomas distintos al espanol -- primera fase solo ES
- Blog generico -- todo el contenido sigue estrategia SEO por clusters

## Context

**Current state (post-v2.1):**
- Stack: Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript + Wagtail headless
- SEO infrastructure completa y funcional (schema, clusters, interlinks)
- Lead capture form conectado a Odoo CRM via XML-RPC
- 25 blog posts live en Wagtail CMS con contenido real (13 reescritos, 5 merged stubs)
- 33 fotos reales del barco/vida marina en Wagtail, asignadas como hero a posts
- 5 rutas reales en Wagtail CMS con datos verificados del producto
- Faltan: fotos de pecios/spots/formacion, videos, GA4, GSC, Bing, sitemaps separados

**Producto real (via viajeskarlossimon.com):**
- Barco: M/Y Dolce Vita (40m, 12 camarotes, 24 pax, Divers Fleet)
- 5 rutas Mar Rojo desde 1.190-1.290 EUR, 8 dias/7 noches
- Incluye: Advanced SSI + 4 especialidades gratis, nitrox gratis, pension completa
- Open Water minimo, todas las rutas aptas
- 73 resenas Google 5 estrellas, CICMA 4375

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
| Odoo CRM para leads | Ya disponible en infraestructura del cliente | v2.0 Good |
| WhatsApp consent en form | Meta requiere opt-in explicito para marketing | v2.0 Good |
| Fotos reales antes de escalar contenido | Credibilidad y E-E-A-T antes de producir 30+ paginas | -- Active (v2.1) |
| Datos reales del producto en la web | Data scrapeada de viajeskarlossimon.com, 5 rutas verificadas | -- Active (v2.1) |
| 30 paginas como primer lanzamiento | Cubrir nicho base sin canibalizacion | -- Pending (v3) |

## Constraints

- **CMS**: Wagtail headless -- todo el contenido gestionable desde CMS
- **Stack**: Next.js (ya implementado) -- no cambiar framework
- **SEO-first**: Cada pagina sigue plantilla SEO estandar
- **Leads**: Formularios deben conectar con Odoo CRM via API

---
## Current Milestone: v4.0 Content SEO

**Goal:** Producir las primeras 30 paginas de contenido SEO por clusters tematicos para posicionar la web como referencia en espanol sobre buceo en el Mar Rojo, incluyendo contenido experto por pecio, comparativas de rutas, y contenido de friccion que capture trafico informacional.

**Target features:**
- 30 paginas de contenido SEO organizadas en clusters (vida a bordo, rutas, pecios, destinos, logistica)
- Contenido experto por pecio/spot (Thistlegorm, Abu Nuhas, Ras Mohammed, etc.)
- Comparativas de rutas (Norte vs Brothers, Hurghada vs Sharm)
- Contenido de friccion (que llevar, requisitos, certificaciones, seguridad)
- Monitorizacion de canibalizacion de keywords

---
*Last updated: 2026-03-08 after v4.0 milestone start*
