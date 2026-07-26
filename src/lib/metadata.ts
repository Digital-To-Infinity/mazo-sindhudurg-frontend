import type { Metadata } from 'next'

const SITE_NAME = 'Mazo Sindhudurg'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

interface MetadataInput {
  title?: string
  description?: string
  image?: string
  path?: string
}

export function buildMetadata({
  title,
  description,
  image,
  path = '',
}: MetadataInput): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const ogImage = image || DEFAULT_OG_IMAGE
  const url = `${SITE_URL}/${path}`

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  }
}
