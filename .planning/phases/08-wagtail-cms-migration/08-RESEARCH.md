# Phase 8: Wagtail CMS Migration - Research

**Researched:** 2026-03-07
**Domain:** Wagtail CMS content migration + Next.js headless frontend integration
**Confidence:** HIGH

## Summary

The Wagtail CMS backend at `back.redsea.sphyrnasolutions.com` already has full models for **all** page types needed: `HomePage`, `RutaPage`, `ExperienciaPage`, `CursoPage`, `OfertaPage`, and `BlogPostPage`. The frontend already has a complete integration layer: Wagtail API client (`src/lib/wagtail/client.ts`), type-specific fetchers (`fetchers.ts`), API-to-frontend mappers (`mappers.ts`), and a data layer (`src/lib/data/`) that tries CMS first and falls back to mock-data on error. **33 images are already uploaded to Wagtail** with IDs 1-33.

The primary work is: (1) populate the existing Wagtail models with real product data from PRODUCT-DATA.md, (2) fix mapper/model mismatches discovered during research, (3) add missing fields to the RutaPage model for sections the frontend expects but Wagtail doesn't serve (summarySection, spotsSection, audienceFit, practicalInfo, faqSection, resourcesSection), and (4) verify the API actually returns correct data for all page types.

**Primary recommendation:** Populate content via the Wagtail admin UI (not API), fix the mapper/type mismatches, add missing RutaPage fields, and keep mock-data as dev fallback.

## 1. Current Wagtail Backend State

### Existing Models (All Already Created)

| App | Model | Parent Type | Key Fields | Status |
|-----|-------|-------------|------------|--------|
| `home` | `HomePage` | `Page` | hero (image, badge, title, subtitle, CTAs), why_section, dive_sites, program_section, spec_section, lead_form, cta | EXISTS - needs content |
| `rutas` | `RutaPage` + `ItineraryDay` | `Page` + `Orderable` | hero (flat fields), story_intro, info_cards, itinerary_days, incluye, cta_section | EXISTS - needs content + new fields |
| `experiencias` | `ExperienciaPage` | `Page` | hero, sections (StreamField), primary_route FK, lead_form | EXISTS - needs content |
| `cursos` | `CursoPage` + `CourseModule` | `Page` + `Orderable` | hero, course details, curriculum, prerequisites, sections | EXISTS - needs content |
| `ofertas` | `OfertaPage` | `Page` | hero, pricing, validity dates, sections, testimonials | EXISTS - needs content |
| `blog` | `BlogPostPage` + `BlogIndexPage` | `Page` | excerpt, author FK, category FK, hero, body StreamField | EXISTS - 25 posts already |
| `core` | `SEOMixin`, `ClusterMixin`, `SiteSettings` | Abstract models | meta_description, cluster_id, cluster_role, pillar_slug, schema_type, primary_keyword | EXISTS |

### API Endpoints

| Endpoint | Purpose | Auth |
|----------|---------|------|
| `/api/v2/pages/` | Standard Wagtail pages API (read) | Public (read-only) |
| `/api/v2/images/` | Standard Wagtail images API | Public (read-only) |
| `/api/v2/content/images/` | Custom image upload API | Token required |
| `/api/v2/content/blog-posts/` | Custom blog post creation API | Token required |
| `/api/v2/content/authors/` | Author management | Token required |
| `/api/v2/content/categories/` | Category management | Token required |

**API Token:** `1abca6db19d5e58e0b9a2b5ee40d1a7be2ec55d9`
**Base URL:** `https://back.redsea.sphyrnasolutions.com`

### Mixins on All Content Pages

Every content page (HomePage, RutaPage, ExperienciaPage, CursoPage, OfertaPage, BlogPostPage) inherits:
- `SEOMixin`: meta_description, meta_keywords, social_title, social_description, social_image
- `ClusterMixin`: cluster_id, cluster_role, pillar_slug, schema_type, primary_keyword
- `HeadlessPreviewMixin`: Draft preview support

### Images Already in Wagtail

33 images uploaded with IDs 1-33 in collections:
- Boat, Deck, Dining, Cabins, Underwater, Wrecks, Landmarks, Salon, Equipment

## 2. CRITICAL: Mapper/Model Mismatches

### RutaPage Mismatch (HIGH PRIORITY)

The frontend `WagtailRutaPage` type and mapper expect a DIFFERENT field structure than the actual Django model provides:

| Frontend Expects (types.ts) | Actual Django Model | Impact |
|-----------------------------|---------------------|--------|
| `hero: WagtailStreamFieldBlock[]` | `hero_background_image`, `hero_badge`, `hero_title`, `hero_subtitle` (flat fields) | Mapper treats hero as StreamField, but model uses flat fields |
| `story_intro_badge: string` | NOT in model (only `story_intro_title`, `story_intro_content`) | Missing field |
| `story_intro_description: string` | `story_intro_content: TextField` | Field name mismatch |
| `cta_title`, `cta_description`, `cta_primary_text`, `cta_primary_link` | `cta_section: StreamField([('cta', CTABlock())])` | Flat fields expected but model uses StreamField |
| `cta_background_image: WagtailImage` | NOT in model | Missing field |

**Root cause:** The frontend types/mappers were likely written against a planned schema, not the actual deployed model. The mapper will crash or return empty data when it tries to access `wagtailPage.hero[0]?.value` on flat fields.

**Fix required:** Either (a) update the Django model to match what the mapper expects, or (b) update the mapper and types to match the actual model. Option (b) is safer since the model is deployed.

### HomePage -- Likely Working

The HomePage model has many flat fields that the mapper directly accesses. However, several fields the mapper references are NOT in the Django model:
- `hero_trust_line` -- not in model
- `dive_sites_title`, `dive_sites_subtitle`, `dive_sites` -- not in model
- `program_section_*` fields -- not in model
- `spec_*` fields -- not in model
- `lead_form_*` fields -- not in model

The Django HomePage model only has: hero fields, why_section (title, subtitle, cards StreamField), and cta fields. The mapper references ~30 fields that don't exist on the model.

**Impact:** The homepage mapper produces mostly empty/default data from Wagtail, which explains why mock-data fallback is being used. The HomePage model needs SIGNIFICANT expansion to match what the frontend expects.

## 3. Frontend Architecture (Already Built)

### Data Flow

```
Page Component (src/app/page.tsx)
  --> Data Layer (src/lib/data/homepage.ts)
    --> Wagtail Fetcher (src/lib/wagtail/fetchers.ts)
      --> Wagtail Client (src/lib/wagtail/client.ts)
        --> Wagtail API (back.redsea.sphyrnasolutions.com/api/v2/)
      --> Mapper (src/lib/wagtail/mappers.ts)
    --> On error: Mock Data Fallback (src/lib/mock-data/homepage.ts)
```

### Fallback Configuration

```typescript
// src/lib/data/config.ts
// Development: FALLBACK_MODE='full' (always falls back)
// Production: FALLBACK_MODE='critical' (only homepage + blog fall back)
```

**Key insight:** In production, only `homepage` and `blog` content types get fallback. If Wagtail is down for rutas, experiencias, cursos, or ofertas, those pages WILL error. This is by design -- the CMS is the source of truth for those page types.

### Environment Variables

```
NEXT_PUBLIC_WAGTAIL_API_URL=https://back.redsea.sphyrnasolutions.com/api/v2
NEXT_PUBLIC_SITE_HOSTNAME=buceoenelmarrojo.com
```

### Caching Strategy

| Content Type | Revalidate (seconds) | Tags |
|-------------|---------------------|------|
| Homepage | 600 (10 min) | `['homepage']` |
| Rutas | 1800 (30 min) | `['rutas', 'ruta-{slug}']` |
| Blog | 3600 (1 hour) | `['blog', 'blog-{slug}']` |

## 4. Mock-Data Structure Analysis

### Fields the Frontend Expects per Page Type

#### Homepage (HomepageData)
- `hero`: backgroundImage, badge, title, subtitle, ctas, trustLine
- `routeValueSection`: title, subtitle, cards[] (eyebrow, title, description, image)
- `whySection`: title, subtitle, topRow[], bottomRow[]
- `diveSites`: title, subtitle, sites[] (name, image, depth, highlight)
- `journeyOverview`: eyebrow, title, subtitle, highlights[], includesTitle, includes[], fitTitle, fitItems[], note
- `programSection`: title, subtitle, includes[], price (amount, badge, perPerson, highlight)
- `audienceFit`: title, subtitle, profiles[] (title, description, tone)
- `specSection`: sectionLabel, bigCard, specialtyCards[], mainTitle, navCards[], cta
- `leadForm`: title, subtitle, fields[], submitButton, privacyText, successMessage, consentText
- `inlineLead`: sectionId, eyebrow, title, subtitle, highlights[], fields[], submitButton, etc.
- `routeTeaser`: eyebrow, title, description, primaryCTA, secondaryCTA
- `ctaSection`: title, description, primaryCTA

#### RutaPage (RutaData)
- Core: slug, title, hero, storyIntro, infoCards[], itinerary (title, days[]), incluye, cta
- Optional (used by norte-7-dias): summarySection, spotsSection, audienceFit, practicalInfo, faqSection, resourcesSection, inlineLead, leadForm

#### ExperienciaPage (ExperienciaData)
- slug, title, description, hero, sections[] (StreamField), primaryRoute, alternativeRoutes, leadForm, seo

#### CursoPage (CursoData)
- slug, title, badge, hero, infoBars[], queAprendes, modulos, requisitos, incluye, cta

#### OfertaPage (OfertaData)
- slug, badge, hero, urgencia, precio, beneficios[], testimonios[], cta

## 5. Real Product Data to Migrate

### Source: `.planning/seo/PRODUCT-DATA.md` + `.planning/seo/routes/`

#### Boat: M/Y Dolce Vita
- Eslora: 40m, Manga: 8.5m, Cubiertas: 4, Camarotes: 12, Capacidad: 24 pax
- Fleet: Divers Fleet
- Pension completa: 7 noches

#### Pricing
- Desde: 1,190 EUR (varies by route)

#### Training Included (FREE)
- Advanced Open Water SSI
- 4 SSI specialties (vary by route)
- Certification: SSI
- Compatible with SSI, PADI, ACUC, FEDAS or other
- Seminars on board

#### 5 Routes to Create
| Route | Price From | Key Spots |
|-------|-----------|-----------|
| Ruta Norte y Tiran | 1,190 EUR | Northern reefs + Strait of Tiran |
| Ruta Norte y Pecios | 1,190 EUR | SS Thistlegorm, Abu Nuhas, Ras Mohammed, Dunraven, Rosalie Moller |
| Ruta Tiran y Blue Hole | 1,230 EUR | Tiran + Dahab Blue Hole |
| Ruta Norte y Brothers | 1,230 EUR | North + Brothers Islands |
| Ruta Sur BDE | 1,290 EUR | Brothers, Daedalus, Elphinstone |

#### Detailed Route Data Available
Full itineraries (day-by-day), dive sites with depths, FAQs, includes/excludes lists exist in `.planning/seo/routes/` for all 5 routes.

## 6. Gap Analysis: What Needs to Change

### Wagtail Model Changes Required

#### A. HomePage Model Expansion (LARGE)

The current `HomePage` model only has: hero (6 fields), why_section (3 fields), cta (4 fields). The frontend expects ~40+ fields. Fields to ADD:

```
# Dive Sites Section
dive_sites_title, dive_sites_subtitle
dive_sites = StreamField([('dive_site', StructBlock(...))])

# Program Section
program_section_title, program_section_subtitle
program_section_includes = StreamField(...)
program_section_price_amount, price_badge, price_per_person, price_highlight

# Spec Section
spec_section_label, spec_big_card, spec_specialty_cards, spec_main_title
spec_nav_cards, spec_cta_price, spec_cta_details, spec_cta_button_text

# Lead Form
lead_form_title, lead_form_subtitle, lead_form_fields
lead_form_submit_button, lead_form_privacy_text, lead_form_success_message

# Trust Line
hero_trust_line
```

**Alternative:** Instead of expanding the model, create the homepage content in Wagtail with a simplified model and have the mapper fill defaults for unused sections. Or continue using mock-data for the homepage and focus CMS migration on rutas first.

#### B. RutaPage Model Changes (MEDIUM)

Missing fields that the frontend RutaData type expects:
- `story_intro_badge` (model only has `story_intro_title`)
- Summary section fields (eyebrow, title, subtitle, bullets)
- Spots section (title, subtitle, spots[])
- Audience fit section (title, subtitle, profiles[])
- Practical info section (included, extras, logistics)
- FAQ section (title, items[])
- Resources section (title, subtitle, items[])
- Inline lead form fields
- CTA flat fields (model uses StreamField)

#### C. RutaPage Mapper Fix (HIGH PRIORITY)

The mapper assumes `hero` is a StreamField block array, but the model uses flat fields. This WILL cause runtime errors. Fix by updating the mapper to read flat fields:

```typescript
// BROKEN (current):
const heroBlock = (wagtailPage.hero[0]?.value as WagtailHeroValue) || {}

// FIXED:
const hero = {
  backgroundImage: getImageUrl(wagtailPage.hero_background_image),
  badge: normalizeBadge(wagtailPage.hero_badge),
  title: wagtailPage.hero_title || wagtailPage.title,
  subtitle: wagtailPage.hero_subtitle || '',
}
```

### Frontend Changes Required

1. **Fix WagtailRutaPage type** -- match actual model fields (flat hero, story_intro_content)
2. **Fix mapRutaPage mapper** -- read flat hero fields, map story_intro_content to description
3. **Fix WagtailHomePage type** -- add missing fields or mark them optional
4. **Update fallback config** -- ensure rutas fall back in production until CMS is populated

## 7. Recommended Migration Strategy

### Phase Order

1. **Fix mapper/type mismatches** -- make existing code work with the actual Wagtail model structure
2. **Expand Wagtail models** -- add missing fields to RutaPage (FAQ, spots, audience fit, etc.) and HomePage
3. **Populate Ruta Norte y Pecios** -- the primary route, with full real data from PRODUCT-DATA.md
4. **Populate remaining 4 routes** -- using data from `.planning/seo/routes/`
5. **Populate HomePage** -- with real product data
6. **Populate Experiencia, Curso, Oferta pages** -- secondary content
7. **Verify API responses** -- test all endpoints return expected data
8. **Update fallback config** -- switch to CMS-primary for all content types

### Content Population Method

Use the **Wagtail Admin UI** (`/admin/`) for content creation, NOT the API. Reasons:
- The content creation API only covers blog posts and images
- No content creation ViewSets exist for HomePage, RutaPage, ExperienciaPage, CursoPage, OfertaPage
- The admin UI handles StreamField, Orderable (ItineraryDay), and image selection natively
- Creating content via API would require building new ViewSets (scope creep)

**Alternative for bulk creation:** Write a Django management command that creates pages programmatically using Wagtail's page tree API. This is faster for 5 routes with 7 itinerary days each.

### Mock-Data Retention

Keep mock-data files as **dev fallback** per existing architecture:
- `FALLBACK_MODE='full'` in development (already configured)
- `FALLBACK_MODE='critical'` in production (already configured)
- Mock-data files stay in `src/lib/mock-data/` but are ONLY used when Wagtail is unreachable

## 8. Known Issues and Risks

### Wagtail API 500 on `/pages/` for rutas

The user reported that `/api/v2/pages/?type=rutas.RutaPage&slug=norte-7-dias` returns 500. Possible causes:
- No RutaPage published yet (empty query with type filter)
- ItineraryDay Orderable serialization error
- StreamField serialization error on info_cards or cta_section
- Site hostname mismatch (API filters by site hostname)

**Investigation:** Query the API directly to see the error:
```bash
curl -s "https://back.redsea.sphyrnasolutions.com/api/v2/pages/?type=rutas.RutaPage&fields=*" \
  -H "Authorization: Token 1abca6db19d5e58e0b9a2b5ee40d1a7be2ec55d9"
```

### Homepage Model Too Small

The current HomePage model has ~13 fields but the frontend expects ~40+. Two options:
1. **Expand model** -- add all fields (migration needed, deploy to production)
2. **Hybrid approach** -- keep homepage on mock-data, focus CMS on rutas/blog

Recommendation: **Hybrid approach** for Phase 8. The homepage content is mostly static marketing copy that changes rarely. Rutas with real product data (prices, itineraries, FAQs) benefit more from CMS management.

### Image References

Images are in Wagtail (IDs 1-33) but also in Next.js `public/images/`. The RutaPage uses `ForeignKey('wagtailimages.Image')` which returns Wagtail image URLs (different domain). The mock-data uses local paths like `/images/wrecks/...`. The mapper's `getImageUrl()` function handles both formats.

**Risk:** Mixed image sources. CMS pages will reference `https://back.redsea.sphyrnasolutions.com/media/...` while local fallback uses `/images/...`. This works but means two copies of every image.

## 9. Data Structure Mappings

### Ruta Norte y Pecios: Mock-Data to Real Data

| Mock-Data Field | Current Value | Real Value (from PRODUCT-DATA.md) |
|----------------|---------------|-----------------------------------|
| title | "Ruta Norte y Pecios del Mar Rojo desde Hurghada" | Same (correct) |
| infoCards[0] value | "7 noches" | "8 dias (7 noches)" |
| infoCards[1] value | "18-22 inmersiones" | "16-18 inmersiones" |
| infoCards[2] value | "Hurghada" | "Hurghada" (correct) |
| price | "Consultar" | "Desde 1.190 EUR" |
| itinerary days | 7 days (generic) | 8 days (specific, from route data) |
| dive sites | Thistlegorm, Abu Nuhas, Ras Mohammed, Dunraven | + Giannis D, Carnatic, Rosalie Moller, Ulysses/Gubal |
| FAQ items | 5 generic | 9 specific (from route data) |
| includes | 6 generic items | 12 specific items (from route data) |

### Key Data Corrections Needed

| Field | Mock Value | Correct Value |
|-------|-----------|---------------|
| Inmersiones | 18-22 | 16-18 |
| Thistlegorm depth | 16-32m | 14-30m |
| Abu Nuhas depth | 4-26m | 10-27m (Giannis D specifically) |
| Price | "Consultar" | "Desde 1.190 EUR" |
| Duration | "7 dias" | "8 dias (7 noches de crucero)" |
| Training included | "Advanced SSI" | "Advanced SSI + 4 especialidades gratis + Nitrox incluido" |

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | Datos reales del barco M/Y Dolce Vita en homepage (40m, 12 camarotes, 24 pax, 4 cubiertas) | PRODUCT-DATA.md has all specs. HomePage model needs expansion or hybrid approach. |
| DATA-02 | 5 rutas reales con nombre, precio desde, spots principales y descripcion | All 5 route data files exist in `.planning/seo/routes/`. RutaPage model exists but needs field additions + mapper fix. |
| DATA-03 | Formacion incluida real: Advanced SSI + 4 especialidades gratis, nitrox gratis | Data in PRODUCT-DATA.md. Needs to appear in route includes section and homepage. |
| DATA-04 | FAQs reales del producto extraidas de viajeskarlossimon.com | 9 FAQs per route available in route data files. RutaPage model needs FAQ StreamField. |
</phase_requirements>

## 10. Approach Decision: Model Expansion vs Content-in-Code

### Option A: Full Wagtail Model Expansion (Recommended for rutas)

Expand RutaPage with: `summary_section`, `spots`, `audience_fit`, `practical_info`, `faq_section`, `resources_section`, `inline_lead` fields. This requires:
- Django migration on wagtail-headless-cms
- Deploy to production
- Populate via admin UI
- Fix mappers to read new fields

**Effort:** MEDIUM (model changes are straightforward, Wagtail handles StreamField well)
**Benefit:** All route content is CMS-managed, Karlos can edit

### Option B: Hybrid Mock+CMS (Recommended for homepage)

Keep homepage on mock-data with real product data updated directly in the code. Use CMS for rutas, blog, experiencias.

**Effort:** LOW
**Benefit:** Faster, no model changes needed for homepage

### Option C: Management Command for Bulk Content (Recommended for initial population)

Write a Django management command that creates all 5 RutaPage instances with ItineraryDay orderables, using data from PRODUCT-DATA.md. Faster than manual admin entry for 5 routes x 7-8 days each.

**Effort:** MEDIUM
**Benefit:** Repeatable, correct, no manual errors

## Sources

### Primary (HIGH confidence)
- Wagtail backend code: `/home/mandycs/Proyectos/Clientes/Karlos/wagtail-headless-cms/apps/*/models.py` -- all model definitions
- Frontend code: `src/lib/wagtail/` (client, fetchers, mappers, types) -- complete integration layer
- Frontend code: `src/lib/data/` (data layer with fallback) -- CMS-first architecture
- Frontend code: `src/lib/mock-data/` (types, homepage, rutas, etc.) -- current content structure
- Product data: `.planning/seo/PRODUCT-DATA.md` -- verified real data
- Route data: `.planning/seo/routes/ruta-norte-pecios.md` -- detailed itinerary, FAQs, includes

### Secondary (MEDIUM confidence)
- Wagtail API behavior -- inferred from code, not tested against live API
- Mapper/model mismatch severity -- confirmed by code comparison, not runtime test

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all code exists, well-documented
- Architecture: HIGH -- data flow, fallback, caching all clear from code
- Model mismatches: HIGH -- confirmed by comparing Django models to TS types
- Content data: HIGH -- PRODUCT-DATA.md is verified, route files are detailed
- Pitfalls (500 error): MEDIUM -- reported but not reproduced

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable codebase, unlikely to change)
