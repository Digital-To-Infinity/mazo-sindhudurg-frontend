import { getContentList } from '@/services/content'
import ContentCard from './ContentCard'

interface ContentGridProps {
  query?: string
  type?: string
  page?: number
}

export default async function ContentGrid({ query, type, page }: ContentGridProps) {
  const items = await getContentList({ query, type, page, limit: 12 })
  
  if (!items || items.length === 0) {
     return <div style={{ padding: '2rem 0', color: 'var(--text-muted)' }}>No items found matching your criteria.</div>
  }

  return (
    <div className="content-grid">
      {items.map(item => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  )
}
