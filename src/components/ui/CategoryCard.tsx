import React from 'react';
import Link from 'next/link';

export function CategoryCard({ icon: Icon, title, href = "#" }: { icon: any, title: string, href?: string }) {
  return (
    <Link href={href} className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <span className="font-bold text-slate-700 text-sm md:text-base group-hover:text-blue-700 transition-colors text-center">{title}</span>
    </Link>
  );
}
