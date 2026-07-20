'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Beaches', value: 'beach' },
  { label: 'Forts', value: 'fort' },
  { label: 'Food', value: 'food' },
  { label: 'Stay', value: 'stay' },
  { label: 'Activities', value: 'activity' },
]

interface FiltersProps {
  activeType: string
}

export default function Filters({ activeType }: FiltersProps) {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''

  return (
    <div className="filters" role="group" aria-label="Filter by type">
      {FILTER_OPTIONS.map((opt) => (
        <Link
          key={opt.value}
          href={`/search?q=${q}&type=${opt.value}`}
          className={`filter-chip ${activeType === opt.value ? 'active' : ''}`}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  )
}
