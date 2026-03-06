# Red Sea Norte

## What This Is

Web nicho en Next.js sobre buceo y vida a bordo en el Mar Rojo, centrada en rutas que salen desde Hurghada (especialmente la Ruta Norte y Pecios). Consume contenido de un Wagtail headless CMS (carpeta hermana) y su objetivo principal es posicionarse en SEO para keywords de buceo en el Mar Rojo en español y capturar leads para safaris de buceo.

## Core Value

Posicionar la web como referencia SEO en español para "vida a bordo mar rojo" / "buceo mar rojo" y convertir ese tráfico en leads cualificados para safaris de buceo desde Hurghada vía Odoo CRM.

## Requirements

### Validated

- Site Next.js funcional con routing y estructura base — existing
- Integración con Wagtail headless CMS para contenido — existing
- Homepage con secciones de rutas, pecios y puntos de inmersión — existing
- Componentes UI base (hero, cards, CTAs) — existing

### Active

- [ ] Arquitectura SEO completa: mapa web de 60 páginas organizadas en clusters (pilar + satélites)
- [ ] Homepage optimizada para SEO y leads: H1 con keywords, formulario visible, CTAs repetidos
- [ ] 30 primeras páginas de contenido SEO (clusters: vida a bordo, rutas, pecios, destinos, logística)
- [ ] Plantilla SEO estándar para artículos (H1, meta, estructura H2/H3, interlinking automático)
- [ ] Modelos de Wagtail ampliados/mejorados para soportar tipos de contenido específicos (rutas, pecios, guías, spots)
- [ ] Contenido generado siguiendo keywords y gaps identificados en análisis competitivo
- [ ] Tabla de contenidos con keywords principales y secundarias por página
- [ ] Silo de Ruta Norte + Pecios: hub transaccional + satélites informativos (Thistlegorm, Abu Nuhas, Ras Mohammed, etc.)
- [ ] Captación de leads conectada a Odoo CRM (formularios de contacto/reserva)
- [ ] SEO técnico completo: schema markup, sitemap XML, meta tags, Open Graph, canonical URLs

### Out of Scope

- Otras webs nicho o destinos fuera del Mar Rojo — centrados 100% aquí por ahora
- Pasarela de pago / e-commerce — el modelo es captación de leads, no venta directa
- App móvil — web responsive es suficiente
- Contenido en idiomas distintos al español — primera fase solo ES
- Blog genérico — todo el contenido sigue la estrategia SEO por clusters

## Context

- **Competencia analizada**: Karlos Simón (buena landing pero sin profundidad SEO), agencias tipo SunyTravel (flojas en contenido experto), Liveaboard.com (marketplace). Hay huecos claros en contenido experto por pecio, comparativas de rutas, y contenido de "fricción" (qué llevar, requisitos, seguridad, etc.)
- **Keywords objetivo**: "vida a bordo mar rojo", "buceo mar rojo", "liveaboard red sea", "ruta norte mar rojo", "ss thistlegorm", "precio vida a bordo", etc.
- **Wagtail CMS**: Existe en carpeta hermana con algunos modelos, pero necesita ampliación para soportar los tipos de contenido específicos del nicho
- **Stack actual**: Next.js 15 + React 19 + Tailwind CSS 4 + TypeScript, consumiendo API de Wagtail
- **Odoo**: Se usará como CRM para recibir leads del formulario de la web

## Constraints

- **CMS**: Wagtail headless — todo el contenido debe poder gestionarse desde el CMS
- **Stack**: Next.js (ya implementado) — no cambiar framework
- **SEO-first**: Cada página debe seguir la plantilla SEO estándar definida en las tareas de Odoo
- **Leads**: Formularios deben conectar con Odoo CRM vía API

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + Wagtail headless | Stack ya implementado, separación frontend/CMS | -- Pending |
| Clusters SEO como arquitectura de contenido | Demostrar autoridad temática en Google, mejor posicionamiento | -- Pending |
| 30 páginas como primer lanzamiento | Cubrir nicho base sin canibalización, luego escalar a 60 | -- Pending |
| Odoo CRM para leads | Ya disponible en la infraestructura del cliente | -- Pending |
| Español como idioma principal | Mercado objetivo hispanohablante con menos competencia SEO | -- Pending |

---
*Last updated: 2026-03-06 after initialization*
