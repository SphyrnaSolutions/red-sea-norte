"""
Populate Wagtail CMS with 5 friction/logistics content pages.
Phase 26, Plan 01: FRIC-01, FRIC-02, FRIC-03, FRIC-04, AUTH-01, AUTH-02

Run inside Wagtail container:
  python manage.py shell < /tmp/populate_friction_content.py
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
# Setup: Get parent page, author, category
# ============================================================================

blog_index = BlogIndexPage.objects.first()
if not blog_index:
    print("ERROR: BlogIndexPage not found. Cannot create pages.")
    sys.exit(1)

author = Author.objects.filter(name__icontains='Karlos').first()
if not author:
    author = Author.objects.first()
    print(f"WARNING: 'Karlos' author not found, using: {author}")

category, _ = Category.objects.get_or_create(
    name='Logistica',
    defaults={'color': '#059669'}
)

print(f"Blog Index: {blog_index}")
print(f"Author: {author}")
print(f"Category: {category}")


def create_or_update_page(slug, title, data):
    """Create a new BlogPostPage or skip if exists."""
    existing = BlogPostPage.objects.filter(slug=slug).first()
    if existing:
        print(f"  SKIP: '{slug}' already exists (id={existing.id})")
        return existing

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
        schema_type=data['schema_type'],
    )

    blog_index.add_child(instance=page)
    page.save_revision().publish()
    print(f"  CREATED: '{slug}' (id={page.id})")
    return page


# ============================================================================
# Page 14: Que Llevar a un Liveaboard: Packing List Completo
# ============================================================================

print("\n--- Page 14: Packing List ---")
create_or_update_page(
    slug='que-llevar-liveaboard-packing-list',
    title='Que Llevar a un Liveaboard: Packing List Completo',
    data={
        'excerpt': 'Lista completa de que llevar a un liveaboard de buceo en el Mar Rojo. Equipo, ropa, documentos, botiquin y consejos de equipaje.',
        'read_time': '10 min',
        'meta_description': 'Lista completa de que llevar a un liveaboard de buceo en el Mar Rojo. Equipo de buceo, ropa, documentos, botiquin y consejos de equipaje.',
        'primary_keyword': 'que llevar liveaboard packing list buceo',
        'cluster_id': 'logistica',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Equipaje preparado para un liveaboard de buceo en el Mar Rojo',
        'body': [
            {'type': 'rich_text', 'value': '<p>Preparar la maleta para un <strong>liveaboard de buceo en el Mar Rojo</strong> requiere planificacion. Vas a pasar entre 5 y 7 dias a bordo de un barco, buceando varias veces al dia, y el espacio en los camarotes es limitado. Esta guia te ayuda a llevar todo lo necesario sin pasarte de peso ni olvidar nada esencial.</p><p>Si buscas una guia general de preparacion para tu viaje, consulta nuestro <a href="/blog/checklist-vida-a-bordo-mar-rojo">checklist de preparacion para vida a bordo</a>. Aqui nos centramos en <strong>que meter fisicamente en la maleta</strong>.</p>', 'id': 'intro-1'},
            {'type': 'heading', 'value': {'text': 'Equipo de buceo', 'level': 'h2'}, 'id': 'h2-equipo'},
            {'type': 'rich_text', 'value': '<p>La decision principal es si llevar tu propio equipo o alquilar a bordo. La mayoria de liveaboards incluyen equipo basico (regulador, BCD, traje), pero hay elementos que conviene llevar propios:</p><ul><li><strong>Mascara</strong>: Es el elemento mas personal. Lleva la tuya, bien ajustada a tu cara. Una mascara nueva puede empanarse; tratala con pasta de dientes antes del viaje.</li><li><strong>Aletas</strong>: Si tienes unas que te van bien, llevalas. Son pesadas pero marcan la diferencia en comodidad.</li><li><strong>Ordenador de buceo</strong>: Imprescindible si tienes uno. Los de alquiler no guardan tu historial de inmersiones ni tus configuraciones de nitrox. Modelos como el Suunto D5 o Shearwater Peregrine son compactos y fiables.</li><li><strong>Linterna de buceo</strong>: Para inmersiones nocturnas y explorar el interior de pecios como el <a href="/blog/ss-thistlegorm-guia-completa">SS Thistlegorm</a>. Potencia recomendada: 1000+ lumenes.</li><li><strong>Boya SMB</strong> (Surface Marker Buoy): Obligatoria en muchas operaciones. Si no tienes, la proporcionan a bordo, pero tener la tuya te da autonomia.</li><li><strong>Traje de neopreno</strong>: Si eres friolero/a, lleva el tuyo. La temperatura del agua en el Mar Rojo oscila entre 22-28°C segun la temporada. Un traje de 3mm es suficiente en verano; en invierno (diciembre-marzo), mejor 5mm.</li></ul><p>Si te interesa bucear con <a href="/blog/nitrox-a-bordo-mar-rojo">nitrox</a>, tu ordenador de buceo debe ser compatible con mezclas enriquecidas.</p>', 'id': 'rt-equipo'},
            {'type': 'heading', 'value': {'text': 'Ropa y proteccion solar', 'level': 'h2'}, 'id': 'h2-ropa'},
            {'type': 'rich_text', 'value': '<p>La vida a bordo es informal. No necesitas ropa elegante. Esto es lo esencial:</p><ul><li><strong>Ropa ligera y transpirable</strong>: Camisetas de manga corta, shorts, un par de banadores. El clima en Hurghada es calido y seco todo el ano.</li><li><strong>Sudadera o forro polar ligero</strong>: Las noches en cubierta pueden ser frescas, especialmente en invierno y cuando el barco navega.</li><li><strong>Protector solar reef-safe (mineral)</strong>: SPF50+, sin oxibenzona ni octinoxato. Los filtros quimicos danan los corales. Busca formulas con oxido de zinc o dioxido de titanio.</li><li><strong>Gafas de sol polarizadas</strong>: El reflejo del agua es intenso.</li><li><strong>Gorra o sombrero</strong>: La cubierta del barco tiene poca sombra.</li><li><strong>Sandalias o escarpines</strong>: Para moverte por el barco. La cubierta puede estar mojada.</li></ul>', 'id': 'rt-ropa'},
            {'type': 'heading', 'value': {'text': 'Documentos imprescindibles', 'level': 'h2'}, 'id': 'h2-docs'},
            {'type': 'rich_text', 'value': '<p>No salgas de casa sin estos documentos:</p><ul><li><strong>Pasaporte</strong>: Vigente al menos 6 meses desde la fecha de entrada a Egipto. Necesario para el <a href="/blog/visado-egipto-hurghada">visado de Egipto</a>.</li><li><strong>Certificacion de buceo</strong>: Tarjeta fisica + version digital (app PADI, SSI, CMAS). El dive center la verificara antes de la primera inmersion.</li><li><strong>Logbook</strong>: Digital o fisico. No es obligatorio en todos los liveaboards, pero lo pediran si quieres hacer inmersiones avanzadas.</li><li><strong>Seguro de buceo</strong>: Tarjeta DAN o equivalente. Imprescindible. Consulta nuestra guia de <a href="/blog/seguro-buceo-dan-egipto">seguro de buceo DAN para Egipto</a>.</li><li><strong>Comprobante de vuelo y reserva del liveaboard</strong>: En formato digital y una copia impresa como backup.</li></ul>', 'id': 'rt-docs'},
            {'type': 'heading', 'value': {'text': 'Botiquin basico', 'level': 'h2'}, 'id': 'h2-botiquin'},
            {'type': 'rich_text', 'value': '<p>El liveaboard tiene botiquin de emergencia y oxigeno, pero conviene llevar tu propio kit basico:</p><ul><li><strong>Biodramina o Mareol</strong>: Pastillas contra el mareo. Incluso si normalmente no te mareas, el oleaje puede sorprenderte. Tomalas preventivamente antes de zarpar.</li><li><strong>Protector solar y after-sun</strong>: Ya mencionado, pero es parte del botiquin.</li><li><strong>Tiritas y apositos impermeables</strong>: Para pequenos cortes o rozaduras del equipo.</li><li><strong>Medicacion personal</strong>: Si tomas medicacion cronica, lleva cantidad suficiente mas un margen extra.</li><li><strong>Gotas para oidos</strong>: Las infecciones de oido son frecuentes entre buceadores. Gotas de alcohol borico post-inmersion ayudan a prevenir la otitis del nadador.</li><li><strong>Ibuprofeno/paracetamol</strong>: Para dolores de cabeza o musculares post-inmersion.</li></ul>', 'id': 'rt-botiquin'},
            {'type': 'heading', 'value': {'text': 'Tecnologia y extras', 'level': 'h2'}, 'id': 'h2-tech'},
            {'type': 'rich_text', 'value': '<p>Algunos extras que mejoran la experiencia:</p><ul><li><strong>Camara submarina</strong>: GoPro con carcasa, camara compacta sumergible (Olympus TG-7), o mirrorless con carcasa para los mas serios.</li><li><strong>Cargadores y adaptador</strong>: Egipto usa enchufes tipo C y F (mismos que Europa). Lleva un ladron/regleta porque hay pocos enchufes por camarote.</li><li><strong>Power bank</strong>: Para cargar movil en cubierta.</li><li><strong>Bolsa estanca</strong>: Para proteger movil y documentos del agua y la sal. Una bolsa de 10-20L es suficiente.</li><li><strong>Tapones para los oidos</strong>: Para dormir. El motor del barco y otros pasajeros pueden hacer ruido.</li><li><strong>Candado para maleta</strong>: Opcional, pero util en aeropuertos.</li></ul>', 'id': 'rt-tech'},
            {'type': 'heading', 'value': {'text': 'Que NO llevar', 'level': 'h2'}, 'id': 'h2-no-llevar'},
            {'type': 'rich_text', 'value': '<p>Tan importante como lo que llevas es lo que dejas en casa:</p><ul><li><strong>Maleta rigida grande</strong>: Usa una bolsa flexible o mochila grande. El espacio de almacenamiento en camarotes es limitado y una maleta rigida no cabe debajo de la litera. Consejo: muchas aerolineas permiten facturar el equipo de buceo como equipaje deportivo aparte.</li><li><strong>Objetos de valor innecesarios</strong>: Joyas caras, portatil (salvo que sea imprescindible), tablets grandes. El ambiente es salino y humedo.</li><li><strong>Toallas de playa</strong>: El liveaboard proporciona toallas. Ahorra peso y espacio.</li><li><strong>Demasiada ropa</strong>: Vas a llevar banador y camiseta el 90% del tiempo.</li></ul><p>Recuerda revisar <a href="/blog/que-incluye-vida-a-bordo-mar-rojo">que incluye tu vida a bordo</a> para no duplicar cosas que ya te proporcionan.</p>', 'id': 'rt-no-llevar'},
            {'type': 'heading', 'value': {'text': 'Consejos practicos de equipaje', 'level': 'h2'}, 'id': 'h2-consejos'},
            {'type': 'rich_text', 'value': '<p>Algunos trucos de buceadores experimentados:</p><ul><li><strong>Peso maximo</strong>: La mayoria de aerolineas permiten 20-23 kg en bodega. Si llevas equipo de buceo propio, verifica si tu aerolinea ofrece franquicia de equipaje deportivo (muchas lo hacen gratuitamente o por un suplemento reducido).</li><li><strong>Factura el equipo de buceo aparte</strong>: Regulador, BCD y aletas en una bolsa de buceo. Ropa y resto en otra maleta.</li><li><strong>Bolsa de dia para cubierta</strong>: Una mochila pequena o bolsa de tela para llevar protector solar, gafas, camara y botella de agua a cubierta.</li><li><strong>Etiqueta tu equipo</strong>: Especialmente regulador y aletas. En un barco con 20 buceadores, todo se parece.</li></ul>', 'id': 'rt-consejos'},
            {'type': 'heading', 'value': {'text': 'Preparado para embarcar', 'level': 'h2'}, 'id': 'h2-cta'},
            {'type': 'rich_text', 'value': '<p>Con esta lista tienes todo lo necesario para disfrutar al maximo tu liveaboard en el Mar Rojo. Si tienes dudas sobre que llevar o quieres informacion personalizada segun la epoca del ano en que viajes, <a href="/contacto">contactanos y te orientamos</a>.</p><p>Explora nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard</a> para decidir tu proximo destino.</p>', 'id': 'rt-cta'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.padi.com/education/diving-knowledge/what-to-bring-on-a-liveaboard" target="_blank" rel="noopener noreferrer">PADI: What to Bring on a Liveaboard</a></li><li><a href="https://www.divessi.com/en/blog/packing-for-a-dive-trip" target="_blank" rel="noopener noreferrer">SSI: Packing for a Dive Trip</a></li><li><a href="https://www.daneurope.org/en/travel-and-diving" target="_blank" rel="noopener noreferrer">DAN Europe: Travel and Diving Safety</a></li></ul>', 'id': 'rt-refs'},
        ],
    }
)


# ============================================================================
# Page 15: Certificaciones de Buceo para el Mar Rojo
# ============================================================================

print("\n--- Page 15: Certificaciones ---")
create_or_update_page(
    slug='certificaciones-buceo-mar-rojo',
    title='Certificaciones de Buceo para el Mar Rojo: Minimos y Recomendados',
    data={
        'excerpt': 'Certificaciones minimas y recomendadas para bucear en el Mar Rojo. Open Water, Advanced, Nitrox: que necesitas segun tu ruta.',
        'read_time': '9 min',
        'meta_description': 'Certificaciones minimas y recomendadas para bucear en el Mar Rojo. Open Water, Advanced, Nitrox: que necesitas segun tu ruta de liveaboard.',
        'primary_keyword': 'certificaciones buceo mar rojo minimos',
        'cluster_id': 'logistica',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Tarjeta de certificacion de buceo para el Mar Rojo',
        'body': [
            {'type': 'rich_text', 'value': '<p>Una de las preguntas mas frecuentes antes de reservar un <strong>liveaboard en el Mar Rojo</strong> es: <em>\"que certificacion necesito?\"</em>. La respuesta corta: <strong>Open Water Diver es el minimo</strong>. La respuesta completa depende de la ruta que elijas y lo que quieras ver.</p><p>Si ya tienes claro que quieres hacer la Ruta Norte, consulta los <a href="/blog/requisitos-ruta-norte-mar-rojo">requisitos especificos de la Ruta Norte</a>.</p>', 'id': 'intro-cert'},
            {'type': 'heading', 'value': {'text': 'Nivel minimo para bucear en el Mar Rojo', 'level': 'h2'}, 'id': 'h2-minimo'},
            {'type': 'rich_text', 'value': '<p>El nivel minimo exigido por los operadores de liveaboard es <strong>Open Water Diver</strong> (OWD) o equivalente. Esto incluye:</p><ul><li><strong>PADI Open Water Diver</strong></li><li><strong>SSI Open Water Diver</strong></li><li><strong>CMAS 1 Estrella</strong> (equivalente reconocido internacionalmente)</li><li><strong>BSAC Ocean Diver</strong></li></ul><p>Todas las agencias de certificacion principales son reconocidas en Egipto. No importa si tu titulo es PADI, SSI, CMAS o BSAC: el nivel de competencia es lo que cuenta.</p><p>Con Open Water puedes bucear hasta <strong>18 metros de profundidad</strong>, lo cual te permite disfrutar de muchos arrecifes espectaculares. Sin embargo, algunos de los spots mas iconicos del Mar Rojo requieren mayor profundidad.</p>', 'id': 'rt-minimo'},
            {'type': 'heading', 'value': {'text': 'Que puedes hacer con cada certificacion', 'level': 'h2'}, 'id': 'h2-niveles'},
            {'type': 'rich_text', 'value': '<p>Aqui tienes un desglose practico de lo que abre cada nivel en el Mar Rojo:</p><ul><li><strong>Open Water (hasta 18m)</strong>: Arrecifes de coral, peces tropicales, algunos pecios como el Rosalie Moller (parte superior). Puedes disfrutar de la mayoria de spots de la Ruta Norte a profundidad limitada.</li><li><strong>Advanced Open Water (hasta 30m)</strong>: Acceso al interior del <a href="/blog/ss-thistlegorm-guia-completa">SS Thistlegorm</a>, la cubierta de carga y las bodegas. Pecios profundos de <a href="/blog/abu-nuhas-cementerio-de-barcos">Abu Nuhas</a>. La mayoria de spots del Mar Rojo se disfrutan plenamente con este nivel.</li><li><strong>Deep Diver (hasta 40m)</strong>: Zonas profundas de pecios, paredes verticales con formaciones de coral negro, encuentros con vida pelagica en aguas abiertas (Brothers, Elphinstone).</li></ul><p>En la practica, el <strong>Advanced Open Water</strong> es el nivel mas recomendado para sacar el maximo partido a un liveaboard en el Mar Rojo.</p>', 'id': 'rt-niveles'},
            {'type': 'heading', 'value': {'text': 'Certificaciones recomendadas segun la ruta', 'level': 'h2'}, 'id': 'h2-por-ruta'},
            {'type': 'rich_text', 'value': '<p>Cada ruta tiene diferentes exigencias:</p><ul><li><strong>Ruta Norte (Pecios)</strong>: Open Water es el minimo, pero Advanced es muy recomendable para bajar a las cubiertas de carga del Thistlegorm (25-30m) y explorar los pecios de Abu Nuhas en profundidad.</li><li><strong>Ruta Brothers/Daedalus</strong>: <strong>Advanced obligatorio</strong> en la mayoria de operadores. Corrientes fuertes, inmersiones en aguas abiertas, profundidades de 25-40m. Nitrox muy recomendado para extender tiempos de fondo.</li><li><strong>Ruta Sur (Saint Johns)</strong>: Advanced recomendado. Inmersiones de pared y corrientes moderadas.</li><li><strong>Ruta Descubre el Mar Rojo</strong>: Disenada para Open Water. Spots protegidos y profundidades moderadas.</li></ul>', 'id': 'rt-por-ruta'},
            {'type': 'heading', 'value': {'text': 'Sacarte el Advanced a bordo', 'level': 'h2'}, 'id': 'h2-advanced'},
            {'type': 'rich_text', 'value': '<p>Si solo tienes Open Water, no es un problema. En el <strong>M/Y Dolce Vita</strong> puedes obtener tu <strong>SSI Advanced Adventurer</strong> durante la travesia, sin perder ni una inmersion del viaje.</p><p>El curso se integra en las inmersiones de la ruta: tus inmersiones de formacion SON las inmersiones del viaje. No es un curso en piscina, sino formacion real en los mejores spots del Mar Rojo.</p><p>Incluye: material digital SSI, tarjeta de certificacion internacional, y las inmersiones de especialidad (Deep, Navigation, Perfect Buoyancy, Wreck). Lee mas sobre <a href="/blog/advanced-a-bordo-mar-rojo">sacarte el Advanced a bordo</a>.</p>', 'id': 'rt-advanced'},
            {'type': 'heading', 'value': {'text': 'Especialidades utiles para el Mar Rojo', 'level': 'h2'}, 'id': 'h2-especialidades'},
            {'type': 'rich_text', 'value': '<p>Mas alla del Advanced, estas especialidades mejoran tu experiencia:</p><ul><li><strong>Nitrox (EANx)</strong>: Permite usar mezclas con mayor porcentaje de oxigeno, extendiendo tu tiempo de fondo y reduciendo los intervalos de superficie. Especialmente util en pecios profundos donde quieres maximizar el tiempo abajo. En el M/Y Dolce Vita, el <a href="/blog/nitrox-a-bordo-mar-rojo">nitrox es gratuito</a>.</li><li><strong>Deep Diver</strong>: Formacion especifica para inmersiones entre 18-40m. Narcosis, planificacion de gas, procedimientos de emergencia.</li><li><strong>Wreck Diver</strong>: Tecnicas de penetracion en pecios. Para explorar el interior del Thistlegorm con seguridad.</li><li><strong>Perfect Buoyancy</strong>: Flotabilidad impecable = menos consumo de aire, mejor fotografia, menos dano al coral.</li></ul>', 'id': 'rt-especialidades'},
            {'type': 'heading', 'value': {'text': 'Como validar tu certificacion antes del viaje', 'level': 'h2'}, 'id': 'h2-validar'},
            {'type': 'rich_text', 'value': '<p>Antes de embarcar, asegurate de:</p><ul><li><strong>Llevar tarjeta fisica + version digital</strong>: Instala la app de tu agencia (PADI App, MySSI, CMAS Digital Card) y descarga tu certificacion para acceso offline.</li><li><strong>Verificar en la web de tu agencia</strong>: Si perdiste la tarjeta, puedes solicitar un reemplazo digital en <a href="https://www.padi.com/mypadi" target="_blank" rel="noopener noreferrer">padi.com/mypadi</a> o <a href="https://my.divessi.com" target="_blank" rel="noopener noreferrer">my.divessi.com</a>.</li><li><strong>Logbook actualizado</strong>: Si llevas tiempo sin bucear (mas de 6 meses), considera hacer una inmersion de refresco antes del viaje o avisar al dive center del liveaboard.</li><li><strong>Numero de certificacion</strong>: Anotalo en un lugar accesible. Algunos operadores lo piden para verificacion previa.</li></ul>', 'id': 'rt-validar'},
            {'type': 'heading', 'value': {'text': 'Listo para bucear', 'level': 'h2'}, 'id': 'h2-cta-cert'},
            {'type': 'rich_text', 'value': '<p>Ya sea con Open Water o con un puñado de especialidades, el Mar Rojo tiene rutas para todos los niveles. Si necesitas orientacion sobre que certificacion te conviene para la ruta que te interesa, <a href="/contacto">contactanos</a> y te asesoramos.</p><p>Si eres <a href="/blog/primer-liveaboard-open-water-mar-rojo">principiante planificando tu primer liveaboard</a>, tenemos rutas especialmente disenadas para ti.</p>', 'id': 'rt-cta-cert'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-cert'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.padi.com/courses" target="_blank" rel="noopener noreferrer">PADI: Niveles de Certificacion y Cursos</a></li><li><a href="https://www.divessi.com/en/courses" target="_blank" rel="noopener noreferrer">SSI: Programas de Formacion</a></li><li><a href="https://www.cmas.org/technique/standards-and-documents" target="_blank" rel="noopener noreferrer">CMAS: Estandares y Equivalencias</a></li></ul>', 'id': 'rt-refs-cert'},
        ],
    }
)


# ============================================================================
# Page 16: Seguro de Buceo y Camara Hiperbarica en Egipto
# ============================================================================

print("\n--- Page 16: Seguro y Camara Hiperbarica ---")
create_or_update_page(
    slug='seguro-buceo-camara-hiperbarica-egipto',
    title='Seguro de Buceo y Camara Hiperbarica en Egipto',
    data={
        'excerpt': 'Seguro de buceo recomendado y camaras hiperbaricas en Egipto. DAN, protocolos de emergencia y que hacer antes de tu liveaboard.',
        'read_time': '8 min',
        'meta_description': 'Seguro de buceo recomendado y ubicacion de camaras hiperbaricas en Egipto. DAN, protocolos de emergencia y que hacer antes de tu liveaboard.',
        'primary_keyword': 'seguro buceo camara hiperbarica egipto',
        'cluster_id': 'logistica',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Camara hiperbarica y equipo de seguridad para buceo en Egipto',
        'body': [
            {'type': 'rich_text', 'value': '<p>Bucear en el Mar Rojo es una experiencia extraordinaria, pero como toda actividad subacuatica, implica riesgos que debes cubrir con un <strong>seguro de buceo</strong> adecuado. Esta guia amplía la informacion de nuestro articulo sobre <a href="/blog/seguro-buceo-dan-egipto">seguro DAN para Egipto</a> con informacion sobre camaras hiperbaricas y protocolos de emergencia.</p>', 'id': 'intro-seguro'},
            {'type': 'heading', 'value': {'text': 'Por que necesitas seguro de buceo', 'level': 'h2'}, 'id': 'h2-porque'},
            {'type': 'rich_text', 'value': '<p>Un accidente de descompresion (enfermedad descompresiva o DCS) puede ocurrir incluso siguiendo las tablas y el ordenador al pie de la letra. El tratamiento requiere una <strong>camara hiperbarica</strong>, y cada sesion cuesta entre <strong>1.000 y 3.000 EUR</strong>. Un tratamiento completo puede superar los <strong>10.000 EUR</strong>.</p><p>Ademas, la evacuacion medica desde un barco en alta mar hasta el hospital mas cercano puede requerir helicoptero o lancha rapida, con costes que superan los 5.000 EUR. Sin seguro, estos gastos corren por tu cuenta.</p><p>El seguro de viaje estandar <strong>no cubre accidentes de buceo</strong>. Necesitas un seguro especifico para actividades subacuaticas.</p>', 'id': 'rt-porque'},
            {'type': 'heading', 'value': {'text': 'DAN (Divers Alert Network): el estandar', 'level': 'h2'}, 'id': 'h2-dan'},
            {'type': 'rich_text', 'value': '<p><strong>DAN Europe</strong> es la referencia mundial en seguros de buceo y asistencia a buceadores. La mayoria de operadores de liveaboard lo recomiendan o exigen.</p><p>Planes DAN Europe:</p><ul><li><strong>DAN Gold</strong>: Cobertura completa de accidentes de buceo + viaje. Incluye: tratamiento hiperbarico, evacuacion medica, repatriacion, cancelacion de viaje. Coste aproximado: 79-129 EUR/ano segun plan.</li><li><strong>DAN Silver</strong>: Cobertura de accidentes de buceo sin la parte de viaje. Mas economico: 49-79 EUR/ano.</li></ul><p>Lo que cubre DAN:</p><ul><li>Tratamiento en camara hiperbarica (sin limite de sesiones)</li><li>Evacuacion medica de emergencia</li><li>Repatriacion sanitaria</li><li>Asistencia telefonica 24/7 en multiples idiomas</li><li>Cobertura mundial (no solo Egipto)</li></ul><p>Contrata tu seguro DAN en <a href="https://www.daneurope.org" target="_blank" rel="noopener noreferrer">daneurope.org</a> al menos una semana antes del viaje.</p>', 'id': 'rt-dan'},
            {'type': 'heading', 'value': {'text': 'Otras opciones de seguro de buceo', 'level': 'h2'}, 'id': 'h2-otras'},
            {'type': 'rich_text', 'value': '<p>Aunque DAN es el estandar, existen alternativas:</p><ul><li><strong>DiveAssure</strong>: Seguro especializado en buceo con planes desde 85 USD/ano. Cobertura similar a DAN con algunas diferencias en limites.</li><li><strong>Seguro de viaje con cobertura de buceo</strong>: Algunas aseguradoras (IATI, Chapka, World Nomads) ofrecen cobertura de actividades de aventura que incluyen buceo. <strong>Verificacion critica</strong>: comprueba la profundidad maxima cubierta (muchos limitan a 30m o 40m) y las exclusiones (buceo en cuevas, descompresion obligatoria, etc.).</li></ul><p><strong>Recomendacion</strong>: Si buceas regularmente, DAN es la mejor relacion calidad-precio. Si es un viaje puntual, un seguro de viaje con cobertura de buceo verificada puede ser suficiente.</p>', 'id': 'rt-otras'},
            {'type': 'heading', 'value': {'text': 'Camaras hiperbaricas en el Mar Rojo', 'level': 'h2'}, 'id': 'h2-camaras'},
            {'type': 'rich_text', 'value': '<p>El Mar Rojo egipcio cuenta con varias camaras hiperbaricas operativas. Las principales:</p><ul><li><strong>Hurghada</strong>: Hospital Dr. Ahmed Galal y El Gouna Hospital. Tiempo de traslado desde las zonas de buceo de la Ruta Norte: 2-6 horas dependiendo de la posicion del barco.</li><li><strong>Sharm el-Sheikh</strong>: Hyperbaric Medical Center, operado por el Dr. Adel Taher (referencia mundial en medicina hiperbarica). Es el centro hiperbarico mas reconocido de todo el Mar Rojo. Tiempo desde Ras Mohammed: 1-2 horas.</li><li><strong>Marsa Alam</strong>: Hospital con camara hiperbarica para las rutas del sur. Tiempo desde Saint Johns: 4-8 horas.</li></ul><p>Los liveaboards profesionales tienen <strong>oxigeno de emergencia a bordo</strong> y estan en comunicacion permanente con los centros hiperbaricos via radio. El protocolo ante cualquier sospecha de DCS es administrar oxigeno al 100% y dirigirse al centro mas cercano.</p>', 'id': 'rt-camaras'},
            {'type': 'heading', 'value': {'text': 'Protocolos de emergencia', 'level': 'h2'}, 'id': 'h2-protocolos'},
            {'type': 'rich_text', 'value': '<p>En caso de accidente de buceo a bordo del liveaboard:</p><ol><li><strong>Aviso inmediato</strong>: Informa al dive guide y al capitan de cualquier sintoma (hormigueo, dolor articular, mareo, dificultad respiratoria, confusion).</li><li><strong>Oxigeno de emergencia</strong>: El buceador afectado recibe oxigeno puro al 100% de forma continua. Todos los liveaboards certificados llevan equipos DAN oxygen kit.</li><li><strong>Contacto con DAN</strong>: Linea de emergencia DAN 24/7: <strong>+39 06 4211 8685</strong> (desde cualquier pais). El medico DAN guia al capitan sobre los pasos a seguir.</li><li><strong>Evacuacion</strong>: Segun la gravedad, el barco se dirige al puerto mas cercano o se coordina evacuacion aerea/maritima hasta la camara hiperbarica.</li><li><strong>Documentacion</strong>: El dive guide registra el perfil de inmersion (profundidad, tiempo, mezcla) para el equipo medico.</li></ol><p>Para una vision mas amplia de <a href="/blog/seguridad-buceo-mar-rojo">seguridad en el buceo en el Mar Rojo</a>, consulta nuestra guia dedicada.</p>', 'id': 'rt-protocolos'},
            {'type': 'heading', 'value': {'text': 'Que hacer antes del viaje', 'level': 'h2'}, 'id': 'h2-antes'},
            {'type': 'rich_text', 'value': '<p>Checklist de seguridad pre-viaje:</p><ul><li><strong>Contrata el seguro ANTES de viajar</strong>: DAN no cubre incidentes si te registras despues de la inmersion. Contrata al menos 1 semana antes.</li><li><strong>Lleva la tarjeta DAN</strong>: Fisicamente en la cartera + foto en el movil. El numero de poliza debe ser accesible incluso sin internet.</li><li><strong>Anota los numeros de emergencia</strong>: DAN (+39 06 4211 8685), consulado espanol en El Cairo (+20 2 27356462), y el numero del operador del liveaboard.</li><li><strong>Informa al liveaboard</strong>: Comunica cualquier condicion medica relevante (asma, diabetes, medicacion) antes de embarcar. El formulario medico RSTC lo rellenarás el primer dia.</li><li><strong>Revision medica</strong>: Si tienes mas de 45 anos o condiciones medicas, obtén un certificado medico de aptitud para buceo (emitido por un medico con formacion en medicina subacuatica).</li></ul>', 'id': 'rt-antes'},
            {'type': 'heading', 'value': {'text': 'Bucear con tranquilidad', 'level': 'h2'}, 'id': 'h2-cta-seg'},
            {'type': 'rich_text', 'value': '<p>Con el seguro adecuado y conocimiento de los protocolos, puedes disfrutar del buceo en el Mar Rojo con total tranquilidad. Si tienes dudas sobre seguros o preparacion medica, <a href="/contacto">contactanos</a> y te orientamos.</p><p>Explora nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard</a> con la confianza de estar bien cubierto.</p>', 'id': 'rt-cta-seg'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-seg'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.daneurope.org" target="_blank" rel="noopener noreferrer">DAN Europe: Seguros y Asistencia al Buceador</a></li><li><a href="https://www.daneurope.org/en/emergency-hotline" target="_blank" rel="noopener noreferrer">DAN Europe: Linea de Emergencias 24/7</a></li><li><a href="https://www.hyperbaric-center.com/" target="_blank" rel="noopener noreferrer">Hyperbaric Medical Center Sharm el-Sheikh</a></li></ul>', 'id': 'rt-refs-seg'},
        ],
    }
)


# ============================================================================
# Page 17: Visa Egipto, Vuelos y Transfers para Buceadores
# ============================================================================

print("\n--- Page 17: Visa, Vuelos y Transfers ---")
create_or_update_page(
    slug='visa-egipto-vuelos-transfers-buceadores',
    title='Visa Egipto, Vuelos y Transfers para Buceadores',
    data={
        'excerpt': 'Guia completa de visa para Egipto, vuelos a Hurghada y transfers al puerto. Propinas, moneda y consejos para buceadores.',
        'read_time': '10 min',
        'meta_description': 'Guia completa de visa para Egipto, vuelos a Hurghada y transfers al puerto para buceadores. Propinas, moneda y consejos practicos.',
        'primary_keyword': 'visa egipto vuelos transfers buceadores hurghada',
        'cluster_id': 'logistica',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Aeropuerto de Hurghada y transfer al puerto para liveaboard',
        'body': [
            {'type': 'rich_text', 'value': '<p>Llegar a tu <strong>liveaboard en el Mar Rojo</strong> es mas sencillo de lo que parece, pero hay tramites y logistica que conviene tener claros antes de salir. Esta guia cubre todo: desde el <a href="/blog/visado-egipto-hurghada">visado de Egipto</a> hasta el transfer del aeropuerto al puerto de embarque.</p>', 'id': 'intro-visa'},
            {'type': 'heading', 'value': {'text': 'Visa de Egipto para espanoles', 'level': 'h2'}, 'id': 'h2-visa'},
            {'type': 'rich_text', 'value': '<p>Los ciudadanos espanoles necesitan visa para entrar en Egipto. La opcion mas comun es la <strong>visa on arrival</strong>:</p><ul><li><strong>Coste</strong>: 25 USD (se puede pagar en dolares o euros, al cambio del dia).</li><li><strong>Donde</strong>: En el aeropuerto de Hurghada, antes de pasar el control de pasaportes. Hay ventanillas de banco donde comprar el sello de visa.</li><li><strong>Requisitos</strong>: Pasaporte con al menos 6 meses de vigencia desde la fecha de entrada.</li><li><strong>Foto</strong>: No necesaria para la visa on arrival.</li><li><strong>Validez</strong>: 30 dias, entrada unica. Suficiente para un liveaboard de 1 semana.</li></ul><p>El proceso es rapido: compras el sello en la ventanilla del banco, lo pegas en el pasaporte, y presentas todo en el control de pasaportes. Tiempo total: 15-30 minutos segun la cola.</p>', 'id': 'rt-visa'},
            {'type': 'heading', 'value': {'text': 'E-visa como alternativa', 'level': 'h2'}, 'id': 'h2-evisa'},
            {'type': 'rich_text', 'value': '<p>Si prefieres tener todo gestionado antes de viajar, puedes solicitar la <strong>e-visa</strong>:</p><ul><li><strong>Web oficial</strong>: <a href="https://visa.egupt.travel" target="_blank" rel="noopener noreferrer">visa.egupt.travel</a> (ojo con webs fraudulentas; esta es la unica oficial).</li><li><strong>Coste</strong>: 25 USD + tasas de procesamiento (total ~32 USD).</li><li><strong>Procesamiento</strong>: 5-7 dias laborables. Solicitala con al menos 2 semanas de antelacion.</li><li><strong>Ventaja</strong>: Te saltas la cola del banco en el aeropuerto. Vas directamente al control de pasaportes.</li></ul><p>En temporada alta (julio-agosto, Navidad), la cola de visa on arrival puede ser larga. La e-visa te ahorra ese tiempo.</p>', 'id': 'rt-evisa'},
            {'type': 'heading', 'value': {'text': 'Como llegar a Hurghada', 'level': 'h2'}, 'id': 'h2-vuelos'},
            {'type': 'rich_text', 'value': '<p>Hurghada (aeropuerto HRG) es el punto de partida principal para liveaboards en el Mar Rojo norte.</p><p><strong>Vuelos directos desde Espana:</strong></p><ul><li>Madrid (MAD) - Hurghada (HRG): vuelos charter en temporada alta, ~5 horas.</li><li>Barcelona (BCN) - Hurghada (HRG): vuelos charter y low-cost estacionales, ~4.5 horas.</li></ul><p><strong>Conexiones mas comunes:</strong></p><ul><li>Via El Cairo con <strong>Egyptair</strong>: Madrid/Barcelona → Cairo (4-5h) + Cairo → Hurghada (1h). Tiempo total: 7-8 horas.</li><li>Via Estambul con <strong>Turkish Airlines</strong>: Madrid/Barcelona → Estambul (3.5h) + Estambul → Hurghada (2.5h). Total: 8-10 horas.</li><li>Via Roma/Milan con vuelos low-cost + Wizz Air a Hurghada.</li></ul><p>Consejo: busca vuelos con antelacion (2-3 meses) y compara en Skyscanner o Google Flights. Los vuelos charter en temporada alta suelen ser los mas baratos.</p>', 'id': 'rt-vuelos'},
            {'type': 'heading', 'value': {'text': 'Que esperar en el aeropuerto de Hurghada', 'level': 'h2'}, 'id': 'h2-aeropuerto'},
            {'type': 'rich_text', 'value': '<p>El aeropuerto de Hurghada es relativamente pequeno y funcional:</p><ul><li><strong>Terminal unica</strong>: No hay que hacer transbordo entre terminales.</li><li><strong>Cola de visados</strong>: Primero compras el sello de visa en la ventanilla del banco, luego pasas el control de pasaportes.</li><li><strong>Cambio de moneda</strong>: Hay casas de cambio en el aeropuerto, pero los tipos de cambio no son los mejores. Cambia solo lo minimo (20-50 EUR) para el taxi/propinas inmediatas. En el barco pagaras en EUR o USD.</li><li><strong>Cajeros ATM</strong>: Disponibles en la zona de llegadas. Tu tarjeta bancaria europea funcionara para sacar libras egipcias (EGP).</li><li><strong>WiFi</strong>: Disponible pero lento. Si necesitas datos moviles, puedes comprar una SIM local (Vodafone, Orange, Etisalat) en el aeropuerto por 5-10 EUR.</li></ul>', 'id': 'rt-aeropuerto'},
            {'type': 'heading', 'value': {'text': 'Transfer aeropuerto-puerto', 'level': 'h2'}, 'id': 'h2-transfer'},
            {'type': 'rich_text', 'value': '<p>La distancia del aeropuerto al puerto de Hurghada (marina) es corta: <strong>15-20 minutos en coche</strong>.</p><ul><li><strong>Transfer incluido</strong>: La mayoria de operadores de liveaboard incluyen el transfer aeropuerto-barco en el paquete. Confirma con tu operador al reservar.</li><li><strong>Si no esta incluido</strong>: Un taxi del aeropuerto al puerto cuesta 10-15 EUR (negocia antes de subirte o usa Uber/Careem que funcionan en Hurghada).</li><li><strong>Horario de embarque</strong>: Normalmente entre las 18:00 y las 22:00 del dia de inicio. Si tu vuelo llega por la manana, tendras tiempo libre en Hurghada antes de embarcar.</li></ul><p>Lee mas sobre <a href="/blog/como-llegar-a-hurghada-liveaboard">como llegar a Hurghada para tu liveaboard</a>.</p>', 'id': 'rt-transfer'},
            {'type': 'heading', 'value': {'text': 'Propinas y moneda', 'level': 'h2'}, 'id': 'h2-propinas'},
            {'type': 'rich_text', 'value': '<p>Las propinas son una parte importante de la cultura en Egipto y el liveaboard no es excepcion:</p><ul><li><strong>Crew del liveaboard</strong>: 50-100 EUR por semana por persona. Se deja en un sobre comun al final del viaje. Este dinero se reparte entre toda la tripulacion.</li><li><strong>Dive guides</strong>: 20-50 EUR por semana, aparte de la propina del crew. Si tu dive guide fue excepcional, dale la propina directamente.</li><li><strong>Moneda para propinas</strong>: EUR o USD son aceptados. No hace falta cambiar a libras egipcias para las propinas del barco.</li><li><strong>En restaurantes en tierra</strong>: 10-15% del total si el servicio fue bueno.</li></ul><p>La <strong>libra egipcia (EGP)</strong> es la moneda local. El tipo de cambio fluctua; consulta xe.com antes de viajar. En zonas turisticas de Hurghada aceptan euros y dolares, pero a un tipo de cambio menos favorable.</p>', 'id': 'rt-propinas'},
            {'type': 'heading', 'value': {'text': 'Recomendaciones practicas', 'level': 'h2'}, 'id': 'h2-recomendaciones'},
            {'type': 'rich_text', 'value': '<p>Consejos de buceadores que ya han hecho el viaje:</p><ul><li><strong>Llega un dia antes del embarque</strong>: Si tu vuelo llega de noche o con conexion, reserva una noche en un hotel economico en Hurghada (20-40 EUR). Mejor empezar el liveaboard descansado que llegar con prisa.</li><li><strong>Lleva EUR/USD en efectivo</strong>: Para visa (25 USD), propinas (50-100 EUR) y gastos menores. Total recomendado en efectivo: 150-200 EUR.</li><li><strong>Tarjeta bancaria como backup</strong>: No todos los cajeros funcionan con todas las tarjetas. Lleva al menos dos tarjetas diferentes (Visa + Mastercard).</li><li><strong>Seguro de cancelacion de vuelo</strong>: Un vuelo cancelado puede hacerte perder el embarque. Considera un seguro que cubra cancelaciones.</li></ul>', 'id': 'rt-recomendaciones'},
            {'type': 'heading', 'value': {'text': 'Tu viaje empieza aqui', 'level': 'h2'}, 'id': 'h2-cta-visa'},
            {'type': 'rich_text', 'value': '<p>Con la logistica resuelta, solo falta elegir tu ruta y reservar. Si necesitas ayuda con los tramites o quieres que te orientemos sobre la mejor fecha para viajar, <a href="/contacto">contactanos</a>.</p><p>Descubre nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard desde Hurghada</a>.</p>', 'id': 'rt-cta-visa'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-visa'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.exteriores.gob.es/Embajadas/elcairo/es/Paginas/index.aspx" target="_blank" rel="noopener noreferrer">Ministerio de Asuntos Exteriores de Espana: Ficha de Egipto</a></li><li><a href="https://visa.egupt.travel" target="_blank" rel="noopener noreferrer">Portal oficial de e-visa de Egipto</a></li><li><a href="https://www.egyptair.com" target="_blank" rel="noopener noreferrer">Egyptair: Vuelos a Hurghada</a></li></ul>', 'id': 'rt-refs-visa'},
        ],
    }
)


# ============================================================================
# Page 26: Propinas y Dinero en un Liveaboard de Buceo
# ============================================================================

print("\n--- Page 26: Propinas y Dinero ---")
create_or_update_page(
    slug='propinas-dinero-liveaboard-buceo',
    title='Propinas y Dinero en un Liveaboard de Buceo',
    data={
        'excerpt': 'Propinas en un liveaboard de buceo en Egipto: cuanto dar al crew, moneda, presupuesto extra y consejos para llevar dinero.',
        'read_time': '7 min',
        'meta_description': 'Propinas recomendadas en un liveaboard de buceo en Egipto. Cuanto dar al crew, moneda, presupuesto extra y consejos para llevar dinero.',
        'primary_keyword': 'propinas dinero liveaboard buceo egipto',
        'cluster_id': 'logistica',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Propinas y moneda para liveaboard de buceo en Egipto',
        'body': [
            {'type': 'rich_text', 'value': '<p>Una de las dudas mas comunes antes de un <strong>liveaboard de buceo en Egipto</strong> es cuanto dinero llevar ademas del coste del viaje. Las propinas, las bebidas extra y los pequenos gastos pueden sumar. Esta guia te da las cifras reales para que puedas presupuestar con precision.</p>', 'id': 'intro-propinas'},
            {'type': 'heading', 'value': {'text': 'Cuanto dar de propina en un liveaboard', 'level': 'h2'}, 'id': 'h2-cuanto'},
            {'type': 'rich_text', 'value': '<p>Las propinas en un liveaboard de buceo no son obligatorias, pero son una norma social importante en Egipto y la principal fuente de ingresos extra para la tripulacion.</p><ul><li><strong>Crew general</strong> (cocinero, marineros, personal de limpieza): <strong>50-100 EUR por semana por persona</strong>. Se recoge normalmente el penultimo dia en un sobre comun que se reparte entre toda la tripulacion.</li><li><strong>Dive guides</strong>: <strong>20-50 EUR por semana por persona</strong>, entregado directamente y aparte del sobre del crew. Si tuviste un guia excepcional que encontro el tiburon ballena o te enseno un rincon secreto del Thistlegorm, la propina lo refleja.</li><li><strong>Capitan</strong>: Generalmente incluido en el sobre del crew, pero algunos viajeros dejan un extra directo si la navegacion fue excelente.</li></ul><p>Ejemplo para una semana: si vas en pareja, un presupuesto razonable de propinas seria 150-200 EUR entre los dos (75-100 EUR por persona para crew + 30-50 EUR por persona para dive guides).</p>', 'id': 'rt-cuanto'},
            {'type': 'heading', 'value': {'text': 'Moneda en Egipto', 'level': 'h2'}, 'id': 'h2-moneda'},
            {'type': 'rich_text', 'value': '<p>La moneda oficial es la <strong>libra egipcia (EGP)</strong>. El tipo de cambio fluctua significativamente; consulta <a href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=EGP" target="_blank" rel="noopener noreferrer">xe.com</a> antes de viajar.</p><ul><li><strong>Donde cambiar</strong>: Evita el aeropuerto (peores tipos de cambio). En Hurghada hay casas de cambio y ATMs con mejores rates. Cadenas de banco como CIB y Banque Misr ofrecen buenos tipos.</li><li><strong>ATMs en Hurghada</strong>: Hay cajeros en la zona turistica de El Dahar y en Sakkala. Visa y Mastercard funcionan en la mayoria. Comision tipica: 30-50 EGP por extraccion.</li><li><strong>Tarjetas de credito</strong>: Aceptadas en hoteles y restaurantes grandes de Hurghada. En el liveaboard, generalmente <strong>no</strong> aceptan tarjeta para extras (cervezas, souvenirs). Lleva efectivo.</li><li><strong>EUR y USD</strong>: Aceptados en zonas turisticas y para propinas del liveaboard. El euro y el dolar son las monedas preferidas para propinas.</li></ul>', 'id': 'rt-moneda'},
            {'type': 'heading', 'value': {'text': 'Presupuesto extra tipico', 'level': 'h2'}, 'id': 'h2-presupuesto'},
            {'type': 'rich_text', 'value': '<p>Ademas del coste del liveaboard (que incluye alojamiento, comidas, inmersiones y equipo basico), estos son los gastos extra tipicos:</p><table><thead><tr><th>Concepto</th><th>Coste orientativo</th></tr></thead><tbody><tr><td>Propinas crew + guides</td><td>75-150 EUR/semana</td></tr><tr><td>Bebidas extra (cerveza, vino)</td><td>20-50 EUR/semana</td></tr><tr><td>Nitrox (si no incluido)</td><td>30-50 EUR/semana</td></tr><tr><td>Recuerdos/souvenirs</td><td>10-30 EUR</td></tr><tr><td>Hotel pre/post liveaboard</td><td>20-40 EUR/noche</td></tr><tr><td>Excursion en tierra (opcional)</td><td>20-50 EUR</td></tr></tbody></table><p><strong>Presupuesto extra total orientativo: 150-300 EUR por semana por persona.</strong></p><p>Si quieres saber que esta incluido en el precio base, consulta <a href="/blog/que-incluye-vida-a-bordo-mar-rojo">que incluye una vida a bordo</a> y <a href="/blog/precio-vida-a-bordo-mar-rojo">precios de vida a bordo en el Mar Rojo</a>.</p>', 'id': 'rt-presupuesto'},
            {'type': 'heading', 'value': {'text': 'Que esta incluido y que no', 'level': 'h2'}, 'id': 'h2-incluido'},
            {'type': 'rich_text', 'value': '<p>Para evitar sorpresas, aqui tienes el desglose tipico:</p><p><strong>Incluido en el precio:</strong></p><ul><li>Alojamiento en camarote compartido o privado</li><li>Pension completa (desayuno, almuerzo, cena, snacks)</li><li>Agua, te, cafe ilimitados</li><li>2-4 inmersiones diarias con guia</li><li>Equipo basico de buceo (BCD, regulador, traje, lastre)</li><li>Transfer aeropuerto-barco (confirmar con operador)</li></ul><p><strong>NO incluido:</strong></p><ul><li>Propinas</li><li>Bebidas alcoholicas y refrescos</li><li>Alquiler de equipo especializado (linterna, camara, etc.)</li><li>Nitrox (en algunos operadores; en M/Y Dolce Vita es gratuito)</li><li>Excursiones en tierra</li><li>Seguro de buceo</li></ul>', 'id': 'rt-incluido'},
            {'type': 'heading', 'value': {'text': 'Consejos para llevar dinero', 'level': 'h2'}, 'id': 'h2-consejos-dinero'},
            {'type': 'rich_text', 'value': '<p>Recomendaciones practicas:</p><ul><li><strong>Lleva EUR o USD en efectivo para propinas y visa</strong>: 150-200 EUR en billetes pequenos (5, 10, 20 EUR) mas 25 USD para la visa.</li><li><strong>Tarjeta bancaria como backup</strong>: Para emergencias y extracciones en ATM. Avisa a tu banco de que viajas a Egipto para que no bloqueen la tarjeta.</li><li><strong>No lleves cantidades excesivas</strong>: El liveaboard tiene caja fuerte, pero no es necesario llevar mas de 300 EUR en efectivo.</li><li><strong>Sobre para propinas</strong>: Prepara un sobre con el nombre del barco y la cantidad. El ultimo dia se entrega al jefe de tripulacion.</li><li><strong>Moneda pequena local</strong>: Cambia 20-30 EUR a libras egipcias para taxis, tiendas o snacks en tierra.</li></ul>', 'id': 'rt-consejos-dinero'},
            {'type': 'heading', 'value': {'text': 'Presupuesto listo', 'level': 'h2'}, 'id': 'h2-cta-prop'},
            {'type': 'rich_text', 'value': '<p>Con este desglose ya puedes calcular el presupuesto total de tu viaje. Si tienes dudas o quieres un presupuesto personalizado para tu grupo, <a href="/contacto">contactanos</a>.</p><p>Consulta nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard</a> con precios actualizados.</p>', 'id': 'rt-cta-prop'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-prop'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=EGP" target="_blank" rel="noopener noreferrer">XE.com: Conversor EUR/EGP</a></li><li><a href="https://www.lonelyplanet.com/egypt/money-costs" target="_blank" rel="noopener noreferrer">Lonely Planet: Dinero y Costes en Egipto</a></li><li><a href="https://www.daneurope.org/en/travel-and-diving" target="_blank" rel="noopener noreferrer">DAN Europe: Preparacion para Viajes de Buceo</a></li></ul>', 'id': 'rt-refs-prop'},
        ],
    }
)


print("\n====================================")
print("FRICTION CONTENT POPULATION COMPLETE")
print("====================================")
print("Pages created/skipped: 5")
print("Cluster: logistica")
print("Requirements: FRIC-01, FRIC-02, FRIC-03, FRIC-04, AUTH-01, AUTH-02")
