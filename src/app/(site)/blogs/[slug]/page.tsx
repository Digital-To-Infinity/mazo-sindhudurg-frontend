import React from 'react';
import { notFound } from 'next/navigation';
import { getContentList } from '@/services/content';
import BlogDetail from '@/components/blog-detail/BlogDetail';
import { Metadata } from 'next';
import { api } from '@/services/api';
import { cookies } from 'next/headers';

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getAuthHeaders() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  } catch (e) {
    return {};
  }
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === 'true';
  const authHeaders = await getAuthHeaders();

  try {
    const items = await getContentList({
      slug,
      type: 'blog',
      status: isPreview ? undefined : 'published'
    }, authHeaders);
    const b = items?.[0] as any;
    if (!b) return {};

    let seo: any = null;
    try {
      const seoEnvelope = await api.get<any>(`/seo/${b.id}`, authHeaders);
      seo = seoEnvelope?.data || seoEnvelope;
    } catch (e) {
      // Fail silently, fallback to standard properties
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazosindhudurg.com';
    const canonical = seo?.canonicalUrl || `${siteUrl}/blogs/${b.slug}`;
    const title = seo?.title || b.title;
    const description = seo?.description || b.excerpt || '';
    const isIndexed = seo?.noIndex ? false : true;
    const ogImage = b.media?.secure_url || `${siteUrl}/og-default.jpg`;

    return {
      title: `${title} | Mazo Sindhudurg`,
      description,
      alternates: {
        canonical,
      },
      robots: {
        index: isIndexed,
        follow: true,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Mazo Sindhudurg',
        images: [{ url: ogImage }],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      }
    };
  } catch (error) {
    return {};
  }
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === 'true';
  const authHeaders = await getAuthHeaders();

  // Fetch blogs by slug
  const items = await getContentList({
    slug,
    type: 'blog',
    status: isPreview ? undefined : 'published'
  }, authHeaders);
  const b = items?.[0] as any;

  if (!b) {
    notFound();
  }

  // Normalize the blog post for BlogDetail component
  const post = {
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt || (b.content_html ? b.content_html.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''),
    content: b.content_html || '',
    date: b.created_at || b.createdAt ? new Date(b.created_at || b.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : new Date().toLocaleDateString('en-IN'),
    author: b.authors?.name || 'Admin',
    authorRole: b.authors?.designation || 'Editor',
    authorImage: '',
    category: b.category?.name || 'Travel',
    image: b.media?.secure_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    readTime: b.reading_time_minutes ? `${b.reading_time_minutes} min read` : '5 min read',
    tags: b.article_tags?.map((at: any) => at.tags?.name).filter(Boolean) || []
  };

  return <BlogDetail post={post} />;
}
