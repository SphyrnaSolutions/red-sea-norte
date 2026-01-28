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

export interface StoryIntro {
  badge: string
  title: string
  description: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  dives: string[]
  highlights: string[]
  image: string
  overlayDirection: "left" | "right"
}

export interface RutaData {
  slug: string
  title: string
  hero: HeroData
  storyIntro: StoryIntro
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
    backgroundImage?: string
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

/**
 * Experiencia Types
 */

// Section Types - combina bloques del blog + específicos de experiencias
export type ExperienciaSectionType =
  // Bloques reutilizables del blog
  | "rich_text"
  | "heading"
  | "image"
  | "quote"
  | "info_cards"
  | "gallery"
  | "two_column"
  | "cta"
  // Bloques específicos de experiencias
  | "year"
  | "split_immersive"
  | "depth"
  | "image_grid"
  | "requirements"
  | "text_overlay_full"

// Bloques específicos de experiencias (los del blog ya están definidos como Block)

export interface YearSection {
  type: "year"
  id: string
  value: {
    year: string
    title: string
    description: string
    image: string
    backgroundColor?: string
  }
}

export interface SplitImmersiveSection {
  type: "split_immersive"
  id: string
  value: {
    layout: "image-left" | "image-right"
    image: string
    title: string
    content: string
    ctaButton?: CTAButton
    backgroundColor?: string
  }
}

export interface DepthSection {
  type: "depth"
  id: string
  value: {
    depth: number
    unit: string
    subtitle: string
    image: string
    overlayGradient?: string
  }
}

export interface ImageGridSection {
  type: "image_grid"
  id: string
  value: {
    images: Array<{
      url: string
      alt: string
      overlay?: {
        title?: string
        description?: string
        cta?: CTAButton
      }
    }>
    layout: "1-large-2-small" | "2-columns" | "3-columns"
  }
}

export interface RequirementsSection {
  type: "requirements"
  id: string
  value: {
    title: string
    subtitle: string
    backgroundColor?: string
  }
}

export interface TextOverlayFullSection {
  type: "text_overlay_full"
  id: string
  value: {
    image: string
    title: string
    subtitle?: string
    alignment: "center" | "left" | "right"
    overlayGradient?: string
    ctaButton?: CTAButton
  }
}

// Union type para todas las secciones de experiencias
export type ExperienciaSection =
  | Block // Bloques del blog (rich_text, heading, image, quote, info_cards, gallery, two_column, cta)
  | YearSection
  | SplitImmersiveSection
  | DepthSection
  | ImageGridSection
  | RequirementsSection
  | TextOverlayFullSection

export interface ExperienciaData {
  slug: string
  title: string
  description: string
  hero: HeroData
  sections: ExperienciaSection[]
  // Relación con rutas
  primaryRoute: string
  alternativeRoutes?: string[]
  // Lead Form
  leadForm: {
    title: string
    subtitle: string
    fields: Array<{
      name: string
      type: "text" | "email" | "tel" | "select" | "textarea"
      placeholder: string
      required: boolean
      options?: Array<{ value: string; label: string }>
    }>
    submitButton: string
    privacyText: string
    successMessage: string
  }
  // SEO
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}
