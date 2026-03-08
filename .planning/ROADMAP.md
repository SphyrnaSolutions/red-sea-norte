# Roadmap: Red Sea Norte

## Milestones

- v1.0 SEO Infrastructure -- Phases 1-3 (shipped 2026-03-06)
- v2.0 Lead Capture -- Phases 4-6 (shipped 2026-03-06)
- v2.1 Real Content -- Phases 7-9 (shipped 2026-03-07)
- v3.0 SEO Operations -- Phases 10-13 (shipped 2026-03-08, phase 13 blocked)
- v3.1 SEO Audit Fixes -- Phases 14-17 (shipped 2026-03-08)
- v3.2 SEO Audit Fixes II -- Phases 18-22 (shipped 2026-03-08)
- v4.0 Content SEO -- Phases 23-27 (in progress)

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

<details>
<summary>v3.2 SEO Audit Fixes II (Phases 18-22) -- SHIPPED 2026-03-08</summary>

- [x] Phase 18: Blog SSR Fix (1/1 plans) -- completed 2026-03-08
- [x] Phase 19: Routing & Dead Links (1/1 plans) -- completed 2026-03-08
- [x] Phase 20: Schema Consolidation (1/1 plans) -- completed 2026-03-08
- [x] Phase 21: Blog & Rutas Performance (1/1 plans) -- completed 2026-03-08
- [x] Phase 22: Content & Config Cleanup (1/1 plans) -- completed 2026-03-08

</details>

### v4.0 Content SEO

- [x] **Phase 23: Content Planning & Keyword Map** - Mapa de 30 paginas con keyword target, cluster assignment, y estrategia de internal linking (completed 2026-03-08)
- [ ] **Phase 24: Wreck & Spot Content** - Contenido experto por pecio/spot: Thistlegorm, Abu Nuhas, Ras Mohammed, y spots adicionales (~5-8 paginas)
- [ ] **Phase 25: Route Comparisons** - Comparativas de rutas y guia por nivel de buceo (3 paginas)
- [ ] **Phase 26: Friction & Logistics Content** - Contenido informacional de friccion: packing list, certificaciones, seguridad, logistica (4 paginas)
- [ ] **Phase 27: Cluster Wiring & Monitoring** - Paginas pillar, internal links bidireccionales, breadcrumbs de cluster, y deteccion de canibalizacion

## Phase Details

<details>
<summary>v3.2 Phase Details (Phases 18-22) -- SHIPPED</summary>

### Phase 18: Blog SSR Fix
**Goal**: El contenido completo de los blog posts es visible en el HTML server-rendered para que Google pueda indexar el body text
**Depends on**: Nothing (P0 -- maxima prioridad)
**Requirements**: SSR-01, SSR-02
**Success Criteria** (what must be TRUE):
  1. Al hacer curl a cualquier URL de blog post, el HTML response contiene el body content completo del articulo (parrafos, listas, imagenes), no solo los headings
  2. La pagina /blog/ (listing) carga en menos de 60KB de payload total, mostrando solo titulo, excerpt, thumbnail y slug por cada post
  3. Google puede rastrear e indexar el contenido textual de los blog posts sin necesidad de ejecutar JavaScript
**Plans:** 1/1 plans complete
Plans:
- [x] 18-01-PLAN.md -- Fix blog body SSR and optimize listing payload

### Phase 19: Routing & Dead Links
**Goal**: Todas las URLs visibles en la web devuelven contenido valido -- no hay 404s en paginas enlazadas ni en la navegacion
**Depends on**: Nothing (parallelizable con Phase 18)
**Requirements**: ROUTE-01, ROUTE-02, ROUTE-03
**Success Criteria** (what must be TRUE):
  1. /contacto devuelve HTTP 200 con el formulario de contacto funcional y visible
  2. URLs de blog con tildes en el slug (ej: /blog/que-es-un-liveaboard) redirigen 301 a la version correcta o el CMS sirve el contenido sin error
  3. El footer no contiene enlaces a /ofertas ni /terminos (ambos eliminados por devolver 404)
**Plans:** 1/1 plans complete
Plans:
- [x] 19-01-PLAN.md -- Create /contacto page, add accented slug 301 redirects, clean footer dead links

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
**Plans:** 1/1 plans complete
Plans:
- [x] 20-01-PLAN.md -- Fix schema builders, create CollectionPage builder, migrate all pages to use centralized builders

### Phase 21: Blog & Rutas Performance
**Goal**: Las paginas de listing (/blog, /rutas) son cacheables, rapidas y tienen meta tags correctos para SEO
**Depends on**: Nothing (parallelizable)
**Requirements**: PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. /rutas no tiene export const dynamic = "force-dynamic" y es cacheable con ISR (response headers muestran cache HIT)
  2. /blog incluye canonical tag apuntando a https://buceoenelmarrojo.com/blog/
  3. /blog tiene title y meta description que reflejan contenido de blog (no "centro de buceo" ni texto generico)
**Plans:** 1/1 plans complete
Plans:
- [x] 21-01-PLAN.md -- Remove force-dynamic from /rutas, add blog-specific metadata with canonical to /blog

### Phase 22: Content & Config Cleanup
**Goal**: No hay contenido interno visible al publico, la configuracion tecnica esta limpia y los sitemaps tienen fechas correctas
**Depends on**: Nothing (parallelizable)
**Requirements**: CLEAN-01, CLEAN-02, CLEAN-03
**Success Criteria** (what must be TRUE):
  1. No existen notas de marketing internas (como "Este post posiciona para..." o "Estrategia:") visibles en ninguna pagina publica
  2. robots.txt tiene un solo bloque por User-agent (sin duplicados de Cloudflare)
  3. Sitemaps de rutas y pages incluyen lastmod con fecha YYYY-MM-DD derivada del CMS o fecha fija conocida
**Plans:** 1/1 plans complete
Plans:
- [x] 22-01-PLAN.md -- Remove internal marketing notes, document robots.txt Cloudflare dedup, add lastmod to sitemaps

</details>

### Phase 23: Content Planning & Keyword Map
**Goal**: Existe un mapa de contenido completo que define las 30 paginas a producir, con keyword target unica por pagina, asignacion a cluster, y estrategia de interlinking con el contenido existente
**Depends on**: Nothing (primer paso del milestone)
**Requirements**: PLAN-01, PLAN-02
**Success Criteria** (what must be TRUE):
  1. Existe un documento con las 30 paginas planificadas, cada una con: titulo, keyword target, cluster asignado (vida a bordo, pecios, destinos, logistica, rutas), y tipo de pagina (pillar, satellite, comparativa, friccion)
  2. Ninguna keyword target se solapa con los primary_keyword de los 25 blog posts existentes ni las 5 rutas (sin canibalizacion planificada)
  3. Existe un mapa de internal linking que define que paginas nuevas enlazan a que contenido existente y viceversa, con anchor text propuesto
  4. Las 30 paginas cubren los 5 clusters tematicos con al menos 3 paginas por cluster
**Plans:** 1/1 plans complete
Plans:
- [ ] 23-01-PLAN.md -- Content map (30 pages) with keyword targets, cluster assignment, and internal linking strategy

### Phase 24: Wreck & Spot Content
**Goal**: Los usuarios encuentran contenido experto y detallado sobre cada pecio y spot de buceo principal del Mar Rojo, con informacion que no existe en la competencia en espanol
**Depends on**: Phase 23 (necesita keyword map y cluster assignments)
**Requirements**: WRECK-01, WRECK-02, WRECK-03, WRECK-04, AUTH-01, AUTH-02
**Success Criteria** (what must be TRUE):
  1. La pagina del SS Thistlegorm incluye: historia del barco, descripcion del buceo, profundidad, nivel requerido, que ver dentro y fuera del pecio, y consejos practicos -- publicada en Wagtail CMS con schema BlogPosting correcto
  2. La pagina de Abu Nuhas cubre los 4 pecios del arrecife (Giannis D, Carnatic, Tile Wreck, Kimon M) con seccion dedicada a cada uno
  3. La pagina de Ras Mohammed cubre Shark Reef, Yolanda Reef y Anemone City con informacion de corrientes, nivel y vida marina
  4. Existen al menos 5 paginas adicionales de spots/pecios que completan el cluster, cada una con contenido de profundidad experta (no generico)
  5. Todas las paginas de pecios/spots siguen la plantilla SEO estandar (H1 con keyword, ToC, interlinks, schema) y estan publicadas en Wagtail
  6. Cada pagina cita al menos 2-3 fuentes autoritativas (PADI, SSI, NOAA, guias nauticas, registros historicos) con enlaces externos
  7. Cada pagina experta incluye seccion de fuentes/referencias al final
**Plans**: TBD

### Phase 25: Route Comparisons
**Goal**: Los usuarios pueden comparar rutas de vida a bordo de forma objetiva para decidir cual reservar segun su nivel, intereses y punto de salida
**Depends on**: Phase 23 (necesita keyword map)
**Requirements**: COMP-01, COMP-02, COMP-03, AUTH-01, AUTH-02
**Success Criteria** (what must be TRUE):
  1. Existe una comparativa Ruta Norte vs Ruta Brothers con tabla comparativa (pecios, vida marina, nivel, precio, duracion) y recomendacion clara por perfil de buceador
  2. Existe una comparativa Hurghada vs Sharm el-Sheikh como punto de salida, cubriendo logistica, rutas disponibles, precio, y ventajas/desventajas de cada puerto
  3. Existe una guia "mejor ruta segun tu nivel" que orienta desde Open Water hasta buceadores avanzados, con recomendacion de ruta y temporada para cada nivel
  4. Las 3 paginas estan publicadas en Wagtail CMS con schema, interlinks a paginas de rutas existentes, y CTAs hacia el formulario de contacto
  5. Cada comparativa cita fuentes (SSI, operadores, datos de profundidad/corrientes verificables) con enlaces externos
**Plans**: TBD

### Phase 26: Friction & Logistics Content
**Goal**: Los usuarios encuentran respuesta a todas las dudas previas a reservar un liveaboard (que llevar, requisitos, seguridad, logistica), reduciendo la friccion de conversion
**Depends on**: Phase 23 (necesita keyword map)
**Requirements**: FRIC-01, FRIC-02, FRIC-03, FRIC-04, AUTH-01, AUTH-02
**Success Criteria** (what must be TRUE):
  1. Existe un packing list completo para liveaboard con secciones por categoria (equipo de buceo, ropa, documentos, botiquin) publicado en Wagtail
  2. Existe una pagina de requisitos y certificaciones que explica nivel minimo (Open Water), certificaciones recomendadas, y como se relaciona con las rutas del producto
  3. Existe una pagina de seguridad que cubre: seguro de buceo recomendado, ubicacion de camaras hiperbaricas, protocolos de emergencia y DAN
  4. Existe una guia de logistica que cubre: visa de Egipto para espanoles, como llegar a Hurghada (vuelos), transfers aeropuerto-puerto, propinas y moneda
  5. Las 4 paginas capturan trafico informacional long-tail y contienen CTAs internos hacia el formulario de contacto y paginas de rutas
  6. Cada pagina cita fuentes autoritativas (DAN, ministerio egipcio, PADI/SSI, aerolineas) y tiene seccion de referencias
**Plans**: TBD

### Phase 27: Cluster Wiring & Monitoring
**Goal**: Las 30 paginas nuevas estan integradas en la arquitectura de clusters con paginas pillar, interlinks bidireccionales, y existe un mecanismo para detectar canibalizacion de keywords
**Depends on**: Phases 24, 25, 26 (necesita contenido publicado para enlazar)
**Requirements**: CLUST-01, CLUST-02, CLUST-03, MON-01
**Success Criteria** (what must be TRUE):
  1. Existen paginas pillar para cada cluster principal (vida a bordo, pecios, destinos, logistica) que actuan como hub de navegacion enlazando a todas las paginas satellite del cluster
  2. Los 25 blog posts existentes y las 5 rutas contienen internal links actualizados apuntando a las paginas nuevas relevantes (bidireccional: nuevo enlaza a existente Y existente enlaza a nuevo)
  3. El schema BreadcrumbList de las paginas nuevas refleja la jerarquia de cluster (Home > Cluster Pillar > Pagina) correctamente
  4. Existe un script o proceso documentado que compara primary_keyword de todas las paginas y detecta solapamientos de keyword entre URLs, con output accionable
**Plans**: TBD

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
| 18. Blog SSR Fix | v3.2 | 1/1 | Complete | 2026-03-08 |
| 19. Routing & Dead Links | v3.2 | 1/1 | Complete | 2026-03-08 |
| 20. Schema Consolidation | v3.2 | 1/1 | Complete | 2026-03-08 |
| 21. Blog & Rutas Performance | v3.2 | 1/1 | Complete | 2026-03-08 |
| 22. Content & Config Cleanup | v3.2 | 1/1 | Complete | 2026-03-08 |
| 23. Content Planning & Keyword Map | 1/1 | Complete   | 2026-03-08 | - |
| 24. Wreck & Spot Content | v4.0 | 0/? | Not started | - |
| 25. Route Comparisons | v4.0 | 0/? | Not started | - |
| 26. Friction & Logistics Content | v4.0 | 0/? | Not started | - |
| 27. Cluster Wiring & Monitoring | v4.0 | 0/? | Not started | - |
