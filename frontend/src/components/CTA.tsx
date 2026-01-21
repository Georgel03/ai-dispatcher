import React from 'react';

export default function CTA() {
  return (
    <section className="bg-blue-600 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-green-400 transform -skew-x-12 translate-y-1/2 -translate-x-1/4 opacity-90"></div>
      <div className="absolute left-32 bottom-0 w-32 h-96 bg-blue-500 transform -skew-x-12 translate-y-1/3 opacity-80"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-white mb-2">Get Started Today</h2>
          <p className="text-blue-100 text-lg">Don't miss out on the opportunity to drive success.</p>
        </div>
        <div className="flex gap-4">
          <button className="text-white font-medium hover:text-blue-100 transition">Contact Us</button>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition">Request a Demo</button>
        </div>
      </div>
    </section>
  );
};

