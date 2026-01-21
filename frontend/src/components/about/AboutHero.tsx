import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="pt-16 pb-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h3 className="text-amber-400 font-bold text-[10px] tracking-widest uppercase mb-4">ABOUT TRACKER</h3>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
          Empowering Trucking<br />Success of Tracker
        </h1>
        <p className="text-[11px] leading-relaxed font-medium text-slate-500 max-w-xl mx-auto">
          Empowering Trucking Success through Innovative Solutions. Discover PrecisionTrack's Mission, Values, and Dedication to Revolutionizing Fleet Management for Unparalleled Operational Excellence and Efficiency.
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 h-[400px]">
          {/* Left Edge (Partial) */}
          <div className="hidden md:block col-span-2 rounded-2xl overflow-hidden relative opacity-50">
             <div className="relative w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale opacity-60" 
                  alt="Office background"
                />
             </div>
          </div>
          
          {/* Main Focus Image */}
          <div className="col-span-12 md:col-span-5 rounded-2xl overflow-hidden relative">
             <img 
               src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop" 
               className="w-full h-full object-cover" 
               alt="Team working"
             />
          </div>

          {/* Right Column Split */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <div className="h-[55%] rounded-2xl overflow-hidden relative">
               <img 
                 src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop" 
                 className="w-full h-full object-cover" 
                 alt="Meeting"
               />
            </div>
            <div className="h-[45%] bg-white border border-slate-100 rounded-2xl p-5 shadow-lg flex flex-col justify-center gap-3">
               <div className="flex justify-between items-start">
                   <div>
                       <div className="text-lg font-bold text-slate-900">10,000+</div>
                       <div className="text-[9px] text-slate-400 font-medium">Trucks Tracked</div>
                   </div>
                   <div>
                       <div className="text-lg font-bold text-slate-900">98%</div>
                       <div className="text-[9px] text-slate-400 font-medium">Customer Satisfaction</div>
                   </div>
               </div>
               <div className="flex justify-between items-start pt-1">
                   <div>
                       <div className="text-lg font-bold text-slate-900 flex items-center gap-1">30% <span className="text-red-500 text-[10px]">↘</span></div>
                       <div className="text-[9px] text-slate-400 font-medium">Maintenance Costs</div>
                   </div>
                   <div>
                       <div className="text-lg font-bold text-slate-900 flex items-center gap-1">20% <span className="text-emerald-500 text-[10px]">↗</span></div>
                       <div className="text-[9px] text-slate-400 font-medium">Delivery Speed</div>
                   </div>
               </div>
            </div>
          </div>

          {/* Far Right Edge (Partial) */}
          <div className="hidden md:block col-span-2 rounded-2xl overflow-hidden relative opacity-50">
             <img 
               src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=1740&auto=format&fit=crop" 
               className="w-full h-full object-cover grayscale opacity-60" 
               alt="Background"
             />
          </div>
        </div>
      </div>
    </section>
  );
}