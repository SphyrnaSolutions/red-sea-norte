"""
Inject bidirectional internal links into existing blog posts and rutas.
Phase 27, Plan 03: CLUST-02

Updates 25 existing blog posts and 5 existing rutas to add links pointing to
the 30 new pages created in phases 24-26 and phase 27-01 (pillar pages).

Pattern: append a rich_text block (id prefix: rl27-) to existing blog post bodies.
For rutas: append resource blocks to resources_items StreamField.

Run via SSH stdin pipe:
  cat scripts/update_existing_posts_interlinks.py | ssh -p 22222 mandycs@213.239.201.108 \
    "docker exec -i redsea_web_prod python manage.py shell"

Idempotent: skips pages that already have a block with id starting with 'rl27-'.
"""
import os
import sys
import json
import uuid

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

from apps.blog.models import BlogPostPage
from apps.rutas.models import RutaPage

print("=" * 60)
print("Phase 27-03: Bidirectional Interlink Injection")
print("=" * 60)

# =============================================================================
# Step 1: Resolve pillar page slugs dynamically
# =============================================================================

print("\n[1/4] Resolving pillar page slugs...")

pillar_slugs = {}
for cluster in ['pecios', 'destinos', 'vida-a-bordo', 'logistica', 'rutas']:
    pillar = BlogPostPage.objects.filter(cluster_role='pillar', cluster_id=cluster).first()
    if pillar:
        pillar_slugs[cluster] = pillar.slug
        print(f"  [pillar:{cluster}] -> {pillar.slug}")
    else:
        print(f"  WARNING: No pillar found for cluster '{cluster}'")
        pillar_slugs[cluster] = None

# =============================================================================
# Step 2: Resolve new satellite page slugs by querying production
# =============================================================================

print("\n[2/4] Resolving satellite page slugs...")

# Map logical name -> actual slug (verified from production API 2026-03-10)
NEW_SLUGS = {
    # Phase 24: Pecios satellites
    'tile-wreck-abu-nuhas': 'tile-wreck-abu-nuhas-guia-buceo',
    'kimon-m-abu-nuhas': 'kimon-m-abu-nuhas-historia-buceo',
    'marcus-abu-nuhas': 'marcus-abu-nuhas-pecio-desconocido',
    'bucear-ss-thistlegorm-interior': 'bucear-ss-thistlegorm-interior-cubierta',
    'estrecho-gubal-pecios-arrecifes': 'estrecho-gubal-pecios-arrecifes-buceo',
    # Phase 24: Destinos satellites
    'anemone-city-ras-mohammed': 'anemone-city-ras-mohammed-guia-buceo',
    'vida-marina-mar-rojo-especies': 'vida-marina-mar-rojo-especies-buceo',
    # Phase 25: Comparisons / Rutas satellites
    'ruta-norte-vs-brothers': 'ruta-norte-vs-brothers-cual-elegir',
    'hurghada-o-sharm-puerto-liveaboard': 'hurghada-o-sharm-puerto-liveaboard',
    'mejor-ruta-vida-a-bordo-nivel': 'mejor-ruta-vida-a-bordo-nivel-buceo',
    # Phase 26: Logistica satellites
    'que-llevar-liveaboard-packing-list': 'que-llevar-liveaboard-packing-list',
    'certificaciones-buceo-mar-rojo': 'certificaciones-buceo-mar-rojo',
    'seguro-buceo-camara-hiperbarica': 'seguro-buceo-camara-hiperbarica-egipto',
    'visa-egipto-vuelos-transfers': 'visa-egipto-vuelos-transfers-buceadores',
    'propinas-dinero-liveaboard': 'propinas-dinero-liveaboard-buceo',
    # Phase 26: Vida a bordo satellites
    'dia-tipico-liveaboard': 'dia-tipico-liveaboard-buceo',
    'formacion-buceo-a-bordo-ssi': 'formacion-buceo-bordo-ssi-especialidades',
    'gastronomia-liveaboard-comida': 'gastronomia-liveaboard-comida-bordo',
    'buceo-nocturno-mar-rojo': 'buceo-nocturno-mar-rojo',
    'corrientes-mar-rojo-guia': 'corrientes-mar-rojo-buceo-guia',
}

def slug(key):
    """Resolve a logical link key to actual production slug."""
    if key in NEW_SLUGS:
        return NEW_SLUGS[key]
    if key in pillar_slugs.values():
        return key
    # Try pillar lookup by cluster name
    return pillar_slugs.get(key, key)


def pillar(cluster):
    """Get pillar slug for a cluster."""
    return pillar_slugs.get(cluster)


print(f"  Resolved {len(NEW_SLUGS)} new page slugs")

# =============================================================================
# Step 3: Define link maps for blog posts and rutas
# =============================================================================

print("\n[3/4] Defining link maps...")

# Each entry: slug -> list of (link_slug, anchor_text)
BLOG_LINKS = {
    # Group A: Pecios cluster
    'abu-nuhas-cementerio-de-barcos': [
        (slug('tile-wreck-abu-nuhas'), 'guia del Tile Wreck en Abu Nuhas'),
        (slug('kimon-m-abu-nuhas'), 'guia del Kimon M'),
        (slug('marcus-abu-nuhas'), 'el pecio Marcus de Abu Nuhas'),
        (pillar('pecios'), 'guia completa de pecios del Mar Rojo'),
    ],
    'giannis-d-abu-nuhas': [
        (slug('tile-wreck-abu-nuhas'), 'Tile Wreck, otro pecio de Abu Nuhas'),
        (slug('kimon-m-abu-nuhas'), 'Kimon M en Abu Nuhas'),
    ],
    'carnatic-abu-nuhas': [
        (slug('tile-wreck-abu-nuhas'), 'Tile Wreck en Abu Nuhas'),
        (slug('kimon-m-abu-nuhas'), 'Kimon M'),
    ],
    'ss-thistlegorm-guía-completa': [
        (slug('bucear-ss-thistlegorm-interior'), 'bucear en el interior del Thistlegorm'),
        (pillar('pecios'), 'todos los pecios del Mar Rojo'),
    ],
    'dunraven-mar-rojo': [
        (slug('estrecho-gubal-pecios-arrecifes'), 'pecios del Estrecho de Gubal'),
        (pillar('pecios'), 'guia de pecios del Mar Rojo'),
    ],
    'rosalie-moller-mar-rojo': [
        (slug('estrecho-gubal-pecios-arrecifes'), 'Estrecho de Gubal y sus pecios'),
        (slug('buceo-nocturno-mar-rojo'), 'buceo nocturno en el Mar Rojo'),
    ],
    'pecios-vs-tiburones-mar-rojo': [
        (pillar('pecios'), 'guia completa de pecios'),
        (slug('vida-marina-mar-rojo-especies'), 'especies del Mar Rojo'),
    ],

    # Group B: Destinos cluster
    'ras-mohammed-guía-completa': [
        (slug('anemone-city-ras-mohammed'), 'Anemone City en Ras Mohammed'),
        (pillar('destinos'), 'destinos de buceo en el Mar Rojo'),
    ],
    'shark-yolanda-reef-mar-rojo': [
        (slug('anemone-city-ras-mohammed'), 'Anemone City, otro spot de Ras Mohammed'),
        (slug('vida-marina-mar-rojo-especies'), 'vida marina del Mar Rojo'),
    ],

    # Group C: Rutas cluster
    'ruta-norte-vs-ruta-sur-mar-rojo': [
        (slug('ruta-norte-vs-brothers'), 'Ruta Norte vs Brothers'),
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'mejor ruta segun tu nivel'),
        (pillar('rutas'), 'guia completa de rutas'),
    ],
    'hurghada-vs-sharm-liveaboard': [
        (slug('hurghada-o-sharm-puerto-liveaboard'), 'mejor puerto para tu liveaboard'),
        (pillar('rutas'), 'guia de rutas de vida a bordo'),
    ],
    'temporada-ruta-norte-mar-rojo': [
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'elegir ruta segun tu nivel'),
        (pillar('rutas'), 'guia de rutas'),
    ],

    # Group D: Logistica cluster
    'requisitos-ruta-norte-mar-rojo': [
        (slug('certificaciones-buceo-mar-rojo'), 'certificaciones de buceo para el Mar Rojo'),
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'mejor ruta segun tu nivel'),
    ],
    'advanced-a-bordo-mar-rojo': [
        (slug('formacion-buceo-a-bordo-ssi'), 'formacion completa a bordo: SSI y especialidades'),
        (slug('certificaciones-buceo-mar-rojo'), 'certificaciones recomendadas'),
    ],
    'visado-egipto-hurghada': [
        (slug('visa-egipto-vuelos-transfers'), 'guia completa de logistica'),
        (pillar('logistica'), 'guia de logistica para bucear'),
    ],
    'como-llegar-a-hurghada-liveaboard': [
        (slug('visa-egipto-vuelos-transfers'), 'visa, vuelos y transfers'),
        (pillar('logistica'), 'guia de logistica completa'),
    ],
    'seguro-buceo-dan-egipto': [
        (slug('seguro-buceo-camara-hiperbarica'), 'seguro de buceo y camara hiperbarica'),
        (pillar('logistica'), 'guia de logistica'),
    ],
    'seguridad-buceo-mar-rojo': [
        (slug('corrientes-mar-rojo-guia'), 'corrientes en el Mar Rojo'),
        (slug('seguro-buceo-camara-hiperbarica'), 'seguro y camara hiperbarica'),
    ],
    'checklist-vida-a-bordo-mar-rojo': [
        (slug('que-llevar-liveaboard-packing-list'), 'que llevar a un liveaboard'),
        (pillar('logistica'), 'guia de logistica'),
    ],

    # Group E: Vida a bordo cluster
    'como-es-un-vida-a-bordo-mar-rojo': [
        (slug('dia-tipico-liveaboard'), 'un dia tipico en un liveaboard'),
        (pillar('vida-a-bordo'), 'guia definitiva de vida a bordo'),
    ],
    'camarotes-comida-wifi-liveaboard': [
        (slug('gastronomia-liveaboard-comida'), 'gastronomia a bordo en detalle'),
        (pillar('vida-a-bordo'), 'guia de vida a bordo'),
    ],
    'que-incluye-vida-a-bordo-mar-rojo': [
        (pillar('vida-a-bordo'), 'guia definitiva de vida a bordo'),
        (slug('propinas-dinero-liveaboard'), 'propinas y dinero extra'),
    ],
    'precio-vida-a-bordo-mar-rojo': [
        (slug('propinas-dinero-liveaboard'), 'propinas y gastos extra en un liveaboard'),
        (pillar('vida-a-bordo'), 'guia de vida a bordo'),
    ],
    'nitrox-a-bordo-mar-rojo': [
        (slug('formacion-buceo-a-bordo-ssi'), 'formacion a bordo SSI'),
        (pillar('vida-a-bordo'), 'guia de vida a bordo'),
    ],
    'primer-liveaboard-open-water-mar-rojo': [
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'mejor ruta segun tu nivel'),
        (slug('certificaciones-buceo-mar-rojo'), 'certificaciones para el Mar Rojo'),
        (pillar('vida-a-bordo'), 'guia de vida a bordo'),
    ],
}

# Ruta links: ruta_slug -> list of (blog_slug, anchor_text, description)
# RutaPage uses resources_items StreamField with StructBlock(title, description, href, label)
RUTA_LINKS = {
    'norte-pecios': [
        (slug('bucear-ss-thistlegorm-interior'), 'Bucear en el interior del SS Thistlegorm', 'Guia detallada de la inmersion en el famoso pecio de la Ruta Norte.', 'Ver guia'),
        (pillar('pecios'), 'Guia de Pecios del Mar Rojo', 'Todos los pecios que puedes bucear en el Mar Rojo desde un liveaboard.', 'Ver guia'),
        (slug('ruta-norte-vs-brothers'), 'Ruta Norte vs Brothers: comparativa', 'Cual de las dos rutas encaja mejor con tu nivel y objetivos.', 'Comparar rutas'),
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'Mejor ruta segun tu nivel de buceo', 'Recomendacion personalizada segun tu certificacion y experiencia.', 'Elegir ruta'),
        (pillar('rutas'), 'Todas las rutas de vida a bordo', 'Catalogo completo de rutas disponibles en el Mar Rojo.', 'Ver todas'),
    ],
    'norte-tiran': [
        (slug('ruta-norte-vs-brothers'), 'Ruta Norte vs Brothers: cual elegir', 'Comparativa detallada entre las dos rutas del norte del Mar Rojo.', 'Comparar'),
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'Mejor ruta segun tu nivel', 'Recomendacion personalizada para elegir tu ruta ideal.', 'Elegir ruta'),
        (pillar('rutas'), 'Guia completa de rutas', 'Catalogo completo de rutas de vida a bordo disponibles.', 'Ver todas'),
    ],
    'tiran-blue-hole': [
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'Mejor ruta segun tu nivel de buceo', 'Descubre cual es la ruta ideal para tu certificacion y experiencia.', 'Elegir ruta'),
        (pillar('rutas'), 'Guia de rutas de vida a bordo', 'Catalogo completo de todas las rutas disponibles en el Mar Rojo.', 'Ver guia'),
    ],
    'norte-brothers': [
        (slug('ruta-norte-vs-brothers'), 'Ruta Norte vs Ruta Brothers: comparativa', 'Analisis comparativo entre las dos rutas mas populares del norte.', 'Comparar rutas'),
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'Mejor ruta segun tu nivel', 'Recomendacion personalizada para elegir tu proxima aventura.', 'Elegir ruta'),
        (pillar('rutas'), 'Guia de rutas', 'Todos los itinerarios de vida a bordo en el Mar Rojo.', 'Ver guia'),
    ],
    'sur-bde': [
        (slug('mejor-ruta-vida-a-bordo-nivel'), 'Mejor ruta segun tu nivel de buceo', 'Compara Brothers, Daedalus y Elphinstone con otras rutas segun tu nivel.', 'Elegir ruta'),
        (slug('certificaciones-buceo-mar-rojo'), 'Certificaciones minimas para el Mar Rojo', 'Requisitos de certificacion para las rutas avanzadas del sur.', 'Ver requisitos'),
        (pillar('rutas'), 'Guia completa de rutas', 'Catalogo de todas las rutas de vida a bordo disponibles.', 'Ver guia'),
    ],
}

print(f"  Blog posts to update: {len(BLOG_LINKS)}")
print(f"  Rutas to update: {len(RUTA_LINKS)}")

# =============================================================================
# Step 4: Apply updates
# =============================================================================

print("\n[4/4] Applying updates...")
print("-" * 60)

blog_updated = 0
blog_skipped = 0
blog_notfound = 0

for post_slug, links in BLOG_LINKS.items():
    # Try to find the page by slug
    post = BlogPostPage.objects.filter(slug=post_slug).first()
    if not post:
        print(f"  NOT FOUND: {post_slug}")
        blog_notfound += 1
        continue

    # Check idempotency: if any block already has 'rl27-' id prefix, skip
    raw_data = post.body._raw_data
    already_updated = any(
        str(block.get('id', '')).startswith('rl27-')
        for block in raw_data
    )
    if already_updated:
        print(f"  SKIP: {post_slug} (already has rl27- block)")
        blog_skipped += 1
        continue

    # Filter out None slugs (missing pillars)
    valid_links = [(ls, at) for ls, at in links if ls is not None]
    if not valid_links:
        print(f"  SKIP: {post_slug} (no valid link targets)")
        blog_skipped += 1
        continue

    # Build related links HTML
    link_items = [
        f'<a href="/blog/{link_slug}/">{anchor}</a>'
        for link_slug, anchor in valid_links
    ]
    related_html = (
        '<p><strong>Articulos relacionados:</strong> '
        + ', '.join(link_items)
        + '.</p>'
    )

    # Build the new block
    block_id = f'rl27-{post_slug[:20]}'
    new_block = {
        'type': 'rich_text',
        'value': related_html,
        'id': block_id,
    }

    # Append block and save
    new_raw = list(raw_data) + [new_block]
    post.body = json.dumps(new_raw)
    revision = post.save_revision()
    revision.publish()

    print(f"  UPDATED: {post_slug} (+{len(valid_links)} links)")
    blog_updated += 1

print(f"\nBlog posts: {blog_updated} updated, {blog_skipped} skipped, {blog_notfound} not found")
print("-" * 60)

ruta_updated = 0
ruta_skipped = 0
ruta_notfound = 0

for ruta_slug, links in RUTA_LINKS.items():
    ruta = RutaPage.objects.filter(slug=ruta_slug).first()
    if not ruta:
        print(f"  NOT FOUND: {ruta_slug}")
        ruta_notfound += 1
        continue

    # Check idempotency: look for 'rl27-' in resources_items titles
    raw_ri = ruta.resources_items._raw_data
    already_updated = any(
        str(block.get('id', '')).startswith('rl27-')
        for block in raw_ri
    )
    if already_updated:
        print(f"  SKIP: {ruta_slug} (already has rl27- block)")
        ruta_skipped += 1
        continue

    # Filter out None slugs
    valid_links = [(ls, title, desc, label) for ls, title, desc, label in links if ls is not None]
    if not valid_links:
        print(f"  SKIP: {ruta_slug} (no valid link targets)")
        ruta_skipped += 1
        continue

    # Build resource blocks (one per link)
    new_blocks = []
    for i, (link_slug, title, desc, label) in enumerate(valid_links):
        block_id = f'rl27-{ruta_slug[:15]}-{i}'
        new_blocks.append({
            'type': 'resource',
            'value': {
                'title': title,
                'description': desc,
                'href': f'/blog/{link_slug}/',
                'label': label,
            },
            'id': block_id,
        })

    # Append blocks and save
    new_raw = list(raw_ri) + new_blocks
    ruta.resources_items = json.dumps(new_raw)
    revision = ruta.save_revision()
    revision.publish()

    print(f"  UPDATED: {ruta_slug} (+{len(valid_links)} resource links)")
    ruta_updated += 1

print(f"\nRutas: {ruta_updated} updated, {ruta_skipped} skipped, {ruta_notfound} not found")

# =============================================================================
# Summary
# =============================================================================

print("\n" + "=" * 60)
print("SUMMARY")
print("=" * 60)
total_updated = blog_updated + ruta_updated
total_skipped = blog_skipped + ruta_skipped
total_notfound = blog_notfound + ruta_notfound
print(f"  Total updated:   {total_updated}")
print(f"  Total skipped:   {total_skipped}")
print(f"  Total not found: {total_notfound}")
print(f"  CLUST-02 requirement: bidirectional links {'COMPLETE' if total_updated > 0 else 'PENDING'}")
print("=" * 60)
