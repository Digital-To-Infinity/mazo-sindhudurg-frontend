'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Upload, Trash2, ImagePlus, X, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface MediaItem {
  id: number
  url: string
  altText: string | null
  width: number
  height: number
  format: string
  bytes: number
  createdAt: string
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function AttractionsClient() {
  const [images, setImages] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [altText, setAltText] = useState('')
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch all media
  const fetchImages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/media?folder=attractions`, {
        credentials: 'include',
      })
      const data = await res.json()
      setImages(data.data || [])
    } catch {
      toast.error('Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [])

  // Handle file pick — show preview only
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  // Clear selected file
  const clearPreview = () => {
    setPreview(null)
    setSelectedFile(null)
    setAltText('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Upload on submit
  const handleSubmit = async () => {
    if (!selectedFile) return
    setUploading(true)
    const toastId = toast.loading('Uploading image...')
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      if (altText) formData.append('altText', altText)
      formData.append('folder', 'attractions')

      const res = await fetch(`${API}/media/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Upload failed')
      }
      const data = await res.json()
      setImages((prev) => [data.data, ...prev])
      clearPreview()
      toast.success('Image uploaded!', { id: toastId })
    } catch (err: any) {
      toast.error(err.message || 'Upload failed', { id: toastId })
    } finally {
      setUploading(false)
    }
  }

  // Delete image
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return
    setDeletingId(id)
    const toastId = toast.loading('Deleting...')
    try {
      const res = await fetch(`${API}/media/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Delete failed')
      setImages((prev) => prev.filter((img) => img.id !== id))
      toast.success('Image deleted', { id: toastId })
    } catch {
      toast.error('Delete failed', { id: toastId })
    } finally {
      setDeletingId(null)
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-8">

      {/* Upload Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ImagePlus size={16} className="text-primary" />
          </div>
          <h2 className="font-bold text-slate-800">Upload New Image</h2>
        </div>

        <div className="p-6 space-y-4">
          {!preview ? (
            /* Drop zone */
            <label
              htmlFor="attractions-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <Upload size={32} className="text-slate-300 group-hover:text-primary transition-colors mb-3" />
              <p className="text-sm font-semibold text-slate-500 group-hover:text-primary transition-colors">
                Click to choose an image
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
              <input
                id="attractions-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            /* Preview + controls */
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 group">
                <div className="relative w-full h-64">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Clear button */}
                <button
                  onClick={clearPreview}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-red-500 hover:shadow-lg transition-all"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
                  <p className="text-white text-xs font-semibold truncate">{selectedFile?.name}</p>
                  <p className="text-white/70 text-xs">{selectedFile ? formatBytes(selectedFile.size) : ''}</p>
                </div>
              </div>

              {/* Alt text */}
              <input
                type="text"
                placeholder="Alt text (optional)"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                {uploading ? (
                  <><Loader2 size={18} className="animate-spin" /> Uploading...</>
                ) : (
                  <><CheckCircle size={18} /> Submit Image</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Upload size={16} className="text-primary" />
            </div>
            <h2 className="font-bold text-slate-800">Uploaded Images</h2>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </span>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-40 gap-3 text-slate-400">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm font-semibold">Loading images...</span>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400">
              <ImagePlus size={32} className="mb-3 opacity-40" />
              <p className="text-sm font-semibold">No images yet</p>
              <p className="text-xs mt-1">Upload your first attraction image above</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={img.url}
                      alt={img.altText || 'Attraction image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(img.id)}
                      disabled={deletingId === img.id}
                      className="w-9 h-9 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-90 disabled:opacity-50"
                    >
                      {deletingId === img.id
                        ? <Loader2 size={16} className="animate-spin" />
                        : <Trash2 size={16} />
                      }
                    </button>
                  </div>

                  {/* Info strip */}
                  <div className="px-2 py-1.5 bg-white border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 font-semibold truncate">
                      {img.altText || `${img.width}×${img.height}`}
                    </p>
                    <p className="text-[10px] text-slate-400">{formatBytes(img.bytes)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
