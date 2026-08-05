// @ts-nocheck
'use client';
import { Tag, Plus, X } from 'lucide-react';

const SEOTags = ({ 
    tags, 
    tagInput, 
    setTagInput, 
    handleAddTag, 
    removeTag,
    seoTitle,
    setSeoTitle,
    seoDescription,
    setSeoDescription,
    seoCanonicalUrl,
    setSeoCanonicalUrl,
    seoNoIndex,
    setSeoNoIndex
}) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">
                SEO Labels & Tags
            </h4>

            <div className="space-y-4">
                {/* Tags Section */}
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="flex items-center bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500 transition-colors cursor-pointer">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                    {tags.length === 0 && <p className="text-[11px] text-slate-400 italic">No tags added yet. Press Enter to add.</p>}
                </div>

                <div className="relative">
                    <Plus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Type keyword & hit Enter..."
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                    />
                </div>

                {/* Real SEO Fields */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Meta Title</label>
                        <input
                            type="text"
                            value={seoTitle || ''}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            maxLength={60}
                            placeholder="60 characters max"
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Meta Description</label>
                        <textarea
                            value={seoDescription || ''}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            rows={3}
                            maxLength={160}
                            placeholder="160 characters max"
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Canonical URL</label>
                        <input
                            type="url"
                            value={seoCanonicalUrl || ''}
                            onChange={(e) => setSeoCanonicalUrl(e.target.value)}
                            placeholder="https://mazosindhudurg.com/..."
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            id="seo-noindex"
                            checked={seoNoIndex || false}
                            onChange={(e) => setSeoNoIndex(e.target.checked)}
                            className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                        />
                        <label htmlFor="seo-noindex" className="text-xs font-semibold text-slate-600">
                            No Index (Hide from Search Engines)
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEOTags;
