# Roadmap: Red Sea Norte

## Milestones

- v1.0 SEO Infrastructure -- Phases 1-3 (shipped 2026-03-06)
- v2.0 Lead Capture -- Phases 4-6 (shipped 2026-03-06)
- v2.1 Real Content -- Phases 7-9 (shipped 2026-03-07)
- v3.0 SEO Operations -- Phases 10-13 (shipped 2026-03-08, phase 13 blocked)
- v3.1 SEO Audit Fixes -- Phases 14-17 (shipped 2026-03-08)
- v3.2 SEO Audit Fixes II -- Phases 18-22 (in progress)

## Phases

<details>
<summary>v1.0 SEO Infrastructure (Phases 1-3) -- SHIPPED 2026-03-06</summary>

- [x] Phase 1: Technical Foundation (2/2 plans) -- completed 2026-03-06
- [x] Phase 2: SEO Content Pipeline (4/4 plans) -- completed 2026-03-06
- [x] Phase 3: Page Templates and Homepage (3/3 plans) -- completed 2026-03-06

Full details: .planning/milestones/v1.0-ROADMAP.md

</details>

<details>
<summary>v2.0 Lead Capture (Phases 4-6) -- SHIPPED 2026-03-06</summary>

- [x] Phase 4: Odoo API Integration (2/2 plans) -- completed 2026-03-06
- [x] Phase 5: Form + Consent UX (1/1 plans) -- completed 2026-03-06
- [x] Phase 6: Legal + Deploy (1/1 plans) -- completed 2026-03-06

</details>

<details>
<summary>v2.1 Real Content (Phases 7-9) -- SHIPPED 2026-03-07</summary>

- [x] Phase 7: Real Images (2/2 plans) -- completed 2026-03-07
- [x] Phase 8: Wagtail CMS Migration (3/3 plans) -- completed 2026-03-07
- [x] Phase 9: Blog Audit (1/1 plans) -- completed 2026-03-07

</details>

<details>
<summary>v3.0 SEO Operations (Phases 10-13) -- SHIPPED 2026-03-08</summary>

- [x] Phase 10: SEO Tooling Setup (1/1 plans) -- completed 2026-03-08
- [x] Phase 11: Sitemaps & Redirects (2/2 plans) -- completed 2026-03-08
- [x] Phase 12: Technical SEO (3/3 plans) -- completed 2026-03-08
- [ ] Phase 13: Content Media -- BLOCKED (pendiente entrega de Karlos)

</details>

<details>
<summary>v3.1 SEO Audit Fixes (Phases 14-17) -- SHIPPED 2026-03-08</summary>

- [x] Phase 14: Infrastructure Hardening (1/1 plans) -- completed 2026-03-08
- [x] Phase 15: Schema Fixes (1/1 plans) -- completed 2026-03-08
- [x] Phase 16: Sitemap Fixes (1/1 plans) -- completed 2026-03-08
- [x] Phase 17: On-Page & Performance (1/1 plans) -- completed 2026-03-08

</details>

### v3.2 SEO Audit Fixes II

- [ ] **Phase 18: Blog SSR Fix** - Blog body content renderiza en server HTML y listing optimizado a <60KB
- [ ] **Phase 19: Routing & Dead Links** - /contacto funcional, slugs con tildes corregidos, footer links limpios
- [ ] **Phase 20: Schema Consolidation** - Schema builders reutilizados en todas las paginas, listings con JSON-LD, BlogPosting completo
- [ ] **Phase 21: Blog & Rutas Performance** - /rutas cacheable con ISR, /blog con canonical y meta tags correctos
- [ ] **Phase 22: Content & Config Cleanup** - Notas internas eliminadas, robots.txt limpio, lastmod en sitemaps

## Phase Details

### Phase 18: Blog SSR Fix
**Goal**: El contenido completo de los blog posts es visible en el HTML server-rendered para que Google pueda indexar el body text
**Depends on**: Nothing (P0 -- maxima prioridad)
**Requirements**: SSR-01, SSR-02
**Success Criteria** (what must be TRUE):
  1. Al hacer curl a cualquier URL de blog post, el HTML response contiene el body content completo del articulo (parrafos, listas, imagenes), no solo los headings
  2. La pagina /blog/ (listing) carga en menos de 60KB de payload total, mostrando solo titulo, excerpt, thumbnail y slug por cada post
  3. Google puede rastrear e indexar el contenido textual de los blog posts sin necesidad de ejecutar JavaScript
**Plans:** 1 plan
Plans:
- [ ] 18-01-PLAN.md -- Fix blog body SSR and optimize listing payload

### Phase 19: Routing & Dead Links
**Goal**: Todas las URLs visibles en la web devuelven contenido valido -- no hay 404s en paginas enlazadas ni en la navegacion
**Depends on**: Nothing (parallelizable con Phase 18)
**Requirements**: ROUTE-01, ROUTE-02, ROUTE-03
**Success Criteria** (what must be TRUE):
  1. /contacto devuelve HTTP 200 con el formulario de contacto funcional y visible
  2. URLs de blog con tildes en el slug (ej: /blog/que-es-un-liveaboard) redirigen 301 a la version correcta o el CMS sirve el contenido sin error
  3. El footer no contiene enlaces a /ofertas ni /terminos (ambos eliminados por devolver 404)
**Plans:** 1 plan
Plans:
- [ ] 19-01-PLAN.md -- Create /contacto page, add accented slug 301 redirects, clean footer dead links

### Phase 20: Schema Consolidation
**Goal**: Todas las paginas usan los schema builders centralizados y el structured data es completo y correcto para rich results
**Depends on**: Phase 18 (SSR fix puede cambiar como se renderiza el schema en blog posts)
**Requirements**: SCHEMA-05, SCHEMA-06, SCHEMA-07, SCHEMA-08, SCHEMA-09
**Success Criteria** (what must be TRUE):
  1. BlogPosting schema mainEntityOfPage.@id usa el slug de la URL del frontend, no el slug interno del CMS
  2. /blog/ incluye JSON-LD con CollectionPage + BreadcrumbList; /rutas/ incluye JSON-LD con CollectionPage + BreadcrumbList
  3. BlogPosting schema incluye image property con URL de la hero image del post
  4. Ninguna pagina construye JSON-LD inline -- todas usan las funciones de src/lib/seo/schema/
  5. Todos los BlogPosting tienen el mismo author.name estandarizado
**Plans:** 1 plan
Plans:
- [ ] 20-01-PLAN.md -- Fix schema builders, create CollectionPage builder, migrate all pages to use centralized builders

### Phase 21: Blog & Rutas Performance
**Goal**: Las paginas de listing (/blog, /rutas) son cacheables, rapidas y tienen meta tags correctos para SEO
**Depends on**: Nothing (parallelizable)
**Requirements**: PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. /rutas no tiene export const dynamic = "force-dynamic" y es cacheable con ISR (response headers muestran cache HIT)
  2. /blog incluye canonical tag apuntando a https://buceoenelmarrojo.com/blog/
  3. /blog tiene title y meta description que reflejan contenido de blog (no "centro de buceo" ni texto generico)
**Plans:** 1 plan
Plans:
- [ ] 21-01-PLAN.md -- Remove force-dynamic from /rutas, add blog-specific metadata with canonical to /blog

### Phase 22: Content & Config Cleanup
**Goal**: No hay contenido interno visible al publico, la configuracion tecnica esta limpia y los sitemaps tienen fechas correctas
**Depends on**: Nothing (parallelizable)
**Requirements**: CLEAN-01, CLEAN-02, CLEAN-03
**Success Criteria** (what must be TRUE):
  1. No existen notas de marketing internas (como "Este post posiciona para..." o "Estrategia:") visibles en ninguna pagina publica
  2. robots.txt tiene un solo bloque por User-agent (sin duplicados de Cloudflare)
  3. Sitemaps de rutas y pages incluyen lastmod con fecha YYYY-MM-DD derivada del CMS o fecha fija conocida
**Plans:** 1 plan
Plans:
- [ ] 22-01-PLAN.md -- Remove internal marketing notes, document robots.txt Cloudflare dedup, add lastmod to sitemaps

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Technical Foundation | v1.0 | 2/2 | Complete | 2026-03-06 |
| 2. SEO Content Pipeline | v1.0 | 4/4 | Complete | 2026-03-06 |
| 3. Page Templates and Homepage | v1.0 | 3/3 | Complete | 2026-03-06 |
| 4. Odoo API Integration | v2.0 | 2/2 | Complete | 2026-03-06 |
| 5. Form + Consent UX | v2.0 | 1/1 | Complete | 2026-03-06 |
| 6. Legal + Deploy | v2.0 | 1/1 | Complete | 2026-03-06 |
| 7. Real Images | v2.1 | 2/2 | Complete | 2026-03-07 |
| 8. Wagtail CMS Migration | v2.1 | 3/3 | Complete | 2026-03-07 |
| 9. Blog Audit | v2.1 | 1/1 | Complete | 2026-03-07 |
| 10. SEO Tooling Setup | v3.0 | 1/1 | Complete | 2026-03-08 |
| 11. Sitemaps & Redirects | v3.0 | 2/2 | Complete | 2026-03-08 |
| 12. Technical SEO | v3.0 | 3/3 | Complete | 2026-03-08 |
| 13. Content Media | v3.0 | 0/? | Blocked | - |
| 14. Infrastructure Hardening | v3.1 | 1/1 | Complete | 2026-03-08 |
| 15. Schema Fixes | v3.1 | 1/1 | Complete | 2026-03-08 |
| 16. Sitemap Fixes | v3.1 | 1/1 | Complete | 2026-03-08 |
| 17. On-Page & Performance | v3.1 | 1/1 | Complete | 2026-03-08 |
| 18. Blog SSR Fix | v3.2 | 0/1 | Not started | - |
| 19. Routing & Dead Links | v3.2 | 0/1 | Not started | - |
| 20. Schema Consolidation | v3.2 | 0/1 | Not started | - |
| 21. Blog & Rutas Performance | v3.2 | 0/1 | Not started | - |
| 22. Content & Config Cleanup | v3.2 | 0/1 | Not started | - |
