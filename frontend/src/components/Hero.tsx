import React from 'react';
import { Ship } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-xl">
          <p className="text-teal-500 font-semibold text-xs tracking-widest uppercase mb-6">Truck Tracking Platforms</p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Track, Trace, and Transform Your Trucking Operations
          </h1>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Effortlessly monitor, track, and manage your trucks with our advanced and user-friendly tracking platform. Gain real-time visibility into your fleet's location, status, and performance.
          </p>
          <div className="flex gap-4 mb-16">
            <button className="bg-blue-600 text-white text-base font-medium px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">Try us</button>
            <button className="bg-white border border-slate-200 text-slate-700 text-base font-medium px-8 py-3 rounded-full hover:bg-slate-50 transition">Explore more</button>
          </div>

          <div className="flex flex-wrap gap-8 items-center opacity-50 grayscale">
            <span className="text-xl font-bold font-sans text-slate-800">aramex</span>
            <span className="text-xl font-bold font-serif italic text-slate-800">FedEx</span>
            <div className="flex items-center gap-1 font-bold text-slate-800 text-sm"><span>DB</span> SCHENKER</div>
            <div className="flex items-center gap-1 font-bold text-slate-800 text-lg"><Ship className="w-5 h-5" /> ShipBob</div>
            <span className="text-xl font-bold text-slate-800 tracking-tighter">TNT</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-400 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-20 right-0 w-32 h-32 bg-green-400 rounded-bl-3xl z-10"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl z-0">
            <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" alt="Truck delivery" className="w-full h-[600px] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
