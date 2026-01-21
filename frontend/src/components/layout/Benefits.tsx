import { Phone, Users, Maximize } from 'lucide-react';

export default function Benefits() {
  return (
    <section className="bg-[#5465FF] py-24 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          <div className="overflow-hidden rounded-lg shadow-2xl">
            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop" alt="Laptop Dashboard" className="w-full h-[300px] object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Discover the Benefits of Trackers</h2>
            <p className="text-indigo-100 text-sm leading-relaxed max-w-md">
              Experience the Numerous Benefits of PrecisionTrack, Elevate Your Fleet Management, Enhance Efficiency, and Drive Sustainable Business Success.
            </p>
          </div>
        </div>

        {/* Bottom 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-12">
          <div className="border-r border-white/20 pr-8 last:border-0 last:pr-0">
            <div className="mb-4"><Phone className="w-5 h-5 text-white" /></div>
            <h3 className="text-sm font-semibold mb-2">Seamlessly Integration</h3>
            <p className="text-[10px] text-indigo-100 leading-relaxed opacity-80">
              Seamless Integration for Enhanced Fleet Management, Maximize Efficiency, and Streamline Operations with PrecisionTrack.
            </p>
          </div>
          
          <div className="border-r border-white/20 pr-8 last:border-0 last:pr-0">
            <div className="mb-4"><Users className="w-5 h-5 text-white" /></div>
            <h3 className="text-sm font-semibold mb-2">Team Collaboration Tools</h3>
            <p className="text-[10px] text-indigo-100 leading-relaxed opacity-80">
              Foster Collaboration and Efficiency, Empower Your Team with PrecisionTrack's Advanced Collaboration Tools to Streamline Fleet Management.
            </p>
          </div>
          
          <div>
            <div className="mb-4"><Maximize className="w-5 h-5 text-white" /></div>
            <h3 className="text-sm font-semibold mb-2">Leverage the power of API</h3>
            <p className="text-[10px] text-indigo-100 leading-relaxed opacity-80">
              Expand Functionality and Customize Your Fleet Management with PrecisionTrack's Powerful API Capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}