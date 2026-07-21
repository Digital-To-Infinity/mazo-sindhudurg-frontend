import { X, CheckCircle2, Save, AlertCircle, Settings2 } from 'lucide-react';

const BlogHeader = ({ id, onCancel, windowWidth, handleSave, isFormValid, isSaving, hasUnsavedChanges, status, isSidebarOpen, setIsSidebarOpen }: any) => {
    return (
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-4 -mx-4 sm:mx-0 sm:px-0 mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-black">{id ? 'Edit Article' : 'Compose New Article'}</h1>
                    <div className="flex items-center text-xs font-medium mt-1">
                        {isSaving ? (
                            <span className="text-blue-600 flex items-center gap-1"><Save size={14} className="animate-pulse" /> Saving...</span>
                        ) : hasUnsavedChanges ? (
                            <span className="text-amber-600 flex items-center gap-1"><AlertCircle size={14} /> Unsaved changes</span>
                        ) : (
                            <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14} /> Saved</span>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Toggle Sidebar Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`hidden lg:flex items-center justify-center p-2.5 rounded-lg border transition-all active:scale-95 ${isSidebarOpen ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    title="Toggle Settings Sidebar"
                >
                    <Settings2 size={18} />
                </button>

                {/* Cancel Button */}
                <button
                    onClick={onCancel}
                    className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                    title="Close"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default BlogHeader;
