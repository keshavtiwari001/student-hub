import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import getToolIcon from '@/components/icons';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

const badgeVariants = { Popular: 'blue', Essential: 'rose', Interactive: 'indigo' };

export default function ToolCard({ tool, className = '' }) {
  const Icon = getToolIcon(tool.icon);
  const badgeVariant = badgeVariants[tool.badge] || 'slate';

  return (
    <Link href={tool.path} className="group block">
      <Card hover className={`h-full ${className}`}>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-blue-50 transition-colors">
              <Icon size={20} aria-hidden="true" />
            </div>
            {tool.badge && <Badge variant={badgeVariant}>{tool.badge}</Badge>}
          </div>
          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tool.title}
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {tool.shortDescription}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
            Open tool <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
