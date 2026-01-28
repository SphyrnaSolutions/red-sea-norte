import { RutaData } from "./types"
import { images } from "@/lib/constants/images"

export const rutasData: Record<string, RutaData> = {
  "norte-7-dias": {
    slug: "norte-7-dias",
    title: "Ruta Norte 7 Días",
    hero: {
      backgroundImage: "https://images.unsplash.com/photo-1667852976428-3b6f59f0db4f?w=1600&h=900&fit=crop&q=80",
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
    storyIntro: {
      badge: "TU AVENTURA →",
      title: "7 Días que Cambiarán tu Forma de Bucear",
      description: "Esta no es una ruta cualquiera. Es la combinación perfecta de historia, adrenalina y naturaleza submarina. Desde el legendario SS Thistlegorm hasta los arrecifes prístinos del Estrecho de Tiran, cada inmersión es una experiencia única que quedará grabada en tu memoria para siempre.",
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
          title: "Ras Mohammed: El Mejor Primer Día",
          description: "Comenzamos fuerte en el Parque Nacional Ras Mohammed, hogar de algunos de los arrecifes más impresionantes del mundo. Shark Reef y Yolanda Reef te recibirán con paredes verticales, corrientes emocionantes y una vida marina explosiva.",
          dives: ["Shark Reef", "Yolanda Reef"],
          highlights: ["Check-in", "2 inmersiones", "Navegación nocturna"],
          image: "https://images.unsplash.com/photo-1530213446452-ab94043c4862?w=1600&h=900&fit=crop&q=80",
          overlayDirection: "left",
        },
        {
          day: 2,
          title: "SS Thistlegorm: Leyenda Viva",
          description: "El día que estabas esperando. Dos inmersiones en el pecio más famoso del mundo, hundido en 1941. Tanques Sherman, motocicletas BSA, rifles... es como bucear dentro de un museo de la Segunda Guerra Mundial.",
          dives: ["SS Thistlegorm (2 inmersiones)", "Sha'ab Ali"],
          highlights: ["Inmersión en pecio", "Fotografía submarina", "Historia WWII"],
          image: "https://images.unsplash.com/photo-1758792742999-1b954043f06c?w=1600&h=900&fit=crop&q=80",
          overlayDirection: "right",
        },
        {
          day: 3,
          title: "Rosalie Moller & Dunraven",
          description: "Continuamos la exploración de pecios históricos. Rosalie Moller, menos conocido pero igual de espectacular, y el Dunraven del siglo XIX. Cada pecio cuenta una historia diferente del Mar Rojo.",
          dives: ["Rosalie Moller", "Dunraven", "Alternatives Reef"],
          highlights: ["3 inmersiones", "Pecios profundos", "Vida marina"],
          image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600&h=900&fit=crop&q=80",
          overlayDirection: "left",
        },
        {
          day: 4,
          title: "Estrecho de Tiran: Corrientes y Tiburones",
          description: "Los arrecifes del Estrecho de Tiran son legendarios. Jackson, Woodhouse, Thomas... nombres que todo buceador conoce. Corrientes fuertes, tiburones grises, atunes gigantes y paredes cubiertas de coral blando.",
          dives: ["Jackson Reef", "Woodhouse Reef", "Thomas Reef"],
          highlights: ["Corrientes", "Tiburones", "Arrecifes prístinos"],
          image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=900&fit=crop&q=80",
          overlayDirection: "right",
        },
        {
          day: 5,
          title: "Abu Nuhas: Cementerio de Barcos",
          description: "Cuatro pecios en un solo día. Giannis D con su bodega abierta, Carnatic del 1869, Chrisoula K lleno de vida... Abu Nuhas es un parque temático para amantes de los pecios.",
          dives: ["Giannis D", "Carnatic", "Chrisoula K"],
          highlights: ["4 pecios", "Fotografía", "Historia marítima"],
          image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=1600&h=900&fit=crop&q=80",
          overlayDirection: "left",
        },
        {
          day: 6,
          title: "Gubal Island: Relax y Naturaleza",
          description: "Después de tanto pecio, toca disfrutar de los arrecifes vírgenes de Gubal. Jardines de coral, tortugas, napoleones... un día más relajado pero igual de espectacular.",
          dives: ["Bluff Point", "Shaab Abu Nuhas", "Ulysses Reef"],
          highlights: ["Vida marina", "Arrecifes", "Relax"],
          image: "https://images.unsplash.com/photo-1682687220499-d9c06c131190?w=1600&h=900&fit=crop&q=80",
          overlayDirection: "right",
        },
        {
          day: 7,
          title: "Última Inmersión y Despedida",
          description: "Una última inmersión matutina en Shaab el Erg para cerrar la semana con delfines si tenemos suerte. Check-out, despedidas y la promesa de volver pronto.",
          dives: ["Shaab el Erg (inmersión final)"],
          highlights: ["Check-out", "Despedida", "Certificados"],
          image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1600&h=900&fit=crop&q=80",
          overlayDirection: "left",
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
      backgroundImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&h=900&fit=crop&q=80",
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

export const getAllRutas = (): RutaData[] => {
  return Object.values(rutasData)
}
