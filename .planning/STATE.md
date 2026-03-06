# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-06)

**Core value:** Convertir trafico SEO en leads cualificados para safaris de buceo via Odoo CRM.
**Current focus:** v2.0 Lead Capture — defining roadmap

## Current Position

Phase: 04-odoo-api-integration
Plan: 02 complete
Status: Executing phase 04
Last activity: 2026-03-06 -- Completed 04-02 (POST /api/lead route with rate limiting and tests)

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

### Pending Todos

- User will provide Odoo connection details (URL, DB, API key) before execution

### Blockers/Concerns

- Odoo credentials not yet available -- needed before API route can be tested
- Wagtail returns 500 during Docker build (non-blocking, fallback handles it)

## Session Continuity

Last session: 2026-03-06
Stopped at: Completed 04-02-PLAN.md
Resume file: .planning/phases/04-odoo-api-integration/04-02-SUMMARY.md
