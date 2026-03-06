# Testing Patterns

**Analysis Date:** 2026-03-06

## Test Framework

**Runner:**
- No test framework is installed or configured
- No test runner detected (no Jest, Vitest, Playwright, or Cypress)
- No test scripts in `package.json` (only `dev`, `build`, `start`, `lint`)

**Assertion Library:**
- Not applicable (no tests exist)

**Run Commands:**
```bash
npm run lint              # Only available quality check (ESLint)
npm run build             # Type-checking via TypeScript compilation
```

## Test File Organization

**Location:**
- No test files exist in the `src/` directory
- No `__tests__/` directories
- No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` files

**Current State:**
- Zero test coverage
- No test infrastructure whatsoever

## Recommended Test Setup

Based on the codebase (Next.js 16 + React 19 + TypeScript), the recommended setup is:

**Unit/Integration Tests:**
- **Vitest** (fast, native ESM, TypeScript support, compatible with Next.js)
- **React Testing Library** for component tests
- Config file: create `vitest.config.ts` at project root

**E2E Tests:**
- **Playwright** (recommended by Next.js for App Router)
- Config file: create `playwright.config.ts` at project root

**Recommended `package.json` additions:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test"
  },
  "devDependencies": {
    "vitest": "^3.x",
    "@vitejs/plugin-react": "^4.x",
    "@testing-library/react": "^16.x",
    "@testing-library/jest-dom": "^6.x",
    "@playwright/test": "^1.x",
    "@vitest/coverage-v8": "^3.x"
  }
}
```

## What Should Be Tested

### Priority 1: Data Layer (Critical)

**Wagtail API Client (`src/lib/wagtail/client.ts`):**
- `getPages()` - success, error, empty results
- `getPageBySlug()` - found, not found (404), error
- `getPage()` - found, not found, error
- `getImage()` - success, error
- `searchPages()` - with/without type filter
- `getPreviewPage()` - success, error

**Mapper Functions (`src/lib/wagtail/mappers.ts`):**
- `mapHomePage()` - full data, partial data, missing fields
- `mapBlogPost()` - with/without author, category
- `mapRutaPage()` - with/without hero StreamField
- `mapExperienciaPage()` - all section types (year, split_immersive, depth, image_grid, etc.)
- `mapOfertaPage()` - price calculations, testimonials
- `mapCursoPage()` - modules, requirements
- Helper functions: `getImageUrl()`, `getNonEmptyString()`, `normalizeBadge()`

**Data Layer with Fallback (`src/lib/data/*.ts`):**
- `getHomePageData()` - API success, API failure with fallback, draft mode bypass
- `getRutaData()` - cached vs draft mode
- `shouldUseFallback()` - all fallback modes (full, critical, emergency, none)

**Example test structure for mappers:**
```typescript
import { describe, it, expect } from 'vitest'
import { mapBlogPost } from '@/lib/wagtail/mappers'
import type { WagtailBlogPostPage } from '@/lib/wagtail/types'

describe('mapBlogPost', () => {
  it('maps a complete blog post from Wagtail format', () => {
    const wagtailPage: WagtailBlogPostPage = {
      id: 1,
      title: 'Test Post',
      meta: { type: 'blog.BlogPostPage', slug: 'test-post', /* ... */ },
      excerpt: 'Test excerpt',
      // ...
    }

    const result = mapBlogPost(wagtailPage)

    expect(result.slug).toBe('test-post')
    expect(result.title).toBe('Test Post')
    expect(result.excerpt).toBe('Test excerpt')
  })

  it('provides defaults for missing optional fields', () => {
    // ...
  })
})
```

### Priority 2: Utility Functions

**`src/lib/utils/cn.ts`:**
- Class merging with conflicts
- Empty inputs

**`src/lib/data/config.ts`:**
- `shouldUseFallback()` for each mode
- `logDataError()` logging behavior

### Priority 3: Component Tests

**Client Components (require mocking):**
- `src/components/organisms/HeroSection.tsx` - CTA click handlers (scroll, modal, link)
- `src/components/organisms/LeadFormModal.tsx` - form submission, validation, success state
- `src/components/organisms/Header.tsx` - scroll behavior, mobile menu toggle
- `src/components/organisms/MobileCTABar.tsx` - visibility logic

**Server Components (render tests):**
- `src/app/page.tsx` - renders with homepage data
- `src/app/rutas/[slug]/page.tsx` - renders sections, handles notFound
- `src/app/error.tsx` - renders error UI, reset callback
- `src/app/not-found.tsx` - renders 404 UI

### Priority 4: API Routes

**`src/app/api/preview/route.ts`:**
- Missing token/content_type returns 400
- Valid preview request enables draft mode and redirects
- Unknown content type returns 400
- Wagtail API failure returns 500

**`src/app/api/disable-draft/route.ts`:**
- Disables draft mode and redirects

## Mocking

**Framework:** Not yet configured. Use Vitest's built-in mocking (`vi.mock`, `vi.fn`).

**What to Mock:**
- Axios client for Wagtail API calls (`src/lib/wagtail/client.ts`)
- `next/cache` (`unstable_cache`)
- `next/headers` (`draftMode`)
- `next/navigation` (`notFound`, `redirect`)
- Zustand stores for component tests
- `window.scrollY`, `IntersectionObserver` for client components

**What NOT to Mock:**
- Mapper functions (pure data transformations - test with real data)
- `cn()` utility (simple, no side effects)
- Type definitions
- CSS/styling

**Example mocking pattern for Wagtail client:**
```typescript
import { vi, describe, it, expect } from 'vitest'

vi.mock('@/lib/wagtail/client', () => ({
  getPages: vi.fn(),
  getPageBySlug: vi.fn(),
}))

import { getPages } from '@/lib/wagtail/client'
import { getAllBlogPosts } from '@/lib/wagtail/fetchers'

describe('getAllBlogPosts', () => {
  it('returns mapped and sorted blog posts', async () => {
    vi.mocked(getPages).mockResolvedValue([/* mock wagtail pages */])
    const posts = await getAllBlogPosts()
    expect(posts).toHaveLength(2)
    // verify sorted by date descending
  })

  it('returns empty array on API error', async () => {
    vi.mocked(getPages).mockRejectedValue(new Error('Network error'))
    const posts = await getAllBlogPosts()
    expect(posts).toEqual([])
  })
})
```

## Fixtures and Factories

**Test Data:**
- Mock data already exists in `src/lib/mock-data/` and can serve as test fixtures
- Key fixture files:
  - `src/lib/mock-data/homepage.ts` - full homepage mock data
  - `src/lib/mock-data/blog-posts.ts` - blog post fixtures
  - `src/lib/mock-data/rutas.ts` - route fixtures
  - `src/lib/mock-data/experiencias.ts` - experience fixtures
  - `src/lib/mock-data/ofertas.ts` - offer fixtures
  - `src/lib/mock-data/cursos.ts` - course fixtures
  - `src/lib/mock-data/types.ts` - all TypeScript types (shared between mock and real data)

**Location for test fixtures:**
- Create `src/__tests__/fixtures/` for Wagtail API response mocks
- Reuse `src/lib/mock-data/` for expected output shapes

## Coverage

**Requirements:** None enforced (no test infrastructure exists)

**Target:** Aim for 80%+ on data layer (`src/lib/wagtail/`, `src/lib/data/`)

## Test Types

**Unit Tests:**
- Mapper functions (pure transformations, highest value)
- Utility functions (`cn`, `shouldUseFallback`)
- Zustand store logic

**Integration Tests:**
- Data layer functions (fetcher + mapper + fallback chain)
- API route handlers (preview, disable-draft)
- Page components with mocked data layer

**E2E Tests:**
- Homepage loads and renders all sections
- Navigation between pages
- Lead form submission flow (modal open -> fill -> submit -> success)
- Mobile responsive navigation
- 404 page for invalid routes

## Current Quality Gaps

1. **No tests at all** - the entire codebase has zero automated tests
2. **No CI pipeline** - no test runs on commits or PRs
3. **Type safety is the only guard** - TypeScript strict mode provides some safety
4. **ESLint is the only code quality tool** - `npm run lint` is the only automated check
5. **Mock data doubles as fallback** - good for runtime resilience but no test verification that mappers produce correct output

---

*Testing analysis: 2026-03-06*
