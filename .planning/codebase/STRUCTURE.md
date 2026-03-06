# Codebase Structure

**Analysis Date:** 2026-03-06

## Directory Layout

```
red-sea-norte/
├── src/
│   ├── app/                        # Next.js App Router pages and API routes
│   │   ├── layout.tsx              # Root layout (fonts, Header, Footer, WhatsApp, MobileCTA)
│   │   ├── page.tsx                # Homepage
│   │   ├── loading.tsx             # Global loading state
│   │   ├── error.tsx               # Global error boundary (client component)
│   │   ├── not-found.tsx           # 404 page
│   │   ├── sitemap.ts             # Dynamic sitemap generator
│   │   ├── robots.ts              # Robots.txt configuration
│   │   ├── globals.css            # Global styles (Tailwind directives, CSS variables)
│   │   ├── api/
│   │   │   ├── preview/route.ts   # Wagtail CMS preview endpoint
│   │   │   └── disable-draft/route.ts  # Exit draft/preview mode
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog listing
│   │   │   ├── blog-listing-client.tsx  # Client-side blog listing component
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Blog post detail
│   │   │       └── opengraph-image.tsx  # OG image generation
│   │   ├── rutas/
│   │   │   ├── page.tsx           # Routes listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Route detail (large file, contains inline sub-components)
│   │   │       └── opengraph-image.tsx
│   │   ├── experiencias/
│   │   │   ├── page.tsx           # Experiences listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Experience detail
│   │   │       ├── CTAButton.tsx  # Client CTA component
│   │   │       └── opengraph-image.tsx
│   │   ├── ofertas/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Offer detail
│   │   │       └── opengraph-image.tsx
│   │   ├── cursos/
│   │   │   ├── page.tsx           # Courses listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Course detail
│   │   │       └── opengraph-image.tsx
│   │   └── test-components/       # Component testing page
│   ├── components/
│   │   ├── atoms/                  # Smallest reusable units
│   │   │   ├── Logo.tsx
│   │   │   └── FloatingWhatsApp.tsx
│   │   ├── molecules/              # Composed atoms
│   │   │   └── InfoCard.tsx
│   │   ├── organisms/              # Complex section-level components
│   │   │   ├── Header.tsx         # Main navigation (client component)
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx    # Homepage hero (client component)
│   │   │   ├── HeroOffer.tsx
│   │   │   ├── RouteValueSection.tsx
│   │   │   ├── DiveSitesSection.tsx
│   │   │   ├── JourneyOverviewSection.tsx
│   │   │   ├── AudienceFitSection.tsx
│   │   │   ├── RouteTeaserSection.tsx
│   │   │   ├── WhySection.tsx
│   │   │   ├── SpecSection.tsx
│   │   │   ├── ProgramSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── Guarantee.tsx
│   │   │   ├── GuaranteeBar.tsx
│   │   │   ├── InlineLeadSection.tsx
│   │   │   ├── LeadFormModal.tsx   # Modal lead form (client component)
│   │   │   ├── MobileCTABar.tsx    # Fixed mobile CTA bar
│   │   │   ├── FinalDiagonal.tsx
│   │   │   ├── CountdownAsym.tsx
│   │   │   ├── IncludesAsym.tsx
│   │   │   └── ProofAsym.tsx
│   │   └── ui/                     # Shadcn-style primitives
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       └── carousel.tsx
│   ├── hooks/
│   │   └── useInView.ts           # Intersection Observer hook
│   ├── lib/
│   │   ├── utils.ts               # General utilities
│   │   ├── constants/
│   │   │   ├── images.ts          # Image URL constants
│   │   │   ├── colors.ts          # Color constants
│   │   │   └── typography.ts      # Typography constants
│   │   ├── data/                   # Data orchestration layer
│   │   │   ├── index.ts           # Barrel export for all data functions
│   │   │   ├── config.ts          # Fallback mode configuration
│   │   │   ├── homepage.ts        # Homepage data with caching
│   │   │   ├── blog.ts            # Blog data with caching
│   │   │   ├── rutas.ts           # Rutas data with caching
│   │   │   ├── experiencias.ts    # Experiencias data with caching
│   │   │   ├── ofertas.ts         # Ofertas data with caching
│   │   │   └── cursos.ts          # Cursos data with caching
│   │   ├── mock-data/              # Static fallback data
│   │   │   ├── types.ts           # Shared TypeScript types for all content
│   │   │   ├── homepage.ts
│   │   │   ├── blog-posts.ts
│   │   │   ├── rutas.ts
│   │   │   ├── experiencias.ts
│   │   │   ├── ofertas.ts
│   │   │   └── cursos.ts
│   │   ├── wagtail/                # Wagtail CMS integration
│   │   │   ├── index.ts           # Barrel export
│   │   │   ├── client.ts          # Axios-based API client
│   │   │   ├── fetchers.ts        # Content-type-specific fetch functions
│   │   │   ├── mappers.ts         # Wagtail-to-app type mappers
│   │   │   └── types.ts           # Wagtail API response types
│   │   ├── stores/
│   │   │   └── useModalStore.ts   # Zustand modal store
│   │   └── utils/
│   │       └── cn.ts              # Tailwind class merge utility
│   └── stores/
│       └── useModalStore.ts       # Re-export of lib/stores/useModalStore
├── public/                         # Static assets
├── scripts/
│   └── odoo_mcp_stdio_proxy.py    # Odoo MCP proxy script
├── docs/
│   └── odoo/                       # Odoo integration documentation
├── .planning/
│   └── codebase/                   # Architecture documentation (this file)
├── next.config.ts                  # Next.js config (standalone output, security headers, image domains)
├── tsconfig.json                   # TypeScript config (strict, path alias @/*)
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs             # PostCSS config for Tailwind
├── eslint.config.mjs              # ESLint config
├── Dockerfile                      # Production Docker image
├── docker-compose.yml             # Docker Compose for deployment
├── .env.example                   # Environment variable template
└── design.pen                     # Design file (Penpot)
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router -- pages, layouts, API routes, SEO files
- Contains: Server components (default), client components (marked with `"use client"`), route handlers
- Key files: `layout.tsx` (root layout with global elements), `page.tsx` (homepage), `sitemap.ts`, `robots.ts`
- Pattern: Each content type has `[type]/page.tsx` (listing) and `[type]/[slug]/page.tsx` (detail) plus `opengraph-image.tsx`

**`src/components/`:**
- Purpose: Reusable UI components organized by Atomic Design
- Contains: `atoms/` (Logo, FloatingWhatsApp), `molecules/` (InfoCard), `organisms/` (Header, Footer, sections), `ui/` (button, badge, carousel)
- Key files: `organisms/Header.tsx`, `organisms/HeroSection.tsx`, `organisms/LeadFormModal.tsx`, `organisms/Footer.tsx`

**`src/lib/data/`:**
- Purpose: Data orchestration -- caching, draft mode handling, fallback to mock data
- Contains: One module per content type, each exporting `getAll*Data()`, `get*Data(slug)`, `getAll*SlugsData()`
- Key files: `config.ts` (fallback strategy), `index.ts` (barrel export)

**`src/lib/wagtail/`:**
- Purpose: Wagtail CMS API integration
- Contains: HTTP client, typed fetchers, response-to-app-type mappers, CMS type definitions
- Key files: `client.ts` (Axios instance), `mappers.ts` (transforms CMS data), `types.ts` (Wagtail response shapes)

**`src/lib/mock-data/`:**
- Purpose: Static content used as fallback when CMS is unavailable and as the canonical TypeScript type definitions
- Contains: Hardcoded content data, `types.ts` with all shared app types
- Key files: `types.ts` -- this is the source of truth for all content type interfaces

**`src/lib/constants/`:**
- Purpose: Shared constants for images, colors, typography
- Contains: `images.ts`, `colors.ts`, `typography.ts`

**`src/hooks/`:**
- Purpose: Custom React hooks
- Contains: `useInView.ts` (Intersection Observer)

**`src/lib/stores/` and `src/stores/`:**
- Purpose: Zustand state stores
- Contains: `useModalStore.ts`
- Note: Duplicated -- `src/stores/` re-exports from `src/lib/stores/`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout -- fonts, global components (Header, Footer, WhatsApp, MobileCTA)
- `src/app/page.tsx`: Homepage -- fetches data, renders section organisms, JSON-LD

**Configuration:**
- `next.config.ts`: Standalone output, security headers, allowed image domains
- `tsconfig.json`: Strict mode, `@/*` path alias to `./src/*`
- `postcss.config.mjs`: Tailwind CSS PostCSS plugin
- `eslint.config.mjs`: ESLint with Next.js config
- `.env.example`: Required environment variables template

**Core Logic:**
- `src/lib/data/index.ts`: Barrel export for all data functions -- import from here
- `src/lib/data/config.ts`: Fallback mode logic (`shouldUseFallback()`)
- `src/lib/wagtail/client.ts`: Axios client for Wagtail API v2
- `src/lib/wagtail/mappers.ts`: CMS data transformation (largest logic file)
- `src/lib/mock-data/types.ts`: All shared TypeScript interfaces

**Testing:**
- No test files detected in the codebase

## Naming Conventions

**Files:**
- Components: PascalCase (`HeroSection.tsx`, `LeadFormModal.tsx`, `FloatingWhatsApp.tsx`)
- Hooks: camelCase with `use` prefix (`useInView.ts`, `useModalStore.ts`)
- Utilities/data: camelCase (`homepage.ts`, `config.ts`, `cn.ts`)
- Page routes: lowercase (`page.tsx`, `route.ts`, `sitemap.ts`)

**Directories:**
- Lowercase for all directories (`atoms`, `molecules`, `organisms`, `ui`, `data`, `wagtail`, `mock-data`)
- Content type directories match URL slugs in Spanish (`rutas`, `cursos`, `experiencias`, `ofertas`, `blog`)

**Components:**
- Named exports, not default exports: `export function Header() {}`, `export function HeroSection() {}`
- Exception: Page components use `export default function`

**Data Functions:**
- Pattern: `getAll[ContentType]Data()` for listings, `get[ContentType]Data(slug)` for detail, `getAll[ContentType]SlugsData()` for `generateStaticParams`
- Examples: `getAllRutasData()`, `getRutaData(slug)`, `getAllRutasSlugsData()`

## Where to Add New Code

**New Content Type (e.g., "destinos"):**
1. Types: Add interface to `src/lib/mock-data/types.ts`
2. Mock data: Create `src/lib/mock-data/destinos.ts`
3. Wagtail types: Add Wagtail interface to `src/lib/wagtail/types.ts`
4. Wagtail mapper: Add mapper function to `src/lib/wagtail/mappers.ts`
5. Wagtail fetcher: Add fetcher functions to `src/lib/wagtail/fetchers.ts`
6. Wagtail index: Export new functions from `src/lib/wagtail/index.ts`
7. Data layer: Create `src/lib/data/destinos.ts` following existing pattern (caching, fallback, draft mode)
8. Data index: Export from `src/lib/data/index.ts`
9. Listing page: Create `src/app/destinos/page.tsx`
10. Detail page: Create `src/app/destinos/[slug]/page.tsx` with `generateStaticParams`, `generateMetadata`
11. OG image: Create `src/app/destinos/[slug]/opengraph-image.tsx`
12. Sitemap: Add to `src/app/sitemap.ts`
13. Navigation: Add link to `navLinks` array in `src/components/organisms/Header.tsx`

**New Organism Component:**
- Create in `src/components/organisms/[ComponentName].tsx`
- Use PascalCase filename matching component name
- Use named export: `export function ComponentName() {}`
- Accept data as props (no direct data fetching in components)
- Mark as `"use client"` only if using hooks, event handlers, or browser APIs

**New Atom/Molecule:**
- Atoms: `src/components/atoms/[ComponentName].tsx` (simple, presentational)
- Molecules: `src/components/molecules/[ComponentName].tsx` (composed atoms)

**New UI Primitive:**
- Place in `src/components/ui/[component-name].tsx` (lowercase, shadcn convention)
- Use `class-variance-authority` for variants
- Use `cn()` utility from `src/lib/utils/cn.ts` for class merging

**New Custom Hook:**
- Place in `src/hooks/use[HookName].ts`
- Use camelCase with `use` prefix

**New Zustand Store:**
- Place in `src/lib/stores/use[StoreName].ts`
- Follow pattern from `useModalStore.ts`: interface + `create<T>()`

**New API Route:**
- Place in `src/app/api/[route-name]/route.ts`
- Export named HTTP method handlers: `GET`, `POST`, etc.

**New Utility Function:**
- Shared: `src/lib/utils/[name].ts`
- General: `src/lib/utils.ts`
- Content-specific: Within the relevant data or wagtail module

## Special Directories

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes
- Committed: No (gitignored)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes
- Committed: No (gitignored)

**`.planning/codebase/`:**
- Purpose: Architecture documentation for AI-assisted development
- Generated: By codebase mapping tools
- Committed: Yes

**`scripts/`:**
- Purpose: Utility scripts (Odoo MCP proxy)
- Generated: No
- Committed: Not yet (untracked)

**`docs/`:**
- Purpose: Integration documentation (Odoo)
- Generated: No
- Committed: Yes

**`public/`:**
- Purpose: Static assets served at root
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-03-06*
