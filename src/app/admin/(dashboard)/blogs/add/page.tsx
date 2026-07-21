'use client';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
const useNavigate = useRouter;
import { toast } from 'react-hot-toast';
import BlogHeader from '@/components/add-blog/BlogHeader';
import BlogEditor from '@/components/add-blog/BlogEditor';
import AuthorDetails from '@/components/add-blog/AuthorDetails';
import PublishingSettings from '@/components/add-blog/PublishingSettings';
import BlogImageUpload from '@/components/add-blog/BlogImageUpload';
import SEOTags from '@/components/add-blog/SEOTags';
import BlogActions from '@/components/add-blog/BlogActions';
import { api } from '@/services/api';
import ReactQuill from 'react-quill-new';

// ── Register Custom Formats ──
    // 1. Fonts
    const Quill = ReactQuill.Quill;
    const Font = Quill.import('formats/font');
    Font.whitelist = ['sans-serif', 'serif', 'monospace', 'inter', 'roboto', 'georgia', 'poppins', 'montserrat', 'lato', 'oswald'];
    Quill.register(Font, true);

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'];
Quill.register(Size, true);

const BaseImageFormat = Quill.import('formats/image');
class CustomImage extends BaseImageFormat {
    static create(value) {
        const node = super.create(value);
        // Sometimes value is an object if parsing from delta
        if (typeof value === 'object') {
            node.setAttribute('src', value.src || '');
            if (value.alt) node.setAttribute('alt', value.alt);
            if (value.title) node.setAttribute('title', value.title);
        }
        return node;
    }
    
    static formats(domNode) {
        return {
            alt: domNode.getAttribute('alt') || '',
            title: domNode.getAttribute('title') || ''
        };
    }
    
    format(name, value) {
        if (name === 'alt' || name === 'title') {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }
}
Quill.register(CustomImage, true);

const defaultCategoryOptions = [
    { value: 'Market Insights', label: 'Market Insights' },
    { value: 'Buying Guide', label: 'Buying Guide' },
    { value: 'Investment', label: 'Investment' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Real Estate News', label: 'Real Estate News' },
    { value: 'Other', label: 'Other (Add Custom)' }
];

const AddBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const quillRef = useRef(null);
    
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState(''); // Added excerpt state
    const [status, setStatus] = useState('Published');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [authorRole, setAuthorRole] = useState('');
    const [readTime, setReadTime] = useState('');
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [featured, setFeatured] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState(defaultCategoryOptions);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setHasUnsavedChanges(true);
    }, [title, slug, content, excerpt, category, customCategory, author, authorRole, readTime, status, featured, tags, images]);

    // Prompt before tab close if there are unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = ''; // Required for Chrome and standard browsers
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        fetchCategories();
        if (id) {
            fetchBlog();
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await api.get(`/admin/blogs/${id}`);
            if (response?.success) {
                const blog = response.data;
                setTitle(blog.title);
                setSlug(blog.slug || '');
                setContent(blog.content);
                setExcerpt(blog.excerpt || ''); // Load excerpt when editing
                setCategory(blog.category);
                // Fix author loading with fallback
                setAuthor(blog.author_name || blog.author || '');
                setAuthorRole(blog.author_role);
                setReadTime(blog.read_time);
                setStatus(blog.status);
                setFeatured(blog.featured === 1 || blog.featured === true);
                setTags(blog.tags || []);
                if (blog.cover_image_url) {
                    setImages([blog.cover_image_url]);
                }
                
                // Reset unsaved changes after data is loaded and state is updated
                setTimeout(() => setHasUnsavedChanges(false), 200);
            }
        } catch (error) {
            console.error('Failed to fetch blog:', error);
            toast.error('Failed to load blog data');
        }
    };

    const fetchCategories = async () => {
        setIsLoadingCategories(true);
        try {
            const response = await api.get('/blogs/categories');
            if (response?.success) {
                const apiCategories = response.data.map(cat => ({
                    value: cat.name,
                    label: cat.name
                }));
                // Combine default with API categories, ensuring no duplicates
                const combined = [...apiCategories];
                const seen = new Set(combined.map(c => c.value));
                
                defaultCategoryOptions.forEach(opt => {
                    if (!seen.has(opt.value)) {
                        combined.push(opt);
                    }
                });
                
                // Ensure "Other" is always at the end
                const finalOptions = combined.filter(opt => opt.value !== 'Other');
                finalOptions.push({ value: 'Other', label: 'Other (Add Custom)' });
                
                setCategoryOptions(finalOptions);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            // Fallback to default options already set in state initialization
        } finally {
            setIsLoadingCategories(false);
        }
    };

    const handleAddCategory = async () => {
        if (!customCategory.trim()) {
            toast.error('Please enter a category name');
            return;
        }

        try {
            const response = await api.post('/admin/blogs/categories', { name: customCategory.trim() });
            if (response?.success) {
                toast.success('Category added successfully!');
                // Reset custom category and refresh list
                setCategory(customCategory.trim());
                setCustomCategory('');
                await fetchCategories();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to add category');
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

    // ── Custom Image Handler: uploads image via API and inserts URL ──
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image must be smaller than 5MB');
                return;
            }

            const loadingToast = toast.loading('Uploading image...');

            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await api.post('/admin/upload-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response?.success && response?.url) {
                    const editor = quillRef.current?.getEditor();
                    if (editor) {
                        const range = editor.getSelection(true);
                        editor.insertEmbed(range.index, 'image', response.url);
                        editor.setSelection(range.index + 1);
                    }
                    toast.success('Image inserted!');
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error('Image upload error:', error);
                // Fallback: use local blob URL so the image still appears in the editor
                const localUrl = URL.createObjectURL(file);
                const editor = quillRef.current?.getEditor();
                if (editor) {
                    const range = editor.getSelection(true);
                    editor.insertEmbed(range.index, 'image', localUrl);
                    editor.setSelection(range.index + 1);
                }
                toast.error('Cloud upload failed — image added locally. Re-upload recommended.');
            } finally {
                toast.dismiss(loadingToast);
            }
        };
    };

    // ── Enhanced Quill Modules with Typography Controls ──
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'font': ['sans-serif', 'serif', 'monospace', 'inter', 'roboto', 'georgia', 'poppins', 'montserrat', 'lato', 'oswald'] }],
                [{ 'size': ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
    }), []);

    //Added excerpt.trim() !== '' to validation
    const isFormValid =
        title.trim() !== '' &&
        excerpt.trim() !== '' &&  //Excerpt now required
        content.trim() !== '' &&
        content !== '<p><br></p>' &&
        (category !== 'Other' ? category !== '' : customCategory.trim() !== '') &&
        author.trim() !== '' &&
        authorRole.trim() !== '' &&
        readTime.trim() !== '' &&
        images.length > 0;

    const isDraftValid = title.trim() !== '';

    const handleSave = async (overridingStatus = null) => {
        const finalStatus = overridingStatus || status;

        if (finalStatus === 'Published' && !isFormValid) {
            toast.error('Please fill in all required fields and upload a cover image to publish.');
            return;
        }

        if (finalStatus === 'Draft' && !isDraftValid) {
            toast.error('A title is required to save a draft.');
            return;
        }

        const finalCategory = category === 'Other' ? customCategory : (category || 'Market Insights');
        
        setIsSaving(true);
        try {
            const formData = new FormData();
            
            // Step 1: Handle images
            if (images.length > 0) {
                // First image is always the coverImage
                const coverImg = images[0];
                if (coverImg.file) {
                    formData.append('coverImage', coverImg.file);
                } else if (typeof coverImg === 'string') {
                    formData.append('cover_image_url', coverImg);
                }

                // Subsequent images are galleryImages
                const existingGallery = [];
                for (let i = 1; i < images.length; i++) {
                    const img = images[i];
                    if (img.file) {
                        formData.append('galleryImages', img.file);
                    } else if (typeof img === 'string') {
                        existingGallery.push(img);
                    } else if (img.preview && !img.file) {
                        // This case handles existing images that might be objects
                        existingGallery.push(img.preview);
                    }
                }
                if (existingGallery.length > 0) {
                    formData.append('existingGallery', JSON.stringify(existingGallery));
                }
            }

            // Step 2: Append other fields
            formData.append('title', title || 'Untitled Article');
            formData.append('slug', slug.trim()); // Send custom slug to backend
            formData.append('excerpt', excerpt.trim()); //Send excerpt to backend
            formData.append('content', content);
            formData.append('category', finalCategory);
            formData.append('author', author || 'Admin');
            formData.append('author_role', authorRole || 'Editor');
            formData.append('read_time', readTime || '5 min read');
            formData.append('status', finalStatus);
            formData.append('featured', featured ? 'true' : 'false');
            formData.append('tags', JSON.stringify(tags));
            formData.append('date', new Date().toISOString().split('T')[0]);

            let response;
            if (id) {
                response = await api.put(`/admin/blogs/${id}`, formData);
            } else {
                response = await api.post('/admin/blogs', formData);
            }

            if (response?.success) {
                setHasUnsavedChanges(false);
                toast.success(id ? 'Article updated successfully!' : `Article ${finalStatus === 'Published' ? 'published' : 'saved as draft'} successfully!`);
                if (!id && response.data?.id) {
                    navigate(`/blogs/edit/${response.data.id}`, { replace: true });
                }
            }
        } catch (error) {
            toast.dismiss('uploading');
            console.error('Save error:', error);
            toast.error(error.message || error.message || 'Failed to save article');
        } finally {
            setIsSaving(false);
        }
    };

    // ✅ Bonus: Helper to reset form (call this in handleCancel or after save)
    const resetForm = () => {
        setTitle('');
        setSlug('');
        setExcerpt('');
        setContent('');
        setCategory('');
        setCustomCategory('');
        setAuthor('');
        setAuthorRole('');
        setReadTime('');
        setImages([]);
        setTags([]);
        setTagInput('');
        setFeatured(false);
        setStatus('Published');
        setActiveImage(null);
    };

    const handleUpdateActiveImage = (field, value) => {
        if (!quillRef?.current || activeImage?.index === null) return;
        const editor = quillRef.current.getEditor();
        editor.formatText(activeImage.index, 1, field, value);
        setActiveImage(prev => ({ ...prev, [field]: value }));
    };

    const handleMoveActiveImage = (direction) => {
        if (!quillRef?.current || activeImage?.index === null) return;
        const editor = quillRef.current.getEditor();
        let index = activeImage.index;
        
        let [leaf] = editor.getLeaf(index);
        
        if (!leaf || leaf.statics.blotName !== 'image') {
            const [leaf2] = editor.getLeaf(index + 1);
            if (leaf2 && leaf2.statics.blotName === 'image') {
                index = index + 1;
                leaf = leaf2;
            } else {
                const [leaf3] = editor.getLeaf(index - 1);
                if (leaf3 && leaf3.statics.blotName === 'image') {
                    index = index - 1;
                    leaf = leaf3;
                } else {
                    return; 
                }
            }
        }
        
        // Ensure index is absolutely correct
        index = editor.getIndex(leaf);
        if (index === null) return;

        const [block] = editor.getLine(index);
        if (!block) return;
        
        let newIndex = index;
        
        if (direction === 'up') {
            const prevBlock = block.prev;
            if (!prevBlock) return;
            newIndex = editor.getIndex(prevBlock);
        } else {
            const nextBlock = block.next;
            if (!nextBlock) return;
            newIndex = editor.getIndex(nextBlock) + nextBlock.length();
        }

        const format = editor.getFormat(index);
        const src = leaf.domNode.getAttribute('src');
        
        const Quill = quillRef.current.makeQuill ? quillRef.current.makeQuill().constructor : editor.constructor;
        const Delta = Quill.import('delta') || editor.constructor.import('delta') || window.Quill.import('delta');
        
        const delta = new Delta();
        
        if (direction === 'up') {
            if (newIndex > 0) delta.retain(newIndex);
            delta.insert({ image: src }, format);
            delta.retain(index - newIndex);
            delta.delete(1);
        } else {
            if (index > 0) delta.retain(index);
            delta.delete(1);
            delta.retain(newIndex - index - 1);
            delta.insert({ image: src }, format);
        }
        
        editor.updateContents(delta, 'user');
        
        // Calculate the final index for selection
        const finalIndex = direction === 'up' ? newIndex : newIndex - 1;
        editor.setSelection(finalIndex, 1);
        setActiveImage(prev => ({ ...prev, index: finalIndex }));
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <BlogHeader
                id={id}
                onCancel={() => {
                    resetForm();
                    navigate('/blogs');
                }}
                windowWidth={windowWidth}
                handleSave={handleSave}
                isFormValid={isFormValid}
                isSaving={isSaving}
                hasUnsavedChanges={hasUnsavedChanges}
                status={status}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className={`mx-auto grid grid-cols-1 gap-8 items-start transition-all duration-300 ${isSidebarOpen ? 'lg:grid-cols-[1fr_340px]' : 'lg:grid-cols-1'}`}>
                {/* Main Content Area (Left side) */}
                <div className="space-y-8">
                    <BlogEditor
                        title={title}
                        handleTitleChange={handleTitleChange}
                        slug={slug}
                        setSlug={setSlug}
                        content={content}
                        setContent={setContent}
                        modules={modules}
                        editorRef={quillRef}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                    />
                </div>

                {/* Sidebar Area (Right side) */}
                {isSidebarOpen && (
                    <div className="space-y-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8">
                        {activeImage && (
                            <div className="ag-card p-5 max-[426px]:p-4 shadow-sm border-brand-primary/20 bg-brand-primary/5 rounded-xl animate-fade-in">
                                <div className="flex items-center justify-between border-b border-brand-primary/10 pb-2 mb-4">
                                    <h4 className="text-[11px] font-bold text-brand-primary uppercase tracking-widest pl-1">Image Settings</h4>
                                    <div className="flex items-center gap-1">
                                        <button 
                                            type="button"
                                            onClick={() => handleMoveActiveImage('up')}
                                            className="p-1 hover:bg-white text-brand-primary rounded-md transition-colors shadow-sm"
                                            title="Move Image Up"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => handleMoveActiveImage('down')}
                                            className="p-1 hover:bg-white text-brand-primary rounded-md transition-colors shadow-sm"
                                            title="Move Image Down"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setActiveImage(null)}
                                            className="p-1 hover:bg-red-50 text-red-500 rounded-md transition-colors ml-2"
                                            title="Close Image Settings"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Image Title / Name</label>
                                        <input 
                                            type="text" 
                                            value={activeImage.title}
                                            onChange={(e) => handleUpdateActiveImage('title', e.target.value)}
                                            className="w-full text-sm bg-white border border-slate-200 rounded-md px-3 py-2 mt-1 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="E.g. Kharghar Valley View"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Alt Text (SEO)</label>
                                        <input 
                                            type="text" 
                                            value={activeImage.alt}
                                            onChange={(e) => handleUpdateActiveImage('alt', e.target.value)}
                                            className="w-full text-sm bg-white border border-slate-200 rounded-md px-3 py-2 mt-1 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="E.g. A beautiful 2BHK flat in Kharghar..."
                                        />
                                        <p className="text-[10px] text-slate-400 mt-1">Describe the image for screen readers & SEO.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <BlogActions
                            handleSave={handleSave}
                            isFormValid={isFormValid}
                            isDraftValid={isDraftValid}
                            isSaving={isSaving}
                            id={id}
                            status={status}
                            hasUnsavedChanges={hasUnsavedChanges}
                            slug={slug}
                        />

                        <PublishingSettings
                        category={category}
                        setCategory={setCategory}
                        customCategory={customCategory}
                        setCustomCategory={setCustomCategory}
                        handleAddCategory={handleAddCategory}
                        status={status}
                        setStatus={setStatus}
                        featured={featured}
                        setFeatured={setFeatured}
                        categoryOptions={categoryOptions}
                    />

                    {/* SEO Excerpt / Meta Description Field */}
                    <div className="ag-card p-5 space-y-4 shadow-sm border-slate-100/50 bg-white rounded-xl">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                                Meta Description / Excerpt
                            </label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                maxLength={165}
                                rows={4}
                                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none min-h-[110px]"
                                placeholder="Write a clear 140–160 character summary."
                            />
                            <div className="flex justify-between text-[11px] font-semibold">
                                <span className={excerpt.length < 120 ? 'text-amber-600' : 'text-emerald-600'}>
                                    140–160 chars recommended
                                </span>
                                <span className="text-slate-400">{excerpt.length}/165</span>
                            </div>
                        </div>
                    </div>

                        <BlogImageUpload
                            images={images}
                            onChange={(newImages) => setImages(newImages)}
                        />

                        <SEOTags
                            tags={tags}
                            tagInput={tagInput}
                            setTagInput={setTagInput}
                            handleAddTag={handleAddTag}
                            removeTag={removeTag}
                        />

                        <AuthorDetails
                        author={author}
                        setAuthor={setAuthor}
                        authorRole={authorRole}
                        setAuthorRole={setAuthorRole}
                        readTime={readTime}
                            setReadTime={setReadTime}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddBlog;


