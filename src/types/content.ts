/** Content types matching the backend domain model */
export type ContentType =
  // articles.content_type values
  | 'guide' | 'plan' | 'blog' | 'story' | 'news'
  // entity types from the route resolver
  | 'attraction' | 'hotel' | 'destination' | 'business' | 'event'
  // generic page type
  | 'page'

export interface Content {
  id: number
  title: string
  slug: string
  excerpt?: string
  type: ContentType
  /** Backend field: content_type on articles table */
  content_type?: string
  status: 'draft' | 'published' | 'pending'
  thumbnail?: string
  heroImage?: string
  /** Backend field: secure_url from media relation */
  hero_image?: string
  subtitle?: string
  body: Block[]
  seo?: SeoData
  jsonLd?: Record<string, unknown>
  /** Backend fields */
  category?: { id: number; name: string; slug: string }
  author?: { id: number; name: string; slug?: string }
  createdAt: string
  updatedAt: string
}

export interface Block {
  type: 'text' | 'image' | 'gallery' | 'faq' | 'map'
  content: string
  data?: Record<string, unknown>
}

export interface SeoData {
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  canonicalUrl?: string
}
