# Project Research Summary

**Project:** Red Sea Norte -- SEO niche website for Red Sea liveaboard diving
**Domain:** Programmatic SEO / lead-generation niche site (travel/diving vertical)
**Researched:** 2026-03-06
**Confidence:** HIGH

## Executive Summary

Red Sea Norte is a Spanish-language SEO niche site targeting Red Sea liveaboard diving keywords. The existing stack (Next.js 16, React 19, Wagtail headless CMS, Tailwind 4) is solid and should not change. The project's next milestone is scaling from a marketing landing page to a 60-page content authority site built around 5 topic clusters (vida a bordo, rutas, pecios, destinos, logistica), with every page engineered for Google ranking and lead capture into Odoo CRM. Experts build this type of site using a pillar-cluster content architecture with centralized SEO infrastructure (schema generation, interlinking engine, breadcrumbs) rather than per-page ad hoc SEO. The stack additions are minimal: react-hook-form + Zod for forms, schema-dts for typed JSON-LD, and a thin JSON-RPC wrapper over the existing axios for Odoo integration.

The recommended approach is to fix critical technical debt first (migrate axios to native fetch for proper ISR caching, fix sitemap dates, disable mock-data fallback in production, add Wagtail API pagination), then build the SEO content pipeline (cluster resolver, interlink engine, schema generator), then implement lead capture with Odoo, and finally populate content in two waves (30 pages, then 60). This order is dictated by hard dependencies: every content page needs cluster metadata from Wagtail, every interlink needs the cluster resolver, and every lead form needs the Odoo integration. Building content before the pipeline is ready means rework.

The key risks are keyword cannibalization (multiple pages competing for the same term in a small Spanish keyword pool), thin content penalties from template-driven page generation, and the existing "looks done but isn't" technical debt (lead forms that log to console, sitemap with fake dates, silent mock-data fallback). All three are preventable with upfront discipline: a strict keyword-to-URL map before writing content, a 1500-word unique content minimum per page, and a technical foundation phase that fixes the plumbing before scaling.

## Key Findings

### Recommended Stack

The existing stack is locked and production-ready. Only 4 additions are needed, all high-confidence choices with zero architectural risk.

**Additions to install:**
- **react-hook-form + @hookform/resolvers + Zod 4:** Form state, validation, server-side schema sharing. De facto standard for Next.js 16 forms. Replaces the current console.log form stubs.
- **schema-dts:** Google-maintained TypeScript types for Schema.org JSON-LD. Zero runtime cost (types only). Fills the only gap that Next.js built-in metadata API does not cover.

**No library needed for:**
- Odoo CRM integration -- thin JSON-RPC wrapper over existing axios is sufficient
- Programmatic page generation -- Next.js 16 built-in `generateStaticParams` + ISR handles everything
- SEO metadata -- `generateMetadata()` is native to Next.js 16
- Sitemap/robots -- already implemented, just needs expansion

**Critical migration:** Axios should be replaced with native `fetch` in the Wagtail client to enable proper Next.js ISR cache integration and `revalidateTag` support. The current `unstable_cache` workaround is fragile.

### Expected Features

**Must have (table stakes -- P1 for launch):**
- Pillar + cluster page architecture (5 clusters, topical authority)
- Per-page SEO metadata on all 60 pages (already partially done)
- JSON-LD structured data per content type (TouristTrip, Article, FAQPage, Place, BreadcrumbList)
- Internal linking system (hub-to-satellite, sibling links, related content blocks)
- Lead capture forms connected to Odoo CRM (the revenue feature)
- Breadcrumbs (visual + BreadcrumbList schema)
- FAQ sections with FAQPage schema on pillar pages
- Per-wreck and per-dive-spot deep pages (biggest content gap vs competitors)
- Friction/logistics guide pages (high commercial intent, low competition)

**Should have (P2, add within 4-8 weeks):**
- Comparison content ("Ruta Norte vs Ruta Sur")
- Seasonal calendar content
- Table of contents for long-form pages
- Multi-step lead form (qualification wizard)
- Image galleries with Place schema

**Defer (P3/v2+):**
- English language version (only after Spanish rankings are stable)
- Video content integration
- Interactive dive site maps
- Newsletter/email sequences

**Anti-features (do NOT build):**
- Booking engine, user accounts, blog with generic content, comments/UGC, real-time search, multi-language (now), social media feeds, live chat widgets, massive-scale programmatic SEO

### Architecture Approach

The architecture is a three-layer content pipeline: Wagtail CMS (content + cluster metadata) feeds through a Next.js server-side data layer (fetching + caching) into a centralized SEO module (cluster resolution, interlinking, schema generation) that renders ISR-cached static pages. Lead capture flows client-side through a server API route that validates, enriches with source tracking, and forwards to Odoo CRM. The key design decision is cluster-aware content modeling: every page carries its cluster assignment, role (pillar/satellite), primary keyword, and schema type as CMS metadata, enabling automated SEO infrastructure.

**Major components:**
1. **Wagtail SEO Page Models** -- Content + cluster metadata + schema type fields in CMS
2. **Cluster Resolver** (`src/lib/seo/clusters.ts`) -- Resolves pillar/satellite relationships, siblings, breadcrumb chains
3. **Interlink Engine** (`src/lib/seo/interlinks.ts`) -- Computes related pages, contextual links, breadcrumbs per page
4. **Schema Generator** (`src/lib/seo/schema.ts`) -- Factory producing typed JSON-LD per page type
5. **Odoo Client** (`src/lib/odoo/client.ts`) -- Thin JSON-RPC wrapper for CRM lead creation
6. **Lead API Route** (`/api/leads`) -- Validates, enriches with source tracking, proxies to Odoo

### Critical Pitfalls

1. **Keyword cannibalization** -- Maintain a strict keyword-to-URL map (one primary keyword per page) before writing any content. Spanish keyword pool is small; overlap is easy. Phase 1 blocker.
2. **Thin content penalty** -- Each of the 60 pages must have 1500+ words of unique expert content. Template-driven pages with only entity names swapped will be deindexed. Enforce "remove the entity name" quality test.
3. **Lead forms that go nowhere** -- Both existing forms log to console. The entire business model is lead capture. Odoo integration is a Phase 1 hard requirement.
4. **Axios breaking ISR cache** -- Migrate Wagtail client from axios to native fetch for proper `revalidateTag` support. Current `unstable_cache` is fragile.
5. **Silent mock-data fallback** -- Set `FALLBACK_MODE=none` in production. Add error monitoring. Stale diving safety information is a liability.
6. **Wagtail API pagination** -- Default 20-item limit will silently drop pages beyond the first page. Must add `?limit=100` or pagination before scaling to 30+ pages.
7. **Sitemap with fake dates** -- `new Date()` on all entries wastes crawl budget. Propagate real `last_modified` from Wagtail.

## Implications for Roadmap

Based on research, 6 phases with clear dependency ordering:

### Phase 1: Technical Foundation
**Rationale:** Every subsequent phase depends on a working data pipeline. The current technical debt (axios/ISR mismatch, fake sitemap dates, mock-data fallback, missing pagination) will compound across 60 pages if not fixed first.
**Delivers:** Reliable Wagtail data layer with proper ISR caching, accurate sitemap, production-safe error handling, paginated API calls.
**Addresses:** Core Web Vitals baseline, crawl efficiency, production reliability.
**Avoids:** Pitfalls 3 (sitemap dates), 4 (axios/ISR), 5 (mock data fallback), 6 (pagination).

### Phase 2: SEO Content Pipeline
**Rationale:** The cluster resolver, interlink engine, and schema generator must exist before any content pages are built. These are shared infrastructure that all 60 pages consume. Building pages first means retrofitting SEO infrastructure later.
**Delivers:** `src/lib/seo/` module (clusters, interlinks, schema, breadcrumbs), Wagtail model extensions with cluster metadata, keyword-to-URL map.
**Addresses:** Pillar-cluster architecture, JSON-LD structured data, internal linking, breadcrumbs.
**Avoids:** Pitfall 1 (keyword cannibalization via keyword map), Pitfall 8 (orphan pages via interlink engine).
**Uses:** schema-dts for typed JSON-LD.

### Phase 3: Lead Capture Infrastructure
**Rationale:** Can be built in parallel with Phase 2 since it has no dependency on content pipeline. But must be ready before content launch -- SEO traffic without lead capture has zero business value.
**Delivers:** Odoo CRM integration, validated lead forms (modal + inline), source tracking (page, cluster, CTA position), WhatsApp CTA enhancement.
**Uses:** react-hook-form, Zod 4, axios JSON-RPC wrapper for Odoo.
**Implements:** Server-side lead proxy pattern, form validation schema shared client+server.
**Avoids:** Pitfall 7 (lead forms that go nowhere).

### Phase 4: Page Templates and First 30 Pages
**Rationale:** With pipeline and lead capture ready, build the shared page templates (wreck page, dive spot page, guide page, pillar hub page) and populate the first 30 pages across 2-3 priority clusters.
**Delivers:** Reusable SEO page templates, first 30 pages of unique content, 2-3 complete clusters (Vida a Bordo, Ruta Norte, Pecios).
**Addresses:** Per-wreck deep pages, per-spot pages, friction/logistics guides, FAQ sections.
**Avoids:** Pitfall 2 (thin content -- enforce 1500-word minimum and "remove entity name" test).

### Phase 5: Scale to 60 Pages
**Rationale:** After validating initial rankings in Google Search Console (4-8 weeks), expand coverage based on keyword performance data. Add remaining clusters and comparison content.
**Delivers:** Remaining 30 pages, comparison content, seasonal calendar, enhanced internal linking, cross-cluster link audit.
**Addresses:** Comparison content, seasonal content, image galleries, full cluster coverage.

### Phase 6: Optimization and Monitoring
**Rationale:** With all content live, shift to measurement and optimization. Validate structured data, audit internal links, monitor keyword cannibalization, optimize Core Web Vitals.
**Delivers:** GSC monitoring setup, crawl audit, schema validation, performance optimization, A/B test lead form variants.

### Phase Ordering Rationale

- **Phase 1 before everything:** Technical debt in the data layer would multiply across 60 pages. Fix once, benefit everywhere.
- **Phase 2 before Phase 4:** Content pages consume the SEO pipeline. Building pages without it means manual interlinking and per-page schema -- the exact anti-patterns identified in ARCHITECTURE.md.
- **Phase 3 parallel with Phase 2:** Odoo integration has no dependency on SEO pipeline. Building both simultaneously is the fastest path to a complete launch.
- **Phase 4 before Phase 5:** Ship 30 pages, validate with Google, then expand. This avoids investing in 60 pages of content that might need structural changes.
- **Keyword map in Phase 2, not Phase 4:** The map must exist before content is written. Retroactive deduplication is expensive (PITFALLS.md).

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (SEO Content Pipeline):** Wagtail model extension for cluster metadata needs research into Wagtail's `api_fields` configuration and how to expose custom fields to the v2 API. The interlink engine's keyword-matching logic needs design.
- **Phase 3 (Lead Capture):** Odoo JSON-RPC API specifics (field names, many2many command tuples for tags, error handling) need validation against the actual Odoo instance.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Technical Foundation):** Well-documented patterns -- axios-to-fetch migration, sitemap fixes, environment variable configuration.
- **Phase 4 (Page Templates):** Standard Next.js dynamic routes with `generateStaticParams`. Template structure is clear from ARCHITECTURE.md.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core stack is locked and proven. Additions are mainstream libraries with official docs. All version compatibility verified. |
| Features | HIGH | Feature set derived from SEO best practices, competitor analysis, and the project's own requirements. Multiple sources corroborate pillar-cluster approach. |
| Architecture | HIGH | Architecture builds on existing patterns in the codebase. Cluster-aware content model is well-documented in programmatic SEO literature. |
| Pitfalls | HIGH | Pitfalls verified against both the existing codebase and external sources. Several were confirmed by examining actual code (console.log forms, fake sitemap dates, mock data fallback). |

**Overall confidence:** HIGH

### Gaps to Address

- **Wagtail model extension specifics:** Research covered the what (cluster metadata fields) but the exact Wagtail Python code for model changes lives in a separate repo. Phase 2 planning needs access to the Wagtail codebase.
- **Odoo instance configuration:** The Odoo API key generation and `crm.lead` field mapping need validation against the actual Odoo instance. Field names and required fields may vary by Odoo version/configuration.
- **URL structure migration:** The existing site has routes like `/rutas/[slug]` and `/blog/[slug]`. The recommended cluster-based URL structure (`/vida-a-bordo-mar-rojo/que-llevar/`) may conflict. Phase 2 needs to decide whether to migrate existing routes (with 301 redirects) or nest new content under existing prefixes.
- **Content sourcing:** The 1500-word unique content requirement per page assumes access to expert diving knowledge (dive logs, original photos, technical specs). Content production capacity was not researched.
- **Font performance:** External font loading from fontshare.com is a Core Web Vitals risk flagged in PITFALLS.md. Self-hosting via `next/font/local` should be addressed in Phase 1 but needs font license verification.

## Sources

### Primary (HIGH confidence)
- [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Odoo 18.0 External API docs](https://www.odoo.com/documentation/18.0/developer/reference/external_api.html)
- [Wagtail Headless Support docs](https://docs.wagtail.org/en/latest/advanced_topics/headless.html)
- [schema-dts GitHub (Google)](https://github.com/google/schema-dts)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form), [zod](https://www.npmjs.com/package/zod), [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)

### Secondary (MEDIUM confidence)
- [Programmatic SEO Guide 2026 (Backlinko)](https://backlinko.com/programmatic-seo)
- [Content Clusters SEO 2026 (Xictron)](https://www.xictron.com/en/blog/content-cluster-seo-architecture-2026/)
- [Schema Markup for Travel SEO 2026](https://618media.com/en/blog/schema-markup-for-travel-seo/)
- [Internal Linking Strategy 2026](https://www.ideamagix.com/blog/internal-linking-strategy-seo-guide-2026/)
- [Common Programmatic SEO Mistakes (Seomatic)](https://seomatic.ai/blog/programmatic-seo-mistakes)
- [Google December 2025 Core Update Takeaways](https://thinklittlebig.com/blog/google-december-2025-core-update-key-takeaways-for-seo-in-2026/)

### Tertiary (LOW confidence)
- [Odoo Forum: React + CRM Leads](https://www.odoo.com/forum/help-1/i-want-to-integrate-my-react-js-websites-form-with-odoo-crm-lead-section-240652) -- needs validation against actual Odoo instance
- [Odoo CRM Next.js Integration (Heliconia)](https://www.heliconia.io/post/integrate-next-js-website-with-odoo) -- third-party guide, verify against official docs

---
*Research completed: 2026-03-06*
*Ready for roadmap: yes*
