import { MetadataRoute } from 'next'
import { getAllRoutes } from '@/services/routes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazosindhudurg.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let routes: Awaited<ReturnType<typeof getAllRoutes>> = []
  try {
    routes = await getAllRoutes()
  } catch {
    // Backend unreachable at build time — return minimal sitemap
  }

  return routes.map((route) => ({
    url: `${SITE_URL}/${route.slug}`,
    lastModified: route.updatedAt,
    changeFrequency: 'weekly',
    priority: route.priority ?? 0.7,
  }))
}
