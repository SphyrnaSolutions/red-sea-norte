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
    title: "Hurghada vs Sharm el Sheikh para un Liveaboard: Que Cambia de Verdad",
    excerpt:
      "Vuelos desde Espana, que rutas salen de cada puerto, logistica de transfers y por que Hurghada es el punto de salida de nuestras 5 rutas.",
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
      { type: "rich_text", id: "hs-1", value: { content: "<p>Hurghada o Sharm el Sheikh? La respuesta corta: depende de la ruta. Nuestras 5 rutas salen de Hurghada.</p>" } },
      { type: "heading", id: "hs-2", value: { level: 2, text: "Dos puertos, dos logicas" } },
      { type: "rich_text", id: "hs-3", value: { content: "<p><strong>Hurghada:</strong> costa continental, puerto mas versatil. Acceso a rutas norte y sur. <strong>Sharm:</strong> punta del Sinai, limitada para rutas sur.</p><p>Nuestras 5 rutas: Norte y Tiran (1.190 EUR), Norte y Pecios (1.190 EUR), Tiran y Blue Hole (1.230 EUR), Norte y Brothers (1.230 EUR) y Sur BDE (1.290 EUR). Todas desde Hurghada.</p>" } },
      { type: "heading", id: "hs-4", value: { level: 2, text: "Vuelos desde Espana" } },
      { type: "rich_text", id: "hs-5", value: { content: "<p><strong>A Hurghada (HRG):</strong> vuelos directos desde Madrid y Barcelona con Pegasus (4-5 h). Conexiones via Estambul, El Cairo o Frankfurt. Desde 120-200 EUR ida y vuelta.</p><p><strong>A Sharm (SSH):</strong> menos vuelos directos, mas escalas. Volar a Hurghada es mas directo, barato y frecuente.</p>" } },
      { type: "heading", id: "hs-6", value: { level: 2, text: "Por que Hurghada" } },
      { type: "rich_text", id: "hs-7", value: { content: "<ol><li>Acceso a las 5 rutas desde un mismo punto</li><li>Vuelos mas directos y baratos desde Espana</li><li>Transfer incluido aeropuerto-barco (15-20 min)</li></ol>" } },
      { type: "rich_text", id: "hs-8", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/como-llegar-a-hurghada-liveaboard">Como llegar a Hurghada</a> | <a href="/blog/temporada-ruta-norte-mar-rojo">Mejor temporada</a></p>' } },
      { type: "cta", id: "hs-9", value: { title: "5 rutas desde Hurghada", description: "Transfer aeropuerto-barco incluido.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
  },
  {
    slug: "abu-nuhas-cementerio-de-barcos",
    title: "Abu Nuhas: el cementerio de barcos del Mar Rojo que tienes que bucear",
    excerpt:
      "Cuatro pecios historicos en un solo arrecife: Giannis D, Carnatic, Chrisoula K y Kimon M. Todo lo que necesitas saber para bucear en Abu Nuhas.",
    publishedAt: "2026-03-04",
    readTime: "10 min",
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
        type: "heading",
        id: "abu-1",
        value: { level: 2, text: "Un arrecife, cuatro naufragios" },
      },
      {
        type: "rich_text",
        id: "abu-2",
        value: {
          content:
            '<p>Abu Nuhas es un arrecife triangular semi-sumergido en el Estrecho de Gubal, al norte del Mar Rojo. Su posicion en una de las rutas de navegacion mas transitadas hacia el Canal de Suez lo convirtio, durante mas de un siglo, en una trampa para los barcos que pasaban demasiado cerca. El resultado: cuatro pecios accesibles a profundidades recreativas, concentrados en un mismo punto.</p><p>Lo llaman el cementerio de barcos del Mar Rojo y no es exagerado. En una sola jornada de inmersiones puedes explorar restos que van desde 1869 hasta 1983. Abu Nuhas forma parte de la <a href="/rutas/norte-pecios">Ruta Norte y Pecios</a> y de la <a href="/rutas/norte-tiran">Ruta Norte y Tiran</a>, donde se le dedica un dia completo de inmersiones.</p>',
        },
      },
      {
        type: "heading",
        id: "abu-3",
        value: { level: 2, text: "Giannis D: el carguero griego que se partio en tres" },
      },
      {
        type: "rich_text",
        id: "abu-4",
        value: {
          content:
            "<p>El Giannis D es probablemente el pecio mas popular de Abu Nuhas. Este carguero de 99,5 metros fue construido en Japon en 1969 y navegaba bajo bandera griega cuando choco contra el arrecife el 19 de abril de 1983. Transportaba madera desde Croacia hacia Arabia Saudi.</p><p>El impacto partio el barco en tres secciones. Hoy descansa entre 5 y 27 metros de profundidad, con una inclinacion dramatica hacia babor. La sala de maquinas es uno de los puntos mas visitados: se puede penetrar con relativa facilidad.</p><p><strong>Profundidad:</strong> 5-27 m | <strong>Eslora:</strong> 99,5 m | <strong>Hundimiento:</strong> 1983<br><strong>Nivel:</strong> accesible desde Advanced Open Water. Zonas poco profundas aptas para Open Water con guia.</p>",
        },
      },
      {
        type: "heading",
        id: "abu-5",
        value: { level: 2, text: "Carnatic: el mas antiguo y el mas bello" },
      },
      {
        type: "rich_text",
        id: "abu-6",
        value: {
          content:
            "<p>El SS Carnatic es el pecio con mas historia de Abu Nuhas. Este clipper de vapor y vela de 90 metros zarpo de Suez rumbo a India el 12 de septiembre de 1869, cargado con algodon, planchas de cobre y 40.000 libras esterlinas en oro. Choco contra el arrecife y, tras 34 horas varado, se partio en dos.</p><p>Lo que queda es un esqueleto metalico espectacular, colonizado por mas de 150 anos de crecimiento coralino. La luz que se filtra a traves de la estructura crea un efecto visual unico.</p><p><strong>Profundidad:</strong> 16-27 m | <strong>Eslora:</strong> 90 m | <strong>Hundimiento:</strong> 1869<br><strong>Nivel:</strong> Advanced Open Water recomendado. Ideal para fotografia submarina.</p>",
        },
      },
      {
        type: "heading",
        id: "abu-7",
        value: { level: 2, text: "Chrisoula K: el pecio de los azulejos" },
      },
      {
        type: "rich_text",
        id: "abu-8",
        value: {
          content:
            "<p>El Chrisoula K era un carguero griego de 98 metros que se hundio en 1981 transportando 3.700 toneladas de azulejos italianos. Los azulejos siguen ahi, apilados dentro de las bodegas. El barco descansa con la popa a 26 metros y la proa a solo 3 metros, lo que lo convierte en un pecio muy versatil.</p><p><strong>Profundidad:</strong> 3-26 m | <strong>Eslora:</strong> 98 m | <strong>Hundimiento:</strong> 1981<br><strong>Nivel:</strong> zonas poco profundas aptas desde Open Water. Penetracion para Advanced.</p>",
        },
      },
      {
        type: "heading",
        id: "abu-9",
        value: { level: 2, text: "Kimon M: el pecio de las lentejas" },
      },
      {
        type: "rich_text",
        id: "abu-10",
        value: {
          content:
            "<p>El menos visitado de los cuatro. El Kimon M era un carguero aleman de 106 metros que choco contra Abu Nuhas en 1978. Transportaba 4.500 toneladas de lentejas. Descansa sobre su costado de estribor, con la popa a 32 metros y la proa a solo 4 metros.</p><p><strong>Profundidad:</strong> 4-32 m | <strong>Eslora:</strong> 106 m | <strong>Hundimiento:</strong> 1978<br><strong>Nivel:</strong> Advanced Open Water para la zona profunda. La proa es accesible para todos.</p>",
        },
      },
      {
        type: "heading",
        id: "abu-11",
        value: { level: 2, text: "Dunraven: el pecio invertido cerca de Ras Mohammed" },
      },
      {
        type: "rich_text",
        id: "abu-12",
        value: {
          content:
            "<p>Aunque no esta en Abu Nuhas sino cerca de Ras Mohammed, el Dunraven se visita en la misma ruta. Este buque britanico de 1873 se hundio boca abajo en 1876. La quilla apunta hacia arriba y el casco forma un tunel natural que los buceadores pueden recorrer.</p><p><strong>Profundidad:</strong> 15-29 m | <strong>Hundimiento:</strong> 1876<br><strong>Nivel:</strong> Advanced Open Water recomendado para penetracion.</p>",
        },
      },
      {
        type: "heading",
        id: "abu-13",
        value: { level: 2, text: "Como bucear Abu Nuhas" },
      },
      {
        type: "rich_text",
        id: "abu-14",
        value: {
          content:
            '<p>Abu Nuhas no tiene acceso desde tierra: solo se llega en barco. En la <a href="/rutas/norte-pecios">Ruta Norte y Pecios</a> se le dedica un dia completo con 3-4 inmersiones. La certificacion minima es Open Water, aunque para penetraciones conviene tener el Advanced. Si no lo tienes, puedes sacarlo gratis a bordo del M/Y Dolce Vita. La ruta sale desde Hurghada, dura 8 dias, incluye 16-18 inmersiones, nitrox y pension completa, desde 1.190 EUR.</p>',
        },
      },
      {
        type: "rich_text",
        id: "abu-15",
        value: {
          content:
            '<p><strong>Te puede interesar:</strong> <a href="/blog/rosalie-moller-mar-rojo">Rosalie Moller</a> | <a href="/blog/ss-thistlegorm-guia-completa">SS Thistlegorm</a> | <a href="/rutas/norte-pecios">Ruta Norte y Pecios</a></p>',
        },
      },
      {
        type: "cta",
        id: "abu-16",
        value: {
          title: "Bucea los pecios de Abu Nuhas en la Ruta Norte",
          description:
            "Un dia completo explorando cuatro naufragios historicos. Desde 1.190 EUR.",
          primaryCTA: {
            text: "Ver Ruta Norte y Pecios",
            href: "/rutas/norte-pecios",
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
            '<p>Este contenido se ha integrado en nuestra <a href="/blog/abu-nuhas-cementerio-de-barcos">guia completa de Abu Nuhas</a>, donde encontraras toda la informacion sobre el Giannis D, el Carnatic, el Chrisoula K y el Kimon M en un solo articulo.</p>',
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
            '<p>Este contenido se ha integrado en nuestra <a href="/blog/abu-nuhas-cementerio-de-barcos">guia completa de Abu Nuhas</a>, donde encontraras toda la informacion sobre el Dunraven y los pecios del norte del Mar Rojo en un solo articulo.</p>',
        },
      },
    ],
  },
  {
    slug: "advanced-a-bordo-mar-rojo",
    title: "Curso Advanced SSI a bordo en el Mar Rojo: que incluye y por que te interesa",
    excerpt:
      "Todo lo que necesitas saber sobre el curso Advanced Open Water SSI incluido gratis en tu vida a bordo: especialidades, inmersiones y como te cambia la semana.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
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
      { type: "rich_text", id: "advb-1", value: { content: "<p>El Advanced Open Water es el salto mas importante como buceador. Pasas de 18 a 30 metros, lo que en el Mar Rojo significa explorar el Thistlegorm completo, meterte en las bodegas del Giannis D o bajar al Rosalie Moller. En todas las rutas con Karlos Simon, el Advanced SSI viene incluido gratis.</p>" } },
      { type: "heading", id: "advb-2", value: { level: 2, text: "Que incluye el curso" } },
      { type: "rich_text", id: "advb-3", value: { content: "<p>4 especialidades con briefing teorico e inmersion practica:</p><ul><li><strong>Deep Diving:</strong> inmersiones hasta 30 m con seguridad</li><li><strong>Navegacion Subacuatica:</strong> orientacion con brujula y referencias naturales</li><li><strong>Perfect Buoyancy:</strong> control fino de flotabilidad</li><li><strong>Night Diving:</strong> inmersion nocturna con linterna</li></ul>" } },
      { type: "heading", id: "advb-4", value: { level: 2, text: "Como funciona a bordo" } },
      { type: "rich_text", id: "advb-5", value: { content: "<p>No pierdes inmersiones. Las especialidades se integran en el itinerario: tu inmersion de Deep Diving puede ser la bajada al Thistlegorm. El instructor evalua durante la inmersion que ibas a hacer igualmente. Para el final de la semana tienes la certificacion completada.</p>" } },
      { type: "heading", id: "advb-6", value: { level: 2, text: "Da igual tu certificadora" } },
      { type: "rich_text", id: "advb-7", value: { content: "<p>Se certifica con SSI, pero si eres PADI, ACUC, FEDAS o cualquier otra, puedes hacerlo sin problema. Las certificadoras se reconocen entre si. Tu titulo de Advanced es valido en todo el mundo.</p>" } },
      { type: "heading", id: "advb-8", value: { level: 2, text: "De 18 a 30 metros: que cambia" } },
      { type: "rich_text", id: "advb-9", value: { content: "<p>Con Open Water (18 m) te pierdes las bodegas del Thistlegorm (20-30 m), el Rosalie Moller (empieza a 30 m) y las paredes mas espectaculares de Ras Mohammed. Con el Advanced, disfrutas de verdad.</p>" } },
      { type: "rich_text", id: "advb-10", value: { content: "<p>Incluido gratis en todas las rutas. Desde 1.190 EUR con ruta, alojamiento, pension completa y formacion. Sin costes ocultos.</p>" } },
      { type: "rich_text", id: "advb-11", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/nitrox-a-bordo-mar-rojo">Nitrox en el Mar Rojo</a> | <a href="/blog/requisitos-ruta-norte-mar-rojo">Requisitos Ruta Norte</a> | <a href="/rutas/norte-pecios">Ruta Norte y Pecios</a></p>' } },
      { type: "cta", id: "advb-12", value: { title: "Da el salto a Advanced mientras buceas el Mar Rojo", description: "Curso incluido gratis. Desde 1.190 EUR con pension completa y nitrox.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
  },
  {
    slug: "visado-egipto-hurghada",
    title: "Visado para Egipto desde Espana: como tramitarlo antes de tu vida a bordo en Hurghada",
    excerpt:
      "Guia practica del e-visa egipcio para ciudadanos espanoles y europeos: coste, proceso online, tiempos y como encaja con la logistica del liveaboard.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
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
      { type: "rich_text", id: "visa-1", value: { content: "<p>El visado para Egipto es uno de esos tramites que parecen mas complicados de lo que son. Si vas a hacer un vida a bordo desde Hurghada, esto es todo lo que necesitas saber.</p>" } },
      { type: "heading", id: "visa-2", value: { level: 2, text: "E-visa online (recomendada)" } },
      { type: "rich_text", id: "visa-3", value: { content: "<ul><li><strong>Web oficial:</strong> visa2egypt.gov.eg</li><li><strong>Coste:</strong> 25 USD (~23-25 EUR)</li><li><strong>Validez:</strong> 30 dias, entrada unica</li><li><strong>Procesamiento:</strong> 3-7 dias laborables</li><li><strong>Requisitos:</strong> pasaporte con 6 meses validez, foto digital del pasaporte, tarjeta de credito</li></ul><p>Alternativa: visa on arrival en el aeropuerto por 25 USD en efectivo, pero puede haber colas.</p>" } },
      { type: "heading", id: "visa-4", value: { level: 2, text: "Llegada al aeropuerto de Hurghada" } },
      { type: "rich_text", id: "visa-5", value: { content: "<p>El traslado aeropuerto-barco esta incluido. Un representante te espera a la salida. El proceso completo desde que aterrizas hasta que estas en el barco: 1-2 horas. Embarque a partir de las 16:00.</p>" } },
      { type: "heading", id: "visa-6", value: { level: 2, text: "Consejos practicos" } },
      { type: "rich_text", id: "visa-7", value: { content: "<ul><li>Tramita el e-visa al menos 10 dias antes</li><li>Lleva copia impresa y digital</li><li>Ten 25 USD/EUR en efectivo por si acaso</li><li>Revisa la caducidad del pasaporte (minimo 6 meses)</li></ul><p>La agencia te asesora con el tramite. Coste del visado (~30 EUR) no incluido en el precio del viaje.</p>" } },
      { type: "rich_text", id: "visa-8", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/como-llegar-a-hurghada-liveaboard">Como llegar a Hurghada</a> | <a href="/blog/checklist-vida-a-bordo-mar-rojo">Checklist</a></p>' } },
      { type: "cta", id: "visa-9", value: { title: "Con el visado resuelto, solo falta elegir ruta", description: "Ruta Norte y Pecios desde 1.190 EUR.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
  },
  {
    slug: "checklist-vida-a-bordo-mar-rojo",
    title: "Checklist para un vida a bordo en el Mar Rojo: que llevar y que no olvidar",
    excerpt:
      "Lista practica de todo lo que necesitas para tu semana de liveaboard en el Mar Rojo, organizada por categorias y con consejos de buceadores experimentados.",
    publishedAt: "2026-03-04",
    readTime: "9 min",
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
      { type: "rich_text", id: "chk-1", value: { content: "<p>Tienes la reserva confirmada (o casi) y ahora viene la pregunta inevitable: que llevo? Esta checklist esta pensada para una semana de vida a bordo en el Mar Rojo a bordo del M/Y Dolce Vita.</p>" } },
      { type: "heading", id: "chk-2", value: { level: 2, text: "Documentacion imprescindible" } },
      { type: "rich_text", id: "chk-3", value: { content: "<ul><li><strong>Pasaporte</strong> (minimo 6 meses validez)</li><li><strong>Visado electronico</strong> (e-visa, unos 30 EUR)</li><li><strong>Certificacion de buceo</strong> (tarjeta fisica o digital)</li><li><strong>Logbook</strong> (fisico o digital)</li><li><strong>Seguro de viaje</strong> (incluido)</li><li><strong>Seguro DAN</strong> (recomendable, ~60 EUR/ano)</li><li>Comprobante de reserva</li></ul>" } },
      { type: "heading", id: "chk-4", value: { level: 2, text: "Equipo de buceo" } },
      { type: "rich_text", id: "chk-5", value: { content: "<p><strong>Incluido:</strong> botella 12L, plomos, nitrox 28%.</p><p><strong>Alquilar:</strong> regulador, BCD, traje, ordenador, aletas, mascara.</p><p><strong>Llevar propio:</strong> mascara, ordenador de buceo, boya SMB y carrete, linterna de buceo, protector antivaho.</p><p><strong>NO llevar:</strong> botellas, plomos, traje seco (agua a 24-29 grados).</p>" } },
      { type: "heading", id: "chk-6", value: { level: 2, text: "Ropa, salud y electronica" } },
      { type: "rich_text", id: "chk-7", value: { content: "<p><strong>Ropa:</strong> 3-4 banadores, rashguard, ropa ligera, sudadera fina, chanclas, gorra, gafas de sol.</p><p><strong>Salud:</strong> protector solar reef-safe SPF 50, medicacion personal, pastillas mareo, ibuprofeno, gotas oidos.</p><p><strong>Electronica:</strong> camara submarina/GoPro, powerbank, adaptador enchufe (tipo C/F), bolsa estanca, linterna frontal.</p>" } },
      { type: "heading", id: "chk-8", value: { level: 2, text: "Dinero en efectivo (euros)" } },
      { type: "rich_text", id: "chk-9", value: { content: "<ul><li>Tasas: 120-220 EUR</li><li>Propina tripulacion: 75 EUR</li><li>Propina guias: 25 EUR</li><li>Botella 15L (opcional): 40 EUR</li><li>Alquiler equipo y bebidas extra</li></ul>" } },
      { type: "rich_text", id: "chk-10", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/como-es-un-vida-a-bordo-mar-rojo">Como es un vida a bordo</a> | <a href="/blog/visado-egipto-hurghada">Visado para Egipto</a> | <a href="/blog/seguro-buceo-dan-egipto">Seguro DAN</a></p>' } },
      { type: "cta", id: "chk-11", value: { title: "Con la maleta lista, solo falta elegir ruta", description: "Desde 1.190 EUR, pension completa, 16-18 inmersiones y Advanced SSI incluido.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
  },
  {
    slug: "pecios-vs-tiburones-mar-rojo",
    title: "Pecios vs Tiburones en el Mar Rojo: Que Ruta Encaja Mejor Contigo",
    excerpt:
      "Ruta Norte y Pecios o Ruta Sur BDE? Comparamos precios, inmersiones, fauna y dificultad para que elijas la experiencia que realmente buscas.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
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
      { type: "rich_text", id: "pvt-1", value: { content: "<p>La gran duda de quien quiere un vida a bordo en el Mar Rojo: pecios historicos o tiburones oceanicos? Las dos experiencias son brutales pero muy diferentes.</p>" } },
      { type: "heading", id: "pvt-2", value: { level: 2, text: "Ruta Norte y Pecios (desde 1.190 EUR)" } },
      { type: "rich_text", id: "pvt-3", value: { content: "<p>Viaje en el tiempo: SS Thistlegorm (motos, camiones, locomotoras, 14-30 m), Giannis D (Abu Nuhas, 10-27 m), Carnatic (1869, cubierto de coral), Rosalie Moller (WWII, 30-50 m). Mas un dia en Ras Mohammed. Corrientes suaves a moderadas, 10-30 m.</p><p><strong>Perfil ideal:</strong> historia maritima, fotografia de pecios, primer o segundo liveaboard.</p>" } },
      { type: "heading", id: "pvt-4", value: { level: 2, text: "Ruta Sur BDE (desde 1.290 EUR)" } },
      { type: "rich_text", id: "pvt-5", value: { content: "<p>Brothers Islands (tiburones longimanus, grises, martillos), Daedalus Reef (bancos de martillos, delfines), Elphinstone Reef (longimanus, gorgonias). Corrientes moderadas a fuertes, 15-40+ m.</p><p><strong>Perfil ideal:</strong> fauna grande, corrientes fuertes, experiencia en mar abierto.</p>" } },
      { type: "heading", id: "pvt-6", value: { level: 2, text: "Y si quieres las dos cosas?" } },
      { type: "rich_text", id: "pvt-7", value: { content: "<p><strong>Ruta Norte y Brothers</strong> (desde 1.230 EUR): pecios del norte + 2 dias en Brothers. Ambas incluyen pension completa, Advanced SSI gratis, nitrox 28%, 16-18 inmersiones, Tour Leader y seguro.</p>" } },
      { type: "rich_text", id: "pvt-8", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/abu-nuhas-cementerio-de-barcos">Abu Nuhas</a> | <a href="/blog/ras-mohammed-guia-completa">Ras Mohammed</a> | <a href="/rutas/norte-pecios">Norte y Pecios</a> | <a href="/rutas/sur-bde">Sur BDE</a></p>' } },
      { type: "cta", id: "pvt-9", value: { title: "Elige tu experiencia en el Mar Rojo", description: "Pecios desde 1.190 EUR o tiburones desde 1.290 EUR.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
  },
  {
    slug: "como-es-un-vida-a-bordo-mar-rojo",
    title: "Como es un vida a bordo en el Mar Rojo: tu semana a bordo del M/Y Dolce Vita",
    excerpt:
      "Asi es una semana real en un liveaboard en el Mar Rojo: desde el primer briefing hasta la ultima inmersion nocturna, pasando por camarotes, comidas y convivencia a bordo del M/Y Dolce Vita.",
    publishedAt: "2026-03-04",
    readTime: "10 min",
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
      { type: "rich_text", id: "vab-1", value: { content: "<p>Si estas pensando en hacer un vida a bordo en el Mar Rojo pero no terminas de visualizar como es realmente la experiencia, este articulo es para ti. Vamos a recorrer una semana tipica a bordo del M/Y Dolce Vita, el barco de 40 metros en el que navegamos nuestras rutas. Sin romantizar, sin omitir nada.</p>" } },
      { type: "heading", id: "vab-2", value: { level: 2, text: "El barco: M/Y Dolce Vita" } },
      { type: "rich_text", id: "vab-3", value: { content: "<p>Yate de 40 metros de eslora y 8,5 metros de manga, operado por Divers Fleet. 4 cubiertas, 12 camarotes y capacidad para 24 buceadores. Cada camarote tiene aire acondicionado individual, bano privado y espacio para equipo personal. Zonas comunes: comedor interior, salon con bar, cubierta superior con relax al aire libre y solarium.</p>" } },
      { type: "heading", id: "vab-4", value: { level: 2, text: "Un dia tipico a bordo" } },
      { type: "rich_text", id: "vab-5", value: { content: "<p><strong>6:30-7:00</strong> Despierta y desayuno ligero. <strong>7:30</strong> Briefing de primera inmersion (si haces el Advanced SSI, aqui se integra). <strong>8:00</strong> Primera inmersion. <strong>9:00-9:30</strong> Desayuno completo. <strong>10:30-11:00</strong> Segunda inmersion. <strong>12:00-13:00</strong> Almuerzo (pension completa). <strong>14:00-14:30</strong> Tercera inmersion. <strong>16:00-17:00</strong> Tiempo libre en cubierta. <strong>17:30-18:00</strong> Cuarta inmersion o nocturna. <strong>19:30-20:00</strong> Cena. <strong>21:00+</strong> Tertulia bajo las estrellas.</p><p>16-18 inmersiones en la semana. 3-4 diarias, ritmo intenso pero manejable. Si un dia prefieres saltarte una, es completamente normal.</p>" } },
      { type: "heading", id: "vab-6", value: { level: 2, text: "Los camarotes" } },
      { type: "rich_text", id: "vab-7", value: { content: "<p>Camarotes dobles con camas individuales o doble, bano privado, aire acondicionado regulable. No esperes una suite de hotel: es tu espacio para dormir, ducharte y guardar cosas. Consejo: lleva tapones para los oidos.</p>" } },
      { type: "heading", id: "vab-8", value: { level: 2, text: "La comida: pension completa real" } },
      { type: "rich_text", id: "vab-9", value: { content: "<p>Desayuno, almuerzo, cena, snacks, agua, refrescos, te, cafe y 2 cervezas por persona y dia incluidos. Cocina egipcia e internacional. Si tienes alergias o restricciones, comunicalas con antelacion.</p>" } },
      { type: "heading", id: "vab-10", value: { level: 2, text: "Wifi y conectividad" } },
      { type: "rich_text", id: "vab-11", value: { content: "<p>No cuentes con wifi fiable. La cobertura es limitada o nula en alta mar. La mayoria de buceadores lo consideran una ventaja: una semana desconectado es parte de la experiencia.</p>" } },
      { type: "heading", id: "vab-12", value: { level: 2, text: "Liveaboard vs bucear desde hotel" } },
      { type: "rich_text", id: "vab-13", value: { content: "<ul><li><strong>Buceas mas:</strong> 16-18 inmersiones en vez de 8-10 desde tierra.</li><li><strong>Buceas mejor:</strong> llegas a los spots antes que los barcos de dia.</li><li><strong>Sitios remotos:</strong> Thistlegorm, Ras Mohammed, solo accesibles en liveaboard.</li><li><strong>Nocturnas:</strong> desde un hotel no suelen ofrecerse. A bordo, son rutina.</li></ul>" } },
      { type: "rich_text", id: "vab-14", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/checklist-vida-a-bordo-mar-rojo">Checklist</a> | <a href="/blog/advanced-a-bordo-mar-rojo">Advanced SSI a bordo</a> | <a href="/blog/nitrox-a-bordo-mar-rojo">Nitrox</a></p>' } },
      { type: "cta", id: "vab-15", value: { title: "Quieres ver la ruta concreta?", description: "Consulta la Ruta Norte y Pecios y elige tu semana.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
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
            '<p>Este contenido se ha integrado en nuestra <a href="/blog/como-es-un-vida-a-bordo-mar-rojo">guia completa sobre como es un vida a bordo en el Mar Rojo</a>, donde encontraras toda la informacion sobre camarotes, comida, wifi y convivencia a bordo del M/Y Dolce Vita.</p>',
        },
      },
    ],
  },
  {
    slug: "nitrox-a-bordo-mar-rojo",
    title: "Nitrox en el Mar Rojo: que es el EANx 28% y por que esta incluido en tu vida a bordo",
    excerpt:
      "Que es el Nitrox, como funciona el EANx 28%, que ventajas reales tiene para 16-18 inmersiones en una semana y por que lo llevas incluido gratis.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
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
      { type: "rich_text", id: "nit-1", value: { content: "<p>El aire normal tiene 21% oxigeno. El Nitrox (EANx) tiene mas oxigeno y menos nitrogeno. En nuestras rutas, las botellas llevan EANx 28%. Esa diferencia cambia bastante la experiencia cuando haces 16-18 inmersiones en una semana.</p>" } },
      { type: "heading", id: "nit-2", value: { level: 2, text: "Ventajas reales del EANx 28%" } },
      { type: "rich_text", id: "nit-3", value: { content: "<ul><li><strong>Tiempos de no-deco mas largos:</strong> mas minutos explorando el Thistlegorm o el Carnatic sin prisa.</li><li><strong>Intervalos de superficie mas cortos:</strong> vuelves al agua antes, critico con 3-4 inmersiones al dia.</li><li><strong>Menos fatiga acumulada:</strong> despues de 4-5 dias de buceo intensivo, la diferencia se nota.</li><li><strong>Mas margen de seguridad:</strong> colchon extra en inmersiones repetitivas.</li></ul>" } },
      { type: "heading", id: "nit-4", value: { level: 2, text: "Profundidad maxima operativa (MOD)" } },
      { type: "rich_text", id: "nit-5", value: { content: "<p>Para EANx 28%: <strong>MOD = 40 metros</strong>. Como el buceo recreativo con Advanced tiene limite de 30 metros, el EANx 28% da margen mas que suficiente para cualquier inmersion del itinerario.</p>" } },
      { type: "heading", id: "nit-6", value: { level: 2, text: "Como funciona a bordo" } },
      { type: "rich_text", id: "nit-7", value: { content: "<p>El M/Y Dolce Vita lleva sistema de carga de Nitrox. Todas las botellas de 12L se cargan con EANx 28% de serie. No pagas suplemento. La especialidad SSI Enriched Air Nitrox tambien esta incluida gratis. La mayoria la completan en la primera o segunda inmersion.</p>" } },
      { type: "rich_text", id: "nit-8", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/advanced-a-bordo-mar-rojo">Advanced SSI a bordo</a> | <a href="/blog/como-es-un-vida-a-bordo-mar-rojo">Como es un vida a bordo</a></p>' } },
      { type: "cta", id: "nit-9", value: { title: "Nitrox incluido en todas las rutas", description: "Desde 1.190 EUR con pension completa, formacion SSI y EANx 28% de serie.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
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
            '<p>Este contenido se ha integrado en nuestra <a href="/blog/abu-nuhas-cementerio-de-barcos">guia completa de Abu Nuhas</a>, donde encontraras toda la informacion sobre el Carnatic, el Giannis D, el Chrisoula K y el Kimon M en un solo articulo.</p>',
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
            '<p>Este contenido se ha integrado en nuestra <a href="/blog/ras-mohammed-guia-completa">guia completa de Ras Mohammed</a>, donde encontraras toda la informacion sobre Shark Reef, Yolanda Reef y Anemone City en un solo articulo.</p>',
        },
      },
    ],
  },
  {
    slug: "rosalie-moller-mar-rojo",
    title: "Rosalie Moller: la inmersion profunda que completa la Ruta Norte del Mar Rojo",
    excerpt:
      "Un pecio de la Segunda Guerra Mundial a 50 metros de profundidad, hundido la misma semana que el Thistlegorm. Historia, datos y lo que necesitas para bucearlo.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
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
        type: "heading",
        id: "ros-1",
        value: { level: 2, text: "La hermana olvidada del Thistlegorm" },
      },
      {
        type: "rich_text",
        id: "ros-2",
        value: {
          content:
            '<p>Si el SS Thistlegorm es el pecio mas famoso del Mar Rojo, el Rosalie Moller es su version menos conocida pero igual de fascinante. Ambos fueron hundidos por bombarderos alemanes en octubre de 1941, con solo 48 horas de diferencia. Pero mientras el Thistlegorm fue redescubierto por Cousteau en los 50, el Rosalie Moller no fue encontrado hasta 1998.</p><p>Esa diferencia en fama tiene una ventaja: es un pecio mucho menos frecuentado, en mejor estado de conservacion y con una atmosfera submarina sobrecogedora.</p>',
        },
      },
      {
        type: "heading",
        id: "ros-3",
        value: { level: 2, text: "Historia del naufragio" },
      },
      {
        type: "rich_text",
        id: "ros-4",
        value: {
          content:
            "<p>Construido en 1910 en Glasgow, con 108 metros de eslora. Originalmente llamado Francis, fue rebautizado como Rosalie Moller en 1931. Requisado por la Royal Navy en la WWII para transportar carbon gales. La noche del 8 de octubre de 1941, una bomba de un Heinkel He 111 impacto de lleno y el barco se hundio en menos de una hora.</p>",
        },
      },
      {
        type: "heading",
        id: "ros-5",
        value: { level: 2, text: "El pecio hoy: que vas a ver" },
      },
      {
        type: "rich_text",
        id: "ros-6",
        value: {
          content:
            "<p>Descansa en posicion vertical, practicamente intacto. Cubierta a 30 metros, quilla a 50 metros. Mastiles cubiertos de corales blandos hasta los 18-20 metros. Bodegas llenas de carbon, ollas y sartenes en la cocina, ojos de buey con cristal intacto. Vida marina espectacular: peces murcielago, barracudas, peces cristal y tiburones de arrecife.</p>",
        },
      },
      {
        type: "heading",
        id: "ros-7",
        value: { level: 2, text: "Requisitos y nivel" },
      },
      {
        type: "rich_text",
        id: "ros-8",
        value: {
          content:
            "<p>Inmersion seria. Se recomienda:</p><ul><li><strong>Certificacion:</strong> Advanced Open Water (imprescindible)</li><li><strong>Experiencia:</strong> al menos 50 inmersiones registradas</li><li><strong>Gas:</strong> nitrox altamente recomendado</li><li><strong>Profundidad habitual:</strong> 40-45 m</li></ul>",
        },
      },
      {
        type: "heading",
        id: "ros-9",
        value: { level: 2, text: "Como llegar al Rosalie Moller" },
      },
      {
        type: "rich_text",
        id: "ros-10",
        value: {
          content:
            '<p>Solo se llega en vida a bordo. En la <a href="/rutas/norte-pecios">Ruta Norte y Pecios</a> se visita normalmente en el dia 6. La ruta sale desde Hurghada, incluye 16-18 inmersiones, nitrox, pension completa y formacion SSI gratuita, desde 1.190 EUR.</p>',
        },
      },
      {
        type: "rich_text",
        id: "ros-11",
        value: {
          content:
            '<p><strong>Te puede interesar:</strong> <a href="/blog/abu-nuhas-cementerio-de-barcos">Abu Nuhas</a> | <a href="/blog/ss-thistlegorm-guia-completa">SS Thistlegorm</a> | <a href="/rutas/norte-pecios">Ruta Norte y Pecios</a></p>',
        },
      },
      {
        type: "cta",
        id: "ros-12",
        value: {
          title: "Bucea el Rosalie Moller en la Ruta Norte",
          description: "Desde 1.190 EUR, con pension completa, nitrox y formacion SSI incluida.",
          primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" },
        },
      },
    ],
  },
  {
    slug: "temporada-ruta-norte-mar-rojo",
    title: "Mejor Temporada para Bucear en el Mar Rojo: Guia Mes a Mes para tu Vida a Bordo",
    excerpt:
      "Temperatura del agua, visibilidad, vientos y que fauna esperar en cada epoca. Todo lo que necesitas para elegir las mejores fechas.",
    publishedAt: "2026-03-04",
    readTime: "9 min",
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
      { type: "rich_text", id: "tmp-1", value: { content: "<p>El Mar Rojo se puede bucear todo el ano. No hay temporada mala, pero si temporadas diferentes. Saber que esperar te ayuda a elegir las mejores fechas.</p>" } },
      { type: "heading", id: "tmp-2", value: { level: 2, text: "Temperatura del agua" } },
      { type: "rich_text", id: "tmp-3", value: { content: "<ul><li><strong>Ene-Feb:</strong> 21-23 C (semiseco o 7 mm)</li><li><strong>Mar-Abr:</strong> 22-25 C (5 mm)</li><li><strong>May-Jun:</strong> 25-28 C (3-5 mm)</li><li><strong>Jul-Ago:</strong> 28-30 C (3 mm)</li><li><strong>Sep-Oct:</strong> 26-28 C (3-5 mm)</li><li><strong>Nov-Dic:</strong> 23-26 C (5 mm)</li></ul>" } },
      { type: "heading", id: "tmp-4", value: { level: 2, text: "Fauna por epoca" } },
      { type: "rich_text", id: "tmp-5", value: { content: "<p><strong>Invierno (dic-feb):</strong> mejor visibilidad, longimanus en Brothers. Ideal para pecios.</p><p><strong>Primavera (mar-may):</strong> visibilidad maxima, martillos desde mayo.</p><p><strong>Verano (jun-sep):</strong> agua calida, pico pelagico, tiburon zorro en Brothers.</p><p><strong>Otono (oct-nov):</strong> posiblemente la mejor epoca general. Equilibrio perfecto de temperatura, fauna y tranquilidad.</p>" } },
      { type: "heading", id: "tmp-6", value: { level: 2, text: "Resumen rapido" } },
      { type: "rich_text", id: "tmp-7", value: { content: "<ul><li>Pecios + visibilidad: oct-feb (Norte y Pecios, 1.190 EUR)</li><li>Martillos: may-jul (Sur BDE, 1.290 EUR)</li><li>Agua calida: jun-sep (cualquier ruta)</li><li>Menos turismo: oct-nov</li></ul>" } },
      { type: "rich_text", id: "tmp-8", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/pecios-vs-tiburones-mar-rojo">Pecios vs tiburones</a> | <a href="/blog/hurghada-vs-sharm-liveaboard">Hurghada vs Sharm</a></p>' } },
      { type: "cta", id: "tmp-9", value: { title: "Elige tu fecha, nosotros ponemos la ruta", description: "Salidas todo el ano desde Hurghada. Pension completa, nitrox y formacion incluidos.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
  },
  {
    slug: "seguro-buceo-dan-egipto",
    title: "Seguro de buceo DAN para el Mar Rojo: que cubre, cuanto cuesta y por que merece la pena",
    excerpt:
      "Tu vida a bordo incluye seguro de viaje, pero el seguro DAN cubre lo que los seguros generales no cubren: camara hiperbarica, evacuacion y accidentes de buceo.",
    publishedAt: "2026-03-04",
    readTime: "8 min",
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
      { type: "rich_text", id: "seg-1", value: { content: "<p>Todas las rutas incluyen seguro de viaje. Pero si vas a hacer 16-18 inmersiones en una semana con profundidades de hasta 30 metros, hay un tipo de cobertura que los seguros generales no incluyen: el tratamiento especifico de accidentes de buceo. Ahi entra el seguro DAN.</p>" } },
      { type: "heading", id: "seg-2", value: { level: 2, text: "Que cubre DAN que tu seguro de viaje no cubre" } },
      { type: "rich_text", id: "seg-3", value: { content: "<ul><li><strong>Camara hiperbarica:</strong> sesiones de 330-1.000 EUR/hora. DAN lo cubre (hasta 50.000 EUR en plan Bronze).</li><li><strong>Evacuacion medica:</strong> embarcacion rapida, ambulancia, ambulancia aerea desde mitad del Mar Rojo.</li><li><strong>Tratamiento especializado:</strong> barotraumas, toxicidad por oxigeno, lesiones de oido.</li></ul>" } },
      { type: "heading", id: "seg-4", value: { level: 2, text: "Cuanto cuesta" } },
      { type: "rich_text", id: "seg-5", value: { content: "<p><strong>Plan Bronze: ~60 EUR/ano.</strong> Mas que suficiente para buceo recreativo. Por ponerlo en perspectiva: menos de lo que cuesta una cena en el aeropuerto.</p>" } },
      { type: "heading", id: "seg-6", value: { level: 2, text: "Como contratar" } },
      { type: "rich_text", id: "seg-7", value: { content: "<p>Entra en daneurope.org, crea cuenta, elige plan Bronze, paga online. 5 minutos. Hazlo al menos unos dias antes del viaje.</p><p><strong>La combinacion correcta:</strong> seguro de viaje (incluido) + DAN. Son complementarios.</p>" } },
      { type: "rich_text", id: "seg-8", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/seguridad-buceo-mar-rojo">Seguridad en el buceo</a> | <a href="/blog/checklist-vida-a-bordo-mar-rojo">Checklist</a></p>' } },
      { type: "cta", id: "seg-9", value: { title: "Con el seguro cubierto, toca elegir ruta", description: "Desde 1.190 EUR con seguro de viaje incluido.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
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
    title: "Ras Mohammed: Guia Completa del Mejor Parque Nacional Submarino del Mar Rojo",
    excerpt: "Shark Reef, Yolanda Reef, Anemone City... Descubre por que Ras Mohammed es parada obligatoria en cualquier vida a bordo por el norte del Mar Rojo.",
    publishedAt: "2026-01-10",
    readTime: "10 min",
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
    body: [
      { type: "rich_text", id: "rasm-1", value: { content: "<p>Si hay un lugar que resume todo lo que hace grande al buceo en el Mar Rojo, es Ras Mohammed. Situado en el extremo sur del Sinai, este parque nacional protegido es el punto donde el Golfo de Suez se encuentra con el Golfo de Aqaba. Corrientes ricas en nutrientes, paredes verticales y una concentracion de vida marina que quita el aliento.</p>" } },
      { type: "heading", id: "rasm-2", value: { level: 2, text: "Shark Reef y Yolanda Reef: la inmersion estrella" } },
      { type: "rich_text", id: "rasm-3", value: { content: "<p><strong>Shark Reef:</strong> pared vertical que cae a mas de 700 metros. Corales blandos y duros, tiburones grises, barracudas, jureles, atunes y delfines.</p><p><strong>Yolanda Reef:</strong> meseta a 14-20 metros con los restos del carguero Jolanda (1980). Baneras, inodoros, tuberias e incluso un BMW sumergido, todo colonizado por coral. Surrealista e inolvidable.</p><p>Se hace como <strong>drift dive</strong>. Visibilidad 30-40+ metros. Corrientes impredecibles.</p><p><strong>Profundidad:</strong> 5-40+ m | <strong>Nivel:</strong> intermedio-avanzado</p>" } },
      { type: "heading", id: "rasm-4", value: { level: 2, text: "Anemone City" } },
      { type: "rich_text", id: "rasm-5", value: { content: "<p>Meseta entre 5 y 25 metros tapizada de anemonas con peces payaso. Corales de mesa, coral brocoli y fauna de arrecife variada. Ideal para fotografia macro. <strong>Nivel:</strong> todos (con guia).</p>" } },
      { type: "heading", id: "rasm-6", value: { level: 2, text: "Vida marina" } },
      { type: "rich_text", id: "rasm-7", value: { content: "<ul><li><strong>Pelagicos:</strong> barracudas, jureles, atunes, pargos Bohar</li><li><strong>Tiburones:</strong> grises, puntas blancas, ocasionalmente martillos</li><li><strong>Tortugas:</strong> carey y verde</li><li><strong>Arrecife:</strong> peces payaso, napoleon, meros, morenas, peces leon, nudibranquios</li><li><strong>Ocasionales:</strong> mantas, delfines, aguilas de mar</li></ul>" } },
      { type: "heading", id: "rasm-8", value: { level: 2, text: "En que rutas se incluye" } },
      { type: "rich_text", id: "rasm-9", value: { content: "<p>Ras Mohammed aparece en 4 de las 5 rutas: Norte y Tiran (1.190 EUR), Norte y Pecios (1.190 EUR), Tiran y Blue Hole (1.230 EUR) y Norte y Brothers (1.230 EUR). Todas incluyen dia completo aqui con 2-3 inmersiones.</p>" } },
      { type: "rich_text", id: "rasm-10", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/abu-nuhas-cementerio-de-barcos">Abu Nuhas</a> | <a href="/blog/temporada-ruta-norte-mar-rojo">Mejor temporada</a> | <a href="/rutas/norte-tiran">Ruta Norte y Tiran</a></p>' } },
      { type: "cta", id: "rasm-11", value: { title: "Bucea Ras Mohammed en tu vida a bordo", description: "Shark Reef, Yolanda Reef y Anemone City. Desde 1.190 EUR.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
  },
  {
    slug: "seguridad-buceo-mar-rojo",
    title: "Seguridad en el Buceo en el Mar Rojo: Guia Practica para tu Vida a Bordo",
    excerpt: "Corrientes, vida marina, camaras hiperbaricas y protocolos de emergencia: todo lo que necesitas saber para bucear seguro en el Mar Rojo.",
    publishedAt: "2026-01-05",
    readTime: "8 min",
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
    body: [
      { type: "rich_text", id: "safe-1", value: { content: "<p>El Mar Rojo es uno de los destinos de buceo mas seguros del mundo. Aguas calidas, visibilidad excelente e infraestructura consolidada. Pero hay cosas que conviene conocer. Esta guia pretende que llegues informado y disfrutes mas.</p>" } },
      { type: "heading", id: "safe-2", value: { level: 2, text: "Corrientes: la variable mas importante" } },
      { type: "rich_text", id: "safe-3", value: { content: "<ul><li><strong>Drift diving</strong> es la tecnica habitual. Te dejas llevar y el barco te recoge.</li><li>Lleva siempre <strong>boya SMB</strong> y silbato (obligatorios).</li><li>Si la corriente te arrastra, desciende: suele ser mas suave cerca del arrecife.</li><li>Nunca luches contra una corriente fuerte.</li></ul><p>Los dos primeros dias incluyen inmersiones de chequeo.</p>" } },
      { type: "heading", id: "safe-4", value: { level: 2, text: "Vida marina: que respetar" } },
      { type: "rich_text", id: "safe-5", value: { content: "<ul><li><strong>Pez leon:</strong> espinas venenosas, no tocar</li><li><strong>Coral de fuego:</strong> quemazon al contacto</li><li><strong>Pez piedra:</strong> camuflado, no apoyar manos en el fondo</li><li><strong>Erizos:</strong> espinas finas</li><li><strong>Morenas:</strong> no meter manos en grietas</li></ul><p><strong>Regla general:</strong> buena flotabilidad, no tocar nada, no perseguir fauna.</p>" } },
      { type: "heading", id: "safe-6", value: { level: 2, text: "Profundidad y camaras hiperbaricas" } },
      { type: "rich_text", id: "safe-7", value: { content: "<p>Inmersiones entre 5-30 m. Nitrox 28% incluido. El Mar Rojo tiene camaras hiperbaricas en Sharm, Hurghada (dos), El Gouna y Marsa Alam. Los barcos llevan oxigeno de emergencia.</p>" } },
      { type: "rich_text", id: "safe-8", value: { content: '<p><strong>Te puede interesar:</strong> <a href="/blog/seguro-buceo-dan-egipto">Seguro DAN</a> | <a href="/blog/como-es-un-vida-a-bordo-mar-rojo">Como es un vida a bordo</a></p>' } },
      { type: "cta", id: "safe-9", value: { title: "Bucear seguro es bucear informado", description: "Guias locales, seguro incluido y formacion gratuita. Desde 1.190 EUR.", primaryCTA: { text: "Ver Ruta Norte y Pecios", href: "/rutas/norte-pecios", variant: "gradient" } } },
    ],
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
