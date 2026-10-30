import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import AttendanceCalculator from '@/components/calculators/AttendanceCalculator';

const tool = getToolById('attendance');

export const metadata = {
  title: 'Attendance Calculator — Check Attendance Percentage',
  description: 'Calculate your college attendance percentage instantly and check if you meet the minimum required threshold.',
};

export default function AttendancePage() {
  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How to Calculate Attendance Percentage"
      explanationContent={
        <>
          <p>
            Your attendance percentage is calculated by dividing the number of classes you attended
            by the total number of classes conducted, then multiplying by 100.
          </p>
          <p className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            Attendance % = (Classes Attended ÷ Total Classes Conducted) × 100
          </p>
        </>
      }
    >
      <AttendanceCalculator tool={tool} />
    </CalculatorWrapper>
  );
}
