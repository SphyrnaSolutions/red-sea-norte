# Content Quality & E-E-A-T Audit -- buceoenelmarrojo.com

**Date:** 2026-03-08
**Auditor:** Content Quality Specialist (Sept 2025 QRG criteria)
**Site language:** Spanish (es)
**Niche:** Diving liveaboard, Red Sea (Hurghada, Egypt)

---

## Overall Content Quality Score: 38/100

This score reflects a site with strong commercial page content but a **critical rendering failure** on blog posts that makes 24+ articles invisible to search engines.

---

## CRITICAL FINDING: Blog Content Not Rendering in HTML

**Severity: P0 -- Blocks all blog SEO value**

All 24+ blog posts return only headings and navigation in the server-rendered HTML. The actual article body (paragraphs, tables, lists) is **absent from the initial HTML response**. The Wagtail CMS API contains the full content (verified: 15 rich_text blocks with thousands of words for the Ruta Norte vs Sur post), but the `BlockRenderer` component output does not appear in what `curl` (and likely Googlebot) receives.

**Evidence:**
- `curl` of `/blog/ruta-norte-vs-ruta-sur-mar-rojo` returns 231 words (navigation + headings only)
- Same URL via Wagtail API: 29 body blocks, 15 rich_text blocks, ~12,000 characters of article content
- Zero `<p>` tags in RSC payload for blog posts
- Zero occurrences of `prose` class in rendered HTML body
- Pattern is consistent across all tested blog posts (~224-231 words each)

**Likely cause:** The `BlockRenderer` renders server-side, but the RSC (React Server Components) payload is not inlining the HTML output. This could be a DOMPurify SSR issue (isomorphic-dompurify in Node.js), a hydration mismatch suppressing output, or the blocks receiving empty/null values from the data mapper.

**Impact:** Google indexes 24 blog posts as thin content (headings only). Posts advertised as "15-18 min reads" contain <250 words of crawlable text. This likely triggers Helpful Content signals for thin/empty content.

---

## Pages Audited

| Page | URL | Rendered Words | Minimum | Status |
|------|-----|---------------|---------|--------|
| Homepage | `/` | 858 | 500 | PASS |
| Routes listing | `/rutas/` | 368 | 500 | FAIL (thin) |
| Blog listing | `/blog/` | 556 | 500 | PASS |
| Contact | `/contacto/` | N/A | -- | **404 ERROR** |
| Ruta Norte y Pecios | `/rutas/norte-pecios` | 2,036 | 800 | PASS |
| Ruta Sur BDE | `/rutas/sur-bde` | 1,772 | 800 | PASS |
| Ruta Norte y Tiran | `/rutas/norte-tiran` | 2,011 | 800 | PASS |
| Blog: Abu Nuhas | `/blog/abu-nuhas-cementerio-de-barcos` | 224 | 1,500 | **FAIL (critical)** |
| Blog: Precio | `/blog/precio-vida-a-bordo-mar-rojo` | 228 | 1,500 | **FAIL (critical)** |
| Blog: Ruta N vs S | `/blog/ruta-norte-vs-ruta-sur-mar-rojo` | 231 | 1,500 | **FAIL (critical)** |
| Blog: Vida a bordo | `/blog/como-es-un-vida-a-bordo-mar-rojo` | 230 | 1,500 | **FAIL (critical)** |
| Blog: Thistlegorm | `/blog/ss-thistlegorm-guia-completa` | N/A | 1,500 | **404 ERROR** |

---

## E-E-A-T Breakdown

### Overall E-E-A-T Score: 34/100

| Factor | Weight | Score | Weighted | Notes |
|--------|--------|-------|----------|-------|
| Experience | 20% | 25/100 | 5.0 | No first-hand signals, no author bios, no dive logs or photos with attribution |
| Expertise | 25% | 40/100 | 10.0 | SSI certification mentioned; technical dive info is accurate; no author credentials shown |
| Authoritativeness | 25% | 30/100 | 7.5 | No external citations, no reviews, no press mentions, social links to personal accounts |
| Trustworthiness | 30% | 35/100 | 10.5 | Contact info present but uses placeholder phone (+20 123 456 7890); no real address; no reviews |

**Weighted Total: 33/100**

### Experience (25/100)

**Missing signals:**
- No author profiles or bios on any page
- No first-hand dive narratives or personal accounts
- No original photography attribution (images exist but no "shot by our team" signals)
- No dive log data, trip reports, or customer testimonials
- Blog author is generic "Red Sea Diving" -- not a named person with diving credentials
- No "about the team" or instructor profiles page found

**Present signals:**
- Specific boat name (M/Y Dolce Vita) suggests real operation
- Day-by-day itineraries with specific timing details
- Inclusion of real dive site depths and conditions

### Expertise (40/100)

**Present signals:**
- SSI certification prominently mentioned
- Accurate dive site descriptions (depths, marine life, conditions)
- Correct historical details (Thistlegorm 1941, Carnatic 1869)
- Practical information (Nitrox 28%, 12L tanks, visa details)
- Well-structured comparison content (Norte vs Sur)

**Missing signals:**
- No author credentials (instructor number, years of experience)
- No technical diving certifications displayed
- Blog posts lack body content in rendered HTML (expertise cannot be assessed by crawlers)
- No external expert contributions or interviews

### Authoritativeness (30/100)

**Present signals:**
- Custom domain (buceoenelmarrojo.com) matches niche
- Schema.org Organization markup
- Social profiles linked (Instagram, Facebook, TikTok for @karlossimon)

**Missing signals:**
- No external backlinks/citations visible
- No press coverage or media mentions
- No partnership badges (SSI center number, PADI affiliations)
- No Google Business Profile integration
- No customer reviews or testimonials from any platform
- No industry awards or recognitions

### Trustworthiness (35/100)

**Present signals:**
- Privacy Policy and Terms & Conditions pages linked
- HTTPS with Cloudflare
- GDPR consent checkbox on forms
- WhatsApp contact option
- Email and phone visible in footer

**Critical issues:**
- **Phone number is a placeholder:** `+20 123 456 7890` -- this is not a real Egyptian phone number
- **No physical address beyond "Hurghada, Mar Rojo, Egipto"** -- no street address
- **Contact page returns 404** -- users cannot reach a dedicated contact page
- No customer reviews or trust badges
- No booking/payment security indicators
- No business registration or license numbers
- Prices shown (desde 1.190 EUR) but no booking flow or payment page visible

---

## Content Depth & Uniqueness Analysis

### Homepage (`/`)
- **Words:** 858 (passes 500 minimum)
- **Unique content:** Strong commercial messaging with clear value proposition. Specific pricing (1.190 EUR), specific boat (M/Y Dolce Vita), specific route details.
- **Structure:** Hero > Lead form > Positioning section > Dive sites > Itinerary highlights > Target audience fit matrix > CTA
- **Keyword optimization:** Title includes "Vida a bordo en el Mar Rojo desde Hurghada | Ruta Norte y Pecios" -- well-optimized for primary commercial intent
- **Issues:**
  - "intención comercial" and "argumento de venta" appear in user-facing copy -- these are internal marketing notes accidentally published
  - "Ruta comercial pensada para explicar producto" visible on route pages -- same issue
  - Some duplicate paragraph content between hero and route summary sections

### Routes Listing (`/rutas/`)
- **Words:** 368 (**FAIL** -- below 500 minimum for listing pages)
- **Content:** Essentially a card listing with route names, durations, and one-line descriptions
- **Issues:**
  - No introductory content explaining what a liveaboard route is
  - No comparison guidance to help users choose
  - "La prioridad ya no es listar rutas sin contexto" -- internal strategic note published as visible text
  - All routes show identical metadata (8 days, 16-18 dives, Hurghada departure)

### Individual Route Pages (Norte Pecios, Sur BDE, Norte Tiran)
- **Words:** 1,772-2,036 (all pass 800 minimum for service pages)
- **Unique content:** Each route has unique dive site descriptions, day-by-day itineraries, and specific marine life details
- **Structure:** Hero > Route summary > Dive sites with depths > Day-by-day itinerary > "Is this for you?" section > FAQ > Lead form > What's included
- **Keyword optimization:** Titles well-optimized ("Ruta Norte y Pecios del Mar Rojo desde Hurghada")
- **Issues:**
  - Duplicate boilerplate across routes: "Ruta comercial pensada para explicar producto y encaje antes de pedir el lead" appears on all routes
  - H2 "Una semana de vida a bordo con spots que el usuario ya reconoce" is an internal label, not user content
  - "Pecios, corrientes y arrecifes en una sola semana" as itinerary H2 is identical across routes (even Sur BDE which focuses on sharks, not wrecks)
  - Some paragraphs are copy-pasted between routes (intro structure, FAQ answers)
  - Day 7 appears before Day 1 in the Sur BDE itinerary (ordering bug)

### Blog Posts (ALL AFFECTED by rendering issue)
- **Rendered words:** 224-231 per post (headings + navigation only)
- **Actual CMS content:** Posts contain 12,000+ characters of article content that is NOT being rendered
- **Advertised read time vs actual:** Posts claim "15-18 min" read time but deliver <250 crawlable words
- **This means:** All 24 blog posts are effectively **thin content** from Google's perspective

---

## Readability Analysis

Based on rendered content (homepage and route pages where content is visible):

| Metric | Homepage | Ruta Norte Pecios | Routes Listing |
|--------|----------|-------------------|----------------|
| Avg sentence length | 18 words | 22 words | 16 words |
| Passive voice | Low (~10%) | Moderate (~20%) | Low |
| Technical jargon | Appropriate for audience | Appropriate | Low |
| Estimated Flesch-Kincaid (Spanish equiv.) | ~55 (adequate) | ~50 (slightly dense) | ~65 (easy) |

**Notes:**
- Spanish prose is natural and reads well for a diving audience
- Good use of specific numbers (depths, prices, durations)
- Some sentences are overly long in route descriptions

---

## Thin Content Detection

| Page | Status | Details |
|------|--------|---------|
| `/contacto/` | **404** | Page does not exist |
| `/rutas/` | **THIN** | 368 words, mostly card labels |
| `/blog/ss-thistlegorm-guia-completa` | **404** | URL likely has encoding issue with accent |
| All 24 blog posts | **THIN** | 224-231 rendered words (headings only) |

**Total thin/broken pages identified: 26+**

---

## Duplicate / Near-Duplicate Content

### Confirmed Duplicates

1. **Route intro paragraphs:** The summary paragraph on each route page is duplicated verbatim between the hero section and the "Resumen de la Ruta" section.

2. **Internal strategy notes published as content:** The following phrases appear identically on multiple pages:
   - "Ruta comercial pensada para explicar producto y encaje antes de pedir el lead"
   - "Pecios y arrecifes en una sola semana"
   - "Salida desde Hurghada con narrativa clara de viaje"

3. **FAQ answers:** Several FAQ answers are identical or near-identical across routes (visa question, boat description, what's included).

4. **Footer content:** 144-word footer repeated on every page (expected, but counted in word totals).

### Near-Duplicate Risk

The three route pages that include Thistlegorm (Norte Pecios, Norte Tiran, Norte Brothers) share significant dive site description overlap for SS Thistlegorm, Ras Mohammed, and Carnatic.

---

## AI Citation Readiness Score: 42/100

| Factor | Score | Notes |
|--------|-------|-------|
| Quotable facts | 55/100 | Prices, depths, dates present on route pages |
| Structured data | 50/100 | Schema.org for Organization, BlogPosting, Breadcrumbs present |
| Clear hierarchy | 60/100 | Good H1-H2 structure on route pages |
| Definitive answers | 25/100 | Blog content not crawlable; no FAQ schema |
| Data freshness | 40/100 | 2026 dates present but all posts have same timestamp |

**Key gaps for AI citation:**
- Blog posts (which would be the main source of quotable answers) have no rendered body content
- No FAQ schema despite FAQ sections on route pages
- No structured pricing data (Product/Offer schema)
- No Review/Rating schema
- Route pages have good factual density but lack the breadth that blog content would provide
- All blog posts show identical `dateModified` (2026-03-08T17:09) suggesting batch publish, not organic freshness

---

## Keyword Optimization

### Title Tags

| Page | Title | Length | Assessment |
|------|-------|--------|------------|
| Homepage | "Vida a bordo en el Mar Rojo desde Hurghada \| Ruta Norte y Pecios" | 65 chars | Good -- primary keyword front-loaded |
| Routes | "Rutas de Vida a Bordo en el Mar Rojo \| Red Sea Norte" | 53 chars | Good |
| Ruta Norte | "Ruta Norte y Pecios del Mar Rojo desde Hurghada \| Red Sea Diving" | 66 chars | Good |
| Ruta Sur | "Ruta Sur BDE en el Mar Rojo: Brothers, Daedalus y Elphinstone \| Red Sea Diving" | 80 chars | **Truncated** (>60 chars) |
| Blog listing | "Red Sea Diving - Centro de Buceo Certificado SSI en el Mar Rojo" | 63 chars | **Wrong** -- uses generic site title, not blog-specific |
| Blog posts | "[Post title] \| Red Sea Diving Blog" | Varies | Good format but content not crawlable |

### Meta Descriptions

| Page | Meta Description | Assessment |
|------|-----------------|------------|
| Homepage | "Ruta Norte y Pecios desde Hurghada: vida a bordo en el Mar Rojo con spots iconicos, enfoque comercial claro y opcion de Advanced SSI a bordo." | **Contains internal jargon** ("enfoque comercial claro") |
| Routes | "Rutas de vida a bordo en el Mar Rojo desde Hurghada. Itinerarios centrados en Ruta Norte, pecios emblematicos y experiencias de buceo con intencion comercial clara." | **Contains internal jargon** ("intencion comercial clara") |
| Blog listing | "Cursos de buceo SSI, rutas por el Mar Rojo Norte y experiencias unicas de buceo en pecios. Certificacion profesional con los mejores instructores." | **Generic** -- not blog-specific |
| Blog posts | Well-written, unique per post | Good |

### H1 Tags

- All main pages have a single, well-optimized H1
- Blog posts have appropriate H1s
- Route pages: H1 matches title pattern well

### Keyword Stuffing Check

No keyword stuffing detected. Keyword usage is natural across all pages.

---

## Internal Linking Quality

### Strengths
- Navigation links to Rutas, Cursos, Experiencias, Blog
- Breadcrumbs on route and blog pages with schema markup
- Footer links to all main sections
- Blog listing links to all 24 posts

### Weaknesses
- **No cross-linking between blog posts** (in rendered HTML) -- all interlinks would be in the non-rendering body content
- **No blog-to-route links visible** in crawlable content
- **Route pages do not link to relevant blog posts** (e.g., Ruta Norte page does not link to Thistlegorm guide)
- **No "Related Routes" section** on route pages
- **Routes listing does not link to blog posts** for each route
- `/cursos` and `/experiencias` and `/ofertas` linked in nav but not verified (may also 404)
- The `RelatedContent` component exists in code but would depend on blog body content rendering

---

## CTA Effectiveness

### Homepage
- **Primary CTA:** "Consultar viaje" lead form -- well-positioned, above fold
- **Secondary CTA:** "Explorar Ruta Norte" -- good follow-through
- **Form:** Includes level selector and travel month -- good qualification
- **Issue:** "Abrir formulario ampliado" is unclear as a CTA label

### Route Pages
- **Primary CTA:** Lead capture form at bottom
- **Secondary CTA:** "Consultar esta ruta" button
- **Issue:** CTA is at the very bottom after 2000 words -- no mid-content CTAs
- **Issue:** No urgency signals beyond "Las plazas son limitadas"
- **Issue:** Price anchor "Desde 1.190 EUR" is good but appears only at bottom

### Blog Posts
- **No CTAs visible** (body content not rendering)
- Code includes `CTABlock` component but it depends on CMS content rendering

---

## Content Freshness Signals

| Signal | Status | Notes |
|--------|--------|-------|
| Blog post dates | All 2026-03-08 | All 24 posts have identical timestamp -- looks like batch import |
| `dateModified` in schema | Same as `datePublished` | No update signals |
| Copyright year | 2026 | Current |
| Price references | "Desde 1.190 EUR" | No date context for pricing |
| Seasonal content | References to months | No "updated for 2026" signals |
| Route dates | "2026" in homepage hero | Good current year signal |

---

## AI Content Quality Assessment (Sept 2025 QRG)

### Markers Detected

| Marker | Severity | Evidence |
|--------|----------|----------|
| Generic phrasing | MEDIUM | Route summaries use formulaic structure |
| Repetitive structure across pages | HIGH | All route pages follow identical template with identical H2s |
| Internal strategy notes as content | HIGH | "enfoque comercial", "intencion comercial", "ruta comercial pensada para explicar producto" |
| No original insight | HIGH | No first-hand dive accounts, no unique photos with attribution |
| Batch-published dates | MEDIUM | All 24 blog posts published at same timestamp |
| Factual accuracy | LOW RISK | Dive site details are accurate and specific |

### Assessment

The content shows signs of systematic generation with a commercial template. Route pages follow an identical structure with some shared boilerplate. However, the factual details (dive site depths, marine species, historical dates) are specific and accurate, which suggests expert input even if the prose was generated or templated.

The biggest AI content quality concern is the **internal marketing notes published as user-facing content**, which strongly suggest the content was generated from prompts that included strategic objectives, and those objectives were not cleaned from the output.

---

## Priority Recommendations

### P0 -- Critical (Blocks SEO entirely)

1. **Fix blog content rendering.** The `BlockRenderer` / `RichTextBlock` components are not outputting body content in the server-rendered HTML. This affects all 24 blog posts. Likely causes to investigate:
   - `isomorphic-dompurify` SSR behavior (may sanitize to empty string in Node.js)
   - Data mapper not correctly populating `block.value.content` for rich_text blocks
   - RSC serialization stripping HTML from `dangerouslySetInnerHTML`

2. **Fix `/contacto/` returning 404.** A diving operation site without a working contact page is a serious trust signal failure.

3. **Fix `/blog/ss-thistlegorm-guia-completa` 404.** The accent in "guia" may cause URL encoding issues.

### P1 -- High Priority

4. **Remove internal marketing notes from published content.** Search for and remove all instances of:
   - "enfoque comercial"
   - "intencion comercial"
   - "ruta comercial pensada para explicar producto y encaje antes de pedir el lead"
   - "spots que el usuario ya reconoce"
   - Any text referencing "lead", "conversion", or "producto" in a marketing context

5. **Replace placeholder contact info.** `+20 123 456 7890` is not a real phone number. Use actual business phone or remove.

6. **Add FAQ schema** to route pages that have FAQ sections.

7. **Add Product/Offer schema** for route pricing (1.190 EUR, 1.290 EUR).

### P2 -- Medium Priority

8. **Expand routes listing page** from 368 to 500+ words with introductory content about liveaboard diving.

9. **Add author profiles** with real names, diving credentials, and instructor numbers.

10. **Deduplicate route intro paragraphs** (currently copy-pasted between hero and summary sections).

11. **Fix blog listing title tag** to be blog-specific instead of generic site title.

12. **Fix Day ordering** on Sur BDE route (Day 7 appears before Day 1).

13. **Add mid-content CTAs** on route pages (currently only at bottom).

### P3 -- Improvement

14. **Add customer testimonials/reviews** to route pages.

15. **Add Google Business Profile** and link from site.

16. **Differentiate blog post dates** (batch publish of 24 posts on same day is a negative signal).

17. **Add cross-links** between related route pages and between routes and blog posts.

18. **Create an "About Us" / "Our Team" page** with instructor profiles, diving experience, and certifiable credentials.

19. **Add Review/Rating schema** when customer reviews are available.

---

## Score Breakdown Summary

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| E-E-A-T | 33/100 | 30% | 9.9 |
| Content Depth | 30/100 | 25% | 7.5 |
| Technical SEO Content | 35/100 | 15% | 5.3 |
| AI Citation Readiness | 42/100 | 10% | 4.2 |
| Keyword Optimization | 60/100 | 10% | 6.0 |
| Internal Linking | 35/100 | 5% | 1.8 |
| Content Freshness | 40/100 | 5% | 2.0 |
| **TOTAL** | | **100%** | **36.7/100** |

**Rounded overall score: 38/100** (accounting for the strong route page content that partially compensates)

---

## Files Relevant to Fixing P0 Issues

- Blog post page: `src/app/blog/[slug]/page.tsx`
- Block renderer: `src/components/blocks/BlockRenderer.tsx`
- Rich text block: `src/components/blocks/RichTextBlock.tsx` (uses `isomorphic-dompurify`)
- Data layer: `src/lib/data/blog.ts`
- Wagtail fetcher: `src/lib/wagtail/fetchers.ts`
- Wagtail mapper: `src/lib/wagtail/mappers.ts`
