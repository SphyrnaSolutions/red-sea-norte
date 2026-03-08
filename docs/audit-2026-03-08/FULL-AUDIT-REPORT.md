# SEO Audit Report — buceoenelmarrojo.com

**Date**: 2026-03-08
**Previous audit score**: 74/100 (v3.0)

---

## Executive Summary

### Overall SEO Health Score: 58/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 71 | 17.8 |
| Content Quality | 25% | 38 | 9.5 |
| On-Page SEO | 20% | 60 | 12.0 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance (CWV) | 10% | 65 | 6.5 |
| Images | 5% | 80 | 4.0 |
| AI Search Readiness | 5% | 30 | 1.5 |
| **Total** | **100%** | | **56.8 ≈ 57** |

**Score dropped from 74 to 57** — primarily due to the discovery that **blog post body content is invisible to search engines** (SSR renders only headings, not body text). This was not caught in the previous audit.

### Top 5 Critical Issues

1. **Blog body content missing from SSR** — All 24 posts render only headings in server HTML. Wagtail sends full content (29 blocks per post) but `RichTextBlock` output doesn't appear in the RSC payload. This nullifies all blog SEO value.
2. **`/contacto` returns 404** — Main conversion page is broken.
3. **Blog schema URL mismatch** — `mainEntityOfPage.@id` uses CMS slug instead of URL slug (e.g., schema points to `/blog/abu-nuhas-cementerio-de-barcos` but actual URL is `/blog/carnatic-abu-nuhas`).
4. **2 blog URLs with accented slugs return 404** — Sitemap lists URLs with `guía` but pages resolve only with `guia` (ASCII).
5. **Blog listing loads 451KB** — 89% is unused RSC payload (full post bodies loaded for a listing page).

### Top 5 Quick Wins

1. Fix `/contacto` 404 — likely a routing or CMS publishing issue
2. Fix accented slug URLs in CMS or add redirects
3. Remove `force-dynamic` from `/rutas/page.tsx` (line 30) to enable caching
4. Add canonical tag to `/blog` listing page
5. Fix `/blog` title/description (currently shows diving center copy, not blog)

---

## Detailed Findings by Category

### 1. Technical SEO (71/100)

**Critical:**
- `/contacto` returns 404
- 2 blog URLs with accented slugs return 404
- `/contacto` missing from pages sitemap

**High:**
- `/blog` listing missing canonical tag
- `/blog` has wrong title ("Centro de Buceo Certificado SSI") and description
- Trailing-slash URLs cause 308 redirects (`/rutas/` → `/rutas`)
- Duplicate `User-agent: *` blocks in robots.txt (Cloudflare + custom)
- Intermittent 500 errors on 5 pages (Wagtail instability)
- CSP header in report-only mode

**Good:**
- Full SSR with React Server Components
- Excellent security headers (HSTS preload, X-Frame-Options, Permissions-Policy)
- Clean redirect chains (HTTP→HTTPS, www→non-www single-hop 301)
- Proper mobile viewport and responsive images
- Hero image preloaded for LCP

### 2. Content Quality (38/100)

**Critical:**
- **Blog posts SSR empty** — Only headings render server-side, body content absent from HTML. Googlebot sees empty articles.
- Placeholder phone `+20 123 456 7890` in footer
- Internal marketing notes published as user-facing content ("enfoque comercial claro", "ruta comercial pensada para...")

**High:**
- E-E-A-T score: 33/100
  - No author bios or first-hand diving narratives
  - No customer reviews/testimonials
  - Fake phone number destroys trust
  - No "About Us" page with team credentials

**Good:**
- Route pages well-structured (1,772–2,036 words each)
- Homepage 858 words with strong commercial messaging
- Accurate diving details (depths, species, dates)
- Good keyword optimization in title tags

### 3. On-Page SEO (60/100)

**Issues:**
- `/blog` title/description mismatch with content
- Missing H1 consistency on some pages
- Internal linking gaps (blog posts don't cross-link to routes)
- Footer links to `/ofertas` and `/terminos` both 404

**Good:**
- Title tags well-optimized on route pages
- Meta descriptions present on key pages
- Heading hierarchy generally clean

### 4. Schema / Structured Data (55/100)

**Critical:**
- Blog schema `mainEntityOfPage.@id` uses CMS slug instead of URL slug
- `/rutas/` and `/blog/` listing pages have ZERO JSON-LD

**High:**
- BlogPosting missing `image` property (required for Article rich results)
- Author name inconsistent across posts (3 different names)
- TouristTrip missing `url` and `provider.url` in production
- Builders exist in `src/lib/seo/schema/` but pages build schema inline, ignoring them

**Good:**
- Organization, WebSite, TouristTrip, BlogPosting, BreadcrumbList all present
- JSON-LD format (not microdata)

### 5. Performance / CWV (65/100)

**Critical:**
- Blog listing 451KB — loads full body of 25 posts, only needs title/excerpt/thumbnail
- `/rutas` has `force-dynamic` — zero caching, every request hits origin
- `_next/image` not cached by Cloudflare (`cf-cache-status: DYNAMIC`)

**Good:**
- TTFB excellent: 50–110ms (Cloudflare CDN + ISR)
- Images served as AVIF with responsive srcset
- Static assets immutable 1-year cache
- Only GTM as third-party (consent-denied defaults)
- DOM under 500 elements
- 4 custom fonts preloaded as WOFF2

### 6. Images (80/100)

**Good:**
- AVIF format with srcset
- Lazy loading on below-fold images
- Hero image preloaded
- Image sitemap present

**Issues:**
- Blog posts missing featured images in schema

### 7. Sitemap (Good architecture)

**Good:**
- Split by content type (blog, rutas, pages)
- Correct XML syntax with image namespace
- Well under size limits

**Issues:**
- 2 blog URLs with accented slugs → 404
- Missing lastmod on rutas and pages sitemaps
- `/contacto` not in sitemap

### 8. AI Search Readiness (30/100)

**Issues:**
- Blog body invisible to crawlers = zero citability
- No FAQ sections with structured Q&A
- No clear "quotable" passages or data tables
- Missing author authority signals

---

## Sitemap Audit Summary

| Sitemap | URLs | Issues |
|---------|------|--------|
| blog | 20 | 2 URLs return 404 (accented slugs) |
| rutas | 5 | No lastmod dates |
| pages | 6 | Missing /contacto, no lastmod |
| **Total** | **31** | |

---

## Priority Action Plan

### P0 — Critical (fix immediately)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 1 | Fix blog SSR — body content must render server-side | All blog SEO value is zero | High |
| 2 | Fix `/contacto` 404 | Conversion page broken | Low |
| 3 | Fix blog schema URL mismatch (use URL slug, not CMS slug) | Wrong canonical in schema | Low |
| 4 | Fix accented slug URLs (CMS or redirect) | 2 posts return 404 | Low |

### P1 — High (fix within 1 week)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 5 | Optimize blog listing — only fetch title/excerpt/thumbnail | 451KB → ~50KB | Medium |
| 6 | Remove `force-dynamic` from `/rutas` | Enable CDN caching | Low |
| 7 | Add Cloudflare cache rule for `_next/image` | Cache optimized images | Low |
| 8 | Add schema to `/blog/` and `/rutas/` listing pages | Rich results eligibility | Medium |
| 9 | Fix `/blog` canonical, title, and description | Correct indexing signals | Low |
| 10 | Add `image` to BlogPosting schema | Article rich results | Low |
| 11 | Remove footer links to /ofertas and /terminos | Eliminate 404 links | Low |
| 12 | Remove trailing-slash redirect pattern | Clean crawl | Medium |

### P2 — Medium (fix within 1 month)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 13 | Use schema builders instead of inline schema | Consistency, completeness | Medium |
| 14 | Standardize author across all posts | E-E-A-T consistency | Low |
| 15 | Add lastmod to rutas and pages sitemaps | Freshness signals | Low |
| 16 | Remove internal marketing notes from published content | Trust | Low |
| 17 | Replace placeholder phone number | Trust signals | Low (needs Karlos) |
| 18 | Deduplicate robots.txt User-agent blocks | Clean crawl directives | Low |
| 19 | Activate CSP (currently report-only) | Security | Medium |

### P3 — Low (backlog / needs content from Karlos)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 20 | Add author bios with diving credentials | E-E-A-T | Needs content |
| 21 | Add customer testimonials/reviews | Trust | Needs content |
| 22 | Create "About Us" page with team | Authority | Needs content |
| 23 | Add FAQ sections to route pages | AI citability | Medium |
| 24 | Cross-link blog posts ↔ route pages | Internal linking | Medium |

---

## Score Comparison

| Category | v3.0 (prev) | v3.1 (now) | Delta |
|----------|-------------|------------|-------|
| Technical SEO | ~75 | 71 | -4 |
| Content Quality | ~62 | 38 | -24 |
| On-Page SEO | ~70 | 60 | -10 |
| Schema | ~80 | 55 | -25 |
| Performance | ~75 | 65 | -10 |
| Images | ~80 | 80 | 0 |
| AI Readiness | ~50 | 30 | -20 |
| **Overall** | **74** | **57** | **-17** |

> Note: The score drop is largely because this audit discovered issues that were present but undetected before (blog SSR empty, schema URL mismatch). The site hasn't regressed — the previous audit was less thorough.
