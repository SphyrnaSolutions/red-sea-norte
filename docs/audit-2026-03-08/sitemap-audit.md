# Sitemap Audit -- buceoenelmarrojo.com

**Date:** 2026-03-08
**Auditor:** Automated (Claude Opus 4.6)
**Site:** https://buceoenelmarrojo.com

---

## 1. Sitemap Discovery

**Source:** `robots.txt` declares a single sitemap:

```
Sitemap: https://buceoenelmarrojo.com/sitemap.xml
```

`/sitemap.xml` returns HTTP 200 and serves a **sitemap index** (sitemapindex) pointing to 4 child sitemaps:

| Child Sitemap | lastmod | Status |
|---|---|---|
| `/sitemap/blog` | 2026-03-08 | 200 OK |
| `/sitemap/rutas` | 2026-03-08 | 200 OK |
| `/sitemap/pages` | 2026-03-08 | 200 OK |
| `/sitemap/images` | 2026-03-08 | 200 OK |

Three additional sitemap routes exist in the codebase (`/sitemap/cursos`, `/sitemap/experiencias`, `/sitemap/ofertas`) but are correctly excluded from the index because they currently return empty URL sets (no CMS content published for those content types yet).

---

## 2. Validation Report

| Check | Result | Severity |
|---|---|---|
| Valid XML syntax | PASS | -- |
| Content-Type `application/xml` | PASS | -- |
| URL count per file (< 50,000) | PASS (max 20 URLs in blog) | -- |
| File size per sitemap (< 50 MB) | PASS (max 2,695 bytes) | -- |
| No `priority` tag | PASS (none present) | -- |
| No `changefreq` tag | PASS (none present) | -- |
| Non-200 URLs in sitemap | **FAIL -- 2 URLs return 404** | HIGH |
| Missing `lastmod` on rutas | **FAIL -- 0/5 rutas have lastmod** | LOW |
| Missing `lastmod` on pages | **FAIL -- 0/6 pages have lastmod** | LOW |
| All blog lastmod identical | **WARNING -- all 20 posts show 2026-03-08** | LOW |
| No `noindex` pages in sitemap | PASS | -- |
| No redirect URLs in sitemap | PASS (merged slugs correctly excluded) | -- |
| Sitemap split by content type | PASS (blog, rutas, pages, images) | -- |
| Image sitemap uses correct namespace | PASS (`xmlns:image` present) | -- |
| Location page quality gate | N/A (0 location pages) | -- |

---

## 3. CRITICAL: 404 URLs in Sitemap

Two blog URLs in `/sitemap/blog` return HTTP 404:

| Sitemap URL (with accent) | Status | Working URL (without accent) |
|---|---|---|
| `/blog/ss-thistlegorm-guia-completa` | 404 | `/blog/ss-thistlegorm-guia-completa` (200) |
| `/blog/ras-mohammed-guia-completa` | 404 | `/blog/ras-mohammed-guia-completa` (200) |

**Root cause:** The CMS (Wagtail) stores these slugs with the accented character "i" in "guia" (Unicode i-acute). The sitemap route at `src/app/sitemap/blog/route.ts` outputs the slug verbatim from the CMS. However, the Next.js dynamic route for `/blog/[slug]` resolves the page only with the ASCII version of the slug (`guia` without accent). The accented URL is not caught by any redirect rule and returns a hard 404.

**Impact:** Google will crawl these 404 URLs from the sitemap, wasting crawl budget and potentially deindexing the real pages.

**Fix options (choose one):**
1. **Fix in CMS:** Update the slug in Wagtail to remove the accent (`guia` instead of `guia`). This is the cleanest fix.
2. **Fix in sitemap route:** Normalize slugs to ASCII before outputting them (e.g., `slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')`).
3. **Add redirect:** Add a redirect rule from the accented URL to the non-accented URL in `next.config.ts`.

**Note:** The blog listing page (`/blog`) also links to the accented URLs, so the slug normalization should ideally happen at the data layer to fix both the sitemap and the listing page simultaneously.

---

## 4. URL Inventory

### 4.1 Blog Sitemap (20 URLs)

All 18 non-404 URLs return HTTP 200. All have `lastmod: 2026-03-08`.

```
/blog/ss-thistlegorm-guia-completa          <- 404 (accent issue)
/blog/ruta-norte-vs-ruta-sur-mar-rojo       <- 200
/blog/primer-liveaboard-open-water-mar-rojo <- 200
/blog/como-llegar-a-hurghada-liveaboard     <- 200
/blog/que-incluye-vida-a-bordo-mar-rojo     <- 200
/blog/precio-vida-a-bordo-mar-rojo          <- 200
/blog/requisitos-ruta-norte-mar-rojo        <- 200
/blog/temporada-ruta-norte-mar-rojo         <- 200
/blog/pecios-vs-tiburones-mar-rojo          <- 200
/blog/hurghada-vs-sharm-liveaboard          <- 200
/blog/seguridad-buceo-mar-rojo              <- 200
/blog/ras-mohammed-guia-completa            <- 404 (accent issue)
/blog/seguro-buceo-dan-egipto               <- 200
/blog/visado-egipto-hurghada                <- 200
/blog/nitrox-a-bordo-mar-rojo               <- 200
/blog/advanced-a-bordo-mar-rojo             <- 200
/blog/checklist-vida-a-bordo-mar-rojo       <- 200
/blog/como-es-un-vida-a-bordo-mar-rojo      <- 200
/blog/rosalie-moller-mar-rojo               <- 200
/blog/abu-nuhas-cementerio-de-barcos        <- 200
```

### 4.2 Rutas Sitemap (5 URLs)

All return HTTP 200. None have `lastmod`.

```
/rutas/norte-pecios     <- 200
/rutas/norte-tiran      <- 200
/rutas/tiran-blue-hole  <- 200
/rutas/norte-brothers   <- 200
/rutas/sur-bde          <- 200
```

### 4.3 Pages Sitemap (6 URLs)

All return HTTP 200. None have `lastmod`.

```
/                        <- 200
/blog                    <- 200
/rutas                   <- 200
/cursos                  <- 200
/experiencias            <- 200
/politica-de-privacidad  <- 200
```

### 4.4 Image Sitemap (5 URLs)

Covers the 5 ruta pages with one hero image each. Uses correct `image:image` namespace.

### 4.5 Total URL Count

| Sitemap | URL Count |
|---|---|
| Blog | 20 |
| Rutas | 5 |
| Pages | 6 |
| Images | 5 (duplicate locs of rutas, with image extensions) |
| **Total unique** | **31** |

---

## 5. Missing Pages (linked on site but absent from sitemaps)

### 5.1 Internal links that 404 (not in sitemap, correctly)

These URLs are linked from the homepage footer but return 404:

| URL | Linked From | Recommendation |
|---|---|---|
| `/ofertas` | Homepage | Either create the page or remove the link |
| `/terminos` | Homepage footer | Either create the page or remove the link |

### 5.2 Merged blog posts (correctly excluded from sitemap)

5 old blog slugs are properly excluded via `MERGED_POST_SLUGS` in the blog sitemap route. They all 308-redirect to their consolidated target pages:

| Old Slug | Redirects To |
|---|---|
| `/blog/camarotes-comida-wifi-liveaboard` | `/blog/como-es-un-vida-a-bordo-mar-rojo` |
| `/blog/carnatic-abu-nuhas` | `/blog/abu-nuhas-cementerio-de-barcos` |
| `/blog/dunraven-mar-rojo` | `/blog/abu-nuhas-cementerio-de-barcos` |
| `/blog/giannis-d-abu-nuhas` | `/blog/abu-nuhas-cementerio-de-barcos` |
| `/blog/shark-yolanda-reef-mar-rojo` | `/blog/ras-mohammed-guia-completa` |

**Note:** The redirect for `shark-yolanda-reef-mar-rojo` targets `/blog/ras-mohammed-guia-completa` (without accent) which returns 200. This is correct.

---

## 6. lastmod Analysis

### Blog Posts

All 20 blog entries share the same `lastmod: 2026-03-08`. The sitemap code does pull `post.lastModified` from CMS data, which suggests either:
- All posts were genuinely re-published on 2026-03-08 (plausible given the recent v3.1 SEO audit fixes), or
- The CMS `last_published_at` field was bulk-updated.

**Recommendation:** If these were bulk-updated as part of the SEO fix commit (9f07811), the dates are technically accurate but will lose value over time. As new posts are published, the dates will naturally diverge and become useful signals. No immediate action needed.

### Rutas and Pages

Zero `lastmod` values present. The code conditionally includes `lastmod` only if `ruta.lastModified` is truthy, which means the CMS is not returning `lastModified` data for ruta pages. The pages sitemap is hardcoded with no `lastmod` at all.

**Recommendation:** Add `lastmod` to the pages sitemap using the build date or the most recent content update. For rutas, ensure the CMS API returns `last_published_at` for ruta pages.

---

## 7. Sitemap Index lastmod

The sitemap index uses `new Date().toISOString().split('T')[0]` for all child sitemaps, which means every request shows today's date. This is technically valid but not informative. Google largely ignores sitemap index lastmod, so this is low priority.

---

## 8. robots.txt Observations

The robots.txt includes Cloudflare-managed bot blocks (ClaudeBot, GPTBot, etc.) and site-specific rules:

```
Allow: /
Disallow: /api/
Disallow: /_next/
```

The `/api/` and `/_next/` disallows are correct -- these should not be indexed.

---

## 9. Summary of Issues (ordered by severity)

### HIGH

1. **2 blog URLs in sitemap return 404** due to accent mismatch between CMS slugs and Next.js routing. Fix by normalizing slugs to ASCII in the data layer or CMS.

### MEDIUM

2. **2 broken internal links** on homepage (`/ofertas`, `/terminos`) -- not in sitemap but hurt user experience and waste link equity.

### LOW

3. **No `lastmod` on rutas sitemap** (5 URLs) -- add `last_published_at` from CMS.
4. **No `lastmod` on pages sitemap** (6 URLs) -- add static or build-time dates.
5. **All blog `lastmod` identical** (2026-03-08) -- acceptable if recently bulk-updated, will self-correct over time.

### INFO

6. Sitemap index lastmod is dynamic (today's date on every request) -- cosmetic, no action needed.
7. No `priority` or `changefreq` tags -- correct, these are ignored by Google.
8. Merged post redirects are working correctly (308 to final URLs).
9. Image sitemap is properly structured with correct namespace.

---

## 10. Recommended Action Items

| Priority | Action | File(s) |
|---|---|---|
| P0 | Fix accent slug mismatch (404s in sitemap) | CMS slug or `src/app/sitemap/blog/route.ts` + data layer |
| P1 | Fix or remove broken `/ofertas` and `/terminos` links | Homepage component (footer) |
| P2 | Add `lastmod` to rutas sitemap | CMS API / `src/app/sitemap/rutas/route.ts` |
| P2 | Add `lastmod` to pages sitemap | `src/app/sitemap/pages/route.ts` |
