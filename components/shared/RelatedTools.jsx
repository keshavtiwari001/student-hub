import { getRelatedTools } from '@/data/toolsData';
import ToolCard from '@/components/ui/ToolCard';

export default function RelatedTools({ currentToolId, limit = 3, className = '' }) {
  const related = getRelatedTools(currentToolId, limit);

  if (!related.length) return null;

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
