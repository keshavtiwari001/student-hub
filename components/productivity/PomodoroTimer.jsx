'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { Play, Pause, RotateCcw, Coffee, Zap, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

const PRESETS = {
  work: { label: 'Focus', minutes: 25, seconds: 0, color: 'text-blue-600 dark:text-blue-400' },
  shortBreak: { label: 'Short Break', minutes: 5, seconds: 0, color: 'text-emerald-600 dark:text-emerald-400' },
  longBreak: { label: 'Long Break', minutes: 15, seconds: 0, color: 'text-indigo-600 dark:text-indigo-400' },
  custom: { label: 'Custom', minutes: 30, seconds: 0, color: 'text-purple-600 dark:text-purple-400' },
};

export default function PomodoroTimer({ tool }) {
  const [mode, setMode] = useState('work');
  const [customMinutes, setCustomMinutes] = useState('30');
  const [customSeconds, setCustomSeconds] = useState('0');
  const [timeLeft, setTimeLeft] = useState(PRESETS.work.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(timerRef.current);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const getInitialTime = (targetMode) => {
    if (targetMode === 'custom') {
      const m = parseInt(customMinutes, 10) || 0;
      const s = parseInt(customSeconds, 10) || 0;
      const total = m * 60 + s;
      return total > 0 ? total : 60; // fallback to 1 min if 0
    }
    return PRESETS[targetMode].minutes * 60;
  };

  const toggleTimer = () => {
    if (timeLeft === 0) {
      const resetDuration = getInitialTime(mode);
      setTimeLeft(resetDuration);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getInitialTime(mode));
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(getInitialTime(newMode));
  };

  const handleCustomDurationChange = (newM, newS) => {
    let m = parseInt(newM, 10) || 0;
    // Cap at 720 minutes (12 hours)
    if (m > 720) m = 720;
    if (m < 0) m = 0;

    let s = Math.max(0, Math.min(59, parseInt(newS, 10) || 0));

    setCustomMinutes(m.toString());
    setCustomSeconds(newS);

    if (!isActive) {
      const total = m * 60 + s;
      setTimeLeft(total > 0 ? total : 60);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm">
        {/* Preset & Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          {Object.entries(PRESETS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => changeMode(key)}
              className={`flex-1 min-w-[100px] px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                mode === key
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Custom Input Controls */}
        {mode === 'custom' && (
          <div className="mb-6 p-4 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 rounded-2xl">
            <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
              <SlidersHorizontal size={14} />
              <span>Set Custom Duration</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  id="custom-minutes"
                  min="0"
                  max="720"
                  value={customMinutes}
                  disabled={isActive}
                  onChange={(e) => handleCustomDurationChange(e.target.value, customSeconds)}
                  className="w-20 px-2 py-2 text-center text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-60"
                  placeholder="30"
                />
                <label htmlFor="custom-minutes" className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Minutes (Max 720)
                </label>
              </div>

              <span className="text-xl font-bold text-slate-400 pb-5">:</span>

              <div className="flex flex-col items-center">
                <input
                  type="number"
                  id="custom-seconds"
                  min="0"
                  max="59"
                  value={customSeconds}
                  disabled={isActive}
                  onChange={(e) => handleCustomDurationChange(customMinutes, e.target.value)}
                  className="w-20 px-2 py-2 text-center text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-60"
                  placeholder="00"
                />
                <label htmlFor="custom-seconds" className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Seconds
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Timer Display */}
        <div className="mb-10">
          <div className={`text-7xl sm:text-8xl font-black tabular-nums tracking-tighter ${PRESETS[mode].color}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
            {timeLeft === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={16} /> Completed!
              </span>
            ) : isActive ? (
              'Timer Running'
            ) : (
              'Paused'
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-48 h-14 text-lg rounded-2xl"
            onClick={toggleTimer}
            icon={isActive ? Pause : Play}
          >
            {isActive ? 'Pause' : timeLeft === 0 ? 'Start Again' : 'Start'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-14 px-8 rounded-2xl"
            onClick={resetTimer}
            icon={RotateCcw}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Motivational / Context Hint */}
      <div className="mt-8 flex items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
        {mode === 'work' && (
          <>
            <Zap size={18} className="text-amber-500" />
            <p className="text-sm italic">Avoid distractions and stay focused for 25 minutes.</p>
          </>
        )}
        {mode === 'shortBreak' && (
          <>
            <Coffee size={18} className="text-emerald-500" />
            <p className="text-sm italic">Stretch, hydrate, and rest your eyes.</p>
          </>
        )}
        {mode === 'longBreak' && (
          <>
            <Coffee size={18} className="text-indigo-500" />
            <p className="text-sm italic">Take a walk, grab a healthy snack, or relax.</p>
          </>
        )}
        {mode === 'custom' && (
          <>
            <SlidersHorizontal size={18} className="text-purple-500" />
            <p className="text-sm italic">Personalized session: set your ideal study or break interval.</p>
          </>
        )}
      </div>
    </div>
  );
}
