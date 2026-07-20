import { api } from './api'
import type { Media } from '@/types/media'

export async function uploadMedia(file: File): Promise<Media> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/media/upload`,
    { method: 'POST', body: formData }
  )
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

export async function getMediaList(): Promise<Media[]> {
  return api.get<Media[]>('/media')
}

export async function deleteMedia(id: number): Promise<void> {
  return api.delete(`/media/${id}`)
}
