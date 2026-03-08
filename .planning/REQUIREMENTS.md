# Requirements: Red Sea Norte

**Defined:** 2026-03-06
**Core Value:** Convertir trafico SEO en leads cualificados para safaris de buceo via Odoo CRM

## v2.0 Requirements

Requirements for lead capture integration with Odoo CRM.

### Formulario

- [x] **FORM-01**: Formulario muestra campos: nombre, email, telefono, certificacion, mes preferido
- [x] **FORM-02**: Checkbox de consentimiento WhatsApp con texto legal compliant con Meta + GDPR
- [x] **FORM-03**: Link a politica de privacidad visible junto al checkbox
- [x] **FORM-04**: Validacion client-side de campos obligatorios (nombre, email, telefono, consent)
- [x] **FORM-05**: Feedback visual al usuario: loading, exito, error

### API

- [x] **API-01**: POST /api/lead recibe datos del form y crea crm.lead en Odoo
- [x] **API-02**: Validacion server-side de todos los campos (sanitizacion, formato email/telefono)
- [x] **API-03**: Rate limiting para prevenir spam/abuso
- [ ] **API-04**: Credenciales Odoo via env vars (ODOO_URL, ODOO_DB, ODOO_API_KEY) sin NEXT_PUBLIC_

### CRM

- [ ] **CRM-01**: Lead en Odoo incluye: name, contact_name, email_from, phone, description, source_id, medium_id
- [x] **CRM-02**: utm.source "Web buceoenelmarrojo.com" creada para tracking
- [x] **CRM-03**: Consentimiento WhatsApp + timestamp guardado en el lead

### Legal

- [x] **LEGAL-01**: Pagina de politica de privacidad con tratamiento de datos y WhatsApp marketing

## v2.1 Requirements

Requirements for replacing stock content with real product data and images.

### Imagenes

- [ ] **IMG-01**: Sustituir URLs Unsplash en images.ts por fotos reales optimizadas en public/images/
- [x] **IMG-02**: Copiar y optimizar fotos reales al proyecto con next/image optimization
- [ ] **IMG-03**: Alt text SEO descriptivo en espanol con keywords en todas las imagenes
- [ ] **IMG-04**: Responsive images con srcset/sizes para diferentes viewports

### Datos del Producto

- [x] **DATA-01**: Datos reales del barco M/Y Dolce Vita en homepage (40m, 12 camarotes, 24 pax, 4 cubiertas)
- [x] **DATA-02**: 5 rutas reales con nombre, precio desde, spots principales y descripcion
- [x] **DATA-03**: Formacion incluida real: Advanced SSI + 4 especialidades gratis, nitrox gratis
- [x] **DATA-04**: FAQs reales del producto extraidas de viajeskarlossimon.com

### CMS Integration

- [x] **CMS-01**: Frontend carga rutas desde API Wagtail (CMS-first) con fallback a mock-data para desarrollo local

### Audit de Posts

- [ ] **AUDIT-01**: Revisar los 25 blog posts contra data real del producto (barco, rutas, precios)
- [ ] **AUDIT-02**: Corregir datos incorrectos o inventados en posts existentes
- [ ] **AUDIT-03**: Identificar posts thin content para reescribir o fusionar

## v3.0 Requirements

Requirements for SEO operations, sitemaps, technical optimization and content media.

### SEO Tooling

- [x] **TOOL-01**: Dar de alta y verificar buceoenelmarrojo.com en Google Search Console
- [x] **TOOL-02**: Dar de alta y verificar buceoenelmarrojo.com en Bing Webmaster Tools
- [x] **TOOL-03**: Crear propiedad GA4 para buceoenelmarrojo.com e instalar tag en el frontend
- [ ] **TOOL-04**: Enviar sitemaps divididos a GSC y Bing

### Sitemaps & Indexing

- [x] **SITE-01**: Convertir sitemap unico en sitemap index con sitemaps separados por categoria (blog, rutas, ofertas, cursos, experiencias, pages)
- [x] **SITE-02**: Configurar 301 redirects para 5 posts merged (giannis-d, dunraven, carnatic, camarotes-comida-wifi, shark-yolanda)
- [x] **SITE-03**: Excluir posts merged/redirect del sitemap
- [x] **SITE-04**: Crear sitemap de imagenes para indexacion de fotos en Google Images

### Technical SEO

- [x] **TECH-01**: Webhook Wagtail para ISR on-demand al publicar contenido
- [x] **TECH-02**: Self-host fuentes Satoshi/Clash Display con next/font/local (eliminar FOUT)
- [x] **TECH-03**: Eliminar draftMode() de fetchers para habilitar ISR real (homepage y blog)
- [ ] **TECH-04**: Core Web Vitals optimization pass (LCP, CLS, INP)
- [ ] **TECH-05**: Configurar Cloudflare proxy para cache, compresion y rendimiento

### Content de Karlos (bloqueado por entrega)

- [ ] **MEDIA-01**: Recibir 31-50 fotos de pecios, spots y formacion de Karlos, optimizar y subir a Wagtail CMS
- [ ] **MEDIA-02**: Recibir 6 videos, subir a YouTube, embeber en posts relevantes
- [ ] **MEDIA-03**: Asignar hero images correctas a los 25 posts y persistir mapping en populate_blog.py

## v3.1 Requirements — SEO Audit Fixes

Requirements derived from SEO audit (2026-03-08, score 74/100).

### Infrastructure

- [ ] **INFRA-01**: www.buceoenelmarrojo.com redirige 301 a buceoenelmarrojo.com (actualmente devuelve 526)
- [ ] **INFRA-02**: Content-Security-Policy header configurado en Next.js (report-only inicialmente)
- [ ] **INFRA-03**: Header x-powered-by deshabilitado en next.config.ts
- [ ] **INFRA-04**: Imagenes optimizadas (/_next/image) cacheadas en Cloudflare edge (no DYNAMIC)

### Schema

- [ ] **SCHEMA-01**: FAQPage schema eliminado de paginas de rutas (restriccion Google agosto 2023)
- [ ] **SCHEMA-02**: Organization schema completado con sameAs (redes sociales), geo coordinates (Hurghada) y datos de contacto
- [ ] **SCHEMA-03**: Course duration en formato ISO 8601 (P5D en vez de "5 dias")
- [ ] **SCHEMA-04**: BlogPosting author incluye propiedad url

### Sitemaps

- [ ] **SMAP-01**: /rutas, /cursos y /experiencias incluidos en el sitemap de pages
- [ ] **SMAP-02**: lastmod del blog usa fecha real de ultima publicacion del CMS (no timestamp de API response)
- [ ] **SMAP-03**: Sitemaps vacios (ofertas, cursos, experiencias) excluidos del sitemap index hasta tener contenido
- [ ] **SMAP-04**: Tags deprecated (priority, changefreq) eliminados de todos los sitemaps

### On-Page

- [ ] **ONPAGE-01**: Homepage incluye og:image y twitter:image meta tags para social sharing
- [ ] **ONPAGE-02**: Texto interno de estrategia eliminado de la web publica

### Performance

- [ ] **PERF-01**: Formato AVIF habilitado en next.config.ts para optimizacion de imagenes
- [ ] **PERF-02**: HeroSection convertido a server component (solo botones CTA como client component)

## v3.2 Requirements — SEO Audit Fixes II

Requirements derived from second SEO audit (2026-03-08, score 57/100).

### Blog SSR

- [x] **SSR-01**: Blog post body content renderiza completo en HTML server-side (no solo headings)
- [x] **SSR-02**: Blog listing solo carga title, excerpt, thumbnail y slug (no body completo) — target <60KB

### Routing

- [x] **ROUTE-01**: /contacto devuelve 200 con formulario funcional (no 404)
- [x] **ROUTE-02**: URLs de blog con tildes en slug redirigen 301 a version ASCII o se corrigen en CMS
- [x] **ROUTE-03**: Footer links a /ofertas y /terminos eliminados (ambos 404)

### Schema

- [x] **SCHEMA-05**: Blog schema mainEntityOfPage.@id usa slug de URL, no slug de CMS
- [x] **SCHEMA-06**: Listing pages /blog/ y /rutas/ incluyen JSON-LD (CollectionPage + BreadcrumbList)
- [x] **SCHEMA-07**: BlogPosting incluye image property (requerido para Article rich results)
- [x] **SCHEMA-08**: Paginas usan schema builders de src/lib/seo/schema/ en vez de construir inline
- [x] **SCHEMA-09**: Autor estandarizado con mismo nombre en todos los BlogPosting

### Performance

- [x] **PERF-03**: /rutas sin force-dynamic, cacheable con ISR (eliminar export const dynamic)
- [x] **PERF-04**: /blog listing page con canonical tag correcto
- [x] **PERF-05**: /blog title y meta description reflejan contenido de blog (no centro de buceo)

### Cleanup

- [x] **CLEAN-01**: Notas internas de marketing eliminadas del contenido publico visible
- [x] **CLEAN-02**: robots.txt User-agent blocks deduplicados (eliminar duplicado de Cloudflare)
- [x] **CLEAN-03**: Lastmod presente en sitemaps de rutas y pages (derivado de CMS o fecha fija)

## Future Requirements

### Contenido SEO (v4.0)

- **SEO-01**: 30 primeras paginas de contenido SEO en clusters
- **SEO-02**: Contenido por pecio/spot con profundidad experta
- **SEO-03**: Comparativas de rutas (Norte vs Brothers, Hurghada vs Sharm)
- **SEO-04**: Contenido de friccion (que llevar, requisitos, certificaciones)

### Monitorizacion (v4.0)

- **MON-01**: Monitorizacion de canibalizacion de keywords

## Out of Scope

| Feature | Reason |
|---------|--------|
| Pasarela de pago / e-commerce | Modelo de captacion de leads, no venta directa |
| WhatsApp bot automatico | Solo captura consentimiento, envio manual por Karlos |
| Double opt-in email | Meta no lo requiere, simplifica el flujo |
| Multi-idioma | Primera fase solo ES |
| CRM dashboard custom | Karlos gestiona leads desde Odoo nativo |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| API-01 | Phase 4 | Complete |
| API-02 | Phase 4 | Complete |
| API-03 | Phase 4 | Complete |
| API-04 | Phase 4 | Pending |
| CRM-01 | Phase 4 | Pending |
| CRM-02 | Phase 4 | Complete |
| CRM-03 | Phase 4 | Complete |
| FORM-01 | Phase 5 | Complete |
| FORM-02 | Phase 5 | Complete |
| FORM-03 | Phase 5 | Complete |
| FORM-04 | Phase 5 | Complete |
| FORM-05 | Phase 5 | Complete |
| LEGAL-01 | Phase 6 | Complete |
| IMG-01 | Phase 7 | Pending |
| IMG-02 | Phase 7 | Complete |
| IMG-03 | Phase 7 | Pending |
| IMG-04 | Phase 7 | Pending |
| DATA-01 | Phase 8 | Complete |
| DATA-02 | Phase 8 | Complete |
| DATA-03 | Phase 8 | Complete |
| DATA-04 | Phase 8 | Complete |
| CMS-01 | Phase 8 | Complete |
| AUDIT-01 | Phase 9 | Pending |
| AUDIT-02 | Phase 9 | Pending |
| AUDIT-03 | Phase 9 | Pending |
| TOOL-01 | Phase 10 | Complete |
| TOOL-02 | Phase 10 | Complete |
| TOOL-03 | Phase 10 | Complete |
| SITE-01 | Phase 11 | Complete |
| SITE-02 | Phase 11 | Complete |
| SITE-03 | Phase 11 | Complete |
| SITE-04 | Phase 11 | Complete |
| TOOL-04 | Phase 11 | Pending |
| TECH-01 | Phase 12 | Complete |
| TECH-02 | Phase 12 | Complete |
| TECH-03 | Phase 12 | Complete |
| TECH-04 | Phase 12 | Pending |
| TECH-05 | Phase 12 | Pending |
| MEDIA-01 | Phase 13 | Blocked |
| MEDIA-02 | Phase 13 | Blocked |
| MEDIA-03 | Phase 13 | Blocked |
| INFRA-01 | Phase 14 | Complete |
| INFRA-02 | Phase 14 | Complete |
| INFRA-03 | Phase 14 | Complete |
| INFRA-04 | Phase 14 | Complete |
| SCHEMA-01 | Phase 15 | Complete |
| SCHEMA-02 | Phase 15 | Complete |
| SCHEMA-03 | Phase 15 | Complete |
| SCHEMA-04 | Phase 15 | Complete |
| SMAP-01 | Phase 16 | Complete |
| SMAP-02 | Phase 16 | Complete |
| SMAP-03 | Phase 16 | Complete |
| SMAP-04 | Phase 16 | Complete |
| ONPAGE-01 | Phase 17 | Complete |
| ONPAGE-02 | Phase 17 | Complete |
| PERF-01 | Phase 17 | Complete |
| PERF-02 | Phase 17 | Complete |
| SSR-01 | Phase 18 | Complete |
| SSR-02 | Phase 18 | Complete |
| ROUTE-01 | Phase 19 | Complete |
| ROUTE-02 | Phase 19 | Complete |
| ROUTE-03 | Phase 19 | Complete |
| SCHEMA-05 | Phase 20 | Complete |
| SCHEMA-06 | Phase 20 | Complete |
| SCHEMA-07 | Phase 20 | Complete |
| SCHEMA-08 | Phase 20 | Complete |
| SCHEMA-09 | Phase 20 | Complete |
| PERF-03 | Phase 21 | Complete |
| PERF-04 | Phase 21 | Complete |
| PERF-05 | Phase 21 | Complete |
| CLEAN-01 | Phase 22 | Complete |
| CLEAN-02 | Phase 22 | Complete |
| CLEAN-03 | Phase 22 | Complete |

**Coverage:**
- v2.0 requirements: 13 total -- mapped: 13
- v2.1 requirements: 12 total -- mapped: 12
- v3.0 requirements: 16 total -- mapped: 16
- v3.1 requirements: 16 total -- mapped: 16
- v3.2 requirements: 16 total -- mapped: 16

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-08 after v3.2 requirements*
