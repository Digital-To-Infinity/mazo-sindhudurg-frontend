import React from 'react';
import Image from 'next/image';
import { Phone, MessageCircle, MapPin, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

export function BusinessCard({ title, category, location, image, href = "#", verified = false, description }: { title: string, category: string, location: string, image: string, href?: string, verified?: boolean, description?: string }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={href} className="relative aspect-video w-full overflow-hidden bg-slate-100 block">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {verified && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <BadgeCheck className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-bold text-[11px] uppercase tracking-wider">Verified</span>
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="flex-1">
          <span className="text-blue-600 text-[11px] font-bold uppercase tracking-wider block mb-1">{category}</span>
          <Link href={href}>
            <h3 className="font-bold text-slate-900 text-lg line-clamp-1 group-hover:text-blue-700 transition-colors">{title}</h3>
          </Link>
          <div className="flex items-center text-slate-600 gap-1 mt-1">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">{location}</span>
          </div>
          {description && (
            <p className="text-slate-500 text-sm mt-3 line-clamp-2">{description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <Phone className="w-4 h-4" /> Call
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
