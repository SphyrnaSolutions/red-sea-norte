import type { HomepageData } from "./types"

const baseLeadFields: HomepageData["leadForm"]["fields"] = [
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
    name: "phone",
    type: "tel",
    placeholder: "Tu telefono",
    required: true,
  },
  {
    name: "certification",
    type: "select",
    placeholder: "Nivel de buceo",
    required: false,
    options: [
      { value: "No certificado", label: "No certificado" },
      { value: "Open Water", label: "Open Water" },
      { value: "Advanced", label: "Advanced" },
      { value: "Rescue", label: "Rescue Diver" },
      { value: "Divemaster", label: "Divemaster" },
      { value: "Instructor", label: "Instructor" },
    ],
  },
  {
    name: "preferredMonth",
    type: "select",
    placeholder: "Cuando te interesa viajar",
    required: false,
    options: [
      { value: "Enero", label: "Enero" },
      { value: "Febrero", label: "Febrero" },
      { value: "Marzo", label: "Marzo" },
      { value: "Abril", label: "Abril" },
      { value: "Mayo", label: "Mayo" },
      { value: "Junio", label: "Junio" },
      { value: "Julio", label: "Julio" },
      { value: "Agosto", label: "Agosto" },
      { value: "Septiembre", label: "Septiembre" },
      { value: "Octubre", label: "Octubre" },
      { value: "Noviembre", label: "Noviembre" },
      { value: "Diciembre", label: "Diciembre" },
    ],
  },
]

export const homepageData: HomepageData = {
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80",
    badge: {
      text: "RUTA NORTE 2026 · HURGHADA",
      backgroundColor: "#00CED144",
    },
    title: "Vida a Bordo en el Mar Rojo: Ruta Norte y Pecios desde Hurghada",
    subtitle:
      "Safari de buceo de 7 dias entre pecios legendarios, arrecifes iconicos y la opcion de completar tu Advanced SSI a bordo.",
    ctas: [
      {
        text: "Consultar viaje",
        variant: "primary",
        actionType: "scroll",
        target: "inline-lead",
      },
      {
        text: "Ver Ruta Norte",
        variant: "outline",
        actionType: "scroll",
        target: "route-teaser",
      },
    ],
    trustLine: [
      "Salida desde Hurghada",
      "Ruta Norte + Pecios",
      "Opcion de Advanced a bordo",
    ],
  },

  routeValueSection: {
    title: "Por que esta ruta es la mejor puerta de entrada al Mar Rojo",
    subtitle:
      "La homepage deja de vender solo un curso y pasa a presentar una experiencia completa: pecios, arrecifes, vida a bordo y progresion real para distintos niveles.",
    cards: [
      {
        eyebrow: "PECIOS MITICOS",
        title: "Thistlegorm, Abu Nuhas y Dunraven en una sola semana",
        description:
          "La Ruta Norte concentra algunos de los pecios mas buscados del Mar Rojo y los combina con inmersiones de arrecife que equilibran intensidad y disfrute.",
        image: "https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=1200&q=80",
      },
      {
        eyebrow: "ARRECIFES Y VIDA",
        title: "Ras Mohammed y fondos llenos de vida marina",
        description:
          "No es solo una ruta de pecios. Tambien incluye paredes, jardines de coral y puntos en los que la visibilidad convierte cada inmersion en un argumento de venta por si mismo.",
        image: "https://images.unsplash.com/photo-1758968523032-110415132be0?w=1200&q=80",
      },
      {
        eyebrow: "LOGISTICA SIMPLE",
        title: "Salida desde Hurghada con un producto facil de entender",
        description:
          "La ruta conecta mejor con la intencion comercial del usuario: quiere saber que se bucea, como es la semana y si encaja con su nivel sin navegar por veinte paginas.",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&q=80",
      },
      {
        eyebrow: "VALOR ANADIDO",
        title: "Advanced SSI como extra, no como barrera",
        description:
          "El Advanced aparece como una forma de aprovechar mejor el viaje, no como el unico motivo para venir. Eso alinea la home con la estrategia marcada en Odoo.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
      },
    ],
  },

  whySection: {
    title: "Por Que Bucear la Ruta Norte",
    subtitle: "Experiencia de viaje, no solo certificacion",
    topRow: [
      {
        type: "image-large",
        image: "https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=1200&q=80",
        title: "Pecios que justifican el viaje",
        description: "Thistlegorm y Abu Nuhas convierten esta ruta en un clasico comercial.",
      },
      {
        type: "conditions-image",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&q=80",
        badge: "VISIBILIDAD Y MAR",
        title: "Condiciones que ayudan a vender",
        highlight: "+30m visibilidad • agua templada • semana tipo clara",
      },
    ],
    bottomRow: [
      {
        type: "certification",
        icon: "✓",
        title: "Advanced a bordo",
        subtitle: "Valor anadido para quien quiera progresar",
      },
      {
        type: "image-small",
        image: "https://images.unsplash.com/photo-1762717563074-23757e64cb0e?w=800&q=80",
        badge: "RUTA COMPLETA",
        title: "Pecios + arrecifes + vida marina",
      },
      {
        type: "equipment",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        badge: "MENOS FRICCION",
        title: "Producto facil de explicar y de reservar",
      },
    ],
  },

  diveSites: {
    title: "Que vas a bucear en la Ruta Norte",
    subtitle:
      "Los spots de esta homepage deben reforzar el producto principal y preparar el salto hacia el cluster de contenido y conversion.",
    sites: [
      {
        name: "Thistlegorm",
        image: "https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=800&q=80",
        depth: "16-32m",
        highlight: "El pecio iconico del Mar Rojo",
      },
      {
        name: "Abu Nuhas",
        image: "https://images.unsplash.com/photo-1649809014061-5f0f5d894e0d?w=800&q=80",
        depth: "4-26m",
        highlight: "Cementerio de barcos y ruta clasica",
      },
      {
        name: "Ras Mohammed",
        image: "https://images.unsplash.com/photo-1758968523032-110415132be0?w=800&q=80",
        depth: "10-35m",
        highlight: "Arrecifes, paredes y vida marina",
      },
      {
        name: "Dunraven",
        image: "https://images.unsplash.com/photo-1762717563074-23757e64cb0e?w=800&q=80",
        depth: "18-28m",
        highlight: "Pecio historico ideal para enriquecer la semana",
      },
    ],
  },

  journeyOverview: {
    eyebrow: "COMO ES EL VIAJE",
    title: "Una semana de vida a bordo pensada para bucear mucho y decidir con claridad",
    subtitle:
      "Esta seccion sustituye el bloque antiguo de especialidades. Su funcion es explicar la experiencia real del viaje y resolver objeciones antes del formulario.",
    highlights: [
      "Semana tipo de 7 noches con varias inmersiones al dia",
      "Ruta centrada en pecios y puntos clasicos del norte",
      "Salida desde Hurghada y dinamica clara de vida a bordo",
    ],
    includesTitle: "Que espera el usuario cuando reserva este viaje",
    includes: [
      "Ritmo de inmersiones alto, con briefing y logica de semana bien definidos",
      "Combinacion de spots legendarios con dias de arrecife para equilibrar la experiencia",
      "Contexto suficiente para decidir si la ruta encaja antes de pasar a una landing mas profunda",
    ],
    fitTitle: "Como presentamos el Advanced dentro del viaje",
    fitItems: [
      "No como mensaje principal de la homepage",
      "Si como valor anadido para quien quiere progresar durante la semana",
      "Sin contaminar la intencion principal de vida a bordo + Ruta Norte",
    ],
    note:
      "En esta fase la home no enseña salidas ni precios cerrados. La prioridad es reposicionar y estructurar.",
  },

  programSection: {
    title: "Programa del viaje",
    subtitle: "Bloque legado mantenido por compatibilidad de datos",
    includes: [
      "Ruta Norte y Pecios",
      "Vida a bordo desde Hurghada",
      "Opcion de Advanced a bordo",
    ],
    price: {
      amount: "Consultar",
      badge: "FASE 1",
      perPerson: "segun salida",
      highlight: "Se definira cuando haya operativa real",
    },
  },

  audienceFit: {
    title: "Esta experiencia encaja contigo si...",
    subtitle:
      "La homepage tiene que filtrar y orientar. No se trata de meter a cualquiera, sino de que el usuario se vea dentro o fuera con honestidad.",
    profiles: [
      {
        title: "Quieres tu primer liveaboard potente",
        description:
          "Si ya buceas y buscas una semana con spots iconicos, esta ruta funciona muy bien como entrada seria al Mar Rojo.",
        tone: "good-fit",
      },
      {
        title: "Eres Open Water y quieres progresar",
        description:
          "La experiencia puede encajar si tu objetivo es dar el salto con criterio y aprovechar la opcion de Advanced a bordo como valor adicional.",
        tone: "consider",
      },
      {
        title: "Solo buscas un curso sin foco en viaje",
        description:
          "Entonces esta homepage no debe venderte una promesa equivocada. Aqui el producto principal es la ruta de vida a bordo, no un curso aislado.",
        tone: "not-now",
      },
    ],
  },

  specSection: {
    sectionLabel: "EXPERIENCIA DE VIAJE",
    bigCard: {
      image: "https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=1920&q=80",
      title: "Ruta Norte y Pecios",
      subtitle: "Pecios legendarios y arrecifes iconicos",
    },
    specialtyCards: [
      {
        type: "depth",
        image: "https://images.unsplash.com/photo-1680197116011-5d2a49060f24?w=1080&q=80",
        label: "RUTA",
        value: "7D",
        description: "Semana tipo de vida a bordo con foco comercial claro",
      },
      {
        type: "nitrox",
        image: "https://images.unsplash.com/photo-1553602455-f00e641c03c0?w=1080&q=80",
        title: "Advanced a bordo",
        description: "Valor adicional para quien quiere aprovechar mas la semana",
      },
    ],
    mainTitle: "Producto principal primero. El curso va despues.",
    navCards: [
      {
        type: "icon",
        image: "https://images.unsplash.com/photo-1573691257226-667997763983?w=1080&q=80",
        icon: "🧭",
        title: "Ruta clara",
        description: "Mensaje alineado con Hurghada, pecios y vida a bordo",
      },
      {
        type: "image",
        image: "https://images.unsplash.com/photo-1726088828431-30b5b70411c5?w=1920&q=80",
        title: "Menos ambiguedad",
        description: "La home deja de parecer una landing de curso generica",
      },
      {
        type: "stat",
        image: "https://images.unsplash.com/photo-1637308113747-a4b60a2f7f52?w=1080&q=80",
        number: "4",
        label: "Bloques que preparan la conversion",
        sublabel: "valor, spots, encaje y lead",
      },
    ],
    cta: {
      price: "Consulta la ruta",
      details: "Paso siguiente: entender si encaja contigo y dejar tus datos",
      buttonText: "Abrir formulario",
    },
  },

  leadForm: {
    title: "¿Quieres que te contemos si esta ruta encaja contigo?",
    subtitle:
      "Este modal se mantiene como apoyo secundario. La captacion principal ya ocurre dentro de la homepage.",
    fields: [
      ...baseLeadFields,
      {
        name: "message",
        type: "textarea",
        placeholder: "¿Tienes alguna duda concreta? (opcional)",
        required: false,
      },
    ],
    submitButton: "Quiero mas informacion",
    privacyText: "",
    successMessage: "Gracias. Te escribiremos con mas detalles de la ruta.",
    consentText: "Acepto recibir ofertas y novedades sobre viajes de buceo por WhatsApp de buceoenelmarrojo.com. Puedo darme de baja en cualquier momento.",
    privacyLinkText: "Politica de privacidad",
    privacyLinkHref: "/politica-de-privacidad",
  },

  inlineLead: {
    sectionId: "inline-lead",
    eyebrow: "CONSULTA EL VIAJE",
    title: "Recibe informacion de la Ruta Norte y Pecios",
    subtitle:
      "Bloque principal de conversion para esta fase. Pide solo lo necesario para cualificar el lead sin meter demasiada friccion.",
    highlights: [
      "Te orientamos segun tu nivel de buceo",
      "Te contamos si esta ruta es adecuada para ti",
      "Te guiamos hacia la landing o detalle adecuado despues",
    ],
    fields: [...baseLeadFields],
    submitButton: "Recibir informacion del viaje",
    privacyText: "",
    successMessage: "Gracias. Te contactaremos para orientarte sobre la ruta.",
    consentText: "Acepto recibir ofertas y novedades sobre viajes de buceo por WhatsApp de buceoenelmarrojo.com. Puedo darme de baja en cualquier momento.",
    privacyLinkText: "Politica de privacidad",
    privacyLinkHref: "/politica-de-privacidad",
  },

  routeTeaser: {
    eyebrow: "SIGUIENTE PASO",
    title: "La homepage abre la conversacion. La landing de Ruta Norte la cierra.",
    description:
      "Este bloque prepara el salto hacia el cluster principal: itinerario, requisitos, spots, logistica y objeciones de compra en un silo centrado en Ruta Norte + Pecios.",
    primaryCTA: {
      text: "Explorar Ruta Norte",
      href: "/rutas",
      actionType: "link",
    },
    secondaryCTA: {
      text: "Abrir formulario",
      href: "#inline-lead",
      actionType: "scroll",
      target: "inline-lead",
    },
  },

  ctaSection: {
    title: "Listo para hablar de tu viaje",
    description: "Salida desde Hurghada, spots iconicos y una propuesta clara.",
    primaryCTA: {
      text: "Consultar viaje",
      href: "#inline-lead",
      actionType: "scroll",
      target: "inline-lead",
    },
  },
}
