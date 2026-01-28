/**
 * Wagtail API Client
 *
 * Cliente base para conectar con Wagtail API v2
 *
 * NOTA sobre caching ISR:
 * Al usar axios en lugar de fetch, el caching ISR de Next.js se debe configurar
 * a nivel de página/route con:
 * - export const revalidate = 3600 // para páginas estáticas
 * - unstable_cache() para wrappear funciones específicas
 *
 * Ejemplo en tu página:
 * export const revalidate = 3600 // revalidar cada hora
 */

import axios, { AxiosInstance } from 'axios'

const WAGTAIL_API_URL = process.env.NEXT_PUBLIC_WAGTAIL_API_URL || 'http://localhost:8000/api/v2'
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || '1'

// Configurar instancia de axios
const wagtailClient: AxiosInstance = axios.create({
  baseURL: WAGTAIL_API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para logging en desarrollo
if (process.env.NODE_ENV === 'development') {
  wagtailClient.interceptors.request.use(
    (config) => {
      console.log(`[Wagtail API] ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    (error) => {
      console.error('[Wagtail API] Request error:', error)
      return Promise.reject(error)
    }
  )

  wagtailClient.interceptors.response.use(
    (response) => {
      console.log(`[Wagtail API] Response ${response.status} from ${response.config.url}`)
      return response
    },
    (error) => {
      console.error('[Wagtail API] Response error:', error.response?.status, error.message)
      return Promise.reject(error)
    }
  )
}

interface WagtailAPIResponse<T> {
  meta: {
    total_count: number
  }
  items: T[]
}

interface WagtailPageMeta {
  type: string
  detail_url: string
  html_url: string | null
  slug: string
  first_published_at: string
  locale: string
}

export interface WagtailPage {
  id: number
  meta: WagtailPageMeta
  title: string
  [key: string]: any
}

/**
 * Fetch múltiples páginas con filtros
 */
export async function getPages<T extends WagtailPage>(
  type: string,
  params?: Record<string, string>
): Promise<T[]> {
  try {
    const response = await wagtailClient.get<WagtailAPIResponse<T>>('/pages/', {
      params: {
        type,
        site: SITE_ID,
        fields: '*',
        ...params,
      },
    })

    return response.data.items
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching pages from Wagtail:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      })
    } else {
      console.error('Error fetching pages from Wagtail:', error)
    }
    throw error
  }
}

/**
 * Fetch página específica por ID
 */
export async function getPage<T extends WagtailPage>(id: number): Promise<T | null> {
  try {
    const response = await wagtailClient.get<T>(`/pages/${id}/`, {
      params: {
        fields: '*',
      },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null
      }
      console.error(`Error fetching page ${id} from Wagtail:`, {
        status: error.response?.status,
        message: error.message,
      })
    } else {
      console.error(`Error fetching page ${id} from Wagtail:`, error)
    }
    throw error
  }
}

/**
 * Fetch página por slug
 */
export async function getPageBySlug<T extends WagtailPage>(
  type: string,
  slug: string
): Promise<T | null> {
  try {
    const response = await wagtailClient.get<WagtailAPIResponse<T>>('/pages/', {
      params: {
        type,
        site: SITE_ID,
        slug,
        fields: '*',
      },
    })

    return response.data.items[0] || null
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching page with slug "${slug}" from Wagtail:`, {
        status: error.response?.status,
        message: error.message,
      })
    } else {
      console.error(`Error fetching page with slug "${slug}" from Wagtail:`, error)
    }
    return null
  }
}

/**
 * Fetch imagen de Wagtail
 */
export async function getImage(id: number): Promise<any> {
  try {
    const response = await wagtailClient.get(`/images/${id}/`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching image ${id} from Wagtail:`, {
        status: error.response?.status,
        message: error.message,
      })
    } else {
      console.error(`Error fetching image ${id} from Wagtail:`, error)
    }
    return null
  }
}

/**
 * Buscar páginas
 */
export async function searchPages<T extends WagtailPage>(
  query: string,
  type?: string
): Promise<T[]> {
  try {
    const response = await wagtailClient.get<WagtailAPIResponse<T>>('/pages/', {
      params: {
        search: query,
        site: SITE_ID,
        fields: '*',
        ...(type && { type }),
      },
    })

    return response.data.items
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error searching pages in Wagtail:', {
        status: error.response?.status,
        message: error.message,
      })
    } else {
      console.error('Error searching pages in Wagtail:', error)
    }
    return []
  }
}
