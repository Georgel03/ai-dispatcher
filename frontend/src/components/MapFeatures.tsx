import React from 'react';
import { Search, Navigation, MapPin, MoreHorizontal } from 'lucide-react';

export default function MapFeatures() {
  return (
    <section className="bg-white pb-24">
      {/* Green Header */}
      <div className="bg-[#10B981] py-24 px-6 text-center relative overflow-hidden">
        {/* Abstract background pattern for the green area */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Gain real-time visibility into the exact location
          </h2>
          <p className="text-green-50 text-lg md:text-xl max-w-2xl mx-auto">
            Track their movements, progress, and any potential delays to ensure efficient operations and timely deliveries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        {/* Browser/App Mockup Container */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[700px]">
          
          {/* Sidebar (Dispatcher View) */}
          <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col z-20">
            {/* Window Controls (Decorative) */}
            <div className="p-4 flex gap-2 border-b border-slate-50">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* Search Bar */}
            <div className="p-5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search fleet..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-3 space-y-3 pb-4 custom-scrollbar">
              {/* Active Item */}
              <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden group cursor-pointer transition-all hover:border-blue-300">
                <div className="absolute left-0 top-0 w-1 h-full bg-blue-500"></div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">In Transit</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">#HG402</span>
                </div>
                
                <h4 className="font-bold text-slate-900 text-sm mb-1">Emery Zuckrafberg</h4>
                <p className="text-xs text-slate-500 mb-3">Volvo FH16 • 85% Load</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-white shadow-sm">
                         <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" className="w-full h-full object-cover" alt="Driver" />
                      </div>
                      <span className="text-xs font-bold text-slate-600">4.50</span>
                   </div>
                   <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">On Time</span>
                </div>
              </div>

              {/* Inactive Items */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-200 cursor-pointer transition">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-slate-700 text-sm">Marcus Geidt</h4>
                    <span className="text-xs text-slate-400">#TR99{i}</span>
                  </div>
                  <p className="text-xs text-slate-400">Scania R500 • Stopped</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 bg-slate-100 relative overflow-hidden group">
            {/* 1. Use a clean, desaturated city map image.
                2. Use grayscale and brightness filters to make it look like a "Light Mode" UI map 
            */}
            <img 
              src="https://images.unsplash.com/photo-1577086664693-894553052526?q=80&w=2540&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-60 grayscale contrast-[1.1] brightness-110" 
              alt="Digital Map Interface" 
            />

            {/* Decorative Grid Overlay to enhance "Digital" feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* Floating Top Controls */}
            <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
              <div className="flex gap-2">
                <button className="bg-white shadow-sm border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-2">
                  <Navigation className="w-3 h-3" /> Back to Fleet
                </button>
              </div>
              <div className="flex gap-2">
                 <button className="bg-white shadow-sm border border-slate-200 p-1.5 rounded-lg text-slate-600 hover:bg-slate-50">
                    <MoreHorizontal className="w-4 h-4" />
                 </button>
              </div>
            </div>

            {/* Simulated Route Line (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md">
              <path 
                d="M 200 600 C 250 500, 300 450, 450 350 S 700 300, 800 200" 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="10 5"
                className="animate-[dash_20s_linear_infinite]"
              />
              <circle cx="200" cy="600" r="6" fill="#3B82F6" stroke="white" strokeWidth="2" />
            </svg>

            {/* Driver Pin (Active) */}
            <div className="absolute top-[35%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-20">
               {/* Pulsing Effect */}
               <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
               
               {/* Pin Body */}
               <div className="relative bg-slate-900 text-white p-1 rounded-lg shadow-xl flex flex-col items-center">
                  <div className="px-3 py-1 text-xs font-bold whitespace-nowrap flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50" className="w-5 h-5 rounded-full border border-white" />
                    Emery Z.
                  </div>
                  {/* Arrow down */}
                  <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 translate-y-1/2"></div>
               </div>
            </div>

            {/* Map Info Card (Floating Bottom) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] md:w-auto md:min-w-[400px] bg-white/90 backdrop-blur-md border border-white/50 shadow-2xl rounded-2xl p-4 z-20">
              <div className="flex items-center justify-between mb-4">
                 <div>
                    <h3 className="text-sm font-bold text-slate-900">Route Status</h3>
                    <p className="text-xs text-slate-500">Hamburg (DE) &rarr; Milan (IT)</p>
                 </div>
                 <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">On Schedule</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-4">
                 <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Speed</p>
                    <p className="text-sm font-bold text-slate-800">85 km/h</p>
                 </div>
                 <div className="text-center border-l border-slate-200/60">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">ETA</p>
                    <p className="text-sm font-bold text-slate-800">4h 20m</p>
                 </div>
                 <div className="text-center border-l border-slate-200/60">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Distance</p>
                    <p className="text-sm font-bold text-slate-800">340 km</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

