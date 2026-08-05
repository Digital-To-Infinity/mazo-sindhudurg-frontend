import type { Route } from '@/types/route'
import ContentGrid from '@/components/content/ContentGrid'

interface ListingRendererProps {
  route: Route
}

export default function ListingRenderer({ route }: ListingRendererProps) {
  // Use entityType from the resolver if available, otherwise pass the slug
  // as the type filter and let the backend handle filtering by content_type
  const type = route.entityType || route.slug || 'all'

  return (
    <div className="listing-page">
      <div className="section" style={{ background: 'var(--primary-dark)', color: '#fff', textAlign: 'center', paddingTop: '6rem' }}>
        <div className="section-inner">
          <h1 className="hero-title" style={{ marginBottom: '0.5rem' }}>{route.title}</h1>
          <p className="hero-desc" style={{ margin: '0 auto' }}>{route.subtitle}</p>
        </div>
      </div>
      <div className="section">
        <div className="section-inner">
          <ContentGrid query="" type={type} page={1} />
        </div>
      </div>
    </div>
  )
}
