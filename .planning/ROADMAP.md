# Roadmap: Red Sea Norte

## Milestones

- v1.0 SEO Infrastructure -- Phases 1-3 (shipped 2026-03-06)
- v2.0 Lead Capture -- Phases 4-6 (shipped 2026-03-06)
- v2.1 Real Content -- Phases 7-9 (in progress)

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

### v2.1 Real Content

- [x] **Phase 7: Real Images** - Sustituir todas las imagenes stock por fotos reales optimizadas del barco y buceo
- [ ] **Phase 8: Wagtail CMS Migration** - Migrar contenido de mock-data a Wagtail CMS con datos reales del producto
- [ ] **Phase 9: Blog Audit** - Auditar y corregir los 25 blog posts contra data real del producto

## Phase Details

### Phase 7: Real Images
**Goal**: La web muestra fotos reales del barco M/Y Dolce Vita, cabinas, vida marina y spots de buceo en lugar de stock de Unsplash
**Depends on**: Nothing (first phase of v2.1)
**Requirements**: IMG-01, IMG-02, IMG-03, IMG-04
**Success Criteria** (what must be TRUE):
  1. Todas las URLs de Unsplash en images.ts y componentes estan sustituidas por rutas locales a fotos reales en public/images/
  2. Las 33 fotos reales estan copiadas en el proyecto y servidas via next/image con optimizacion automatica (WebP/AVIF, resize)
  3. Cada imagen tiene alt text descriptivo en espanol con keywords relevantes (ej: "Camarote doble del M/Y Dolce Vita con ventana al mar")
  4. Las imagenes se cargan con srcset/sizes responsivos y lazy loading en viewports movil, tablet y desktop
**Plans**: 2 plans

Plans:
- [ ] 07-01-PLAN.md -- Copy and organize 33 real photos into public/images/, update images.ts with local paths, clean next.config.ts
- [ ] 07-02-PLAN.md -- Replace all Unsplash URLs with real image paths, add SEO alt text, configure responsive sizes

### Phase 8: Wagtail CMS Migration
**Goal**: Migrar todo el contenido de mock-data al CMS Wagtail con datos reales del producto, y conectar el frontend a la API de Wagtail
**Depends on**: Phase 7 (images uploaded to Wagtail)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, CMS-01
**Success Criteria** (what must be TRUE):
  1. Modelos Wagtail creados para HomePage, RutaPage, ExperienciaPage, CursoPage (informativa), OfertaPage con todos los campos necesarios
  2. Contenido real del producto migrado a Wagtail: datos verificados del barco, rutas con precios, spots, formacion, FAQs
  3. Frontend consume datos de la API de Wagtail en vez de mock-data files para todas las paginas de contenido
  4. Las 33 imagenes en Wagtail referenciadas correctamente desde las paginas CMS
  5. Mock-data files eliminados o convertidos en fallback para desarrollo sin CMS
**Plans**: 3 plans

Plans:
- [ ] 08-01-PLAN.md -- Expand RutaPage model with missing fields, update mock-data with real product data
- [ ] 08-02-PLAN.md -- Create management command to populate 5 real routes in Wagtail CMS
- [ ] 08-03-PLAN.md -- Fix frontend mappers/types to match actual Wagtail model, enable CMS-first data loading

### Phase 9: Blog Audit
**Goal**: Los 25 blog posts existentes son precisos respecto a los datos reales del producto y no contienen informacion inventada o contradictoria
**Depends on**: Phase 7 (images available), Phase 8 (real data established as source of truth)
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03
**Success Criteria** (what must be TRUE):
  1. Los 25 posts han sido revisados contra PRODUCT-DATA.md y cada dato mencionado (barco, rutas, precios, formacion) coincide con la realidad
  2. Datos incorrectos o inventados en posts existentes estan corregidos (nombres de rutas, precios, especificaciones del barco, spots)
  3. Posts identificados como thin content (<800 palabras o sin valor diferencial) estan marcados con recomendacion: reescribir, fusionar o eliminar
**Plans**: TBD

Plans:
- [ ] 09-01: Audit all 25 blog posts against PRODUCT-DATA.md, fix inaccuracies, flag thin content

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
| 8. Wagtail CMS Migration | v2.1 | 0/3 | Planning | - |
| 9. Blog Audit | v2.1 | 0/1 | Not started | - |
