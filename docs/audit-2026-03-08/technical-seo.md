# Technical SEO Audit - buceoenelmarrojo.com

**Date**: 2026-03-08
**Auditor**: Claude Opus 4.6 (automated)
**Overall Score**: 71/100

---

## Executive Summary

The site has solid fundamentals (SSR with Next.js 16, proper HSTS, structured data, image sitemaps) but suffers from several critical and high-priority issues: 2 blog URLs in the sitemap return 404 due to accented characters in slugs, the /contacto page returns a real 404, the /blog listing page is missing a canonical tag, and trailing-slash URLs trigger 308 redirects rather than being the canonical form. There are also two duplicate `User-agent: *` blocks in robots.txt and intermittent 500 errors on some pages.

---

## Issues by Priority

### CRITICAL

| # | Issue | Category | Details |
|---|-------|----------|---------|
| C1 | 2 blog URLs in sitemap return 404 | Crawlability | `ss-thistlegorm-guia-completa` and `ras-mohammed-guia-completa` -- the sitemap contains accented characters (`guia` with tilde) but the actual pages are served at the non-accented slug. Googlebot will crawl these and log soft-404s. |
| C2 | /contacto returns HTTP 404 | Crawlability | `https://buceoenelmarrojo.com/contacto` returns a 404 page with `<meta name="robots" content="noindex"/>`. This is a key conversion page linked from the site navigation. |
| C3 | /contacto missing from sitemap | Indexability | The pages sitemap lists /cursos and /experiencias but not /contacto. Even once the 404 is fixed, it won't be discovered via sitemap. |

### HIGH

| # | Issue | Category | Details |
|---|-------|----------|---------|
| H1 | /blog listing page missing canonical tag | Indexability | `https://buceoenelmarrojo.com/blog` has no `<link rel="canonical">` in the HTML. All other key pages have one. |
| H2 | /blog listing has wrong title and description | Indexability | Title is "Red Sea Diving - Centro de Buceo Certificado SSI en el Mar Rojo" which is generic/incorrect for a blog listing. Description mentions "Cursos de buceo SSI" -- not blog content. |
| H3 | Trailing-slash URLs cause 308 redirects | URL Structure | `/rutas/`, `/blog/`, `/contacto/` all 308 redirect to the non-slash version. This adds an extra hop for any crawler or user following trailing-slash links. Sitemap correctly uses non-trailing-slash, but internal links or external links with trailing slashes will trigger redirects. |
| H4 | Duplicate User-agent: * blocks in robots.txt | Crawlability | Line 28 (Cloudflare managed) and line 58 (custom) both declare `User-agent: *`. Per the robots.txt spec, crawlers may only follow the most specific matching block, so one block's directives could be ignored. The Cloudflare block has `Allow: /` with no Disallow, while the custom block adds `Disallow: /api/` and `Disallow: /_next/`. |
| H5 | Intermittent 500 errors on route/blog pages | Crawlability | During the audit, 5 pages returned HTTP 500 (norte-pecios, norte-tiran, advanced-a-bordo, checklist-vida-a-bordo, rosalie-moller). These resolved on retry, suggesting a backend instability issue (possibly Wagtail API timeouts). Googlebot hitting 500s will reduce crawl rate and eventually deindex pages. |
| H6 | CSP is report-only, not enforced | Security | The `Content-Security-Policy-Report-Only` header is present but no enforced `Content-Security-Policy` header exists. This provides monitoring but zero protection against XSS/injection. |

### MEDIUM

| # | Issue | Category | Details |
|---|-------|----------|---------|
| M1 | No hreflang tags | Indexability | Site is Spanish-only with no hreflang declaration. While not strictly required for a single-language site, adding `<link rel="alternate" hreflang="es" href="..."/>` with an `x-default` would be best practice for a site targeting Spanish speakers globally. |
| M2 | Images use fill layout without explicit width/height | CWV (CLS) | All images use Next.js `data-nimg="fill"` with absolute positioning. While this avoids CLS when the container has a fixed aspect ratio, it depends on CSS loading. If CSS is delayed, containers may collapse briefly. 9 of 9 images on the homepage lack explicit width/height attributes. |
| M3 | LCP image preload uses imageSrcSet without fetchPriority="high" | CWV (LCP) | The hero image is preloaded via `<link rel="preload" as="image" imageSrcSet="...">` which is good, but the corresponding `<img>` tag does not have `fetchPriority="high"`. Adding it would signal the browser to prioritize this resource. |
| M4 | Font preloads (4 fonts) may delay LCP | CWV (LCP) | 4 WOFF2 fonts are preloaded in the head (Satoshi, Satoshi Italic, Clash Display, JetBrains Mono). While preloading prevents FOUT, it competes for bandwidth with the LCP image. Consider whether all 4 are truly above-the-fold. |
| M5 | Sitemap blog entries all share same lastmod date | Indexability | All 20 blog URLs have `<lastmod>2026-03-08</lastmod>`. This signals to Google that all content changed today, which reduces the signal value of lastmod. Use actual modification dates per post. |
| M6 | Sitemap rutas entries missing lastmod | Indexability | The rutas sub-sitemap has no `<lastmod>` on any URL. Adding modification dates helps crawlers prioritize fresh content. |

### LOW

| # | Issue | Category | Details |
|---|-------|----------|---------|
| L1 | No preconnect hints for external origins | Performance | The page loads resources from `back.redsea.sphyrnasolutions.com` (CMS images) and `www.googletagmanager.com` but has no `<link rel="preconnect">` for these origins. |
| L2 | Disallow /_next/ in robots.txt | Crawlability | `/_next/` is blocked in robots.txt. This is fine for JS/CSS chunks but note that `/_next/image` (the image optimization endpoint) is also blocked. If Google tries to render-crawl, it may not see optimized images. However, since the site is SSR and images have full src attributes, this is low risk. |
| L3 | No X-Robots-Tag HTTP header | Indexability | Pages rely solely on HTML meta robots. Adding `X-Robots-Tag` as an HTTP header provides an additional signal, especially for non-HTML resources. Low priority since HTML pages already have proper meta tags. |
| L4 | BlogPosting author is organization name | Structured Data | Blog posts use `"author": {"@type": "Person", "name": "Red Sea Diving"}`. "Red Sea Diving" is not a person -- should be `@type: Organization` or use an actual author name. Google's guidelines prefer real author attribution. |

---

## Category Analysis

### 1. Crawlability -- FAIL (60/100)

**robots.txt**
- Present and served with 200 status
- Cloudflare AI bot management active (blocks Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Google-Extended, GPTBot, meta-externalagent)
- Content-Signal header: `search=yes, ai-train=no` (EU DSM Article 4 compliance)
- ISSUE: Duplicate `User-agent: *` blocks (Cloudflare managed + custom)
- Custom directives: `Disallow: /api/`, `Disallow: /_next/`
- Sitemap declaration present

**Sitemaps**
- Sitemap index at `/sitemap.xml` with 4 sub-sitemaps: blog (20 URLs), rutas (5 URLs), pages (6 URLs), images (5 URLs)
- Image sitemap present and well-formed
- 2 blog URLs return 404 (accented character issue)
- /contacto missing from pages sitemap

**Status Codes**
- Homepage: 200
- /rutas: 200
- /blog: 200
- /contacto: 404 (CRITICAL)
- Intermittent 500s on some pages

### 2. Indexability -- PASS with issues (65/100)

**Canonical Tags**
- Homepage: `<link rel="canonical" href="https://buceoenelmarrojo.com"/>` -- PASS
- /rutas: `<link rel="canonical" href="https://buceoenelmarrojo.com/rutas"/>` -- PASS
- /blog: Missing canonical -- FAIL
- /contacto: 404 page, N/A
- Blog detail: Canonical present and correct (verified on `/blog/ruta-norte-vs-ruta-sur-mar-rojo`)
- Route detail: Canonical present and correct (verified on `/rutas/norte-pecios`)

**Meta Descriptions**
- Homepage: Present (155 chars) -- PASS
- /rutas: Present (161 chars) -- PASS
- /blog: Present but incorrect content (describes cursos, not blog) -- FAIL
- Blog detail: Present and relevant -- PASS

**Structured Data**
- Homepage: Organization + WebSite schemas -- PASS
- Route detail: TouristTrip + BreadcrumbList schemas -- PASS
- Blog detail: BlogPosting + BreadcrumbList schemas -- PASS (minor: author type issue)
- /rutas listing: No structured data found
- /blog listing: No structured data found

### 3. Security -- PASS (85/100)

| Header | Value | Status |
|--------|-------|--------|
| HTTPS | Enforced (HTTP 301 -> HTTPS) | PASS |
| HSTS | `max-age=63072000; includeSubDomains; preload` (2 years) | PASS |
| X-Content-Type-Options | `nosniff` | PASS |
| X-Frame-Options | `SAMEORIGIN` | PASS |
| Referrer-Policy | `origin-when-cross-origin` | PASS |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | PASS |
| X-DNS-Prefetch-Control | `on` | PASS |
| CSP | Report-only mode | WARN |
| X-XSS-Protection | Missing | INFO (deprecated header, not needed with CSP) |

### 4. URL Structure -- PASS with issues (75/100)

- Clean, semantic URLs with no query parameters on public pages
- Proper hierarchy: `/rutas/{slug}`, `/blog/{slug}`
- Spanish-language slugs (good for target audience)
- Non-trailing-slash is canonical form (consistent across sitemap)
- ISSUE: Trailing-slash URLs return 308 instead of 301 (308 is technically correct for permanent redirect but less universally understood)
- ISSUE: 2 slugs contain accented characters in sitemap but resolve without accents
- HTTP -> HTTPS: Single 301 redirect (PASS)
- www -> non-www: Single 301 redirect (PASS)

### 5. Mobile-Friendliness -- PASS (90/100)

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` -- PASS
- Responsive images with `srcSet` and `sizes` attributes -- PASS
- Next.js Image component with responsive breakpoints (384w to 3840w) -- PASS
- `<html lang="es">` set correctly -- PASS
- No horizontal scroll issues detected from HTML analysis
- Font loading: 4 fonts preloaded (potential render delay but ensures consistent display)

### 6. Core Web Vitals (Source Analysis) -- PASS with risks (75/100)

**LCP (Largest Contentful Paint)**
- Hero image is preloaded via `<link rel="preload" as="image" imageSrcSet="...">` -- GOOD
- Hero image uses srcSet with appropriate breakpoints up to 3840w -- GOOD
- 4 font preloads compete for bandwidth -- RISK
- No `fetchPriority="high"` on hero image element -- RISK
- SSR ensures HTML content is available immediately -- GOOD

**INP (Interaction to Next Paint)**
- Next.js 16 with React 19 (concurrent rendering) -- GOOD
- Scripts loaded with `async` attribute -- GOOD
- No heavy client-side JS frameworks detected beyond React -- GOOD
- Client-side interactivity appears minimal (navigation, forms) -- GOOD

**CLS (Cumulative Layout Shift)**
- Images use `data-nimg="fill"` with absolute positioning -- ACCEPTABLE
- No explicit width/height on images (relies on CSS containers) -- RISK
- Fonts are preloaded (reduces FOIT/FOUT shift) -- GOOD
- 1 CSS stylesheet in head (minimal render-blocking CSS) -- GOOD

### 7. Structured Data -- PASS (80/100)

**Detected schemas:**
- `Organization` (homepage) -- name, url, logo, address, geo, areaServed, sameAs
- `WebSite` (homepage) -- name, url, description
- `TouristTrip` (route detail) -- name, description, image, itinerary with daily breakdown
- `BreadcrumbList` (route + blog detail) -- proper 3-level hierarchy
- `BlogPosting` (blog detail) -- headline, description, datePublished, dateModified, author, publisher

**Issues:**
- BlogPosting author uses `@type: Person` with organization name
- No `ItemList` schema on /rutas or /blog listing pages
- No `FAQPage` schema (potential opportunity for featured snippets)

### 8. JavaScript Rendering -- PASS (95/100)

- Server-Side Rendering confirmed: Content present in initial HTML response
- `x-nextjs-prerender: 1` header indicates static generation / ISR
- `x-nextjs-cache: HIT` confirms pages are cached at CDN level
- `stale-while-revalidate=31535400` (~1 year) with `s-maxage=600` (10 min) -- excellent caching strategy
- No `__NEXT_DATA__` script tag (using React Server Components / App Router)
- Content is fully indexable without JavaScript execution

---

## Redirect Chain Summary

| From | To | Status | Hops |
|------|----|--------|------|
| `http://buceoenelmarrojo.com/` | `https://buceoenelmarrojo.com/` | 301 | 1 |
| `https://www.buceoenelmarrojo.com/` | `https://buceoenelmarrojo.com/` | 301 | 1 |
| `https://buceoenelmarrojo.com/rutas/` | `https://buceoenelmarrojo.com/rutas` | 308 | 1 |
| `https://buceoenelmarrojo.com/blog/` | `https://buceoenelmarrojo.com/blog` | 308 | 1 |
| `https://buceoenelmarrojo.com/contacto/` | `https://buceoenelmarrojo.com/contacto` | 308 | 1 (then 404) |

No redirect chains longer than 1 hop detected. PASS.

---

## Sitemap Coverage

| Sitemap | URLs | Issues |
|---------|------|--------|
| /sitemap/pages | 6 | Missing /contacto |
| /sitemap/blog | 20 | 2 URLs return 404 (accented slugs) |
| /sitemap/rutas | 5 | No lastmod dates |
| /sitemap/images | 5 | Clean, well-formed |
| **Total** | **36** | |

---

## Recommendations (Prioritized)

### Immediate Actions (This Week)

1. **Fix /contacto 404** -- Either the page was deleted or never created. Restore or create the contact page. This is a core conversion page.

2. **Fix sitemap blog URLs with accented characters** -- The slugs `ss-thistlegorm-guia-completa` and `ras-mohammed-guia-completa` should use ASCII-only slugs in the sitemap (matching the actual URL). Either:
   - Update the CMS to generate ASCII-only slugs, OR
   - Add redirects from the accented URLs to the non-accented versions, OR
   - Update the sitemap generation to output the correct (non-accented) URLs

3. **Add canonical tag to /blog listing** -- Add `<link rel="canonical" href="https://buceoenelmarrojo.com/blog"/>` to the blog listing page.

4. **Fix /blog title and meta description** -- Update to reflect blog content, e.g.:
   - Title: "Blog de Buceo en el Mar Rojo | Red Sea Norte"
   - Description: "Guias, consejos y rutas para tu vida a bordo en el Mar Rojo..."

### Short-Term (Next 2 Weeks)

5. **Merge or deduplicate robots.txt User-agent: * blocks** -- Consolidate into a single `User-agent: *` block that includes both the Cloudflare Content-Signal and the custom Disallow directives.

6. **Investigate intermittent 500 errors** -- Check Wagtail API logs for timeout or connection errors. Consider adding retry logic or a circuit breaker in the Next.js data fetching layer.

7. **Add /contacto to pages sitemap** -- Once the page is restored, ensure the sitemap generator includes it.

8. **Add lastmod to rutas sitemap entries** -- Pull modification dates from the CMS.

9. **Enforce CSP** -- Move from `Content-Security-Policy-Report-Only` to enforced `Content-Security-Policy` after confirming no legitimate resources are blocked.

### Medium-Term (Next Month)

10. **Add fetchPriority="high" to hero image** -- Small change with potential LCP improvement.

11. **Add preconnect hints** for `back.redsea.sphyrnasolutions.com` and `www.googletagmanager.com`.

12. **Add ItemList schema** to /rutas and /blog listing pages for enhanced SERP display.

13. **Fix BlogPosting author @type** -- Change to `@type: Organization` or use a real person name.

14. **Review font preload strategy** -- Consider if JetBrains Mono and Satoshi Italic are needed above the fold. Removing unnecessary preloads frees bandwidth for LCP.

15. **Use actual lastmod dates in blog sitemap** -- Instead of today's date for all entries, use the real `dateModified` from each post.

---

## Score Breakdown

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Crawlability | 60 | 20% | 12.0 |
| Indexability | 65 | 20% | 13.0 |
| Security | 85 | 10% | 8.5 |
| URL Structure | 75 | 10% | 7.5 |
| Mobile | 90 | 10% | 9.0 |
| Core Web Vitals | 75 | 15% | 11.25 |
| Structured Data | 80 | 10% | 8.0 |
| JS Rendering | 95 | 5% | 4.75 |
| **Total** | | **100%** | **71/100** |

---

## Pages Audited

- https://buceoenelmarrojo.com/ (200)
- https://buceoenelmarrojo.com/rutas (200)
- https://buceoenelmarrojo.com/blog (200)
- https://buceoenelmarrojo.com/contacto (404)
- https://buceoenelmarrojo.com/rutas/norte-pecios (200, intermittent 500)
- https://buceoenelmarrojo.com/blog/ruta-norte-vs-ruta-sur-mar-rojo (200)
- https://buceoenelmarrojo.com/robots.txt (200)
- https://buceoenelmarrojo.com/sitemap.xml (200)
- All 20 blog sitemap URLs checked
- All 5 route sitemap URLs checked
- All 6 pages sitemap URLs checked
