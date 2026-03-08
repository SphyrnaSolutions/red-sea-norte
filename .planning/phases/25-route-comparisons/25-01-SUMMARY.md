---
phase: 25-route-comparisons
plan: 01
status: complete
---

## Summary

Created and published "Ruta Norte vs Ruta Brothers: Cual Elegir Segun tu Nivel" comparison blog post to Wagtail CMS.

## What was built

- Django management command `populate_comparisons.py` in wagtail-headless-cms repo
- Blog post with slug `ruta-norte-vs-brothers-cual-elegir` (Wagtail page ID: 128)
- HTML comparison table with real data: depths, marine life, level, price, duration
- Profile-based recommendations for 5 diver types (OW, AOW <50, AOW 50+, photographer, first-timer)
- Seasonal guide per route
- 5 authoritative references (SSI, PADI, EEAA, Red Sea Wrecks book, Divers Fleet records)
- Internal links to /rutas/norte-7-dias, /rutas/brothers-daedalus, /rutas/descubre-mar-rojo, /contacto

## Key files

### Created
- wagtail-headless-cms/apps/blog/management/commands/populate_comparisons.py

### Modified
- None (new file)

## Self-Check: PASSED

- [x] Blog post published in Wagtail CMS
- [x] primary_keyword: "ruta norte vs brothers cual elegir nivel"
- [x] cluster_id: routes, schema_type: Article
- [x] Comparison table with factual data
- [x] Profile recommendations section
- [x] References section with external links
- [x] CTAs to /contacto
