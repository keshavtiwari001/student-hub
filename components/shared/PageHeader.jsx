import Breadcrumb from '@/components/ui/Breadcrumb';

export default function PageHeader({ title, description, breadcrumbs = [], className = '' }) {
  return (
    <div className={`border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 ${className}`}>
      <div className="container mx-auto px-4 py-8 sm:py-10">
        {breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
