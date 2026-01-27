import { RutaData } from "./types"
import { images } from "@/lib/constants/images"

export const rutasData: Record<string, RutaData> = {
  "norte-7-dias": {
    slug: "norte-7-dias",
    title: "Ruta Norte 7 Días",
    hero: {
      backgroundImage: images.heroRutaNorte,
      badge: "RUTA PREMIUM",
      title: "Ruta Norte 7 Días: Lo Mejor del Mar Rojo",
      subtitle: "Explora los mejores pecios y arrecifes del Mar Rojo Norte en 7 días inolvidables",
      primaryCTA: {
        text: "Reservar Ruta",
        href: "/contacto",
        variant: "gradient",
      },
      secondaryCTA: {
        text: "Descargar Itinerario",
        href: "/downloads/ruta-norte.pdf",
        variant: "outline",
      },
      trustLine: [
        "18-22 inmersiones incluidas",
        "SS Thistlegorm incluido",
        "Grupos reducidos máx. 12 personas",
      ],
    },
    infoCards: [
      {
        icon: "Calendar",
        value: "7 Días",
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
        icon: "DollarSign",
        value: "€950",
        label: "Precio",
        color: "cyan",
      },
    ],
    itinerary: {
      title: "Itinerario Día a Día",
      days: [
        {
          day: 1,
          title: "Embarque y Ras Mohammed",
          description: "Salida desde Hurghada. Primera inmersión en el Parque Nacional Ras Mohammed.",
          dives: ["Shark & Yolanda Reef", "Ras Mohammed Wall"],
          highlights: ["Check-in", "2 inmersiones", "Navegación nocturna"],
        },
        {
          day: 2,
          title: "SS Thistlegorm",
          description: "Día completo dedicado al pecio más famoso del Mar Rojo.",
          dives: ["SS Thistlegorm (2 inmersiones)", "Sha'ab Ali"],
          highlights: ["Inmersión en pecio", "Fotografía submarina", "Historia WWII"],
        },
        {
          day: 3,
          title: "Pecios del Norte",
          description: "Exploración de pecios históricos: Rosalie Moller y Dunraven.",
          dives: ["Rosalie Moller", "Dunraven", "Alternatives Reef"],
          highlights: ["3 inmersiones", "Pecios profundos", "Vida marina"],
        },
        {
          day: 4,
          title: "Estrecho de Tiran",
          description: "Inmersiones en los famosos arrecifes del Estrecho de Tiran.",
          dives: ["Jackson Reef", "Woodhouse Reef", "Thomas Reef"],
          highlights: ["Corrientes", "Tiburones", "Arrecifes prístinos"],
        },
        {
          day: 5,
          title: "Abu Nuhas - Cementerio de Barcos",
          description: "Cuatro pecios en un solo día: Giannis D, Carnatic, Chrisoula K y Kimon M.",
          dives: ["Giannis D", "Carnatic", "Chrisoula K"],
          highlights: ["4 pecios", "Fotografía", "Historia marítima"],
        },
        {
          day: 6,
          title: "Gubal Island",
          description: "Arrecifes y pecios de Gubal Island con vida marina abundante.",
          dives: ["Bluff Point", "Shaab Abu Nuhas", "Ulysses Reef"],
          highlights: ["Vida marina", "Arrecifes", "Relax"],
        },
        {
          day: 7,
          title: "Regreso a Hurghada",
          description: "Última inmersión matutina y desembarque.",
          dives: ["Shaab el Erg (inmersión final)"],
          highlights: ["Check-out", "Despedida", "Certificados"],
        },
      ],
    },
    incluye: {
      title: "Qué Incluye",
      items: [
        "7 días / 6 noches en liveaboard",
        "18-22 inmersiones con guía",
        "Pensión completa (desayuno, almuerzo, cena, snacks)",
        "Equipamiento de buceo completo",
        "Botellas y plomos",
        "Guía de buceo profesional",
        "Seguro de buceo básico",
        "Toallas y amenidades",
        "Nitrox disponible (suplemento)",
      ],
    },
    cta: {
      title: "Reserva Tu Plaza en la Ruta Norte",
      description: "Plazas limitadas. Esta ruta se completa rápido cada temporada.",
      primaryCTA: {
        text: "Reservar Ahora",
        href: "/contacto",
        variant: "gradient",
      },
      secondaryCTA: {
        text: "Ver Calendario",
        href: "/calendario",
        variant: "outline",
      },
    },
  },
}

export const getRuta = (slug: string): RutaData | undefined => {
  return rutasData[slug]
}
