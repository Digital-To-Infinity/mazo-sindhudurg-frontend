import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TOCItem {
    id: string;
    text: string;
    level: number;
    parentId?: string;
}

interface BlogSidebarProps {
    content: string;
}

const BlogSidebar = ({ content }: BlogSidebarProps) => {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);
    const entriesRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

    useEffect(() => {
        if (!content) return;
        const headerRegex = /<h([23456])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
        const matches = Array.from(content.matchAll(headerRegex));
        const lastParents: Record<number, string> = {};
        const seenIds = new Set<string>();

        const tocItems = matches.map((match) => {
            const level = parseInt(match[1]);
            const decodeEntities = (str: string) => {
                return str
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'");
            };
            const text = decodeEntities(match[2].replace(/<\/?[^>]+(>|$)/g, ""));
            const rawId = text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

            let id = rawId;
            let counter = 1;
            while (seenIds.has(id)) {
                id = `${rawId}-${counter}`;
                counter++;
            }
            seenIds.add(id);

            lastParents[level] = id;
            const parentId = lastParents[level - 1];
            return { id, text, level, parentId };
        });

        setItems(tocItems);

        const handleScroll = () => {
            const headerOffsets = tocItems.map(item => {
                const element = document.getElementById(item.id);
                return {
                    id: item.id,
                    offsetTop: element ? element.getBoundingClientRect().top : Infinity
                };
            });

            // The threshold is 150px from the top of the viewport
            const passedHeaders = headerOffsets.filter(h => h.offsetTop <= 150);
            
            if (passedHeaders.length > 0) {
                // The last header that crossed the threshold is the active one
                setActiveId(passedHeaders[passedHeaders.length - 1].id);
            } else if (headerOffsets.length > 0 && window.scrollY < 100) {
                setActiveId("");
            }
        };

        // Delay attaching to ensure DOM elements are rendered
        const timeoutId = setTimeout(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [content]);

    // Determine which items should be visible
    const getVisibleItems = () => {
        const activeItem = items.find(i => i.id === activeId);

        // Build an array of ancestor IDs for the currently active item
        const activeAncestors: string[] = [];
        let curr = activeItem;
        while (curr?.parentId) {
            activeAncestors.push(curr.parentId);
            curr = items.find(i => i.id === curr?.parentId);
        }

        return items.filter(item => {
            // 1. H2 is always visible
            if (item.level === 2) return true;
            if (activeId === item.parentId) return true;
            if (activeItem?.parentId === item.parentId) return true;
            if (activeAncestors.includes(item.parentId || "")) return true;

            // 3. The item itself is active
            if (activeId === item.id) return true;

            return false;
        });
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="w-full h-fit lg:sticky lg:top-32">
            <aside className="w-60">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[14px] font-black uppercase tracking-[0.2em] !text-brand-primary-hover mb-4">
                            Table of Contents
                        </h3>
                        <nav className="flex flex-col border-l border-neutral-100">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {items.map((item) => {
                                    const isVisible = visibleItems.some(v => v.id === item.id);

                                    if (!isVisible) return null;

                                    return (
                                        <motion.a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            layout
                                            initial={{ opacity: 0, height: 0, x: -10 }}
                                            animate={{ opacity: 1, height: "auto", x: 0 }}
                                            exit={{ opacity: 0, height: 0, x: -10 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.23, 1, 0.32, 1]
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const element = document.getElementById(item.id);
                                                if (element) {
                                                    const offset = 160; // Matches scroll-mt
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: "smooth"
                                                    });
                                                }
                                            }}
                                            className={`
                                                group flex items-start gap-3 py-2.5 -ml-px border-l-2 transition-all duration-300 overflow-hidden
                                                ${item.level === 2 ? "pl-4" : ""}
                                                ${item.level === 3 ? "pl-8 text-[13px]" : ""}
                                                ${item.level === 4 ? "pl-12 text-[12px]" : ""}
                                                ${item.level === 5 ? "pl-14 text-[11px]" : ""}
                                                ${item.level === 6 ? "pl-16 text-[10px]" : ""}
                                                ${activeId === item.id
                                                    ? "border-brand-primary text-brand-heading font-black bg-brand-primary/5 rounded-r-lg"
                                                    : "border-transparent text-brand-paragraph hover:text-brand-heading hover:bg-neutral-50 rounded-r-lg"}
                                            `}
                                        >
                                            <span className="leading-tight">{item.text}</span>
                                        </motion.a>
                                    );
                                })}
                            </AnimatePresence>
                        </nav>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default BlogSidebar;
