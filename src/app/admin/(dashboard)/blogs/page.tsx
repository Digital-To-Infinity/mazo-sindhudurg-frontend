'use client';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
const NavLink = Link;
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
  ExternalLink
} from 'lucide-react';
import { api } from '@/services/api';

// blogsData removed to use real API data

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const BlogManagement = () => {
  const CLIENT_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://navimumbaipropertydeals.com';

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('down');
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);
  const perPageRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFocused, setIsFocused] = useState(false);
  const [pageInput, setPageInput] = useState('1');

  // Sort State
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef(null);

  // Column Filter State
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const statusFilterRef = useRef(null);

  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const categoryFilterRef = useRef(null);

  const statusOptions = ['Draft', 'Published', 'Archived'];

  // Quick Edit State
  const [quickEditId, setQuickEditId] = useState(null);
  const [quickEditData, setQuickEditData] = useState(null);

  const handleQuickEditInit = (blog) => {
    setQuickEditId(blog.id);
    setQuickEditData({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || '',
      status: blog.status || 'Draft',
      date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : '',
      author_name: blog.author_name || blog.author || '',
      tags: blog.tags ? (Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags) : '',
      allowComments: true
    });
  };

  const handleQuickEditSave = async () => {
    try {
      const payload = {
        title: quickEditData.title,
        slug: quickEditData.slug,
        category: quickEditData.category,
        status: quickEditData.status,
        date: quickEditData.date,
        author_name: quickEditData.author_name,
        tags: quickEditData.tags ? quickEditData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      };
      
      const response = await api.put(`/admin/blogs/${quickEditId}`, payload);
      if (response?.success) {
        toast.success('Article quick updated successfully!');
        setQuickEditId(null);
        fetchBlogs();
      }
    } catch (error) {
      toast.error('Failed to quick update article');
    }
  };

  const handleQuickEditCancel = () => {
    setQuickEditId(null);
    setQuickEditData(null);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch available categories and authors on mount
  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);

  const fetchCategories = async () => {
    try {
      // Use the public /blogs/categories endpoint that reads from blog_categories table
      const response = await api.get('/blogs/categories');
      if (response && Array.isArray(response)) {
        const cats = response.map(c => c.name).filter(Boolean).sort();
        setAvailableCategories(cats);
      } else if (response?.data && Array.isArray(response.data)) {
        const cats = response.data.map(c => c.name).filter(Boolean).sort();
        setAvailableCategories(cats);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Fallback: extract from existing blog data
      try {
        const fallback = await api.get('/admin/blogs', { params: { limit: 500, page: 1 } });
        if (fallback.data?.data) {
          const cats = [...new Set(fallback.data.data.map(b => b.category).filter(Boolean))].sort();
          setAvailableCategories(cats);
        }
      } catch (e) {
        console.error('Fallback category fetch also failed:', e);
      }
    }
  };

  const fetchAuthors = async () => {
    try {
      // Attempt 1: Admin endpoint (includes Drafts)
      const response = await api.get('/admin/blogs', { params: { limit: 500, page: 1 } });
      if (response && response.data) {
        const authors = [...new Set(response.data.map(b => (b.author_name || b.author || '').trim()).filter(Boolean))].sort();
        setAvailableAuthors(authors);
        return;
      }
    } catch (error) {
      console.error('Admin fetch authors failed, trying public endpoint:', error);
    }

    try {
      // Attempt 2: Public endpoint fallback
      const response = await api.get('/blogs', { params: { limit: 500 } });
      const data = response.data || response.blogs || response;
      if (Array.isArray(data)) {
        const authors = [...new Set(data.map(b => (b.author_name || b.author || '').trim()).filter(Boolean))].sort();
        setAvailableAuthors(authors);
      }
    } catch (error) {
      console.error('Public fetch authors failed:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [activeTab, searchTerm, currentPage, itemsPerPage, sortBy, sortOrder, selectedStatuses, selectedCategories]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
        sortBy: sortBy,
        sortOrder: sortOrder
      };

      // If column-level status filters are selected, use them; otherwise use the tab filter
      if (selectedStatuses.length > 0) {
        // Send comma-separated statuses for multi-select
        params.status = selectedStatuses.join(',');
      } else if (activeTab !== 'all') {
        params.status = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
      }

      if (selectedCategories.length > 0) {
        params.category = selectedCategories.join(',');
      }
      
      const response = await api.get('/admin/blogs', { params });
      if (response) {
        setBlogs(response.data);
        setTotalItems(response.total);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load articles');
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
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
      if (perPageRef.current && !perPageRef.current.contains(event.target)) {
        setShowPerPageDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target)) {
        setShowStatusFilter(false);
      }
      if (categoryFilterRef.current && !categoryFilterRef.current.contains(event.target)) {
        setShowCategoryFilter(false);
        setCategorySearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset to first page when filtering or searching
  useEffect(() => {
    setCurrentPage(1);
    setPageInput('1');
  }, [searchTerm, activeTab, selectedStatuses, selectedCategories]);

  // Sync page input with current page
  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const handleMouseEnter = (e, blog) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const availableSpaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 400; 
    const side = (availableSpaceBelow < dropdownHeight && rect.top > dropdownHeight) ? 'up' : 'down';
    
    setDropdownPosition(side);
    setDropdownCoords({
      top: side === 'up' ? rect.top + window.scrollY : rect.bottom + window.scrollY,
      left: rect.right + window.scrollX
    });
    setOpenDropdownId(blog.id);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdownId(null);
    }, 150);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await api.patch(`/admin/blogs/${id}/status`, { status: newStatus });
      if (response?.success) {
        setBlogs(prev => prev.map(blog =>
          blog.id === id ? { ...blog, status: newStatus } : blog
        ));
        toast.success(`Article status updated to ${newStatus}`);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
    setOpenDropdownId(null);
  };

  const handleToggleFeatured = async (id) => {
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    try {
      const newState = !blog.featured;
      const response = await api.patch(`/admin/blogs/${id}/featured`, { featured: newState });
      if (response?.success) {
        setBlogs(prev => prev.map(b => b.id === id ? { ...b, featured: newState } : b));
        toast.success(newState ? 'Marked as Featured' : 'Removed from Featured');
      }
    } catch (error) {
      toast.error('Failed to update featured status');
    }
    setOpenDropdownId(null);
  };

  const handleShare = (blog) => {
    const slugOrId = blog.slug || blog.id;
    const blogLink = `${CLIENT_URL}/blogs/${slugOrId}`;
    navigator.clipboard.writeText(blogLink).then(() => {
      toast.success('Blog link copied to clipboard!');
    });
    setOpenDropdownId(null);
  };

  const handleDuplicate = async (blog) => {
    try {
      const response = await api.post(`/admin/blogs/${blog.id}/duplicate`);
      if (response?.success) {
        toast.success('Article duplicated successfully!');
        fetchBlogs();
      }
    } catch (error) {
      toast.error('Failed to duplicate article');
    }
    setOpenDropdownId(null);
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-4 p-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
            <Trash2 size={20} />
          </div>
          <div>
            <p className="font-bold text-slate-900">Confirm Delete Blog Article?</p>
            <p className="text-xs text-slate-500 mt-0.5">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={async () => {
              try {
                const response = await api.delete(`/admin/blogs/${id}`);
                if (response?.success) {
                  toast.dismiss(t.id);
                  toast.success('Article deleted successfully!');
                  fetchBlogs();
                }
              } catch (error) {
                toast.error('Failed to delete article');
              }
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[12px] font-black px-4 py-3 rounded-full transition-all cursor-pointer active:scale-95 uppercase tracking-wider"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-black px-4 py-3 rounded-full transition-all cursor-pointer active:scale-95 uppercase tracking-wider"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
      style: {
        minWidth: '300px',
        padding: '16px',
        borderRadius: '24px',
        background: '#fff',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      },
    });
  };

  // Status filter toggle
  const toggleStatusFilter = (status) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearStatusFilter = () => {
    setSelectedStatuses([]);
    setShowStatusFilter(false);
  };

  // Category filter toggle
  const toggleCategoryFilter = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearCategoryFilter = () => {
    setSelectedCategories([]);
    setShowCategoryFilter(false);
  };

  const filteredCategories = availableCategories.filter(cat =>
    cat.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  // Page input handler
  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setPageInput(String(currentPage));
    }
  };

  const currentItems = blogs;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // currentItems logic moved to fetchBlogs via API pagination

  const selectedBlog = currentItems.find(b => b.id === openDropdownId);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return <span className="ag-badge ag-badge-published"><CheckCircle size={12} className="mr-1" /> Published</span>;
      case 'draft':
        return <span className="ag-badge ag-badge-draft"><Clock size={12} className="mr-1" /> Draft</span>;
      case 'archived':
        return <span className="ag-badge bg-red-50 text-red-700 border-red-100"><Archive size={12} className="mr-1" /> Archived</span>;
      default:
        return <span className="ag-badge bg-slate-50 text-slate-700 border-slate-100"><Archive size={12} className="mr-1" /> {status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col min-[427px]:flex-row min-[427px]:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl max-[426px]:text-3xl max-[426px]:mb-4 max-[426px]:text-center font-bold text-slate-900">Blog Management</h1>
          <p className="text-slate-500 hidden sm:block">Create and manage content for your property platform.</p>
        </div>
        <NavLink
          href="/admin/blogs/add"
          className="ag-button flex items-center justify-center space-x-2 w-full min-[427px]:w-auto cursor-pointer whitespace-nowrap"
        >
          <Plus size={20} />
          <span>Write New Post</span>
        </NavLink>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col nav:flex-row nav:items-center justify-between gap-6">
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-100 w-full nav:w-fit overflow-x-auto no-scrollbar shrink-0">
          {['all', 'published', 'draft', 'archived'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedStatuses([]);
              }}
              className={`
                flex-1 nav:flex-none px-4 nav:px-10 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all cursor-pointer whitespace-nowrap
                ${activeTab === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-500 hover:text-black hover:bg-slate-50'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full nav:w-auto">
          {/* Sort Filter */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className={`flex items-center space-x-2 px-4 py-2.5 bg-white border rounded-2xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                showSortDropdown ? 'border-primary text-primary bg-primary/5' : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">{sortBy === 'date' ? 'Published' : 'Modified'}</span>
              {sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
            </button>

            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-slate-50">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sort By</p>
                  </div>
                  {[
                    { value: 'date', label: 'Published Date', icon: <Calendar size={15} /> },
                    { value: 'updatedAt', label: 'Modified Date', icon: <Clock size={15} /> },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer text-left ${
                        sortBy === option.value
                          ? 'text-primary bg-primary/5'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </span>
                      {sortBy === option.value && <CheckCircle size={14} />}
                    </button>
                  ))}

                  <div className="px-4 py-2 border-y border-slate-50 mt-1 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Order</p>
                  </div>
                  {[
                    { value: 'desc', label: 'Newest First', icon: <ArrowDown size={15} /> },
                    { value: 'asc', label: 'Oldest First', icon: <ArrowUp size={15} /> },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOrder(option.value);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer text-left ${
                        sortOrder === option.value
                          ? 'text-primary bg-primary/5'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </span>
                      {sortOrder === option.value && <CheckCircle size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 nav:flex-none">
            <motion.div
              initial={false}
              animate={{ width: windowWidth <= 769 ? '100%' : ((searchTerm || isFocused) ? '340px' : '240px') }}
              className="relative flex items-center"
            >
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${(searchTerm || isFocused) ? 'text-primary' : 'text-slate-500'}`}
                size={18}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pl-11 pr-10 text-sm focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-slate-500 hover:border-slate-300"
              />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 p-1 hover:bg-slate-100 rounded-lg text-black transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {(selectedStatuses.length > 0 || selectedCategories.length > 0) && (
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Active Filters:</span>
          {selectedStatuses.map(s => (
            <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
              {s}
              <button onClick={() => toggleStatusFilter(s)} className="hover:text-red-500 cursor-pointer"><X size={12} /></button>
            </span>
          ))}
          {selectedCategories.map(c => (
            <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
              {c}
              <button onClick={() => toggleCategoryFilter(c)} className="hover:text-red-500 cursor-pointer"><X size={12} /></button>
            </span>
          ))}
          <button
            onClick={() => { setSelectedStatuses([]); setSelectedCategories([]); }}
            className="text-xs text-red-500 font-bold hover:underline cursor-pointer ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Table */}
      <div className="ag-card overflow-visible">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-12 text-center">#</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Article Details</th>

                {/* Status Header with Filter */}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="relative inline-block" ref={statusFilterRef}>
                    <button
                      onClick={() => { setShowStatusFilter(!showStatusFilter); setShowCategoryFilter(false); }}
                      className={`flex items-center gap-1.5 cursor-pointer transition-colors uppercase tracking-wider ${
                        selectedStatuses.length > 0 ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Status
                      <Filter size={12} className={selectedStatuses.length > 0 ? 'fill-primary/30' : ''} />
                      {selectedStatuses.length > 0 && (
                        <span className="w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
                          {selectedStatuses.length}
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {showStatusFilter && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-slate-50 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Filter by Status</p>
                            {selectedStatuses.length > 0 && (
                              <button onClick={clearStatusFilter} className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer">Clear</button>
                            )}
                          </div>
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => toggleStatusFilter(status)}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer text-left hover:bg-slate-50"
                            >
                              <span className="flex items-center space-x-2.5">
                                <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                  selectedStatuses.includes(status) ? 'bg-primary border-primary' : 'border-slate-300'
                                }`}>
                                  {selectedStatuses.includes(status) && <CheckCircle size={10} className="text-white" />}
                                </span>
                                <span className={selectedStatuses.includes(status) ? 'text-primary' : 'text-slate-600'}>{status}</span>
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </th>

                {/* Category Header with Filter */}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="relative inline-block" ref={categoryFilterRef}>
                    <button
                      onClick={() => { setShowCategoryFilter(!showCategoryFilter); setShowStatusFilter(false); }}
                      className={`flex items-center gap-1.5 cursor-pointer transition-colors uppercase tracking-wider ${
                        selectedCategories.length > 0 ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Category
                      <Filter size={12} className={selectedCategories.length > 0 ? 'fill-primary/30' : ''} />
                      {selectedCategories.length > 0 && (
                        <span className="w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
                          {selectedCategories.length}
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {showCategoryFilter && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          className="absolute left-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-slate-50 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Filter by Category</p>
                            {selectedCategories.length > 0 && (
                              <button onClick={clearCategoryFilter} className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer">Clear</button>
                            )}
                          </div>
                          {/* Category search */}
                          {availableCategories.length > 5 && (
                            <div className="px-3 py-2 border-b border-slate-50">
                              <input
                                type="text"
                                value={categorySearchTerm}
                                onChange={(e) => setCategorySearchTerm(e.target.value)}
                                placeholder="Search categories..."
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          <div className="max-h-52 overflow-y-auto no-scrollbar">
                            {filteredCategories.length > 0 ? filteredCategories.map((category) => (
                              <button
                                key={category}
                                onClick={() => toggleCategoryFilter(category)}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer text-left hover:bg-slate-50"
                              >
                                <span className="flex items-center space-x-2.5">
                                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                    selectedCategories.includes(category) ? 'bg-primary border-primary' : 'border-slate-300'
                                  }`}>
                                    {selectedCategories.includes(category) && <CheckCircle size={10} className="text-white" />}
                                  </span>
                                  <span className={`truncate max-w-[180px] ${selectedCategories.includes(category) ? 'text-primary' : 'text-slate-600'}`}>{category}</span>
                                </span>
                              </button>
                            )) : (
                              <p className="px-4 py-3 text-xs text-slate-400 text-center">No categories found</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Published</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-slate-100 border-t-primary rounded-full animate-spin mb-3"></div>
                      <p className="text-slate-500 font-medium animate-pulse">Loading articles...</p>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((blog, index) => (
                  <Fragment key={blog.id}>
                  <tr className={`transition-colors group ${quickEditId === blog.id ? 'bg-primary/5' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-bold text-slate-400">{startIndex + index + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                          <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary">
                            <FileText size={24} />
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-center space-x-2">
                            <p className="text-base font-bold text-slate-900 truncate max-w-[250px]">{blog.title}</p>
                            {blog.featured && (
                              <Star size={14} className="fill-amber-400 text-amber-400 shrink-0" title="Featured" />
                            )}
                          </div>
                          <p className="text-sm text-slate-500">{blog.category}</p>
                          
                          {/* WordPress-style Row Actions */}
                          <div className="absolute left-0 top-full mt-0.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto whitespace-nowrap z-10">
                            <NavLink to={`/blogs/edit/${blog.id}`} className="text-[12px] font-medium text-primary hover:underline">Edit</NavLink>
                            <span className="text-slate-300 text-[10px]">|</span>
                            {blog.status === 'Published' ? (
                              <button onClick={() => window.open(`${CLIENT_URL}/blogs/${blog.slug || blog.id}`, '_blank')} className="text-[12px] font-medium text-emerald-600 hover:underline cursor-pointer">View</button>
                            ) : (
                              <button onClick={() => window.open(`${CLIENT_URL}/blogs/${blog.slug || blog.id}?preview=true`, '_blank')} className="text-[12px] font-medium text-slate-600 hover:underline cursor-pointer">Preview</button>
                            )}
                            <span className="text-slate-300 text-[10px]">|</span>
                            <button onClick={() => handleQuickEditInit(blog)} className="text-[12px] font-medium text-slate-600 hover:underline cursor-pointer">Quick Edit</button>
                            <span className="text-slate-300 text-[10px]">|</span>
                            <button onClick={() => handleDuplicate(blog)} className="text-[12px] font-medium text-slate-600 hover:underline cursor-pointer">Duplicate</button>
                            <span className="text-slate-300 text-[10px]">|</span>
                            <button onClick={() => handleDelete(blog.id)} className="text-[12px] font-medium text-red-500 hover:underline cursor-pointer">Delete</button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-slate-700 font-medium">{blog.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-black">{blog.views.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <span className="text-sm text-slate-700 font-medium block">{formatDate(blog.date)}</span>
                        {blog.updatedAt && blog.updatedAt !== blog.date && (
                          <span className="text-[11px] text-slate-400 mt-0.5 block">Edited {formatDate(blog.updatedAt)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {blog.status === 'Draft' && (
                          <button
                            onClick={() => handleStatusUpdate(blog.id, 'Published')}
                            className="p-2 text-emerald-500 hover:text-emerald-700 transition-colors hover:bg-emerald-50 rounded-lg border border-transparent hover:border-emerald-100 cursor-pointer"
                            title="Quick Publish"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <NavLink
                          to={`/blogs/edit/${blog.id}`}
                          className="p-2 text-slate-500 hover:text-black transition-colors hover:bg-white rounded-lg border border-transparent hover:border-slate-100 cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </NavLink>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-slate-500 hover:text-red-500 transition-colors hover:bg-white rounded-lg border border-transparent hover:border-slate-100 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex items-center justify-end">
                          <button
                            onMouseEnter={(e) => handleMouseEnter(e, blog)}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === blog.id ? null : blog.id);
                            }}
                            className={`p-2 transition-colors rounded-lg cursor-pointer ${openDropdownId === blog.id ? 'bg-slate-100 text-black' : 'text-slate-400 hover:text-slate-800'}`}
                            title="Action"
                          >
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Quick Edit Inline Row */}
                  {quickEditId === blog.id && (
                    <tr className="bg-primary/5 border-b border-primary/10">
                      <td colSpan="7" className="px-6 py-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Edit</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            
                            {/* Column 1 */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                                <input 
                                  type="text" 
                                  value={quickEditData.title}
                                  onChange={(e) => setQuickEditData({...quickEditData, title: e.target.value})}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Slug</label>
                                <input 
                                  type="text" 
                                  value={quickEditData.slug}
                                  onChange={(e) => setQuickEditData({...quickEditData, slug: e.target.value})}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Date</label>
                                <input 
                                  type="date" 
                                  value={quickEditData.date}
                                  onChange={(e) => setQuickEditData({...quickEditData, date: e.target.value})}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Author</label>
                                <select
                                  value={quickEditData.author_name}
                                  onChange={(e) => setQuickEditData({...quickEditData, author_name: e.target.value})}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                                >
                                  <option value="">Select Author</option>
                                  {availableAuthors.map(author => (
                                    <option key={author} value={author}>{author}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
                                <select
                                  value={quickEditData.category}
                                  onChange={(e) => setQuickEditData({...quickEditData, category: e.target.value})}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                                >
                                  <option value="">Select Category</option>
                                  {availableCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Tags</label>
                                <input 
                                  type="text" 
                                  value={quickEditData.tags}
                                  onChange={(e) => setQuickEditData({...quickEditData, tags: e.target.value})}
                                  placeholder="Separate tags with commas"
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="flex items-center space-x-2 mt-6 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    checked={quickEditData.allowComments}
                                    onChange={(e) => setQuickEditData({...quickEditData, allowComments: e.target.checked})}
                                    className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary cursor-pointer"
                                  />
                                  <span className="text-sm font-semibold text-slate-700">Allow Comments</span>
                                </label>
                              </div>
                              <div className="pt-2">
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                                <select
                                  value={quickEditData.status}
                                  onChange={(e) => setQuickEditData({...quickEditData, status: e.target.value})}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                                >
                                  {statusOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                            <button
                              onClick={handleQuickEditCancel}
                              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleQuickEditSave}
                              className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm transition-colors cursor-pointer"
                            >
                              Update
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
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-slate-50 rounded-full mb-3 text-slate-500">
                        <Search size={32} />
                      </div>
                      <p className="font-semibold text-black mb-1">No articles found</p>
                      <p className="text-base text-slate-500">We couldn't find any articles matching "{searchTerm}"</p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="mt-4 text-primary font-semibold hover:underline cursor-pointer"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Dropdown Portal */}
        {createPortal(
          <AnimatePresence>
            {openDropdownId && selectedBlog && (
              <div 
                className="fixed inset-0 z-[9999] pointer-events-none"
                onClick={() => setOpenDropdownId(null)}
              >
                <div className="relative w-full h-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: dropdownPosition === 'up' ? 10 : -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: dropdownPosition === 'up' ? 10 : -10 }}
                    onMouseEnter={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    }}
                    onMouseLeave={handleMouseLeave}
                    ref={dropdownRef}
                    style={{
                      position: 'absolute',
                      top: dropdownPosition === 'up' ? dropdownCoords.top - window.scrollY - 8 : dropdownCoords.top - window.scrollY + 8,
                      left: dropdownCoords.left - 224, // 224 is w-56
                      transformOrigin: dropdownPosition === 'up' ? 'bottom right' : 'top right',
                    }}
                    className={`pointer-events-auto w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2 text-left ${dropdownPosition === 'up' ? '-translate-y-full' : ''}`}
                  >
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quick Actions</p>
                    </div>

                    {/* View (Published) or Preview (Draft/Archived) */}
                    {selectedBlog.status === 'Published' ? (
                      <button
                        onClick={() => {
                          const slugOrId = selectedBlog.slug || selectedBlog.id;
                          window.open(`${CLIENT_URL}/blogs/${slugOrId}`, '_blank');
                          setOpenDropdownId(null);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 font-semibold text-sm text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer text-left"
                      >
                        <ExternalLink size={16} />
                        <span>View Article</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const slugOrId = selectedBlog.slug || selectedBlog.id;
                          window.open(`${CLIENT_URL}/blogs/${slugOrId}?preview=true`, '_blank');
                          setOpenDropdownId(null);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 font-semibold text-sm text-slate-600 hover:bg-slate-50 hover:text-black transition-colors cursor-pointer text-left"
                      >
                        <Eye size={16} />
                        <span>Preview Article</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleShare(selectedBlog)}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 font-semibold text-sm text-slate-600 hover:bg-slate-50 hover:text-black transition-colors cursor-pointer text-left"
                    >
                      <Share2 size={16} />
                      <span>Share Article</span>
                    </button>
                    <button
                      onClick={() => handleDuplicate(selectedBlog)}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 font-semibold text-sm text-slate-600 hover:bg-slate-50 hover:text-black transition-colors cursor-pointer text-left"
                    >
                      <Copy size={16} />
                      <span>Duplicate Article</span>
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(selectedBlog.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 font-semibold text-sm transition-colors cursor-pointer text-left
                        ${selectedBlog.featured ? 'text-amber-600 bg-amber-50/50 hover:bg-amber-100' : 'text-slate-600 hover:bg-slate-50 hover:text-black'}`}
                    >
                      <Star size={16} className={selectedBlog.featured ? 'fill-current' : ''} />
                      <span>{selectedBlog.featured ? 'Remove from Featured' : 'Mark as Featured'}</span>
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedBlog.id, 'Archived')}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 font-semibold text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-left"
                    >
                      <Archive size={16} />
                      <span>Archive Article</span>
                    </button>

                    <div className="px-4 py-2 border-y border-slate-50 my-1 bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Change Status</p>
                    </div>
                    {['Published', 'Draft'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedBlog.id, status)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold text-sm transition-colors cursor-pointer text-left
                          ${selectedBlog.status === status
                            ? 'text-primary font-bold bg-primary/5'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-black'}`}
                      >
                        <span>{status}</span>
                        {selectedBlog.status === status && <CheckCircle size={14} />}
                      </button>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Pagination - Redesigned */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Total count + Per page */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm text-slate-600 font-semibold whitespace-nowrap">
              {totalItems.toLocaleString()} <span className="text-slate-400 font-medium">items</span>
            </span>

            <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

            <div
              className="relative flex items-center gap-2"
              ref={perPageRef}
              onMouseEnter={() => setShowPerPageDropdown(true)}
              onMouseLeave={() => setShowPerPageDropdown(false)}
            >
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap hidden sm:inline">Rows:</span>
              <button
                onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
                className={`flex items-center gap-1 h-8 px-2.5 bg-white border rounded-lg text-sm font-semibold transition-all cursor-pointer active:scale-95 ${showPerPageDropdown ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-700'}`}
              >
                <span>{itemsPerPage}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${showPerPageDropdown ? 'rotate-180' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {showPerPageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: -8 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute bottom-full left-0 mb-2 w-32 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden"
                  >
                    {[10, 20, 30, 50, 100].map((val) => (
                      <button
                        key={val}
                        onClick={() => {
                          setItemsPerPage(val);
                          setCurrentPage(1);
                          setShowPerPageDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm font-bold transition-all cursor-pointer
                          ${itemsPerPage === val
                            ? 'text-primary bg-primary/5'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-black'}`}
                      >
                        <span>{val} Rows</span>
                        {itemsPerPage === val && <CheckCircle size={14} className="text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Pagination Controls */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all border shrink-0
                ${currentPage === 1
                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer active:scale-95'}`}
              title="First page"
            >
              <ChevronsLeft size={16} />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all border shrink-0
                ${currentPage === 1
                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer active:scale-95'}`}
              title="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Input */}
            <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2 mx-1">
              <input
                type="text"
                value={pageInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d+$/.test(val)) setPageInput(val);
                }}
                onBlur={handlePageInputSubmit}
                className="w-12 h-8 text-center text-sm font-bold border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-white text-slate-800 transition-all"
              />
              <span className="text-sm text-slate-400 font-medium whitespace-nowrap">of {totalPages || 1}</span>
            </form>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all border shrink-0
                ${currentPage === totalPages || totalPages === 0
                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer active:scale-95'}`}
              title="Next page"
            >
              <ChevronRight size={16} />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all border shrink-0
                ${currentPage === totalPages || totalPages === 0
                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer active:scale-95'}`}
              title="Last page"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;


