# Roadmap: Red Sea Norte

## Milestones

- v1.0 SEO Infrastructure -- Phases 1-3 (shipped 2026-03-06)
- v2.0 Lead Capture -- Phases 4-6 (shipped 2026-03-06)
- v2.1 Real Content -- Phases 7-9 (shipped 2026-03-07)
- v3.0 SEO Operations -- Phases 10-13 (in progress)

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

### v3.0 SEO Operations

- [x] **Phase 10: SEO Tooling Setup** - Dar de alta la web en GSC, Bing Webmaster Tools y GA4 para tener visibilidad de indexacion y trafico (completed 2026-03-08)
- [ ] **Phase 11: Sitemaps & Redirects** - Sitemaps divididos por categoria, 301 redirects para posts merged, y envio a buscadores
- [ ] **Phase 12: Technical SEO** - ISR real, self-hosted fonts, Core Web Vitals y Cloudflare proxy para rendimiento
- [ ] **Phase 13: Content Media** - Fotos y videos de Karlos subidos a Wagtail y asignados a posts (BLOCKED: pendiente entrega de Karlos)

## Phase Details

### Phase 10: SEO Tooling Setup
**Goal**: La web esta registrada y verificada en los motores de busqueda y tiene analytics instalado para medir trafico real
**Depends on**: Nothing (first phase of v3.0)
**Requirements**: TOOL-01, TOOL-02, TOOL-03
**Success Criteria** (what must be TRUE):
  1. buceoenelmarrojo.com aparece como propiedad verificada en Google Search Console y se puede consultar el estado de indexacion
  2. buceoenelmarrojo.com aparece como sitio verificado en Bing Webmaster Tools
  3. El tag de GA4 esta instalado en el frontend y registra pageviews en el panel de Google Analytics al navegar la web
**Plans**: 1 plan
Plans:
- [ ] 10-01-PLAN.md -- GA4 tag + GSC/Bing verification meta tags + human verification checkpoint

### Phase 11: Sitemaps & Redirects
**Goal**: Los buscadores reciben sitemaps granulares por categoria y los posts merged redirigen correctamente sin contaminar el sitemap
**Depends on**: Phase 10 (GSC y Bing verificados para enviar sitemaps)
**Requirements**: SITE-01, SITE-02, SITE-03, SITE-04, TOOL-04
**Success Criteria** (what must be TRUE):
  1. /sitemap.xml devuelve un sitemap index con enlaces a sitemaps separados para blog, rutas, ofertas, cursos, experiencias y pages
  2. Las URLs de los 5 posts merged (giannis-d, dunraven, carnatic, camarotes-comida-wifi, shark-yolanda) devuelven 301 redirect a su destino correcto
  3. Los posts merged no aparecen en ningun sitemap de la web
  4. Existe un sitemap de imagenes que lista las fotos indexables para Google Images
  5. Los sitemaps estan enviados y aceptados en GSC y Bing Webmaster Tools
**Plans**: TBD

### Phase 12: Technical SEO
**Goal**: La web carga rapido, las fuentes no producen FOUT, el contenido se revalida automaticamente al publicar en Wagtail, y Cloudflare optimiza la entrega
**Depends on**: Phase 10 (necesita GA4 para medir Core Web Vitals)
**Requirements**: TECH-01, TECH-02, TECH-03, TECH-04, TECH-05
**Success Criteria** (what must be TRUE):
  1. Al publicar o actualizar una pagina en Wagtail, el contenido se actualiza en la web en menos de 60 segundos sin necesidad de rebuild
  2. Las fuentes Satoshi y Clash Display se cargan desde el propio servidor (no Google Fonts) y no hay flash de texto sin estilo (FOUT)
  3. draftMode() eliminado de los fetchers: las paginas de homepage y blog sirven contenido cacheado con ISR real
  4. Core Web Vitals en verde (LCP < 2.5s, CLS < 0.1, INP < 200ms) medido en PageSpeed Insights
  5. Cloudflare proxy activo con cache, compresion Brotli y HTTP/3 habilitado para buceoenelmarrojo.com
**Plans**: TBD

### Phase 13: Content Media
**Goal**: Las fotos y videos reales de pecios, spots y formacion de Karlos estan en Wagtail y asignados como hero images a los posts
**Depends on**: Phase 12 (ISR funcional para que el contenido nuevo se publique automaticamente)
**Requirements**: MEDIA-01, MEDIA-02, MEDIA-03
**Success Criteria** (what must be TRUE):
  1. Entre 31-50 fotos de pecios, spots y formacion estan optimizadas y subidas a Wagtail CMS con alt text descriptivo
  2. 6 videos estan subidos a YouTube y embebidos en los posts relevantes con iframe responsive
  3. Los 25 blog posts tienen hero images correctas asignadas y el mapping esta persistido en populate_blog.py
**Plans**: TBD

**BLOCKED**: Phase 13 requiere que Karlos entregue las fotos y videos. No se puede empezar hasta recibir el material.

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
| 10. SEO Tooling Setup | 1/1 | Complete    | 2026-03-08 | - |
| 11. Sitemaps & Redirects | v3.0 | 0/? | Not started | - |
| 12. Technical SEO | v3.0 | 0/? | Not started | - |
| 13. Content Media | v3.0 | 0/? | Blocked | - |
