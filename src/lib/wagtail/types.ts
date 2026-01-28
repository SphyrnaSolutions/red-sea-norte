/**
 * Wagtail API Response Types
 *
 * Tipos que representan las respuestas de Wagtail API v2
 */

import { WagtailPage } from './client'

// ============================================================================
// Common Wagtail Types
// ============================================================================

export interface WagtailImage {
  id: number
  url: string
  width: number
  height: number
  alt?: string
}

export interface WagtailStreamFieldBlock {
  type: string
  value: any
  id: string
}

// ============================================================================
// HomePage (home.HomePage)
// ============================================================================

export interface WagtailHomePage extends WagtailPage {
  hero_background_image: WagtailImage
  hero_badge?: string
  hero_title: string
  hero_subtitle: string
  hero_primary_cta_text?: string
  hero_primary_cta_link?: string
  hero_secondary_cta_text?: string
  hero_secondary_cta_link?: string
  why_section_title: string
  why_section_subtitle: string
  why_section_cards: WagtailStreamFieldBlock[]
  cta_title: string
  cta_description: string
  cta_primary_text: string
  cta_primary_link: string
}

// ============================================================================
// BlogPostPage (blog.BlogPostPage)
// ============================================================================

export interface WagtailAuthor {
  id: number
  name: string
  avatar?: WagtailImage
}

export interface WagtailCategory {
  id: number
  name: string
  color: string
  slug: string
}

export interface WagtailBlogPostPage extends WagtailPage {
  excerpt: string
  published_at: string
  read_time?: string
  author: WagtailAuthor
  category: WagtailCategory
  hero_image: WagtailImage
  hero_alt: string
  body: WagtailStreamFieldBlock[]
}

// ============================================================================
// RutaPage (rutas.RutaPage)
// ============================================================================

export interface WagtailItineraryDay {
  day: number
  title: string
  description: string
  dives: WagtailStreamFieldBlock[]
  highlights: WagtailStreamFieldBlock[]
  image: WagtailImage
  overlay_direction: 'left' | 'right'
}

export interface WagtailRutaPage extends WagtailPage {
  hero: WagtailStreamFieldBlock[]
  story_intro_badge: string
  story_intro_title: string
  story_intro_description: string
  info_cards: WagtailStreamFieldBlock[]
  itinerary_title: string
  itinerary_days: WagtailItineraryDay[]
  incluye_title: string
  incluye_items: WagtailStreamFieldBlock[]
  cta_title: string
  cta_description: string
  cta_background_image?: WagtailImage
  cta_primary_text: string
  cta_primary_link: string
}

// ============================================================================
// ExperienciaPage (experiencias.ExperienciaPage)
// ============================================================================

export interface WagtailExperienciaPage extends WagtailPage {
  description: string
  hero: WagtailStreamFieldBlock[]
  sections: WagtailStreamFieldBlock[]
  primary_route?: {
    id: number
    title: string
    meta: {
      slug: string
    }
  }
  lead_form_title: string
  lead_form_subtitle: string
  lead_form_submit_button: string
  lead_form_privacy_text: string
  lead_form_success_message: string
  seo_meta_title: string
  seo_meta_description: string
  seo_keywords: string
}

// ============================================================================
// OfertaPage (ofertas.OfertaPage)
// ============================================================================

export interface WagtailTestimonio {
  name: string
  text: string
  avatar: WagtailImage
  rating: number
}

export interface WagtailOfertaPage extends WagtailPage {
  badge: string
  hero: WagtailStreamFieldBlock[]
  countdown_to: string
  plazas_disponibles: number
  personas_viendo: number
  precio_original: number
  precio_descuento: number
  precio_actual: number
  precio_moneda: string
  beneficios: WagtailStreamFieldBlock[]
  testimonios: WagtailTestimonio[]
  cta_title: string
  cta_description: string
  cta_primary_text: string
}

// ============================================================================
// CursoPage (cursos.CursoPage)
// ============================================================================

export interface WagtailModulo {
  number: number
  title: string
  description: string
}

export interface WagtailCursoPage extends WagtailPage {
  badge: string
  hero_image: WagtailImage
  hero_title: string
  hero_subtitle: string
  info_bars: WagtailStreamFieldBlock[]
  que_aprendes_title: string
  que_aprendes_items: WagtailStreamFieldBlock[]
  modulos_title: string
  modulos: WagtailModulo[]
  requisitos_title: string
  requisitos_intro: string
  requisitos_items: WagtailStreamFieldBlock[]
  incluye_title: string
  incluye_items: WagtailStreamFieldBlock[]
  cta_title: string
  cta_description: string
  cta_primary_text: string
  cta_primary_link: string
}
