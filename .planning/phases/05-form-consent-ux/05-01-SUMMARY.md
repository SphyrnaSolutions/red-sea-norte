---
phase: 05-form-consent-ux
plan: 01
subsystem: ui
tags: [react, forms, whatsapp-consent, gdpr, validation, lead-capture]

# Dependency graph
requires:
  - phase: 04-odoo-api-integration
    provides: POST /api/lead route with Zod validation and Odoo CRM integration
provides:
  - Functional lead forms (inline + modal) with WhatsApp consent, validation, and API submission
  - Client-side validation matching server-side Zod schema field names
  - Meta+GDPR compliant WhatsApp consent checkbox with privacy policy link
affects: [06-analytics, privacy-policy-page]

# Tech tracking
tech-stack:
  added: []
  patterns: [client-side validation with per-field error clearing, consent checkbox pattern]

key-files:
  created: []
  modified:
    - src/components/organisms/InlineLeadSection.tsx
    - src/components/organisms/LeadFormModal.tsx
    - src/lib/mock-data/homepage.ts
    - src/lib/mock-data/types.ts

key-decisions:
  - "Made consent fields optional on HomepageData types to avoid breaking RutaData and Wagtail mapper references"
  - "Aligned form field names (certification, preferredMonth) with API Zod schema enum values"
  - "Removed HTML required attributes in favor of custom validateForm() for consistent UX"

patterns-established:
  - "Consent checkbox pattern: consentText + privacyLinkText + privacyLinkHref props"
  - "Form submission pattern: validateForm -> fetch /api/lead -> success/error states"

requirements-completed: [FORM-01, FORM-02, FORM-03, FORM-04, FORM-05]

# Metrics
duration: 3min
completed: 2026-03-06
---

# Phase 5 Plan 1: Form Consent UX Summary

**Lead forms wired to /api/lead with WhatsApp consent checkbox, client-side validation, and loading/success/error visual feedback**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-06T21:48:38Z
- **Completed:** 2026-03-06T21:51:52Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Both forms (inline + modal) POST to /api/lead with all required fields
- WhatsApp consent checkbox with Meta+GDPR compliant text and privacy policy link
- Client-side validation with per-field error messages (name, email, phone, consent)
- Visual feedback: loading spinner, success state with checkmark, error banner
- Form field names aligned with API Zod schema (certification, preferredMonth enums)

## Task Commits

Each task was committed atomically:

1. **Task 1: Update form data and types** - `5c2b31d` (chore)
2. **Task 2: Wire forms with consent, validation, feedback** - `43908ed` (feat)

## Files Created/Modified
- `src/lib/mock-data/types.ts` - Added optional consentText, privacyLinkText, privacyLinkHref to leadForm and inlineLead types
- `src/lib/mock-data/homepage.ts` - Phone required in baseLeadFields, consent data added, field names aligned with API schema
- `src/components/organisms/InlineLeadSection.tsx` - Full form with validation, consent, API submission, success/error states
- `src/components/organisms/LeadFormModal.tsx` - Full form with validation, consent, API submission, 3s auto-close on success

## Decisions Made
- Made consentText/privacyLinkText/privacyLinkHref optional on HomepageData types because RutaData and Wagtail mappers reference them; components handle absence gracefully
- Aligned select option values with API Zod enums (e.g., "Open Water" not "open-water", "Junio" not "june") so server validation passes
- Removed HTML `required` attributes from inputs, using custom validateForm() instead for consistent error display

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed field name mismatch between form and API**
- **Found during:** Task 1
- **Issue:** Form used `certificationLevel` but API expects `certification`; select values used English slugs but API Zod schema uses Spanish labels
- **Fix:** Renamed field to `certification`, updated option values to match Zod enum values exactly
- **Files modified:** src/lib/mock-data/homepage.ts
- **Verification:** TypeScript compiles, values match leadSchema enums
- **Committed in:** 5c2b31d

**2. [Rule 3 - Blocking] Fixed TypeScript errors in rutas.ts and mappers.ts**
- **Found during:** Task 1
- **Issue:** Making consentText required on HomepageData broke RutaData (extends HomepageData["inlineLead"]) and Wagtail mappers
- **Fix:** Made consent fields optional on HomepageData types; components handle undefined gracefully
- **Files modified:** src/lib/mock-data/types.ts
- **Verification:** npx tsc --noEmit passes clean
- **Committed in:** 5c2b31d

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both fixes necessary for correctness. No scope creep.

## Issues Encountered
None beyond the deviations documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Lead forms fully functional, ready for analytics tracking integration
- Privacy policy page (/politica-de-privacidad) should be created as referenced by consent link
- Odoo credentials still needed for end-to-end testing of lead submission

---
*Phase: 05-form-consent-ux*
*Completed: 2026-03-06*
