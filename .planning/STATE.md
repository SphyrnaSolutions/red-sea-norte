# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-06)

**Core value:** Convertir trafico SEO en leads cualificados para safaris de buceo via Odoo CRM.
**Current focus:** v2.1 Real Content — defining requirements

## Current Position

Phase: Not started (defining requirements)
Plan: --
Status: Defining requirements
Last activity: 2026-03-07 -- Milestone v2.1 started

## Accumulated Context

### Decisions

- [v1.0]: Native fetch with ISR, force-dynamic pages, fetch-level caching
- [v1.0]: schema-dts for compile-time JSON-LD validation
- [v1.0]: ClusterMixin in Wagtail for DB-level keyword uniqueness
- [v1.0]: Production fallback mode 'critical' (homepage/blog use mock data if Wagtail down)
- [v1.0]: NEXT_PUBLIC_* vars hardcoded in Dockerfile (Dokploy no build args)
- [v2.0]: Odoo CRM is a DIFFERENT instance from the MCP-connected Odoo
- [v2.0]: WhatsApp marketing consent required (Meta opt-in + GDPR)
- [v2.0]: API key approach: dedicated Odoo user with CRM-only permissions
- [v2.0]: Consent text must include: business name, message type, WhatsApp channel, opt-out info
- [v2.0]: utm.source "Web buceoenelmarrojo.com" for lead tracking
- [v2.0]: In-memory rate limiter (no Redis) -- sufficient for single-instance deployment
- [v2.0]: vitest for testing (ESM-native, fast with Next.js)
- [v2.0]: force-dynamic export on mutation API routes
- [v2.0]: Consent fields optional on HomepageData types (shared by RutaData/mappers)
- [v2.0]: Form field names aligned with API Zod schema enums (certification, preferredMonth)
- [v2.0]: Custom validateForm() over HTML required attrs for consistent error UX
- [v2.0]: Privacy page as server component (static, no client JS)
- [v2.0]: All 4 Odoo vars (URL, DB, LOGIN, API_KEY) as runtime env vars only (not build args)

### Pending Todos

- User will provide Odoo connection details (URL, DB, API key) before execution

### Blockers/Concerns

- Odoo credentials not yet available -- needed before API route can be tested
- Wagtail returns 500 during Docker build (non-blocking, fallback handles it)

## Session Continuity

Last session: 2026-03-07
Stopped at: Defining v2.1 requirements
Resume file: .planning/PROJECT.md
