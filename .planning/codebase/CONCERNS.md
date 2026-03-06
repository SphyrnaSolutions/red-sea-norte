# Codebase Concerns

**Analysis Date:** 2026-03-06

## Tech Debt

**Lead form submissions are fake (no backend)**
- Issue: Both `LeadFormModal` and `InlineLeadSection` simulate API calls with `setTimeout` and log to console. No actual form data is sent anywhere.
- Files: `src/components/organisms/LeadFormModal.tsx` (line 75-76), `src/components/organisms/InlineLeadSection.tsx` (line 61-63)
- Impact: All lead capture forms on the site are non-functional in production. Users fill forms that go nowhere.
- Fix approach: Implement a real form submission endpoint (e.g., `/api/leads/route.ts`) that sends data to a CRM, email service, or database. Replace `setTimeout` simulation with actual `fetch` calls.

**Newsletter form is purely decorative**
- Issue: The `NewsletterBlock` in blog posts renders an email input and button with no submission logic whatsoever -- no `onSubmit` handler, no state management, no API call.
- Files: `src/app/blog/[slug]/page.tsx` (lines 658-702)
- Impact: Users enter emails that are silently discarded.
- Fix approach: Add form state and connect to a newsletter service (Mailchimp, Resend, etc.) or remove the block until ready.

**Axios used instead of native fetch -- breaks Next.js ISR caching**
- Issue: The Wagtail client uses `axios` instead of `fetch`. Next.js only supports automatic ISR caching and revalidation with native `fetch`. The codebase uses `unstable_cache` as a workaround, but this adds complexity and may behave differently from native fetch caching.
- Files: `src/lib/wagtail/client.ts` (line 16-28)
- Impact: Potential cache inconsistencies and reliance on `unstable_cache` API that may change between Next.js versions.
- Fix approach: Migrate from axios to native `fetch` with Next.js `revalidate` and `tags` options, removing the need for `unstable_cache` wrappers in the data layer.

**Hardcoded fallback content scattered in mappers**
- Issue: The homepage mapper (`mapHomePage`) contains many hardcoded Spanish strings as fallbacks (e.g., `'Descubre el Mar Rojo'`, `'Solicita informacion'`, `'Por que esta ruta'`). The `audienceFit` section is entirely hardcoded with no CMS source. The `journeyOverview` also contains hardcoded `fitItems` and `note` fields.
- Files: `src/lib/wagtail/mappers.ts` (lines 175-389 -- especially `audienceFit` at 299-318, `journeyOverview` at 273-287)
- Impact: Content cannot be edited via CMS. Changes require code deployments.
- Fix approach: Add corresponding fields to the Wagtail `HomePage` model and map them. Remove hardcoded fallbacks once CMS data is reliable.

**Massive page components with inline sub-components**
- Issue: Route detail pages (`rutas/[slug]/page.tsx`, `experiencias/[slug]/page.tsx`, `blog/[slug]/page.tsx`) contain 10+ sub-components defined inline, each with extensive inline styles. These files are 700-1020 lines long.
- Files: `src/app/rutas/[slug]/page.tsx` (995 lines), `src/app/experiencias/[slug]/page.tsx` (1020 lines), `src/app/blog/[slug]/page.tsx` (703 lines)
- Impact: Difficult to maintain, test, or reuse. Risk of unintentional regressions when editing. Block renderers for blog and experiencias are duplicated rather than shared.
- Fix approach: Extract sub-components into separate files under `src/components/`. Create a shared `BlockRenderer` component used by both blog and experiencia pages.

**Duplicate block renderers between blog and experiencias**
- Issue: Blog post and experiencia pages each define their own `RichTextBlock`, `HeadingBlock`, `ImageBlock`, `QuoteBlock`, `InfoCardsBlock`, `GalleryBlock`, `TwoColumnBlock`, and `CTABlock` components with nearly identical implementations but slightly different prop interfaces.
- Files: `src/app/blog/[slug]/page.tsx` (lines 277-703), `src/app/experiencias/[slug]/page.tsx` (lines 308-1020)
- Impact: Bug fixes or style changes must be applied in two places. Divergence risk is high.
- Fix approach: Extract shared block renderers into `src/components/blocks/` with a unified interface, then import from both pages.

**Hardcoded section fallbacks in ruta pages**
- Issue: Functions `getSummarySection`, `getSpotsSection`, `getPracticalInfo` in the ruta detail page generate hardcoded fallback sections when Wagtail data is missing. Comments explicitly note these are "Bloque de apoyo mientras Wagtail mantiene el esquema actual."
- Files: `src/app/rutas/[slug]/page.tsx` (lines 167-218)
- Impact: Ruta pages show generic placeholder content when CMS fields are not populated. This is acceptable during development but must be addressed for production.
- Fix approach: Add `summarySection`, `spotsSection`, and `practicalInfo` fields to the Wagtail `RutaPage` model and mapper. Remove fallback generators.

**Duplicate modal store re-export**
- Issue: `src/stores/useModalStore.ts` is a re-export of `src/lib/stores/useModalStore.ts`. Both paths are used in different components.
- Files: `src/stores/useModalStore.ts`, `src/lib/stores/useModalStore.ts`, `src/components/organisms/InlineLeadSection.tsx` (imports from `@/stores/`), `src/components/organisms/LeadFormModal.tsx` (imports from `@/lib/stores/`)
- Impact: Confusing import paths. If someone creates a new store at the wrong path, they may get a different Zustand instance.
- Fix approach: Pick one canonical location (`src/lib/stores/useModalStore.ts`) and update all imports. Delete the re-export file.

## Known Bugs

**`personas_viendo` field on ofertas is static**
- Symptoms: The "personas viendo" (people viewing) count on offer pages is a static number from the CMS, not real-time.
- Files: `src/lib/wagtail/types.ts` (line 178), `src/app/ofertas/[slug]/page.tsx` (line 130)
- Trigger: Viewing any oferta page
- Workaround: This may be intentional as a marketing tactic, but it could mislead users and may violate consumer protection laws in some jurisdictions.

## Security Considerations

**XSS via dangerouslySetInnerHTML with CMS content**
- Risk: Rich text content from Wagtail is rendered directly via `dangerouslySetInnerHTML` without sanitization. If Wagtail content is compromised or a malicious editor adds scripts, XSS is possible.
- Files: `src/app/blog/[slug]/page.tsx` (lines 321, 559, 649), `src/app/experiencias/[slug]/page.tsx` (lines 784, 960)
- Current mitigation: Wagtail's admin interface provides some content sanitization, and CMS access is restricted to trusted editors.
- Recommendations: Add server-side HTML sanitization (e.g., `sanitize-html` or `DOMPurify` with JSDOM) before rendering any CMS rich text content.

**Preview API has no authentication**
- Risk: The preview endpoint at `/api/preview` activates Draft Mode based on a `token` and `content_type` parameter, but does not validate the token against a shared secret. Anyone who discovers the endpoint pattern can enable Draft Mode.
- Files: `src/app/api/preview/route.ts` (lines 4-62)
- Current mitigation: Draft mode only affects the requesting user's session via cookies. The preview data still comes from Wagtail's preview API which has its own token validation.
- Recommendations: Add a shared secret validation (e.g., `PREVIEW_SECRET` env var) and verify the token against Wagtail's expected preview tokens before enabling Draft Mode.

**No CSRF protection on lead forms**
- Risk: Lead forms (`LeadFormModal`, `InlineLeadSection`) have no CSRF token validation. Once a real submission endpoint exists, this becomes exploitable.
- Files: `src/components/organisms/LeadFormModal.tsx`, `src/components/organisms/InlineLeadSection.tsx`
- Current mitigation: Forms currently don't submit anywhere (simulated only), so CSRF is not exploitable yet.
- Recommendations: When implementing real form submission, include CSRF token generation and validation.

**No Content-Security-Policy header**
- Risk: The site sets good security headers (HSTS, X-Frame-Options, X-Content-Type-Options) but lacks a Content-Security-Policy header, which is the most important defense against XSS.
- Files: `next.config.ts` (lines 3-28)
- Current mitigation: Other headers provide partial protection.
- Recommendations: Add a CSP header, at minimum restricting `script-src` to `'self'` and any required CDNs (fontshare.com for fonts).

## Performance Bottlenecks

**External font loaded via render-blocking link tag**
- Problem: Satoshi and Clash Display fonts are loaded from `api.fontshare.com` via a `<link>` tag in `<head>`, which is render-blocking.
- Files: `src/app/layout.tsx` (lines 38-40)
- Cause: External stylesheet blocks rendering until the font CSS is downloaded.
- Improvement path: Use `next/font` with local font files or `next/font/google` equivalent. If fontshare.com is needed, add `rel="preload"` and `font-display: swap` or load asynchronously.

**No image optimization for Wagtail images**
- Problem: Images from Wagtail are served at their original resolution. The `next/image` component handles client-side optimization, but the original Wagtail URLs bypass Next.js Image Optimization for external sources unless properly configured.
- Files: `next.config.ts` (lines 40-62), `src/lib/wagtail/mappers.ts` (function `getImageUrl`)
- Cause: Wagtail image URLs may not include width/height parameters, forcing browsers to download full-size images.
- Improvement path: Use Wagtail's image rendition API to request appropriately sized images (e.g., `?width=800`). Ensure `width` and `height` are passed to `next/image` for all CMS images to avoid layout shift.

**Sitemap uses `new Date()` for all lastModified**
- Problem: Every URL in the sitemap has `lastModified: new Date()`, which changes on every build/request. Search engines cannot distinguish actually modified content.
- Files: `src/app/sitemap.ts` (lines 23-78)
- Cause: Actual modification dates from Wagtail (`first_published_at`) are not propagated to the sitemap.
- Improvement path: Pass `publishedAt` or `lastModified` dates from the Wagtail API through to the sitemap entries.

**Mock data files are excessively large**
- Problem: `src/lib/mock-data/blog-posts.ts` is 2249 lines of inline content data. Other mock files are similarly large.
- Files: `src/lib/mock-data/blog-posts.ts` (2249 lines), `src/lib/mock-data/rutas.ts` (548 lines), `src/lib/mock-data/homepage.ts` (383 lines)
- Cause: Fallback data contains full content including multi-paragraph descriptions, StreamField blocks, and inline image URLs.
- Improvement path: Move mock data to JSON fixture files. Consider removing mock fallback entirely once the Wagtail CMS is stable in production, or load fixtures only in development mode.

## Fragile Areas

**Wagtail mapper layer with extensive type casting**
- Files: `src/lib/wagtail/mappers.ts` (753 lines)
- Why fragile: Functions like `asLeadField`, `asWhyTopRow`, `asSpecBigCard` cast `unknown` to specific types without runtime validation. If Wagtail API response structure changes, data will silently pass through with wrong shapes, causing runtime errors in components.
- Safe modification: Add runtime validation (e.g., Zod schemas) for critical Wagtail API responses. At minimum, add null checks for nested properties.
- Test coverage: No tests exist for any mapper function.

**Data layer fallback cascade**
- Files: `src/lib/data/homepage.ts`, `src/lib/data/blog.ts`, `src/lib/data/rutas.ts`, `src/lib/data/experiencias.ts`, `src/lib/data/ofertas.ts`, `src/lib/data/cursos.ts`
- Why fragile: The data layer tries Wagtail API first, then falls back to mock data on failure. This means API failures can silently serve stale/incorrect mock data in production without anyone noticing. The `shouldUseFallback` function in `src/lib/data/config.ts` has a `FALLBACK_MODE` env var but defaults to `'full'` (always fallback).
- Safe modification: Set `FALLBACK_MODE=none` in production. Add monitoring/alerting when fallback is triggered.
- Test coverage: No tests for the data layer or fallback logic.

**StreamField block rendering with unknown types**
- Files: `src/app/blog/[slug]/page.tsx` (line 300), `src/app/experiencias/[slug]/page.tsx` (line 343)
- Why fragile: Both `BlockRenderer` and `SectionRenderer` return `null` for unknown block types. If Wagtail editors add new block types, they silently disappear from the page with no warning.
- Safe modification: Add a development-only warning component that renders for unknown types. Log unknown types in production.
- Test coverage: No tests.

## Scaling Limits

**No pagination in Wagtail API calls**
- Current capacity: Works with small content sets (likely <50 pages per type).
- Limit: `getPages` in `src/lib/wagtail/client.ts` fetches all pages of a type without pagination. Wagtail API defaults to 20 items per page, so content beyond page 1 is never fetched.
- Scaling path: Add `limit` and `offset` parameters to `getPages`. Implement recursive fetching or pass explicit pagination params for content types that could grow large (blog posts especially).

## Dependencies at Risk

**`unstable_cache` from Next.js**
- Risk: The `unstable_cache` API is used throughout the data layer but is explicitly marked as unstable in Next.js. It may change or be removed in future versions.
- Impact: All 6 data layer files depend on it for caching.
- Migration plan: When migrating to native `fetch`, use `fetch` cache options (`next: { revalidate, tags }`) instead. Alternatively, monitor Next.js releases for the stable cache API.

**Fontshare CDN dependency**
- Risk: External CDN at `api.fontshare.com` is a single point of failure for font loading. If the CDN goes down, the site falls back to system fonts with potential layout shift.
- Impact: Visual degradation on CDN failure.
- Migration plan: Self-host Satoshi and Clash Display fonts. Download font files and serve them from `/public/fonts/` using `@font-face` declarations or `next/font/local`.

## Missing Critical Features

**No form submission backend**
- Problem: The entire lead generation flow (the site's primary business purpose) has no backend. Forms simulate submission and log to console.
- Blocks: Cannot capture any leads, which is the site's core conversion goal.

**No error monitoring**
- Problem: Error tracking uses only `console.error`. The error page has a TODO for Sentry integration.
- Files: `src/app/error.tsx` (line 15)
- Blocks: Production errors go unnoticed until users report them.

**No analytics integration**
- Problem: No Google Analytics, Plausible, Umami, or any analytics solution is integrated.
- Blocks: Cannot measure traffic, user behavior, conversion rates, or SEO performance.

**No i18n support**
- Problem: The site targets Spanish-speaking users (`lang="es"`) but has no internationalization framework. Some content mixes Spanish and English (e.g., CMS field names in English, UI text in Spanish).
- Blocks: Cannot expand to other languages without significant refactoring.

## Test Coverage Gaps

**Zero test files in the project**
- What's not tested: Every single module -- components, data layer, mappers, API routes, utilities, stores.
- Files: No `*.test.*` or `*.spec.*` files exist anywhere in `src/`.
- Risk: Any change can introduce regressions without detection. The mapper layer (`src/lib/wagtail/mappers.ts`) is particularly at risk due to complex data transformations. The data layer fallback logic is untested.
- Priority: **High** -- The mapper layer and data layer should be tested first as they are the most fragile parts of the system. Component tests can follow.

---

*Concerns audit: 2026-03-06*
