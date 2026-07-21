"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
    onFocusChange?: (isFocused: boolean) => void;
    onSearch?: (query: string) => void;
}

const SearchBar = ({ onFocusChange, onSearch }: SearchBarProps) => {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [isFocused, setIsFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const handleFocus = () => {
        setIsFocused(true);
        onFocusChange?.(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
            onFocusChange?.(false);
        }, 200);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        onSearch?.(query.trim());
        setTimeout(() => setIsSearching(false), 400);
    };

    const handleClear = () => {
        setQuery("");
        onSearch?.("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-4xl"
        >
            <form onSubmit={handleSearch} className="relative group">
                <div
                    className={`absolute -inset-[2px] bg-gradient-to-r from-brand-primary via-amber-300 to-brand-primary rounded-full transition-all duration-700 ${
                        isFocused ? "opacity-80 scale-[1.01]" : "opacity-30 group-hover:opacity-55"
                    }`}
                    aria-hidden="true"
                />

                <div
                    className={`absolute -inset-3 bg-brand-primary rounded-full blur-2xl transition-all duration-700 ${
                        isFocused ? "opacity-20" : "opacity-5 group-hover:opacity-12"
                    }`}
                    aria-hidden="true"
                />

                <div
                    className={`relative flex items-center backdrop-blur-xl border rounded-full transition-all duration-500 overflow-hidden ${
                        isFocused
                            ? "bg-zinc-900/95 border-brand-primary/80 ring-4 ring-brand-primary/15 shadow-[0_0_30px_rgba(186,163,96,0.25)]"
                            : "bg-zinc-900/70 border-brand-primary/25 group-hover:border-brand-primary/50 group-hover:bg-zinc-900/85 group-hover:shadow-[0_0_20px_rgba(186,163,96,0.12)]"
                    } max-[426px]:mx-1`}
                >
                    <div className="pl-6 max-[426px]:pl-5 flex items-center justify-center">
                        <motion.div
                            animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                            transition={isSearching ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                            className={`${isFocused ? "text-brand-primary" : "text-zinc-500"} transition-colors duration-300`}
                        >
                            {isSearching ? (
                                <Loader2 className="w-6 max-[426px]:w-5 h-6 max-[426px]:h-5" />
                            ) : (
                                <Search className="w-6 max-[426px]:w-5 h-6 max-[426px]:h-5" />
                            )}
                        </motion.div>
                    </div>

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Search Blogs..."
                        className="w-full bg-transparent border-none outline-none px-5 max-[426px]:px-3 py-5 max-[426px]:py-4 text-white text-lg max-[426px]:text-base placeholder:font-light max-[426px]:placeholder:text-zinc-500 font-medium selection:bg-brand-primary selection:text-zinc-950"
                    />

                    <div className="flex items-center pr-3 max-[426px]:pr-2 gap-3 max-[426px]:gap-2">
                        <AnimatePresence>
                            {query && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    type="button"
                                    onClick={handleClear}
                                    className="p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer max-[426px]:p-1"
                                    title="Clear search"
                                >
                                    <X className="w-5 h-5 max-[426px]:w-4 max-[426px]:h-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(186, 163, 96, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="relative overflow-hidden bg-brand-primary hover:bg-brand-primary-hover text-brand-white px-8 max-[426px]:px-5 py-4 max-[426px]:py-3 rounded-full font-black max-[426px]:font-extrabold text-sm max-[426px]:text-xs uppercase tracking-widest max-[426px]:tracking-wider transition-all duration-300 cursor-pointer group/btn"
                        >
                            <span className="relative z-10 flex items-center gap-2">Search</span>
                        </motion.button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default SearchBar;