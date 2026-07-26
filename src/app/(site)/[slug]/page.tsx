import RouteRenderer from '@/components/renderers/RouteRenderer'

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <RouteRenderer slug={slug} />
}
