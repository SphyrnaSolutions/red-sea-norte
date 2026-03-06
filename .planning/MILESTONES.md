# Milestones

## v1.0 SEO Infrastructure (Shipped: 2026-03-06)

**Phases completed:** 3 phases, 9 plans
**Files changed:** 59 files, +2636/-1162 lines
**Timeline:** 2026-03-06 (single session)

**Key accomplishments:**
1. Migrated Wagtail data layer from axios to native fetch with ISR caching and pagination
2. Built complete SEO module: JSON-LD schema (TouristTrip, Article, BreadcrumbList), cluster resolver, interlink engine, keyword-to-URL map
3. Extended Wagtail models with ClusterMixin for cluster metadata (cluster_id, role, pillar_slug, primary_keyword)
4. Created reusable SEO article template with heading hierarchy enforcement, ToC, and interlink slots
5. Extracted 10 shared block components from monolithic blog page
6. Redesigned homepage for SEO: server-rendered H1 with target keywords, above-fold CTA, route-first positioning

**Post-delivery fixes:**
- XSS sanitization on CMS HTML rendering (isomorphic-dompurify)
- Pagination loop guard, keyword crash fix, CTA href validation
- Homepage dual-H1 resolved, ToC anchor IDs, breadcrumb URL correction
- FAQPage schema cleanup, SEO module pagination for >100 pages

---

