"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  Settings,
  ArrowLeft,
  Image,
  ClipboardList,
  Layers,
  Users,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Content",
    items: [
      { href: "/admin/blogs", label: "Blogs", icon: LayoutDashboard },
      { href: "/admin/pages", label: "Pages", icon: Layers },
      { href: "/admin/content", label: "Content Registry", icon: FileText },
      { href: "/admin/media", label: "Media Library", icon: Image },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/users", label: "Users & Accounts", icon: Users },
      { href: "/admin/submissions", label: "Submissions", icon: ClipboardList },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
      <div className="p-6 border-b border-slate-100/50">
        <Link href="/admin" className="flex items-center gap-3 w-full">
          <img
            src="/mazo-logo.png"
            alt="Mazo Sindhudurg Admin Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-lg font-black text-slate-800 tracking-tight border-l-2 border-slate-200 pl-3">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-5 hide-scrollbar">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-3 pb-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20 translate-x-1"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary hover:translate-x-1"
                    }`}
                  >
                    <item.icon
                      size={17}
                      className={isActive ? "text-white" : "text-slate-400"}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100/50 bg-slate-50/50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-500 rounded-xl hover:bg-white hover:shadow-sm hover:text-primary transition-all duration-200"
        >
          <ArrowLeft size={16} /> Back to Website
        </Link>
      </div>
    </aside>
  );
}
