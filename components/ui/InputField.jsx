import { forwardRef } from 'react';

const baseFieldClasses =
  'block w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed';

const stateClasses = {
  default:
    'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100',
  error:
    'bg-white dark:bg-slate-900 border-rose-400 dark:border-rose-500 text-slate-900 dark:text-slate-100 focus:ring-rose-500/60 focus:border-rose-500',
};

const InputField = forwardRef(function InputField(
  {
    label,
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    helperText,
    error,
    required = false,
    className = '',
    min,
    max,
    step,
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
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`${baseFieldClasses} ${error ? stateClasses.error : stateClasses.default}`}
        min={min}
        max={max}
        step={step}
        {...props}
      />
      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
});

export default InputField;
