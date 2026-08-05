import { api } from './api'
import type { Media } from '@/types/media'

export async function uploadMedia(file: File, altText?: string): Promise<Media> {
  const formData = new FormData()
  formData.append('file', file)
  if (altText) {
    formData.append('altText', altText)
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/media/upload`,
    { method: 'POST', body: formData, credentials: 'include' }
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Upload failed' }))
    throw new Error(err.message || 'Upload failed')
  }
  const envelope = await res.json()
  return envelope.data
}

export async function getMediaList(): Promise<Media[]> {
  return api.get<Media[]>('/media')
}

export async function deleteMedia(id: number): Promise<void> {
  return api.delete(`/media/${id}`)
}
