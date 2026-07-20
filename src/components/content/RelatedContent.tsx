import ContentCard from './ContentCard'
import { getRelatedContent } from '@/services/content'

interface RelatedContentProps {
  type: string
  currentId: number
}

export default async function RelatedContent({ type, currentId }: RelatedContentProps) {
  const items = await getRelatedContent(type, currentId)
  if (!items.length) return null

  return (
    <section className="related-content">
      <h2>You May Also Like</h2>
      <div className="content-grid">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
