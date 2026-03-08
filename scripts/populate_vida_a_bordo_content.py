"""
Populate Wagtail CMS with 6 vida-a-bordo satellite content pages.
Phase 26, Plan 02: AUTH-01, AUTH-02

Run inside Wagtail container:
  docker exec -i redsea_web_prod python manage.py shell < /tmp/populate_vida_a_bordo_content.py
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
# Setup
# ============================================================================

blog_index = BlogIndexPage.objects.first()
if not blog_index:
    print("ERROR: BlogIndexPage not found.")
    sys.exit(1)

author = Author.objects.filter(name__icontains='Karlos').first()
if not author:
    author = Author.objects.first()
    print(f"WARNING: 'Karlos' not found, using: {author}")

category, _ = Category.objects.get_or_create(
    name='Vida a bordo',
    defaults={'color': '#0284C7'}
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
# Page 19: Un Dia Tipico en un Liveaboard de Buceo
# ============================================================================

print("\n--- Page 19: Dia Tipico ---")
create_or_update_page(
    slug='dia-tipico-liveaboard-buceo',
    title='Un Dia Tipico en un Liveaboard de Buceo',
    data={
        'excerpt': 'Asi es un dia tipico en un liveaboard de buceo en el Mar Rojo. Horarios, inmersiones, comidas y vida a bordo hora a hora.',
        'read_time': '8 min',
        'meta_description': 'Asi es un dia tipico en un liveaboard de buceo en el Mar Rojo. Horarios, inmersiones, comidas y vida a bordo hora a hora.',
        'primary_keyword': 'dia tipico liveaboard buceo horarios',
        'cluster_id': 'vida-a-bordo',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Buceadores en cubierta de un liveaboard al amanecer en el Mar Rojo',
        'body': [
            {'type': 'rich_text', 'value': '<p>Si te preguntas <strong>como es un dia a bordo de un liveaboard de buceo</strong>, esta guia te lo cuenta hora a hora. Un liveaboard en el Mar Rojo sigue un ritmo disenado para maximizar las inmersiones aprovechando las mejores condiciones de cada momento del dia.</p><p>Para una vision mas general de la experiencia, consulta <a href="/blog/como-es-un-vida-a-bordo-mar-rojo">como es una vida a bordo en el Mar Rojo</a>. Aqui entramos en el detalle del horario diario.</p>', 'id': 'intro-dia'},
            {'type': 'heading', 'value': {'text': 'Antes de la primera inmersion (6:00 - 7:30)', 'level': 'h2'}, 'id': 'h2-manana'},
            {'type': 'rich_text', 'value': '<p>El dia empieza temprano en un liveaboard. No es obligatorio madrugar, pero los buceadores experimentados saben que las primeras horas son las mejores:</p><ul><li><strong>6:00 - 6:30</strong>: El sol empieza a salir. Algunos madrugadores toman un cafe en cubierta mientras el barco esta fondeado en el spot del dia. Es uno de los momentos mas magicos: silencio absoluto, agua cristalina y el arrecife justo debajo.</li><li><strong>6:30 - 7:00</strong>: Desayuno ligero disponible. Cafe, te, tostadas, fruta y cereales. La mayoria come algo ligero antes de la primera inmersion. Evita comidas pesadas.</li><li><strong>7:00 - 7:30</strong>: <strong>Briefing del dia</strong>. El dive guide explica el plan: que spots se visitaran, condiciones de corriente, vida marina esperada, profundidad maxima y puntos de interes. Es el momento de preguntar dudas.</li></ul>', 'id': 'rt-manana'},
            {'type': 'heading', 'value': {'text': 'Primera inmersion de la manana (7:30 - 9:00)', 'level': 'h2'}, 'id': 'h2-primera'},
            {'type': 'rich_text', 'value': '<p>La primera inmersion del dia es, para muchos, la mejor:</p><ul><li><strong>Visibilidad optima</strong>: La luz de la manana penetra el agua con angulo bajo, creando efectos espectaculares en los arrecifes. La visibilidad suele ser maxima temprano.</li><li><strong>Vida marina activa</strong>: Muchas especies son mas activas al amanecer. Es el mejor momento para ver tortugas, rayas, morenas saliendo a cazar, y cardumenes compactos.</li><li><strong>Profundidad media</strong>: La primera inmersion suele ser la mas profunda del dia (20-30m), aprovechando que estas descansado y con el aire lleno. Si hay un pecio profundo como el <a href="/blog/ss-thistlegorm-guia-completa">SS Thistlegorm</a>, sera la primera inmersion.</li><li><strong>Duracion tipica</strong>: 45-60 minutos dependiendo de la profundidad y el consumo de aire.</li></ul>', 'id': 'rt-primera'},
            {'type': 'heading', 'value': {'text': 'Intervalo de superficie y segunda inmersion (9:00 - 12:00)', 'level': 'h2'}, 'id': 'h2-segunda'},
            {'type': 'rich_text', 'value': '<p>Entre inmersiones, el barco cobra vida:</p><ul><li><strong>9:00 - 10:00</strong>: Regreso al barco, desmontar equipo, snack post-inmersion (fruta, galletas, zumo). Es el momento de compartir impresiones: \"has visto la tortuga en la bodega del pecio?\" El equipo se aclara con agua dulce.</li><li><strong>10:00 - 10:30</strong>: Cambio de botella, revision de equipo, hidratacion. El intervalo de superficie minimo es de 60-90 minutos para inmersiones repetitivas.</li><li><strong>10:30 - 12:00</strong>: <strong>Segunda inmersion</strong>. Normalmente a menor profundidad que la primera (12-20m), mas relajada, enfocada en arrecifes someros ricos en vida marina. Ideal para fotografia con buena luz natural. Duracion: 50-70 minutos.</li></ul>', 'id': 'rt-segunda'},
            {'type': 'heading', 'value': {'text': 'Almuerzo y descanso (12:00 - 14:30)', 'level': 'h2'}, 'id': 'h2-almuerzo'},
            {'type': 'rich_text', 'value': '<p>El almuerzo en un liveaboard es un evento social:</p><ul><li><strong>12:00 - 13:00</strong>: <strong>Buffet completo</strong>. Plato principal (carne o pescado), ensaladas variadas, guarniciones, arroz, pasta. El cocinero del liveaboard suele mezclar cocina internacional con platos egipcios. La comida es sorprendentemente buena dada la logistica de cocinar en un barco.</li><li><strong>13:00 - 14:30</strong>: <strong>Tiempo libre</strong>. Siesta en cubierta (con protector solar), leer, revisar fotos de la manana, charlar con otros buceadores. El barco navega hasta el siguiente spot mientras descansas. Es el momento mas relajado del dia.</li></ul><p>Para mas detalles sobre la gastronomia, consulta nuestra guia de <a href="/blog/que-incluye-vida-a-bordo-mar-rojo">que incluye la vida a bordo</a>.</p>', 'id': 'rt-almuerzo'},
            {'type': 'heading', 'value': {'text': 'Tercera inmersion de la tarde (14:30 - 16:30)', 'level': 'h2'}, 'id': 'h2-tercera'},
            {'type': 'rich_text', 'value': '<p>La inmersion de la tarde tiene un caracter diferente:</p><ul><li><strong>Inmersion relajada</strong>: Profundidad moderada (10-18m), ritmo tranquilo, ideal para practicar flotabilidad y disfrutar del paisaje submarino sin presion.</li><li><strong>Luz de la tarde</strong>: La luz se vuelve mas calida y dorada. Excelente para fotografia y video.</li><li><strong>Observacion de vida marina</strong>: Los cardumenes se reagrupan, los peces payaso estan activos en sus anemonas, los nudibranquios son mas visibles.</li><li><strong>Posibilidad de snorkel</strong>: Si alguien prefiere no bucear en la tercera inmersion, el snorkel en los arrecifes someros del Mar Rojo es espectacular.</li></ul>', 'id': 'rt-tercera'},
            {'type': 'heading', 'value': {'text': 'Inmersion nocturna opcional (19:00 - 20:00)', 'level': 'h2'}, 'id': 'h2-nocturna'},
            {'type': 'rich_text', 'value': '<p>No todas las noches hay inmersion nocturna, pero cuando la hay, es una experiencia transformadora:</p><ul><li><strong>El Mar Rojo de noche</strong>: El arrecife se transforma completamente. Pulpos salen a cazar, langostas pasean por las rocas, corales se abren para alimentarse, y con suerte veras plancton bioluminiscente.</li><li><strong>Equipo</strong>: Linterna principal + backup (normalmente proporcionadas por el liveaboard). Luz quimica en la valvula del BCD como referencia.</li><li><strong>Profundidad</strong>: 10-15m maximo. No se busca profundidad sino observar la vida nocturna de cerca.</li><li><strong>Duracion</strong>: 35-45 minutos. Corta pero intensa.</li></ul><p>La inmersion nocturna es opcional. Si prefieres disfrutar de la cena y la cubierta bajo las estrellas, perfecto.</p>', 'id': 'rt-nocturna'},
            {'type': 'heading', 'value': {'text': 'Cena y velada en cubierta (20:00 - 22:00)', 'level': 'h2'}, 'id': 'h2-cena'},
            {'type': 'rich_text', 'value': '<p>La cena es el momento estrella del dia social:</p><ul><li><strong>20:00 - 21:00</strong>: <strong>Cena completa</strong>. Platos principales mas elaborados que el almuerzo: pescado a la brasa, kebab, pasta, y postres egipcios como baklava o om ali.</li><li><strong>21:00 - 22:00</strong>: <strong>Velada en cubierta</strong>. Con el motor apagado y fondeados en el spot, la cubierta superior se convierte en el salon social. Revision de fotos del dia proyectadas en una pantalla, charlas sobre las inmersiones, planificacion del dia siguiente con el dive guide.</li><li><strong>El cielo estrellado</strong>: Sin contaminacion luminica en medio del mar, el cielo del Mar Rojo es espectacular. La Via Lactea se ve a simple vista. Llevar una app de astronomia es recomendable.</li></ul><p>La mayoria de buceadores se acuestan entre las 22:00 y las 23:00. El dia siguiente empieza temprano otra vez.</p>', 'id': 'rt-cena'},
            {'type': 'heading', 'value': {'text': 'Vive tu propio dia en el Mar Rojo', 'level': 'h2'}, 'id': 'h2-cta-dia'},
            {'type': 'rich_text', 'value': '<p>Cada dia en un liveaboard es diferente porque cada spot revela algo nuevo. Si quieres vivir este ritmo de inmersiones, sol y estrellas, <a href="/contacto">contactanos</a> y te ayudamos a elegir la mejor ruta.</p><p>Descubre nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard desde Hurghada</a>.</p>', 'id': 'rt-cta-dia'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-dia'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.padi.com/education/diving-knowledge/liveaboard-diving" target="_blank" rel="noopener noreferrer">PADI: Guia de Liveaboard Diving</a></li><li><a href="https://www.divessi.com/en/blog/what-to-expect-on-a-liveaboard" target="_blank" rel="noopener noreferrer">SSI: What to Expect on a Liveaboard</a></li><li><a href="https://www.daneurope.org/en/fitness-to-dive" target="_blank" rel="noopener noreferrer">DAN Europe: Aptitud para Bucear y Descanso entre Inmersiones</a></li></ul>', 'id': 'rt-refs-dia'},
        ],
    }
)


# ============================================================================
# Page 20: Formacion de Buceo a Bordo: SSI Advanced y Especialidades
# ============================================================================

print("\n--- Page 20: Formacion a Bordo ---")
create_or_update_page(
    slug='formacion-buceo-bordo-ssi-especialidades',
    title='Formacion de Buceo a Bordo: SSI Advanced y Especialidades',
    data={
        'excerpt': 'Formacion de buceo a bordo del liveaboard: SSI Advanced, especialidades y Nitrox durante tu viaje al Mar Rojo.',
        'read_time': '8 min',
        'meta_description': 'Formacion de buceo a bordo del liveaboard: SSI Advanced, especialidades y Nitrox durante tu viaje al Mar Rojo. Todo incluido.',
        'primary_keyword': 'formacion buceo a bordo ssi especialidades',
        'cluster_id': 'vida-a-bordo',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Instructor SSI ensenando buceo a bordo del liveaboard en el Mar Rojo',
        'body': [
            {'type': 'rich_text', 'value': '<p>Una de las grandes ventajas de un <strong>liveaboard en el Mar Rojo</strong> es que puedes <strong>formarte mientras viajas</strong>. No pierdes inmersiones: las inmersiones de formacion son las mismas inmersiones espectaculares del viaje. Esta guia amplía la informacion de nuestro articulo sobre <a href="/blog/advanced-a-bordo-mar-rojo">sacarte el Advanced a bordo</a> para cubrir todo el abanico de formacion disponible.</p>', 'id': 'intro-form'},
            {'type': 'heading', 'value': {'text': 'SSI Advanced Adventurer a bordo', 'level': 'h2'}, 'id': 'h2-advanced'},
            {'type': 'rich_text', 'value': '<p>El <strong>SSI Advanced Adventurer</strong> es la certificacion mas popular para obtener a bordo. Lo que necesitas saber:</p><ul><li><strong>Requisito previo</strong>: SSI Open Water Diver o equivalente (PADI OW, CMAS 1 estrella).</li><li><strong>Duracion</strong>: 2-3 dias integrados en la travesia.</li><li><strong>Que incluye</strong>: 5 inmersiones de especialidad (Deep, Navigation, y 3 a elegir entre Wreck, Night, Perfect Buoyancy, Boat Diving).</li><li><strong>Teoria</strong>: Material digital SSI que puedes estudiar en tu movil/tablet antes del viaje o durante los intervalos de superficie. No hay examen escrito formal.</li><li><strong>Al finalizar</strong>: Tarjeta de certificacion internacional SSI Advanced Adventurer, reconocida mundialmente. Te habilita para bucear hasta 30 metros.</li></ul><p>Lo importante: <strong>no es un curso en piscina</strong>. Tus inmersiones de formacion son en los mismos spots que el resto del grupo. Cuando haces la inmersion de Wreck Diving, la haces en el <a href="/blog/ss-thistlegorm-guia-completa">SS Thistlegorm</a> o en <a href="/blog/abu-nuhas-cementerio-de-barcos">Abu Nuhas</a>.</p>', 'id': 'rt-advanced'},
            {'type': 'heading', 'value': {'text': 'Especialidades disponibles durante la travesia', 'level': 'h2'}, 'id': 'h2-especialidades'},
            {'type': 'rich_text', 'value': '<p>Ademas del Advanced, puedes obtener especialidades individuales durante el viaje:</p><ul><li><strong>Deep Diving</strong>: Tecnicas para inmersiones entre 18-40m. Gestion de la narcosis nitrogenada, planificacion de gas, tiempos de descompresion. Imprescindible si quieres explorar los pecios mas profundos del Mar Rojo.</li><li><strong>Wreck Diving</strong>: Tecnicas de penetracion en pecios: lineas de guia, gestion del silt (sedimento), navegacion en espacios confinados. El Mar Rojo tiene algunos de los mejores pecios del mundo para practicar.</li><li><strong>Perfect Buoyancy</strong>: Control preciso de la flotabilidad. Menos consumo de aire, mejor fotografia, cero dano al coral. Es la especialidad que mas impacto tiene en tu buceo dia a dia.</li><li><strong>Navigation</strong>: Navegacion subacuatica con brujula y referencias naturales. Util cuando buceas en solitario o como buddy leader.</li></ul>', 'id': 'rt-especialidades'},
            {'type': 'heading', 'value': {'text': 'Nitrox: la especialidad mas util', 'level': 'h2'}, 'id': 'h2-nitrox'},
            {'type': 'rich_text', 'value': '<p>El <strong>Nitrox (Enriched Air)</strong> merece mencion aparte por su utilidad practica en el Mar Rojo:</p><ul><li><strong>Que es</strong>: Mezcla de aire con mayor porcentaje de oxigeno (tipicamente 32-36% en vez del 21% del aire normal). Reduce la acumulacion de nitrogeno en tus tejidos.</li><li><strong>Ventaja principal</strong>: Mayor tiempo de fondo y menores intervalos de superficie. En pecios profundos como el Thistlegorm (25-30m), la diferencia entre bucear con aire y con nitrox puede ser de 10-15 minutos adicionales bajo el agua.</li><li><strong>Certificacion</strong>: Curso teorico de medio dia + analisis de mezcla. Sin inmersion obligatoria. Puedes empezar a usarlo inmediatamente.</li><li><strong>En el M/Y Dolce Vita</strong>: El <a href="/blog/nitrox-a-bordo-mar-rojo">nitrox es gratuito</a> y la certificacion esta incluida.</li></ul>', 'id': 'rt-nitrox'},
            {'type': 'heading', 'value': {'text': 'Como se combina formacion y vacaciones', 'level': 'h2'}, 'id': 'h2-combinar'},
            {'type': 'rich_text', 'value': '<p>La pregunta mas frecuente: <em>\"pero si estoy haciendo un curso, me pierdo inmersiones?\"</em> No.</p><ul><li><strong>Las inmersiones de formacion SON las inmersiones del viaje</strong>. Cuando el grupo baja al Thistlegorm, tu tambien bajas, con tu instructor evaluando competencias durante la misma inmersion.</li><li><strong>Teoria en los tiempos muertos</strong>: Material digital que revisas en el movil durante los intervalos de superficie o despues de cenar. Sin aulas, sin sesiones de 3 horas.</li><li><strong>Ritmo flexible</strong>: El instructor adapta las evaluaciones al plan de inmersiones del liveaboard, no al reves.</li><li><strong>Companeros de viaje</strong>: Puedes empezar el liveaboard como Open Water y terminarlo como Advanced, habiendo buceado los mismos spots que todos.</li></ul>', 'id': 'rt-combinar'},
            {'type': 'heading', 'value': {'text': 'Beneficio de formarte en el Mar Rojo', 'level': 'h2'}, 'id': 'h2-beneficio'},
            {'type': 'rich_text', 'value': '<p>Obtener tu certificacion aqui tiene ventajas sobre hacerlo en un centro de buceo local:</p><ul><li><strong>Condiciones ideales</strong>: Visibilidad de 30+ metros, aguas calmas dentro de la barrera arrecifal, temperatura 22-28°C. No es lo mismo aprender en una cantera con 3m de visibilidad.</li><li><strong>Instructores con experiencia local</strong>: Conocen cada pecio, cada corriente, cada rincon del arrecife. Su experiencia complementa el material teorico.</li><li><strong>Practica real inmediata</strong>: Lo que aprendes por la manana lo aplicas por la tarde en un entorno real y espectacular.</li><li><strong>Motivacion maxima</strong>: Aprender rodeado de los mejores spots del mundo es incomparablemente mas motivador que una piscina.</li></ul>', 'id': 'rt-beneficio'},
            {'type': 'heading', 'value': {'text': 'Que incluye la formacion en el M/Y Dolce Vita', 'level': 'h2'}, 'id': 'h2-dolcevita'},
            {'type': 'rich_text', 'value': '<p>En el M/Y Dolce Vita, la formacion incluye:</p><ul><li>Material digital SSI (acceso a la plataforma MySSI)</li><li>Tarjeta de certificacion internacional SSI</li><li>Inmersiones de formacion integradas en la ruta (no son extra)</li><li>Nitrox gratuito + certificacion de nitrox incluida</li><li>Instructor dedicado durante las inmersiones de evaluacion</li><li>4 especialidades disponibles: Deep, Wreck, Perfect Buoyancy, Navigation</li></ul><p>Si tienes dudas sobre que formacion te conviene, <a href="/contacto">contactanos</a> y te asesoramos segun tu nivel actual y tus objetivos.</p>', 'id': 'rt-dolcevita'},
            {'type': 'heading', 'value': {'text': 'Empieza como principiante, vuelve como experto', 'level': 'h2'}, 'id': 'h2-cta-form'},
            {'type': 'rich_text', 'value': '<p>Ya seas un <a href="/blog/primer-liveaboard-open-water-mar-rojo">Open Water planificando tu primer liveaboard</a> o un buceador experimentado buscando nuevas especialidades, el Mar Rojo es el mejor lugar para crecer como buceador.</p><p>Consulta nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard</a> y descubre cual se adapta a tu nivel.</p>', 'id': 'rt-cta-form'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-form'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.divessi.com/en/courses/advanced-adventurer" target="_blank" rel="noopener noreferrer">SSI: Advanced Adventurer Program</a></li><li><a href="https://www.divessi.com/en/courses/enriched-air-nitrox" target="_blank" rel="noopener noreferrer">SSI: Enriched Air Nitrox Specialty</a></li><li><a href="https://www.padi.com/courses/advanced-open-water" target="_blank" rel="noopener noreferrer">PADI: Advanced Open Water Diver (equivalencia)</a></li></ul>', 'id': 'rt-refs-form'},
        ],
    }
)


# ============================================================================
# Page 21: Gastronomia en un Liveaboard
# ============================================================================

print("\n--- Page 21: Gastronomia ---")
create_or_update_page(
    slug='gastronomia-liveaboard-comida-bordo',
    title='Gastronomia en un Liveaboard: Comida a Bordo en el Mar Rojo',
    data={
        'excerpt': 'Comida a bordo de un liveaboard en el Mar Rojo: desayuno, almuerzo, cena, snacks y gastronomia egipcia.',
        'read_time': '7 min',
        'meta_description': 'Comida a bordo de un liveaboard en el Mar Rojo: desayuno, almuerzo, cena, snacks y gastronomia egipcia. Dietas especiales incluidas.',
        'primary_keyword': 'gastronomia liveaboard comida bordo mar rojo',
        'cluster_id': 'vida-a-bordo',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Buffet de comida a bordo de un liveaboard de buceo',
        'body': [
            {'type': 'rich_text', 'value': '<p>La comida en un liveaboard es una de las sorpresas mas agradables del viaje. Lejos de ser comida de avion o rations de supervivencia, los liveaboards del Mar Rojo ofrecen <strong>pension completa con cocina fresca</strong> preparada por un cocinero dedicado. Esta guia complementa la informacion general de <a href="/blog/camarotes-comida-wifi-liveaboard">camarotes, comida y WiFi en un liveaboard</a> con un foco exclusivo en la gastronomia.</p>', 'id': 'intro-gastro'},
            {'type': 'heading', 'value': {'text': 'Que esperar de la comida a bordo', 'level': 'h2'}, 'id': 'h2-esperar'},
            {'type': 'rich_text', 'value': '<p>La pension completa en un liveaboard tipico incluye:</p><ul><li><strong>4-5 comidas/snacks al dia</strong>: Desayuno, snack pre-inmersion, almuerzo, snack de tarde, cena.</li><li><strong>Cocina fresca</strong>: El cocinero prepara todo a bordo con ingredientes cargados en puerto antes de zarpar. Nada de comida precocinada ni enlatada.</li><li><strong>Mezcla de cocinas</strong>: Cocina internacional (pasta, ensaladas, pollo a la plancha) combinada con cocina egipcia tradicional.</li><li><strong>Bebidas incluidas</strong>: Agua, te y cafe ilimitados. Refrescos y cerveza normalmente con suplemento (3-5 EUR por cerveza).</li></ul>', 'id': 'rt-esperar'},
            {'type': 'heading', 'value': {'text': 'Desayuno', 'level': 'h2'}, 'id': 'h2-desayuno'},
            {'type': 'rich_text', 'value': '<p>El desayuno se adapta a los madrugadores que quieren bucear pronto y a los que prefieren tomarselo con calma:</p><ul><li><strong>Continental</strong>: Pan, mantequilla, mermelada, queso, aceitunas, tomate. Clasico desayuno egipcio/mediterraneo.</li><li><strong>Caliente</strong>: Huevos revueltos, tortilla, foul medames (habas cocidas con especias -- tipico egipcio y muy nutritivo), ta\'ameya (falafel egipcio).</li><li><strong>Frutas frescas</strong>: Mango, sandia, melon, platano. Egipto tiene frutas excelentes.</li><li><strong>Cafe y te</strong>: Ilimitados. El te egipcio (shai) es fuerte y dulce; el cafe turco tambien es comun.</li></ul><p>Consejo: come ligero si vas a bucear inmediatamente despues. Una tostada, fruta y cafe son suficientes. El desayuno completo lo puedes disfrutar entre inmersiones.</p>', 'id': 'rt-desayuno'},
            {'type': 'heading', 'value': {'text': 'Almuerzo', 'level': 'h2'}, 'id': 'h2-almuerzo'},
            {'type': 'rich_text', 'value': '<p>El almuerzo es el momento de recargar energia despues de 2 inmersiones matutinas:</p><ul><li><strong>Plato principal</strong>: Rotacion diaria entre pollo, carne, pescado y opciones vegetarianas. Preparados a la parrilla, al horno o guisados.</li><li><strong>Ensaladas</strong>: Variedad de ensaladas frescas cada dia. La ensalada fattoush (con pan crujiente) y la tabulé (perejil, tomate, bulgur) son frecuentes.</li><li><strong>Guarniciones</strong>: Arroz, pasta, cuscus, patatas. Hummus y baba ganoush como acompanamiento fijo.</li><li><strong>Postre</strong>: Fruta fresca, flan, o postres egipcios como basbousa (bizcocho de semola con almíbar).</li></ul>', 'id': 'rt-almuerzo'},
            {'type': 'heading', 'value': {'text': 'Cena', 'level': 'h2'}, 'id': 'h2-cena-gastro'},
            {'type': 'rich_text', 'value': '<p>La cena es la comida estrella del dia, con platos mas elaborados:</p><ul><li><strong>Platos egipcios tradicionales</strong>: Koshary (lentejas, arroz, pasta y salsa de tomate -- el plato nacional de Egipto), fattah (arroz con carne y pan crujiente), molokhia (sopa de yute verde con pollo).</li><li><strong>Mariscos frescos</strong>: Cuando el barco esta cerca de puerto o se aprovisiona, pescado fresco a la brasa o al horno. Langostinos, calamares, dorada.</li><li><strong>Especialidades internacionales</strong>: Pasta, pizza, curry, stir-fry. El cocinero suele tener un repertorio amplio.</li><li><strong>BBQ en cubierta</strong>: Algunas noches, la cena se prepara a la barbacoa en la cubierta superior. Kebab, kofta (albondigas de carne especiada), verduras a la brasa.</li></ul>', 'id': 'rt-cena-gastro'},
            {'type': 'heading', 'value': {'text': 'Snacks y bebidas entre inmersiones', 'level': 'h2'}, 'id': 'h2-snacks'},
            {'type': 'rich_text', 'value': '<p>Entre inmersiones siempre hay algo disponible:</p><ul><li><strong>Snacks</strong>: Fruta cortada, galletas, frutos secos, pasteles caseros.</li><li><strong>Bebidas incluidas</strong>: Agua (imprescindible hidratarse entre inmersiones), te, cafe, zumos naturales.</li><li><strong>Con suplemento</strong>: Refrescos (Coca-Cola, Fanta), cerveza, vino. Precios razonables: 2-4 EUR por cerveza o refresco.</li></ul><p><strong>Importante</strong>: La hidratacion es clave para prevenir la enfermedad descompresiva. Bebe al menos 2-3 litros de agua al dia. Evita el alcohol antes de las inmersiones.</p>', 'id': 'rt-snacks'},
            {'type': 'heading', 'value': {'text': 'Dietas especiales y alergias', 'level': 'h2'}, 'id': 'h2-dietas'},
            {'type': 'rich_text', 'value': '<p>La mayoria de liveaboards pueden adaptarse a necesidades dieteticas:</p><ul><li><strong>Vegetariano/vegano</strong>: Posible con aviso previo. La cocina egipcia tiene muchas opciones naturalmente vegetarianas (foul, falafel, ensaladas, hummus).</li><li><strong>Celiaco/sin gluten</strong>: Mas complicado pero viable. Avisar con antelacion para que el cocinero prepare alternativas. El arroz y las proteinas a la plancha son opciones seguras.</li><li><strong>Alergias alimentarias</strong>: Comunicar por escrito al operador al reservar. El cocinero necesita saber con antelacion, no el dia del embarque.</li><li><strong>Halal</strong>: La comida en Egipto es halal por defecto. No hay cerdo a bordo.</li></ul><p><strong>Consejo</strong>: Si tienes necesidades dieteticas estrictas, lleva snacks de emergencia (barritas energeticas, frutos secos) por si algun dia las opciones son limitadas.</p>', 'id': 'rt-dietas'},
            {'type': 'heading', 'value': {'text': 'La gastronomia egipcia que probaras', 'level': 'h2'}, 'id': 'h2-egipcia'},
            {'type': 'rich_text', 'value': '<p>Un liveaboard es tambien una experiencia gastronomica. Platos que probablemente descubriras:</p><ul><li><strong>Foul medames</strong>: Habas cocidas a fuego lento con aceite de oliva, limon y especias. Desayuno nacional de Egipto.</li><li><strong>Ta\'ameya</strong>: El falafel egipcio, hecho con habas (no garbanzos). Crujiente por fuera, verde por dentro.</li><li><strong>Koshary</strong>: El plato nacional: lentejas, arroz, macarrones, garbanzos, cebolla frita y salsa de tomate picante.</li><li><strong>Hummus y baba ganoush</strong>: Clasicos de Oriente Medio, siempre presentes en el buffet.</li><li><strong>Baklava</strong>: Hojaldre con pistachos y almibar de miel. El postre estrella.</li><li><strong>Te de hibisco (karkade)</strong>: Infusion roja y refrescante, se toma fria o caliente. Muy popular en Egipto.</li></ul>', 'id': 'rt-egipcia'},
            {'type': 'heading', 'value': {'text': 'Buen provecho a bordo', 'level': 'h2'}, 'id': 'h2-cta-gastro'},
            {'type': 'rich_text', 'value': '<p>La gastronomia es parte integral de la experiencia liveaboard. Si tienes dudas sobre las opciones de comida o necesitas confirmar que tus necesidades dieteticas estaran cubiertas, <a href="/contacto">contactanos</a>.</p><p>Descubre todo lo que incluye <a href="/blog/que-incluye-vida-a-bordo-mar-rojo">la vida a bordo en el Mar Rojo</a> y reserva tu plaza.</p>', 'id': 'rt-cta-gastro'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-gastro'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.daneurope.org/en/fitness-to-dive" target="_blank" rel="noopener noreferrer">DAN Europe: Nutricion e Hidratacion para Buceadores</a></li><li><a href="https://www.divessi.com/en/blog/nutrition-for-divers" target="_blank" rel="noopener noreferrer">SSI: Nutrition for Divers</a></li><li><a href="https://www.lonelyplanet.com/egypt/food-and-drink" target="_blank" rel="noopener noreferrer">Lonely Planet: Egyptian Food & Drink Guide</a></li></ul>', 'id': 'rt-refs-gastro'},
        ],
    }
)


# ============================================================================
# Page 27: Buceo Nocturno en el Mar Rojo
# ============================================================================

print("\n--- Page 27: Buceo Nocturno ---")
create_or_update_page(
    slug='buceo-nocturno-mar-rojo',
    title='Buceo Nocturno en el Mar Rojo: Que Esperar',
    data={
        'excerpt': 'Buceo nocturno en el Mar Rojo: que esperar, que se ve, equipo necesario y consejos de seguridad.',
        'read_time': '7 min',
        'meta_description': 'Buceo nocturno en el Mar Rojo: que esperar, que se ve, equipo necesario y consejos de seguridad. Experiencia unica en liveaboard.',
        'primary_keyword': 'buceo nocturno mar rojo que esperar',
        'cluster_id': 'vida-a-bordo',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Buceador con linterna durante inmersion nocturna en el Mar Rojo',
        'body': [
            {'type': 'rich_text', 'value': '<p>El <strong>buceo nocturno en el Mar Rojo</strong> transforma completamente lo que crees conocer del mundo submarino. Los mismos arrecifes que buceaste durante el dia se convierten en un escenario totalmente diferente al caer la noche. Es una experiencia que muchos buceadores consideran un antes y un despues en su carrera subacuatica.</p>', 'id': 'intro-noct'},
            {'type': 'heading', 'value': {'text': 'Que es el buceo nocturno', 'level': 'h2'}, 'id': 'h2-que-es'},
            {'type': 'rich_text', 'value': '<p>El buceo nocturno es una inmersion que se realiza despues del atardecer, normalmente entre las 19:00 y las 20:30, utilizando linternas como fuente principal de luz. Caracteristicas:</p><ul><li><strong>Profundidad maxima</strong>: 15-20 metros. No se busca profundidad sino observacion cercana.</li><li><strong>Duracion tipica</strong>: 35-50 minutos. Mas corta que una inmersion diurna.</li><li><strong>Ritmo lento</strong>: Se nada despacio, iluminando rincones y cuevas. La paciencia es recompensada con encuentros unicos.</li><li><strong>Opcional</strong>: No todas las noches hay nocturna, y no es obligatorio participar. Suelen ofrecerse 2-3 durante una semana de liveaboard.</li></ul>', 'id': 'rt-que-es'},
            {'type': 'heading', 'value': {'text': 'Que se ve de noche en el Mar Rojo', 'level': 'h2'}, 'id': 'h2-que-ver'},
            {'type': 'rich_text', 'value': '<p>La vida marina nocturna es radicalmente diferente a la diurna:</p><ul><li><strong>Pulpos</strong>: Salen de sus escondites a cazar. Puedes verlos cambiar de color en tiempo real mientras persiguen cangrejos.</li><li><strong>Morenas</strong>: Fuera de sus agujeros, nadando libremente por el arrecife. De noche son mucho mas activas.</li><li><strong>Langostas y cangrejos</strong>: Emergen de entre las rocas. Langostas pintadas del tamano de tu brazo no son raras.</li><li><strong>Coral fluorescente</strong>: Con una linterna UV (algunos liveaboards las proporcionan), ciertos corales brillan con colores neon: verdes, naranjas, rosas. Es un espectaculo visual surrealista.</li><li><strong>Plancton bioluminiscente</strong>: Si apagas la linterna y agitas la mano, el agua se ilumina con puntos azules. Es plancton que emite luz al ser perturbado. Uno de los momentos mas magicos del buceo.</li><li><strong>Peces dormidos</strong>: Los peces loro segregan un capullo de moco transparente para dormir. Los peces payaso duermen inmoviles en sus anemonas. Es fascinante verlos \"apagados\".</li></ul>', 'id': 'rt-que-ver'},
            {'type': 'heading', 'value': {'text': 'Mejores spots para nocturnas en la ruta', 'level': 'h2'}, 'id': 'h2-spots'},
            {'type': 'rich_text', 'value': '<p>Los mejores spots para buceo nocturno en la Ruta Norte:</p><ul><li><strong>Arrecifes someros cerca del amarre nocturno</strong>: El capitan elige fondeaderos protegidos con arrecife sano a poca profundidad. Ideal para nocturnas seguras.</li><li><strong>Bahias protegidas de Abu Nuhas</strong>: Aguas calmas con vida coralina rica.</li><li><strong>Arrecifes de Hurghada</strong>: La primera o ultima noche del viaje, cerca de puerto, con arrecifes perfectos para nocturnas.</li></ul><p>Las nocturnas no se hacen en spots con corrientes fuertes ni en pecios profundos. La seguridad es la prioridad.</p>', 'id': 'rt-spots'},
            {'type': 'heading', 'value': {'text': 'Equipo necesario', 'level': 'h2'}, 'id': 'h2-equipo-noct'},
            {'type': 'rich_text', 'value': '<p>El equipo para buceo nocturno es sencillo:</p><ul><li><strong>Linterna principal</strong>: 1000+ lumenes. El liveaboard normalmente la proporciona, pero si tienes una propia, llevarla. Las mejores tienen haz regulable (spot para buscar + flood para iluminar amplio).</li><li><strong>Linterna de backup</strong>: Obligatoria. Mas pequena, sujeta al BCD o guardada en el bolsillo. Si falla la principal, tienes respaldo.</li><li><strong>Luz quimica o LED de senalizacion</strong>: Se sujeta a la valvula del tanque o a la primera etapa del regulador. Permite al grupo y al dive guide ver tu posicion.</li><li><strong>Boya SMB con luz</strong>: Para el ascenso final. Algunos buceadores llevan una luz quimica atada a la SMB.</li></ul><p>Consejo: lleva tu propia linterna si puedes. Las proporcionadas por el liveaboard funcionan, pero conocer tu equipo da confianza en la oscuridad.</p>', 'id': 'rt-equipo-noct'},
            {'type': 'heading', 'value': {'text': 'Consejos de seguridad para nocturnas', 'level': 'h2'}, 'id': 'h2-seguridad-noct'},
            {'type': 'rich_text', 'value': '<p>El buceo nocturno requiere precauciones adicionales:</p><ul><li><strong>Briefing especifico</strong>: El dive guide explica senales de linterna (circular = OK, rapido arriba-abajo = atencion/emergencia), plan de inmersion, punto de reunion y limite de tiempo.</li><li><strong>Comunicacion por senales de linterna</strong>: No apuntar la linterna a la cara de otros buceadores (deslumbra). Para llamar la atencion, hacer circulos en el campo de vision del companero.</li><li><strong>Contacto visual permanente</strong>: Mantener al buddy a distancia de brazo. Es mas facil perderse de noche que de dia.</li><li><strong>No alejarse del grupo</strong>: El dive guide lidera y marca el ritmo. Seguir su luz.</li><li><strong>Ascenso controlado</strong>: Subir mas lento de lo habitual. La referencia visual es limitada; el ordenador de buceo es tu mejor amigo.</li></ul><p>Para mas informacion sobre <a href="/blog/seguridad-buceo-mar-rojo">seguridad en el buceo en el Mar Rojo</a>, consulta nuestra guia dedicada.</p>', 'id': 'rt-seguridad-noct'},
            {'type': 'heading', 'value': {'text': 'Nivel requerido', 'level': 'h2'}, 'id': 'h2-nivel-noct'},
            {'type': 'rich_text', 'value': '<p>Tecnicamente, un <strong>Open Water Diver</strong> puede hacer buceo nocturno. Sin embargo:</p><ul><li>Se recomienda tener al menos <strong>10-15 inmersiones previas</strong> para estar comodo con el equipo y la flotabilidad.</li><li>La especialidad <strong>SSI Night & Limited Visibility</strong> o <strong>PADI Night Diver</strong> esta disponible a bordo si quieres formacion especifica.</li><li>Si es tu primera nocturna, avisa al dive guide. Te pondra cerca de el para mayor tranquilidad.</li></ul>', 'id': 'rt-nivel-noct'},
            {'type': 'heading', 'value': {'text': 'Descubre el Mar Rojo de noche', 'level': 'h2'}, 'id': 'h2-cta-noct'},
            {'type': 'rich_text', 'value': '<p>El buceo nocturno es una de esas experiencias que no puedes tener en un centro de buceo de dia. Solo un liveaboard te permite vivir el arrecife a todas las horas. <a href="/contacto">Contactanos</a> para reservar tu plaza y asegurar que tu ruta incluye nocturnas.</p><p>Explora nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard</a>.</p>', 'id': 'rt-cta-noct'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-noct'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.padi.com/courses/night-diver" target="_blank" rel="noopener noreferrer">PADI: Night Diver Specialty</a></li><li><a href="https://www.divessi.com/en/courses/night-diving-limited-visibility" target="_blank" rel="noopener noreferrer">SSI: Night & Limited Visibility Diving</a></li><li><a href="https://www.daneurope.org/en/fitness-to-dive" target="_blank" rel="noopener noreferrer">DAN Europe: Aptitud y Preparacion para Buceo Nocturno</a></li></ul>', 'id': 'rt-refs-noct'},
        ],
    }
)


# ============================================================================
# Page 28: Corrientes en el Mar Rojo
# ============================================================================

print("\n--- Page 28: Corrientes ---")
create_or_update_page(
    slug='corrientes-mar-rojo-buceo-guia',
    title='Corrientes en el Mar Rojo: Guia para Buceadores',
    data={
        'excerpt': 'Guia de corrientes en el Mar Rojo: tipos, zonas, tecnicas de drift diving y que hacer si te arrastra.',
        'read_time': '9 min',
        'meta_description': 'Guia de corrientes en el Mar Rojo para buceadores. Tipos, zonas, tecnicas de drift diving y que hacer si te arrastra. Seguridad primero.',
        'primary_keyword': 'corrientes mar rojo buceo guia seguridad',
        'cluster_id': 'vida-a-bordo',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Buceador realizando drift diving con corriente en el Mar Rojo',
        'body': [
            {'type': 'rich_text', 'value': '<p>Las <strong>corrientes en el Mar Rojo</strong> son una realidad que todo buceador debe entender. Lejos de ser solo un peligro, las corrientes son las que traen los nutrientes que alimentan la espectacular vida marina de esta zona. Saber leerlas y manejarlas es la diferencia entre una inmersion memorable y una situacion estresante.</p><p>Este articulo complementa nuestra guia general de <a href="/blog/seguridad-buceo-mar-rojo">seguridad en el buceo en el Mar Rojo</a> con un enfoque especifico en corrientes.</p>', 'id': 'intro-corr'},
            {'type': 'heading', 'value': {'text': 'Tipos de corrientes en el Mar Rojo', 'level': 'h2'}, 'id': 'h2-tipos'},
            {'type': 'rich_text', 'value': '<p>No todas las corrientes son iguales. En el Mar Rojo encontraras:</p><ul><li><strong>Corriente de superficie</strong>: Afecta los primeros 5-10 metros. Causada por viento y mareas. Se nota al entrar y salir del agua, pero a profundidad puede ser inexistente.</li><li><strong>Corriente de fondo</strong>: Flujo constante a mayor profundidad. Mas predecible y uniforme. Es la corriente tipica del drift diving.</li><li><strong>Downcurrent (corriente descendente)</strong>: La mas peligrosa. Empuja hacia abajo, tipicamente en paredes verticales y esquinas de arrecifes expuestos. Puede arrastrarte a profundidades no planificadas.</li><li><strong>Upwelling (corriente ascendente)</strong>: Empuja hacia la superficie. Menos peligrosa pero puede causar ascensos descontrolados si no se controla la flotabilidad.</li><li><strong>Corrientes de marea</strong>: En estrechos y canales (Tiran, Gubal). Cambian de direccion con la marea, a veces en cuestion de horas.</li></ul>', 'id': 'rt-tipos'},
            {'type': 'heading', 'value': {'text': 'Zonas con corrientes fuertes', 'level': 'h2'}, 'id': 'h2-zonas'},
            {'type': 'rich_text', 'value': '<p>Estas son las zonas del Mar Rojo donde las corrientes son mas intensas:</p><ul><li><strong>Estrecho de Tiran (Jackson Reef, Gordon Reef)</strong>: Corrientes de marea que pueden ser muy fuertes. El momento de la inmersion se planifica con la tabla de mareas. La corriente atrae tiburones y pelagicos.</li><li><strong>Ras Mohammed (Shark Reef)</strong>: Corrientes de moderadas a fuertes en la esquina norte. Es lo que atrae a los tiburones martillo y a las mantas. La inmersion se hace como drift.</li><li><strong>Brothers Islands</strong>: Corrientes fuertes e impredecibles en el arco norte de Big Brother. Zona de encuentros con tiburones oceanicos, pero requiere experiencia.</li><li><strong>Elphinstone Reef</strong>: Corrientes en la cornisa norte/sur. Famoso por encuentros con tiburones oceanicos de puntas blancas.</li><li><strong>Abu Nuhas</strong>: Corrientes generalmente suaves, pero pueden intensificarse en superficie. Los pecios ofrecen proteccion.</li></ul>', 'id': 'rt-zonas'},
            {'type': 'heading', 'value': {'text': 'Buceo en corriente: tecnicas basicas', 'level': 'h2'}, 'id': 'h2-tecnicas'},
            {'type': 'rich_text', 'value': '<p>El <strong>drift diving</strong> (buceo a la deriva) es la tecnica principal para manejar corrientes:</p><ul><li><strong>No luches contra la corriente</strong>: El drift diving consiste en dejarse llevar. El zodiac te recoge al final de la inmersion, no donde entraste.</li><li><strong>Reef hook</strong>: Un gancho con cuerda que se ancla en roca (nunca en coral vivo). Te permite mantener posicion en un punto fijo mientras la corriente pasa. Esencial en Brothers y Elphinstone.</li><li><strong>Posicion hidrodinamica</strong>: Cuerpo horizontal, aletas juntas, brazos pegados. Minimizar la resistencia al agua ahorra aire y energia.</li><li><strong>Control de flotabilidad</strong>: Una flotabilidad perfecta es critica en corriente. Si estas demasiado positivo, la corriente de superficie te arrastra; demasiado negativo, el fondo te atrapa.</li><li><strong>Pegarse al arrecife</strong>: Si la corriente es lateral, nada cerca de la pared del arrecife donde la friccion reduce la intensidad.</li></ul>', 'id': 'rt-tecnicas'},
            {'type': 'heading', 'value': {'text': 'Senales y comunicacion en corriente', 'level': 'h2'}, 'id': 'h2-senales'},
            {'type': 'rich_text', 'value': '<p>La comunicacion es critica cuando la corriente dificulta mantener el grupo unido:</p><ul><li><strong>Senales de mano especificas</strong>: \"corriente\" (mano plana ondulando), \"fuerte\" (puno cerrado), \"pegarse al arrecife\" (mano apuntando a la pared).</li><li><strong>Contacto visual permanente con buddy</strong>: En corriente fuerte, la distancia entre buddies se reduce. Si pierdes contacto visual, mira 1 minuto → si no encuentras, asciende despacio y busca en superficie.</li><li><strong>Papel del dive guide</strong>: El guia va delante evaluando la corriente y puede cambiar el plan de inmersion en tiempo real. Seguir sus indicaciones es prioritario.</li></ul>', 'id': 'rt-senales'},
            {'type': 'heading', 'value': {'text': 'Nivel requerido segun intensidad', 'level': 'h2'}, 'id': 'h2-nivel-corr'},
            {'type': 'rich_text', 'value': '<p>No todas las corrientes son iguales, y tu nivel de experiencia determina que spots son seguros para ti:</p><ul><li><strong>Corrientes suaves (0.5-1 nudo)</strong>: OK para Open Water con experiencia basica. Drift suave y controlable. Ejemplo: Abu Nuhas, Erg Abu Ramada.</li><li><strong>Corrientes moderadas (1-2 nudos)</strong>: <a href="/blog/advanced-a-bordo-mar-rojo">Advanced recomendado</a>. Se nota la corriente pero es manejable con buena flotabilidad. Ejemplo: Ras Mohammed, arrecifes de la Ruta Norte.</li><li><strong>Corrientes fuertes (2+ nudos)</strong>: Advanced + experiencia + Nitrox recomendado. Brothers, Elphinstone, Tiran en marea fuerte. No apto para buceadores con menos de 30-50 inmersiones.</li></ul>', 'id': 'rt-nivel-corr'},
            {'type': 'heading', 'value': {'text': 'Que hacer si te arrastra la corriente', 'level': 'h2'}, 'id': 'h2-emergencia'},
            {'type': 'rich_text', 'value': '<p>Si te encuentras separado del grupo y arrastrado por la corriente:</p><ol><li><strong>Mantener la calma</strong>: El panico es el mayor peligro. Respira despacio y profundo.</li><li><strong>No luchar contra la corriente</strong>: Nadar contra una corriente fuerte solo agota tu aire. Deja que te lleve.</li><li><strong>Ascender controladamente</strong>: Si la corriente te aleja del arrecife, inicia un ascenso controlado manteniendo la velocidad de ascenso (9m/min o menos).</li><li><strong>Desplegar la SMB</strong>: En cuanto estes a 5-6 metros de la superficie, infla tu boya de señalizacion. El zodiac del liveaboard esta atento y te localizara.</li><li><strong>Esperar al zodiac</strong>: En superficie, mantener flotabilidad positiva (inflar BCD), conservar la mascara puesta y esperar. El zodiac siempre esta vigilando.</li></ol><p>Los liveaboards profesionales tienen protocolos para buceadores separados. El zodiac sigue las burbujas del grupo y tiene contacto por radio con el barco.</p>', 'id': 'rt-emergencia'},
            {'type': 'heading', 'value': {'text': 'Temporada y prediccion de corrientes', 'level': 'h2'}, 'id': 'h2-temporada'},
            {'type': 'rich_text', 'value': '<p>Las corrientes varian segun la temporada:</p><ul><li><strong>Verano (junio-septiembre)</strong>: Corrientes generalmente mas suaves. Agua mas calida, menos viento. Mejor epoca para buceadores menos experimentados.</li><li><strong>Invierno (noviembre-marzo)</strong>: Corrientes mas fuertes, especialmente en zonas expuestas. Pero tambien mayor probabilidad de encuentros con pelagicos (tiburones, mantas).</li><li><strong>Transiciones (abril-mayo, octubre)</strong>: Impredecibles. Las corrientes pueden cambiar rapidamente.</li></ul><p>El <a href="/blog/temporada-ruta-norte-mar-rojo">capitan y el dive guide consultan las tablas de mareas y las condiciones meteorologicas</a> diariamente para planificar las inmersiones. Confia en su experiencia local.</p>', 'id': 'rt-temporada'},
            {'type': 'heading', 'value': {'text': 'Dominar la corriente, disfrutar el Mar Rojo', 'level': 'h2'}, 'id': 'h2-cta-corr'},
            {'type': 'rich_text', 'value': '<p>Las corrientes no son un obstaculo, son parte de lo que hace al Mar Rojo espectacular. Con la preparacion adecuada, el drift diving se convierte en una de las experiencias mas emocionantes del buceo. Si quieres saber que ruta se adapta a tu nivel de experiencia con corrientes, <a href="/contacto">contactanos</a>.</p><p>Descubre nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard</a>.</p>', 'id': 'rt-cta-corr'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-corr'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.daneurope.org/en/drift-diving-safety" target="_blank" rel="noopener noreferrer">DAN Europe: Drift Diving Safety Guidelines</a></li><li><a href="https://www.padi.com/courses/drift-diver" target="_blank" rel="noopener noreferrer">PADI: Drift Diver Specialty</a></li><li><a href="https://www.divessi.com/en/courses/current-diving" target="_blank" rel="noopener noreferrer">SSI: Current Diving Techniques</a></li></ul>', 'id': 'rt-refs-corr'},
        ],
    }
)


# ============================================================================
# Page 29: Fotografia Submarina en el Mar Rojo
# ============================================================================

print("\n--- Page 29: Fotografia Submarina ---")
create_or_update_page(
    slug='fotografia-submarina-mar-rojo',
    title='Fotografia Submarina en el Mar Rojo: Spots y Consejos',
    data={
        'excerpt': 'Fotografia submarina en el Mar Rojo: equipo recomendado, mejores spots, iluminacion y consejos de composicion.',
        'read_time': '9 min',
        'meta_description': 'Fotografia submarina en el Mar Rojo: equipo recomendado, mejores spots, iluminacion y consejos de composicion. Guia para principiantes y avanzados.',
        'primary_keyword': 'fotografia submarina mar rojo spots consejos',
        'cluster_id': 'vida-a-bordo',
        'cluster_role': 'satellite',
        'schema_type': 'Article',
        'hero_alt': 'Fotografo submarino capturando vida marina en el Mar Rojo',
        'body': [
            {'type': 'rich_text', 'value': '<p>El <strong>Mar Rojo</strong> es uno de los mejores destinos del mundo para la <strong>fotografia submarina</strong>. Visibilidad de 30+ metros, agua cristalina, diversidad de sujetos desde macro hasta gran angular, y luz natural que penetra hasta los 20-25 metros. Tanto si llevas una GoPro como una mirrorless con carcasa, esta guia te ayuda a sacar las mejores fotos.</p>', 'id': 'intro-foto'},
            {'type': 'heading', 'value': {'text': 'Por que el Mar Rojo es ideal para foto submarina', 'level': 'h2'}, 'id': 'h2-ideal'},
            {'type': 'rich_text', 'value': '<p>Caracteristicas que hacen del Mar Rojo un paraiso fotografico:</p><ul><li><strong>Visibilidad excepcional</strong>: 20-40 metros es habitual. El agua es clara y azul, sin particulas en suspension. Ideal para gran angular y paisajes submarinos.</li><li><strong>Diversidad de sujetos</strong>: Desde nudibranquios de 2cm (macro) hasta tiburones de 3m (gran angular). Pecios iconicos como el <a href="/blog/ss-thistlegorm-guia-completa">SS Thistlegorm</a> para fotografia wide-angle con estructura.</li><li><strong>Luz natural abundante</strong>: La latitud tropical y el cielo despejado proporcionan luz natural potente hasta los 20-25m. Los primeros 15m tienen colores vibrantes sin necesidad de flash.</li><li><strong>Sujetos cooperativos</strong>: Los peces del Mar Rojo estan acostumbrados a buceadores. Los peces payaso, las tortugas, las morenas y los peces Napoleón no huyen facilmente si te acercas con calma.</li></ul>', 'id': 'rt-ideal'},
            {'type': 'heading', 'value': {'text': 'Equipo recomendado por nivel', 'level': 'h2'}, 'id': 'h2-equipo-foto'},
            {'type': 'rich_text', 'value': '<p>No necesitas equipo profesional para conseguir buenas fotos:</p><p><strong>Nivel basico (0-200 EUR):</strong></p><ul><li>GoPro Hero o equivalente con carcasa sumergible hasta 40m. Modo burst para accion, modo time-lapse para arrecifes.</li><li>Smartphone con funda submarina (hasta 10-15m). Para snorkel y buceo somero.</li></ul><p><strong>Nivel intermedio (200-800 EUR):</strong></p><ul><li>Compacta sumergible como la <strong>Olympus Tough TG-7</strong>: sumergible hasta 15m sin carcasa, modo macro excelente, estabilizacion de imagen.</li><li>Carcasa para compacta: extiende la profundidad hasta 45m. Permite controles manuales.</li><li>Video light LED: 1000-3000 lumenes para video y fill light.</li></ul><p><strong>Nivel avanzado (1000+ EUR):</strong></p><ul><li>Mirrorless (Sony A7C, Canon R7, Nikon Z6) con carcasa Nauticam o Ikelite.</li><li>Objetivos: macro 60/90/105mm para nudibranquios, gran angular 16-35mm o fisheye para pecios y paisajes.</li><li>Flash/estrobo subacuatico (Sea&Sea YS-D3, Inon Z-330) con brazos articulados.</li></ul>', 'id': 'rt-equipo-foto'},
            {'type': 'heading', 'value': {'text': 'Iluminacion submarina', 'level': 'h2'}, 'id': 'h2-luz'},
            {'type': 'rich_text', 'value': '<p>La luz es el factor mas critico de la fotografia submarina:</p><ul><li><strong>Flash/estrobo para foto fija</strong>: Restaura los colores que el agua absorbe (rojos, naranjas). Posicion: a los lados de la carcasa, angulados hacia afuera para evitar backscatter (particulas iluminadas entre la camara y el sujeto).</li><li><strong>Video light para video</strong>: Luz continua LED. 2000-5000 lumenes para video de calidad. Mas versatil que el flash pero mayor consumo de bateria.</li><li><strong>Luz natural</strong>: En los primeros 10-15m, la luz natural del Mar Rojo es espectacular. Disparar hacia arriba (contra-luz) crea siluetas dramaticas. Los primeros metros no necesitan flash si hay sol.</li><li><strong>Profundidad y color</strong>: A 5m pierdes los rojos, a 15m pierdes los naranjas, a 25m todo se vuelve azul-verdoso. El flash o un filtro rojo compensa parcialmente.</li></ul>', 'id': 'rt-luz'},
            {'type': 'heading', 'value': {'text': 'Mejores spots para foto en el Mar Rojo', 'level': 'h2'}, 'id': 'h2-spots-foto'},
            {'type': 'rich_text', 'value': '<p>Spots organizados por tipo de fotografia:</p><ul><li><strong>Macro</strong>: Arrecifes someros de <a href="/blog/ras-mohammed-guia-completa">Ras Mohammed</a> (nudibranquios, camarones limpiadores, gobios), Erg Abu Ramada (peces cristal, morenas en miniatura).</li><li><strong>Gran angular / Pecios</strong>: SS Thistlegorm (cubiertas, camiones, motocicletas dentro del pecio), Abu Nuhas (proas y popas con luz natural entrando por las aberturas).</li><li><strong>Pelagicos / Accion</strong>: Brothers Islands (tiburones martillo en la pared norte), Elphinstone (tiburones oceanicos), Shark Reef (cardumenes masivos).</li><li><strong>Fluorescencia</strong>: Inmersiones nocturnas con linterna UV en arrecifes someros. Corales que brillan en colores neon.</li><li><strong>Paisaje submarino</strong>: Paredes de coral blando en la Ruta Norte, jardines de gorgonias en el sur.</li></ul>', 'id': 'rt-spots-foto'},
            {'type': 'heading', 'value': {'text': 'Consejos de composicion bajo el agua', 'level': 'h2'}, 'id': 'h2-composicion'},
            {'type': 'rich_text', 'value': '<p>Tecnicas que mejoran tus fotos submarinas:</p><ul><li><strong>Regla de tercios submarina</strong>: Funciona igual que en superficie. Coloca al sujeto en los tercios, no en el centro.</li><li><strong>Enfoca los ojos</strong>: En fotografia de vida marina, el ojo del sujeto debe estar nitido. Es lo primero que mira el espectador.</li><li><strong>Dispara hacia arriba</strong>: Las fotos mas impactantes se toman desde abajo. Coloca al sujeto contra el azul del agua o la silueta del sol.</li><li><strong>Fondos limpios</strong>: Busca fondos de agua azul limpia en vez de arrecife desordenado detras del sujeto.</li><li><strong>Paciencia</strong>: La mejor foto llega esperando, no persiguiendo. Situate en el camino del sujeto y espera a que venga hacia ti.</li><li><strong>Acercate mas</strong>: La regla de oro de la fotografia submarina. Cuanto menos agua entre tu lente y el sujeto, mas nitidez y contraste.</li></ul>', 'id': 'rt-composicion'},
            {'type': 'heading', 'value': {'text': 'Post-produccion basica', 'level': 'h2'}, 'id': 'h2-postprod'},
            {'type': 'rich_text', 'value': '<p>El retoque es parte esencial de la fotografia submarina:</p><ul><li><strong>Balance de blancos</strong>: El primer y mas importante ajuste. Eliminar el tinte azul/verde restaura los colores reales. En Lightroom: deslizador de temperatura hacia calido.</li><li><strong>Contraste y claridad</strong>: Aumentar ligeramente compensa la falta de contraste del agua. Cuidado con pasarse.</li><li><strong>Recuperar luces y sombras</strong>: Las fotos submarinas suelen tener rango dinamico amplio (sujeto oscuro contra agua brillante). Reducir luces + subir sombras equilibra.</li><li><strong>Herramientas recomendadas</strong>: Adobe Lightroom (profesional), Snapseed (movil, gratuito), DxO PhotoLab (alternativa a Lightroom).</li></ul>', 'id': 'rt-postprod'},
            {'type': 'heading', 'value': {'text': 'Errores comunes del fotografo submarino principiante', 'level': 'h2'}, 'id': 'h2-errores'},
            {'type': 'rich_text', 'value': '<p>Errores frecuentes y como evitarlos:</p><ul><li><strong>Perseguir la fauna</strong>: Los peces nadan mas rapido que tu. Quedate quieto y usa la paciencia.</li><li><strong>No revisar configuracion antes de entrar</strong>: Verifica modo, ISO, balance de blancos en superficie. Bajo el agua es tarde para descubrir que estabas en modo selfie.</li><li><strong>Olvidar baterias y memorias de repuesto</strong>: En un liveaboard haces 3-4 inmersiones al dia. Una bateria no es suficiente. Lleva al menos 2.</li><li><strong>No proteger el equipo de la sal</strong>: Aclara la carcasa con agua dulce despues de CADA inmersion. La sal cristalizada dana los sellos y los botones.</li><li><strong>Descuidar el buceo por la foto</strong>: La flotabilidad y la seguridad van primero. No toques el coral para estabilizarte. No bajes mas de lo planificado por \"una foto mas\".</li></ul>', 'id': 'rt-errores'},
            {'type': 'heading', 'value': {'text': 'Captura el Mar Rojo', 'level': 'h2'}, 'id': 'h2-cta-foto'},
            {'type': 'rich_text', 'value': '<p>El Mar Rojo es un lienzo submarino esperando a ser capturado. Si quieres planificar un viaje con foco en fotografia, <a href="/contacto">contactanos</a> y te recomendamos la ruta con los mejores spots para tu nivel y equipo.</p><p>Explora nuestras <a href="/rutas/norte-7-dias">rutas de liveaboard</a> y empieza a planificar tus capturas.</p>', 'id': 'rt-cta-foto'},
            {'type': 'heading', 'value': {'text': 'Referencias y Fuentes', 'level': 'h2'}, 'id': 'h2-refs-foto'},
            {'type': 'rich_text', 'value': '<ul><li><a href="https://www.padi.com/courses/underwater-photographer" target="_blank" rel="noopener noreferrer">PADI: Underwater Photographer Specialty</a></li><li><a href="https://www.wetpixel.com" target="_blank" rel="noopener noreferrer">Wetpixel: Underwater Photography Community</a></li><li><a href="https://www.uwphotographyguide.com" target="_blank" rel="noopener noreferrer">Underwater Photography Guide: Tutorials & Gear Reviews</a></li></ul>', 'id': 'rt-refs-foto'},
        ],
    }
)


print("\n==========================================")
print("VIDA A BORDO CONTENT POPULATION COMPLETE")
print("==========================================")
print("Pages created/skipped: 6")
print("Cluster: vida-a-bordo")
print("Requirements: AUTH-01, AUTH-02")
