'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Formatăm numele paginii din URL
  const lastSegment = pathname.split('/').pop() || '';
  const title = pathname === '/admin' 
    ? 'Dashboard' 
    : lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-center px-6 shrink-0 z-20">
      {/* Titlul centrat perfect pe mijlocul ecranului */}
      <h1 className="text-lg font-bold tracking-wide text-slate-800 uppercase">
        {title}
      </h1>
    </header>
  );
}