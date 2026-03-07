import { BlogPost, BlogListingData } from "./types"
import { images } from "@/lib/constants/images"

export const blogPosts: BlogPost[] = [
  {
    slug: "requisitos-ruta-norte-mar-rojo",
    title: "Requisitos para la Ruta Norte del Mar Rojo: nivel, experiencia y dudas reales",
    excerpt:
      "Qué nivel necesitas de verdad para hacer la Ruta Norte y Pecios desde Hurghada, cuándo puede encajar para Open Water y cómo plantear el salto a Advanced sin vender humo.",
    publishedAt: "2026-03-04",
    readTime: "9 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.heroBlogListing,
      alt: "Buceadores preparando una ruta de vida a bordo en el Mar Rojo",
    },
    category: {
      name: "Requisitos",
      color: "#0F8C62",
    },
    body: [
      {
        type: "rich_text",
        id: "req-1",
        value: {
          content:
            "<p>Una de las dudas que más frena la reserva de una <strong>vida a bordo en el Mar Rojo</strong> es esta: <strong>¿tengo el nivel suficiente para hacer la Ruta Norte y Pecios desde Hurghada?</strong> La mayoría de páginas lo resuelven mal. O prometen demasiado, o meten requisitos duros sin explicar el contexto. Esta guía existe para responder con claridad comercial y técnica a la vez.</p><p>La idea no es decir que vale para cualquiera. La idea es ayudarte a entender si esta ruta encaja con tu punto de partida, qué inmersiones pueden exigir más y cuándo tiene sentido usar el <strong>Advanced a bordo</strong> como parte de la progresión.</p>",
        },
      },
      {
        type: "info_cards",
        id: "req-2",
        value: {
          cards: [
            {
              icon: "🤿",
              value: "OW / AOW",
              label: "Punto de partida habitual",
              color: "#0F8C62",
            },
            {
              icon: "⚓",
              value: "Ruta Norte",
              label: "Producto principal",
              color: "#0066CC",
            },
            {
              icon: "📋",
              value: "Con matices",
              label: "La respuesta real",
              color: "#FF6B35",
            },
          ],
        },
      },
      {
        type: "heading",
        id: "req-3",
        value: {
          level: 2,
          text: "La respuesta corta: depende del perfil, no solo del carnet",
        },
      },
      {
        type: "rich_text",
        id: "req-4",
        value: {
          content:
            "<p>En una <strong>Ruta Norte y Pecios</strong> no todo el itinerario exige lo mismo. Hay días con inmersiones más sencillas y otros con pecios o condiciones que piden más soltura, mejor control y más comodidad en el agua. Por eso quedarse solo con la etiqueta <em>Open Water</em> o <em>Advanced</em> es insuficiente.</p><p>Lo que de verdad importa es combinar estas variables:</p><ul><li>tu certificación actual</li><li>cuántas inmersiones recientes llevas</li><li>cómo te mueves en profundidad o corriente</li><li>si ya has estado en un liveaboard o sería el primero</li><li>qué expectativas traes sobre Thistlegorm, Abu Nuhas o Rosalie Moller</li></ul>",
        },
      },
      {
        type: "heading",
        id: "req-5",
        value: {
          level: 2,
          text: "Cuándo puede encajar la Ruta Norte para Open Water",
        },
      },
      {
        type: "two_column",
        id: "req-6",
        value: {
          leftColumn: {
            image: images.safetyGuide,
            alt: "Buceadores revisando equipo antes de una inmersión",
          },
          rightColumn: {
            title: "Open Water no significa automáticamente que esta ruta sea una mala idea.",
            content:
              "<p>Puede encajar si vienes con buena actitud, inmersiones recientes y entiendes que algunas partes del viaje exigen progresión y cabeza. La clave es no vender la ruta como si fuera una semana sin matices.</p><ul><li>Si es tu primer liveaboard, la preparación importa mucho.</li><li>Si vienes muy justo de experiencia, hay que explicar mejor expectativas y límites.</li><li>Si tu objetivo es crecer durante la semana, el <strong>Advanced a bordo</strong> puede tener sentido como valor adicional.</li></ul>",
          },
        },
      },
      {
        type: "heading",
        id: "req-7",
        value: {
          level: 2,
          text: "Cuándo la ruta encaja mejor para Advanced o perfiles más rodados",
        },
      },
      {
        type: "rich_text",
        id: "req-8",
        value: {
          content:
            "<p>La ruta se vuelve mucho más redonda cuando el buceador ya llega con cierta comodidad en profundidad, consumo controlado y capacidad para disfrutar inmersiones largas sin ir en modo supervivencia. En ese caso la experiencia cambia: no vienes solo a tachar spots, vienes a disfrutarlos de verdad.</p><p>Por eso un perfil <strong>Advanced</strong> o con experiencia reciente suele aprovechar mejor:</p><ul><li>los pecios con más narrativa histórica</li><li>las condiciones cambiantes del norte</li><li>las inmersiones más exigentes de la semana</li><li>la parte de ritmo y acumulación de inmersiones del liveaboard</li></ul>",
        },
      },
      {
        type: "image",
        id: "req-9",
        value: {
          url: images.thistlegorm,
          alt: "Thistlegorm en el Mar Rojo",
          caption: "El atractivo de la Ruta Norte depende en gran parte de pecios como Thistlegorm, pero no todos los perfiles los viven igual.",
        },
      },
      {
        type: "heading",
        id: "req-10",
        value: {
          level: 2,
          text: "Qué spots suelen marcar más la diferencia según nivel",
        },
      },
      {
        type: "rich_text",
        id: "req-11",
        value: {
          content:
            "<p>Si estás decidiendo esta ruta, no pienses en el paquete entero como una sola cosa. Piensa en sus piezas:</p><ul><li><strong>Thistlegorm</strong>: es el gran imán comercial, pero conviene llegar con criterio, control y expectativas realistas.</li><li><strong>Abu Nuhas</strong>: permite disfrutar mucho la narrativa de pecios y suele ayudar a explicar mejor el valor de la ruta.</li><li><strong>Ras Mohammed</strong>: introduce el lado arrecife, corrientes y paisaje submarino que da equilibrio al viaje.</li><li><strong>Rosalie Moller o inmersiones más profundas</strong>: aquí es donde una landing seria debe dejar de hablar en abstracto y empezar a segmentar por perfil.</li></ul>",
        },
      },
      {
        type: "quote",
        id: "req-12",
        value: {
          text: "Una ruta bien vendida no promete que sirve para todos. Explica para quién es, para quién puede serlo y qué hace falta para aprovecharla de verdad.",
          author: "Enfoque editorial del proyecto",
          role: "Ruta Norte + Pecios",
        },
      },
      {
        type: "heading",
        id: "req-13",
        value: {
          level: 2,
          text: "Cómo usar el Advanced a bordo sin convertirlo en humo comercial",
        },
      },
      {
        type: "rich_text",
        id: "req-14",
        value: {
          content:
            "<p>La nueva estrategia de esta web ya lo deja claro: <strong>el producto principal es la ruta</strong>, no el curso. El <strong>Advanced a bordo</strong> solo tiene sentido si sirve para que un perfil determinado aproveche mejor el viaje y gane seguridad o contexto. No debe plantearse como parche mágico para vender a cualquiera.</p><p>Dicho de forma simple:</p><ul><li>si la ruta ya encaja contigo, el Advanced puede mejorar la experiencia</li><li>si todavía no encaja, el curso por sí solo no arregla todas las objeciones</li></ul>",
        },
      },
      {
        type: "accordion",
        id: "req-15",
        value: {
          items: [
            {
              title: "¿Puedo hacer la Ruta Norte siendo Open Water?",
              content:
                "<p>Puede ser posible según experiencia reciente, comodidad en el agua y planteamiento real del viaje. La respuesta seria nunca es un sí universal.</p>",
            },
            {
              title: "¿Necesito Advanced para Thistlegorm?",
              content:
                "<p>No siempre se comunica igual en todas las webs, pero sí conviene asumir que ciertos perfiles disfrutarán mucho más si llegan con mejor base y más soltura.</p>",
            },
            {
              title: "¿Cuántas inmersiones previas conviene llevar?",
              content:
                "<p>Más que fijarse solo en un número rígido, importa que sean recientes y que te sientas cómodo en profundidad, embarcación y ritmo de varias inmersiones al día.</p>",
            },
            {
              title: "¿Qué hago si esta ruta me atrae pero no estoy seguro?",
              content:
                "<p>Ese es precisamente el punto de esta guía: llevarte a una conversación útil, no forzarte a reservar a ciegas. Lo mejor es consultar tu caso según nivel y objetivos.</p>",
            },
          ],
        },
      },
      {
        type: "cta",
        id: "req-16",
        value: {
          title: "¿Quieres saber si la Ruta Norte encaja contigo de verdad?",
          description:
            "Pasa de la duda abstracta a una conversación útil. Cuéntanos tu nivel y te orientamos sobre la Ruta Norte y Pecios desde Hurghada.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
      {
        type: "newsletter",
        id: "req-17",
        value: {
          title: "Recibe guías prácticas para decidir mejor tu viaje al Mar Rojo",
          description:
            "Publicaremos más satélites sobre precio real, logística desde Hurghada, checklist y dudas de primer liveaboard.",
          buttonText: "Quiero recibirlas",
        },
      },
    ],
  },
  {
    slug: "precio-vida-a-bordo-mar-rojo",
    title: "Precio de un vida a bordo en el Mar Rojo: cómo pensar el coste real",
    excerpt:
      "La pregunta no es solo cuánto cuesta un liveaboard, sino cuánto te costará de verdad hacer la Ruta Norte y Pecios desde Hurghada sin sorpresas.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.heroRutaNorte,
      alt: "Cubierta de un barco de vida a bordo en el Mar Rojo",
    },
    category: {
      name: "Precio",
      color: "#FF6B35",
    },
    body: [
      {
        type: "rich_text",
        id: "price-1",
        value: {
          content:
            "<p>Cuando alguien busca <strong>precio de un vida a bordo en el Mar Rojo</strong>, normalmente no quiere solo un número. Quiere saber si el viaje entra en su presupuesto real, qué extras se suman después y si la diferencia entre una opción y otra tiene sentido.</p><p>En la práctica, una landing comercial buena no debería esconder esta complejidad. Debería usarla para filtrar mejor y para atraer leads más serios.</p>",
        },
      },
      {
        type: "heading",
        id: "price-2",
        value: {
          level: 2,
          text: "El error más común: mirar solo el precio base",
        },
      },
      {
        type: "rich_text",
        id: "price-3",
        value: {
          content:
            "<p>Muchos usuarios comparan salidas de <strong>Ruta Norte y Pecios</strong> viendo solo una cifra inicial. Eso casi nunca sirve. El precio base puede no incluir tasas, propinas, suplementos, alquiler de material o costes logísticos previos y posteriores al embarque.</p><p>La forma útil de plantearlo es separar:</p><ul><li>precio base del liveaboard</li><li>extras operativos del barco</li><li>coste de volar o llegar a Hurghada</li><li>seguro y pequeños gastos inevitables</li></ul>",
        },
      },
      {
        type: "info_cards",
        id: "price-4",
        value: {
          cards: [
            {
              icon: "💶",
              value: "Base",
              label: "Precio visible",
              color: "#FF6B35",
            },
            {
              icon: "➕",
              value: "Extras",
              label: "Lo que suele olvidarse",
              color: "#0066CC",
            },
            {
              icon: "🎯",
              value: "Total real",
              label: "Lo que importa para decidir",
              color: "#0F8C62",
            },
          ],
        },
      },
      {
        type: "heading",
        id: "price-5",
        value: {
          level: 2,
          text: "Qué suele entrar en el precio base",
        },
      },
      {
        type: "rich_text",
        id: "price-6",
        value: {
          content:
            "<p>Normalmente el precio base intenta resumir la parte troncal del viaje:</p><ul><li>alojamiento a bordo</li><li>comidas</li><li>programa de inmersiones</li><li>botellas y plomos</li><li>operativa general del barco</li></ul><p>Pero incluso cuando eso parece claro, una página seria debe explicar que el coste final depende de letra pequeña operativa que el usuario casi siempre pregunta después.</p>",
        },
      },
      {
        type: "heading",
        id: "price-7",
        value: {
          level: 2,
          text: "Qué extras deberías asumir desde el principio",
        },
      },
      {
        type: "two_column",
        id: "price-8",
        value: {
          leftColumn: {
            image: images.safetyGuide,
            alt: "Equipo de buceo y preparación previa a un viaje",
          },
          rightColumn: {
            title: "Si no contemplas esto desde el principio, comparar precios te servirá de poco.",
            content:
              "<ul><li>tasas o fees operativos</li><li>propinas</li><li>alquiler de equipo si no llevas el tuyo</li><li>seguro de cancelación</li><li>vuelo y llegada a Hurghada</li><li>noche previa o posterior, según operativa</li></ul><p>Esto no es un problema: es simplemente la forma correcta de presentar el viaje a alguien que quiere decidir en serio.</p>",
          },
        },
      },
      {
        type: "heading",
        id: "price-9",
        value: {
          level: 2,
          text: "Cómo usar el precio dentro del funnel comercial",
        },
      },
      {
        type: "rich_text",
        id: "price-10",
        value: {
          content:
            "<p>En este proyecto, la página de precio no debe existir para dar una cifra cerrada sin contexto. Debe existir para hacer tres cosas:</p><ul><li>atraer búsquedas con intención alta</li><li>resolver objeción económica con más honestidad que la competencia</li><li>empujar al usuario hacia la <a href=\"/rutas/norte-7-dias\">landing de Ruta Norte</a> o a una conversación sobre su caso real</li></ul>",
        },
      },
      {
        type: "accordion",
        id: "price-11",
        value: {
          items: [
            {
              title: "¿Por qué no poner un precio cerrado y ya está?",
              content:
                "<p>Porque suele generar leads mal cualificados y comparaciones pobres. La guía de precio tiene que ayudar a entender el coste real del viaje, no solo atraer clics.</p>",
            },
            {
              title: "¿Qué pasa si veo una ruta aparentemente más barata?",
              content:
                "<p>Lo razonable es revisar qué incluye de verdad, qué extras suma después y si la operativa, el barco o la ruta son equivalentes.</p>",
            },
            {
              title: "¿Esta guía sirve solo para Ruta Norte?",
              content:
                "<p>Sirve especialmente para Ruta Norte y Pecios desde Hurghada, pero la lógica de coste real también ayuda a comparar otras rutas de vida a bordo.</p>",
            },
          ],
        },
      },
      {
        type: "cta",
        id: "price-12",
        value: {
          title: "¿Quieres valorar el coste real de la Ruta Norte en tu caso?",
          description:
            "Pasa a la landing principal y cuéntanos tu perfil. Así la conversación va más allá de una cifra genérica.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "que-incluye-vida-a-bordo-mar-rojo",
    title: "Qué incluye un vida a bordo en el Mar Rojo y qué suele pagarse aparte",
    excerpt:
      "La guía para dejar de usar el “todo incluido” como promesa vacía y convertirlo en una explicación útil para Ruta Norte y Pecios desde Hurghada.",
    publishedAt: "2026-03-04",
    readTime: "7 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.heroSSI,
      alt: "Cabina y cubierta de un vida a bordo en el Mar Rojo",
    },
    category: {
      name: "Incluye",
      color: "#0066CC",
    },
    body: [
      {
        type: "rich_text",
        id: "inc-1",
        value: {
          content:
            "<p>En el nicho de <strong>vida a bordo en el Mar Rojo</strong> se usa mucho la promesa de “todo incluido”, pero casi nunca se explica bien. El resultado es un usuario que deja el lead con una idea equivocada del viaje.</p><p>Esta guía existe para resolver justo eso: qué suele incluir realmente una semana de liveaboard, qué depende del operador y qué conviene aclarar antes de pasar de interés a reserva.</p>",
        },
      },
      {
        type: "heading",
        id: "inc-2",
        value: {
          level: 2,
          text: "Lo que normalmente sí forma parte del paquete base",
        },
      },
      {
        type: "rich_text",
        id: "inc-3",
        value: {
          content:
            "<ul><li>alojamiento a bordo durante la ruta</li><li>comidas</li><li>programa básico de inmersiones</li><li>briefings y operativa general del viaje</li><li>botellas y plomos</li></ul><p>Eso es la columna vertebral de una página seria de producto. A partir de ahí empieza la explicación útil.</p>",
        },
      },
      {
        type: "heading",
        id: "inc-4",
        value: {
          level: 2,
          text: "Lo que conviene explicar siempre como “a revisar”",
        },
      },
      {
        type: "two_column",
        id: "inc-5",
        value: {
          leftColumn: {
            image: images.reefExploration,
            alt: "Equipo preparado sobre cubierta",
          },
          rightColumn: {
            title: "Aquí es donde se gana o se pierde confianza comercial.",
            content:
              "<ul><li>tasas y fees de operador</li><li>propinas</li><li>alquiler de equipo</li><li>seguro de cancelación</li></ul><p>Explicarlo bien reduce fricción, evita leads basura y deja el terreno listo para una conversación más madura.</p>",
          },
        },
      },
      {
        type: "heading",
        id: "inc-6",
        value: {
          level: 2,
          text: "Por qué esta guía es importante para Ruta Norte",
        },
      },
      {
        type: "rich_text",
        id: "inc-7",
        value: {
          content:
            "<p>La <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios desde Hurghada</a> es el producto principal de esta web. Si no aclaras bien qué entra y qué no, el usuario comparará mal o llegará a la landing principal con dudas que deberían estar resueltas aquí.</p><p>Esta satélite no vende sola. Su función es despejar una objeción crítica y empujar la decisión hacia la ruta correcta.</p>",
        },
      },
      {
        type: "accordion",
        id: "inc-8",
        value: {
          items: [
            {
              title: "¿Nitrox suele estar incluido?",
              content:
                "<p>Depende del operador y del tipo de salida. No conviene asumirlo si la información no está claramente detallada.</p>",
            },
            {
              title: "¿El material siempre entra?",
              content:
                "<p>No necesariamente. Una landing bien planteada debe dejar claro cuándo el usuario debe contar con alquiler o traer equipo propio.</p>",
            },
            {
              title: "¿Por qué esta página no da una lista definitiva para todos los barcos?",
              content:
                "<p>Porque la intención aquí es educar y cualificar. El detalle definitivo debe aterrizarse por salida o por operador real.</p>",
            },
          ],
        },
      },
      {
        type: "cta",
        id: "inc-9",
        value: {
          title: "Lleva esta claridad a la Ruta Norte y Pecios",
          description:
            "La landing principal de la ruta ya está preparada para convertir mejor cuando el usuario llega con estas dudas resueltas.",
          primaryCTA: {
            text: "Ir a la Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "como-llegar-a-hurghada-liveaboard",
    title: "Cómo llegar a Hurghada para un vida a bordo: la logística que reduce fricción",
    excerpt:
      "La satélite de logística para usuarios que ya quieren avanzar: vuelos, llegada a Hurghada, embarque y cómo no complicar la decisión de un liveaboard en el Mar Rojo.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.heroBlogListing,
      alt: "Aeropuerto y traslado hacia un barco de buceo",
    },
    category: {
      name: "Logística",
      color: "#3DABC2",
    },
    body: [
      {
        type: "rich_text",
        id: "hur-1",
        value: {
          content:
            "<p>Muchos usuarios no reservan una <strong>vida a bordo en el Mar Rojo</strong> porque todavía sienten fricción logística. No es que no quieran la ruta; es que todavía no visualizan cómo se convierte en un viaje real. Por eso esta guía es importante.</p><p>Su función no es dar una operativa cerrada para todos los casos. Su función es eliminar la niebla entre “me interesa” y “puedo empezar a organizarlo”.</p>",
        },
      },
      {
        type: "heading",
        id: "hur-2",
        value: {
          level: 2,
          text: "El dato clave: esta web vende Ruta Norte saliendo desde Hurghada",
        },
      },
      {
        type: "rich_text",
        id: "hur-3",
        value: {
          content:
            "<p>Eso simplifica mucho la propuesta de valor. En vez de dispersarse entre múltiples salidas y puertos, la web puede hablar de un punto de entrada reconocible para el usuario europeo. Esa claridad no es solo logística: también es comercial.</p>",
        },
      },
      {
        type: "heading",
        id: "hur-4",
        value: {
          level: 2,
          text: "Qué debería saber el usuario antes de decidir",
        },
      },
      {
        type: "info_cards",
        id: "hur-5",
        value: {
          cards: [
            {
              icon: "✈️",
              value: "Vuelo",
              label: "Llegar a Hurghada",
              color: "#3DABC2",
            },
            {
              icon: "🧳",
              value: "Embarque",
              label: "Pensar el día previo",
              color: "#0066CC",
            },
            {
              icon: "🚤",
              value: "Puerto",
              label: "Conectar con el barco",
              color: "#FF6B35",
            },
          ],
        },
      },
      {
        type: "rich_text",
        id: "hur-6",
        value: {
          content:
            "<ul><li>si te conviene llegar con margen o no</li><li>qué pasa entre aeropuerto, ciudad y puerto</li><li>qué documentación o preparativos conviene revisar</li><li>cómo encaja todo esto con la <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios</a></li></ul>",
        },
      },
      {
        type: "heading",
        id: "hur-7",
        value: {
          level: 2,
          text: "La logística no debe ser un post de relleno",
        },
      },
      {
        type: "quote",
        id: "hur-8",
        value: {
          text: "Cuando la logística está bien explicada, el usuario deja de imaginar un problema y empieza a imaginarse dentro del viaje.",
          author: "Enfoque editorial del cluster",
          role: "Hurghada y Ruta Norte",
        },
      },
      {
        type: "rich_text",
        id: "hur-9",
        value: {
          content:
            "<p>En este proyecto, la guía de Hurghada es una pieza de conversión. No existe para contar obviedades del destino. Existe para reducir fricción y preparar la decisión del usuario con más claridad que la competencia.</p>",
        },
      },
      {
        type: "cta",
        id: "hur-10",
        value: {
          title: "Ya sabes cómo aterrizarlo. Ahora toca ver la ruta.",
          description:
            "Pasa a la landing principal de Ruta Norte y Pecios para decidir si este viaje encaja contigo.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "primer-liveaboard-open-water-mar-rojo",
    title: "Primer liveaboard siendo Open Water: cómo pensar la Ruta Norte sin autoengañarte",
    excerpt:
      "La guía para el usuario que sueña con la Ruta Norte pero no tiene claro si un primer liveaboard en el Mar Rojo encaja con su nivel actual.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.advancedCourses,
      alt: "Buceador preparándose para su primer liveaboard",
    },
    category: {
      name: "Open Water",
      color: "#B54708",
    },
    body: [
      {
        type: "rich_text",
        id: "ow-1",
        value: {
          content:
            "<p>Hay una duda muy concreta detrás de muchas búsquedas de este nicho: <strong>quiero hacer un liveaboard en el Mar Rojo, pero sería mi primero y solo soy Open Water</strong>. Esta guía está hecha para esa intención.</p><p>No para decirte que sí a todo. Tampoco para expulsarte automáticamente del producto. Sino para ayudarte a leer mejor si la <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios</a> es una buena idea ahora mismo o si necesitas otra preparación previa.</p>",
        },
      },
      {
        type: "heading",
        id: "ow-2",
        value: {
          level: 2,
          text: "Lo que significa de verdad “ser tu primer liveaboard”",
        },
      },
      {
        type: "rich_text",
        id: "ow-3",
        value: {
          content:
            "<p>No solo habla de certificación. Habla de ritmo de viaje, varias inmersiones al día, convivencia a bordo, adaptación a la logística y capacidad para disfrutar sin sentir que todo te queda grande.</p>",
        },
      },
      {
        type: "heading",
        id: "ow-4",
        value: {
          level: 2,
          text: "Cuándo la Ruta Norte puede tener sentido para un Open Water",
        },
      },
      {
        type: "two_column",
        id: "ow-5",
        value: {
          leftColumn: {
            image: images.divingSchool,
            alt: "Buceadores revisando equipo antes de una inmersión",
          },
          rightColumn: {
            title: "Puede encajar, pero la clave es no venderlo como algo automático.",
            content:
              "<ul><li>si vienes con inmersiones recientes</li><li>si tienes buen control y comodidad en el agua</li><li>si entiendes que habrá partes del viaje más exigentes</li><li>si el objetivo es progresar con sentido, no solo tachar una ruta famosa</li></ul>",
          },
        },
      },
      {
        type: "heading",
        id: "ow-6",
        value: {
          level: 2,
          text: "Cuándo conviene levantar la mano y pedir una recomendación honesta",
        },
      },
      {
        type: "rich_text",
        id: "ow-7",
        value: {
          content:
            "<p>Si llevas pocas inmersiones, vienes sin continuidad reciente o te atrae la Ruta Norte solo por el nombre de Thistlegorm, lo sensato es convertir eso en una conversación y no en una reserva impulsiva. Ahí es donde la web tiene que ganar confianza.</p>",
        },
      },
      {
        type: "accordion",
        id: "ow-8",
        value: {
          items: [
            {
              title: "¿Open Water significa que la ruta está descartada?",
              content:
                "<p>No. Significa que la respuesta depende de cómo llegas, cómo buceas hoy y cómo se plantea la progresión dentro del viaje.</p>",
            },
            {
              title: "¿El Advanced a bordo arregla cualquier limitación?",
              content:
                "<p>No. Puede sumar valor, pero no sustituye honestidad comercial ni preparación real del buceador.</p>",
            },
            {
              title: "¿Cuál es el mejor siguiente paso si estoy dudando?",
              content:
                "<p>Ir a la landing principal y consultar tu caso con contexto. Eso vale más que una respuesta genérica en abstracto.</p>",
            },
          ],
        },
      },
      {
        type: "cta",
        id: "ow-9",
        value: {
          title: "Haz la pregunta correcta: ¿encaja la Ruta Norte conmigo ahora mismo?",
          description:
            "La landing principal está preparada para convertir esa duda en una conversación útil.",
          primaryCTA: {
            text: "Consultar Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "ruta-norte-vs-ruta-sur-mar-rojo",
    title: "Ruta Norte vs Ruta Sur del Mar Rojo: cuál encaja mejor con tu viaje",
    excerpt:
      "La comparativa que ayuda a decidir entre una ruta icónica de pecios y una propuesta más orientada a otras sensaciones del Mar Rojo.",
    publishedAt: "2026-03-04",
    readTime: "9 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.heroPecios,
      alt: "Comparativa entre rutas de buceo del Mar Rojo",
    },
    category: {
      name: "Comparativa",
      color: "#7C3AED",
    },
    body: [
      {
        type: "rich_text",
        id: "cmp-1",
        value: {
          content:
            "<p>Una de las búsquedas más útiles del cluster es <strong>Ruta Norte vs Ruta Sur del Mar Rojo</strong>. Quien hace esta comparación ya no está soñando en abstracto: está intentando entender qué viaje encaja mejor con lo que quiere vivir, con su nivel y con el tipo de experiencia que espera.</p><p>Por eso esta página no debe sonar a artículo turístico genérico. Debe ayudar a decidir.</p>",
        },
      },
      {
        type: "heading",
        id: "cmp-2",
        value: {
          level: 2,
          text: "La Ruta Norte gana cuando el usuario quiere una referencia clara y reconocible",
        },
      },
      {
        type: "rich_text",
        id: "cmp-3",
        value: {
          content:
            "<p>La <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios desde Hurghada</a> funciona muy bien cuando el usuario busca un producto fácil de entender: pecios míticos, arrecifes icónicos y una narrativa de viaje muy clara. Eso es una ventaja comercial brutal.</p>",
        },
      },
      {
        type: "heading",
        id: "cmp-4",
        value: {
          level: 2,
          text: "La Ruta Sur suele entrar en juego cuando cambian las prioridades",
        },
      },
      {
        type: "rich_text",
        id: "cmp-5",
        value: {
          content:
            "<p>Cuando el usuario ya no prioriza pecios o quiere otro tipo de mar, otro ritmo o una sensación más orientada a determinados perfiles, la Ruta Sur puede aparecer como alternativa. El problema es que muchas webs comparan ambas sin ordenar bien la intención del usuario.</p>",
        },
      },
      {
        type: "info_cards",
        id: "cmp-6",
        value: {
          cards: [
            {
              icon: "⚓",
              value: "Norte",
              label: "Pecios y producto reconocible",
              color: "#0066CC",
            },
            {
              icon: "🧭",
              value: "Sur",
              label: "Otra lógica de viaje",
              color: "#7C3AED",
            },
            {
              icon: "🎯",
              value: "Decisión",
              label: "Depende del perfil",
              color: "#FF6B35",
            },
          ],
        },
      },
      {
        type: "accordion",
        id: "cmp-7",
        value: {
          items: [
            {
              title: "¿Qué ruta es mejor para un primer liveaboard serio?",
              content:
                "<p>En este proyecto la respuesta suele empujar hacia la Ruta Norte, porque explica mejor el producto, tiene spots muy reconocibles y encaja muy bien con una decisión comercial clara.</p>",
            },
            {
              title: "¿Qué pasa si lo que más me atrae es Thistlegorm o Abu Nuhas?",
              content:
                "<p>Entonces la Ruta Norte ya tiene una ventaja evidente, porque esos nombres forman parte central de su atractivo.</p>",
            },
            {
              title: "¿Esta comparativa sustituye a hablar con alguien?",
              content:
                "<p>No. Sirve para ordenar la decisión. El siguiente paso útil sigue siendo pasar por la landing principal y consultar tu caso.</p>",
            },
          ],
        },
      },
      {
        type: "cta",
        id: "cmp-8",
        value: {
          title: "Si lo que buscas es un producto claro, empieza por la Ruta Norte",
          description:
            "La landing principal ya está preparada para convertir esta comparación en una conversación comercial útil.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "hurghada-vs-sharm-liveaboard",
    title: "Hurghada vs Sharm para un liveaboard: qué cambia de verdad para el usuario",
    excerpt:
      "Comparativa práctica entre Hurghada y Sharm para orientar mejor la decisión de un viaje de vida a bordo en el Mar Rojo.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.heroBlogListing,
      alt: "Puertos y salidas de vida a bordo en el Mar Rojo",
    },
    category: {
      name: "Comparativa",
      color: "#7C3AED",
    },
    body: [
      {
        type: "rich_text",
        id: "hs-1",
        value: {
          content:
            "<p>Otra comparativa que aparece cuando el usuario ya está avanzando es <strong>Hurghada vs Sharm para un liveaboard</strong>. En la práctica, no siempre está buscando un debate geográfico. Muchas veces está buscando reducir fricción logística y entender qué propuesta de viaje encaja mejor con lo que le estás vendiendo.</p>",
        },
      },
      {
        type: "heading",
        id: "hs-2",
        value: {
          level: 2,
          text: "En esta web el foco está puesto en Hurghada por una razón comercial",
        },
      },
      {
        type: "rich_text",
        id: "hs-3",
        value: {
          content:
            "<p>No es solo una elección operativa. Es una elección de claridad. <strong>Hurghada</strong> se usa aquí como punto de salida que simplifica el mensaje, ordena la logística y refuerza la propuesta de <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios</a>.</p>",
        },
      },
      {
        type: "quote",
        id: "hs-4",
        value: {
          text: "La mejor salida no es la que permite decir más cosas, sino la que deja la propuesta más clara para el usuario correcto.",
          author: "Criterio de producto",
          role: "Ruta Norte desde Hurghada",
        },
      },
      {
        type: "heading",
        id: "hs-5",
        value: {
          level: 2,
          text: "Qué cambia realmente cuando el usuario compara ambos puntos",
        },
      },
      {
        type: "rich_text",
        id: "hs-6",
        value: {
          content:
            "<ul><li>cómo imagina la llegada y el embarque</li><li>cómo percibe la complejidad del viaje</li><li>qué tan alineada ve la salida con la ruta que le estás proponiendo</li><li>si siente que el producto es concreto o demasiado disperso</li></ul>",
        },
      },
      {
        type: "cta",
        id: "hs-7",
        value: {
          title: "Si buscas una propuesta clara, vuelve a la Ruta Norte desde Hurghada",
          description:
            "La landing principal ya toma partido por esa claridad y la convierte en producto.",
          primaryCTA: {
            text: "Ir a la Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "abu-nuhas-cementerio-de-barcos",
    title: "Abu Nuhas: el cementerio de barcos que hace irresistible la Ruta Norte",
    excerpt:
      "Por qué Abu Nuhas es uno de los grandes argumentos de venta de la Ruta Norte y cómo usarlo para atraer tráfico de intención específica.",
    publishedAt: "2026-03-04",
    readTime: "7 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.wreckDiving,
      alt: "Abu Nuhas y sus pecios en el Mar Rojo",
    },
    category: {
      name: "Spot",
      color: "#FF6B35",
    },
    body: [
      {
        type: "rich_text",
        id: "abu-1",
        value: {
          content:
            "<p><strong>Abu Nuhas</strong> tiene algo que lo convierte en una pieza satélite perfecta del cluster: quien busca ese nombre no está en fase de descubrimiento superficial. Ya está entrando en el detalle que mueve la decisión.</p><p>Por eso esta página existe para reforzar la <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios</a>, no para quedarse como guía aislada.</p>",
        },
      },
      {
        type: "heading",
        id: "abu-2",
        value: {
          level: 2,
          text: "Por qué Abu Nuhas vende tanto dentro de la Ruta Norte",
        },
      },
      {
        type: "rich_text",
        id: "abu-3",
        value: {
          content:
            "<p>Porque concentra en un solo nombre varias cosas que un usuario valora mucho: historia marítima, variedad de pecios, narrativa muy reconocible y capacidad de imaginar una semana que merece el viaje.</p>",
        },
      },
      {
        type: "info_cards",
        id: "abu-4",
        value: {
          cards: [
            {
              icon: "⚓",
              value: "Pecios",
              label: "Varios en un mismo entorno",
              color: "#FF6B35",
            },
            {
              icon: "🗺️",
              value: "Ruta Norte",
              label: "Encaje perfecto",
              color: "#0066CC",
            },
            {
              icon: "🔎",
              value: "Long tail",
              label: "Búsqueda con intención",
              color: "#0F8C62",
            },
          ],
        },
      },
      {
        type: "cta",
        id: "abu-5",
        value: {
          title: "Abu Nuhas no se vende solo: se entiende dentro de la Ruta Norte",
          description:
            "Usa este spot como puerta de entrada hacia la landing principal del viaje.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "giannis-d-abu-nuhas",
    title: "Giannis D en Abu Nuhas: el pecio que hace memorable esta parte de la ruta",
    excerpt:
      "Una pieza satélite de pecio para captar búsquedas específicas y devolverlas al producto principal: Ruta Norte y Pecios desde Hurghada.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.thistlegorm,
      alt: "Giannis D en Abu Nuhas",
    },
    category: {
      name: "Pecio",
      color: "#B54708",
    },
    body: [
      {
        type: "rich_text",
        id: "gia-1",
        value: {
          content:
            "<p><strong>Giannis D</strong> es el tipo de nombre que permite al cluster ganar profundidad. No todo el mundo lo buscará, pero quien lo hace ya está muy cerca de una intención útil: quiere detalles, spots concretos y razones para elegir esta ruta.</p>",
        },
      },
      {
        type: "heading",
        id: "gia-2",
        value: {
          level: 2,
          text: "Qué aporta Giannis D al discurso comercial de la Ruta Norte",
        },
      },
      {
        type: "rich_text",
        id: "gia-3",
        value: {
          content:
            "<p>Aporta especificidad. Hace que el producto deje de sonar a “ruta bonita por el Mar Rojo” y empiece a sonar a una semana que quienes saben del tema reconocen como seria y deseable.</p>",
        },
      },
      {
        type: "cta",
        id: "gia-4",
        value: {
          title: "Si Giannis D te interesa, la Ruta Norte es el contexto correcto",
          description:
            "Pasa de la curiosidad por un pecio a la decisión sobre el viaje completo.",
          primaryCTA: {
            text: "Ir a la Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "dunraven-mar-rojo",
    title: "Dunraven en el Mar Rojo: el pecio que añade profundidad al itinerario",
    excerpt:
      "Guía satélite para explicar por qué Dunraven no es solo un extra, sino una pieza que mejora el valor percibido de la Ruta Norte.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.heroPecios,
      alt: "Pecio Dunraven en el Mar Rojo",
    },
    category: {
      name: "Pecio",
      color: "#B54708",
    },
    body: [
      {
        type: "rich_text",
        id: "dun-1",
        value: {
          content:
            "<p><strong>Dunraven</strong> funciona muy bien como satélite porque ayuda a explicar que la Ruta Norte no vive solo de un nombre como Thistlegorm. El itinerario gana riqueza cuando el usuario entiende que hay varios hitos que hacen la semana más completa.</p>",
        },
      },
      {
        type: "heading",
        id: "dun-2",
        value: {
          level: 2,
          text: "Por qué este pecio importa dentro de una landing comercial",
        },
      },
      {
        type: "rich_text",
        id: "dun-3",
        value: {
          content:
            "<p>Porque añade profundidad narrativa, refuerza la idea de variedad dentro de la ruta y permite segmentar mejor a usuarios que ya están comparando experiencias con más detalle.</p>",
        },
      },
      {
        type: "cta",
        id: "dun-4",
        value: {
          title: "Usa Dunraven como una razón más para entender la Ruta Norte completa",
          description:
            "La decisión buena no es elegir un pecio suelto, sino ver cómo encaja dentro del viaje.",
          primaryCTA: {
            text: "Ver la Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "advanced-a-bordo-mar-rojo",
    title: "Advanced a bordo en el Mar Rojo: cuándo aporta valor y cuándo no",
    excerpt:
      "Cómo plantear el Advanced a bordo como mejora real de la experiencia en Ruta Norte, sin usarlo como promesa vacía para vender a cualquiera.",
    publishedAt: "2026-03-04",
    readTime: "7 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.advancedCourses,
      alt: "Buceadores completando formación Advanced durante un liveaboard",
    },
    category: {
      name: "Advanced",
      color: "#0F8C62",
    },
    body: [
      {
        type: "rich_text",
        id: "advb-1",
        value: {
          content:
            "<p>En esta web el <strong>producto principal</strong> es la <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios desde Hurghada</a>. El <strong>Advanced a bordo</strong> no debe competir con esa promesa, sino reforzarla cuando tiene sentido para un perfil concreto.</p><p>Eso significa algo muy simple: usar el curso como valor adicional para aprovechar mejor la semana, no como atajo comercial para esquivar objeciones reales de nivel.</p>",
        },
      },
      {
        type: "heading",
        id: "advb-2",
        value: {
          level: 2,
          text: "Cuándo sí tiene sentido plantearlo",
        },
      },
      {
        type: "info_cards",
        id: "advb-3",
        value: {
          cards: [
            {
              icon: "🎯",
              value: "Mejor encaje",
              label: "Perfil que quiere progresar",
              color: "#0F8C62",
            },
            {
              icon: "🤿",
              value: "Más contexto",
              label: "Profundidad, control y confianza",
              color: "#0066CC",
            },
            {
              icon: "⚠️",
              value: "No es magia",
              label: "No sustituye experiencia base",
              color: "#FF6B35",
            },
          ],
        },
      },
      {
        type: "rich_text",
        id: "advb-4",
        value: {
          content:
            "<ul><li>si el buceador ya encaja razonablemente con la ruta</li><li>si quiere ganar comodidad en profundidad y ritmo de liveaboard</li><li>si entiende que el viaje sigue siendo la prioridad y el curso lo complementa</li></ul><p>Planteado así, el Advanced aporta claridad y mejora la percepción del producto sin deformarlo.</p>",
        },
      },
      {
        type: "heading",
        id: "advb-5",
        value: {
          level: 2,
          text: "Cuándo usarlo como argumento principal es un error",
        },
      },
      {
        type: "rich_text",
        id: "advb-6",
        value: {
          content:
            "<p>Cuando el usuario todavía no encaja bien con la ruta, vender el Advanced como solución universal suele generar expectativas pobres y leads peor cualificados. Una landing seria deja claro que primero se evalúa el viaje y luego se decide si la parte formativa suma o no.</p>",
        },
      },
      {
        type: "cta",
        id: "advb-7",
        value: {
          title: "Primero decide la ruta. Luego valora si el Advanced te aporta.",
          description:
            "La landing principal de Ruta Norte está planteada justo con ese orden de decisión.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "visado-egipto-hurghada",
    title: "Visado para Egipto y llegada a Hurghada: lo que conviene tener claro antes del liveaboard",
    excerpt:
      "Una guía de logística para reducir fricción antes de reservar: visado, documentación básica y cómo encaja con una salida de vida a bordo desde Hurghada.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.heroBlogListing,
      alt: "Documentación de viaje para Egipto y embarque en Hurghada",
    },
    category: {
      name: "Logística",
      color: "#3DABC2",
    },
    body: [
      {
        type: "rich_text",
        id: "visa-1",
        value: {
          content:
            "<p>La pregunta sobre el <strong>visado para Egipto</strong> no suele aparecer al principio del funnel, pero sí en el momento en que el viaje empieza a verse real. Ahí es donde una buena página de logística gana valor: no por repetir trámites genéricos, sino por quitar fricción a la decisión.</p>",
        },
      },
      {
        type: "heading",
        id: "visa-2",
        value: {
          level: 2,
          text: "Qué debería resolver esta página dentro del proyecto",
        },
      },
      {
        type: "rich_text",
        id: "visa-3",
        value: {
          content:
            "<ul><li>que el usuario entienda que la documentación es una parte manejable del viaje</li><li>que relacione el trámite con una salida clara desde Hurghada</li><li>que pase de la duda operativa a la <a href=\"/rutas/norte-7-dias\">landing de Ruta Norte</a> sin sensación de caos</li></ul>",
        },
      },
      {
        type: "quote",
        id: "visa-4",
        value: {
          text: "La logística buena no distrae del producto: lo hace más fácil de comprar.",
          author: "Criterio del cluster",
          role: "Hurghada y Ruta Norte",
        },
      },
      {
        type: "cta",
        id: "visa-5",
        value: {
          title: "Con la logística más clara, toca decidir la ruta",
          description:
            "Vuelve a la página principal de Ruta Norte y revisa si este viaje encaja contigo.",
          primaryCTA: {
            text: "Ir a Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "checklist-vida-a-bordo-mar-rojo",
    title: "Checklist para un vida a bordo en el Mar Rojo: qué llevar y qué no olvidar",
    excerpt:
      "La página de apoyo que baja ansiedad pre-viaje y refuerza la sensación de control antes de reservar una Ruta Norte desde Hurghada.",
    publishedAt: "2026-03-04",
    readTime: "7 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.safetyGuide,
      alt: "Equipo y checklist para un vida a bordo en el Mar Rojo",
    },
    category: {
      name: "Checklist",
      color: "#FF6B35",
    },
    body: [
      {
        type: "rich_text",
        id: "chk-1",
        value: {
          content:
            "<p>Una buena <strong>checklist para un vida a bordo</strong> no es solo una lista útil. También es una pieza comercial. Hace que el viaje parezca más concreto, más preparable y menos intimidante para quien todavía está valorando si dar el paso.</p>",
        },
      },
      {
        type: "heading",
        id: "chk-2",
        value: {
          level: 2,
          text: "Los tres bloques que de verdad importan",
        },
      },
      {
        type: "info_cards",
        id: "chk-3",
        value: {
          cards: [
            {
              icon: "🤿",
              value: "Buceo",
              label: "Equipo y documentación",
              color: "#0066CC",
            },
            {
              icon: "🧳",
              value: "Viaje",
              label: "Ropa, medicación y básicos",
              color: "#FF6B35",
            },
            {
              icon: "📋",
              value: "Operativa",
              label: "Lo que conviene confirmar antes",
              color: "#0F8C62",
            },
          ],
        },
      },
      {
        type: "rich_text",
        id: "chk-4",
        value: {
          content:
            "<ul><li>equipo personal y material de buceo si aplica</li><li>documentación, seguro y certificaciones</li><li>ropa cómoda para una semana a bordo</li><li>pequeños extras que ahorran problemas en barco</li></ul><p>El objetivo no es parecer exhaustivo sin fin. Es ayudar al usuario a imaginar que puede llegar preparado y disfrutar mejor la ruta.</p>",
        },
      },
      {
        type: "cta",
        id: "chk-5",
        value: {
          title: "Si ya piensas en la checklist, estás cerca de decidir el viaje",
          description:
            "Pasa ahora a la Ruta Norte y revisa si el itinerario y el nivel encajan contigo.",
          primaryCTA: {
            text: "Consultar Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "pecios-vs-tiburones-mar-rojo",
    title: "Pecios vs tiburones en el Mar Rojo: qué experiencia estás buscando de verdad",
    excerpt:
      "Comparativa para usuarios que dudan entre una ruta cargada de pecios emblemáticos y una experiencia más guiada por fauna grande.",
    publishedAt: "2026-03-04",
    readTime: "7 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.heroPecios,
      alt: "Comparativa entre buceo en pecios y encuentros con tiburones en el Mar Rojo",
    },
    category: {
      name: "Comparativa",
      color: "#7C3AED",
    },
    body: [
      {
        type: "rich_text",
        id: "pvt-1",
        value: {
          content:
            "<p>Hay usuarios que no están comparando operadores: están comparando <strong>tipos de viaje</strong>. Cuando aparece la duda entre <strong>pecios vs tiburones en el Mar Rojo</strong>, la web debe ayudar a entender qué emoción, qué ritmo y qué narrativa de inmersiones quiere realmente esa persona.</p>",
        },
      },
      {
        type: "heading",
        id: "pvt-2",
        value: {
          level: 2,
          text: "Cuándo gana la Ruta Norte",
        },
      },
      {
        type: "rich_text",
        id: "pvt-3",
        value: {
          content:
            "<p>Gana cuando el usuario quiere un producto muy reconocible, con nombres míticos, historia marítima y una semana que se explica sola. Ese es exactamente el fuerte de la <a href=\"/rutas/norte-7-dias\">Ruta Norte y Pecios</a>.</p>",
        },
      },
      {
        type: "heading",
        id: "pvt-4",
        value: {
          level: 2,
          text: "Cuándo puede mirar hacia otros viajes",
        },
      },
      {
        type: "rich_text",
        id: "pvt-5",
        value: {
          content:
            "<p>Cuando prioriza encuentros concretos de fauna grande por encima de la narrativa de itinerario, los pecios o la combinación clásica del norte. La función de esta comparativa es filtrar mejor, no intentar vender la misma ruta a cualquiera.</p>",
        },
      },
      {
        type: "cta",
        id: "pvt-6",
        value: {
          title: "Si lo tuyo son pecios icónicos y una ruta clara, empieza por el Norte",
          description:
            "La landing principal está pensada para convertir esa preferencia en una consulta real.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "como-es-un-vida-a-bordo-mar-rojo",
    title: "Cómo es un vida a bordo en el Mar Rojo: la semana que el usuario necesita imaginar",
    excerpt:
      "Una guía para explicar ritmo, convivencia y lógica del viaje a quien todavía no ha hecho un liveaboard y necesita visualizarlo bien.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.heroRutaNorte,
      alt: "Vida a bordo en el Mar Rojo durante una semana de liveaboard",
    },
    category: {
      name: "Vida a bordo",
      color: "#0066CC",
    },
    body: [
      {
        type: "rich_text",
        id: "vab-1",
        value: {
          content:
            "<p>La pregunta <strong>cómo es un vida a bordo en el Mar Rojo</strong> aparece cuando el usuario ya no solo quiere spots. Quiere entender la forma del viaje: cómo se duerme, cómo se bucea, cómo se organiza el día y si esa experiencia le resulta atractiva o demasiado intensa.</p>",
        },
      },
      {
        type: "heading",
        id: "vab-2",
        value: {
          level: 2,
          text: "Lo que una buena página debe explicar",
        },
      },
      {
        type: "two_column",
        id: "vab-3",
        value: {
          leftColumn: {
            image: images.heroSSI,
            alt: "Cubierta de barco y vida diaria en un liveaboard",
          },
          rightColumn: {
            title: "No se trata de romantizar el barco. Se trata de hacer el viaje entendible.",
            content:
              "<ul><li>ritmo de varias inmersiones al día</li><li>convivencia y descanso a bordo</li><li>briefings, comidas y tiempos muertos</li><li>cómo cambia la experiencia frente a un hotel con salidas diarias</li></ul>",
          },
        },
      },
      {
        type: "rich_text",
        id: "vab-4",
        value: {
          content:
            "<p>Cuando esta página está bien resuelta, el usuario deja de preguntarse si un liveaboard es “demasiado raro” y empieza a valorar si la <a href=\"/rutas/norte-7-dias\">Ruta Norte</a> es su mejor siguiente viaje.</p>",
        },
      },
      {
        type: "cta",
        id: "vab-5",
        value: {
          title: "Ya imaginas la semana. Ahora mira la ruta concreta.",
          description:
            "Lleva esa idea general a la landing principal de Ruta Norte y Pecios.",
          primaryCTA: {
            text: "Ir a Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "camarotes-comida-wifi-liveaboard",
    title: "Camarotes, comida y wifi en un liveaboard: dudas pequeñas que frenan reservas",
    excerpt:
      "Guía de apoyo para resolver micro-objeciones sobre la vida a bordo y mejorar la conversión de usuarios que ya están cerca de consultar.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.heroSSI,
      alt: "Interior de un barco con camarotes y zonas comunes",
    },
    category: {
      name: "Vida a bordo",
      color: "#0066CC",
    },
    body: [
      {
        type: "rich_text",
        id: "cab-1",
        value: {
          content:
            "<p>Hay dudas que parecen secundarias, pero bloquean conversiones: <strong>cómo son los camarotes</strong>, si se come bien, si habrá wifi o qué nivel de comodidad esperar a bordo. Resolverlas bien mejora la calidad del lead porque baja ansiedad sin sobredimensionar el producto.</p>",
        },
      },
      {
        type: "info_cards",
        id: "cab-2",
        value: {
          cards: [
            {
              icon: "🛏️",
              value: "Camarotes",
              label: "Descanso y espacio",
              color: "#0066CC",
            },
            {
              icon: "🍽️",
              value: "Comida",
              label: "Ritmo y energía",
              color: "#FF6B35",
            },
            {
              icon: "📶",
              value: "Wifi",
              label: "Expectativas realistas",
              color: "#0F8C62",
            },
          ],
        },
      },
      {
        type: "rich_text",
        id: "cab-3",
        value: {
          content:
            "<p>La clave aquí no es prometer lujo. Es explicar que la experiencia gira alrededor del viaje y del buceo, y que estas comodidades importan porque hacen la semana más llevadera y más fácil de imaginar.</p>",
        },
      },
      {
        type: "cta",
        id: "cab-4",
        value: {
          title: "Con las micro-dudas resueltas, la decisión vuelve a la ruta",
          description:
            "Revisa la Ruta Norte y decide si esta semana de vida a bordo encaja contigo.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "nitrox-a-bordo-mar-rojo",
    title: "Nitrox a bordo en el Mar Rojo: por qué importa en una semana de varias inmersiones",
    excerpt:
      "Guía breve para resolver una objeción técnica frecuente y conectar mejor con usuarios que ya comparan detalle operativo de la ruta.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.reefExploration,
      alt: "Preparación de botellas Nitrox a bordo",
    },
    category: {
      name: "Nitrox",
      color: "#0F8C62",
    },
    body: [
      {
        type: "rich_text",
        id: "nit-1",
        value: {
          content:
            "<p>La duda sobre el <strong>Nitrox a bordo</strong> aparece en un punto interesante del funnel: cuando el usuario ya no solo está soñando con el viaje, sino revisando cómo quiere bucearlo. Eso la convierte en una pieza de soporte útil para la Ruta Norte.</p>",
        },
      },
      {
        type: "heading",
        id: "nit-2",
        value: {
          level: 2,
          text: "Qué aporta esta página dentro del cluster",
        },
      },
      {
        type: "rich_text",
        id: "nit-3",
        value: {
          content:
            "<ul><li>responder una objeción operativa frecuente</li><li>mejorar la percepción de claridad técnica del proyecto</li><li>enviar tráfico cualificado de vuelta a la <a href=\"/rutas/norte-7-dias\">Ruta Norte</a></li></ul>",
        },
      },
      {
        type: "cta",
        id: "nit-4",
        value: {
          title: "Si ya preguntas por Nitrox, ya estás mirando el viaje en serio",
          description:
            "Vuelve a la landing principal y revisa el itinerario completo de Ruta Norte.",
          primaryCTA: {
            text: "Ir a la Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "carnatic-abu-nuhas",
    title: "Carnatic en Abu Nuhas: el pecio que refuerza la narrativa del cementerio de barcos",
    excerpt:
      "Pieza satélite para captar búsquedas de detalle dentro de Abu Nuhas y devolverlas al producto principal de Ruta Norte.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.wreckDiving,
      alt: "Pecio Carnatic en Abu Nuhas",
    },
    category: {
      name: "Pecio",
      color: "#B54708",
    },
    body: [
      {
        type: "rich_text",
        id: "car-1",
        value: {
          content:
            "<p><strong>Carnatic</strong> sirve para profundizar el cluster de Abu Nuhas y demostrar que la Ruta Norte no depende de un solo nombre famoso. Cuando el usuario entra en este nivel de detalle, está mostrando una intención muy valiosa.</p>",
        },
      },
      {
        type: "rich_text",
        id: "car-2",
        value: {
          content:
            "<p>La función de esta URL no es competir con la landing principal, sino apoyarla: añadir especificidad, reforzar el atractivo de Abu Nuhas y devolver la conversación al viaje completo.</p>",
        },
      },
      {
        type: "cta",
        id: "car-3",
        value: {
          title: "Carnatic se entiende mejor dentro de toda la Ruta Norte",
          description:
            "Pasa del detalle de un pecio al itinerario completo que le da sentido.",
          primaryCTA: {
            text: "Ver la ruta",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "shark-yolanda-reef-mar-rojo",
    title: "Shark y Yolanda Reef: el bloque de arrecife que equilibra la Ruta Norte",
    excerpt:
      "Spot satélite para explicar por qué la Ruta Norte no vive solo de pecios y cómo Ras Mohammed completa el valor del itinerario.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.rassMohammed,
      alt: "Shark Reef y Yolanda Reef en Ras Mohammed",
    },
    category: {
      name: "Spot",
      color: "#3DABC2",
    },
    body: [
      {
        type: "rich_text",
        id: "syr-1",
        value: {
          content:
            "<p><strong>Shark y Yolanda Reef</strong> son claves para que la Ruta Norte no se lea como una suma de pecios sin contraste. Este bloque de arrecife aporta variedad, energía visual y una idea más completa de lo que significa una semana bien diseñada en el Mar Rojo.</p>",
        },
      },
      {
        type: "rich_text",
        id: "syr-2",
        value: {
          content:
            "<p>Como satélite, esta página tiene una misión muy concreta: captar búsquedas de spot y explicar por qué Ras Mohammed mejora el atractivo de la <a href=\"/rutas/norte-7-dias\">Ruta Norte</a>.</p>",
        },
      },
      {
        type: "cta",
        id: "syr-3",
        value: {
          title: "Ras Mohammed cobra sentido cuando ves la ruta completa",
          description:
            "Vuelve a la landing principal y revisa cómo encaja este tramo dentro del itinerario.",
          primaryCTA: {
            text: "Ir a Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "rosalie-moller-mar-rojo",
    title: "Rosalie Moller en el Mar Rojo: el pecio que segmenta mejor por nivel",
    excerpt:
      "Guía satélite para usuarios que buscan detalle técnico y para reforzar el discurso honesto sobre nivel en la Ruta Norte.",
    publishedAt: "2026-03-04",
    readTime: "7 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.heroPecios,
      alt: "Rosalie Moller en el Mar Rojo",
    },
    category: {
      name: "Pecio",
      color: "#B54708",
    },
    body: [
      {
        type: "rich_text",
        id: "ros-1",
        value: {
          content:
            "<p><strong>Rosalie Moller</strong> es una de esas páginas que ayudan a elevar el nivel editorial del cluster. No porque vaya a atraer el mayor volumen, sino porque fuerza a la web a hablar con más honestidad sobre profundidad, perfil de buceador y expectativas de la ruta.</p>",
        },
      },
      {
        type: "heading",
        id: "ros-2",
        value: {
          level: 2,
          text: "Por qué esta URL mejora el discurso comercial",
        },
      },
      {
        type: "rich_text",
        id: "ros-3",
        value: {
          content:
            "<p>Porque convierte el mensaje “Ruta Norte para muchos perfiles” en algo más preciso. Explicar spots como Rosalie Moller obliga a segmentar mejor y hace más creíble la <a href=\"/rutas/norte-7-dias\">landing principal</a>.</p>",
        },
      },
      {
        type: "cta",
        id: "ros-4",
        value: {
          title: "Si te interesa Rosalie Moller, necesitas ver la ruta completa con contexto",
          description:
            "Pasa al pilar principal para entender cómo encaja este pecio en la semana.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "temporada-ruta-norte-mar-rojo",
    title: "Mejor temporada para la Ruta Norte del Mar Rojo: cómo pensar junio a diciembre",
    excerpt:
      "Página de apoyo para búsquedas de temporada y fechas, enfocada en ayudar a decidir cuándo encaja mejor una Ruta Norte desde Hurghada.",
    publishedAt: "2026-03-04",
    readTime: "7 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.heroRutaNorte,
      alt: "Temporada de Ruta Norte en el Mar Rojo",
    },
    category: {
      name: "Temporada",
      color: "#FF6B35",
    },
    body: [
      {
        type: "rich_text",
        id: "tmp-1",
        value: {
          content:
            "<p>La búsqueda de <strong>mejor temporada para la Ruta Norte</strong> suele esconder una intención comercial muy fuerte: el usuario ya se imagina en el viaje, pero necesita decidir <em>cuándo</em>. Esta página existe para ordenar esa decisión sin convertirla en meteorología genérica.</p>",
        },
      },
      {
        type: "info_cards",
        id: "tmp-2",
        value: {
          cards: [
            {
              icon: "☀️",
              value: "Verano",
              label: "Temperatura y ritmo",
              color: "#FF6B35",
            },
            {
              icon: "🍂",
              value: "Otoño",
              label: "Equilibrio muy atractivo",
              color: "#0F8C62",
            },
            {
              icon: "📅",
              value: "Fechas",
              label: "Pensar disponibilidad real",
              color: "#0066CC",
            },
          ],
        },
      },
      {
        type: "rich_text",
        id: "tmp-3",
        value: {
          content:
            "<p>Más que vender un mes “perfecto”, la página debe ayudar a que el usuario pase de la curiosidad estacional a una consulta útil sobre su ventana de viaje y su encaje con la <a href=\"/rutas/norte-7-dias\">Ruta Norte</a>.</p>",
        },
      },
      {
        type: "cta",
        id: "tmp-4",
        value: {
          title: "Si ya piensas en temporada, el siguiente paso es consultar la ruta",
          description:
            "Ve al pilar principal y cuéntanos qué ventana de viaje te interesa.",
          primaryCTA: {
            text: "Consultar Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "seguro-buceo-dan-egipto",
    title: "Seguro de buceo para Egipto: por qué esta duda importa antes de un liveaboard",
    excerpt:
      "Guía de soporte para resolver una objeción logística real y mejorar la percepción de seguridad antes de reservar una vida a bordo en el Mar Rojo.",
    publishedAt: "2026-03-04",
    readTime: "6 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.safetyGuide,
      alt: "Seguro y seguridad para buceo en Egipto",
    },
    category: {
      name: "Seguridad",
      color: "#0066CC",
    },
    body: [
      {
        type: "rich_text",
        id: "seg-1",
        value: {
          content:
            "<p>El <strong>seguro de buceo para Egipto</strong> aparece como objeción en una fase avanzada: el usuario ya está valorando el viaje y quiere confirmar que no está pasando por alto una parte importante de seguridad y operativa.</p>",
        },
      },
      {
        type: "heading",
        id: "seg-2",
        value: {
          level: 2,
          text: "Qué aporta esta página al cluster",
        },
      },
      {
        type: "rich_text",
        id: "seg-3",
        value: {
          content:
            "<ul><li>refuerza una percepción de viaje serio y bien explicado</li><li>reduce fricción en perfiles que revisan requisitos con detalle</li><li>prepara mejor la conversación de reserva en <a href=\"/rutas/norte-7-dias\">Ruta Norte</a></li></ul>",
        },
      },
      {
        type: "cta",
        id: "seg-4",
        value: {
          title: "Con la parte de seguridad ordenada, vuelve a la ruta principal",
          description:
            "Consulta la Ruta Norte y revisa si el viaje encaja contigo y con tu nivel actual.",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "ss-thistlegorm-guia-completa",
    title: "SS Thistlegorm: Guía Completa del Mejor Pecio del Mar Rojo",
    excerpt: "Descubre la historia y los secretos del pecio más famoso del mundo. Guía completa para buceadores de todos los niveles.",
    publishedAt: "2026-01-15",
    readTime: "8 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.thistlegorm,
      alt: "SS Thistlegorm Wreck",
    },
    category: {
      name: "Pecios",
      color: "#FF6B35",
    },
    body: [
      {
        type: "rich_text",
        id: "1",
        value: {
          content: "<p>El SS Thistlegorm es sin duda el pecio más famoso del Mar Rojo y uno de los mejores del mundo. Hundido en 1941 durante la Segunda Guerra Mundial, este carguero británico yace a 30 metros de profundidad con su carga intacta.</p>",
        },
      },
      {
        type: "heading",
        id: "2",
        value: {
          level: 2,
          text: "Historia del SS Thistlegorm",
        },
      },
      {
        type: "rich_text",
        id: "3",
        value: {
          content: "<p>El Thistlegorm fue construido en 1940 en Sunderland, Inglaterra. Transportaba suministros militares para las fuerzas británicas en África cuando fue bombardeado por aviones alemanes el 6 de octubre de 1941.</p><p>La explosión partió el barco en dos, pero dejó intacta gran parte de su carga: motocicletas BSA, camiones Bedford, rifles, municiones y hasta dos locomotoras.</p>",
        },
      },
      {
        type: "image",
        id: "4",
        value: {
          url: images.thistlegorm,
          caption: "Vista del casco del SS Thistlegorm a 30 metros de profundidad",
          alt: "SS Thistlegorm wreck underwater",
        },
      },
      {
        type: "heading",
        id: "5",
        value: {
          level: 2,
          text: "Qué Ver en el Pecio",
        },
      },
      {
        type: "info_cards",
        id: "6",
        value: {
          cards: [
            {
              icon: "⚓",
              value: "30m",
              label: "Profundidad",
              color: "#0066CC",
            },
            {
              icon: "👁",
              value: "20-30m",
              label: "Visibilidad",
              color: "#FF6B35",
            },
            {
              icon: "🌡",
              value: "24-26°C",
              label: "Temperatura",
              color: "#3DABC2",
            },
          ],
        },
      },
      {
        type: "gallery",
        id: "6b",
        value: {
          images: [
            {
              url: images.thistlegorm,
              alt: "Vista del pecio Thistlegorm",
            },
            {
              url: images.rassMohammed,
              alt: "Arrecifes del Mar Rojo",
            },
            {
              url: images.safetyGuide,
              alt: "Buceadores explorando",
            },
          ],
        },
      },
      {
        type: "rich_text",
        id: "7",
        value: {
          content: "<p>Durante tu inmersión podrás explorar:</p><ul><li>Las bodegas de carga con motocicletas BSA Norton 16H</li><li>Los camiones Bedford todavía sobre sus soportes</li><li>Las locomotoras en la cubierta trasera</li><li>La cabina del capitán con objetos personales</li><li>El cañón antiaéreo en la proa</li></ul>",
        },
      },
      {
        type: "quote",
        id: "8",
        value: {
          text: "Bucear en el Thistlegorm es como viajar en el tiempo. Es una experiencia que todo buceador debe vivir al menos una vez.",
          author: "Jacques Cousteau",
          role: "Descubridor del pecio en 1956",
        },
      },
      {
        type: "heading",
        id: "9",
        value: {
          level: 2,
          text: "Consejos para tu Inmersión",
        },
      },
      {
        type: "two_column",
        id: "10",
        value: {
          leftColumn: {
            image: images.thistlegorm,
            alt: "Interior del pecio Thistlegorm",
          },
          rightColumn: {
            title: "La bodega de carga está llena de artefactos militares perfectamente preservados:",
            content: "<ul><li>• Motocicletas BSA en perfecto estado</li><li>• Camiones Bedford y locomotoras</li><li>• Munición sin explotar (¡no tocar!)</li><li>• Rifles Lee-Enfield en sus cajas originales</li></ul>",
          },
        },
      },
      {
        type: "cta",
        id: "11",
        value: {
          title: "¿Listo para explorar el Thistlegorm?",
          description: "Únete a nuestra ruta Norte de 7 días que incluye inmersiones en este pecio legendario",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
      {
        type: "accordion",
        id: "12",
        value: {
          items: [
            {
              title: "¿Qué certificación necesitas?",
              content: "<p>La certificación mínima es Open Water Diver (de cualquier certificadora). Si no tienes el Advanced, puedes obtenerlo gratis a bordo con el Curso Avanzado SSI incluido en el viaje.</p>",
            },
            {
              title: "¿Cuál es la mejor época?",
              content: "<p>La ruta funciona bien gran parte del año, pero primavera y otoño suelen ofrecer la combinación más equilibrada de visibilidad, temperatura y mar.</p>",
            },
          ],
        },
      },
      {
        type: "newsletter",
        id: "13",
        value: {
          title: "Recibe nuevas guías del Mar Rojo",
          description: "Te avisamos cuando publiquemos rutas, consejos de seguridad y nuevas salidas con plazas abiertas.",
          buttonText: "Suscribirme",
        },
      },
    ],
  },
  {
    slug: "ras-mohammed-guia-completa",
    title: "Ras Mohammed: El Parque Nacional Submarino Más Espectacular",
    excerpt: "Explora uno de los mejores sitios de buceo del mundo con arrecifes de coral prístinos y vida marina abundante.",
    publishedAt: "2026-01-10",
    readTime: "6 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.rassMohammed,
      alt: "Ras Mohammed reef",
    },
    category: {
      name: "Arrecifes",
      color: "#3DABC2",
    },
    body: [],
  },
  {
    slug: "seguridad-buceo-mar-rojo",
    title: "Guía de Seguridad para Bucear en el Mar Rojo",
    excerpt: "Todo lo que necesitas saber sobre seguridad, corrientes y vida marina en el Mar Rojo.",
    publishedAt: "2026-01-05",
    readTime: "10 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.safetyGuide,
      alt: "Diving safety",
    },
    category: {
      name: "Seguridad",
      color: "#0066CC",
    },
    body: [],
  },
]

export const blogListingData: BlogListingData = {
  hero: {
    backgroundImage: images.heroBlogListing,
    title: "Blog de Buceo",
    subtitle: "Guías, consejos y experiencias del Mar Rojo",
  },
  featuredPost: blogPosts[0],
  posts: blogPosts,
}
