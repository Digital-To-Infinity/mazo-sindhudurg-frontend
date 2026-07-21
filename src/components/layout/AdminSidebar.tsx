import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/blogs', label: 'Blogs' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/submissions', label: 'Submissions' },
  { href: '/admin/settings', label: 'Settings' },
]

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-logo">Mazo Admin</Link>
      <nav className="admin-nav">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="admin-nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/" className="admin-nav-link admin-back">← View Site</Link>
    </aside>
  )
}
