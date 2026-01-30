import type { MetadataRoute } from 'next'
import {
  getAllBlogPostSlugsData,
  getAllOfertasSlugsData,
  getAllRutasSlugsData,
  getAllCursosSlugsData,
  getAllExperienciasSlugsData,
} from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic content in parallel
  const [blogPosts, ofertas, rutas, cursos, experiencias] = await Promise.all([
    getAllBlogPostSlugsData(),
    getAllOfertasSlugsData(),
    getAllRutasSlugsData(),
    getAllCursosSlugsData(),
    getAllExperienciasSlugsData(),
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Blog posts
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Ofertas
  const ofertasUrls: MetadataRoute.Sitemap = ofertas
    .filter((oferta): oferta is NonNullable<typeof oferta> => oferta !== null)
    .map((oferta) => ({
      url: `${BASE_URL}/ofertas/${oferta.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))

  // Rutas
  const rutasUrls: MetadataRoute.Sitemap = rutas.map((ruta) => ({
    url: `${BASE_URL}/rutas/${ruta.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Cursos
  const cursosUrls: MetadataRoute.Sitemap = cursos.map((curso) => ({
    url: `${BASE_URL}/cursos/${curso.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Experiencias
  const experienciasUrls: MetadataRoute.Sitemap = experiencias.map((exp) => ({
    url: `${BASE_URL}/experiencias/${exp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...blogUrls,
    ...ofertasUrls,
    ...rutasUrls,
    ...cursosUrls,
    ...experienciasUrls,
  ]
}
