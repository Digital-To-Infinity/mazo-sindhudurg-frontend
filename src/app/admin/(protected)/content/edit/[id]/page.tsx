import ContentForm from '@/components/admin/ContentForm'
import AddBlogClient from '@/components/admin/add-blog/AddBlogClient'
import { getContentById } from '@/services/content'

interface EditContentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const { id } = await params
  const content = await getContentById(id)
  const contentAny = content as any;
  if (contentAny?.content_type?.toLowerCase() === 'blog' || contentAny?.type?.toUpperCase() === 'BLOG') {
    return <AddBlogClient blogId={parseInt(id, 10)} />
  }

  return (
    <div>
      <h1>Edit Content</h1>
      <ContentForm initialData={content} />
    </div>
  )
}
