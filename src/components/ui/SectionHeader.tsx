import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SectionHeader({ title, description, linkText, linkHref }: { title: string, description?: string, linkText?: string, linkHref?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {description && <p className="text-slate-600 mt-2 text-sm md:text-base">{description}</p>}
      </div>
      {linkText && linkHref && (
        <Link href={linkHref} className="group flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
          {linkText}
          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
