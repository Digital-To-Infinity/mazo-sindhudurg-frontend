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
  if (!data?.length) return <p>No data found.</p>

  const cols = columns || Object.keys(data[0]).map((k) => ({ key: k, label: k }))

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {cols.map((col) => <th key={col.key}>{col.label}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {cols.map((col) => (
                <td key={col.key}>{String(row[col.key] ?? '')}</td>
              ))}
              <td className="table-actions">
                {onEdit && (
                  <button onClick={() => onEdit(row.id as number)} className="btn-sm">Edit</button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(row.id as number)} className="btn-sm btn-danger">Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
