export default function CTA() {
  return (
    <section className="bg-[#5465FF] h-[180px] relative overflow-hidden flex items-center">
      {/* Left Geometric Shapes */}
      <div className="absolute left-0 bottom-0 h-full w-[200px] bg-[#34D399]" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>
      <div className="absolute left-0 bottom-0 h-full w-[200px] bg-white z-10" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)', transform: 'translate(50px, 50px)' }}></div>
      <div className="absolute left-0 bottom-0 h-full w-40 bg-white opacity-20" style={{ clipPath: 'polygon(0 80%, 100% 100%, 0 100%)' }}></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex justify-between items-center">
        <div className="ml-12 md:ml-32">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-1">Get Started Today</h2>
          <p className="text-indigo-100 text-xs opacity-80">Don't miss out on the opportunity to drive success.</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-white text-xs font-medium hover:text-indigo-100">Contact Us</button>
          <button className="bg-white text-[#5465FF] text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-slate-50 transition">Request a Demo</button>
        </div>
      </div>
    </section>
  );
}