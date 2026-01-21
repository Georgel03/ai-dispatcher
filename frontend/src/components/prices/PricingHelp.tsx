export default function PricingHelp() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Still figuring out?</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Let Us Help You Choose the Perfect Fit for Your Fleet Management Needs. Our team is ready to analyze your specific requirements.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg h-[150px] relative">
            <img 
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" 
              alt="Truck" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}