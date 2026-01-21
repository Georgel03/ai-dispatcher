'use client';
import { Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-slate-400 py-16 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-5 h-5 bg-white rounded-[2px] flex items-center justify-center">
                <div className="w-1.5 h-2.5 bg-emerald-400 rounded-sm"></div>
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">Tracker</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>+1 (452) 008-8888</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                <span className="leading-relaxed">8003 Ranchview Dr.<br/>Richardson, Singapore 8493</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex gap-12 lg:col-span-2">
             <div className="space-y-4">
               <Link href="#" className="block text-white font-medium">Home</Link>
               <Link href="#" className="block text-slate-500 hover:text-white">In the galleries &gt;</Link>
               <Link href="#" className="block text-slate-500 hover:text-white">Events &gt;</Link>
             </div>
             <div className="space-y-4">
               <Link href="#" className="block text-white font-medium">Features</Link>
               <Link href="#" className="block text-slate-500 hover:text-white">Film series &gt;</Link>
               <Link href="#" className="block text-slate-500 hover:text-white">Performance programs &gt;</Link>
             </div>
             <div className="space-y-4">
               <Link href="#" className="block text-white font-medium">Pricing</Link>
               <Link href="#" className="block text-slate-500 hover:text-white">Exhibition history &gt;</Link>
               <Link href="#" className="block text-slate-500 hover:text-white">Blog</Link>
             </div>
          </div>

          {/* Back to top */}
          <div className="flex justify-end items-start relative">
            <button 
              className="w-14 h-14 bg-[#5465FF] rounded-full flex flex-col items-center justify-center text-[8px] font-bold text-white text-center leading-tight hover:bg-blue-600 transition absolute top-0 right-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              BACK TO<br/>TOP
            </button>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-white/5 text-[10px] text-slate-600 uppercase tracking-wider">
          <div className="flex gap-8">
            <Link href="#" className="hover:text-slate-400">TERMS & CONDITIONS</Link>
            <Link href="#" className="hover:text-slate-400">PRIVACY POLICY</Link>
          </div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>2023 TRACKER</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none opacity-5">
        <span className="text-[200px] font-bold font-sans text-white leading-none tracking-tighter" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
          Trac
        </span>
      </div>
    </footer>
  );
}