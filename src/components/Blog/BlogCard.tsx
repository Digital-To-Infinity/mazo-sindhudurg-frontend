"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Share2, Check } from "lucide-react";
import { BlogPost } from "../BlogDetail/Blogdata";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.21, 1.11, 0.81, 0.99] as const
        }
    }
};

const BlogCard = ({ post }: BlogCardProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${window.location.origin}/blogs/${post.slug}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -5 }}
            itemScope
            itemType="http://schema.org/BlogPosting"
            className="group/card relative bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-[0_18px_45px_-20px_rgba(0,0,0,0.22)] h-full flex flex-col"
        >
            {/* Publisher Schema (Hidden for SEO) */}
            <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="hidden">
                <meta itemProp="name" content="Navi Mumbai Property Deals" />
            </div>

            {/* Image Section */}
            <Link href={`/blogs/${post.slug}`} className="block" aria-label={`Read blog: ${post.title}`}>
                <div className="relative aspect-[16/8.5] overflow-hidden bg-neutral-100">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transform group-hover/card:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-20">
                        <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm max-w-[190px]">
                            <span className="block text-[9px] font-black text-brand-primary uppercase tracking-[0.16em] truncate">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {/* Share Utility */}
                    <button
                        onClick={handleCopyLink}
                        className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-brand-heading/65 hover:text-brand-primary transition-all duration-300 group/share overflow-hidden cursor-pointer"
                        title="Copy blog link"
                        aria-label="Copy blog link"
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.div
                                    key="check"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                >
                                    <Check size={15} className="text-emerald-500" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="share"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                >
                                    <Share2 size={15} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-5 max-[426px]:p-4 relative flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] font-bold text-brand-paragraph/75">
                    <time itemProp="datePublished" dateTime={post.date} className="inline-flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                        {post.date}
                    </time>
                    <span className="inline-flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        {post.readTime}
                    </span>
                </div>

                <Link
                    href={`/blogs/${post.slug}`}
                    className="block"
                    title={`Read more about ${post.title}`}
                >
                    <h2 itemProp="headline" className="text-lg font-black text-brand-heading mb-2 leading-snug group-hover/card:!text-brand-primary-hover transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h2>
                </Link>

                <p itemProp="description" className="text-brand-paragraph/75 text-sm mb-4 line-clamp-2 font-medium leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Author Schema */}
                <span itemProp="author" itemScope itemType="https://schema.org/Person" className="hidden">
                    <meta itemProp="name" content={post.author} />
                </span>

                {/* Bottom Section */}
                <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex-shrink-0 flex items-center justify-center text-brand-primary font-black text-xs border border-brand-primary/10">
                            {post.author?.[0] || 'N'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-black text-brand-heading leading-tight truncate">{post.author}</p>
                            <p className="text-[9px] font-bold text-brand-paragraph/50 uppercase tracking-tight truncate">{post.authorRole || 'Editor'}</p>
                        </div>
                    </div>

                    <Link
                        href={`/blogs/${post.slug}`}
                        title={`Read blog: ${post.title}`}
                        className="group/btn inline-flex items-center gap-1.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white py-2 px-3 rounded-xl font-black transition-all duration-300 flex-shrink-0"
                    >
                        <span className="text-[11px] uppercase tracking-wider">Read</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

export default BlogCard;
