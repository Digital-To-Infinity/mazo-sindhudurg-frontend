import ContentForm from '@/components/admin/ContentForm'
import { getContentById } from '@/services/content'

interface EditContentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const { id } = await params
  const content = await getContentById(id)
  return (
    <div>
      <h1>Edit Content</h1>
      <ContentForm initialData={content} />
    </div>
  )
}
