export default function PricingHelp() {
  return (
    <section className="bg-white py-32 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">Still figuring out?</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Let Us Help You Choose the Perfect Fit for Your Fleet Management Needs. Our team of experts is ready to analyze your specific logistics requirements.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[250px] relative">
            <img 
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" 
              alt="Truck" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}