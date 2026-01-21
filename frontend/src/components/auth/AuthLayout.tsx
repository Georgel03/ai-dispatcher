'use client';

import Link from 'next/link';

export default function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    // Main Container: Centered, light gray background
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 text-slate-900 antialiased selection:bg-[#5465FF] selection:text-white">
      
      {/* Card Container */}
      <div className="w-full max-w-[480px] bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 relative">
        
        {/* Header / Logo */}
        <header className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 transition-transform group-hover:scale-105">
                <rect x="3" y="8" width="5" height="12" rx="1" className="fill-slate-900"/>
                <rect x="9.5" y="4" width="5" height="16" rx="1" className="fill-slate-900"/>
                <rect x="16" y="9" width="5" height="11" rx="1" className="fill-emerald-400"/>
                </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Tracker</span>
          </Link>
        </header>

        {/* Content */}
        <main className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">{title}</h1>
            <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
          </div>
          
          {/* Clerk Form Injection */}
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-slate-50 flex justify-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <Link href="#" className="hover:text-slate-600 transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-slate-600 transition-colors">Terms</Link>
        </footer>

      </div>
    </div>
  );
}