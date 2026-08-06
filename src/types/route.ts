import type { Content, SeoData } from './content'

export interface Breadcrumb {
  label: string
  path: string
}

export interface Route {
  id: number
  slug: string
  type: 'page' | 'listing' | 'detail'
  title: string
  subtitle?: string
  heroImage?: string
  content: Content['body']
  jsonLd?: Record<string, unknown>
  priority?: number
  updatedAt: string
  /** Detail-route fields returned by the resolver */
  entityType?: string
  template?: string
  canonicalPath?: string
  breadcrumbs?: Breadcrumb[]
  data?: Record<string, unknown>
  seo?: SeoData
  schemas?: Record<string, unknown>[]
  /** Set when the resolver found a redirect instead of a route */
  redirect?: { destinationPath: string; status: number }
}
