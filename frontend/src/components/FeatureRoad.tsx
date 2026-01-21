import React from 'react';

export default function FeatureRoad() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop" alt="Highway truck" className="w-full h-[500px] object-cover" />
        </div>
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-6">Real-Time Insights for Smarter Logistics</h2>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Harness the power of data-driven decision making to optimize your trucking routes, reduce fuel costs, and minimize delivery delays. Our comprehensive tracking platform provides you with actionable insights.
          </p>
          <button className="border border-slate-300 text-slate-700 font-medium px-6 py-2.5 rounded-full hover:border-slate-400 transition text-sm">Learn more</button>
        </div>
      </div>
    </section>
  );
};
