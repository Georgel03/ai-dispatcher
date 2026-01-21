import React from 'react';
import { Play } from 'lucide-react';

export default function Testimonial() {
  return (
    <section className="h-[600px] relative bg-slate-900 flex items-end">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Shipping Containers" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="absolute top-10 right-20 flex gap-4">
        <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs px-4 py-2 rounded-full">Copenhagen</div>
        <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs px-4 py-2 rounded-full">SendMyPackage.ltd</div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition shadow-2xl">
          <Play className="w-8 h-8 text-slate-900 ml-1 fill-slate-900" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-xl">
          <p className="text-2xl font-medium text-white mb-4 leading-relaxed">
            "Tracker ensures that we maintain uninterrupted connectivity and traceability for our fleet, even in remote areas."
          </p>
          <p className="text-slate-400 text-sm uppercase tracking-wide">Maclister Messi</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition">More story from them</button>
      </div>
    </section>
  );
};
