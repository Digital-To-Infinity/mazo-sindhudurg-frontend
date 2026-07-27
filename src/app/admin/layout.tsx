import type { Metadata } from 'next'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Admin – Mazo Sindhudurg',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  // TEMPORARILY DISABLED: Prevent infinite redirect loop until auth is fully hooked up
  // if (!session) redirect('/admin/login')

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
