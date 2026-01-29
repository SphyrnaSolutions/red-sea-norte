/**
 * Wagtail API Integration
 *
 * Exporta todas las funciones de integración con Wagtail CMS
 */

// Client functions (bajo nivel)
export { getPages, getPage, getPageBySlug, getImage, searchPages, getPreviewPage } from './client'
export type { WagtailPage } from './client'

// Wagtail types
export type {
  WagtailImage,
  WagtailStreamFieldBlock,
  WagtailHomePage,
  WagtailBlogPostPage,
  WagtailRutaPage,
  WagtailExperienciaPage,
  WagtailOfertaPage,
  WagtailCursoPage,
  WagtailAuthor,
  WagtailCategory,
  WagtailItineraryDay,
  WagtailTestimonio,
  WagtailModulo,
} from './types'

// Mappers
export {
  mapHomePage,
  mapBlogPost,
  mapRutaPage,
  mapExperienciaPage,
  mapOfertaPage,
  mapCursoPage,
} from './mappers'

// Fetchers (alto nivel - estas son las que usarás en las páginas)
export {
  // Homepage
  getHomepage,

  // Blog
  getAllBlogPosts,
  getBlogPost,
  getAllBlogPostSlugs,

  // Rutas
  getAllRutas,
  getRuta,
  getAllRutaSlugs,

  // Experiencias
  getAllExperiencias,
  getExperiencia,
  getAllExperienciaSlugs,

  // Ofertas
  getAllOfertas,
  getOferta,
  getAllOfertaSlugs,

  // Cursos
  getAllCursos,
  getCurso,
  getAllCursoSlugs,
} from './fetchers'
