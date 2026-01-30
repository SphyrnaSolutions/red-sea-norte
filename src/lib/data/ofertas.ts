import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getAllOfertas, getOferta } from '@/lib/wagtail/fetchers'
import { getOferta as getMockOferta, getAllOfertaSlugs } from '@/lib/mock-data/ofertas'
import { shouldUseFallback, logDataError } from './config'

// Helper to get all mock ofertas as array
function getAllMockOfertas() {
  return getAllOfertaSlugs().map(slug => getMockOferta(slug)).filter(Boolean)
}

async function fetchAllOfertasInternal() {
  try {
    const data = await getAllOfertas()
    if (!data || data.length === 0) throw new Error('No ofertas received from API')
    return data
  } catch (error) {
    logDataError(error, 'fetchAllOfertas')
    if (shouldUseFallback(error, 'ofertas')) {
      console.warn('[Data Layer] Using mock data fallback for ofertas')
      return getAllMockOfertas()
    }
    throw error
  }
}

async function fetchOfertaInternal(slug: string) {
  try {
    const data = await getOferta(slug)
    if (!data) {
      const mockOferta = getMockOferta(slug)
      if (mockOferta) return mockOferta
      throw new Error(`Oferta not found: ${slug}`)
    }
    return data
  } catch (error) {
    logDataError(error, `fetchOferta(${slug})`)
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

export async function getAllOfertasData() {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchAllOfertasInternal()

  const getCachedOfertas = unstable_cache(
    fetchAllOfertasInternal,
    ['ofertas'],
    { tags: ['ofertas', 'ofertas-list'], revalidate: 900 }
  )
  return getCachedOfertas()
}

export async function getOfertaData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchOfertaInternal(slug)

  const getCachedOferta = unstable_cache(
    () => fetchOfertaInternal(slug),
    ['oferta', slug],
    { tags: ['ofertas', `oferta-${slug}`], revalidate: 900 }
  )
  return getCachedOferta()
}

/**
 * Get all oferta slugs for generateStaticParams
 * This function does NOT use draftMode since it runs at build time
 */
export async function getAllOfertasSlugsData() {
  return fetchAllOfertasInternal()
}
