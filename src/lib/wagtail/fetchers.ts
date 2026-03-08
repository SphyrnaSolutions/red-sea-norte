/**
 * Wagtail Content Fetchers
 *
 * Content-type-specific functions that call the low-level client.
 * Errors propagate to the data layer which handles fallback logic.
 */

import { getPages, getPageBySlug } from './client'
import type { FetchConfig } from './client'
import {
  mapHomePage,
  mapBlogPost,
  mapRutaPage,
  mapExperienciaPage,
  mapOfertaPage,
  mapCursoPage,
} from './mappers'
import type {
  WagtailHomePage,
  WagtailBlogPostPage,
  WagtailRutaPage,
  WagtailExperienciaPage,
  WagtailOfertaPage,
  WagtailCursoPage,
  WagtailPageWithSEO,
} from './types'
import type {
  HomepageData,
  BlogPost,
  BlogPostListing,
  RutaData,
  ExperienciaData,
  OfertaData,
  CursoData,
} from '../mock-data/types'

// ============================================================================
// Homepage
// ============================================================================

/**
 * Obtener datos de la homepage
 */
export async function getHomepage(config?: FetchConfig): Promise<HomepageData | null> {
  const pages = await getPages<WagtailHomePage>('home.HomePage', undefined, config)

  if (pages.length === 0) {
    console.warn('No homepage found in Wagtail')
    return null
  }

  return mapHomePage(pages[0])
}

// ============================================================================
// Blog
// ============================================================================

/**
 * Obtener todos los posts del blog
 */
export async function getAllBlogPosts(config?: FetchConfig): Promise<BlogPost[]> {
  const pages = await getPages<WagtailBlogPostPage>('blog.BlogPostPage', undefined, config)

  return pages
    .map(mapBlogPost)
    .sort((a, b) => {
      const aTime = Date.parse(a.publishedAt || '')
      const bTime = Date.parse(b.publishedAt || '')

      if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0
      if (Number.isNaN(aTime)) return 1
      if (Number.isNaN(bTime)) return -1

      return bTime - aTime
    })
}

/**
 * Obtener un post especifico por slug
 */
export async function getBlogPost(slug: string, config?: FetchConfig): Promise<BlogPost | null> {
  const page = await getPageBySlug<WagtailBlogPostPage>('blog.BlogPostPage', slug, config)

  if (!page) {
    return null
  }

  return mapBlogPost(page)
}

/**
 * Obtener slugs de todos los posts (para generateStaticParams)
 */
export async function getAllBlogPostSlugs(config?: FetchConfig): Promise<string[]> {
  const listingFields = 'title,excerpt,published_at,read_time,author,category,hero_image,hero_alt'
  const pages = await getPages<WagtailBlogPostPage>(
    'blog.BlogPostPage',
    undefined,
    { ...config, fields: listingFields }
  )
  return pages.map(page => page.meta.slug)
}

/**
 * Obtener todos los posts sin body (para listing page)
 * Requests only listing fields to avoid serializing full StreamField bodies.
 */
export async function getAllBlogPostsListing(config?: FetchConfig): Promise<BlogPostListing[]> {
  const listingFields = 'title,excerpt,published_at,read_time,author,category,hero_image,hero_alt'
  const pages = await getPages<WagtailBlogPostPage>(
    'blog.BlogPostPage',
    undefined,
    { ...config, fields: listingFields }
  )

  return pages
    .map(page => {
      const full = mapBlogPost(page)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { body, ...listing } = full
      return listing
    })
    .sort((a, b) => {
      const aTime = Date.parse(a.publishedAt || '')
      const bTime = Date.parse(b.publishedAt || '')
      if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0
      if (Number.isNaN(aTime)) return 1
      if (Number.isNaN(bTime)) return -1
      return bTime - aTime
    })
}

// ============================================================================
// Rutas
// ============================================================================

/**
 * Obtener todas las rutas
 */
export async function getAllRutas(config?: FetchConfig): Promise<RutaData[]> {
  const pages = await getPages<WagtailRutaPage>('rutas.RutaPage', undefined, config)
  return pages.map(mapRutaPage)
}

/**
 * Obtener una ruta especifica por slug
 */
export async function getRuta(slug: string, config?: FetchConfig): Promise<RutaData | null> {
  const page = await getPageBySlug<WagtailRutaPage>('rutas.RutaPage', slug, config)

  if (!page) {
    return null
  }

  return mapRutaPage(page)
}

/**
 * Obtener slugs de todas las rutas (para generateStaticParams)
 */
export async function getAllRutaSlugs(config?: FetchConfig): Promise<string[]> {
  const pages = await getPages<WagtailRutaPage>('rutas.RutaPage', undefined, config)
  return pages.map(page => page.meta.slug)
}

// ============================================================================
// Experiencias
// ============================================================================

/**
 * Obtener todas las experiencias
 */
export async function getAllExperiencias(config?: FetchConfig): Promise<ExperienciaData[]> {
  const pages = await getPages<WagtailExperienciaPage>('experiencias.ExperienciaPage', undefined, config)
  return pages.map(mapExperienciaPage)
}

/**
 * Obtener una experiencia especifica por slug
 */
export async function getExperiencia(slug: string, config?: FetchConfig): Promise<ExperienciaData | null> {
  const page = await getPageBySlug<WagtailExperienciaPage>('experiencias.ExperienciaPage', slug, config)

  if (!page) {
    return null
  }

  return mapExperienciaPage(page)
}

/**
 * Obtener slugs de todas las experiencias (para generateStaticParams)
 */
export async function getAllExperienciaSlugs(config?: FetchConfig): Promise<string[]> {
  const pages = await getPages<WagtailExperienciaPage>('experiencias.ExperienciaPage', undefined, config)
  return pages.map(page => page.meta.slug)
}

// ============================================================================
// Ofertas
// ============================================================================

/**
 * Obtener todas las ofertas
 */
export async function getAllOfertas(config?: FetchConfig): Promise<OfertaData[]> {
  const pages = await getPages<WagtailOfertaPage>('ofertas.OfertaPage', undefined, config)
  return pages.map(mapOfertaPage)
}

/**
 * Obtener una oferta especifica por slug
 */
export async function getOferta(slug: string, config?: FetchConfig): Promise<OfertaData | null> {
  const page = await getPageBySlug<WagtailOfertaPage>('ofertas.OfertaPage', slug, config)

  if (!page) {
    return null
  }

  return mapOfertaPage(page)
}

/**
 * Obtener slugs de todas las ofertas (para generateStaticParams)
 */
export async function getAllOfertaSlugs(config?: FetchConfig): Promise<string[]> {
  const pages = await getPages<WagtailOfertaPage>('ofertas.OfertaPage', undefined, config)
  return pages.map(page => page.meta.slug)
}

// ============================================================================
// Cursos
// ============================================================================

/**
 * Obtener todos los cursos
 */
export async function getAllCursos(config?: FetchConfig): Promise<CursoData[]> {
  const pages = await getPages<WagtailCursoPage>('cursos.CursoPage', undefined, config)
  return pages.map(mapCursoPage)
}

/**
 * Obtener un curso especifico por slug
 */
export async function getCurso(slug: string, config?: FetchConfig): Promise<CursoData | null> {
  const page = await getPageBySlug<WagtailCursoPage>('cursos.CursoPage', slug, config)

  if (!page) {
    return null
  }

  return mapCursoPage(page)
}

/**
 * Obtener slugs de todos los cursos (para generateStaticParams)
 */
export async function getAllCursoSlugs(config?: FetchConfig): Promise<string[]> {
  const pages = await getPages<WagtailCursoPage>('cursos.CursoPage', undefined, config)
  return pages.map(page => page.meta.slug)
}

// ============================================================================
// Raw Page Fetchers (for SEO/cluster resolution)
// ============================================================================

/**
 * Fetch raw Wagtail page by slug and type for cluster resolution.
 * Returns the unprocessed page with cluster fields intact.
 */
export async function getRawPageBySlug(
  type: string,
  slug: string,
  config?: FetchConfig
): Promise<WagtailPageWithSEO | null> {
  const page = await getPageBySlug<WagtailPageWithSEO>(type, slug, config)
  return page || null
}
