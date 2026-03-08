---
phase: 10-seo-tooling-setup
plan: 01
subsystem: infra
tags: [google-analytics, ga4, consent-mode-v2, gdpr, cookie-consent, search-console, bing-webmaster, seo]

# Dependency graph
requires: []
provides:
  - GA4 with Consent Mode v2 (default denied, granted on user accept)
  - GDPR-compliant cookie consent banner with accept/reject
  - Google Search Console verification meta tag (conditional)
  - Bing Webmaster Tools verification meta tag (conditional)
  - Environment variable configuration for all tracking IDs
affects: [11-sitemap-indexation, 12-performance-cwv]

# Tech tracking
tech-stack:
  added: ["@next/third-parties"]
  patterns: ["Google Consent Mode v2 default-denied pattern", "Next.js metadata.verification for search engine meta tags"]

key-files:
  created:
    - src/components/CookieConsent.tsx
  modified:
    - src/app/layout.tsx
    - .env.example
    - docker-compose.yml

key-decisions:
  - "Used Next.js metadata.verification API for GSC/Bing meta tags instead of manual head tags"
  - "Consent Mode v2 defaults ALL storage types to denied (analytics, ad, ad_user_data, ad_personalization)"
  - "Cookie consent persisted in localStorage under key cookie-consent"

patterns-established:
  - "Consent-gated analytics: always default-denied, update to granted only on explicit user accept"
  - "Environment variable pattern for NEXT_PUBLIC_ SEO/tracking IDs"

requirements-completed: [TOOL-01, TOOL-02, TOOL-03]

# Metrics
duration: 5min
completed: 2026-03-08
---

# Phase 10 Plan 01: SEO Tooling Setup Summary

**GA4 with Consent Mode v2 (default denied), GDPR cookie banner, GSC and Bing verification meta tags via env vars**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-08T00:31:53Z
- **Completed:** 2026-03-08T00:37:00Z
- **Tasks:** 1 of 2 (Task 2 is human-verify checkpoint)
- **Files modified:** 6

## Accomplishments
- GA4 installed via @next/third-parties with Consent Mode v2 defaulting all storage to denied
- CookieConsent component created with accept/reject buttons, localStorage persistence, and site-matching dark theme
- Google Search Console and Bing verification meta tags rendered conditionally via Next.js metadata.verification API
- All tracking IDs configured via environment variables (no hardcoded values)
- docker-compose.yml updated with 3 new NEXT_PUBLIC_ env vars for production builds

## Task Commits

Each task was committed atomically:

1. **Task 1: Install GA4 with Consent Mode v2 and cookie consent banner** - `dcbe541` (feat)

Task 2 is a human-verify checkpoint (requires user to register services and set env vars in production).

## Files Created/Modified
- `src/components/CookieConsent.tsx` - Client component with GDPR cookie banner (accept/reject, localStorage, gtag consent update)
- `src/app/layout.tsx` - Added Consent Mode v2 default script, conditional GoogleAnalytics, conditional GSC/Bing meta tags, CookieConsent component
- `.env.example` - Documented 3 new SEO env vars
- `.env.local` - Added placeholder SEO env vars for local dev
- `docker-compose.yml` - Added 3 new NEXT_PUBLIC_ env vars to build args and environment
- `package.json` / `package-lock.json` - Added @next/third-parties dependency

## Decisions Made
- Used Next.js `metadata.verification` API for GSC and Bing meta tags instead of manually inserting meta tags in `<head>` -- cleaner, framework-native approach
- Consent Mode v2 defaults ALL four storage types to denied (analytics_storage, ad_storage, ad_user_data, ad_personalization) for maximum GDPR compliance
- Cookie consent choice persisted in localStorage (not cookies) to avoid circular dependency

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

Task 2 (checkpoint:human-verify) requires the user to:
1. Create GA4 property and get Measurement ID (G-XXXXXXXXXX)
2. Add site to Google Search Console and get verification code
3. Add site to Bing Webmaster Tools and get verification code
4. Set env vars in production (Dokploy) and redeploy
5. Complete verification in each dashboard
6. Test cookie banner behavior

## Next Phase Readiness
- GA4 and verification tags are code-complete, awaiting production env var configuration
- Phase 11 (sitemaps) can proceed independently of user verification
- Phase 12 (performance/CWV) will use GA4 metrics once verified

---
*Phase: 10-seo-tooling-setup*
*Completed: 2026-03-08*
