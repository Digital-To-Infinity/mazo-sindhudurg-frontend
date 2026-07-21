import { Tag } from "lucide-react";
import { useMemo } from "react";

interface BlogMainContentProps {
    content: string;
    tags: string[];
}

const BlogMainContent = ({ content, tags }: BlogMainContentProps) => {
    // Inject IDs into headers for TOC functionality - memoized for performance
    const contentWithIds = useMemo(() => {
        if (!content) return "";
        let processedContent = content;

        let summaryAdded = false;
        processedContent = processedContent.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (match, text) => {
            if (!summaryAdded && !text.includes('<img') && text.trim().length > 0) {
                summaryAdded = true;
                return `<div id="quick-summary" class="mb-6 max-[426px]:mb-4">
                    <p>${text}</p>
                </div>`;
            }
            return match;
        });

        // 2. Inject IDs into headers for TOC functionality - ensure uniqueness
        const seenIds = new Set<string>();
        processedContent = processedContent.replace(
            /<h([23456])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
            (match: string, level: string, text: string) => {
                const plainText = text.replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .toLowerCase()
                    .trim();
                let id = plainText.replace(/\s+/g, "-").replace(/[^\w-]/g, "");

                // Handle cases where ID might be empty after sanitization
                if (!id) id = `section-${level}`;

                // Ensure uniqueness
                let uniqueId = id;
                let counter = 1;
                while (seenIds.has(uniqueId)) {
                    uniqueId = `${id}-${counter}`;
                    counter++;
                }
                seenIds.add(uniqueId);

                return `<h${level} id="${uniqueId}">${text}</h${level}>`;
            }
        );

        // 3. Wrap tables for responsiveness
        processedContent = processedContent.replace(/<table[\s\S]*?<\/table>/gi, (match: string) => {
            return `<div class="w-full overflow-x-auto mb-10 border border-neutral-200 rounded-xl shadow-sm [&_table]:!mb-0">${match}</div>`;
        });

        // 4. Transform FAQ section into interactive accordions cleanly (Assuming it's always at the end of the post)
        return processedContent.replace(/(<h([1-6])[^>]*>(?:(?!<\/h\2>)[\s\S])*?(?:faq|faqs|faq\'s|frequently asked questions|f\.a\.q|frequantly asked quastions|frequent.*?question)(?:(?!<\/h\2>)[\s\S])*?<\/h\2>)([\s\S]*)$/i, (match: string, faqHeading: string, faqLevel: string, faqBody: string) => {
            const tokens = faqBody.split(/(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)/i);
            let transformedBody = "";
            let currentQ = "";
            let currentA = "";

            const renderAccordion = (q: string, a: string) => {
                // Convert any heading in the answer to a paragraph so it's not bold and inherits standard text styling
                const cleanAnswer = a.replace(/<h[1-6]\b([^>]*)>/gi, '<p$1>').replace(/<\/h[1-6]>/gi, '</p>');
                return `
                <details class="group border border-neutral-200 rounded-[1.5rem] mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 open:border-brand-primary/30 [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-6 max-[426px]:p-5 hover:bg-neutral-50/80 transition-colors">
                        <div class="[&_h1]:!my-0 [&_h1]:!text-[18px] max-[426px]:[&_h1]:!text-[16px] [&_h1]:!normal-case [&_h2]:!my-0 [&_h2]:!text-[18px] max-[426px]:[&_h2]:!text-[16px] [&_h2]:!normal-case [&_h3]:!my-0 [&_h3]:!text-[18px] max-[426px]:[&_h3]:!text-[16px] [&_h3]:!normal-case [&_h4]:!my-0 [&_h4]:!text-[18px] max-[426px]:[&_h4]:!text-[16px] [&_h4]:!normal-case [&_h5]:!my-0 [&_h5]:!text-[18px] max-[426px]:[&_h5]:!text-[16px] [&_h5]:!normal-case [&_h6]:!my-0 [&_h6]:!text-[18px] max-[426px]:[&_h6]:!text-[16px] [&_h6]:!normal-case pr-4">${q}</div>
                        <div class="h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-neutral-100 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 group-open:bg-brand-primary group-open:text-white">
                            <svg class="transition-transform duration-300 group-open:rotate-180" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                        </div>
                    </summary>
                    <div class="p-6 pt-2 max-[426px]:p-5 max-[426px]:pt-1 text-brand-paragraph bg-white [&_p:last-child]:!mb-0">
                        ${cleanAnswer}
                    </div>
                </details>
                `;
            };

            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (/<h[1-6][^>]*>/i.test(token)) {
                    if (!currentQ) {
                        currentQ = token;
                    } else {
                        // If answer is empty, this heading is the answer!
                        if (currentA.trim().replace(/<br\s*\/?>/gi, "") === "") {
                            currentA += token;
                        } else {
                            // We have a Q and A, render them and start new Q
                            transformedBody += renderAccordion(currentQ, currentA);
                            currentQ = token;
                            currentA = "";
                        }
                    }
                } else {
                    if (currentQ) {
                        currentA += token;
                    }
                }
            }

            if (currentQ) {
                transformedBody += renderAccordion(currentQ, currentA);
            }
            const updatedFaqHeading = faqHeading.replace(/^<h[1-6]\b([^>]*)>/i, '<h2$1>').replace(/<\/h[1-6]>$/i, '</h2>');
            return updatedFaqHeading + '<div class="mt-8 mb-12">' + transformedBody + '</div>';
        });
    }, [content]);

    // Replace all non-breaking spaces with normal spaces to allow natural text wrapping
    const finalContent = contentWithIds.replace(/&nbsp;/g, ' ');

    return (
        <div className="flex-1 min-w-0 max-w-3xl w-full max-[426px]:max-w-full">
            <div
                className="max-w-none break-words [&_*]:break-words [&_*]:!max-w-full 
                    [&_h2]:text-brand-heading [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-[24px] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-tight [&_h2]:uppercase [&_h2]:scroll-mt-[82px] max-[426px]:[&_h2]:text-[20px] max-[426px]:[&_h2]:mt-8 max-[426px]:[&_h2]:mb-3
                    [&_h3]:text-brand-heading [&_h3]:font-black [&_h3]:tracking-tight [&_h3]:text-[20px] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:leading-tight [&_h3]:uppercase [&_h3]:scroll-mt-[82px] max-[426px]:[&_h3]:text-[18px] max-[426px]:[&_h3]:mt-7 max-[426px]:[&_h3]:mb-2
                    [&_h4]:text-brand-heading [&_h4]:font-black [&_h4]:tracking-tight [&_h4]:text-[16px] [&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:leading-tight [&_h4]:uppercase [&_h4]:scroll-mt-[82px] [&_h4]:text-brand-primary max-[426px]:[&_h4]:text-[15px] max-[426px]:[&_h4]:mt-6 max-[426px]:[&_h4]:mb-1
                    [&_h5]:text-brand-heading [&_h5]:font-black [&_h5]:tracking-tight [&_h5]:text-[14px] [&_h5]:mt-6 [&_h5]:mb-2 [&_h5]:leading-tight [&_h5]:uppercase [&_h5]:scroll-mt-[82px] [&_h5]:text-brand-primary-hover max-[426px]:[&_h5]:text-[13px] max-[426px]:[&_h5]:mt-4 max-[426px]:[&_h5]:mb-1
                    [&_h6]:text-brand-heading [&_h6]:font-bold [&_h6]:tracking-tight [&_h6]:text-[12px] [&_h6]:mt-4 [&_h6]:mb-1 [&_h6]:leading-tight [&_h6]:uppercase [&_h6]:scroll-mt-[82px] [&_h6]:text-neutral-500 max-[426px]:[&_h6]:text-[11px] max-[426px]:[&_h6]:mt-3 max-[426px]:[&_h6]:mb-0
                    [&_p]:text-brand-paragraph [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:mt-0 [&_p]:text-[18px] max-[426px]:[&_p]:text-[16px] max-[426px]:[&_p]:mb-4 max-[426px]:[&_p]:leading-[1.6]
                    [&_strong]:text-brand-heading [&_strong]:font-bold
                    [&_blockquote]:border-l-[6px] max-[426px]:[&_blockquote]:border-l-[4px] [&_blockquote]:border-brand-primary [&_blockquote]:bg-brand-primary/5 [&_blockquote]:py-8 [&_blockquote]:px-10 [&_blockquote]:rounded-r-[2rem] [&_blockquote]:not-italic [&_blockquote]:my-16 [&_blockquote]:text-xl [&_blockquote]:font-medium [&_blockquote]:text-brand-heading/80 max-[426px]:[&_blockquote]:py-2 max-[426px]:[&_blockquote]:px-4 max-[426px]:[&_blockquote]:my-8 max-[426px]:[&_blockquote]:text-base max-[426px]:[&_blockquote]:rounded-r-[1rem]
                    [&_li]:text-brand-paragraph [&_li]:mb-4 [&_li]:text-[17px] [&_li]:leading-relaxed max-[426px]:[&_li]:text-[15px] max-[426px]:[&_li]:mb-2
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-10 [&_ul]:mt-0 [&_ul]:marker:text-brand-primary max-[426px]:[&_ul]:pl-4 max-[426px]:[&_ul]:mb-6
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-10 [&_ol]:mt-0 [&_ol]:marker:text-brand-primary max-[426px]:[&_ol]:pl-4 max-[426px]:[&_ol]:mb-6
                    [&_img]:!max-w-full [&_img]:!h-auto [&_img]:rounded-[2.5rem] [&_img]:my-12 hover:[&_img]:scale-[1.02] [&_img]:transition-transform [&_img]:duration-500 max-[426px]:[&_img]:my-6 max-[426px]:[&_img]:rounded-[1.5rem]
                    [&_iframe]:!max-w-full [&_video]:!max-w-full
                    [&_figure]:!max-w-full [&_figure]:!overflow-x-auto
                    [&_table]:!w-full [&_table]:!max-w-none [&_table]:!border-collapse [&_table]:text-left [&_table]:text-[15px] [&_table]:mb-10
                    [&_th]:px-4 [&_th]:py-3 [&_th]:bg-neutral-50 [&_th]:font-bold [&_th]:border [&_th]:border-neutral-200
                    [&_td]:px-4 [&_td]:py-3 [&_td]:border [&_td]:border-neutral-200 [&_td]:align-top
                    [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-bold [&_a]:break-all"
                dangerouslySetInnerHTML={{ __html: finalContent }}
            />

            {/* Tags Section */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 text-brand-paragraph text-[14px] font-bold hover:bg-brand-primary/10 hover:text-brand-primary transition-all cursor-default border border-transparent hover:border-brand-primary/20"
                        >
                            <Tag size={12} className="text-brand-primary" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogMainContent;
