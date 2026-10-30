'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

export default function AttendanceCalculator({ tool }) {
  const [totalClasses, setTotalClasses] = useState('');
  const [attendedClasses, setAttendedClasses] = useState('');
  const [targetPercentage, setTargetPercentage] = useState('75');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    const total = parseInt(totalClasses, 10);
    const attended = parseInt(attendedClasses, 10);
    const target = parseFloat(targetPercentage);

    if (isNaN(total) || isNaN(attended) || total < 0 || attended < 0) {
      setError('Please enter valid positive numbers for classes.');
      setResult(null);
      return;
    }

    if (attended > total) {
      setError('Classes attended cannot be greater than total classes.');
      setResult(null);
      return;
    }

    if (isNaN(target) || target < 0 || target > 100) {
      setError('Target percentage must be between 0 and 100.');
      setResult(null);
      return;
    }

    if (total === 0) {
      setError('Total classes cannot be zero.');
      setResult(null);
      return;
    }

    const percentage = (attended / total) * 100;
    const isSafe = percentage >= target;

    let advice = '';
    let status = 'neutral';

    if (percentage >= target) {
      status = 'success';
      const maxBunks = Math.floor((attended - (target / 100) * total) / (target / 100));
      if (maxBunks > 0) {
        advice = `You can safely miss the next ${maxBunks} class${maxBunks === 1 ? '' : 'es'} while maintaining your ${target}% target.`;
      } else {
        advice = `You are right at or above your target! Avoid missing upcoming classes to stay safe.`;
      }
    } else {
      status = 'warning';
      const needed = Math.ceil(((target / 100) * total - attended) / (1 - target / 100));
      advice = `You need to attend the next ${needed} consecutive class${needed === 1 ? '' : 'es'} to reach your ${target}% target.`;
    }

    setResult({
      percentage: percentage.toFixed(2),
      status,
      advice,
      attended,
      total,
      target,
    });
  };

  const handleReset = () => {
    setTotalClasses('');
    setAttendedClasses('');
    setTargetPercentage('75');
    setError('');
    setResult(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Enter Attendance Details
        </h2>

        {error && (
          <Alert type="error" title="Invalid Input" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCalculate} className="space-y-5">
          <NumberInput
            label="Total Classes Conducted"
            id="total-classes"
            value={totalClasses}
            onChange={(e) => setTotalClasses(e.target.value)}
            placeholder="e.g. 45"
            required
            min="1"
            helperText="Total number of classes held by the professor so far."
          />

          <NumberInput
            label="Classes Attended"
            id="attended-classes"
            value={attendedClasses}
            onChange={(e) => setAttendedClasses(e.target.value)}
            placeholder="e.g. 38"
            required
            min="0"
            helperText="Number of classes you were present for."
          />

          <NumberInput
            label="Target Attendance Percentage (%)"
            id="target-percentage"
            value={targetPercentage}
            onChange={(e) => setTargetPercentage(e.target.value)}
            placeholder="e.g. 75"
            required
            min="1"
            max="100"
            helperText="Your institution's minimum required attendance."
          />

          <div className="pt-3 flex gap-3">
            <Button type="submit" size="lg" className="flex-1">
              Calculate Attendance
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-5 space-y-6">
        {result ? (
          <ResultCard
            title="Attendance Result"
            value={`${result.percentage}%`}
            subtitle={result.status === 'success' ? 'Target Met (Safe)' : 'Shortage Warning'}
            status={result.status}
            details={[
              { label: 'Attended / Total', value: `${result.attended} / ${result.total}` },
              { label: 'Target Threshold', value: `${result.target}%` },
            ]}
            onReset={handleReset}
          />
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Enter your classes and attended count on the left.</p>
            <p className="text-xs mt-1">Your percentage and analysis will appear here instantly.</p>
          </div>
        )}

        {result && (
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-5 text-sm text-blue-900 dark:text-blue-200">
            <p className="font-semibold mb-1">Recommendation:</p>
            <p>{result.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
