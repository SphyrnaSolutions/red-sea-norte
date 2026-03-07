import type { RutaData } from "./types"

const routeLeadFields: NonNullable<RutaData["inlineLead"]>["fields"] = [
  {
    name: "name",
    type: "text",
    placeholder: "Tu nombre",
    required: true,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Tu email",
    required: true,
  },
  {
    name: "certificationLevel",
    type: "select",
    placeholder: "Nivel de buceo",
    required: true,
    options: [
      { value: "open-water", label: "Open Water" },
      { value: "advanced", label: "Advanced" },
      { value: "rescue", label: "Rescue Diver" },
      { value: "divemaster", label: "Divemaster" },
      { value: "other", label: "Otro" },
    ],
  },
  {
    name: "preferredMonth",
    type: "select",
    placeholder: "Mes o ventana aproximada",
    required: true,
    options: [
      { value: "junio", label: "Junio" },
      { value: "julio", label: "Julio" },
      { value: "agosto", label: "Agosto" },
      { value: "septiembre", label: "Septiembre" },
      { value: "octubre", label: "Octubre" },
      { value: "noviembre", label: "Noviembre" },
      { value: "diciembre", label: "Diciembre" },
      { value: "flexible", label: "Soy flexible" },
    ],
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Telefono (opcional)",
    required: false,
  },
]

export const rutasData: Record<string, RutaData> = {
  "norte-7-dias": {
    slug: "norte-7-dias",
    title: "Ruta Norte y Pecios del Mar Rojo desde Hurghada",
    hero: {
      backgroundImage: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
      badge: { text: "RUTA NORTE · HURGHADA", backgroundColor: "#00CED1" },
      title: "Ruta Norte y Pecios del Mar Rojo desde Hurghada",
      subtitle:
        "La landing principal para vender vida a bordo en el Mar Rojo: Thistlegorm, Abu Nuhas, Ras Mohammed y una semana pensada para convertir interes en reserva.",
      primaryCTA: {
        text: "Consultar esta ruta",
        href: "#ruta-lead",
        variant: "gradient",
        actionType: "scroll",
        target: "ruta-lead",
      },
      secondaryCTA: {
        text: "Ver itinerario",
        href: "#itinerario-ruta",
        variant: "outline",
        actionType: "scroll",
        target: "itinerario-ruta",
      },
      trustLine: [
        "Salida desde Hurghada",
        "Pecios + arrecifes en una sola semana",
        "Opcion de Advanced a bordo",
      ],
    },
    storyIntro: {
      badge: "RUTA NORTE Y PECIOS",
      title: "Explora los pecios mas miticos del norte del Mar Rojo",
      description:
        "Embarcate en una ruta unica por los naufragios mas emblematicos del norte del Mar Rojo: desde el mitico SS Thistlegorm hasta joyas historicas como el Giannis D o el Carnatic. Una expedicion para buceadores apasionados por la historia, los pecios y los arrecifes, con inmersiones llenas de vida marina, buena visibilidad y el encanto intacto del desierto submarino egipcio. Vive este viaje de Ruta Norte y Pecios en el Mar Rojo con nosotros, desde la comodidad de un moderno barco de vida a bordo durante 7 dias.",
    },
    infoCards: [
      {
        icon: "Calendar",
        value: "8 dias (7 noches)",
        label: "Duracion",
        color: "blue",
      },
      {
        icon: "Waves",
        value: "16-18",
        label: "Inmersiones",
        color: "orange",
      },
      {
        icon: "MapPin",
        value: "Hurghada",
        label: "Salida",
        color: "cyan",
      },
    ],
    summarySection: {
      eyebrow: "RESUMEN DE LA RUTA",
      title: "Pecios míticos, arrecifes clásicos y una propuesta comercial muy fácil de entender",
      subtitle:
        "La intención de esta página es responder rápido a lo que bloquea la compra: qué se bucea, cómo es la semana, si encaja con mi nivel y cuál es el siguiente paso.",
      bullets: [
        "Ruta pensada para vender el Mar Rojo desde un producto concreto y reconocible",
        "Combinación de puntos icónicos como Thistlegorm, Abu Nuhas y Ras Mohammed",
        "Narrativa preparada para usuarios que comparan rutas, requisitos y logística",
      ],
    },
    spotsSection: {
      title: "Principales puntos de inmersion de la Ruta Norte",
      subtitle:
        "Los spots mas destacados de esta ruta: pecios historicos de la Segunda Guerra Mundial y del siglo XIX combinados con arrecifes vibrantes del Parque Nacional de Ras Mohammed.",
      spots: [
        {
          name: "SS Thistlegorm",
          image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
          alt: "Motocicleta BSA dentro del pecio SS Thistlegorm en el Mar Rojo",
          summary:
            "El pecio mas iconico del Mar Rojo. Este carguero britanico, hundido en 1941 durante la Segunda Guerra Mundial, alberga un museo sumergido: motocicletas, camiones, locomotoras y cajas de municion atrapadas en el tiempo.",
          depth: "14-30m",
          tag: "Pecio iconico",
        },
        {
          name: "Giannis D (Abu Nuhas)",
          image: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
          alt: "Proa del pecio Giannis D en Abu Nuhas, cementerio de barcos del Mar Rojo",
          summary:
            "Este carguero griego naufrago en 1983 y yace inclinado sobre el arrecife de Abu Nuhas. Su estructura esta casi intacta, lo que permite exploraciones fascinantes entre pasillos, cubiertas y sala de maquinas.",
          depth: "10-27m",
          tag: "Cementerio de barcos",
        },
        {
          name: "Ras Mohammed",
          image: "/images/underwater/underwater-coral-reef-anthias-fish.jpg",
          alt: "Arrecife de coral con peces anthias en Ras Mohammed, Mar Rojo",
          summary:
            "Un paraiso submarino protegido donde arrecifes vibrantes se funden con grandes bancos de barracudas, peces payaso, pargos Bohar y jardines de coral. Ideal para los amantes de la biodiversidad y la fotografia submarina.",
          depth: "5-40m",
          tag: "Arrecife clasico",
        },
        {
          name: "Carnatic",
          image: "/images/underwater/underwater-blue-spotted-stingray.jpg",
          alt: "Vida marina en el pecio Carnatic del Mar Rojo",
          summary:
            "Naufragado en 1869, el Carnatic es un elegante buque de vela y vapor que descansa sobre un lecho de coral. Su esqueleto metalico, cubierto de vida marina, revela su arquitectura original.",
          depth: "10-28m",
          tag: "Pecio historico",
        },
        {
          name: "Dunraven",
          image: "/images/underwater/underwater-hammerhead-sharks-pair.jpg",
          alt: "Pecio Dunraven cerca de Beacon Rock en el Mar Rojo",
          summary:
            "Hundido cerca de Beacon Rock en 1876, este historico buque de vapor ofrece una experiencia unica entre restos antiguos colonizados por coral. Peces leon, nudibranquios y peces cristal llenan sus interiores oscuros.",
          depth: "5-28m",
          tag: "Pecio historico",
        },
        {
          name: "Gubal y Ulysses",
          image: "/images/underwater/underwater-dolphins-pod-reef.jpg",
          alt: "Zona de Gubal Island con el pecio Ulysses en el Mar Rojo",
          summary:
            "Zona rica en biodiversidad con aguas tranquilas. Aqui se encuentra el pecio Ulysses, encallado en 1887, junto a jardines de coral, praderas de arena blanca y canales ideales para inmersiones relajadas.",
          depth: "1-30m",
          tag: "Biodiversidad",
        },
      ],
    },
    itinerary: {
      title: "Itinerario dia a dia",
      days: [
        {
          day: 1,
          title: "Embarque en Hurghada y bienvenida a bordo",
          description:
            "El embarque puede ser a partir de las 16:00. Tendras tiempo para instalarte en tu camarote, conocer a la tripulacion y disfrutar de una cena de bienvenida para todos los clientes que lleguen antes de las 20:00.",
          dives: [],
          highlights: ["Embarque desde las 16:00", "Cena de bienvenida", "Instalacion en camarote"],
          image: "/images/boat/boat-exterior-side-profile.jpg",
          alt: "M/Y Dolce Vita en el puerto de Hurghada listo para embarque",
          overlayDirection: "left",
        },
        {
          day: 2,
          title: "Inmersiones de chequeo y navegacion al norte",
          description:
            "Comienza tu expedicion entre los pecios mas legendarios del Mar Rojo. Realizaras dos inmersiones de chequeo para aclimatarte, probar el equipo y familiarizarte con el ritmo de vida a bordo. Despues, el barco pondra rumbo hacia el norte.",
          dives: ["Check dive 1", "Check dive 2"],
          highlights: ["Aclimatacion", "Prueba de equipo", "Navegacion al norte"],
          image: "/images/underwater/underwater-coral-reef-anthias-fish.jpg",
          alt: "Arrecife de coral con peces anthias en las inmersiones de chequeo de la Ruta Norte",
          overlayDirection: "right",
        },
        {
          day: 3,
          title: "Parque Nacional de Ras Mohamed y pecio SS Dunraven",
          description:
            "Tres inmersiones espectaculares te sumergen en el vibrante ecosistema del Parque Nacional de Ras Mohamed. Bucearas en arrecifes llenos de color, rodeado de bancos de barracudas, peces payaso y pargos Bohar. Ademas, visitaras el historico SS Dunraven, un buque de vapor del siglo XIX.",
          dives: ["Ras Mohamed", "Shark & Yolanda Reef", "SS Dunraven"],
          highlights: ["Parque Nacional", "Arrecifes vibrantes", "Pecio historico"],
          image: "/images/underwater/underwater-sea-turtle-fish-school.jpg",
          alt: "Tortuga marina con banco de peces en Ras Mohammed, Mar Rojo",
          overlayDirection: "left",
        },
        {
          day: 4,
          title: "El mitico SS Thistlegorm",
          description:
            "Tres inmersiones en uno de los pecios mas famosos del mundo: el SS Thistlegorm, un carguero britanico hundido en 1941. Dentro del pecio aun se conservan motos, camiones, vagones y cajas de municion. Profundidades de entre 16 y 30 metros lo convierten en un museo submarino unico.",
          dives: ["SS Thistlegorm (exterior)", "SS Thistlegorm (interior)", "SS Thistlegorm (nocturna)"],
          highlights: ["Pecio iconico WWII", "Museo submarino", "Historia y emocion"],
          image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
          alt: "Motocicleta BSA dentro del pecio SS Thistlegorm en el Mar Rojo",
          overlayDirection: "right",
        },
        {
          day: 5,
          title: "Arrecife Abu Nuhas y sus tesoros hundidos",
          description:
            "Este arrecife es conocido como el cementerio de barcos del Mar Rojo. Tres o cuatro inmersiones te permitiran explorar varios pecios legendarios: Giannis D, Carnatic y Chrisoula K si las condiciones lo permiten. Cada uno ofrece estructuras accesibles, vida marina abundante y la posibilidad de hacer varias exploraciones en un mismo punto.",
          dives: ["Giannis D", "Carnatic", "Chrisoula K"],
          highlights: ["Cementerio de barcos", "Pecios accesibles", "Vida marina abundante"],
          image: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
          alt: "Proa de pecio hundido en Abu Nuhas, cementerio de barcos del Mar Rojo",
          overlayDirection: "left",
        },
        {
          day: 6,
          title: "Rosalie Moller y Ulysses",
          description:
            "Dos pecios muy diferentes completan esta jornada. Rosalie Moller, buque carbonero hundido durante la Segunda Guerra Mundial, entre 30 y 50 m de profundidad. Ulysses, carguero britanico encallado en 1887 en Gubal Island, descansa entre 5 y 27 m, ideal para una inmersion relajada entre estructuras antiguas.",
          dives: ["Rosalie Moller", "Ulysses (Gubal)"],
          highlights: ["Pecios de distintas epocas", "Exploracion profunda", "Gubal Island"],
          image: "/images/underwater/underwater-dolphins-pod-reef.jpg",
          alt: "Vida marina en la zona de Gubal Island, Mar Rojo",
          overlayDirection: "right",
        },
        {
          day: 7,
          title: "Ultimas inmersiones y regreso al puerto",
          description:
            "Dos inmersiones matinales para despedirte del Mar Rojo en sus mejores condiciones de luz y calma. Regreso al puerto por la tarde, donde podras relajarte, organizar tu equipo y revivir mentalmente cada inmersion del viaje.",
          dives: ["Inmersion matinal 1", "Inmersion matinal 2"],
          highlights: ["Ultimas inmersiones", "Regreso a Hurghada", "Cierre del viaje"],
          image: "/images/deck/sundeck-loungers-glass-railing.jpg",
          alt: "Solarium del M/Y Dolce Vita al atardecer regresando a Hurghada",
          overlayDirection: "left",
        },
        {
          day: 8,
          title: "Desembarque",
          description:
            "Check-out hasta las 10:00 en Hurghada, poniendo fin a una semana epica de buceo entre los mejores pecios del norte del Mar Rojo.",
          dives: [],
          highlights: ["Check-out 10:00", "Traslado al aeropuerto", "Fin del viaje"],
          image: "/images/boat/boat-aerial-anchored-reef.jpg",
          alt: "Vista aerea del M/Y Dolce Vita en el puerto de Hurghada al desembarque",
          overlayDirection: "right",
        },
      ],
    },
    audienceFit: {
      title: "¿Es esta ruta para ti?",
      subtitle:
        "Uno de los gaps detectados en Odoo era explicar con honestidad el encaje por nivel. Esta sección existe para eso, no para prometer que vale para todo el mundo.",
      profiles: [
        {
          title: "Sí, si buscas tu primer liveaboard serio",
          description:
            "La Ruta Norte es una entrada muy potente al Mar Rojo para quien quiere vivir una semana reconocible, con spots icónicos y contexto suficiente para decidir.",
          tone: "good-fit",
        },
        {
          title: "Depende, si vienes con Open Water",
          description:
            "Puede encajar, pero la clave está en presentar bien los límites, la progresión y la opción de Advanced a bordo como valor añadido, no como atajo.",
          tone: "consider",
        },
        {
          title: "No es la mejor puerta si solo quieres curso puro",
          description:
            "Si el usuario solo busca una certificación aislada, esta landing no debe distraerlo. Aquí se vende primero una ruta de viaje y luego un posible upgrade formativo.",
          tone: "not-now",
        },
      ],
    },
    incluye: {
      title: "Que incluye el viaje",
      items: [
        "Traslados aeropuerto-barco-aeropuerto",
        "7 Noches de crucero",
        "Pension completa a bordo",
        "Refrescos, agua mineral, te y cafe",
        "2 cervezas por persona y dia",
        "Guias de buceo locales",
        "Tour Leader de nuestra agencia",
        "16/18 Inmersiones",
        "Botella de 12L, plomos y NITROX (28%)",
        "Seguro de viaje",
        "Formacion avanzada gratuita a bordo",
        "Seminarios gratuitos a bordo",
      ],
    },
    practicalInfo: {
      title: "Informacion practica",
      subtitle:
        "Todo lo que necesitas saber antes de reservar: que esta incluido, que se paga aparte y como funciona la logistica del viaje.",
      includedTitle: "Incluido en el precio",
      included: [
        "Traslados aeropuerto-barco-aeropuerto",
        "7 noches de crucero en el M/Y Dolce Vita",
        "Pension completa a bordo (refrescos, te, cafe, 2 cervezas/dia)",
        "16-18 inmersiones con guias de buceo locales",
        "Tour Leader de la agencia incluido",
        "Botella de 12L, plomos y Nitrox (28%)",
        "Advanced Open Water SSI + 4 especialidades gratis",
        "Seminarios gratuitos a bordo",
        "Seguro de viaje",
      ],
      extrasTitle: "No incluido en el precio",
      extras: [
        "Vuelos (te podemos asesorar en la compra)",
        "Visado de entrada en Egipto online - 30 EUR",
        "Seguro opcional de cancelacion - 47,75 EUR",
        "Alquiler de equipo de buceo",
        "Tasas - Entre 120 EUR y 220 EUR (pago en metalico en el barco)",
        "Propinas - Tripulacion 75 EUR (pago en metalico en el barco)",
        "Propinas - Guias 25 EUR (pago en metalico en el barco)",
        "Botella de 15L - 40 EUR (pago en metalico en el barco)",
        "Bebidas alcoholicas y cualquier otro servicio",
      ],
      logisticsTitle: "Logistica",
      logistics: [
        "Salida y regreso desde Hurghada",
        "Embarque a partir de las 16:00 del dia 1",
        "Check-out hasta las 10:00 del dia 8",
        "Certificacion minima: Open Water Diver (cualquier certificadora)",
      ],
    },
    faqSection: {
      title: "Preguntas frecuentes sobre la Ruta Norte y Pecios",
      items: [
        {
          question: "Que nivel de certificacion necesito para sumergirme en los pecios de la Ruta Norte?",
          answer:
            "Este viaje de buceo en el Mar Rojo esta abierto a buceadores certificados a partir de Open Water. Sin embargo, muchas inmersiones son profundas (hasta 30 m), por lo que se recomienda tener el curso Advanced Open Water o hacerlo a bordo sin coste. Una de las muchas ventajas de viajar con Karlos Simon es que te ofrecemos este tipo de formacion gratuita a bordo.",
        },
        {
          question: "Cuantas inmersiones se realizan durante la semana?",
          answer:
            "En la Ruta Norte del Mar Rojo se programan entre 16 y 18 inmersiones en total, incluyendo algunas nocturnas si las condiciones lo permiten. El ritmo habitual es de 3-4 inmersiones al dia, con tiempo para descansar y disfrutar del barco.",
        },
        {
          question: "Que tipo de pecios vamos a visitar en la Ruta Norte?",
          answer:
            "Durante este viaje de buceo por la Ruta Norte exploraras pecios historicos del Mar Rojo, como el SS Thistlegorm, Giannis D, Carnatic, Dunraven y Rosalie Moller, ademas de otros como el Ulysses en Gubal. Todos ofrecen estructuras interesantes, accesibles y llenas de vida marina.",
        },
        {
          question: "Puedo alquilar equipo de buceo si no llevo el mio?",
          answer:
            "Si. Es posible alquilar equipo completo (traje, regulador, jacket, ordenador, etc.) con antelacion. Tambien puedes alquilar piezas sueltas si solo necesitas completar tu configuracion. Preguntanos antes, para que podamos llevar todo el equipo que necesitas a bordo.",
        },
        {
          question: "Que temperatura tiene el agua en esta ruta del Mar Rojo?",
          answer:
            "La temperatura del agua en el norte del Mar Rojo oscila entre 26 y 29 grados C durante los meses de verano. Un traje de 3 mm o 5 mm es suficiente para bucear con comodidad.",
        },
        {
          question: "Hay nitrox disponible a bordo?",
          answer:
            "Si, el nitrox esta incluido (28%) para buceadores certificados. Si no tienes el curso, puedes realizarlo, sin coste, durante el viaje y aprovecharlo desde el primer dia.",
        },
        {
          question: "Que ocurre si no quiero hacer todas las inmersiones?",
          answer:
            "No hay problema. Aunque el plan incluye varias inmersiones, puedes ajustar el ritmo segun como te sientas. Tambien forma parte del viaje disfrutar del barco, descansar o simplemente bucear menos.",
        },
        {
          question: "Como es el barco y que incluye el vida a bordo?",
          answer:
            "Nuestro barco, el Dolce Vita es un vida a bordo completamente equipado, con camarotes dobles, banios privados, aire acondicionado, solarium, comedor interior y exterior. Esta incluida la pension completa, snacks, refrescos, nitrox (28%), toallas y albornoz.",
        },
        {
          question: "Se necesita visado para entrar en Egipto?",
          answer:
            "Si, necesitaras un visado turistico. Nuestra agencia te ayudara a conseguirlo (30 EUR), para que no tengas que preocuparte por nada.",
        },
      ],
    },
    resourcesSection: {
      title: "Guías para decidir mejor esta ruta",
      subtitle:
        "Estas páginas satélite atacan objeciones reales de compra, resuelven logística y amplían spots clave del cluster alrededor de Ruta Norte + Pecios desde Hurghada.",
      items: [
        {
          title: "Requisitos reales de la Ruta Norte",
          description:
            "Nivel, experiencia reciente y cuándo puede encajar o no para Open Water.",
          href: "/blog/requisitos-ruta-norte-mar-rojo",
          label: "Requisitos",
        },
        {
          title: "Precio real de un vida a bordo en el Mar Rojo",
          description:
            "Cómo pensar el coste total sin quedarse solo con el precio base del operador.",
          href: "/blog/precio-vida-a-bordo-mar-rojo",
          label: "Precio",
        },
        {
          title: "Qué incluye y qué no incluye",
          description:
            "La guía para reducir leads mal cualificados y explicar extras, tasas y expectativas.",
          href: "/blog/que-incluye-vida-a-bordo-mar-rojo",
          label: "Incluye",
        },
        {
          title: "Cómo llegar a Hurghada para un liveaboard",
          description:
            "La parte logística que más fricción elimina cuando el usuario ya quiere avanzar.",
          href: "/blog/como-llegar-a-hurghada-liveaboard",
          label: "Logística",
        },
        {
          title: "Primer liveaboard siendo Open Water",
          description:
            "Consejos y límites para quien sueña con esta ruta pero aún no tiene claro si encaja.",
          href: "/blog/primer-liveaboard-open-water-mar-rojo",
          label: "Open Water",
        },
        {
          title: "Ruta Norte vs Ruta Sur",
          description:
            "La comparativa para usuarios que aún no saben qué parte del Mar Rojo encaja mejor con su viaje.",
          href: "/blog/ruta-norte-vs-ruta-sur-mar-rojo",
          label: "Comparativa",
        },
        {
          title: "Hurghada vs Sharm para un liveaboard",
          description:
            "Comparativa logística y comercial para reducir fricción antes de reservar.",
          href: "/blog/hurghada-vs-sharm-liveaboard",
          label: "Comparativa",
        },
        {
          title: "Abu Nuhas: por qué esta zona vende la Ruta Norte",
          description:
            "Satélite de spot centrada en el cementerio de barcos más famoso del norte.",
          href: "/blog/abu-nuhas-cementerio-de-barcos",
          label: "Spot",
        },
        {
          title: "Giannis D: uno de los pecios más recordados de Abu Nuhas",
          description:
            "Pieza satélite para capturar intención específica de pecio y enviarla a la ruta.",
          href: "/blog/giannis-d-abu-nuhas",
          label: "Pecio",
        },
        {
          title: "Dunraven: el pecio que da profundidad al itinerario",
          description:
            "Guía satélite para usuarios que buscan más detalle de spots y nivel recomendado.",
          href: "/blog/dunraven-mar-rojo",
          label: "Pecio",
        },
        {
          title: "Advanced a bordo: cuándo aporta valor real",
          description:
            "Cómo usar la parte formativa como mejora de la experiencia, no como promesa vacía.",
          href: "/blog/advanced-a-bordo-mar-rojo",
          label: "Advanced",
        },
        {
          title: "Visado para Egipto y llegada a Hurghada",
          description:
            "La pieza de logística para que la documentación no bloquee la decisión.",
          href: "/blog/visado-egipto-hurghada",
          label: "Logística",
        },
        {
          title: "Checklist para un vida a bordo en el Mar Rojo",
          description:
            "Qué llevar y qué revisar antes de embarcar para que el viaje se sienta controlable.",
          href: "/blog/checklist-vida-a-bordo-mar-rojo",
          label: "Checklist",
        },
        {
          title: "Pecios vs tiburones en el Mar Rojo",
          description:
            "Comparativa para filtrar mejor la intención del usuario según el tipo de experiencia que busca.",
          href: "/blog/pecios-vs-tiburones-mar-rojo",
          label: "Comparativa",
        },
        {
          title: "Cómo es un vida a bordo en el Mar Rojo",
          description:
            "La guía que ayuda a visualizar la semana completa antes de decidir la ruta.",
          href: "/blog/como-es-un-vida-a-bordo-mar-rojo",
          label: "Vida a bordo",
        },
        {
          title: "Camarotes, comida y wifi a bordo",
          description:
            "Micro-objeciones que conviene resolver para mejorar la calidad del lead.",
          href: "/blog/camarotes-comida-wifi-liveaboard",
          label: "Vida a bordo",
        },
        {
          title: "Nitrox a bordo en el Mar Rojo",
          description:
            "Soporte para usuarios que ya comparan detalle técnico y operativo del viaje.",
          href: "/blog/nitrox-a-bordo-mar-rojo",
          label: "Nitrox",
        },
        {
          title: "Carnatic: otro pecio fuerte de Abu Nuhas",
          description:
            "Pieza satélite que profundiza el atractivo del cementerio de barcos del norte.",
          href: "/blog/carnatic-abu-nuhas",
          label: "Pecio",
        },
        {
          title: "Shark y Yolanda Reef",
          description:
            "El bloque de arrecife que equilibra la narrativa de pecios dentro de la semana.",
          href: "/blog/shark-yolanda-reef-mar-rojo",
          label: "Spot",
        },
        {
          title: "Rosalie Moller: el pecio que exige segmentar mejor",
          description:
            "Guía para elevar el discurso sobre nivel, profundidad y expectativas de ruta.",
          href: "/blog/rosalie-moller-mar-rojo",
          label: "Pecio",
        },
        {
          title: "Mejor temporada para la Ruta Norte",
          description:
            "Cómo pensar junio a diciembre sin caer en contenido genérico de clima.",
          href: "/blog/temporada-ruta-norte-mar-rojo",
          label: "Temporada",
        },
        {
          title: "Seguro de buceo para Egipto",
          description:
            "Objeción logística real que refuerza la percepción de seguridad del viaje.",
          href: "/blog/seguro-buceo-dan-egipto",
          label: "Seguridad",
        },
      ],
    },
    inlineLead: {
      sectionId: "ruta-lead",
      eyebrow: "CONSULTA ESTA RUTA",
      title: "Cuéntanos tu nivel y te diremos si la Ruta Norte encaja contigo",
      subtitle:
        "Este es el bloque principal de conversión de la landing. La idea es cualificar sin meter fricción y empujar una conversación comercial útil.",
      highlights: [
        "Te orientamos según tu nivel de buceo",
        "Te explicamos si esta ruta es la mejor para ti",
        "Te guiamos hacia fechas, detalles o página satélite según el caso",
      ],
      fields: routeLeadFields,
      submitButton: "Recibir información de esta ruta",
      privacyText: "Al enviar, aceptas nuestra política de privacidad.",
      successMessage: "Gracias. Te escribiremos con más detalles de la Ruta Norte.",
      showModalCta: false,
    },
    leadForm: {
      title: "Déjanos tu consulta sobre la Ruta Norte",
      subtitle: "Formulario ampliado para dudas más concretas sobre el viaje.",
      fields: [
        ...routeLeadFields,
        {
          name: "message",
          type: "textarea",
          placeholder: "¿Qué quieres saber antes de decidir?",
          required: false,
        },
      ],
      submitButton: "Enviar consulta",
      privacyText: "Al enviar, aceptas nuestra política de privacidad.",
      successMessage: "Hemos recibido tu consulta sobre la Ruta Norte.",
    },
    cta: {
      title: "Reserva tu plaza en la Ruta Norte y Pecios",
      description:
        "8 dias de buceo entre pecios legendarios desde Hurghada. Desde 1.190 EUR con Advanced SSI incluido.",
      backgroundImage: "/images/boat/boat-aerial-anchored-reef.jpg",
      primaryCTA: {
        text: "Ir al formulario",
        href: "#ruta-lead",
        variant: "gradient",
        actionType: "scroll",
        target: "ruta-lead",
      },
      secondaryCTA: {
        text: "Ver requisitos de la ruta",
        href: "/blog/requisitos-ruta-norte-mar-rojo",
        variant: "outline",
        actionType: "link",
      },
    },
  },
}

export const getRuta = (slug: string): RutaData | undefined => {
  return rutasData[slug]
}

export const getAllRutas = (): RutaData[] => {
  return Object.values(rutasData)
}
