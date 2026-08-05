import { api } from './api'
import type { Content } from '@/types/content'

interface ApiEnvelope<T> { success: boolean; message: string; data: T }

interface GetContentListParams {
  query?: string
  type?: string
  page?: number
  limit?: number
  slug?: string
  status?: string
}

interface PaginatedContent {
  items: Content[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function getContentList(params: GetContentListParams = {}, options?: RequestInit): Promise<Content[]> {
  const envelope = await api.get<ApiEnvelope<PaginatedContent>>('/content', {
    params: {
      q: params.query,
      type: params.type,
      page: params.page,
      limit: params.limit,
      slug: params.slug,
      status: params.status,
    },
    ...options
  })
  return envelope.data.items
}

export async function getContentById(id: string): Promise<Content> {
  const envelope = await api.get<ApiEnvelope<Content>>(`/content/${id}`)
  return envelope.data
}

export async function getRelatedContent(type: string, currentId: number): Promise<Content[]> {
  const envelope = await api.get<ApiEnvelope<Content[]>>('/content/related', {
    params: { type, exclude: currentId },
  })
  return envelope.data
}

export async function getSubmissions(): Promise<Content[]> {
  try {
    const envelope = await api.get<ApiEnvelope<Content[]>>('/submissions')
    return envelope.data
  } catch {
    return []
  }
}
