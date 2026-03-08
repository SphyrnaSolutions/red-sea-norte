import { getAllOfertas, getOferta } from '@/lib/wagtail/fetchers'
import { getOferta as getMockOferta, getAllOfertaSlugs } from '@/lib/mock-data/ofertas'
import { shouldUseFallback, logDataError } from './config'

function getAllMockOfertas() {
  return getAllOfertaSlugs().map(slug => getMockOferta(slug)).filter(Boolean)
}

export async function getAllOfertasData() {
  try {
    const data = await getAllOfertas({
      revalidate: 900,
      tags: ['ofertas', 'ofertas-list'],
    })
    if (!data || data.length === 0) throw new Error('No ofertas received from API')
    return data
  } catch (error) {
    logDataError(error, 'getAllOfertasData')
    if (shouldUseFallback(error, 'ofertas')) {
      console.warn('[Data Layer] Using mock data fallback for ofertas')
      return getAllMockOfertas()
    }
    throw error
  }
}

export async function getOfertaData(slug: string) {
  try {
    const data = await getOferta(slug, {
      revalidate: 900,
      tags: ['ofertas', `oferta-${slug}`],
    })
    if (!data) {
      const mockOferta = getMockOferta(slug)
      if (mockOferta && shouldUseFallback(null, 'ofertas')) return mockOferta
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `getOfertaData(${slug})`)
    if (shouldUseFallback(error, 'ofertas')) {
      const mockOferta = getMockOferta(slug)
      if (mockOferta) {
        console.warn(`[Data Layer] Using mock data fallback for oferta: ${slug}`)
        return mockOferta
      }
    }
    throw error
  }
}

/**
 * Get all oferta slugs with lastModified dates.
 * Used by generateStaticParams and sitemap.
 * Returns empty array on error (never throws) so builds succeed without Wagtail.
 */
export async function getAllOfertasSlugsData() {
  try {
    const ofertas = await getAllOfertas({
      revalidate: 900,
      tags: ['ofertas', 'ofertas-list'],
    })
    return ofertas.map(o => ({
      slug: o.slug,
      lastModified: undefined as string | undefined,
    }))
  } catch (error) {
    logDataError(error, 'getAllOfertasSlugsData')
    if (shouldUseFallback(error, 'ofertas')) {
      return getAllMockOfertas().map(o => o ? ({
        slug: o.slug,
        lastModified: undefined as string | undefined,
      }) : null).filter(Boolean) as { slug: string; lastModified: string | undefined }[]
    }
    return []
  }
}
