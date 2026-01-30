import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getAllBlogPosts, getBlogPost } from '@/lib/wagtail/fetchers'
import { blogPosts as mockPosts } from '@/lib/mock-data/blog-posts'
import { shouldUseFallback, logDataError } from './config'

async function fetchAllBlogPostsInternal() {
  try {
    const data = await getAllBlogPosts()
    if (!data || data.length === 0) throw new Error('No blog posts received from API')
    return data
  } catch (error) {
    logDataError(error, 'fetchAllBlogPosts')
    if (shouldUseFallback(error, 'blog')) {
      console.warn('[Data Layer] Using mock data fallback for blog posts')
      return mockPosts
    }
    throw error
  }
}

async function fetchBlogPostInternal(slug: string) {
  try {
    const data = await getBlogPost(slug)
    if (!data) {
      const mockPost = mockPosts.find(p => p.slug === slug)
      if (mockPost) return mockPost
      // Return null instead of throwing - let the page handle notFound()
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `fetchBlogPost(${slug})`)
    if (shouldUseFallback(error, 'blog')) {
      const mockPost = mockPosts.find(p => p.slug === slug)
      if (mockPost) {
        console.warn(`[Data Layer] Using mock data fallback for blog post: ${slug}`)
        return mockPost
      }
    }
    // Return null on error instead of throwing
    return null
  }
}

export async function getAllBlogPostsData() {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchAllBlogPostsInternal()

  const getCachedPosts = unstable_cache(
    fetchAllBlogPostsInternal,
    ['blog-posts'],
    { tags: ['blog', 'blog-list'], revalidate: 600 }
  )
  return getCachedPosts()
}

export async function getBlogPostData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchBlogPostInternal(slug)

  const getCachedPost = unstable_cache(
    () => fetchBlogPostInternal(slug),
    ['blog-post', slug],
    { tags: ['blog', `blog-${slug}`], revalidate: 600 }
  )
  return getCachedPost()
}

/**
 * Get all blog post slugs for generateStaticParams
 * This function does NOT use draftMode since it runs at build time
 */
export async function getAllBlogPostSlugsData() {
  return fetchAllBlogPostsInternal()
}
