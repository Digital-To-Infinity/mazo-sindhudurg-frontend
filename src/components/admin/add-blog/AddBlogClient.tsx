'use client';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { api } from '@/services/api';
import { uploadMedia } from '@/services/media';

import BlogHeader from './BlogHeader';
import BlogEditor from './BlogEditor';
import BlogActions from './BlogActions';
import PublishingSettings from './PublishingSettings';
import BlogImageUpload from './BlogImageUpload';
import SEOTags from './SEOTags';
import AuthorDetails from './AuthorDetails';
import BlogExcerpt from './BlogExcerpt';

export default function AddBlogClient({ blogId }: { blogId?: number }) {
    const router = useRouter();
    const editorRef = useRef<any>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('Draft');
    
    // Publishing State
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [featured, setFeatured] = useState(false);
    
    // Images State
    const [images, setImages] = useState<any[]>([]);
    const [activeImage, setActiveImage] = useState(null);
    
    // SEO State
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoCanonicalUrl, setSeoCanonicalUrl] = useState('');
    const [seoNoIndex, setSeoNoIndex] = useState(false);
    
    // Author State
    const [authorId, setAuthorId] = useState<number | null>(null);
    const [readTime, setReadTime] = useState('');

    // UI State
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1024);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Handle Title Change
    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
        setHasUnsavedChanges(true);
    };

    // Auto-track changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    // Fetch existing blog data if in edit mode
    useEffect(() => {
        if (!blogId) return;

        const fetchData = async () => {
            try {
                const response: any = await api.get(`/content/${blogId}`);
                const data = response.data || response;
                
                setTitle(data.title || '');
                setSlug(data.slug || '');
                setContent(data.content_html || data.body?.content || '');
                setExcerpt(data.excerpt || '');
                setStatus(data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase() : 'Draft');
                
                // Extract from body wrapper (if it existed) or top level
                setCategory(data.body?.category || data.category || data.entity_categories?.[0]?.categories?.name || '');
                setFeatured(data.body?.featured || data.is_featured || false);
                setAuthorId(data.author_id || null);
                setReadTime(data.body?.readTime || data.reading_time_minutes || '');
                
                // Tags
                if (data.body?.tags && Array.isArray(data.body.tags)) {
                    setTags(data.body.tags);
                } else if (data.tags && Array.isArray(data.tags)) {
                    setTags(data.tags);
                }

                // Images — restore full array from backend
                const initImages: any[] = [];
                if (data.media && data.media.secure_url) {
                    initImages.push({ id: data.media.id, type: 'hero', url: data.media.secure_url });
                } else if (data.heroImage || data.hero_image) {
                    initImages.push({ type: 'hero', url: data.heroImage || data.hero_image || '' });
                }
                // Restore additional images from the response if available
                if (Array.isArray(data.images)) {
                    data.images.forEach((img: any) => {
                        if (!initImages.find((i: any) => i.id === img.id)) {
                            initImages.push({ id: img.id, url: img.secure_url || img.url, type: img.type || undefined });
                        }
                    });
                }
                if (data.thumbnail) {
                    const hasThumbnail = initImages.some((i: any) => i.type === 'thumbnail');
                    if (!hasThumbnail) {
                        initImages.push({ type: 'thumbnail', url: data.thumbnail });
                    }
                }
                setImages(initImages);

                // Fetch SEO data separately
                try {
                    const seoRes: any = await api.get(`/seo/${blogId}`);
                    const seo = seoRes.data || seoRes;
                    if (seo && seo.id) {
                        setSeoTitle(seo.title || '');
                        setSeoDescription(seo.description || '');
                        setSeoCanonicalUrl(seo.canonical_url || seo.canonicalUrl || '');
                        setSeoNoIndex(seo.is_indexed === false || seo.noIndex === true);
                    }
                } catch (e) {
                    console.error("Failed to fetch SEO metadata", e);
                }
            } catch (error) {
                console.error("Failed to fetch blog:", error);
                toast.error("Failed to load blog data.");
            }
        };

        fetchData();
    }, [blogId]);

    const handleAddCategory = () => {
        if (customCategory && !categoryOptions.find(c => c.value === customCategory)) {
            setCategory(customCategory);
            setCustomCategory('');
        }
    };

    const handleAddTag = (e: any) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const isFormValid = title.trim().length > 0 && content.trim().length > 0;
    const isDraftValid = title.trim().length > 0;

    const slugify = (str: string) => str.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

    const handleSave = async (saveStatus = 'Draft') => {
        if (saveStatus === 'Published' && !isFormValid) {
            toast.error('Title and content are required to publish!');
            return;
        }
        
        setIsSaving(true);
        try {
            const finalSlug = slug || slugify(title);
            const heroImageObj = images.find((img: any) => img.type === 'hero' || img.url) as any;
            const heroMediaId = heroImageObj?.id || undefined;
            const thumbnail = (images.find((img: any) => img.type === 'thumbnail') as any)?.url || undefined;

            const payload = {
                title,
                slug: finalSlug,
                content_type: 'blog',
                status: saveStatus.toLowerCase(),
                excerpt,
                hero_media_id: heroMediaId,
                content_html: content,
                category_slug: category ? slugify(category) : undefined,
                is_featured: featured,
                tags,
                author_id: authorId || undefined,
                reading_time_minutes: readTime ? parseInt(readTime, 10) || undefined : undefined
            };

            let response: any;
            if (blogId) {
                response = await api.put(`/content/${blogId}`, payload);
            } else {
                response = await api.post('/content', payload);
            }
            
            // Wait for article creation, then upsert SEO if any fields are filled
            const articleId = blogId || response.data?.id || response.id;
            
            if (articleId && (seoTitle || seoDescription || seoCanonicalUrl || seoNoIndex)) {
                try {
                    await api.put(`/seo/${articleId}`, {
                        title: seoTitle || undefined,
                        description: seoDescription || undefined,
                        canonicalUrl: seoCanonicalUrl || undefined,
                        noIndex: seoNoIndex
                    });
                } catch (seoError) {
                    console.error("Failed to save SEO metadata:", seoError);
                    toast.error("Blog saved, but SEO metadata failed to save.");
                }
            }

            toast.success(`Blog successfully ${saveStatus === 'Published' ? 'published' : 'saved as draft'}!`);
            setHasUnsavedChanges(false);
            if (!blogId && articleId) {
                router.replace(`/admin/content/edit/${articleId}`);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to save blog');
        } finally {
            setIsSaving(false);
        }
    };

    const categoryOptions = [
        { label: 'Beaches', value: 'Beaches' },
        { label: 'Forts', value: 'Forts' },
        { label: 'Temples', value: 'Temples' },
        { label: 'Food', value: 'Food' },
        { label: 'Other', value: 'Other' },
    ];

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            try {
                const media = await uploadMedia(file, file.name);
                const editor = editorRef.current?.getEditor();
                if (editor) {
                    const range = editor.getSelection(true);
                    editor.insertEmbed(range.index, 'image', media.secure_url || media.url);
                    editor.setSelection(range.index + 1);
                }
            } catch (err) {
                toast.error('Image upload failed');
            }
        };
    }, [editorRef]);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), [imageHandler]);

    return (
        <div className="relative p-6 md:p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)] bg-slate-50/50 rounded-3xl m-4 lg:m-6">

            <div className="relative z-10">
                <BlogHeader 
                    onCancel={() => router.push('/admin/blogs')} 
                    windowWidth={windowWidth} 
                    handleSave={handleSave} 
                    isFormValid={isFormValid} 
                    isSaving={isSaving} 
                    hasUnsavedChanges={hasUnsavedChanges} 
                    status={status} 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                />

                <div className={`flex flex-col lg:grid gap-8 mt-6 lg:items-start ${isSidebarOpen ? 'lg:grid-cols-[1fr_350px]' : 'lg:grid-cols-1'}`}>
                    {/* Main Content Area (Left Column) */}
                    <div className="w-full flex flex-col gap-6">
                        <BlogEditor
                            title={title}
                            handleTitleChange={handleTitleChange}
                            slug={slug}
                            setSlug={setSlug}
                            content={content}
                            setContent={(c: string) => { setContent(c); setHasUnsavedChanges(true); }}
                            modules={modules}
                            editorRef={editorRef}
                            activeImage={activeImage}
                            setActiveImage={setActiveImage}
                        />
                    </div>

                    {/* Sidebar Settings (Right Column) — hidden on lg when toggled off, always shown on mobile */}
                    <div className={`w-full flex flex-col gap-6 lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar lg:pb-6 ${!isSidebarOpen ? 'hidden lg:hidden' : ''}`}>
                        <BlogActions
                            handleSave={handleSave}
                            isFormValid={isFormValid}
                            isDraftValid={isDraftValid}
                            isSaving={isSaving}
                            id={blogId ? String(blogId) : undefined}
                            status={status}
                            hasUnsavedChanges={hasUnsavedChanges}
                            slug={slug}
                        />

                        <BlogImageUpload images={images} onChange={(imgs: any) => { setImages(imgs); setHasUnsavedChanges(true); }} />
                        
                        <PublishingSettings 
                            category={category} setCategory={(c: string) => { setCategory(c); setHasUnsavedChanges(true); }}
                            customCategory={customCategory} setCustomCategory={setCustomCategory}
                            handleAddCategory={handleAddCategory}
                            status={status} setStatus={(s: string) => { setStatus(s); setHasUnsavedChanges(true); }}
                            featured={featured} setFeatured={(f: boolean) => { setFeatured(f); setHasUnsavedChanges(true); }}
                            categoryOptions={categoryOptions}
                        />

                        <BlogExcerpt 
                            excerpt={excerpt} 
                            setExcerpt={(e: string) => { setExcerpt(e); setHasUnsavedChanges(true); }} 
                        />

                        <AuthorDetails 
                            authorId={authorId} setAuthorId={setAuthorId}
                            readTime={readTime} setReadTime={(t: string) => { setReadTime(t); setHasUnsavedChanges(true); }}
                        />

                        <SEOTags 
                            tags={tags} 
                            tagInput={tagInput} 
                            setTagInput={setTagInput} 
                            handleAddTag={handleAddTag} 
                            removeTag={(t: string) => { removeTag(t); setHasUnsavedChanges(true); }} 
                            seoTitle={seoTitle}
                            setSeoTitle={(v: string) => { setSeoTitle(v); setHasUnsavedChanges(true); }}
                            seoDescription={seoDescription}
                            setSeoDescription={(v: string) => { setSeoDescription(v); setHasUnsavedChanges(true); }}
                            seoCanonicalUrl={seoCanonicalUrl}
                            setSeoCanonicalUrl={(v: string) => { setSeoCanonicalUrl(v); setHasUnsavedChanges(true); }}
                            seoNoIndex={seoNoIndex}
                            setSeoNoIndex={(v: boolean) => { setSeoNoIndex(v); setHasUnsavedChanges(true); }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
