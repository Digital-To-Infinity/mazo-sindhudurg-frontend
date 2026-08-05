"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Grid, Compass, BedDouble, Utensils, Waves, Car, ShoppingBag, Heart, Phone, MessageCircle, ArrowRight, CheckCircle2, Shield, Anchor, Bell, ChevronDown } from 'lucide-react';

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedTaluka, setSelectedTaluka] = useState("All Talukas");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <main className="font-body-md text-body-md bg-surface text-on-surface overflow-x-hidden pb-20">
      
      {/* 1. Hero with search */}
      <section className="relative w-full min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] flex flex-col justify-center mt-16 lg:mt-20 pb-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-90" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJx8-0V-1sB1VX5Hg6Vi6DAR_OFKiEQQCHPgM15CZyBqm2NNz1v-U5M957Fm3IwQGUmMymnhUS3vbJQIdaoTbMp3Oh9m6iGd4pshrV9nOQZJCe2dDPkqh3f9nP6j8j5_QkZNyvP6Fnx0rORY7_XqBinKLbLmy5qu3sy6cr1aVfZPah0D3xH53RSnMo_sTA0SmruRj3cApF-dJ1Vb_XAPTLYjc2lvJmVeIgaEE5RaLZWHhtw_J-bHpV')",
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
          }}
        ></div>
        {/* Gradient overlay blending into transparency at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-transparent z-10"></div>
        
        <div className="relative z-20 px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col items-center text-center space-y-8">
          <div className="space-y-3 max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg leading-tight">
              Discover Sindhudurg <br className="hidden sm:block" /> Like a Local
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-xl mx-auto font-medium tracking-wide drop-shadow-sm">
              Explore authentic places, trusted businesses, events and stories across the Konkan coast.
            </p>
          </div>

          {/* Search Panel - Horizontal on desktop, stacked on mobile */}
          <div className="bg-surface-container-lowest w-full max-w-3xl mx-auto rounded-2xl md:rounded-full p-1.5 shadow-2xl flex flex-col md:flex-row gap-1 relative z-50">
            <div className="flex-[1.2] flex items-center gap-2 px-4 py-2.5 md:py-2 md:border-r border-surface-variant focus-within:ring-2 focus-within:ring-primary/20 rounded-t-xl md:rounded-l-full md:rounded-tr-none transition-all bg-transparent">
              <Search className="w-4 h-4 text-primary shrink-0" />
              <input type="text" placeholder="Keyword search..." className="w-full bg-transparent border-none focus:ring-0 text-on-surface text-sm font-medium p-0 placeholder:text-outline" />
            </div>
            
            {/* Taluka Dropdown */}
            <div className="flex-1 relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'taluka' ? null : 'taluka')}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 md:py-3.5 md:border-r border-surface-variant hover:bg-surface-container-low transition-colors text-left"
              >
                <div className="flex items-center gap-2 flex-1 overflow-hidden">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-on-surface truncate">{selectedTaluka}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-outline shrink-0 transition-transform duration-300 ${activeDropdown === 'taluka' ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {activeDropdown === 'taluka' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                  {["All Talukas", "Malvan", "Devgad", "Vengurla", "Kudal", "Sawantwadi"].map(item => (
                    <button 
                      key={item}
                      onClick={() => { setSelectedTaluka(item); setActiveDropdown(null); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/5 hover:text-primary ${selectedTaluka === item ? 'text-primary bg-primary/10 font-bold' : 'text-on-surface font-medium'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="flex-1 relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 md:py-3.5 md:border-r border-surface-variant hover:bg-surface-container-low transition-colors text-left"
              >
                <div className="flex items-center gap-2 flex-1 overflow-hidden">
                  <Grid className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-on-surface truncate">{selectedCategory}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-outline shrink-0 transition-transform duration-300 ${activeDropdown === 'category' ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {activeDropdown === 'category' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                  {["All Categories", "Places & Beaches", "Hotels & Resorts", "Restaurants & Dining", "Water Sports", "Temples"].map(item => (
                    <button 
                      key={item}
                      onClick={() => { setSelectedCategory(item); setActiveDropdown(null); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/5 hover:text-primary ${selectedCategory === item ? 'text-primary bg-primary/10 font-bold' : 'text-on-surface font-medium'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="bg-primary hover:bg-primary/90 active:scale-95 text-on-primary px-8 py-3.5 md:py-2 rounded-xl md:rounded-full text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 mt-1 md:mt-0 shadow-lg shadow-primary/30">
              <Compass className="w-4 h-4" /> Explore
            </button>
          </div>

          {/* Click away listener overlay */}
          {activeDropdown && (
            <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
          )}

          {/* Quick Category Links */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar w-full justify-start md:justify-center pb-4 px-4 md:px-0">
            <button className="group flex items-center gap-2 bg-black/40 hover:bg-primary active:bg-primary-dark backdrop-blur-md text-white px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/50 border border-white/10">
              <Waves className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform" /> Beaches
            </button>
            <button className="group flex items-center gap-2 bg-black/40 hover:bg-primary active:bg-primary-dark backdrop-blur-md text-white px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/50 border border-white/10">
              <BedDouble className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform" /> Hotels
            </button>
            <button className="group flex items-center gap-2 bg-black/40 hover:bg-primary active:bg-primary-dark backdrop-blur-md text-white px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/50 border border-white/10">
              <Shield className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform" /> Forts
            </button>
            <button className="group flex items-center gap-2 bg-black/40 hover:bg-primary active:bg-primary-dark backdrop-blur-md text-white px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/50 border border-white/10">
              <Anchor className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform" /> Water Sports
            </button>
            <button className="group flex items-center gap-2 bg-black/40 hover:bg-primary active:bg-primary-dark backdrop-blur-md text-white px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/50 border border-white/10">
              <Bell className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform" /> Temples
            </button>
          </div>
        </div>
      </section>

      {/* 4. Explore by Taluka */}
      <section id="explore" className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Explore by Taluka</h2>
            <p className="text-on-surface-variant font-body-md mt-1">Discover unique regions across the Sindhudurg district.</p>
          </div>
          <Link href="/destinations" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
            Explore All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Malvan", places: "120+", image: "/images/talukas/malvan.jpg" },
            { name: "Devgad", places: "85+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1-h8geDv2vhE5Sl-jN3hlaBJ60nbyOyMIatZI9rGAuIp_PKTitZ4nQZSNb30YQ-cjB9sLQ1dBHOMTs7ivqRNaUvANQpiSuKyHmj2OVgGXKhBr88HG3DeGWNnB9Rl6V2ADAUXe-o6hQ2JzLr3QFc4hknXIFsad25K3GO0aqx_S3sTd5jwkkG_JSsIsuhj_sbvlcXY00oV_ll_Fgvnaj_lmazMOVS5I09iZXN78E05nuxzIu0ZXXu90" },
            { name: "Vengurla", places: "64+", image: "/images/talukas/vengurla.jpg" },
            { name: "Kudal", places: "52+", image: "/images/talukas/kudal.jpg" },
            { name: "Sawantwadi", places: "48+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApJVk9apiDHnHk8Lg0xINi2c12OLy4EXDDmb3hrjnqVfH6TUwZ2X3bxz7QCbShLIqOVW3f6BHNF5WYi7QwyTLeUC2BX9aosiuf6kWtmOGJuu1m81NcDdrqvnQXLnbu4IQEM7kUd9BAV7_LZs7RareHum_RLCMCX4Wqa-mLIQxZUjuQvE_gZI7BV9j9VORjP2UkgYzEvQssZOsRAX5l6eugCoCIvMGfbX6BHJrsdTHeexyOWNWdNuOA" },
            { name: "Kankavli", places: "34+", image: "/images/talukas/kankavli.jpg" },
            { name: "Dodamarg", places: "21+", image: "/images/talukas/dodamarg.jpg" },
            { name: "Vaibhavwadi", places: "19+", image: "/images/talukas/vaibhavwadi.jpg" },
          ].map((taluka, idx) => (
            <Link href={`/destinations/${taluka.name.toLowerCase()}`} key={idx} className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm block bg-surface-container hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${taluka.image}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                <div className="transform transition-transform duration-500 group-hover:translate-x-2">
                  <h3 className="text-white font-bold text-body-lg">{taluka.name}</h3>
                  <p className="text-white/80 font-caption text-caption mt-0.5">{taluka.places} Places</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/destinations" className="sm:hidden mt-6 block text-center py-3 text-primary border border-primary rounded-lg font-label-md text-label-md active:scale-95 transition-transform">Explore All Talukas</Link>
      </section>

      {/* 5. Popular Places */}
      <section id="places" className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto bg-surface-container-low rounded-3xl mb-stack-lg">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Popular Places</h2>
            <p className="text-on-surface-variant font-body-md mt-1">Handpicked favorite destinations for your next adventure.</p>
          </div>
          <Link href="/destinations" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline group">
            View All <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Sindhudurg Fort", category: "Historic Fort", location: "Malvan", info: "Best season: Oct - May", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1-h8geDv2vhE5Sl-jN3hlaBJ60nbyOyMIatZI9rGAuIp_PKTitZ4nQZSNb30YQ-cjB9sLQ1dBHOMTs7ivqRNaUvANQpiSuKyHmj2OVgGXKhBr88HG3DeGWNnB9Rl6V2ADAUXe-o6hQ2JzLr3QFc4hknXIFsad25K3GO0aqx_S3sTd5jwkkG_JSsIsuhj_sbvlcXY00oV_ll_Fgvnaj_lmazMOVS5I09iZXN78E05nuxzIu0ZXXu90" },
            { title: "Bogwe Beach", category: "Beach", location: "Vengurla", info: "Recommended: 2-3 hours", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXkH49HHK3DRpqq_Ir9I6UK80Fz6yxlDwS2zmn54WSqp3XA6_RV_3o8y0P2FWgL6_TzQi4hask7aMojJ_mr5cYfIraOzOf38oAz3KAk22yslkdKXkX5c1X1IWapm1Qy_mOHvhI41R4YxIZ2E1J6cmcxBLQ60mvjM6_rBMAS2EqHYV6nRMXwKtwKWyMtUE2_Ssj5LaOMOldrHxeC-l5pnVI15XcwWqH6dh1avzAUJPUe8feQVj48ozN" },
            { title: "Amboli Ghat", category: "Nature", location: "Sawantwadi", info: "Best season: Monsoon", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXWjGUbIf7tgf7h4lYjzmKnu0CV11_uXWP_oicuE71txUApcsHlEfD7BH30L-VF9W2s5WZD2ETqc1gkziOchfkFt1QUqLAnHDHs35d7SvVN3m569_mK4ZgXSbPOZnwJJd8tT7DjU82LjqA6jkox573rAzs9_6DEjnjy3x6R5c5wgLv6Kuo6mKyWW5ahXrK2BR5NorWXH0u-W0nxXfBdoLKGSOASKKn5DlBV_eoNcbqj7Qytk2lkcPV" },
            { title: "Tarkarli Scuba", category: "Water Sports", location: "Malvan", info: "Activity duration: 4 hours", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjABiIeR1fsCaPV8JGFa1EfNq1Y20A1oZBQHl3EIGv-7w_1hvJpwpRdG0s5Ffp0PrcBHQbJSsVf9G8ASKtXDOnNQI9d7mjJofzIBhm3izAVNNeHt_8NNuN4xQOfWnd0t5LTP2C_uyDxO4j7PG4Wesb4T1x-fBE2oJNBAUzG4QdpkxyH-ZPa3c7I1ySuaOcX3IGIx-pRs8LyrQSUYqE4LYJldqAWLz-k-KggTiYvRfB68KBQsrW1HW" }
          ].map((place, idx) => (
            <Link key={idx} href={`/destinations/${place.location.toLowerCase()}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 block">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${place.image}')` }}></div>
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded shadow-sm transform transition-transform group-hover:scale-105 group-hover:bg-primary group-hover:text-white duration-300">
                  <span className="text-[10px] font-label-md uppercase tracking-wider group-hover:text-white text-secondary transition-colors">{place.category}</span>
                </div>
              </div>
              <div className="p-5 space-y-2 bg-gradient-to-t from-surface-container-lowest to-surface-container-lowest group-hover:from-primary/5 transition-colors duration-500 h-full">
                <h3 className="font-bold text-on-surface text-body-lg line-clamp-1 group-hover:text-primary transition-colors">{place.title}</h3>
                <div className="flex items-center text-outline gap-1 transform transition-transform group-hover:translate-x-1 duration-300">
                  <MapPin className="w-4 h-4 shrink-0 text-primary/70" />
                  <span className="font-caption text-caption truncate">{place.location}</span>
                </div>
                <p className="text-on-surface-variant font-caption text-caption pt-3 border-t border-surface-variant group-hover:border-primary/20 transition-colors">{place.info}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Directory Categories */}
      <section id="directory" className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-md text-headline-md text-primary mb-8 text-center">Local Directory</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { title: "Hotels", icon: BedDouble },
            { title: "Dining", icon: Utensils },
            { title: "Sports", icon: Waves },
            { title: "Travel", icon: Car },
            { title: "Markets", icon: ShoppingBag },
            { title: "Wellness", icon: Heart }
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link key={idx} href={`/search?q=${cat.title.toLowerCase()}`} className="group flex flex-col items-center p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant hover:shadow-xl hover:shadow-primary/10 hover:border-primary hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 mb-4 shadow-sm group-hover:shadow-md">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="font-label-md text-label-md text-on-surface text-center group-hover:text-primary transition-colors">{cat.title}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 7. Featured Businesses */}
      <section id="businesses" className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Featured Businesses</h2>
            <p className="text-on-surface-variant font-body-md mt-1">Trusted stays and services recommended for you.</p>
          </div>
          <Link href="/search" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline group">
            View Directory <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Blue Water Beach Resort", category: "Resort", location: "Tarkarli, Malvan", verified: true, desc: "Luxury beachfront resort offering premium amenities and direct beach access.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ysLeccu6T784DYXUcJWmr8FG0VXohvAvEDcLYzYulz605BHbTDrSQlpZRZFnXB2gRX_trtpjGNQd5KI1YB6cz-4ryO9cSlb8_exXX1mrZYnqOkmcv2R9Acf1dSFDdlPxkfWJbYt0waNK-KSrU_8wjaeUXPwB3om0_Yxd4ixMJMjj99ButpmqIJ39VGNf6Ccyyb49C8bTWUw5SbrPCLGxMh6N04XRhqegdUKQxW3GvVClxHqdKAyU" },
            { title: "Athithi Bamboo Restaurant", category: "Dining", location: "Malvan Market", verified: true, desc: "Authentic Malvani cuisine served in a traditional bamboo-themed setting.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHNUfWimkySttBtcvr2yxxlMBipeBcsJCETcCpxFzCedcQ7tsZg1EXd9g5enhqFyZGYS5bbaoXmdU-b9s8lfQ-CMuQT7XiVmCStl3aQXC2Ki67gdrK60D_u1AARii7GdCf4brd3mUSJmBpvxkmHt5AxWxprS6oSRDwRbgFCtim3OvApaRldPYhkKKWRQmhFjj9wQogWLaodhA0oKBoXO_cyYWwf7W8x4dLMAZ49xHkxZtqDVkv080" },
            { title: "Konkan Crown Resort", category: "Resort", location: "Sawantwadi", verified: false, desc: "A peaceful retreat surrounded by nature, perfect for family getaways.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1-h8geDv2vhE5Sl-jN3hlaBJ60nbyOyMIatZI9rGAuIp_PKTitZ4nQZSNb30YQ-cjB9sLQ1dBHOMTs7ivqRNaUvANQpiSuKyHmj2OVgGXKhBr88HG3DeGWNnB9Rl6V2ADAUXe-o6hQ2JzLr3QFc4hknXIFsad25K3GO0aqx_S3sTd5jwkkG_JSsIsuhj_sbvlcXY00oV_ll_Fgvnaj_lmazMOVS5I09iZXN78E05nuxzIu0ZXXu90" }
          ].map((biz, idx) => (
            <div key={idx} className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant shadow-sm flex flex-col hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500">
              <Link href={`/destinations/${biz.location.toLowerCase().split(',')[0].trim()}`} className="relative aspect-video w-full block overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${biz.image}')` }}></div>
                {biz.verified && (
                  <div className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transform transition-transform duration-300 group-hover:scale-105">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-secondary font-label-md text-[10px] uppercase tracking-wider font-bold">Verified</span>
                  </div>
                )}
              </Link>
              <div className="p-6 flex flex-col flex-1 space-y-4 bg-gradient-to-t from-surface-container-lowest to-surface-container-lowest group-hover:from-primary/5 transition-colors duration-500">
                <div className="flex-1">
                  <span className="text-primary font-label-md text-[10px] uppercase tracking-wider block mb-2 font-bold">{biz.category}</span>
                  <Link href={`/destinations/${biz.location.toLowerCase().split(',')[0].trim()}`}><h3 className="font-bold text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{biz.title}</h3></Link>
                  <div className="flex items-center text-outline gap-1.5 mt-2 transform transition-transform group-hover:translate-x-1 duration-300">
                    <MapPin className="w-4 h-4 shrink-0 text-primary/70" />
                    <span className="font-caption text-caption truncate">{biz.location}</span>
                  </div>
                  <p className="text-on-surface-variant font-body-md mt-4 line-clamp-2 leading-relaxed">{biz.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-surface-variant group-hover:border-primary/20 transition-colors">
                  <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary py-3 rounded-xl font-label-md text-label-md transition-all active:scale-95 shadow-sm hover:shadow">
                    <Phone className="w-4 h-4" /> Call
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-surface hover:bg-surface-container border border-outline-variant text-on-surface py-3 rounded-xl font-label-md text-label-md transition-all active:scale-95 shadow-sm hover:shadow">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Coastal Stories and Upcoming Events */}
      <section id="stories" className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto border-t border-surface-variant">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Coastal Stories (65%) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary">Coastal Stories</h2>
                <p className="text-on-surface-variant font-body-md mt-1">Travel guides & local insights</p>
              </div>
              <Link href="/blogs" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline group">
                View All <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Link href="/blogs" className="group flex flex-col md:flex-row gap-6 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 flex-1">
              <div className="relative aspect-[16/9] md:aspect-square md:w-2/5 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTewhLSee__uiaWTNkURuJ0O-eEsqjhW5JqFXFexjeto4X2h70Yze16BOP37wPZDCXFTRtk8Em0Ebg1-2Uq3f7WfecAHRVKOK85JpP_IfHngcHqXcqiUlJGEr0X7Sd2eBqwEs8VKV4TrStNuDj8WP0AlYLmUnNh6_HJs5B7K8ohVCT6u4ZhJSXXJaigjXyLn_f-IMkUcYAQiDK9zuyZGy0Aa4GpvuT4rDmSfFhK2K6MGr02wJCX_fL')" }}></div>
              </div>
              <div className="p-6 md:p-8 md:pl-0 flex flex-col justify-center flex-1 bg-gradient-to-l from-surface-container-lowest to-surface-container-lowest group-hover:from-primary/5 transition-colors duration-500">
                <span className="text-tertiary-container font-label-md text-[10px] uppercase tracking-wider mb-3 block font-bold transform transition-transform group-hover:translate-x-1 duration-300">Culture</span>
                <h3 className="font-bold text-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-4">The Forgotten Crafts of Sindhudurg: A Journey through Sawantwadi</h3>
                <p className="text-on-surface-variant font-body-md line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed">Discover the rich heritage of wooden toy making and Ganjifa art in the historic town of Sawantwadi. Learn about the artisans who are keeping these centuries-old traditions alive against all odds.</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center font-caption text-caption text-outline gap-3">
                    <span>Oct 12, 2024</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant group-hover:bg-primary/50 transition-colors"></span>
                    <span>5 min read</span>
                  </div>
                  <span className="flex items-center gap-1 text-primary font-label-md text-label-md group-hover:underline">
                    Read Story <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Upcoming Events (35%) */}
          <div id="events" className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-headline-md text-headline-md text-primary">Upcoming Events</h2>
              <Link href="/blogs" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline group">
                View All <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { title: "Sindhudurg Food Festival", dateString: "12", month: "DEC", venue: "Malvan Beach Ground", time: "4:00 PM - 10:00 PM" },
                { title: "Coastal Marathon 2024", dateString: "24", month: "DEC", venue: "Tarkarli Coast", time: "6:00 AM - 11:00 AM" },
                { title: "Sawantwadi Arts Fair", dateString: "05", month: "JAN", venue: "Moti Talao", time: "10:00 AM - 8:00 PM" },
                { title: "Devgad Mango Festival", dateString: "15", month: "APR", venue: "Devgad City Ground", time: "9:00 AM - 9:00 PM" }
              ].map((ev, idx) => (
                <Link key={idx} href="/blogs" className="group flex items-start gap-4 p-4 md:p-5 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center bg-primary-fixed text-on-primary-fixed rounded-xl w-14 h-14 md:w-16 md:h-16 shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-2 shadow-sm group-hover:shadow-md">
                    <span className="font-headline-md text-headline-md leading-none font-bold">{ev.dateString}</span>
                    <span className="font-label-md text-[10px] uppercase tracking-wider mt-1">{ev.month}</span>
                  </div>
                  <div className="flex-1 space-y-1.5 pt-0.5">
                    <h3 className="font-bold text-on-surface font-body-lg group-hover:text-primary transition-colors line-clamp-1">{ev.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center font-caption text-caption text-outline gap-y-1 sm:gap-3 transform transition-transform group-hover:translate-x-1 duration-300">
                      <span className="text-primary/80">{ev.venue}</span>
                      <span className="hidden sm:inline text-outline-variant">•</span>
                      <span>{ev.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. Add Business CTA */}
      <section className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          {/* Subtle texture/graphic using CSS repeating pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-primary tracking-tight">Grow Your Business Across Sindhudurg</h2>
            <p className="text-primary-fixed font-body-lg md:text-xl">
              Join the official local-discovery platform. Increase your visibility, connect with travelers, and establish your trusted presence.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-primary-fixed font-label-md text-label-md mb-8">
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Reach local customers</div>
              <div className="flex items-center gap-2"><Search className="w-5 h-5" /> Get discovered by travelers</div>
              <div className="flex items-center gap-2"><Grid className="w-5 h-5" /> Manage your information</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/add-business" className="w-full sm:w-auto bg-on-primary hover:bg-surface-container text-primary font-bold py-4 px-8 rounded-xl transition-colors shadow-lg inline-block">
                Add Your Business
              </Link>
              <Link href="/add-business" className="w-full sm:w-auto bg-transparent border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-primary font-bold py-4 px-8 rounded-xl transition-colors inline-block">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
