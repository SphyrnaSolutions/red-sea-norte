---
phase: 04-odoo-api-integration
plan: 01
subsystem: odoo-client
tags: [odoo, xml-rpc, validation, zod, crm]
dependency-graph:
  requires: []
  provides: [odoo-client, lead-validation-schema]
  affects: [api-route, lead-form]
tech-stack:
  added: [xmlrpc, zod]
  patterns: [promise-wrapped-callbacks, env-config-validation, uid-caching]
key-files:
  created:
    - src/lib/odoo/client.ts
    - src/lib/odoo/types.ts
    - src/lib/odoo/config.ts
    - src/lib/validation/lead.ts
  modified:
    - .env.example
    - package.json
    - package-lock.json
decisions:
  - "xmlrpc callback API wrapped in Promises for async/await usage"
  - "UID cached for 10 minutes to reduce authentication calls"
  - "createSecureClient vs createClient chosen based on URL protocol"
  - "Zod z.literal(true) for whatsappConsent forces boolean true only"
metrics:
  duration: 92s
  completed: 2026-03-06T21:43:05Z
  tasks: 2/2
---

# Phase 04 Plan 01: Odoo XML-RPC Client and Lead Validation Summary

XML-RPC client with UID caching and Promise-wrapped callbacks, plus Zod lead schema with Spanish validation messages.

## What Was Built

### Odoo Client Module (`src/lib/odoo/`)

- **types.ts**: `OdooConfig`, `LeadCreateData`, and `OdooAuthResult` types covering CRM lead fields and connection config
- **config.ts**: `getOdooConfig()` reads four server-only env vars with descriptive missing-var errors
- **client.ts**: Four exported functions:
  - `authenticate(config)` -- calls `/xmlrpc/2/common`, caches UID for 10 minutes
  - `executeKw(config, uid, model, method, args)` -- calls `/xmlrpc/2/object`
  - `createLead(data)` -- high-level: config + auth + create in one call
  - `searchOrCreateUtmSource(name)` -- search-or-create pattern for UTM sources
  - Auto-selects `createSecureClient` vs `createClient` based on URL protocol

### Lead Validation Schema (`src/lib/validation/lead.ts`)

- `leadSchema` validates: name (2-100 chars), email, phone (international format regex), certification (enum), preferredMonth (Spanish months enum), whatsappConsent (must be `true`)
- All error messages in Spanish
- `validateLeadData(data)` returns typed success/error discriminated union with flattened field errors
- `LeadFormData` type exported for downstream consumers

### Environment Config (`.env.example`)

- Added `ODOO_URL`, `ODOO_DB`, `ODOO_LOGIN`, `ODOO_API_KEY` with comments noting server-only usage

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed xmlrpc callback type mismatch**
- **Found during:** Task 1
- **Issue:** `@types/xmlrpc` defines callback error as `Object`, not `Error`. TypeScript strict mode rejected the typed callback.
- **Fix:** Let TypeScript infer callback parameter types and added runtime `instanceof Error` check for message extraction.
- **Files modified:** src/lib/odoo/client.ts
- **Commit:** c5a5c52

**2. [Rule 1 - Bug] Fixed Zod z.literal errorMap API**
- **Found during:** Task 2
- **Issue:** Zod v4 uses `message` parameter instead of `errorMap` for `z.literal()`.
- **Fix:** Changed `errorMap: () => ({ message: "..." })` to `message: "..."`.
- **Files modified:** src/lib/validation/lead.ts
- **Commit:** c5a5c52

## Verification

- `npx tsc --noEmit` passes with zero errors
- `.env.example` contains all four ODOO variables
- All exports confirmed: `authenticate`, `executeKw`, `createLead`, `searchOrCreateUtmSource`, `leadSchema`, `LeadFormData`, `validateLeadData`

## Commits

| Hash | Message |
|------|---------|
| c5a5c52 | feat(phase-4): add Odoo XML-RPC client and lead validation schema |

## Self-Check: PASSED

All 5 files exist. Commit c5a5c52 verified in git log.
