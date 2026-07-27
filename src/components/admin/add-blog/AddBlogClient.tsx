'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { api } from '@/services/api';

import BlogHeader from './BlogHeader';
import BlogEditor from './BlogEditor';
import BlogActions from './BlogActions';
import PublishingSettings from './PublishingSettings';
import BlogImageUpload from './BlogImageUpload';
import SEOTags from './SEOTags';
import AuthorDetails from './AuthorDetails';

export default function AddBlogClient() {
    const router = useRouter();
    const editorRef = useRef(null);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
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
    
    // Author State
    const [author, setAuthor] = useState('');
    const [authorRole, setAuthorRole] = useState('');
    const [readTime, setReadTime] = useState('');

    // UI State
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1024);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const handleSave = async (saveStatus = 'Draft') => {
        if (saveStatus === 'Published' && !isFormValid) {
            toast.error('Title and content are required to publish!');
            return;
        }
        
        setIsSaving(true);
        try {
            const finalSlug = slug || title.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');
            const heroImage = (images.find((img: any) => img.type === 'hero') as any)?.url || null;
            const thumbnail = (images.find((img: any) => img.type === 'thumbnail') as any)?.url || null;

            const payload = {
                title,
                slug: finalSlug,
                type: 'BLOG',
                status: saveStatus.toUpperCase(),
                heroImage,
                thumbnail,
                body: {
                    content,
                    category,
                    featured,
                    tags,
                    author: {
                        name: author,
                        role: authorRole
                    },
                    readTime
                }
            };

            await api.post('/content', payload);
            toast.success(`Blog successfully ${saveStatus === 'Published' ? 'published' : 'saved as draft'}!`);
            setHasUnsavedChanges(false);
            router.push('/admin/blogs');
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
    ];

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    };

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

                <div className="flex flex-col gap-8 mt-6">
                    {/* Main Content Area (Full Width) */}
                    <div className="w-full">
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

                    {/* Secondary Cards (Front to Front / 2-Column Grid) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <BlogImageUpload images={images} onChange={(imgs: any) => { setImages(imgs); setHasUnsavedChanges(true); }} />
                        
                        <PublishingSettings 
                            category={category} setCategory={(c: string) => { setCategory(c); setHasUnsavedChanges(true); }}
                            customCategory={customCategory} setCustomCategory={setCustomCategory}
                            handleAddCategory={handleAddCategory}
                            status={status} setStatus={(s: string) => { setStatus(s); setHasUnsavedChanges(true); }}
                            featured={featured} setFeatured={(f: boolean) => { setFeatured(f); setHasUnsavedChanges(true); }}
                            categoryOptions={categoryOptions}
                        />

                        <AuthorDetails 
                            author={author} setAuthor={(a: string) => { setAuthor(a); setHasUnsavedChanges(true); }}
                            authorRole={authorRole} setAuthorRole={(r: string) => { setAuthorRole(r); setHasUnsavedChanges(true); }}
                            readTime={readTime} setReadTime={(t: string) => { setReadTime(t); setHasUnsavedChanges(true); }}
                        />

                        <SEOTags 
                            tags={tags} 
                            tagInput={tagInput} 
                            setTagInput={setTagInput} 
                            handleAddTag={handleAddTag} 
                            removeTag={(t: string) => { removeTag(t); setHasUnsavedChanges(true); }} 
                        />
                    </div>

                    {/* Actions Footer */}
                    <div className="w-full lg:w-1/2 mx-auto pt-4 pb-12">
                        <BlogActions 
                            handleSave={handleSave}
                            isFormValid={isFormValid}
                            isDraftValid={isDraftValid}
                            isSaving={isSaving}
                            status={status}
                            hasUnsavedChanges={hasUnsavedChanges}
                            slug={slug}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
