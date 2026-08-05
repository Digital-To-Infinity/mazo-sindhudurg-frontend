import ContentHeader from '@/components/content/ContentHeader'
import ContentBody from '@/components/content/ContentBody'
import RelatedContent from '@/components/content/RelatedContent'
import JsonLd from '@/components/shared/JsonLd'
import type { Route } from '@/types/route'

interface DetailRendererProps {
  route: Route
}

export default function DetailRenderer({ route }: DetailRendererProps) {
  const entityData = (route.data || {}) as Record<string, unknown>
  const entityType = route.entityType || ''
  const title = (entityData.title as string) || route.title
  const subtitle = (entityData.subtitle as string) || route.subtitle
  const heroImage = (entityData.heroImage as string) || (entityData.hero_image as string) || route.heroImage
  const contentType = (entityData.content_type as string) || entityType
  const entityId = (entityData.id as number) || route.id

  return (
    <article className="detail-container">
      {route.schemas?.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <ContentHeader title={title} subtitle={subtitle} image={heroImage} />
      <ContentBody blocks={route.content} />
      {contentType && <RelatedContent type={contentType} currentId={entityId} />}
    </article>
  )
}
