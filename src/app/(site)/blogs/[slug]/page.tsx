import BlogDetail from "@/components/BlogDetail/BlogDetail";
import { notFound } from "next/navigation";
import { api } from "@/services/api"; // Assuming api is configured as per AGENTS.md

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    // Try to fetch from backend
    const response = await api.get('/content', { params: { type: 'BLOG', slug, limit: 1 } });
    const items = response.data?.items || [];
    
    if (items.length === 0) {
      return notFound();
    }
    
    const b = items[0];
    const post = {
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''),
      content: b.body?.html || b.content || "",
      date: b.date || (b.created_at || b.createdAt ? new Date(b.created_at || b.createdAt).toLocaleDateString() : new Date().toLocaleDateString()),
      author: b.body?.author || b.author_name || 'NM Admin',
      authorRole: b.body?.authorRole || b.author_role || 'Editor',
      authorImage: b.author_image || b.authorImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      category: b.body?.category || b.category || 'Real Estate',
      image: b.heroImage || b.cover_image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      readTime: b.body?.readTime || b.read_time || '5 min read',
      tags: b.body?.tags || b.tags || []
    };

    return <BlogDetail post={post} />;
  } catch (error) {
    notFound();
  }
}
