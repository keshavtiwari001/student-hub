'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

export default function PercentageCalculator({ tool }) {
  const [obtained, setObtained] = useState('');
  const [maximum, setMaximum] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    const obt = parseFloat(obtained);
    const max = parseFloat(maximum);

    if (isNaN(obt) || isNaN(max) || obt < 0 || max <= 0) {
      setError('Please enter valid positive numbers. Maximum cannot be zero.');
      setResult(null);
      return;
    }

    if (obt > max) {
      setError('Obtained value cannot be greater than maximum value.');
      setResult(null);
      return;
    }

    const percentage = (obt / max) * 100;

    setResult({
      percentage: percentage.toFixed(2),
      obtained: obt,
      maximum: max,
    });
  };

  const handleReset = () => {
    setObtained('');
    setMaximum('');
    setError('');
    setResult(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Calculate Percentage
        </h2>

        {error && (
          <Alert type="error" title="Input Error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCalculate} className="space-y-5">
          <NumberInput
            label="Obtained Score / Marks"
            id="obtained"
            value={obtained}
            onChange={(e) => setObtained(e.target.value)}
            placeholder="e.g. 450"
            required
            min="0"
          />
          <NumberInput
            label="Maximum Possible Score / Total"
            id="maximum"
            value={maximum}
            onChange={(e) => setMaximum(e.target.value)}
            placeholder="e.g. 500"
            required
            min="1"
          />

          <div className="pt-3 flex gap-3">
            <Button type="submit" size="lg" className="flex-1">
              Calculate Percentage
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
            title="Percentage Result"
            value={`${result.percentage}%`}
            subtitle={`${result.obtained} out of ${result.maximum}`}
            status="success"
            onReset={handleReset}
          />
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Enter obtained and maximum values on the left.</p>
          </div>
        )}
      </div>
    </div>
  );
}
