export default function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Group Image */}
        <div className="w-full h-[320px] rounded-2xl overflow-hidden mb-12 shadow-sm relative">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Group Team" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            Join Our Passionate Team and Shape the Future of<br />Fleet Management
          </h2>
          <p className="text-[10px] text-slate-500 mb-8 leading-relaxed max-w-lg mx-auto">
            Unleash Your Potential and Make an Impact. Discover Exciting Career Opportunities at PrecisionTrack, Where Passionate Professionals Drive Innovation and Shape the Future of Fleet Management
          </p>
          <button className="bg-[#5465FF] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-blue-600 transition shadow-lg shadow-blue-500/20">
            Career In Tracker
          </button>
        </div>
      </div>
    </section>
  );
}