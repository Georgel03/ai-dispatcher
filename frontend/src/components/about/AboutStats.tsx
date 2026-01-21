export default function AboutStats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-100 pb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
            Impressive Statistics that<br />Define our Success
          </h2>
          <p className="text-[11px] text-slate-500 max-w-lg">
            Key Statistics that Showcase PrecisionTrack's Industry Expertise,<br />Market Leadership, and Commitment to Delivering Results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "200M", label: "Freight Delivered" },
            { value: "20%", label: "Delivery Speed" },
            { value: "7,736", label: "Freight Visibility" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs font-medium text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}