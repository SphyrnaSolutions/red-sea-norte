import { homepageData as mockData } from '@/lib/mock-data/homepage'

/**
 * Homepage uses mock-data directly (hybrid approach).
 * Mock-data contains real verified product data (updated in phase 08-01).
 * CMS homepage content is generic — will be migrated in a future phase.
 */
export async function getHomePageData() {
  return mockData
}
