"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Hotel,
  Upload,
  Trash2,
  Pencil,
  X,
  CheckCircle,
  Loader2,
  ImagePlus,
  Search,
  Eye,
  LayoutGrid,
  List,
  Copy,
  Calendar,
  Maximize2,
  BookMarked,
  Stamp,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface MediaItem {
  id: string;
  secure_url: string;
  alt_text: string | null;
  title: string | null;
  caption: string | null;
  description: string | null;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number | null;
  original_filename: string | null;
  created_at: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ── Design tokens — "The Registry" ──
// A hotel back-office should feel like a well-kept ledger: deep bottle-green
// ink, brass foil rules, warm parchment paper. No navy, no terracotta.
const INK = "#16302B"; // deep bottle-green ink — primary dark surface
const INK_DEEP = "#0E1F1B"; // darkest ink, for depth/gradients
const INK_LIGHT = "#20443B"; // lighter ink, for gradient stops
const BRASS = "#C6A063"; // foil accent — buttons, rules, seals
const BRASS_DIM = "#8C6E3E"; // recessed brass, for text-on-light
const CLAY = "#A3492F"; // warm rust — destructive actions only
const PARCHMENT = "#F5EFE3"; // page background
const PAPER = "#FFFDF8"; // card surface
const INK_TEXT = "#20261F"; // body text on paper
const MUTED = "#7C7364"; // warm muted text, never cool grey

function formatBytes(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HotelsClient() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Create
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    alt_text: "",
    caption: "",
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    alt_text: "",
    caption: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  // View
  const [viewItem, setViewItem] = useState<MediaItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Fetch ──
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/media?folder=hotels`, {
        credentials: "include",
      });
      const data = await res.json();
      setImages(data.data || []);
    } catch {
      toast.error("Couldn't load images");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const filtered = images.filter((img) =>
    (img.title || img.original_filename || img.alt_text || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // ── Create ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const clearCreate = () => {
    setPreview(null);
    setSelectedFile(null);
    setCreateForm({ title: "", alt_text: "", caption: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleCreate = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const tid = toast.loading("Uploading image...");
    try {
      const fd = new FormData();
      fd.append("file", selectedFile);
      fd.append("folder", "hotels");
      if (createForm.title) fd.append("title", createForm.title);
      if (createForm.alt_text) fd.append("alt_text", createForm.alt_text);
      if (createForm.caption) fd.append("caption", createForm.caption);
      const res = await fetch(`${API}/media/upload`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Upload failed");
      const data = await res.json();
      setImages((prev) => [data.data, ...prev]);
      clearCreate();
      setShowCreateModal(false);
      toast.success("Image added to the gallery", { id: tid });
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: tid });
    } finally {
      setUploading(false);
    }
  };

  // ── Update ──
  const openEdit = (img: MediaItem) => {
    setEditItem(img);
    setEditForm({
      title: img.title || "",
      alt_text: img.alt_text || "",
      caption: img.caption || "",
      description: img.description || "",
    });
  };
  const handleUpdate = async () => {
    if (!editItem) return;
    setSaving(true);
    const tid = toast.loading("Saving changes...");
    try {
      const res = await fetch(`${API}/media/${editItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editForm),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Update failed");
      const data = await res.json();
      setImages((prev) =>
        prev.map((img) =>
          img.id === editItem.id ? { ...img, ...data.data } : img,
        ),
      );
      setEditItem(null);
      toast.success("Changes saved", { id: tid });
    } catch (err: any) {
      toast.error(err.message || "Update failed", { id: tid });
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this hotel image permanently?")) return;
    setDeletingId(id);
    const tid = toast.loading("Deleting...");
    try {
      const res = await fetch(`${API}/media/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Image deleted", { id: tid });
    } catch {
      toast.error("Delete failed", { id: tid });
    } finally {
      setDeletingId(null);
    }
  };

  const totalSize = images.reduce((acc, img) => acc + (img.bytes || 0), 0);

  return (
    <div
      className="space-y-8 pb-10"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", color: INK_TEXT }}
    >
      {/* Fonts — swap for next/font/google in production for zero layout shift */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap");
        .font-display {
          font-family: "Fraunces", serif;
          font-feature-settings: "ss01" 1;
        }
        .font-mono {
          font-family: "IBM Plex Mono", monospace;
        }
      `}</style>

      {/* ── Registry Plaque (hero) ── */}
      <div
        className="relative overflow-hidden rounded-2xl text-white"
        style={{
          background: `linear-gradient(160deg, ${INK_DEEP} 0%, ${INK} 55%, ${INK_LIGHT} 100%)`,
          boxShadow: "0 20px 45px -20px rgba(14,31,27,0.55)",
        }}
      >
        {/* Brass double-rule, like a letterhead border */}
        <div
          className="absolute top-3 left-6 right-6 h-px"
          style={{ background: `${BRASS}55` }}
        />
        <div
          className="absolute bottom-3 left-6 right-6 h-px"
          style={{ background: `${BRASS}30` }}
        />
        {/* Faint ledger rule lines texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${BRASS} 0px, ${BRASS} 1px, transparent 1px, transparent 28px)`,
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 px-8 py-9">
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: `${BRASS}80`,
                  background: "rgba(198,160,99,0.1)",
                }}
              >
                <BookMarked size={18} style={{ color: BRASS }} />
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: `${BRASS}b0` }}
                >
                  Property Media Register
                </p>
                <h1 className="font-display text-[26px] font-semibold tracking-tight leading-tight">
                  Hotels Gallery
                </h1>
              </div>
            </div>
            <p className="text-white/60 text-[13.5px] leading-relaxed">
              Every photograph a guest sees first, catalogued in one place —
              upload, caption, and keep the collection in order.
            </p>
          </div>

          {/* Stats styled as hanging brass key fobs */}
          <div className="flex gap-4">
            {[
              {
                label: "Images on file",
                value: images.length,
                icon: ImagePlus,
              },
              {
                label: "Archive size",
                value: formatBytes(totalSize),
                icon: Upload,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="relative pt-3">
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{
                    background: INK_DEEP,
                    border: `1px solid ${BRASS}90`,
                  }}
                />
                <div
                  className="min-w-[116px] text-center px-5 pt-6 pb-4"
                  style={{
                    background: "rgba(255,255,255,0.045)",
                    border: `1px solid ${BRASS}45`,
                    borderRadius: "3px 3px 16px 16px",
                  }}
                >
                  <Icon
                    size={14}
                    style={{ color: BRASS }}
                    className="mx-auto mb-2"
                  />
                  <p className="font-display text-xl font-semibold">{value}</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mt-1 text-white/45">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Front-desk toolbar ── */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-56">
          <label
            className="text-[10px] font-semibold uppercase tracking-widest block mb-1.5"
            style={{ color: BRASS_DIM }}
          >
            Registry Search
          </label>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: MUTED }}
            />
            <input
              type="text"
              placeholder="Search by title or filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm placeholder:text-[#a39c8c] focus:outline-none transition-all"
              style={{
                background: PAPER,
                border: `1px solid #E4DBC8`,
                color: INK_TEXT,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = BRASS)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E4DBC8")}
            />
          </div>
        </div>

        {/* View toggle */}
        <div
          className="flex items-center rounded-lg p-1 gap-1"
          style={{ background: PAPER, border: "1px solid #E4DBC8" }}
        >
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className="p-2 rounded-md transition-all"
            style={
              viewMode === "grid"
                ? { background: INK, color: "#fff" }
                : { color: MUTED }
            }
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className="p-2 rounded-md transition-all"
            style={
              viewMode === "list"
                ? { background: INK, color: "#fff" }
                : { color: MUTED }
            }
          >
            <List size={15} />
          </button>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all active:scale-[0.97]"
          style={{
            background: INK,
            color: "#fff",
            boxShadow: "0 10px 24px -10px rgba(22,48,43,0.55)",
          }}
        >
          <ImagePlus size={15} style={{ color: BRASS }} /> Add Image
        </button>
      </div>

      {!loading && (
        <p className="text-[13px] -mt-4" style={{ color: MUTED }}>
          Showing{" "}
          <span className="font-semibold" style={{ color: INK_TEXT }}>
            {filtered.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold" style={{ color: INK_TEXT }}>
            {images.length}
          </span>{" "}
          entries
        </p>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div
          className="flex flex-col items-center justify-center h-64 gap-4"
          style={{ color: MUTED }}
        >
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: `${BRASS}18` }}
            >
              <Hotel size={24} style={{ color: BRASS_DIM }} />
            </div>
            <Loader2
              size={16}
              className="animate-spin absolute -bottom-0.5 -right-0.5 rounded-full p-0.5"
              style={{ color: INK, background: PAPER }}
            />
          </div>
          <p className="text-sm font-semibold font-display">
            Retrieving the register...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center h-64 rounded-2xl gap-4"
          style={{ background: PAPER, border: `2px dashed #E4DBC8` }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: `${BRASS}12` }}
          >
            <Hotel size={26} style={{ color: `${BRASS_DIM}` }} />
          </div>
          <div className="text-center">
            <p
              className="font-display font-semibold text-[15px]"
              style={{ color: INK_TEXT }}
            >
              {search ? "No matching entries" : "The register is empty"}
            </p>
            <p className="text-sm mt-1" style={{ color: MUTED }}>
              {search
                ? "Try a different search term"
                : "Add your first hotel photograph to begin"}
            </p>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        /* ── Grid View — index cards ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group relative rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: PAPER,
                border: "1px solid #E9E1D2",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${BRASS}90`;
                e.currentTarget.style.boxShadow =
                  "0 18px 34px -18px rgba(22,48,43,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E9E1D2";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ background: "#EDE6D6" }}
              >
                <Image
                  src={img.secure_url}
                  alt={img.alt_text || img.title || "Hotel"}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {img.format && (
                  <span
                    className="absolute top-3 left-3 text-[9px] font-bold uppercase px-2 py-1 rounded-full font-mono tracking-wide"
                    style={{ background: "rgba(14,31,27,0.65)", color: "#fff" }}
                  >
                    {img.format}
                  </span>
                )}

                {/* Signature element — brass wax seal, appears on hover */}
                <div
                  className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${BRASS}, ${BRASS_DIM})`,
                    boxShadow:
                      "0 3px 8px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(0,0,0,0.3)",
                  }}
                  title="Catalogued"
                >
                  <Stamp size={14} className="text-[#2b2011]" />
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => setViewItem(img)}
                    className="flex items-center gap-1.5 font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg transition-all"
                    style={{ background: "rgba(255,253,248,0.96)", color: INK }}
                  >
                    <Eye size={12} /> View
                  </button>
                  <button
                    onClick={() => openEdit(img)}
                    className="flex items-center gap-1.5 text-white font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg transition-all"
                    style={{ background: INK }}
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deletingId === img.id}
                    className="flex items-center gap-1.5 text-white font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg transition-all disabled:opacity-50"
                    style={{ background: CLAY }}
                  >
                    {deletingId === img.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Trash2 size={12} />
                    )}
                  </button>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-4">
                <p
                  className="font-display font-semibold truncate text-[14.5px]"
                  style={{ color: INK_TEXT }}
                >
                  {img.title || img.original_filename || "Untitled"}
                </p>
                {img.alt_text && (
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: MUTED }}
                  >
                    {img.alt_text}
                  </p>
                )}
                <div
                  className="flex items-center gap-3 mt-3 pt-3 font-mono"
                  style={{ borderTop: "1px dashed #E4DBC8" }}
                >
                  <span
                    className="text-[10px] font-medium flex items-center gap-1"
                    style={{ color: MUTED }}
                  >
                    <Maximize2 size={10} />
                    {img.width && img.height
                      ? `${img.width}×${img.height}`
                      : "—"}
                  </span>
                  <span
                    className="w-px h-3"
                    style={{ background: "#E4DBC8" }}
                  />
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: MUTED }}
                  >
                    {formatBytes(img.bytes)}
                  </span>
                  <span
                    className="w-px h-3"
                    style={{ background: "#E4DBC8" }}
                  />
                  <span
                    className="text-[10px] font-medium flex items-center gap-1"
                    style={{ color: MUTED }}
                  >
                    <Calendar size={10} /> {formatDate(img.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── List View — ledger table ── */
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: PAPER, border: "1px solid #E9E1D2" }}
        >
          <div
            className="px-6 py-4 flex items-center gap-3"
            style={{
              background: PARCHMENT,
              borderBottom: `2px solid ${BRASS}55`,
            }}
          >
            <BookMarked size={15} style={{ color: BRASS_DIM }} />
            <p
              className="font-display font-semibold text-sm"
              style={{ color: INK_TEXT }}
            >
              Hotel Image Ledger
            </p>
            <span
              className="ml-auto text-xs font-semibold font-mono px-2.5 py-1 rounded-full"
              style={{ background: `${BRASS}22`, color: BRASS_DIM }}
            >
              {filtered.length}
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #EDE6D6" }}>
                {[
                  "Image",
                  "Title & Alt Text",
                  "Dimensions",
                  "Size",
                  "Uploaded",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: MUTED }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((img, i) => (
                <tr
                  key={img.id}
                  className="group transition-colors"
                  style={{
                    borderBottom:
                      i === filtered.length - 1 ? "none" : "1px solid #F1EBDF",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FBF7EE")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td className="px-5 py-3.5">
                    <div
                      className="relative w-14 h-10 rounded-lg overflow-hidden"
                      style={{
                        background: "#EDE6D6",
                        border: "1px solid #E9E1D2",
                      }}
                    >
                      <Image
                        src={img.secure_url}
                        alt={img.alt_text || ""}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p
                      className="font-semibold truncate max-w-[200px]"
                      style={{ color: INK_TEXT }}
                    >
                      {img.title || "—"}
                    </p>
                    <p
                      className="text-xs truncate max-w-[200px] mt-0.5"
                      style={{ color: MUTED }}
                    >
                      {img.alt_text || img.original_filename || ""}
                    </p>
                  </td>
                  <td
                    className="px-5 py-3.5 text-xs font-medium font-mono whitespace-nowrap"
                    style={{ color: MUTED }}
                  >
                    {img.width && img.height
                      ? `${img.width} × ${img.height}`
                      : "—"}
                  </td>
                  <td
                    className="px-5 py-3.5 text-xs font-medium font-mono"
                    style={{ color: MUTED }}
                  >
                    {formatBytes(img.bytes)}
                  </td>
                  <td
                    className="px-5 py-3.5 text-xs font-mono whitespace-nowrap"
                    style={{ color: MUTED }}
                  >
                    {formatDate(img.created_at)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setViewItem(img)}
                        className="p-2 rounded-lg transition-all"
                        style={{ color: MUTED }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = INK)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = MUTED)
                        }
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => openEdit(img)}
                        className="p-2 rounded-lg transition-all"
                        style={{ color: MUTED }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = INK)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = MUTED)
                        }
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        disabled={deletingId === img.id}
                        className="p-2 rounded-lg transition-all disabled:opacity-50"
                        style={{ color: MUTED }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = CLAY)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = MUTED)
                        }
                        title="Delete"
                      >
                        {deletingId === img.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ══════════════ CREATE MODAL ══════════════ */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div
            className="rounded-2xl w-full max-w-lg overflow-hidden"
            style={{
              background: PAPER,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="relative px-6 py-5 text-white"
              style={{
                background: `linear-gradient(100deg, ${INK_DEEP}, ${INK})`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center border"
                  style={{
                    background: "rgba(198,160,99,0.12)",
                    borderColor: `${BRASS}55`,
                  }}
                >
                  <ImagePlus size={16} style={{ color: BRASS }} />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-base">
                    New Register Entry
                  </h2>
                  <p className="text-white/55 text-xs">
                    Add a photograph to the Hotels gallery
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  clearCreate();
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {!preview ? (
                <label
                  htmlFor="hotel-create-input"
                  className="flex flex-col items-center justify-center w-full h-44 rounded-xl cursor-pointer transition-all"
                  style={{ border: "2px dashed #E4DBC8" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = `${BRASS}90`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#E4DBC8")
                  }
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ background: `${BRASS}15` }}
                  >
                    <Upload size={20} style={{ color: BRASS_DIM }} />
                  </div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: INK_TEXT }}
                  >
                    Click to choose an image
                  </p>
                  <p className="text-xs mt-1" style={{ color: MUTED }}>
                    PNG, JPG, WEBP · Max 10MB
                  </p>
                  <input
                    id="hotel-create-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ background: INK_DEEP, border: "1px solid #E9E1D2" }}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    onClick={clearCreate}
                    className="absolute top-3 right-3 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <X size={13} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                    <p className="text-white text-xs font-semibold truncate">
                      {selectedFile?.name}
                    </p>
                    <p className="text-white/60 text-[10px] font-mono">
                      {formatBytes(selectedFile?.size ?? null)}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {[
                  {
                    key: "title",
                    label: "Hotel Name / Title",
                    placeholder: "e.g. Grand Mazo Resort",
                  },
                  {
                    key: "alt_text",
                    label: "Alt Text",
                    placeholder: "Describe the image...",
                  },
                  {
                    key: "caption",
                    label: "Caption",
                    placeholder: "Short caption (optional)",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      className="text-[10px] font-semibold uppercase tracking-widest block mb-1"
                      style={{ color: BRASS_DIM }}
                    >
                      {f.label}
                    </label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={createForm[f.key as keyof typeof createForm]}
                      onChange={(e) =>
                        setCreateForm((p) => ({
                          ...p,
                          [f.key]: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg px-4 py-2.5 text-sm placeholder:text-[#a39c8c] focus:outline-none transition-all"
                      style={{
                        background: PARCHMENT,
                        border: "1px solid #E4DBC8",
                        color: INK_TEXT,
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = BRASS)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#E4DBC8")
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleCreate}
                disabled={!selectedFile || uploading}
                className="w-full font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white"
                style={{
                  background: `linear-gradient(100deg, ${INK_DEEP}, ${INK})`,
                  boxShadow: "0 12px 26px -10px rgba(22,48,43,0.5)",
                }}
              >
                {uploading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <CheckCircle size={17} style={{ color: BRASS }} /> Add to
                    Gallery
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ EDIT MODAL ══════════════ */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div
            className="rounded-2xl w-full max-w-lg overflow-hidden"
            style={{
              background: PAPER,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="relative px-6 py-5 text-white"
              style={{
                background: `linear-gradient(100deg, ${INK}, ${INK_DEEP})`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center border"
                  style={{
                    background: "rgba(198,160,99,0.12)",
                    borderColor: `${BRASS}55`,
                  }}
                >
                  <Pencil size={15} style={{ color: BRASS }} />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-base">
                    Edit Entry
                  </h2>
                  <p className="text-white/55 text-xs truncate max-w-xs">
                    {editItem.title || editItem.original_filename || "Untitled"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditItem(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div
                className="relative w-full h-44 rounded-xl overflow-hidden"
                style={{ background: INK_DEEP, border: "1px solid #E9E1D2" }}
              >
                <Image
                  src={editItem.secure_url}
                  alt={editItem.alt_text || "Hotel"}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: "title",
                    label: "Title",
                    placeholder: "Hotel name or title",
                    textarea: false,
                  },
                  {
                    key: "alt_text",
                    label: "Alt Text",
                    placeholder: "Describe the image",
                    textarea: false,
                  },
                  {
                    key: "caption",
                    label: "Caption",
                    placeholder: "Short caption",
                    textarea: false,
                  },
                  {
                    key: "description",
                    label: "Description",
                    placeholder: "Detailed description...",
                    textarea: true,
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      className="text-[10px] font-semibold uppercase tracking-widest block mb-1"
                      style={{ color: BRASS_DIM }}
                    >
                      {f.label}
                    </label>
                    {f.textarea ? (
                      <textarea
                        rows={3}
                        placeholder={f.placeholder}
                        value={editForm[f.key as keyof typeof editForm]}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            [f.key]: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg px-4 py-2.5 text-sm placeholder:text-[#a39c8c] focus:outline-none transition-all resize-none"
                        style={{
                          background: PARCHMENT,
                          border: "1px solid #E4DBC8",
                          color: INK_TEXT,
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = BRASS)
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = "#E4DBC8")
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={editForm[f.key as keyof typeof editForm]}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            [f.key]: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg px-4 py-2.5 text-sm placeholder:text-[#a39c8c] focus:outline-none transition-all"
                        style={{
                          background: PARCHMENT,
                          border: "1px solid #E4DBC8",
                          color: INK_TEXT,
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = BRASS)
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = "#E4DBC8")
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditItem(null)}
                  className="flex-1 font-semibold py-3 rounded-lg transition-all text-sm"
                  style={{ border: "1px solid #E4DBC8", color: MUTED }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="flex-1 font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] text-sm disabled:opacity-50 text-white"
                  style={{
                    background: `linear-gradient(100deg, ${INK_DEEP}, ${INK})`,
                    boxShadow: "0 12px 26px -10px rgba(22,48,43,0.5)",
                  }}
                >
                  {saving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={15} style={{ color: BRASS }} /> Save
                      Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ VIEW MODAL ══════════════ */}
      {viewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setViewItem(null)}
        >
          <div
            className="rounded-2xl w-full max-w-2xl overflow-hidden"
            style={{
              background: PAPER,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative px-6 py-5 text-white"
              style={{
                background: `linear-gradient(100deg, ${INK_DEEP}, ${INK})`,
              }}
            >
              <h2 className="font-display font-semibold truncate pr-10 text-[17px]">
                {viewItem.title ||
                  viewItem.original_filename ||
                  "Image Preview"}
              </h2>
              <p className="text-white/55 text-xs mt-0.5 font-mono">
                {viewItem.width && viewItem.height
                  ? `${viewItem.width} × ${viewItem.height}px`
                  : ""}{" "}
                · {formatBytes(viewItem.bytes)}
              </p>
              <button
                onClick={() => setViewItem(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div
                className="relative w-full h-72 rounded-xl overflow-hidden"
                style={{ background: INK_DEEP }}
              >
                <Image
                  src={viewItem.secure_url}
                  alt={viewItem.alt_text || ""}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Title", value: viewItem.title },
                  { label: "Alt Text", value: viewItem.alt_text },
                  { label: "Format", value: viewItem.format?.toUpperCase() },
                  { label: "Uploaded", value: formatDate(viewItem.created_at) },
                  {
                    label: "Dimensions",
                    value:
                      viewItem.width && viewItem.height
                        ? `${viewItem.width} × ${viewItem.height}px`
                        : null,
                  },
                  { label: "Caption", value: viewItem.caption },
                ].map((row) =>
                  row.value ? (
                    <div
                      key={row.label}
                      className="rounded-lg px-4 py-3"
                      style={{
                        background: PARCHMENT,
                        border: "1px solid #E9E1D2",
                      }}
                    >
                      <p
                        className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                        style={{ color: MUTED }}
                      >
                        {row.label}
                      </p>
                      <p
                        className="font-semibold text-xs truncate font-mono"
                        style={{ color: INK_TEXT }}
                      >
                        {row.value}
                      </p>
                    </div>
                  ) : null,
                )}
              </div>

              <div
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{ background: PARCHMENT, border: "1px solid #E4DBC8" }}
              >
                <p
                  className="text-xs truncate flex-1 font-mono"
                  style={{ color: MUTED }}
                >
                  {viewItem.secure_url}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(viewItem.secure_url);
                    toast.success("URL copied");
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition-colors"
                  style={{ color: BRASS_DIM }}
                >
                  <Copy size={12} /> Copy URL
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setViewItem(null);
                    openEdit(viewItem);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 font-semibold py-2.5 rounded-lg transition-all text-sm text-white"
                  style={{
                    background: INK,
                    boxShadow: "0 8px 20px -8px rgba(22,48,43,0.5)",
                  }}
                >
                  <Pencil size={14} /> Edit Image
                </button>
                <button
                  onClick={() => {
                    setViewItem(null);
                    handleDelete(viewItem.id);
                  }}
                  className="flex items-center justify-center gap-2 font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
                  style={{ border: `1px solid ${CLAY}55`, color: CLAY }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
