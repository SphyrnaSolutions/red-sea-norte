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

- [ ] **TOOL-01**: Dar de alta y verificar buceoenelmarrojo.com en Google Search Console
- [ ] **TOOL-02**: Dar de alta y verificar buceoenelmarrojo.com en Bing Webmaster Tools
- [ ] **TOOL-03**: Crear propiedad GA4 para buceoenelmarrojo.com e instalar tag en el frontend
- [ ] **TOOL-04**: Enviar sitemaps divididos a GSC y Bing

### Sitemaps & Indexing

- [ ] **SITE-01**: Convertir sitemap unico en sitemap index con sitemaps separados por categoria (blog, rutas, ofertas, cursos, experiencias, pages)
- [ ] **SITE-02**: Configurar 301 redirects para 5 posts merged (giannis-d, dunraven, carnatic, camarotes-comida-wifi, shark-yolanda)
- [ ] **SITE-03**: Excluir posts merged/redirect del sitemap
- [ ] **SITE-04**: Crear sitemap de imagenes para indexacion de fotos en Google Images

### Technical SEO

- [ ] **TECH-01**: Webhook Wagtail para ISR on-demand al publicar contenido
- [ ] **TECH-02**: Self-host fuentes Satoshi/Clash Display con next/font/local (eliminar FOUT)
- [ ] **TECH-03**: Eliminar draftMode() de fetchers para habilitar ISR real (homepage y blog)
- [ ] **TECH-04**: Core Web Vitals optimization pass (LCP, CLS, INP)
- [ ] **TECH-05**: Configurar Cloudflare proxy para cache, compresion y rendimiento

### Content de Karlos (bloqueado por entrega)

- [ ] **MEDIA-01**: Recibir 31-50 fotos de pecios, spots y formacion de Karlos, optimizar y subir a Wagtail CMS
- [ ] **MEDIA-02**: Recibir 6 videos, subir a YouTube, embeber en posts relevantes
- [ ] **MEDIA-03**: Asignar hero images correctas a los 25 posts y persistir mapping en populate_blog.py

## Future Requirements

### Contenido SEO (v3.1)

- **CONT-01**: 30 primeras paginas de contenido SEO en clusters
- **CONT-02**: Contenido por pecio/spot con profundidad experta
- **CONT-03**: Comparativas de rutas (Norte vs Brothers, Hurghada vs Sharm)
- **CONT-04**: Contenido de friccion (que llevar, requisitos, certificaciones)

### Monitorizacion (v3.1)

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

**Coverage:**
- v2.0 requirements: 13 total -- mapped: 13
- v2.1 requirements: 12 total -- mapped: 12
- v3.0 requirements: 16 total -- mapped: 0 (pending roadmap)

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-08 after v3.0 requirements definition*
