# Phase 1: Technical Foundation - Research

**Researched:** 2026-03-06
**Domain:** Next.js 16 data layer, Wagtail API v2 integration, ISR caching
**Confidence:** HIGH

## Summary

Phase 1 fixes four concrete infrastructure problems in the existing codebase: (1) all Wagtail API calls use axios instead of native fetch, which bypasses Next.js 16's built-in per-request caching and revalidation; (2) the sitemap hardcodes `new Date()` for every lastmod value instead of pulling real publication dates from Wagtail; (3) the `getPages` function does not paginate, so any content type with >20 items silently drops entries; and (4) the data layer silently falls back to mock data in production when Wagtail is unavailable, serving fake content instead of failing explicitly.

The codebase is Next.js 16.1.5 with React 19.2.3. The current data layer is cleanly structured in three tiers: `src/lib/wagtail/client.ts` (axios-based low-level client), `src/lib/wagtail/fetchers.ts` (content-type fetchers), and `src/lib/data/*.ts` (cached data access with mock fallback via `unstable_cache`). This clean separation means each requirement maps to a specific layer with minimal cross-cutting changes.

**Primary recommendation:** Replace the axios client with native fetch + `next: { revalidate, tags }` options at the client layer, propagate `last_published_at` from Wagtail meta through to the sitemap, add offset-based pagination loop to `getPages`, and flip `FALLBACK_MODE` to `'none'` in production while ensuring errors surface through the existing `error.tsx` boundary.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
No locked decisions -- all implementation areas delegated to Claude's discretion.

### Claude's Discretion
All implementation areas are delegated to Claude's judgment:

**Error handling behavior:**
- What visitors see when Wagtail is unavailable (error page design, messaging, HTTP status codes)
- Whether to show a generic 500 or a styled error page with retry guidance
- How to handle partial failures (some API calls succeed, others fail)

**Cache freshness (ISR):**
- Revalidation intervals per content type (homepage vs detail pages vs listings)
- Whether to use time-based revalidation, on-demand revalidation, or both
- Cache tag strategy for targeted invalidation

**Sitemap scope and structure:**
- Whether to use a single sitemap or split by content type (sitemap index)
- Which page types to include/exclude
- How to handle pages without lastmod data

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TECH-01 | Migrate all Wagtail API calls from axios to native fetch for ISR compatibility | Next.js 16 fetch API with `next.revalidate` and `next.tags` options; replaces axios in `client.ts`; eliminates need for `unstable_cache` wrapper in data layer |
| TECH-02 | Generate sitemap XML with real lastmod dates from Wagtail page data | Wagtail `last_published_at` field (on Page model since 2017); needs `api_meta_fields` config in Wagtail models or use `first_published_at` as fallback; sitemap.ts must pass dates through |
| TECH-03 | Implement pagination for Wagtail API calls to support >20 content items | Wagtail API default limit=20; use `?offset=N&limit=N` loop in `getPages`; check `meta.total_count` to know when to stop |
| TECH-04 | Remove mock data fallback in production -- fail explicitly instead of serving fake content | Set `FALLBACK_MODE=none` in production; data layer errors propagate to Next.js error boundary (`error.tsx`); keep mock fallback in development only |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.5 | Framework (already installed) | Project stack -- no change |
| react | 19.2.3 | UI library (already installed) | Project stack -- no change |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| date-fns | 4.1.0 | Date formatting (already installed) | Formatting lastmod dates if needed |

### Removals
| Library | Reason | Replacement |
|---------|--------|-------------|
| axios | Bypasses Next.js fetch caching; TECH-01 requirement | Native `fetch()` with `next` options |

**Post-migration:**
```bash
npm uninstall axios
```

## Architecture Patterns

### Recommended Project Structure (changes only)
```
src/lib/
  wagtail/
    client.ts          # REWRITE: native fetch, revalidation, tags, pagination
    types.ts           # ADD: last_published_at to WagtailPageMeta
    fetchers.ts        # MINOR: update return types if needed
    mappers.ts         # NO CHANGE
    index.ts           # NO CHANGE
  data/
    config.ts          # MODIFY: enforce FALLBACK_MODE=none in production
    homepage.ts        # SIMPLIFY: remove unstable_cache wrapper, use fetch-level caching
    blog.ts            # SIMPLIFY: same
    rutas.ts           # SIMPLIFY: same
    experiencias.ts    # SIMPLIFY: same
    ofertas.ts         # SIMPLIFY: same
    cursos.ts          # SIMPLIFY: same
  mock-data/           # KEEP: only used in development
src/app/
    sitemap.ts         # MODIFY: pass real lastmod dates
    error.tsx           # KEEP: already exists with proper styling
```

### Pattern 1: Native Fetch with ISR Caching

**What:** Replace axios calls with native `fetch()` using Next.js `next` options for per-request caching.

**Why:** In Next.js 16, `fetch()` is the only way to get automatic per-request caching with revalidation and tag-based invalidation. `unstable_cache` still works but is deprecated in favor of `use cache` directive. For this migration, using fetch-level caching is the cleanest path since the data comes from an external API.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/fetch
const WAGTAIL_API_URL = process.env.NEXT_PUBLIC_WAGTAIL_API_URL || 'http://localhost:8000/api/v2'

interface FetchOptions {
  revalidate?: number | false
  tags?: string[]
}

async function wagtailFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
  options: FetchOptions = {}
): Promise<T> {
  const url = new URL(`${WAGTAIL_API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags ?? [],
    },
  })

  if (!response.ok) {
    throw new Error(`Wagtail API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
```

### Pattern 2: Offset-Based Pagination Loop

**What:** Fetch all pages from Wagtail by iterating with offset/limit until all items are retrieved.

**Why:** Wagtail API defaults to 20 items per response. Without pagination, content types with >20 items silently lose entries.

**Example:**
```typescript
// Source: https://docs.wagtail.org/en/stable/advanced_topics/api/v2/usage.html
async function getAllPages<T extends WagtailPage>(
  type: string,
  params?: Record<string, string>,
  options?: FetchOptions
): Promise<T[]> {
  const BATCH_SIZE = 20 // Wagtail default limit
  let allItems: T[] = []
  let offset = 0

  while (true) {
    const response = await wagtailFetch<WagtailAPIResponse<T>>(
      '/pages/',
      {
        type,
        fields: '*',
        limit: String(BATCH_SIZE),
        offset: String(offset),
        ...params,
      },
      options
    )

    allItems = [...allItems, ...response.items]

    if (allItems.length >= response.meta.total_count) {
      break
    }
    offset += BATCH_SIZE
  }

  return allItems
}
```

### Pattern 3: Environment-Aware Error Handling

**What:** In production, API failures throw errors that bubble to `error.tsx`. In development, fall back to mock data.

**Example:**
```typescript
// config.ts
export function shouldUseFallback(): boolean {
  return process.env.NODE_ENV !== 'production'
}
```

### Anti-Patterns to Avoid

- **Wrapping fetch in unstable_cache:** With native fetch + `next.revalidate`, adding `unstable_cache` creates redundant caching. `unstable_cache` is deprecated in Next.js 16 anyway (replaced by `use cache` directive). Use fetch-level caching only.
- **Using `cache: 'force-cache'` without revalidation:** This caches forever without any way to refresh. Always pair with a `revalidate` interval.
- **Silencing fetch errors with empty arrays:** The current code returns `[]` on error in fetchers.ts. In production this means pages render with no content instead of showing an error. Errors must propagate.
- **Paginating with `Promise.all` for all pages simultaneously:** If total_count is unknown upfront, you cannot parallelize. Use sequential loop, which is fine since each request is small.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTTP client | Custom fetch wrapper with retry/interceptors | Simple native fetch + Next.js options | Next.js extends fetch with caching; any wrapper must not interfere |
| Request caching | Custom in-memory cache | `next: { revalidate, tags }` on fetch | Framework handles stale-while-revalidate, persistence across requests |
| Sitemap generation | Custom XML builder | Next.js `MetadataRoute.Sitemap` (already in use) | Built-in, type-safe, handles XML serialization |
| Error boundaries | Custom try/catch in every page | Next.js `error.tsx` convention (already exists) | Automatically catches thrown errors in server components |

## Common Pitfalls

### Pitfall 1: fetch Default is No-Cache in Next.js 16
**What goes wrong:** Developers assume fetch caches by default (as in Next.js 13-14). In Next.js 15+, `fetch` defaults to `auto no cache` -- it does NOT cache unless you explicitly set `cache: 'force-cache'` or `next.revalidate`.
**Why it happens:** Next.js changed the default behavior across versions.
**How to avoid:** Explicitly set `next: { revalidate: N }` on every Wagtail fetch call. This opts into ISR.
**Warning signs:** Every page request hits Wagtail API; no caching observed.

### Pitfall 2: unstable_cache + fetch Double-Caching
**What goes wrong:** Using `unstable_cache` to wrap a function that itself uses `fetch` with `next.revalidate` creates two layers of caching with potentially different TTLs, leading to unpredictable staleness.
**Why it happens:** The current code already uses `unstable_cache`. After migrating to native fetch, developers might forget to remove the wrapper.
**How to avoid:** After migrating client.ts to native fetch with revalidation, remove all `unstable_cache` wrappers from `src/lib/data/*.ts`. The data layer files become simple pass-throughs (only handling draftMode bypass).
**Warning signs:** Data stays stale longer than expected; confusing cache behavior.

### Pitfall 3: Wagtail `last_published_at` Not in Default API Meta
**What goes wrong:** The Wagtail API v2 includes `first_published_at` in meta by default, but `last_published_at` is NOT in the default meta fields. Sitemap shows publication date instead of last-modified date.
**Why it happens:** `last_published_at` exists on the Django model but is not exposed in the API response by default.
**How to avoid:** Two options: (A) Add `api_meta_fields` to Wagtail page models (requires Wagtail-side changes in sibling project), or (B) Use `first_published_at` as the lastmod value, which is better than `new Date()` even if not perfect. Option B is achievable within this phase's scope. Option A is ideal but depends on Wagtail project changes.
**Warning signs:** `last_published_at` is undefined/null in API responses.

### Pitfall 4: Silent Data Loss from Pagination
**What goes wrong:** Current `getPages` in client.ts does not pass `limit` or `offset`. Wagtail returns only the first 20 items. When content grows past 20, pages silently disappear.
**Why it happens:** Developers don't notice until content volume exceeds the default limit.
**How to avoid:** Always paginate by looping with offset until `items.length >= meta.total_count`.
**Warning signs:** Content count in CMS doesn't match what the website shows.

### Pitfall 5: Mock Fallback Masks Production Failures
**What goes wrong:** When Wagtail is down in production, the site silently serves hardcoded mock data. Users see fake content; SEO indexes fake pages. No alerts fire because there's no error.
**Why it happens:** `FALLBACK_MODE` defaults to `'full'` and is not overridden in production environment.
**How to avoid:** Set `FALLBACK_MODE=none` in production environment variables. Errors throw and hit `error.tsx`.
**Warning signs:** Site shows Spanish placeholder text that doesn't match real CMS content.

## Code Examples

### Complete Wagtail Client Migration (client.ts)

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/fetch
// Source: https://docs.wagtail.org/en/stable/advanced_topics/api/v2/usage.html

const WAGTAIL_API_URL = process.env.NEXT_PUBLIC_WAGTAIL_API_URL || 'http://localhost:8000/api/v2'
const SITE_HOSTNAME = process.env.NEXT_PUBLIC_SITE_HOSTNAME || 'localhost'

interface WagtailAPIResponse<T> {
  meta: {
    total_count: number
  }
  items: T[]
}

interface WagtailPageMeta {
  type: string
  detail_url: string
  html_url: string | null
  slug: string
  first_published_at: string
  last_published_at?: string  // May not be in API response by default
  locale: string
}

interface FetchConfig {
  revalidate?: number | false
  tags?: string[]
}

async function wagtailFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
  config: FetchConfig = {}
): Promise<T> {
  const url = new URL(`${WAGTAIL_API_URL}${endpoint}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value)
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Wagtail API] GET ${url.pathname}${url.search}`)
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    next: {
      revalidate: config.revalidate ?? 3600,
      ...(config.tags?.length ? { tags: config.tags } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(
      `Wagtail API error: ${response.status} ${response.statusText} for ${endpoint}`
    )
  }

  return response.json()
}

export async function getPages<T extends WagtailPage>(
  type: string,
  params?: Record<string, string>,
  config?: FetchConfig
): Promise<T[]> {
  const BATCH_SIZE = 20
  let allItems: T[] = []
  let offset = 0

  while (true) {
    const response = await wagtailFetch<WagtailAPIResponse<T>>(
      '/pages/',
      {
        type,
        site: SITE_HOSTNAME,
        fields: '*',
        limit: String(BATCH_SIZE),
        offset: String(offset),
        ...params,
      },
      config
    )

    allItems = [...allItems, ...response.items]

    if (allItems.length >= response.meta.total_count) {
      break
    }
    offset += BATCH_SIZE
  }

  return allItems
}
```

### Simplified Data Layer (after migration)

```typescript
// src/lib/data/blog.ts -- after removing unstable_cache
import { draftMode } from 'next/headers'
import { getAllBlogPosts, getBlogPost } from '@/lib/wagtail/fetchers'
import { blogPosts as mockPosts } from '@/lib/mock-data/blog-posts'

export async function getAllBlogPostsData() {
  const { isEnabled: isDraft } = await draftMode()

  try {
    // fetch-level caching via next: { revalidate, tags } in client.ts
    const data = await getAllBlogPosts({ revalidate: 600, tags: ['blog', 'blog-list'] })
    if (!data || data.length === 0) throw new Error('No blog posts received from API')
    return data
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Data Layer] Using mock data fallback for blog posts')
      return mockPosts
    }
    throw error // In production: propagates to error.tsx
  }
}
```

### Sitemap with Real Dates

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

// Fetcher returns items with meta.first_published_at
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, rutas, ...rest] = await Promise.all([
    getAllBlogPostSlugsData(),
    getAllRutasSlugsData(),
    // ...
  ])

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified  // Real date from Wagtail
      ? new Date(post.lastModified)
      : undefined,  // Omit rather than fake
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ...
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `unstable_cache` for data caching | `use cache` directive (or fetch-level caching for API calls) | Next.js 16 (stable) | `unstable_cache` still works but is deprecated; fetch-level caching is simpler for external API calls |
| `cache: 'force-cache'` as fetch default | `auto no cache` as fetch default | Next.js 15+ | Must explicitly opt into caching with `next.revalidate` |
| middleware.ts | proxy.ts | Next.js 16 | Not relevant to this phase but noted for awareness |
| Synchronous request APIs | Async-only `draftMode()`, `headers()`, `cookies()` | Next.js 16 (breaking) | Already using `await draftMode()` in data layer -- no change needed |

**Key version note:** Project is on Next.js 16.1.5. The `unstable_cache` API works but is formally replaced by `use cache`. For this migration, fetch-level caching is the right choice because we're fetching from an external API -- no need for `use cache` which is designed for arbitrary server-side computations.

## Open Questions

1. **Wagtail `last_published_at` in API response**
   - What we know: The field exists on the Django Page model since Wagtail 1.11 (2017). It is NOT in the default API meta fields.
   - What's unclear: Whether the sibling Wagtail project already exposes it via `api_meta_fields`, or whether we need to add it.
   - Recommendation: Use `first_published_at` as a "good enough" fallback. It is already in the API response and is significantly better than `new Date()`. If the Wagtail project is modified in Phase 2 (CONT-01, CONT-02), add `api_meta_fields = [APIField('last_published_at')]` to base page models at that time.

2. **`use cache` vs fetch-level caching**
   - What we know: Next.js 16 promotes `use cache` as the successor to `unstable_cache`. But for external API fetches, the `next: { revalidate, tags }` option on `fetch()` is the documented pattern.
   - What's unclear: Whether Next.js will deprecate fetch-level caching in favor of `use cache` in future versions.
   - Recommendation: Use fetch-level caching for this migration. It's the simplest path, well-documented, and doesn't require experimental flags. If `use cache` becomes mandatory later, the migration surface is small (just `client.ts`).

3. **Revalidation intervals per content type**
   - What we know: Current code uses different intervals: homepage=600s, blog=600s, rutas=1800s, experiencias=1800s, ofertas=900s, cursos=3600s.
   - What's unclear: Whether these intervals are intentional or arbitrary.
   - Recommendation: Keep existing intervals as a starting point. Move them to the fetch-level config in client.ts calls. Adjust based on production traffic patterns later (OPT-01 will add on-demand revalidation via webhook).

## Sources

### Primary (HIGH confidence)
- [Next.js 16 fetch API reference](https://nextjs.org/docs/app/api-reference/functions/fetch) - fetch options: cache, next.revalidate, next.tags
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) - Breaking changes, unstable_cache deprecation, async APIs
- [Next.js ISR guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration) - ISR patterns
- [Wagtail API v2 usage guide](https://docs.wagtail.org/en/stable/advanced_topics/api/v2/usage.html) - Pagination, fields, meta fields
- [Next.js unstable_cache docs](https://nextjs.org/docs/app/api-reference/functions/unstable_cache) - Deprecation notice, replacement with use cache

### Secondary (MEDIUM confidence)
- [Wagtail GitHub issue #3578](https://github.com/wagtail/wagtail/issues/3578) - `last_published_at` field added to Page model (merged 2017)
- [Wagtail GitHub issue #7009](https://github.com/wagtail/wagtail/issues/7009) - `api_meta_fields` pattern for custom meta in API responses

### Tertiary (LOW confidence)
- Wagtail `api_meta_fields` for `last_published_at`: not verified against current project's Wagtail version; needs validation against sibling Wagtail codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Direct codebase inspection, official Next.js 16 docs verified
- Architecture: HIGH - Clear migration path from existing code structure
- Pitfalls: HIGH - Each pitfall identified from actual code patterns in the codebase
- Sitemap lastmod: MEDIUM - `last_published_at` exists on model but API exposure uncertain

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable -- Next.js 16 is released, Wagtail API v2 is mature)
