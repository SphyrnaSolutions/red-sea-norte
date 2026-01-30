/**
 * Wagtail API Mappers
 *
 * Funciones para mapear respuestas de Wagtail API a nuestros tipos TypeScript
 */

import type {
  HomepageData,
  BlogPost,
  RutaData,
  ExperienciaData,
  OfertaData,
  CursoData,
  Block,
  ItineraryDay,
  ExperienciaSection,
  StoryIntro,
} from '../mock-data/types'

import type {
  WagtailHomePage,
  WagtailBlogPostPage,
  WagtailRutaPage,
  WagtailExperienciaPage,
  WagtailOfertaPage,
  WagtailCursoPage,
  WagtailStreamFieldBlock,
} from './types'

/**
 * Helper: Extraer URL de imagen de Wagtail
 */
function getImageUrl(wagtailImage: any): string {
  if (!wagtailImage) return ''
  return wagtailImage.url || wagtailImage.meta?.download_url || ''
}

/**
 * Helper: Mapear StreamField blocks a nuestro formato
 */
function mapStreamField(blocks: WagtailStreamFieldBlock[]): Block[] {
  return blocks.map(block => ({
    type: block.type,
    id: block.id,
    value: block.value
  }))
}

/**
 * Helper: Extraer valores de StreamField de un solo item
 */
function extractStreamFieldValues(blocks: WagtailStreamFieldBlock[]): string[] {
  return blocks.map(block => block.value)
}

// ============================================================================
// HomePage Mapper
// ============================================================================

export function mapHomePage(wagtailPage: WagtailHomePage): HomepageData {
  return {
    hero: {
      backgroundImage: getImageUrl(wagtailPage.hero_background_image),
      badge: wagtailPage.hero_badge ? {
        text: wagtailPage.hero_badge.text,
        backgroundColor: wagtailPage.hero_badge.background_color,
      } : undefined,
      title: wagtailPage.hero_title,
      subtitle: wagtailPage.hero_subtitle,
      primaryCTA: wagtailPage.hero_primary_cta_text ? {
        text: wagtailPage.hero_primary_cta_text,
        href: wagtailPage.hero_primary_cta_link || '#',
      } : undefined,
      secondaryCTA: wagtailPage.hero_secondary_cta_text ? {
        text: wagtailPage.hero_secondary_cta_text,
        href: wagtailPage.hero_secondary_cta_link || '#',
      } : undefined,
      ctas: [
        ...(wagtailPage.hero_primary_cta_text ? [{
          text: wagtailPage.hero_primary_cta_text,
          variant: 'primary' as const,
        }] : []),
        ...(wagtailPage.hero_secondary_cta_text ? [{
          text: wagtailPage.hero_secondary_cta_text,
          variant: 'outline' as const,
        }] : []),
      ],
      trustLine: wagtailPage.hero_trust_line,
    },
    whySection: {
      title: wagtailPage.why_section_title,
      subtitle: wagtailPage.why_section_subtitle,
      topRow: wagtailPage.why_section_cards.slice(0, 2).map(card => card.value),
      bottomRow: wagtailPage.why_section_cards.slice(2).map(card => card.value),
    },
    diveSites: {
      title: wagtailPage.dive_sites_title,
      subtitle: wagtailPage.dive_sites_subtitle,
      sites: wagtailPage.dive_sites.map(site => {
        if (site.type === 'dive_site') {
          return {
            name: site.value.name,
            image: getImageUrl(site.value.image),
            depth: site.value.depth,
            highlight: site.value.highlight,
          }
        }
        return site.value
      }),
    },
    programSection: {
      title: wagtailPage.program_section_title,
      subtitle: wagtailPage.program_section_subtitle,
      includes: wagtailPage.program_section_includes.map(item => {
        if (item.type === 'text' || item.type === 'list_item') {
          return item.value
        }
        return item.value
      }),
      price: {
        amount: wagtailPage.program_section_price_amount,
        badge: wagtailPage.program_section_price_badge,
        perPerson: wagtailPage.program_section_price_per_person,
        highlight: wagtailPage.program_section_price_highlight,
      },
    },
    specSection: {
      sectionLabel: wagtailPage.spec_section_label,
      bigCard: wagtailPage.spec_big_card.value,
      specialtyCards: wagtailPage.spec_specialty_cards.map(card => card.value),
      mainTitle: wagtailPage.spec_main_title,
      navCards: wagtailPage.spec_nav_cards.map(card => card.value),
      cta: {
        price: wagtailPage.spec_cta_price,
        details: wagtailPage.spec_cta_details,
        buttonText: wagtailPage.spec_cta_button_text,
      },
    },
    leadForm: {
      title: wagtailPage.lead_form_title,
      subtitle: wagtailPage.lead_form_subtitle,
      fields: wagtailPage.lead_form_fields.map(field => field.value),
      submitButton: wagtailPage.lead_form_submit_button,
      privacyText: wagtailPage.lead_form_privacy_text,
      successMessage: wagtailPage.lead_form_success_message,
    },
    ctaSection: {
      title: wagtailPage.cta_title,
      description: wagtailPage.cta_description,
      primaryCTA: {
        text: wagtailPage.cta_primary_text,
        href: wagtailPage.cta_primary_link,
      },
    },
  }
}

// ============================================================================
// BlogPost Mapper
// ============================================================================

export function mapBlogPost(wagtailPage: WagtailBlogPostPage): BlogPost {
  return {
    slug: wagtailPage.meta.slug,
    title: wagtailPage.title,
    excerpt: wagtailPage.excerpt,
    publishedAt: wagtailPage.published_at,
    author: {
      name: wagtailPage.author.name,
      avatar: getImageUrl(wagtailPage.author.avatar),
    },
    hero: {
      image: getImageUrl(wagtailPage.hero_image),
      alt: wagtailPage.hero_alt,
    },
    body: mapStreamField(wagtailPage.body),
    category: {
      name: wagtailPage.category.name,
      color: wagtailPage.category.color,
    },
    readTime: wagtailPage.read_time,
  }
}

// ============================================================================
// RutaPage Mapper
// ============================================================================

export function mapRutaPage(wagtailPage: WagtailRutaPage): RutaData {
  // Extraer hero del StreamField (primer bloque)
  const heroBlock = wagtailPage.hero[0]?.value || {}

  return {
    slug: wagtailPage.meta.slug,
    title: wagtailPage.title,
    hero: {
      backgroundImage: getImageUrl(heroBlock.background_image),
      badge: heroBlock.badge,
      title: heroBlock.title || wagtailPage.title,
      subtitle: heroBlock.subtitle,
      primaryCTA: heroBlock.primary_cta ? {
        text: heroBlock.primary_cta.text,
        href: heroBlock.primary_cta.link,
        variant: heroBlock.primary_cta.variant,
      } : undefined,
      secondaryCTA: heroBlock.secondary_cta ? {
        text: heroBlock.secondary_cta.text,
        href: heroBlock.secondary_cta.link,
        variant: heroBlock.secondary_cta.variant,
      } : undefined,
    },
    storyIntro: {
      badge: wagtailPage.story_intro_badge,
      title: wagtailPage.story_intro_title,
      description: wagtailPage.story_intro_description,
    },
    infoCards: wagtailPage.info_cards.map(card => ({
      icon: card.value.icon,
      value: card.value.value,
      label: card.value.label,
      color: card.value.color as 'blue' | 'orange' | 'cyan',
    })),
    itinerary: {
      title: wagtailPage.itinerary_title,
      days: wagtailPage.itinerary_days.map(day => ({
        day: day.day,
        title: day.title,
        description: day.description,
        dives: extractStreamFieldValues(day.dives),
        highlights: extractStreamFieldValues(day.highlights),
        image: getImageUrl(day.image),
        overlayDirection: day.overlay_direction,
      })),
    },
    incluye: {
      title: wagtailPage.incluye_title,
      items: extractStreamFieldValues(wagtailPage.incluye_items),
    },
    cta: {
      title: wagtailPage.cta_title,
      description: wagtailPage.cta_description,
      backgroundImage: getImageUrl(wagtailPage.cta_background_image),
      primaryCTA: {
        text: wagtailPage.cta_primary_text,
        href: wagtailPage.cta_primary_link,
      },
    },
  }
}

// ============================================================================
// ExperienciaPage Mapper
// ============================================================================

export function mapExperienciaPage(wagtailPage: WagtailExperienciaPage): ExperienciaData {
  // Extraer hero del StreamField
  const heroBlock = wagtailPage.hero[0]?.value || {}

  // Mapear sections (mantenemos el formato de Block/ExperienciaSection)
  const sections: ExperienciaSection[] = wagtailPage.sections.map(section => {
    // Para bloques específicos de experiencias, mapear el value correctamente
    if (section.type === 'year') {
      return {
        type: 'year',
        id: section.id,
        value: {
          year: section.value.year,
          title: section.value.title,
          description: section.value.description,
          image: getImageUrl(section.value.image),
          backgroundColor: section.value.background_color,
        },
      }
    }

    if (section.type === 'split_immersive') {
      return {
        type: 'split_immersive',
        id: section.id,
        value: {
          layout: section.value.layout,
          image: getImageUrl(section.value.image),
          title: section.value.title,
          content: section.value.content,
          ctaButton: section.value.cta_button_text ? {
            text: section.value.cta_button_text,
            href: section.value.cta_button_link || '#',
          } : undefined,
          backgroundColor: section.value.background_color,
        },
      }
    }

    if (section.type === 'depth') {
      return {
        type: 'depth',
        id: section.id,
        value: {
          depth: section.value.depth,
          unit: section.value.unit,
          subtitle: section.value.subtitle,
          image: getImageUrl(section.value.image),
          overlayGradient: section.value.overlay_gradient,
        },
      }
    }

    if (section.type === 'image_grid') {
      return {
        type: 'image_grid',
        id: section.id,
        value: {
          images: section.value.images.map((img: any) => ({
            url: getImageUrl(img.image),
            alt: img.alt,
            overlay: img.overlay_title ? {
              title: img.overlay_title,
              description: img.overlay_description,
            } : undefined,
          })),
          layout: section.value.layout,
        },
      }
    }

    if (section.type === 'requirements') {
      return {
        type: 'requirements',
        id: section.id,
        value: {
          title: section.value.title,
          subtitle: section.value.subtitle,
          backgroundColor: section.value.background_color,
        },
      }
    }

    if (section.type === 'text_overlay_full') {
      return {
        type: 'text_overlay_full',
        id: section.id,
        value: {
          image: getImageUrl(section.value.image),
          title: section.value.title,
          subtitle: section.value.subtitle,
          alignment: section.value.alignment,
          overlayGradient: section.value.overlay_gradient,
          ctaButton: section.value.cta_button_text ? {
            text: section.value.cta_button_text,
            href: section.value.cta_button_link || '#',
          } : undefined,
        },
      }
    }

    // Para bloques del blog (rich_text, heading, image, etc.)
    return {
      type: section.type,
      id: section.id,
      value: section.value,
    } as Block
  })

  return {
    slug: wagtailPage.meta.slug,
    title: wagtailPage.title,
    description: wagtailPage.description,
    hero: {
      backgroundImage: getImageUrl(heroBlock.background_image),
      badge: heroBlock.badge,
      title: heroBlock.title || wagtailPage.title,
      subtitle: heroBlock.subtitle,
    },
    sections,
    primaryRoute: wagtailPage.primary_route?.meta?.slug || '',
    alternativeRoutes: [],
    leadForm: {
      title: wagtailPage.lead_form_title,
      subtitle: wagtailPage.lead_form_subtitle,
      fields: [
        // Campos estáticos por ahora - podrían venir de Wagtail si se necesita
        { name: 'name', type: 'text', placeholder: 'Tu nombre completo', required: true },
        { name: 'email', type: 'email', placeholder: 'Tu email', required: true },
        { name: 'phone', type: 'tel', placeholder: 'Tu teléfono (opcional)', required: false },
      ],
      submitButton: wagtailPage.lead_form_submit_button,
      privacyText: wagtailPage.lead_form_privacy_text,
      successMessage: wagtailPage.lead_form_success_message,
    },
    seo: {
      metaTitle: wagtailPage.seo_meta_title,
      metaDescription: wagtailPage.seo_meta_description,
      keywords: wagtailPage.seo_keywords.split(',').map(k => k.trim()),
    },
  }
}

// ============================================================================
// OfertaPage Mapper
// ============================================================================

export function mapOfertaPage(wagtailPage: WagtailOfertaPage): OfertaData {
  const heroBlock = wagtailPage.hero[0]?.value || {}

  return {
    slug: wagtailPage.meta.slug,
    badge: wagtailPage.badge,
    hero: {
      backgroundImage: getImageUrl(heroBlock.background_image),
      badge: heroBlock.badge,
      title: heroBlock.title || wagtailPage.title,
      subtitle: heroBlock.subtitle,
      primaryCTA: heroBlock.primary_cta ? {
        text: heroBlock.primary_cta.text,
        href: heroBlock.primary_cta.link,
      } : undefined,
      secondaryCTA: heroBlock.secondary_cta ? {
        text: heroBlock.secondary_cta.text,
        href: heroBlock.secondary_cta.link,
      } : undefined,
    },
    urgencia: {
      countdownTo: wagtailPage.countdown_to,
      plazasDisponibles: wagtailPage.plazas_disponibles,
      personasViendo: wagtailPage.personas_viendo,
    },
    precio: {
      original: wagtailPage.precio_original,
      descuento: wagtailPage.precio_descuento,
      actual: wagtailPage.precio_actual,
      moneda: wagtailPage.precio_moneda,
    },
    beneficios: extractStreamFieldValues(wagtailPage.beneficios),
    testimonios: wagtailPage.testimonios.map(t => ({
      name: t.name,
      text: t.text,
      avatar: getImageUrl(t.avatar),
      rating: t.rating,
    })),
    cta: {
      title: wagtailPage.cta_title,
      description: wagtailPage.cta_description,
      primaryCTA: {
        text: wagtailPage.cta_primary_text,
        href: '#', // El href puede venir del modal o ser dinámico
      },
    },
  }
}

// ============================================================================
// CursoPage Mapper
// ============================================================================

export function mapCursoPage(wagtailPage: WagtailCursoPage): CursoData {
  return {
    slug: wagtailPage.meta.slug,
    title: wagtailPage.title,
    badge: wagtailPage.badge,
    hero: {
      image: getImageUrl(wagtailPage.hero_image),
      title: wagtailPage.hero_title,
      subtitle: wagtailPage.hero_subtitle,
    },
    infoBars: wagtailPage.info_bars.map(bar => ({
      label: bar.value.label,
      value: bar.value.value,
      color: bar.value.color,
    })),
    queAprendes: {
      title: wagtailPage.que_aprendes_title,
      items: wagtailPage.que_aprendes_items.map(item => ({
        icon: item.value.icon,
        title: item.value.title,
        description: item.value.description,
      })),
    },
    modulos: {
      title: wagtailPage.modulos_title,
      items: wagtailPage.modulos.map(m => ({
        number: m.number,
        title: m.title,
        description: m.description,
      })),
    },
    requisitos: {
      title: wagtailPage.requisitos_title,
      intro: wagtailPage.requisitos_intro,
      items: extractStreamFieldValues(wagtailPage.requisitos_items),
    },
    incluye: {
      title: wagtailPage.incluye_title,
      items: wagtailPage.incluye_items.map(item => ({
        icon: item.value.icon,
        title: item.value.title,
      })),
    },
    cta: {
      title: wagtailPage.cta_title,
      description: wagtailPage.cta_description,
      primaryCTA: {
        text: wagtailPage.cta_primary_text,
        href: wagtailPage.cta_primary_link,
      },
    },
  }
}
