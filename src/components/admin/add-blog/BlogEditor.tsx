// @ts-nocheck
'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUp, ArrowDown, Check, X, Wand2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false });

const BlogEditor = ({ title, handleTitleChange, slug, setSlug, content, setContent, modules, editorRef, activeImage, setActiveImage }: any) => {

    useEffect(() => {
        if (!editorRef?.current) return;
        const editor = editorRef.current.getEditor();
        
        const handleImageClick = (e: any) => {
            if (e.target.tagName === 'IMG') {
                const QuillClass = (window as any).Quill || editor.constructor;
                const blot = QuillClass?.find ? QuillClass.find(e.target) : null;
                if (blot) {
                    const index = editor.getIndex(blot);
                    if (index !== null) {
                        editor.setSelection(index, 1);
                        const format = editor.getFormat(index);
                        setActiveImage({
                            index: index,
                            alt: format.alt || '',
                            title: format.title || ''
                        });
                    }
                }
            } else {
                setActiveImage(null);
            }
        };

        const handleKeydown = () => {
            setActiveImage(null);
        };

        editor.root.addEventListener('click', handleImageClick);
        editor.root.addEventListener('keydown', handleKeydown);

        return () => {
            editor.root.removeEventListener('click', handleImageClick);
            editor.root.removeEventListener('keydown', handleKeydown);
        };
    }, [editorRef, setActiveImage]);

    const handleFormatFAQs = (e: any) => {
        e.preventDefault();
        const editor = editorRef.current?.getEditor();
        if (!editor) return;

        const html = editor.root.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const headings = Array.from(doc.querySelectorAll('h1, h2, h3'));
        const faqHeaderIndex = headings.findIndex(h => /faqs?|frequently asked questions/i.test(h.textContent || ''));
        
        if (faqHeaderIndex === -1) {
            toast.error('Could not find a section titled "FAQs" or "Frequently Asked Questions".');
            return;
        }

        const faqHeader = headings[faqHeaderIndex];
        
        const newFaqHeader = doc.createElement('h2');
        newFaqHeader.innerHTML = faqHeader.innerHTML;
        faqHeader.replaceWith(newFaqHeader);

        let current = newFaqHeader.nextElementSibling;
        let expectingQuestion = true;

        while (current) {
            const next = current.nextElementSibling;
            const isHeading = current.tagName.match(/^H[1-6]$/);
            const isEmpty = !(current.textContent || '').trim() && current.tagName !== 'IMG' && current.tagName !== 'BR';

            if (isEmpty) {
                current.remove();
            } else if (isHeading) {
                if (expectingQuestion) {
                    const h3 = doc.createElement('h3');
                    h3.innerHTML = current.innerHTML;
                    current.replaceWith(h3);
                    expectingQuestion = false;
                } else {
                    const p = doc.createElement('p');
                    p.innerHTML = current.innerHTML;
                    current.replaceWith(p);
                    expectingQuestion = true;
                }
            } else {
                expectingQuestion = true;
            }
            
            current = next;
        }

        setContent(doc.body.innerHTML);
        toast.success('FAQs successfully auto-formatted!');
    };

    return (
        <div className="relative space-y-8 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="space-y-3">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-widest pl-1">Article Title</label>
                <textarea
                    value={title}
                    onChange={(e) => {
                        handleTitleChange(e);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    placeholder="Enter a catchy headline..."
                    className="w-full text-lg sm:text-xl font-bold border border-white/50 bg-white/40 placeholder:text-slate-400 focus:outline-none focus:bg-white/60 focus:border-blue-200/50 focus:ring-4 focus:ring-blue-100/30 px-4 py-3 sm:py-4 text-slate-800 transition-all rounded-xl resize-none overflow-hidden shadow-sm break-words leading-relaxed"
                    rows={1}
                />
            </div>

            <div className="space-y-3 min-w-0">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-widest pl-1">Permalink (Slug)</label>
                <div className="flex items-center px-3 py-2 bg-white/40 rounded-xl border border-white/50 focus-within:bg-white/60 focus-within:border-blue-200/50 transition-all shadow-sm w-full max-w-full overflow-hidden">
                    <span className="text-sm font-bold text-slate-400 select-none mr-2 shrink-0 truncate">mazosindhudurg.com/blogs/</span>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))}
                        placeholder={title ? title.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '') : "your-custom-url"}
                        className="flex-1 min-w-0 text-sm font-bold border-none bg-transparent placeholder:text-slate-300 focus:outline-none focus:ring-0 text-slate-700 truncate"
                    />
                </div>
                <p className="text-[10px] font-bold text-slate-400 pl-2">Leave blank to auto-generate from the title.</p>
            </div>

            <div className="space-y-3 relative pt-4">
                <div className="flex items-center justify-between pl-1 mb-2">
                    <label className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Story Content</label>
                    <button 
                        onClick={handleFormatFAQs}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow"
                        title="Auto-format FAQs"
                    >
                        <Wand2 size={12} strokeWidth={2.5} />
                        Format FAQs
                    </button>
                </div>
                <div className="rich-text-editor relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 shadow-inner overflow-hidden">
                    <QuillEditor
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        editorRef={editorRef}
                        placeholder="Start writing your property news, area guides, or lifestyle tips here..."
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
