import { Box } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Trusted by company</h2>
            <p className="text-[10px] text-slate-500 leading-relaxed max-w-xs">
              Discover Why PrecisionTrack is the Trusted Choice for Leading Companies in the Trucking Industry
            </p>
          </div>
          <div className="grid grid-cols-3 gap-y-10 gap-x-8 opacity-40 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/FedEx_Express.svg/1200px-FedEx_Express.svg.png" className="h-6 object-contain" alt="FedEx" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Aramex_logo.svg/2560px-Aramex_logo.svg.png" className="h-5 object-contain" alt="Aramex" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/DB_Schenker_Logo.svg/1200px-DB_Schenker_Logo.svg.png" className="h-6 object-contain" alt="DB Schenker" />
            <div className="flex items-center gap-1 font-bold text-slate-800 text-lg"><Box className="w-5 h-5" /> ShipBob</div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/2560px-DHL_Logo.svg.png" className="h-4 object-contain mt-1" alt="DHL" />
            <div className="flex items-center gap-1 font-bold text-slate-800 text-lg tracking-tighter">TNT</div>
          </div>
        </div>
      </div>
    </section>
  );
}