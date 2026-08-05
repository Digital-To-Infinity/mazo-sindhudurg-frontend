// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-hot-toast';

interface AuthorDetailsProps {
    authorId: number | null;
    setAuthorId: (id: number | null) => void;
    readTime: string;
    setReadTime: (time: string) => void;
}

const AuthorDetails = ({ authorId, setAuthorId, readTime, setReadTime }: AuthorDetailsProps) => {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response: any = await api.get('/authors');
                // Handle API response envelopes or direct array payloads
                const authorData = response.data || response.items || (Array.isArray(response) ? response : []);
                setAuthors(authorData);
            } catch (error) {
                console.error("Failed to fetch authors:", error);
                toast.error("Failed to load authors.");
            } finally {
                setLoading(false);
            }
        };
        fetchAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAuthorChange = (e: any) => {
        const selectedId = e.target.value ? parseInt(e.target.value, 10) : null;
        setAuthorId(selectedId);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">
                Author Details
            </h4>
            
            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Author</label>
                    {loading ? (
                        <div className="w-full px-4 py-2.5 text-sm bg-white/40 border border-white/50 rounded-xl animate-pulse text-slate-400">Loading authors...</div>
                    ) : authors.length > 0 ? (
                        <select
                            value={authorId || ""}
                            onChange={handleAuthorChange}
                            className="w-full px-4 py-2.5 text-sm font-medium bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:bg-white/60 focus:border-blue-200/50 transition-all shadow-sm text-slate-700"
                        >
                            <option value="">Select an Author</option>
                            {authors.map((a: any) => (
                                <option key={a.id} value={a.id}>{a.name} ({a.designation || 'Author'})</option>
                            ))}
                        </select>
                    ) : (
                        <div className="w-full px-4 py-2.5 text-sm bg-amber-50 text-amber-700 border border-amber-200/50 rounded-xl">
                            No authors available. Please add an author in the Authors tab.
                        </div>
                    )}
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
