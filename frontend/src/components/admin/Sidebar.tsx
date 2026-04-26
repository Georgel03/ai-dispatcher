'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from '@iconify/react';
import { useUser } from "@clerk/nextjs";

const NAV_LINKS = [
  { name: "Dashboard", href: "/admin", icon: "solar:widget-linear" },
  { name: "Fleet", href: "/admin/fleet", icon: "lucide:truck" },
  { name: "Orders", href: "/admin/orders", icon: "solar:clipboard-list-linear" },
  { name: "Drivers", href: "/admin/drivers", icon: "solar:users-group-rounded-linear" },
  { name: "Trailers", href: "/admin/trailers", icon: "solar:transmission-circle-linear" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="w-16 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 z-30 transition-all duration-300">
      <div>
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center bg-slate-900 rounded-lg text-white">
              <Icon icon="solar:box-minimalistic-linear" width="20" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 hidden lg:block">AI Dispatcher</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-2 lg:p-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  isActive 
                    ? "text-[#5465FF] bg-[#5465FF]/5 font-bold" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium"
                }`}
              >
                <Icon icon={link.icon} width="20" strokeWidth="1.5" />
                <span className="hidden lg:block">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-3 lg:p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left">
          <img 
            src={user?.imageUrl || "https://ui-avatars.com/api/?name=Admin&background=E2E8F0&color=64748B"} 
            className="w-8 h-8 rounded-full object-cover" 
            alt="Admin" 
          />
          <div className="hidden lg:block overflow-hidden">
            <p className="text-xs font-semibold text-slate-900 truncate">{user?.fullName || "Admin User"}</p>
            <p className="text-[10px] text-slate-500 truncate">Administrator</p>
          </div>
        </button>
      </div>
    </aside>
  );
}