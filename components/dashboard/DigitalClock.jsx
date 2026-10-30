'use client';

import { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [time, setTime] = useState(null);
  const [use24Hour, setUse24Hour] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[180px]">
        <div className="w-48 h-12 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
        <div className="w-36 h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg mt-3" />
      </div>
    );
  }

  // Formatting Digital Clock
  let hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  let ampm = '';

  if (!use24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'
  }
  const hoursStr = String(hours).padStart(2, '0');

  // Full date format: e.g., "Thursday, Oct 8, 2026"
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = time.toLocaleDateString('en-US', dateOptions);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 select-none">
      {/* Top line: Hours, Minutes, Seconds */}
      <div className="flex items-baseline justify-center gap-2 font-mono font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
        <span>{hoursStr}:{minutes}:{seconds}</span>
        {!use24Hour && (
          <span className="text-xl sm:text-2xl font-bold font-sans text-blue-600 dark:text-blue-400 ml-1">
            {ampm}
          </span>
        )}
      </div>

      {/* Bottom line: Full Date and Day format */}
      <div className="mt-3 text-base sm:text-xl font-medium text-slate-600 dark:text-slate-300 tracking-wide">
        {formattedDate}
      </div>

      {/* Format Toggle Button */}
      <button
        type="button"
        onClick={() => setUse24Hour(!use24Hour)}
        className="mt-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Switch to {use24Hour ? '12-Hour' : '24-Hour'} Format
      </button>
    </div>
  );
}
