import PageHeader from '@/components/shared/PageHeader';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import FAQSection from '@/components/shared/FAQSection';
import RelatedTools from '@/components/shared/RelatedTools';

export default function CalculatorWrapper({
  tool,
  breadcrumbs = [],
  children,
  explanationTitle,
  explanationContent,
  exampleContent,
  faqs = [],
}) {
  const toolBreadcrumbs = [
    { href: '/calculators', label: 'Academic Calculators' },
    ...breadcrumbs,
    { href: tool.path, label: tool.title },
  ];

  return (
    <>
      <PageHeader
        title={tool.title}
        description={tool.shortDescription}
        breadcrumbs={toolBreadcrumbs}
      />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Top Ad Slot */}
        <AdPlaceholder slot="top" className="mb-8" />

        {/* Main Calculator Workspace with Sidebar for Ads */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            {children}
          </div>
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <AdPlaceholder slot="sidebar" className="my-0" />
            <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100">Need a custom tool?</h4>
              <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                If there's a calculator that would make your life easier, let us know!
              </p>
              <a href="/feedback" className="mt-3 inline-block text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Submit a request &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* In-content Ad Slot */}
        <AdPlaceholder slot="in-content" className="my-10" />

        {/* Educational Content / Explanation */}
        {(explanationContent || exampleContent) && (
          <div className="mt-12 space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            {explanationContent && (
              <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {explanationTitle || `How to use the ${tool.title}`}
                </h2>
                <div className="text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed text-sm sm:text-base">
                  {explanationContent}
                </div>
              </section>
            )}

            {exampleContent && (
              <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Example & Calculation
                </h3>
                <div className="text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed text-sm sm:text-base bg-slate-50 dark:bg-slate-950/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                  {exampleContent}
                </div>
              </section>
            )}
          </div>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="mt-12">
            <FAQSection faqs={faqs} title={`Frequently Asked Questions — ${tool.title}`} />
          </div>
        )}

        {/* Related Tools */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
          <RelatedTools currentToolId={tool.id} limit={3} />
        </div>
      </div>
    </>
  );
}
