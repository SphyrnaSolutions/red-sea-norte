export const homepageData = {
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1649809014061-5f0f5d894e0d?w=1920&q=80",
    badge: {
      text: "CERTIFICACIÓN SSI 2026",
      backgroundColor: "#00CED144",
    },
    title: "Lleva Tu Buceo al Siguiente Nivel en el Mar Rojo",
    subtitle: "Consigue tu Advanced SSI en uno de los destinos de buceo más espectaculares del mundo. Pecios legendarios, arrecifes vibrantes y vida marina increíble.",
    ctas: [
      { text: "Ver Programa", variant: "primary" as const },
      { text: "Consultar Fechas", variant: "outline" as const },
    ],
    trustLine: "✓ Instructores certificados SSI  •  ✓ Grupos pequeños  •  ✓ Equipo profesional incluido",
  },

  whySection: {
    title: "Por Qué Conseguir tu Advanced SSI Aquí",
    subtitle: "El Mar Rojo ofrece las condiciones perfectas para elevar tus habilidades de buceo",
    topRow: [
      {
        type: "image-large" as const,
        image: "https://images.unsplash.com/photo-1758968523032-110415132be0?w=1200&q=80",
        title: "Bucea en el Thistlegorm",
        description: "Uno de los pecios más famosos del mundo"
      },
      {
        type: "conditions-image" as const,
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&q=80",
        badge: "TODO EL AÑO",
        title: "Condiciones Perfectas",
        highlight: "+30m visibilidad • 24-28°C"
      }
    ],
    bottomRow: [
      {
        type: "certification" as const,
        icon: "✓",
        title: "Certificación SSI",
        subtitle: "Reconocida mundialmente"
      },
      {
        type: "image-small" as const,
        image: "https://images.unsplash.com/photo-1762717563074-23757e64cb0e?w=800&q=80",
        badge: "BIODIVERSIDAD",
        title: "1000+ especies marinas"
      },
      {
        type: "equipment" as const,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        badge: "TODO INCLUIDO",
        title: "Equipo Profesional"
      }
    ]
  },

  diveSites: {
    title: "Puntos de Inmersión",
    subtitle: "Descubre los mejores spots de buceo del Mar Rojo Norte",
    sites: [
      {
        name: "Thistlegorm",
        image: "https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=800&q=80",
        depth: "16-32m",
        highlight: "Pecio legendario WWII"
      },
      {
        name: "Abu Nuhas",
        image: "https://images.unsplash.com/photo-1649809014061-5f0f5d894e0d?w=800&q=80",
        depth: "4-26m",
        highlight: "Cementerio de barcos"
      },
      {
        name: "Ras Mohammed",
        image: "https://images.unsplash.com/photo-1758968523032-110415132be0?w=800&q=80",
        depth: "10-35m",
        highlight: "Paredes verticales"
      },
      {
        name: "Dunraven",
        image: "https://images.unsplash.com/photo-1762717563074-23757e64cb0e?w=800&q=80",
        depth: "18-28m",
        highlight: "Pecio histórico 1876"
      }
    ]
  },

  programSection: {
    title: "Programa Advanced SSI",
    subtitle: "Todo incluido para tu certificación",
    includes: [
      "5 inmersiones de especialidad certificadas",
      "Curso Deep Dive hasta 30 metros",
      "Certificación Nitrox incluida",
      "Navegación y flotabilidad perfecta",
      "Thistlegorm y otros pecios legendarios",
      "Equipo completo de buceo profesional",
      "Instructores SSI certificados",
      "Material didáctico digital"
    ],
    price: {
      amount: "1,295€",
      badge: "OFERTA ESPECIAL",
      perPerson: "por persona",
      highlight: "Ahorra 200€ - Plazas limitadas"
    }
  },

  specSection: {
    sectionLabel: "TU PROGRAMA ADVANCED →",
    bigCard: {
      image: "https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=1920&q=80",
      title: "Pecios del Mar Rojo",
      subtitle: "Thistlegorm, Dunraven, Abu Nuhas"
    },
    specialtyCards: [
      {
        type: "depth" as const,
        image: "https://images.unsplash.com/photo-1680197116011-5d2a49060f24?w=1080&q=80",
        label: "PROFUNDO",
        value: "30m",
        description: "Alcanza nuevas profundidades"
      },
      {
        type: "nitrox" as const,
        image: "https://images.unsplash.com/photo-1553602455-f00e641c03c0?w=1080&q=80",
        title: "Nitrox",
        description: "Más tiempo en el fondo con aire enriquecido"
      }
    ],
    mainTitle: "Navegación + Flotabilidad Perfecta",
    navCards: [
      {
        type: "icon" as const,
        image: "https://images.unsplash.com/photo-1573691257226-667997763983?w=1080&q=80",
        icon: "🧭",
        title: "Brújula",
        description: "Navegación precisa en corrientes"
      },
      {
        type: "image" as const,
        image: "https://images.unsplash.com/photo-1726088828431-30b5b70411c5?w=1920&q=80",
        title: "Control Total",
        description: "Protege los arrecifes con flotabilidad perfecta"
      },
      {
        type: "stat" as const,
        image: "https://images.unsplash.com/photo-1637308113747-a4b60a2f7f52?w=1080&q=80",
        number: "5",
        label: "Inmersiones de especialidad",
        sublabel: "4-5 días"
      }
    ],
    cta: {
      price: "Desde 1.200€",
      details: "Certificación completa • Equipo • 7 días liveaboard",
      buttonText: "Ver Paquetes →"
    }
  },

  leadForm: {
    title: "¿Listo para Bucear?",
    subtitle: "Déjanos tus datos y te enviamos toda la información del viaje",
    fields: [
      {
        name: "name",
        type: "text" as const,
        placeholder: "Tu nombre",
        required: true,
      },
      {
        name: "email",
        type: "email" as const,
        placeholder: "Tu email",
        required: true,
      },
      {
        name: "phone",
        type: "tel" as const,
        placeholder: "Tu teléfono (opcional)",
        required: false,
      },
      {
        name: "certificationLevel",
        type: "select" as const,
        placeholder: "Nivel de certificación",
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
        name: "message",
        type: "textarea" as const,
        placeholder: "¿Alguna pregunta? (opcional)",
        required: false,
      },
    ],
    submitButton: "Enviar Consulta",
    privacyText: "Al enviar, aceptas nuestra política de privacidad",
    successMessage: "¡Gracias! Te contactaremos pronto.",
  },
}
