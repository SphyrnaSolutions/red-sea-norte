import type { MetadataRoute } from 'next'
import {
  getAllBlogPostSlugsData,
  getAllOfertasSlugsData,
  getAllRutasSlugsData,
  getAllCursosSlugsData,
  getAllExperienciasSlugsData,
} from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages -- use new Date() since these are dynamically rendered
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

  try {
    // Fetch all dynamic content in parallel
    const [blogPosts, ofertas, rutas, cursos, experiencias] = await Promise.all([
      getAllBlogPostSlugsData(),
      getAllOfertasSlugsData(),
      getAllRutasSlugsData(),
      getAllCursosSlugsData(),
      getAllExperienciasSlugsData(),
    ])

    // Blog posts -- use real publishedAt dates from Wagtail
    const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      ...(post.lastModified ? { lastModified: new Date(post.lastModified) } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Ofertas
    const ofertasUrls: MetadataRoute.Sitemap = ofertas.map((oferta) => ({
      url: `${BASE_URL}/ofertas/${oferta.slug}`,
      ...(oferta.lastModified ? { lastModified: new Date(oferta.lastModified) } : {}),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))

    // Rutas
    const rutasUrls: MetadataRoute.Sitemap = rutas.map((ruta) => ({
      url: `${BASE_URL}/rutas/${ruta.slug}`,
      ...(ruta.lastModified ? { lastModified: new Date(ruta.lastModified) } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Cursos
    const cursosUrls: MetadataRoute.Sitemap = cursos.map((curso) => ({
      url: `${BASE_URL}/cursos/${curso.slug}`,
      ...(curso.lastModified ? { lastModified: new Date(curso.lastModified) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Experiencias
    const experienciasUrls: MetadataRoute.Sitemap = experiencias.map((exp) => ({
      url: `${BASE_URL}/experiencias/${exp.slug}`,
      ...(exp.lastModified ? { lastModified: new Date(exp.lastModified) } : {}),
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
  } catch (error) {
    // If Wagtail is down, return only static pages so sitemap.xml always resolves
    console.error('[Sitemap] Error fetching dynamic content:', error)
    return staticPages
  }
}
