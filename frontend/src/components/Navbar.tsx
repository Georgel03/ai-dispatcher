'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Navbar() {
  
  const pathname = usePathname();

  // Helper to highlight active links
  const isActive = (path: string) => 
    pathname === path 
      ? "text-xs font-bold text-[#5465FF]" 
      : "text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors";

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-slate-900 rounded-[6px] flex items-center justify-center transition-transform group-hover:scale-95 shadow-lg shadow-slate-900/20">
            <div className="w-2.5 h-4 bg-emerald-400 rounded-[2px]"></div>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Tracker</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={isActive('/')}>Home</Link>
          <Link href="/features" className={isActive('/features')}>Features</Link>
          <Link href="/about" className={isActive('/about')}>About</Link>
          <Link href="/pricing" className={isActive('/pricing')}>Pricing</Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          
          {/* LOGGED IN: Show Avatar */}
          <SignedIn>
            <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500 hidden sm:block">My Account</span>
                {/* ERROR FIXED: We removed 'afterSignOutUrl'. 
                  It is now handled by NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL in .env 
                */}
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border border-slate-200"
                    }
                  }}
                />
            </div>
          </SignedIn>

          {/* LOGGED OUT: Show Buttons */}
          <SignedOut>
            <Link href="/sign-in">
              <button className="text-xs font-bold text-slate-600 hover:text-[#5465FF] px-4 py-2 transition-colors">
                Log in
              </button>
            </Link>
            
            <Link href="/sign-up">
              <button className="bg-[#5465FF] hover:bg-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                Create Account
              </button>
            </Link>
          </SignedOut>

        </div>
      </div>
    </header>
  );
}