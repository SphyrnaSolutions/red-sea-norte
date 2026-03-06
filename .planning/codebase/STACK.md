# Technology Stack

**Analysis Date:** 2026-03-06

## Languages

**Primary:**
- TypeScript 5.x - All application code (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- CSS (Tailwind v4) - Styling via `src/app/globals.css` and utility classes
- Python 3 - MCP proxy script only (`scripts/odoo_mcp_stdio_proxy.py`)

## Runtime

**Environment:**
- Node.js 22 (Docker base image: `node:22-alpine`)
- Local development: Node.js v24.13.0

**Package Manager:**
- npm 11.6.2
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.1.5 - Full-stack React framework (App Router)
- React 19.2.3 - UI library
- React DOM 19.2.3 - DOM rendering

**Styling:**
- Tailwind CSS v4 - Utility-first CSS via `@tailwindcss/postcss` plugin
- PostCSS - Build pipeline (`postcss.config.mjs`)

**State Management:**
- Zustand 5.0.10 - Client-side state (modal store)

**Animation:**
- Framer Motion 12.29.2 - React animation library

**Build/Dev:**
- TypeScript 5.x - Type checking (`tsconfig.json`)
- ESLint 9.x - Linting with `eslint-config-next` (core-web-vitals + typescript presets)

## Key Dependencies

**Critical:**
- `next` 16.1.5 - Application framework, routing, SSR/SSG, image optimization
- `react` 19.2.3 - Component model
- `axios` 1.13.4 - HTTP client for Wagtail API communication (`src/lib/wagtail/client.ts`)
- `zustand` 5.0.10 - Global state for modals (`src/lib/stores/useModalStore.ts`, `src/stores/useModalStore.ts`)

**UI Components:**
- `lucide-react` 0.563.0 - Icon library
- `class-variance-authority` 0.7.1 - Component variant management
- `clsx` 2.1.1 - Conditional className utility
- `tailwind-merge` 3.4.0 - Tailwind class deduplication
- `embla-carousel-react` 8.6.0 - Carousel component
- `embla-carousel-autoplay` 8.6.0 - Carousel autoplay plugin

**Utilities:**
- `date-fns` 4.1.0 - Date formatting

**Infrastructure:**
- `framer-motion` 12.29.2 - Page transitions and scroll animations

## Configuration

**TypeScript:**
- Config: `tsconfig.json`
- Target: ES2017
- Module resolution: bundler
- Strict mode: enabled
- Path alias: `@/*` maps to `./src/*`
- JSX: react-jsx

**Next.js:**
- Config: `next.config.ts`
- Output: `standalone` (optimized for Docker)
- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Image domains: `images.unsplash.com`, `i.pravatar.cc`, `back.redsea.sphyrnasolutions.com`

**Environment:**
- `.env.example` documents required variables
- `.env.local` present (not committed)
- Key vars: `NEXT_PUBLIC_WAGTAIL_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_HOSTNAME`
- Optional: `FALLBACK_MODE` (controls mock data fallback: `full`, `critical`, `emergency`, `none`)

**Linting:**
- Config: `eslint.config.mjs` (flat config format)
- Presets: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`

**PostCSS:**
- Config: `postcss.config.mjs`
- Plugin: `@tailwindcss/postcss`

## Typography & Design System

**Fonts (loaded externally):**
- Satoshi (300-900) - Body font via Fontshare CDN
- Clash Display (200-700) - Display/heading font via Fontshare CDN
- JetBrains Mono (400, 600, 700, 800) - Monospace font via Google Fonts (`next/font/google`)

**CSS Variables:**
- Defined in `src/app/globals.css` using Tailwind v4 `@theme inline` directive
- Color palette: ocean-deep, coral-fire, abyss, cyan-light, electric-blue
- Font families: `--font-display`, `--font-sans`, `--font-mono`

## Platform Requirements

**Development:**
- Node.js 22+ (recommended, matches Docker)
- npm for package management
- No database required locally (mock data fallback available)

**Production:**
- Docker container (multi-stage build in `Dockerfile`)
- Docker Compose orchestration (`docker-compose.yml`)
- Deployed behind reverse proxy (port 3000 exposed internally only)
- Networks: `redsea-network` (internal), `dokploy-network` (external/deployment)
- Hosting: Dokploy-based deployment platform
- Health check: HTTP GET on port 3000

---

*Stack analysis: 2026-03-06*
