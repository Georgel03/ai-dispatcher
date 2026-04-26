'use client';

interface PricingHeroProps {
  isYearly: boolean;
  setIsYearly: (val: boolean) => void;
  trucks: number;
  setTrucks: (val: number) => void;
}

export default function PricingHero({ isYearly, setIsYearly, trucks, setTrucks }: PricingHeroProps) {
  return (
    <section className="pt-24 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-amber-500 font-extrabold text-sm tracking-widest uppercase mb-6">
          Truck Tracking Platforms
        </h3>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
          No setups cost or any<br />other hidden fees
        </h1>
        <p className="text-lg font-medium text-slate-600 mb-12">
          14 days unlimited free trial. No Contract. Cancel anytime.
        </p>

       
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-base font-bold transition-colors ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className={`text-base font-bold transition-colors ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>
            Yearly <span className="text-emerald-500 text-sm ml-1 bg-emerald-50 px-2 py-0.5 rounded-full">-20%</span>
          </span>
        </div>

        {/* Range Slider pentru Camioane */}
        <div className="max-w-2xl mx-auto relative mb-4">
          <div className="flex justify-between items-end mb-4">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Number of trucks</span>
            <span className="text-xl font-extrabold text-blue-600">{trucks} Trucks</span>
          </div>
          <div className="relative w-full h-8 flex items-center group">
            <div className="absolute w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-blue-600 transition-all duration-150 ease-out" 
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
           
            <div 
              className="w-8 h-8 bg-blue-600 border-4 border-white rounded-full shadow-lg absolute pointer-events-none transition-all duration-150 ease-out flex items-center justify-center"
              style={{ left: `${trucks}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold">
             {[1, 20, 40, 60, 80, 100].map((val) => (
                <span key={val}>{val}</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}