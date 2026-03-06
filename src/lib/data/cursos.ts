import { draftMode } from 'next/headers'
import { getAllCursos, getCurso } from '@/lib/wagtail/fetchers'
import { getAllCursos as getAllMockCursos, getCurso as getMockCurso } from '@/lib/mock-data/cursos'
import { shouldUseFallback, logDataError } from './config'

export async function getAllCursosData() {
  const { isEnabled: isDraft } = await draftMode()

  try {
    const data = await getAllCursos({
      revalidate: isDraft ? 0 : 3600,
      tags: ['cursos', 'cursos-list'],
    })
    if (!data || data.length === 0) throw new Error('No cursos received from API')
    return data
  } catch (error) {
    logDataError(error, 'getAllCursosData')
    if (shouldUseFallback(error, 'cursos')) {
      console.warn('[Data Layer] Using mock data fallback for cursos')
      return getAllMockCursos()
    }
    throw error
  }
}

export async function getCursoData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()

  try {
    const data = await getCurso(slug, {
      revalidate: isDraft ? 0 : 3600,
      tags: ['cursos', `curso-${slug}`],
    })
    if (!data) {
      const mockCurso = getMockCurso(slug)
      if (mockCurso && shouldUseFallback(null, 'cursos')) return mockCurso
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `getCursoData(${slug})`)
    if (shouldUseFallback(error, 'cursos')) {
      const mockCurso = getMockCurso(slug)
      if (mockCurso) {
        console.warn(`[Data Layer] Using mock data fallback for curso: ${slug}`)
        return mockCurso
      }
    }
    throw error
  }
}

/**
 * Get all curso slugs with lastModified dates.
 * Used by generateStaticParams and sitemap.
 */
export async function getAllCursosSlugsData() {
  try {
    const cursos = await getAllCursos({
      revalidate: 3600,
      tags: ['cursos', 'cursos-list'],
    })
    return cursos.map(c => ({
      slug: c.slug,
      lastModified: undefined as string | undefined,
    }))
  } catch (error) {
    logDataError(error, 'getAllCursosSlugsData')
    if (shouldUseFallback(error, 'cursos')) {
      return getAllMockCursos().map(c => ({
        slug: c.slug,
        lastModified: undefined as string | undefined,
      }))
    }
    throw error
  }
}
