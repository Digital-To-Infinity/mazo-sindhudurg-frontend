import React from 'react';
import BlogDetail from '@/components/blog-detail/BlogDetail';

export default function BlogPostPage() {
  const dummyPost = {
    id: '1',
    slug: 'dummy-post',
    title: 'Discover the Hidden Gems of Sindhudurg',
    excerpt: 'A quick guide to exploring the unexplored beaches and forts.',
    content: '<p>Welcome to our blog about Sindhudurg! Here you will find amazing stories and guides.</p>',
    date: new Date().toLocaleDateString(),
    author: 'Admin',
    authorRole: 'Editor',
    authorImage: '',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    readTime: '5 min read',
    tags: ['Travel', 'Sindhudurg', 'Beaches']
  };

  return <BlogDetail post={dummyPost} />;
}
