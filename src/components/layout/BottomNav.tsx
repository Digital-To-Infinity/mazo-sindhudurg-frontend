import Link from 'next/link'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface border-t border-surface-variant flex md:hidden justify-around items-center h-16 pb-safe shadow-sm">
      <Link href="/" className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-3 py-1 transition-transform duration-150 scale-95 active:scale-90">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
        <span className="font-label-md text-[10px]">Home</span>
      </Link>
      <Link href="/explore" className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 transition-transform duration-150 scale-95 active:scale-90 hover:text-primary">
        <span className="material-symbols-outlined">explore</span>
        <span className="font-label-md text-[10px]">Explore</span>
      </Link>
      <Link href="/directory" className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 transition-transform duration-150 scale-95 active:scale-90 hover:text-primary">
        <span className="material-symbols-outlined">business_center</span>
        <span className="font-label-md text-[10px]">Directory</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 transition-transform duration-150 scale-95 active:scale-90 hover:text-primary">
        <span className="material-symbols-outlined">person</span>
        <span className="font-label-md text-[10px]">Profile</span>
      </Link>
    </nav>
  )
}
