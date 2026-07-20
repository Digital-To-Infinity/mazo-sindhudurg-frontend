import { MetadataRoute } from 'next'
import { getAllRoutes } from '@/services/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllRoutes()
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return routes.map((route) => ({
    url: `${base}/${route.slug}`,
    lastModified: route.updatedAt,
    changeFrequency: 'weekly',
    priority: route.priority ?? 0.7,
  }))
}
