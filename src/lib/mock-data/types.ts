import { LucideIcon } from "lucide-react"

/**
 * Common Types
 */

export interface CTAButton {
  text: string
  href: string
  variant?: "primary" | "secondary" | "gradient" | "outline"
}

export interface HeroData {
  backgroundImage: string
  badge?: string
  title: string
  subtitle: string
  primaryCTA?: CTAButton
  secondaryCTA?: CTAButton
  trustLine?: string[]
}

/**
 * Homepage Types
 */

export interface FeatureCardData {
  image: string
  title: string
  description: string
  variant?: "large" | "small"
  href?: string
}

export interface StatsCardData {
  badge?: string
  stat: string
  label: string
  backgroundColor: string
}

export interface HomepageData {
  hero: HeroData
  whySection: {
    title: string
    subtitle: string
    cards: (FeatureCardData | StatsCardData)[]
  }
  ctaSection: {
    title: string
    description: string
    primaryCTA: CTAButton
  }
}

/**
 * Blog Types
 */

export interface Block {
  type: string
  id: string
  value: any
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author: {
    name: string
    avatar: string
  }
  hero: {
    image: string
    alt: string
  }
  body: Block[]
  category: {
    name: string
    color: string
  }
  readTime?: string
}

export interface BlogListingData {
  hero: HeroData
  featuredPost: BlogPost
  posts: BlogPost[]
}

/**
 * Curso Types
 */

export interface CursoData {
  slug: string
  title: string
  badge: string
  hero: {
    image: string
    title: string
    subtitle: string
  }
  infoBars: Array<{
    label: string
    value: string
    color: string
  }>
  queAprendes: {
    title: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  modulos: {
    title: string
    items: Array<{
      number: number
      title: string
      description: string
    }>
  }
  requisitos: {
    title: string
    intro: string
    items: string[]
  }
  incluye: {
    title: string
    items: Array<{
      icon: string
      title: string
    }>
  }
  cta: {
    title: string
    description: string
    primaryCTA: CTAButton
    secondaryCTA?: CTAButton
  }
}

/**
 * Ruta Types
 */

export interface ItineraryDay {
  day: number
  title: string
  description: string
  dives: string[]
  highlights: string[]
}

export interface RutaData {
  slug: string
  title: string
  hero: HeroData
  infoCards: Array<{
    icon: string
    value: string
    label: string
    color: "blue" | "orange" | "cyan"
  }>
  itinerary: {
    title: string
    days: ItineraryDay[]
  }
  incluye: {
    title: string
    items: string[]
  }
  cta: {
    title: string
    description: string
    primaryCTA: CTAButton
    secondaryCTA?: CTAButton
  }
}

/**
 * Landing/Oferta Types
 */

export interface OfertaData {
  slug: string
  badge: string
  hero: HeroData
  urgencia: {
    countdownTo: string
    plazasDisponibles: number
    personasViendo: number
  }
  precio: {
    original: number
    descuento: number
    actual: number
    moneda: string
  }
  beneficios: string[]
  testimonios: Array<{
    name: string
    text: string
    avatar: string
    rating: number
  }>
  cta: {
    title: string
    description: string
    primaryCTA: CTAButton
  }
}
