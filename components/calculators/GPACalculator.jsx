'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';
import { Trash2, Plus } from 'lucide-react';

const GRADE_VALUES = [
  { label: 'A+ (10.0)', value: '10' },
  { label: 'A (9.0)', value: '9' },
  { label: 'B+ (8.0)', value: '8' },
  { label: 'B (7.0)', value: '7' },
  { label: 'C+ (6.0)', value: '6' },
  { label: 'C (5.0)', value: '5' },
  { label: 'D (4.0)', value: '4' },
  { label: 'F (0.0)', value: '0' },
];

export default function GPACalculator({ tool }) {
  const [courses, setCourses] = useState([
    { id: 1, name: '', grade: '10', credits: '' },
    { id: 2, name: '', grade: '9', credits: '' },
    { id: 3, name: '', grade: '8', credits: '' },
  ]);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [nextId, setNextId] = useState(4);

  const handleCourseChange = (id, field, value) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, { id: nextId, name: '', grade: '10', credits: '' }]);
    setNextId((n) => n + 1);
  };

  const removeCourse = (id) => {
    if (courses.length <= 1) {
      setError('You need at least one course row.');
      return;
    }
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    let totalCredits = 0;
    let weightedSum = 0;
    let filledCount = 0;

    for (const c of courses) {
      if (c.credits === '') continue;

      const gradeVal = parseFloat(c.grade);
      const creditsVal = parseFloat(c.credits);

      if (isNaN(creditsVal) || creditsVal <= 0) {
        setError('Please enter valid positive credits for all filled courses.');
        setResult(null);
        return;
      }

      totalCredits += creditsVal;
      weightedSum += gradeVal * creditsVal;
      filledCount++;
    }

    if (filledCount === 0) {
      setError('Please fill in credits for at least one course.');
      setResult(null);
      return;
    }

    if (totalCredits === 0) {
      setError('Total credits cannot be zero.');
      setResult(null);
      return;
    }

    const gpa = weightedSum / totalCredits;

    setResult({
      gpa: gpa.toFixed(2),
      totalCredits,
    });
  };

  const handleReset = () => {
    setCourses([
      { id: 1, name: '', grade: '10', credits: '' },
      { id: 2, name: '', grade: '9', credits: '' },
      { id: 3, name: '', grade: '8', credits: '' },
    ]);
    setError('');
    setResult(null);
    setNextId(4);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Enter Course Grades
        </h2>

        {error && (
          <Alert type="error" title="Input Error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold uppercase text-slate-400 pb-1">
            <div className="col-span-5">Course Name</div>
            <div className="col-span-3">Grade Point</div>
            <div className="col-span-2">Credits</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          <div className="space-y-3.5">
            {courses.map((course, idx) => (
              <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center border-b border-slate-100 dark:border-slate-800/60 pb-3 sm:pb-0 sm:border-0">
                <div className="col-span-5">
                  <InputField
                    id={`name-${course.id}`}
                    placeholder={`Course ${idx + 1} name (optional)`}
                    value={course.name}
                    onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-3">
                  <SelectField
                    id={`grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)}
                    options={GRADE_VALUES}
                    placeholder=""
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-2">
                  <NumberInput
                    id={`course-credits-${course.id}`}
                    placeholder="e.g. 4"
                    value={course.credits}
                    onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                    min="1"
                    className="sm:mb-0"
                  />
                </div>
                <div className="col-span-2 flex justify-end sm:justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="text-rose-600 hover:text-rose-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button type="button" variant="outline" onClick={addCourse} icon={Plus}>
              Add Course
            </Button>
            <div className="sm:ml-auto flex gap-3 w-full sm:w-auto">
              <Button type="submit" className="flex-1 sm:flex-none">
                Calculate GPA
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
            title="Semester GPA"
            value={result.gpa}
            subtitle="Weighted Average"
            status="success"
            details={[
              { label: 'Courses Counted', value: courses.filter(c => c.credits !== '').length },
              { label: 'Total Credits', value: result.totalCredits },
            ]}
            onReset={handleReset}
          />
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">Enter your courses, grades, and credits on the left.</p>
          </div>
        )}
      </div>
    </div>
  );
}
