# Pitfalls Research

**Domain:** SEO niche website (diving liveaboards, Red Sea) with programmatic content scaling, headless CMS, and CRM lead capture
**Researched:** 2026-03-06
**Confidence:** HIGH (verified across multiple sources + confirmed against existing codebase)

## Critical Pitfalls

### Pitfall 1: Keyword Cannibalization Across Content Clusters

**What goes wrong:**
Multiple pages in the same cluster compete for the same keyword. For example, a pillar page on "vida a bordo mar rojo" and a satellite on "precio vida a bordo mar rojo" both target "vida a bordo mar rojo" as their primary term. Google cannot decide which to rank, so both rank lower. Ahrefs 2025 data shows sites with high cannibalization see 15-20% ranking drops on affected keywords.

**Why it happens:**
Content clusters are planned by topic, not by search intent. When scaling from 30 to 60 pages, the overlap between pillar and satellite content becomes invisible without a keyword-to-URL mapping. In Spanish-language SEO, the problem is worse because the keyword pool is smaller -- fewer long-tail variations exist than in English.

**How to avoid:**
- Maintain a strict keyword-to-URL map (one primary keyword per page, max) before writing any content. This is the "tabla de contenidos con keywords" already in the requirements -- treat it as a hard constraint, not a reference doc.
- Differentiate pages by search intent (informational vs. transactional vs. navigational), not just by topic.
- Use canonical tags to point satellite pages back to the pillar when overlap is unavoidable.
- Run Google Search Console cannibalization checks monthly: search for each target keyword and verify only one page from the site appears.

**Warning signs:**
- Two pages from the site alternating in SERPs for the same query (position flickering).
- Google Search Console shows the same keyword driving impressions to multiple pages.
- Content briefs for new pages don't reference the existing keyword map.

**Phase to address:**
Phase 1 (Content Architecture). The keyword-to-URL map must exist before any content is written. Retroactive deduplication is expensive.

---

### Pitfall 2: Thin Content Penalty from Scaled Page Generation

**What goes wrong:**
Scaling to 60 pages using templates where only the location/wreck name changes produces what Google classifies as "doorway pages." A travel site that created 50,000 "hotels in [city]" pages with minimal differentiation had 98% deindexed within 3 months. Google's December 2025 core update specifically targets template-driven thin content, and the Helpful Content system is now part of core ranking.

**Why it happens:**
The efficiency of programmatic SEO (one template, many pages) directly conflicts with Google's demand for unique value per page. When scaling dive spot pages (Thistlegorm, Abu Nuhas, Ras Mohammed), the temptation is to use a single template with swapped names and basic facts. 93% of penalized programmatic SEO sites lacked meaningful differentiation between pages.

**How to avoid:**
- Each page must have unique, expert-level content that passes the "remove the entity name" test: if you remove the wreck/spot name, is the remaining content still unique and valuable? If not, it is thin.
- Add unique data per page: personal dive experience, specific photo galleries, depth charts, seasonal conditions, difficulty ratings, equipment recommendations specific to that spot.
- Use the "E-E-A-T" framework: demonstrate first-hand Experience (dive logs, photos), Expertise (technical diving knowledge), Authoritativeness (author bio with diving credentials), and Trustworthiness (accurate safety information).
- Set a minimum word count per page (1,500+ words of unique content) as a quality gate.

**Warning signs:**
- Page content can be generated entirely from a database record without human editorial input.
- Multiple pages share the same structural sections with only entity names swapped.
- Bounce rate exceeds 70% on content pages (users see nothing unique).
- Google Search Console shows "Crawled - currently not indexed" for new pages.

**Phase to address:**
Phase 2 (Content Production). Must be enforced as a quality gate before any page goes live. The SEO template should include mandatory unique-content sections.

---

### Pitfall 3: Sitemap Reports Wrong Dates, Crippling Crawl Efficiency

**What goes wrong:**
The current sitemap uses `new Date()` for all `lastModified` values. Every build/deploy tells Google that every page changed, which is false. Google's crawler allocates crawl budget partly based on `lastModified`. When every page always says "just updated," Google either ignores `lastModified` entirely (wasting crawl budget on unchanged pages) or deprioritizes the whole sitemap as unreliable. At 60 pages this is annoying; at scale it becomes a real bottleneck.

**Why it happens:**
`new Date()` is the path-of-least-resistance default. The actual `first_published_at` timestamp exists in Wagtail's API response but is not propagated to the sitemap. The data layer functions (`getAllBlogPostSlugsData`, etc.) return only slugs, not timestamps.

**How to avoid:**
- Pass `first_published_at` (or a `last_modified` field) from Wagtail API through the data layer to the sitemap function.
- For static pages (homepage, listing pages), use a fixed date that updates only when content actually changes.
- Add `export const revalidate = 3600` to the sitemap to avoid regeneration on every request.

**Warning signs:**
- All sitemap entries show the same date.
- Google Search Console's "Sitemaps" report shows "Sitemap was read" but indexing of new content is slow.
- Crawl stats show Google re-crawling unchanged pages frequently.

**Phase to address:**
Phase 1 (Technical SEO Foundation). Fix before adding content pages, so new pages get proper crawl signals from day one.

---

### Pitfall 4: Axios Breaks Next.js ISR Cache, Causing Stale or Over-Fetched Content

**What goes wrong:**
The Wagtail client uses `axios` instead of native `fetch`. Next.js only supports automatic ISR caching and tag-based revalidation with native `fetch`. The current workaround (`unstable_cache`) is on an unstable API that could break in any Next.js update. Worse, `unstable_cache` behavior is subtly different from `fetch` caching -- it caches function return values, not HTTP responses, so cache invalidation via `revalidateTag` may not work as expected across all deployment targets.

**Why it happens:**
Axios was likely chosen early for its familiar API and interceptors. The ISR caching gap was not apparent until the site needed proper cache invalidation.

**How to avoid:**
- Migrate the Wagtail client from `axios` to native `fetch` with Next.js cache options (`next: { revalidate: 3600, tags: ['content-type'] }`).
- Remove `unstable_cache` wrappers from the data layer.
- Use `revalidateTag` or `revalidatePath` from Next.js for on-demand revalidation when Wagtail publishes content.

**Warning signs:**
- Content changes in Wagtail don't appear on the site within the expected revalidation window.
- Next.js upgrade breaks cache behavior.
- Different caching behavior between development and production.

**Phase to address:**
Phase 1 (Technical Foundation). Must be fixed before scaling content, because 60 pages with broken caching means either stale content or excessive API calls to Wagtail.

---

### Pitfall 5: Silent Fallback to Mock Data in Production

**What goes wrong:**
The data layer's fallback cascade (`FALLBACK_MODE` defaults to `'full'`) means that when the Wagtail API fails, the site silently serves stale mock data. In production, this means users could see outdated content (wrong prices, discontinued routes, inaccurate safety information) without anyone noticing. For a diving site, incorrect safety or logistics information is a liability.

**Why it happens:**
The fallback was built for development convenience and never disabled for production. There is no monitoring or alerting when fallback is triggered.

**How to avoid:**
- Set `FALLBACK_MODE=none` in production environment variables.
- Add error monitoring (Sentry or similar) that triggers alerts when the Wagtail API is unreachable.
- Show a user-visible error state or cached-but-timestamped content rather than silently serving mock data.
- Remove mock data files from production builds entirely.

**Warning signs:**
- Production site still shows content even when Wagtail server is down.
- Mock data files ship in the production bundle.
- No alerts fire when Wagtail API returns errors.

**Phase to address:**
Phase 1 (Technical Foundation). Critical to fix before any content goes live.

---

### Pitfall 6: No Pagination in Wagtail API Calls -- Content Beyond 20 Items Silently Missing

**What goes wrong:**
`getPages` in the Wagtail client fetches all pages of a type without pagination parameters. Wagtail API defaults to 20 items per page. When blog posts, dive spots, or any content type exceeds 20 entries, items beyond the first page are never fetched. The sitemap will be incomplete, listing pages will show only 20 items, and internal linking will miss pages.

**Why it happens:**
Works fine during initial development with small content sets. The 20-item default is a Wagtail API convention, not an error, so no error is thrown -- you just get fewer items than expected.

**How to avoid:**
- Add `limit` and `offset` parameters to `getPages`. Pass `limit=100` or implement recursive fetching for all pages.
- Alternatively, use Wagtail's `?limit=999` parameter for content types that will never exceed a few hundred pages (appropriate for this niche site).
- Add a monitoring check that compares `meta.total_count` from the API response against the number of items actually returned.

**Warning signs:**
- Sitemap has fewer URLs than pages in the CMS.
- Listing pages show fewer items than exist.
- `meta.total_count` in API responses exceeds `items.length`.

**Phase to address:**
Phase 1 (Technical Foundation). Must be fixed before scaling to 30+ pages of any content type.

---

### Pitfall 7: Lead Forms That Go Nowhere

**What goes wrong:**
Both `LeadFormModal` and `InlineLeadSection` simulate API calls with `setTimeout` and log to console. The newsletter form has no submission logic whatsoever. Users fill forms that silently discard their data. For a site whose entire business model is lead capture, this means zero conversion despite traffic.

**Why it happens:**
Forms were built UI-first during development, with backend integration deferred. The deferral was never tracked as a blocking issue.

**How to avoid:**
- Implement the `/api/leads` endpoint connected to Odoo CRM before launching any content.
- Use Odoo's XML-RPC or JSON-RPC API to create `crm.lead` records. Required fields: `name` (opportunity title, not person name), `contact_name`, `email_from`, `phone`, `description`.
- Add form validation (Zod schema) on both client and server side.
- Add CSRF protection to the form submission endpoint.
- Add a success/error feedback loop to the user (confirmation page or toast).

**Warning signs:**
- Form submissions are logged to console instead of an API.
- No Odoo CRM entries correspond to site form submissions.
- Conversion rate in analytics is 0% despite traffic.

**Phase to address:**
Phase 1 (Lead Capture Infrastructure). This is the revenue-generating feature. Without it, SEO traffic has no business value.

---

### Pitfall 8: Orphan Pages from Poor Internal Linking

**What goes wrong:**
Programmatically generated pages often lack internal links to and from the rest of the site. Google treats pages with no internal links as low-priority or unindexable. If 60 content pages exist but only the homepage and main navigation link to listing pages, the individual content pages become orphans that Google may never crawl or rank.

**Why it happens:**
Internal linking is treated as an afterthought rather than a structural requirement. Content clusters are planned topically but the linking topology is not codified.

**How to avoid:**
- Build automatic internal linking into the SEO template: "Related dives," "Same route," "Next/previous in cluster" sections.
- Every pillar page must link to all its satellites. Every satellite must link back to its pillar and to 2-3 sibling satellites.
- Add breadcrumb navigation with schema markup.
- Implement a "related content" component that dynamically pulls from the same cluster based on tags/categories in Wagtail.
- Validate with a crawl tool (Screaming Frog or similar) that no page has fewer than 3 internal links pointing to it.

**Warning signs:**
- Content pages have no "Related" or "See also" sections.
- Breadcrumbs are missing or generic.
- Crawl analysis shows pages with only 1 internal link (from sitemap only).

**Phase to address:**
Phase 2 (Content Production). Internal linking components must be built alongside the content template, not after content is published.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded fallback content in mappers | Pages render even without CMS data | Content cannot be edited via CMS; changes require code deployments | Only during initial development before CMS models are finalized |
| `dangerouslySetInnerHTML` without sanitization | Quick rich text rendering | XSS vulnerability if CMS is compromised or editor inserts malicious content | Never in production without server-side sanitization |
| Duplicate block renderers (blog vs experiencias) | Faster initial page development | Bug fixes and style changes must be applied in two places; divergence is inevitable | Never -- extract shared components before adding more content types |
| `unstable_cache` usage | ISR-like caching without migrating from axios | API may change/break in Next.js updates; subtle cache invalidation differences | Only as a temporary bridge while migrating to native fetch |
| Mock data as production fallback | Site works even when CMS is down | Stale/incorrect content served silently; liability for safety-critical diving information | Never in production |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Odoo CRM (crm.lead) | Omitting the mandatory `name` field (opportunity title, not person name) or confusing it with `contact_name` | Set `name` to a generated opportunity title like "Lead from Web - [date]"; use `contact_name` for the person's name, `email_from` for email |
| Odoo CRM (crm.lead) | Using REST API -- Odoo does not have a REST API | Use XML-RPC (`xmlrpc/2/common` + `xmlrpc/2/object`) or JSON-RPC (`/jsonrpc`). From Next.js API routes, JSON-RPC is cleaner |
| Odoo CRM (many2many fields) | Passing tags as plain strings | Use Odoo's command tuples: `[(6, 0, [tag_id_1, tag_id_2])]` for many2many fields like `tag_ids` |
| Wagtail API (pagination) | Assuming all items are returned in one request | Wagtail defaults to 20 items per page. Always check `meta.total_count` and paginate or set `?limit=100` |
| Wagtail images (renditions) | Using original image URLs without size parameters | Use Wagtail's rendition API (`?width=800`) to request appropriately sized images; pass `width`/`height` to `next/image` |
| Wagtail preview | Expecting preview to work out of the box in headless mode | Preview requires a custom implementation: Next.js Draft Mode + Wagtail's preview token. The existing `/api/preview` route lacks shared secret validation |
| Next.js + Wagtail routing | Assuming Wagtail `html_url` matches frontend routes | Frontend routes are defined in Next.js, not Wagtail. Wagtail's "View Live" links will point to wrong URLs unless `WAGTAILAPI_BASE_URL` is configured to the Next.js domain |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Fetching all pages without pagination | Works fine, no errors | Add `?limit=100` or paginate | >20 pages of any content type |
| `new Date()` in sitemap for all entries | Google crawls everything on every visit | Use actual `last_modified` from Wagtail | When Google deprioritizes the sitemap as unreliable (~30+ pages) |
| Render-blocking external font (fontshare.com) | Slow LCP, layout shift on font load | Self-host fonts via `next/font/local` or add `font-display: swap` | Immediately visible in Core Web Vitals; hurts rankings at any scale |
| No image optimization for Wagtail images | Large page sizes, slow LCP | Use Wagtail renditions API for server-side resizing; ensure `next/image` has width/height | >5 images per page |
| Axios in data layer preventing native ISR | Cache misses, excessive Wagtail API calls | Migrate to native `fetch` | At scale (60+ pages revalidating) or under load |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| `dangerouslySetInnerHTML` without sanitization on CMS content | XSS if CMS editor account is compromised or content is manipulated | Add server-side sanitization with `sanitize-html` or `DOMPurify` (JSDOM) before rendering |
| Preview API with no shared secret validation | Anyone can enable Draft Mode by guessing the endpoint pattern | Add `PREVIEW_SECRET` env var; validate token before enabling Draft Mode |
| No CSRF protection on lead forms | Form submission endpoint will be exploitable for spam once implemented | Generate CSRF tokens server-side; validate on submission |
| No Content-Security-Policy header | Broader XSS attack surface | Add CSP header restricting `script-src` to `'self'` and required CDN origins |
| Odoo credentials in client-side code | API keys exposed in browser | Keep Odoo API calls server-side only (Next.js API routes or Server Actions); never expose credentials to the client |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Lead forms that silently discard data | Users think they submitted; never hear back; trust eroded | Implement real submission with confirmation feedback and email acknowledgment |
| Newsletter signup with no backend | Users enter email that goes nowhere; data protection concern | Either connect to a service (Resend, Mailchimp) or remove the form until ready |
| Static "personas viendo" counter | Users may feel deceived; potential consumer protection issue in EU | Use real-time data or remove the counter entirely |
| Massive page load due to unoptimized images | Slow experience on mobile (primary audience for travel research) | Use Wagtail renditions + `next/image` with proper sizing |
| Hardcoded Spanish content that cannot be CMS-edited | Non-technical stakeholders cannot update calls-to-action, pricing info, or safety warnings | Move all user-facing text to CMS fields |

## "Looks Done But Isn't" Checklist

- [ ] **Lead forms:** Appear functional but submit to console.log -- verify data reaches Odoo CRM
- [ ] **Newsletter signup:** Renders input + button but has zero submission logic -- verify email capture works
- [ ] **Sitemap:** Generates valid XML but all dates are fabricated -- verify `lastModified` reflects actual content dates
- [ ] **Content pages:** Render correctly but may show mock data, not CMS content -- verify `FALLBACK_MODE=none` in production
- [ ] **Image optimization:** `next/image` component is used but Wagtail images bypass optimization without proper config -- verify images are served at appropriate sizes
- [ ] **Internal linking:** Pages exist but may be orphans with no incoming internal links -- crawl the site and verify every page has 3+ internal links
- [ ] **SEO metadata:** Pages have `<title>` and `<meta description>` but values may be hardcoded fallbacks, not CMS-driven -- verify meta tags change per page in view-source
- [ ] **Schema markup:** Not implemented yet -- verify JSON-LD structured data exists on content pages before declaring SEO complete
- [ ] **Canonical URLs:** Not explicitly set -- verify each page has a `<link rel="canonical">` pointing to itself
- [ ] **Preview mode:** Endpoint exists but has no authentication -- verify preview requires a secret before considering it secure

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Keyword cannibalization | MEDIUM | Audit with GSC, identify competing pages, merge or differentiate content, set canonical tags, wait 2-4 weeks for Google to re-evaluate |
| Thin content penalty | HIGH | Identify affected pages via GSC "Crawled - not indexed," add unique content (1500+ words each), submit for re-indexing, recovery takes 1-3 months |
| Sitemap wrong dates | LOW | Update sitemap.ts to use Wagtail dates, redeploy, resubmit sitemap in GSC |
| Silent mock data in production | LOW | Set `FALLBACK_MODE=none`, add error monitoring, redeploy |
| Lead forms not working | LOW | Implement API route + Odoo integration, test end-to-end, deploy |
| Orphan pages | MEDIUM | Build internal linking components, add to all content pages, resubmit sitemap, wait for re-crawl |
| Axios/ISR cache issues | MEDIUM | Migrate client from axios to fetch, remove `unstable_cache`, test revalidation behavior across all page types |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Keyword cannibalization | Phase 1: Content Architecture | Keyword-to-URL map reviewed; no keyword assigned to multiple pages |
| Thin content penalty | Phase 2: Content Production | Each page passes the "remove entity name" test; 1500+ unique words |
| Sitemap wrong dates | Phase 1: Technical SEO Foundation | View-source on `/sitemap.xml` shows distinct, real dates per page |
| Axios/ISR cache issues | Phase 1: Technical Foundation | Wagtail client uses native fetch; `unstable_cache` removed; content updates within revalidation window |
| Silent mock data fallback | Phase 1: Technical Foundation | `FALLBACK_MODE=none` in production; error monitoring alerts on Wagtail API failures |
| Wagtail pagination missing | Phase 1: Technical Foundation | API calls return all items; `meta.total_count` matches `items.length` |
| Lead forms non-functional | Phase 1: Lead Capture | Form submission creates `crm.lead` in Odoo; confirmation shown to user |
| Orphan pages | Phase 2: Content Production | Crawl audit shows every content page has 3+ internal links |
| No schema markup | Phase 1: Technical SEO Foundation | JSON-LD (Article, FAQPage, BreadcrumbList) present in page source |
| Preview API insecure | Phase 1: Technical Foundation | Preview endpoint requires `PREVIEW_SECRET`; unauthorized requests are rejected |

## Sources

- [Common Programmatic SEO Mistakes](https://seomatic.ai/blog/programmatic-seo-mistakes)
- [Programmatic SEO Without Traffic Loss: Complete 2025 Guide](https://www.getpassionfruit.com/blog/programmatic-seo-traffic-cliff-guide)
- [Content Clusters Are Causing Keyword Cannibalization](https://blog.mean.ceo/content-clusters-cannibalization/)
- [Google December 2025 Core Update: Key Takeaways](https://thinklittlebig.com/blog/google-december-2025-core-update-key-takeaways-for-seo-in-2026/)
- [Headless Wagtail Pain Points](https://dev.to/tommasoamici/headless-wagtail-what-are-the-pain-points-ji4)
- [Headless CMS SEO: Avoid These Common Pitfalls](https://successive.tech/blog/headless-cms-seo-avoid-these-common-pitfalls/)
- [Odoo CRM Lead Creation via API](https://www.odoo.com/forum/help-1/create-lead-from-external-application-with-odoo-apis-199062)
- [Next.js Sitemap Revalidation Discussion](https://github.com/vercel/next.js/discussions/50419)
- [Keyword Cannibalization Guide - Semrush](https://www.semrush.com/blog/keyword-cannibalization-guide/)
- [Typical Next.js SEO Pitfalls](https://focusreactive.com/typical-next-js-seo-pitfalls-to-avoid-in-2024/)
- Codebase analysis: `CONCERNS.md`, `sitemap.ts`, `client.ts`, `mappers.ts` (existing known issues confirmed and expanded)

---
*Pitfalls research for: SEO niche website -- diving liveaboards, Red Sea*
*Researched: 2026-03-06*
