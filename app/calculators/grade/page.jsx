'use client';

import { useState } from 'react';
import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import NumberInput from '@/components/ui/NumberInput';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

const tool = getToolById('grade');

const GRADING_SCALES = [
  { label: 'Standard US 4-Point Scale (A-F)', value: 'us-4' },
  { label: 'Standard Indian 10-Point Scale (O-F)', value: 'in-10' },
];

export default function GradeCalculatorPage() {
  const [score, setScore] = useState('');
  const [scale, setScale] = useState('us-4');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const getUsGrade = (pct) => {
    if (pct >= 93) return { grade: 'A', points: '4.0', status: 'success' };
    if (pct >= 90) return { grade: 'A-', points: '3.7', status: 'success' };
    if (pct >= 87) return { grade: 'B+', points: '3.3', status: 'success' };
    if (pct >= 83) return { grade: 'B', points: '3.0', status: 'success' };
    if (pct >= 80) return { grade: 'B-', points: '2.7', status: 'success' };
    if (pct >= 77) return { grade: 'C+', points: '2.3', status: 'neutral' };
    if (pct >= 73) return { grade: 'C', points: '2.0', status: 'neutral' };
    if (pct >= 70) return { grade: 'C-', points: '1.7', status: 'neutral' };
    if (pct >= 67) return { grade: 'D+', points: '1.3', status: 'warning' };
    if (pct >= 60) return { grade: 'D', points: '1.0', status: 'warning' };
    return { grade: 'F', points: '0.0', status: 'error' };
  };

  const getInGrade = (pct) => {
    if (pct >= 90) return { grade: 'O (Outstanding)', points: '10', status: 'success' };
    if (pct >= 80) return { grade: 'A+ (Excellent)', points: '9', status: 'success' };
    if (pct >= 70) return { grade: 'A (Very Good)', points: '8', status: 'success' };
    if (pct >= 60) return { grade: 'B+ (Good)', points: '7', status: 'neutral' };
    if (pct >= 55) return { grade: 'B (Above Average)', points: '6', status: 'neutral' };
    if (pct >= 50) return { grade: 'C (Average)', points: '5', status: 'neutral' };
    if (pct >= 40) return { grade: 'P (Pass)', points: '4', status: 'warning' };
    return { grade: 'F (Fail)', points: '0', status: 'error' };
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    const pct = parseFloat(score);

    if (isNaN(pct) || pct < 0 || pct > 100) {
      setError('Please enter a valid percentage score between 0 and 100.');
      setResult(null);
      return;
    }

    const res = scale === 'us-4' ? getUsGrade(pct) : getInGrade(pct);

    setResult({
      grade: res.grade,
      points: res.points,
      status: res.status,
      percentage: pct.toFixed(1),
    });
  };

  const handleReset = () => {
    setScore('');
    setScale('us-4');
    setError('');
    setResult(null);
  };

  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="Understanding Grading Systems"
      explanationContent={
        <p>
          Grading scales convert percentages into letter grades and numerical grade points (GPA). Different
          regions and universities use distinct models. The <strong>US 4.0 Scale</strong> is common in North America,
          while the <strong>Indian 10-Point Scale</strong> is widely used in Indian universities (such as UGC/AICTE-aligned colleges).
        </p>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Convert Score to Grade
          </h2>

          {error && (
            <Alert type="error" title="Input Error" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleCalculate} className="space-y-5">
            <SelectField
              label="Select Grading Standard"
              id="grading-scale"
              value={scale}
              onChange={(e) => {
                setScale(e.target.value);
                setResult(null);
              }}
              options={GRADING_SCALES}
              placeholder=""
            />

            <NumberInput
              label="Enter Percentage Score (%)"
              id="percentage-score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="e.g. 84.5"
              required
              min="0"
              max="100"
              step="0.01"
            />

            <div className="pt-3 flex gap-3">
              <Button type="submit" size="lg" className="flex-1">
                Calculate Grade
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
              title="Grade Result"
              value={result.grade}
              subtitle={`Grade Points: ${result.points}`}
              status={result.status}
              details={[
                { label: 'Score Entered', value: `${result.percentage}%` },
                { label: 'Grading Scale', value: scale === 'us-4' ? 'US 4-Point' : 'Indian 10-Point' },
              ]}
              onReset={handleReset}
            />
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
              <p className="font-medium">Enter your score and select standard on the left.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
}
