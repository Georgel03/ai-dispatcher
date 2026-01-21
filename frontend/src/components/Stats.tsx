import React from 'react';

export default function Stats() {
  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">Powering Trucking Success with PrecisionTrack</h2>
        <p className="text-blue-100 text-lg mb-16 max-w-2xl mx-auto">Harnessing Data for Informed Decision Making and Operational Excellence</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { val: "500", suffix: "+", label: "Companies Collaborating" },
            { val: "98", suffix: "%", label: "Delivery Accuracy Increased" },
            { val: "40", suffix: "%", label: "Reduction in Fuel Costs" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-blue-700/50 p-10 rounded-xl backdrop-blur-sm border border-blue-500/30 text-left">
              <div className="text-5xl font-semibold text-white mb-2">{stat.val}<span className="text-2xl align-top">{stat.suffix}</span></div>
              <div className="text-blue-100 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
