'use client';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Search } from 'lucide-react'

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-200 flex items-center justify-between px-margin-mobile lg:px-margin-desktop py-4 max-w-container-max mx-auto ${scrolled ? 'bg-surface shadow-md border-transparent' : 'bg-surface border-b border-surface-variant'}`}>
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image alt="Mazo Sindhudurg Logo" width={40} height={40} className="h-8 lg:h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmlPM7dgogRu64_O9CO8j5aNJBlvOM-Mn0e5zQv1pY0H4ZitjUiD1AJbVSB23dGWfGFuVnJ5OXwFb7M-LbB2SdFWPiVwtXSg5tjHa1B5PsVVUm1Uky3mDEEaV_zgVXANgrGvMaoxi6BFeotd1wgCFe7OhFKLSbC2qb4pX9iqy_F_0Nxf9tEz_B0QLEWRgOux0kFqRm3DFX6f66vfpp3noVI4Y6OiE1SCnX8eee9wEc9zpp6tNiV6gc" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 font-label-md text-label-md">
          <Link href="/" className="text-primary hover:opacity-80 transition-opacity">Home</Link>
          <Link href="#explore" className="text-on-surface-variant hover:text-primary transition-colors">Explore</Link>
          <Link href="#places" className="text-on-surface-variant hover:text-primary transition-colors">Places</Link>
          <Link href="#businesses" className="text-on-surface-variant hover:text-primary transition-colors">Businesses</Link>
          <Link href="#events" className="text-on-surface-variant hover:text-primary transition-colors">Events</Link>
          <Link href="#stories" className="text-on-surface-variant hover:text-primary transition-colors">Stories</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors duration-200 flex items-center justify-center">
          <Search className="w-5 h-5" />
        </button>
        <Link href="/add-business" className="hidden lg:flex items-center justify-center bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity">
          Add Business
        </Link>
        <button className="lg:hidden text-primary hover:bg-surface-container rounded-full p-2 transition-colors duration-200 flex items-center justify-center">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}
