# Architecture Research

**Domain:** SEO niche website with programmatic content pipeline (diving/liveaboard Red Sea)
**Researched:** 2026-03-06
**Confidence:** HIGH

## System Overview

```
                           CONTENT AUTHORING
 ┌─────────────────────────────────────────────────────────────┐
 │                      Wagtail CMS                            │
 │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
 │  │ SEO Page │ │ Cluster  │ │ Interlink│ │ Schema   │       │
 │  │ Models   │ │ Registry │ │ Config   │ │ Fields   │       │
 │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
 │       └─────────────┴────────────┴────────────┘             │
 │                      Wagtail API v2                         │
 └──────────────────────────┬──────────────────────────────────┘
                            │ HTTP/JSON
                            ▼
                      CONTENT PIPELINE
 ┌─────────────────────────────────────────────────────────────┐
 │                     Next.js Server                          │
 │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
 │  │ Wagtail  │ │ Cluster  │ │Interlink │ │ Schema   │       │
 │  │ Client   │ │ Resolver │ │ Engine   │ │ Generator│       │
 │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
 │       │            │            │            │              │
 │  ┌────┴────────────┴────────────┴────────────┴──────────┐   │
 │  │              Data Layer (src/lib/data/)               │   │
 │  │         Caching + Draft Mode + Fallback               │   │
 │  └──────────────────────┬────────────────────────────────┘   │
 │                         │                                    │
 │  ┌──────────────────────┴────────────────────────────────┐   │
 │  │            Page Rendering Layer (src/app/)             │   │
 │  │  Pillar Pages | Satellite Pages | Listing Pages       │   │
 │  │  generateMetadata() + JSON-LD + ISR                   │   │
 │  └──────────────────────┬────────────────────────────────┘   │
 └─────────────────────────┼────────────────────────────────────┘
                           │
                    LEAD CAPTURE
 ┌─────────────────────────┼────────────────────────────────────┐
 │  ┌──────────┐ ┌────────┴──┐ ┌──────────┐                    │
 │  │ Lead     │ │ Form      │ │ Odoo     │                    │
 │  │ Forms    │→│ API Route │→│ CRM API  │                    │
 │  │ (Client) │ │ (Server)  │ │ (Ext.)   │                    │
 │  └──────────┘ └───────────┘ └──────────┘                    │
 └──────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| **Wagtail SEO Page Models** | Store content with SEO metadata fields (meta title, description, keywords, canonical, cluster assignment, schema type) per page | Wagtail API v2 |
| **Cluster Registry** | Define cluster topology: which pillar page owns which satellites, keyword assignments per page | Wagtail API v2, Interlink Config |
| **Interlink Config** | Store related-page relationships, anchor text preferences, and contextual link rules per content type | Wagtail API v2 |
| **Schema Fields** | Per-page schema.org type selection and custom structured data fields (TouristTrip, Article, FAQPage, etc.) | Wagtail API v2 |
| **Wagtail Client** | Fetch content from Wagtail API v2 with caching, error handling, draft mode awareness | Wagtail CMS |
| **Cluster Resolver** | Resolve cluster membership: given a page, return its pillar, siblings, and related satellites | Data Layer, Wagtail Client |
| **Interlink Engine** | Generate contextual internal links for any page based on cluster relationships, keyword co-occurrence, and anchor text rules | Data Layer, Cluster Resolver |
| **Schema Generator** | Produce JSON-LD structured data per page type using page data + schema type from CMS | Data Layer, Page Rendering |
| **Data Layer** | Orchestrate data fetching with `unstable_cache`, draft mode, and mock-data fallback (already exists) | All data consumers |
| **Page Rendering Layer** | Render pillar pages, satellite pages, and listing pages with SEO metadata, JSON-LD, breadcrumbs, and interlinks | Data Layer, Lead Forms |
| **Lead Forms** | Client-side form components (modal + inline) | Form API Route |
| **Form API Route** | Server-side validation, sanitization, and forwarding to Odoo CRM | Odoo CRM API |
| **Odoo CRM API** | External CRM system that receives leads with source tracking (which page, which cluster) | N/A (external) |

## Recommended Project Structure

Building on the existing structure, these are the **new** directories and files needed:

```
src/
├── lib/
│   ├── seo/                        # NEW: SEO pipeline
│   │   ├── clusters.ts             # Cluster topology resolver
│   │   ├── interlinks.ts           # Automated interlinking engine
│   │   ├── schema.ts               # JSON-LD generator per page type
│   │   ├── breadcrumbs.ts          # Breadcrumb generator from cluster hierarchy
│   │   ├── types.ts                # SEO-specific types (ClusterNode, InterlinkRule, SchemaConfig)
│   │   └── index.ts                # Barrel export
│   ├── odoo/                       # NEW: Odoo CRM integration
│   │   ├── client.ts               # Odoo XML-RPC/REST client
│   │   ├── leads.ts                # Lead creation + source tracking
│   │   ├── types.ts                # Odoo lead types
│   │   └── index.ts                # Barrel export
│   ├── data/                       # EXISTING: Extend with cluster-aware fetching
│   │   ├── clusters.ts             # NEW: Fetch cluster topology from CMS
│   │   └── ...existing files...
│   └── wagtail/                    # EXISTING: Extend types and fetchers
│       └── ...existing files...
├── app/
│   ├── api/
│   │   └── leads/route.ts          # NEW: Lead submission endpoint
│   ├── [cluster-slug]/             # NEW: Pillar page routes (see Patterns below)
│   │   ├── page.tsx                # Pillar/hub page
│   │   └── [page-slug]/
│   │       └── page.tsx            # Satellite page
│   └── ...existing routes...
├── components/
│   ├── organisms/
│   │   ├── RelatedContent.tsx      # NEW: Contextual interlinks sidebar/footer
│   │   ├── Breadcrumbs.tsx         # NEW: SEO breadcrumbs from cluster hierarchy
│   │   ├── TableOfContents.tsx     # NEW: In-page TOC for long-form content
│   │   └── ClusterNav.tsx          # NEW: Cluster navigation (pillar <-> satellites)
│   └── molecules/
│       └── InterlinkCard.tsx       # NEW: Card for related content links
```

### Structure Rationale

- **`src/lib/seo/`:** Centralizes all SEO logic (clusters, interlinks, schema) separate from data fetching. The data layer orchestrates; the SEO module computes. This avoids scattering SEO logic across 60+ page files.
- **`src/lib/odoo/`:** Isolates CRM integration from the rest of the app. The API route calls this module; components never import it directly. Enables swapping CRM systems later without touching UI code.
- **Cluster-based routing:** The URL structure maps directly to the cluster hierarchy. Pillar pages live at `/vida-a-bordo-mar-rojo/`, satellites at `/vida-a-bordo-mar-rojo/que-llevar/`. This reinforces topical authority in URL structure.

## Architectural Patterns

### Pattern 1: Cluster-Aware Content Model

**What:** Every content page in Wagtail carries cluster metadata: which cluster it belongs to, whether it is a pillar or satellite, its primary keyword, and its related pages. The Next.js data layer fetches this metadata alongside content.

**When to use:** For all 60 SEO pages. Every page must know its cluster position to generate correct interlinks, breadcrumbs, and schema.

**Trade-offs:** Adds complexity to Wagtail models but eliminates manual link management. The alternative (hardcoding relationships in Next.js) breaks as soon as content editors add/remove pages.

**Example:**
```typescript
// src/lib/seo/types.ts
interface ClusterNode {
  slug: string;
  title: string;
  role: 'pillar' | 'satellite';
  clusterId: string;
  clusterName: string;
  pillarSlug: string;       // self-reference if pillar
  primaryKeyword: string;
  secondaryKeywords: string[];
  siblings: Array<{ slug: string; title: string; anchorText: string }>;
  schemaType: SchemaType;
}

type SchemaType =
  | 'TouristTrip'      // rutas, vida a bordo
  | 'Article'           // guides, informational
  | 'FAQPage'           // FAQ satellites
  | 'Product'           // ofertas
  | 'Course'            // cursos
  | 'ItemList'          // listing/pillar pages
  | 'WebPage';          // fallback
```

### Pattern 2: Centralized Interlink Engine

**What:** A single module (`src/lib/seo/interlinks.ts`) computes all internal links for a given page. It receives the page's cluster node and returns: (1) breadcrumb chain, (2) "related content" links for sidebar/footer, (3) in-body contextual links to inject into rich text. The engine uses rules: always link to pillar from satellites, always link to 2-3 siblings, never link to self.

**When to use:** At render time in every page component. Called once per page render (cached by ISR).

**Trade-offs:** Centralized logic means one place to debug linking issues. But it requires the cluster registry to be complete and correct -- incomplete data produces broken links.

**Example:**
```typescript
// src/lib/seo/interlinks.ts
interface InterlinkResult {
  breadcrumbs: Array<{ label: string; href: string }>;
  relatedPages: Array<{
    title: string;
    href: string;
    description: string;
    anchorText: string;
  }>;
  contextualLinks: Map<string, string>; // keyword -> href (for rich text injection)
}

function computeInterlinks(
  currentPage: ClusterNode,
  allClusterNodes: ClusterNode[]
): InterlinkResult {
  // 1. Breadcrumbs: Home -> Cluster Pillar -> Current Page
  // 2. Related: Pillar (if satellite) + 2-3 siblings + 1 cross-cluster
  // 3. Contextual: Map keywords in body text to sibling page URLs
}
```

### Pattern 3: Schema Generator Factory

**What:** A factory function that takes a page's data + its `SchemaType` from the cluster registry and produces the correct JSON-LD object. Each schema type has a dedicated builder. All builders share common fields (url, name, description, breadcrumbList).

**When to use:** In `generateMetadata` or as a `<script type="application/ld+json">` in every page component. Replaces the current scattered JSON-LD implementations across pages.

**Trade-offs:** Centralized schema generation is more maintainable than per-page inline JSON-LD. But requires all page types to conform to a common data interface for the factory to consume.

**Example:**
```typescript
// src/lib/seo/schema.ts
function generateSchema(
  page: { title: string; description: string; slug: string; url: string },
  schemaType: SchemaType,
  extra: Record<string, unknown>
): WithContext<Thing> {
  const base = { '@context': 'https://schema.org', name: page.title, url: page.url };

  switch (schemaType) {
    case 'TouristTrip':
      return { ...base, '@type': 'TouristTrip', itinerary: extra.itinerary, ... };
    case 'FAQPage':
      return { ...base, '@type': 'FAQPage', mainEntity: extra.faqs, ... };
    case 'Article':
      return { ...base, '@type': 'Article', author: extra.author, datePublished: extra.date, ... };
    // ...
  }
}
```

### Pattern 4: Server-Side Lead Proxy to Odoo

**What:** Lead form submissions go to a Next.js API route (`/api/leads`) that validates, sanitizes, and forwards to Odoo CRM via XML-RPC or REST API. The API route enriches the lead with source tracking: which page the user was on, which cluster, which CTA triggered the form. The client never talks to Odoo directly.

**When to use:** For all lead capture forms (modal and inline).

**Trade-offs:** Adds a server hop but provides: input validation before CRM, source tracking enrichment, rate limiting, and decouples the frontend from Odoo's API specifics.

**Example:**
```typescript
// src/app/api/leads/route.ts
export async function POST(request: Request) {
  const body = await request.json();

  // 1. Validate with schema
  const validated = leadSchema.parse(body);

  // 2. Enrich with source tracking
  const lead = {
    name: validated.name,
    email: validated.email,
    phone: validated.phone,
    source: validated.pageSlug,      // which page
    medium: 'web',
    campaign: validated.clusterId,   // which cluster
    description: validated.message,
  };

  // 3. Forward to Odoo
  const result = await createOdooLead(lead);

  return Response.json({ success: true, id: result.id });
}
```

## Data Flow

### Content Pipeline: Wagtail to Rendered SEO Page

```
[Wagtail Admin]
    │ (editor publishes/updates page)
    ▼
[Wagtail API v2] ─── JSON response includes:
    │                 - Page content (StreamField blocks)
    │                 - SEO metadata (meta_title, meta_description, keywords)
    │                 - Cluster assignment (cluster_id, role, pillar_slug)
    │                 - Related pages (sibling slugs from cluster)
    │                 - Schema type (e.g., "TouristTrip")
    ▼
[Wagtail Client] (src/lib/wagtail/client.ts)
    │ → Axios GET with caching headers
    ▼
[Wagtail Mappers] (src/lib/wagtail/mappers.ts)
    │ → Transform CMS response to app types
    │ → Extract cluster metadata into ClusterNode
    ▼
[Data Layer] (src/lib/data/*.ts)
    │ → unstable_cache() with content-specific tags
    │ → Draft mode bypass
    │ → Mock data fallback
    ▼
[Cluster Resolver] (src/lib/seo/clusters.ts)
    │ → Given current page + all cluster nodes:
    │   resolve breadcrumbs, siblings, pillar
    ▼
[Interlink Engine] (src/lib/seo/interlinks.ts)
    │ → Compute related pages, contextual links
    ▼
[Schema Generator] (src/lib/seo/schema.ts)
    │ → Produce JSON-LD for this page type
    ▼
[Page Component] (src/app/[cluster]/[slug]/page.tsx)
    │ → generateMetadata(): meta tags, OG, canonical
    │ → Render: content + breadcrumbs + interlinks + JSON-LD
    │ → ISR: revalidate every 1800s
    ▼
[Static HTML] → Served to Googlebot and users
```

### Lead Capture Flow

```
[User on SEO Page]
    │ (clicks CTA)
    ▼
[Zustand modalStore] → openModal()
    ▼
[LeadFormModal] (client component)
    │ → Form fields + hidden fields:
    │   - pageSlug (current page)
    │   - clusterId (current cluster)
    │   - ctaPosition (hero|inline|footer)
    ▼
[POST /api/leads] (server)
    │ → Zod validation
    │ → Rate limiting (IP-based)
    │ → Source enrichment
    ▼
[Odoo Client] (src/lib/odoo/client.ts)
    │ → XML-RPC to Odoo (crm.lead model)
    │ → Fields: name, email, phone, source, medium, campaign, description
    ▼
[Odoo CRM]
    → Lead created with:
       - Contact info
       - Source = page URL
       - Campaign = cluster name
       - Tags = content type (ruta, pecio, guia, etc.)
```

### Cluster Topology (Content Architecture)

```
Cluster: "Vida a bordo Mar Rojo" (Pillar)
    ├── Satellite: "Que llevar a un vida a bordo"
    ├── Satellite: "Precio vida a bordo Mar Rojo"
    ├── Satellite: "Mejor epoca para bucear Mar Rojo"
    ├── Satellite: "Seguro de buceo para vida a bordo"
    └── Satellite: "Comparativa barcos vida a bordo"

Cluster: "Ruta Norte Mar Rojo" (Pillar)
    ├── Satellite: "SS Thistlegorm" (pecio)
    ├── Satellite: "Abu Nuhas pecios"
    ├── Satellite: "Ras Mohammed buceo"
    ├── Satellite: "Estrecho de Tiran"
    └── Satellite: "Itinerario ruta norte 7 dias"

Cluster: "Pecios Mar Rojo" (Pillar)
    ├── Satellite: "SS Thistlegorm" (shared with Ruta Norte)
    ├── Satellite: "Dunraven pecio"
    ├── Satellite: "Carnatic pecio"
    └── Satellite: "Rosalie Moller"

Cluster: "Logistica y preparacion" (Pillar)
    ├── Satellite: "Vuelos a Hurghada desde Espana"
    ├── Satellite: "Visado Egipto para espanoles"
    ├── Satellite: "Que certificacion necesito"
    └── Satellite: "Equipo propio vs alquiler"

Cluster: "Destinos buceo" (Pillar)
    ├── Satellite: "Hurghada buceo"
    ├── Satellite: "Sharm el Sheikh vs Hurghada"
    └── Satellite: "Marsa Alam buceo"
```

Cross-cluster links: Satellites can link to satellites in other clusters when topically relevant (e.g., "SS Thistlegorm" links to both "Ruta Norte" pillar and "Pecios" pillar).

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 30 pages (Phase 1) | ISR with 1800s revalidate is sufficient. Single sitemap file. Cluster registry fits in a single API call. Interlink computation is trivial (<100 nodes). |
| 60 pages (Phase 2) | Still well within ISR limits. Split sitemap into per-cluster segments if Google Search Console shows indexing delays. Add `sitemap-index.xml` pointing to per-cluster sitemaps. |
| 200+ pages (future) | Consider on-demand ISR revalidation via Wagtail webhook (POST to `/api/revalidate?tag=cluster-rutas`). Pre-compute interlink graph at build time, store as JSON, read at render time instead of computing per-request. |

### Scaling Priorities

1. **First bottleneck: Build time.** At 60 pages, `generateStaticParams` across all content types will generate 60 static pages. This is fast (under 2 minutes). At 200+ pages, consider incremental builds via on-demand revalidation webhooks from Wagtail.
2. **Second bottleneck: CMS API rate.** 60 pages each fetching cluster data + content = ~120 API calls during rebuild. Wagtail handles this easily. At 500+ pages, batch-fetch cluster topology in a single API call and cache it, rather than per-page lookups.

## Anti-Patterns

### Anti-Pattern 1: Hardcoded Interlinks

**What people do:** Manually write internal links in content body, or hardcode link arrays in page components.
**Why it's wrong:** Links rot when pages are renamed/deleted. Adding a new satellite page requires editing all sibling pages. At 60 pages, this becomes unmanageable.
**Do this instead:** Store relationships in Wagtail (cluster assignment + related pages fields), compute links at render time via the interlink engine. Content editors manage relationships in the CMS; the frontend just renders what the engine computes.

### Anti-Pattern 2: Per-Page Schema Markup

**What people do:** Write inline JSON-LD objects in each `page.tsx` file, duplicating shared fields and drifting from schema.org specs over time.
**Why it's wrong:** 60 page files each with bespoke JSON-LD means 60 places to fix when schema.org updates or when you discover validation errors. The existing codebase already shows this pattern (JSON-LD in 8+ page files).
**Do this instead:** Use the centralized schema generator factory. Each page calls `generateSchema(pageData, schemaType, extras)` and gets a validated object back. One place to maintain, one place to test.

### Anti-Pattern 3: Client-Side CRM Calls

**What people do:** POST form data directly from the browser to Odoo's API.
**Why it's wrong:** Exposes Odoo credentials in client-side code. No server-side validation. No rate limiting. No source tracking enrichment. CORS complications.
**Do this instead:** Route through a Next.js API route that validates, enriches, and proxies to Odoo. Keep Odoo credentials in server-side environment variables only.

### Anti-Pattern 4: Flat URL Structure for Clustered Content

**What people do:** Put all pages at the root level (`/que-llevar-vida-a-bordo`, `/precio-vida-a-bordo`, `/ss-thistlegorm`) without URL hierarchy.
**Why it's wrong:** Search engines use URL structure as a topical authority signal. Flat URLs don't communicate cluster relationships. Breadcrumbs become meaningless.
**Do this instead:** Use cluster-based URL hierarchy: `/vida-a-bordo-mar-rojo/que-llevar/`. The pillar page URL becomes the directory. This reinforces topical authority and makes breadcrumbs natural.

**Caveat:** The existing site already has routes like `/rutas/[slug]` and `/blog/[slug]`. For the new 60-page SEO architecture, evaluate whether the cluster slug should replace or nest under these existing route prefixes. Recommendation: use cluster slugs as the primary URL structure for new SEO pages, keeping existing routes for backward compatibility with 301 redirects where needed.

### Anti-Pattern 5: Ignoring Canonicals for Cross-Cluster Pages

**What people do:** Pages that belong to two clusters (e.g., "SS Thistlegorm" in both Ruta Norte and Pecios) get duplicate URLs or no canonical.
**Why it's wrong:** Duplicate content penalty. Link equity splits between two URLs.
**Do this instead:** Assign each page a single primary cluster and canonical URL. The secondary cluster links to the canonical URL. The page lives at one URL only.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Wagtail CMS** | REST API v2 via Axios (`src/lib/wagtail/client.ts`) | Already implemented. Extend models to add cluster metadata, SEO fields, and schema type selection. Use `api_fields` in Wagtail page models to expose new fields. |
| **Odoo CRM** | XML-RPC via Next.js API route (`/api/leads`) | Use `xmlrpc` npm package or Odoo's JSON-RPC endpoint. Authenticate with service account credentials stored in env vars. Create leads in `crm.lead` model with UTM tracking fields (source, medium, campaign). |
| **Google Search Console** | Sitemap submission + IndexNow API (optional) | Submit sitemap automatically. Consider IndexNow integration for instant indexing of new pages on publish. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Wagtail Client <-> Data Layer** | Function calls, typed returns | Already established. Extend `fetchers.ts` and `mappers.ts` for new cluster fields. |
| **Data Layer <-> SEO Module** | Function calls. Data Layer fetches raw data; SEO module computes derived data (interlinks, schema, breadcrumbs). | SEO module never fetches data directly. It receives pre-fetched data and computes. This keeps data fetching in one layer. |
| **SEO Module <-> Page Components** | Props. Pages call SEO functions, receive typed results, render them. | Pages never compute SEO logic directly. They call `computeInterlinks()`, `generateSchema()`, `getBreadcrumbs()` and render the results. |
| **Page Components <-> Lead Forms** | Zustand store for modal state. Hidden form fields for source tracking. | Already exists for modal state. Extend with hidden fields carrying `pageSlug` and `clusterId`. |
| **Lead API Route <-> Odoo Client** | Internal function calls. API route validates; Odoo client handles transport. | Odoo client module is isolated, reusable, testable independently. |

## Build Order (Dependencies)

The components have clear dependencies that dictate implementation order:

```
Phase 1: Foundation
    Wagtail SEO models (cluster fields, schema type) ──────┐
    Odoo CRM client module                                 │
                                                           ▼
Phase 2: Content Pipeline
    Wagtail fetchers/mappers extension ◄── depends on Wagtail models
    Cluster Resolver ◄── depends on fetchers returning cluster data
    Interlink Engine ◄── depends on Cluster Resolver
    Schema Generator ◄── depends on fetchers returning schema type
                                                           │
                                                           ▼
Phase 3: Page Rendering
    SEO page template (shared layout for all 60 pages) ◄── depends on Interlink + Schema
    Breadcrumbs component ◄── depends on Cluster Resolver
    RelatedContent component ◄── depends on Interlink Engine
    ClusterNav component ◄── depends on Cluster Resolver
                                                           │
                                                           ▼
Phase 4: Lead Capture
    Lead API route ◄── depends on Odoo client
    Form source tracking ◄── depends on cluster metadata in pages
    Lead enrichment ◄── depends on API route + Odoo client
                                                           │
                                                           ▼
Phase 5: Content Population
    First 30 pages of content ◄── depends on all above working
    Sitemap expansion ◄── depends on new content types registered
    Schema validation ◄── depends on pages rendering with JSON-LD
                                                           │
                                                           ▼
Phase 6: Scale to 60
    Remaining 30 pages ◄── depends on Phase 5 validated
    Cross-cluster linking audit ◄── depends on full content set
    SEO technical audit ◄── depends on all pages live
```

**Critical path:** Wagtail models must be extended FIRST. Everything downstream depends on the CMS carrying cluster metadata. Building the Next.js interlink engine before the Wagtail models exist means working with mock data only, which delays validation.

## Sources

- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official docs on structured data in App Router (HIGH confidence)
- [Wagtail Headless Support](https://docs.wagtail.org/en/latest/advanced_topics/headless.html) - Official Wagtail headless docs (HIGH confidence)
- [Wagtail Custom API Fields](https://learnwagtail.com/tutorials/headless-cms-exposing-custom-page-fields-v2-api/) - Exposing custom fields to v2 API (MEDIUM confidence)
- [Programmatic SEO in Next.js](https://practicalprogrammatic.com/blog/programmatic-seo-in-nextjs) - Architecture patterns for programmatic SEO (MEDIUM confidence)
- [Content Cluster Engine Architecture](https://shortenworld.com/blog/content-marketing-engine-topic-clusters-e-e-a-t-and-programmatic-seo) - Topic clusters + E-E-A-T strategy (MEDIUM confidence)
- [Internal Linking Strategy 2026](https://topicalmap.ai/blog/auto/internal-linking-strategy-guide-2026) - Automated internal linking patterns (MEDIUM confidence)
- [Odoo CRM Next.js Integration](https://www.heliconia.io/post/integrate-next-js-website-with-odoo) - Step-by-step Odoo + Next.js integration (MEDIUM confidence)
- [schema-dts TypeScript package](https://www.npmjs.com/package/schema-dts) - Type-safe schema.org types for JSON-LD (HIGH confidence - npm package)
- [Odoo Forum: React + CRM Leads](https://www.odoo.com/forum/help-1/i-want-to-integrate-my-react-js-websites-form-with-odoo-crm-lead-section-240652) - Community patterns for external form -> Odoo lead (LOW confidence)

---
*Architecture research for: SEO niche website content pipeline*
*Researched: 2026-03-06*
