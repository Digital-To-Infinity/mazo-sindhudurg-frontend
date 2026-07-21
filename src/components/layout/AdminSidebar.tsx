'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LayoutDashboard, FileText, Image, MessageSquare, Settings, ArrowLeft, Users } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/blogs', label: 'Blogs', icon: LayoutDashboard },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/submissions', label: 'Submissions', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
      <div className="p-6 border-b border-slate-100/50">
        <Link href="/admin" className="text-xl font-extrabold text-primary tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center text-white font-black shadow-md shadow-primary/20">
            M
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">
            Mazo Admin
          </span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 hide-scrollbar">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Management
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-white shadow-md shadow-primary/20 translate-x-1' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-primary hover:translate-x-1'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-slate-100/50 bg-slate-50/50">
        <Link href="/" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-500 rounded-xl hover:bg-white hover:shadow-sm hover:text-primary transition-all duration-200">
          <ArrowLeft size={16} /> Back to Website
        </Link>
      </div>
    </aside>
  )
}
