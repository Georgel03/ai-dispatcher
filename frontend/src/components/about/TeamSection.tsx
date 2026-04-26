export default function TeamSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-[500px] rounded-3xl overflow-hidden mb-16 shadow-xl relative">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Group Team" 
            className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
          />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
            Join Our Passionate Team and Shape the Future of Fleet Management
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Unleash Your Potential and Make an Impact. Discover Exciting Career Opportunities at PrecisionTrack, Where Passionate Professionals Drive Innovation and Shape the Future of Fleet Management.
          </p>
          <button className="bg-blue-600 text-white text-sm font-bold px-10 py-4 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
            View Open Positions
          </button>
        </div>
      </div>
    </section>
  );
}