import { getAllCursosSlugsData } from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export async function GET() {
  const cursos = await getAllCursosSlugsData()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cursos
  .map(
    (curso) => `  <url>
    <loc>${BASE_URL}/cursos/${curso.slug}</loc>${
      curso.lastModified
        ? `\n    <lastmod>${new Date(curso.lastModified).toISOString().split('T')[0]}</lastmod>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
