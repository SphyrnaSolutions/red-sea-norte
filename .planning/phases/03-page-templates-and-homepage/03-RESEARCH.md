# Phase 3: Page Templates and Homepage - Research

**Researched:** 2026-03-06
**Domain:** Next.js page templates, Wagtail StreamField rendering, SEO article structure, homepage optimization
**Confidence:** HIGH

## Summary

Phase 3 builds the final consumer layer: a reusable SEO article template that renders any Wagtail content page with zero custom frontend code, and a redesigned homepage optimized for SEO keywords and lead capture. This phase depends heavily on Phase 2's output -- the cluster resolver, interlink engine, schema markup, and extended Wagtail models are all consumed here.

The existing codebase already has strong patterns to follow: a `BlockRenderer` pattern in `blog/[slug]/page.tsx` that maps StreamField blocks to React components, a complete data layer pipeline (Wagtail API -> fetchers -> mappers -> frontend types), and a rich library of reusable blocks in the Wagtail `core/blocks.py`. The challenge is NOT building from scratch -- it is consolidating existing per-page-type rendering into a single generic SEO template that enforces heading structure, includes interlink slots, and integrates the Phase 2 SEO infrastructure.

The homepage currently functions as a marketing landing page with hardcoded sections. It needs transformation into an SEO-first page with an H1 containing target keywords ("vida a bordo mar rojo" / "buceo mar rojo"), a visible lead capture CTA above the fold, and route-first content positioning that serves both users and search engines.

**Primary recommendation:** Build a generic `SEOArticleTemplate` component that receives Wagtail page data and renders H1/H2/H3 structure with interlink slots, then refactor the homepage to use SEO-first heading structure with the existing `InlineLeadSection` component promoted above the fold.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-03 | Build reusable SEO article template with standard H1/H2/H3 structure, meta fields, and interlink slots | Existing `BlockRenderer` pattern + core blocks library provide the foundation; needs consolidation into a single generic template with enforced heading hierarchy and interlink injection points |
| CONT-04 | Redesign homepage for SEO optimization (H1 with target keywords, visible lead capture CTA, route-first positioning) | Current homepage has all needed components (`HeroSection`, `InlineLeadSection`, `RouteTeaserSection`) but H1 is in `HeroSection` (client component) and lacks keyword targeting; needs restructuring |
</phase_requirements>

## Standard Stack

### Core (Already in Project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.5 | App Router, RSC, generateMetadata() | Already installed, provides SSR/ISR |
| React | 19.2.3 | UI rendering | Already installed |
| Tailwind CSS | 4.x | Styling | Already installed with design tokens in globals.css |
| TypeScript | 5.x | Type safety | Already installed |

### Supporting (Already in Project)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | 12.29.2 | Animations | Hero sections, page transitions |
| lucide-react | 0.563.0 | Icons | UI icons in templates |
| zustand | 5.0.10 | State management | Modal store for lead forms |

### Phase 2 Outputs (Dependencies - Will Exist When Phase 3 Starts)
| Capability | Purpose | How Template Consumes It |
|------------|---------|--------------------------|
| Cluster resolver | Maps page to pillar/siblings/satellites | Template renders cluster navigation UI |
| Interlink engine | Computes related content blocks | Template renders "related content" and contextual links |
| Schema markup (schema-dts) | JSON-LD generation | Template calls schema generator per content type |
| generateMetadata() with SEO fields | Dynamic meta tags, canonical URLs, OG | Template exports generateMetadata using Wagtail SEO fields |
| Breadcrumbs component | Visual breadcrumbs + BreadcrumbList schema | Template includes breadcrumbs at top |
| Extended Wagtail models (CONT-01, CONT-02) | Content type models with cluster metadata | Template receives typed page data from these models |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Single generic template | Per-page-type templates (current approach) | Current approach works but requires custom frontend code per content type -- violates CONT-03's "zero custom frontend code" requirement |
| StreamField rendering | MDX or markdown rendering | StreamField is already the content format in Wagtail; switching would require CMS changes |

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── templates/
│   │   ├── SEOArticleTemplate.tsx      # Main reusable template
│   │   ├── ArticleHero.tsx             # Standard hero for articles
│   │   ├── ArticleBody.tsx             # StreamField body renderer
│   │   ├── InterlinksSection.tsx       # Related content block (from Phase 2)
│   │   ├── ClusterNavigation.tsx       # Cluster sibling/satellite nav (from Phase 2)
│   │   └── TableOfContents.tsx         # Optional auto-generated ToC from H2/H3
│   ├── organisms/
│   │   ├── HeroSection.tsx             # Existing (modified for SEO H1)
│   │   ├── InlineLeadSection.tsx       # Existing (promoted above fold)
│   │   └── ...
│   └── blocks/                         # StreamField block renderers
│       ├── BlockRenderer.tsx           # Consolidated from blog page
│       ├── RichTextBlock.tsx           # Extracted from blog page
│       ├── HeadingBlock.tsx            # With heading level enforcement
│       ├── ImageBlock.tsx              # Extracted from blog page
│       ├── QuoteBlock.tsx
│       ├── CTABlock.tsx
│       ├── AccordionBlock.tsx          # For FAQ sections
│       └── index.ts
├── app/
│   ├── page.tsx                        # Homepage (redesigned)
│   └── [content-type]/
│       └── [slug]/
│           └── page.tsx                # Uses SEOArticleTemplate
└── lib/
    ├── seo/                            # From Phase 2
    │   ├── schema.ts                   # JSON-LD generation
    │   ├── cluster-resolver.ts         # Cluster navigation
    │   └── interlinks.ts               # Related content
    └── templates/
        └── types.ts                    # SEOArticlePage type definition
```

### Pattern 1: Generic SEO Article Template
**What:** A single React Server Component that renders any Wagtail content page with SEO best practices baked in.
**When to use:** Every content page that comes from Wagtail's extended models (routes, wrecks, dive spots, guides, comparison pages).
**Key structure:**
```typescript
// src/components/templates/SEOArticleTemplate.tsx
interface SEOArticlePageData {
  // Core content
  title: string
  slug: string
  heroImage: string
  heroAlt: string
  excerpt: string
  body: Block[]

  // SEO fields (from Phase 2 Wagtail models)
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  schemaType: 'Article' | 'TouristTrip' | 'FAQPage'

  // Cluster fields (from Phase 2)
  clusterId: string
  clusterRole: 'pillar' | 'satellite'
  pillarSlug: string
  relatedPages: RelatedPage[]

  // Optional sections
  faq?: FAQItem[]
  author?: AuthorData
  publishedAt?: string
  updatedAt?: string
}

export function SEOArticleTemplate({ page }: { page: SEOArticlePageData }) {
  return (
    <article>
      {/* JSON-LD Schema from Phase 2 */}
      <SchemaMarkup page={page} />

      {/* Breadcrumbs from Phase 2 */}
      <Breadcrumbs slug={page.slug} />

      {/* Hero with H1 */}
      <ArticleHero
        title={page.title}        // Renders as <h1>
        image={page.heroImage}
        excerpt={page.excerpt}
      />

      {/* Body content with enforced H2/H3 */}
      <ArticleBody blocks={page.body} />

      {/* Interlinks from Phase 2 cluster engine */}
      <InterlinksSection relatedPages={page.relatedPages} />

      {/* Cluster navigation from Phase 2 */}
      <ClusterNavigation
        clusterId={page.clusterId}
        currentSlug={page.slug}
      />

      {/* Lead capture CTA */}
      <InlineLeadSection {...defaultLeadConfig} />
    </article>
  )
}
```

### Pattern 2: Consolidated BlockRenderer
**What:** Extract the existing `BlockRenderer` from `blog/[slug]/page.tsx` into a standalone component that all templates share.
**When to use:** Any page that renders Wagtail StreamField content.
**Why important:** Currently `BlockRenderer` is defined inline in the blog page file (~400 lines). Extracting it enables reuse by the SEO article template without code duplication.
```typescript
// src/components/blocks/BlockRenderer.tsx
// Consolidate from blog/[slug]/page.tsx
// Each block type becomes its own file for maintainability
export function BlockRenderer({ block }: { block: Block }) {
  const Component = BLOCK_MAP[block.type]
  if (!Component) return null
  return <Component block={block} />
}

const BLOCK_MAP: Record<string, React.FC<{ block: Block }>> = {
  rich_text: RichTextBlock,
  heading: HeadingBlock,
  image: ImageBlock,
  quote: QuoteBlock,
  info_cards: InfoCardsBlock,
  gallery: GalleryBlock,
  two_column: TwoColumnBlock,
  cta: CTABlock,
  accordion: AccordionBlock,
  newsletter: NewsletterBlock,
}
```

### Pattern 3: Homepage SEO Restructuring
**What:** Transform the homepage from a marketing landing page to an SEO-optimized entry point.
**Key changes:**
1. H1 must contain target keywords (currently in `HeroSection` as client component -- problematic for SEO)
2. Lead capture CTA must be visible above the fold
3. Route-first content positioning (routes section moved up)
4. Server-rendered H1 for crawlers (not inside a client component)

```typescript
// src/app/page.tsx (redesigned structure)
export default async function HomePage() {
  const data = await getHomePageData()

  return (
    <>
      <SchemaMarkup type="WebSite" />
      <SchemaMarkup type="Organization" />

      {/* H1 rendered server-side, NOT inside a client component */}
      <h1 className="sr-only">
        Vida a Bordo en el Mar Rojo: Buceo y Rutas desde Hurghada
      </h1>

      {/* Hero with visual title (aria-hidden to avoid duplicate H1) */}
      <HeroSection {...data.hero} />

      {/* Lead capture CTA above the fold */}
      <InlineLeadSection {...data.inlineLead} />

      {/* Route-first positioning */}
      <RouteTeaserSection {...data.routeTeaser} />
      <RouteValueSection {...data.routeValueSection} />
      <DiveSitesSection {...data.diveSites} />

      {/* Supporting sections */}
      <JourneyOverviewSection {...data.journeyOverview} />
      <AudienceFitSection {...data.audienceFit} />
      <LeadFormModal {...data.leadForm} />
    </>
  )
}
```

### Anti-Patterns to Avoid
- **H1 inside client components:** The current `HeroSection` is `"use client"` -- Google can render JS but it is slower and less reliable. The H1 should be server-rendered. Either make HeroSection a Server Component with interactive parts extracted, or render H1 separately.
- **Duplicating BlockRenderer per page type:** Currently blog has its own inline BlockRenderer. Do NOT create another one for the SEO template -- consolidate first.
- **Hardcoding interlinks:** Phase 2 builds an interlink engine. The template must consume computed interlinks, not hardcode them.
- **Treating homepage and article template as completely separate:** They share components (lead forms, CTAs, route teasers). Extract shared pieces.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD schema markup | Custom JSON object builders | Phase 2's schema-dts based generator (SEO-01) | schema-dts provides TypeScript types for all Schema.org types -- prevents invalid markup |
| Heading hierarchy validation | Custom AST parser for headings | Enforce at Wagtail model level + template structure | The template enforces H1 = title, body blocks only allow H2/H3/H4 |
| Breadcrumbs | Custom breadcrumb builder | Phase 2's Breadcrumbs component (SEO-06) | Already handles BreadcrumbList schema markup |
| Related content computation | Manual "you might also like" | Phase 2's interlink engine (SEO-03) | Uses cluster topology for accurate relationships |
| Meta tags | Manual <head> management | Next.js generateMetadata() (SEO-05) | Built-in, handles canonical, OG, twitter cards |
| Table of Contents | Manual DOM parsing | Auto-generate from body blocks at render time | Body blocks are structured data -- parse heading blocks |

**Key insight:** Phase 3 is primarily an assembly phase. Most complex logic (clusters, interlinks, schema) comes from Phase 2. The risk is re-implementing what Phase 2 already provides.

## Common Pitfalls

### Pitfall 1: H1 Inside Client Components
**What goes wrong:** The H1 keyword tag is rendered inside a `"use client"` component, making it dependent on JavaScript execution for search engine indexing.
**Why it happens:** The current `HeroSection` is a client component (needs `useModalStore` for CTA click handling).
**How to avoid:** Render the H1 as a Server Component outside/above the client HeroSection. Extract the interactive CTA handling into a small client wrapper, keep the rest server-rendered.
**Warning signs:** `"use client"` at the top of a file that renders the page's H1.

### Pitfall 2: Duplicated Block Components
**What goes wrong:** The SEO article template creates its own block renderers, diverging from the blog page's renderers. Styling inconsistencies accumulate.
**Why it happens:** The blog page has ~400 lines of inline block components. It is tempting to write new ones instead of refactoring.
**How to avoid:** Extract block components from `blog/[slug]/page.tsx` into `src/components/blocks/` FIRST, then both the blog page and SEO template import from the same source.
**Warning signs:** Two files defining `RichTextBlock` or `HeadingBlock` components.

### Pitfall 3: Not Using Phase 2 SEO Infrastructure
**What goes wrong:** The template implements its own JSON-LD, meta tags, or breadcrumbs instead of consuming Phase 2's implementations.
**Why it happens:** Phase 2 might not be complete when Phase 3 planning happens, leading to "just build it here" decisions.
**How to avoid:** The template should import from `src/lib/seo/` (Phase 2 output). If Phase 2 is incomplete, create interface stubs that Phase 2 will implement.
**Warning signs:** JSON-LD objects defined inline in the template file (like the current blog and ruta pages do).

### Pitfall 4: Homepage Sections Not CMS-Manageable
**What goes wrong:** The redesigned homepage has hardcoded section content (H1 text, section order) that cannot be updated without code changes.
**Why it happens:** SEO optimization requires specific heading text, and it is faster to hardcode than to extend the CMS model.
**How to avoid:** The H1 keyword text should come from Wagtail's `hero_title` field. The existing `HomePage` Wagtail model already has `hero_title` -- use it. Add a new field if needed for the SEO-specific H1 variant.
**Warning signs:** String literals in `page.tsx` that contain target keywords.

### Pitfall 5: Forgetting generateStaticParams for New Content Routes
**What goes wrong:** New content pages created in Wagtail return 404 because `generateStaticParams` does not include them.
**Why it happens:** The new generic route that renders SEO article pages needs a `generateStaticParams` that queries ALL content types from Phase 2's extended models.
**How to avoid:** The catch-all route must call a fetcher that returns slugs for ALL SEO content types (not just one model).
**Warning signs:** New Wagtail pages not rendering on the frontend until a full rebuild.

## Code Examples

### Current Homepage H1 Problem
The H1 is inside `HeroSection` which is a client component:
```typescript
// src/components/organisms/HeroSection.tsx - line 1
"use client"
// ...
// line 121-129: The H1
<h1
  className="text-white text-[56px] md:text-[96px]..."
  style={{ fontFamily: 'var(--font-display)', ... }}
>
  {title}
</h1>
```
This means the H1 requires JavaScript to render. For SEO, it should be server-rendered.

### Current Blog BlockRenderer (to extract)
The `BlockRenderer` in `src/app/blog/[slug]/page.tsx` (lines 277-302) is the pattern to consolidate:
```typescript
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'rich_text': return <RichTextBlock block={block} />
    case 'heading': return <HeadingBlock block={block} />
    case 'image': return <ImageBlock block={block} />
    // ... 7 more cases
    default: return null
  }
}
```
This should become a shared component in `src/components/blocks/`.

### Wagtail Core Blocks Available for Template Body
The Wagtail `core/blocks.py` already defines these reusable blocks:
- `HeadingBlock` (H2/H3/H4)
- `RichTextBlock`
- `ImageBlock` (with caption + alt)
- `QuoteBlock`
- `InfoCardsBlock`
- `GalleryBlock`
- `TwoColumnBlock`
- `CTABlock`
- `AccordionBlock` (available in frontend, not yet in Wagtail)

The SEO article template's body StreamField should use all of these.

### Existing Lead Capture Components
The project already has two lead capture mechanisms:
1. `InlineLeadSection` -- inline form with fields (server-rendered shell, client interaction)
2. `LeadFormModal` -- modal triggered by CTAs via `useModalStore`

Both are ready to use. The homepage redesign should promote `InlineLeadSection` above the fold.

### Existing Design Tokens
From `globals.css`, the established design system uses:
- Colors: `--color-ocean-deep: #0A2540`, `--color-coral-fire: #FF5722`, `--color-cyan-light: #00CED1`
- Fonts: `--font-display: 'Clash Display'`, `--font-sans: 'Satoshi'`, `--font-mono: 'JetBrains Mono'`
- Heading sizes: H1=72px, H2=52px, H3=42px, H4=32px
- Section spacing: 80px vertical, 120px horizontal (desktop)

Templates MUST use these tokens, not raw values.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Per-page-type custom rendering | Generic template + StreamField blocks | Phase 3 migration | Eliminates per-page frontend code |
| H1 in client components | Server-rendered H1 + client interactivity split | Phase 3 change | Better SEO indexing |
| Hardcoded JSON-LD per page | schema-dts typed generation from Phase 2 | Phase 2 output | Type-safe, consistent markup |
| Inline BlockRenderer in page files | Shared `components/blocks/` directory | Phase 3 extraction | Single source of truth for block rendering |
| Marketing-first homepage | SEO-first homepage with keyword H1 | Phase 3 redesign | Better organic search positioning |

## Open Questions

1. **Dynamic routing for generic SEO pages**
   - What we know: Phase 2 extends Wagtail models with new content types (CONT-01). The frontend needs routes for these.
   - What's unclear: Will there be a single catch-all route `[...slug]/page.tsx` or per-content-type routes like `pecios/[slug]`, `spots/[slug]`?
   - Recommendation: Use per-content-type routes for URL structure clarity, but all import the same `SEOArticleTemplate`. The route files become thin wrappers (fetch + template render).

2. **Homepage H1 strategy**
   - What we know: The H1 needs target keywords. Current hero title comes from Wagtail `hero_title` field.
   - What's unclear: Should the visible hero title and the SEO H1 be the same, or should there be a visually-hidden H1 with keywords + a decorative hero title?
   - Recommendation: Make the Wagtail `hero_title` field the H1. Update its content to include keywords. If the visual design needs a different display, use `sr-only` H1 + `aria-hidden` visual title.

3. **Interlink slot placement in template**
   - What we know: Phase 2's interlink engine (SEO-03) computes related content.
   - What's unclear: Where exactly in the article body should interlinks appear? After every N paragraphs? Only at the end? Both contextual (inline) and block (end)?
   - Recommendation: Two slots: (1) contextual interlinks injected between body blocks (after every 3-4 blocks), (2) a "Related Content" section at the bottom before the CTA. Both fed by Phase 2's engine.

4. **Wagtail model for generic SEO article**
   - What we know: Phase 2 creates content type models (CONT-01) and cluster metadata (CONT-02).
   - What's unclear: Will there be a single `SEOArticlePage` Wagtail model or separate models per type?
   - Recommendation: Phase 2 should create a base `SEOArticlePage` model that specific types inherit from. The frontend template does not care about the specific type -- it renders the common fields.

## Sources

### Primary (HIGH confidence)
- Codebase analysis of `src/app/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/rutas/[slug]/page.tsx` -- current rendering patterns
- Codebase analysis of `src/lib/wagtail/` (client, fetchers, mappers, types) -- data pipeline
- Codebase analysis of `src/components/organisms/HeroSection.tsx` -- H1 location and client component issue
- Codebase analysis of Wagtail `apps/core/blocks.py` -- available StreamField blocks
- Codebase analysis of Wagtail `apps/core/models.py` -- SEOMixin pattern
- Codebase analysis of Wagtail `apps/home/models.py` -- current homepage model fields
- `package.json` -- Next.js 16.1.5, React 19.2.3, Tailwind 4.x stack
- `globals.css` -- design tokens (colors, fonts, spacing)

### Secondary (MEDIUM confidence)
- Phase 2 output assumptions based on ROADMAP.md requirements (SEO-01 through SEO-06, CONT-01, CONT-02)

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - direct codebase inspection, all libraries already installed
- Architecture: HIGH - patterns derived from existing code, not external research
- Pitfalls: HIGH - identified from actual code analysis (client component H1, duplicated BlockRenderer)
- Phase 2 dependencies: MEDIUM - based on requirements, actual implementation may differ

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable, no external API changes expected)
