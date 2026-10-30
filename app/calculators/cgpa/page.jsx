import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import CGPACalculator from '@/components/calculators/CGPACalculator';

const tool = getToolById('cgpa');

export const metadata = {
  title: 'CGPA Calculator — Cumulative Grade Point Average',
  description: 'Calculate your Cumulative Grade Point Average (CGPA) from all your semester GPAs and credits.',
};

export default function CGPAPage() {
  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How CGPA is Calculated"
      explanationContent={
        <>
          <p>
            Your Cumulative Grade Point Average (CGPA) is the weighted average of your semester GPAs,
            where the weight is the number of credits allotted to that semester.
          </p>
          <p className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            CGPA = Σ (Semester GPA × Semester Credits) ÷ Total Credits
          </p>
        </>
      }
    >
      <CGPACalculator tool={tool} />
    </CalculatorWrapper>
  );
}
