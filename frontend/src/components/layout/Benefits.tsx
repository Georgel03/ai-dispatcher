import { Phone, Users, Maximize } from 'lucide-react';

export default function Benefits() {
  return (
    <section className="bg-blue-700 py-32 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop" 
              alt="Laptop Dashboard" 
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
              Discover the Benefits of Tracker
            </h2>
            <p className="text-blue-100 text-xl leading-relaxed max-w-xl">
              Experience the Numerous Benefits of Tracker Elevate Your Fleet Management, Enhance Efficiency, and Drive Sustainable Business Success.
            </p>
          </div>
        </div>

        {/* Bottom 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/20 pt-16">
          <div className="md:border-r border-white/20 md:pr-12 last:border-0 last:pr-0">
            <div className="mb-6 bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Seamlessly Integration</h3>
            <p className="text-lg text-blue-100 leading-relaxed opacity-90">
              Seamless Integration for Enhanced Fleet Management, Maximize Efficiency, and Streamline Operations with Tracker.
            </p>
          </div>
          
          <div className="md:border-r border-white/20 md:pr-12 last:border-0 last:pr-0">
            <div className="mb-6 bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Team Collaboration Tools</h3>
            <p className="text-lg text-blue-100 leading-relaxed opacity-90">
              Foster Collaboration and Efficiency, Empower Your Team with Tracker's Advanced Collaboration Tools to Streamline Fleet Management.
            </p>
          </div>
          
          <div>
            <div className="mb-6 bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Maximize className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Leverage the Power of API</h3>
            <p className="text-lg text-blue-100 leading-relaxed opacity-90">
              Expand Functionality and Customize Your Fleet Management with Tracker's Powerful API Capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}