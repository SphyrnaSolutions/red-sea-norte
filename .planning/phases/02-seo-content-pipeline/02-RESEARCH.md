# Phase 2: SEO Content Pipeline - Research

**Researched:** 2026-03-06
**Domain:** SEO infrastructure (JSON-LD schema, cluster architecture, interlinking, metadata, breadcrumbs) on Next.js 16 + Wagtail headless CMS
**Confidence:** HIGH

## Summary

This phase builds the shared SEO infrastructure that every content page in the site consumes. The work spans two codebases: the Wagtail headless CMS (sibling directory `wagtail-headless-cms`) where page models need cluster metadata fields, and the Next.js 16 frontend where schema markup generators, a cluster resolver, an interlink engine, a keyword-to-URL map, dynamic metadata via `generateMetadata()`, and a breadcrumbs component must be built.

The existing codebase already has partial implementations: each page type (rutas, blog, experiencias) has its own inline `generateMetadata()` and hand-rolled JSON-LD objects. These are inconsistent, lack type safety, and don't use `schema-dts`. There are no breadcrumbs, no cluster awareness, no interlink engine, and no keyword deduplication. The SEOMixin in Wagtail provides `meta_description`, `meta_keywords`, `social_title`, `social_description`, and `social_image` -- but no cluster fields (cluster_id, role, pillar_slug, schema_type, related_pages).

**Primary recommendation:** Build a centralized `src/lib/seo/` module with type-safe schema generators (using `schema-dts`), a cluster resolver that queries Wagtail cluster metadata, an interlink engine driven by cluster topology, a keyword-to-URL registry, and shared `generateMetadata()` helpers -- then refactor all existing pages to consume these shared utilities instead of hand-rolling SEO logic per page.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Generate page-specific JSON-LD schema markup (TouristTrip, Article, FAQPage, BreadcrumbList) via schema-dts | schema-dts v1.1.5 provides WithContext<T> types for all four schema types. Current pages have untyped inline JSON-LD that must be replaced. |
| SEO-02 | Build cluster resolver that maps pages to pillar-satellite relationships and generates cluster navigation | Wagtail models need cluster_id, role (pillar/satellite), pillar_slug fields. Frontend resolver queries these via API. |
| SEO-03 | Build interlink engine that computes related content blocks and contextual links from cluster topology | Cluster resolver output feeds interlink computation. Related pages derive from same cluster_id + sibling/satellite role. |
| SEO-04 | Create and enforce keyword-to-URL map to prevent cannibalization across all pages | Wagtail SEOMixin already has meta_keywords. Need a dedicated primary_keyword unique field + frontend/build-time validation. |
| SEO-05 | Implement dynamic meta tags via generateMetadata() with canonical URLs and Open Graph | Existing per-page generateMetadata() must be consolidated into shared helpers consuming Wagtail SEO fields. |
| SEO-06 | Implement breadcrumbs component with BreadcrumbList schema markup | No breadcrumbs exist currently. Build visual component + BreadcrumbList JSON-LD from URL path + cluster hierarchy. |
| CONT-01 | Extend Wagtail page models for specific content types: routes, wrecks, dive spots, guides, comparison pages | Current models: RutaPage, BlogPostPage, ExperienciaPage, CursoPage, OfertaPage. Need new models or model extensions for wrecks, dive spots, guides, comparisons. |
| CONT-02 | Add cluster metadata fields to Wagtail models (cluster_id, role, pillar_slug, schema_type, related_pages) | SEOMixin in core/models.py needs extension with ClusterMixin abstract model. All page types inherit it. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| schema-dts | 1.1.5 | TypeScript types for Schema.org JSON-LD | Google-maintained, 100k+ weekly npm downloads, recommended by Next.js docs |
| next (existing) | 16.1.5 | Framework - generateMetadata(), App Router | Already in project |
| react (existing) | 19.2.3 | UI components (breadcrumbs, related content) | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| serialize-javascript | latest | XSS-safe JSON-LD serialization | Recommended by Next.js docs to replace naive JSON.stringify in script tags |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| schema-dts | Raw JSON objects (current approach) | Lose type safety, autocomplete, and compile-time validation of schema.org types |
| serialize-javascript | Manual `.replace(/</g, '\\u003c')` | Manual approach works but serialize-javascript is more thorough; project can choose either |

**Installation:**
```bash
npm install --save-dev schema-dts
npm install serialize-javascript
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── seo/
│   │   ├── schema/              # JSON-LD generators per content type
│   │   │   ├── tourist-trip.ts   # TouristTrip schema for rutas/experiencias
│   │   │   ├── article.ts        # Article schema for blog posts
│   │   │   ├── faq-page.ts       # FAQPage schema for FAQ sections
│   │   │   ├── breadcrumb.ts     # BreadcrumbList schema generator
│   │   │   └── index.ts          # Barrel export + factory function
│   │   ├── metadata.ts           # Shared generateMetadata() helpers
│   │   ├── cluster-resolver.ts   # Resolves page -> cluster relationships
│   │   ├── interlink-engine.ts   # Computes related content from cluster topology
│   │   ├── keyword-map.ts        # Keyword-to-URL registry + validation
│   │   └── index.ts              # Public API
│   └── wagtail/
│       ├── types.ts              # Extended with cluster metadata types
│       └── ...                   # (existing files, modified by Phase 1)
├── components/
│   ├── seo/
│   │   ├── JsonLd.tsx            # Reusable JSON-LD script renderer
│   │   ├── Breadcrumbs.tsx       # Visual breadcrumbs + schema
│   │   ├── RelatedContent.tsx    # "Related content" block from cluster
│   │   └── ClusterNav.tsx        # Cluster navigation (pillar + siblings)
│   └── ...
└── app/
    └── [content-type]/[slug]/
        └── page.tsx              # Uses shared metadata + schema helpers
```

### Pattern 1: Centralized Schema Generator Factory
**What:** A single factory function that takes a page object + content type and returns the correct JSON-LD schema object with proper types.
**When to use:** Every page that needs JSON-LD structured data (all pages in this project).
**Example:**
```typescript
// Source: Next.js docs + schema-dts README
import type { TouristTrip, Article, FAQPage, WithContext } from 'schema-dts';

type SchemaType = 'TouristTrip' | 'Article' | 'FAQPage';

interface SchemaInput {
  type: SchemaType;
  page: WagtailPageWithCluster;
  baseUrl: string;
}

function generateSchema(input: SchemaInput): WithContext<TouristTrip | Article | FAQPage> {
  switch (input.type) {
    case 'TouristTrip':
      return buildTouristTripSchema(input.page, input.baseUrl);
    case 'Article':
      return buildArticleSchema(input.page, input.baseUrl);
    case 'FAQPage':
      return buildFAQPageSchema(input.page, input.baseUrl);
  }
}
```

### Pattern 2: Cluster Resolver
**What:** A function that takes a page slug and returns its cluster context: the pillar page, sibling satellites, and the page's own role.
**When to use:** Building cluster navigation, computing interlinks, generating breadcrumbs with cluster context.
**Example:**
```typescript
interface ClusterContext {
  clusterId: string;
  role: 'pillar' | 'satellite';
  pillar: { slug: string; title: string; url: string };
  siblings: Array<{ slug: string; title: string; url: string; role: string }>;
  relatedPages: Array<{ slug: string; title: string; url: string }>;
}

async function resolveCluster(slug: string): Promise<ClusterContext | null> {
  // 1. Fetch page with cluster metadata from Wagtail API
  // 2. If page has cluster_id, fetch all pages with same cluster_id
  // 3. Separate into pillar + satellites
  // 4. Return structured ClusterContext
}
```

### Pattern 3: Shared generateMetadata Helper
**What:** A helper that builds Next.js Metadata objects from Wagtail page data, ensuring consistency across all page types.
**When to use:** Every page's `generateMetadata()` export calls this helper instead of building metadata from scratch.
**Example:**
```typescript
import type { Metadata } from 'next';

interface MetadataInput {
  page: WagtailPageWithSEO;
  contentType: string;  // 'rutas' | 'blog' | 'experiencias' etc
  slug: string;
  baseUrl: string;
}

function buildPageMetadata(input: MetadataInput): Metadata {
  const { page, contentType, slug, baseUrl } = input;
  return {
    title: page.social_title || page.title,
    description: page.meta_description,
    keywords: page.meta_keywords?.split(',').map(k => k.trim()),
    openGraph: {
      title: page.social_title || page.title,
      description: page.social_description || page.meta_description,
      type: contentType === 'blog' ? 'article' : 'website',
      locale: 'es_ES',
      images: page.social_image ? [{ url: page.social_image.url }] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${contentType}/${slug}`,
    },
  };
}
```

### Pattern 4: Wagtail ClusterMixin (Python side)
**What:** Abstract Django model mixin that adds cluster metadata fields to any Wagtail page model.
**When to use:** Every page model that participates in the SEO cluster strategy.
**Example:**
```python
# apps/core/models.py
class ClusterMixin(models.Model):
    """Abstract mixin for cluster metadata on page models."""
    cluster_id = models.CharField(
        max_length=100, blank=True,
        help_text="Cluster identifier (e.g., 'vida-a-bordo', 'ruta-norte')"
    )
    cluster_role = models.CharField(
        max_length=20, blank=True,
        choices=[('pillar', 'Pillar'), ('satellite', 'Satellite')],
        help_text="Role of this page within its cluster"
    )
    pillar_slug = models.CharField(
        max_length=255, blank=True,
        help_text="Slug of the pillar page (for satellites)"
    )
    schema_type = models.CharField(
        max_length=50, blank=True,
        choices=[
            ('TouristTrip', 'TouristTrip'),
            ('Article', 'Article'),
            ('FAQPage', 'FAQPage'),
        ],
        help_text="Schema.org type for JSON-LD"
    )
    primary_keyword = models.CharField(
        max_length=255, blank=True, unique=True,
        help_text="Primary SEO keyword (must be unique across all pages)"
    )

    class Meta:
        abstract = True
```

### Anti-Patterns to Avoid
- **Per-page JSON-LD objects:** Current approach of hand-writing JSON-LD in each page.tsx. Leads to inconsistency, missed fields, no type validation. Consolidate into shared generators.
- **Hardcoded related content:** Never hardcode related page links. Always derive from cluster topology so links stay current when pages are added/removed.
- **Metadata duplication:** Never duplicate meta tag logic across pages. Use a single `buildPageMetadata()` helper.
- **Keyword field without uniqueness constraint:** The primary_keyword field in Wagtail MUST have `unique=True` to prevent keyword cannibalization at the database level.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Schema.org type definitions | Custom TypeScript interfaces for schema types | `schema-dts` | Google maintains it, covers entire Schema.org vocabulary, catches type errors at compile time |
| JSON-LD XSS sanitization | Custom string escaping | `serialize-javascript` or `.replace(/</g, '\\u003c')` | Edge cases in HTML entity encoding are easy to miss |
| Breadcrumb path parsing | Custom URL parser | `usePathname()` from `next/navigation` + split | Next.js provides the canonical way to get current path segments |
| Keyword uniqueness enforcement | Custom validation logic in frontend | Database `unique=True` constraint in Wagtail + Django model validation | Database-level constraint is the only reliable way to prevent duplicates |

**Key insight:** The SEO infrastructure is a "plumbing" layer -- it must be consistent and correct across every page. Centralizing into shared utilities with type safety (schema-dts) prevents the kind of silent SEO bugs (missing fields, wrong types, duplicate keywords) that are invisible until Google Search Console reveals ranking drops weeks later.

## Common Pitfalls

### Pitfall 1: JSON-LD Schema Validation Failures
**What goes wrong:** Schema.org types have required fields and specific expected value types. Missing or wrong fields produce invalid structured data that Google ignores silently.
**Why it happens:** Hand-writing JSON objects without type checking. TouristTrip needs `name` and `description`; FAQPage needs `mainEntity` with proper Question/Answer structure.
**How to avoid:** Use `schema-dts` types with `WithContext<T>` -- TypeScript will catch missing required fields at compile time.
**Warning signs:** Google Search Console > Enhancements shows "invalid items" or zero rich results despite having JSON-LD.

### Pitfall 2: Canonical URL Mismatches
**What goes wrong:** Canonical URL in metadata doesn't match the actual URL the page is served at (trailing slashes, www vs non-www, http vs https).
**Why it happens:** Hardcoding base URLs or building canonical paths inconsistently.
**How to avoid:** Single `BASE_URL` constant from env, single helper function for building canonical URLs, never hardcode paths.
**Warning signs:** Google Search Console > Pages > "Duplicate without user-selected canonical".

### Pitfall 3: Cluster Data Not Available at Build Time
**What goes wrong:** `generateStaticParams()` and `generateMetadata()` run at build time, but cluster data lives in Wagtail API. If the API is unreachable during build, pages have no cluster metadata.
**Why it happens:** ISR/SSG pages are pre-rendered.
**How to avoid:** Ensure cluster data is fetched as part of the page data request (not a separate API call). Use Next.js `revalidate` for ISR so pages update when Wagtail content changes. Consider fetching all cluster pages in one batched API call rather than per-page.
**Warning signs:** Built pages missing interlinks and cluster navigation.

### Pitfall 4: Keyword Map Drift
**What goes wrong:** The keyword-to-URL map goes out of sync with actual published pages, allowing duplicate keywords or mapping to deleted pages.
**Why it happens:** Map is maintained separately from page lifecycle.
**How to avoid:** The `primary_keyword` field with `unique=True` on the Wagtail model IS the keyword map. No separate file needed. Query it from the API. Wagtail's database enforces uniqueness.
**Warning signs:** Two pages ranking for the same keyword, cannibalizing each other.

### Pitfall 5: BreadcrumbList Schema Without Visual Breadcrumbs
**What goes wrong:** Adding BreadcrumbList JSON-LD without rendering visible breadcrumbs on the page. Google may ignore the structured data if no visual equivalent exists.
**Why it happens:** Treating schema as metadata-only, not as something that must match visible UI.
**How to avoid:** Always pair BreadcrumbList JSON-LD with a visible `<nav aria-label="breadcrumb">` component.
**Warning signs:** Rich Results Test passes but no breadcrumbs show in SERPs.

### Pitfall 6: Wagtail API Not Exposing New Fields
**What goes wrong:** Adding fields to Wagtail models but forgetting to add them to `api_fields`, so the Next.js frontend never receives them.
**Why it happens:** Wagtail's API only exposes explicitly declared `APIField` entries.
**How to avoid:** For every new model field, add a corresponding `APIField('field_name')` entry AND update the TypeScript types in `src/lib/wagtail/types.ts`.
**Warning signs:** Field exists in Wagtail admin but returns `undefined` on the frontend.

## Code Examples

### JSON-LD with schema-dts (TouristTrip)
```typescript
// Source: schema-dts docs + Next.js JSON-LD guide
import type { TouristTrip, WithContext } from 'schema-dts';

function buildTouristTripSchema(
  page: RutaPageData,
  baseUrl: string
): WithContext<TouristTrip> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: page.title,
    description: page.meta_description || page.hero_subtitle,
    image: page.hero_background_image?.url
      ? new URL(page.hero_background_image.url, baseUrl).href
      : undefined,
    touristType: 'Scuba Diving',
    provider: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
      url: baseUrl,
    },
    url: `${baseUrl}/rutas/${page.slug}`,
  };
}
```

### JSON-LD Renderer Component
```typescript
// Source: Next.js docs recommendation
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
```

### BreadcrumbList Schema Generator
```typescript
// Source: schema.org/BreadcrumbList
import type { BreadcrumbList, WithContext } from 'schema-dts';

interface BreadcrumbItem {
  name: string;
  url: string;
}

function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

### FAQPage Schema from Wagtail FAQ Section
```typescript
import type { FAQPage, WithContext } from 'schema-dts';

interface FAQItem {
  question: string;
  answer: string;
}

function buildFAQPageSchema(
  faqs: FAQItem[],
  pageUrl: string
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    url: pageUrl,
  };
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Inline untyped JSON-LD objects | `schema-dts` WithContext<T> typed generators | schema-dts 1.0 (2021), stable since | Compile-time validation of schema.org types |
| `next-seo` package for metadata | Built-in `generateMetadata()` in App Router | Next.js 13+ (2023) | No external dependency needed for meta tags |
| Static breadcrumbs | Dynamic breadcrumbs from `usePathname()` + cluster data | Next.js App Router | Breadcrumbs automatically reflect URL structure |
| Manual interlink curation | Automated from cluster topology | SEO industry standard 2024+ | Scales without manual editing as content grows |

**Deprecated/outdated:**
- `next-seo` package: Unnecessary with App Router's built-in metadata API. Do not install.
- `next/head` for meta tags: Replaced by `generateMetadata()` in App Router. Already not used in this project.
- `unstable_cache` for data caching: Being replaced by native `fetch` cache in Phase 1. Do not use for new code.

## Open Questions

1. **Wagtail Model Migration Strategy**
   - What we know: New fields (cluster_id, role, pillar_slug, schema_type, primary_keyword) need Django migrations. The Wagtail project is in a sibling directory.
   - What's unclear: Whether Phase 2 should create and run the migrations, or just define them for manual execution. Also unclear is the deployment workflow for coordinating Wagtail + Next.js changes.
   - Recommendation: Phase 2 plans should create migration files. Running them can be documented as a manual step. The Next.js side should handle missing cluster data gracefully (optional fields, null checks).

2. **URL Structure for New Content Types**
   - What we know: Current routes are /rutas/, /blog/, /experiencias/, /cursos/, /ofertas/. Phase 2 introduces wrecks, dive spots, guides, comparisons (CONT-01).
   - What's unclear: Whether these get new top-level routes (/pecios/, /spots/, /guias/, /comparativas/) or are nested under existing routes.
   - Recommendation: This is a STATE.md blocker already noted. Resolve before planning. Recommend new top-level routes for SEO (cleaner URL slugs, shorter paths).

3. **Keyword Map Scope**
   - What we know: primary_keyword must be unique per page to prevent cannibalization.
   - What's unclear: Whether the uniqueness check happens only at Wagtail save time (Django validation) or also at build time in Next.js.
   - Recommendation: Primary enforcement at Django level (unique=True constraint). Optional build-time check as a sanity report, not a blocker.

## Sources

### Primary (HIGH confidence)
- [Next.js 16 JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official recommendation for structured data with schema-dts
- [Next.js generateMetadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Metadata API reference
- [schema-dts GitHub](https://github.com/google/schema-dts) - v1.1.5, Google-maintained, WithContext<T> pattern
- [Schema.org/TouristTrip](https://schema.org/TouristTrip) - TouristTrip type specification
- [Schema.org/BreadcrumbList](https://schema.org/BreadcrumbList) - BreadcrumbList type specification

### Secondary (MEDIUM confidence)
- [Scalable SEO Architecture: Clusters, Links, Facets](https://venue.cloud/news/insights/scalable-seo-ux-architecture-clusters-links-facets-crawl-budget) - Cluster architecture best practices
- [Complete guide to topic clusters](https://searchengineland.com/guide/topic-clusters) - Pillar/satellite model explanation
- [Building Dynamic Breadcrumbs in Next.js](https://dev.to/dan_starner/building-dynamic-breadcrumbs-in-nextjs-17oa) - usePathname approach for breadcrumbs

### Tertiary (LOW confidence)
- None -- all claims verified with official sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - schema-dts recommended by Next.js docs, generateMetadata() is built-in
- Architecture: HIGH - Centralized SEO module is standard pattern, cluster model is well-documented in SEO industry
- Pitfalls: HIGH - Based on direct codebase analysis showing existing issues (untyped JSON-LD, missing breadcrumbs, no cluster fields)

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable domain, schema-dts and Next.js both mature)
