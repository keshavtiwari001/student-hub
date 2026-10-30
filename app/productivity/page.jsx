import { CATEGORIES, getToolsByCategory } from '@/data/toolsData';
import ToolCard from '@/components/ui/ToolCard';
import PageHeader from '@/components/shared/PageHeader';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

const productivityCategory = CATEGORIES.productivity;
const productivityTools = getToolsByCategory('productivity');

export const metadata = {
  title: 'Study & Productivity Tools — Planners, Timers & Countdowns',
  description:
    'Free study and productivity tools: study planner, exam countdown, assignment deadline calculator, study hours planner, and a customizable Pomodoro focus timer.',
};

export default function ProductivityPage() {
  return (
    <>
      <PageHeader
        title={productivityCategory.name}
        description={`${productivityCategory.description} ${productivityTools.length} free tools that save your progress right in your browser.`}
        breadcrumbs={[
          { href: '/productivity', label: 'Study & Productivity' },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productivityTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <AdPlaceholder slot="in-content" />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your plans, countdowns, and timer settings are saved locally in your browser —
          nothing is uploaded to any server.
        </p>
      </div>
    </>
  );
}
