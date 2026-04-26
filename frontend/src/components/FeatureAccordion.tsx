'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const features = [
  {
    title: 'Seamlessly integrate PrecisionTrack',
    content: 'Connect our platform with your existing tools effortlessly to maintain a single source of truth for all your fleet operations.'
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

export default function FeatureAccordion() {
  
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-24" id="features">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Unlocking Insights for Smarter Decision Making
          </h2>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed">
            By harnessing the power of data-driven decision making, you can streamline operations, increase productivity, and stay ahead in a competitive market.
          </p>

          <div className="space-y-4 mb-10">
            {features.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <div 
                  key={index} 
                  className="border-b border-slate-200 pb-4 cursor-pointer group"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                      {item.title}
                    </span>
                    {isOpen ? (
                      <ChevronDown className="w-5 h-5 text-blue-600 transition" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                    )}
                  </div>
                  
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-slate-500 pr-8">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="border border-slate-300 text-slate-700 font-medium px-6 py-2.5 rounded-full hover:border-slate-400 hover:bg-slate-50 transition text-sm">
            Learn more
          </button>
        </div>
        <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1974&auto=format&fit=crop" 
            alt="Delivery Driver" 
            className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-105" 
          />
        </div>
      </div>
    </section>
  );
}