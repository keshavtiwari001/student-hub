'use client';

import { useState } from 'react';
import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

const tool = getToolById('backlog');

export default function BacklogCalculatorPage() {
  const [currentCgpa, setCurrentCgpa] = useState('');
  const [completedCredits, setCompletedCredits] = useState('');
  const [backlogCredits, setBacklogCredits] = useState('');
  const [expectedGradePoint, setExpectedGradePoint] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    const cgpa = parseFloat(currentCgpa);
    const credits = parseFloat(completedCredits);
    const backCredits = parseFloat(backlogCredits);
    const expGp = parseFloat(expectedGradePoint);

    if (isNaN(cgpa) || isNaN(credits) || isNaN(backCredits) || isNaN(expGp)) {
      setError('Please fill in all fields with valid numbers.');
      setResult(null);
      return;
    }

    if (cgpa < 0 || cgpa > 10 || expGp < 0 || expGp > 10) {
      setError('CGPA and expected grade points must be between 0 and 10.');
      setResult(null);
      return;
    }

    if (credits <= 0 || backCredits <= 0) {
      setError('Credit values must be greater than zero.');
      setResult(null);
      return;
    }

    // New CGPA = (Current CGPA * Total Completed Credits + Expected GP * Backlog Credits) / Total Credits
    const totalWeightedSum = cgpa * credits + expGp * backCredits;
    const newTotalCredits = credits + backCredits;
    const newCgpa = totalWeightedSum / newTotalCredits;
    const boost = newCgpa - cgpa;

    setResult({
      newCgpa: newCgpa.toFixed(2),
      boost: boost.toFixed(2),
      totalCredits: newTotalCredits,
    });
  };

  const handleReset = () => {
    setCurrentCgpa('');
    setCompletedCredits('');
    setBacklogCredits('');
    setExpectedGradePoint('');
    setError('');
    setResult(null);
  };

  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How Backlog Clearing Affects CGPA"
      explanationContent={
        <p>
          When you reappear and clear a backlog subject, the new grade point earned for those credit hours
          is added to your cumulative record, increasing your overall CGPA.
        </p>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Backlog Impact Calculator
          </h2>

          {error && (
            <Alert type="error" title="Input Error" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleCalculate} className="space-y-5">
            <NumberInput
              label="Current CGPA"
              id="current-cgpa"
              value={currentCgpa}
              onChange={(e) => setCurrentCgpa(e.target.value)}
              placeholder="e.g. 6.8"
              required
              min="0"
              max="10"
              step="0.01"
            />
            <NumberInput
              label="Total Completed Credits So Far"
              id="completed-credits"
              value={completedCredits}
              onChange={(e) => setCompletedCredits(e.target.value)}
              placeholder="e.g. 80"
              required
              min="1"
            />
            <NumberInput
              label="Credits for Pending Backlog Subject(s)"
              id="backlog-credits"
              value={backlogCredits}
              onChange={(e) => setBacklogCredits(e.target.value)}
              placeholder="e.g. 4"
              required
              min="1"
            />
            <NumberInput
              label="Expected Grade Point in Re-exam (0-10)"
              id="expected-gp"
              value={expectedGradePoint}
              onChange={(e) => setExpectedGradePoint(e.target.value)}
              placeholder="e.g. 8.0"
              required
              min="0"
              max="10"
              step="0.1"
            />

            <div className="pt-3 flex gap-3">
              <Button type="submit" size="lg" className="flex-1">
                Calculate Projected CGPA
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
              title="Projected New CGPA"
              value={result.newCgpa}
              subtitle={parseFloat(result.boost) >= 0 ? `+${result.boost} CGPA Increase` : `${result.boost} CGPA Change`}
              status="success"
              details={[
                { label: 'New Total Credits', value: result.totalCredits },
                { label: 'Original CGPA', value: currentCgpa },
              ]}
              onReset={handleReset}
            />
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
              <p className="font-medium">Enter your CGPA and backlog details on the left.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
}
