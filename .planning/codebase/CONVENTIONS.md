# Coding Conventions

**Analysis Date:** 2026-03-06

## Naming Patterns

**Files:**
- React components: PascalCase (`HeroSection.tsx`, `LeadFormModal.tsx`, `FloatingWhatsApp.tsx`)
- Utilities/helpers: camelCase (`cn.ts`, `utils.ts`)
- Data modules: camelCase matching domain (`homepage.ts`, `rutas.ts`, `blog.ts`)
- Hooks: camelCase with `use` prefix (`useInView.ts`, `useModalStore.ts`)
- Types files: camelCase (`types.ts`)
- Page files: `page.tsx` (Next.js App Router convention)
- API routes: `route.ts` (Next.js App Router convention)

**Functions:**
- React components: PascalCase (`HeroSection`, `LeadFormModal`)
- Data fetchers: camelCase with `get` prefix (`getHomePageData`, `getAllBlogPosts`, `getRuta`)
- Mapper functions: camelCase with `map` prefix (`mapHomePage`, `mapBlogPost`, `mapRutaPage`)
- Helper/utility functions: camelCase (`getNonEmptyString`, `getImageUrl`, `extractStreamFieldValues`)
- Zustand stores: `use` prefix + PascalCase + `Store` suffix (`useModalStore`)

**Variables:**
- Constants: UPPER_SNAKE_CASE for config objects (`FALLBACK_CONFIG`, `BASE_URL`)
- CSS variables: kebab-case with prefix (`--color-ocean-deep`, `--font-display`, `--spacing-section-y`)
- Interface properties from Wagtail API: snake_case (`hero_background_image`, `dive_sites_title`)
- Interface properties for frontend types: camelCase (`backgroundImage`, `diveSitesTitle`)

**Types:**
- Interfaces: PascalCase with descriptive suffixes (`HeroSectionProps`, `LeadFormModalProps`)
- Wagtail API types: `Wagtail` prefix + PascalCase (`WagtailHomePage`, `WagtailBlogPostPage`, `WagtailRutaPage`)
- Frontend data types: PascalCase + `Data` suffix (`HomepageData`, `RutaData`, `ExperienciaData`, `CursoData`)
- Union types: PascalCase (`ExperienciaSection`, `ExperienciaSectionType`)

## Code Style

**Formatting:**
- No Prettier config detected -- relies on ESLint and editor defaults
- Semicolons: omitted in most files (no-semicolons style)
- Quotes: double quotes for imports, mixed in JSX
- Indentation: 2 spaces
- Trailing commas: used in multiline objects and arrays

**Linting:**
- ESLint v9 with flat config (`eslint.config.mjs`)
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No custom rules added beyond Next.js defaults
- Config file: `eslint.config.mjs`

## Import Organization

**Order:**
1. React/Next.js framework imports (`react`, `next/image`, `next/link`, `next/navigation`)
2. Third-party libraries (`framer-motion`, `lucide-react`, `zustand`, `axios`)
3. Internal components via path alias (`@/components/...`)
4. Internal lib/utils via path alias (`@/lib/...`, `@/stores/...`, `@/hooks/...`)
5. Types (often inline with their source import using `type` keyword)

**Path Aliases:**
- `@/*` maps to `./src/*` (defined in `tsconfig.json`)
- Use `@/components/...` for component imports
- Use `@/lib/...` for utilities, data fetchers, stores, constants
- Use `@/stores/...` for Zustand stores (re-exported from `@/lib/stores/`)
- Use `@/hooks/...` for custom hooks

**Import style:**
- Named imports preferred: `import { HeroSection } from "@/components/organisms/HeroSection"`
- Type imports use `import type`: `import type { Metadata } from "next"`
- Barrel exports via `index.ts` for data modules: `src/lib/data/index.ts`

## Component Architecture

**Atomic Design Pattern (atoms/molecules/organisms):**
- `src/components/atoms/`: Small, reusable elements (`FloatingWhatsApp.tsx`, `Logo.tsx`)
- `src/components/molecules/`: Composed elements (`InfoCard.tsx`)
- `src/components/organisms/`: Full sections (`HeroSection.tsx`, `Header.tsx`, `Footer.tsx`)
- `src/components/ui/`: shadcn/ui-style variant components (`button.tsx`, `badge.tsx`, `carousel.tsx`)

**Component Patterns:**
- Use named exports for components: `export function HeroSection(...) {}`
- Use `forwardRef` for UI primitives: `const Button = React.forwardRef<...>(...)`
- Client components marked with `"use client"` directive at top of file
- Server components are the default (no directive needed)
- Props defined as inline interfaces above the component function

**Component Props Pattern:**
```typescript
interface HeroSectionProps {
  backgroundImage: string
  badge?: { text: string; backgroundColor: string }
  title: string
  subtitle: string
}

export function HeroSection({ backgroundImage, badge, title, subtitle }: HeroSectionProps) {
  // ...
}
```

**UI Components (shadcn/ui pattern):**
- Use `class-variance-authority` (CVA) for variant definitions
- Use `cn()` utility from `@/lib/utils/cn` for class merging
- Variants defined with `cva()` and exported alongside component

```typescript
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "primary", size: "default" },
})
```

## Data Layer Pattern

**Wagtail CMS Integration with Mock Fallback:**
- Data flows: Wagtail API -> `client.ts` -> `fetchers.ts` (mappers applied) -> `data/*.ts` (caching + fallback) -> page components
- Each content type follows this chain: API client -> fetcher -> mapper -> data layer -> page
- Fallback to mock data when Wagtail API is unavailable (configurable via `FALLBACK_MODE` env var)
- Draft mode support via Next.js `draftMode()` API

**Data Module Pattern (in `src/lib/data/`):**
```typescript
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getXxx } from '@/lib/wagtail/fetchers'
import { xxxData as mockData } from '@/lib/mock-data/xxx'
import { shouldUseFallback, logDataError } from './config'

async function fetchXxxInternal() {
  try {
    const data = await getXxx()
    if (!data) throw new Error('No data received')
    return data
  } catch (error) {
    logDataError(error, 'fetchXxx')
    if (shouldUseFallback(error, 'xxx')) {
      return mockData
    }
    throw error
  }
}

export async function getXxxData() {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchXxxInternal()
  const getCached = unstable_cache(fetchXxxInternal, ['xxx'], { tags: ['xxx'], revalidate: 600 })
  return getCached()
}
```

## State Management

**Zustand for Client State:**
- Store location: `src/lib/stores/useModalStore.ts`
- Re-exported from `src/stores/useModalStore.ts` for convenience
- Simple interface pattern with typed store

```typescript
import { create } from 'zustand'

interface ModalStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
```

## Error Handling

**Patterns:**
- API errors: try/catch with `console.error` logging, return `null` or `[]` as fallback
- Axios errors: differentiate with `axios.isAxiosError()` for structured error logging
- 404 handling: return `null` from fetchers, call `notFound()` in page components
- Error boundary: `src/app/error.tsx` with retry button and home link
- Not found page: `src/app/not-found.tsx` with themed 404 page

**Error handling in data fetchers:**
```typescript
try {
  const data = await apiCall()
  return data
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('Context:', { status: error.response?.status, message: error.message })
  } else {
    console.error('Context:', error)
  }
  return null // or [] for list endpoints
}
```

**Page-level error handling:**
```typescript
const data = await getData(slug)
if (!data) {
  notFound()
}
```

## Logging

**Framework:** `console` (no external logging service)

**Patterns:**
- Development-only request/response logging via axios interceptors in `src/lib/wagtail/client.ts`
- `console.error` for errors with structured context objects
- `console.warn` for fallback usage: `console.warn('[Data Layer] Using mock data fallback for homepage')`
- Prefixed log messages: `[Wagtail API]`, `[Data Layer Error]`, `[Data Layer]`
- TODO comment in `src/app/error.tsx` to add Sentry integration

## Comments

**When to Comment:**
- JSDoc-style `/** */` comments on exported API client functions
- Section separators using `// ============` lines in type files and mappers
- Inline comments in Spanish for domain-specific context
- `// TODO:` for pending work

**Section Separator Pattern (used in types and mappers):**
```typescript
// ============================================================================
// HomePage (home.HomePage)
// ============================================================================
```

## Styling

**Approach:** Tailwind CSS v4 with CSS variables defined in `src/app/globals.css`

**Patterns:**
- CSS variables for design tokens (colors, fonts, spacing, radii, shadows) in `@theme inline` block
- Inline `style` attributes for values not in Tailwind (font-family, text-shadow, complex gradients)
- Custom utility classes defined in `globals.css`: `.container-custom`, `.section-padding`, `.bg-gradient-ocean`
- Custom animations: `fadeInUp`, `scaleIn`, `float`, `shimmer` with stagger delay classes
- Responsive: Tailwind breakpoints (`max-md:`, `max-lg:`) mixed with CSS media queries in `globals.css`
- Color values: hardcoded hex in JSX when not using CSS variables (e.g., `#FF5722`, `#0D3A5D`)

**Typography System:**
- Display font: Clash Display (loaded via Fontshare CDN)
- Body font: Satoshi (loaded via Fontshare CDN)
- Monospace: JetBrains Mono (loaded via `next/font/google`)
- CSS variables: `--font-display`, `--font-sans`, `--font-mono`

## SEO Patterns

**Every page should include:**
- `export const metadata: Metadata` for static SEO or `generateMetadata()` for dynamic
- OpenGraph and Twitter card meta
- Canonical URL via `alternates.canonical`
- JSON-LD structured data via `<script type="application/ld+json">`
- `export const revalidate = N` for ISR timing

**Static params for dynamic routes:**
```typescript
export async function generateStaticParams() {
  const slugs = await getAllXxxSlugs()
  return slugs.map((slug) => ({ slug }))
}
```

## Module Design

**Exports:**
- Named exports preferred everywhere (no default exports except Next.js pages)
- Barrel files (`index.ts`) for data layer re-exports
- Components export both the component and related types

**Barrel Files:**
- `src/lib/data/index.ts`: re-exports all data fetcher functions
- `src/lib/wagtail/index.ts`: re-exports wagtail client and types
- `src/stores/useModalStore.ts`: re-exports from `@/lib/stores/useModalStore`

---

*Convention analysis: 2026-03-06*
