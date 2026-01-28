import { BlogPost, BlogListingData } from "./types"
import { images } from "@/lib/constants/images"

export const blogPosts: BlogPost[] = [
  {
    slug: "ss-thistlegorm-guia-completa",
    title: "SS Thistlegorm: Guía Completa del Mejor Pecio del Mar Rojo",
    excerpt: "Descubre la historia y los secretos del pecio más famoso del mundo. Guía completa para buceadores de todos los niveles.",
    publishedAt: "2026-01-15",
    readTime: "8 min",
    author: {
      name: "Carlos Martínez",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    hero: {
      image: images.thistlegorm,
      alt: "SS Thistlegorm Wreck",
    },
    category: {
      name: "Pecios",
      color: "#FF6B35",
    },
    body: [
      {
        type: "rich_text",
        id: "1",
        value: {
          content: "<p>El SS Thistlegorm es sin duda el pecio más famoso del Mar Rojo y uno de los mejores del mundo. Hundido en 1941 durante la Segunda Guerra Mundial, este carguero británico yace a 30 metros de profundidad con su carga intacta.</p>",
        },
      },
      {
        type: "heading",
        id: "2",
        value: {
          level: 2,
          text: "Historia del SS Thistlegorm",
        },
      },
      {
        type: "rich_text",
        id: "3",
        value: {
          content: "<p>El Thistlegorm fue construido en 1940 en Sunderland, Inglaterra. Transportaba suministros militares para las fuerzas británicas en África cuando fue bombardeado por aviones alemanes el 6 de octubre de 1941.</p><p>La explosión partió el barco en dos, pero dejó intacta gran parte de su carga: motocicletas BSA, camiones Bedford, rifles, municiones y hasta dos locomotoras.</p>",
        },
      },
      {
        type: "image",
        id: "4",
        value: {
          url: images.thistlegorm,
          caption: "Vista del casco del SS Thistlegorm a 30 metros de profundidad",
          alt: "SS Thistlegorm wreck underwater",
        },
      },
      {
        type: "heading",
        id: "5",
        value: {
          level: 2,
          text: "Qué Ver en el Pecio",
        },
      },
      {
        type: "info_cards",
        id: "6",
        value: {
          cards: [
            {
              icon: "⚓",
              value: "30m",
              label: "Profundidad",
              color: "#0066CC",
            },
            {
              icon: "👁",
              value: "20-30m",
              label: "Visibilidad",
              color: "#FF6B35",
            },
            {
              icon: "🌡",
              value: "24-26°C",
              label: "Temperatura",
              color: "#3DABC2",
            },
          ],
        },
      },
      {
        type: "gallery",
        id: "6b",
        value: {
          images: [
            {
              url: images.thistlegorm,
              alt: "Vista del pecio Thistlegorm",
            },
            {
              url: images.rassMohammed,
              alt: "Arrecifes del Mar Rojo",
            },
            {
              url: images.safetyGuide,
              alt: "Buceadores explorando",
            },
          ],
        },
      },
      {
        type: "rich_text",
        id: "7",
        value: {
          content: "<p>Durante tu inmersión podrás explorar:</p><ul><li>Las bodegas de carga con motocicletas BSA Norton 16H</li><li>Los camiones Bedford todavía sobre sus soportes</li><li>Las locomotoras en la cubierta trasera</li><li>La cabina del capitán con objetos personales</li><li>El cañón antiaéreo en la proa</li></ul>",
        },
      },
      {
        type: "quote",
        id: "8",
        value: {
          text: "Bucear en el Thistlegorm es como viajar en el tiempo. Es una experiencia que todo buceador debe vivir al menos una vez.",
          author: "Jacques Cousteau",
          role: "Descubridor del pecio en 1956",
        },
      },
      {
        type: "heading",
        id: "9",
        value: {
          level: 2,
          text: "Consejos para tu Inmersión",
        },
      },
      {
        type: "two_column",
        id: "10",
        value: {
          leftColumn: {
            image: images.thistlegorm,
            alt: "Interior del pecio Thistlegorm",
          },
          rightColumn: {
            title: "La bodega de carga está llena de artefactos militares perfectamente preservados:",
            content: "<ul><li>• Motocicletas BSA en perfecto estado</li><li>• Camiones Bedford y locomotoras</li><li>• Munición sin explotar (¡no tocar!)</li><li>• Rifles Lee-Enfield en sus cajas originales</li></ul>",
          },
        },
      },
      {
        type: "cta",
        id: "11",
        value: {
          title: "¿Listo para explorar el Thistlegorm?",
          description: "Únete a nuestra ruta Norte de 7 días que incluye 2 inmersiones en este pecio legendario",
          primaryCTA: {
            text: "Ver Ruta Norte",
            href: "/rutas/norte-7-dias",
            variant: "gradient",
          },
        },
      },
    ],
  },
  {
    slug: "ras-mohammed-guia-completa",
    title: "Ras Mohammed: El Parque Nacional Submarino Más Espectacular",
    excerpt: "Explora uno de los mejores sitios de buceo del mundo con arrecifes de coral prístinos y vida marina abundante.",
    publishedAt: "2026-01-10",
    readTime: "6 min",
    author: {
      name: "Ana López",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    hero: {
      image: images.rassMohammed,
      alt: "Ras Mohammed reef",
    },
    category: {
      name: "Arrecifes",
      color: "#3DABC2",
    },
    body: [],
  },
  {
    slug: "seguridad-buceo-mar-rojo",
    title: "Guía de Seguridad para Bucear en el Mar Rojo",
    excerpt: "Todo lo que necesitas saber sobre seguridad, corrientes y vida marina en el Mar Rojo.",
    publishedAt: "2026-01-05",
    readTime: "10 min",
    author: {
      name: "Miguel Fernández",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    hero: {
      image: images.safetyGuide,
      alt: "Diving safety",
    },
    category: {
      name: "Seguridad",
      color: "#0066CC",
    },
    body: [],
  },
]

export const blogListingData: BlogListingData = {
  hero: {
    backgroundImage: images.heroBlogListing,
    title: "Blog de Buceo",
    subtitle: "Guías, consejos y experiencias del Mar Rojo",
  },
  featuredPost: blogPosts[0],
  posts: blogPosts,
}
