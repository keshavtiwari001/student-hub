import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const NumberInput = forwardRef(function NumberInput(
  {
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    helperText,
    error,
    required = false,
    className = '',
    min,
    max,
    step = 'any',
    ...props
  },
  ref
) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
          {required && <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          name={name}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`block w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-400 focus:ring-rose-500/60 focus:border-rose-500'
              : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500/60 focus:border-blue-500'
          } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
          min={min}
          max={max}
          step={step}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <AlertCircle size={16} className="text-rose-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default NumberInput;
