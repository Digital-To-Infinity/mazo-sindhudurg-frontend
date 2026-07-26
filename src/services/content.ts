import type { Content, Block } from '@/types/content'

interface GetContentListParams {
  query?: string
  type?: string
  page?: number
  limit?: number
}

const dummyContent: Content[] = [
  {
    id: 1,
    title: 'Tarkarli Beach',
    slug: 'tarkarli-beach',
    excerpt: 'Famous for its crystal clear waters and water sports like scuba diving.',
    type: 'beach',
    status: 'published',
    thumbnail: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?q=80&w=1200&auto=format&fit=crop',
    body: [{ type: 'text', content: '<p>Tarkarli is a village in Sindhudurg district in the Indian state of Maharashtra. It is a tourist destination and a coral beach.</p>' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Sindhudurg Fort',
    slug: 'sindhudurg-fort',
    excerpt: 'A historical fort that occupies an islet in the Arabian Sea.',
    type: 'fort',
    status: 'published',
    thumbnail: 'https://images.unsplash.com/photo-1621235334149-14a9ec67bc0e?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1621235334149-14a9ec67bc0e?q=80&w=1200&auto=format&fit=crop',
    body: [{ type: 'text', content: '<p>Sindhudurg is a historical fort that occupies an islet in the Arabian Sea, just off the coast of Maharashtra in Western India.</p>' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Malvani Thali',
    slug: 'malvani-thali',
    excerpt: 'Authentic coastal cuisine featuring spicy seafood and coconut-based curries.',
    type: 'food',
    status: 'published',
    thumbnail: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop',
    body: [{ type: 'text', content: '<p>Malvani cuisine is the standard cuisine of the South Konkan region of Maharashtra and Goa.</p>' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export async function getContentList(params: GetContentListParams = {}): Promise<Content[]> {
  let filtered = dummyContent;
  if (params.type && params.type !== 'all') {
    filtered = filtered.filter(item => item.type === params.type);
  }
  if (params.query) {
    const q = params.query.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(q) || 
      (item.excerpt && item.excerpt.toLowerCase().includes(q))
    );
  }
  return filtered;
}

export async function getContentById(id: string): Promise<Content> {
  const content = dummyContent.find(c => c.id === Number(id)) || dummyContent[0];
  return content;
}

export async function getRelatedContent(type: string, currentId: number): Promise<Content[]> {
  return dummyContent.filter(c => c.id !== currentId).slice(0, 4);
}

export async function getSubmissions(): Promise<Content[]> {
  return [];
}
