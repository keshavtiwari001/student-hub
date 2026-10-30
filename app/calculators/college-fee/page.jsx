'use client';

import { useState } from 'react';
import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import NumberInput from '@/components/ui/NumberInput';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';
import ResultCard from '@/components/ui/ResultCard';
import Alert from '@/components/ui/Alert';

const tool = getToolById('college-fee');

export default function CollegeFeeCalculatorPage() {
  const [tuition, setTuition] = useState('');
  const [hostel, setHostel] = useState('');
  const [transport, setTransport] = useState('');
  const [otherFees, setOtherFees] = useState('');
  const [durationYears, setDurationYears] = useState('4');
  const [semestersPerYear, setSemestersPerYear] = useState('2');
  const [feeCalculationMode, setFeeCalculationMode] = useState('semester');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    const t = parseFloat(tuition) || 0;
    const h = parseFloat(hostel) || 0;
    const tr = parseFloat(transport) || 0;
    const o = parseFloat(otherFees) || 0;
    const yrs = parseInt(durationYears, 10);
    const semsPerYr = parseInt(semestersPerYear, 10);

    if (t < 0 || h < 0 || tr < 0 || o < 0) {
      setError('Fee amounts cannot be negative.');
      setResult(null);
      return;
    }

    if (t === 0 && h === 0 && tr === 0 && o === 0) {
      setError('Please enter at least one fee amount.');
      setResult(null);
      return;
    }

    let feePerSemester, annualCost, totalDegreeCost;
    const totalSemesters = yrs * semsPerYr;

    if (feeCalculationMode === 'semester') {
        feePerSemester = t + h + tr + o;
        annualCost = feePerSemester * semsPerYr;
        totalDegreeCost = feePerSemester * totalSemesters;
    } else {
        annualCost = t + h + tr + o;
        totalDegreeCost = annualCost * yrs;
        feePerSemester = annualCost / semsPerYr;
    }

    setResult({
      feePerSemester: feePerSemester.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      annualCost: annualCost.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      totalDegreeCost: totalDegreeCost.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      totalSemesters,
      durationYears: yrs,
    });
  };

  const handleReset = () => {
    setTuition('');
    setHostel('');
    setTransport('');
    setOtherFees('');
    setDurationYears('4');
    setSemestersPerYear('2');
    setFeeCalculationMode('semester');
    setError('');
    setResult(null);
  };

  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="College Expense Estimation"
      explanationContent={
        <p>
          Calculate your estimated semester, annual, and full degree program costs by combining tuition,
          accommodation/hostel, transport, and auxiliary administrative fees.
        </p>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Semester Fee Breakdown
          </h2>

          {error && (
            <Alert type="error" title="Input Error" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleCalculate} className="space-y-5">
            <SelectField
                label="Fee Structure"
                id="fee-calculation-mode"
                value={feeCalculationMode}
                onChange={(e) => setFeeCalculationMode(e.target.value)}
                options={[
                    { value: 'semester', label: 'Per Semester' },
                    { value: 'annually', label: 'Annually (Per Year)' },
                ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label={`Tuition Fee ${feeCalculationMode === 'semester' ? 'per Semester' : 'per Year'}`}
                id="tuition"
                value={tuition}
                onChange={(e) => setTuition(e.target.value)}
                placeholder="e.g. 50000"
                min="0"
              />
              <NumberInput
                label={`Hostel / Mess ${feeCalculationMode === 'semester' ? 'per Semester' : 'per Year'}`}
                id="hostel"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                placeholder="e.g. 20000"
                min="0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label={`Transport ${feeCalculationMode === 'semester' ? 'per Semester' : 'per Year'}`}
                id="transport"
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
                placeholder="e.g. 5000"
                min="0"
              />
              <NumberInput
                label="Exam & Other Fees"
                id="other-fees"
                value={otherFees}
                onChange={(e) => setOtherFees(e.target.value)}
                placeholder="e.g. 3000"
                min="0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <NumberInput
                label="Program Duration (Years)"
                id="duration-years"
                value={durationYears}
                onChange={(e) => setDurationYears(e.target.value)}
                placeholder="4"
                min="1"
                max="6"
              />
              <NumberInput
                label="Semesters per Year"
                id="semesters-per-year"
                value={semestersPerYear}
                onChange={(e) => setSemestersPerYear(e.target.value)}
                placeholder="2"
                min="1"
                max="3"
              />
            </div>

            <div className="pt-3 flex gap-3">
              <Button type="submit" size="lg" className="flex-1">
                Estimate Total Fees
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
              title="Estimated Full Degree Cost"
              value={result.totalDegreeCost}
              subtitle={`Total for ${result.durationYears} Years (${result.totalSemesters} Semesters)`}
              status="success"
              details={[
                { label: 'Cost Per Semester', value: result.feePerSemester },
                { label: 'Annual Estimate', value: result.annualCost },
              ]}
              onReset={handleReset}
            />
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
              <p className="font-medium">Enter your semester fee breakdown on the left.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
}
