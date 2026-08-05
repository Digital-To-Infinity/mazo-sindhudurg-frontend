'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  CheckCircle, XCircle, AlertTriangle, Eye, Mail, Phone,
  Calendar, FileText, ChevronRight, Loader2, ArrowLeft
} from 'lucide-react';
import { api } from '@/services/api';

interface Submission {
  id: string | number;
  business_name: string;
  contact_name: string;
  email: string | null;
  phone: string | null;
  whatsapp_number: string | null;
  website_url: string | null;
  address: string | null;
  description: string | null;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'duplicate' | 'spam';
  rejection_reason: string | null;
  created_at: string;
}

export default function SubmissionsClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [updatingId, setUpdatingId] = useState<any>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await api.get<any>('/submissions');
      // Submissions API returns envelope format
      const data = response.data || response;
      if (Array.isArray(data)) {
        setSubmissions(data);
      }
    } catch (err: any) {
      console.error('Failed to fetch submissions:', err);
      toast.error('Failed to load business submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id: any, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await api.put<any>(`/submissions/${id}/status`, { status: newStatus });
      if (response.success) {
        toast.success(`Submission ${newStatus.toLowerCase()} successfully`);
        // Refresh local items
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus as any } : s));
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(prev => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update submission status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle size={12} /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
            <XCircle size={12} /> Rejected
          </span>
        );
      case 'spam':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <AlertTriangle size={12} /> Spam
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <Loader2 size={12} className="animate-spin" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="relative space-y-8 p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-3rem)] bg-gradient-to-br from-slate-50/90 to-blue-50/90 rounded-[2.5rem] border border-slate-200/60 shadow-sm m-4 lg:m-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Directory Submissions</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Review and approve directory requests submitted by business owners.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
        {/* Left: Table List */}
        <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden min-w-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-lg"></div>
              <p className="text-slate-500 font-bold tracking-wide animate-pulse">Retrieving submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <FileText size={36} className="mb-3 opacity-30" />
              <p className="text-sm font-semibold">No submissions received yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Business Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Person</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.map((sub) => (
                    <tr
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${selectedSubmission?.id === sub.id ? 'bg-primary/5' : ''}`}
                    >
                      <td className="px-6 py-4 font-bold text-slate-800">{sub.business_name}</td>
                      <td className="px-6 py-4 font-medium text-slate-600">{sub.contact_name}</td>
                      <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-primary transition-all">
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Side: Details / Actions Plaque */}
        <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 space-y-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
            Submission Details
          </h2>

          <AnimatePresence mode="wait">
            {selectedSubmission ? (
              <motion.div
                key={selectedSubmission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">{selectedSubmission.business_name}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Submitted on {new Date(selectedSubmission.created_at).toLocaleDateString('en-IN')}</p>
                </div>

                <div className="space-y-3.5 text-sm font-semibold text-slate-600">
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                    <FileText size={16} className="text-slate-400" />
                    <span>Contact: {selectedSubmission.contact_name}</span>
                  </div>
                  {selectedSubmission.email && (
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                      <Mail size={16} className="text-slate-400" />
                      <span>{selectedSubmission.email}</span>
                    </div>
                  )}
                  {selectedSubmission.phone && (
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                      <Phone size={16} className="text-slate-400" />
                      <span>{selectedSubmission.phone}</span>
                    </div>
                  )}
                </div>

                {selectedSubmission.description && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</h4>
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-200/40">
                      {selectedSubmission.description}
                    </p>
                  </div>
                )}

                {selectedSubmission.status === 'pending' && (
                  <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                    <button
                      disabled={updatingId !== null}
                      onClick={() => handleUpdateStatus(selectedSubmission.id, 'APPROVED')}
                      className="w-full bg-primary hover:bg-primary/95 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-primary/20 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {updatingId === selectedSubmission.id ? <Loader2 size={14} className="animate-spin" /> : null}
                      Approve Listing
                    </button>
                    <button
                      disabled={updatingId !== null}
                      onClick={() => handleUpdateStatus(selectedSubmission.id, 'REJECTED')}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Reject Submission
                    </button>
                    <button
                      disabled={updatingId !== null}
                      onClick={() => handleUpdateStatus(selectedSubmission.id, 'SPAM')}
                      className="w-full text-red-500 hover:bg-red-50 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Mark as Spam
                    </button>
                  </div>
                )}

                {selectedSubmission.status !== 'pending' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Review Status</p>
                    <div className="pt-1">{getStatusBadge(selectedSubmission.status)}</div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                <FileText size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs font-medium">Select a submission from the list to review details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
