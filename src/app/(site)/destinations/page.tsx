'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Search, ArrowRight, Compass, Waves, Shield, Trees, Landmark } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/utils';

const DESTINATIONS = [
  {
    name: 'Malvan',
    slug: 'malvan',
    type: 'Beach Town & Water Sports',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    tagline: 'Historic Sindhudurg fort, scuba diving, and authentic Malvani seafood.',
    attractionsCount: '15+ Attractions',
    highlights: ['Sindhudurg Fort', 'Scuba Diving & Snorkeling', 'Malvan Market']
  },
  {
    name: 'Tarkarli',
    slug: 'tarkarli',
    type: 'Beach & Backwaters',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    tagline: 'Pristine white sand beaches where Karli river meets the Arabian Sea.',
    attractionsCount: '10+ Attractions',
    highlights: ['Tarkarli Beach', 'Devbagh Sangam', 'Houseboat Stays']
  },
  {
    name: 'Vengurla',
    slug: 'vengurla',
    type: 'Secluded Beaches & Temples',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    tagline: 'Lush cashew groves, tranquil shores, and colonial lighthouse views.',
    attractionsCount: '12+ Attractions',
    highlights: ['Vengurla Rocks', 'Mochemad Beach', 'Shiroda Beach']
  },
  {
    name: 'Amboli',
    slug: 'amboli',
    type: 'Hill Station & Waterfalls',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    tagline: 'South Maharashtra’s rainiest hill station with cascading waterfalls.',
    attractionsCount: '8+ Attractions',
    highlights: ['Amboli Waterfalls', 'Sunset Point', 'Hiranyakeshi Temple']
  },
  {
    name: 'Devgad',
    slug: 'devgad',
    type: 'Forts & Mango Country',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f',
    tagline: 'World-famous Alphonso mangoes, coastal windmills, and sea forts.',
    attractionsCount: '9+ Attractions',
    highlights: ['Devgad Fort', 'Windmills Garden', 'Kunkeshwar Temple']
  },
  {
    name: 'Sawantwadi',
    slug: 'sawantwadi',
    type: 'Culture & Royal Heritage',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    tagline: 'Royal palace, handcrafted wooden lacquerware toys, and Moti Talao lake.',
    attractionsCount: '7+ Attractions',
    highlights: ['Sawantwadi Palace', 'Moti Talao', 'Ganjifa Art']
  }
];

export default function DestinationsIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredDestinations = DESTINATIONS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || d.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-widest">
            Explore Konkan Coast
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Destinations in <span className="text-primary">Sindhudurg</span>
          </h1>
          <p className="text-slate-600 font-medium text-base md:text-lg">
            From historic sea forts and underwater coral reefs to misty monsoon hill stations.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mt-10 max-w-2xl mx-auto space-y-4">
          <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200/80 p-2">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              placeholder="Search destinations (e.g. Malvan, Amboli, Forts)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-transparent text-sm font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Beach', 'Waterfalls', 'Forts', 'Culture'].map((category) => (
              <button
                key={category}
                onClick={() => setFilterType(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterType === category
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/80 hover:border-primary/40 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col"
            >
              <Link href={`/destinations/${dest.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                <Image
                  src={getOptimizedImageUrl(dest.image, 800)}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-primary tracking-wider shadow-sm">
                    {dest.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <h2 className="text-2xl font-black">{dest.name}</h2>
                    <p className="text-xs text-white/80 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-primary" /> Sindhudurg, Maharashtra
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20">
                    {dest.attractionsCount}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  {dest.tagline}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Highlights</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.map((h) => (
                      <span key={h} className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/destinations/${dest.slug}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-primary text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md group-hover:shadow-lg active:scale-98 mt-4"
                >
                  <span>Explore {dest.name}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
