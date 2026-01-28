import { ExperienciaData } from "./types"

export const experienciasData: Record<string, ExperienciaData> = {
  "pecios-segunda-guerra-mundial": {
    slug: "pecios-segunda-guerra-mundial",
    title: "Pecios de la Segunda Guerra Mundial",
    description: "Bucea en los pecios más famosos del Mar Rojo. Historia viva bajo el agua a 30-50 metros de profundidad.",
    hero: {
      backgroundImage: "https://images.unsplash.com/photo-1769007168623-ba1a417c3114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI2NDN8&ixlib=rb-4.1.0&q=80&w=1080",
      title: "TOCA\nHISTORIA",
      subtitle: "Pecios de la Segunda Guerra Mundial • 30-50m",
    },
    sections: [
      // Year Section - 1941
      {
        type: "year",
        id: "year-1941",
        value: {
          year: "1941",
          title: "BOMBARDEADO\nEN EL MAR ROJO",
          description: "El SS Thistlegorm fue hundido por bombarderos alemanes mientras transportaba suministros militares para las fuerzas británicas en África. Hoy yace intacto a 30 metros de profundidad.",
          image: "https://images.unsplash.com/photo-1766502715596-d5fe6d94123b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI3ODl8&ixlib=rb-4.1.0&q=80&w=1080",
          backgroundColor: "#0D3A5D",
        },
      },

      // Split Immersive - 30 metros
      {
        type: "split_immersive",
        id: "split-30m",
        value: {
          layout: "image-left",
          image: "https://images.unsplash.com/photo-1645792243445-9c10fa8deb3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI2NDR8&ixlib=rb-4.1.0&q=80&w=1080",
          title: "30 metros.\nOscuridad.\nHistoria.",
          content: "No es solo un pecio. Es un museo bajo el agua. Entras por bodegas de carga, ves motocicletas BSA de 1941, pasas entre proyectiles sin explotar.\n\nLos peces loro duermen en los camarotes. Las morenas viven en las cocinas.",
          ctaButton: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
          backgroundColor: "#000000",
        },
      },

      // Image Grid - Pecios
      {
        type: "image_grid",
        id: "grid-pecios",
        value: {
          layout: "1-large-2-small",
          images: [
            {
              url: "https://images.unsplash.com/photo-1768851720385-dabc5e25cb9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI2ODJ8&ixlib=rb-4.1.0&q=80&w=1080",
              alt: "Interior del SS Thistlegorm",
              overlay: {
                title: "SS Thistlegorm",
                description: "El pecio más famoso del Mar Rojo",
              },
            },
            {
              url: "https://images.unsplash.com/photo-1632505535813-b052662e9560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI2ODN8&ixlib=rb-4.1.0&q=80&w=1080",
              alt: "Rosalie Moller",
              overlay: {
                title: "Rosalie Moller",
                description: "Hundido días antes que el Thistlegorm",
              },
            },
            {
              url: "https://images.unsplash.com/photo-1674801664581-b431ab58fe83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI2ODN8&ixlib=rb-4.1.0&q=80&w=1080",
              alt: "Dunraven",
              overlay: {
                title: "Dunraven",
                description: "Pecio del siglo XIX",
              },
            },
          ],
        },
      },

      // Depth Section - 50 metros
      {
        type: "depth",
        id: "depth-50m",
        value: {
          depth: 50,
          unit: "METROS",
          subtitle: "Donde los recreativos no llegan",
          image: "https://images.unsplash.com/photo-1619324221911-f3695259df01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI3OTB8&ixlib=rb-4.1.0&q=80&w=1080",
          overlayGradient: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(255,107,53,0.9) 100%)",
        },
      },

      // Requirements Section
      {
        type: "requirements",
        id: "req-advanced",
        value: {
          title: "ADVANCED + NITROX",
          subtitle: "Es todo lo que necesitas para bucear los pecios más famosos del mundo",
          backgroundColor: "#000000",
        },
      },

      // CTA Final
      {
        type: "text_overlay_full",
        id: "cta-final",
        value: {
          image: "https://images.unsplash.com/photo-1605456739713-25e87d4a23c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzI2ODR8&ixlib=rb-4.1.0&q=80&w=1080",
          title: "7 DÍAS BUCEANDO HISTORIA",
          subtitle: "Desde 1.400€ • Incluye Advanced Open Water",
          alignment: "center",
          overlayGradient: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)",
          ctaButton: {
            text: "Reservar Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
    primaryRoute: "norte-7-dias",
    alternativeRoutes: [],
    leadForm: {
      title: "Reserva tu Plaza en Pecios BOLD",
      subtitle: "Déjanos tus datos y te enviamos toda la información sobre buceo en pecios de la Segunda Guerra Mundial",
      fields: [
        {
          name: "name",
          type: "text",
          placeholder: "Tu nombre completo",
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
          placeholder: "Tu teléfono (opcional)",
          required: false,
        },
        {
          name: "certificationLevel",
          type: "select",
          placeholder: "Nivel de certificación",
          required: true,
          options: [
            { value: "open-water", label: "Open Water" },
            { value: "advanced", label: "Advanced Open Water" },
            { value: "rescue", label: "Rescue Diver" },
            { value: "divemaster", label: "Divemaster" },
            { value: "instructor", label: "Instructor" },
            { value: "none", label: "Sin certificación (quiero hacer curso)" },
          ],
        },
        {
          name: "experience",
          type: "select",
          placeholder: "Número de inmersiones aproximadas",
          required: false,
          options: [
            { value: "0-10", label: "0-10 inmersiones" },
            { value: "10-50", label: "10-50 inmersiones" },
            { value: "50-100", label: "50-100 inmersiones" },
            { value: "100-500", label: "100-500 inmersiones" },
            { value: "500+", label: "500+ inmersiones" },
          ],
        },
        {
          name: "message",
          type: "textarea",
          placeholder: "¿Alguna pregunta o comentario? (opcional)",
          required: false,
        },
      ],
      submitButton: "Solicitar Información",
      privacyText: "Al enviar este formulario aceptas nuestra política de privacidad. Nunca compartiremos tus datos con terceros.",
      successMessage: "¡Solicitud enviada con éxito!",
    },
    seo: {
      metaTitle: "Buceo en Pecios WWII - Mar Rojo | Red Sea Diving",
      metaDescription: "Explora los pecios más famosos de la Segunda Guerra Mundial en el Mar Rojo. SS Thistlegorm, Rosalie Moller y más. Desde 1.400€ con Advanced incluido.",
      keywords: [
        "buceo pecios mar rojo",
        "ss thistlegorm",
        "pecios segunda guerra mundial",
        "buceo profundo mar rojo",
        "advanced open water",
        "buceo técnico egipto",
      ],
    },
  },
}

export const getExperiencia = (slug: string): ExperienciaData | undefined => {
  return experienciasData[slug]
}

export const getAllExperiencias = (): ExperienciaData[] => {
  return Object.values(experienciasData)
}
