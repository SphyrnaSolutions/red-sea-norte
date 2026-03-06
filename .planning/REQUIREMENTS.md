# Requirements: Red Sea Norte

**Defined:** 2026-03-06
**Core Value:** Convertir trafico SEO en leads cualificados para safaris de buceo via Odoo CRM

## v2.0 Requirements

Requirements for lead capture integration with Odoo CRM.

### Formulario

- [ ] **FORM-01**: Formulario muestra campos: nombre, email, telefono, certificacion, mes preferido
- [ ] **FORM-02**: Checkbox de consentimiento WhatsApp con texto legal compliant con Meta + GDPR
- [ ] **FORM-03**: Link a politica de privacidad visible junto al checkbox
- [ ] **FORM-04**: Validacion client-side de campos obligatorios (nombre, email, telefono, consent)
- [ ] **FORM-05**: Feedback visual al usuario: loading, exito, error

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

- [ ] **LEGAL-01**: Pagina de politica de privacidad con tratamiento de datos y WhatsApp marketing

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
| FORM-01 | Phase 5 | Pending |
| FORM-02 | Phase 5 | Pending |
| FORM-03 | Phase 5 | Pending |
| FORM-04 | Phase 5 | Pending |
| FORM-05 | Phase 5 | Pending |
| LEGAL-01 | Phase 6 | Pending |

**Coverage:**
- v2.0 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-06 after milestone v2.0 definition*
