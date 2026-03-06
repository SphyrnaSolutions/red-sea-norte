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

- [ ] **DATA-01**: Datos reales del barco M/Y Dolce Vita en homepage (40m, 12 camarotes, 24 pax, 4 cubiertas)
- [ ] **DATA-02**: 5 rutas reales con nombre, precio desde, spots principales y descripcion
- [ ] **DATA-03**: Formacion incluida real: Advanced SSI + 4 especialidades gratis, nitrox gratis
- [ ] **DATA-04**: FAQs reales del producto extraidas de viajeskarlossimon.com

### Audit de Posts

- [ ] **AUDIT-01**: Revisar los 25 blog posts contra data real del producto (barco, rutas, precios)
- [ ] **AUDIT-02**: Corregir datos incorrectos o inventados en posts existentes
- [ ] **AUDIT-03**: Identificar posts thin content para reescribir o fusionar

## Future Requirements

### Contenido SEO (v3.0)

- **CONT-01**: 30 primeras paginas de contenido SEO en clusters
- **CONT-02**: Contenido por pecio/spot con profundidad experta
- **CONT-03**: Comparativas de rutas (Norte vs Brothers, Hurghada vs Sharm)
- **CONT-04**: Contenido de friccion (que llevar, requisitos, certificaciones)

### Tecnico (v3.0)

- **TECH-01**: Webhook Wagtail para ISR on-demand al publicar contenido
- **TECH-02**: Fix Wagtail 500s durante Docker build
- **TECH-03**: Core Web Vitals optimization pass
- **TECH-04**: Monitorizacion de canibalizacion de keywords
- **TECH-05**: Eliminar draftMode() de fetchers para habilitar ISR real (homepage y blog)
- **TECH-06**: Self-host fuentes Satoshi/Clash Display con next/font/local (eliminar FOUT)

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
| DATA-01 | Phase 8 | Pending |
| DATA-02 | Phase 8 | Pending |
| DATA-03 | Phase 8 | Pending |
| DATA-04 | Phase 8 | Pending |
| AUDIT-01 | Phase 9 | Pending |
| AUDIT-02 | Phase 9 | Pending |
| AUDIT-03 | Phase 9 | Pending |

**Coverage:**
- v2.0 requirements: 13 total -- mapped: 13
- v2.1 requirements: 11 total -- mapped: 11

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-07 after v2.1 roadmap creation*
