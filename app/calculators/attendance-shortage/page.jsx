import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import AttendanceShortageCalculator from '@/components/calculators/AttendanceShortageCalculator';

const tool = getToolById('attendance-shortage');

export const metadata = {
  title: 'Attendance Shortage Calculator — Classes Required to Reach Target',
  description: 'Find out exactly how many consecutive classes you need to attend to recover from an attendance shortage.',
};

export default function AttendanceShortagePage() {
  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How Attendance Shortage Recovery Works"
      explanationContent={
        <>
          <p>
            When your attendance falls below your college&apos;s required threshold (e.g., 75%), every
            class you attend from now on increases your percentage faster than when you were absent,
            because both your attended count and total count increase by 1.
          </p>
          <p className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            Classes Needed = ⌈ ( (Target% ÷ 100 × Total) − Attended ) ÷ (1 − Target% ÷ 100) ⌉
          </p>
        </>
      }
    >
      <AttendanceShortageCalculator tool={tool} />
    </CalculatorWrapper>
  );
}
