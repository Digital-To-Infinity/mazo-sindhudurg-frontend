// @ts-nocheck
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin, Calendar, Clock, Compass, ShieldCheck, Share2, ArrowLeft,
  Navigation, Utensils, BedDouble, Waves, Sun, Phone, CheckCircle2, ChevronRight
} from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/utils';

export interface DestinationData {
  id?: string | number;
  slug: string;
  name: string;
  tagline: string;
  type: string;
  heroImage: string;
  description: string;
  bestTimeToVisit: string;
  nearestAirport: string;
  nearestRailway: string;
  attractions: { title: string; type: string; image: string; desc: string }[];
  localFood: string[];
  staysCount: string;
}

export default function DestinationDetail({ data }: { data: DestinationData }) {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Destination link copied to clipboard!');
  };

  return (
    <article className="min-h-screen bg-slate-50 pt-24 pb-20 font-body-md text-on-surface">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 hover:text-primary transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Destinations
        </Link>
        <button
          onClick={handleShare}
          className="p-2.5 rounded-full bg-white text-slate-600 hover:text-primary border border-slate-200 shadow-sm cursor-pointer transition-colors"
          title="Share Destination"
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-6">
        <div className="relative aspect-[21/9] min-h-[320px] rounded-[3rem] overflow-hidden shadow-2xl border border-white">
          <Image
            src={getOptimizedImageUrl(data.heroImage, 1600)}
            alt={data.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-primary/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white">
                {data.type}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/30 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400" /> Verified Destination
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">{data.name}</h1>
            <p className="text-white/90 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              {data.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Quick Stats + Overview + Attractions */}
        <div className="lg:col-span-8 space-y-8">

          {/* Travel Info Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <Sun size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Best Season</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{data.bestTimeToVisit}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Navigation size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Nearest Airport</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{data.nearestAirport}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Compass size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Railway Station</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{data.nearestRailway}</p>
              </div>
            </div>
          </div>

          {/* Overview Article */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">About {data.name}</h2>
            <div
              className="text-slate-600 text-sm leading-relaxed space-y-4 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          {/* Top Attractions */}
          {data.attractions && data.attractions.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Top Places in {data.name}</h2>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{data.attractions.length} Places</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.attractions.map((att, idx) => (
                  <div key={idx} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={getOptimizedImageUrl(att.image, 600)}
                        alt={att.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase text-primary tracking-wider">
                        {att.type}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">{att.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{att.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Local Food + Stays CTA + Quick Links */}
        <div className="lg:col-span-4 space-y-8">

          {/* Local Cuisine */}
          {data.localFood && data.localFood.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Utensils size={18} />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Local Food Specialities</h3>
              </div>
              <ul className="space-y-2.5">
                {data.localFood.map((food, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hotels & Accommodations Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
              <BedDouble size={20} />
            </div>
            <h3 className="text-xl font-black">Stays in {data.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Explore beachfront resorts, homestays, and budget hotels in {data.name}.
            </p>
            <Link
              href={`/hotels/${data.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Explore Stays ({data.staysCount})</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Add Business CTA */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-3xl border border-teal-100 space-y-3">
            <h4 className="text-sm font-black text-slate-900">Own a business in {data.name}?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              List your hotel, restaurant, or water sports activity to reach thousands of travelers.
            </p>
            <Link
              href="/add-business"
              className="inline-block text-xs font-black text-primary hover:underline uppercase tracking-wider pt-1"
            >
              Add Your Business &rarr;
            </Link>
          </div>

        </div>
      </section>
    </article>
  );
}
