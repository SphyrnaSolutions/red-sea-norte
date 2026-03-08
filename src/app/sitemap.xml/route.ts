import { getAllOfertasSlugsData } from '@/lib/data/ofertas'
import { getAllCursosSlugsData } from '@/lib/data/cursos'
import { getAllExperienciasSlugsData } from '@/lib/data/experiencias'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/** Categories that always have content */
const STATIC_CATEGORIES = ['blog', 'rutas', 'pages', 'images']

/**
 * Sitemap index -- links to per-category sitemaps for focused crawl budget.
 * Excludes empty sitemaps to avoid wasting crawl budget.
 * Serves at /sitemap.xml
 */
export async function GET() {
  const categories = [...STATIC_CATEGORIES]

  // Only include dynamic categories if they have content
  const [ofertas, cursos, experiencias] = await Promise.all([
    getAllOfertasSlugsData().catch(() => []),
    getAllCursosSlugsData().catch(() => []),
    getAllExperienciasSlugsData().catch(() => []),
  ])

  if (ofertas.length > 0) categories.push('ofertas')
  if (cursos.length > 0) categories.push('cursos')
  if (experiencias.length > 0) categories.push('experiencias')

  const now = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories
  .map(
    (cat) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/${cat}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
