import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Content type -> cache tag mapping.
 * Must match tags used in src/lib/data/ fetchers.
 */
const CONTENT_TAG_MAP: Record<string, { listTags: string[]; slugTag: (slug: string) => string }> = {
  blog: {
    listTags: ['blog', 'blog-list'],
    slugTag: (slug) => `blog-${slug}`,
  },
  rutas: {
    listTags: ['rutas', 'rutas-list'],
    slugTag: (slug) => `ruta-${slug}`,
  },
  experiencias: {
    listTags: ['experiencias', 'experiencias-list'],
    slugTag: (slug) => `experiencia-${slug}`,
  },
  ofertas: {
    listTags: ['ofertas', 'ofertas-list'],
    slugTag: (slug) => `oferta-${slug}`,
  },
  cursos: {
    listTags: ['cursos', 'cursos-list'],
    slugTag: (slug) => `curso-${slug}`,
  },
  homepage: {
    listTags: ['homepage'],
    slugTag: () => 'homepage',
  },
}

interface RevalidateRequest {
  secret?: string
  type?: string
  slug?: string
}

export async function POST(request: Request) {
  try {
    const secret = process.env.REVALIDATION_SECRET

    if (!secret) {
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 500 },
      )
    }

    const body = (await request.json()) as RevalidateRequest

    if (!body.secret || body.secret !== secret) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 },
      )
    }

    const contentType = body.type
    if (!contentType || !(contentType in CONTENT_TAG_MAP)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${Object.keys(CONTENT_TAG_MAP).join(', ')}` },
        { status: 400 },
      )
    }

    const tagConfig = CONTENT_TAG_MAP[contentType]

    // Revalidate list tags (always)
    for (const tag of tagConfig.listTags) {
      revalidateTag(tag, { expire: 0 })
    }

    // Revalidate specific slug tag if provided
    if (body.slug) {
      revalidateTag(tagConfig.slugTag(body.slug), { expire: 0 })
    }

    return NextResponse.json({
      revalidated: true,
      type: contentType,
      ...(body.slug ? { slug: body.slug } : {}),
    })
  } catch (error) {
    console.error('[Revalidate API] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
