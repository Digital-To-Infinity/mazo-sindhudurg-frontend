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
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                // The new authors API endpoint we created
                const res = await api.get('/authors');
                if (res?.data) {
                    setAuthors(res.data);
                    // If no author selected but we have authors, auto-select the first one or default
                    if (!author && res.data.length > 0) {
                        setAuthor(res.data[0].name);
                        if (!authorRole) setAuthorRole(res.data[0].designation || 'Author');
                    }
                }
            } catch (err) {
                console.error('Failed to fetch authors:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthors();
    }, [author, setAuthor, authorRole, setAuthorRole]);

    const handleAuthorChange = (e) => {
        const selectedName = e.target.value;
        setAuthor(selectedName);
        
        // Auto-update role if author is from DB
        const selectedAuthor = authors.find(a => a.name === selectedName);
        if (selectedAuthor && selectedAuthor.designation) {
            setAuthorRole(selectedAuthor.designation);
        }
    };

    return (
        <div className="ag-card p-5 max-[426px]:p-4 space-y-4 shadow-sm border-slate-100/50 bg-white rounded-xl">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 border-b border-slate-100 pb-2 flex items-center">Author Details</h4>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Author Name</label>
                {loading ? (
                    <div className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg animate-pulse text-slate-400">Loading authors...</div>
                ) : authors.length > 0 ? (
                    <select
                        value={author}
                        onChange={handleAuthorChange}
                        className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                        className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="e.g. John Doe"
                    />
                )}
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
