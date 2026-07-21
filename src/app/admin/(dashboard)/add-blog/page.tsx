"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import BlogEditor from "@/components/admin/add-blog/BlogEditor";
import BlogHeader from "@/components/admin/add-blog/BlogHeader";
import BlogActions from "@/components/admin/add-blog/BlogActions";
import PublishingSettings from "@/components/admin/add-blog/PublishingSettings";
import AuthorDetails from "@/components/admin/add-blog/AuthorDetails";
import BlogImageUpload from "@/components/admin/add-blog/BlogImageUpload";
import SEOTags from "@/components/admin/add-blog/SEOTags";
import { api } from "@/services/api";

export default function AddBlogPage() {
  const router = useRouter();

  // Basic Details
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  
  // Editor & Media
  const [activeImage, setActiveImage] = useState(null);
  const [images, setImages] = useState<any[]>([]);
  const editorRef = useRef(null);

  // Publishing Settings
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [featured, setFeatured] = useState(false);
  const categoryOptions = ["Real Estate", "Lifestyle", "Tips & Tricks", "Market Updates", "Other"];

  // Author
  const [author, setAuthor] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [readTime, setReadTime] = useState("");

  // SEO Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Layout & Status
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleCancel = () => router.push("/admin/content");

  const handleAddCategory = () => {
    if (customCategory.trim()) {
      setCategory(customCategory.trim());
      setCustomCategory("");
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const hasUnsavedChanges = Boolean(title || content || images.length > 0);
  const isFormValid = Boolean(title.trim() && content.trim() && category);
  const isDraftValid = Boolean(title.trim());

  const handleSave = async (saveStatus: string) => {
    try {
      setIsSaving(true);
      
      const payload = {
        title,
        slug: slug || undefined, // backend will auto-generate if missing
        type: "BLOG",
        status: saveStatus === "Published" ? "PUBLISHED" : "DRAFT",
        // Extract plain text for excerpt
        excerpt: content.replace(/<[^>]+>/g, '').substring(0, 200),
        // Storing complex properties inside the JSON body field
        body: {
          html: content,
          category,
          featured,
          author,
          authorRole,
          readTime,
          tags
        },
        // We'd upload images to Cloudinary here first, but for now just pass a placeholder if images exist
        heroImage: images.length > 0 ? (images[0].preview || images[0]) : undefined,
      };

      await api.post("/content", payload);
      
      toast.success(saveStatus === "Published" ? "Blog published successfully!" : "Draft saved!");
      router.push("/admin/content");
    } catch (error: any) {
      toast.error(error.message || "Failed to save blog");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeader
          id={null} // Null because we are adding a new blog, not editing
          onCancel={handleCancel}
          handleSave={handleSave}
          isFormValid={isFormValid}
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
          status={status}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:max-w-[70%]" : "lg:max-w-4xl lg:mx-auto"}`}>
            <BlogEditor
              title={title}
              handleTitleChange={handleTitleChange}
              slug={slug}
              setSlug={setSlug}
              content={content}
              setContent={setContent}
              modules={modules}
              editorRef={editorRef}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
            />

            <div className="mt-6">
              <BlogImageUpload images={images} onChange={setImages} />
            </div>
          </div>

          {isSidebarOpen && (
            <div className="w-full lg:w-[30%] space-y-6">
              <BlogActions
                handleSave={handleSave}
                isFormValid={isFormValid}
                isDraftValid={isDraftValid}
                isSaving={isSaving}
                id={null}
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
              
              <AuthorDetails
                author={author}
                setAuthor={setAuthor}
                authorRole={authorRole}
                setAuthorRole={setAuthorRole}
                readTime={readTime}
                setReadTime={setReadTime}
              />
              
              <SEOTags
                tags={tags}
                tagInput={tagInput}
                setTagInput={setTagInput}
                handleAddTag={handleAddTag}
                removeTag={removeTag}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
