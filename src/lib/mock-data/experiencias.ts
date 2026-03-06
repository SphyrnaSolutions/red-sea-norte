import { ExperienciaData } from "./types"

export const experienciasData: Record<string, ExperienciaData> = {
  "pecios-segunda-guerra-mundial": {
    slug: "pecios-segunda-guerra-mundial",
    title: "Pecios de la Segunda Guerra Mundial",
    description: "Bucea en los pecios más famosos del Mar Rojo. Historia viva bajo el agua a 30-50 metros de profundidad.",
    hero: {
      backgroundImage: "/images/wrecks/underwater-wreck-bow-shipwreck.jpg",
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
          image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
          backgroundColor: "#0D3A5D",
        },
      },

      // Split Immersive - 30 metros
      {
        type: "split_immersive",
        id: "split-30m",
        value: {
          layout: "image-left",
          image: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
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
              url: "/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg",
              alt: "Motocicleta BSA dentro del pecio SS Thistlegorm en el Mar Rojo",
              overlay: {
                title: "SS Thistlegorm",
                description: "El pecio más famoso del Mar Rojo",
              },
            },
            {
              url: "/images/underwater/underwater-oceanic-whitetip-shark-pilotfish.jpg",
              alt: "Tiburon oceanic whitetip con peces piloto en el Mar Rojo",
              overlay: {
                title: "Rosalie Moller",
                description: "Hundido días antes que el Thistlegorm",
              },
            },
            {
              url: "/images/underwater/underwater-blue-spotted-stingray.jpg",
              alt: "Raya de puntos azules en el pecio Dunraven del Mar Rojo",
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
          image: "/images/underwater/underwater-diver-pink-soft-coral.jpg",
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
          image: "/images/underwater/underwater-hammerhead-sharks-pair.jpg",
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
