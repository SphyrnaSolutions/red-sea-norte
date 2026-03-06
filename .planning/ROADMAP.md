# Roadmap: Red Sea Norte

## Milestones

- v1.0 SEO Infrastructure -- Phases 1-3 (shipped 2026-03-06)
- v2.0 Lead Capture -- Phases 4-6

## Phases

<details>
<summary>v1.0 SEO Infrastructure (Phases 1-3) -- SHIPPED 2026-03-06</summary>

- [x] Phase 1: Technical Foundation (2/2 plans) -- completed 2026-03-06
- [x] Phase 2: SEO Content Pipeline (4/4 plans) -- completed 2026-03-06
- [x] Phase 3: Page Templates and Homepage (3/3 plans) -- completed 2026-03-06

Full details: .planning/milestones/v1.0-ROADMAP.md

</details>

### v2.0 Lead Capture

#### Phase 4: Odoo API Integration

**Goal:** Backend que conecta Next.js con Odoo CRM para crear leads desde el formulario web.

**Requirements:** API-01, API-02, API-03, API-04, CRM-01, CRM-02, CRM-03

**Success criteria:**
1. POST /api/lead con datos validos crea un crm.lead en Odoo con todos los campos mapeados
2. Datos invalidos devuelven error 400 con mensaje descriptivo
3. Rate limiting bloquea mas de 5 requests/minuto por IP
4. Credenciales Odoo en env vars server-side (ODOO_URL, ODOO_DB, ODOO_API_KEY)
5. utm.source "Web buceoenelmarrojo.com" creada en Odoo
6. Consentimiento WhatsApp + timestamp guardado en el lead

#### Phase 5: Form + Consent UX

**Goal:** Formulario de la homepage completo con validacion, consent WhatsApp y feedback visual.

**Requirements:** FORM-01, FORM-02, FORM-03, FORM-04, FORM-05

**Success criteria:**
1. Form muestra: nombre, email, telefono, certificacion, mes preferido
2. Checkbox consent WhatsApp con texto Meta + GDPR compliant
3. Link a politica de privacidad visible junto al checkbox
4. Validacion client-side impide envio sin campos obligatorios
5. Estados visuales: idle, loading (spinner), success (mensaje), error (mensaje)

#### Phase 6: Legal + Deploy

**Goal:** Pagina de politica de privacidad y verificacion del flujo completo en produccion.

**Requirements:** LEGAL-01

**Success criteria:**
1. /politica-de-privacidad renderiza pagina con tratamiento de datos y WhatsApp marketing
2. Env vars de Odoo configuradas en Dokploy (hardcoded en Dockerfile o runtime)
3. Flujo E2E funciona en buceoenelmarrojo.com: form -> API -> lead aparece en Odoo

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Technical Foundation | v1.0 | 2/2 | Complete | 2026-03-06 |
| 2. SEO Content Pipeline | v1.0 | 4/4 | Complete | 2026-03-06 |
| 3. Page Templates and Homepage | v1.0 | 3/3 | Complete | 2026-03-06 |
| 4. Odoo API Integration | v2.0 | 0/? | Pending | - |
| 5. Form + Consent UX | v2.0 | 0/? | Pending | - |
| 6. Legal + Deploy | v2.0 | 0/? | Pending | - |
