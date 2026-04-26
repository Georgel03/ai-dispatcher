import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="pt-24 pb-32 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <h3 className="text-amber-500 font-extrabold text-sm tracking-widest uppercase mb-6">ABOUT TRACKER</h3>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.15]">
          Empowering Trucking<br />Success of Tracker
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
          Empowering Trucking Success through Innovative Solutions. Discover PrecisionTrack's Mission, Values, and Dedication to Revolutionizing Fleet Management for Unparalleled Operational Excellence and Efficiency.
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 h-[500px]">
          {/* Left Edge (Partial) */}
          <div className="hidden md:block col-span-2 rounded-3xl overflow-hidden relative opacity-60">
             <div className="relative w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale" 
                  alt="Office background"
                />
             </div>
          </div>
          
          {/* Main Focus Image */}
          <div className="col-span-12 md:col-span-5 rounded-3xl overflow-hidden relative shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop" 
               className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
               alt="Team working"
             />
          </div>

          {/* Right Column Split */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            <div className="h-[55%] rounded-3xl overflow-hidden relative shadow-lg">
               <img 
                 src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop" 
                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                 alt="Meeting"
               />
            </div>
            <div className="h-[45%] bg-white border border-slate-200 rounded-3xl p-8 shadow-xl flex flex-col justify-center gap-6">
               <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                   <div>
                       <div className="text-3xl font-extrabold text-slate-900">10,000+</div>
                       <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">Trucks Tracked</div>
                   </div>
                   <div>
                       <div className="text-3xl font-extrabold text-slate-900">98%</div>
                       <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">Satisfaction</div>
                   </div>
               </div>
               <div className="flex justify-between items-start pt-2">
                   <div>
                       <div className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">30% <span className="text-rose-500 text-sm font-bold bg-rose-50 px-2 py-0.5 rounded">↘</span></div>
                       <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">Maint. Costs</div>
                   </div>
                   <div>
                       <div className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">20% <span className="text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded">↗</span></div>
                       <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">Delivery Speed</div>
                   </div>
               </div>
            </div>
          </div>

          {/* Far Right Edge (Partial) */}
          <div className="hidden md:block col-span-1 rounded-l-3xl overflow-hidden relative opacity-50">
             <img 
               src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=1740&auto=format&fit=crop" 
               className="w-full h-full object-cover grayscale" 
               alt="Background"
             />
          </div>
        </div>
      </div>
    </section>
  );
}