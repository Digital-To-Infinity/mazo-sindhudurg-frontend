'use client'
import { useState } from 'react'

interface SeoData {
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  canonicalUrl?: string
}

interface SeoFormProps {
  initialData?: SeoData
  onChange?: (data: SeoData) => void
}

export default function SeoForm({ initialData, onChange }: SeoFormProps) {
  const [seo, setSeo] = useState<SeoData>(initialData || {})

  const update = (field: keyof SeoData, value: string) => {
    const updated = { ...seo, [field]: value }
    setSeo(updated)
    onChange?.(updated)
  }

  return (
    <fieldset className="seo-form">
      <legend>SEO Settings</legend>
      <div className="form-group">
        <label htmlFor="meta-title">Meta Title</label>
        <input
          id="meta-title"
          value={seo.metaTitle || ''}
          onChange={(e) => update('metaTitle', e.target.value)}
          maxLength={60}
          placeholder="60 characters max"
        />
      </div>
      <div className="form-group">
        <label htmlFor="meta-desc">Meta Description</label>
        <textarea
          id="meta-desc"
          value={seo.metaDescription || ''}
          onChange={(e) => update('metaDescription', e.target.value)}
          rows={2}
          maxLength={160}
          placeholder="160 characters max"
        />
      </div>
      <div className="form-group">
        <label htmlFor="canonical">Canonical URL</label>
        <input
          id="canonical"
          value={seo.canonicalUrl || ''}
          onChange={(e) => update('canonicalUrl', e.target.value)}
          placeholder="https://mazosindhudurg.com/…"
        />
      </div>
    </fieldset>
  )
}
