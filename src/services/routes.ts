import { api } from './api'
import type { Route } from '@/types/route'

interface ApiEnvelope<T> { success: boolean; message: string; data: T }

export async function getAllRoutes(): Promise<Route[]> {
  const envelope = await api.get<ApiEnvelope<Route[]>>('/routes')
  return envelope.data
}

export async function getRouteBySlug(slug: string): Promise<Route | null> {
  try {
    const envelope = await api.get<ApiEnvelope<Route>>(`/routes/${encodeURIComponent(slug)}`)
    return envelope.data
  } catch {
    // 404 or other errors → treat as not found
    return null
  }
}
