'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Save, Settings, Info, Loader2, Globe, Heart } from 'lucide-react';
import { api } from '@/services/api';

interface SettingItem {
  id?: string;
  setting_group: string;
  setting_key: string;
  setting_value: string | null;
}

export default function SettingsClient() {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: 'Mazo Sindhudurg',
    contact_email: '',
    contact_phone: '',
    address: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
  });

  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get<any>('/settings');
      const data = response.data || response;
      if (Array.isArray(data)) {
        const mapped: Record<string, string> = { ...settings };
        data.forEach((item: SettingItem) => {
          if (item.setting_key) {
            mapped[item.setting_key] = item.setting_value || '';
          }
        });
        setSettings(mapped);
      }
    } catch (err: any) {
      console.error('Failed to load settings:', err);
      toast.error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSetting = async (key: string) => {
    setSavingKey(key);
    try {
      const response = await api.put<any>('/settings', {
        key,
        value: settings[key],
        group: 'general'
      });
      if (response.success) {
        toast.success(`Setting '${key}' saved successfully`);
      }
    } catch (err: any) {
      toast.error(err.message || `Failed to save setting ${key}`);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="relative space-y-8 p-8 max-w-[1000px] mx-auto min-h-[calc(100vh-3rem)] bg-gradient-to-br from-slate-50/90 to-blue-50/90 rounded-[2.5rem] border border-slate-200/60 shadow-sm m-4 lg:m-6 overflow-hidden">
      {/* Plaque Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-display">Site Configuration</h1>
            <p className="text-slate-500 font-medium text-sm mt-0.5">Configure general site identity, contacts, and social integrations.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-lg"></div>
          <p className="text-slate-500 font-bold tracking-wide animate-pulse">Loading settings...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* General Information Card */}
          <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 space-y-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
              <Globe size={14} /> Identity & Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'site_name', label: 'Site Name', placeholder: 'e.g. Mazo Sindhudurg' },
                { key: 'contact_email', label: 'Contact Email', placeholder: 'info@mazosindhudurg.com' },
                { key: 'contact_phone', label: 'Contact Phone', placeholder: '+91 9876543210' },
                { key: 'address', label: 'Office Address', placeholder: 'Sindhudurg, Maharashtra' },
              ].map(f => (
                <div key={f.key} className="space-y-1.5 relative">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{f.label}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={settings[f.key] || ''}
                      onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary transition-all"
                    />
                    <button
                      disabled={savingKey !== null}
                      onClick={() => handleSaveSetting(f.key)}
                      className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                      title="Save Setting"
                    >
                      {savingKey === f.key ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Card */}
          <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 space-y-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
              <Heart size={14} /> Social Integrations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'facebook_url', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
                { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
                { key: 'twitter_url', label: 'Twitter URL', placeholder: 'https://twitter.com/...' },
              ].map(f => (
                <div key={f.key} className="space-y-1.5 relative">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{f.label}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={settings[f.key] || ''}
                      onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary transition-all"
                    />
                    <button
                      disabled={savingKey !== null}
                      onClick={() => handleSaveSetting(f.key)}
                      className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                      title="Save Setting"
                    >
                      {savingKey === f.key ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-blue-50/60 rounded-2xl border border-blue-100/80 items-start">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
              Updating settings updates the backend configuration dynamically. Ensure all social and contact URLs are fully qualified (e.g. starting with https://).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
