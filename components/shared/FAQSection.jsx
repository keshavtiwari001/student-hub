'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection({ faqs = [], title = 'Frequently Asked Questions', className = '' }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs.length) return null;

  return (
    <section className={className} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div
                  id={`faq-panel-${index}`}
                  className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
