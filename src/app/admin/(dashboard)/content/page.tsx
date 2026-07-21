'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function AdminContentPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await api.get('/content');
      // The backend usually returns an array or { data: [] }
      setItems(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/admin/content/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this content?')) {
      try {
        await api.delete(`/content/${id}`);
        // Refresh list
        fetchContent();
      } catch (error) {
        console.error('Failed to delete content:', error);
        alert('Failed to delete content.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Content Management</h1>
        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm">
          + Add New
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-400">Loading live data...</div>
        ) : (
          <DataTable 
            data={items as any} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}
