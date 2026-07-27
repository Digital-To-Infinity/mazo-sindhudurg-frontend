import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export function EventCard({ title, dateString, month, venue, time, href = "#" }: { title: string, dateString: string, month: string, venue: string, time: string, href?: string }) {
  return (
    <Link href={href} className="group flex items-start gap-4 p-4 md:p-5 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition-all duration-300">
      <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-xl w-14 h-14 md:w-16 md:h-16 shrink-0 border border-blue-100/50 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <span className="text-sm font-bold leading-none">{dateString}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider mt-1">{month}</span>
      </div>
      
      <div className="flex-1 space-y-1">
        <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">{title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center text-xs text-slate-500 gap-y-1 sm:gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> <span className="truncate">{venue}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> <span>{time}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-slate-300 group-hover:text-blue-600 group-hover:-rotate-45 transition-all">
        <ArrowRight className="w-5 h-5" />
      </div>
    </Link>
  );
}
