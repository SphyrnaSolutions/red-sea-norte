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
    placeholder: "Tu teléfono",
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
    placeholder: "Cuándo te interesa viajar",
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
    backgroundImage: "/images/underwater/underwater-diver-pink-soft-coral.jpg",
    badge: {
      text: "RUTA NORTE 2026 · HURGHADA",
      backgroundColor: "#00CED144",
    },
    title: "Vida a Bordo en el Mar Rojo: Ruta Norte y Pecios desde Hurghada",
    subtitle:
      "Safari de buceo de 7 noches en el M/Y Dolce Vita entre pecios legendarios, arrecifes icónicos y formación Advanced SSI gratuita a bordo. Desde 1.190 EUR.",
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
      "Opción de Advanced a bordo",
    ],
  },

  routeValueSection: {
    title: "¿Por qué esta ruta es la mejor puerta de entrada al Mar Rojo?",
    subtitle:
      "Pecios míticos, arrecifes vibrantes, vida a bordo y progresión real para distintos niveles en una sola semana.",
    cards: [
      {
        eyebrow: "PECIOS MÍTICOS",
        title: "Thistlegorm, Abu Nuhas y Dunraven en una sola semana",
        description:
          "La Ruta Norte concentra algunos de los pecios más buscados del Mar Rojo y los combina con inmersiones de arrecife que equilibran intensidad y disfrute.",
        image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
        alt: "Motocicleta BSA dentro del pecio SS Thistlegorm en el Mar Rojo",
      },
      {
        eyebrow: "ARRECIFES Y VIDA",
        title: "Ras Mohammed y fondos llenos de vida marina",
        description:
          "No es solo una ruta de pecios. También incluye paredes, jardines de coral y puntos en los que la visibilidad convierte cada inmersión en un argumento de venta por sí mismo.",
        image: "/images/underwater/underwater-coral-reef-anthias-fish.jpg",
        alt: "Arrecife de coral con peces anthias en la Ruta Norte del Mar Rojo",
      },
      {
        eyebrow: "LOGÍSTICA SIMPLE",
        title: "Salida desde Hurghada con un producto fácil de entender",
        description:
          "La ruta conecta mejor con la intención comercial del usuario: quiere saber qué se bucea, cómo es la semana y si encaja con su nivel sin navegar por veinte páginas.",
        image: "/images/boat/boat-exterior-side-profile.jpg",
        alt: "M/Y Dolce Vita navegando en el Mar Rojo vista de perfil",
      },
      {
        eyebrow: "VALOR AÑADIDO",
        title: "Advanced SSI como extra, no como barrera",
        description:
          "El Advanced aparece como una forma de aprovechar mejor el viaje, no como el único motivo para venir. Así el curso suma valor sin restar protagonismo a la ruta.",
        image: "/images/deck/deck-dive-station-gear-rack.jpg",
        alt: "Cubierta de buceo del M/Y Dolce Vita con equipo preparado",
      },
    ],
  },

  whySection: {
    title: "¿Por Qué Bucear la Ruta Norte?",
    subtitle: "Experiencia de viaje, no solo certificación",
    topRow: [
      {
        type: "image-large",
        image: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
        title: "Pecios que justifican el viaje",
        description: "Thistlegorm y Abu Nuhas convierten esta ruta en un clásico comercial.",
      },
      {
        type: "conditions-image",
        image: "/images/underwater/underwater-sea-turtle-fish-school.jpg",
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
        subtitle: "Valor añadido para quien quiera progresar",
      },
      {
        type: "image-small",
        image: "/images/underwater/underwater-dolphins-pod-reef.jpg",
        badge: "RUTA COMPLETA",
        title: "Pecios + arrecifes + vida marina",
      },
      {
        type: "equipment",
        image: "/images/deck/deck-swim-platform-sea-access.jpg",
        badge: "MENOS FRICCIÓN",
        title: "Producto fácil de explicar y de reservar",
      },
    ],
  },

  diveSites: {
    title: "Qué vas a bucear en la Ruta Norte",
    subtitle:
      "Pecios legendarios, arrecifes de coral y paredes verticales que hacen de la Ruta Norte una de las mejores semanas de buceo del mundo.",
    sites: [
      {
        name: "Thistlegorm",
        image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
        alt: "Motocicleta BSA dentro del pecio SS Thistlegorm en el Mar Rojo",
        depth: "14-30m",
        highlight: "El pecio icónico del Mar Rojo",
      },
      {
        name: "Abu Nuhas",
        image: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
        alt: "Proa de pecio hundido en Abu Nuhas, cementerio de barcos del Mar Rojo",
        depth: "10-27m",
        highlight: "Cementerio de barcos y ruta clásica",
      },
      {
        name: "Ras Mohammed",
        image: "/images/underwater/underwater-coral-reef-anthias-fish.jpg",
        alt: "Arrecife de coral con peces anthias en Ras Mohammed, Mar Rojo",
        depth: "5-40m",
        highlight: "Arrecifes, paredes y vida marina",
      },
      {
        name: "Dunraven",
        image: "/images/underwater/underwater-blue-spotted-stingray.jpg",
        alt: "Raya de puntos azules en el pecio Dunraven del Mar Rojo",
        depth: "5-28m",
        highlight: "Pecio histórico ideal para enriquecer la semana",
      },
    ],
  },

  journeyOverview: {
    eyebrow: "CÓMO ES EL VIAJE",
    title: "Una semana de vida a bordo pensada para bucear mucho y decidir con claridad",
    subtitle:
      "Así es una semana típica a bordo del M/Y Dolce Vita: inmersiones, vida a bordo y todo lo que necesitas saber antes de reservar.",
    highlights: [
      "7 noches a bordo del M/Y Dolce Vita (40m, 12 camarotes, 24 buceadores)",
      "16-18 inmersiones en pecios legendarios y arrecifes",
      "Salida desde Hurghada, traslados incluidos",
    ],
    includesTitle: "Qué espera el usuario cuando reserva este viaje",
    includes: [
      "Pensión completa con refrescos, té, café y 2 cervezas/día",
      "Advanced SSI + 4 especialidades + seminarios gratuitos a bordo",
      "Botella 12L, plomos y Nitrox (28%) incluidos",
    ],
    fitTitle: "Cómo presentamos el Advanced dentro del viaje",
    fitItems: [
      "No como mensaje principal de la homepage",
      "Sí como valor añadido para quien quiere progresar durante la semana",
      "Sin contaminar la intención principal de vida a bordo + Ruta Norte",
    ],
    note:
      "Consulta fechas y disponibilidad a través del formulario. Te orientamos según tu nivel y preferencias.",
  },

  programSection: {
    title: "Programa del viaje",
    subtitle: "Bloque legado mantenido por compatibilidad de datos",
    includes: [
      "7 noches de vida a bordo en el M/Y Dolce Vita",
      "16-18 inmersiones con guías profesionales",
      "Pensión completa, refrescos, té y café",
      "Advanced Open Water SSI gratuito a bordo",
      "4 especialidades SSI incluidas",
      "Nitrox (28%) incluido",
      "Traslados aeropuerto-barco-aeropuerto",
      "Seguro de viaje",
    ],
    price: {
      amount: "Desde 1.190 EUR",
      badge: "MEJOR PRECIO",
      perPerson: "por persona",
      highlight: "Advanced SSI + 4 especialidades + Nitrox incluidos",
    },
  },

  audienceFit: {
    title: "Esta experiencia encaja contigo si...",
    subtitle:
      "Queremos que encuentres el viaje adecuado para ti. Mira si tu perfil encaja con lo que ofrece esta ruta.",
    profiles: [
      {
        title: "Quieres tu primer liveaboard potente",
        description:
          "Si ya buceas y buscas una semana con spots icónicos, esta ruta funciona muy bien como entrada seria al Mar Rojo.",
        tone: "good-fit",
      },
      {
        title: "Eres Open Water y quieres progresar",
        description:
          "La experiencia puede encajar si tu objetivo es dar el salto con criterio y aprovechar la opción de Advanced a bordo como valor adicional.",
        tone: "consider",
      },
      {
        title: "Solo buscas un curso sin foco en viaje",
        description:
          "Entonces esta homepage no debe venderte una promesa equivocada. Aquí el producto principal es la ruta de vida a bordo, no un curso aislado.",
        tone: "not-now",
      },
    ],
  },

  specSection: {
    sectionLabel: "EXPERIENCIA DE VIAJE",
    bigCard: {
      image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
      alt: "Motocicleta BSA dentro del pecio SS Thistlegorm en el Mar Rojo",
      title: "Ruta Norte y Pecios",
      subtitle: "7 noches desde 1.190 EUR | Advanced + 4 especialidades SSI gratis",
    },
    specialtyCards: [
      {
        type: "depth",
        image: "/images/boat/boat-aerial-anchored-reef.jpg",
        alt: "Vista aérea del M/Y Dolce Vita anclado en arrecife del Mar Rojo",
        label: "RUTA",
        value: "7D",
        description: "Semana tipo de vida a bordo con foco comercial claro",
      },
      {
        type: "nitrox",
        image: "/images/deck/deck-dive-station-gear-rack.jpg",
        alt: "Cubierta de buceo del M/Y Dolce Vita con equipo preparado",
        title: "Advanced a bordo",
        description: "Valor adicional para quien quiere aprovechar más la semana",
      },
    ],
    mainTitle: "La Ruta Norte como experiencia completa",
    navCards: [
      {
        type: "icon",
        image: "/images/deck/deck-aft-lounge-divers-fleet-flag.jpg",
        alt: "Cubierta de popa del M/Y Dolce Vita con bandera de flota de buceo",
        icon: "🧭",
        title: "Ruta clara",
        description: "Mensaje alineado con Hurghada, pecios y vida a bordo",
      },
      {
        type: "image",
        image: "/images/deck/sundeck-loungers-glass-railing.jpg",
        alt: "Solarium del M/Y Dolce Vita con tumbonas y barandilla de cristal",
        title: "Menos ambigüedad",
        description: "La home deja de parecer una landing de curso genérica",
      },
      {
        type: "stat",
        image: "/images/underwater/underwater-hammerhead-sharks-pair.jpg",
        alt: "Pareja de tiburones martillo en aguas del Mar Rojo",
        number: "4",
        label: "Bloques que preparan la conversión",
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
      "Déjanos tus datos y te contactaremos con información personalizada sobre la ruta.",
    fields: [
      ...baseLeadFields,
      {
        name: "message",
        type: "textarea",
        placeholder: "¿Tienes alguna duda concreta? (opcional)",
        required: false,
      },
    ],
    submitButton: "Quiero más información",
    privacyText: "",
    successMessage: "Gracias. Te escribiremos con más detalles de la ruta.",
    consentText: "Acepto recibir ofertas y novedades sobre viajes de buceo por WhatsApp de buceoenelmarrojo.com. Puedo darme de baja en cualquier momento.",
    privacyLinkText: "Política de privacidad",
    privacyLinkHref: "/politica-de-privacidad",
  },

  inlineLead: {
    sectionId: "inline-lead",
    eyebrow: "CONSULTA EL VIAJE",
    title: "Recibe información de la Ruta Norte y Pecios",
    subtitle:
      "Rellena el formulario y te contactaremos para resolver tus dudas sobre la ruta, fechas y disponibilidad.",
    highlights: [
      "Te orientamos según tu nivel de buceo",
      "Te contamos si esta ruta es adecuada para ti",
      "Te guiamos hacia la landing o detalle adecuado después",
    ],
    fields: [...baseLeadFields],
    submitButton: "Recibir información del viaje",
    privacyText: "",
    successMessage: "Gracias. Te contactaremos para orientarte sobre la ruta.",
    consentText: "Acepto recibir ofertas y novedades sobre viajes de buceo por WhatsApp de buceoenelmarrojo.com. Puedo darme de baja en cualquier momento.",
    privacyLinkText: "Política de privacidad",
    privacyLinkHref: "/politica-de-privacidad",
  },

  routeTeaser: {
    eyebrow: "SIGUIENTE PASO",
    title: "Descubre el itinerario completo de la Ruta Norte",
    description:
      "Itinerario día a día, requisitos, spots detallados, logística y todo lo que necesitas para decidir si esta ruta es para ti.",
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
    description: "Salida desde Hurghada, spots icónicos y una propuesta clara.",
    primaryCTA: {
      text: "Consultar viaje",
      href: "#inline-lead",
      actionType: "scroll",
      target: "inline-lead",
    },
  },
}
