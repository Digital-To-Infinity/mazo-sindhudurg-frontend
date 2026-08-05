import RouteRenderer from '@/components/renderers/RouteRenderer'
import { getRouteBySlug } from '@/services/routes'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const route = await getRouteBySlug(slug)
    if (!route) return {}

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazosindhudurg.com'
    const title = route.seo?.metaTitle || route.title
    const description = route.seo?.metaDescription || route.subtitle || ''
    const canonical = route.seo?.canonicalUrl || route.canonicalPath || `${siteUrl}/${route.slug}`
    const ogImage = route.seo?.ogImage || route.heroImage || `${siteUrl}/og-default.jpg`

    return {
      title: `${title} | Mazo Sindhudurg`,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Mazo Sindhudurg',
        images: [{ url: ogImage }],
        type: route.type === 'detail' ? 'article' : 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      }
    }
  } catch (error) {
    return {}
  }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params
  return <RouteRenderer slug={slug} />
}
