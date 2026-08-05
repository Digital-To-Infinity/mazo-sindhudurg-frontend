import React, { Suspense } from 'react';
import BlogsContent from '@/components/blog/BlogsContent';

export default function BlogListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading blogs...</div>}>
      <BlogsContent />
    </Suspense>
  );
}
