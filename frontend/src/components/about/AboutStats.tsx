export default function AboutStats() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 border-b border-slate-200 pb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
            Impressive Statistics that<br />Define our Success
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Key Statistics that Showcase PrecisionTrack's Industry Expertise, Market Leadership, and Commitment to Delivering Results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { value: "200M+", label: "Freight Delivered" },
            { value: "20%", label: "Faster Delivery Speed" },
            { value: "99.9%", label: "Freight Visibility" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-3 tracking-tight">{stat.value}</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}