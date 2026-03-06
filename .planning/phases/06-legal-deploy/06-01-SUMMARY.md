---
phase: 06-legal-deploy
plan: 01
subsystem: legal, infra
tags: [gdpr, privacy-policy, odoo, docker, nextjs]

requires:
  - phase: 05-form-consent-ux
    provides: Lead capture form with consent checkboxes
provides:
  - GDPR-compliant privacy policy page at /politica-de-privacidad
  - Footer link to privacy page
  - Odoo CRM runtime env vars in docker-compose.yml
affects: [deployment, api-lead-route]

tech-stack:
  added: []
  patterns: [server-component legal pages, runtime-only env vars in docker-compose]

key-files:
  created:
    - src/app/politica-de-privacidad/page.tsx
  modified:
    - src/components/organisms/Footer.tsx
    - docker-compose.yml

key-decisions:
  - "Privacy page as server component (no client JS needed)"
  - "All 4 Odoo vars (URL, DB, LOGIN, API_KEY) as runtime env vars only (not build args)"

patterns-established:
  - "Legal pages: server components with max-w-3xl prose layout, semantic HTML, site design system"

requirements-completed: [LEGAL-01]

duration: 2min
completed: 2026-03-06
---

# Phase 6 Plan 1: Privacy Policy and Deploy Config Summary

**GDPR-compliant privacy policy page in Spanish with WhatsApp marketing consent, plus Odoo CRM runtime env vars in docker-compose**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-06T22:03:28Z
- **Completed:** 2026-03-06T22:05:38Z
- **Tasks:** 2 (of 3; Task 3 is human-verify checkpoint, skipped per instructions)
- **Files modified:** 3

## Accomplishments
- Privacy policy page at /politica-de-privacidad covering all GDPR-required sections (data controller, data collected, purpose, WhatsApp marketing, legal basis, user rights, data retention, recipients)
- Footer link updated from /privacidad to /politica-de-privacidad
- Odoo CRM env vars (ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY) added to docker-compose.yml environment section

## Task Commits

1. **Tasks 1+2: Privacy page, footer fix, Odoo env vars** - `6cc6b3b` (feat)

## Files Created/Modified
- `src/app/politica-de-privacidad/page.tsx` - Full privacy policy page with metadata, 9 sections in Spanish
- `src/components/organisms/Footer.tsx` - Fixed privacy link href from /privacidad to /politica-de-privacidad
- `docker-compose.yml` - Added ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY to frontend service environment
- `.env.example` - Already had all 4 Odoo vars (no changes needed)

## Decisions Made
- Privacy page built as a server component (static, no client JS) for fast load and SEO
- Used site design system (Clash Display headings, Satoshi body, ocean-deep/coral-fire palette) for visual consistency
- All 4 Odoo vars added as runtime-only env vars (not in Dockerfile build args) per plan spec

## Deviations from Plan

None - plan executed exactly as written.

Note: .env.example already contained all 4 Odoo variables from a prior phase, so no modification was needed there.

## Issues Encountered
None

## User Setup Required

Odoo CRM credentials must be configured before the lead API route can work in production:
- `ODOO_URL` - Odoo instance URL
- `ODOO_DB` - Odoo database name
- `ODOO_LOGIN` - API user email
- `ODOO_API_KEY` - API key from Odoo Settings > Users > API Keys

These must be set in Dokploy environment variables or server docker-compose.yml.

## Next Phase Readiness
- Privacy policy page ready for human review (Task 3 checkpoint)
- Deployment config ready once Odoo credentials are provided
- Build succeeds with all changes

---
*Phase: 06-legal-deploy*
*Completed: 2026-03-06*
