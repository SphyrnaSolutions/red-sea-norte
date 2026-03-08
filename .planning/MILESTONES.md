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

## v2.0 Lead Capture (Shipped: 2026-03-06)

**Phases completed:** 3 phases (4-6)
**Key accomplishments:**
1. POST /api/lead endpoint with Odoo CRM integration via XML-RPC
2. Contact form with WhatsApp consent (GDPR + Meta compliant)
3. Privacy policy page

---

## v2.1 Real Content (Shipped: 2026-03-07)

**Phases completed:** 3 phases (7-9)
**Key accomplishments:**
1. 33 real photos uploaded to Wagtail CMS
2. 5 real routes with verified pricing and itineraries
3. 25 blog posts audited (4 factual errors fixed, 13 rewritten)

---

## v3.0 SEO Operations (Shipped: 2026-03-08)

**Phases completed:** 3 phases (10-12), phase 13 blocked
**Key accomplishments:**
1. GSC, Bing Webmaster Tools, GA4 with GDPR cookie consent (Consent Mode v2)
2. Sitemap index with 7 per-category sitemaps + 301 redirects for 5 merged posts
3. Self-hosted fonts (Satoshi, Clash Display) via next/font/local
4. ISR on-demand revalidation via Wagtail webhook
5. Cloudflare proxy: Origin Certificate (15yr), SSL Full strict, Cache Rules, Brotli, HTTP/3
6. Phase 13 (Content Media) blocked pending Karlos delivering photos/videos

---

## v3.1 SEO Audit Fixes (Shipped: 2026-03-08)

**Phases completed:** 4 phases (14-17), all parallelizable
**Audit score:** 74/100 (pre-fix)
**Key accomplishments:**
1. www 301 redirect via Cloudflare, CSP header, x-powered-by disabled
2. FAQPage schema removed from routes, Organization schema completed, Course duration ISO 8601
3. Sitemaps: missing pages added, lastmod from CMS, empty sitemaps excluded, deprecated tags removed
4. og:image/twitter:image on homepage, internal strategy text removed, AVIF enabled, HeroSection server component

---

## v3.2 SEO Audit Fixes II (Shipped: 2026-03-08)

**Phases completed:** 5 phases (18-22)
**Audit score:** 57/100 → ~79/100
**Key accomplishments:**
1. Blog SSR fix -- body content now renders in server HTML (rich_text normalization in mapStreamField)
2. /contacto page created with InlineLeadSection, accented slug 301 redirects
3. Schema consolidation -- all pages use centralized builders, BlogPosting with image/dates
4. Performance -- /rutas ISR (removed force-dynamic), /blog metadata + canonical
5. Cleanup -- internal marketing notes removed, lastmod in sitemaps, robots.txt documented
6. GA4 Dockerfile fix -- NEXT_PUBLIC_GA_MEASUREMENT_ID as build ARG
7. Cookie management button in footer (GDPR compliance)

---
