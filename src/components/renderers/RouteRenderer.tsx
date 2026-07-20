import { getRouteBySlug } from '@/services/routes'
import PageRenderer from './PageRenderer'
import ListingRenderer from './ListingRenderer'
import { notFound } from 'next/navigation'

interface RouteRendererProps {
  slug: string
}

export default async function RouteRenderer({ slug }: RouteRendererProps) {
  const route = await getRouteBySlug(slug)
  if (!route) notFound()

  switch (route.type) {
    case 'listing':
      return <ListingRenderer route={route} />
    case 'page':
    default:
      return <PageRenderer route={route} />
  }
}
