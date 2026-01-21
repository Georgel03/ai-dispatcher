'use client';

import { useState } from 'react';

export default function PricingHero() {
  const [isYearly, setIsYearly] = useState(false);
  const [trucks, setTrucks] = useState(40);

  return (
    <section className="pt-20 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-amber-400 font-bold text-[10px] tracking-widest uppercase mb-6">Truck Tracking Platforms</h3>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          No setups cost or any<br />other hidden fees
        </h1>
        <p className="text-xs font-medium text-slate-500 mb-10">
          14 days unlimited free trial. No Contract
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-xs font-semibold ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5465FF]"></div>
          </label>
          <span className={`text-xs font-semibold ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Yearly</span>
        </div>

        {/* Range Slider */}
        <div className="max-w-lg mx-auto relative mb-2">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-medium text-slate-400">Number of trucks</span>
            <span className="text-sm font-bold text-slate-900">{trucks} Trucks</span>
          </div>
          <div className="relative w-full h-6 flex items-center group">
            <div className="absolute w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#5465FF]" 
                style={{ width: `${trucks}%` }}
              ></div>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={trucks}
              onChange={(e) => setTrucks(Number(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* Custom Thumb visual */}
            <div 
              className="w-5 h-5 bg-[#5465FF] border-[3px] border-white rounded-full shadow-md absolute pointer-events-none transition-all duration-75 ease-out"
              style={{ left: `${trucks}%`, transform: 'translateX(-50%)' }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-300 font-medium">
             {[1, 20, 40, 60, 80, 100].map((val) => (
                <span key={val}>|</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}