"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BookOpen, MapPin, BarChart3, Wallet, Filter, Hash, ArrowRight } from "lucide-react";
import { api } from "@/services/api";

interface BlogFiltersProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const baseCategories = [
    { name: "All", icon: <TrendingUp size={18} />, color: "from-blue-500 to-indigo-500" },
    { name: "Market Insights", icon: <BarChart3 size={18} />, color: "from-amber-500 to-orange-500" },
    { name: "Buying Guide", icon: <BookOpen size={18} />, color: "from-emerald-500 to-teal-500" },
    { name: "Investment", icon: <Wallet size={18} />, color: "from-rose-500 to-pink-500" },
    { name: "Lifestyle", icon: <MapPin size={18} />, color: "from-violet-500 to-purple-500" },
];

export default function BlogFilters({ activeCategory, setActiveCategory }: BlogFiltersProps) {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const [categories, setCategories] = useState(baseCategories);
    const [counts, setCounts] = useState<Record<string, number>>({});
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // We can fetch all blogs and map categories manually since there isn't a dedicated categories endpoint
                const response = await api.get('/content', { params: { type: 'BLOG', limit: 100 } });
                const data = response.data?.items || [];
                
                if (Array.isArray(data)) {
                    // Calculate categories locally
                    const catMap: Record<string, number> = {};
                    data.forEach((b: any) => {
                        const cat = b.body?.category || 'Other';
                        catMap[cat] = (catMap[cat] || 0) + 1;
                    });
                    
                    const apiCats = Object.keys(catMap).map((catName) => ({
                            name: catName,
                            icon: <Hash size={18} />,
                            color: "from-slate-500 to-zinc-500",
                            count: catMap[catName]
                        }));

                    // Update counts from API
                    const newCounts: Record<string, number> = {};
                    apiCats.forEach((cat: any) => {
                        newCounts[cat.name] = cat.count || 0;
                    });

                    // Merge with base categories
                    const merged = [...baseCategories];
                    const seen = new Set(merged.map(c => c.name));

                    apiCats.forEach((cat: any) => {
                        if (!seen.has(cat.name)) {
                            // Find matching base category to preserve icon/color if it exists only in base but name matches
                            merged.push({
                                name: cat.name,
                                icon: cat.icon,
                                color: cat.color
                            });
                            seen.add(cat.name);
                        }
                    });

                    setCategories(merged);
                    setCounts(prev => ({ ...prev, ...newCounts }));
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        const fetchTotalCount = async () => {
            try {
                const response = await api.get('/content', { params: { type: 'BLOG', limit: 1 } });
                const total = response.data?.total || 0;
                setCounts(prev => ({ ...prev, All: total }));
            } catch (error) {
                console.error("Failed to fetch total count:", error);
            }
        };

        fetchCategories();
        fetchTotalCount();
    }, []);

    const handleCategoryChange = useCallback((category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        setActiveCategory(category);
        router.push(`?${params.toString()}`, { scroll: false });
    }, [router, searchParams, setActiveCategory]);

    const getCount = (cat: string) => {
        return counts[cat] || 0;
    };

    return (
        <section className="relative py-16 max-[426px]:py-8 overflow-hidden" aria-label="Blog Filters">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-12">

                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-12 max-[426px]:mb-6 rounded-full bg-zinc-900 text-white border border-white/10 shadow-2xl"
                        >
                            <Hash size={14} className="text-brand-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Navi Mumbai Intelligence</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl max-[426px]:text-4xl max-[376px]:text-[32px] max-[321px]:text-[28px] font-black text-brand-heading tracking-tight mb-6 max-[426px]:mb-0">
                            Explore by {" "}
                            <motion.div
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{
                                    opacity: { duration: 1, delay: 0.4 },
                                    scale: { duration: 1, delay: 0.4 },
                                    backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" }
                                }}
                                className="relative inline-block group cursor-default"
                            >
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary bg-[length:200%_auto] block pb-4 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(186,163,96,0.3)]">
                                    Expertise
                                </span>

                                {/* Animated Underline */}
                                <motion.div
                                    className="absolute bottom-2 left-0 h-[3px] bg-gradient-to-r from-brand-primary rounded-full"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                                    aria-hidden="true"
                                />

                                {/* Light Sweep Effect */}
                                <motion.div
                                    animate={{
                                        left: ["-100%", "200%"],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 z-10 w-32 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg] pointer-events-none"
                                    aria-hidden="true"
                                />
                            </motion.div>
                        </h2>
                    </div>

                    {/* Category Button */}
                    <div className="relative p-4 max-[426px]:p-2.5 bg-zinc-100/40 backdrop-blur-xl rounded-[2.5rem] max-[426px]:rounded-2xl border border-zinc-200/50 grid grid-cols-3 max-[991px]:grid-cols-2 max-[426px]:grid-cols-1 justify-center gap-4 w-full max-w-6xl">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.name;
                            const count = getCount(cat.name);

                            return (
                                <motion.button
                                    key={cat.name}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCategoryChange(cat.name)}
                                    onMouseEnter={() => setHoveredTab(cat.name)}
                                    onMouseLeave={() => setHoveredTab(null)}
                                    className={`relative px-6 max-[376px]:px-4 max-[321px]:px-2 py-5 max-[426px]:py-4 max-[376px]:py-3 rounded-2xl transition-all duration-500 group flex items-center outline-none cursor-pointer w-full ${isActive ? "text-white shadow-xl shadow-brand-primary/20" : "text-brand-paragraph bg-white/30 hover:bg-white hover:text-zinc-900 border border-zinc-200/50"
                                        }`}
                                >
                                    {/* Active State Background */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-brand-primary rounded-2xl z-0"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                                        />
                                    )}

                                    {/* Hover Indicator */}
                                    {hoveredTab === cat.name && !isActive && (
                                        <motion.div
                                            layoutId="hoverPill"
                                            className="absolute inset-0 bg-white shadow-sm rounded-2xl z-0"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}

                                    <span className="relative z-10 flex items-center justify-between w-full">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 ${isActive ? "bg-white/20" : "bg-zinc-200"}`}>
                                                {cat.icon}
                                            </div>
                                            <div className="flex flex-col items-start text-left">
                                                <span className="text-sm md:text-base max-[321px]:text-sm font-black max-[321px]:font-semibold uppercase tracking-wide max-[321px]:tracking-none leading-none">{cat.name}</span>
                                                <span className={`text-[10px] font-black mt-1.5 uppercase opacity-100 ${isActive ? "text-white/70" : "text-brand-primary"}`}>
                                                    {count} Articles
                                                </span>
                                            </div>
                                        </div>

                                        <ArrowRight
                                            size={18}
                                            className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"} group-hover:opacity-100 group-hover:translate-x-0 max-[426px]:opacity-100`}
                                        />
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Result Count / Reset Button */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
                        >
                            <div className="flex items-center gap-3 text-brand-paragraph font-bold text-[12px] max-[321px]:text-[10px] uppercase tracking-widest bg-zinc-100 px-5 py-2.5 rounded-full border border-zinc-200/50">
                                <Filter size={14} className="text-brand-primary" />
                                <span className="opacity-80">Filtered:</span>
                                <span>{getCount(activeCategory)} articles</span>
                                <span className="opacity-80">|</span>
                                <span className="text-brand-primary">{activeCategory}</span>
                            </div>

                            {activeCategory !== "All" && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCategoryChange("All")}
                                    className="flex items-center gap-2 text-[12px] font-black uppercase text-brand-primary border-b-2 border-brand-primary pb-1 cursor-pointer group"
                                >
                                    Clear Category
                                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
