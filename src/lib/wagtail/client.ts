/**
 * Wagtail API Client
 *
 * Native fetch client for Wagtail API v2 with Next.js ISR caching.
 * Uses fetch() with next.revalidate for per-request caching.
 */

const WAGTAIL_API_URL = process.env.NEXT_PUBLIC_WAGTAIL_API_URL || 'http://localhost:8000/api/v2'
const SITE_HOSTNAME = process.env.NEXT_PUBLIC_SITE_HOSTNAME || 'localhost'

// ============================================================================
// Types
// ============================================================================

export interface FetchConfig {
  revalidate?: number | false
  tags?: string[]
}

export interface WagtailAPIResponse<T> {
  meta: {
    total_count: number
  }
  items: T[]
}

export interface WagtailPageMeta {
  type: string
  detail_url: string
  html_url: string | null
  slug: string
  first_published_at: string
  last_published_at?: string
  locale: string
}

interface DownloadableImage {
  url?: string
  meta?: {
    download_url?: string
  }
}

export interface WagtailPage {
  id: number
  meta: WagtailPageMeta
  title: string
  [key: string]: unknown
}

// ============================================================================
// Core Fetch
// ============================================================================

const BATCH_SIZE = 20

/**
 * Low-level fetch wrapper for Wagtail API.
 * Every call includes next.revalidate for ISR compatibility.
 */
async function wagtailFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
  config: FetchConfig = {}
): Promise<T> {
  const url = new URL(`${WAGTAIL_API_URL}${endpoint}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value)
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Wagtail API] GET ${url.pathname}${url.search}`)
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(10000),
    next: {
      revalidate: config.revalidate ?? 3600,
      ...(config.tags?.length ? { tags: config.tags } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(
      `Wagtail API error: ${response.status} ${response.statusText} for ${endpoint}`
    )
  }

  return response.json()
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Fetch all pages of a given type with offset-based pagination.
 * Accumulates all items across batches until total_count is reached.
 */
export async function getPages<T extends WagtailPage>(
  type: string,
  params?: Record<string, string>,
  config?: FetchConfig
): Promise<T[]> {
  const MAX_ITERATIONS = 50
  let allItems: T[] = []
  let offset = 0

  for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
    const response = await wagtailFetch<WagtailAPIResponse<T>>(
      '/pages/',
      {
        type,
        site: SITE_HOSTNAME,
        fields: '*',
        limit: String(BATCH_SIZE),
        offset: String(offset),
        ...params,
      },
      config
    )

    allItems = [...allItems, ...response.items]

    if (response.items.length === 0 || allItems.length >= response.meta.total_count) {
      break
    }
    offset += BATCH_SIZE
  }

  return allItems
}

/**
 * Fetch a single page by ID.
 * Returns null for 404, throws for other errors.
 */
export async function getPage<T extends WagtailPage>(
  id: number,
  config?: FetchConfig
): Promise<T | null> {
  try {
    return await wagtailFetch<T>(
      `/pages/${id}/`,
      {
        fields: '*',
        site: SITE_HOSTNAME,
      },
      config
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return null
    }
    throw error
  }
}

/**
 * Fetch a page by its slug and content type.
 * Returns null if no matching page found.
 */
export async function getPageBySlug<T extends WagtailPage>(
  type: string,
  slug: string,
  config?: FetchConfig
): Promise<T | null> {
  const response = await wagtailFetch<WagtailAPIResponse<T>>(
    '/pages/',
    {
      type,
      site: SITE_HOSTNAME,
      slug,
      fields: '*',
    },
    config
  )

  return response.items[0] || null
}

/**
 * Fetch an image by ID.
 */
export async function getImage(
  id: number,
  config?: FetchConfig
): Promise<DownloadableImage | null> {
  try {
    return await wagtailFetch<DownloadableImage>(
      `/images/${id}/`,
      {
        site: SITE_HOSTNAME,
      },
      config
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return null
    }
    throw error
  }
}

/**
 * Search pages by query string.
 */
export async function searchPages<T extends WagtailPage>(
  query: string,
  type?: string,
  config?: FetchConfig
): Promise<T[]> {
  const response = await wagtailFetch<WagtailAPIResponse<T>>(
    '/pages/',
    {
      search: query,
      site: SITE_HOSTNAME,
      fields: '*',
      ...(type ? { type } : {}),
    },
    config
  )

  return response.items
}

/**
 * Fetch preview content with token.
 * Used by pages in Draft Mode. Never cached.
 */
export async function getPreviewPage<T extends WagtailPage>(
  contentType: string,
  token: string
): Promise<T | null> {
  try {
    return await wagtailFetch<T>(
      '/page_preview/',
      {
        content_type: contentType,
        token,
        site: SITE_HOSTNAME,
      },
      { revalidate: 0 }
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Wagtail Preview] Error:', error)
    }
    return null
  }
}
