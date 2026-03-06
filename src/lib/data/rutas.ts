import { draftMode } from 'next/headers'
import { getAllRutas, getRuta } from '@/lib/wagtail/fetchers'
import { getAllRutas as getAllMockRutas, getRuta as getMockRuta } from '@/lib/mock-data/rutas'
import { shouldUseFallback, logDataError } from './config'

export async function getAllRutasData() {
  const { isEnabled: isDraft } = await draftMode()

  try {
    const data = await getAllRutas({
      revalidate: isDraft ? 0 : 1800,
      tags: ['rutas', 'rutas-list'],
    })
    if (!data || data.length === 0) throw new Error('No rutas received from API')
    return data
  } catch (error) {
    logDataError(error, 'getAllRutasData')
    if (shouldUseFallback(error, 'rutas')) {
      console.warn('[Data Layer] Using mock data fallback for rutas')
      return getAllMockRutas()
    }
    throw error
  }
}

export async function getRutaData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()

  try {
    const data = await getRuta(slug, {
      revalidate: isDraft ? 0 : 1800,
      tags: ['rutas', `ruta-${slug}`],
    })
    if (!data) {
      const mockRuta = getMockRuta(slug)
      if (mockRuta && shouldUseFallback(null, 'rutas')) return mockRuta
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `getRutaData(${slug})`)
    if (shouldUseFallback(error, 'rutas')) {
      const mockRuta = getMockRuta(slug)
      if (mockRuta) {
        console.warn(`[Data Layer] Using mock data fallback for ruta: ${slug}`)
        return mockRuta
      }
    }
    throw error
  }
}

/**
 * Get all ruta slugs with lastModified dates.
 * Used by generateStaticParams and sitemap.
 * Returns empty array on error (never throws) so builds succeed without Wagtail.
 */
export async function getAllRutasSlugsData() {
  try {
    const rutas = await getAllRutas({
      revalidate: 1800,
      tags: ['rutas', 'rutas-list'],
    })
    return rutas.map(r => ({
      slug: r.slug,
      lastModified: undefined as string | undefined,
    }))
  } catch (error) {
    logDataError(error, 'getAllRutasSlugsData')
    if (shouldUseFallback(error, 'rutas')) {
      return getAllMockRutas().map(r => ({
        slug: r.slug,
        lastModified: undefined as string | undefined,
      }))
    }
    return []
  }
}
