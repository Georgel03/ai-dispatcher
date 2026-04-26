export default function PricingCTA() {
  return (
    <section className="bg-blue-600 h-[300px] relative overflow-hidden flex items-center">
      {/* Left Geometric Shapes */}
      <div className="absolute left-0 bottom-0 h-full w-[250px] bg-emerald-400" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>
      <div className="absolute left-0 bottom-0 h-full w-[250px] bg-white z-10 opacity-10" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)', transform: 'translate(50px, 50px)' }}></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:ml-32 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Get Started Today</h2>
          <p className="text-blue-100 text-lg font-medium opacity-90">Don't miss out on the opportunity to drive your business success.</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-white text-sm font-bold hover:text-blue-100 border-2 border-white/20 rounded-full px-8 py-4 transition-colors">
            Contact Us
          </button>
          <button className="bg-white text-blue-600 text-sm font-extrabold px-8 py-4 rounded-full hover:bg-slate-50 transition shadow-xl hover:shadow-2xl">
            Request a Demo
          </button>
        </div>
      </div>
    </section>
  );
}