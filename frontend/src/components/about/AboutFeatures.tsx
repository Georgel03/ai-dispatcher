import { ChevronRight } from 'lucide-react';

export default function AboutFeatures() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Unlocking Insights for<br />Smarter Decision Making
            </h2>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-8 border-b border-slate-100 pb-8">
              By harnessing the power of data-driven decision making, you can streamline operations, increase productivity, and stay ahead in a competitive market.
            </p>
            
            {/* List */}
            <div className="space-y-0 mb-8">
              {['Seamlessly Integrate PrecisionTrack', 'Team Collaboration Tools', "Leverage the power of PrecisionTrack's API"].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 group cursor-pointer">
                  <span className="text-xs font-bold text-slate-800">{item}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#5465FF] transition" />
                </div>
              ))}
            </div>

            <button className="text-[#5465FF] text-xs font-semibold px-6 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition">
              Learn more
            </button>
          </div>
          
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
              alt="Industrial worker" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}