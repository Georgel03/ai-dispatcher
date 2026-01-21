import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function FeatureAccordion() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-6">Unlocking Insights for Smarter Decision Making</h2>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed">
            By harnessing the power of data-driven decision making, you can streamline operations, increase productivity, and stay ahead in a competitive market.
          </p>

          <div className="space-y-6 mb-10">
            {['Seamlessly integrate PrecisionTrack', 'Team Collaboration Tools', "Leverage the power of PrecisionTrack's API"].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-slate-200 pb-4 cursor-pointer group">
                <span className="text-lg font-medium text-slate-900">{item}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition" />
              </div>
            ))}
          </div>

          <button className="border border-slate-300 text-slate-700 font-medium px-6 py-2.5 rounded-full hover:border-slate-400 transition text-sm">Learn more</button>
        </div>
        <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl">
          <img src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1974&auto=format&fit=crop" alt="Delivery Driver" className="w-full h-[600px] object-cover" />
        </div>
      </div>
    </section>
  );
};
