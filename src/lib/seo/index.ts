export {
  generateSchema,
  buildTouristTripSchema,
  buildArticleSchema,
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from './schema'
export type { SchemaType } from './schema'

export { buildPageMetadata, buildCanonicalUrl, BASE_URL } from './metadata'

export { resolveCluster } from './cluster-resolver'
export type { ClusterContext } from './cluster-resolver'
