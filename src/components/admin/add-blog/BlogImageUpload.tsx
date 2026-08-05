// @ts-nocheck
'use client';
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { ImagePlus, X, Camera, Sparkles, AlertCircle, GripVertical, Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "react-hot-toast";

const BlogImageUpload = ({ images, onChange }: any) => {
    const [previews, setPreviews] = useState<any[]>(images || []);
    const [isUploading, setIsUploading] = useState(false);

    // Sync state with parent if it changes externally
    useEffect(() => {
        if (images && JSON.stringify(images) !== JSON.stringify(previews)) {
            setPreviews(images);
        }
    }, [images]);

    const handleFileChange = async (e: any) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);
        const uploadedImages: any[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i] as File;
                const formData = new FormData();
                formData.append('file', file);
                formData.append('alt_text', file.name);

                const response: any = await api.post('/media/upload', formData);
                const media = response.data || response;

                // Response should have the uploaded asset details
                if (media && (media.id || media.asset_id)) {
                    uploadedImages.push({
                        id: media.id,
                        url: media.secure_url || media.url,
                        file: null // clear file reference so it's not confused with local blobs
                    });
                }
            }

            if (uploadedImages.length > 0) {
                const updated = [...previews, ...uploadedImages];
                setPreviews(updated);
                onChange(updated);
                toast.success('Images uploaded successfully');
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error("Failed to upload some images");
        } finally {
            setIsUploading(false);
            // reset file input
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        const updated = previews.filter((_: unknown, i: number) => i !== index);
        setPreviews(updated);
        onChange(updated);
    };

    const setAsThumbnail = (index: number) => {
        const updated = previews.map((img: any, i: number) => ({
            ...img,
            type: i === index ? 'thumbnail' : (img.type === 'thumbnail' ? undefined : img.type),
        }));
        setPreviews(updated);
        onChange(updated);
    };

    const handleReorder = (newOrder: any[]) => {
        setPreviews(newOrder);
        onChange(newOrder);
    };

    const updateAltText = (index: number, altText: string) => {
        const updated = previews.map((img: any, i: number) =>
            i === index ? { ...img, altText } : img
        );
        setPreviews(updated);
        onChange(updated);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm"
        >
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">
                Featured Media
            </h4>

            <div className="space-y-4">
                {/* Upload Zone */}
                <div className="relative group">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 transition-all">
                        <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400 group-hover:scale-110 group-hover:bg-white group-hover:text-brand-primary transition-all shadow-sm">
                            {isUploading ? <Loader2 className="w-6 h-6 animate-spin text-brand-primary" /> : <ImagePlus className="w-6 h-6" />}
                        </div>
                        <h3 className="text-zinc-700 font-bold text-sm mb-1">{isUploading ? 'Uploading...' : 'Upload Article Photos'}</h3>
                        <p className="text-zinc-500 text-xs font-medium max-w-xs mx-auto">
                            Add a striking cover image. Supported: JPG, PNG, WEBP.
                        </p>
                    </div>
                </div>

                {/* Previews with Reorder */}
                {previews.length > 0 && (
                    <Reorder.Group 
                        axis="y" 
                        values={previews} 
                        onReorder={handleReorder}
                        className="grid grid-cols-2 gap-3"
                    >
                        <AnimatePresence>
                            {previews.map((img, index) => {
                                const src = typeof img === 'string' ? img : (img.url || img.preview);
                                const key = typeof img === 'string' ? img : (img.file?.name + index);
                                return (
                                    <Reorder.Item
                                        key={key}
                                        value={img}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="aspect-video relative rounded-2xl overflow-hidden group shadow-sm bg-zinc-100 cursor-grab active:cursor-grabbing"
                                    >
                                        <img 
                                            src={src} 
                                            alt={`Blog photo ${index + 1}`} 
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    
                                    {/* Action Buttons overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center pointer-events-none">
                                            <GripVertical className="w-5 h-5" />
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setAsThumbnail(index);
                                            }}
                                            className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                                            title="Set as Thumbnail"
                                        >
                                            <Camera className="w-5 h-5" />
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Cover Badge */}
                                    {index === 0 && (
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-brand-primary text-white text-[9px] font-black uppercase rounded-lg shadow-sm flex items-center gap-1 z-20">
                                            <Sparkles className="w-3 h-3" /> Blog Cover
                                        </div>
                                    )}

                                    {/* Thumbnail Badge */}
                                    {img.type === 'thumbnail' && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white text-[9px] font-black uppercase rounded-lg shadow-sm flex items-center gap-1 z-20">
                                            <Camera className="w-3 h-3" /> Thumbnail
                                        </div>
                                    )}

                                    {/* Position Indicator */}
                                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </div>

                                    {/* Alt Text Input */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <input
                                            type="text"
                                            value={typeof img === 'string' ? '' : (img.altText || '')}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                updateAltText(index, e.target.value);
                                            }}
                                            onPointerDown={(e) => e.stopPropagation()}
                                            placeholder="Alt text..."
                                            className="w-full px-2 py-1 text-[10px] bg-white/90 rounded text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                        />
                                    </div>
                                </Reorder.Item>
                            );
                        })}
                        </AnimatePresence>
                    </Reorder.Group>
                )}

                {/* Tip */}
                <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100 items-start">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                        <span className="text-zinc-500 font-bold block italic"> TIP: Drag and drop to reorder. The first photo will be your article's Featured Cover.</span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogImageUpload;


