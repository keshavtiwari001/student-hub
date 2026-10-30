import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = forwardRef(function SelectField(
  {
    label,
    id,
    name,
    value,
    onChange,
    options = [],
    helperText,
    error,
    required = false,
    className = '',
    placeholder = 'Select an option',
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
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`block w-full appearance-none rounded-lg border px-3.5 py-2.5 pr-10 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-400 focus:ring-rose-500/60 focus:border-rose-500'
              : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500/60 focus:border-blue-500'
          } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <ChevronDown size={16} aria-hidden="true" />
        </div>
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

export default SelectField;
