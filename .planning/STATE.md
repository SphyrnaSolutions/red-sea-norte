# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-06)

**Core value:** Posicionar la web como referencia SEO en español para buceo en el Mar Rojo y convertir tráfico en leads para safaris desde Hurghada.
**Current focus:** Phase 2: SEO Content Pipeline

## Current Position

Phase: 2 of 3 (SEO Content Pipeline)
Plan: 4 of 4 in current phase
Status: Phase 2 complete
Last activity: 2026-03-06 -- Phase 2 executed: ClusterMixin, schema generators, cluster resolver, breadcrumbs, interlinks, page refactoring

Progress: [██████░░░░] 67%

## Performance Metrics

**Velocity:**
- Total plans completed: 6
- Average duration: 3 min
- Total execution time: 0.30 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Technical Foundation | 2/2 | 8 min | 4 min |
| 2. SEO Content Pipeline | 4/4 | 10 min | 2.5 min |

**Recent Trend:**
- Last 5 plans: 01-02 (4m), 02-01 (3m), 02-02 (2m), 02-03 (2m), 02-04 (3m)
- Trend: Accelerating

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: Lead capture (Odoo CRM) and content production (30-60 pages) deferred to v2
- [Roadmap]: Wagtail model extensions (CONT-01, CONT-02) grouped with SEO pipeline, not technical foundation
- [Roadmap]: 3 phases derived from natural dependency boundaries: data layer -> SEO pipeline -> templates
- [Phase 1]: Native fetch with next.revalidate replaces axios for ISR compatibility
- [Phase 1]: Errors propagate from fetchers to data layer (no silent swallowing)
- [Phase 1]: Production defaults to fallback mode 'none' -- explicit FALLBACK_MODE required to override
- [Phase 1]: Removed unstable_cache -- fetch-level caching is sufficient
- [Phase 1]: Pages use force-dynamic, ISR handled at fetch level only
- [Phase 1]: Slug functions return [] on error so builds succeed without Wagtail
- [Phase 2]: primary_keyword unique+nullable for DB-level cannibalization prevention
- [Phase 2]: schema-dts WithContext<T> for compile-time schema.org validation
- [Phase 2]: Cluster resolver fetches all pages client-side (site <100 pages, ISR-cached)
- [Phase 2]: Breadcrumbs always pair visual nav with BreadcrumbList JSON-LD
- [Phase 2]: Existing generateMetadata kept (data layer transforms types), JsonLd replaces inline script

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 2 resolved]: Wagtail model extension needs access to the Wagtail codebase in sibling directory -- RESOLVED (committed in wagtail repo)
- [Phase 2]: URL structure decision still pending -- existing routes kept, cluster prefixes deferred

## Session Continuity

Last session: 2026-03-06
Stopped at: Completed Phase 2 (02-01 through 02-04). Ready for Phase 3.
Resume file: None
