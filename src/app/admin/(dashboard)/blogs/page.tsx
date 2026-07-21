import { Metadata } from 'next';
import BlogManagement from '@/components/admin/blogs/BlogManagement';

export const metadata: Metadata = {
  title: 'Blog Management - Admin',
};

export default function AdminBlogsPage() {
  return <BlogManagement />;
}
