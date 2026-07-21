import { Tag, Plus, X } from 'lucide-react';

const SEOTags = ({ tags, tagInput, setTagInput, handleAddTag, removeTag }: any) => {
    return (
        <div className="ag-card p-5 max-[426px]:p-4 space-y-4 shadow-sm border-slate-100/50 bg-white rounded-xl">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 border-b border-slate-100 pb-2 flex items-center">
                SEO Labels & Tags
            </h4>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag: any) => (
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
            </div>
        </div>
    );
};

export default SEOTags;
