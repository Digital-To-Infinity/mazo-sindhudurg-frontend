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
  if (!session) redirect('/admin/login')

  return (
    <div className="flex h-screen bg-surface-container-low overflow-hidden font-sans relative selection:bg-primary/20">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-fixed/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="p-8 max-w-[1600px] mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  )
}
