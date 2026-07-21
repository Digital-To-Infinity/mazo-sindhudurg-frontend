"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, TrendingUp, Sparkles, ShieldCheck, Check, Bell, ArrowRight, Users, CheckCircle2 } from "lucide-react";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => setIsSubscribed(false), 5000);
        }
    };

    const benefits = [
        { icon: <TrendingUp className="w-5 h-5" />, text: "Market Trends" },
        { icon: <Sparkles className="w-5 h-5" />, text: "Early Access" },
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Legal Tips" },
    ];

    return (
        <section className="py-12 max-[426px]:py-8 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="relative overflow-hidden bg-zinc-950 rounded-[2.5rem] max-[426px]:rounded-[2rem] p-8 md:p-12 max-[376px]:px-2 max-[376px]:py-6 shadow-2xl border border-white/5 active:scale-[0.99] transition-transform duration-500"
                >
                    {/* Background Glows - Enhanced for Mobile */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
                        <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] max-[426px]:w-[300px] max-[426px]:h-[300px] bg-brand-primary/40 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] max-[426px]:w-[250px] max-[426px]:h-[250px] bg-brand-primary/20 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                        {/* Header Area */}
                        <motion.div
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 max-[426px]:px-3 max-[426px]:py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
                        >
                            <Bell className="w-4 h-4 text-brand-primary animate-bounce" />
                            <span className="text-[11px] max-[426px]:text-[10px] font-black text-brand-primary tracking-[0.2em] uppercase">Private Investors Lab</span>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center gap-4 mb-10 max-[426px]:mb-8"
                        >
                            <div className="flex flex-col items-center gap-4 max-[426px]:gap-3">
                                <div className="flex -space-x-4 max-[426px]:-space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -5, zIndex: 50 }}
                                            className="w-12 h-12 max-[426px]:w-10 max-[426px]:h-10 rounded-full border-2 border-zinc-950 overflow-hidden relative shadow-2xl transition-all"
                                        >
                                            <Image src={`https://i.pravatar.cc/100?u=${i + 15}`} alt="Specialists" fill className="object-cover" />
                                        </motion.div>
                                    ))}
                                    <div className="w-12 h-12 max-[426px]:w-10 max-[426px]:h-10 rounded-full border-2 border-zinc-950 bg-brand-primary flex items-center justify-center text-[11px] max-[426px]:text-[9px] font-black text-white shadow-xl relative z-20">
                                        +5.2k
                                    </div>
                                </div>
                                <div className="h-6 w-px max-[426px]:h-4 bg-white/10 mx-2" />
                                <div className="flex items-center gap-1.5 bg-brand-primary/10 px-4 py-1.5 max-[426px]:px-3 max-[426px]:py-1 rounded-full border border-brand-primary/30 shadow-inner">
                                    <CheckCircle2 size={12} className="text-brand-primary" />
                                    <span className="text-brand-primary text-[10px] max-[426px]:text-[9px] font-black uppercase tracking-widest">Premium Membership</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 group/proof cursor-default">
                                <span className="text-zinc-400 text-[11px] max-[426px]:text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover/proof:text-zinc-300 transition-colors">
                                    <Users size={14} className="text-brand-primary group-hover/proof:rotate-12 transition-transform" />
                                    Trusted by
                                </span>
                                <span className="text-white text-[11px] max-[426px]:text-[10px] font-black uppercase tracking-[0.2em] group-hover/proof:text-brand-primary transition-colors">
                                    Professional Market Arbitrators
                                </span>
                            </div>
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl max-[426px]:text-3xl font-black !text-white mb-6 max-[426px]:mb-4 tracking-tight leading-[1.1]">
                            The Navi Mumbai <br className="hidden max-[426px]:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-[#fff4d6] italic">Weekly Intelligence</span>
                        </h2>

                        <p className="text-zinc-400 text-base md:text-xl font-medium max-w-xl mb-12 max-[426px]:mb-10 leading-relaxed max-[426px]:text-[15px] opacity-80">
                            Join 5,200+ property specialists receiving institutional-grade <br className="hidden md:block" />
                            analytics and high-yield alerts every Tuesday morning.
                        </p>

                        {/* Subscription Form */}
                        <div className="w-full max-w-2xl relative group">
                            <AnimatePresence mode="wait">
                                {isSubscribed ? (
                                    <motion.div
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="py-6 max-[426px]:py-4 text-emerald-400 font-bold flex flex-col items-center justify-center gap-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 backdrop-blur-md"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", bounce: 0.5 }}
                                            className="w-12 h-12 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                                        >
                                            <Check className="w-6 h-6 stroke-[3px]" />
                                        </motion.div>
                                        <div className="flex flex-col items-center text-center px-4">
                                            <span className="text-lg max-[426px]:text-base">Subscription Confirmed!</span>
                                            <span className="text-emerald-500/60 text-sm max-[426px]:text-xs font-medium">Check your inbox for the Intelligence Onboarding Kit.</span>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col md:flex-row gap-4 max-[426px]:gap-3 p-3 max-[426px]:p-2 bg-white/5 backdrop-blur-2xl rounded-[2rem] max-[426px]:rounded-2xl border border-white/10 focus-within:border-brand-primary/40 focus-within:bg-white/[0.08] transition-all duration-500 shadow-2xl"
                                    >
                                        <div className="flex-1 flex items-center px-5 max-[426px]:px-4 gap-4">
                                            <Mail className="w-6 h-6 max-[426px]:w-5 max-[426px]:h-5 text-zinc-500 group-focus-within:text-brand-primary group-focus-within:scale-110 transition-all" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter business email..."
                                                className="w-full py-5 max-[426px]:py-4 bg-transparent text-white outline-none placeholder:text-zinc-600 font-black text-lg max-[426px]:text-base selection:bg-brand-primary selection:text-zinc-950"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-10 py-5 max-[426px]:py-4 bg-brand-primary text-zinc-950 font-black rounded-2xl max-[426px]:rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden shadow-xl shadow-brand-primary/20 whitespace-nowrap cursor-pointer"
                                        >
                                            <span className="relative z-10 uppercase tracking-widest text-sm max-[426px]:text-xs">Secure My Intel</span>
                                            <ArrowRight className="w-5 h-5 max-[426px]:w-4 max-[426px]:h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Informational Benefits Bar */}
                        <div className="mt-16 max-[426px]:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-[426px]:gap-6 pt-10 max-[426px]:pt-8 border-t border-white/10 w-full">
                            {benefits.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex max-[426px]:flex-row flex-col items-center gap-4 max-[426px]:gap-3 group cursor-default"
                                >
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 transition-all duration-500">
                                        <span className="text-brand-primary group-hover:scale-110 transition-transform block">{item.icon}</span>
                                    </div>
                                    <div className="flex flex-col items-center max-[426px]:items-start">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Institutional {item.text.split(' ')[1]}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{item.text.split(' ')[0]} Grade</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
