export interface BlogPost {
    id: string | number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    authorRole: string;
    authorImage: string;
    category: string;
    image: string;
    readTime: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [];
