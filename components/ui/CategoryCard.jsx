import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import getToolIcon from '@/components/icons';
import Card from '@/components/ui/Card';

export default function CategoryCard({ category, toolCount, className = '' }) {
  const Icon = getToolIcon(category.icon);

  return (
    <Link href={category.path} className="group block">
      <Card hover className={`h-full ${className}`}>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Icon size={22} aria-hidden="true" />
            </div>
            {toolCount !== undefined && (
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {toolCount} tools
              </span>
            )}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
            {category.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
            Browse {category.name.toLowerCase()}
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
