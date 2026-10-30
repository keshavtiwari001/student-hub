import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const alertConfig = {
  info: { icon: Info, styles: 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800' },
  success: { icon: CheckCircle, styles: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800' },
  warning: { icon: AlertTriangle, styles: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800' },
  error: { icon: AlertCircle, styles: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800' },
};

export default function Alert({ type = 'info', title, children, className = '' }) {
  const config = alertConfig[type] || alertConfig.info;
  const Icon = config.icon;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`flex gap-3 p-4 rounded-lg border ${config.styles} ${className}`}
    >
      <Icon size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
      <div className="text-sm">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={title ? 'mt-1' : ''}>{children}</div>}
      </div>
    </div>
  );
}
