'use client';

interface Column {
  key: string
  label: string
}

interface DataTableProps {
  data: Record<string, unknown>[]
  columns?: Column[]
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function DataTable({ data, columns, onEdit, onDelete }: DataTableProps) {
  if (!data?.length) return (
    <div className="p-8 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200">
      No data found.
    </div>
  )

  const cols = columns || Object.keys(data[0]).map((k) => ({ key: k, label: k }))

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
            {cols.map((col) => (
              <th key={col.key} className="px-6 py-4">{col.label}</th>
            ))}
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
              {cols.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm font-medium text-slate-700">
                  {col.key === 'thumbnail' || col.key === 'heroImage' ? (
                    <img src={String(row[col.key] ?? '')} alt="img" className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                  ) : col.key === 'body' ? (
                    <span className="text-slate-400 line-clamp-1 w-48">Content Body...</span>
                  ) : (
                    String(row[col.key] ?? '')
                  )}
                </td>
              ))}
              <td className="px-6 py-4 text-right space-x-2">
                {onEdit && (
                  <button onClick={() => onEdit(row.id as number)} className="text-xs font-bold text-slate-500 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10">
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(row.id as number)} className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50">
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
