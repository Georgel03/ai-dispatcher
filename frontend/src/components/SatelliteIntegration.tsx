import React from 'react';

export default function SatelliteIntegration() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-[500px]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-white mb-6">Integration with Satellites<br />and GPS Technologies</h2>
          <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
            To overcome challenges in areas with limited cellular coverage, PrecisionTrack integrates with satellite communication and GPS technologies.
          </p>
          <div className="flex gap-4 mb-12">
            <button className="border border-slate-700 text-white font-medium px-6 py-2.5 rounded-full hover:bg-slate-800 transition text-sm">Precision locations</button>
            <button className="border border-slate-700 text-white font-medium px-6 py-2.5 rounded-full hover:bg-slate-800 transition text-sm">More story from them</button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-slate-500 text-sm">This feature guarantees that you have access to the most up-to-date and accurate information. <a href="#" className="text-blue-400 hover:text-blue-300">Learn More</a></p>
          </div>
        </div>
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full border border-blue-500/20 absolute animate-pulse"></div>
          <div className="w-[300px] h-[300px] rounded-full border border-blue-400/30 absolute"></div>
        </div>
      </div>
    </section>
  );
};
