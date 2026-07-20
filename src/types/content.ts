export interface Content {
  id: number
  title: string
  slug: string
  excerpt?: string
  type: 'page' | 'beach' | 'fort' | 'food' | 'stay' | 'activity' | 'event'
  status: 'draft' | 'published' | 'pending'
  thumbnail?: string
  heroImage?: string
  subtitle?: string
  body: Block[]
  seo?: SeoData
  jsonLd?: Record<string, unknown>
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
