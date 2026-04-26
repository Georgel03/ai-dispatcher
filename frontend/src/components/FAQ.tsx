'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How can Tracker benefit my business?",
    answer: "It provides real-time visibility into your fleet's location, allowing you to track deliveries, monitor driver behavior, and optimize routes. The platform's analytics provide actionable insights."
  },
  {
    question: "Does Tracker integrate with other systems and devices?",
    answer: "Yes, our API and webhook systems allow seamless integration with your existing ERP, CRM, or custom internal tools."
  },
  {
    question: "Is my data secure with Tracker?",
    answer: "Absolutely. We use industry-standard encryption protocols and secure cloud infrastructure to ensure your fleet data is strictly confidential."
  },
  {
    question: "What level of technical support is available?",
    answer: "We offer 24/7 technical support for our Enterprise tier, and standard business hours support for Basic and Pro users."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); 

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-slate-500">
            Explore our FAQ section today and embark on a journey.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`bg-white rounded-lg border transition-all duration-300 ${isOpen ? 'border-blue-200 shadow-md' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 cursor-pointer text-left focus:outline-none"
                >
                  <h3 className={`font-semibold text-lg transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900'}`}>
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-6 text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-500 border-t border-slate-200 pt-8">
          <p>The actual questions and answers would be tailored to the specific features.</p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md whitespace-nowrap">
            Ask questions
          </button>
        </div>
      </div>
    </section>
  );
}