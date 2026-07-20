import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function ArticleCard({ title, category, excerpt, date, readTime, image, href = "#" }: { title: string, category: string, excerpt: string, date: string, readTime: string, image: string, href?: string }) {
  return (
    <Link href={href} className="group flex flex-col md:flex-row gap-6 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[16/9] md:aspect-square md:w-2/5 overflow-hidden bg-slate-100 shrink-0">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      <div className="p-6 md:p-8 md:pl-0 flex flex-col justify-center flex-1">
        <span className="text-blue-600 font-bold text-[11px] uppercase tracking-wider mb-2 block">{category}</span>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-3">{title}</h3>
        <p className="text-slate-600 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6">{excerpt}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-xs md:text-sm text-slate-500 gap-3">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{readTime}</span>
          </div>
          <span className="text-blue-700 font-semibold text-sm group-hover:underline">Read Story</span>
        </div>
      </div>
    </Link>
  );
}
