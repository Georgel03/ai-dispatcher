export default function Testimonial() {
  return (
    <section className="bg-[#5465FF] py-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[400px] relative">
            <img 
              src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=2070&auto=format&fit=crop" 
              alt="Man with hat" 
              className="w-full h-full object-cover object-top opacity-90 mix-blend-overlay"
            />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-20">
            <blockquote className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight mb-8">
              "It's helped me a lot! Amazing feature to track my truck accurately. Keep it seamless and improve new feature."
            </blockquote>
            <div>
              <div className="text-sm font-bold text-white">Nick Johnson</div>
              <div className="text-[10px] text-indigo-200">CEO of Kingdelivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}