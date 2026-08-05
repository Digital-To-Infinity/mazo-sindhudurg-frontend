'use client';

import React, { useState } from 'react';
import { Store, MapPin, Phone, Mail, User, Image as ImageIcon, Send, ShieldCheck, Users, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddBusinessPage() {
  const [formData, setFormData] = useState({
    business_name: '',
    category: '',
    taluka: '',
    description: '',
    contact_name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.business_name || !formData.contact_name || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields marked with *');
      return;
    }

    setLoading(true);
    try {
      // Save supplementary fields (category, taluka) inside payload_json
      const payload = {
        business_name: formData.business_name.trim(),
        contact_name: formData.contact_name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        address: formData.address.trim(),
        description: formData.description.trim() || null,
        submission_payload_json: JSON.stringify({
          category: formData.category,
          taluka: formData.taluka,
        }),
      };

      const response = await api.post<any>('/submissions', payload);
      if (response.success || response.id) {
        setSuccess(true);
        toast.success('Business request submitted successfully!');
        setFormData({
          business_name: '',
          category: '',
          taluka: '',
          description: '',
          contact_name: '',
          phone: '',
          email: '',
          address: '',
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit business request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 overflow-hidden relative font-body-md text-on-surface">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 rounded-b-[100px] -z-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold font-label-md tracking-wider uppercase mb-2 block drop-shadow-sm">Partner With Us</span>
          <h1 className="font-headline-xl text-headline-xl text-slate-900 mb-4 drop-shadow-sm">List Your Business</h1>
          <p className="text-slate-600 font-body-lg leading-relaxed">
            Join the most trusted directory in Sindhudurg. Reach thousands of travelers and locals looking for the best places to eat, stay, and shop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column - Benefits */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 transform transition-transform hover:-translate-y-1 duration-300">
              <h3 className="font-headline-sm text-headline-sm font-bold text-slate-900 mb-8">Why join Mazo Sindhudurg?</h3>

              <div className="space-y-8">
                <div className="flex gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/30">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-body-lg">Boost Your Visibility</h4>
                    <p className="text-slate-500 font-body-md mt-1 leading-relaxed">Get discovered by tourists planning their trips and locals looking for services.</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-body-lg">Connect Directly</h4>
                    <p className="text-slate-500 font-body-md mt-1 leading-relaxed">Customers can call or WhatsApp you directly from your customized business profile.</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-purple-500/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-body-lg">Build Trust</h4>
                    <p className="text-slate-500 font-body-md mt-1 leading-relaxed">Verified businesses get a special badge that drastically increases customer confidence.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-[50px] mix-blend-screen pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-[50px] mix-blend-screen pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-amber-400">
                  <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  <span className="font-bold font-label-md tracking-wider uppercase text-xs">Trusted Platform</span>
                </div>
                <p className="text-slate-200 font-body-lg italic mb-8 leading-relaxed">
                  "Since listing on Mazo Sindhudurg, our resort bookings have increased by 40%. It's the best local discovery platform out there!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-900 rounded-full border-2 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]"></div>
                  <div>
                    <h5 className="font-bold font-body-md text-white">Rahul Desai</h5>
                    <p className="text-indigo-300 font-caption text-caption">Owner, Sea View Resort</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - The Form */}
          <div className="lg:col-span-7">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900">Submission Received!</h2>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you for submitting your business listing. Our moderation team will review the details and publish the profile shortly.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-xl active:scale-95 transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  Submit Another Listing
                </button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
                {/* Form subtle top gradient */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 via-blue-500 to-primary"></div>
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Name */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Business Name *</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Store className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                          type="text"
                          name="business_name"
                          value={formData.business_name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm"
                          placeholder="e.g. Athithi Bamboo Restaurant"
                          required
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 cursor-pointer hover:border-primary/50 shadow-sm"
                        required
                      >
                        <option value="" disabled>Select category...</option>
                        <option value="Hotel & Resort">Hotel & Resort</option>
                        <option value="Restaurant & Dining">Restaurant & Dining</option>
                        <option value="Travel Agency / Transport">Travel Agency / Transport</option>
                        <option value="Local Shop / Market">Local Shop / Market</option>
                        <option value="Water Sports / Activities">Water Sports / Activities</option>
                        <option value="Other Service">Other Service</option>
                      </select>
                    </div>

                    {/* Taluka */}
                    <div className="space-y-2">
                      <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Taluka *</label>
                      <select
                        name="taluka"
                        value={formData.taluka}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 cursor-pointer hover:border-primary/50 shadow-sm"
                        required
                      >
                        <option value="" disabled>Select taluka...</option>
                        <option value="Malvan">Malvan</option>
                        <option value="Devgad">Devgad</option>
                        <option value="Vengurla">Vengurla</option>
                        <option value="Kudal">Kudal</option>
                        <option value="Sawantwadi">Sawantwadi</option>
                        <option value="Kankavli">Kankavli</option>
                        <option value="Dodamarg">Dodamarg</option>
                        <option value="Vaibhavwadi">Vaibhavwadi</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Business Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 resize-none hover:border-primary/50 shadow-sm"
                      placeholder="Tell customers what makes your business special..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Person */}
                    <div className="space-y-2">
                      <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Contact Person *</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                          type="text"
                          name="contact_name"
                          value={formData.contact_name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Phone Number *</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm"
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm"
                          placeholder="hello@yourbusiness.com"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Full Address *</label>
                      <div className="relative group">
                        <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                          <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={2}
                          className="w-full pl-12 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 resize-none hover:border-primary/50 shadow-sm"
                          placeholder="Enter complete address..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 text-white font-label-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 mt-6 group cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                    <span>{loading ? 'Submitting...' : 'Submit Business Request'}</span>
                  </button>
                  <p className="text-center font-caption text-xs text-slate-500 mt-4">By submitting, you agree to our Terms of Service and Privacy Policy.</p>

                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
