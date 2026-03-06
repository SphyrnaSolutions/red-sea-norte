# Feature Research

**Domain:** SEO niche website -- travel/diving (liveaboard Red Sea)
**Researched:** 2026-03-06
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These / Google Penalizes Without)

Features that Google and users consider baseline. Missing any of these means the site will not rank or will bounce visitors.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Pillar + Cluster page architecture** | Google rewards topical authority via interconnected content clusters. Sites with pillar-cluster architecture see 40% more organic traffic and AI citation rates jump from 12% to 41%. Without it, Google treats pages as isolated and won't build topical authority. | HIGH | Already partially designed in PROJECT.md (5 clusters: vida a bordo, rutas, pecios, destinos, logistica). Needs full implementation with proper hub pages and satellite linking. |
| **Per-page SEO metadata** | Title tags, meta descriptions, canonical URLs, OG tags are the minimum for any page to compete in SERP. Google won't rank pages with missing or duplicate metadata. | LOW | Already implemented via `generateMetadata()` in Next.js pages. Needs extension to all new content types (pecios, spots, guias). |
| **XML sitemap (dynamic)** | Google needs to discover all pages. A dynamic sitemap that updates as CMS content changes is non-negotiable for crawlability. | LOW | Already exists (`src/app/sitemap.ts`). Needs expansion to include new content types (pecio pages, dive spot pages, guide pages). |
| **robots.txt** | Controls crawl behavior, prevents indexing of drafts/API routes. | LOW | Already exists (`src/app/robots.ts`). |
| **JSON-LD structured data per content type** | Travel sites with schema markup see up to 35% higher organic CTR. Google needs structured data to generate rich snippets. Without it, listings are plain blue links competing against rich results. | MEDIUM | Organization + WebSite schemas exist on homepage. Needs TouristTrip, Article, FAQPage, BreadcrumbList, and Place schemas on content pages. |
| **Breadcrumb navigation + schema** | Users need to understand site hierarchy. BreadcrumbList schema gives Google navigational context and displays breadcrumbs in SERP. Important for deep content (3+ levels). | LOW | Not yet implemented. Add both visible breadcrumbs and BreadcrumbList JSON-LD on all content pages. |
| **Mobile-responsive design** | Google uses mobile-first indexing. A non-responsive diving site loses both ranking and the 60%+ of travel researchers on mobile. | LOW | Already handled by Tailwind CSS responsive design. |
| **Page speed / Core Web Vitals** | Google ranking factor since 2021. LCP, FID, CLS directly impact ranking. ISR and SSR in Next.js give a strong baseline. | MEDIUM | Next.js ISR provides good baseline. Must optimize images (next/image with proper sizing), avoid layout shifts from dynamic content, minimize JS bundles. |
| **Lead capture form (visible, simple)** | The entire business model is lead generation. Every page must have a clear path to contact/inquiry. Travel users expect to be able to request info easily. | MEDIUM | LeadFormModal exists. Needs inline forms on content pages (not just modal), WhatsApp CTA, and Odoo CRM integration. |
| **Internal linking system** | Pages more than 3 clicks from homepage get deprioritized by Google. Cluster satellites must link to hub and to each other. Hub must link to all satellites. This is the backbone of topical authority. | MEDIUM | Not yet implemented as automated system. Needs: related content blocks, contextual in-text links, hub-to-satellite navigation, and satellite-to-hub backlinks. |
| **Canonical URLs** | Prevents duplicate content penalties. Every page must declare its canonical. Critical when CMS can serve same content at multiple URLs. | LOW | Partially implemented (homepage has canonical). Must be on every page. |
| **Image optimization with alt text** | Google Images is a significant traffic source for diving/travel. Descriptive alt text with keywords helps rank in image search. Original photos with EXIF data are E-E-A-T signals. | MEDIUM | next/image available. Alt text must be keyword-rich and descriptive. Prioritize original dive photos over stock. |
| **HTTPS + security headers** | Ranking signal since 2014. Also a trust signal for lead forms collecting personal data. | LOW | Already configured in next.config.ts with HSTS, X-Frame-Options, etc. |

### Differentiators (Competitive Advantage in SERP)

Features that competitors in this niche (Karlos Simon, SunyTravel, Liveaboard.com) mostly lack. These create competitive moats.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Per-wreck deep pages** (SS Thistlegorm, Abu Nuhas, etc.) | Competitors have generic "Red Sea diving" pages. Deep, expert pages per wreck with deck plans, marine life catalogs, best seasons, difficulty levels capture long-tail keywords ("ss thistlegorm dive depth", "abu nuhas wreck history"). This is the biggest content gap identified in competitor analysis. | MEDIUM | Each wreck page needs: history, specs, dive profile, marine life, photos, difficulty, best season, FAQ. 10-15 wreck pages for initial coverage. |
| **Per-dive-spot pages** (Ras Mohammed, Shark Reef, etc.) | Same strategy as wrecks but for reef dive sites. Captures "ras mohammed diving" style queries. Few Spanish-language sites cover these in depth. | MEDIUM | Similar template to wreck pages but focused on reef topology, currents, marine life encounters, visibility conditions. |
| **FAQ sections with FAQPage schema** | FAQ rich snippets can increase CTR by up to 30%. Google shows 2-3 FAQs directly in SERP. Travel/diving queries have high question intent ("que llevar vida a bordo", "se necesita certificacion"). Competitors largely ignore this. | LOW | Add FAQ accordion sections to pillar pages and key transactional pages. 4-8 genuine user questions per page. Implement FAQPage JSON-LD schema. |
| **Comparison/vs content** ("Ruta Norte vs Ruta Sur", "vida a bordo vs resort") | Mid-funnel researchers actively compare options. These pages capture "[A] vs [B]" queries which have strong purchase intent. No Spanish competitor covers these systematically. | MEDIUM | Structured comparison tables with clear recommendation. Use TouristTrip schema with multiple offers. |
| **"Friction content" guides** (what to pack, visa requirements, insurance, costs breakdown) | Captures bottom-of-funnel users who have decided to go but need logistical info. These queries ("que llevar vida a bordo mar rojo", "precio vida a bordo mar rojo") have high commercial intent. Competitors skip this unglamorous content. | LOW | Template-driven: checklist format, cost tables, practical tips. Low effort per page, high keyword capture. Links naturally to transactional pages. |
| **Seasonal/calendar content** ("mejor epoca bucear mar rojo", monthly conditions) | Time-sensitive queries with recurring annual traffic. Helps users decide when to book. Creates a reason to keep content updated (freshness signal). | LOW | Monthly breakdown page with conditions, marine life highlights, pricing trends. Can be one comprehensive pillar page. |
| **Table of contents (ToC) with anchor links** | Improves user experience on long-form content. Google sometimes uses ToC anchors for featured snippets and jump-to links in SERP. Signals well-structured content. | LOW | Auto-generated from H2/H3 headings. Sticky sidebar on desktop, collapsible on mobile. |
| **Original photography with EXIF metadata** | E-E-A-T signal proving first-hand experience. Google can verify location and timestamp from EXIF data. Original images are harder to replicate than text content. Stock photos are an anti-signal. | MEDIUM | Requires sourcing original dive photos. Store and serve with EXIF intact. Use next/image with proper alt text containing location + dive site name. |
| **Multi-step lead form with context** | Instead of a generic "contact us", a guided form that asks: dive certification level, preferred dates, group size, route preference. Pre-qualifies leads for Odoo CRM. Converts better because it feels personalized. | MEDIUM | Multi-step wizard (3-4 steps). First step asks only name + email (low friction), subsequent steps gather preferences. Submit to Odoo API. |
| **Price indication / cost breakdown content** | "Precio vida a bordo mar rojo" is a key target keyword. Users want ballpark pricing before inquiring. Competitors either hide pricing or only show it on booking pages. Content pages with transparent pricing build trust and capture high-intent traffic. | LOW | Not a live pricing engine -- static content pages with ranges, what's included/excluded, tips for saving money. Updated seasonally. |
| **Related content blocks (automated)** | Keeps users on site, reduces bounce rate, distributes link equity. "Si te interesa Ruta Norte, tambien lee: Pecios de Abu Nuhas, Guia SS Thistlegorm". Strengthens cluster interconnection. | MEDIUM | Component that queries same-cluster content and displays 3-4 related cards at bottom of each article. Based on content type + tags/categories from CMS. |
| **Breadcrumb-based site hierarchy** | Visual navigation showing Home > Rutas > Ruta Norte. When paired with BreadcrumbList schema, Google displays in SERP. Shows depth of content. | LOW | Build reusable Breadcrumb component. Derive path from URL segments + CMS page tree. |

### Anti-Features (Commonly Requested, Often Problematic)

Features to explicitly NOT build. These seem good but hurt SEO, waste dev time, or contradict the business model.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **E-commerce / booking engine** | Out of scope per PROJECT.md. Building booking adds massive complexity (payment processing, availability sync, cancellation policies). The business model is lead capture to Odoo, not direct sales. A half-built booking engine hurts trust more than no booking at all. | Lead capture forms with clear CTA "Consulta disponibilidad". Link to partner booking when needed. |
| **User registration / accounts** | Adds friction, privacy compliance burden (GDPR), and maintenance overhead. A niche SEO site doesn't need user accounts -- the goal is content consumption and lead capture. | Anonymous browsing. Collect only name + email via lead forms. |
| **Blog with generic content** | A "blog" section with random diving tips dilutes topical authority. Every page must serve a keyword strategy. Generic "10 tips for scuba diving" competes with massive authority sites and doesn't build cluster relevance. | All content follows the cluster architecture. No content without a target keyword and cluster assignment. The existing `/blog` route should be renamed or repurposed as a content hub. |
| **Comments / user-generated content** | Spam magnet. Requires moderation. Adds no SEO value for a niche site this size. UGC on travel sites is only valuable at marketplace scale (thousands of reviews like Liveaboard.com). | Curated testimonials from real clients. Display as static content managed in CMS. |
| **Real-time search functionality** | The WebSite JSON-LD currently declares a SearchAction pointing to `/search?q=`. With 30-60 pages, site search is unnecessary and the search results page will be thin content. Crawlers may index low-quality search result pages. | Remove SearchAction from JSON-LD until site is large enough. Use good navigation and internal linking instead. |
| **Multi-language support (for now)** | Spanish-only is the strategic choice -- less competition in Spanish for Red Sea diving content. Adding English means competing with Liveaboard.com, DiveIn.com, and other established English-language authorities. | Keep Spanish-only. Revisit after achieving page 1 rankings for primary Spanish keywords. Add hreflang only when English version is ready. |
| **Social media feed integration** | Embeds from Instagram/Facebook slow page load (hurts Core Web Vitals), add external dependencies, and the content is not crawlable by Google. Social feeds add zero SEO value. | Static, curated photo galleries managed in CMS. Link to social profiles in footer. Use og:image for sharing. |
| **Live chat widget** | Third-party scripts (Intercom, Drift, etc.) bloat JS bundle, hurt LCP, and increase CLS. For a niche site with moderate traffic, WhatsApp CTA is simpler and more effective for the target market (Spanish-speaking divers). | WhatsApp floating button (already exists as FloatingWhatsApp). Link to WhatsApp Business with pre-filled message. |
| **Programmatic SEO at massive scale (100k+ pages)** | This niche has maybe 200-300 viable keywords in Spanish. Generating thousands of thin pages with minor variations will trigger Google's spam detection. Quality over quantity. | Target 60 pages max (as planned). Each page hand-crafted or deeply templated with unique expert content. Expand only after validating cluster rankings. |

## Feature Dependencies

```
JSON-LD Schema (per content type)
    +--requires--> CMS content models (Wagtail page types for wrecks, spots, guides)
    +--requires--> Content type templates (Next.js dynamic routes)

Pillar + Cluster Architecture
    +--requires--> CMS content models (categories, tags, cluster assignment)
    +--requires--> Internal linking system
    +--requires--> Hub page templates

Internal Linking System
    +--requires--> CMS content models (related content fields, cluster tags)
    +--requires--> Related content component
    +--requires--> Breadcrumb component

Lead Capture (full)
    +--requires--> Multi-step form component
    +--requires--> Odoo CRM API integration
    +--enhances--> All content pages (inline CTAs)

FAQ Sections + Schema
    +--requires--> FAQ CMS block type in Wagtail
    +--requires--> FAQ accordion component
    +--enhances--> All pillar and transactional pages

Per-Wreck / Per-Spot Pages
    +--requires--> CMS content models (WreckPage, DiveSpotPage)
    +--requires--> Content type templates
    +--enhances--> Pillar pages (satellites link to hubs)

Comparison Content
    +--requires--> Comparison template component
    +--requires--> At least 2 entity pages to compare
    +--enhances--> Mid-funnel keyword capture

Breadcrumbs (visual + schema)
    +--requires--> URL hierarchy design finalized
    +--enhances--> All content pages
```

### Dependency Notes

- **All content pages require CMS models first:** Wagtail page types must be defined before Next.js templates can consume them. This is the critical path bottleneck.
- **Internal linking requires content to exist:** You can't link to pages that don't exist yet. Build content models and seed initial content before implementing automated internal linking.
- **FAQ schema requires FAQ content in CMS:** Wagtail needs a StreamField block type for FAQ pairs. The accordion component renders them. The JSON-LD is generated from the same data.
- **Lead capture is independent but enhances everything:** The Odoo integration can be built in parallel with content. Once ready, inline CTAs are added to all content templates.
- **Breadcrumbs depend on finalized URL structure:** The URL hierarchy (e.g., `/pecios/ss-thistlegorm` vs `/rutas/ruta-norte/pecios/ss-thistlegorm`) must be decided before building breadcrumbs.

## MVP Definition

### Launch With (v1) -- First 30 Pages

Minimum to start ranking and capturing leads.

- [ ] **CMS content models for all content types** -- Foundation for everything. Wreck pages, dive spot pages, guide pages, route pillar pages in Wagtail.
- [ ] **Pillar hub pages for 2-3 clusters** -- "Vida a Bordo Mar Rojo" (main pillar), "Ruta Norte" (route pillar), "Pecios Mar Rojo" (wreck pillar). These are the highest-volume keywords.
- [ ] **10-15 satellite pages per cluster** -- Wreck deep-dives (Thistlegorm, Abu Nuhas x4, Rosalie Moller), dive spots (Ras Mohammed, Shark Reef), logistics guides (que llevar, precios, certificaciones).
- [ ] **JSON-LD schemas on all pages** -- TouristTrip for routes, Article for guides, Place for dive spots, FAQPage where applicable, BreadcrumbList everywhere.
- [ ] **Internal linking system (basic)** -- Related content blocks at bottom of pages. Hub-to-satellite links in pillar pages. Contextual links in body text.
- [ ] **Lead capture with Odoo integration** -- Multi-step form, WhatsApp CTA, inline form sections on content pages. Leads flow to Odoo CRM.
- [ ] **Breadcrumbs (visual + schema)** -- On all content pages.
- [ ] **FAQ sections on pillar pages** -- With FAQPage JSON-LD.
- [ ] **Sitemap expansion** -- Include all new content types.

### Add After Validation (v1.x) -- Expand to 60 Pages

Features to add once initial rankings are showing movement (4-8 weeks after launch).

- [ ] **Comparison content pages** -- Add once entity pages exist to compare. "Ruta Norte vs Ruta Sur", "vida a bordo vs resort diving".
- [ ] **Seasonal calendar content** -- "Mejor epoca para bucear en el Mar Rojo" pillar page with monthly breakdown.
- [ ] **Additional wreck and spot pages** -- Expand coverage to 60 total pages based on keyword performance data from Google Search Console.
- [ ] **Enhanced internal linking** -- Automated contextual links based on keyword matching in body text. "See also" sidebars.
- [ ] **Image gallery pages per dive site** -- With proper alt text, captions, and Place schema. Captures Google Images traffic.

### Future Consideration (v2+)

Features to defer until solid rankings are established.

- [ ] **English language version** -- Only after Spanish rankings are stable. Requires full hreflang implementation.
- [ ] **Video content / YouTube embeds** -- Video is a strong E-E-A-T signal but requires production investment. Embed only when original video exists.
- [ ] **Interactive dive site maps** -- SVG or Mapbox maps showing dive sites. Engaging but complex to build and maintain.
- [ ] **Newsletter / email sequences** -- Post-lead-capture email nurturing. Requires email platform integration.
- [ ] **Reviews/testimonials system** -- Curated client reviews with Review schema. Only valuable with real, verified reviews.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | SEO Impact | Priority |
|---------|------------|---------------------|------------|----------|
| CMS content models (Wagtail) | HIGH | HIGH | HIGH (enables everything) | P1 |
| Pillar hub pages (3 clusters) | HIGH | MEDIUM | HIGH (topical authority) | P1 |
| Per-wreck deep pages | HIGH | MEDIUM | HIGH (long-tail capture) | P1 |
| JSON-LD schemas (all types) | MEDIUM | MEDIUM | HIGH (rich snippets, 35% CTR boost) | P1 |
| Lead form + Odoo integration | HIGH | MEDIUM | MEDIUM (conversion, not ranking) | P1 |
| Internal linking system | MEDIUM | MEDIUM | HIGH (link equity, crawlability) | P1 |
| Breadcrumbs + schema | MEDIUM | LOW | MEDIUM (SERP display, UX) | P1 |
| FAQ sections + schema | MEDIUM | LOW | HIGH (rich snippets, 30% CTR boost) | P1 |
| Per-spot dive pages | HIGH | MEDIUM | HIGH (long-tail capture) | P1 |
| Friction/logistics guides | HIGH | LOW | HIGH (high-intent keywords) | P1 |
| Sitemap expansion | LOW | LOW | MEDIUM (crawl discovery) | P1 |
| Comparison content | MEDIUM | LOW | MEDIUM (mid-funnel capture) | P2 |
| Seasonal calendar | MEDIUM | LOW | MEDIUM (recurring traffic) | P2 |
| Table of contents component | MEDIUM | LOW | LOW (UX, possible jump links) | P2 |
| Image galleries with schema | MEDIUM | MEDIUM | MEDIUM (image search traffic) | P2 |
| Original photography pipeline | HIGH | HIGH | HIGH (E-E-A-T signal) | P2 |
| Multi-step lead form | MEDIUM | MEDIUM | LOW (conversion, not ranking) | P2 |
| English language version | HIGH | HIGH | HIGH (larger market) | P3 |
| Video content integration | MEDIUM | HIGH | MEDIUM (E-E-A-T, engagement) | P3 |
| Interactive dive maps | MEDIUM | HIGH | LOW (engagement only) | P3 |

**Priority key:**
- P1: Must have for launch -- required for ranking and lead capture
- P2: Should have within 4-8 weeks -- enhances ranking and conversion
- P3: Nice to have -- defer until rankings are established

## Competitor Feature Analysis

| Feature | Karlos Simon | SunyTravel | Liveaboard.com | Our Approach |
|---------|-------------|------------|----------------|--------------|
| Content depth per wreck | None | Minimal (1 paragraph) | Basic listing | Deep expert pages (1500+ words per wreck with specs, dive profile, marine life, FAQ) |
| Cluster architecture | No (single landing page) | No (flat blog) | Yes (destination hubs) | Full pillar + satellite clusters in Spanish |
| Schema markup | Basic (Organization only) | None | Product/Offer schema | Comprehensive: TouristTrip, Article, Place, FAQPage, BreadcrumbList |
| FAQ content | None | None | Generic FAQs page | Per-page FAQ sections with FAQPage schema for rich snippets |
| Comparison content | None | None | Side-by-side boat comparison | Route vs route, liveaboard vs resort, seasonal comparisons |
| Friction/logistics content | None | Minimal | Basic "how it works" | Detailed guides: packing, costs, visas, insurance, certification requirements |
| Lead capture | Contact form | WhatsApp only | Full booking engine | Multi-step qualified form + WhatsApp + Odoo CRM pipeline |
| Internal linking | None | Random blog links | Automated | Cluster-aware related content + contextual body links + breadcrumbs |
| Spanish language | Yes | Yes | No (English only) | Spanish-first with expert content depth -- unique positioning |
| Original photography | Some | Stock photos | User-submitted | Source original dive photos with EXIF data preserved |

## Sources

- [Programmatic SEO Guide 2026](https://backlinko.com/programmatic-seo) -- Content quality requirements, information gain
- [Content Clusters SEO 2026](https://www.xictron.com/en/blog/content-cluster-seo-architecture-2026/) -- 40% traffic increase, AI citation rates
- [SEO for Travel Agencies 2026](https://seoprofy.com/blog/travel-seo/) -- Travel-specific SEO strategies
- [Schema Markup for Travel SEO 2026](https://618media.com/en/blog/schema-markup-for-travel-seo/) -- 35% CTR improvement with schema
- [Schema Markup Strategies for Travel](https://blackbearmedia.io/11-powerful-schema-markup-strategies-for-travel-websites/) -- TouristTrip, Place, FAQ schemas
- [Internal Linking Strategy 2026](https://www.ideamagix.com/blog/internal-linking-strategy-seo-guide-2026/) -- Hub-and-spoke model, 3-click depth rule
- [Content Clusters Topic Authority](https://www.digitalapplied.com/blog/seo-content-clusters-2026-topic-authority-guide) -- Cluster performance metrics
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- Server-rendered structured data implementation
- [FAQ Rich Snippets CTR](https://elfsight.com/blog/how-to-create-a-faq-snippet-on-google/) -- Up to 30% CTR increase
- [Travel SEO 2026 Trends](https://12amagency.com/blog/seo-trends-for-travel/) -- E-E-A-T, EXIF data, experience signals
- Competitor analysis from PROJECT.md context (Karlos Simon, SunyTravel, Liveaboard.com)

---
*Feature research for: SEO niche diving website (Red Sea liveaboard)*
*Researched: 2026-03-06*
