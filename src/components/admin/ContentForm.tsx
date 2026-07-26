'use client'
import { useState } from 'react'
import type { Content } from '@/types/content'
import SeoForm from './SeoForm'
import MediaPicker from './MediaPicker'

interface ContentFormProps {
  initialData?: Partial<Content>
}

export default function ContentForm({ initialData }: ContentFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    type: initialData?.type || 'page',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic
  }

  return (
    <form onSubmit={handleSubmit} className="content-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          rows={3}
        />
      </div>
      <MediaPicker />
      <SeoForm />
      <button type="submit" className="btn-primary">Save Content</button>
    </form>
  )
}
