import { draftMode } from 'next/headers'
import { getHomepage } from '@/lib/wagtail/fetchers'
import { homepageData as mockData } from '@/lib/mock-data/homepage'
import { shouldUseFallback, logDataError } from './config'

export async function getHomePageData() {
  const { isEnabled: isDraft } = await draftMode()

  try {
    const data = await getHomepage({
      revalidate: isDraft ? 0 : 600,
      tags: ['homepage'],
    })
    if (!data) throw new Error('No homepage data received from API')
    return data
  } catch (error) {
    logDataError(error, 'getHomePageData')
    if (shouldUseFallback(error, 'homepage')) {
      console.warn('[Data Layer] Using mock data fallback for homepage')
      return mockData
    }
    throw error
  }
}
