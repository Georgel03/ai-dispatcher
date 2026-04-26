'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

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
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={index} 
            className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300"
          >
          
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <span className="font-bold text-slate-800 text-lg">
                {faq.question}
              </span>
              <Icon 
                icon="solar:alt-arrow-down-linear" 
                className={`text-slate-500 text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <div 
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-5 text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}