import Link from 'next/link'
import MediaImage from '@/components/shared/MediaImage'
import type { Content } from '@/types/content'

interface ContentCardProps {
  item: Content
}

export default function ContentCard({ item }: ContentCardProps) {
  return (
    <article className="content-card">
      <Link href={`/${item.slug}`}>
        <div className="content-card-img-wrap">
          <div className="content-card-img-inner">
            <MediaImage 
              src={item.thumbnail} 
              alt={item.title} 
              width={400} 
              height={250}
              className="content-card-img"
            />
          </div>
        </div>
        <div className="content-card-body">
          <span className="content-card-type">{item.type}</span>
          <h3 className="content-card-title">{item.title}</h3>
          <p className="content-card-excerpt">{item.excerpt}</p>
          <div className="content-card-footer">
            <div className="content-card-loc">📍 Sindhudurg</div>
            <span className="content-card-link">View Details &rarr;</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
