'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Upload, Trash2, Pencil, X, CheckCircle,
  Loader2, ImagePlus, Search, Eye, LayoutGrid, List
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface MediaItem {
  id: string
  secure_url: string
  alt_text: string | null
  title: string | null
  caption: string | null
  description: string | null
  width: number | null
  height: number | null
  format: string | null
  bytes: number | null
  original_filename: string | null
  created_at: string
}

interface Props {
  folder: string
  label: string
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

function formatBytes(bytes: number | null) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaCrudManager({ folder, label }: Props) {
  const [images, setImages] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Create state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [createForm, setCreateForm] = useState({ title: '', alt_text: '', caption: '' })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Edit state
  const [editItem, setEditItem] = useState<MediaItem | null>(null)
  const [editForm, setEditForm] = useState({ title: '', alt_text: '', caption: '', description: '' })
  const [saving, setSaving] = useState(false)

  // View state
  const [viewItem, setViewItem] = useState<MediaItem | null>(null)

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // ── FETCH ──────────────────────────────────────────────
  const fetchImages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/media?folder=${folder}`, { credentials: 'include' })
      const data = await res.json()
      setImages(data.data || [])
    } catch {
      toast.error('Failed to load images')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchImages() }, [folder])

  const filtered = images.filter(img =>
    (img.title || img.original_filename || img.alt_text || '')
      .toLowerCase().includes(search.toLowerCase())
  )

  // ── CREATE ─────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const clearCreate = () => {
    setPreview(null)
    setSelectedFile(null)
    setCreateForm({ title: '', alt_text: '', caption: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCreate = async () => {
    if (!selectedFile) return
    setUploading(true)
    const tid = toast.loading('Uploading...')
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('folder', folder)
      if (createForm.title) formData.append('title', createForm.title)
      if (createForm.alt_text) formData.append('alt_text', createForm.alt_text)
      if (createForm.caption) formData.append('caption', createForm.caption)

      const res = await fetch(`${API}/media/upload`, {
        method: 'POST', body: formData, credentials: 'include',
      })
      if (!res.ok) throw new Error((await res.json()).message || 'Upload failed')
      const data = await res.json()
      setImages(prev => [data.data, ...prev])
      clearCreate()
      setShowCreateModal(false)
      toast.success('Image uploaded!', { id: tid })
    } catch (err: any) {
      toast.error(err.message || 'Upload failed', { id: tid })
    } finally {
      setUploading(false)
    }
  }

  // ── UPDATE ─────────────────────────────────────────────
  const openEdit = (img: MediaItem) => {
    setEditItem(img)
    setEditForm({
      title: img.title || '',
      alt_text: img.alt_text || '',
      caption: img.caption || '',
      description: img.description || '',
    })
  }

  const handleUpdate = async () => {
    if (!editItem) return
    setSaving(true)
    const tid = toast.loading('Saving...')
    try {
      const res = await fetch(`${API}/media/${editItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error((await res.json()).message || 'Update failed')
      const data = await res.json()
      setImages(prev => prev.map(img => img.id === editItem.id ? { ...img, ...data.data } : img))
      setEditItem(null)
      toast.success('Updated!', { id: tid })
    } catch (err: any) {
      toast.error(err.message || 'Update failed', { id: tid })
    } finally {
      setSaving(false)
    }
  }

  // ── DELETE ─────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image? This cannot be undone.')) return
    setDeletingId(id)
    const tid = toast.loading('Deleting...')
    try {
      const res = await fetch(`${API}/media/${id}`, {
        method: 'DELETE', credentials: 'include',
      })
      if (!res.ok) throw new Error('Delete failed')
      setImages(prev => prev.filter(img => img.id !== id))
      toast.success('Deleted!', { id: tid })
    } catch {
      toast.error('Delete failed', { id: tid })
    } finally {
      setDeletingId(null)
    }
  }

  // ── RENDER ─────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-48 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <List size={16} />
          </button>
        </div>

        {/* Add button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 text-sm"
        >
          <ImagePlus size={16} />
          Add Image
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="font-bold text-slate-700">{filtered.length}</span> image{filtered.length !== 1 ? 's' : ''} in <span className="font-semibold text-primary">{label}</span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-56 gap-3 text-slate-400">
          <Loader2 size={22} className="animate-spin" />
          <span className="text-sm font-semibold">Loading...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-56 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
          <ImagePlus size={36} className="mb-3 opacity-30" />
          <p className="text-sm font-semibold">{search ? 'No results found' : 'No images yet'}</p>
          {!search && (
            <p className="text-xs mt-1 text-slate-400">Click "Add Image" to upload your first image</p>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(img => (
            <div key={img.id} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-primary/40 hover:shadow-md transition-all">
              <div className="relative aspect-square bg-slate-50">
                <Image
                  src={img.secure_url}
                  alt={img.alt_text || img.title || 'Image'}
                  fill className="object-cover"
                  sizes="(max-width:640px) 50vw, 20vw"
                />
                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => setViewItem(img)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-700 hover:text-primary shadow transition-all" title="View">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => openEdit(img)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-700 hover:text-primary shadow transition-all" title="Edit">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(img.id)} disabled={deletingId === img.id} className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 shadow transition-all disabled:opacity-50" title="Delete">
                    {deletingId === img.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
              <div className="px-3 py-2 bg-white border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 truncate">{img.title || img.original_filename || '—'}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{img.width}×{img.height} · {formatBytes(img.bytes)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Image</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Dimensions</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Size</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Format</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(img => (
                <tr key={img.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <Image src={img.secure_url} alt={img.alt_text || ''} fill className="object-cover" sizes="48px" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800 truncate max-w-[180px]">{img.title || '—'}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[180px]">{img.alt_text || img.original_filename || ''}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500 text-xs">{img.width && img.height ? `${img.width}×${img.height}` : '—'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-500 text-xs">{formatBytes(img.bytes)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {img.format && <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{img.format}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setViewItem(img)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => openEdit(img)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(img.id)} disabled={deletingId === img.id} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50" title="Delete">
                        {deletingId === img.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── CREATE MODAL ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-extrabold text-slate-800 flex items-center gap-2">
                <ImagePlus size={18} className="text-primary" /> Upload Image
              </h2>
              <button onClick={() => { setShowCreateModal(false); clearCreate() }} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Drop zone / Preview */}
              {!preview ? (
                <label htmlFor="media-create-input" className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <Upload size={28} className="text-slate-300 group-hover:text-primary transition-colors mb-2" />
                  <p className="text-sm font-semibold text-slate-500 group-hover:text-primary">Click to choose an image</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  <input id="media-create-input" ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                  <div className="relative w-full h-48">
                    <Image src={preview} alt="Preview" fill className="object-contain" />
                  </div>
                  <button onClick={clearCreate} className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-2">
                    <p className="text-white text-xs font-semibold truncate">{selectedFile?.name}</p>
                    <p className="text-white/70 text-[10px]">{formatBytes(selectedFile?.size ?? null)}</p>
                  </div>
                </div>
              )}

              {/* Fields */}
              {[
                { key: 'title', placeholder: 'Title', label: 'Title' },
                { key: 'alt_text', placeholder: 'Alt text (for accessibility)', label: 'Alt Text' },
                { key: 'caption', placeholder: 'Caption (optional)', label: 'Caption' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={createForm[field.key as keyof typeof createForm]}
                    onChange={e => setCreateForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              ))}

              <button
                onClick={handleCreate}
                disabled={!selectedFile || uploading}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
              >
                {uploading
                  ? <><Loader2 size={17} className="animate-spin" /> Uploading...</>
                  : <><CheckCircle size={17} /> Upload Image</>
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-extrabold text-slate-800 flex items-center gap-2">
                <Pencil size={18} className="text-primary" /> Edit Image
              </h2>
              <button onClick={() => setEditItem(null)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Preview */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                <Image src={editItem.secure_url} alt={editItem.alt_text || 'Image'} fill className="object-contain" />
              </div>

              {/* Fields */}
              {[
                { key: 'title', label: 'Title', placeholder: 'Enter title' },
                { key: 'alt_text', label: 'Alt Text', placeholder: 'Describe the image' },
                { key: 'caption', label: 'Caption', placeholder: 'Short caption' },
                { key: 'description', label: 'Description', placeholder: 'Detailed description' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">{field.label}</label>
                  {field.key === 'description' ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={3}
                      value={editForm[field.key as keyof typeof editForm]}
                      onChange={e => setEditForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={editForm[field.key as keyof typeof editForm]}
                      onChange={e => setEditForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3">
                <button onClick={() => setEditItem(null)} className="flex-1 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all text-sm">
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 text-sm"
                >
                  {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><CheckCircle size={16} /> Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW MODAL ── */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setViewItem(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-extrabold text-slate-800 truncate">{viewItem.title || viewItem.original_filename || 'Image Details'}</h2>
              <button onClick={() => setViewItem(null)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-slate-900">
                <Image src={viewItem.secure_url} alt={viewItem.alt_text || ''} fill className="object-contain" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Title', value: viewItem.title },
                  { label: 'Alt Text', value: viewItem.alt_text },
                  { label: 'Format', value: viewItem.format?.toUpperCase() },
                  { label: 'Size', value: formatBytes(viewItem.bytes) },
                  { label: 'Dimensions', value: viewItem.width && viewItem.height ? `${viewItem.width} × ${viewItem.height}px` : null },
                  { label: 'Caption', value: viewItem.caption },
                ].map(row => row.value ? (
                  <div key={row.label} className="bg-slate-50 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{row.label}</p>
                    <p className="font-semibold text-slate-700 text-xs truncate">{row.value}</p>
                  </div>
                ) : null)}
              </div>
              {/* Copy URL */}
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                <p className="text-xs text-slate-500 truncate flex-1 font-mono">{viewItem.secure_url}</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(viewItem.secure_url); toast.success('URL copied!') }}
                  className="text-xs font-bold text-primary hover:text-primary/80 whitespace-nowrap transition-colors"
                >
                  Copy URL
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setViewItem(null); openEdit(viewItem) }} className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-600 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => { setViewItem(null); handleDelete(viewItem.id) }} className="flex items-center justify-center gap-2 border border-red-200 text-red-500 font-bold px-5 py-2.5 rounded-xl hover:bg-red-50 transition-all text-sm">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
