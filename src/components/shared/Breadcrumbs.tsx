import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li><Link href="/">Home</Link></li>
        {crumbs.map((crumb, i) => (
          <li key={i}>
            {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
