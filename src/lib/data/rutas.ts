import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getAllRutas, getRuta } from '@/lib/wagtail/fetchers'
import { getAllRutas as getAllMockRutas, getRuta as getMockRuta } from '@/lib/mock-data/rutas'
import { shouldUseFallback, logDataError } from './config'

async function fetchAllRutasInternal() {
  try {
    const data = await getAllRutas()
    if (!data || data.length === 0) throw new Error('No rutas received from API')
    return data
  } catch (error) {
    logDataError(error, 'fetchAllRutas')
    if (shouldUseFallback(error, 'rutas')) {
      console.warn('[Data Layer] Using mock data fallback for rutas')
      return getAllMockRutas()
    }
    throw error
  }
}

async function fetchRutaInternal(slug: string) {
  try {
    const data = await getRuta(slug)
    if (!data) {
      const mockRuta = getMockRuta(slug)
      if (mockRuta) return mockRuta
      throw new Error(`Ruta not found: ${slug}`)
    }
    return data
  } catch (error) {
    logDataError(error, `fetchRuta(${slug})`)
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

export async function getAllRutasData() {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchAllRutasInternal()

  const getCachedRutas = unstable_cache(
    fetchAllRutasInternal,
    ['rutas'],
    { tags: ['rutas', 'rutas-list'], revalidate: 1800 }
  )
  return getCachedRutas()
}

export async function getRutaData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchRutaInternal(slug)

  const getCachedRuta = unstable_cache(
    () => fetchRutaInternal(slug),
    ['ruta', slug],
    { tags: ['rutas', `ruta-${slug}`], revalidate: 1800 }
  )
  return getCachedRuta()
}

/**
 * Get all ruta slugs for generateStaticParams
 * This function does NOT use draftMode since it runs at build time
 */
export async function getAllRutasSlugsData() {
  return fetchAllRutasInternal()
}
