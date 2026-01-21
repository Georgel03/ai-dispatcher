export default function Hero() {
  return (
    <section className="bg-[#111111] pt-24 pb-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <p className="text-amber-400 font-bold text-[10px] tracking-widest uppercase mb-6">The features of Tracker</p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-[1.1] mb-6">
            Uncover the<br/>Features That Drive<br/>Trucking Success
          </h1>
          <p className="text-sm md:text-base text-slate-400 mb-10 leading-relaxed max-w-lg">
            Experience the Comprehensive Suite of Advanced Features and Tools in PrecisionTrack, Empowering You to Optimize Fleet Management, Maximize Efficiency, and Stay Ahead of the Competition
          </p>
          <div className="flex gap-4 mb-20">
            <button className="bg-[#5465FF] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-blue-600 transition">Create Account</button>
            <button className="bg-transparent border border-white/20 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-white/5 transition">Login</button>
          </div>

          {/* Client Logos */}
          <div className="flex flex-wrap gap-10 items-center opacity-30 grayscale">
            <span className="text-lg font-bold font-sans text-white">FedEx</span>
            <span className="text-lg font-bold font-serif italic text-white">DHL</span>
            <div className="flex items-center gap-1 font-bold text-white text-xs"><span>DB</span> SCHENKER</div>
            <span className="text-lg font-bold font-sans text-white">Maersk</span>
            <span className="text-lg font-bold font-sans text-white">UPS</span>
          </div>
        </div>

        {/* Geometric Graphic */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 w-[600px] h-[600px] hidden lg:block pointer-events-none">
          <div className="relative w-full h-full">
             <div className="absolute top-[10%] right-0 w-[500px] h-[300px] bg-[#34D399] z-10" style={{ clipPath: 'polygon(0 100%, 100% 20%, 100% 100%)' }}></div>
             <div className="absolute top-[40%] right-0 w-[500px] h-[300px] bg-white z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}