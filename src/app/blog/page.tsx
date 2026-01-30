import { getAllBlogPostsData } from "@/lib/data"
import BlogListingClient from "./blog-listing-client"

export const revalidate = 600

export default async function BlogListingPage() {
  const posts = await getAllBlogPostsData()

  return <BlogListingClient posts={posts} />
}
