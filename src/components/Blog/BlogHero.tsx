"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Zap } from "lucide-react";
import SearchBar from "./SearchBar";

interface BlogHeroProps {
    isSearching?: boolean;
    onSearchFocusChange?: (isFocused: boolean) => void;
}

const BlogHero = ({ isSearching = false, onSearchFocusChange }: BlogHeroProps) => {
    return (
        <section
            className={`relative flex items-center justify-center overflow-hidden bg-zinc-950 ${
                isSearching ? "min-h-[40vh] py-12" : "min-h-[85vh] py-16"
            }`}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/mthl_atal_setu_night_1773210593397.png"
                    alt="Navi Mumbai skyline and infrastructure night view | Premium Property Market Insights"
                    fill
                    className="object-cover opacity-100"
                    priority
                    {...({ fetchPriority: "high" } as any)}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-zinc-950" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950/30" aria-hidden="true" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`grid gap-10 items-center ${isSearching ? "grid-cols-1" : "lg:grid-cols-2"}`}>
                    <div className={`flex flex-col -my-10 space-y-6 ${isSearching ? "items-center text-center" : "items-start text-left"}`}>
                        {!isSearching && (
                            <div className="flex flex-col space-y-8">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                                    <span className="flex h-2 w-2 rounded-full bg-brand-primary" aria-hidden="true" />
                                    <span className="text-xs font-black text-brand-primary tracking-[0.3em] max-[321px]:tracking-[0.1em] uppercase">
                                        Intelligence & Insights Hub
                                    </span>
                                </div>

                                <h1 className="font-black !text-white leading-[1.05] tracking-tighter">
                                    <span className="block text-5xl md:text-[90px] max-[426px]:text-[56px] max-[376px]:text-[52px] max-[321px]:text-[44px]">
                                        Navi Mumbai
                                    </span>

                                    <span className="relative inline-block mt-2 cursor-default">
                                        <span className="text-5xl md:text-[80px] max-[376px]:text-[46px] max-[321px]:text-[38px] italic text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#fff4d6] to-brand-primary block pb-4">
                                            Knowledge Hub
                                        </span>
                                        <span className="block h-[3px] w-full bg-gradient-to-r from-brand-primary via-[#fff4d6] to-transparent rounded-full mb-4" />
                                    </span>
                                </h1>

                                <p className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                                    Navigate the future of real estate with expert analysis, local intelligence, and the latest infrastructure breakthroughs in India&apos;s most planned metropolis.
                                </p>
                            </div>
                        )}

                        <SearchBar
                            onFocusChange={onSearchFocusChange}
                            onSearch={(q) => {
                                const params = new URLSearchParams(window.location.search);
                                if (q) params.set("q", q);
                                else params.delete("q");
                                window.history.pushState(null, "", `?${params.toString()}`);
                                window.dispatchEvent(new Event("popstate"));
                            }}
                        />
                    </div>

                    {!isSearching && (
                        <div className="relative hidden lg:block">
                            <div className="relative max-w-[450px] ml-auto">
                                <div className="absolute inset-0 bg-brand-primary/20 blur-[60px] rounded-full -z-10" />

                                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                                    <div className="relative aspect-[4/5]">
                                        <Image
                                            src="/kharghar_spotlight_1773210561744.png"
                                            alt="Featured Navi Mumbai Real Estate Article - Kharghar Growth Decoded"
                                            fill
                                            className="object-cover"
                                            priority
                                            {...({ fetchPriority: "high" } as any)}
                                        />

                                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-10 flex flex-col justify-end gap-5">
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg shadow-brand-primary/20">
                                                    Editor&apos;s Choice
                                                </span>
                                                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest bg-white/5 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                                                    March 2026
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="text-3xl font-black !text-white leading-[1.1] tracking-tight">
                                                    Navi Mumbai&apos;s <br />
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#fff4d6] to-brand-primary">
                                                        Growth Decoded
                                                    </span>
                                                </h3>
                                                <p className="text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">
                                                    An exclusive deep dive into how the new International Airport and MTHL are reshaping property valuations in record time.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-3 shadow-2xl">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-brand-primary/30 relative">
                                                <Image src="/expert-avatar.png" alt="Author" fill className="object-cover" loading="lazy" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">
                                                    Expert Analyst
                                                </div>
                                                <Link
                                                    href="#"
                                                    rel="author"
                                                    title="View insights by Danish Khan - Senior Real Estate Analyst Navi Mumbai"
                                                    className="text-white text-xs font-bold hover:text-brand-primary"
                                                >
                                                    Danish Khan
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-10 -left-10 p-5 rounded-[2rem] bg-zinc-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl z-20 hidden xl:block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-inner">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Market Pulse</div>
                                            <div className="text-emerald-400 text-sm font-black font-mono">+8.4% Rise In Ulwe</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-8 -right-8 p-5 rounded-[2rem] bg-zinc-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl z-20 hidden xl:block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 text-brand-primary flex items-center justify-center shadow-inner">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Expert Verdict</div>
                                            <div className="text-white text-sm font-black italic">Airport T1 Ready</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
