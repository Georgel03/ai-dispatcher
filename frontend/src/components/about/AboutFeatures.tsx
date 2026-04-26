'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const features = [
  {
    title: 'Seamlessly Integrate PrecisionTrack',
    content: 'Connect our platform with your existing operational tools effortlessly to maintain a single source of truth.'
  },
  {
    title: 'Team Collaboration Tools',
    content: 'Empower your dispatchers, drivers, and management to communicate in real-time and share critical updates instantly.'
  },
  {
    title: "Leverage the power of PrecisionTrack's API",
    content: 'Build custom workflows and automate data syncing with our robust and developer-friendly REST API.'
  }
];

export default function AboutFeatures() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Smarter Decision Maker
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 border-b border-slate-200 pb-10">
              By harnessing the power of data-driven decision making, you can streamline operations, increase productivity, and stay ahead in a competitive market.
            </p>
            
            {/* Functional Accordion List */}
            <div className="space-y-2 mb-10">
              {features.map((item, i) => {
                const isOpen = activeIndex === i;
                return (
                  <div 
                    key={i} 
                    className="border-b border-slate-200 pb-4 cursor-pointer group"
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="flex items-center justify-between py-3">
                      <span className={`text-xl font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-600'}`}>
                        {item.title}
                      </span>
                      {isOpen ? (
                        <ChevronDown className="w-6 h-6 text-blue-600 transition" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition" />
                      )}
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                      <p className="text-slate-600 text-lg pr-8">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="text-blue-600 text-sm font-bold px-8 py-3.5 border-2 border-blue-100 rounded-full hover:bg-blue-50 transition-colors shadow-sm">
              Learn more
            </button>
          </div>
          
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
              alt="Industrial worker" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}