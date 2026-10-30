'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

export default function StudyHoursCalculator({ tool }) {
  const [dailyHours, setDailyHours] = useState('4');
  const [subjectCount, setSubjectCount] = useState('5');
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState('6');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    const hrs = parseFloat(dailyHours);
    const subs = parseInt(subjectCount, 10);
    const days = parseInt(studyDaysPerWeek, 10);

    if (isNaN(hrs) || isNaN(subs) || isNaN(days) || hrs <= 0 || subs <= 0 || days <= 0 || days > 7) {
      setError('Please enter valid positive numbers. Days per week must be between 1 and 7.');
      setResult(null);
      return;
    }

    const totalWeeklyHours = hrs * days;
    const hoursPerSubjectWeekly = totalWeeklyHours / subs;
    const minutesPerSubjectDaily = (hrs * 60) / subs;

    setResult({
      totalWeeklyHours: totalWeeklyHours.toFixed(1),
      hoursPerSubjectWeekly: hoursPerSubjectWeekly.toFixed(1),
      minutesPerSubjectDaily: Math.round(minutesPerSubjectDaily),
      days,
      subs,
    });
  };

  const handleReset = () => {
    setDailyHours('4');
    setSubjectCount('5');
    setStudyDaysPerWeek('6');
    setError('');
    setResult(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Study Hours Planner
        </h2>

        {error && (
          <Alert type="error" title="Input Error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCalculate} className="space-y-5">
          <NumberInput
            label="Target Study Hours per Day"
            id="daily-hours"
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
            placeholder="e.g. 4"
            required
            min="0.5"
            step="0.5"
          />

          <NumberInput
            label="Number of Subjects"
            id="subject-count"
            value={subjectCount}
            onChange={(e) => setSubjectCount(e.target.value)}
            placeholder="e.g. 5"
            required
            min="1"
          />

          <NumberInput
            label="Study Days per Week"
            id="study-days"
            value={studyDaysPerWeek}
            onChange={(e) => setStudyDaysPerWeek(e.target.value)}
            placeholder="e.g. 6"
            required
            min="1"
            max="7"
          />

          <div className="pt-3 flex gap-3">
            <Button type="submit" size="lg" className="flex-1">
              Calculate Distribution
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-5">
        {result ? (
          <ResultCard
            title="Weekly Time Allocation"
            value={`${result.totalWeeklyHours} Hours / Week`}
            subtitle={`${result.hoursPerSubjectWeekly} hrs/week per subject`}
            status="success"
            details={[
              { label: 'Daily Time per Subject', value: `${result.minutesPerSubjectDaily} minutes` },
              { label: 'Active Study Days', value: `${result.days} days/week` },
            ]}
            onReset={handleReset}
          />
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Enter your daily study target and subject count on the left.</p>
          </div>
        )}
      </div>
    </div>
  );
}
