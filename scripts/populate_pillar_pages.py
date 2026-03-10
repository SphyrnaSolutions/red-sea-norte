"""
Populate Wagtail CMS with 5 pillar pages (one per cluster).
Phase 27, Plan 01: CLUST-01

Clusters: pecios, destinos, vida-a-bordo, logistica, rutas

Run via SSH stdin pipe to production Wagtail:
  ssh -p 22222 root@buceoenelmarrojo.com \
    "docker exec -i redsea_web_prod python manage.py shell" \
    < scripts/populate_pillar_pages.py
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
django.setup()

from django.utils import timezone
from wagtail.models import Page
from apps.blog.models import BlogPostPage, BlogIndexPage, Author, Category
import json

# ============================================================================
# Setup: Get parent page and author
# ============================================================================

blog_index = BlogIndexPage.objects.first()
if not blog_index:
    print("ERROR: BlogIndexPage not found. Cannot create pages.")
    sys.exit(1)

author = Author.objects.filter(name__icontains='Karlos').first()
if not author:
    author = Author.objects.first()
    print(f"WARNING: 'Karlos' author not found, using: {author}")

print(f"Blog Index: {blog_index}")
print(f"Author: {author}")


def get_or_create_category(name, color):
    category, created = Category.objects.get_or_create(
        name=name,
        defaults={'color': color}
    )
    if created:
        print(f"  Created category: {name}")
    return category


def create_pillar_page(slug, title, category, data):
    """Delete existing page with this slug and recreate for re-runnability."""
    existing = BlogPostPage.objects.filter(slug=slug).first()
    if existing:
        print(f"  DELETE existing: '{slug}' (id={existing.id})")
        existing.delete()

    page = BlogPostPage(
        title=title,
        slug=slug,
        excerpt=data['excerpt'],
        published_date=timezone.now().date(),
        read_time=data['read_time'],
        author=author,
        category=category,
        hero_alt=data.get('hero_alt', title),
        body=json.dumps(data['body']),
        meta_description=data['meta_description'],
        primary_keyword=data['primary_keyword'],
        cluster_id=data['cluster_id'],
        cluster_role=data['cluster_role'],
        schema_type=data.get('schema_type', 'Article'),
    )

    blog_index.add_child(instance=page)
    page.save_revision().publish()
    print(f"  CREATED: '{slug}' (id={page.id})")
    return page


# ============================================================================
# Pillar #9: Pecios del Mar Rojo
# cluster_id: pecios, cluster_role: pillar
# ============================================================================

print("\n=== Pillar #9: Guia de Pecios del Mar Rojo ===")
category_pecios = get_or_create_category('Pecios', '#1e40af')

create_pillar_page(
    slug='guia-pecios-mar-rojo-naufragios',
    title='Guia de Pecios del Mar Rojo: Los Mejores Naufragios para Bucear',
    category=category_pecios,
    data={
        'excerpt': 'Guia completa de los mejores pecios del Mar Rojo. SS Thistlegorm, Abu Nuhas, Dunraven, Rosalie Moller y mucho mas. Todo lo que necesitas saber para bucear en naufragios.',
        'read_time': '18 min',
        'meta_description': 'Guia completa de los mejores pecios del Mar Rojo para bucear. SS Thistlegorm, Abu Nuhas (Giannis D, Carnatic, Tile Wreck), Dunraven, Rosalie Moller. Historia, logistica y consejos de inmersion.',
        'primary_keyword': 'mejores pecios mar rojo naufragios bucear',
        'cluster_id': 'pecios',
        'cluster_role': 'pillar',
        'schema_type': 'Article',
        'hero_alt': 'Buceador explorando el interior de un pecio en el Mar Rojo',
        'body': [
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Mar Rojo es el destino de pecios mas espectacular del mundo</strong>. '
                    'Ninguna otra region concentra tanta densidad de naufragios historicos, tan bien conservados '
                    'y en aguas tan cristalinas. Desde el legendario <strong>SS Thistlegorm</strong> —uno de los '
                    'mejores pecios del planeta— hasta la necropo de barcos de <strong>Abu Nuhas</strong>, bucear '
                    'en el Mar Rojo es sumergirse en la historia viva de la Segunda Guerra Mundial y el comercio '
                    'maritimo del siglo XX.</p>'
                    '<p>Esta guia es el punto de partida completo para planificar tu ruta de pecios. '
                    'Encontraras informacion tecnica de cada naufragio, nivel requerido, profundidades clave '
                    'y consejos de inmersion que solo conocen los que han estado alli.</p>'
                ),
                'id': 'intro-pecios',
            },
            {
                'type': 'heading',
                'value': {'text': 'Por que el Mar Rojo es el paraiso de los pecios', 'level': 'h2'},
                'id': 'h2-por-que',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Tres factores hacen del Mar Rojo un destino insuperable para los amantes de pecios:</p>'
                    '<ul>'
                    '<li><strong>Conservacion excepcional</strong>: La alta salinidad (40 ppm) y la ausencia de mareas '
                    'significativas ralentizan la corrosion. Pecios que llevan 80 anos en el fondo conservan '
                    'estructuras intactas, maquinaria original y hasta carga.</li>'
                    '<li><strong>Visibilidad extraordinaria</strong>: Entre 20 y 40 metros de visibilidad media. '
                    'Puedes ver la silueta completa de un buque de 150 metros desde la superficie.</li>'
                    '<li><strong>Vida marina exuberante</strong>: Los pecios son arrecifes artificiales. '
                    'Coral abanico, murenas, bancos de peces tropicales y ocasionalmente tiburones '
                    'de arrecife han colonizado cada estructura metalica.</li>'
                    '</ul>'
                    '<p>La temporada optima para bucear pecios en el Mar Rojo es de <strong>octubre a abril</strong>: '
                    'agua mas fria (22-25°C), visibilidad maxima y menos turistas. En verano (junio-agosto) '
                    'el agua alcanza los 28-30°C pero la visibilidad puede reducirse ligeramente.</p>'
                ),
                'id': 'rt-por-que',
            },
            {
                'type': 'heading',
                'value': {'text': 'SS Thistlegorm: El Pecio Mas Famoso del Mar Rojo', 'level': 'h2'},
                'id': 'h2-thistlegorm',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>SS Thistlegorm</strong> es el pecio mas visitado del mundo y por razones de sobra. '
                    'Hundido en 1941 por bombarderos alemanes mientras transportaba material de guerra hacia el '
                    'Ejercito Britanico en el norte de Africa, este carguero de 128 metros descansa a 30 metros '
                    'de profundidad en el estrecho de Gubal.</p>'
                    '<p>Sus bodegas son una capsula del tiempo: motocicletas BSA, camiones Bedford, '
                    'locomotoras de vapor, armamento, botas militares y miles de articulos de la '
                    'Segunda Guerra Mundial permanecen donde los dejo la historia. '
                    'Es el unico pecio en el mundo donde puedes ver una locomotora bajo el agua.</p>'
                    '<ul>'
                    '<li><strong>Profundidad</strong>: 16-30 metros (cubierta a quilla)</li>'
                    '<li><strong>Nivel minimo</strong>: Open Water para la cubierta, Advanced para las bodegas</li>'
                    '<li><strong>Duracion</strong>: 2 inmersiones para ver el barco completo</li>'
                    '<li><strong>Punto fuerte</strong>: Bodega 2 (motocicletas), bodega 4 (locomotoras), cubierta de proa</li>'
                    '</ul>'
                    '<p>Consulta nuestra <a href="/blog/ss-thistlegorm-guia-completa">guia completa del SS Thistlegorm</a> '
                    'para informacion detallada de la historia y las inmersiones.</p>'
                ),
                'id': 'rt-thistlegorm',
            },
            {
                'type': 'heading',
                'value': {'text': 'Abu Nuhas: El Cementerio de Barcos', 'level': 'h2'},
                'id': 'h2-abu-nuhas',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p><strong>Abu Nuhas</strong> es un arrecife traicionero en la entrada norte del estrecho de Gubal '
                    'que ha cobrado al menos 4 naufragios historicos. Sus aguas esconden el mayor cementerio de barcos '
                    'del Mar Rojo, a profundidades ideales para buceo recreativo.</p>'
                    '<p>Los cuatro pecios de Abu Nuhas son:</p>'
                    '<ul>'
                    '<li><strong>Giannis D</strong>: El pecio mas accesible (7-27m). Carguero griego hundido en 1983. '
                    'Su estructura es la mas intacta del arrecife. Lee nuestra guia del '
                    '<a href="/blog/giannis-d-abu-nuhas">Giannis D en Abu Nuhas</a>.</li>'
                    '<li><strong>Carnatic</strong>: El mas historico. Vapor britanico de 1862, hundido en 1869 con '
                    'cargamento de algodón y botellas de champan. Descansa a 24 metros. '
                    'Informacion completa en nuestra guia del <a href="/blog/carnatic-abu-nuhas">Carnatic de Abu Nuhas</a>.</li>'
                    '<li><strong>Tile Wreck</strong>: El gran desconocido. Carguero que transportaba azulejos industriales, '
                    'hoy esparcidos por el fondo. Profundidad 15-27m. '
                    'Ver guia del <a href="/blog/tile-wreck-abu-nuhas">Tile Wreck en Abu Nuhas</a>.</li>'
                    '<li><strong>Kimon M</strong>: El mas profundo del arrecife (20-35m). '
                    'Para buceadores con certificacion Advanced. '
                    'Ver guia del <a href="/blog/kimon-m-abu-nuhas">Kimon M en Abu Nuhas</a>.</li>'
                    '</ul>'
                    '<p>Una visita completa a Abu Nuhas requiere 2-3 dias de liveaboard para hacer justicia '
                    'a los cuatro pecios. La guia de referencia es '
                    '<a href="/blog/abu-nuhas-cementerio-de-barcos">Abu Nuhas: el cementerio de barcos</a>.</p>'
                ),
                'id': 'rt-abu-nuhas',
            },
            {
                'type': 'heading',
                'value': {'text': 'Dunraven: El Pecio Victoriano con Secretos', 'level': 'h2'},
                'id': 'h2-dunraven',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Dunraven</strong> es un vapor de vapor victoriano britanic hundido en 1876 '
                    'en las proximidades de Sha\'ab Mahmoud. A 28 metros de profundidad, este carguero de 75 metros '
                    'permanece boca abajo, creando una estructura peculiar que desconcierta a los buceadores '
                    'en su primera visita.</p>'
                    '<p>Lo que hace especial al Dunraven es la cantidad de vida marina que lo habita: '
                    'la quilla (que mira hacia arriba) esta cubierta de coral blando, esponjas y '
                    'gorgonias de colores intensos. Los tiburones de punta blanca son residentes habituales.</p>'
                    '<ul>'
                    '<li><strong>Profundidad</strong>: 15-28 metros</li>'
                    '<li><strong>Nivel</strong>: Advanced recomendado (estructura invertida puede desorientar)</li>'
                    '<li><strong>Peculiaridad</strong>: Esta al reves; la quilla apunta hacia arriba</li>'
                    '</ul>'
                    '<p>Guia detallada: <a href="/blog/dunraven-mar-rojo">Dunraven en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-dunraven',
            },
            {
                'type': 'heading',
                'value': {'text': 'Rosalie Moller: El Pecio Olvidado', 'level': 'h2'},
                'id': 'h2-rosalie',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Rosalie Moller</strong> es quizas el pecio menos visitado de los grandes del Mar Rojo, '
                    'lo que lo convierte en el favorito de los buceadores que huyen de las multitudes. '
                    'Hundido en 1941 el mismo dia que el Thistlegorm —por el mismo escuadron aleman— '
                    'este carbonero britanico descansa a 50 metros de profundidad al sur del Thistlegorm.</p>'
                    '<p>Su profundidad lo reserva para buceadores tecnicos o avanzados que quieran ir mas alla '
                    'de los 30 metros. La parte superior del barco (masil) llega a los 30m, perfectamente '
                    'accesible con certificacion Advanced y nitrox.</p>'
                    '<ul>'
                    '<li><strong>Profundidad</strong>: 30-50 metros</li>'
                    '<li><strong>Nivel</strong>: Advanced, nitrox recomendado</li>'
                    '<li><strong>Punto fuerte</strong>: Sala de maquinas, masil a 30m, vida pelagica</li>'
                    '</ul>'
                    '<p>Guia completa: <a href="/blog/rosalie-moller-mar-rojo">Rosalie Moller en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-rosalie',
            },
            {
                'type': 'heading',
                'value': {'text': 'El Estrecho de Gubal: Zona de Pecios', 'level': 'h2'},
                'id': 'h2-gubal',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Estrecho de Gubal</strong> es la autopista maritima historica entre el '
                    'Mar Rojo y el canal de Suez. Sus aguas poco profundas, sus arrecifes traicioneros '
                    'y el intenso trafico comercial de los siglos XIX y XX lo convirtieron en el mayor '
                    'cementerio marino de la region.</p>'
                    '<p>Ademas de los pecios ya mencionados, el Estrecho esconde '
                    '<a href="/blog/buceo-estrecho-gubal-pecios-arrecifes">multiples sitios de buceo</a> '
                    'entre arrecifes y estructuras metalicas menos conocidas, ideales para buceadores '
                    'que buscan algo fuera de los itinerarios convencionales.</p>'
                ),
                'id': 'rt-gubal',
            },
            {
                'type': 'heading',
                'value': {'text': 'Pecios vs Tiburones: Cual Elegir', 'level': 'h2'},
                'id': 'h2-vs-tiburones',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Una pregunta frecuente: <em>pecios o tiburones, que elijo para mi primer liveaboard?</em> '
                    'La respuesta es que no tienes por que elegir: la Ruta Norte combina los mejores pecios '
                    'con abundante vida marina, incluyendo tiburones de arrecife de punta blanca. '
                    'Las rutas Brothers/Daedalus priorizan el encuentro con tiburones martillo y oceanos '
                    'en aguas abiertas.</p>'
                    '<p>Mas detalles en nuestro comparativo: '
                    '<a href="/blog/pecios-vs-tiburones-mar-rojo">pecios vs tiburones en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-vs-tiburones',
            },
            {
                'type': 'heading',
                'value': {'text': 'Como Llegar a los Pecios del Mar Rojo', 'level': 'h2'},
                'id': 'h2-como-llegar',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>La inmensa mayoria de los pecios del Mar Rojo solo son accesibles en <strong>liveaboard</strong>. '
                    'Las distancias desde Hurghada hacen imposible la visita diaria desde tierra '
                    'para el Thistlegorm, el Rosalie Moller o los pecios del Estrecho de Gubal.</p>'
                    '<p>Desde nuestra base en Hurghada, el <strong>M/Y Dolce Vita</strong> opera las '
                    'siguientes rutas de pecios:</p>'
                    '<ul>'
                    '<li><strong>Ruta Norte 7 dias</strong>: Thistlegorm, Abu Nuhas (todos los pecios), '
                    'Dunraven, Rosalie Moller. El itinerario clasico de pecios.</li>'
                    '<li><strong>Ruta Brothers y Daedalus</strong>: Para buceadores avanzados que quieren '
                    'combinar pecios profundos con encuentros con tiburones oceanos.</li>'
                    '</ul>'
                ),
                'id': 'rt-como-llegar',
            },
            {
                'type': 'heading',
                'value': {'text': 'Consejos Practicos para Bucear Pecios', 'level': 'h2'},
                'id': 'h2-consejos',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Bucear pecios tiene sus especificidades respecto al buceo en arrecife:</p>'
                    '<ul>'
                    '<li><strong>Linterna imprescindible</strong>: El interior de los pecios es oscuro. '
                    'Lleva linterna propia de 1000+ lumenes. Es el equipo mas importante despues del regulador.</li>'
                    '<li><strong>Flotabilidad perfecta</strong>: Una mala flotabilidad en un pecio puede '
                    'levantar nubes de sedimento que dejan a cero la visibilidad. Practica antes del viaje.</li>'
                    '<li><strong>Certificacion Wreck Diver</strong>: Si quieres penetrar el interior '
                    '(bodegas, salas de maquinas), esta especialidad te da las tecnicas y el '
                    'protocolo de seguridad necesarios.</li>'
                    '<li><strong>Nitrox</strong>: En pecios profundos (25-35m), el nitrox extiende '
                    'el tiempo de fondo y reduce la fatiga post-inmersion. '
                    'En el M/Y Dolce Vita el nitrox es gratuito.</li>'
                    '<li><strong>No toques nada</strong>: Los pecios son patrimonio historico. '
                    'Queda terminantemente prohibido extraer objetos o dañar estructuras.</li>'
                    '</ul>'
                ),
                'id': 'rt-consejos',
            },
            {
                'type': 'heading',
                'value': {'text': 'Reserva tu Ruta de Pecios', 'level': 'h2'},
                'id': 'h2-cta',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Si los pecios del Mar Rojo te han convencido, la <strong>Ruta Norte de 7 dias</strong> '
                    'es el mejor punto de entrada. Incluye el Thistlegorm, todos los pecios de Abu Nuhas, '
                    'el Dunraven y opciones de inmersion en el Rosalie Moller segun nivel.</p>'
                    '<p>Consulta disponibilidad y precios: '
                    '<a href="/rutas/norte-7-dias">Ruta Norte y Pecios desde Hurghada</a>. '
                    'Si tienes dudas sobre tu nivel o la ruta mas adecuada, '
                    '<a href="/contacto">contactanos</a> y te asesoramos sin compromiso.</p>'
                ),
                'id': 'rt-cta',
            },
            {
                'type': 'heading',
                'value': {'text': 'Referencias y Fuentes', 'level': 'h2'},
                'id': 'h2-refs',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<ul>'
                    '<li><a href="https://www.padi.com/dive-sites/red-sea" target="_blank" rel="noopener noreferrer">'
                    'PADI: Red Sea Dive Sites Guide</a></li>'
                    '<li><a href="https://www.divessi.com/en/blog/red-sea-wrecks" target="_blank" rel="noopener noreferrer">'
                    'SSI: Diving the Wrecks of the Red Sea</a></li>'
                    '<li><a href="https://www.daneurope.org/en/dive-flags-and-safety" target="_blank" rel="noopener noreferrer">'
                    'DAN Europe: Wreck Diving Safety Guidelines</a></li>'
                    '<li><a href="https://en.wikipedia.org/wiki/SS_Thistlegorm" target="_blank" rel="noopener noreferrer">'
                    'Wikipedia: SS Thistlegorm</a></li>'
                    '</ul>'
                ),
                'id': 'rt-refs',
            },
        ],
    }
)


# ============================================================================
# Pillar #10: Guia de Destinos de Buceo en el Mar Rojo
# cluster_id: destinos, cluster_role: pillar
# ============================================================================

print("\n=== Pillar #10: Guia de Destinos de Buceo en el Mar Rojo ===")
category_destinos = get_or_create_category('Destinos', '#0891b2')

create_pillar_page(
    slug='guia-destinos-buceo-mar-rojo',
    title='Guia de Destinos de Buceo en el Mar Rojo',
    category=category_destinos,
    data={
        'excerpt': 'Guia completa de destinos de buceo en el Mar Rojo. Ras Mohammed, Tiran, arrecifes de Hurghada, vida marina y como llegar a cada zona.',
        'read_time': '16 min',
        'meta_description': 'Guia completa de destinos de buceo en el Mar Rojo. Ras Mohammed, Jackson y Gordon Reef Tiran, Anemone City, Erg Abu Ramada, Shaab El Erg y mucho mas.',
        'primary_keyword': 'destinos buceo mar rojo guia',
        'cluster_id': 'destinos',
        'cluster_role': 'pillar',
        'schema_type': 'Article',
        'hero_alt': 'Arrecife de coral de colores en el Mar Rojo con banco de peces',
        'body': [
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Mar Rojo es uno de los destinos de buceo mas biodiversos del mundo</strong>. '
                    'Sus arrecifes de coral albergan mas de 1.200 especies de peces —el 17% son endemicas, '
                    'no se encuentran en ningun otro oceano— y una estructura coralina de extraordinaria salud. '
                    'Desde el parque nacional de Ras Mohammed hasta los frenticos arrecifes de Tiran, '
                    'cada zona tiene su caracter propio.</p>'
                    '<p>Esta guia recorre los principales destinos de buceo del Mar Rojo norte, '
                    'la zona accesible desde Hurghada y Sharm el-Sheikh, para que planifiques '
                    'tu ruta con criterio.</p>'
                ),
                'id': 'intro-destinos',
            },
            {
                'type': 'heading',
                'value': {'text': 'Ras Mohammed: El Parque Nacional Bajo el Agua', 'level': 'h2'},
                'id': 'h2-ras-mohammed',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p><strong>Ras Mohammed</strong> es el parque nacional submarino mas importante del Sinaí '
                    'y uno de los mejores spots de buceo del Mar Rojo. Situado en la punta sur de la peninsula '
                    'del Sinaí, donde el Golfo de Suez y el Golfo de Aqaba se encuentran, sus corrientes '
                    'ricas en nutrientes generan una vida marina de extraordinaria densidad.</p>'
                    '<p>Los spots estrella del parque:</p>'
                    '<ul>'
                    '<li><strong>Shark y Yolanda Reef</strong>: Pared vertical hasta los 70 metros, '
                    'con el pecio del carguero Yolanda (hundido en 1980) y presencia garantizada '
                    'de tiburones de punta blanca. '
                    'Ver guia completa: <a href="/blog/shark-yolanda-reef-mar-rojo">Shark y Yolanda Reef</a>.</li>'
                    '<li><strong>Anemone City</strong>: El jardin de anemones mas grande del Mediterraneo y el '
                    'Mar Rojo. Bancos de peces payaso entre anemones gigantes. '
                    'Guia del spot: <a href="/blog/anemone-city-ras-mohammed">Anemone City en Ras Mohammed</a>.</li>'
                    '<li><strong>Jolanda Reef</strong>: Formaciones de coral duro a profundidades de '
                    '5-40 metros.</li>'
                    '</ul>'
                    '<p>Guia completa del parque: <a href="/blog/ras-mohammed-guia-completa">Ras Mohammed: guia completa</a>.</p>'
                ),
                'id': 'rt-ras-mohammed',
            },
            {
                'type': 'heading',
                'value': {'text': 'Estrecho de Tiran: Corrientes y Arrecifes', 'level': 'h2'},
                'id': 'h2-tiran',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Estrecho de Tiran</strong> separa la peninsula del Sinaí de Arabia Saudi '
                    'y concentra cuatro arrecifes de primer orden: Jackson, Woodhouse, Thomas y Gordon. '
                    'Las corrientes que atraviesan el estrecho traen aguas frias y ricas en plancton '
                    'que alimentan una cadena trofica excepcional.</p>'
                    '<p>Los spots mas famosos del estrecho:</p>'
                    '<ul>'
                    '<li><strong>Jackson Reef y Gordon Reef</strong>: Los dos arrecifes mas accesibles '
                    'del estrecho. Paredes verticales, cardumenes enormes y presencia constante de barracudas, '
                    'jureles y tiburones. '
                    'Guia: <a href="/blog/jackson-reef-gordon-reef-tiran">Jackson y Gordon Reef en Tiran</a>.</li>'
                    '</ul>'
                    '<p>Importante: las corrientes en Tiran pueden ser intensas. Se recomienda nivel '
                    'Advanced y experiencia en buceo con corriente.</p>'
                ),
                'id': 'rt-tiran',
            },
            {
                'type': 'heading',
                'value': {'text': 'Arrecifes de Hurghada: La Puerta de Entrada', 'level': 'h2'},
                'id': 'h2-hurghada',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Los arrecifes en los alrededores de <strong>Hurghada</strong> son la opcion perfecta '
                    'para buceadores que se inician en el Mar Rojo o que buscan inmersiones tranquilas '
                    'entre dos rutas largas. Sus aguas protegidas y profundidades moderadas los hacen '
                    'ideales para Open Water.</p>'
                    '<ul>'
                    '<li><strong>Erg Abu Ramada</strong>: Conocido como "el acuario del Mar Rojo". '
                    'Ergs de coral (pilares) rodeados de miles de peces de colores en profundidades de 5-20m. '
                    'Ver guia: <a href="/blog/erg-abu-ramada-acuario-mar-rojo">Erg Abu Ramada</a>.</li>'
                    '<li><strong>Shaab El Erg</strong>: El spot de delfines de Hurghada. '
                    'Una colonia residente de delfines nariz de botella visita el area regularmente. '
                    'Ver guia: <a href="/blog/shaab-el-erg-delfines-hurghada">Shaab El Erg: buceo con delfines</a>.</li>'
                    '<li><strong>Small Crack y Big Crack</strong>: Grietas verticales en el arrecife '
                    'que ofrecen un buceo de pared diferente en aguas relativamente tranquilas. '
                    'Ver guia: <a href="/blog/small-crack-big-crack-mar-rojo">Small Crack y Big Crack</a>.</li>'
                    '</ul>'
                ),
                'id': 'rt-hurghada',
            },
            {
                'type': 'heading',
                'value': {'text': 'Vida Marina del Mar Rojo: Que Veras', 'level': 'h2'},
                'id': 'h2-vida-marina',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El Mar Rojo tiene una de las mayores tasas de endemismo marino del mundo. '
                    'Esto significa que muchas especies que veras aqui no las encontraras en '
                    'ningun otro oceano del planeta.</p>'
                    '<p>Especies frecuentes:</p>'
                    '<ul>'
                    '<li><strong>Peces payaso y anemones</strong>: En todos los arrecifes coralinos</li>'
                    '<li><strong>Tiburones de punta blanca</strong>: Residentes en los fondos de pecios y arrecifes</li>'
                    '<li><strong>Barracudas</strong>: Cardumenes en aguas abiertas y corrientes</li>'
                    '<li><strong>Delfines nariz de botella</strong>: En Shaab El Erg y otras zonas</li>'
                    '<li><strong>Tortugas marinas</strong>: Frecuentes en zonas de corriente moderada</li>'
                    '<li><strong>Pez leon</strong>: Endemico del Mar Rojo, peligroso pero magnifico</li>'
                    '</ul>'
                    '<p>Consulta nuestra guia completa de '
                    '<a href="/blog/vida-marina-mar-rojo-especies">vida marina del Mar Rojo: especies que veras</a>.</p>'
                ),
                'id': 'rt-vida-marina',
            },
            {
                'type': 'heading',
                'value': {'text': 'Como Acceder a los Destinos del Mar Rojo', 'level': 'h2'},
                'id': 'h2-acceso',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Los mejores destinos de buceo del Mar Rojo requieren <strong>liveaboard</strong> '
                    'para ser aprovechados al maximo. La razon es simple: los arrecifes mas espectaculares '
                    'estan a horas de navegacion desde los puertos de Hurghada y Sharm el-Sheikh, '
                    'y hacer viajes diarios significa invertir 3-4 horas de navegacion cada dia '
                    'en lugar de bucear.</p>'
                    '<p>Desde el <strong>M/Y Dolce Vita</strong> operamos rutas de liveaboard que '
                    'cubren los mejores destinos:</p>'
                    '<ul>'
                    '<li><a href="/rutas/norte-7-dias">Ruta Norte 7 dias</a>: Pecios del Estrecho de Gubal '
                    'y arrecifes del norte</li>'
                    '<li><a href="/rutas/brothers-daedalus">Ruta Brothers y Daedalus</a>: '
                    'Los arrecifes mas remotos con mayor concentracion de tiburones</li>'
                    '</ul>'
                ),
                'id': 'rt-acceso',
            },
            {
                'type': 'heading',
                'value': {'text': 'Cuando Ir: Temporadas en el Mar Rojo', 'level': 'h2'},
                'id': 'h2-temporada',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El Mar Rojo permite bucear todo el ano, pero hay diferencias segun la temporada:</p>'
                    '<ul>'
                    '<li><strong>Octubre-abril (temporada alta)</strong>: Temperatura del agua 22-25°C, '
                    'visibilidad maxima (30-40m), menos viento. La mejor epoca para pecios y vida pelagica.</li>'
                    '<li><strong>Mayo-septiembre (temporada de verano)</strong>: Agua mas calida (28-30°C), '
                    'algunos dias con khamsin (viento calido del desierto) que puede agitar el mar. '
                    'Buena opcion si buscas precios mas bajos y menos barcos.</li>'
                    '</ul>'
                    '<p>En cualquier caso, los arrecifes del Mar Rojo ofrecen buceo de calidad los '
                    '365 dias del ano.</p>'
                ),
                'id': 'rt-temporada',
            },
            {
                'type': 'heading',
                'value': {'text': 'Referencias y Fuentes', 'level': 'h2'},
                'id': 'h2-refs-dest',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<ul>'
                    '<li><a href="https://www.padi.com/dive-sites/red-sea/egypt" target="_blank" rel="noopener noreferrer">'
                    'PADI: Egypt Red Sea Dive Sites</a></li>'
                    '<li><a href="https://www.divessi.com/en/dive-destinations/red-sea" target="_blank" rel="noopener noreferrer">'
                    'SSI: Red Sea Diving Destination Guide</a></li>'
                    '<li><a href="https://www.unesco.org/en/natural-sciences/ocean/coast-sea/marine-protected-areas" target="_blank" rel="noopener noreferrer">'
                    'UNESCO: Marine Protected Areas</a></li>'
                    '<li><a href="https://www.ras-mohammed.com/" target="_blank" rel="noopener noreferrer">'
                    'Parque Nacional Ras Mohammed: Informacion Oficial</a></li>'
                    '</ul>'
                ),
                'id': 'rt-refs-dest',
            },
        ],
    }
)


# ============================================================================
# Pillar #18: Vida a Bordo en el Mar Rojo: Guia Definitiva
# cluster_id: vida-a-bordo, cluster_role: pillar
# ============================================================================

print("\n=== Pillar #18: Vida a Bordo en el Mar Rojo: Guia Definitiva ===")
category_vab = get_or_create_category('Vida a Bordo', '#7c3aed')

create_pillar_page(
    slug='vida-a-bordo-mar-rojo-guia-definitiva',
    title='Vida a Bordo en el Mar Rojo: Guia Definitiva',
    category=category_vab,
    data={
        'excerpt': 'Guia definitiva sobre vida a bordo (liveaboard) en el Mar Rojo. Que esperar, como prepararte, que incluye, precios, rutas y todo lo que necesitas saber.',
        'read_time': '20 min',
        'meta_description': 'Guia definitiva sobre vida a bordo en el Mar Rojo. Experiencia a bordo, que incluye, precios, nivel requerido, formacion, gastronomia, inmersiones nocturnas y mas.',
        'primary_keyword': 'vida a bordo mar rojo guia definitiva',
        'cluster_id': 'vida-a-bordo',
        'cluster_role': 'pillar',
        'schema_type': 'Article',
        'hero_alt': 'Barco liveaboard navegando al atardecer en el Mar Rojo con buceadores a bordo',
        'body': [
            {
                'type': 'rich_text',
                'value': (
                    '<p>Un <strong>liveaboard en el Mar Rojo</strong> es la forma de buceo mas inmersiva que existe. '
                    'Durante 5 a 7 dias, tu barco es tu casa: comes, duermes y buceas desde el mismo lugar, '
                    'llegando a spots remotos que ninguna embarcacion diaria puede alcanzar. '
                    'Si el buceo es tu pasion, un liveaboard es una experiencia transformadora.</p>'
                    '<p>Esta guia cubre todo lo que necesitas saber antes de reservar tu primera '
                    '—o proxima— vida a bordo en el Mar Rojo.</p>'
                ),
                'id': 'intro-vab',
            },
            {
                'type': 'heading',
                'value': {'text': 'Que es un Liveaboard: La Experiencia Explicada', 'level': 'h2'},
                'id': 'h2-que-es',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Un liveaboard es un barco especialmente equipado para el buceo en el que vives '
                    'durante toda la travesia. A diferencia del buceo desde tierra, donde inviertes '
                    'horas en llegar a los spots, en un liveaboard <strong>te despiertas sobre el agua '
                    'y bajas a bucear nada mas desayunar</strong>.</p>'
                    '<p>Las ventajas principales son:</p>'
                    '<ul>'
                    '<li><strong>Acceso a spots remotos</strong>: El Thistlegorm, los Brothers, el Elphinstone. '
                    'Solo son viables desde un liveaboard.</li>'
                    '<li><strong>Mas inmersiones por dia</strong>: Entre 3 y 5 inmersiones diarias, '
                    'incluyendo inmersiones nocturnas.</li>'
                    '<li><strong>Comunidad de buceadores</strong>: Compartes el barco con personas '
                    'con tu misma pasion. Las amistades que se forman a bordo duran anos.</li>'
                    '<li><strong>Logistica simplificada</strong>: Todo incluido — alojamiento, '
                    'comida, equipo de buceo basico, instructores.</li>'
                    '</ul>'
                    '<p>Para una descripcion narrativa completa de la experiencia, lee '
                    '<a href="/blog/como-es-un-vida-a-bordo-mar-rojo">como es una vida a bordo en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-que-es',
            },
            {
                'type': 'heading',
                'value': {'text': 'Un Dia Tipico a Bordo', 'level': 'h2'},
                'id': 'h2-dia-tipico',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>La rutina diaria en un liveaboard gira en torno al buceo, con todo lo demas '
                    'organizado para maximizar el tiempo en el agua:</p>'
                    '<ul>'
                    '<li><strong>6:30</strong>: Desayuno. El cocinero lleva levantado desde las 5:30.</li>'
                    '<li><strong>7:30</strong>: Primera inmersion. El spot ya esta listo, el equipo montado.</li>'
                    '<li><strong>9:30</strong>: Descanso, cafe. El barco navega al siguiente spot.</li>'
                    '<li><strong>11:00</strong>: Segunda inmersion.</li>'
                    '<li><strong>13:30</strong>: Almuerzo.</li>'
                    '<li><strong>15:30</strong>: Tercera inmersion (a menudo el spot mas espectacular del dia).</li>'
                    '<li><strong>18:00</strong>: Navegacion nocturna hacia el siguiente destino.</li>'
                    '<li><strong>20:00</strong>: Cena.</li>'
                    '<li><strong>21:00</strong>: Inmersion nocturna (opcional pero muy recomendable).</li>'
                    '</ul>'
                    '<p>Guia completa con horarios detallados: '
                    '<a href="/blog/dia-tipico-liveaboard-buceo">un dia tipico en un liveaboard de buceo</a>.</p>'
                ),
                'id': 'rt-dia-tipico',
            },
            {
                'type': 'heading',
                'value': {'text': 'Que Incluye un Liveaboard', 'level': 'h2'},
                'id': 'h2-que-incluye',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>La mayoria de liveaboards en el Mar Rojo incluyen:</p>'
                    '<ul>'
                    '<li><strong>Pension completa</strong>: Desayuno, almuerzo, cena y snacks entre inmersiones</li>'
                    '<li><strong>Equipo de buceo basico</strong>: Regulador, BCD, traje (comprueba con tu operador)</li>'
                    '<li><strong>Botellas y pesos</strong>: Siempre incluidos</li>'
                    '<li><strong>Nitrox</strong>: En el M/Y Dolce Vita, el nitrox es gratuito para todos los pasajeros</li>'
                    '<li><strong>Guias/instructores</strong>: Dive masters acompañan cada inmersion</li>'
                    '<li><strong>Transfer aeropuerto</strong>: Verificar con el operador</li>'
                    '</ul>'
                    '<p>Ver detalle completo de servicios: '
                    '<a href="/blog/que-incluye-vida-a-bordo-mar-rojo">que incluye una vida a bordo en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-que-incluye',
            },
            {
                'type': 'heading',
                'value': {'text': 'Camarotes y Alojamiento a Bordo', 'level': 'h2'},
                'id': 'h2-camarotes',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Los camarotes de un liveaboard son compactos pero funcionales. '
                    'El M/Y Dolce Vita cuenta con cabinas dobles e individuales con bano privado, '
                    'aire acondicionado y almacenaje suficiente para una semana de ropa de verano.</p>'
                    '<p>Lo que no encontraras: espacio para una maleta rigida grande. '
                    'Recomendamos viajar con bolsa de viaje flexible o mochila grande.</p>'
                    '<p>Mas informacion sobre camarotes, comida y wifi: '
                    '<a href="/blog/camarotes-comida-wifi-liveaboard">camarotes, comida y wifi en un liveaboard</a>.</p>'
                ),
                'id': 'rt-camarotes',
            },
            {
                'type': 'heading',
                'value': {'text': 'Gastronomia a Bordo', 'level': 'h2'},
                'id': 'h2-gastronomia',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>La comida en un buen liveaboard es una agradable sorpresa. '
                    'El cocinero del M/Y Dolce Vita prepara menus variados con influencias '
                    'de la cocina egipcia, mediterranea e internacional. '
                    'Las ensaladas con frutas y verduras frescas del mercado de Hurghada, '
                    'el tajine de cordero y el pescado a la brasa son los platos estrella.</p>'
                    '<p>Guia gastrononomica completa: '
                    '<a href="/blog/gastronomia-liveaboard-comida-bordo">gastronomia en un liveaboard</a>.</p>'
                ),
                'id': 'rt-gastronomia',
            },
            {
                'type': 'heading',
                'value': {'text': 'Formacion a Bordo: Mejora tu Nivel Buceando', 'level': 'h2'},
                'id': 'h2-formacion',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Un liveaboard es el entorno ideal para mejorar tu nivel de buceo. '
                    'Con 3-5 inmersiones diarias en condiciones variadas, el progreso es rapido. '
                    'Ademas, el M/Y Dolce Vita ofrece formacion oficial SSI durante la travesia:</p>'
                    '<ul>'
                    '<li><strong>SSI Advanced Adventurer</strong>: El curso mas popular. '
                    'Las inmersiones de formacion SON las inmersiones del viaje — no pierdes ni una.</li>'
                    '<li><strong>Especialidades</strong>: Wreck Diver, Perfect Buoyancy, Deep Diver, '
                    'Night Diver, Digital Underwater Photography.</li>'
                    '<li><strong>Nitrox</strong>: Curso de media jornada, certificacion internacional.</li>'
                    '</ul>'
                    '<p>Guia completa de formacion: '
                    '<a href="/blog/formacion-buceo-bordo-ssi-especialidades">formacion de buceo a bordo: SSI y especialidades</a>.</p>'
                ),
                'id': 'rt-formacion',
            },
            {
                'type': 'heading',
                'value': {'text': 'Buceo Nocturno: La Dimension Invisible del Mar Rojo', 'level': 'h2'},
                'id': 'h2-nocturno',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El Mar Rojo de noche es otro mundo. '
                    'Especies que se esconden durante el dia salen a cazar: '
                    'pulpos, platijas, cangrejos mantis, tiburones nodriza y una infinidad de '
                    'invertebrados iluminados por la linterna.</p>'
                    '<p>Los arrecifes tambien cambian: el coral duro extiende sus poliplos '
                    '—que durante el dia estan retraidos— creando un paisaje de flores fosforescentes. '
                    'Es una experiencia que complementa completamente el buceo diurno.</p>'
                    '<p>Guia completa: '
                    '<a href="/blog/buceo-nocturno-mar-rojo-que-esperar">buceo nocturno en el Mar Rojo: que esperar</a>.</p>'
                ),
                'id': 'rt-nocturno',
            },
            {
                'type': 'heading',
                'value': {'text': 'Corrientes en el Mar Rojo: Lo que Debes Saber', 'level': 'h2'},
                'id': 'h2-corrientes',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Las corrientes del Mar Rojo son responsables tanto de su extraordinaria vida '
                    'marina como de su reputacion de "mar de buceadores avanzados" en algunas zonas. '
                    'En realidad, la mayoria de spots son aptos para Open Water.</p>'
                    '<p>Los spots con corriente mas intensa —Tiran, Brothers, Elphinstone— '
                    'requieren experiencia, pero la corriente es la que atrae a los tiburones '
                    'y los cardumenes de barracudas que hacen esos spots legendarios.</p>'
                    '<p>Todo sobre corrientes: '
                    '<a href="/blog/corrientes-mar-rojo-buceo-guia">corrientes en el Mar Rojo: guia para buceadores</a>.</p>'
                ),
                'id': 'rt-corrientes',
            },
            {
                'type': 'heading',
                'value': {'text': 'Fotografia Submarina a Bordo', 'level': 'h2'},
                'id': 'h2-foto',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El Mar Rojo es uno de los mejores destinos del mundo para fotografia submarina. '
                    'La visibilidad excepcional, la luz natural que penetra hasta 30 metros '
                    'y la densidad de fauna hacen que cada inmersion ofrezca decenas de oportunidades fotograficas.</p>'
                    '<p>A bordo puedes cargar baterias y tarjetas entre inmersiones, '
                    'y la mayoria de liveaboards tienen enchufes en los camarotes. '
                    'Guia completa de spots y tecnicas: '
                    '<a href="/blog/fotografia-submarina-mar-rojo-spots">fotografia submarina en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-foto',
            },
            {
                'type': 'heading',
                'value': {'text': 'Precio de una Vida a Bordo en el Mar Rojo', 'level': 'h2'},
                'id': 'h2-precio',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El precio de un liveaboard en el Mar Rojo varia segun la duracion, '
                    'el tipo de camarote y la ruta. Como referencia general:</p>'
                    '<ul>'
                    '<li><strong>Ruta de 7 dias</strong>: 900-1.400€ por persona en cabina compartida</li>'
                    '<li><strong>Cabina individual</strong>: Suplemento de 200-400€ aprox.</li>'
                    '</ul>'
                    '<p>El precio incluye pension completa, guias, botellas y equipo basico. '
                    'Consulta el desglose completo: '
                    '<a href="/blog/precio-vida-a-bordo-mar-rojo">precio de la vida a bordo en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-precio',
            },
            {
                'type': 'heading',
                'value': {'text': 'Reserva tu Liveaboard en el Mar Rojo', 'level': 'h2'},
                'id': 'h2-cta-vab',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>¿Listo para tu primera —o proxima— vida a bordo en el Mar Rojo? '
                    'Consulta nuestras rutas disponibles y elige la que mejor se adapta a tu nivel y presupuesto:</p>'
                    '<ul>'
                    '<li><a href="/rutas/norte-7-dias">Ruta Norte 7 dias: Pecios desde Hurghada</a></li>'
                    '<li><a href="/rutas/brothers-daedalus">Ruta Brothers y Daedalus: Tiburones y pecios profundos</a></li>'
                    '<li><a href="/rutas/descubre-mar-rojo">Descubre el Mar Rojo: Ruta para principiantes</a></li>'
                    '</ul>'
                    '<p>¿Tienes dudas? <a href="/contacto">Contactanos</a> y te ayudamos a elegir la ruta perfecta.</p>'
                ),
                'id': 'rt-cta-vab',
            },
            {
                'type': 'heading',
                'value': {'text': 'Referencias y Fuentes', 'level': 'h2'},
                'id': 'h2-refs-vab',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<ul>'
                    '<li><a href="https://www.padi.com/sites/default/files/documents/2022-09/Liveaboard_Guide.pdf" target="_blank" rel="noopener noreferrer">'
                    'PADI: Guia de Liveaboard</a></li>'
                    '<li><a href="https://www.divessi.com/en/blog/liveaboard-diving" target="_blank" rel="noopener noreferrer">'
                    'SSI: Todo sobre el Buceo en Liveaboard</a></li>'
                    '<li><a href="https://www.daneurope.org/en/health-and-diving/fitness-to-dive" target="_blank" rel="noopener noreferrer">'
                    'DAN Europe: Aptitud Fisica para el Buceo</a></li>'
                    '</ul>'
                ),
                'id': 'rt-refs-vab',
            },
        ],
    }
)


# ============================================================================
# Pillar #22: Guia de Logistica para Bucear en el Mar Rojo
# cluster_id: logistica, cluster_role: pillar
# ============================================================================

print("\n=== Pillar #22: Guia de Logistica para Bucear en el Mar Rojo ===")
category_logistica = get_or_create_category('Logistica', '#059669')

create_pillar_page(
    slug='guia-logistica-bucear-mar-rojo',
    title='Guia de Logistica para Bucear en el Mar Rojo',
    category=category_logistica,
    data={
        'excerpt': 'Todo lo que necesitas para organizar tu viaje de buceo al Mar Rojo: visa, vuelos, transfers, packing list, certificaciones, seguros y consejos practicos.',
        'read_time': '17 min',
        'meta_description': 'Guia completa de logistica para bucear en el Mar Rojo desde Hurghada. Visa egipto, como llegar, que llevar, certificaciones, seguro de buceo y presupuesto.',
        'primary_keyword': 'logistica bucear mar rojo guia',
        'cluster_id': 'logistica',
        'cluster_role': 'pillar',
        'schema_type': 'Article',
        'hero_alt': 'Maleta de buceo preparada con equipo para liveaboard en el Mar Rojo',
        'body': [
            {
                'type': 'rich_text',
                'value': (
                    '<p>Organizar un viaje de buceo al <strong>Mar Rojo</strong> tiene sus especificidades. '
                    'No es lo mismo que un vuelo de vacaciones normal: necesitas tramitar una visa especifica, '
                    'preparar equipaje tecnico de buceo, contratar un seguro especializado y '
                    'coordinar los transfers desde el aeropuerto de Hurghada. '
                    'Esta guia centraliza toda la logistica para que no te deje ninguna sorpresa.</p>'
                ),
                'id': 'intro-log',
            },
            {
                'type': 'heading',
                'value': {'text': 'Visa para Egipto: Tramites y Proceso', 'level': 'h2'},
                'id': 'h2-visa',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Los ciudadanos de la Union Europea, UK, USA y Canada pueden obtener la '
                    '<strong>visa egipcia a la llegada</strong> en el aeropuerto de Hurghada (HRG) '
                    'o Sharm el-Sheikh (SSH), sin tramites previos en su pais.</p>'
                    '<p>El proceso es sencillo:</p>'
                    '<ol>'
                    '<li>A la llegada al aeropuerto, busca el banco Banque Misr antes de la cola de inmigracion</li>'
                    '<li>Paga la tasa de visa: <strong>25 USD</strong> (o 25 euros, lo aceptan igual)</li>'
                    '<li>El banco te da un sello que pegas en tu pasaporte</li>'
                    '<li>Pasas la cola de inmigracion normalmente</li>'
                    '</ol>'
                    '<p>Alternativamente, puedes tramitar el '
                    '<a href="https://www.visa2egypt.gov.eg/" target="_blank" rel="noopener noreferrer">'
                    'e-Visa de Egipto online</a> antes de viajar (30 USD, mas comodidad).</p>'
                    '<p>Guia completa: <a href="/blog/visado-egipto-hurghada">visado de Egipto para Hurghada</a>.</p>'
                ),
                'id': 'rt-visa',
            },
            {
                'type': 'heading',
                'value': {'text': 'Vuelos y Como Llegar a Hurghada', 'level': 'h2'},
                'id': 'h2-vuelos',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El aeropuerto de <strong>Hurghada (HRG)</strong> tiene vuelos directos '
                    'desde las principales ciudades europeas: Madrid, Barcelona, Londres, Frankfurt, '
                    'Amsterdam, Paris. Las principales opciones son:</p>'
                    '<ul>'
                    '<li><strong>EasyJet, Ryanair, TUI</strong>: Vuelos charter desde Espana y UK '
                    '(principalmente desde Barcelona, Madrid, Londres Gatwick y Manchester)</li>'
                    '<li><strong>EgyptAir</strong>: Con escala en El Cairo, mas caro pero mas opciones de origen</li>'
                    '<li><strong>Desde Alemania/Austria</strong>: Condor, TUIfly operan vuelos directos</li>'
                    '</ul>'
                    '<p>El precio varia enormemente segun la temporada: desde 150€ hasta 450€ ida y vuelta.</p>'
                    '<p>Guia completa de como llegar: '
                    '<a href="/blog/como-llegar-a-hurghada-liveaboard">como llegar a Hurghada para un liveaboard</a>.</p>'
                ),
                'id': 'rt-vuelos',
            },
            {
                'type': 'heading',
                'value': {'text': 'Visa, Vuelos y Transfers: Guia Integral', 'level': 'h2'},
                'id': 'h2-integral',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Para la guia completa que integra visa + vuelos + transfers desde el aeropuerto '
                    'hasta el puerto de Hurghada donde embarca el liveaboard, consulta: '
                    '<a href="/blog/visa-egipto-vuelos-transfers-buceadores">'
                    'visa, vuelos y transfers para buceadores en Hurghada</a>.</p>'
                ),
                'id': 'rt-integral',
            },
            {
                'type': 'heading',
                'value': {'text': 'Que Llevar: Packing List para Liveaboard', 'level': 'h2'},
                'id': 'h2-packing',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El equipaje para un liveaboard es diferente al de unas vacaciones normales. '
                    'El espacio en los camarotes es limitado, necesitas equipo tecnico de buceo '
                    'y el ambiente es informal y humedo. Los elementos esenciales:</p>'
                    '<ul>'
                    '<li><strong>Equipo de buceo personal</strong>: Mascara, aletas, ordenador, '
                    'linterna de pecio (1000+ lumenes), SMB</li>'
                    '<li><strong>Traje de neopreno</strong>: 3mm en verano, 5mm en invierno</li>'
                    '<li><strong>Protector solar mineral reef-safe</strong>: SPF50+, sin oxibenzona</li>'
                    '<li><strong>Medicacion para el mareo</strong>: Biodramina preventiva</li>'
                    '<li><strong>Certificaciones de buceo</strong>: Tarjeta fisica + digital</li>'
                    '</ul>'
                    '<p>Lista completa de packing: '
                    '<a href="/blog/que-llevar-liveaboard-packing-list">que llevar a un liveaboard: packing list completo</a>.</p>'
                ),
                'id': 'rt-packing',
            },
            {
                'type': 'heading',
                'value': {'text': 'Certificaciones de Buceo Necesarias', 'level': 'h2'},
                'id': 'h2-certs',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El nivel minimo para bucear en el Mar Rojo es <strong>Open Water Diver</strong> '
                    '(PADI, SSI, CMAS o equivalente). Sin embargo, para aprovechar los spots mas '
                    'espectaculares —especialmente los pecios profundos— el '
                    '<strong>Advanced Open Water es muy recomendable</strong>.</p>'
                    '<p>Resumen por ruta:</p>'
                    '<ul>'
                    '<li><strong>Ruta Norte</strong>: Open Water minimo, Advanced recomendado</li>'
                    '<li><strong>Ruta Brothers</strong>: Advanced obligatorio en la mayoria de operadores</li>'
                    '<li><strong>Ruta Descubre</strong>: Disenada para Open Water</li>'
                    '</ul>'
                    '<p>Guia completa: '
                    '<a href="/blog/certificaciones-buceo-mar-rojo">'
                    'certificaciones de buceo para el Mar Rojo: minimos y recomendados</a>.</p>'
                ),
                'id': 'rt-certs',
            },
            {
                'type': 'heading',
                'value': {'text': 'Seguro de Buceo y Camara Hiperbarica', 'level': 'h2'},
                'id': 'h2-seguro',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>seguro de buceo es obligatorio</strong> en todos los liveaboards del Mar Rojo, '
                    'y con razon. El accidente de buceo mas comun —la enfermedad de descompresion— '
                    'require tratamiento en camara hiperbarica, y una sesion cuesta entre 800 y 2.000€.</p>'
                    '<p>Las opciones principales:</p>'
                    '<ul>'
                    '<li><strong>DAN (Divers Alert Network)</strong>: El seguro de referencia para buceadores. '
                    'Cobertura de emergencias por descompresion, evacuacion medica, hospitalizacion. '
                    'Precio desde 45€/ano. '
                    'Guia: <a href="/blog/seguro-buceo-dan-egipto">seguro DAN para bucear en Egipto</a>.</li>'
                    '<li><strong>DiveAssure, PADI Insurance</strong>: Alternativas comparables.</li>'
                    '</ul>'
                    '<p>Informacion sobre camaras hiperbaricas en Hurghada y protocolos de emergencia: '
                    '<a href="/blog/seguro-buceo-camara-hiperbarica-egipto">'
                    'seguro de buceo y camara hiperbarica en Egipto</a>.</p>'
                ),
                'id': 'rt-seguro',
            },
            {
                'type': 'heading',
                'value': {'text': 'Propinas y Dinero en el Mar Rojo', 'level': 'h2'},
                'id': 'h2-dinero',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Las propinas son una parte importante de la cultura del liveaboard '
                    'y un componente significativo del ingreso de la tripulacion. '
                    'La costumbre es dar <strong>10-15 USD por persona por dia</strong> '
                    'a repartir entre la tripulacion, al final del viaje.</p>'
                    '<p>En Egipto, la moneda local es la libra egipcia (EGP), '
                    'pero los dolares y euros se aceptan ampliamente. '
                    'Las tarjetas de credito funcionan en los grandes hoteles y restaurantes de Hurghada, '
                    'pero lleva efectivo para mercados, taxis y propinas.</p>'
                    '<p>Guia completa de presupuesto: '
                    '<a href="/blog/propinas-dinero-liveaboard-buceo">propinas y dinero en un liveaboard de buceo</a>.</p>'
                ),
                'id': 'rt-dinero',
            },
            {
                'type': 'heading',
                'value': {'text': 'Seguridad en el Buceo en el Mar Rojo', 'level': 'h2'},
                'id': 'h2-seguridad',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El Mar Rojo es un destino seguro para bucear siempre que se respeten '
                    'las normas basicas de seguridad. Los principales riesgos son:</p>'
                    '<ul>'
                    '<li><strong>Corrientes</strong>: En algunos spots (Tiran, Brothers) pueden ser fuertes. '
                    'Siempre bucear con guia y respetar el briefing previo.</li>'
                    '<li><strong>Enfermedad de descompresion</strong>: Seguir los perfiles de inmersion '
                    'del ordenador, no saltarse las paradas de seguridad.</li>'
                    '<li><strong>Deshidratacion</strong>: El calor y el aire seco de la botella deshidratan. '
                    'Beber agua abundante entre inmersiones.</li>'
                    '</ul>'
                    '<p>Guia de seguridad: <a href="/blog/seguridad-buceo-mar-rojo">seguridad en el buceo en el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-seguridad',
            },
            {
                'type': 'heading',
                'value': {'text': 'Checklist de Preparacion Final', 'level': 'h2'},
                'id': 'h2-checklist',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Antes de embarcar, verifica este checklist:</p>'
                    '<ul>'
                    '<li>[ ] Pasaporte vigente (6+ meses desde la fecha de entrada)</li>'
                    '<li>[ ] Visa egipcia (a la llegada o e-Visa previa)</li>'
                    '<li>[ ] Seguro de buceo activo</li>'
                    '<li>[ ] Certificacion de buceo (tarjeta fisica + digital)</li>'
                    '<li>[ ] Logbook actualizado</li>'
                    '<li>[ ] Packing list completo</li>'
                    '<li>[ ] Comprobante de reserva del liveaboard</li>'
                    '<li>[ ] Efectivo (USD o EUR) para propinas y gastos en tierra</li>'
                    '</ul>'
                    '<p>Checklist completo de preparacion: '
                    '<a href="/blog/checklist-vida-a-bordo-mar-rojo">checklist de preparacion para vida a bordo</a>.</p>'
                ),
                'id': 'rt-checklist',
            },
            {
                'type': 'heading',
                'value': {'text': 'Empieza a Planificar tu Viaje', 'level': 'h2'},
                'id': 'h2-cta-log',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Con la logistica resuelta, solo queda elegir la ruta. '
                    '<a href="/rutas/norte-7-dias">La Ruta Norte de 7 dias</a> es el punto '
                    'de entrada ideal: pecios emblematicos, arrecifes de primera clase '
                    'y todo lo que hace grande al Mar Rojo en una sola semana.</p>'
                    '<p>¿Tienes preguntas sobre logistica o quieres informacion personalizada? '
                    '<a href="/contacto">Contactanos</a>.</p>'
                ),
                'id': 'rt-cta-log',
            },
            {
                'type': 'heading',
                'value': {'text': 'Referencias y Fuentes', 'level': 'h2'},
                'id': 'h2-refs-log',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<ul>'
                    '<li><a href="https://www.visa2egypt.gov.eg/" target="_blank" rel="noopener noreferrer">'
                    'Gobierno de Egipto: Portal de e-Visa Oficial</a></li>'
                    '<li><a href="https://www.daneurope.org/" target="_blank" rel="noopener noreferrer">'
                    'DAN Europe: Seguro de Buceo y Seguridad</a></li>'
                    '<li><a href="https://www.padi.com/courses/open-water-diver" target="_blank" rel="noopener noreferrer">'
                    'PADI: Niveles de Certificacion</a></li>'
                    '<li><a href="https://www.iata.org/en/programs/passenger/special-items/sporting-equipment/" target="_blank" rel="noopener noreferrer">'
                    'IATA: Equipo Deportivo en Aerolineas</a></li>'
                    '</ul>'
                ),
                'id': 'rt-refs-log',
            },
        ],
    }
)


# ============================================================================
# Pillar #23: Guia de Rutas de Vida a Bordo en el Mar Rojo
# cluster_id: rutas, cluster_role: pillar
# ============================================================================

print("\n=== Pillar #23: Guia de Rutas de Vida a Bordo en el Mar Rojo ===")
category_rutas = get_or_create_category('Rutas', '#dc2626')

create_pillar_page(
    slug='guia-rutas-vida-a-bordo-mar-rojo',
    title='Guia de Rutas de Vida a Bordo en el Mar Rojo',
    category=category_rutas,
    data={
        'excerpt': 'Guia completa de todas las rutas de liveaboard en el Mar Rojo. Ruta Norte, Brothers, Elphinstone, Sur Saint Johns y rutas para principiantes. Como elegir la mejor segun tu nivel.',
        'read_time': '15 min',
        'meta_description': 'Guia completa de rutas de vida a bordo en el Mar Rojo. Ruta Norte 7 dias, Brothers y Daedalus, Sur Saint Johns, Safari Norte-Sur y rutas para principiantes.',
        'primary_keyword': 'rutas vida a bordo mar rojo guia completa',
        'cluster_id': 'rutas',
        'cluster_role': 'pillar',
        'schema_type': 'Article',
        'hero_alt': 'Mapa de rutas de liveaboard en el Mar Rojo con los principales destinos marcados',
        'body': [
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Mar Rojo ofrece rutas de liveaboard para todos los niveles y preferencias</strong>. '
                    'Desde la clasica Ruta Norte —con los pecios mas famosos del mundo— hasta las '
                    'expediciones a los Brothers donde conviven tiburones martillo y mantarrayas. '
                    'Elegir bien la ruta es la decision mas importante de tu viaje.</p>'
                    '<p>Esta guia describe todas las rutas disponibles desde Hurghada, '
                    'con lo que ofrecen, el nivel requerido y como elegir la que mejor se adapta a ti.</p>'
                ),
                'id': 'intro-rutas',
            },
            {
                'type': 'heading',
                'value': {'text': 'Ruta Norte 7 Dias: Los Pecios Clasicos', 'level': 'h2'},
                'id': 'h2-ruta-norte',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>La <strong>Ruta Norte</strong> es la ruta de referencia del Mar Rojo y el mejor '
                    'punto de entrada para buceadores de cualquier nivel. '
                    'En 7 dias combinas los pecios mas emblematicos del mundo '
                    'con arrecifes de coral de primer nivel.</p>'
                    '<p>Lo que incluye:</p>'
                    '<ul>'
                    '<li><strong>SS Thistlegorm</strong>: El mejor pecio del mundo. '
                    'Motocicletas BSA, locomotoras y material de guerra de la WWII a 30m.</li>'
                    '<li><strong>Abu Nuhas</strong>: 4 pecios en un solo arrecife (Giannis D, '
                    'Carnatic, Tile Wreck, Kimon M)</li>'
                    '<li><strong>Dunraven</strong>: Vapor victoriano de 1876</li>'
                    '<li><strong>Erg Abu Ramada</strong>: El acuario de Hurghada, perfecto para '
                    'buceo tranquilo entre inmersiones de pecios</li>'
                    '</ul>'
                    '<p><strong>Nivel requerido</strong>: Open Water minimo, Advanced recomendado.<br>'
                    '<strong>Duracion</strong>: 7 dias / 6 noches<br>'
                    '<strong>Precio</strong>: Desde 990€ por persona (pension completa + nitrox)</p>'
                    '<p>Reserva e itinerario completo: '
                    '<a href="/rutas/norte-7-dias">Ruta Norte 7 dias: Pecios desde Hurghada</a>.</p>'
                ),
                'id': 'rt-ruta-norte',
            },
            {
                'type': 'heading',
                'value': {'text': 'Ruta Brothers y Daedalus: Tiburones y Arrecifes Remotos', 'level': 'h2'},
                'id': 'h2-brothers',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Los <strong>Brothers (Al Akhawein)</strong> son dos islotes en aguas abiertas '
                    'del Mar Rojo sur, a mas de 60 millas de la costa. Son el destino por excelencia '
                    'para buceadores avanzados que buscan tiburones oceanos, mantarrayas y paredes '
                    'verticales de coral negro.</p>'
                    '<p>Lo mas destacado:</p>'
                    '<ul>'
                    '<li><strong>Big Brother</strong>: 2 pecios —el Numidia y el Aida— a 28-60m. '
                    'Paredes de coral negro y presencia garantizada de tiburones oceanos.</li>'
                    '<li><strong>Little Brother</strong>: Punta sur frecuentada por tiburones martillo '
                    '(septiembre-noviembre). La corriente aqui puede ser intensa.</li>'
                    '<li><strong>Elphinstone</strong>: Arrecife de aguas abiertas con mantarrayas '
                    'y tiburones oceanos en el "plateau" norte.</li>'
                    '</ul>'
                    '<p><strong>Nivel requerido</strong>: Advanced obligatorio. '
                    'Experiencia en corrientes recomendada.<br>'
                    '<strong>Duracion</strong>: 7-10 dias</p>'
                    '<p>Ver itinerario: <a href="/rutas/brothers-daedalus">Ruta Brothers y Daedalus</a>.</p>'
                ),
                'id': 'rt-brothers',
            },
            {
                'type': 'heading',
                'value': {'text': 'Ruta Sur Saint Johns: Corales Pristinos', 'level': 'h2'},
                'id': 'h2-sur',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>La <strong>Ruta Sur</strong> lleva hasta Saint Johns, en el extremo sur de Egipto, '
                    'cerca de la frontera con Sudan. Este area tiene los arrecifes de coral '
                    'menos perturbados del Mar Rojo: menos visita turistica, '
                    'agua mas calida y una fauna de arrecife excepcional.</p>'
                    '<p>Especialidad de la ruta: '
                    'paredes de coral impecables con corales blandos de colores intensos, '
                    'tiburones de arrecife residentes y posibilidad de ver dugongos '
                    '(el "unicornio" del Mar Rojo).</p>'
                    '<p><strong>Nivel requerido</strong>: Advanced recomendado.<br>'
                    '<strong>Duracion</strong>: 7-10 dias desde Marsa Alam</p>'
                    '<p>Ver itinerario: <a href="/rutas/sur-saint-johns">Ruta Sur Saint Johns</a>.</p>'
                ),
                'id': 'rt-sur',
            },
            {
                'type': 'heading',
                'value': {'text': 'Safari Norte-Sur: Lo Mejor de Ambos Mundos', 'level': 'h2'},
                'id': 'h2-safari',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>El <strong>Safari Norte-Sur</strong> combina la Ruta Norte (pecios) '
                    'con el sur (corales pristinos) en una unica expedicion. '
                    'Ideal para buceadores con mas tiempo disponible que quieren '
                    'ver el maximo en un solo viaje.</p>'
                    '<p>El barco sale de Hurghada y termina en Marsa Alam '
                    '(o viceversa), por lo que los vuelos de llegada y salida '
                    'son a ciudades diferentes. Requiere coordinacion logistica adicional.</p>'
                    '<p>Ver itinerario: <a href="/rutas/safari-norte-sur">Safari Norte-Sur del Mar Rojo</a>.</p>'
                ),
                'id': 'rt-safari',
            },
            {
                'type': 'heading',
                'value': {'text': 'Descubre el Mar Rojo: Ruta para Principiantes', 'level': 'h2'},
                'id': 'h2-descubre',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p><strong>Descubre el Mar Rojo</strong> es la ruta disenada especificamente '
                    'para buceadores Open Water o con poca experiencia en liveaboard. '
                    'Los spots seleccionados tienen profundidades moderadas, '
                    'corrientes suaves y arrecifes de coral accesibles.</p>'
                    '<p>Es tambien la ruta perfecta para obtener el '
                    'SSI Advanced Adventurer a bordo: '
                    'las inmersiones de formacion SON las inmersiones del viaje.</p>'
                    '<p><strong>Nivel requerido</strong>: Open Water Diver.<br>'
                    '<strong>Duracion</strong>: 5-7 dias</p>'
                    '<p>Ver itinerario: <a href="/rutas/descubre-mar-rojo">Descubre el Mar Rojo</a>.</p>'
                ),
                'id': 'rt-descubre',
            },
            {
                'type': 'heading',
                'value': {'text': 'Comparativas: Que Ruta Elegir', 'level': 'h2'},
                'id': 'h2-comparativas',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>Si tienes dudas entre varias rutas, nuestras comparativas te ayudan a decidir:</p>'
                    '<ul>'
                    '<li><a href="/blog/ruta-norte-vs-brothers-cual-elegir">'
                    'Ruta Norte vs Ruta Brothers: cual elegir segun tu nivel</a>: '
                    'La comparativa mas frecuente. Pecios vs fauna pelagica.</li>'
                    '<li><a href="/blog/hurghada-o-sharm-puerto-liveaboard">'
                    'Hurghada o Sharm el-Sheikh: mejor puerto para tu liveaboard</a>: '
                    'Decision logistica sobre desde donde salir.</li>'
                    '<li><a href="/blog/mejor-ruta-vida-a-bordo-nivel">'
                    'Mejor ruta segun tu nivel de buceo</a>: '
                    'Recomendacion personalizada por certificacion.</li>'
                    '</ul>'
                ),
                'id': 'rt-comparativas',
            },
            {
                'type': 'heading',
                'value': {'text': 'Cuando es la Mejor Temporada para cada Ruta', 'level': 'h2'},
                'id': 'h2-temporada-rutas',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>La temporada optima varia segun la ruta:</p>'
                    '<ul>'
                    '<li><strong>Ruta Norte (pecios)</strong>: Todo el ano. '
                    'Octubre-abril: mejor visibilidad. Junio-agosto: mas calor, menos gente.</li>'
                    '<li><strong>Ruta Brothers</strong>: Septiembre-noviembre para tiburones martillo. '
                    'El resto del ano tambien es bueno para tiburones oceanos.</li>'
                    '<li><strong>Ruta Sur</strong>: Octubre-abril, cuando el viento del norte '
                    'facilita la navegacion hacia el sur.</li>'
                    '</ul>'
                    '<p>Mas detalles: <a href="/blog/temporada-ruta-norte-mar-rojo">'
                    'mejor temporada para la Ruta Norte del Mar Rojo</a>.</p>'
                ),
                'id': 'rt-temporada-rutas',
            },
            {
                'type': 'heading',
                'value': {'text': 'Rutas Norte vs Ruta Sur: La Gran Diferencia', 'level': 'h2'},
                'id': 'h2-norte-sur',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>En pocas palabras:</p>'
                    '<ul>'
                    '<li><strong>Norte</strong>: Pecios historicos, arrecifes costeros, '
                    'mas accesible para principiantes, desde Hurghada</li>'
                    '<li><strong>Sur</strong>: Corales pristinos, menos turistas, '
                    'agua mas calida, desde Marsa Alam, requiere mas nivel</li>'
                    '</ul>'
                    '<p>Comparativa detallada: '
                    '<a href="/blog/ruta-norte-vs-ruta-sur-mar-rojo">'
                    'Ruta Norte vs Ruta Sur del Mar Rojo</a>.</p>'
                    '<p>Y para la decision del puerto de salida: '
                    '<a href="/blog/hurghada-vs-sharm-liveaboard">'
                    'Hurghada vs Sharm para un liveaboard</a>.</p>'
                ),
                'id': 'rt-norte-sur',
            },
            {
                'type': 'heading',
                'value': {'text': 'Reserva tu Ruta de Liveaboard', 'level': 'h2'},
                'id': 'h2-cta-rutas',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<p>¿Ya sabes que ruta quieres? Consulta disponibilidad y reserva directamente:</p>'
                    '<ul>'
                    '<li><a href="/rutas/norte-7-dias">Ruta Norte 7 dias — Pecios clasicos</a></li>'
                    '<li><a href="/rutas/brothers-daedalus">Ruta Brothers y Daedalus — Tiburones oceanos</a></li>'
                    '<li><a href="/rutas/sur-saint-johns">Ruta Sur Saint Johns — Corales pristinos</a></li>'
                    '<li><a href="/rutas/safari-norte-sur">Safari Norte-Sur — Lo mejor de ambas rutas</a></li>'
                    '<li><a href="/rutas/descubre-mar-rojo">Descubre el Mar Rojo — Para principiantes</a></li>'
                    '</ul>'
                    '<p>Si tienes dudas o quieres una recomendacion personalizada, '
                    '<a href="/contacto">contactanos</a>.</p>'
                ),
                'id': 'rt-cta-rutas',
            },
            {
                'type': 'heading',
                'value': {'text': 'Referencias y Fuentes', 'level': 'h2'},
                'id': 'h2-refs-rutas',
            },
            {
                'type': 'rich_text',
                'value': (
                    '<ul>'
                    '<li><a href="https://www.padi.com/dive-sites/red-sea/egypt" target="_blank" rel="noopener noreferrer">'
                    'PADI: Red Sea Dive Sites</a></li>'
                    '<li><a href="https://www.divessi.com/en/dive-destinations/red-sea" target="_blank" rel="noopener noreferrer">'
                    'SSI: Red Sea Dive Destination</a></li>'
                    '<li><a href="https://www.daneurope.org/en/travel-and-diving" target="_blank" rel="noopener noreferrer">'
                    'DAN Europe: Travel and Diving</a></li>'
                    '<li><a href="https://www.brothers-island.com/" target="_blank" rel="noopener noreferrer">'
                    'Brothers Islands: Marine Park Information</a></li>'
                    '</ul>'
                ),
                'id': 'rt-refs-rutas',
            },
        ],
    }
)


# ============================================================================
# Final summary
# ============================================================================

print("\n" + "="*60)
print("PILLAR PAGES CREATION COMPLETE")
print("="*60)

pillar_pages = BlogPostPage.objects.filter(cluster_role='pillar')
print(f"\nTotal pillar pages in Wagtail: {pillar_pages.count()}")
for p in pillar_pages:
    print(f"  - [{p.cluster_id}] {p.title} (slug: {p.slug}, id: {p.id})")

print("\nDone.")
