'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

export default function AssignmentDeadline({ tool }) {
  const [deadlineDate, setDeadlineDate] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    if (!deadlineDate) {
      setError('Please select a deadline date and time.');
      setResult(null);
      return;
    }

    const deadlineTs = new Date(deadlineDate).getTime();
    const nowTs = Date.now();

    if (isNaN(deadlineTs)) {
      setError('Could not parse selected date.');
      setResult(null);
      return;
    }

    const diffMs = deadlineTs - nowTs;

    if (diffMs < 0) {
      setResult({
        past: true,
        message: 'The selected deadline has already passed.',
        status: 'error',
      });
      return;
    }

    const totalHours = diffMs / 3600000;
    const days = Math.floor(totalHours / 24);
    const hours = Math.floor(totalHours % 24);

    let urgency = 'neutral';
    let subtitle = 'Safe';

    if (totalHours < 24) {
      urgency = 'error';
      subtitle = 'Urgent! Due in less than 24 hours';
    } else if (totalHours < 72) {
      urgency = 'warning';
      subtitle = 'Warning: Due in less than 3 days';
    } else {
      urgency = 'success';
      subtitle = 'On Track';
    }

    setResult({
      past: false,
      value: `${days}d ${hours}h remaining`,
      subtitle,
      status: urgency,
      details: [
        { label: 'Due Date', value: new Date(deadlineTs).toLocaleString() },
        { label: 'Total Hours Left', value: Math.floor(totalHours) },
      ],
    });
  };

  const handleReset = () => {
    setDeadlineDate('');
    setError('');
    setResult(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Enter Assignment Due Date
        </h2>

        {error && (
          <Alert type="error" title="Input Error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCalculate} className="space-y-5">
          <InputField
            label="Select Deadline Date & Time"
            id="deadline-date"
            type="datetime-local"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            required
          />

          <div className="pt-3 flex gap-3">
            <Button type="submit" size="lg" className="flex-1">
              Calculate Urgency
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-5">
        {result ? (
          result.past ? (
            <ResultCard
              title="Deadline Passed"
              value="0d 0h"
              subtitle={result.message}
              status="error"
              onReset={handleReset}
            />
          ) : (
            <ResultCard
              title="Time Remaining"
              value={result.value}
              subtitle={result.subtitle}
              status={result.status}
              details={result.details}
              onReset={handleReset}
            />
          )
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Pick your assignment's deadline date and time on the left.</p>
          </div>
        )}
      </div>
    </div>
  );
}
