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
      badge: "MONEY PAGE →",
      title: "La ruta que mejor explica el producto principal de esta web",
      description:
        "Esta landing ya no se limita a describir un itinerario. Su funcion es vender la Ruta Norte y Pecios como experiencia central del proyecto: vida a bordo desde Hurghada, spots iconicos, objeciones resueltas y un siguiente paso claro para dejar el lead.",
    },
    infoCards: [
      {
        icon: "Calendar",
        value: "7 noches",
        label: "Duración",
        color: "blue",
      },
      {
        icon: "Waves",
        value: "18-22",
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
      title: "Principales puntos de inmersión de la Ruta Norte",
      subtitle:
        "Estos spots no se muestran como galería estética. Son el núcleo comercial de la página y deben explicar por qué esta ruta merece una consulta.",
      spots: [
        {
          name: "SS Thistlegorm",
          image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
          alt: "Motocicleta BSA dentro del pecio SS Thistlegorm en el Mar Rojo",
          summary:
            "El pecio más famoso del Mar Rojo y uno de los grandes argumentos de venta para cualquier liveaboard en esta zona.",
          depth: "16-32m",
          tag: "Pecio iconico",
        },
        {
          name: "Abu Nuhas",
          image: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
          alt: "Proa de pecio hundido en Abu Nuhas, cementerio de barcos del Mar Rojo",
          summary:
            "Un hub de pecios que permite explicar variedad, historia marítima y repetición de inmersiones memorables dentro de la misma semana.",
          depth: "4-26m",
          tag: "Cementerio de barcos",
        },
        {
          name: "Ras Mohammed",
          image: "/images/underwater/underwater-coral-reef-anthias-fish.jpg",
          alt: "Arrecife de coral con peces anthias en Ras Mohammed, Mar Rojo",
          summary:
            "El bloque arrecife de la ruta: paredes, corrientes y vida marina para equilibrar la narrativa de pecios.",
          depth: "10-35m",
          tag: "Arrecife clasico",
        },
        {
          name: "Dunraven y Rosalie Moller",
          image: "/images/underwater/underwater-blue-spotted-stingray.jpg",
          alt: "Raya de puntos azules en los pecios Dunraven y Rosalie Moller del Mar Rojo",
          summary:
            "Profundizan el discurso de la ruta y permiten segmentar mejor al usuario por nivel, experiencia y expectativas.",
          depth: "18-40m",
          tag: "Decision por nivel",
        },
      ],
    },
    itinerary: {
      title: "Itinerario día a día",
      days: [
        {
          day: 1,
          title: "Salida, check dives y primeras referencias del norte",
          description:
            "La semana arranca con una lógica operativa clara: embarque, briefing, adaptación al barco y primeras inmersiones para ordenar ritmo, nivel y expectativas.",
          dives: ["Check dive", "Primer arrecife del norte"],
          highlights: ["Embarque", "Inicio de semana", "Ajuste de nivel"],
          image: "/images/underwater/underwater-coral-reef-anthias-fish.jpg",
          alt: "Arrecife de coral con peces anthias en la primera inmersion de la Ruta Norte",
          overlayDirection: "left",
        },
        {
          day: 2,
          title: "Thistlegorm como gran hito del viaje",
          description:
            "El día de Thistlegorm es una de las razones por las que esta ruta convierte. La página debe tratarlo como el gran imán comercial del itinerario.",
          dives: ["SS Thistlegorm", "Sha'ab Ali"],
          highlights: ["Pecio iconico", "Doble inmersion", "Fotografia"],
          image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
          alt: "Motocicleta BSA dentro del pecio SS Thistlegorm, iman comercial de la Ruta Norte",
          overlayDirection: "right",
        },
        {
          day: 3,
          title: "Rosalie Moller, Dunraven y profundidad de producto",
          description:
            "La ruta gana riqueza cuando no se queda en un solo pecio famoso. Este bloque explica mejor para quién es la semana y cómo cambia según experiencia.",
          dives: ["Rosalie Moller", "Dunraven"],
          highlights: ["Mas nivel", "Pecios historicos", "Decision por experiencia"],
          image: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
          alt: "Proa de pecio hundido Rosalie Moller y Dunraven en el Mar Rojo",
          overlayDirection: "left",
        },
        {
          day: 4,
          title: "Ras Mohammed y tramo de arrecifes",
          description:
            "No toda la semana es penetracion y hierro. Ras Mohammed justifica el equilibrio entre aventura, paisaje submarino y vida marina.",
          dives: ["Shark Reef", "Yolanda Reef"],
          highlights: ["Arrecife top", "Corrientes", "Vida marina"],
          image: "/images/underwater/underwater-sea-turtle-fish-school.jpg",
          alt: "Tortuga marina con banco de peces en Ras Mohammed, Mar Rojo",
          overlayDirection: "right",
        },
        {
          day: 5,
          title: "Abu Nuhas y narrativa de cementerio de barcos",
          description:
            "Abu Nuhas permite explicar variedad, densidad de pecios y por qué esta ruta es tan buscada por usuarios con intención comercial real.",
          dives: ["Giannis D", "Carnatic", "Chrisoula K"],
          highlights: ["Abu Nuhas", "Varios pecios", "Historia maritima"],
          image: "/images/underwater/underwater-blue-spotted-stingray.jpg",
          alt: "Raya de puntos azules en Abu Nuhas, cementerio de barcos del Mar Rojo",
          overlayDirection: "left",
        },
        {
          day: 6,
          title: "Gubal y respiracion de la semana",
          description:
            "El usuario necesita entender que el viaje no es una sucesion caotica de spots, sino una progresion con momentos fuertes y otros mas descansados.",
          dives: ["Gubal", "Arrecife tranquilo"],
          highlights: ["Ritmo de viaje", "Mas reef", "Semana equilibrada"],
          image: "/images/underwater/underwater-dolphins-pod-reef.jpg",
          alt: "Grupo de delfines sobre arrecife en la zona de Gubal, Mar Rojo",
          overlayDirection: "right",
        },
        {
          day: 7,
          title: "Ultimas inmersiones y cierre de experiencia",
          description:
            "La semana termina con una ultima capa de experiencia y la transicion hacia el desembarque, dejando claro el formato real del viaje.",
          dives: ["Ultima inmersion", "Regreso a puerto"],
          highlights: ["Cierre", "Check-out", "Fin de semana"],
          image: "/images/deck/sundeck-loungers-glass-railing.jpg",
          alt: "Solarium del M/Y Dolce Vita con tumbonas al final de la semana de buceo",
          overlayDirection: "left",
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
      title: "Qué incluye la experiencia base",
      items: [
        "Alojamiento a bordo durante la ruta",
        "Programa de inmersiones con guía",
        "Botellas y plomos",
        "Pensión completa a bordo",
        "Briefings y dinámica de semana tipo",
        "Contexto suficiente para orientar al usuario antes de pedir más detalle",
      ],
    },
    practicalInfo: {
      title: "Información práctica que cierra objeciones",
      subtitle:
        "Este bloque convierte mejor que una lista plana de incluyes. Responde a la fricción real: qué entra, qué se paga aparte y cómo se organiza la logística.",
      includedTitle: "Incluido en la base",
      included: [
        "Vida a bordo y operación básica del viaje",
        "Inmersiones guiadas según programa",
        "Comidas a bordo y dinámica diaria del barco",
        "Material operativo esencial del viaje",
      ],
      extrasTitle: "Conviene aclarar aparte",
      extras: [
        "Tasas, propinas y extras de operador",
        "Nitrox o alquiler de material si aplica",
        "Seguro específico de buceo y posibles suplementos",
        "Cualquier servicio que dependa del barco o salida concreta",
      ],
      logisticsTitle: "Logística a explicar bien",
      logistics: [
        "Salida desde Hurghada",
        "Qué día se embarca y cuándo se desembarca",
        "Qué nivel conviene traer y qué dudas resolver antes de viajar",
        "Cómo pasar de esta landing a una conversación comercial útil",
      ],
    },
    faqSection: {
      title: "Preguntas frecuentes sobre la Ruta Norte y Pecios",
      items: [
        {
          question: "¿Esta ruta es apta para Open Water?",
          answer:
            "Puede serlo en algunos casos, pero esta landing debe explicarlo con matices. La Ruta Norte no se presenta como una promesa universal, sino como una experiencia cuyo encaje depende del nivel, comodidad en el agua y objetivos del viajero.",
        },
        {
          question: "¿Qué diferencia esta ruta de otras del Mar Rojo?",
          answer:
            "Su fuerza comercial está en reunir pecios icónicos, arrecifes muy reconocibles y una narrativa fácil de entender para quien compara liveaboards desde Europa.",
        },
        {
          question: "¿Por qué salir desde Hurghada?",
          answer:
            "Porque simplifica la propuesta de valor y la logística. En esta web el enfoque es vender un producto concreto y reconocible, no abrir demasiados frentes a la vez.",
        },
        {
          question: "¿El Advanced SSI es obligatorio?",
          answer:
            "No. En esta estrategia aparece como un valor adicional para ciertos perfiles, no como requisito para comprender ni comprar la ruta.",
        },
        {
          question: "¿Cuántas inmersiones suele incluir una semana así?",
          answer:
            "La referencia comercial habitual para esta ruta está en torno a 18-22 inmersiones, pero la operativa real puede variar según condiciones, autoridades y operador.",
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
      title: "Haz de la Ruta Norte la primera conversación comercial de esta web",
      description:
        "La home abre el interés. Esta landing lo convierte en una consulta cualificada sobre vida a bordo, pecios, nivel y salida desde Hurghada.",
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
