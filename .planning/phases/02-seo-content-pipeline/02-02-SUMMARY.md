---
phase: 02-seo-content-pipeline
plan: 02
subsystem: seo-schema
tags: [schema-dts, json-ld, seo, metadata, next-js]
dependency_graph:
  requires: [ClusterMixin, WagtailPageWithSEO]
  provides: [generateSchema, buildPageMetadata, buildCanonicalUrl, JsonLd, BASE_URL]
  affects: [rutas-page, blog-page, experiencias-page]
tech_stack:
  added: [schema-dts@1.1.5]
  patterns: [factory-function, centralized-metadata]
key_files:
  created:
    - src/lib/seo/schema/tourist-trip.ts
    - src/lib/seo/schema/article.ts
    - src/lib/seo/schema/faq-page.ts
    - src/lib/seo/schema/breadcrumb.ts
    - src/lib/seo/schema/index.ts
    - src/lib/seo/metadata.ts
    - src/lib/seo/index.ts
    - src/components/seo/JsonLd.tsx
  modified: []
decisions:
  - "schema-dts WithContext<T> used for all return types giving compile-time schema.org validation"
  - "FAQPage schema requires explicit FAQ items, factory returns null for it (use buildFAQPageSchema directly)"
  - "BASE_URL from NEXT_PUBLIC_SITE_URL env or fallback to buceoenelmarrojo.com"
metrics:
  duration: "2 min"
  completed: "2026-03-06"
---

# Phase 2 Plan 02: JSON-LD Schema Generators + Metadata Helper Summary

Type-safe JSON-LD generators using schema-dts for TouristTrip, Article, FAQPage, and BreadcrumbList plus a shared buildPageMetadata helper replacing per-page metadata logic.

## What Was Built

1. **4 schema generators** with schema-dts WithContext<T> types:
   - `buildTouristTripSchema` for rutas/experiencias
   - `buildArticleSchema` for blog posts
   - `buildFAQPageSchema` for FAQ sections
   - `buildBreadcrumbSchema` for breadcrumbs

2. **Factory function** `generateSchema` dispatching by SchemaType

3. **JsonLd server component** rendering XSS-safe `<script type="application/ld+json">`

4. **buildPageMetadata** producing consistent Next.js Metadata with title, description, OG, twitter, canonical

5. **buildCanonicalUrl** as single source of truth for canonical URLs

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | `f6de003` | Schema generators + JsonLd component |
| 2 | `9f7f8aa` | Shared metadata helper |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compilation: PASSED
- schema-dts in devDependencies: CONFIRMED
