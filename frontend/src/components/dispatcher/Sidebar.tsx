'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Fleet Assembly', path: '/dispatcher/assembly', icon: 'lucide:layout-dashboard' },
    { name: 'Live Map', path: '/dispatcher/live-map', icon: 'lucide:map' },
    { name: 'Active Orders', path: '/dispatcher/orders', icon: 'lucide:box' },
  ];

  return (
    <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 shrink-0 z-30 transition-all duration-300">
      {/* Logo */}
      <div className="mb-10 w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-100/50">
        <Icon icon="lucide:truck" className="w-5 h-5 text-indigo-600" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-8 w-full items-center flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link key={item.name} href={item.path} className={`relative nav-btn transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`} title={item.name}>
              <Icon icon={item.icon} strokeWidth={isActive ? "2" : "1.5"} className="w-5 h-5" />
              {isActive && (
                <span className="absolute -right-[1.125rem] top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-l-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-6 mt-auto">
        <button className="text-slate-400 hover:text-slate-700 transition-colors">
          <Icon icon="lucide:settings" strokeWidth="1.5" className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}