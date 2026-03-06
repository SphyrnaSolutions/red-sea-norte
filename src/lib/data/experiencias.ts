import { draftMode } from 'next/headers'
import { getAllExperiencias, getExperiencia } from '@/lib/wagtail/fetchers'
import { getAllExperiencias as getAllMockExperiencias, getExperiencia as getMockExperiencia } from '@/lib/mock-data/experiencias'
import { shouldUseFallback, logDataError } from './config'

export async function getAllExperienciasData() {
  const { isEnabled: isDraft } = await draftMode()

  try {
    const data = await getAllExperiencias({
      revalidate: isDraft ? 0 : 1800,
      tags: ['experiencias', 'experiencias-list'],
    })
    if (!data || data.length === 0) throw new Error('No experiencias received from API')
    return data
  } catch (error) {
    logDataError(error, 'getAllExperienciasData')
    if (shouldUseFallback(error, 'experiencias')) {
      console.warn('[Data Layer] Using mock data fallback for experiencias')
      return getAllMockExperiencias()
    }
    throw error
  }
}

export async function getExperienciaData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()

  try {
    const data = await getExperiencia(slug, {
      revalidate: isDraft ? 0 : 1800,
      tags: ['experiencias', `experiencia-${slug}`],
    })
    if (!data) {
      const mockExperiencia = getMockExperiencia(slug)
      if (mockExperiencia && shouldUseFallback(null, 'experiencias')) return mockExperiencia
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `getExperienciaData(${slug})`)
    if (shouldUseFallback(error, 'experiencias')) {
      const mockExperiencia = getMockExperiencia(slug)
      if (mockExperiencia) {
        console.warn(`[Data Layer] Using mock data fallback for experiencia: ${slug}`)
        return mockExperiencia
      }
    }
    throw error
  }
}

/**
 * Get all experiencia slugs with lastModified dates.
 * Used by generateStaticParams and sitemap.
 * Returns empty array on error (never throws) so builds succeed without Wagtail.
 */
export async function getAllExperienciasSlugsData() {
  try {
    const experiencias = await getAllExperiencias({
      revalidate: 1800,
      tags: ['experiencias', 'experiencias-list'],
    })
    return experiencias.map(e => ({
      slug: e.slug,
      lastModified: undefined as string | undefined,
    }))
  } catch (error) {
    logDataError(error, 'getAllExperienciasSlugsData')
    if (shouldUseFallback(error, 'experiencias')) {
      return getAllMockExperiencias().map(e => ({
        slug: e.slug,
        lastModified: undefined as string | undefined,
      }))
    }
    return []
  }
}
