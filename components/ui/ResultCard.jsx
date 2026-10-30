'use client';

import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function ResultCard({
  title = 'Result',
  value,
  subtitle,
  status = 'neutral', // 'success' | 'warning' | 'error' | 'neutral'
  details = [], // array of { label, value }
  onReset,
  className = '',
}) {
  const [copied, setCopied] = useState(false);

  const statusStyles = {
    neutral: 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-100',
    success: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-100',
    warning: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-100',
    error: 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-100',
  };

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(`${title}: ${value}${subtitle ? ` (${subtitle})` : ''}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <div
      className={`rounded-xl border p-6 shadow-sm transition-all ${
        statusStyles[status] || statusStyles.neutral
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">{title}</h3>
        <div className="flex items-center gap-1.5">
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              icon={RotateCcw}
              title="Reset inputs"
            >
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            icon={copied ? Check : Copy}
            title="Copy result"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>

      <div className="my-3">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">{value}</div>
        {subtitle && <p className="mt-1.5 text-sm font-medium opacity-90">{subtitle}</p>}
      </div>

      {details && details.length > 0 && (
        <div className="mt-5 pt-4 border-t border-current/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {details.map((detail, i) => (
            <div key={i} className="flex justify-between sm:flex-col">
              <span className="opacity-75">{detail.label}</span>
              <span className="font-semibold">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
