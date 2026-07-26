'use client'
import { useState } from 'react'
import Image from 'next/image'

interface MediaPickerProps {
  onSelect?: (url: string) => void
}

export default function MediaPicker({ onSelect }: MediaPickerProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/media/upload', { method: 'POST', body: formData })
    const data = await res.json()
    setPreview(data.url)
    onSelect?.(data.url)
    setUploading(false)
  }

  return (
    <div className="media-picker">
      <label htmlFor="media-upload" className="media-upload-label">
        {uploading ? 'Uploading…' : 'Upload Image (Cloudinary)'}
      </label>
      <input
        id="media-upload"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="media-upload-input"
      />
      {preview && (
        <div className="media-preview">
          <Image src={preview} alt="Preview" width={200} height={120} style={{ objectFit: 'cover' }} />
        </div>
      )}
    </div>
  )
}
