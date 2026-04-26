export default function Testimonial() {
  return (
    // Fundalul principal este acum alb
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto border border-slate-100 rounded-3xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Blocul imaginii */}
          <div className="h-[500px] md:h-[600px] relative bg-white">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2074&auto=format&fit=crop" 
              alt="Logistics Professional" 
              // Adăugatobject-[center_30%] pentru a forța centrarea pe față
              className="w-full h-full object-cover object-[center_30%]"
            />
            {/* Gradientul tranzitează acum spre alb pe margini */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/70 md:from-transparent to-transparent md:to-white/70 pointer-events-none"></div>
          </div>
          
          {/* Blocul de testimonial */}
          <div className="flex flex-col justify-center p-12 md:p-24 bg-blue-700">
            {/* Actualizat text-white și culori blue-400/opacity-50 pentru quote */}
            <blockquote className="text-3xl md:text-4xl font-semibold text-white leading-snug tracking-tight mb-12 relative z-10">
              <span className="text-blue-400/50 text-6xl absolute -top-8 -left-6 opacity-100">"</span>
              It's helped me a lot! Tracker is an amazing platform to track my trucks accurately. Keep it seamless and keep bringing new features.
            </blockquote>
            <div className="relative z-10">
              <div className="text-xl font-bold text-white mb-1">Nick Johnson</div>
              
              <div className="text-sm font-bold text-blue-200 uppercase tracking-widest">Fleet Director at KingDelivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}