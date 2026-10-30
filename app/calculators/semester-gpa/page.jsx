'use client';

import { useState } from 'react';
import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';
import { Trash2, Plus } from 'lucide-react';

const tool = getToolById('semester-gpa');

export default function SemesterGPAPage() {
  const [subjects, setSubjects] = useState([
    { id: 1, gradePoints: '', credits: '' },
    { id: 2, gradePoints: '', credits: '' },
    { id: 3, gradePoints: '', credits: '' },
  ]);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [nextId, setNextId] = useState(4);

  const handleSubChange = (id, field, value) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: nextId, gradePoints: '', credits: '' }]);
    setNextId((n) => n + 1);
  };

  const removeSubject = (id) => {
    if (subjects.length <= 1) {
      setError('You need at least one subject row.');
      return;
    }
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    let totalCredits = 0;
    let weightedSum = 0;
    let filledCount = 0;

    for (const s of subjects) {
      if (s.gradePoints === '' && s.credits === '') continue;

      const gp = parseFloat(s.gradePoints);
      const cr = parseFloat(s.credits);

      if (isNaN(gp) || isNaN(cr) || gp < 0 || cr <= 0) {
        setError('Please enter valid positive values.');
        setResult(null);
        return;
      }

      totalCredits += cr;
      weightedSum += gp * cr;
      filledCount++;
    }

    if (filledCount === 0) {
      setError('Please fill in at least one subject.');
      setResult(null);
      return;
    }

    const sgpa = weightedSum / totalCredits;

    setResult({
      sgpa: sgpa.toFixed(2),
      totalCredits,
    });
  };

  const handleReset = () => {
    setSubjects([
      { id: 1, gradePoints: '', credits: '' },
      { id: 2, gradePoints: '', credits: '' },
      { id: 3, gradePoints: '', credits: '' },
    ]);
    setError('');
    setResult(null);
    setNextId(4);
  };

  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How Semester SGPA is Calculated"
      explanationContent={
        <p>
          Multiply each subject&apos;s earned grade points (e.g., 9 for A, 8 for B) by its respective
          credit weight, sum them all together, and divide by the total registered credits for that semester.
        </p>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Enter Subject Grade Points & Credits
          </h2>

          {error && (
            <Alert type="error" title="Input Error" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold uppercase text-slate-400 pb-1">
              <div className="col-span-6">Grade Points (e.g. 9.0)</div>
              <div className="col-span-4">Credits (e.g. 4)</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            <div className="space-y-3.5">
              {subjects.map((sub) => (
                <div key={sub.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center border-b border-slate-100 dark:border-slate-800/60 pb-3 sm:pb-0 sm:border-0">
                  <div className="col-span-6">
                    <NumberInput
                      id={`gp-${sub.id}`}
                      placeholder="Grade Points (0 - 10)"
                      value={sub.gradePoints}
                      onChange={(e) => handleSubChange(sub.id, 'gradePoints', e.target.value)}
                      min="0"
                      max="10"
                      step="0.1"
                      className="sm:mb-0"
                    />
                  </div>
                  <div className="col-span-4">
                    <NumberInput
                      id={`cr-${sub.id}`}
                      placeholder="Credits"
                      value={sub.credits}
                      onChange={(e) => handleSubChange(sub.id, 'credits', e.target.value)}
                      min="1"
                      className="sm:mb-0"
                    />
                  </div>
                  <div className="col-span-2 flex justify-end sm:justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubject(sub.id)}
                      disabled={subjects.length <= 1}
                      className="text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button type="button" variant="outline" onClick={addSubject} icon={Plus}>
                Add Subject
              </Button>
              <div className="sm:ml-auto flex gap-3 w-full sm:w-auto">
                <Button type="submit" className="flex-1 sm:flex-none">
                  Calculate SGPA
                </Button>
                <Button type="button" variant="outline" onClick={handleReset} className="flex-1 sm:flex-none">
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5">
          {result ? (
            <ResultCard
              title="Semester SGPA"
              value={result.sgpa}
              subtitle={`Total Credits: ${result.totalCredits}`}
              status="success"
              onReset={handleReset}
            />
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
              <p className="font-medium">Enter your grade points and credits on the left.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
}
