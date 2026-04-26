import { Box } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section className="py-32 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Trusted by Industry Leaders</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-md">
              Discover Why Tracker is the Trusted Choice for Leading Companies in the Logistics and Trucking Industry.
            </p>
          </div>
          
          
          <div className="grid grid-cols-3 gap-y-14 gap-x-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          
            <svg viewBox="0 0 120 35" className="h-8 w-auto">
              <text x="0" y="28" fontFamily="Arial, Helvetica, sans-serif" fontSize="32" fontWeight="900" letterSpacing="-1.5">
                <tspan fill="#4d148c">Fed</tspan><tspan fill="#ff6600">Ex</tspan>
              </text>
            </svg>
            
           
            <svg viewBox="0 0 120 35" className="h-5 w-auto">
              <text x="0" y="26" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="900" fill="#e2001a" letterSpacing="-1">aramex</text>
            </svg>
            
            
            <svg viewBox="0 0 180 35" className="h-5 w-auto">
              <text x="0" y="26" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="800" fill="#000000">DB SCHENKER</text>
            </svg>
            
            
            <div className="flex items-center gap-2 font-extrabold text-slate-900 text-xl">
              <Box className="w-7 h-7 text-blue-600" /> ShipBob
            </div>
            
            
            <svg viewBox="0 0 120 35" className="h-6 w-auto">
              <rect width="120" height="35" fill="#ffcc00" />
              <text x="18" y="26" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontStyle="italic" fontWeight="900" fill="#d40511" letterSpacing="-1">DHL</text>
            </svg>
            
           
            <svg viewBox="0 0 120 35" className="h-7 w-auto">
              <circle cx="18" cy="18" r="16" fill="#ff6600"/>
              <text x="18" y="24" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">T</text>
              <circle cx="56" cy="18" r="16" fill="#ff6600"/>
              <text x="56" y="24" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">N</text>
              <circle cx="94" cy="18" r="16" fill="#ff6600"/>
              <text x="94" y="24" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">T</text>
            </svg>
            
          </div>
        </div>
      </div>
    </section>
  );
}