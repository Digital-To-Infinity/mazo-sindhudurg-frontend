'use client';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// ── Register Custom Formats ──
if (typeof window !== 'undefined' && ReactQuill.Quill) {
    const Quill = ReactQuill.Quill;
    const Font = Quill.import('formats/font') as any;
    Font.whitelist = ['sans-serif', 'serif', 'monospace', 'inter', 'roboto', 'georgia', 'poppins', 'montserrat', 'lato', 'oswald'];
    Quill.register(Font, true);

    const Size = Quill.import('attributors/style/size') as any;
    Size.whitelist = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'];
    Quill.register(Size, true);

    const BaseImageFormat = Quill.import('formats/image') as any;
    class CustomImage extends BaseImageFormat {
        static create(value: any) {
            const node = super.create(value);
            if (typeof value === 'object') {
                node.setAttribute('src', value.src || '');
                if (value.alt) node.setAttribute('alt', value.alt);
                if (value.title) node.setAttribute('title', value.title);
            }
            return node;
        }
        
        static formats(domNode: any) {
            return {
                alt: domNode.getAttribute('alt') || '',
                title: domNode.getAttribute('title') || ''
            };
        }
        
        format(name: string, value: any) {
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
}

export default function QuillEditor({ value, onChange, modules, editorRef, placeholder }: any) {
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            ref={editorRef}
            placeholder={placeholder}
        />
    );
}
