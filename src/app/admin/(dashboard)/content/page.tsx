import DataTable from '@/components/admin/DataTable'
import { getContentList } from '@/services/content'

export default async function AdminContentPage() {
  const items = await getContentList()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Content Management</h1>
        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm">
          + Add New
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <DataTable data={items as any} />
      </div>
    </div>
  )
}
