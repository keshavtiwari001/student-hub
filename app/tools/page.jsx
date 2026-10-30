import { Search } from 'lucide-react';
import { TOOLS, CATEGORIES, getToolsByCategory } from '@/data/toolsData';
import ToolCard from '@/components/ui/ToolCard';
import PageHeader from '@/components/shared/PageHeader';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export const metadata = {
  title: 'All Student Tools — Calculators & Productivity',
  description:
    'Browse all 15 free student tools: attendance, CGPA, GPA, percentage, marks, and grade calculators plus study planners, countdowns, and the Pomodoro timer.',
};

export default function AllToolsPage() {
  const academicTools = getToolsByCategory('academic');
  const productivityTools = getToolsByCategory('productivity');

  const renderToolGrid = (tools) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );

  return (
    <>
      <PageHeader
        title="All Student Tools"
        description={`Every calculator and study tool in one place. ${TOOLS.length} free tools that run instantly in your browser — no sign-up required.`}
        breadcrumbs={[{ href: '/tools', label: 'All Tools' }]}
      />

      <div className="container mx-auto px-4 py-12">
        <section aria-labelledby="academic-tools-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="academic-tools-heading" className="text-xl font-bold text-slate-900 dark:text-white">
              {CATEGORIES.academic.name}
            </h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {academicTools.length} tools
            </span>
          </div>
          <div className="mt-6">{renderToolGrid(academicTools)}</div>
        </section>

        <AdPlaceholder slot="in-content" />

        <section aria-labelledby="productivity-tools-heading" className="mt-4">
          <div className="flex items-center justify-between gap-4">
            <h2 id="productivity-tools-heading" className="text-xl font-bold text-slate-900 dark:text-white">
              {CATEGORIES.productivity.name}
            </h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {productivityTools.length} tools
            </span>
          </div>
          <div className="mt-6">{renderToolGrid(productivityTools)}</div>
        </section>

        <p className="mt-10 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Search size={15} aria-hidden="true" />
          Can&rsquo;t find what you need? <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Let us know</a> — new tools are added regularly.
        </p>
      </div>
    </>
  );
}
