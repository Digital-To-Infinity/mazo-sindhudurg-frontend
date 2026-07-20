import ContentHeader from '@/components/content/ContentHeader'
import ContentBody from '@/components/content/ContentBody'
import RelatedContent from '@/components/content/RelatedContent'
import type { Content } from '@/types/content'

interface DetailRendererProps {
  content: Content
}

export default function DetailRenderer({ content }: DetailRendererProps) {
  return (
    <article className="detail-container">
      <ContentHeader title={content.title} subtitle={content.subtitle} image={content.heroImage} />
      <ContentBody blocks={content.body} />
      <RelatedContent type={content.type} currentId={content.id} />
    </article>
  )
}
