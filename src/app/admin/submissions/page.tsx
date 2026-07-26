import DataTable from '@/components/admin/DataTable'
import { getSubmissions } from '@/services/content'

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions()
  return (
    <div>
      <h1>Submissions</h1>
      <DataTable data={submissions as any} />
    </div>
  )
}
