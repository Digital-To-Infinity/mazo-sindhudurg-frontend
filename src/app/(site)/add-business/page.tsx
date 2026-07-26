import React from 'react';
import { Store, MapPin, Phone, Mail, User, Image as ImageIcon, Send, ShieldCheck, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Add a Business – Mazo Sindhudurg',
  description: 'Submit your business or attraction to be listed on Mazo Sindhudurg.',
}

export default function AddBusinessPage() {
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
                    <TrendingUp className="w-6 h-6" />
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
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
              {/* Form subtle top gradient */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 via-blue-500 to-primary"></div>
              <form className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Name */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Business Name *</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Store className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm" placeholder="e.g. Athithi Bamboo Restaurant" required />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Category *</label>
                    <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 appearance-none cursor-pointer hover:border-primary/50 shadow-sm" required defaultValue="">
                      <option value="" disabled>Select category...</option>
                      <option>Hotel & Resort</option>
                      <option>Restaurant & Dining</option>
                      <option>Travel Agency / Transport</option>
                      <option>Local Shop / Market</option>
                      <option>Water Sports / Activities</option>
                      <option>Other Service</option>
                    </select>
                  </div>

                  {/* Taluka */}
                  <div className="space-y-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Taluka *</label>
                    <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 appearance-none cursor-pointer hover:border-primary/50 shadow-sm" required defaultValue="">
                      <option value="" disabled>Select taluka...</option>
                      <option>Malvan</option>
                      <option>Devgad</option>
                      <option>Vengurla</option>
                      <option>Kudal</option>
                      <option>Sawantwadi</option>
                      <option>Kankavli</option>
                      <option>Dodamarg</option>
                      <option>Vaibhavwadi</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Business Description</label>
                  <textarea rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 resize-none hover:border-primary/50 shadow-sm" placeholder="Tell customers what makes your business special..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Person */}
                  <div className="space-y-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Contact Person *</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm" placeholder="Your full name" required />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Phone Number *</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input type="tel" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input type="email" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 hover:border-primary/50 shadow-sm" placeholder="hello@yourbusiness.com" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Full Address *</label>
                    <div className="relative group">
                      <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                      </div>
                      <textarea rows={2} className="w-full pl-12 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-slate-700 placeholder:text-slate-400 resize-none hover:border-primary/50 shadow-sm" placeholder="Enter complete address..."></textarea>
                    </div>
                  </div>
                </div>

                {/* Photo Upload Area */}
                <div className="space-y-2 pt-2">
                  <label className="font-label-md text-sm font-bold text-slate-700 ml-1">Upload Photos</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-primary/5 hover:border-primary/50 transition-colors cursor-pointer group flex flex-col items-center shadow-inner">
                    <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-primary/20 transition-all duration-300">
                      <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-bold text-slate-700 text-body-lg">Click to upload or drag and drop</p>
                    <p className="font-caption text-sm text-slate-500 mt-2">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="button" className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-label-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 mt-6 group">
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Submit Business Request
                </button>
                <p className="text-center font-caption text-xs text-slate-500 mt-4">By submitting, you agree to our Terms of Service and Privacy Policy.</p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
