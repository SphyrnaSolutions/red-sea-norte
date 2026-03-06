# Roadmap: Red Sea Norte

## Overview

Red Sea Norte is a brownfield Next.js + Wagtail site that needs to evolve from a marketing landing page into a cluster-based SEO authority site. The v1 roadmap fixes critical technical debt in the data layer, builds the SEO content pipeline (cluster resolution, interlinking, schema markup), and delivers reusable page templates with an optimized homepage. Lead capture (Odoo CRM) and content production (30-60 pages) are deferred to v2 -- the pipeline must be solid before scaling content.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Technical Foundation** - Fix data layer reliability: fetch migration, sitemap accuracy, pagination, production error handling
- [ ] **Phase 2: SEO Content Pipeline** - Build cluster-aware SEO infrastructure: Wagtail models, cluster resolver, interlink engine, schema markup, breadcrumbs
- [ ] **Phase 3: Page Templates and Homepage** - Deliver reusable SEO article template and optimized homepage that consume the pipeline

## Phase Details

### Phase 1: Technical Foundation
**Goal**: The Wagtail data layer is production-reliable with proper ISR caching, accurate sitemaps, and safe error handling -- so every page built on top works correctly from day one
**Depends on**: Nothing (first phase)
**Requirements**: TECH-01, TECH-02, TECH-03, TECH-04
**Success Criteria** (what must be TRUE):
  1. All Wagtail API calls use native fetch with Next.js cache/revalidation tags -- no axios in the data layer
  2. The XML sitemap reflects real lastmod dates from Wagtail page data, not hardcoded `new Date()`
  3. Pages with more than 20 content items load all items correctly via paginated API calls
  4. In production mode, a missing Wagtail response returns an error page -- never silently serves mock/fallback data
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md -- Rewrite Wagtail client (axios to fetch), add pagination, production-safe fallback config
- [x] 01-02-PLAN.md -- Simplify data layer (remove unstable_cache), sitemap with real dates, uninstall axios

### Phase 2: SEO Content Pipeline
**Goal**: Every page in the site can automatically resolve its cluster relationships, generate structured data, compute interlinks, and render breadcrumbs -- the shared SEO infrastructure that all content pages consume
**Depends on**: Phase 1
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, CONT-01, CONT-02
**Success Criteria** (what must be TRUE):
  1. Any page served by the site includes correct JSON-LD schema markup matching its content type (TouristTrip, Article, FAQPage, or BreadcrumbList)
  2. Given a page slug, the cluster resolver returns its pillar, siblings, and satellite pages -- enabling automatic cluster navigation UI
  3. Each page displays a "related content" block and contextual interlinks computed from cluster topology, not hardcoded
  4. A keyword-to-URL map exists and is enforced -- creating a page with a duplicate primary keyword is caught before publish
  5. Every page renders dynamic meta tags (title, description, canonical URL, Open Graph) via generateMetadata() and visual breadcrumbs with BreadcrumbList schema
**Plans**: 4 plans

Plans:
- [ ] 02-01-PLAN.md -- Wagtail ClusterMixin + model extensions + TypeScript type updates
- [ ] 02-02-PLAN.md -- JSON-LD schema generators (schema-dts) + shared metadata helper + JsonLd component
- [ ] 02-03-PLAN.md -- Cluster resolver + Breadcrumbs component with BreadcrumbList schema
- [ ] 02-04-PLAN.md -- Interlink engine + keyword map + refactor pages to consume shared SEO utilities

### Phase 3: Page Templates and Homepage
**Goal**: A reusable SEO article template and an optimized homepage are ready so that content production (v2) can begin immediately without per-page engineering work
**Depends on**: Phase 2
**Requirements**: CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. The SEO article template enforces standard H1/H2/H3 structure with meta fields and interlink slots -- new content pages inherit SEO best practices automatically
  2. The homepage displays an H1 containing target keywords, a visible lead capture CTA above the fold, and route-first content positioning
  3. A new content page can be created in Wagtail and rendered on the frontend using the template with zero custom frontend code
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md -- Extract block components from blog page into shared src/components/blocks/
- [ ] 03-02-PLAN.md -- Build SEOArticleTemplate with heading hierarchy, interlink slots, and Phase 2 integration
- [ ] 03-03-PLAN.md -- Redesign homepage for SEO (server-rendered H1, above-fold CTA, route-first positioning)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Technical Foundation | 2/2 | Complete | 2026-03-06 |
| 2. SEO Content Pipeline | 0/4 | Not started | - |
| 3. Page Templates and Homepage | 0/3 | Not started | - |
