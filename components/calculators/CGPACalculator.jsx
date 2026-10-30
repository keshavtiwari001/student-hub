'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';
import { Trash2, Plus } from 'lucide-react';

export default function CGPACalculator({ tool }) {
  const [semesters, setSemesters] = useState([
    { id: 1, gpa: '', credits: '' },
    { id: 2, gpa: '', credits: '' },
  ]);
  const [scale, setScale] = useState('10');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [nextId, setNextId] = useState(3);

  const handleSemesterChange = (id, field, value) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addSemester = () => {
    setSemesters((prev) => [...prev, { id: nextId, gpa: '', credits: '' }]);
    setNextId((n) => n + 1);
  };

  const removeSemester = (id) => {
    if (semesters.length <= 1) {
      setError('You need at least one semester row.');
      return;
    }
    setSemesters((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    let totalCredits = 0;
    let weightedSum = 0;
    let filledCount = 0;
    const maxGpa = parseFloat(scale);

    for (const s of semesters) {
      if (s.gpa === '' && s.credits === '') continue;

      const gpaVal = parseFloat(s.gpa);
      const creditsVal = parseFloat(s.credits);

      if (isNaN(gpaVal) || isNaN(creditsVal) || gpaVal < 0 || creditsVal < 0) {
        setError('Please enter valid positive values for all filled semesters.');
        setResult(null);
        return;
      }

      if (gpaVal > maxGpa) {
        setError(`Semester GPA cannot exceed the selected ${maxGpa}-point scale.`);
        setResult(null);
        return;
      }

      totalCredits += creditsVal;
      weightedSum += gpaVal * creditsVal;
      filledCount++;
    }

    if (filledCount === 0) {
      setError('Please fill in at least one semester row.');
      setResult(null);
      return;
    }

    if (totalCredits === 0) {
      setError('Total credits cannot be zero.');
      setResult(null);
      return;
    }

    const cgpa = weightedSum / totalCredits;

    setResult({
      cgpa: cgpa.toFixed(2),
      totalCredits,
      scale: maxGpa,
    });
  };

  const handleReset = () => {
    setSemesters([
      { id: 1, gpa: '', credits: '' },
      { id: 2, gpa: '', credits: '' },
    ]);
    setScale('10');
    setError('');
    setResult(null);
    setNextId(3);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Enter Semester Details
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="gpa-scale" className="text-xs font-semibold uppercase text-slate-500">Scale:</label>
            <select
              id="gpa-scale"
              value={scale}
              onChange={(e) => {
                setScale(e.target.value);
                setResult(null);
              }}
              className="bg-slate-100 dark:bg-slate-800 border-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10-Point Scale</option>
              <option value="4">4-Point Scale</option>
            </select>
          </div>
        </div>

        {error && (
          <Alert type="error" title="Input Error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold uppercase text-slate-400 pb-1">
            <div className="col-span-6">Semester GPA</div>
            <div className="col-span-4">Credits (Weight)</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          <div className="space-y-3.5">
            {semesters.map((sem, idx) => (
              <div key={sem.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center border-b border-slate-100 dark:border-slate-800/60 pb-3 sm:pb-0 sm:border-0">
                <div className="col-span-6">
                  <NumberInput
                    id={`gpa-${sem.id}`}
                    placeholder={`Semester ${idx + 1} GPA`}
                    value={sem.gpa}
                    onChange={(e) => handleSemesterChange(sem.id, 'gpa', e.target.value)}
                    min="0"
                    max={scale}
                    step="0.01"
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-4">
                  <NumberInput
                    id={`credits-${sem.id}`}
                    placeholder="Credits"
                    value={sem.credits}
                    onChange={(e) => handleSemesterChange(sem.id, 'credits', e.target.value)}
                    min="1"
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-2 flex justify-end sm:justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSemester(sem.id)}
                    disabled={semesters.length <= 1}
                    className="text-rose-600 hover:text-rose-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button type="button" variant="outline" onClick={addSemester} icon={Plus}>
              Add Semester
            </Button>
            <div className="sm:ml-auto flex gap-3 w-full sm:w-auto">
              <Button type="submit" className="flex-1 sm:flex-none">
                Calculate CGPA
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
            title="Calculated CGPA"
            value={result.cgpa}
            subtitle={`Out of ${result.scale}-point scale`}
            status="success"
            details={[
              { label: 'Total Semesters', value: semesters.filter(s => s.gpa !== '').length },
              { label: 'Cumulative Credits', value: result.totalCredits },
            ]}
            onReset={handleReset}
          />
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Enter your semesters, GPA, and credit weighting on the left.</p>
          </div>
        )}
      </div>
    </div>
  );
}
