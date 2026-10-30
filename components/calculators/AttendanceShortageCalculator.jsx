'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

export default function AttendanceShortageCalculator({ tool }) {
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
      setError('Please enter valid positive numbers.');
      setResult(null);
      return;
    }

    if (attended > total) {
      setError('Classes attended cannot exceed total classes.');
      setResult(null);
      return;
    }

    if (total === 0) {
      setError('Total classes cannot be zero.');
      setResult(null);
      return;
    }

    const currentPercentage = (attended / total) * 100;

    if (currentPercentage >= target) {
      setResult({
        alreadySafe: true,
        currentPercentage: currentPercentage.toFixed(2),
        message: `Your current attendance is ${currentPercentage.toFixed(2)}%, which already meets or exceeds your ${target}% target!`,
      });
      return;
    }

    const targetRatio = target / 100;
    const classesNeeded = Math.ceil((targetRatio * total - attended) / (1 - targetRatio));

    setResult({
      alreadySafe: false,
      currentPercentage: currentPercentage.toFixed(2),
      classesNeeded,
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
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Enter Current Status
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
            placeholder="e.g. 50"
            required
            min="1"
          />
          <NumberInput
            label="Classes Attended"
            id="attended-classes"
            value={attendedClasses}
            onChange={(e) => setAttendedClasses(e.target.value)}
            placeholder="e.g. 32"
            required
            min="0"
          />
          <NumberInput
            label="Target Attendance (%)"
            id="target-percentage"
            value={targetPercentage}
            onChange={(e) => setTargetPercentage(e.target.value)}
            placeholder="e.g. 75"
            required
            min="1"
            max="100"
          />

          <div className="pt-3 flex gap-3">
            <Button type="submit" size="lg" className="flex-1">
              Calculate Shortage Recovery
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-6">
        {result ? (
          result.alreadySafe ? (
            <ResultCard
              title="Already Safe"
              value={`${result.currentPercentage}%`}
              subtitle={`Target: ${result.target}%`}
              status="success"
              onReset={handleReset}
            />
          ) : (
            <ResultCard
              title="Classes Needed"
              value={`${result.classesNeeded} classes`}
              subtitle={`Current: ${result.currentPercentage}% (Target: ${result.target}%)`}
              status="warning"
              onReset={handleReset}
            />
          )
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Enter your details to find out how many classes to attend.</p>
          </div>
        )}

        {result && !result.alreadySafe && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-5 text-sm text-amber-900 dark:text-amber-200">
            <p className="font-semibold mb-1">Action Required:</p>
            <p>You must attend the next <strong>{result.classesNeeded}</strong> classes in a row without any absences to hit {result.target}%.</p>
          </div>
        )}
      </div>
    </div>
  );
}
