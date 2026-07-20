import type { Route } from '@/types/route'

export async function getAllRoutes(): Promise<Route[]> {
  return [
    {
      id: 1,
      slug: 'home',
      type: 'page',
      title: 'Welcome to Mazo Sindhudurg',
      subtitle: 'Explore the Jewel of the Konkan Coast',
      content: [],
      updatedAt: new Date().toISOString()
    }
  ]
}

export async function getRouteBySlug(slug: string): Promise<Route | null> {
  // Mock home page
  if (slug === 'home' || slug === '') {
    return {
      id: 1,
      slug: 'home',
      type: 'page',
      title: 'Welcome to Mazo Sindhudurg',
      subtitle: 'Explore the Jewel of the Konkan Coast',
      content: [
        {
          type: 'text',
          content: '<p>Discover pristine beaches, historic forts, and mouth-watering Malvani cuisine. Mazo Sindhudurg is your ultimate guide to exploring the hidden gems of Maharashtra\'s southern coast.</p>'
        }
      ],
      updatedAt: new Date().toISOString()
    }
  }

  // Mock generic listing pages
  return {
    id: 2,
    slug,
    type: 'listing',
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    subtitle: `Explore all ${slug} in Sindhudurg`,
    content: [],
    updatedAt: new Date().toISOString()
  }
}
