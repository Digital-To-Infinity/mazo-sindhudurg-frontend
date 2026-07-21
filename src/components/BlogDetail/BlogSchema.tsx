import { BlogPost } from "./Blogdata";

interface BlogSchemaProps {
    post: BlogPost;
}

const BlogSchema = ({ post }: BlogSchemaProps) => {
    //  Strip HTML tags to calculate accurate wordCount
    const plainText = post.content
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    //  Ensure ISO 8601 date format with fallback
    const publishedIso = new Date(post.date || Date.now()).toISOString();

    const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt || post.title,
        "image": [post.image], // ✅ Array format recommended by Google
        "datePublished": publishedIso,
        "dateModified": publishedIso, // ✅ Added: helps Google know content is fresh
        "inLanguage": "en-IN", // ✅ Added: regional targeting for India
        "isAccessibleForFree": true, // ✅ Added: clarifies content is free
        "articleSection": post.category, // ✅ Added: topic classification
        "keywords": post.tags, // ✅ Added: better keyword signals
        "wordCount": plainText.split(/\s+/).filter(Boolean).length, // ✅ Added: accurate word count
        "url": `https://navimumbaipropertydeals.com/blogs/${post.slug}`, // ✅ Added: canonical URL
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://navimumbaipropertydeals.com/blogs/${post.slug}`
        },
        "author": {
            "@type": "Person",
            "name": post.author,
            "jobTitle": post.authorRole || "Author",
            "url": `https://navimumbaipropertydeals.com/author/${post.author.toLowerCase().replace(/\s+/g, "-")}`,
            "sameAs": [
                "https://www.linkedin.com/company/navimumbaipropertydeals",
                "https://twitter.com/navimumbaiproperty"
            ],
            "knowsAbout": ["Real Estate", "Navi Mumbai", "Property Investment"]
        },
        "publisher": {
            "@type": "Organization",
            "name": "Navi Mumbai Property Deals",
            "url": "https://navimumbaipropertydeals.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://navimumbaipropertydeals.com/logo.png"
            }
        }
    };

    // ✅ Breadcrumb schema preserved exactly as you had it
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://navimumbaipropertydeals.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blogs",
                "item": "https://navimumbaipropertydeals.com/blogs"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://navimumbaipropertydeals.com/blogs/${post.slug}`
            }
        ]
    };

    // ✅ Auto-detect FAQs from content
    const extractFAQs = (html: string) => {
        if (!/faq|frequently asked/i.test(html)) return null;

        const faqs = [];
        // Match headings (h2, h3, h4) or bold tags containing a question mark
        const qRegex = /<(h[2-4]|strong|b)[^>]*>(.*?)\?<\/\1>/gi;
        let match;
        const matches = [];

        while ((match = qRegex.exec(html)) !== null) {
            matches.push({
                question: match[2].replace(/<[^>]+>/g, "").trim() + "?",
                endIndex: qRegex.lastIndex,
                index: match.index
            });
        }

        if (matches.length === 0) return null;

        for (let i = 0; i < matches.length; i++) {
            const q = matches[i];
            const nextQ = matches[i + 1];
            const answerHtml = nextQ 
                ? html.substring(q.endIndex, nextQ.index) 
                : html.substring(q.endIndex);
            
            const answerText = answerHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            
            // Only add if answer is meaningful
            if (answerText.length > 5) {
                faqs.push({
                    "@type": "Question",
                    "name": q.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answerText
                    }
                });
            }
        }

        if (faqs.length === 0) return null;

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs
        };
    };

    const faqSchema = extractFAQs(post.content);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
};

export default BlogSchema;
