"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpenText, SearchX, ArrowRight, Home, ChevronRight } from "lucide-react";
import { api } from "@/services/api";
import BlogCard from "./BlogCard";
import { BlogPost } from "../BlogDetail/Blogdata";

type BlogKeywordHubProps = {
    mode: "buy" | "rent";
    pageTitle: string;
    pageSubtitle: string;
    searchKeyword: string;
};

const normalizeBlog = (b: any): BlogPost => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..." : ""),
    content: b.content || "",
    date: b.date || new Date(b.created_at || b.createdAt || Date.now()).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }),
    author: b.body?.author || b.author_name || "NM Admin",
    authorRole: b.body?.authorRole || b.author_role || "Editor",
    authorImage: b.author_image || b.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    category: b.body?.category || "Real Estate",
    image: b.cover_image_url || b.coverImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    readTime: b.body?.readTime || b.readTime || "5 min read",
    tags: b.body?.tags || b.tags || [],
});

export default function BlogKeywordHub({ mode, pageTitle, pageSubtitle, searchKeyword }: BlogKeywordHubProps) {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [popularBlogs, setPopularBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const visibleKeywords = useMemo(() => {
        return searchKeyword
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .slice(0, 4);
    }, [searchKeyword]);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await api.get("/content", {
                    params: {
                        type: "BLOG",
                        q: searchKeyword,
                        limit: 50,
                    },
                });

                const data = response.data?.items || response.data || [];
                setBlogs(Array.isArray(data) ? data.map(normalizeBlog) : []);
            } catch (error) {
                console.error("Failed to fetch keyword blogs:", error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [searchKeyword]);

    useEffect(() => {
        const fetchPopularBlogs = async () => {
            try {
                const response = await api.get("/content", {
                    params: { type: 'BLOG', featured: true, limit: 3 },
                });
                const data = response.data?.items || response.data || [];
                setPopularBlogs(Array.isArray(data) ? data.map(normalizeBlog) : []);
            } catch (error) {
                console.error("Failed to fetch popular blogs:", error);
            }
        };

        fetchPopularBlogs();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf0] via-white to-white border-b border-brand-primary/10">
                <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_20%_20%,rgba(186,163,96,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.08),transparent_35%)]" />

                <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-8">
                        <Link href="/" className="hover:text-brand-primary inline-flex items-center gap-1 transition-colors">
                            <Home size={14} /> Home
                        </Link>
                        <ChevronRight size={14} />
                        <Link href={`/${mode}`} className="hover:text-brand-primary transition-colors">
                            {mode === "buy" ? "Buy" : "Rent"}
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-brand-primary">Blogs</span>
                    </div>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-primary/20 shadow-sm mb-6">
                            <BookOpenText size={16} className="text-brand-primary" />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-primary">
                                Blog Filter
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-brand-heading leading-tight tracking-tight mb-5">
                            {pageTitle}
                        </h1>
                        <p className="text-lg md:text-xl text-brand-paragraph/75 leading-relaxed font-medium max-w-2xl">
                            {pageSubtitle}. Showing blogs that match the selected keyword filter.
                        </p>

                        {visibleKeywords.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-8">
                                {visibleKeywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="h-[520px] rounded-[2.5rem] bg-zinc-100 animate-pulse" />
                            ))}
                        </div>
                    ) : blogs.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.08 } },
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                        >
                            {blogs.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="relative w-28 h-28 bg-white border border-neutral-100 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-black/5 mb-10">
                                <SearchX className="w-12 h-12 text-brand-primary/40" />
                            </div>
                            <h2 className="text-3xl font-black text-brand-heading mb-4">No blogs found</h2>
                            <p className="text-brand-paragraph font-medium max-w-md mb-10 opacity-70 leading-relaxed">
                                No published blogs matched this keyword filter. You can add matching keywords in your blog title, excerpt, content, category, or tags from the admin panel.
                            </p>
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-3 bg-brand-heading text-white px-8 py-4 rounded-2xl font-black hover:bg-brand-primary transition-all duration-500 shadow-xl shadow-black/10"
                            >
                                View All Blogs <ArrowRight size={18} />
                            </Link>
                        </div>
                    )}

                    {!loading && blogs.length > 0 && (
                        <div className="flex justify-center mt-16">
                            <Link
                                href="/blogs"
                                className="group relative px-12 py-4 bg-white border-2 border-neutral-100 text-brand-heading font-bold rounded-[2rem] hover:border-brand-primary hover:text-brand-primary transition-all duration-500 shadow-sm overflow-hidden flex items-center gap-4"
                            >
                                <span className="relative z-10 text-[15px] uppercase tracking-widest">View All Blogs</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    )}

                    {!loading && blogs.length === 0 && popularBlogs.length > 0 && (
                        <div className="w-full pt-20 mt-10 border-t border-neutral-100/80">
                            <h3 className="text-2xl font-black text-brand-heading mb-10">
                                Popular <span className="text-brand-primary italic">Blogs</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                                {popularBlogs.map((post, index) => (
                                    <BlogCard key={`popular-${post.id}`} post={post} index={index} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
