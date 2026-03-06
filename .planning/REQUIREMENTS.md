# Requirements: Red Sea Norte

**Defined:** 2026-03-06
**Core Value:** Posicionar la web como referencia SEO en español para buceo en el Mar Rojo y convertir tráfico en leads para safaris desde Hurghada.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Technical Foundation

- [x] **TECH-01**: Migrate all Wagtail API calls from axios to native fetch for ISR compatibility
- [x] **TECH-02**: Generate sitemap XML with real lastmod dates from Wagtail page data
- [x] **TECH-03**: Implement pagination for Wagtail API calls to support >20 content items
- [x] **TECH-04**: Remove mock data fallback in production — fail explicitly instead of serving fake content

### SEO Infrastructure

- [ ] **SEO-01**: Generate page-specific JSON-LD schema markup (TouristTrip, Article, FAQPage, BreadcrumbList) via schema-dts
- [ ] **SEO-02**: Build cluster resolver that maps pages to pillar-satellite relationships and generates cluster navigation
- [ ] **SEO-03**: Build interlink engine that computes related content blocks and contextual links from cluster topology
- [ ] **SEO-04**: Create and enforce keyword-to-URL map to prevent cannibalization across all pages
- [ ] **SEO-05**: Implement dynamic meta tags via generateMetadata() with canonical URLs and Open Graph
- [ ] **SEO-06**: Implement breadcrumbs component with BreadcrumbList schema markup

### Content Architecture

- [ ] **CONT-01**: Extend Wagtail page models for specific content types: routes, wrecks, dive spots, guides, comparison pages
- [ ] **CONT-02**: Add cluster metadata fields to Wagtail models (cluster_id, role, pillar_slug, schema_type, related_pages)
- [ ] **CONT-03**: Build reusable SEO article template with standard H1/H2/H3 structure, meta fields, and interlink slots
- [ ] **CONT-04**: Redesign homepage for SEO optimization (H1 with target keywords, visible lead capture CTA, route-first positioning)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Lead Capture

- **LEAD-01**: Connect contact/booking forms to Odoo CRM via Server Actions
- **LEAD-02**: Track lead source metadata (page, cluster, CTA position)
- **LEAD-03**: Add WhatsApp CTA button as secondary conversion path

### Content Production

- **PROD-01**: Create 30 SEO pages across 5 clusters (vida a bordo, rutas, pecios, destinos, logística)
- **PROD-02**: Write 1500+ unique words per wreck/spot page with expert-level content
- **PROD-03**: Create comparison pages (Ruta Norte vs Brothers, Hurghada vs Sharm)
- **PROD-04**: Create "friction" content pages (qué llevar, requisitos, seguridad, certificaciones)
- **PROD-05**: Scale to 60 total pages based on GSC performance data

### Optimization

- **OPT-01**: Implement on-demand ISR via Wagtail webhook on content publish
- **OPT-02**: Cannibalization monitoring dashboard
- **OPT-03**: Core Web Vitals optimization pass

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multi-language (EN) | Spanish-only for now, less competition |
| E-commerce / payments | Lead capture model, not direct sales |
| Mobile app | Responsive web is sufficient |
| Generic blog | All content follows SEO cluster strategy |
| Real-time chat | Complexity vs value for lead gen |
| User accounts / login | No user-facing auth needed |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TECH-01 | Phase 1 | Complete |
| TECH-02 | Phase 1 | Complete |
| TECH-03 | Phase 1 | Complete |
| TECH-04 | Phase 1 | Complete |
| SEO-01 | Phase 2 | Pending |
| SEO-02 | Phase 2 | Pending |
| SEO-03 | Phase 2 | Pending |
| SEO-04 | Phase 2 | Pending |
| SEO-05 | Phase 2 | Pending |
| SEO-06 | Phase 2 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-06 after roadmap creation*
