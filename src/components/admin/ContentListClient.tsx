'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Plus, Search, SlidersHorizontal, ArrowDown, ArrowUp,
  Clock, CheckCircle, Archive, Trash2, Edit, ExternalLink, X
} from 'lucide-react';
import DataTable from './DataTable';
import { getContentList } from '@/services/content';
import { api } from '@/services/api';

const contentTypeOptions = [
  { label: 'All Types', value: 'all' },
  { label: 'Blog', value: 'blog' },
  { label: 'Guide', value: 'guide' },
  { label: 'Plan', value: 'plan' },
  { label: 'Story', value: 'story' },
  { label: 'News', value: 'news' },
];

const statusOptions = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

export default function ContentListClient() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Sorting
  const [sortBy, setSortBy] = useState('updated_at');
  const [sortOrder, setSortOrder] = useState('desc');

  // Delete State
  const [contentToDelete, setContentToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      // Query parameters matched with the backend repository
      const params = {
        q: searchTerm || undefined,
        type: selectedType !== 'all' ? selectedType : undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        page: currentPage,
        limit: itemsPerPage,
      };

      const response = await api.get<any>('/content', { params });
      if (response.success && response.data) {
        const fetchedItems = response.data.items || [];
        setItems(fetchedItems);
        setTotalItems(response.data.total || 0);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (err: any) {
      console.error('Failed to load content:', err);
      toast.error('Failed to fetch content registry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [searchTerm, selectedType, selectedStatus, currentPage, sortBy, sortOrder]);

  const handleEdit = (id: number) => {
    router.push(`/admin/content/edit/${id}`);
  };

  const handleConfirmDelete = async () => {
    if (!contentToDelete) return;
    setIsDeleting(true);
    try {
      const response = await api.delete<any>(`/content/${contentToDelete.id}`);
      if (response.success) {
        toast.success('Content item deleted successfully');
        setContentToDelete(null);
        fetchContent();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete content item');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle size={12} /> Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <Clock size={12} /> Draft
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-100">
            <Archive size={12} /> {status}
          </span>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
        {type}
      </span>
    );
  };

  // Restructure items into the flat format expected by DataTable
  const formattedData = items.map((item) => ({
    id: Number(item.id),
    title: item.title,
    type: getTypeBadge(item.content_type || item.type || 'page'),
    status: getStatusBadge(item.status),
    author: item.authors?.name || 'Admin',
    date: item.updated_at ? new Date(item.updated_at).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) : '—',
  }));

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'author', label: 'Author' },
    { key: 'date', label: 'Last Modified' },
  ];

  return (
    <div className="relative space-y-8 p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-3rem)] bg-gradient-to-br from-slate-50/90 to-blue-50/90 rounded-[2.5rem] border border-slate-200/60 shadow-sm m-4 lg:m-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col min-[427px]:flex-row min-[427px]:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Content Registry</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage articles, guides, plans, and website content.</p>
        </div>
        <Link
          href="/admin/add-blog"
          className="flex items-center justify-center space-x-2 bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all w-full min-[427px]:w-auto"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span>Create New Content</span>
        </Link>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200/50 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search content by title..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Content Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {contentTypeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid Card */}
      <div className="bg-white/95 rounded-3xl border border-slate-200/50 shadow-sm overflow-visible">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-lg"></div>
            <p className="text-slate-500 font-bold tracking-wide animate-pulse">Loading content...</p>
          </div>
        ) : (
          <DataTable
            data={formattedData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={(id) => {
              const original = items.find(item => Number(item.id) === id);
              if (original) setContentToDelete(original);
            }}
          />
        )}

        {/* Pagination bar */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-bold hover:bg-slate-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-bold hover:bg-slate-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {contentToDelete && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">Delete Content?</h3>
                <p className="text-xs text-slate-400 font-medium">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900 font-black">"{contentToDelete.title}"</strong>?
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={isDeleting}
                onClick={() => setContentToDelete(null)}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 text-sm font-bold px-4 py-3 rounded-2xl border border-slate-200/60 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-3 rounded-2xl shadow-lg shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Content</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
