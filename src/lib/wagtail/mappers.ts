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
  ExperienciaSection,
  DepthSection,
  ImageGridSection,
  RequirementsSection,
  SplitImmersiveSection,
  TextOverlayFullSection,
  YearSection,
  HeroData,
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

interface WagtailImageSource {
  url?: string
  meta?: {
    download_url?: string
  }
}

interface WagtailHeroValue {
  background_image?: WagtailImageSource
  badge?: HomepageData["hero"]["badge"] | string
  title?: string
  subtitle?: string
  primary_cta?: {
    text: string
    link: string
    variant?: "primary" | "secondary" | "gradient" | "outline"
  }
  secondary_cta?: {
    text: string
    link: string
    variant?: "primary" | "secondary" | "gradient" | "outline"
  }
}

interface WagtailImageGridItemValue {
  image: WagtailImageSource
  alt: string
  overlay_title?: string
  overlay_description?: string
}

interface WagtailImageGridValue {
  images: WagtailImageGridItemValue[]
  layout: ImageGridSection['value']['layout']
}

function normalizeBadge(
  badge:
    | HomepageData['hero']['badge']
    | { text: string; background_color: string }
    | string
    | undefined
): HomepageData['hero']['badge'] | undefined {
  if (!badge) {
    return undefined
  }

  if (typeof badge === 'string') {
    return {
      text: badge,
      backgroundColor: '#FF5722',
    }
  }

  if ('background_color' in badge) {
    return {
      text: badge.text,
      backgroundColor: badge.background_color,
    }
  }

  return badge
}

function getBlockObjectValue(block: WagtailStreamFieldBlock): Record<string, unknown> {
  if (!block.value || typeof block.value !== 'object') {
    return {}
  }

  return block.value as Record<string, unknown>
}

function getStringValue(record: Record<string, unknown>, key: string): string {
  const value = record[key]
  return typeof value === 'string' ? value : ''
}

function asArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : []
}

function getNonEmptyString(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

function asLeadField(value: unknown): HomepageData['leadForm']['fields'][number] {
  return value as HomepageData['leadForm']['fields'][number]
}

function asWhyTopRow(value: unknown): HomepageData['whySection']['topRow'][number] {
  return value as HomepageData['whySection']['topRow'][number]
}

function asWhyBottomRow(value: unknown): HomepageData['whySection']['bottomRow'][number] {
  return value as HomepageData['whySection']['bottomRow'][number]
}

function asSpecBigCard(value: unknown): HomepageData['specSection']['bigCard'] {
  return value as HomepageData['specSection']['bigCard']
}

function asSpecSpecialtyCard(value: unknown): HomepageData['specSection']['specialtyCards'][number] {
  return value as HomepageData['specSection']['specialtyCards'][number]
}

function asSpecNavCard(value: unknown): HomepageData['specSection']['navCards'][number] {
  return value as HomepageData['specSection']['navCards'][number]
}

/**
 * Helper: Extraer URL de imagen de Wagtail
 */
function getImageUrl(wagtailImage: unknown): string {
  if (!wagtailImage || typeof wagtailImage !== 'object') return ''

  const image = wagtailImage as WagtailImageSource
  return image.url || image.meta?.download_url || ''
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
  return blocks.map(block => String(block.value ?? ''))
}

// ============================================================================
// HomePage Mapper
// ============================================================================

export function mapHomePage(wagtailPage: WagtailHomePage): HomepageData {
  const leadFormFields = asArray(wagtailPage.lead_form_fields)
  const whySectionCards = asArray(wagtailPage.why_section_cards)
  const diveSiteBlocks = asArray(wagtailPage.dive_sites)
  const programIncludes = asArray(wagtailPage.program_section_includes)
  const specSpecialtyCards = asArray(wagtailPage.spec_specialty_cards)
  const specNavCards = asArray(wagtailPage.spec_nav_cards)
  const leadFields = leadFormFields.map((field) => asLeadField(field.value))
  const primaryHeroCta = wagtailPage.hero_primary_cta_text
    ? {
        text: wagtailPage.hero_primary_cta_text,
        variant: 'primary' as const,
        href: wagtailPage.hero_primary_cta_link || '#lead-form',
        actionType: wagtailPage.hero_primary_cta_link?.startsWith('#') ? 'scroll' as const : 'link' as const,
        target: wagtailPage.hero_primary_cta_link?.startsWith('#')
          ? wagtailPage.hero_primary_cta_link.replace('#', '')
          : undefined,
      }
    : undefined

  const secondaryHeroCta = wagtailPage.hero_secondary_cta_text
    ? {
        text: wagtailPage.hero_secondary_cta_text,
        variant: 'outline' as const,
        href: wagtailPage.hero_secondary_cta_link || '#',
        actionType: wagtailPage.hero_secondary_cta_link?.startsWith('#') ? 'scroll' as const : 'link' as const,
        target: wagtailPage.hero_secondary_cta_link?.startsWith('#')
          ? wagtailPage.hero_secondary_cta_link.replace('#', '')
          : undefined,
      }
    : undefined

  return {
    hero: {
      backgroundImage: getImageUrl(wagtailPage.hero_background_image),
      badge: normalizeBadge(wagtailPage.hero_badge),
      title: getNonEmptyString(wagtailPage.hero_title, 'Descubre el Mar Rojo'),
      subtitle: getNonEmptyString(
        wagtailPage.hero_subtitle,
        'Vida a bordo, pecios y rutas de buceo en el Mar Rojo.'
      ),
      primaryCTA: wagtailPage.hero_primary_cta_text ? {
        text: wagtailPage.hero_primary_cta_text,
        href: wagtailPage.hero_primary_cta_link || '#',
      } : undefined,
      secondaryCTA: wagtailPage.hero_secondary_cta_text ? {
        text: wagtailPage.hero_secondary_cta_text,
        href: wagtailPage.hero_secondary_cta_link || '#',
      } : undefined,
      ctas: [
        ...(primaryHeroCta ? [primaryHeroCta] : []),
        ...(secondaryHeroCta ? [secondaryHeroCta] : []),
      ],
      trustLine: wagtailPage.hero_trust_line,
    },
    routeValueSection: {
      title: wagtailPage.why_section_title || 'Por que esta ruta',
      subtitle: wagtailPage.why_section_subtitle || '',
      cards: whySectionCards.slice(0, 4).map((card, index) => {
        const value = getBlockObjectValue(card)
        return {
          eyebrow: index === 0 ? 'PECIOS' : index === 1 ? 'CONDICIONES' : index === 2 ? 'PROGRESION' : 'PRODUCTO',
          title: getStringValue(value, 'title') || getStringValue(value, 'badge') || `Bloque ${index + 1}`,
          description:
            getStringValue(value, 'description') ||
            getStringValue(value, 'highlight') ||
            getStringValue(value, 'subtitle'),
          image: getImageUrl(value.image) || getImageUrl(wagtailPage.hero_background_image),
        }
      }),
    },
    whySection: {
      title: getNonEmptyString(wagtailPage.why_section_title, 'Por que esta ruta'),
      subtitle: getNonEmptyString(wagtailPage.why_section_subtitle),
      topRow: whySectionCards.slice(0, 2).map((card) => asWhyTopRow(card.value)),
      bottomRow: whySectionCards.slice(2).map((card) => asWhyBottomRow(card.value)),
    },
    diveSites: {
      title: getNonEmptyString(wagtailPage.dive_sites_title, 'Puntos de inmersion'),
      subtitle: getNonEmptyString(wagtailPage.dive_sites_subtitle),
      sites: diveSiteBlocks.map((site) => {
        const value = getBlockObjectValue(site)
        if (site.type === 'dive_site') {
          return {
            name: getStringValue(value, 'name'),
            image: getImageUrl(value.image),
            depth: getStringValue(value, 'depth'),
            highlight: getStringValue(value, 'highlight'),
          }
        }
        return {
          name: getStringValue(value, 'name'),
          image: getImageUrl(value.image),
          depth: getStringValue(value, 'depth'),
          highlight: getStringValue(value, 'highlight'),
        }
      }),
    },
    journeyOverview: {
      eyebrow: 'COMO ES EL VIAJE',
      title: wagtailPage.program_section_title || 'Como es el viaje',
      subtitle: wagtailPage.program_section_subtitle || '',
      highlights: extractStreamFieldValues(programIncludes).slice(0, 3),
      includesTitle: 'Que espera el usuario cuando reserva este viaje',
      includes: extractStreamFieldValues(programIncludes).slice(0, 4),
      fitTitle: 'Como encaja el Advanced dentro de la experiencia',
      fitItems: [
        'El viaje sigue siendo el producto principal de la homepage.',
        'El Advanced funciona como un valor anadido para quien quiere progresar.',
        'La decision principal debe seguir siendo Ruta Norte + vida a bordo.',
      ],
      note: 'Esta home sintetiza la experiencia y deja la profundizacion comercial para el cluster y las landings.',
    },
    programSection: {
      title: getNonEmptyString(wagtailPage.program_section_title, 'Como es el viaje'),
      subtitle: getNonEmptyString(wagtailPage.program_section_subtitle),
      includes: extractStreamFieldValues(programIncludes),
      price: {
        amount: getNonEmptyString(wagtailPage.program_section_price_amount),
        badge: getNonEmptyString(wagtailPage.program_section_price_badge),
        perPerson: getNonEmptyString(wagtailPage.program_section_price_per_person),
        highlight: getNonEmptyString(wagtailPage.program_section_price_highlight),
      },
    },
    audienceFit: {
      title: 'Esta experiencia encaja contigo si...',
      subtitle: 'Bloque derivado mientras Wagtail mantiene el esquema anterior de homepage.',
      profiles: [
        {
          title: 'Buscas una ruta comercial clara por el Mar Rojo',
          description: 'Usuario interesado en vida a bordo, spots conocidos y una propuesta simple de entender.',
          tone: 'good-fit',
        },
        {
          title: 'Quieres progresar durante la semana',
          description: 'El Advanced aparece como oportunidad, no como requisito para entender el producto.',
          tone: 'consider',
        },
        {
          title: 'Solo buscas un curso aislado',
          description: 'La homepage ya no debe vender exclusivamente certificacion como producto principal.',
          tone: 'not-now',
        },
      ],
    },
    specSection: {
      sectionLabel: getNonEmptyString(wagtailPage.spec_section_label),
      bigCard: wagtailPage.spec_big_card?.value
        ? asSpecBigCard(wagtailPage.spec_big_card.value)
        : {
            image: getImageUrl(wagtailPage.hero_background_image),
            title: getNonEmptyString(wagtailPage.program_section_title, 'Experiencia de viaje'),
            subtitle: getNonEmptyString(wagtailPage.program_section_subtitle),
          },
      specialtyCards: specSpecialtyCards.map((card) => asSpecSpecialtyCard(card.value)),
      mainTitle: getNonEmptyString(wagtailPage.spec_main_title),
      navCards: specNavCards.map((card) => asSpecNavCard(card.value)),
      cta: {
        price: getNonEmptyString(wagtailPage.spec_cta_price),
        details: getNonEmptyString(wagtailPage.spec_cta_details),
        buttonText: getNonEmptyString(wagtailPage.spec_cta_button_text, 'Solicitar informacion'),
      },
    },
    leadForm: {
      title: getNonEmptyString(wagtailPage.lead_form_title, 'Solicita informacion'),
      subtitle: getNonEmptyString(wagtailPage.lead_form_subtitle),
      fields: leadFields,
      submitButton: getNonEmptyString(wagtailPage.lead_form_submit_button, 'Enviar'),
      privacyText: getNonEmptyString(wagtailPage.lead_form_privacy_text),
      successMessage: getNonEmptyString(wagtailPage.lead_form_success_message, 'Gracias por tu consulta.'),
    },
    inlineLead: {
      sectionId: 'inline-lead',
      eyebrow: 'CONSULTA EL VIAJE',
      title: getNonEmptyString(wagtailPage.lead_form_title, 'Solicita informacion'),
      subtitle: getNonEmptyString(wagtailPage.lead_form_subtitle),
      highlights: [
        'Te orientamos segun tu nivel.',
        'Te contamos si la ruta encaja contigo.',
        'Te dirigimos al siguiente paso correcto.',
      ],
      fields: leadFields.filter((field) => field.name !== 'message'),
      submitButton: getNonEmptyString(wagtailPage.lead_form_submit_button, 'Enviar'),
      privacyText: getNonEmptyString(wagtailPage.lead_form_privacy_text),
      successMessage: getNonEmptyString(wagtailPage.lead_form_success_message, 'Gracias por tu consulta.'),
    },
    routeTeaser: {
      eyebrow: 'SIGUIENTE PASO',
      title: wagtailPage.cta_title || 'Explora la Ruta Norte',
      description: wagtailPage.cta_description || '',
      primaryCTA: {
        text: wagtailPage.cta_primary_text,
        href: wagtailPage.cta_primary_link,
        actionType: wagtailPage.cta_primary_link?.startsWith('#') ? 'scroll' : 'link',
        target: wagtailPage.cta_primary_link?.startsWith('#')
          ? wagtailPage.cta_primary_link.replace('#', '')
          : undefined,
      },
      secondaryCTA: {
        text: 'Abrir formulario',
        href: '#inline-lead',
        actionType: 'scroll',
        target: 'inline-lead',
      },
    },
    ctaSection: {
      title: getNonEmptyString(wagtailPage.cta_title, 'Explora nuestras rutas'),
      description: getNonEmptyString(wagtailPage.cta_description),
      primaryCTA: {
        text: getNonEmptyString(wagtailPage.cta_primary_text, 'Ver rutas'),
        href: getNonEmptyString(wagtailPage.cta_primary_link, '/rutas'),
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
    excerpt: getNonEmptyString(wagtailPage.excerpt),
    publishedAt: getNonEmptyString(wagtailPage.published_at, wagtailPage.meta.first_published_at),
    author: {
      name: getNonEmptyString(wagtailPage.author?.name, 'Red Sea Diving'),
      avatar: getImageUrl(wagtailPage.author?.avatar),
    },
    hero: {
      image: getImageUrl(wagtailPage.hero_image),
      alt: getNonEmptyString(wagtailPage.hero_alt, wagtailPage.title),
    },
    body: mapStreamField(asArray(wagtailPage.body)),
    category: {
      name: getNonEmptyString(wagtailPage.category?.name, 'Blog'),
      color: getNonEmptyString(wagtailPage.category?.color, '#0066CC'),
    },
    readTime: getNonEmptyString(wagtailPage.read_time, '5 min'),
  }
}

// ============================================================================
// RutaPage Mapper
// ============================================================================

export function mapRutaPage(wagtailPage: WagtailRutaPage): RutaData {
  // Hero uses FLAT fields (not StreamField blocks)
  const hero: HeroData = {
    backgroundImage: getImageUrl(wagtailPage.hero_background_image),
    badge: normalizeBadge(wagtailPage.hero_badge),
    title: wagtailPage.hero_title || wagtailPage.title,
    subtitle: wagtailPage.hero_subtitle || '',
  }

  // Story intro uses "story_intro_content" (not "story_intro_description")
  const storyIntro: StoryIntro = {
    badge: wagtailPage.story_intro_badge || '',
    title: wagtailPage.story_intro_title || '',
    description: wagtailPage.story_intro_content || '',  // Map content -> description
  }

  // Info cards: API returns [{type: "info_cards", value: {cards: [...]}}]
  // Each block wraps a cards array from InfoCardsBlock
  const infoCards = asArray(wagtailPage.info_cards).flatMap((block) => {
    const blockValue = getBlockObjectValue(block)
    const cards = Array.isArray(blockValue.cards) ? blockValue.cards as Record<string, unknown>[] : []
    return cards.map((card) => ({
      icon: typeof card.icon === 'string' ? card.icon : '',
      value: typeof card.title === 'string' ? card.title : (typeof card.value === 'string' ? card.value : ''),
      label: typeof card.description === 'string' ? card.description : (typeof card.label === 'string' ? card.label : ''),
      color: (typeof card.color === 'string' ? card.color : 'blue') as 'blue' | 'orange' | 'cyan',
    }))
  })

  // Itinerary
  const itinerary = {
    title: wagtailPage.itinerary_title || 'Itinerario',
    days: asArray(wagtailPage.itinerary_days).map(day => ({
      day: day.day,
      title: day.title,
      description: day.description,
      dives: extractStreamFieldValues(asArray(day.dives)),
      highlights: extractStreamFieldValues(asArray(day.highlights)),
      image: getImageUrl(day.image),
      overlayDirection: day.overlay_direction || 'left',
    })),
  }

  // Incluye
  const incluye = {
    title: wagtailPage.incluye_title || 'Que incluye',
    items: extractStreamFieldValues(asArray(wagtailPage.incluye_items)),
  }

  // CTA uses FLAT fields (not StreamField)
  const cta = {
    title: wagtailPage.cta_title || '',
    description: wagtailPage.cta_description || '',
    backgroundImage: getImageUrl(wagtailPage.cta_background_image),
    primaryCTA: {
      text: wagtailPage.cta_primary_text || 'Consultar',
      href: wagtailPage.cta_primary_link || '#',
    },
  }

  // Summary section (optional)
  const summaryBlock = asArray(wagtailPage.summary_section)?.[0]
  const summaryValue = summaryBlock ? getBlockObjectValue(summaryBlock) : null
  const summarySection = summaryValue ? {
    eyebrow: getStringValue(summaryValue, 'eyebrow'),
    title: getStringValue(summaryValue, 'title'),
    subtitle: getStringValue(summaryValue, 'subtitle'),
    bullets: Array.isArray(summaryValue.bullets) ? (summaryValue.bullets as string[]) : [],
  } : undefined

  // Spots section (optional)
  const spotsData = asArray(wagtailPage.spots)
  const spotsSection = spotsData.length > 0 ? {
    title: wagtailPage.spots_title || 'Principales puntos de inmersion',
    subtitle: wagtailPage.spots_subtitle || '',
    spots: spotsData.map(spot => {
      const v = getBlockObjectValue(spot)
      return {
        name: getStringValue(v, 'name'),
        image: getImageUrl(v.image),
        alt: getStringValue(v, 'alt'),
        summary: getStringValue(v, 'summary'),
        depth: getStringValue(v, 'depth'),
        tag: getStringValue(v, 'tag'),
      }
    }),
  } : undefined

  // Audience fit (optional)
  const profilesData = asArray(wagtailPage.audience_fit_profiles)
  const audienceFit = profilesData.length > 0 ? {
    title: wagtailPage.audience_fit_title || '',
    subtitle: wagtailPage.audience_fit_subtitle || '',
    profiles: profilesData.map(p => {
      const v = getBlockObjectValue(p)
      return {
        title: getStringValue(v, 'title'),
        description: getStringValue(v, 'description'),
        tone: getStringValue(v, 'tone') as 'good-fit' | 'consider' | 'not-now',
      }
    }),
  } : undefined

  // Practical info (optional)
  const practicalIncluded = asArray(wagtailPage.practical_info_included)
  const practicalInfo = practicalIncluded.length > 0 ? {
    title: wagtailPage.practical_info_title || '',
    subtitle: wagtailPage.practical_info_subtitle || '',
    includedTitle: wagtailPage.practical_info_included_title || 'Incluido',
    included: extractStreamFieldValues(practicalIncluded),
    extrasTitle: wagtailPage.practical_info_extras_title || 'Extras',
    extras: extractStreamFieldValues(asArray(wagtailPage.practical_info_extras)),
    logisticsTitle: wagtailPage.practical_info_logistics_title || 'Logistica',
    logistics: extractStreamFieldValues(asArray(wagtailPage.practical_info_logistics)),
  } : undefined

  // FAQ section (optional)
  const faqData = asArray(wagtailPage.faq_section)
  const faqSection = faqData.length > 0 ? {
    title: wagtailPage.faq_title || 'Preguntas frecuentes',
    items: faqData.map(faq => {
      const v = getBlockObjectValue(faq)
      return {
        question: getStringValue(v, 'question'),
        answer: getStringValue(v, 'answer'),
      }
    }),
  } : undefined

  // Resources section (optional)
  const resourcesData = asArray(wagtailPage.resources_items)
  const resourcesSection = resourcesData.length > 0 ? {
    title: wagtailPage.resources_title || '',
    subtitle: wagtailPage.resources_subtitle || '',
    items: resourcesData.map(r => {
      const v = getBlockObjectValue(r)
      return {
        title: getStringValue(v, 'title'),
        description: getStringValue(v, 'description'),
        href: getStringValue(v, 'href'),
        label: getStringValue(v, 'label'),
      }
    }),
  } : undefined

  // Inline lead (optional)
  const inlineLead = wagtailPage.inline_lead_title ? {
    sectionId: wagtailPage.inline_lead_section_id || 'ruta-lead',
    eyebrow: wagtailPage.inline_lead_eyebrow || '',
    title: wagtailPage.inline_lead_title || '',
    subtitle: wagtailPage.inline_lead_subtitle || '',
    highlights: [],
    fields: [] as HomepageData['inlineLead']['fields'],
    submitButton: 'Recibir informacion',
    privacyText: '',
    successMessage: 'Gracias. Te contactaremos.',
  } : undefined

  return {
    slug: wagtailPage.meta.slug,
    title: wagtailPage.title,
    hero,
    storyIntro,
    infoCards,
    itinerary,
    incluye,
    cta,
    summarySection,
    spotsSection,
    audienceFit,
    practicalInfo,
    faqSection,
    resourcesSection,
    inlineLead,
  }
}

// ============================================================================
// ExperienciaPage Mapper
// ============================================================================

export function mapExperienciaPage(wagtailPage: WagtailExperienciaPage): ExperienciaData {
  // Extraer hero del StreamField
  const heroBlock = (wagtailPage.hero[0]?.value as WagtailHeroValue | undefined) || {}

  // Mapear sections (mantenemos el formato de Block/ExperienciaSection)
  const sections: ExperienciaSection[] = wagtailPage.sections.map(section => {
    // Para bloques específicos de experiencias, mapear el value correctamente
    if (section.type === 'year') {
      return {
        type: 'year',
        id: section.id,
        value: {
          year: (section.value as YearSection["value"]).year,
          title: (section.value as YearSection["value"]).title,
          description: (section.value as YearSection["value"]).description,
          image: getImageUrl((section.value as YearSection["value"]).image),
          backgroundColor: (section.value as YearSection["value"]).backgroundColor,
        },
      }
    }

    if (section.type === 'split_immersive') {
      return {
        type: 'split_immersive',
        id: section.id,
        value: {
          layout: (section.value as SplitImmersiveSection["value"]).layout,
          image: getImageUrl((section.value as SplitImmersiveSection["value"]).image),
          title: (section.value as SplitImmersiveSection["value"]).title,
          content: (section.value as SplitImmersiveSection["value"]).content,
          ctaButton: (section.value as SplitImmersiveSection["value"]).ctaButton ? {
            text: (section.value as SplitImmersiveSection["value"]).ctaButton?.text || '',
            href: (section.value as SplitImmersiveSection["value"]).ctaButton?.href || '#',
          } : undefined,
          backgroundColor: (section.value as SplitImmersiveSection["value"]).backgroundColor,
        },
      }
    }

    if (section.type === 'depth') {
      return {
        type: 'depth',
        id: section.id,
        value: {
          depth: (section.value as DepthSection["value"]).depth,
          unit: (section.value as DepthSection["value"]).unit,
          subtitle: (section.value as DepthSection["value"]).subtitle,
          image: getImageUrl((section.value as DepthSection["value"]).image),
          overlayGradient: (section.value as DepthSection["value"]).overlayGradient,
        },
      }
    }

    if (section.type === 'image_grid') {
      const imageGridValue = section.value as WagtailImageGridValue
      return {
        type: 'image_grid',
        id: section.id,
        value: {
          images: imageGridValue.images.map((img) => ({
            url: getImageUrl(img.image),
            alt: img.alt,
            overlay: img.overlay_title ? {
              title: img.overlay_title,
              description: img.overlay_description,
            } : undefined,
          })),
          layout: imageGridValue.layout,
        },
      }
    }

    if (section.type === 'requirements') {
      return {
        type: 'requirements',
        id: section.id,
        value: {
          title: (section.value as RequirementsSection["value"]).title,
          subtitle: (section.value as RequirementsSection["value"]).subtitle,
          backgroundColor: (section.value as RequirementsSection["value"]).backgroundColor,
        },
      }
    }

    if (section.type === 'text_overlay_full') {
      return {
        type: 'text_overlay_full',
        id: section.id,
        value: {
          image: getImageUrl((section.value as TextOverlayFullSection["value"]).image),
          title: (section.value as TextOverlayFullSection["value"]).title,
          subtitle: (section.value as TextOverlayFullSection["value"]).subtitle,
          alignment: (section.value as TextOverlayFullSection["value"]).alignment,
          overlayGradient: (section.value as TextOverlayFullSection["value"]).overlayGradient,
          ctaButton: (section.value as TextOverlayFullSection["value"]).ctaButton ? {
            text: (section.value as TextOverlayFullSection["value"]).ctaButton?.text || '',
            href: (section.value as TextOverlayFullSection["value"]).ctaButton?.href || '#',
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
      badge: normalizeBadge(heroBlock.badge),
      title: heroBlock.title || wagtailPage.title,
      subtitle: heroBlock.subtitle || '',
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
      metaTitle: wagtailPage.seo_meta_title ?? '',
      metaDescription: wagtailPage.seo_meta_description ?? '',
      keywords: (wagtailPage.seo_keywords ?? '').split(',').map(k => k.trim()).filter(Boolean),
    },
  }
}

// ============================================================================
// OfertaPage Mapper
// ============================================================================

export function mapOfertaPage(wagtailPage: WagtailOfertaPage): OfertaData {
  const heroBlock = (wagtailPage.hero[0]?.value as WagtailHeroValue | undefined) || {}

  return {
    slug: wagtailPage.meta.slug,
    badge: wagtailPage.badge,
    hero: {
      backgroundImage: getImageUrl(heroBlock.background_image),
      badge: normalizeBadge(heroBlock.badge),
      title: heroBlock.title || wagtailPage.title,
      subtitle: heroBlock.subtitle || '',
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
    infoBars: wagtailPage.info_bars.map((bar) => {
      const value = getBlockObjectValue(bar)
      return {
        label: getStringValue(value, 'label'),
        value: getStringValue(value, 'value'),
        color: getStringValue(value, 'color'),
      }
    }),
    queAprendes: {
      title: wagtailPage.que_aprendes_title,
      items: wagtailPage.que_aprendes_items.map((item) => {
        const value = getBlockObjectValue(item)
        return {
          icon: getStringValue(value, 'icon'),
          title: getStringValue(value, 'title'),
          description: getStringValue(value, 'description'),
        }
      }),
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
      items: wagtailPage.incluye_items.map((item) => {
        const value = getBlockObjectValue(item)
        return {
          icon: getStringValue(value, 'icon'),
          title: getStringValue(value, 'title'),
        }
      }),
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
