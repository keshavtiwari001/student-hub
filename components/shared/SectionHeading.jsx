export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
