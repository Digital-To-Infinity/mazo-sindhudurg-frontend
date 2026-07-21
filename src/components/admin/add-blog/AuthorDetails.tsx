const AuthorDetails = ({ author, setAuthor, authorRole, setAuthorRole, readTime, setReadTime }: any) => {
    return (
        <div className="ag-card p-5 max-[426px]:p-4 space-y-4 shadow-sm border-slate-100/50 bg-white rounded-xl">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 border-b border-slate-100 pb-2 flex items-center">Author Details</h4>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Author Name</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. John Doe"
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Author Role</label>
                <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. Expert"
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Reading Time Estimate</label>
                <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g. 5 min read"
                />
            </div>
        </div>
    );
};

export default AuthorDetails;
