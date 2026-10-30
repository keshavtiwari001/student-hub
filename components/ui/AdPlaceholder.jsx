export default function AdPlaceholder({
  slot = 'in-content', // 'top' | 'in-content' | 'sidebar' | 'bottom'
  className = '',
}) {
  // Standard AdSense heights to prevent Cumulative Layout Shift (CLS)
  const slotStyles = {
    // 728x90 or 970x90 Leaderboard
    top: 'h-[90px] sm:h-[120px] max-w-[970px]',
    // 300x250 or 336x280 Large Rectangle
    'in-content': 'h-[280px] max-w-[728px]',
    // 300x600 Skyscraper
    sidebar: 'h-[600px] w-full max-w-[300px]',
    // 728x90 Leaderboard
    bottom: 'h-[90px] max-w-[728px]',
  };

  const styleClass = slotStyles[slot] || slotStyles['in-content'];

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col items-center justify-center p-4 text-center my-8 overflow-hidden ${styleClass} ${className}`}
    >
      <div className="flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-600">
          Advertisement
        </span>
        <div className="mt-2 text-xs text-slate-400/60 dark:text-slate-600/60 italic">
          Space reserved for Google AdSense
        </div>
      </div>
    </aside>
  );
}
