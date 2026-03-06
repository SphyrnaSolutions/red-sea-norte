# Stack Research

**Domain:** SEO niche website -- programmatic content generation, lead capture, headless CMS scaling
**Researched:** 2026-03-06
**Confidence:** HIGH (core stack already exists; recommendations are additive libraries for well-understood patterns)

## Existing Stack (DO NOT CHANGE)

These are already in production and locked. Listed for reference only.

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.5 | App Router, SSR/SSG/ISR, image optimization |
| React | 19.2.3 | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Axios | 1.13.4 | HTTP client (Wagtail API) |
| Zustand | 5.0.10 | Client state (modals) |
| Framer Motion | 12.29.2 | Animations |
| Docker + Dokploy | -- | Deployment |
| Wagtail (headless) | -- | CMS (separate repo) |

## Recommended Additions

### SEO Infrastructure

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| schema-dts | 1.1.5 | TypeScript types for Schema.org JSON-LD | Google's own package. Gives type-safe structured data -- autocomplete for every Schema.org type. Prevents typos in JSON-LD that silently fail in Google Search Console. No runtime cost (types only). | HIGH |

**Why not next-seo?** Next.js 16's built-in `generateMetadata` API handles all meta tags, Open Graph, Twitter Cards, and canonical URLs natively. Adding next-seo would duplicate what the framework already does. The only gap is JSON-LD structured data, which `schema-dts` fills with pure types (no runtime library needed). Next.js official docs recommend rendering JSON-LD as a `<script>` tag directly in page components -- no wrapper library required.

**JSON-LD implementation pattern (no library needed):**
```typescript
import type { WithContext, TouristTrip } from 'schema-dts'

const jsonLd: WithContext<TouristTrip> = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Ruta Norte Mar Rojo',
  touristType: 'Buceo',
  // ... type-safe, autocomplete-driven
}

// Render in page.tsx -- NOT in <head>, anywhere in the component tree works
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### Lead Capture (Forms)

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| react-hook-form | 7.71.2 | Form state management | Uncontrolled components = minimal re-renders. Works with React 19 and Server Actions via `useActionState`. De facto standard for Next.js forms in 2025/2026. | HIGH |
| @hookform/resolvers | 5.2.2 | Validation resolver bridge | Connects react-hook-form to Zod schemas. Auto-detects Zod v3/v4 at runtime. | HIGH |
| zod | 4.3.6 | Schema validation | TypeScript-first validation. Same schema validates on client AND server (Server Action). Shares types with form and API layer. Zod 4 is the current major with better performance and smaller bundle. | HIGH |

**Why this combo over alternatives?**
- `formik` is heavier, re-renders more, and has fallen behind react-hook-form in ecosystem adoption
- Native HTML validation is insufficient for complex forms (conditional fields, phone format, Odoo-specific constraints)
- Zod over Yup because Zod is TypeScript-native (Yup retrofitted TS), and Zod 4 has a significantly smaller bundle

### Odoo CRM Integration

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| axios (already installed) | 1.13.4 | HTTP client for Odoo JSON-RPC | Already in the project for Wagtail. Reuse for Odoo. No need for a second HTTP client. | HIGH |

**No additional Odoo library needed.** Odoo's external API uses JSON-RPC 2.0, which is just HTTP POST with a specific JSON payload shape. A thin wrapper around the existing axios instance is all that's required.

**Odoo integration architecture (Server Actions only, never client-side):**

```typescript
// src/lib/odoo/client.ts -- thin JSON-RPC wrapper
const ODOO_URL = process.env.ODOO_URL        // Server-only env var (no NEXT_PUBLIC_)
const ODOO_DB = process.env.ODOO_DB
const ODOO_API_KEY = process.env.ODOO_API_KEY
const ODOO_USER_ID = Number(process.env.ODOO_USER_ID)

async function odooRpc(model: string, method: string, args: unknown[]) {
  const { data } = await axios.post(`${ODOO_URL}/jsonrpc`, {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'object',
      method: 'execute_kw',
      args: [ODOO_DB, ODOO_USER_ID, ODOO_API_KEY, model, method, ...args],
    },
  })
  if (data.error) throw new Error(data.error.message)
  return data.result
}

// Create lead
export async function createLead(fields: Record<string, unknown>) {
  return odooRpc('crm.lead', 'create', [[fields]])
}
```

**Authentication:** Use Odoo API keys (not username/password). Generate in Odoo user Preferences > Account Security > New API Key. Store in `.env.local` as `ODOO_API_KEY`. The user ID (integer) is also needed -- get it from the authentication response or Odoo admin.

### Programmatic SEO Page Generation

No additional libraries needed. Next.js 16 provides everything:

| Feature | Next.js Built-in | How to Use | Confidence |
|---------|-----------------|------------|------------|
| Static page generation | `generateStaticParams()` | Export from dynamic route `[slug]/page.tsx`. Wagtail API returns all slugs at build time. | HIGH |
| Incremental revalidation | `revalidatePath()` / `revalidateTag()` | Time-based: `export const revalidate = 3600` (1h). On-demand: API route hit by Wagtail webhook on publish. | HIGH |
| Metadata per page | `generateMetadata()` | Async function co-located with page. Fetches title, description, OG image from Wagtail. | HIGH |
| Sitemap | `sitemap.ts` | Already exists. Extend with new content types (guias, spots, pecios). | HIGH |
| Robots | `robots.ts` | Already exists. No changes needed. | HIGH |
| Canonical URLs | `metadata.alternates.canonical` | Set in `generateMetadata()` return value. | HIGH |

**ISR strategy for 60 programmatic pages:**
- All 60 pages pre-rendered at build time via `generateStaticParams()` (fetches slugs from Wagtail)
- `revalidate = 3600` (1 hour) as baseline -- content changes rarely
- Wagtail webhook triggers `revalidatePath('/ruta-norte/thistlegorm')` for on-demand updates when editor publishes
- API route `/api/revalidate` with secret token for webhook security

### Content Interlinking

No library needed. Build a utility function:

| Need | Solution | Confidence |
|------|----------|------------|
| Auto-interlinking between cluster pages | Wagtail API returns related pages per content type. Render as `<Link>` components in a "Related Content" section. | HIGH |
| Breadcrumbs with JSON-LD | Build from URL path segments + Wagtail page tree. Use `schema-dts` `BreadcrumbList` type. | HIGH |
| Table of contents | Parse H2/H3 from Wagtail `StreamField` body at render time. Client-side scroll tracking with `IntersectionObserver`. | HIGH |

## Development Tools (additions)

| Tool | Purpose | Notes |
|------|---------|-------|
| Google Search Console | Monitor indexing, rich results, keyword performance | Required. Connect after deploying first batch of pages. |
| Schema Markup Validator | Validate JSON-LD before deploy | Use https://validator.schema.org/ -- no install needed |

## Installation

```bash
# Form handling + validation
npm install react-hook-form@7 @hookform/resolvers@5 zod@4

# SEO structured data types (dev dependency -- types only, zero runtime)
npm install -D schema-dts@1.1.5
```

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| Built-in `generateMetadata` | next-seo | next-seo duplicates what Next.js 16 does natively. Extra dependency for zero gain. |
| schema-dts (types only) | next-seo JSON-LD components | schema-dts is zero-runtime, Google-maintained, more flexible for custom schema types like TouristTrip |
| Zod 4 | Yup | Yup was built for JS, TS support is an afterthought. Zod is TypeScript-native, smaller bundle in v4, same-schema client+server validation. |
| react-hook-form | Formik | Formik uses controlled components (more re-renders), larger bundle, slower iteration on React 19 support |
| Raw axios for Odoo | odoo-xmlrpc / Apideck SDK | XML-RPC is legacy. Apideck adds unnecessary abstraction layer for a single integration. axios is already installed. |
| Server Actions for Odoo | Client-side API calls | Odoo credentials must never reach the browser. Server Actions keep secrets server-side by design. |
| Time-based ISR + webhook | Full SSR | 60 pages is small enough to pre-render entirely. SSR adds latency with no benefit for content that changes weekly. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-seo | Redundant with Next.js 16 built-in Metadata API. Adds ~15KB for functionality you already have. | `generateMetadata()` + `schema-dts` for JSON-LD types |
| next-sitemap (package) | Next.js App Router has native `sitemap.ts` which is already implemented in this project. | Keep the existing `src/app/sitemap.ts` |
| xml-rpc for Odoo | Legacy protocol. JSON-RPC is Odoo's modern standard and works with axios. | axios + JSON-RPC wrapper |
| Contentlayer / MDX | Content lives in Wagtail, not in local markdown files. These tools solve a different problem. | Wagtail API + `generateStaticParams` |
| next-intl / i18n libraries | Out of scope. Spanish-only for this phase. Adding i18n infrastructure now is premature complexity. | Hardcoded `lang="es"` in layout |
| Headless UI / Radix | The project already has its own UI components with CVA + Tailwind. Adding a component library for a few forms is overkill. | Custom form components with existing CVA pattern |

## Environment Variables (new)

```bash
# .env.local additions for Odoo integration
ODOO_URL=https://your-odoo-instance.com    # NO trailing slash
ODOO_DB=your_database_name
ODOO_USER_ID=2                              # Integer user ID
ODOO_API_KEY=your_api_key_here              # From Odoo Preferences > Account Security
REVALIDATION_SECRET=random_secret_string    # For webhook revalidation endpoint
```

All Odoo variables are server-only (no `NEXT_PUBLIC_` prefix) -- they must never be exposed to the client bundle.

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| react-hook-form@7.71 | React 19.x, Next.js 16.x | Full support for `useActionState` (React 19) |
| @hookform/resolvers@5.2 | zod@3.25+ and zod@4.x | Auto-detects Zod version at runtime |
| zod@4.3 | TypeScript 5.x | Requires TS 5.0+ for satisfies operator |
| schema-dts@1.1.5 | TypeScript 5.x | Types-only package, no runtime dependencies |
| axios@1.13 | Node.js 22+ | Already installed and working |

## Sources

- [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- official, HIGH confidence
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) -- official, HIGH confidence
- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) -- official, HIGH confidence
- [Odoo 18.0 External API docs](https://www.odoo.com/documentation/18.0/developer/reference/external_api.html) -- official, HIGH confidence
- [react-hook-form npm](https://www.npmjs.com/package/react-hook-form) -- v7.71.2, HIGH confidence
- [zod npm](https://www.npmjs.com/package/zod) -- v4.3.6, HIGH confidence
- [@hookform/resolvers npm](https://www.npmjs.com/package/@hookform/resolvers) -- v5.2.2, HIGH confidence
- [schema-dts GitHub (Google)](https://github.com/google/schema-dts) -- v1.1.5, HIGH confidence
- [Odoo CRM API integration guide](https://rollout.com/integration-guides/odoo-crm/sdk/step-by-step-guide-to-building-a-odoo-crm-api-integration-in-js) -- MEDIUM confidence (third-party guide, verified against official docs)

---
*Stack research for: Red Sea Norte -- SEO niche website scaling milestone*
*Researched: 2026-03-06*
