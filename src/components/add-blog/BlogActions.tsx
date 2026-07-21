'use client';
import { CheckCircle2, Save, Eye } from 'lucide-react';

interface BlogActionsProps {
    handleSave: (status?: string) => Promise<void>;
    isFormValid: boolean;
    isDraftValid: boolean;
    isSaving: boolean;
    id?: string | null;
    status: string;
    hasUnsavedChanges: boolean;
    slug?: string;
}

const BlogActions = ({ handleSave, isFormValid, isDraftValid, isSaving, id, status, hasUnsavedChanges, slug }: BlogActionsProps) => {
    
    const isDraft = status === 'Draft';
    
    // Determine button validity
    const canSave = isDraft ? isDraftValid : isFormValid;
    
    // If it's a completely new post (no ID) and they haven't typed anything yet, it's gray.
    // If they typed something (hasUnsavedChanges = true), it lights up.
    // If it's already saved (id exists) and no changes (hasUnsavedChanges = false), it goes gray.
    const isColorful = hasUnsavedChanges && canSave;

    return (
        <div className="ag-card p-5 max-[426px]:p-4 shadow-sm border-slate-100/50 bg-white rounded-xl">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 border-b border-slate-100 pb-2 mb-4">Status & Actions</h4>
            
            <div className="flex flex-col gap-3">
                {isDraft ? (
                    <button
                        onClick={() => handleSave('Draft')}
                        disabled={!canSave || isSaving || (!hasUnsavedChanges && !!id)}
                        className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:cursor-not-allowed
                            ${isColorful || (!id && canSave)
                                ? 'bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 shadow-sm' 
                                : 'bg-slate-100 text-slate-400 border border-slate-200'}
                        `}
                    >
                        <Save size={16} className="mr-2" />
                        {isSaving ? 'Saving...' : (id && !hasUnsavedChanges ? 'Draft Saved' : 'Save Draft')}
                    </button>
                ) : (
                    <button
                        onClick={() => handleSave('Published')}
                        disabled={!canSave || isSaving || (!hasUnsavedChanges && !!id)}
                        className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:cursor-not-allowed
                            ${isColorful || (!id && canSave)
                                ? 'bg-primary text-white hover:bg-primary-dark shadow-sm' 
                                : 'bg-slate-100 text-slate-400 border border-slate-200'}
                        `}
                    >
                        <CheckCircle2 size={16} className="mr-2" />
                        {isSaving ? 'Saving...' : (id ? (hasUnsavedChanges ? 'Update Article' : 'Up to date') : 'Publish')}
                    </button>
                )}


                {id && (
                    <a
                        href={`http://localhost:3000/blogs/${slug || id}${status !== 'Published' ? '?preview=true' : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm mt-1"
                    >
                        <Eye size={16} className="mr-2" />
                        {status === 'Published' ? 'View Article' : 'Preview Article'}
                    </a>
                )}
            </div>
        </div>
    );
};

export default BlogActions;
