import ContentGrid from '@/components/content/ContentGrid'
import Link from 'next/link'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string }> }) {
  const params = await searchParams
  const query = params.q || ''
  const type = params.type || 'all'

  return (
    <div className="search-page">
      <h1>Find Your Next Adventure</h1>
      
      <form action="/search" method="GET" className="search-bar">
        <input 
          type="text" 
          name="q"
          className="search-input" 
          placeholder="Search for beaches, forts, seafood..."
          defaultValue={query}
        />
        <input type="hidden" name="type" value={type} />
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div className="filters">
        {['all', 'beach', 'fort', 'food', 'stay', 'activity'].map(t => (
          <Link 
            key={t}
            href={`/search?q=${query}&type=${t}`}
            className={`filter-chip ${type === t ? 'active' : ''}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </div>

      <ContentGrid query={query} type={type} page={1} />
    </div>
  )
}
