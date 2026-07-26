import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/10 w-full pb-20 lg:pb-0 relative overflow-hidden">
      {/* Subtle clean top glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="px-margin-mobile lg:px-margin-desktop py-stack-lg max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <Image alt="Mazo Sindhudurg Logo" width={140} height={48} className="h-10 lg:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" src="/mazo-logo.png" />
            </Link>
            <p className="text-slate-400 font-body-md max-w-sm leading-relaxed">
              Your trusted companion to discovering the authentic beauty, local businesses, and untold stories of the Konkan coast.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {/* Facebook */}
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#1877F2] hover:text-white hover:border-transparent hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] transition-all duration-300" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(188,24,136,0.4)] transition-all duration-300" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2C22,19.4 19.4,22 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8C2,4.6 4.6,2 7.8,2ZM7.6,4C5.6,4 4,5.6 4,7.6V16.4C4,18.4 5.6,20 7.6,20H16.4C18.4,20 20,18.4 20,16.4V7.6C20,5.6 18.4,4 16.4,4H7.6ZM12,6.9C14.8,6.9 17.1,9.2 17.1,12C17.1,14.8 14.8,17.1 12,17.1C9.2,17.1 6.9,14.8 6.9,12C6.9,9.2 9.2,6.9 12,6.9ZM12,8.9C10.3,8.9 8.9,10.3 8.9,12C8.9,13.7 10.3,15.1 12,15.1C13.7,15.1 15.1,13.7 15.1,12C15.1,10.3 13.7,8.9 12,8.9ZM17.3,5.4C18,5.4 18.6,6 18.6,6.7C18.6,7.4 18,8 17.3,8C16.6,8 16,7.4 16,6.7C16,6 16.6,5.4 17.3,5.4Z"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#1DA1F2] hover:text-white hover:border-transparent hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(29,161,242,0.4)] transition-all duration-300" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10V10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.03 6.02,17.27 7.9,17.3C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-label-md uppercase tracking-wider drop-shadow-sm relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-8 h-[3px] bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400 rounded-full"></span>
            </h4>
            <ul className="space-y-4 font-caption text-caption">
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Popular Places</span></Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Talukas Guide</span></Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Coastal Stories</span></Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Upcoming Events</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-label-md uppercase tracking-wider drop-shadow-sm relative inline-block">
              Directory
              <span className="absolute -bottom-2 left-0 w-8 h-[3px] bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400 rounded-full"></span>
            </h4>
            <ul className="space-y-4 font-caption text-caption">
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Hotels & Resorts</span></Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Restaurants & Dining</span></Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Travel & Transport</span></Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group"><ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" /><span className="group-hover:translate-x-1 transition-all inline-block">Add Your Business</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-label-md uppercase tracking-wider drop-shadow-sm relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-[3px] bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400 rounded-full"></span>
            </h4>
            <ul className="space-y-5 font-caption text-caption text-slate-400">
              <li className="flex items-start gap-3 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span className="leading-relaxed mt-1 group-hover:text-white transition-colors">Sindhudurg, Maharashtra,<br/>India</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <a href="mailto:hello@mazosindhudurg.com" className="hover:text-white transition-colors mt-1">hello@mazosindhudurg.com</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <a href="tel:+911234567890" className="hover:text-white transition-colors mt-1">+91 123 456 7890</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-caption text-caption text-slate-500">
          <p>&copy; {currentYear} Mazo Sindhudurg. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
