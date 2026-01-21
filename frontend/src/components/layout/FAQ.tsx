'use client'

import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer?: string, isOpen: boolean, onClick: () => void }) => (
  <div 
    className={`bg-white p-6 rounded shadow-sm border border-slate-100 cursor-pointer transition-all ${isOpen ? 'p-8' : ''}`}
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-slate-900 text-sm">{question}</h3>
      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
    </div>
    {isOpen && (
      <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-3xl animate-in fade-in slide-in-from-top-2">
        {answer}
      </p>
    )}
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const questions = [
    {
      q: "How can PrecisionTrack benefit my business?",
      a: "It provides real-time visibility into your fleet's location, allowing you to track deliveries, monitor driver behavior, and optimize routes. The platform's analytics and reporting features enable data-driven decision making, leading to improved operational efficiency, reduced fuel costs, enhanced delivery accuracy, and increased customer satisfaction."
    },
    { q: "Does PrecisionTrack integrate with other systems and devices?", a: "Yes, we offer full API integration capabilities." },
    { q: "Is my data secure with PrecisionTrack?", a: "We use enterprise-grade encryption and security protocols." },
    { q: "What level of technical support is available?", a: "24/7 dedicated support for all enterprise clients." },
  ];

  return (
    <section className="bg-slate-50 py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">Got Questions?</h2>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">We've Got Answers</h2>
          </div>
          <div className="flex items-end">
            <p className="text-slate-500 text-xs max-w-sm">
              Explore our FAQ section today and embark on a journey toward optimized operations, improved efficiency, and increased productivity with PrecisionTrack.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((item, idx) => (
            <FAQItem 
              key={idx} 
              question={item.q} 
              answer={item.a} 
              isOpen={openIndex === idx} 
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400">The actual questions and answers would be tailored to the specific features, functionalities, and concerns.</p>
          <button className="bg-[#5465FF] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-blue-600 transition">Ask questions</button>
        </div>
      </div>
    </section>
  );
}