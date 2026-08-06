import { getRouteBySlug } from '@/services/routes'
import PageRenderer from './PageRenderer'
import ListingRenderer from './ListingRenderer'
import DetailRenderer from './DetailRenderer'
import { notFound, redirect } from 'next/navigation'

interface RouteRendererProps {
  slug: string
}

export default async function RouteRenderer({ slug }: RouteRendererProps) {
  const route = await getRouteBySlug(slug)
  if (!route) return notFound()

  if (route.redirect) {
    redirect(route.redirect.destinationPath)
  }

  switch (route.type) {
    case 'detail':
      return <DetailRenderer route={route} />
    case 'listing':
      return <ListingRenderer route={route} />
    case 'page':
    default:
      return <PageRenderer route={route} />
  }
}
