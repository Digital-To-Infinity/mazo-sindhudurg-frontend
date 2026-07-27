// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface AuthorDetailsProps {
    author: string;
    setAuthor: (author: string) => void;
    authorRole: string;
    setAuthorRole: (role: string) => void;
    readTime: string;
    setReadTime: (time: string) => void;
}

const AuthorDetails = ({ author, setAuthor, authorRole, setAuthorRole, readTime, setReadTime }: AuthorDetailsProps) => {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock authors since the backend doesn't have an authors table yet!
        const mockAuthors = [
            { id: 1, name: 'Admin', designation: 'Administrator' },
            { id: 2, name: 'Guest Writer', designation: 'Contributor' }
        ];
        
        setAuthors(mockAuthors);
        if (!author) {
            setAuthor(mockAuthors[0].name);
            if (!authorRole) setAuthorRole(mockAuthors[0].designation);
        }
        setLoading(false);
    }, [author, setAuthor, authorRole, setAuthorRole]);

    const handleAuthorChange = (e: any) => {
        const selectedName = e.target.value;
        setAuthor(selectedName);
        
        // Auto-update role if author is from DB
        const selectedAuthor = authors.find((a: any) => a.name === selectedName);
        if (selectedAuthor && selectedAuthor.designation) {
            setAuthorRole(selectedAuthor.designation);
        }
    };

    return (
        <div className="relative space-y-6 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-widest pl-1 border-b border-white/50 pb-3 flex items-center">
                Author Details
            </h4>
            
            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Author Name</label>
                    {loading ? (
                        <div className="w-full px-4 py-2.5 text-sm bg-white/40 border border-white/50 rounded-xl animate-pulse text-slate-400">Loading authors...</div>
                    ) : authors.length > 0 ? (
                        <select
                            value={author}
                            onChange={handleAuthorChange}
                            className="w-full px-4 py-2.5 text-sm font-medium bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:bg-white/60 focus:border-blue-200/50 transition-all shadow-sm text-slate-700"
                        >
                            <option value="">Select an Author</option>
                            {authors.map((a: any) => (
                                <option key={a.id} value={a.name}>{a.name}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm font-medium bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:bg-white/60 focus:border-blue-200/50 transition-all shadow-sm text-slate-700 placeholder:text-slate-400"
                            placeholder="e.g. John Doe"
                        />
                    )}
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Author Role</label>
                    <input
                        type="text"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm font-medium bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:bg-white/60 focus:border-blue-200/50 transition-all shadow-sm text-slate-700 placeholder:text-slate-400"
                        placeholder="e.g. Expert"
                    />
                </div>
                <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Reading Time Estimate</label>
                    <input
                        type="text"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm font-medium bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:bg-white/60 focus:border-blue-200/50 transition-all shadow-sm text-slate-700 placeholder:text-slate-400"
                        placeholder="e.g. 5 min read"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthorDetails;
