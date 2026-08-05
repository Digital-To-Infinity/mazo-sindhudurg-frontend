'use client';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Search, ChevronDown } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between mx-auto max-w-container-max ${
      scrolled 
        ? 'top-2 md:top-4 w-[calc(100%-1.5rem)] lg:w-[calc(100%-3rem)] py-2 lg:py-2.5 px-5 lg:px-8 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 rounded-full' 
        : 'top-0 w-full py-4 lg:py-5 px-margin-mobile lg:px-margin-desktop bg-white border-b border-slate-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image alt="Mazo Sindhudurg Logo" width={40} height={40} className="h-8 lg:h-10 w-auto object-contain" src="/mazo-logo.png" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 font-label-md text-label-md">
          {/* Destinations */}
          <div className="relative group py-2">
            <Link href="/destinations" className="flex items-center gap-1.5 text-slate-700 hover:text-primary transition-colors font-semibold tracking-wide text-sm uppercase">
              Destinations <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            <div className="absolute left-0 top-full w-48 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
              <Link href="/destinations/malvan" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Malvan</Link>
              <Link href="/destinations/tarkarli" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Tarkarli</Link>
              <Link href="/destinations/vengurla" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Vengurla</Link>
              <Link href="/destinations/amboli" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Amboli</Link>
              <Link href="/destinations/devgad" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Devgad</Link>
            </div>
          </div>

          {/* Attractions */}
          <div className="relative group py-2">
            <Link href="/attractions" className="flex items-center gap-1.5 text-slate-700 hover:text-primary transition-colors font-semibold tracking-wide text-sm uppercase">
              Attractions <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            <div className="absolute left-0 top-full w-48 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
              <Link href="/attractions/beaches" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Beaches</Link>
              <Link href="/attractions/forts" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Forts</Link>
              <Link href="/attractions/temples" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Temples</Link>
              <Link href="/attractions/waterfalls" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Waterfalls</Link>
              <Link href="/attractions/sindhudurg-fort" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Sindhudurg Fort</Link>
              <Link href="/attractions/tarkarli-beach" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Tarkarli Beach</Link>
            </div>
          </div>

          {/* Hotels */}
          <div className="relative group py-2">
            <Link href="/hotels" className="flex items-center gap-1.5 text-slate-700 hover:text-primary transition-colors font-semibold tracking-wide text-sm uppercase">
              Hotels <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            <div className="absolute left-0 top-full w-48 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
              <Link href="/hotels/malvan" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Malvan</Link>
              <Link href="/hotels/tarkarli" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Tarkarli</Link>
              <Link href="/hotels/vengurla" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Vengurla</Link>
            </div>
          </div>

          {/* Plan Your Trip */}
          <div className="relative group py-2">
            <Link href="/plan" className="flex items-center gap-1.5 text-slate-700 hover:text-primary transition-colors font-semibold tracking-wide text-sm uppercase">
              Plan Trip <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            <div className="absolute left-0 top-full w-56 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
              <Link href="/plan/how-to-reach-sindhudurg" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">How to Reach</Link>
              <Link href="/plan/best-time-to-visit" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Best Time to Visit</Link>
              <Link href="/plan/local-transport" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Local Transport</Link>
              <Link href="/plan/safety-and-sea-conditions" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Safety & Sea Conditions</Link>
            </div>
          </div>

          {/* Guides */}
          <div className="relative group py-2">
            <Link href="/guides" className="flex items-center gap-1.5 text-slate-700 hover:text-primary transition-colors font-semibold tracking-wide text-sm uppercase">
              Guides <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            <div className="absolute right-0 top-full w-56 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
              <Link href="/guides/itineraries" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Itineraries</Link>
              <Link href="/guides/food-and-culture" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Food & Culture</Link>
              <Link href="/guides/seasonal-travel" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Seasonal Travel</Link>
              <Link href="/guides/travel-tips" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Travel Tips</Link>
              <Link href="/guides/malvan-two-day-itinerary" className="px-4 py-2.5 hover:bg-slate-50 rounded-lg text-sm text-slate-600 font-medium hover:text-primary transition-colors">Malvan 2-Day Itinerary</Link>
            </div>
          </div>

          {/* Blog */}
          <div className="relative group py-2">
            <Link href="/blogs" className="flex items-center gap-1.5 text-slate-700 hover:text-primary transition-colors font-semibold tracking-wide text-sm uppercase">
              Blog
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs" className="hidden lg:flex items-center justify-center text-slate-600 hover:text-primary font-semibold text-sm transition-colors">
          Admin
        </Link>
        <Link href="/add-business" className="hidden lg:flex items-center justify-center bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200">
          Add Business
        </Link>
        <button className="lg:hidden text-slate-600 hover:bg-slate-100 rounded-full p-2.5 transition-all duration-200 flex items-center justify-center hover:text-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}
