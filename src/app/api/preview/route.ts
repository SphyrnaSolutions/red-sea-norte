import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const contentType = searchParams.get('content_type')

  // Validación
  if (!token || !contentType) {
    return new Response('Missing token or content_type', { status: 400 })
  }

  // Activar Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Fetch preview data desde Wagtail
  const wagtailUrl = process.env.NEXT_PUBLIC_WAGTAIL_URL || 'http://localhost:8000'
  const siteHostname = process.env.NEXT_PUBLIC_SITE_HOSTNAME || 'localhost:3000'
  const previewUrl = `${wagtailUrl}/api/v2/page_preview/?content_type=${contentType}&token=${token}&site=${siteHostname}`

  try {
    const response = await fetch(previewUrl, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Preview fetch failed:', response.status)
      return new Response('Failed to fetch preview', { status: 500 })
    }

    const previewData = await response.json()

    // Determinar path según content_type
    const contentTypeToPath: Record<string, (slug: string) => string> = {
      'rutas.rutapage': (slug) => `/rutas/${slug}`,
      'experiencias.experienciapage': (slug) => `/experiencias/${slug}`,
      'blog.blogpostpage': (slug) => `/blog/${slug}`,
      'ofertas.ofertapage': (slug) => `/ofertas/${slug}`,
      'cursos.cursopage': (slug) => `/cursos/${slug}`,
      'home.homepage': () => '/',
    }

    const pathResolver = contentTypeToPath[contentType.toLowerCase()]
    if (!pathResolver) {
      console.error('Unknown content type:', contentType)
      return new Response('Unknown content type', { status: 400 })
    }

    const slug = previewData.meta?.slug || ''
    const pagePath = pathResolver(slug)

    // Redirect a la página en draft mode
    redirect(pagePath)
  } catch (error) {
    console.error('Error fetching preview:', error)
    return new Response('Error fetching preview', { status: 500 })
  }
}
