import DataTable from '@/components/admin/DataTable'
import { getContentList } from '@/services/content'

export default async function AdminContentPage() {
  const items = await getContentList()
  return (
    <div>
      <h1>Content</h1>
      <DataTable data={items as any} />
    </div>
  )
}
