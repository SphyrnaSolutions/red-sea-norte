# External Integrations

**Analysis Date:** 2026-03-06

## APIs & External Services

**Wagtail CMS (Primary Integration):**
- Purpose: Headless CMS providing all page content (homepage, blog, rutas, experiencias, ofertas, cursos)
- API: Wagtail API v2 (REST)
- Base URL: Configured via `NEXT_PUBLIC_WAGTAIL_URL` (production: `https://back.redsea.sphyrnasolutions.com`)
- API endpoint pattern: `{WAGTAIL_URL}/api/v2/pages/`
- SDK/Client: Custom axios-based client at `src/lib/wagtail/client.ts`
- Auth: None (public API, no authentication required)
- Timeout: 10 seconds
- Multi-site: Uses `site` parameter with `NEXT_PUBLIC_SITE_HOSTNAME` for multi-site filtering

**Wagtail API Endpoints Used:**
- `GET /api/v2/pages/` - List/filter pages by type and slug
- `GET /api/v2/pages/{id}/` - Fetch single page by ID
- `GET /api/v2/images/{id}/` - Fetch image metadata
- `GET /api/v2/page_preview/` - Draft mode preview content

**Wagtail Content Types:**
- `home.HomePage` - Homepage content
- `blog.BlogPostPage` - Blog posts
- `rutas.RutaPage` - Diving routes
- `experiencias.ExperienciaPage` - Diving experiences
- `ofertas.OfertaPage` - Special offers
- `cursos.CursoPage` - Diving courses

**Odoo (via MCP Proxy - Development Tool):**
- Purpose: MCP bridge for Odoo integration (development/tooling only)
- Script: `scripts/odoo_mcp_stdio_proxy.py`
- Config vars: `ODOO_MCP_URL`, `ODOO_MCP_API_KEY`, `ODOO_MCP_TIMEOUT`
- Note: This is a development-time MCP (Model Context Protocol) proxy, not a runtime integration

## Data Storage

**Databases:**
- None on the frontend side
- All content stored in Wagtail CMS backend (external)
- No local database, ORM, or data persistence

**File Storage:**
- Images served from Wagtail backend (`back.redsea.sphyrnasolutions.com`)
- Placeholder images from `images.unsplash.com` and `i.pravatar.cc`
- Static assets in `public/` directory

**Caching:**
- Next.js `unstable_cache()` used in data layer (`src/lib/data/*.ts`)
- ISR (Incremental Static Regeneration) via `revalidate` exports on pages
- No external cache service (Redis, Memcached, etc.)

## Data Layer Architecture

**Fallback System:**
- Config: `src/lib/data/config.ts`
- Mode controlled by `FALLBACK_MODE` env var
- Modes: `full` (all content falls back to mock), `critical` (only homepage/blog), `emergency` (always mock), `none` (no fallback)
- Mock data: `src/lib/mock-data/*.ts` provides complete offline dataset
- Pattern: Each data fetcher in `src/lib/data/*.ts` tries Wagtail first, falls back to mock data on error

**Data Flow:**
1. Page component calls data function from `src/lib/data/{entity}.ts`
2. Data function wraps call in `unstable_cache()` for ISR
3. Fetcher in `src/lib/wagtail/fetchers.ts` calls Wagtail API via axios client
4. Mapper in `src/lib/wagtail/mappers.ts` transforms Wagtail response to app types
5. On error, `shouldUseFallback()` decides whether to serve mock data from `src/lib/mock-data/`

## Authentication & Identity

**Auth Provider:**
- None - This is a public-facing marketing website
- No user authentication system
- No session management

**Draft Mode (CMS Preview):**
- Implementation: Next.js Draft Mode via `draftMode()` API
- Preview endpoint: `src/app/api/preview/route.ts`
- Disable endpoint: `src/app/api/disable-draft/route.ts`
- Flow: Wagtail sends preview request with `token` and `content_type` params, Next.js enables draft mode and redirects to the content page

## Monitoring & Observability

**Error Tracking:**
- None (no Sentry, Datadog, or similar service)

**Logs:**
- `console.log` / `console.error` throughout
- Axios request/response interceptors log in development mode (`src/lib/wagtail/client.ts`)
- Data layer errors logged via `logDataError()` helper (`src/lib/data/config.ts`)

## CI/CD & Deployment

**Hosting:**
- Dokploy (self-hosted PaaS)
- Docker container on `dokploy-network`

**CI Pipeline:**
- Not detected (no `.github/workflows/`, no `.gitlab-ci.yml`, no CI config files)

**Deployment:**
- `docker-compose.yml` defines the `frontend` service
- Multi-stage Docker build: deps -> builder -> runner
- Build args injected: `NEXT_PUBLIC_WAGTAIL_URL`, `NEXT_PUBLIC_SITE_HOSTNAME`
- Container name: `frontend-redsea`
- Restart policy: `unless-stopped`
- Health check: HTTP request to `localhost:3000` every 30s

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_WAGTAIL_URL` - Wagtail backend URL (default: `https://back.redsea.sphyrnasolutions.com`)
- `NEXT_PUBLIC_SITE_URL` - Public site URL (default: `https://buceoenelmarrojo.com`)
- `NEXT_PUBLIC_SITE_HOSTNAME` - Site hostname for multi-site Wagtail (default: `buceoenelmarrojo.com`)

**Optional env vars:**
- `NEXT_PUBLIC_WAGTAIL_API_URL` - Override API URL (defaults to `{WAGTAIL_URL}/api/v2` if not set, falls back to `http://localhost:8000/api/v2`)
- `FALLBACK_MODE` - Mock data fallback behavior (`full`/`critical`/`emergency`/`none`, default: `full`)

**Secrets location:**
- `.env.local` (local development, gitignored)
- Docker Compose environment variables for production
- No secrets required (public CMS API, no auth tokens)

## Webhooks & Callbacks

**Incoming:**
- `GET /api/preview` - Wagtail CMS preview webhook (`src/app/api/preview/route.ts`)
  - Params: `token`, `content_type`
  - Enables Next.js draft mode and redirects to content page
- `GET /api/disable-draft` - Disables draft mode (`src/app/api/disable-draft/route.ts`)

**Outgoing:**
- None

## SEO & Metadata

**Sitemap:**
- Dynamic sitemap at `src/app/sitemap.ts`
- Fetches all slugs from Wagtail API for: blog, ofertas, rutas, cursos, experiencias
- Base URL from `NEXT_PUBLIC_SITE_URL`

**Robots:**
- `src/app/robots.ts`
- Allows all paths except `/api/` and `/_next/`
- References sitemap URL

## External Image Sources

**Configured in `next.config.ts`:**
- `images.unsplash.com` - Stock/placeholder images
- `i.pravatar.cc` - Avatar placeholders
- `back.redsea.sphyrnasolutions.com` - Wagtail CMS media files

---

*Integration audit: 2026-03-06*
