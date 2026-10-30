'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';
import { Trash2, Plus } from 'lucide-react';

export default function MarksCalculator({ tool }) {
  const [subjects, setSubjects] = useState([
    { id: 1, name: '', obtained: '', max: '100' },
    { id: 2, name: '', obtained: '', max: '100' },
    { id: 3, name: '', obtained: '', max: '100' },
  ]);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [nextId, setNextId] = useState(4);

  const handleSubjectChange = (id, field, value) => {
    setSubjects((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: nextId, name: '', obtained: '', max: '100' }]);
    setNextId((n) => n + 1);
  };

  const removeSubject = (id) => {
    if (subjects.length <= 1) {
      setError('You need at least one subject row.');
      return;
    }
    setSubjects((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    let totalObtained = 0;
    let totalMax = 0;
    let filledCount = 0;

    for (const sub of subjects) {
      if (sub.obtained === '' && sub.max === '') continue;

      const obt = parseFloat(sub.obtained);
      const m = parseFloat(sub.max);

      if (isNaN(obt) || isNaN(m) || obt < 0 || m <= 0) {
        setError('Please enter valid positive numbers for marks.');
        setResult(null);
        return;
      }

      if (obt > m) {
        setError('Obtained marks cannot exceed maximum marks for any subject.');
        setResult(null);
        return;
      }

      totalObtained += obt;
      totalMax += m;
      filledCount++;
    }

    if (filledCount === 0) {
      setError('Please fill in marks for at least one subject.');
      setResult(null);
      return;
    }

    const percentage = (totalObtained / totalMax) * 100;

    setResult({
      totalObtained,
      totalMax,
      percentage: percentage.toFixed(2),
    });
  };

  const handleReset = () => {
    setSubjects([
      { id: 1, name: '', obtained: '', max: '100' },
      { id: 2, name: '', obtained: '', max: '100' },
      { id: 3, name: '', obtained: '', max: '100' },
    ]);
    setError('');
    setResult(null);
    setNextId(4);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Enter Subject Marks
        </h2>

        {error && (
          <Alert type="error" title="Input Error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold uppercase text-slate-400 pb-1">
            <div className="col-span-5">Subject Name</div>
            <div className="col-span-3">Obtained</div>
            <div className="col-span-2">Max</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          <div className="space-y-3.5">
            {subjects.map((sub, idx) => (
              <div key={sub.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center border-b border-slate-100 dark:border-slate-800/60 pb-3 sm:pb-0 sm:border-0">
                <div className="col-span-5">
                  <InputField
                    id={`sub-name-${sub.id}`}
                    placeholder={`Subject ${idx + 1}`}
                    value={sub.name}
                    onChange={(e) => handleSubjectChange(sub.id, 'name', e.target.value)}
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-3">
                  <NumberInput
                    id={`obt-${sub.id}`}
                    placeholder="e.g. 85"
                    value={sub.obtained}
                    onChange={(e) => handleSubjectChange(sub.id, 'obtained', e.target.value)}
                    min="0"
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-2">
                  <NumberInput
                    id={`max-${sub.id}`}
                    placeholder="100"
                    value={sub.max}
                    onChange={(e) => handleSubjectChange(sub.id, 'max', e.target.value)}
                    min="1"
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-2 flex justify-end sm:justify-center">
                  <Button
                    type="button"
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
                Calculate Aggregate
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
            title="Total Aggregate"
            value={`${result.totalObtained} / ${result.totalMax}`}
            subtitle={`Percentage: ${result.percentage}%`}
            status="success"
            onReset={handleReset}
          />
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Enter your subject marks on the left.</p>
          </div>
        )}
      </div>
    </div>
  );
}
