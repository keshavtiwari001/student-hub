import { CATEGORIES, getToolsByCategory } from '@/data/toolsData';
import ToolCard from '@/components/ui/ToolCard';
import PageHeader from '@/components/shared/PageHeader';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

const academicCategory = CATEGORIES.academic;
const academicTools = getToolsByCategory('academic');

export const metadata = {
  title: 'Academic Calculators — Attendance, CGPA, GPA & Marks',
  description:
    'Free academic calculators for students: attendance percentage, CGPA, GPA, SGPA, marks, percentage, grade, backlog impact, and college fee estimates.',
};

export default function CalculatorsPage() {
  return (
    <>
      <PageHeader
        title={academicCategory.name}
        description={`${academicCategory.description} ${academicTools.length} free calculators, all running instantly in your browser.`}
        breadcrumbs={[
          { href: '/calculators', label: 'Academic Calculators' },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {academicTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <AdPlaceholder slot="in-content" />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Grading and attendance rules vary between institutions. Each calculator states its
          assumptions clearly — always verify critical decisions against your official university records.
        </p>
      </div>
    </>
  );
}
