import ContentHeader from '@/components/content/ContentHeader'
import ContentBody from '@/components/content/ContentBody'
import JsonLd from '@/components/shared/JsonLd'
import type { Route } from '@/types/route'

interface PageRendererProps {
  route: Route
}

export default function PageRenderer({ route }: PageRendererProps) {
  return (
    <article className="page-container">
      <JsonLd data={route.jsonLd} />
      <ContentHeader title={route.title} subtitle={route.subtitle} image={route.heroImage} />
      <ContentBody blocks={route.content} />
    </article>
  )
}
