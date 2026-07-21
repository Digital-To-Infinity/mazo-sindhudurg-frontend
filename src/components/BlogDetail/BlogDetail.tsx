"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Bookmark, Calendar, Clock, ShieldCheck } from "lucide-react";
import { BlogPost } from "./Blogdata";
import BlogSidebar from "./BlogSidebar";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import BlogMainContent from "./BlogMainContent";
import CompanyPromo from "./CompanyPromo";
import BlogSchema from "./BlogSchema";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
interface BlogDetailProps {
    post: BlogPost;
}

const BlogDetail = ({ post }: BlogDetailProps) => {
    const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const response = await api.get('/content', {
                    params: {
                        type: 'BLOG',
                        category: post.category,
                        limit: 4 // Get 4 in case one is the current post
                    }
                });
                const data = response.data?.items || [];
                if (Array.isArray(data)) {
                    const normalized = data
                        .filter((b: any) => b.slug !== post.slug)
                        .slice(0, 3)
                        .map((b: any) => ({
                            id: b.id,
                            slug: b.slug,
                            title: b.title,
                            excerpt: b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''),
                            content: b.content,
                            date: b.date || (b.created_at || b.createdAt ? new Date(b.created_at || b.createdAt).toLocaleDateString() : new Date().toLocaleDateString()),
                            author: b.author || 'NM Admin',
                            authorRole: b.author_role || b.authorRole || 'Editor',
                            authorImage: b.author_image || b.authorImage || '',
                            category: b.category,
                            image: b.cover_image_url || b.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
                            readTime: b.body?.readTime || b.readTime || '5 min read',
                            tags: b.body?.tags || b.tags || []
                        }));
                    setRelatedBlogs(normalized);
                }
            } catch (error) {
                console.error("Failed to fetch related blogs:", error);
            }
        };
        fetchRelated();
    }, [post.slug, post.category]);

    return (
        <article className="relative min-h-screen bg-white">
            <BlogSchema post={post} />

            {/* Header */}
            <header className="z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-2 text-sm font-bold text-brand-paragraph hover:text-brand-primary transition-colors group"
                    >
                        <div className="p-2 rounded-xl bg-neutral-50 group-hover:bg-brand-primary/10 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="hidden sm:inline font-black uppercase tracking-wider text-[11px]">Back to Blogs</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-brand-paragraph hover:text-brand-primary transition-all cursor-pointer shadow-sm"
                            aria-label="Share article"
                        >
                            <Share2 size={18} />
                        </button>
                        <button
                            className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-brand-paragraph hover:text-brand-primary transition-all cursor-pointer shadow-sm"
                            aria-label="Bookmark article"
                        >
                            <Bookmark size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative w-full bg-neutral-50/30 py-16 max-[769px]:py-8 border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary mb-6 px-3 py-1 rounded-full bg-brand-primary/10">
                                    {post.category}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-heading mb-8 leading-[1.2] tracking-tight capitalize"
                            >
                                {post.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-wrap items-center gap-6 py-4 max-[426px]:gap-4"
                            >
                                {/* Author Block */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 max-[426px]:w-full max-[426px]:bg-white max-[426px]:p-5 max-[426px]:rounded-[2rem] max-[426px]:border max-[426px]:border-neutral-100 max-[426px]:shadow-[0_15px_35px_rgba(0,0,0,0.03)] group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-black shadow-lg shadow-brand-primary/20 shrink-0 group-hover:rotate-12 transition-transform duration-300">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                                            rel="author"
                                            className="text-sm font-black text-brand-heading uppercase tracking-wide hover:text-brand-primary transition-colors"
                                        >
                                            {post.author}
                                        </Link>
                                        <span className="text-[11px] font-bold text-brand-paragraph uppercase tracking-widest">{post.authorRole || 'Author'}</span>
                                    </div>
                                    <div className="ml-auto hidden max-[426px]:block">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                            <ShieldCheck size={14} className="text-green-600" />
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-[1200/630] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10"
                            >
                                <Image
                                    src={post.image}
                                    alt={`${post.title} | Navi Mumbai Property Market Insight`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <main className="w-full max-w-[1600px] mx-auto px-12 py-12 max-[426px]:px-6 max-[426px]:py-6 max-[321px]:px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-start w-full min-w-0">
                    {/* Left: Table of Contents */}
                    <div className="hidden lg:block w-60 shrink-0 self-stretch">
                        <BlogSidebar content={post.content} />
                    </div>

                    {/* Middle: Main Content */}
                    <div className="flex-1 min-w-0 w-full max-[426px]:max-w-[calc(100vw-3rem)] max-[321px]:max-w-[calc(100vw-2rem)]">
                        <BlogMainContent content={post.content} tags={post.tags} />
                    </div>

                    {/* Right: Company Promotion */}
                    <div className="hidden xl:block w-72 shrink-0 self-stretch">
                        <CompanyPromo />
                    </div>
                </div>
            </main>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <section className="py-16 max-[426px]:py-10 bg-neutral-50/50 border-t border-neutral-100 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-16 max-[426px]:flex-col max-[426px]:items-start max-[426px]:gap-8 max-[426px]:mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="max-[426px]:w-full"
                            >
                                <div className="flex items-center gap-3 mb-4 hidden max-[426px]:flex">
                                    <div className="w-8 h-1 bg-brand-primary rounded-full" />
                                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Next Reads</span>
                                </div>
                                <h2 className="text-5xl max-[769px]:text-4xl max-[376px]:text-3xl font-black text-brand-heading mb-2 uppercase tracking-tight max-[426px]:leading-[1.1]">
                                    Related <span className="text-brand-primary">Blogs</span>
                                </h2>
                                <p className="text-brand-muted font-bold uppercase text-lg max-[769px]:text-base max-[321px]:text-xs tracking-[0.1em] max-[376px]:tracking-[0]">
                                    Curated content for <span className="text-brand-heading underline decoration-brand-primary/30 decoration-2 underline-offset-4">{post.category}</span>
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="max-[426px]:hidden"
                            >
                                <Link
                                    href="/blogs"
                                    className="flex items-center justify-center px-8 py-3 bg-white text-brand-heading text-lg font-medium transition-all rounded-full border-2 border-brand-primary/20 hover:border-brand-primary cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                    <span className="text-brand-heading group-hover:text-brand-primary transition-colors z-10">View All Articles</span>
                                </Link>
                            </motion.div>
                        </div>

                        <div className="w-full relative mt-12 max-[426px]:mt-6">
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]}
                                spaceBetween={40}
                                slidesPerView={1}
                                breakpoints={{
                                    768: { slidesPerView: 2, spaceBetween: 40 },
                                    1024: { slidesPerView: 3, spaceBetween: 40 }
                                }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true, el: '.swiper-pagination', type: 'bullets' }}
                                className="!pb-16"
                            >
                                {relatedBlogs.map((relatedPost, idx) => (
                                    <SwiperSlide key={relatedPost.id} className="!h-auto">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 hover:border-brand-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                                        >
                                            <div className="relative aspect-[1200/630] overflow-hidden">
                                                <Image
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black text-brand-primary uppercase tracking-widest">
                                                        {relatedPost.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-8 max-[376px]:p-4">
                                                <h3 className="text-xl max-[426px]:text-lg font-black text-brand-heading mb-6 line-clamp-2 leading-[1.3] group-hover:text-brand-primary transition-colors uppercase tracking-tight">
                                                    <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link>
                                                </h3>
                                                <div className="flex items-center justify-end pt-6 border-t border-neutral-50">
                                                    <Link href={`/blogs/${relatedPost.slug}`} className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                                                        <ArrowLeft className="rotate-180 w-5 h-5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper-pagination !bottom-0"></div>
                        </div>

                        {/* Mobile View All Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 hidden max-[426px]:block"
                        >
                            <Link
                                href="/blogs"
                                className="flex items-center justify-center px-8 py-3 bg-white text-brand-heading text-lg font-medium transition-all rounded-full border-2 border-brand-primary/20 hover:border-brand-primary cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                <span className="text-brand-heading group-hover:text-brand-primary transition-colors z-10">View All Articles</span>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}
        </article>
    );
};


export default BlogDetail;
