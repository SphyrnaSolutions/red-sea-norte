# Blog Audit Report - Phase 09

**Date:** 2026-03-07
**Auditors:** auditor-1 (batch 1, posts 1-9), auditor-2 (batch 2, posts 10-17), auditor-3 (batch 3, posts 18-25)
**Source of truth:** `.planning/seo/PRODUCT-DATA.md` + 5 route files in `.planning/seo/routes/`
**File audited:** `src/lib/mock-data/blog-posts.ts`

---

## 1. Corrections Made

### Batch 1 (Posts 1-9) - auditor-1

**2 corrections:**

1. **precio-vida-a-bordo-mar-rojo** — `factual_error`
   - **Original:** `<li>Nitrox o alquiler de equipo si aplica</li><li>seguro de buceo</li>`
   - **Corrected:** `<li>alquiler de equipo si no llevas el tuyo</li><li>seguro de cancelación</li>`
   - **Reason:** Nitrox 28% is INCLUDED in the price per PRODUCT-DATA.md. Travel insurance (seguro de viaje) is also included; only cancellation insurance (47.75 EUR) is extra.

2. **que-incluye-vida-a-bordo-mar-rojo** — `factual_error`
   - **Original:** `<li>Nitrox</li><li>alquiler de equipo</li><li>seguros</li><li>traslados o noches de hotel si aplican</li>`
   - **Corrected:** `<li>alquiler de equipo</li><li>seguro de cancelación</li>`
   - **Reason:** Nitrox is included. Transfers (traslados aeropuerto-barco-aeropuerto) are included. Travel insurance is included. Only cancellation insurance and equipment rental are genuinely not included.

### Batch 2 (Posts 10-17) - auditor-2

**No corrections needed.** All 8 posts are editorial/satellite support pieces with no specific factual claims about prices, boat specs, training certifier, route names, or included/not-included items.

### Batch 3 (Posts 18-25) - auditor-3

**2 corrections:**

1. **ss-thistlegorm-guia-completa** — `incorrect_dive_count`
   - **Original:** "Únete a nuestra ruta Norte de 7 días que incluye 2 inmersiones en este pecio legendario"
   - **Corrected:** "Únete a nuestra ruta Norte de 7 días que incluye inmersiones en este pecio legendario"
   - **Reason:** Route data shows a full day (3 immersions) at SS Thistlegorm, not just 2. Removed specific number to avoid inaccuracy.

2. **ss-thistlegorm-guia-completa** — `incorrect_certification_requirement`
   - **Original:** "Recomendamos al menos Advanced Open Water o equivalente, con experiencia reciente en profundidad y pecios."
   - **Corrected:** "La certificación mínima es Open Water Diver (de cualquier certificadora). Si no tienes el Advanced, puedes obtenerlo gratis a bordo con el Curso Avanzado SSI incluido en el viaje."
   - **Reason:** Source of truth states Open Water is the minimum for ALL routes, and Advanced SSI course is included FREE. Original implied Advanced was required.

---

## 2. Posts Verified Clean (No Factual Errors Found)

**21 of 25 posts** had no factual errors (4 posts corrected: 2 in batch 1, 2 in batch 3).

### Batch 1 - 7 clean:
- requisitos-ruta-norte-mar-rojo
- como-llegar-a-hurghada-liveaboard
- primer-liveaboard-open-water-mar-rojo
- ruta-norte-vs-ruta-sur-mar-rojo
- hurghada-vs-sharm-liveaboard
- abu-nuhas-cementerio-de-barcos
- giannis-d-abu-nuhas

### Batch 2 - All 8 clean:
- dunraven-mar-rojo
- advanced-a-bordo-mar-rojo
- visado-egipto-hurghada
- checklist-vida-a-bordo-mar-rojo
- pecios-vs-tiburones-mar-rojo
- como-es-un-vida-a-bordo-mar-rojo
- camarotes-comida-wifi-liveaboard
- nitrox-a-bordo-mar-rojo

### Batch 3 - 6 clean:
- carnatic-abu-nuhas
- shark-yolanda-reef-mar-rojo
- rosalie-moller-mar-rojo
- temporada-ruta-norte-mar-rojo
- seguro-buceo-dan-egipto
- (ras-mohammed-guia-completa and seguridad-buceo-mar-rojo have empty bodies — nothing to verify)

---

## 3. Thin Content Assessment

**Criteria:** <800 words = thin. Also flagged: duplicates other posts, no unique angle, generic filler.
**Recommendations:** OK / rewrite / merge with [slug] / delete

| # | Slug | ~Words | Differential Value | Recommendation | Reason |
|---|------|--------|--------------------|----------------|--------|
| 1 | requisitos-ruta-norte-mar-rojo | 850 | High | OK | Only post above 800 words. Strong pillar: OW vs AOW segmentation, accordion FAQ, good internal linking. Addresses core purchase objection. |
| 2 | precio-vida-a-bordo-mar-rojo | 650 | High | OK | Addresses top-of-funnel price objection with cost breakdown framework. Good commercial intent capture. Second longest post. |
| 3 | que-incluye-vida-a-bordo-mar-rojo | 500 | Medium | OK | Resolves "todo incluido" confusion. Complements price post without duplicating it. |
| 4 | como-llegar-a-hurghada-liveaboard | 400 | Medium | OK | Reduces logistics friction. Unique angle (Hurghada-specific arrival). |
| 5 | primer-liveaboard-open-water-mar-rojo | 500 | Medium-High | OK | Strong emotional funnel piece for OW divers considering first liveaboard. Distinct from #1 (level-focused vs experience-focused). |
| 6 | ruta-norte-vs-ruta-sur-mar-rojo | 500 | Medium | OK | Useful comparativa for route decision. Captures comparison search intent. |
| 7 | hurghada-vs-sharm-liveaboard | 350 | Low | rewrite | Valid search intent but thin on substance. Needs actual comparison data: flights, logistics, routes from each port, price differences. |
| 8 | abu-nuhas-cementerio-de-barcos | 250 | Low-Medium | rewrite | Valid long-tail target but too thin. Needs wreck names with depths, years, what makes each special. Data available in route files. |
| 9 | giannis-d-abu-nuhas | 150 | Low | merge with abu-nuhas-cementerio-de-barcos | Extremely thin. No factual dive data (depth 10-27m, year 1983, features). Better as section within abu-nuhas post. |
| 10 | dunraven-mar-rojo | 120 | Low | merge with abu-nuhas-cementerio-de-barcos | Extremely thin. No depth (5-28m), history (1876), or dive details. Better as section in consolidated wrecks post. |
| 11 | advanced-a-bordo-mar-rojo | 180 | Medium | rewrite | Good angle (when Advanced adds value vs not) but too thin. Needs concrete SSI course details, what 4 specialties include, how certification works aboard. |
| 12 | visado-egipto-hurghada | 110 | Low | rewrite | Valid search intent but zero actual visa info. Needs: online visa 30 EUR, process, timeline, how it connects to Hurghada arrival. |
| 13 | checklist-vida-a-bordo-mar-rojo | 130 | Low | rewrite | Claims to be a checklist but contains no actual checklist items. Just meta-commentary about what a checklist should do. Needs real packing list. |
| 14 | pecios-vs-tiburones-mar-rojo | 140 | Low-Medium | rewrite | Good comparison angle but no actual data. Needs route names (Norte y Pecios vs Sur BDE), what each offers, price from/to. |
| 15 | como-es-un-vida-a-bordo-mar-rojo | 150 | Medium | rewrite | Good search intent but only meta-commentary. Needs actual daily schedule, meal times, dive briefing flow, M/Y Dolce Vita cabin details. |
| 16 | camarotes-comida-wifi-liveaboard | 100 | Low | merge with como-es-un-vida-a-bordo-mar-rojo | Extremely thin. Same topic (life aboard) with zero actual info about M/Y Dolce Vita cabins, food, or wifi. |
| 17 | nitrox-a-bordo-mar-rojo | 90 | Low | rewrite | Valid technical topic but zero actual nitrox info. Needs: 28% included free, how SSI certification works aboard, benefits for repetitive diving. |
| 18 | carnatic-abu-nuhas | 100 | Low | merge with abu-nuhas-cementerio-de-barcos | Extremely thin. No dive data (depth 18-25m, year 1869). Better as section in consolidated Abu Nuhas post. |
| 19 | shark-yolanda-reef-mar-rojo | 80 | Low | merge with ras-mohammed-guia-completa | Extremely thin. No actual spot data. Shark/Yolanda is part of Ras Mohammed -- merge there when that post is rewritten. |
| 20 | rosalie-moller-mar-rojo | 100 | Low | rewrite | Valid long-tail but no depth (30-50m), history (WWII), or dive details. Factual content available in ruta-norte-pecios route file. |
| 21 | temporada-ruta-norte-mar-rojo | 90 | Low | rewrite | Valid commercial intent but no actual season data. Needs water temps by month (22-30C), visibility patterns, crowd levels. |
| 22 | seguro-buceo-dan-egipto | 95 | Low | rewrite | Valid objection-handling topic but zero actual insurance info. Needs: travel insurance included in price, cancellation insurance 47.75 EUR optional, DAN recommendation. |
| 23 | ss-thistlegorm-guia-completa | 450 | High | OK | Best content post in the blog. Actual historical data (1941, Sunderland), dive details (30m depth), cargo inventory, Cousteau quote. Solid pillar. |
| 24 | ras-mohammed-guia-completa | 20 | None | rewrite | Empty body (`body: []`). Only has title/excerpt. Needs full content: dive sites (Shark/Yolanda Reef), depths (5-40m+), marine life. |
| 25 | seguridad-buceo-mar-rojo | 20 | None | rewrite | Empty body (`body: []`). Only has title/excerpt. Needs full safety guide: currents, depths, emergency procedures, DAN/insurance. |

---

## 4. Summary Statistics

| Metric | Value |
|--------|-------|
| Total posts audited | 25 |
| Posts with factual corrections | 3 posts / 4 individual fixes |
| Posts verified clean (no errors) | 21 |
| Posts rated OK (no action needed) | 7 |
| Posts needing rewrite | 12 |
| Posts to merge into others | 5 (#9, #10, #16, #18, #19) |
| Posts to delete | 0 |
| Empty body posts | 2 (#24, #25) |
| Posts >= 800 words | 1 (#1) |
| Posts 400-799 words | 5 (#2, #3, #5, #6, #23) |
| Posts 100-399 words | 12 (#4, #7-#15, #17, #20) |
| Posts < 100 words | 7 (#16, #18, #19, #21, #22, #24, #25) |

---

## 5. Key Findings

1. **Severe thin content problem:** 19 of 25 posts are under 400 words. 7 posts are under 100 words. Most satellite posts (10-22) are meta-commentary about what the page *should* do rather than actual content that delivers on the title's promise.

2. **Two empty posts:** `ras-mohammed-guia-completa` and `seguridad-buceo-mar-rojo` have `body: []` -- completely empty, no renderable content.

3. **Duplicate topic clusters that should be consolidated:**
   - **Abu Nuhas wrecks:** 4 separate posts (#8 abu-nuhas, #9 giannis-d, #10 dunraven, #18 carnatic) that could be one strong 1500+ word piece with actual dive data from route files.
   - **Life aboard:** 3 posts (#13 checklist, #15 como-es, #16 camarotes) covering cabin/food/routine with no actual M/Y Dolce Vita content.
   - **Ras Mohammed:** #19 shark-yolanda should merge into #24 ras-mohammed when rewritten.

4. **Only 7 posts are viable as-is:** Posts #1 (requisitos), #2 (precio), #3 (que-incluye), #4 (como-llegar), #5 (primer-liveaboard), #6 (norte-vs-sur), and #23 (thistlegorm). These have enough structure and unique angles to function, though all except #1 would benefit from expansion.

5. **Error pattern -- inclusions/exclusions confusion:** Both corrections in batch 1 involved incorrectly listing included items (nitrox, transfers, travel insurance) as extras. This suggests the content was written without consulting the route files' "Incluido en el precio" sections.

6. **Error pattern -- certification requirements:** The Thistlegorm post incorrectly required Advanced, when all routes accept Open Water minimum. This is a critical error since it could deter qualified leads.

---

## 6. Merge Plan (5 posts to consolidate)

| Post to Merge | Target Post | Rationale |
|---------------|-------------|-----------|
| #9 giannis-d-abu-nuhas | #8 abu-nuhas-cementerio-de-barcos | Giannis D is one of the Abu Nuhas wrecks; add as dedicated section with dive data (10-27m, 1983) |
| #10 dunraven-mar-rojo | #8 abu-nuhas-cementerio-de-barcos | Dunraven is nearby wreck; add as section (5-28m, 1876) |
| #18 carnatic-abu-nuhas | #8 abu-nuhas-cementerio-de-barcos | Carnatic is one of the Abu Nuhas wrecks; add as section (18-25m, 1869) |
| #16 camarotes-comida-wifi-liveaboard | #15 como-es-un-vida-a-bordo-mar-rojo | Same topic (life aboard); merge cabin/food/wifi into the daily life post |
| #19 shark-yolanda-reef-mar-rojo | #24 ras-mohammed-guia-completa | Shark/Yolanda Reef is within Ras Mohammed; natural section when #24 is rewritten |

After merges, the blog would go from 25 to 20 posts, with stronger consolidated pieces instead of thin stubs.

---

*Report compiled: 2026-03-07. All 3 audit batches complete. All corrections applied directly in `src/lib/mock-data/blog-posts.ts` by the respective auditors.*
