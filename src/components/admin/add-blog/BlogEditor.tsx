import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);
import { ArrowUp, ArrowDown, Check, X, Wand2 } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-hot-toast';

interface BlogEditorProps {
    title: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    slug: string;
    setSlug: (val: string) => void;
    content: string;
    setContent: (val: string) => void;
    modules: any;
    editorRef: any;
    activeImage: any;
    setActiveImage: (val: any) => void;
}

const BlogEditor = ({ title, handleTitleChange, slug, setSlug, content, setContent, modules, editorRef, activeImage, setActiveImage }: BlogEditorProps) => {

    useEffect(() => {
        if (!editorRef?.current) return;
        const editor = editorRef.current.getEditor();
        
        const handleImageClick = (e: any) => {
            if (e.target.tagName === 'IMG') {
                const QuillClass = (ReactQuill as any).Quill || editor.constructor;
                const blot = QuillClass.find(e.target);
                if (blot) {
                    const index = editor.getIndex(blot);
                    if (index !== null) {
                        editor.setSelection(index, 1);
                        const format = editor.getFormat(index);
                        const bounds = editor.getBounds(index);
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
            // Any typing or arrow key navigation should hide the image toolbar
            setActiveImage(null);
        };

        // We bind native DOM events to the editor root which are much more reliable than Quill's selection-change
        editor.root.addEventListener('click', handleImageClick);
        editor.root.addEventListener('keydown', handleKeydown);

        return () => {
            editor.root.removeEventListener('click', handleImageClick);
            editor.root.removeEventListener('keydown', handleKeydown);
        };
    }, [editorRef, setActiveImage]);

    const handleFormatFAQs = (e: React.MouseEvent) => {
        e.preventDefault();
        const editor = editorRef.current?.getEditor();
        if (!editor) return;

        const html = editor.root.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const headings = Array.from(doc.querySelectorAll('h1, h2, h3'));
        const faqHeaderIndex = headings.findIndex(h => /faqs?|frequently asked questions/i.test(h.textContent));
        
        if (faqHeaderIndex === -1) {
            toast.error('Could not find a section titled "FAQs" or "Frequently Asked Questions".');
            return;
        }

        const faqHeader = headings[faqHeaderIndex];
        
        // Standardize the FAQ header to H2
        const newFaqHeader = doc.createElement('h2');
        newFaqHeader.innerHTML = faqHeader.innerHTML;
        faqHeader.replaceWith(newFaqHeader);

        let current = newFaqHeader.nextElementSibling;
        let expectingQuestion = true;

        while (current) {
            const next = current.nextElementSibling;
            
            const isHeading = current.tagName.match(/^H[1-6]$/);
            const isEmpty = !current.textContent.trim() && current.tagName !== 'IMG' && current.tagName !== 'BR';

            if (isEmpty) {
                current.remove();
            } else if (isHeading) {
                if (expectingQuestion) {
                    // Turn it into an H3 question
                    const h3 = doc.createElement('h3');
                    h3.innerHTML = current.innerHTML;
                    current.replaceWith(h3);
                    expectingQuestion = false;
                } else {
                    // This heading is actually an answer, turn into P
                    const p = doc.createElement('p');
                    p.innerHTML = current.innerHTML;
                    current.replaceWith(p);
                    expectingQuestion = true;
                }
            } else {
                // Any other tag (P, UL, etc.) is considered part of the answer
                expectingQuestion = true;
            }
            
            current = next;
        }

        setContent(doc.body.innerHTML);
        toast.success('FAQs successfully auto-formatted!');
    };



    return (
        <div className="ag-card p-6 md:p-8 max-[426px]:p-4 space-y-6 shadow-sm border-slate-100/50 relative">
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Article Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter a catchy headline..."
                    className="w-full text-3xl font-bold border-none bg-transparent placeholder:text-slate-200 focus:outline-none focus:ring-0 px-1 py-2 text-slate-900"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Permalink (Slug)</label>
                <div className="flex items-center px-2">
                    <span className="text-sm text-slate-400 select-none mr-1">navimumbaipropertydeals.com/blogs/</span>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))}
                        placeholder={title ? title.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '') : "your-custom-url"}
                        className="flex-1 text-sm font-medium border-b border-transparent focus:border-brand-primary bg-transparent placeholder:text-slate-300 focus:outline-none focus:ring-0 py-1 text-slate-700"
                    />
                </div>
                <p className="text-[10px] text-slate-400 pl-2">Leave blank to auto-generate from the title.</p>
            </div>

            <div className="space-y-2 relative">
                <div className="flex items-center justify-between pl-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Story Content</label>
                    <button 
                        onClick={handleFormatFAQs}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 px-2 py-1 rounded transition-colors"
                        title="Auto-format FAQs"
                    >
                        <Wand2 size={12} />
                        Format FAQs
                    </button>
                </div>
                <div className="rich-text-editor relative">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        forwardedRef={editorRef}
                        placeholder="Start writing your property news, area guides, or lifestyle tips here..."
                    />

                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
