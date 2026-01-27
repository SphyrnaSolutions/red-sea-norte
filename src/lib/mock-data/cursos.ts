import { CursoData } from "./types"
import { images } from "@/lib/constants/images"
import { colors } from "@/lib/constants/colors"

export const cursosData: Record<string, CursoData> = {
  "advanced-open-water": {
    slug: "advanced-open-water",
    title: "SSI Advanced Open Water Diver",
    badge: "CERTIFICACIÓN SSI",
    hero: {
      image: images.heroAdvancedOW,
      title: "Advanced Open Water Diver",
      subtitle: "Lleva tus habilidades de buceo al siguiente nivel con certificación internacional SSI",
    },
    infoBars: [
      {
        label: "Duración",
        value: "3-4 Días",
        color: colors.primaryBlue,
      },
      {
        label: "Inmersiones",
        value: "5 Inmersiones",
        color: colors.primaryOrange,
      },
      {
        label: "Precio",
        value: "€450",
        color: colors.secondaryCyan,
      },
    ],
    queAprendes: {
      title: "Qué Aprenderás",
      items: [
        {
          icon: "Anchor",
          title: "Buceo Profundo",
          description: "Técnicas para inmersiones hasta 30 metros de profundidad con gestión de nitrógeno",
        },
        {
          icon: "Compass",
          title: "Navegación Submarina",
          description: "Uso de brújula y navegación natural para orientarte bajo el agua",
        },
        {
          icon: "Fish",
          title: "Identificación de Vida Marina",
          description: "Reconoce especies del Mar Rojo y aprende sobre ecosistemas marinos",
        },
      ],
    },
    modulos: {
      title: "Los 5 Módulos del Curso",
      items: [
        {
          number: 1,
          title: "Buceo Profundo",
          description: "Aprende a planificar y ejecutar inmersiones hasta 30m con seguridad",
        },
        {
          number: 2,
          title: "Navegación",
          description: "Domina la brújula y la navegación natural submarina",
        },
        {
          number: 3,
          title: "Flotabilidad Perfecta",
          description: "Controla tu posición en el agua con precisión milimétrica",
        },
        {
          number: 4,
          title: "Buceo Nocturno",
          description: "Descubre el arrecife de noche con técnicas especializadas",
        },
        {
          number: 5,
          title: "Pecios",
          description: "Explora pecios históricos con técnicas de penetración básicas",
        },
      ],
    },
    requisitos: {
      title: "Requisitos",
      intro: "Para inscribirte en el curso Advanced Open Water necesitas:",
      items: [
        "Certificación Open Water Diver (SSI, PADI o equivalente)",
        "Mínimo 12 años de edad",
        "Aptitud física para buceo (certificado médico si es necesario)",
        "Saber nadar con comodidad",
        "Tener al menos 12 inmersiones registradas (recomendado)",
      ],
    },
    incluye: {
      title: "Qué Incluye el Curso",
      items: [
        { icon: "Book", title: "Material didáctico digital SSI" },
        { icon: "Waves", title: "5 inmersiones con instructor" },
        { icon: "Award", title: "Certificación digital SSI" },
        { icon: "Package", title: "Equipamiento completo" },
        { icon: "Ship", title: "Transporte en barco" },
        { icon: "Camera", title: "Fotos y vídeos subacuáticos" },
      ],
    },
    cta: {
      title: "Reserva Tu Curso Advanced Open Water",
      description: "Plazas limitadas. Comienza tu aventura submarina profesional hoy mismo.",
      primaryCTA: {
        text: "Reservar Ahora",
        href: "/contacto",
        variant: "gradient",
      },
      secondaryCTA: {
        text: "Más Información",
        href: "/contacto",
        variant: "outline",
      },
    },
  },
}

export const getCurso = (slug: string): CursoData | undefined => {
  return cursosData[slug]
}
