import { getAllBlogPosts, getBlogPost } from '@/lib/wagtail/fetchers'
import { blogPosts as mockPosts } from '@/lib/mock-data/blog-posts'
import { shouldUseFallback, logDataError } from './config'

export async function getAllBlogPostsData() {
  try {
    const data = await getAllBlogPosts({
      revalidate: 600,
      tags: ['blog', 'blog-list'],
    })
    if (!data || data.length === 0) throw new Error('No blog posts received from API')
    return data
  } catch (error) {
    logDataError(error, 'getAllBlogPostsData')
    if (shouldUseFallback(error, 'blog')) {
      console.warn('[Data Layer] Using mock data fallback for blog posts')
      return mockPosts
    }
    throw error
  }
}

export async function getBlogPostData(slug: string) {
  try {
    const data = await getBlogPost(slug, {
      revalidate: 600,
      tags: ['blog', `blog-${slug}`],
    })
    if (!data) {
      if (shouldUseFallback(null, 'blog')) {
        const mockPost = mockPosts.find(p => p.slug === slug)
        if (mockPost) return mockPost
      }
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `getBlogPostData(${slug})`)
    if (shouldUseFallback(error, 'blog')) {
      const mockPost = mockPosts.find(p => p.slug === slug)
      if (mockPost) {
        console.warn(`[Data Layer] Using mock data fallback for blog post: ${slug}`)
        return mockPost
      }
    }
    throw error
  }
}

/**
 * Get all blog post slugs with lastModified dates.
 * Used by generateStaticParams and sitemap.
 * Returns empty array on error (never throws) so builds succeed without Wagtail.
 */
export async function getAllBlogPostSlugsData() {
  try {
    const posts = await getAllBlogPosts({
      revalidate: 600,
      tags: ['blog', 'blog-list'],
    })
    return posts.map(p => ({
      slug: p.slug,
      lastModified: p.lastPublishedAt || p.publishedAt || undefined,
    }))
  } catch (error) {
    logDataError(error, 'getAllBlogPostSlugsData')
    if (shouldUseFallback(error, 'blog')) {
      return mockPosts.map(p => ({
        slug: p.slug,
        lastModified: p.lastPublishedAt || p.publishedAt || undefined,
      }))
    }
    return []
  }
}
