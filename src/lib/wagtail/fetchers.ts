/**
 * Wagtail Content Fetchers
 *
 * Funciones específicas para obtener cada tipo de contenido desde Wagtail API
 * Estas funciones reemplazan las de mock-data
 */

import { getPages, getPageBySlug } from './client'
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
} from './types'
import type {
  HomepageData,
  BlogPost,
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
export async function getHomepage(): Promise<HomepageData | null> {
  try {
    const pages = await getPages<WagtailHomePage>('home.HomePage')

    if (pages.length === 0) {
      console.warn('No homepage found in Wagtail')
      return null
    }

    return mapHomePage(pages[0])
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
}

// ============================================================================
// Blog
// ============================================================================

/**
 * Obtener todos los posts del blog
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const pages = await getPages<WagtailBlogPostPage>('blog.BlogPostPage', {
      order: '-published_at', // Más recientes primero
    })

    return pages.map(mapBlogPost)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

/**
 * Obtener un post específico por slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const page = await getPageBySlug<WagtailBlogPostPage>('blog.BlogPostPage', slug)

    if (!page) {
      return null
    }

    return mapBlogPost(page)
  } catch (error) {
    console.error(`Error fetching blog post "${slug}":`, error)
    return null
  }
}

/**
 * Obtener slugs de todos los posts (para generateStaticParams)
 */
export async function getAllBlogPostSlugs(): Promise<string[]> {
  try {
    const pages = await getPages<WagtailBlogPostPage>('blog.BlogPostPage')
    return pages.map(page => page.meta.slug)
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}

// ============================================================================
// Rutas
// ============================================================================

/**
 * Obtener todas las rutas
 */
export async function getAllRutas(): Promise<RutaData[]> {
  try {
    const pages = await getPages<WagtailRutaPage>('rutas.RutaPage')
    return pages.map(mapRutaPage)
  } catch (error) {
    console.error('Error fetching rutas:', error)
    return []
  }
}

/**
 * Obtener una ruta específica por slug
 */
export async function getRuta(slug: string): Promise<RutaData | null> {
  try {
    const page = await getPageBySlug<WagtailRutaPage>('rutas.RutaPage', slug)

    if (!page) {
      return null
    }

    return mapRutaPage(page)
  } catch (error) {
    console.error(`Error fetching ruta "${slug}":`, error)
    return null
  }
}

/**
 * Obtener slugs de todas las rutas (para generateStaticParams)
 */
export async function getAllRutaSlugs(): Promise<string[]> {
  try {
    const pages = await getPages<WagtailRutaPage>('rutas.RutaPage')
    return pages.map(page => page.meta.slug)
  } catch (error) {
    console.error('Error fetching ruta slugs:', error)
    return []
  }
}

// ============================================================================
// Experiencias
// ============================================================================

/**
 * Obtener todas las experiencias
 */
export async function getAllExperiencias(): Promise<ExperienciaData[]> {
  try {
    const pages = await getPages<WagtailExperienciaPage>('experiencias.ExperienciaPage')
    return pages.map(mapExperienciaPage)
  } catch (error) {
    console.error('Error fetching experiencias:', error)
    return []
  }
}

/**
 * Obtener una experiencia específica por slug
 */
export async function getExperiencia(slug: string): Promise<ExperienciaData | null> {
  try {
    const page = await getPageBySlug<WagtailExperienciaPage>('experiencias.ExperienciaPage', slug)

    if (!page) {
      return null
    }

    return mapExperienciaPage(page)
  } catch (error) {
    console.error(`Error fetching experiencia "${slug}":`, error)
    return null
  }
}

/**
 * Obtener slugs de todas las experiencias (para generateStaticParams)
 */
export async function getAllExperienciaSlugs(): Promise<string[]> {
  try {
    const pages = await getPages<WagtailExperienciaPage>('experiencias.ExperienciaPage')
    return pages.map(page => page.meta.slug)
  } catch (error) {
    console.error('Error fetching experiencia slugs:', error)
    return []
  }
}

// ============================================================================
// Ofertas
// ============================================================================

/**
 * Obtener todas las ofertas
 */
export async function getAllOfertas(): Promise<OfertaData[]> {
  try {
    const pages = await getPages<WagtailOfertaPage>('ofertas.OfertaPage')
    return pages.map(mapOfertaPage)
  } catch (error) {
    console.error('Error fetching ofertas:', error)
    return []
  }
}

/**
 * Obtener una oferta específica por slug
 */
export async function getOferta(slug: string): Promise<OfertaData | null> {
  try {
    const page = await getPageBySlug<WagtailOfertaPage>('ofertas.OfertaPage', slug)

    if (!page) {
      return null
    }

    return mapOfertaPage(page)
  } catch (error) {
    console.error(`Error fetching oferta "${slug}":`, error)
    return null
  }
}

/**
 * Obtener slugs de todas las ofertas (para generateStaticParams)
 */
export async function getAllOfertaSlugs(): Promise<string[]> {
  try {
    const pages = await getPages<WagtailOfertaPage>('ofertas.OfertaPage')
    return pages.map(page => page.meta.slug)
  } catch (error) {
    console.error('Error fetching oferta slugs:', error)
    return []
  }
}

// ============================================================================
// Cursos
// ============================================================================

/**
 * Obtener todos los cursos
 */
export async function getAllCursos(): Promise<CursoData[]> {
  try {
    const pages = await getPages<WagtailCursoPage>('cursos.CursoPage')
    return pages.map(mapCursoPage)
  } catch (error) {
    console.error('Error fetching cursos:', error)
    return []
  }
}

/**
 * Obtener un curso específico por slug
 */
export async function getCurso(slug: string): Promise<CursoData | null> {
  try {
    const page = await getPageBySlug<WagtailCursoPage>('cursos.CursoPage', slug)

    if (!page) {
      return null
    }

    return mapCursoPage(page)
  } catch (error) {
    console.error(`Error fetching curso "${slug}":`, error)
    return null
  }
}

/**
 * Obtener slugs de todos los cursos (para generateStaticParams)
 */
export async function getAllCursoSlugs(): Promise<string[]> {
  try {
    const pages = await getPages<WagtailCursoPage>('cursos.CursoPage')
    return pages.map(page => page.meta.slug)
  } catch (error) {
    console.error('Error fetching curso slugs:', error)
    return []
  }
}
