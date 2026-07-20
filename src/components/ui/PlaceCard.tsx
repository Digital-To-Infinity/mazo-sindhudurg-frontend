import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export function PlaceCard({ title, category, location, image, href = "#", info }: { title: string, category: string, location: string, image: string, href?: string, info?: string }) {
  return (
    <Link href={href} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">{category}</span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-slate-900 text-lg line-clamp-1 group-hover:text-blue-700 transition-colors">{title}</h3>
        <div className="flex items-center text-slate-600 gap-1">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>
        {info && (
          <p className="text-sm text-slate-500 pt-2 border-t border-slate-100">{info}</p>
        )}
      </div>
    </Link>
  );
}
