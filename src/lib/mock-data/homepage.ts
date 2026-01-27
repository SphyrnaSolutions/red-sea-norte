import { images } from "@/lib/constants/images"

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
      { text: "Ver Programa", variant: "primary" },
      { text: "Consultar Fechas", variant: "outline" },
    ],
    trustLine: "✓ Instructores certificados SSI  •  ✓ Grupos pequeños  •  ✓ Equipo profesional incluido",
  },

  whySection: {
    title: "Por Qué Conseguir tu Advanced SSI Aquí",
    subtitle: "El Mar Rojo ofrece las condiciones perfectas para elevar tus habilidades de buceo",
    benefits: {
      topRow: [
        {
          type: "image-card",
          image: "https://images.unsplash.com/photo-1758968523032-110415132be0?w=1200&q=80",
          title: "Bucea en el Thistlegorm",
          description: "Explora uno de los pecios más famosos del mundo. Perfecto para tu especialidad de buceo en naufragios del Advanced.",
        },
        {
          type: "stats-card",
          badge: "TODO EL AÑO",
          title: "Visibilidad +30m",
          stats: [
            { number: "24-28°C", label: "Temperatura del agua" },
            { number: "0-2 nudos", label: "Corrientes suaves y predecibles" },
          ],
          backgroundColor: "#0D3A5D",
        },
      ],
      bottomRow: [
        {
          type: "info-card",
          icon: "✓",
          title: "Certificación SSI reconocida mundialmente",
          description: "Más de 15 años formando buceadores Advanced en el Mar Rojo. Instructores experimentados con miles de inmersiones.",
          cta: "Ver instructores →",
        },
        {
          type: "image-card-small",
          image: "https://images.unsplash.com/photo-1762717563074-23757e64cb0e?w=800&q=80",
          subtitle: "BIODIVERSIDAD ÚNICA",
          title: "1000+ especies marinas",
        },
        {
          type: "price-card",
          title: "Desde 1.200€",
          items: [
            "• Certificación SSI Advanced completa",
            "• 5 inmersiones de especialidad",
            "• Equipo completo incluido",
            "• 7 días / 6 noches vida a bordo",
          ],
          backgroundColor: "#F57415",
        },
      ],
    },
  },

  specSection: {
    intro: "TU PROGRAMA ADVANCED →",
    row1: {
      bigCard: {
        image: "https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=1200&q=80",
        title: "Pecios del Mar Rojo",
        subtitle: "Thistlegorm, Dunraven, Abu Nuhas",
      },
      sideCards: [
        {
          label: "PROFUNDO",
          number: "30m",
          description: "Alcanza nuevas profundidades",
          backgroundColor: "#3DABC2",
        },
        {
          title: "Nitrox",
          description: "Más tiempo en el fondo con aire enriquecido",
          backgroundColor: "#0D3A5D",
        },
      ],
    },
    bigText: "Navegación + Flotabilidad Perfecta",
    row2: [
      {
        type: "nav-card",
        title: "Brújula",
        description: "Navegación precisa en corrientes",
        icon: "🧭",
        backgroundColor: "#F57415",
        width: 380,
      },
      {
        type: "nav-image",
        image: "https://images.unsplash.com/photo-1726088828431-30b5b70411c5?w=1200&q=80",
        title: "Control Total",
        description: "Protege los arrecifes con flotabilidad perfecta",
      },
      {
        type: "nav-stat",
        number: "5",
        label: "Inmersiones de especialidad",
        subtitle: "4-5 días",
        backgroundColor: "#ECFDF5",
        borderColor: "#00CED1",
        width: 320,
      },
    ],
    cta: {
      title: "Empieza tu Advanced SSI",
      description: "Reserva tu plaza para la próxima salida",
      buttonText: "Ver Fechas",
    },
  },

  carouselSection: {
    label: "DONDE BUCEARÁS →",
    title: "Spots Legendarios",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1763136537699-14a835c8ffb1?w=1200&q=80",
        width: 1200,
      },
      {
        image: "https://images.unsplash.com/photo-1713754391992-a4c5eeee8f49?w=1200&q=80",
        width: 950,
      },
      {
        image: "https://images.unsplash.com/photo-1670544257964-82bdc0c9dc5a?w=1200&q=80",
        width: 1100,
      },
    ],
  },
}
