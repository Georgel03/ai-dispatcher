import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function FAQ() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">Got Questions? We've Got Answers</h2>
          <p className="text-slate-500">Explore our FAQ section today and embark on a journey.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-semibold text-slate-900 text-lg">How can PrecisionTrack benefit my business?</h3>
              <ChevronUp className="w-5 h-5 text-slate-400" />
            </div>
            <p className="mt-4 text-slate-500 leading-relaxed">
              It provides real-time visibility into your fleet's location, allowing you to track deliveries, monitor driver behavior, and optimize routes. The platform's analytics provide actionable insights.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center cursor-pointer">
            <h3 className="font-semibold text-slate-900 text-lg">Does PrecisionTrack integrate with other systems and devices?</h3>
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center cursor-pointer">
            <h3 className="font-semibold text-slate-900 text-lg">Is my data secure with PrecisionTrack?</h3>
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center cursor-pointer">
            <h3 className="font-semibold text-slate-900 text-lg">What level of technical support is available?</h3>
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        <div className="mt-12 flex justify-between items-center text-sm text-slate-500 border-t border-slate-200 pt-8">
          <p>The actual questions and answers would be tailored to the specific features.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700">Ask questions</button>
        </div>
      </div>
    </section>
  );
};
