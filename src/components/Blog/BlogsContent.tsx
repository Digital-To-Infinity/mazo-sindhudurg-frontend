"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BlogHero from "@/components/Blog/BlogHero";
import BlogFilters from "@/components/Blog/BlogFilters";
import BlogGrid from "@/components/Blog/BlogGrid";
import Newsletter from "@/components/Blog/Newsletter";

export default function BlogsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFocused, setIsFocused] = React.useState(false);
    // Once the user has touched the search bar, keep the hero compact forever
    // (until a full page navigation). Clearing the query should NOT re-expand.
    const hasInteracted = React.useRef(false);

    const activeCategory = searchParams.get("category") || "All";
    const searchQuery = searchParams.get("q") || "";

    const handleFocusChange = (focused: boolean) => {
        if (focused) hasInteracted.current = true;
        setIsFocused(focused);
    };

    // Stay compact if: currently focused, has a query, or has previously interacted
    const isSearchActive = isFocused || !!searchQuery || hasInteracted.current;

    const setActiveCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const setSearchQuery = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!query) {
            params.delete("q");
        } else {
            params.set("q", query);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <>
            <BlogHero
                isSearching={isSearchActive}
                onSearchFocusChange={handleFocusChange}
            />
            <AnimatePresence initial={false}>
                {!isSearchActive && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <BlogFilters
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <BlogGrid
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            {!isSearchActive && <Newsletter />}
        </>
    );
}