# Architecture

**Analysis Date:** 2026-03-06

## Pattern Overview

**Overall:** Next.js App Router with Headless CMS (Wagtail) and mock-data fallback

**Key Characteristics:**
- Server-side rendering with ISR (Incremental Static Regeneration) via `revalidate` exports and `unstable_cache`
- Three-layer data architecture: Pages -> Data Layer -> Wagtail API (with mock-data fallback)
- Atomic Design component hierarchy (atoms/molecules/organisms)
- Content types map 1:1 between Wagtail CMS models and Next.js dynamic routes
- Draft Mode support for CMS preview integration
- Spanish-language domain (buceo/diving in the Red Sea)

## Layers

**Presentation Layer (Pages):**
- Purpose: Route handlers, metadata, SEO, JSON-LD structured data, page composition
- Location: `src/app/`
- Contains: Page components (`page.tsx`), layouts (`layout.tsx`), API routes, sitemap, robots
- Depends on: Data Layer, Components
- Used by: Next.js router (end users)

**Component Layer:**
- Purpose: Reusable UI components following Atomic Design
- Location: `src/components/`
- Contains: Atoms (`src/components/atoms/`), Molecules (`src/components/molecules/`), Organisms (`src/components/organisms/`), UI primitives (`src/components/ui/`)
- Depends on: Stores (Zustand), Hooks, UI libraries (lucide-react, framer-motion)
- Used by: Pages

**Data Layer:**
- Purpose: Orchestrates data fetching with caching, draft mode awareness, and fallback logic
- Location: `src/lib/data/`
- Contains: Per-content-type data modules (`homepage.ts`, `blog.ts`, `rutas.ts`, `experiencias.ts`, `ofertas.ts`, `cursos.ts`), config (`config.ts`)
- Depends on: Wagtail Integration, Mock Data
- Used by: Pages (server components)

**Wagtail Integration Layer:**
- Purpose: API client, typed fetchers, and data mappers for Wagtail CMS
- Location: `src/lib/wagtail/`
- Contains: HTTP client (`client.ts`), content fetchers (`fetchers.ts`), data mappers (`mappers.ts`), CMS response types (`types.ts`)
- Depends on: Axios, Wagtail API v2
- Used by: Data Layer

**Mock Data Layer:**
- Purpose: Static fallback data when Wagtail CMS is unavailable
- Location: `src/lib/mock-data/`
- Contains: Static data files per content type, shared TypeScript types (`types.ts`)
- Depends on: Nothing
- Used by: Data Layer (as fallback)

**State Management:**
- Purpose: Client-side state for UI interactions (modal open/close)
- Location: `src/lib/stores/` and `src/stores/`
- Contains: Zustand stores (`useModalStore.ts`)
- Depends on: Zustand
- Used by: Client components (Header, HeroSection, LeadFormModal)

## Data Flow

**Page Render (Server-Side):**

1. Next.js invokes page component (e.g., `src/app/page.tsx`)
2. Page calls data function from `src/lib/data/` (e.g., `getHomePageData()`)
3. Data function checks `draftMode()` -- if draft, bypasses cache
4. If not draft, wraps fetch in `unstable_cache()` with content-specific tags and TTL
5. Internal fetch calls Wagtail fetcher from `src/lib/wagtail/fetchers.ts`
6. Fetcher calls Wagtail client (`src/lib/wagtail/client.ts`) which uses Axios to hit Wagtail API v2
7. Response is mapped via `src/lib/wagtail/mappers.ts` from Wagtail types to app types
8. If Wagtail fails, `shouldUseFallback()` from `src/lib/data/config.ts` determines whether to use mock data
9. Data returned to page, which renders organism components with the data as props

**CMS Preview Flow:**

1. Wagtail sends preview request to `/api/preview?token=X&content_type=Y`
2. `src/app/api/preview/route.ts` enables Draft Mode via `draftMode().enable()`
3. Route fetches preview data from Wagtail to determine slug
4. Redirects to the content page (e.g., `/rutas/ruta-norte`)
5. Page detects draft mode, bypasses cache, fetches fresh data
6. Draft mode banner shown to editors
7. `/api/disable-draft` route disables draft mode

**Lead Form / CTA Interaction (Client-Side):**

1. User clicks CTA button in Header, HeroSection, or any CTA component
2. Component calls `useModalStore().openModal()`
3. `LeadFormModal` component (rendered in page) reacts to store state change
4. Modal renders with form fields from CMS data

**State Management:**
- Server state: Managed via Next.js ISR (`revalidate` exports) and `unstable_cache` with tags
- Client state: Zustand store for modal visibility (`useModalStore`)
- No client-side data fetching or SWR/React Query -- all data is server-fetched

## Key Abstractions

**Content Types:**
- Purpose: Represent the 6 content domains of the site
- Types: `HomepageData`, `BlogPost`, `RutaData`, `ExperienciaData`, `OfertaData`, `CursoData`
- Defined in: `src/lib/mock-data/types.ts`
- Pattern: Each type has a corresponding Wagtail type in `src/lib/wagtail/types.ts`, a mapper in `mappers.ts`, a fetcher in `fetchers.ts`, and a data module in `src/lib/data/`

**Wagtail StreamField Blocks:**
- Purpose: Represent CMS-managed structured content blocks
- Types: `WagtailStreamFieldBlock`, `Block`, `ExperienciaSection`
- Defined in: `src/lib/wagtail/types.ts` and `src/lib/mock-data/types.ts`
- Pattern: Generic block with `type`, `id`, `value` -- mapped to specific section types via type guards in mappers

**Fallback Configuration:**
- Purpose: Control graceful degradation when CMS is unavailable
- Location: `src/lib/data/config.ts`
- Modes: `full` (always fallback), `critical` (only homepage/blog), `emergency` (always), `none` (never)
- Controlled by: `FALLBACK_MODE` environment variable

**HeroData:**
- Purpose: Standardized hero section data shared across all content types
- Defined in: `src/lib/mock-data/types.ts`
- Pattern: `backgroundImage`, `badge`, `title`, `subtitle`, `primaryCTA`, `secondaryCTA`, `ctas[]`
- Used by: Homepage, Rutas, Experiencias, Ofertas

## Entry Points

**Application Root:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: HTML shell, font loading (Satoshi, Clash Display via Fontshare; JetBrains Mono via Google Fonts), global layout (Header, Footer, FloatingWhatsApp, MobileCTABar)

**Homepage:**
- Location: `src/app/page.tsx`
- Triggers: `/` route
- Responsibilities: Fetches homepage data, renders section organisms, JSON-LD structured data (Organization, WebSite schemas)

**Dynamic Content Pages:**
- Location: `src/app/[content-type]/[slug]/page.tsx`
- Content types: `rutas`, `blog`, `experiencias`, `ofertas`, `cursos`
- Pattern: `generateStaticParams()` for SSG, `generateMetadata()` for SEO, `revalidate` for ISR

**Listing Pages:**
- Location: `src/app/[content-type]/page.tsx`
- Content types: `rutas`, `blog`, `experiencias`, `cursos`
- Pattern: Fetch all items, render listing grid

**API Routes:**
- Preview: `src/app/api/preview/route.ts` -- Wagtail draft mode integration
- Disable Draft: `src/app/api/disable-draft/route.ts` -- Exit preview mode

**SEO Entry Points:**
- Sitemap: `src/app/sitemap.ts` -- Dynamic sitemap from all content types
- Robots: `src/app/robots.ts`

## Error Handling

**Strategy:** Layered error handling with graceful degradation to mock data

**Patterns:**
- Wagtail client (`src/lib/wagtail/client.ts`): Catches Axios errors, logs details (status, message, data), returns `null` for 404s, re-throws for other errors
- Wagtail fetchers (`src/lib/wagtail/fetchers.ts`): Catches all errors, returns empty arrays or `null`
- Data layer (`src/lib/data/*.ts`): Catches errors, checks `shouldUseFallback()`, falls back to mock data or returns `null`
- Pages: Check for `null` data, call `notFound()` which renders `src/app/not-found.tsx`
- Global error boundary: `src/app/error.tsx` (client component) with retry button
- Loading state: `src/app/loading.tsx`

## Cross-Cutting Concerns

**Logging:** `console.log`/`console.error`/`console.warn` with `[Wagtail API]` and `[Data Layer]` prefixes. Development-only request/response logging via Axios interceptors in `src/lib/wagtail/client.ts`.

**Validation:** No schema validation (e.g., Zod) on API responses. Type safety relies on TypeScript interfaces and `as` assertions in mappers.

**Authentication:** No user authentication system. CMS preview uses token-based validation via query parameters.

**Caching:** ISR via `revalidate` page exports (600s homepage, 1800s rutas/experiencias, 3600s cursos, 900s ofertas) and `unstable_cache` with content-specific tags. Draft mode bypasses all caching.

**SEO:** Per-page `generateMetadata()`, JSON-LD structured data (Organization, WebSite, TouristTrip schemas), OpenGraph images via `opengraph-image.tsx` files, dynamic sitemap, security headers in `next.config.ts`.

**Security:** Security headers configured in `next.config.ts` (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

---

*Architecture analysis: 2026-03-06*
