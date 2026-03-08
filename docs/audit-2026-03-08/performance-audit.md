# Performance & Core Web Vitals Audit

**Site**: buceoenelmarrojo.com
**Date**: 2026-03-08
**Stack**: Next.js 16.1.5 + React 19 + Tailwind 4 + Cloudflare CDN
**Method**: HTTP header analysis, HTML source inspection, TTFB measurement, resource audit

---

## Executive Summary

The site has excellent TTFB thanks to Cloudflare CDN and Next.js ISR caching on most pages. Static assets use immutable caching correctly. However, there are **5 significant issues** that likely degrade real-world Core Web Vitals scores, particularly LCP and CLS.

**Estimated Performance Score**: 72-80/100 (lab), likely better in field due to CDN

### Core Web Vitals Estimate (field, 75th percentile)

| Metric | Estimated | Target | Status |
|--------|-----------|--------|--------|
| LCP    | 2.0-3.0s  | <=2.5s | AT RISK |
| INP    | <200ms    | <=200ms | LIKELY PASS |
| CLS    | 0.05-0.15 | <=0.1  | AT RISK |

---

## 1. TTFB (Time to First Byte)

**Status: PASS (excellent)**

| Page | TTFB (avg of 3 runs) | Cache Status |
|------|---------------------|--------------|
| Homepage `/` | 61ms | CF HIT, Next.js HIT |
| Rutas `/rutas` | 107ms | CF BYPASS, no-cache |
| Blog `/blog` | 53ms | CF HIT, Next.js HIT |

**Finding**: TTFB is excellent across all pages from the Madrid POP. The Cloudflare CDN + Next.js ISR combination delivers sub-110ms TTFB consistently.

**ISSUE**: The `/rutas` page returns `cache-control: private, no-cache, no-store, max-age=0, must-revalidate` because it uses `export const dynamic = 'force-dynamic'` in `src/app/rutas/page.tsx`. This means every request hits the origin server, defeating Cloudflare caching entirely. While TTFB is still fast from our test location, this will be slower for users far from the origin.

---

## 2. LCP (Largest Contentful Paint)

**Status: AT RISK**

### 2.1 Hero Image Configuration

The hero image (`underwater-diver-pink-soft-coral.jpg`) is the LCP element on the homepage.

**Good**:
- `priority` prop is set on the Next.js Image component
- A `<link rel="preload" as="image" imageSrcSet="...">` is emitted in the `<head>`
- Image is served as AVIF when the browser supports it (191 KB at 1920w)
- `srcset` with responsive widths (640w to 3840w)
- `sizes="100vw"` correctly set

**Issue**: The rendered HTML shows the hero `<img>` tag has `decoding="async"` but is **missing `fetchpriority="high"`**. In Next.js 16, the `priority` prop should emit `fetchpriority="high"` on the `<img>` element. The first image in the DOM does not have `loading="lazy"` (correct), but the absence of explicit `fetchpriority="high"` means the browser may not prioritize it aggressively enough. The preload link compensates partially, but the image itself should also carry the priority hint.

**Impact**: This can add 200-500ms to LCP on slower connections.

### 2.2 Hero Image Size

At 1920w q=90, the hero is **191 KB** (AVIF). This is reasonable for a full-viewport hero but could be optimized:
- At q=75, the same image would be ~100-130 KB with negligible quality loss
- The `3840w` variant is unnecessary for most devices (only 5K displays)

### 2.3 Single CSS Bundle

One render-blocking CSS file: `069296c692a545e5.css` (CF cache HIT, immutable headers). This blocks First Paint but is unavoidable in Next.js without significant CSS splitting effort. Not a major concern since it is cached on CDN.

---

## 3. INP (Interaction to Next Paint)

**Status: LIKELY PASS**

### 3.1 JavaScript Footprint

| Metric | Value |
|--------|-------|
| Total JS chunks (homepage) | 71 files |
| Total JS download (compressed) | 240 KB |
| Largest chunk | 69.8 KB (framework/vendor) |
| 2nd largest | 39.6 KB (polyfill, noModule) |
| 3rd largest | 37.2 KB |

**Assessment**: 240 KB total JS is moderate for a Next.js 16 app with React 19. The framework chunk at ~70 KB is standard. The `noModule` polyfill (39.6 KB) only loads in legacy browsers.

### 3.2 DOM Size

| Page | Estimated Element Count |
|------|----------------------|
| Homepage | ~400-500 |
| Rutas | ~392 |
| Blog | ~487 |

DOM size is well under the 1,500 element threshold. No INP concern here.

### 3.3 Third-Party Scripts

- Google Tag Manager / gtag: loaded with consent management (denied by default)
- No other third-party scripts detected (no ads, no chat widgets blocking main thread)
- GTM is preloaded on the rutas page: `<link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=G-KFBDJYRF76" as="script"/>`

**Assessment**: Minimal third-party impact. GTM with consent-denied defaults means analytics does not fire until consent, reducing main-thread contention.

---

## 4. CLS (Cumulative Layout Shift)

**Status: AT RISK**

### 4.1 Images Without Explicit Dimensions

**CRITICAL FINDING**: All 9 `<img>` tags on the homepage use `data-nimg="fill"` with `position: absolute` styling but **no explicit `width` or `height` attributes** in the HTML. While the `fill` mode uses absolute positioning (which should not cause layout shifts if the parent container has defined dimensions), any parent without explicit aspect ratio or height could cause CLS.

The hero image uses `fill` inside a `min-h-screen` container, which is stable. However, other images throughout the site need verification that their parent containers define a fixed aspect ratio.

### 4.2 Font Loading

**Good**:
- 4 font files preloaded via `<link rel="preload">` in the document head
- Fonts served as WOFF2 (compressed, ~29 KB each)
- Fonts have immutable cache headers

**Potential issue**: No `font-display` declaration was found in the HTML. If fonts use the default `font-display: auto`, browsers may show invisible text (FOIT) during load, then shift when fonts render. Next.js `localFont` typically sets `font-display: swap` by default, but this should be verified.

### 4.3 Dynamically Injected Content

No evidence of late-injected ads, banners, or dynamic content that would cause layout shifts. The site uses Server Components with SSR, so content is present in the initial HTML.

---

## 5. Caching Strategy

### 5.1 Static Assets

| Resource | Cache-Control | CF Status |
|----------|--------------|-----------|
| CSS (`_next/static/`) | `public, max-age=31536000, immutable` | HIT |
| JS (`_next/static/`) | `public, max-age=31536000, immutable` | HIT |
| Fonts (`.woff2`) | `public, max-age=31536000, immutable` | HIT |
| Images (`_next/image/`) | `public, max-age=31536000, immutable` | DYNAMIC |

**Good**: All static assets use aggressive caching with content-hashed filenames. This is the correct approach.

**Issue**: `_next/image/` responses return `cf-cache-status: DYNAMIC`, meaning Cloudflare does not cache optimized images. The `Cache-Control: public, max-age=31536000, immutable` header is set by Next.js, but Cloudflare treats these as dynamic. This means every unique image request hits the origin. A Cloudflare Cache Rule matching `_next/image*` should be added to force caching.

### 5.2 HTML Pages

| Page | Cache-Control | CF Cache | Next.js Cache |
|------|--------------|----------|---------------|
| Homepage `/` | `s-maxage=600, stale-while-revalidate=31535400` | HIT | HIT (ISR) |
| Blog `/blog` | `s-maxage=600, stale-while-revalidate=31535400` | HIT | HIT (ISR) |
| Rutas `/rutas` | `private, no-cache, no-store` | BYPASS | N/A (dynamic) |

**CRITICAL ISSUE**: `/rutas` uses `force-dynamic`, which means:
1. No Cloudflare CDN caching
2. No Next.js ISR caching
3. Every request hits the CMS API
4. Higher TTFB for distant users

---

## 6. Resource Hints

### 6.1 Present

- Font preloads (4 WOFF2 files) -- GOOD
- Hero image preload with `imageSrcSet` -- GOOD
- `X-DNS-Prefetch-Control: on` header -- GOOD
- GTM preload on rutas page -- GOOD

### 6.2 Missing

- **No `<link rel="preconnect">`** for any external origin (googletagmanager.com, google-analytics.com, back.redsea.sphyrnasolutions.com)
- **No `<link rel="dns-prefetch">`** in HTML (only the header)

---

## 7. Blog Page Payload

**CRITICAL FINDING**: The `/blog` listing page is **451 KB** of HTML, of which **391 KB (89.5%) is inline RSC (React Server Component) payload**. This payload contains the full content of all 25 blog posts serialized as JSON in `<script>` tags.

This means:
1. The blog listing page downloads ALL blog post bodies, not just titles/excerpts
2. Users download ~400 KB of content they never see on the listing page
3. This bloats the initial page load and increases Time to Interactive
4. It also wastes bandwidth on mobile connections

The root cause is in `src/app/blog/page.tsx`, which calls `getAllBlogPostsData()` and passes the full post objects to `BlogListingClient`. The client component receives all post data even though the listing only needs: slug, title, excerpt, date, and thumbnail.

---

## 8. Trailing Slash Redirect

Pages with trailing slashes (`/rutas/`, `/blog/`) return a **308 Permanent Redirect** to the non-trailing-slash version. While 308 is semantically correct, each redirect adds ~80-100ms of latency. Internal links and sitemaps should consistently use non-trailing-slash URLs to avoid unnecessary redirects.

---

## Prioritized Recommendations

### P0 -- Critical (expected impact: high)

| # | Issue | Action | Expected Impact |
|---|-------|--------|-----------------|
| 1 | Blog page sends 391 KB of unused RSC data | Modify `getAllBlogPostsData()` or create a `getAllBlogPostsSummary()` that returns only slug, title, excerpt, date, featured_image for the listing page. Do NOT pass full post body/content to the client component. | -350 KB page weight, -500ms+ load time on 3G |
| 2 | `/rutas` page is `force-dynamic` (uncacheable) | Replace `export const dynamic = 'force-dynamic'` with `export const revalidate = 600` (matching other pages). The comment says "fetch-level caching in client.ts handles ISR" but this prevents CDN caching entirely. | Enable CDN caching, -50ms TTFB for cached hits |
| 3 | `_next/image` not cached by Cloudflare | Add a Cloudflare Cache Rule: URL matches `*buceoenelmarrojo.com/_next/image*` with Cache Level = Cache Everything, Edge TTL = 1 month. | Reduce origin load, faster image delivery for repeat visitors |

### P1 -- High (expected impact: medium)

| # | Issue | Action | Expected Impact |
|---|-------|--------|-----------------|
| 4 | Hero image missing `fetchpriority="high"` | Verify that Next.js 16.1.5 Image component with `priority` prop actually emits `fetchpriority="high"`. If not, add it manually via the `fetchPriority` prop. | -200-500ms LCP improvement |
| 5 | No preconnect hints for external origins | Add `<link rel="preconnect" href="https://www.googletagmanager.com">` and `<link rel="preconnect" href="https://back.redsea.sphyrnasolutions.com">` in the layout head. | -100-200ms for first external resource fetch |
| 6 | Hero image quality=90 is excessive for AVIF | Reduce hero quality to 75 (AVIF q=75 is visually equivalent to JPEG q=90). This drops image from ~191 KB to ~100-130 KB. | -60-90 KB LCP resource size |

### P2 -- Medium (expected impact: low-medium)

| # | Issue | Action | Expected Impact |
|---|-------|--------|-----------------|
| 7 | Trailing slash redirects add latency | Ensure all internal links and sitemap URLs use non-trailing-slash format. Check `next.config.ts` for `trailingSlash: false` (default). | -80-100ms per redirect avoided |
| 8 | Font `font-display` not verified | Confirm `font-display: swap` is set for all custom fonts (Clash Display, Satoshi, JetBrains Mono). Check the `localFont()` configuration. | Prevent FOIT, reduce CLS |
| 9 | 3840w image variant unnecessary | Set `deviceSizes` in `next.config.ts` to cap at 2048w: `deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048]` | Reduce image optimization costs |

### P3 -- Low (nice to have)

| # | Issue | Action | Expected Impact |
|---|-------|--------|-----------------|
| 10 | No HTTP/2 server push or 103 Early Hints | Cloudflare supports Early Hints. Enable it in Cloudflare dashboard to push critical CSS/fonts before the HTML response completes. | -50-100ms FCP improvement |
| 11 | `noModule` polyfill is 39.6 KB | This only loads in legacy browsers. No action needed, but monitor if legacy traffic is negligible. | N/A (already conditional) |

---

## What Is Working Well

1. **TTFB is excellent** (50-110ms) thanks to Cloudflare CDN + ISR on cached pages
2. **Image format optimization** -- AVIF served when supported, with responsive srcset
3. **Static asset caching** -- immutable headers with content-hashed filenames (1 year TTL)
4. **Minimal third-party scripts** -- only GTM with consent management
5. **Font preloading** -- all 4 custom fonts preloaded as WOFF2
6. **DOM size is lean** -- under 500 elements on all pages
7. **Security headers** -- comprehensive (HSTS, CSP-report-only, X-Frame-Options, etc.)
8. **ISR strategy** -- 10-minute revalidation with year-long stale-while-revalidate fallback on homepage and blog

---

## Files Referenced

| File | Relevance |
|------|-----------|
| `src/app/page.tsx` | Homepage config, ISR revalidate=600 |
| `src/app/rutas/page.tsx` | **Uses `force-dynamic` -- causes cache miss** |
| `src/app/blog/page.tsx` | Passes full post data to client component |
| `src/components/organisms/HeroSection.tsx` | Hero image with `priority` prop (line 39) |
| `next.config.ts` | Image config (AVIF/WebP enabled, line 82), cache headers |

---

## Raw Measurements

### TTFB (3 runs from Madrid)

```
Homepage:  80ms / 49ms / 54ms  (avg: 61ms)
Rutas:    107ms / 109ms / 104ms (avg: 107ms)
Blog:      56ms / 49ms / 53ms  (avg: 53ms)
```

### Page Sizes (transferred)

```
Homepage:  104 KB HTML
Rutas:     109 KB HTML
Blog:      451 KB HTML (391 KB is RSC payload!)
```

### JS Footprint (homepage, compressed)

```
Total: 240 KB across 71 chunks
Top 5 chunks: 69.8 KB, 39.6 KB, 37.2 KB, 32.0 KB, 10.8 KB
```
