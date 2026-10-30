export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm ${
        hover ? 'transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
