'use client';
import React from 'react';

interface BlogExcerptProps {
    excerpt: string;
    setExcerpt: (excerpt: string) => void;
}

const BlogExcerpt = ({ excerpt, setExcerpt }: BlogExcerptProps) => {
    const chars = excerpt?.length || 0;
    const isOptimal = chars >= 140 && chars <= 160;
    const isOver = chars > 165;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">
                SEO Meta Description / Excerpt
            </h4>
            
            <div className="relative">
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Quick Answer Seawoods is one of Navi Mumbai's premium residential locations..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px] resize-y"
                />
            </div>
            
            <div className="flex justify-between items-center mt-3 text-xs font-medium">
                <span className={`${isOptimal ? 'text-emerald-600' : 'text-slate-500'}`}>
                    Recommended: 140–160 chars
                </span>
                <span className={`${isOver ? 'text-red-500' : isOptimal ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {chars}/165
                </span>
            </div>
        </div>
    );
};

export default BlogExcerpt;
