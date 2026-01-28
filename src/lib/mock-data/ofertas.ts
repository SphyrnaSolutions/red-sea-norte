import { OfertaData } from './types'

const ofertas: Record<string, OfertaData> = {
  'early-bird': {
    slug: 'early-bird',
    badge: 'OFERTA LIMITADA',
    hero: {
      backgroundImage: 'https://images.unsplash.com/photo-1622070978659-2a27e7cb254c?w=1920&q=80',
      badge: 'AHORRA 200€',
      title: 'Oferta Early Bird - Mar Rojo Norte',
      subtitle: 'Consigue tu Advanced SSI + 7 días liveaboard al mejor precio del año',
      primaryCTA: { text: 'Reservar Ahora', href: '#reserva', variant: 'primary' as const },
      secondaryCTA: { text: 'Ver Itinerario', href: '#itinerario', variant: 'outline' as const },
    },
    urgencia: {
      countdownTo: '2026-03-15T23:59:59',
      plazasDisponibles: 8,
      personasViendo: 23,
    },
    precio: {
      original: 1495,
      descuento: 200,
      actual: 1295,
      moneda: '€',
    },
    beneficios: [
      '5 inmersiones de especialidad certificadas',
      'Curso Deep Dive hasta 30 metros',
      'Certificación Nitrox incluida',
      'Navegación y flotabilidad perfecta',
      'Thistlegorm y otros pecios legendarios',
      'Equipo completo de buceo profesional',
      'Instructores SSI certificados',
      'Material didáctico digital',
    ],
    testimonios: [
      {
        name: 'María González',
        text: 'La mejor experiencia de buceo de mi vida. Los instructores son increíbles y los pecios del Mar Rojo son espectaculares.',
        avatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
      },
    ],
    cta: {
      title: '¿Listo para la Aventura?',
      description: 'Plazas limitadas - Reserva tu plaza ahora',
      primaryCTA: { text: 'Reservar Plaza →', href: '#reserva', variant: 'primary' as const },
    },
  },
}

export function getOferta(slug: string): OfertaData | null {
  return ofertas[slug] || null
}

export function getAllOfertaSlugs(): string[] {
  return Object.keys(ofertas)
}
