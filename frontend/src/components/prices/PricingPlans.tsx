'use client';

import { Phone, Check, PhoneCall, PhoneForwarded } from 'lucide-react';

interface PricingPlansProps {
  isYearly: boolean;
  trucks: number;
}

export default function PricingPlans({ isYearly, trucks }: PricingPlansProps) {
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
    "24/7 Priority Support"
  ];

  const calculatePrice = (pricePerTruck: number) => {
    let total = trucks * pricePerTruck;
    if (isYearly) {
      total = Math.floor(total * 0.8); 
    }
    return total;
  };

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column: Labels (Hidden on mobile) */}
          <div className="hidden lg:block pt-8 pr-6">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8 leading-tight">Pick your<br />plan</h2>
            
            <div className="space-y-4 mb-16">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-[6px] ${!isYearly ? 'border-blue-600' : 'border-slate-300'}`}></div>
                <span className={`text-sm font-bold ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly billing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-[6px] ${isYearly ? 'border-blue-600' : 'border-slate-300'}`}></div>
                <span className={`text-sm font-bold ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Yearly billing</span>
              </div>
            </div>

            <div className="space-y-0 text-sm text-slate-600 font-medium pt-8">
              {features.map((feature, idx) => (
                <div key={idx} className="h-12 flex items-center border-b border-transparent">{feature}</div>
              ))}
            </div>
          </div>

          {/* Base Plan */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm h-full flex flex-col relative group hover:shadow-xl transition-shadow duration-300 border border-slate-100">
            <div className="p-8 pb-6 text-center">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Base</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8 px-2 h-10">
                Essential tracking for your fleet.
              </p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">${calculatePrice(3)}</span>
                <span className="text-sm font-bold text-slate-400">/mo</span>
              </div>
              <button className="w-full border-2 border-slate-200 text-slate-700 text-sm font-bold py-3.5 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors">Choose Base</button>
            </div>
            
            <div className="border-t border-dashed border-slate-200 mx-8"></div>

            <div className="flex-1 p-8 pt-6 flex flex-col items-center space-y-0">
               {features.map((_, idx) => (
                 <div key={idx} className="h-12 flex items-center w-full justify-center lg:justify-center justify-between">
                   <span className="lg:hidden text-sm text-slate-600">{features[idx]}</span>
                   {idx < 5 ? (
                     <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                       <Check className="w-4 h-4 text-blue-600" />
                     </div>
                   ) : <span className="text-slate-300 font-bold">-</span>}
                 </div>
               ))}
            </div>
          </div>

          {/* Premium Plan (Highlighted) */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col relative z-10 transform lg:-translate-y-6 border-2 border-blue-600">
            <div className="bg-blue-600 text-white text-xs font-bold text-center py-2 uppercase tracking-widest">
              Most Popular Choice
            </div>
            <div className="p-8 pb-6 text-center">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
                <PhoneCall className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Premium</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8 px-2 h-10">
                Unlock greater insights & optimize performance.
              </p>
              <div className="mb-8 relative inline-block">
                {isYearly && <span className="absolute -top-4 -right-10 text-xs font-bold text-emerald-500 line-through">${trucks * 6}</span>}
                <span className="text-4xl font-extrabold text-blue-600">${calculatePrice(6)}</span>
                <span className="text-sm font-bold text-slate-400">/mo</span>
              </div>
              <button className="w-full bg-blue-600 text-white text-sm font-bold py-3.5 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">Choose Premium</button>
            </div>
            
            <div className="border-t border-dashed border-slate-200 mx-8"></div>

            <div className="flex-1 p-8 pt-6 flex flex-col items-center space-y-0">
               {features.map((_, idx) => (
                 <div key={idx} className="h-12 flex items-center w-full justify-center lg:justify-center justify-between">
                   <span className="lg:hidden text-sm text-slate-600 font-medium">{features[idx]}</span>
                   {idx < 8 ? (
                     <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                       <Check className="w-4 h-4 text-blue-600 font-bold" />
                     </div>
                   ) : <span className="text-slate-300 font-bold">-</span>}
                 </div>
               ))}
            </div>
          </div>

          {/* Ultimate Plan */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm h-full flex flex-col relative group hover:shadow-xl transition-shadow duration-300 border border-slate-100">
            <div className="p-8 pb-6 text-center">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <PhoneForwarded className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Ultimate</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8 px-2 h-10">
                Complete features for enterprise operations.
              </p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">${calculatePrice(21)}</span>
                <span className="text-sm font-bold text-slate-400">/mo</span>
              </div>
              <button className="w-full border-2 border-slate-200 text-slate-700 text-sm font-bold py-3.5 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors">Choose Ultimate</button>
            </div>
            
            <div className="border-t border-dashed border-slate-200 mx-8"></div>

            <div className="flex-1 p-8 pt-6 flex flex-col items-center space-y-0">
               {features.map((_, idx) => (
                 <div key={idx} className="h-12 flex items-center w-full justify-center lg:justify-center justify-between">
                   <span className="lg:hidden text-sm text-slate-600">{features[idx]}</span>
                   <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                     <Check className="w-4 h-4 text-blue-600" />
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