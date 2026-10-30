'use client';

import { useState, useEffect } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import EmptyState from '@/components/shared/EmptyState';
import { Trash2, Plus } from 'lucide-react';

function formatCountdown(ms) {
  if (ms < 0) return { d: 0, h: 0, m: 0, s: 0, past: true };
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, past: false };
}

export default function ExamCountdown({ tool }) {
  const [exams, setExams] = useLocalStorage('exam-countdowns', []);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [error, setError] = useState('');
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const addExam = (e) => {
    e.preventDefault();
    setError('');

    if (!examName.trim()) {
      setError('Please give your exam a name.');
      return;
    }
    if (!examDate) {
      setError('Please select the exam date.');
      return;
    }

    const ts = new Date(examDate).getTime();
    if (isNaN(ts)) {
      setError('That date could not be read. Please pick a valid date.');
      return;
    }

    setExams((prev) => [...prev, { id: Date.now(), name: examName.trim(), ts }]);
    setExamName('');
    setExamDate('');
  };

  const removeExam = (id) => {
    setExams((prev) => prev.filter((ex) => ex.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={addExam} className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-10">
        <InputField
          placeholder="Exam name (e.g. Physics Final)"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="sm:col-span-5"
        />
        <InputField
          type="datetime-local"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="sm:col-span-4"
        />
        <div className="sm:col-span-3">
          <Button type="submit" icon={Plus} className="w-full">Add Countdown</Button>
        </div>
      </form>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400 mb-4">{error}</p>}

      {exams.length === 0 ? (
        <EmptyState
          title="No countdowns yet"
          description="Add your first exam to see a live day-by-day countdown."
        />
      ) : (
        <div className="space-y-4">
          {[...exams].sort((a, b) => a.ts - b.ts).map((exam) => {
            const remaining = formatCountdown(exam.ts - now);
            return (
              <div
                key={exam.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{exam.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(exam.ts).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  {remaining.past ? (
                    <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                      Completed / Past date
                    </span>
                  ) : (
                    <div className="flex items-center gap-3 font-mono text-sm">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{remaining.d}</span>
                      <span className="text-slate-500">d</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{String(remaining.h).padStart(2, '0')}</span>
                      <span className="text-slate-500">h</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{String(remaining.m).padStart(2, '0')}</span>
                      <span className="text-slate-500">m</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{String(remaining.s).padStart(2, '0')}</span>
                      <span className="text-slate-500">s</span>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeExam(exam.id)} className="text-rose-500">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
