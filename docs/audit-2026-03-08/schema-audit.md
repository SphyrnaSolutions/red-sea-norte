# Schema.org Structured Data Audit -- buceoenelmarrojo.com

**Date**: 2026-03-08
**Auditor**: Claude Opus 4.6 (Schema.org specialist)
**Site**: https://buceoenelmarrojo.com
**Stack**: Next.js 16 + Wagtail headless CMS
**Format detected**: JSON-LD only (no Microdata or RDFa)

---

## 1. Executive Summary

The site has a solid schema foundation with Organization, WebSite, BlogPosting, TouristTrip, and BreadcrumbList types implemented in JSON-LD format. However, several issues reduce rich result eligibility and schema completeness:

| Metric | Score |
|--------|-------|
| Schema coverage (pages with any schema) | 7 of 9 pages audited (78%) |
| Validation pass rate | 4 of 7 schema blocks have issues |
| Rich result eligibility | BlogPosting eligible; TouristTrip not a Google rich result type |
| Missing high-value schema types | 5 identified |

**Overall grade: C+** -- Good structure exists but gaps in listing pages, property completeness, and one critical URL mismatch bug.

---

## 2. Pages Audited

| Page | URL | JSON-LD Blocks | Types Found |
|------|-----|----------------|-------------|
| Homepage | `/` | 2 | Organization, WebSite |
| Routes listing | `/rutas/` | 0 | (none) |
| Blog listing | `/blog/` | 0 | (none) |
| Contact | `/contacto/` | N/A | **404 -- page does not exist** |
| Blog: Thistlegorm | `/blog/ss-thistlegorm-guia-completa` | 2 | BlogPosting, BreadcrumbList |
| Blog: Ruta Norte vs Sur | `/blog/ruta-norte-vs-ruta-sur-mar-rojo` | 2 | BlogPosting, BreadcrumbList |
| Blog: Carnatic/Abu Nuhas | `/blog/carnatic-abu-nuhas` | 2 | BlogPosting, BreadcrumbList |
| Route: Norte Pecios | `/rutas/norte-pecios` | 2 | TouristTrip, BreadcrumbList |
| Route: Norte Tiran | `/rutas/norte-tiran` | 2 | TouristTrip, BreadcrumbList |

Additional pages checked (summary only):
- `/cursos` -- 1 block (ItemList)
- `/experiencias` -- 1 block (ItemList)
- `/ofertas` -- **404**
- All 5 route detail pages have TouristTrip + BreadcrumbList

---

## 3. Existing Schema -- Detailed Validation

### 3.1 Homepage: Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Red Sea Norte",
  "url": "https://buceoenelmarrojo.com",
  "logo": "https://buceoenelmarrojo.com/logo.png",
  "description": "...",
  "address": { "@type": "PostalAddress", "addressLocality": "Hurghada", "addressCountry": "EG" },
  "geo": { "@type": "GeoCoordinates", "latitude": 27.2579, "longitude": 33.8116 },
  "areaServed": { "@type": "Place", "name": "Red Sea, Egypt" },
  "sameAs": ["instagram", "facebook", "tiktok"]
}
```

| Check | Status | Notes |
|-------|--------|-------|
| @context is https | PASS | |
| @type valid | PASS | |
| Required: name | PASS | |
| Required: url | PASS | |
| Recommended: logo | PASS | Should verify logo.png exists and is >= 112x112px |
| Recommended: telephone | FAIL | Missing (commented out as TODO in source) |
| Recommended: email | FAIL | Missing |
| Recommended: contactPoint | FAIL | Missing |
| sameAs URLs valid | PASS | 3 social profiles |
| address complete | WARN | Missing `streetAddress`, `postalCode` |

**Verdict**: Functional but incomplete. Missing contact information reduces trust signals for Google Knowledge Panel eligibility.

### 3.2 Homepage: WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Red Sea Norte",
  "url": "https://buceoenelmarrojo.com",
  "description": "..."
}
```

| Check | Status | Notes |
|-------|--------|-------|
| @context is https | PASS | |
| @type valid | PASS | |
| Required: name | PASS | |
| Required: url | PASS | |
| Recommended: potentialAction (SearchAction) | FAIL | Missing -- needed for sitelinks search box |
| Recommended: inLanguage | FAIL | Missing |
| Recommended: publisher | FAIL | Missing |

**Verdict**: Minimal. Adding `inLanguage: "es"` and a SearchAction (if site search exists) would improve.

### 3.3 Blog Posts: BlogPosting

Audited 3 posts. Common structure:

| Check | Status | Notes |
|-------|--------|-------|
| @context is https | PASS | |
| @type BlogPosting | PASS | |
| Required: headline | PASS | |
| Required: image | MIXED | Present on Thistlegorm (static), **missing** on CMS posts (Carnatic, Ruta Norte vs Sur) |
| Required: datePublished | PASS | ISO 8601 format |
| Required: dateModified | PASS | Present on all |
| Required: author.name | PASS | |
| Required: author.@type | PASS | Person |
| Recommended: author.url | FAIL | Missing on CMS-sourced posts (present in `article.ts` builder but not in inline `page.tsx` schema) |
| Required: publisher.name | PASS | |
| Required: publisher.logo | PASS | ImageObject with URL |
| mainEntityOfPage | PASS | Present |
| inLanguage | FAIL | Missing on inline schema (present in `article.ts` builder but page.tsx builds schema inline) |
| wordCount | FAIL | Missing -- recommended for Article |
| articleSection | FAIL | Missing -- blog has categories that could populate this |

**CRITICAL BUG -- URL Mismatch on Carnatic Post**:

The post at URL `/blog/carnatic-abu-nuhas` generates a `mainEntityOfPage.@id` of `https://buceoenelmarrojo.com/blog/abu-nuhas-cementerio-de-barcos`. The slug used in the schema comes from `post.slug` (the Wagtail CMS slug) which differs from the URL slug used to serve the page. This also affects the BreadcrumbList last item URL.

**Root cause**: In `src/app/blog/[slug]/page.tsx` line 111, the schema uses `post.slug` but the page is served at a different slug. This suggests the CMS slug and the frontend routing slug are out of sync.

**Author inconsistency**: Static posts use "Carlos Martinez" while CMS posts use "Red Sea Diving". The fallback in `article.ts` is "Red Sea Norte". Three different author names across the site.

### 3.4 Route Pages: TouristTrip

Audited all 5 routes. Common structure:

| Check | Status | Notes |
|-------|--------|-------|
| @context is https | PASS | |
| @type TouristTrip | PASS | Valid schema.org type |
| name | PASS | |
| description | PASS | Rich descriptions |
| image | PASS | Absolute URLs from Wagtail media |
| touristType | PASS | "Scuba Diving" |
| itinerary | PASS | Day-by-day as ItemList |
| provider.name | PASS | |
| provider.url | FAIL | **Missing** -- source (`tourist-trip.ts` line 29) includes it, but live output doesn't |
| url | FAIL | **Missing** from live output |
| inLanguage | FAIL | Missing |
| offers (price) | FAIL | Source code supports it (`page.tsx` lines 82-114) but no price data in output |
| duration | FAIL | Missing -- all routes are 8 days, should include |
| availableLanguage | FAIL | Missing |

**Itinerary structure issue**: Each day uses `@type: "ItemList"` but itinerary days should be `@type: "ListItem"` within an `ItemList`, or better yet use `@type: "TouristTrip"` with nested `subTrip` entries. The current structure nests `ItemList` inside an array which is semantically incorrect -- an itinerary should be a single `ItemList` containing `ListItem` entries, not an array of `ItemList` objects.

**Note on rich results**: Google does not currently render rich results for TouristTrip. However, the schema is valid for Google's understanding of the page content and may influence featured snippets.

### 3.5 BreadcrumbList (all detail pages)

| Check | Status | Notes |
|-------|--------|-------|
| @context is https | PASS | |
| @type BreadcrumbList | PASS | |
| itemListElement present | PASS | |
| ListItem @type | PASS | |
| position sequential | PASS | 1, 2, 3 |
| item URLs absolute | PASS | |
| Trailing slash consistency | WARN | Homepage uses trailing slash `/`, listing pages don't `/blog` vs `/blog/` |

**Verdict**: BreadcrumbList is well-implemented and eligible for Google rich results. Minor trailing slash inconsistency.

---

## 4. Missing Schema Opportunities

### 4.1 CRITICAL -- Missing on Listing Pages

**`/rutas/` -- No schema at all.** Should have:
- `BreadcrumbList` (Inicio > Rutas)
- `ItemList` with route entries (enables carousel-style rich results)
- `CollectionPage` wrapper

**`/blog/` -- No schema at all.** Should have:
- `BreadcrumbList` (Inicio > Blog)
- `ItemList` or `CollectionPage` with blog post entries

### 4.2 HIGH -- LocalBusiness (upgrade from Organization)

The site represents a specific diving business operating from Hurghada. `LocalBusiness` (or more specifically `TouristAttraction` + `SportsActivityLocation`) is more appropriate than generic `Organization` and enables:
- Google Maps Knowledge Panel
- Business hours
- Price range
- Reviews/ratings

### 4.3 HIGH -- WebPage on Every Page

Every page should include a `WebPage` (or subtype like `CollectionPage`, `AboutPage`) schema with:
- `name`, `description`, `url`
- `isPartOf` referencing the WebSite
- `inLanguage: "es"`
- `breadcrumb` referencing the BreadcrumbList

### 4.4 MEDIUM -- Product/Offer Schema on Route Pages

Each route is a bookable product. Adding `Product` with `Offer` would enable price rich results in search:
- `Product.name`: route name
- `Product.description`: route description
- `Offer.price`: from infoCards
- `Offer.priceCurrency`: EUR
- `Offer.availability`: InStock/LimitedAvailability

The source code already has offer generation logic (lines 82-114 of `rutas/[slug]/page.tsx`) but no price data reaches the output.

### 4.5 MEDIUM -- SiteNavigationElement

Add main navigation schema to improve sitelink generation:
```json
{
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": ["Rutas", "Blog", "Cursos", "Experiencias"],
  "url": ["..."]
}
```

### 4.6 LOW -- ImageObject on Blog Posts

Blog hero images should use full `ImageObject` with `width`, `height`, `caption` instead of bare URL strings. This improves image search eligibility.

### 4.7 NOT RECOMMENDED

| Type | Reason |
|------|--------|
| FAQPage | Restricted to government/healthcare sites since August 2023. Route pages have FAQ sections but should NOT use FAQPage schema. **Note: The codebase has `faq-page.ts` builder -- verify it is not being used.** |
| HowTo | Rich results removed September 2023 |
| SpecialAnnouncement | Deprecated July 2025 |

---

## 5. Bugs and Issues Summary

### CRITICAL

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | **Blog post slug mismatch**: `mainEntityOfPage.@id` and breadcrumb URLs use CMS slug which differs from the frontend routing slug | `src/app/blog/[slug]/page.tsx:111` | Schema URLs point to wrong/nonexistent pages. Google may flag as inconsistent. |
| 2 | **Listing pages have zero schema**: `/rutas/` and `/blog/` output no JSON-LD | `src/app/rutas/page.tsx`, `src/app/blog/page.tsx` | No BreadcrumbList or CollectionPage for main navigation pages. |

### HIGH

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 3 | **Blog image missing on CMS posts**: CMS-sourced blog posts (Carnatic, Ruta Norte vs Sur) have no `image` in BlogPosting schema | `src/app/blog/[slug]/page.tsx:94` | `image` is required for Article rich results. Without it, posts are ineligible. |
| 4 | **Author name inconsistency**: Three different author names across posts ("Carlos Martinez", "Red Sea Diving", "Red Sea Norte" fallback) | Multiple sources | Confuses entity recognition for Google Knowledge Graph. |
| 5 | **TouristTrip missing `url` and `provider.url`**: Source code generates these but they don't appear in live output | `src/lib/seo/schema/tourist-trip.ts` vs `src/app/rutas/[slug]/page.tsx` | Indicates the `tourist-trip.ts` builder is NOT being used; the inline `generateJsonLd` function in `page.tsx` is used instead, and it omits `url`. |
| 6 | **FAQPage builder exists**: `src/lib/seo/schema/faq-page.ts` could be invoked for route FAQ sections | Source code | FAQPage is restricted to government/healthcare since Aug 2023. Must NOT be deployed. |

### MEDIUM

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 7 | `inLanguage: "es"` missing from BlogPosting inline schema | `page.tsx` inline schema | Present in `article.ts` builder but not in the actually-used inline schema. |
| 8 | `publisher.logo` uses deprecated ImageObject format | Blog posts | Google recommends `logo` as a URL string, not nested ImageObject, for publisher. |
| 9 | TouristTrip itinerary uses incorrect nesting | Route pages | Array of `ItemList` objects instead of single `ItemList` with `ListItem` children. |
| 10 | Organization missing `telephone` and `email` | Homepage | Commented out as TODO. Reduces Knowledge Panel eligibility. |
| 11 | WebSite missing `inLanguage` and `potentialAction` | Homepage | Reduces sitelinks search box eligibility. |
| 12 | Trailing slash inconsistency in BreadcrumbList URLs | Breadcrumbs component | Homepage `/` has slash, listing pages `/blog` don't. Minor but should be consistent. |

---

## 6. Recommended JSON-LD Additions

### 6.1 Homepage: Upgrade Organization to LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Red Sea Norte",
  "url": "https://buceoenelmarrojo.com",
  "logo": "https://buceoenelmarrojo.com/logo.png",
  "image": "https://buceoenelmarrojo.com/images/boat/boat-aerial-anchored-reef.jpg",
  "description": "Vida a bordo en el Mar Rojo desde Hurghada con foco en Ruta Norte, pecios y experiencias de buceo.",
  "telephone": "+34-XXX-XXX-XXX",
  "email": "info@buceoenelmarrojo.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Marina, Hurghada",
    "addressLocality": "Hurghada",
    "addressRegion": "Red Sea Governorate",
    "addressCountry": "EG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.2579,
    "longitude": 33.8116
  },
  "areaServed": {
    "@type": "Place",
    "name": "Red Sea, Egypt"
  },
  "priceRange": "EUR 800-1500",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Bank Transfer",
  "sameAs": [
    "https://www.instagram.com/karlossimon/",
    "https://www.facebook.com/viajeskarlossimon",
    "https://www.tiktok.com/@karlossimon"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "TouristTrip",
        "name": "Ruta Norte y Pecios del Mar Rojo",
        "url": "https://buceoenelmarrojo.com/rutas/norte-pecios"
      }
    }
  ]
}
```

### 6.2 Homepage: Enhanced WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Red Sea Norte",
  "alternateName": "Buceo en el Mar Rojo",
  "url": "https://buceoenelmarrojo.com",
  "description": "Vida a bordo en el Mar Rojo desde Hurghada, Ruta Norte y Pecios",
  "inLanguage": "es",
  "publisher": {
    "@type": "Organization",
    "name": "Red Sea Norte",
    "url": "https://buceoenelmarrojo.com"
  }
}
```

### 6.3 Routes Listing Page (`/rutas/`)

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Rutas de Vida a Bordo en el Mar Rojo",
  "description": "Rutas de vida a bordo en el Mar Rojo desde Hurghada. Itinerarios centrados en Ruta Norte, pecios y experiencias de buceo.",
  "url": "https://buceoenelmarrojo.com/rutas",
  "inLanguage": "es",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://buceoenelmarrojo.com"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://buceoenelmarrojo.com/rutas/norte-pecios",
        "name": "Ruta Norte y Pecios del Mar Rojo"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://buceoenelmarrojo.com/rutas/norte-tiran",
        "name": "Ruta Norte y Tiran del Mar Rojo"
      }
    ]
  }
}
```

### 6.4 Blog Listing Page (`/blog/`)

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Blog de Buceo en el Mar Rojo",
  "description": "Articulos y guias sobre buceo en el Mar Rojo, pecios, rutas y vida a bordo.",
  "url": "https://buceoenelmarrojo.com/blog",
  "inLanguage": "es",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://buceoenelmarrojo.com"
  }
}
```

### 6.5 Fixed BlogPosting (inline schema in page.tsx)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "image": {
    "@type": "ImageObject",
    "url": "https://buceoenelmarrojo.com/images/...",
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-03-08",
  "dateModified": "2026-03-08",
  "author": {
    "@type": "Person",
    "name": "Karlos Simon",
    "url": "https://buceoenelmarrojo.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Red Sea Norte",
    "url": "https://buceoenelmarrojo.com",
    "logo": "https://buceoenelmarrojo.com/logo.png"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://buceoenelmarrojo.com/blog/{CURRENT_URL_SLUG}"
  },
  "inLanguage": "es",
  "articleSection": "Pecios"
}
```

Key fix: use the URL slug parameter, not `post.slug` from CMS.

### 6.6 Fixed TouristTrip with Proper Itinerary

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Ruta Norte y Pecios del Mar Rojo",
  "description": "...",
  "url": "https://buceoenelmarrojo.com/rutas/norte-pecios",
  "image": "https://...",
  "touristType": "Scuba Diving",
  "inLanguage": "es",
  "itinerary": {
    "@type": "ItemList",
    "numberOfItems": 8,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Dia 1: Embarque en Hurghada y bienvenida a bordo",
        "description": "..."
      }
    ]
  },
  "offers": {
    "@type": "Offer",
    "price": "890",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/LimitedAvailability",
    "url": "https://buceoenelmarrojo.com/rutas/norte-pecios",
    "validFrom": "2026-01-01"
  },
  "provider": {
    "@type": "TravelAgency",
    "name": "Red Sea Norte",
    "url": "https://buceoenelmarrojo.com"
  },
  "subjectOf": {
    "@type": "WebPage",
    "url": "https://buceoenelmarrojo.com/rutas/norte-pecios"
  }
}
```

---

## 7. Implementation Priority

| Priority | Task | Files to Modify | Effort |
|----------|------|-----------------|--------|
| P0 | Fix blog slug mismatch bug -- use URL param `slug` instead of `post.slug` for `mainEntityOfPage` | `src/app/blog/[slug]/page.tsx:111` | 5 min |
| P0 | Add `image` to CMS blog posts schema (check why hero image is missing) | `src/app/blog/[slug]/page.tsx:94` | 15 min |
| P1 | Add BreadcrumbList + CollectionPage schema to `/rutas/` | `src/app/rutas/page.tsx` | 30 min |
| P1 | Add BreadcrumbList + CollectionPage schema to `/blog/` | `src/app/blog/page.tsx` or `blog-listing-client.tsx` | 30 min |
| P1 | Standardize author name across all posts | `src/app/blog/[slug]/page.tsx`, CMS data | 15 min |
| P1 | Add `inLanguage: "es"` to all schema blocks | Multiple files | 10 min |
| P2 | Upgrade Organization to TravelAgency/LocalBusiness | `src/app/page.tsx` | 20 min |
| P2 | Add `url` and `provider.url` to TouristTrip output | `src/app/rutas/[slug]/page.tsx` | 5 min |
| P2 | Fix itinerary structure (single ItemList with ListItem children) | `src/app/rutas/[slug]/page.tsx` | 20 min |
| P2 | Enhance WebSite schema with `inLanguage` and `publisher` | `src/app/page.tsx` | 5 min |
| P3 | Add telephone and email to Organization/LocalBusiness | `src/app/page.tsx` | 5 min (needs real data) |
| P3 | Verify FAQPage builder is NOT deployed on any page | Codebase search | 10 min |
| P3 | Add `duration` to TouristTrip | `src/app/rutas/[slug]/page.tsx` | 5 min |

---

## 8. Source Code Architecture Notes

The codebase has **two separate schema generation paths** that are partially redundant:

1. **Builder functions** in `src/lib/seo/schema/`:
   - `article.ts` -- includes `inLanguage`, `author.url`, `dateModified` logic
   - `tourist-trip.ts` -- includes `url`, `provider.url`
   - `breadcrumb.ts` -- used by Breadcrumbs component (working correctly)
   - `faq-page.ts` -- **should be removed or clearly marked as deprecated**

2. **Inline schema objects** in page components:
   - `src/app/blog/[slug]/page.tsx` lines 89-113 -- builds BlogPosting **inline**, ignoring the `article.ts` builder
   - `src/app/rutas/[slug]/page.tsx` lines 81-119 -- builds TouristTrip **inline**, ignoring the `tourist-trip.ts` builder
   - `src/app/page.tsx` lines 49-84 -- builds Organization and WebSite **inline**

**Recommendation**: Consolidate to use the builder functions exclusively. The inline schemas miss properties that the builders include (`inLanguage`, `author.url`, `url`). Either delete the builders or refactor the pages to use them.

---

## 9. Rich Result Eligibility Summary

| Rich Result Type | Current Status | Blocked By |
|------------------|---------------|------------|
| Article (BlogPosting) | PARTIAL -- eligible on static posts only | Missing `image` on CMS posts, URL mismatch |
| Breadcrumb | ELIGIBLE | Trailing slash minor inconsistency |
| Sitelinks Search Box | NOT ELIGIBLE | Missing `SearchAction` in WebSite schema |
| Local Business Knowledge Panel | NOT ELIGIBLE | Using Organization instead of LocalBusiness, missing contact info |
| Product/Price | NOT ELIGIBLE | No Product/Offer schema deployed |
| FAQ | RESTRICTED | Only for govt/healthcare since Aug 2023 -- do NOT implement |

---

*Report generated by automated schema audit. All findings verified against live site responses and source code as of 2026-03-08.*
