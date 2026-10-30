'use client';

import { useState, useEffect } from 'react';

export default function AnalogClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[220px]">
        <div className="w-48 h-48 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-700 animate-spin" />
      </div>
    );
  }

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  // Degrees calculations
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  // Generate hour numbers 1 to 12
  const hourNumbers = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    // Angle in radians (30 deg per hour, offset by -60 deg or similar so 12 is at top)
    const angle = (num * Math.PI) / 6;
    // Radius percentage from center (approx 74% to leave space for hands)
    const x = 50 + 36 * Math.sin(angle);
    const y = 50 - 36 * Math.cos(angle);
    return { num, x, y };
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 select-none">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center">
        {/* Hour numbers */}
        {hourNumbers.map(({ num, x, y }) => (
          <span
            key={num}
            className="absolute font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {num}
          </span>
        ))}

        {/* Clock Center Pin */}
        <div className="absolute w-3 h-3 rounded-full bg-blue-600 z-30 shadow-sm" />

        {/* Hour Hand */}
        <div
          className="absolute w-1.5 bg-slate-900 dark:bg-white rounded-full origin-bottom z-20 transition-transform duration-75"
          style={{
            height: '28%',
            bottom: '50%',
            transform: `rotate(${hourDeg}deg)`,
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute w-1 bg-slate-700 dark:bg-slate-300 rounded-full origin-bottom z-20 transition-transform duration-75"
          style={{
            height: '38%',
            bottom: '50%',
            transform: `rotate(${minuteDeg}deg)`,
          }}
        />

        {/* Second Hand */}
        <div
          className="absolute w-0.5 bg-rose-500 rounded-full origin-bottom z-20 transition-transform duration-75"
          style={{
            height: '42%',
            bottom: '50%',
            transform: `rotate(${secondDeg}deg)`,
          }}
        />

        {/* Dial ticks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-2 bg-slate-300 dark:bg-slate-700"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-108px)`,
            }}
          />
        ))}
      </div>

      <div className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
}
