import React from 'react';
import Link from 'next/link';
import { Search, MapPin, Grid, Compass, BedDouble, Utensils, Waves, Car, ShoppingBag, Heart, Phone, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="font-body-md text-body-md bg-surface text-on-surface overflow-x-hidden pb-20">
      
      {/* 1. Hero with search */}
      <section className="relative w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex flex-col justify-center mt-16 lg:mt-20">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJx8-0V-1sB1VX5Hg6Vi6DAR_OFKiEQQCHPgM15CZyBqm2NNz1v-U5M957Fm3IwQGUmMymnhUS3vbJQIdaoTbMp3Oh9m6iGd4pshrV9nOQZJCe2dDPkqh3f9nP6j8j5_QkZNyvP6Fnx0rORY7_XqBinKLbLmy5qu3sy6cr1aVfZPah0D3xH53RSnMo_sTA0SmruRj3cApF-dJ1Vb_XAPTLYjc2lvJmVeIgaEE5RaLZWHhtw_J-bHpV')" }}></div>
        {/* Stronger navy overlay */}
        <div className="absolute inset-0 bg-primary/70 z-10"></div>
        
        <div className="relative z-20 px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-4xl">
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white drop-shadow-md">
              Discover Sindhudurg Like a Local
            </h1>
            <p className="text-white/90 font-body-lg max-w-2xl mx-auto">
              Explore authentic places, trusted businesses, events and stories across the Konkan coast.
            </p>
          </div>

          {/* Search Panel - Horizontal on desktop, stacked on mobile */}
          <div className="bg-surface-container-lowest w-full max-w-4xl mx-auto rounded-2xl md:rounded-full p-2 shadow-xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 md:border-r border-surface-variant">
              <Search className="w-5 h-5 text-outline shrink-0" />
              <input type="text" placeholder="Keyword search..." className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body-md p-0" />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 border-t md:border-t-0 md:border-r border-surface-variant">
              <MapPin className="w-5 h-5 text-outline shrink-0" />
              <select className="w-full bg-transparent border-none focus:ring-0 text-on-surface p-0 font-body-md appearance-none cursor-pointer">
                <option value="">All Talukas</option>
                <option value="malvan">Malvan</option>
                <option value="devgad">Devgad</option>
                <option value="vengurla">Vengurla</option>
                <option value="kudal">Kudal</option>
              </select>
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 border-t md:border-t-0 border-surface-variant">
              <Grid className="w-5 h-5 text-outline shrink-0" />
              <select className="w-full bg-transparent border-none focus:ring-0 text-on-surface p-0 font-body-md appearance-none cursor-pointer">
                <option value="">All Categories</option>
                <option value="places">Places</option>
                <option value="hotels">Hotels</option>
                <option value="restaurants">Restaurants</option>
              </select>
            </div>
            <button className="bg-primary hover:opacity-90 text-on-primary px-8 py-4 md:py-2 rounded-xl md:rounded-full font-label-md text-label-md transition-opacity flex items-center justify-center gap-2 mt-2 md:mt-0">
              <Compass className="w-5 h-5" /> Explore
            </button>
          </div>

          {/* Quick Category Links */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar w-full justify-start md:justify-center pb-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors">Beaches</button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors">Hotels</button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors">Forts</button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors">Water Sports</button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors">Temples</button>
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
          <Link href="#" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
            Explore All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Malvan", places: "120+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjABiIeR1fsCaPV8JGFa1EfNq1Y20A1oZBQHl3EIGv-7w_1hvJpwpRdG0s5Ffp0PrcBHQbJSsVf9G8ASKtXDOnNQI9d7mjJofzIBhm3izAVNNeHt_8NNuN4xQOfWnd0t5LTP2C_uyDxO4j7PG4Wesb4T1x-fBE2oJNBAUzG4QdpkxyH-ZPa3c7I1ySuaOcX3IGIx-pRs8LyrQSUYqE4LYJldqAWLz-k-KggTiYvRfB68KBQsrW1HW" },
            { name: "Devgad", places: "85+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApJVk9apiDHnHk8Lg0xINi2c12OLy4EXDDmb3hrjnqVfH6TUwZ2X3bxz7QCbShLIqOVW3f6BHNF5WYi7QwyTLeUC2BX9aosiuf6kWtmOGJuu1m81NcDdrqvnQXLnbu4IQEM7kUd9BAV7_LZs7RareHum_RLCMCX4Wqa-mLIQxZUjuQvE_gZI7BV9j9VORjP2UkgYzEvQssZOsRAX5l6eugCoCIvMGfbX6BHJrsdTHeexyOWNWdNuOA" },
            { name: "Vengurla", places: "64+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiRQRdqA6rd888cHr_3d4p4edXwQESay0vnzG-iVQ30crWydREmCBYLAndBj7B95WF2dg6cYHym8Vs1vuI_Xbzjicsc-vdxNFccGC6PBd5HlIqhd_IZpPCu-CFWKm1mQXHhbR2wLn0kr5wWi1odK_amFSLzOLowNxgTxgky-xH1soWQn8zby38qULNXB5wSgZOJs1t-W-wHtOaD6ivF5uwcGHpp4_4YgW-s2pWJ5gJqc8hyufMTcuu" },
            { name: "Kudal", places: "52+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcQW-DLtKE9BMM37YXzr26y7LXialcq_Nx1bP_o2judZkY9PXJzBiPpdWxNcMMewk19zWFo_RMHinS1xnh9vWl1YFRKWKpCh7Mg6IcNAfm4oGVXkHoymMov97zexJpDIepKCieXiYKDCVEK8DCrVpTE0-vWY7csEUHXiPyM2dSge9mZ_obr6GnuClGcGZuw0U5-sqDvTbUmdYh2yGkQ0AfKC5Zjwf8EnGTRhjav4U-L9yTF3gFUoxt" },
            { name: "Sawantwadi", places: "48+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjABiIeR1fsCaPV8JGFa1EfNq1Y20A1oZBQHl3EIGv-7w_1hvJpwpRdG0s5Ffp0PrcBHQbJSsVf9G8ASKtXDOnNQI9d7mjJofzIBhm3izAVNNeHt_8NNuN4xQOfWnd0t5LTP2C_uyDxO4j7PG4Wesb4T1x-fBE2oJNBAUzG4QdpkxyH-ZPa3c7I1ySuaOcX3IGIx-pRs8LyrQSUYqE4LYJldqAWLz-k-KggTiYvRfB68KBQsrW1HW" },
            { name: "Kankavli", places: "34+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApJVk9apiDHnHk8Lg0xINi2c12OLy4EXDDmb3hrjnqVfH6TUwZ2X3bxz7QCbShLIqOVW3f6BHNF5WYi7QwyTLeUC2BX9aosiuf6kWtmOGJuu1m81NcDdrqvnQXLnbu4IQEM7kUd9BAV7_LZs7RareHum_RLCMCX4Wqa-mLIQxZUjuQvE_gZI7BV9j9VORjP2UkgYzEvQssZOsRAX5l6eugCoCIvMGfbX6BHJrsdTHeexyOWNWdNuOA" },
            { name: "Dodamarg", places: "21+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiRQRdqA6rd888cHr_3d4p4edXwQESay0vnzG-iVQ30crWydREmCBYLAndBj7B95WF2dg6cYHym8Vs1vuI_Xbzjicsc-vdxNFccGC6PBd5HlIqhd_IZpPCu-CFWKm1mQXHhbR2wLn0kr5wWi1odK_amFSLzOLowNxgTxgky-xH1soWQn8zby38qULNXB5wSgZOJs1t-W-wHtOaD6ivF5uwcGHpp4_4YgW-s2pWJ5gJqc8hyufMTcuu" },
            { name: "Vaibhavwadi", places: "19+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcQW-DLtKE9BMM37YXzr26y7LXialcq_Nx1bP_o2judZkY9PXJzBiPpdWxNcMMewk19zWFo_RMHinS1xnh9vWl1YFRKWKpCh7Mg6IcNAfm4oGVXkHoymMov97zexJpDIepKCieXiYKDCVEK8DCrVpTE0-vWY7csEUHXiPyM2dSge9mZ_obr6GnuClGcGZuw0U5-sqDvTbUmdYh2yGkQ0AfKC5Zjwf8EnGTRhjav4U-L9yTF3gFUoxt" },
          ].map((taluka, idx) => (
            <Link href="#" key={idx} className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm block bg-surface-container hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${taluka.image}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-white font-bold text-body-lg">{taluka.name}</h3>
                  <p className="text-white/80 font-caption text-caption mt-0.5">{taluka.places} Places</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="#" className="sm:hidden mt-6 block text-center py-3 text-primary border border-primary rounded-lg font-label-md text-label-md">Explore All Talukas</Link>
      </section>

      {/* 5. Popular Places */}
      <section id="places" className="py-stack-lg px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto bg-surface-container-low rounded-3xl mb-stack-lg">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Popular Places</h2>
            <p className="text-on-surface-variant font-body-md mt-1">Handpicked favorite destinations for your next adventure.</p>
          </div>
          <Link href="#" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Sindhudurg Fort", category: "Historic Fort", location: "Malvan", info: "Best season: Oct - May", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1-h8geDv2vhE5Sl-jN3hlaBJ60nbyOyMIatZI9rGAuIp_PKTitZ4nQZSNb30YQ-cjB9sLQ1dBHOMTs7ivqRNaUvANQpiSuKyHmj2OVgGXKhBr88HG3DeGWNnB9Rl6V2ADAUXe-o6hQ2JzLr3QFc4hknXIFsad25K3GO0aqx_S3sTd5jwkkG_JSsIsuhj_sbvlcXY00oV_ll_Fgvnaj_lmazMOVS5I09iZXN78E05nuxzIu0ZXXu90" },
            { title: "Bogwe Beach", category: "Beach", location: "Vengurla", info: "Recommended: 2-3 hours", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXkH49HHK3DRpqq_Ir9I6UK80Fz6yxlDwS2zmn54WSqp3XA6_RV_3o8y0P2FWgL6_TzQi4hask7aMojJ_mr5cYfIraOzOf38oAz3KAk22yslkdKXkX5c1X1IWapm1Qy_mOHvhI41R4YxIZ2E1J6cmcxBLQ60mvjM6_rBMAS2EqHYV6nRMXwKtwKWyMtUE2_Ssj5LaOMOldrHxeC-l5pnVI15XcwWqH6dh1avzAUJPUe8feQVj48ozN" },
            { title: "Amboli Ghat", category: "Nature", location: "Sawantwadi", info: "Best season: Monsoon", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXWjGUbIf7tgf7h4lYjzmKnu0CV11_uXWP_oicuE71txUApcsHlEfD7BH30L-VF9W2s5WZD2ETqc1gkziOchfkFt1QUqLAnHDHs35d7SvVN3m569_mK4ZgXSbPOZnwJJd8tT7DjU82LjqA6jkox573rAzs9_6DEjnjy3x6R5c5wgLv6Kuo6mKyWW5ahXrK2BR5NorWXH0u-W0nxXfBdoLKGSOASKKn5DlBV_eoNcbqj7Qytk2lkcPV" },
            { title: "Tarkarli Scuba", category: "Water Sports", location: "Malvan", info: "Activity duration: 4 hours", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjABiIeR1fsCaPV8JGFa1EfNq1Y20A1oZBQHl3EIGv-7w_1hvJpwpRdG0s5Ffp0PrcBHQbJSsVf9G8ASKtXDOnNQI9d7mjJofzIBhm3izAVNNeHt_8NNuN4xQOfWnd0t5LTP2C_uyDxO4j7PG4Wesb4T1x-fBE2oJNBAUzG4QdpkxyH-ZPa3c7I1ySuaOcX3IGIx-pRs8LyrQSUYqE4LYJldqAWLz-k-KggTiYvRfB68KBQsrW1HW" }
          ].map((place, idx) => (
            <Link key={idx} href="#" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${place.image}')` }}></div>
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                  <span className="text-[10px] font-label-md uppercase tracking-wider text-secondary">{place.category}</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-on-surface text-body-lg line-clamp-1">{place.title}</h3>
                <div className="flex items-center text-outline gap-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="font-caption text-caption truncate">{place.location}</span>
                </div>
                <p className="text-on-surface-variant font-caption text-caption pt-2 border-t border-surface-variant">{place.info}</p>
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
              <Link key={idx} href="#" className="group flex flex-col items-center p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary group-hover:text-on-primary transition-colors mb-4">
                  <Icon className="w-6 h-6" />
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
          <Link href="#" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
            View Directory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Blue Water Beach Resort", category: "Resort", location: "Tarkarli, Malvan", verified: true, desc: "Luxury beachfront resort offering premium amenities and direct beach access.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ysLeccu6T784DYXUcJWmr8FG0VXohvAvEDcLYzYulz605BHbTDrSQlpZRZFnXB2gRX_trtpjGNQd5KI1YB6cz-4ryO9cSlb8_exXX1mrZYnqOkmcv2R9Acf1dSFDdlPxkfWJbYt0waNK-KSrU_8wjaeUXPwB3om0_Yxd4ixMJMjj99ButpmqIJ39VGNf6Ccyyb49C8bTWUw5SbrPCLGxMh6N04XRhqegdUKQxW3GvVClxHqdKAyU" },
            { title: "Athithi Bamboo Restaurant", category: "Dining", location: "Malvan Market", verified: true, desc: "Authentic Malvani cuisine served in a traditional bamboo-themed setting.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHNUfWimkySttBtcvr2yxxlMBipeBcsJCETcCpxFzCedcQ7tsZg1EXd9g5enhqFyZGYS5bbaoXmdU-b9s8lfQ-CMuQT7XiVmCStl3aQXC2Ki67gdrK60D_u1AARii7GdCf4brd3mUSJmBpvxkmHt5AxWxprS6oSRDwRbgFCtim3OvApaRldPYhkKKWRQmhFjj9wQogWLaodhA0oKBoXO_cyYWwf7W8x4dLMAZ49xHkxZtqDVkv080" },
            { title: "Konkan Crown Resort", category: "Resort", location: "Sawantwadi", verified: false, desc: "A peaceful retreat surrounded by nature, perfect for family getaways.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1-h8geDv2vhE5Sl-jN3hlaBJ60nbyOyMIatZI9rGAuIp_PKTitZ4nQZSNb30YQ-cjB9sLQ1dBHOMTs7ivqRNaUvANQpiSuKyHmj2OVgGXKhBr88HG3DeGWNnB9Rl6V2ADAUXe-o6hQ2JzLr3QFc4hknXIFsad25K3GO0aqx_S3sTd5jwkkG_JSsIsuhj_sbvlcXY00oV_ll_Fgvnaj_lmazMOVS5I09iZXN78E05nuxzIu0ZXXu90" }
          ].map((biz, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant shadow-sm flex flex-col hover:shadow-lg transition-all duration-300">
              <Link href="#" className="relative aspect-video w-full block">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${biz.image}')` }}></div>
                {biz.verified && (
                  <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-secondary" />
                    <span className="text-secondary font-label-md text-[10px] uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </Link>
              <div className="p-5 flex flex-col flex-1 space-y-4">
                <div className="flex-1">
                  <span className="text-primary font-label-md text-[10px] uppercase tracking-wider block mb-1">{biz.category}</span>
                  <Link href="#"><h3 className="font-bold text-body-lg text-on-surface line-clamp-1 hover:text-primary transition-colors">{biz.title}</h3></Link>
                  <div className="flex items-center text-outline gap-1 mt-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="font-caption text-caption truncate">{biz.location}</span>
                  </div>
                  <p className="text-on-surface-variant font-body-md mt-3 line-clamp-2">{biz.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-surface-variant">
                  <button className="flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-on-primary py-2.5 rounded-xl font-label-md text-label-md transition-opacity">
                    <Phone className="w-4 h-4" /> Call
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-surface hover:bg-surface-container border border-outline-variant text-on-surface py-2.5 rounded-xl font-label-md text-label-md transition-colors">
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
              <Link href="#" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <Link href="#" className="group flex flex-col md:flex-row gap-6 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-lg transition-all duration-300 flex-1">
              <div className="relative aspect-[16/9] md:aspect-square md:w-2/5 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTewhLSee__uiaWTNkURuJ0O-eEsqjhW5JqFXFexjeto4X2h70Yze16BOP37wPZDCXFTRtk8Em0Ebg1-2Uq3f7WfecAHRVKOK85JpP_IfHngcHqXcqiUlJGEr0X7Sd2eBqwEs8VKV4TrStNuDj8WP0AlYLmUnNh6_HJs5B7K8ohVCT6u4ZhJSXXJaigjXyLn_f-IMkUcYAQiDK9zuyZGy0Aa4GpvuT4rDmSfFhK2K6MGr02wJCX_fL')" }}></div>
              </div>
              <div className="p-6 md:p-8 md:pl-0 flex flex-col justify-center flex-1">
                <span className="text-tertiary-container font-label-md text-[10px] uppercase tracking-wider mb-2 block">Culture</span>
                <h3 className="font-bold text-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3">The Forgotten Crafts of Sindhudurg: A Journey through Sawantwadi</h3>
                <p className="text-on-surface-variant font-body-md line-clamp-2 md:line-clamp-3 mb-6">Discover the rich heritage of wooden toy making and Ganjifa art in the historic town of Sawantwadi. Learn about the artisans who are keeping these centuries-old traditions alive against all odds.</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center font-caption text-caption text-outline gap-3">
                    <span>Oct 12, 2024</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span>5 min read</span>
                  </div>
                  <span className="text-primary font-label-md text-label-md group-hover:underline">Read Story</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Upcoming Events (35%) */}
          <div id="events" className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-headline-md text-headline-md text-primary">Upcoming Events</h2>
              <Link href="#" className="hidden sm:flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { title: "Sindhudurg Food Festival", dateString: "12", month: "DEC", venue: "Malvan Beach Ground", time: "4:00 PM - 10:00 PM" },
                { title: "Coastal Marathon 2024", dateString: "24", month: "DEC", venue: "Tarkarli Coast", time: "6:00 AM - 11:00 AM" },
                { title: "Sawantwadi Arts Fair", dateString: "05", month: "JAN", venue: "Moti Talao", time: "10:00 AM - 8:00 PM" },
                { title: "Devgad Mango Festival", dateString: "15", month: "APR", venue: "Devgad City Ground", time: "9:00 AM - 9:00 PM" }
              ].map((ev, idx) => (
                <Link key={idx} href="#" className="group flex items-start gap-4 p-4 md:p-5 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col items-center justify-center bg-primary-fixed text-on-primary-fixed rounded-xl w-14 h-14 md:w-16 md:h-16 shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="font-headline-md text-headline-md leading-none">{ev.dateString}</span>
                    <span className="font-label-md text-[10px] uppercase tracking-wider mt-1">{ev.month}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-on-surface font-body-lg group-hover:text-primary transition-colors line-clamp-1">{ev.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center font-caption text-caption text-outline gap-y-1 sm:gap-4">
                      <span>{ev.venue}</span>
                      <span className="hidden sm:inline">•</span>
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
              <button className="w-full sm:w-auto bg-on-primary hover:bg-surface-container text-primary font-bold py-4 px-8 rounded-xl transition-colors shadow-lg">
                Add Your Business
              </button>
              <button className="w-full sm:w-auto bg-transparent border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-primary font-bold py-4 px-8 rounded-xl transition-colors">
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
