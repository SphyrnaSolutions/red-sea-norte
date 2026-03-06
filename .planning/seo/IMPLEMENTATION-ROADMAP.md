# Implementation Roadmap: buceoenelmarrojo.com

**Milestone:** v2.1 SEO Content
**Prerequisite:** v2.0 Lead Capture (complete)

---

## Fase 0 — Fundacion tecnica (semana 1)

**Goal:** Que Google sepa que existimos y podamos medir.

### Tareas
- [ ] Registrar buceoenelmarrojo.com en Google Search Console
- [ ] Registrar en Bing Webmaster Tools
- [ ] Submit sitemap.xml en ambos
- [ ] Configurar GA4 (o verificar si ya existe)
- [ ] Verificar robots.txt no bloquea nada critico
- [ ] Audit de los 25 blog posts existentes: identificar thin content
- [ ] Solicitar indexacion de las paginas mas importantes

### Entregables
- GSC y Bing verificados
- GA4 con tracking de eventos: lead_submit, cta_click
- Audit de calidad de los 25 posts (keep/rewrite/merge/delete)

---

## Fase 1 — Pillar + Migracion de contenido (semanas 2-3)

**Goal:** Crear la pagina pillar (money page) y reorganizar los blog posts existentes en sus clusters correctos.

### Tareas
- [ ] Crear nueva seccion /pecios/ con template de spot page
- [ ] Crear nueva seccion /spots/ con template
- [ ] Crear nueva seccion /guias/ con template
- [ ] Crear nueva seccion /comparar/ con template
- [ ] Crear pagina PILLAR: /rutas/ruta-norte-pecios-hurghada
  - H1: "Ruta Norte y Pecios del Mar Rojo desde Hurghada"
  - Bloques: resumen, mapa de ruta, spots cards, itinerario dia a dia, requisitos, precio, temporada, FAQ, CTA lead form
- [ ] Migrar blog posts existentes a clusters:
  - /blog/ss-thistlegorm-guia-completa -> /pecios/ss-thistlegorm
  - /blog/ras-mohammed-guia-completa -> /spots/ras-mohammed
  - /blog/abu-nuhas-cementerio-de-barcos -> /pecios/abu-nuhas
  - /blog/giannis-d-abu-nuhas -> /pecios/giannis-d
  - /blog/carnatic-abu-nuhas -> /pecios/carnatic
  - /blog/dunraven-mar-rojo -> /pecios/dunraven
  - /blog/rosalie-moller-mar-rojo -> /pecios/rosalie-moller
  - /blog/shark-yolanda-reef-mar-rojo -> /spots/shark-yolanda
  - /blog/requisitos-ruta-norte-mar-rojo -> /guias/requisitos-ruta-norte
  - /blog/precio-vida-a-bordo-mar-rojo -> /guias/precio-vida-a-bordo
  - /blog/que-incluye-vida-a-bordo-mar-rojo -> /guias/que-incluye-vida-a-bordo
  - /blog/como-llegar-a-hurghada-liveaboard -> /guias/como-llegar-a-hurghada
  - /blog/checklist-vida-a-bordo-mar-rojo -> /guias/checklist-vida-a-bordo
  - /blog/visado-egipto-hurghada -> /guias/visado-egipto
  - /blog/seguro-buceo-dan-egipto -> /guias/seguro-buceo-dan
  - /blog/ruta-norte-vs-ruta-sur-mar-rojo -> /comparar/ruta-norte-vs-sur
  - /blog/hurghada-vs-sharm-liveaboard -> /comparar/hurghada-vs-sharm
  - /blog/pecios-vs-tiburones-mar-rojo -> /comparar/pecios-vs-tiburones
- [ ] Configurar redirects 301 de URLs antiguas a nuevas
- [ ] Implementar breadcrumbs en todas las paginas
- [ ] Anadir schema BlogPosting/Article a todos los contenidos

### Blog posts que quedan en /blog/ (editoriales)
- primer-liveaboard-open-water-mar-rojo
- advanced-a-bordo-mar-rojo
- como-es-un-vida-a-bordo-mar-rojo
- camarotes-comida-wifi-liveaboard
- nitrox-a-bordo-mar-rojo
- temporada-ruta-norte-mar-rojo
- seguridad-buceo-mar-rojo

### Entregables
- Pillar page publicada con lead form
- 18 blog posts migrados a sus clusters con redirects 301
- Breadcrumbs + schema en todas las paginas
- Sitemap actualizado y re-submitted

---

## Fase 2 — Contenido nuevo de alto impacto (semanas 4-6)

**Goal:** Crear las paginas que faltan para completar los clusters principales.

### Nuevas paginas a crear
Pecios (los que no existen aun):
- [ ] /pecios/chrisoula-k — "pecio chrisoula k"
- [ ] /pecios/kimon-m — "pecio kimon m"
- [ ] /pecios/ulysses — "pecio ulysses mar rojo"

Spots:
- [ ] /spots/straits-of-gubal — "estrecho de gubal buceo"
- [ ] /spots/shaab-el-erg — "shaab el erg delfines"

Guias:
- [ ] /guias/mejor-epoca-bucear-mar-rojo — "mejor epoca bucear mar rojo"

Comparativas:
- [ ] /comparar/reefs-wrecks-vs-bde — "reefs and wrecks vs brothers daedalus"

Cursos:
- [ ] /cursos/advanced-a-bordo — migrar/mejorar desde blog

### Calidad minima por pagina
- 1500+ palabras (pecios/spots: 1200+)
- H1 unico con keyword principal
- 3+ H2 con keywords secundarias
- 1+ imagen original (o con alt text descriptivo)
- FAQ section (3-5 preguntas reales de Reddit/foros)
- CTA a lead form (inline o enlace al pillar)
- 3+ enlaces internos (al pillar + a guias relacionadas)
- Schema apropiado (TouristAttraction / Article / Course)
- Meta title < 60 chars, meta description < 155 chars

### Entregables
- 8 paginas nuevas publicadas
- Todos los clusters completos
- Enlazado interno implementado segun reglas

---

## Fase 3 — Optimizacion tecnica SEO (semana 7)

**Goal:** Core Web Vitals, velocidad, crawlability.

### Tareas
- [ ] TECH-05: Eliminar draftMode() para habilitar ISR real
- [ ] TECH-06: Self-host fuentes con next/font/local (Satoshi + Clash Display)
- [ ] Implementar preload de LCP image en homepage
- [ ] Audit de Core Web Vitals con Lighthouse
- [ ] Verificar mobile rendering (formulario, tablas, imagenes)
- [ ] Canonicals correctos en todas las paginas
- [ ] Open Graph images por seccion
- [ ] Verificar que todas las paginas nuevas estan en sitemap

### Entregables
- Lighthouse score > 90 en Performance
- CWV passing en todas las paginas
- ISR activo en homepage y blog

---

## Fase 4 — Escalar contenido + Authority (semanas 8-12)

**Goal:** Contenido de segundo tier, enlazado externo, GEO.

### Tareas contenido
- [ ] Crear paginas de "experiencia a bordo":
  - /blog/como-es-un-dia-en-liveaboard (rewrite del existente)
  - /blog/fotografia-submarina-mar-rojo
  - /blog/mareo-en-liveaboard-consejos
  - /blog/primer-vida-a-bordo-consejos-practicos
- [ ] Crear contenido E-E-A-T:
  - Pagina /sobre-nosotros con bio de Karlos (instructor SSI, experiencia)
  - Testimonios reales de clientes en paginas de ruta
- [ ] Lead magnet: PDF descargable "Checklist vida a bordo" (captura email)

### Tareas authority
- [ ] Link building: directorios de buceo (PADI, SSI, DAN)
- [ ] Registrar en Google Business Profile (si aplica)
- [ ] Submit a directorios de viajes de buceo en espanol
- [ ] Outreach a blogs de buceo para guest posts / menciones

### Tareas tecnicas
- [ ] Implementar hreflang si se decide expandir a otros idiomas
- [ ] Monitorizar canibalizacion de keywords entre paginas
- [ ] Review mensual de GSC: impresiones, CTR, posiciones

### Entregables
- 4+ paginas de contenido editorial
- Pagina sobre-nosotros con E-E-A-T
- 5+ backlinks de directorios de buceo
- PDF lead magnet funcionando

---

## Timeline resumen

| Fase | Semanas | Paginas | Foco |
|------|---------|---------|------|
| 0 - Fundacion | 1 | 0 | GSC, Bing, GA4, audit |
| 1 - Pillar + Migracion | 2-3 | 1 nueva + 18 migradas | Arquitectura, redirects, schema |
| 2 - Contenido nuevo | 4-6 | 8 nuevas | Completar clusters |
| 3 - Optimizacion tecnica | 7 | 0 | CWV, ISR, fuentes |
| 4 - Escalar + Authority | 8-12 | 4+ nuevas | E-E-A-T, backlinks, lead magnet |

**Total paginas al final:** ~55 (27 existentes + 18 migradas + ~10 nuevas)

---

## Dependencias

| Tarea | Depende de |
|-------|-----------|
| Migracion de posts | Templates de cluster en Wagtail o Next.js |
| Redirects 301 | Decidir si contenido vive en Wagtail o como paginas estaticas |
| Schema TouristTrip/Attraction | Datos estructurados por pecio/spot |
| E-E-A-T | Fotos y bio de Karlos |
| Lead magnet PDF | Diseno del PDF |
| GA4 | Acceso a la cuenta de Google del dominio |

## Riesgos

| Riesgo | Mitigacion |
|--------|-----------|
| Thin content en posts existentes | Audit en Fase 0, rewrite antes de migrar |
| Canibalizacion entre paginas similares | Keyword map estricto, 1 keyword = 1 URL |
| Wagtail 500 durante build | Fallback mode ya implementado |
| Sin fotos originales de calidad | Usar fotos de Karlos + stock con alt text descriptivo |
| Google tarda en indexar dominio nuevo | Submit manual + fetch en GSC, enlazado externo |

---

*Roadmap defined: 2026-03-06*
*Aligns with milestone v2.1*
