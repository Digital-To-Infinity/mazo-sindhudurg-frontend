// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Plus, Edit2, Trash2, Shield, X, Eye, EyeOff,
  CheckCircle, XCircle, Clock, Search, ChevronDown
} from 'lucide-react'
import toast from 'react-hot-toast'

const ROLE_COLORS = {
  admin: 'bg-red-100 text-red-700 border-red-200',
  editor: 'bg-blue-100 text-blue-700 border-blue-200',
  author: 'bg-green-100 text-green-700 border-green-200',
  viewer: 'bg-slate-100 text-slate-600 border-slate-200',
}

const STATUS_CONFIG = {
  active: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Active' },
  inactive: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Inactive' },
  banned: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Banned' },
}

const EMPTY_FORM = { name: '', email: '', password: '', role_id: '', status: 'active' }

export default function UsersClient() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showPassword, setShowPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function fetchData() {
    setLoading(true)
    try {
      const res = await api.get('/users') as any
      const data = res.data || res
      setUsers(data.users || [])
      setRoles(data.roles || [])
    } catch (e) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  function openCreate() {
    setEditingUser(null)
    setForm(EMPTY_FORM)
    setShowPassword(false)
    setShowModal(true)
  }

  function openEdit(user: any) {
    setEditingUser(user)
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      role_id: user.role?.id || '',
      status: user.status,
    })
    setShowPassword(false)
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.name || !form.email || !form.role_id) {
      toast.error('Name, email and role are required')
      return
    }
    if (!editingUser && !form.password) {
      toast.error('Password is required for new users')
      return
    }
    setSaving(true)
    try {
      const payload: any = {
        name: form.name,
        email: form.email,
        role_id: Number(form.role_id),
        status: form.status,
      }
      if (form.password) payload.password = form.password

      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, payload)
        toast.success('User updated!')
      } else {
        await api.post('/users', payload)
        toast.success('User created!')
      }
      setShowModal(false)
      fetchData()
    } catch (e: any) {
      toast.error(e.message || 'Failed to save user')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await api.delete(`/users/${deleteTarget.id}`)
      toast.success('User deleted')
      setDeleteTarget(null)
      fetchData()
    } catch (e: any) {
      toast.error(e.message || 'Failed to delete user')
    } finally {
      setIsDeleting(false)
    }
  }

  const filtered = users.filter((u: any) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role?.slug === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Users size={24} className="text-primary" /> User Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage accounts, roles and permissions</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {roles.map((role: any) => {
          const count = users.filter((u: any) => u.role?.slug === role.slug).length
          const colorClass = ROLE_COLORS[role.slug] || 'bg-slate-100 text-slate-600 border-slate-200'
          return (
            <div key={role.id} className={`rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${colorClass} ${roleFilter === role.slug ? 'ring-2 ring-offset-1 ring-current' : ''}`}
              onClick={() => setRoleFilter(roleFilter === role.slug ? 'all' : role.slug)}>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">{role.name}</span>
              </div>
              <div className="text-2xl font-black">{count}</div>
              {role.description && <p className="text-xs opacity-70 mt-1 line-clamp-1">{role.description}</p>}
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Roles</option>
          {roles.map((r: any) => <option key={r.id} value={r.slug}>{r.name}</option>)}
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading users...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No users found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="text-right px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((user: any) => {
                const status = STATUS_CONFIG[user.status] || STATUS_CONFIG.inactive
                const StatusIcon = status.icon
                const roleColor = ROLE_COLORS[user.role?.slug] || 'bg-slate-100 text-slate-600 border-slate-200'
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{user.name}</p>
                          <p className="text-slate-400 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${roleColor}`}>
                        <Shield size={11} /> {user.role?.name || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${status.bg} ${status.color}`}>
                        <StatusIcon size={12} /> {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-xs">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEdit(user)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-all"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(user)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-800">
                  {editingUser ? 'Edit User' : 'Create New User'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X size={18} className="text-slate-400" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Rahul Patil"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="rahul@mazosindhudurg.com"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Password {editingUser && <span className="normal-case font-normal text-slate-400">(leave blank to keep current)</span>}
                    {!editingUser && '*'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      placeholder={editingUser ? 'Enter new password' : 'Min 6 characters'}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Role *</label>
                    <select
                      value={form.role_id}
                      onChange={e => setForm(f => ({ ...f, role_id: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="">Select role</option>
                      {roles.map((r: any) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Status</label>
                    <select
                      value={form.status}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>
                </div>

                {/* Role description hint */}
                {form.role_id && (
                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
                    {roles.find((r: any) => String(r.id) === String(form.role_id))?.description || 'No description available'}
                  </div>
                )}
              </div>

              <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {saving ? 'Saving…' : editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-1">Delete User?</h3>
              <p className="text-slate-500 text-sm mb-6">
                <span className="font-semibold text-slate-700">{deleteTarget.name}</span> will be permanently removed. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-60"
                >
                  {isDeleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
