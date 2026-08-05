// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  MoreVertical,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Share2,
  Copy,
  Archive,
  Star,
  ArrowUp,
  ArrowDown,
  Calendar,
  SlidersHorizontal,
  Filter,
  ExternalLink,
  MapPin,
  Globe,
  Layers
} from 'lucide-react';
import { api } from '@/services/api';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const PagesManagement = () => {
  const [CLIENT_URL, setCLIENT_URL] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCLIENT_URL(window.location.origin);
    setMounted(true);
  }, []);

  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('down');
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hoverTimeoutRef = useRef<any>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);
  const perPageRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [pageInput, setPageInput] = useState('1');

  // Sort State
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Status Filter State
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const statusFilterRef = useRef<HTMLDivElement>(null);

  const statusOptions = ['Draft', 'Published', 'Archived'];

  // Quick Edit State
  const [quickEditId, setQuickEditId] = useState<number | null>(null);
  const [quickEditData, setQuickEditData] = useState<any>(null);
  const [isQuickSaving, setIsQuickSaving] = useState(false);

  // Delete modal state
  const [pageToDelete, setPageToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [duplicatingId, setDuplicatingId] = useState<number | null>(null);

  const slugify = (str: string) => str.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

  const handleQuickEditInit = (page: any) => {
    setQuickEditId(page.id);
    setQuickEditData({
      title: page.title || '',
      slug: page.slug || '',
      status: page.status ? page.status.charAt(0).toUpperCase() + page.status.slice(1).toLowerCase() : 'Draft',
      excerpt: page.excerpt || '',
      date: page.created_at ? new Date(page.created_at).toISOString().split('T')[0] : ''
    });
  };

  const handleQuickEditSave = async () => {
    if (!quickEditData.title?.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!quickEditData.slug?.trim()) {
      toast.error('Slug is required');
      return;
    }

    setIsQuickSaving(true);
    try {
      const payload = {
        title: quickEditData.title.trim(),
        slug: quickEditData.slug.trim(),
        status: quickEditData.status ? quickEditData.status.toLowerCase() : 'draft',
        excerpt: quickEditData.excerpt?.trim() || undefined,
        published_at: quickEditData.date ? new Date(quickEditData.date).toISOString() : null
      };

      const response = await api.put(`/content/${quickEditId}`, payload) as any;
      if (response.data || response.success) {
        toast.success('Page quick updated successfully!');
        setQuickEditId(null);
        fetchPages();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update page');
    } finally {
      setIsQuickSaving(false);
    }
  };

  const handleQuickEditCancel = () => {
    setQuickEditId(null);
    setQuickEditData(null);
  };

  useEffect(() => {
    fetchPages();
  }, [activeTab, searchTerm, currentPage, itemsPerPage, sortBy, sortOrder, selectedStatuses]);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const params: any = {
        type: 'PAGE',
        q: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
      };

      if (selectedStatuses.length > 0) {
        params.status = selectedStatuses.map(s => s.toLowerCase()).join(',');
      } else if (activeTab !== 'all') {
        params.status = activeTab.toLowerCase();
      }

      const response = await api.get('/content', { params }) as any;
      if (response.data || response.items) {
        let fetchedPages = response.data?.items || response.items || response.data || [];

        fetchedPages.sort((a: any, b: any) => {
          let valA = sortBy === 'updatedAt' ? (a.updated_at || a.updatedAt) : (a.created_at || a.createdAt);
          let valB = sortBy === 'updatedAt' ? (b.updated_at || b.updatedAt) : (b.created_at || b.createdAt);
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
          return sortOrder === 'desc' ? valB - valA : valA - valB;
        });

        setPages(fetchedPages);
        setTotalItems(response.data?.total || fetchedPages.length);
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setOpenDropdownId(null);
    };
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
      if (perPageRef.current && !perPageRef.current.contains(event.target as Node)) {
        setShowPerPageDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setShowStatusFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setPageInput('1');
  }, [searchTerm, activeTab, selectedStatuses]);

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const handleMouseEnter = (e: any, page: any) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    const rect = e.currentTarget.getBoundingClientRect();
    const availableSpaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 350;
    const side = (availableSpaceBelow < dropdownHeight && rect.top > dropdownHeight) ? 'up' : 'down';

    setDropdownPosition(side);
    setDropdownCoords({
      top: side === 'up' ? rect.top + window.scrollY : rect.bottom + window.scrollY,
      left: rect.right + window.scrollX
    });
    setOpenDropdownId(page.id);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdownId(null);
    }, 150);
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const response = await api.put(`/content/${id}`, { status: newStatus.toLowerCase() }) as any;
      if (response.data || response.success) {
        setPages(prev => prev.map(p => p.id === id ? { ...p, status: newStatus.toLowerCase() } : p));
        toast.success(`Page status updated to ${newStatus}`);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
    setOpenDropdownId(null);
  };

  const handleShare = (page: any) => {
    const slugOrId = page.slug || page.id;
    const pageLink = `${CLIENT_URL}/destinations/${slugOrId}`;
    navigator.clipboard.writeText(pageLink).then(() => {
      toast.success('Page link copied to clipboard!');
    });
    setOpenDropdownId(null);
  };

  const handleDuplicate = async (page: any) => {
    setDuplicatingId(page.id);
    try {
      const fullPageRes = await api.get(`/content/${page.id}`) as any;
      const fullPage = fullPageRes.data || fullPageRes;

      const newTitle = `${page.title} (Copy)`;
      const baseSlug = slugify(newTitle);
      let uniqueSlug = baseSlug;
      let counter = 1;
      const existingSlugs = new Set(pages.map((p: any) => p.slug));
      while (existingSlugs.has(uniqueSlug)) {
        counter++;
        uniqueSlug = `${baseSlug}-${counter}`;
      }

      const payload = {
        title: newTitle,
        slug: uniqueSlug,
        content_type: 'page',
        excerpt: fullPage.excerpt || undefined,
        content_html: fullPage.content_html || undefined,
        status: 'draft',
        hero_media_id: fullPage.hero_media_id ? Number(fullPage.hero_media_id) : undefined,
      };

      const response = await api.post(`/content`, payload) as any;
      if (response.data || response.success) {
        toast.success('Page duplicated successfully!');
        fetchPages();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to duplicate page');
    } finally {
      setDuplicatingId(null);
      setOpenDropdownId(null);
    }
  };

  const handleDelete = (page: any) => {
    setPageToDelete(page);
    setOpenDropdownId(null);
  };

  const handleConfirmDelete = async () => {
    if (!pageToDelete) return;
    setIsDeleting(true);
    try {
      const response = await api.delete(`/content/${pageToDelete.id}`) as any;
      if (response.data || response.success) {
        toast.success('Page deleted successfully!');
        setPageToDelete(null);
        fetchPages();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete page');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStatusFilter = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else {
      setPageInput(String(currentPage));
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedPageObj = pages.find(p => p.id === openDropdownId);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100"><CheckCircle size={12} className="mr-1" /> Published</span>;
      case 'draft':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100"><Clock size={12} className="mr-1" /> Draft</span>;
      case 'archived':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100"><Archive size={12} className="mr-1" /> Archived</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-100"><Archive size={12} className="mr-1" /> {status}</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-8 p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-3rem)] bg-gradient-to-br from-teal-50/90 via-emerald-50/80 to-blue-100/90 rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.02),inset_0_0_0_1px_rgba(255,255,255,0.5)] m-4 lg:m-6 overflow-hidden"
    >
      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col min-[427px]:flex-row min-[427px]:items-center justify-between gap-4">
          <div>
            <motion.h1 layoutId="pages-title" className="text-2xl max-[426px]:text-3xl max-[426px]:mb-4 font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-900 to-slate-700">
              Pages Management
            </motion.h1>
            <p className="text-slate-500 font-medium hidden sm:block mt-1">Manage destination landing pages, custom static pages, and site content.</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/admin/add-blog"
              className="flex items-center justify-center space-x-2 w-full min-[427px]:w-auto cursor-pointer whitespace-nowrap bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all"
            >
              <Plus size={20} strokeWidth={2.5} />
              <span>Create New Page</span>
            </Link>
          </motion.div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center bg-slate-100/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/40 shadow-inner w-full lg:w-fit overflow-x-auto shrink-0 relative">
            {['all', 'published', 'draft', 'archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedStatuses([]);
                }}
                className={`
                  relative flex-1 lg:flex-none px-6 lg:px-8 py-2 rounded-xl text-sm font-bold capitalize transition-colors duration-300 cursor-pointer whitespace-nowrap z-10
                  ${activeTab === tab
                    ? 'text-primary'
                    : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activePageTabIndicator"
                    className="absolute inset-0 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-200/50 -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:justify-end min-w-0">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:max-w-xs min-w-0">
              <div className="relative flex items-center w-full h-full">
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${(searchTerm || isFocused) ? 'text-primary' : 'text-slate-500'}`}
                  size={18}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search pages..."
                  className="w-full bg-white border border-slate-200 rounded-xl shadow-sm py-2.5 pl-11 pr-10 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-slate-400 truncate"
                />
                <AnimatePresence>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-visible">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100/80 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Page Title & Path</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Last Modified</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 relative">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-lg mb-4"></div>
                        <p className="text-slate-500 font-bold tracking-wide animate-pulse">Loading pages...</p>
                      </div>
                    </td>
                  </tr>
                ) : pages.length > 0 ? (
                  pages.map((page, index) => (
                    <Fragment key={page.id}>
                      <tr className={`transition-all duration-300 group ${quickEditId === page.id ? 'bg-primary/[0.03]' : 'hover:bg-slate-50/80 hover:shadow-sm'}`}>
                        <td className="px-6 py-5 text-center">
                          <span className="text-sm font-black text-slate-300">{startIndex + index + 1}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0 border border-teal-100/60">
                              <Layers size={22} />
                            </div>
                            <div>
                              <p className="text-[15px] font-bold text-slate-900 truncate max-w-[320px] group-hover:text-primary transition-colors">{page.title}</p>
                              <p className="text-xs font-mono text-slate-400 mt-0.5">/destinations/{page.slug}</p>
                              {/* Quick Action Links */}
                              <div className="mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                                <Link href={`/admin/content/edit/${page.id}`} className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Edit</Link>
                                <span className="text-slate-300 text-[10px]">•</span>
                                <button onClick={() => window.open(`${CLIENT_URL}/destinations/${page.slug}`, '_blank')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer">Preview</button>
                                <span className="text-slate-300 text-[10px]">•</span>
                                <button onClick={() => handleQuickEditInit(page)} className="text-xs font-bold text-slate-600 hover:text-black transition-colors cursor-pointer">Quick Edit</button>
                                <span className="text-slate-300 text-[10px]">•</span>
                                <button onClick={() => handleDuplicate(page)} disabled={duplicatingId === page.id} className="text-xs font-bold text-slate-600 hover:text-black transition-colors cursor-pointer">
                                  {duplicatingId === page.id ? 'Duplicating...' : 'Duplicate'}
                                </button>
                                <span className="text-slate-300 text-[10px]">•</span>
                                <button onClick={() => handleDelete(page)} className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer">Delete</button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {getStatusBadge(page.status)}
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm text-slate-700 font-medium">{formatDate(page.updated_at || page.created_at)}</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/admin/content/edit/${page.id}`}
                              className="p-2 text-slate-500 hover:text-slate-800 transition-colors hover:bg-slate-100 rounded-lg cursor-pointer inline-flex"
                              title="Edit Page"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(page)}
                              className="p-2 text-slate-500 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Page"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Quick Edit Inline Row */}
                      {quickEditId === page.id && (
                        <tr className="bg-primary/5 border-b border-primary/10">
                          <td colSpan={5} className="px-6 py-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Edit Page</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Page Title</label>
                                  <input
                                    type="text"
                                    value={quickEditData.title}
                                    onChange={(e) => setQuickEditData({...quickEditData, title: e.target.value})}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Slug</label>
                                  <input
                                    type="text"
                                    value={quickEditData.slug}
                                    onChange={(e) => setQuickEditData({...quickEditData, slug: e.target.value})}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                                  <select
                                    value={quickEditData.status}
                                    onChange={(e) => setQuickEditData({...quickEditData, status: e.target.value})}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                                  >
                                    {statusOptions.map(opt => (
                                      <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                                <button
                                  onClick={handleQuickEditCancel}
                                  disabled={isQuickSaving}
                                  className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleQuickEditSave}
                                  disabled={isQuickSaving}
                                  className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm"
                                >
                                  {isQuickSaving ? 'Updating...' : 'Update Page'}
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                      No pages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {pageToDelete && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">Delete Page?</h3>
                <p className="text-xs text-slate-400 font-medium">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900 font-black">"{pageToDelete.title}"</strong>?
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={isDeleting}
                onClick={() => setPageToDelete(null)}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4 py-3 rounded-2xl border border-slate-200/60"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-3 rounded-2xl shadow-lg shadow-red-600/20"
              >
                {isDeleting ? 'Deleting...' : 'Delete Page'}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PagesManagement;
