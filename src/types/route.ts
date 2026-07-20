import type { Content } from './content'

export interface Route {
  id: number
  slug: string
  type: 'page' | 'listing'
  title: string
  subtitle?: string
  heroImage?: string
  content: Content['body']
  jsonLd?: Record<string, unknown>
  priority?: number
  updatedAt: string
}
