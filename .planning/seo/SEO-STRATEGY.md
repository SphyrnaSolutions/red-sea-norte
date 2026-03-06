# SEO Strategy: buceoenelmarrojo.com

**Created:** 2026-03-06
**Business model:** Comision por lead convertido (formulario web -> Odoo CRM -> Karlos cierra)
**Target:** Buceadores hispanohablantes interesados en vida a bordo / Mar Rojo
**Domain age:** Nuevo (marzo 2026)
**Current pages:** 27 (25 blog posts + home + blog listing)
**Search Console:** NO registrado (GSC ni Bing)

---

## 1. Situacion actual

### Lo que tenemos
- Homepage optimizada con lead capture form (nombre, email, telefono, certificacion, mes)
- 25 blog posts en Wagtail CMS (pecios, comparativas, logistica, guias)
- Secciones dinamicas: /rutas, /cursos, /experiencias, /ofertas (con contenido mock/Wagtail)
- Lead form conectado a Odoo CRM via XML-RPC
- Schema JSON-LD (Organization, WebSite)
- Sitemap XML generado automaticamente

### Lo que falta (critico)
- **GSC y Bing Webmaster no configurados** — Google no sabe que existimos
- **Sin GA4** — no medimos nada
- Blog posts sin auditar calidad (pueden ser thin content)
- Sin enlazado interno estrategico
- Fuentes externas causan FOUT (fontshare.com)
- `force-dynamic` en todas las rutas (no ISR)
- Sin schema BlogPosting/Article en los posts
- Sin breadcrumbs

## 2. Arquitectura de contenido (Silo)

Basado en el research de Odoo, la arquitectura es un **hub-and-spoke** con 5 clusters:

```
buceoenelmarrojo.com
|
+-- / (Homepage - landing principal con lead form)
|
+-- /rutas/ (Hub de rutas)
|   +-- /rutas/ruta-norte-pecios-hurghada (PILLAR - money page)
|   +-- /rutas/brothers-daedalus-elphinstone
|   +-- /rutas/st-johns
|
+-- /pecios/ (Cluster pecios - 9 paginas)
|   +-- /pecios/ss-thistlegorm
|   +-- /pecios/abu-nuhas
|   +-- /pecios/giannis-d
|   +-- /pecios/carnatic
|   +-- /pecios/dunraven
|   +-- /pecios/rosalie-moller
|   +-- /pecios/chrisoula-k
|   +-- /pecios/kimon-m
|   +-- /pecios/ulysses
|
+-- /spots/ (Cluster spots - 4 paginas)
|   +-- /spots/ras-mohammed
|   +-- /spots/shark-yolanda
|   +-- /spots/straits-of-gubal
|   +-- /spots/shaab-el-erg
|
+-- /guias/ (Cluster decision/logistica - 8 paginas)
|   +-- /guias/requisitos-ruta-norte
|   +-- /guias/mejor-epoca-bucear-mar-rojo
|   +-- /guias/precio-vida-a-bordo
|   +-- /guias/que-incluye-vida-a-bordo
|   +-- /guias/como-llegar-a-hurghada
|   +-- /guias/checklist-vida-a-bordo
|   +-- /guias/visado-egipto
|   +-- /guias/seguro-buceo-dan
|
+-- /comparar/ (Cluster comparativas - 4 paginas)
|   +-- /comparar/ruta-norte-vs-sur
|   +-- /comparar/hurghada-vs-sharm
|   +-- /comparar/pecios-vs-tiburones
|   +-- /comparar/reefs-wrecks-vs-bde
|
+-- /cursos/ (existente - Wagtail)
|   +-- /cursos/advanced-a-bordo
|   +-- /cursos/nitrox-a-bordo
|
+-- /blog/ (articulos de soporte - ya existen 25)
|
+-- /politica-de-privacidad (existente)
```

### Paginas nuevas necesarias: ~28
### Paginas existentes a migrar/reubicar: 25 blog posts

**Decision clave:** Los 25 blog posts actuales cubren muchos de los temas planificados, pero estan TODOS bajo /blog/. La estrategia es **migrar los mejores a sus clusters correctos** (/pecios/, /guias/, /comparar/) y dejar en /blog/ solo los que son realmente articulos editoriales.

## 3. Keyword map

### Tier 1 — Money keywords (landing pages con CTA)
| Keyword | URL | Vol estimado | Dificultad |
|---------|-----|-------------|------------|
| vida a bordo mar rojo | /rutas/ruta-norte-pecios-hurghada | Media | Baja-Media |
| ruta norte pecios mar rojo hurghada | /rutas/ruta-norte-pecios-hurghada | Baja | Baja |
| precio vida a bordo mar rojo | /guias/precio-vida-a-bordo | Media | Baja |
| liveaboard mar rojo | / (homepage) | Media | Media |
| buceo mar rojo desde hurghada | / (homepage) | Media | Media |

### Tier 2 — Informational (trafico -> enlace a landing)
| Keyword | URL | Vol estimado |
|---------|-----|-------------|
| bucear thistlegorm | /pecios/ss-thistlegorm | Media |
| buceo ras mohammed | /spots/ras-mohammed | Media |
| abu nuhas pecios | /pecios/abu-nuhas | Baja |
| mejor epoca bucear mar rojo | /guias/mejor-epoca-bucear-mar-rojo | Media |
| que llevar a un liveaboard | /guias/checklist-vida-a-bordo | Baja |

### Tier 3 — Long-tail (baja competencia, alta intencion)
| Keyword | URL |
|---------|-----|
| requisitos ruta norte pecios mar rojo | /guias/requisitos-ruta-norte |
| open water vida a bordo mar rojo | /cursos/advanced-a-bordo |
| ruta norte vs brothers mar rojo | /comparar/reefs-wrecks-vs-bde |
| neopreno mar rojo por meses | /guias/mejor-epoca-bucear-mar-rojo |
| corrientes ras mohammed buceo | /spots/ras-mohammed |

## 4. Competencia

### Competidores directos (ES)
1. **viajeskarlossimon.com** — Landing de ruta buena pero sin profundidad SEO por pecio/spot
2. **rojodivesafari.com** — Rutas y pecios, thin content
3. **blueforcefleet.com/es** — Buen contenido de rutas pero no ataca long-tail ES
4. **sunytravel** — Packs y landing, sin cluster SEO

### Competidores indirectos (EN)
5. **liveaboard.com** — Marketplace, excelente cobertura pero en ingles
6. **emperordivers.com** — Itinerarios detallados, en ingles
7. **padi.com** — Authority maxima, fichas de spots

### Gaps identificados (ventaja competitiva)
- Nadie resuelve bien "puedo ir con Open Water?" en una pagina dedicada
- Seguridad en liveaboard (post-incidentes) — genera confianza + leads
- Logistica Hurghada desde Espana mascada (vuelos, visado, transfer)
- Costes reales transparentes (tasas, propinas, extras)
- Guias por pecio con nivel recomendado, condiciones, plan B

## 5. Schema por tipo de pagina

| Tipo | Schema |
|------|--------|
| Homepage | Organization, WebSite, FAQPage |
| Pillar ruta | TouristTrip, FAQPage, BreadcrumbList |
| Pagina pecio/spot | TouristAttraction, BreadcrumbList |
| Guia | Article (HowTo si aplica), BreadcrumbList |
| Comparativa | Article, BreadcrumbList |
| Blog post | BlogPosting, BreadcrumbList |
| Curso | Course, BreadcrumbList |

## 6. Enlazado interno

### Reglas
1. **Toda pagina de pecio/spot enlaza al pillar** (/rutas/ruta-norte-pecios-hurghada)
2. **El pillar enlaza a cada pecio/spot** mencionado en el itinerario
3. **Guias de decision enlazan al pillar** (CTA: "Ver la ruta completa")
4. **Comparativas enlazan a las rutas** que comparan
5. **Blog posts editoriales enlazan a guias** relevantes
6. **Todas las paginas con intencion tienen el lead form** inline o CTA al modal
7. **Breadcrumbs en todas las paginas** (excepto homepage)

### Anchor text
- Variado, no keyword-stuffing
- Preferir anclas descriptivas: "nuestra guia del Thistlegorm" vs "click aqui"

## 7. KPIs

| Metrica | Baseline (hoy) | 3 meses | 6 meses | 12 meses |
|---------|----------------|---------|---------|----------|
| Paginas indexadas | ~0 (sin GSC) | 30+ | 50+ | 60+ |
| Impresiones/mes | 0 | 500+ | 5,000+ | 20,000+ |
| Clicks organicos/mes | 0 | 50+ | 500+ | 2,000+ |
| Keywords top 10 | 0 | 5+ | 20+ | 50+ |
| Leads/mes | 0 | 5+ | 15+ | 40+ |
| Core Web Vitals | Sin medir | Pass | Pass | Pass |

---

*Strategy defined: 2026-03-06*
