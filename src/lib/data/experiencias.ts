import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getAllExperiencias, getExperiencia } from '@/lib/wagtail/fetchers'
import { getAllExperiencias as getAllMockExperiencias, getExperiencia as getMockExperiencia } from '@/lib/mock-data/experiencias'
import { shouldUseFallback, logDataError } from './config'

async function fetchAllExperienciasInternal() {
  try {
    const data = await getAllExperiencias()
    if (!data || data.length === 0) throw new Error('No experiencias received from API')
    return data
  } catch (error) {
    logDataError(error, 'fetchAllExperiencias')
    if (shouldUseFallback(error, 'experiencias')) {
      console.warn('[Data Layer] Using mock data fallback for experiencias')
      return getAllMockExperiencias()
    }
    throw error
  }
}

async function fetchExperienciaInternal(slug: string) {
  try {
    const data = await getExperiencia(slug)
    if (!data) {
      const mockExperiencia = getMockExperiencia(slug)
      if (mockExperiencia) return mockExperiencia
      // Return null instead of throwing - let the page handle notFound()
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `fetchExperiencia(${slug})`)
    if (shouldUseFallback(error, 'experiencias')) {
      const mockExperiencia = getMockExperiencia(slug)
      if (mockExperiencia) {
        console.warn(`[Data Layer] Using mock data fallback for experiencia: ${slug}`)
        return mockExperiencia
      }
    }
    // Return null on error instead of throwing
    return null
  }
}

export async function getAllExperienciasData() {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchAllExperienciasInternal()

  const getCachedExperiencias = unstable_cache(
    fetchAllExperienciasInternal,
    ['experiencias'],
    { tags: ['experiencias', 'experiencias-list'], revalidate: 1800 }
  )
  return getCachedExperiencias()
}

export async function getExperienciaData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchExperienciaInternal(slug)

  const getCachedExperiencia = unstable_cache(
    () => fetchExperienciaInternal(slug),
    ['experiencia', slug],
    { tags: ['experiencias', `experiencia-${slug}`], revalidate: 1800 }
  )
  return getCachedExperiencia()
}

/**
 * Get all experiencia slugs for generateStaticParams
 * This function does NOT use draftMode since it runs at build time
 */
export async function getAllExperienciasSlugsData() {
  return fetchAllExperienciasInternal()
}
