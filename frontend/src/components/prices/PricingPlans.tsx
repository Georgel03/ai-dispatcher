import { Phone, Check, PhoneCall, PhoneForwarded } from 'lucide-react';

export default function PricingPlans() {
  const features = [
    "Your own client database",
    "Accept online payments",
    "Offer packages",
    "Personal calendar synchronization",
    "Driver analytics dashboard",
    "Real-time GPS tracking",
    "Fuel cost optimization",
    "Route planning history",
    "API Access",
    "24/7 Support"
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left Column: Labels (Hidden on mobile) */}
          <div className="hidden lg:block pt-8 pr-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Pick your<br />plan</h2>
            
            <div className="space-y-3 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-[5px] border-[#5465FF]"></div>
                <span className="text-xs text-slate-500 font-medium">Monthly billing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                <span className="text-xs text-slate-400">Yearly billing</span>
              </div>
            </div>

            <div className="space-y-0 text-[11px] text-slate-500 font-medium pt-8">
              {features.map((feature, idx) => (
                <div key={idx} className="h-10 flex items-center border-b border-transparent">{feature}</div>
              ))}
            </div>
          </div>

          {/* Base Plan */}
          <div className="bg-white rounded-2xl p-0 overflow-hidden shadow-sm h-full flex flex-col relative group hover:shadow-md transition">
            <div className="p-8 pb-6 text-center">
              <div className="w-10 h-10 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-[#5465FF] mb-4">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Base</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-6 px-2">
                14 days unlimited free trial. No Contract<br />
                Track your vehicles in real-time.
              </p>
              <div className="mb-6">
                <span className="text-2xl font-bold text-[#5465FF]">$120</span>
                <span className="text-[10px] text-slate-400">/monthly</span>
              </div>
              <button className="w-full border border-slate-200 text-slate-600 text-[11px] font-semibold py-2.5 rounded-full hover:border-[#5465FF] hover:text-[#5465FF] transition">Choose Plans</button>
            </div>
            
            <div className="border-t border-dashed border-slate-100 mx-6"></div>

            <div className="flex-1 p-8 pt-6 flex flex-col items-center space-y-0">
               {features.map((_, idx) => (
                 <div key={idx} className="h-10 flex items-center w-full justify-center">
                    {/* Only show check for first 5 items for Base plan demo */}
                    {idx < 5 ? (
                      <div className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-[#5465FF]" />
                      </div>
                    ) : <span className="text-slate-200">-</span>}
                 </div>
               ))}
            </div>
          </div>

          {/* Premium Plan (Highlighted) */}
          <div className="bg-white rounded-2xl p-0 overflow-hidden shadow-xl shadow-blue-900/5 h-full flex flex-col relative z-10 transform lg:-translate-y-4 border border-blue-50">
            <div className="p-8 pb-6 text-center">
              <div className="flex justify-center mb-4 relative">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#5465FF]">
                  <PhoneCall className="w-5 h-5 fill-current" />
                </div>
                <span className="absolute top-0 right-8 md:right-4 bg-blue-100 text-[#5465FF] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Best offer</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Premium</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-6 px-2">
                14 days unlimited free trial. No Contract<br />
                Unlock greater insights, optimize performance.
              </p>
              <div className="mb-6">
                <span className="text-2xl font-bold text-[#5465FF]">$240</span>
                <span className="text-[10px] text-slate-400">/monthly</span>
              </div>
              <button className="w-full bg-[#5465FF] text-white text-[11px] font-semibold py-2.5 rounded-full hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">Choose Plans</button>
            </div>
            
            <div className="border-t border-dashed border-slate-100 mx-6"></div>

            <div className="flex-1 p-8 pt-6 flex flex-col items-center space-y-0">
               {features.map((_, idx) => (
                 <div key={idx} className="h-10 flex items-center w-full justify-center">
                    {/* Show more checks for premium */}
                    {idx < 8 ? (
                      <div className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-[#5465FF]" />
                      </div>
                    ) : <span className="text-slate-200">-</span>}
                 </div>
               ))}
            </div>
          </div>

          {/* Ultimate Plan */}
          <div className="bg-white rounded-2xl p-0 overflow-hidden shadow-sm h-full flex flex-col relative group hover:shadow-md transition">
            <div className="p-8 pb-6 text-center">
              <div className="w-10 h-10 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-[#5465FF] mb-4">
                <PhoneForwarded className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Ultimate</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-6 px-2">
                14 days unlimited free trial. No Contract<br />
                Elevate your fleet management strategy.
              </p>
              <div className="mb-6">
                <span className="text-2xl font-bold text-[#5465FF]">$840</span>
                <span className="text-[10px] text-slate-400">/monthly</span>
              </div>
              <button className="w-full border border-slate-200 text-slate-600 text-[11px] font-semibold py-2.5 rounded-full hover:border-[#5465FF] hover:text-[#5465FF] transition">Choose Plans</button>
            </div>
            
            <div className="border-t border-dashed border-slate-100 mx-6"></div>

            <div className="flex-1 p-8 pt-6 flex flex-col items-center space-y-0">
               {features.map((_, idx) => (
                 <div key={idx} className="h-10 flex items-center w-full justify-center">
                    <div className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-[#5465FF]" />
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}